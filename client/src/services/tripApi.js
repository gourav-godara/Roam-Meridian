import api from "./api";

export const getTrips = async () => {
  const { data } = await api.get("/trips");
  return data;
};

export const getTripById = async (id) => {
  const { data } = await api.get(`/trips/${id}`);
  return data;
};

export const createTrip = async (tripData) => {
  const { data } = await api.post("/trips", tripData);
  return data;
};

export const updateTrip = async (id, tripData) => {
  const { data } = await api.put(`/trips/${id}`, tripData);
  return data;
};

export const deleteTrip = async (id) => {
  const { data } = await api.delete(`/trips/${id}`);
  return data;
};

export const addToWishlist = async (destinationId) => {
  const { data } = await api.post(`/trips/wishlist/${destinationId}`);
  return data;
};