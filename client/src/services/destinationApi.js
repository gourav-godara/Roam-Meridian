import api from "./api";

export const getAllDestinations = async ({
  page = 1,
  limit = 12,
  search = "",
  category = "",
  minBudget = "",
  maxBudget = "",
  rating = "",
  sort = "",
} = {}) => {
  const response = await api.get("/destinations", {
    params: {
      page,
      limit,
      search,
      category,
      minBudget,
      maxBudget,
      rating,
      sort,
    },
  });

  return response.data;
};

export const getDestinationById = async (id) => {
  const response = await api.get(`/destinations/${id}`);

  return response.data;
};

// Admin-only server-side (see destination.routes.js) — these calls will
// 403 for a non-admin user.
export const createDestination = async (destinationData) => {
  const response = await api.post("/destinations", destinationData);
  return response.data;
};

export const updateDestination = async (id, destinationData) => {
  const response = await api.put(`/destinations/${id}`, destinationData);
  return response.data;
};

export const deleteDestination = async (id) => {
  const response = await api.delete(`/destinations/${id}`);
  return response.data;
};