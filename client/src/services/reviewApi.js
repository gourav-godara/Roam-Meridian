import api from "./api";

// Get all reviews (optionally filtered by destination)
export const getReviews = async (destinationId) => {
  const { data } = await api.get("/reviews", {
    params: destinationId ? { destinationId } : {},
  });
  return data;
};

// Get the live average rating + review count for a destination
export const getAverageRating = async (destinationId) => {
  const { data } = await api.get("/reviews/average", {
    params: { destinationId },
  });
  return data;
};

// Get review by ID
export const getReviewById = async (id) => {
  const { data } = await api.get(`/reviews/${id}`);
  return data;
};

// Create review
export const createReview = (data) => {
  const formData = new FormData();

  formData.append("rating", data.rating);
  formData.append("reviewText", data.reviewText);

  if (data.destinationId) {
    formData.append("destination", data.destinationId);
  }

  if (data.itinerary) {
    formData.append("itinerary", data.itinerary);
  }

  if (data.images?.length) {
    data.images.forEach((image) => {
      formData.append("images", image);
    });
  }

  // Override Content-Type for this call only — the shared client defaults
  // to application/json, but a file upload needs multipart/form-data.
  return api.post("/reviews", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Update review
export const updateReview = async (id, reviewData) => {
  const { data } = await api.put(`/reviews/${id}`, reviewData);
  return data;
};

// Delete review
export const deleteReview = async (id) => {
  const { data } = await api.delete(`/reviews/${id}`);
  return data;
};


