const validateReview = require("../middleware/reviewValidation");
const express = require("express");

const router = express.Router();

const reviewController = require("../controllers/review.controller");
const authMiddleware = require("../middleware/auth.middleware");
// Create Review
router.post(
    "/",
    authMiddleware,
    validateReview,
    reviewController.createReview
);

// Get All Reviews
router.get("/", reviewController.getAllReviews);

// Get Review By ID
router.get("/:id", reviewController.getReviewById);

// Update Review
router.put(
    "/:id",
    authMiddleware,
    reviewController.updateReview
);

// Delete Review
router.delete(
    "/:id",
    authMiddleware,
    reviewController.deleteReview
);

module.exports = router;
