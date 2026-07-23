import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Get all trips for the logged-in user
export const getTrips = async () => {
  const { data } = await API.get("/trips");
  return data;
};

// Create a full trip
export const createTrip = async (tripData) => {
  const { data } = await API.post("/trips", tripData);
  return data;
};

// Add a destination to the wishlist (creates a minimal placeholder Trip)
export const addToWishlist = async (destinationId) => {
  const { data } = await API.post("/trips/wishlist", { destinationId });
  return data;
};

export default API;