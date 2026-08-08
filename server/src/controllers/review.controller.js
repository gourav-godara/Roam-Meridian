const reviewService = require("../services/review.service");
const Review = require("../models/review.model");
const Trip = require("../models/trip.model");
// Create Review
const createReview = async (req, res, next) => {
  try {
    let { itinerary, destination, destinationId } = req.body;

    destination = destination || destinationId;

    // If itinerary not provided, find a completed trip automatically
    if (!itinerary && destination) {
      const autoTrip = await Trip.findOne({
        destinationId: destination,
        status: "completed",
        $or: [{ createdBy: req.user.id }, { collaborators: req.user.id }],
      });

      if (!autoTrip) {
        return res.status(400).json({
          success: false,
          message:
            "Complete a trip to this destination before writing a review.",
        });
      }

      itinerary = autoTrip._id;
    }

    // Guard against itinerary being missing/malformed before hitting the
    // DB — Trip.findById(undefined) throws a CastError, which previously
    // surfaced as a confusing 500 instead of a clean 404/400.
    if (!itinerary) {
      return res.status(400).json({
        success: false,
        message: "A destination or completed trip is required to review.",
      });
    }

    const trip = await Trip.findById(itinerary);

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found.",
      });
    }

    const isCreator = trip.createdBy.toString() === req.user.id;

    const isCollaborator = trip.collaborators.some(
      (id) => id.toString() === req.user.id
    );

    if (!isCreator && !isCollaborator) {
      return res.status(403).json({
        success: false,
        message: "You can only review trips you joined.",
      });
    }

    if (trip.status !== "completed") {
      return res.status(400).json({
        success: false,
        message: "Trip must be completed before reviewing.",
      });
    }

    // Only convert uploaded files once we know the trip is valid — no
    // point building paths for a request we're about to reject.
    const uploadedImages =
      req.files?.map((file) => `/uploads/reviews/${file.filename}`) || [];

    const review = await reviewService.createReview({
      ...req.body,
      itinerary,
      destination: trip.destinationId,
      user: req.user.id,
      images: uploadedImages,
    });

    res.status(201).json({
      success: true,
      message: "Review created successfully.",
      data: review,
    });
  } catch (err) {
    next(err);
  }
};

// Get All Reviews
const getAllReviews = async (req, res, next) => {
  try {
    // ?mine=true scopes results to the logged-in user (used by the "My
    // Reviews" page). Requires auth — see review.routes.js, which only
    // attaches auth middleware conditionally for this reason.
    if (req.query.mine === "true" && !req.user) {
      return res.status(401).json({
        success: false,
        message: "Login required to view your reviews.",
      });
    }

    const reviews = await reviewService.getAllReviews({
      destinationId: req.query.destinationId,
      userId: req.query.mine === "true" ? req.user?.id : undefined,
    });

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

// Get Review By ID
const getReviewById = async (req, res, next) => {
  try {
    const review = await reviewService.getReviewById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

// Update Review
const updateReview = async (req, res, next) => {
  try {
    const existingReview = await Review.findById(req.params.id);

    if (!existingReview) {
      return res.status(404).json({
        success: false,
        message: "Review not found.",
      });
    }

    if (existingReview.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You can only edit your own review.",
      });
    }

    const review = await reviewService.updateReview(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Review updated successfully.",
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Review
const deleteReview = async (req, res, next) => {
  try {
    const existingReview = await Review.findById(req.params.id);

    if (!existingReview) {
      return res.status(404).json({
        success: false,
        message: "Review not found.",
      });
    }

    if (existingReview.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own review.",
      });
    }

    await reviewService.deleteReview(req.params.id);

    res.status(200).json({
      success: true,
      message: "Review deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

// Get Average Rating
const getAverageRating = async (req, res, next) => {
  try {
    const result = await reviewService.getAverageRating(
      req.query.destinationId
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
  getAverageRating,
};
