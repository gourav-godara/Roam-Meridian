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
  return data;
};

export default API;