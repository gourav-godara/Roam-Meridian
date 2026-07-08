const validateReview = require("../middleware/reviewValidation");
const express = require("express");

const router = express.Router();

const reviewController = require("../controllers/review.controller");

// Create Review
router.post(
    "/",
    validateReview,
    reviewController.createReview
);

// Get All Reviews
router.get("/", reviewController.getAllReviews);

// Get Review By ID
router.get("/:id", reviewController.getReviewById);

// Update Review
router.put("/:id", reviewController.updateReview);

// Delete Review
router.delete("/:id", reviewController.deleteReview);

module.exports = router;
