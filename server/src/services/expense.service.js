const Expense = require("../models/expense.model");

// Create Expense
const createExpense = async (expenseData) => {
  return await Expense.create(expenseData);
};

// Get All Expenses
const getAllExpenses = async (userId) => {
  return await Expense.find({
    $or: [
      { paidBy: userId },
      { participants: userId },
    ],
  })
    .populate("paidBy", "name email")
    .populate("participants", "name email")
    .populate("itinerary", "title")
    .sort({ createdAt: -1 });
};

// Get Expense By ID
const getExpenseById = async (id) => {
  return await Expense.findById(id)
    .populate("paidBy", "name email")
    .populate("participants", "name email");
};

// Update Expense
const updateExpense = async (id, data) => {
  return await Expense.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

// Delete Expense
const deleteExpense = async (id) => {
  return await Expense.findByIdAndDelete(id);
};

module.exports = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
};