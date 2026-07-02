import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const getDashboard = async () => {
  const { data } = await API.get("/dashboard");
  return data;
};