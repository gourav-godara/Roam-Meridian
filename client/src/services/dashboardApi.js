import api from "./api"; // Shared axios instance (base URL + auth header already wired up).

export const getDashboard = async () => {
  const { data } = await api.get("/dashboard");
  return data;
};




