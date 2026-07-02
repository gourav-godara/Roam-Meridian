const Review = require("../models/review.model");

const getAllReviews = async () => {
  return await Review.find().sort({ createdAt: -1 });
};

const createReview = async (reviewData) => {
  const review = await Review.create(reviewData);
  return review;
};

module.exports = {
  getAllReviews,
  createReview,
};