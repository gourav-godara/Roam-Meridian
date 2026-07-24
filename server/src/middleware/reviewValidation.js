const validateReview = (req, res, next) => {
  const {
    rating,
    reviewText,
    itinerary,
    destination,
    destinationId,
} = req.body;

  if (!rating) {
    return res.status(400).json({
      success: false,
      message: "Rating is required.",
    });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({
      success: false,
      message: "Rating must be between 1 and 5.",
    });
  }

  if (!reviewText || reviewText.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Review text is required.",
    });
  }

  // Require either itinerary OR destination
  if (!itinerary && !destination && !destinationId) {
    return res.status(400).json({
      success: false,
      message: "Destination or itinerary is required.",
    });
  }

  next();
};

module.exports = validateReview;