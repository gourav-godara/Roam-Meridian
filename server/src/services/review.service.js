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
const getAllReviews = async () => {
  return await Review.find()
    .populate("user", "name")
};

// Get Review By ID
const getReviewById = async (id) => {
  return await Review.findById(id)
    .populate("user", "name")
    
};

// Update Review
const updateReview = async (id, reviewData) => {
  return await Review.findByIdAndUpdate(id, reviewData, {
    new: true,
    runValidators: true,
  });
};

// Delete Review
const deleteReview = async (id) => {
  return await Review.findByIdAndDelete(id);
};

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
};