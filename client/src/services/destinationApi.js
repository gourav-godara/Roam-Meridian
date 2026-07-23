import api from "./api";

export const getAllDestinations = async () => {
  const response = await api.get("/destinations", {
    params: {
      limit: 100,
    },
  });

  return response.data;
};

export const getDestinationById = async (id) => {
  const response = await api.get(`/destinations/${id}`);

  return response.data;
};