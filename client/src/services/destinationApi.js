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