import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getNotifications = async () => {
  const { data } = await API.get("/notifications");
  return data;
};

export const markNotificationAsRead = async (id) => {
  const { data } = await API.patch(`/notifications/${id}/read`);
  return data;
};

export const markAllNotificationsAsRead = async () => {
  const { data } = await API.patch("/notifications/read-all");
  return data;
};