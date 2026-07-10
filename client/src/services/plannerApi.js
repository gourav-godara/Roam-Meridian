import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/planner`,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const plannerApi = {
  generate: (payload) => api.post("/generate", payload).then((r) => r.data.data),
  getHistory: (search = "") => api.get("/history", { params: { search } }).then((r) => r.data.data),
  getById: (id) => api.get(`/${id}`).then((r) => r.data.data),
  update: (id, updates) => api.put(`/${id}`, updates).then((r) => r.data.data),
  remove: (id) => api.delete(`/${id}`).then((r) => r.data),
  favorite: (id) => api.patch(`/${id}/favorite`).then((r) => r.data.data),
  save: (id) => api.patch(`/${id}/save`).then((r) => r.data.data),
  duplicate: (id) => api.post(`/${id}/duplicate`).then((r) => r.data.data),
  regenerateDay: (id, dayNumber) => api.post(`/${id}/regenerate-day`, { dayNumber }).then((r) => r.data.data),
};
