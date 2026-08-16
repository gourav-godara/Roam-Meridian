import api from "./api";

export const searchTravelOptions = async (params) => {
  const { data } = await api.get("/travel-options/search", { params });
  return data;
};

export const getAvailableCities = async (mode) => {
  const { data } = await api.get("/travel-options/cities", {
    params: mode ? { mode } : {},
  });
  return data;
};

export const getTravelOptionById = async (id) => {
  const { data } = await api.get(`/travel-options/${id}`);
  return data;
};
