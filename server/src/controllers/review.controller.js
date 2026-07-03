const reviewService = require("../services/review.service");

const getReviews = async (req, res, next) => {
  try {
    const reviews = await reviewService.getAllReviews();

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

const createReview = async (req, res, next) => {
  try {
    const review = await reviewService.createReview(req.body);

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getReviews,
  createReview,
};