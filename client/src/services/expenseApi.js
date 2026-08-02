import api from "./api";

// Get all expenses
export const getExpenses = async () => {
  const { data } = await api.get("/expenses");
  return data;
};

// Get expense by ID
export const getExpenseById = async (id) => {
  const { data } = await api.get(`/expenses/${id}`);
  return data;
};

// Create expense
export const createExpense = async (expenseData) => {
  const { data } = await api.post("/expenses", expenseData);
  return data;
};

// Update expense
export const updateExpense = async (id, expenseData) => {
  const { data } = await api.put(`/expenses/${id}`, expenseData);
  return data;
};

// Delete expense
export const deleteExpense = async (id) => {
  const { data } = await api.delete(`/expenses/${id}`);
  return data;
};

// Mark expense as settled
export const settleExpense = async (id) => {
  const { data } = await api.patch(`/expenses/${id}/settle`);
  return data;
};
