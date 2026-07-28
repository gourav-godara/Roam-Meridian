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

// Lighter validator for PUT /:id — only checks fields that were actually
// sent, since a partial update won't include itinerary/destination.
const validateReviewUpdate = (req, res, next) => {
  const { rating, reviewText } = req.body;

  if (rating !== undefined && (rating < 1 || rating > 5)) {
    return res.status(400).json({
      success: false,
      message: "Rating must be between 1 and 5.",
    });
  }

  if (reviewText !== undefined && reviewText.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Review text cannot be empty.",
    });
  }

  next();
};

module.exports = validateReview;
module.exports.validateReviewUpdate = validateReviewUpdate;