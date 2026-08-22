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
      totalWishlists,
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
      Trip.countDocuments({
  status: { $ne: "wishlist" },
}),
      User.aggregate([
  {
    $project: {
      wishlistCount: {
        $size: {
          $ifNull: ["$wishlist", []],
        },
      },
    },
  },
  {
    $group: {
      _id: null,
      total: {
        $sum: "$wishlistCount",
      },
    },
  },
]),
      Review.countDocuments(),
      Expense.countDocuments(),

      User.aggregate([
        { $group: { _id: "$role", count: { $sum: 1 } } },
      ]),

      Trip.aggregate([
  {
    $group: {
      _id: {
        $cond: [
          { $eq: ["$status", "wishlist"] },
          "Wishlist",
          "Trips",
        ],
      },
      count: { $sum: 1 },
    },
  },
]),

      Expense.aggregate([
  { $group: { _id: null, total: { $sum: "$amount" } } },
]),

// Destinations ranked by how many trips reference them
Trip.aggregate([
  { $match: { status: { $ne: "wishlist" } } },
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

    const tripsByStatusData = {
      Trips: totalTrips,
      Wishlist: totalWishlists[0]?.total || 0,
    };

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
          wishlists: totalWishlists[0]?.total || 0,
          reviews: totalReviews,
          expenses: totalExpenses,
          totalExpenseAmount: expenseAgg[0]?.total || 0,
        },
        usersByRole: usersByRole.reduce(
          (acc, r) => ({ ...acc, [r._id]: r.count }),
          {}
        ),
        tripsByStatus: tripsByStatusData,
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
      Expense.countDocuments({ paidBy: user._id, paidByModel: "User" }),
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

    // paidBy/participants can each be a real User or a name-only trip
    // companion (see Trip.companions). Mongoose populate can't safely
    // handle this mix: refPath tries to resolve every model name it sees
    // (throwing on "Companion", which isn't a real collection), and
    // pinning model: "User" avoids the crash but silently nulls out any
    // Companion-tagged id (populate always overwrites the field with its
    // query result, including a "not found" null). So every person here
    // is resolved by hand below, in one batched pass across the page.
    const [expenses, total] = await Promise.all([
      Expense.find(filter)
        .populate("trip", "title")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNumber)
        .lean(),
      Expense.countDocuments(filter),
    ]);

    const userIds = new Set();
    const companionIds = new Set();
    const tripIdsNeedingCompanions = new Set();

    expenses.forEach((expense) => {
      if (expense.paidByModel === "Companion" && expense.paidBy) {
        companionIds.add(expense.paidBy.toString());
      } else if (expense.paidBy) {
        userIds.add(expense.paidBy.toString());
      }
      (expense.participants || []).forEach((p) => {
        // Expenses saved before the companion migration still have
        // participants as a bare array of ObjectIds, not { id, model }
        // subdocuments. A raw Mongoose ObjectId happens to carry its own
        // internal .id property (the object's raw byte buffer) — so
        // `!p.id` never catches these old entries, and calling
        // .toString() on that buffer for a User lookup throws a
        // CastError (invalid _id), which is what was crashing this
        // endpoint. Checking for a string `model` field (only ever
        // present on the new subdocument shape) is what actually tells
        // old and new apart.
        if (typeof p?.model !== "string" || !p.id) return;
        if (p.model === "Companion") {
          companionIds.add(p.id.toString());
        } else {
          userIds.add(p.id.toString());
        }
      });
      if (companionIds.size > 0) {
        const tripId = expense.trip?._id || expense.trip;
        if (tripId) tripIdsNeedingCompanions.add(tripId.toString());
      }
    });

    const [users, tripsWithCompanions] = await Promise.all([
      userIds.size
        ? User.find({ _id: { $in: [...userIds] } }, "name email")
        : [],
      tripIdsNeedingCompanions.size
        ? Trip.find(
            { _id: { $in: [...tripIdsNeedingCompanions] } },
            "companions"
          )
        : [],
    ]);

    const userById = {};
    users.forEach((u) => {
      userById[u._id.toString()] = {
        _id: u._id,
        name: u.name,
        email: u.email,
        isCompanion: false,
      };
    });

    const companionNameById = {};
    tripsWithCompanions.forEach((trip) => {
      (trip.companions || []).forEach((c) => {
        companionNameById[c._id.toString()] = c.name;
      });
    });

    const resolvePerson = (id, model) => {
      const idStr = id?.toString();
      if (!idStr) return null;
      if (model === "Companion") {
        return {
          _id: id,
          name: companionNameById[idStr] || "Unknown companion",
          isCompanion: true,
        };
      }
      return userById[idStr] || { _id: id, name: "Unknown user", isCompanion: false };
    };

    const expensesForAdmin = expenses.map((doc) => ({
      ...doc,
      paidBy: doc.paidBy ? resolvePerson(doc.paidBy, doc.paidByModel) : null,
      participants: (doc.participants || [])
        .map((p) => {
          // Old-shape data (pre-companion migration): participants was a
          // bare array of User ObjectIds, not { id, model } subdocuments.
          // Treat those as plain User ids rather than reading .id/.model
          // off the ObjectId itself (see the note above on why that's
          // unsafe).
          if (typeof p?.model !== "string") {
            return resolvePerson(p, "User");
          }
          return resolvePerson(p.id, p.model);
        })
        .filter(Boolean),
    }));

    res.status(200).json({
      success: true,
      currentPage: pageNumber,
      totalPages: Math.ceil(total / limitNumber),
      totalExpenses: total,
      count: expensesForAdmin.length,
      data: expensesForAdmin,
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





