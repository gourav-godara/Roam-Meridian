import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Get all expenses
export const getExpenses = async () => {
  const { data } = await API.get("/expenses");
  return data;
};

// Get expense by ID
export const getExpenseById = async (id) => {
  const { data } = await API.get(`/expenses/${id}`);
  return data;
};

// Create expense
export const createExpense = async (expenseData) => {
  const { data } = await API.post("/expenses", expenseData);
  return data;
};

// Update expense
export const updateExpense = async (id, expenseData) => {
  const { data } = await API.put(`/expenses/${id}`, expenseData);
  return data;
};

// Delete expense
export const deleteExpense = async (id) => {
  const { data } = await API.delete(`/expenses/${id}`);
  return data;
};

export const settleExpense = async (id) => {
  const { data } = await API.patch(`/expenses/${id}/settle`);
  return data;
};

