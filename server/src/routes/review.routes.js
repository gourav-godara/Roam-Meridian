const validateReview = require("../middleware/reviewValidation");
const { validateReviewUpdate } = require("../middleware/reviewValidation");
const express = require("express");
const upload = require("../middleware/upload.middleware");
const router = express.Router();

const reviewController = require("../controllers/review.controller");
const authMiddleware = require("../middleware/auth.middleware");
// Create Review
router.post(
  "/",
  authMiddleware,
  upload.array("images", 5),   // Accept up to 5 images
  validateReview,
  reviewController.createReview
);

// Get All Reviews
router.get("/", reviewController.getAllReviews);
router.get("/average", reviewController.getAverageRating);
// Get Review By ID
router.get("/:id", reviewController.getReviewById);

// Update Review
router.put(
    "/:id",
    authMiddleware,
    validateReviewUpdate,
    reviewController.updateReview
);

// Delete Review
router.delete(
    "/:id",
    authMiddleware,
    reviewController.deleteReview
);

module.exports = router;
