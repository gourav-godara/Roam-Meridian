import api from "./api";

// Get all expenses
export const getAllExpenses = async () => {
  const response = await api.get("/expenses");
  return response.data;
};

// Get one expense
export const getExpenseById = async (id) => {
  const response = await api.get(`/expenses/${id}`);
  return response.data;
};

// Create expense
export const createExpense = async (expenseData) => {
  const response = await api.post("/expenses", expenseData);
  return response.data;
};

// Update expense
export const updateExpense = async (id, expenseData) => {
  const response = await api.put(`/expenses/${id}`, expenseData);
  return response.data;
};

// Delete expense
export const deleteExpense = async (id) => {
  const response = await api.delete(`/expenses/${id}`);
  return response.data;
};