import api from "./api";

export const getAllItineraries = async ({
  page = 1,
  limit = 12,
  search = "",
  destinationName = "",
  theme = "",
  minDays = "",
  maxDays = "",
  sort = "",
} = {}) => {
  const response = await api.get("/itineraries", {
    params: {
      page,
      limit,
      search,
      destinationName,
      theme,
      minDays,
      maxDays,
      sort,
    },
  });

  return response.data;
};

export const getItineraryById = async (id) => {
  const response = await api.get(`/itineraries/${id}`);
  return response.data;
};

export const getItinerariesByDestination = async (destinationId) => {
  const response = await api.get(`/itineraries/by-destination/${destinationId}`);
  return response.data;
};

// Admin-only server-side (see itinerary.routes.js) — these calls will
// 403 for a non-admin user.
export const createItinerary = async (itineraryData) => {
  const response = await api.post("/itineraries", itineraryData);
  return response.data;
};

export const updateItinerary = async (id, itineraryData) => {
  const response = await api.put(`/itineraries/${id}`, itineraryData);
  return response.data;
};

export const deleteItinerary = async (id) => {
  const response = await api.delete(`/itineraries/${id}`);
  return response.data;
};