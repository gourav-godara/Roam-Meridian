const mongoose = require("mongoose");
const User = require("../models/user.model");
const Destination = require("../models/Destination");
const Trip = require("../models/trip.model");
const Review = require("../models/review.model");
const Expense = require("../models/expense.model");

// ============================================================
// DASHBOARD / ANALYTICS
// ============================================================

// GET /api/admin/stats
// Platform-wide numbers for the admin dashboard's top cards + charts.
const getStats = async (req, res, next) => {
  try {
    const [
      totalUsers,
      totalDestinations,
      totalTrips,
      totalReviews,
      totalExpenses,
      usersByRole,
      tripsByStatus,
      expenseAgg,
      topDestinations,
      recentUsers,
      recentTrips,
      recentReviews,
    ] = await Promise.all([
      User.countDocuments(),
      Destination.countDocuments(),
      Trip.countDocuments(),
      Review.countDocuments(),
      Expense.countDocuments(),

      User.aggregate([
        { $group: { _id: "$role", count: { $sum: 1 } } },
      ]),

      Trip.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),

      Expense.aggregate([
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),

      // Destinations ranked by how many trips reference them — a real
      // "most booked" signal rather than a static/manual list.
      Trip.aggregate([
        { $group: { _id: "$destinationId", tripCount: { $sum: 1 } } },
        { $sort: { tripCount: -1 } },
        { $limit: 5 },
        {
          $lookup: {
            from: "destinations",
            localField: "_id",
            foreignField: "_id",
            as: "destination",
          },
        },
        { $unwind: "$destination" },
        {
          $project: {
            _id: "$destination._id",
            name: "$destination.name",
            city: "$destination.city",
            country: "$destination.country",
            image: { $arrayElemAt: ["$destination.images", 0] },
            tripCount: 1,
          },
        },
      ]),

      User.find().sort({ createdAt: -1 }).limit(5).select("name email createdAt role"),
      Trip.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("createdBy", "name email")
        .populate("destinationId", "name city country"),
      Review.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("user", "name email")
        .populate("destination", "name"),
    ]);

    // Signups per day for the last 14 days — powers a real trend chart
    // instead of a static/fake one.
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 13);
    fourteenDaysAgo.setHours(0, 0, 0, 0);

    const signupTrend = await User.aggregate([
      { $match: { createdAt: { $gte: fourteenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Fill in zero-count days so the chart doesn't have gaps.
    const trendMap = new Map(signupTrend.map((d) => [d._id, d.count]));
    const filledTrend = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      filledTrend.push({ date: key, count: trendMap.get(key) || 0 });
    }

    res.status(200).json({
      success: true,
      data: {
        totals: {
          users: totalUsers,
          destinations: totalDestinations,
          trips: totalTrips,
          reviews: totalReviews,
          expenses: totalExpenses,
          totalExpenseAmount: expenseAgg[0]?.total || 0,
        },
        usersByRole: usersByRole.reduce(
          (acc, r) => ({ ...acc, [r._id]: r.count }),
          {}
        ),
        tripsByStatus: tripsByStatus.reduce(
          (acc, t) => ({ ...acc, [t._id]: t.count }),
          {}
        ),
        topDestinations,
        signupTrend: filledTrend,
        recent: {
          users: recentUsers,
          trips: recentTrips,
          reviews: recentReviews,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// ============================================================
// USER MANAGEMENT
// ============================================================

// GET /api/admin/users?search=&role=&page=&limit=
const getAllUsers = async (req, res, next) => {
  try {
    const { search, role, page = 1, limit = 20 } = req.query;

    const filter = {};

    if (search) {
      const regex = { $regex: search, $options: "i" };
      filter.$or = [{ name: regex }, { email: regex }];
    }

    if (role) {
      filter.role = role;
    }

    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 20;
    const skip = (pageNumber - 1) * limitNumber;

    const [users, total] = await Promise.all([
      User.find(filter)
        .select("-password")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNumber),
      User.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      currentPage: pageNumber,
      totalPages: Math.ceil(total / limitNumber),
      totalUsers: total,
      count: users.length,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/admin/users/:id
const getUserById = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // A quick activity snapshot for this user — useful context on the
    // admin's user-detail page without needing separate requests.
    const [tripCount, reviewCount, expenseCount] = await Promise.all([
      Trip.countDocuments({ createdBy: user._id }),
      Review.countDocuments({ user: user._id }),
      Expense.countDocuments({ paidBy: user._id }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        user,
        activity: { tripCount, reviewCount, expenseCount },
      },
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/admin/users/:id/role  { role: "admin" | "user" }
const updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Role must be 'user' or 'admin'.",
      });
    }

    // Prevent an admin from demoting themselves and getting locked out
    // mid-session.
    if (req.params.id === req.user.id && role !== "admin") {
      return res.status(400).json({
        success: false,
        message: "You can't remove your own admin access.",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: `${user.name} is now ${role === "admin" ? "an admin" : "a regular user"}.`,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/admin/users/:id/status  { isActive: boolean }
// Suspends/reinstates an account without deleting their data — the
// standard "ban" pattern for a platform like this, safer and more
// reversible than hard-deleting a user.
const updateUserStatus = async (req, res, next) => {
  try {
    const { isActive } = req.body;

    if (typeof isActive !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isActive must be true or false.",
      });
    }

    if (req.params.id === req.user.id && !isActive) {
      return res.status(400).json({
        success: false,
        message: "You can't suspend your own account.",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: isActive ? "Account reinstated." : "Account suspended.",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/admin/users/:id
const deleteUser = async (req, res, next) => {
  try {
    if (req.params.id === req.user.id) {
      return res.status(400).json({
        success: false,
        message: "You can't delete your own account from here.",
      });
    }

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User deleted.",
    });
  } catch (error) {
    next(error);
  }
};

// ============================================================
// TRIP OVERSIGHT (all users' trips, not just the admin's own)
// ============================================================

// GET /api/admin/trips?search=&status=&page=&limit=
const getAllTrips = async (req, res, next) => {
  try {
    const { search, status, page = 1, limit = 20 } = req.query;

    const filter = {};

    if (status) filter.status = status;

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 20;
    const skip = (pageNumber - 1) * limitNumber;

    const [trips, total] = await Promise.all([
      Trip.find(filter)
        .populate("createdBy", "name email")
        .populate("destinationId", "name city country")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNumber),
      Trip.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      currentPage: pageNumber,
      totalPages: Math.ceil(total / limitNumber),
      totalTrips: total,
      count: trips.length,
      data: trips,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/admin/trips/:id
const deleteTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id);

    if (!trip) {
      return res.status(404).json({ success: false, message: "Trip not found" });
    }

    res.status(200).json({ success: true, message: "Trip deleted." });
  } catch (error) {
    next(error);
  }
};

// ============================================================
// REVIEW MODERATION (delete any review, not just your own)
// ============================================================

// GET /api/admin/reviews?search=&rating=&page=&limit=
const getAllReviews = async (req, res, next) => {
  try {
    const { search, rating, page = 1, limit = 20 } = req.query;

    const filter = {};

    if (rating) filter.rating = Number(rating);

    if (search) {
      filter.reviewText = { $regex: search, $options: "i" };
    }

    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 20;
    const skip = (pageNumber - 1) * limitNumber;

    const [reviews, total] = await Promise.all([
      Review.find(filter)
        .populate("user", "name email")
        .populate("destination", "name city country")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNumber),
      Review.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      currentPage: pageNumber,
      totalPages: Math.ceil(total / limitNumber),
      totalReviews: total,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/admin/reviews/:id
// Uses the same Destination.rating sync as the regular review deletion
// path, so removing a review here (e.g. moderating spam/abuse) keeps the
// destination's star rating correct.
const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }

    const [result] = await Review.aggregate([
      { $match: { destination: review.destination } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
        },
      },
    ]);

    await Destination.findByIdAndUpdate(review.destination, {
      "rating.average": result ? Number(result.averageRating.toFixed(1)) : 0,
      "rating.count": result ? result.totalReviews : 0,
    });

    res.status(200).json({ success: true, message: "Review deleted." });
  } catch (error) {
    next(error);
  }
};

// ============================================================
// EXPENSE OVERSIGHT (read-only — for support/dispute lookup)
// ============================================================

// GET /api/admin/expenses?search=&status=&page=&limit=
const getAllExpenses = async (req, res, next) => {
  try {
    const { search, status, page = 1, limit = 20 } = req.query;

    const filter = {};

    if (status) filter.status = status;

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 20;
    const skip = (pageNumber - 1) * limitNumber;

    const [expenses, total] = await Promise.all([
      Expense.find(filter)
        .populate("paidBy", "name email")
        .populate("participants", "name email")
        .populate("trip", "title")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNumber),
      Expense.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      currentPage: pageNumber,
      totalPages: Math.ceil(total / limitNumber),
      totalExpenses: total,
      count: expenses.length,
      data: expenses,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStats,
  getAllUsers,
  getUserById,
  updateUserRole,
  updateUserStatus,
  deleteUser,
  getAllTrips,
  deleteTrip,
  getAllReviews,
  deleteReview,
  getAllExpenses,
};
