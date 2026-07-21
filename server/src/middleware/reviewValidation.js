const validateReview = (req, res, next) => {
  const { rating, reviewText, destination, itinerary } = req.body;

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

  if (!destination) {
  return res.status(400).json({
    success: false,
    message: "Destination is required.",
  });
}

if (!itinerary) {
  return res.status(400).json({
    success: false,
    message: "Itinerary is required.",
  });
}

  next();
};

module.exports = validateReview;