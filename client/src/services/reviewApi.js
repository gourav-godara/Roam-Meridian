import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Get all reviews (optionally filtered by destination)
export const getReviews = async (destinationId) => {
  const { data } = await API.get("/reviews", {
    params: destinationId ? { destinationId } : {},
  });
  return data;
};

// Get review by ID
export const getReviewById = async (id) => {
  const { data } = await API.get(`/reviews/${id}`);
  return data;
};

// Create review
export const createReview = async (reviewData) => {
  const { data } = await API.post("/reviews", reviewData);
  return data;
};

// Update review
export const updateReview = async (id, reviewData) => {
  const { data } = await API.put(`/reviews/${id}`, reviewData);
  return data;
};

// Delete review
export const deleteReview = async (id) => {
  const { data } = await API.delete(`/reviews/${id}`);
  return data;
};