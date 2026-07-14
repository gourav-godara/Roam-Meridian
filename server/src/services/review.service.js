const Review = require("../models/review.model");

// Create Review
const createReview = async (reviewData) => {

    const existingReview = await Review.findOne({
        user: reviewData.user,
        itinerary: reviewData.itinerary,
    });

    if (existingReview) {
        throw new Error(
            "You have already reviewed this itinerary."
        );
    }

    return await Review.create(reviewData);
};

// Get All Reviews
const getAllReviews = async (destinationId) => {
  const filter = {};

  if (destinationId) {
    filter.destination = destinationId;
  }

  return await Review.find(filter)
    .populate("user", "name avatar")
    .populate("destination", "name city country");
};

// Get Review By ID
const getReviewById = async (id) => {
  return await Review.findById(id)
    .populate("user", "name avatar")
    .populate("destination", "name city country");
};

// Update Review
const updateReview = async (id, reviewData) => {
  reviewData.isEdited = true;
  return await Review.findByIdAndUpdate(id, reviewData, {
    new: true,
    runValidators: true,
  });
};

// Delete Review
const deleteReview = async (id) => {
  return await Review.findByIdAndDelete(id);
};
const getAverageRating = async (destinationId) => {
  const match = {};

  if (destinationId) {
    match.destination = destinationId;
  }

  const result = await Review.aggregate([
    { $match: match },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
        totalReviews: { $sum: 1 },
      },
    },
  ]);

  return (
    result[0] || {
      averageRating: 0,
      totalReviews: 0,
    }
  );
};
module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
  getAverageRating,
};