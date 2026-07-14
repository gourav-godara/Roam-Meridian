const reviewService = require("../services/review.service");
const Review = require("../models/review.model");
// Create Review
const createReview = async (req, res, next) => {
  try {
    const review = await reviewService.createReview({
  ...req.body,
  user: req.user.id,
});

    res.status(201).json({
      success: true,
      message: "Review created successfully.",
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

// Get All Reviews
const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await reviewService.getAllReviews(
  req.query.destinationId
);

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

    const review = await reviewService.updateReview(
      req.params.id,
      req.body
    );

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