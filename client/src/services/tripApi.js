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

export const getTrips = async () => {
  const { data } = await API.get("/trips");
  return data;
};

<<<<<<< HEAD
export const getTripById = async (id) => {
  const { data } = await API.get(`/trips/${id}`);
  return data;
};

export const createTrip = async (payload) => {
  const { data } = await API.post("/trips", payload);
  return data;
};

export const updateTrip = async (id, updates) => {
  const { data } = await API.put(`/trips/${id}`, updates);
  return data;
};

export const deleteTrip = async (id) => {
  const { data } = await API.delete(`/trips/${id}`);
=======
// Create a full trip
export const createTrip = async (tripData) => {
  const { data } = await API.post("/trips", tripData);
  return data;
};

// Add a destination to the wishlist (creates a minimal placeholder Trip)
export const addToWishlist = async (destinationId) => {
  const { data } = await API.post("/trips/wishlist", { destinationId });
>>>>>>> 1af1e5bc55167d6043f4af6718b432fcdc2c51fc
  return data;
};

export default API;