const Review = require("../models/review.model");
const Destination = require("../models/Destination");

// Recomputes and stores the aggregate rating on the Destination document
// itself. Previously Destination.rating.average/count were only ever set
// at seed time and never updated again — every page that read the stored
// field (Explore, Wishlist, PopularDestinations, SimilarDestinations) showed
// a permanently stale rating no matter how many real reviews came in. Only
// the single destination detail page worked around this by calling the
// separate live-aggregate endpoint. Now every review write keeps the
// stored field in sync, so all pages show the same, correct number.
const syncDestinationRating = async (destinationId) => {
  if (!destinationId) return;

  const [result] = await Review.aggregate([
    { $match: { destination: destinationId } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
        totalReviews: { $sum: 1 },
      },
    },
  ]);

  await Destination.findByIdAndUpdate(destinationId, {
    "rating.average": result ? Number(result.averageRating.toFixed(1)) : 0,
    "rating.count": result ? result.totalReviews : 0,
  });
};

// Create Review
const createReview = async (reviewData) => {
  const existingReview = await Review.findOne({
    user: reviewData.user,
    itinerary: reviewData.itinerary,
    destination: reviewData.destination,
  });

  if (existingReview) {
    throw new Error("You have already reviewed this itinerary.");
  }

  const review = await Review.create(reviewData);

  await syncDestinationRating(reviewData.destination);

  return review;
};

// Get All Reviews
// Previously this only ever filtered by destinationId, so ReviewPage.jsx's
// "My Reviews" screen (which calls getReviews() with no args) returned
// every review from every user — not just the logged-in user's own.
const getAllReviews = async ({ destinationId, userId } = {}) => {
  const filter = {};

  if (destinationId) {
    filter.destination = destinationId;
  }

  if (userId) {
    filter.user = userId;
  }

  return await Review.find(filter)
    .sort({ createdAt: -1 })
    .populate("user", "name avatar")
    .populate("destination", "name city country")
    .populate("itinerary", "title");
};

// Get Review By ID
const getReviewById = async (id) => {
  return await Review.findById(id)
    .populate("user", "name avatar")
    .populate("destination", "name city country")
    .populate("itinerary", "title");
};

// Update Review
const updateReview = async (id, reviewData) => {
  reviewData.isEdited = true;

  const review = await Review.findByIdAndUpdate(id, reviewData, {
    new: true,
    runValidators: true,
  });

  // The rating itself may have changed on update, so re-sync.
  if (review) {
    await syncDestinationRating(review.destination);
  }

  return review;
};

// Delete Review
const deleteReview = async (id) => {
  const review = await Review.findByIdAndDelete(id);

  if (review) {
    await syncDestinationRating(review.destination);
  }

  return review;
};

const getAverageRating = async (destinationId) => {
  const match = {};

  if (destinationId) {
    match.destination = destinationId;
  }

  const result = await Review.aggregate([
    { $match: match },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
        totalReviews: { $sum: 1 },
      },
    },
  ]);

  return (
    result[0] || {
      averageRating: 0,
      totalReviews: 0,
    }
  );
};

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
  getAverageRating,
};
