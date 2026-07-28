console.log("Trip controller loaded");

const Trip = require("../models/trip.model");

const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find({
      $or: [
        { createdBy: req.user.id },
        { collaborators: req.user.id },
      ],
    })
      .populate("destinationId", "name city country images")
      .populate("createdBy", "name email")
      .populate("collaborators", "name email");

    return res.status(200).json({
      success: true,
      count: trips.length,
      data: trips,
    });
  } catch (error) {
    console.error("Error fetching trips:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch trips.",
    });
  }
};

const createTrip = async (req, res) => {
  const {
    title,
    destinationId,
    plannerId,
    startDate,
    endDate,
    travelers,
    budget,
    itinerary,
    collaborators,
    coverImage,
    isPublic,
    status,
  } = req.body;

  if (
    !title ||
    !destinationId ||
    !startDate ||
    !endDate ||
    travelers === undefined ||
    budget === undefined
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields.",
    });
  }

  try {
    const trip = await Trip.create({
      title,
      destinationId,
      plannerId: plannerId || null,
      createdBy: req.user.id,
      collaborators: collaborators || [],
      coverImage: coverImage || "",
      startDate,
      endDate,
      travelers,
      budget,
      itinerary: itinerary || [],
      status: status || "planning",
      isPublic: isPublic || false,
    });

    return res.status(201).json({
      success: true,
      message: "Trip created successfully.",
      data: trip,
    });
  } catch (error) {
    console.error("Error creating trip:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create trip.",
    });
  }
};

const addToWishlist = async (req, res) => {
  // The frontend posts to /trips/wishlist/:destinationId with no body,
  // so accept the id from the route param first and fall back to the
  // body for any other caller.
  const destinationId = req.params.destinationId || req.body.destinationId;

  if (!destinationId) {
    return res.status(400).json({
      success: false,
      message: "Destination ID is required.",
    });
  }

  try {
    const existing = await Trip.findOne({
      createdBy: req.user.id,
      destinationId,
      status: "wishlist",
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Destination already exists in wishlist.",
      });
    }

    const wishlistTrip = await Trip.create({
      title: "Wishlist",
      destinationId,
      createdBy: req.user.id,
      startDate: new Date(),
      endDate: new Date(),
      travelers: 1,
      budget: 0,
      itinerary: [],
      status: "wishlist",
      collaborators: [],
      coverImage: "",
      isPublic: false,
    });

    return res.status(201).json({
      success: true,
      message: "Added to wishlist.",
      data: wishlistTrip,
    });
  } catch (error) {
    console.error("Wishlist Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add destination to wishlist.",
    });
  }
};

const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      $or: [
        { createdBy: req.user.id },
        { collaborators: req.user.id },
      ],
    })
      .populate("destinationId", "name city country images")
      .populate("createdBy", "name email")
      .populate("collaborators", "name email");

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: trip,
    });
  } catch (error) {
    console.error("Error fetching trip:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch trip.",
    });
  }
};

const updateTrip = async (req, res) => {
  try {
    const allowedFields = [
      "title",
      "startDate",
      "endDate",
      "travelers",
      "budget",
      "status",
      "coverImage",
      "isPublic",
      "collaborators",
      "itinerary",
    ];

    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    if (
      updates.startDate &&
      updates.endDate &&
      new Date(updates.startDate) > new Date(updates.endDate)
    ) {
      return res.status(400).json({
        success: false,
        message: "End date must be after start date.",
      });
    }

    if (updates.travelers && updates.travelers < 1) {
      return res.status(400).json({
        success: false,
        message: "Travelers must be at least 1.",
      });
    }

    if (updates.budget && updates.budget < 0) {
      return res.status(400).json({
        success: false,
        message: "Budget cannot be negative.",
      });
    }

    const updatedTrip = await Trip.findOneAndUpdate(
      {
        _id: req.params.id,
        createdBy: req.user.id,
      },
      updates,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("destinationId", "name city country images")
      .populate("createdBy", "name email")
      .populate("collaborators", "name email");

    if (!updatedTrip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Trip updated successfully.",
      data: updatedTrip,
    });
  } catch (error) {
    console.error("Error updating trip:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update trip.",
    });
  }
};

const deleteTrip = async (req, res) => {
  try {
    const deletedTrip = await Trip.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    if (!deletedTrip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Trip deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting trip:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete trip.",
    });
  }
};

module.exports = {
  getAllTrips,
  createTrip,
  addToWishlist,
  getTripById,
  updateTrip,
  deleteTrip,
};