const express = require("express");

const router = express.Router();

const reviewController = require("../controllers/review.controller");

router.get("/", reviewController.getReviews);

router.post("/", reviewController.createReview);

module.exports = router;
