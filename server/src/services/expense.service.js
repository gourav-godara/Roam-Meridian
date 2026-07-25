const Expense = require("../models/expense.model");

// Create Expense
const createExpense = async (expenseData) => {
  const expense = await Expense.create(expenseData);

  return await Expense.findById(expense._id)
    .populate("paidBy", "name email")
    .populate("participants", "name email")
    .populate("trip", "title")
};

// Get All Expenses (paid by the user or shared with them)
const getAllExpenses = async (userId) => {
  return await Expense.find({
    $or: [{ paidBy: userId }, { participants: userId }],
  })
    .populate("paidBy", "name email")
    .populate("participants", "name email")
    .populate("trip", "title")
    .sort({ createdAt: -1 });
};

// Get Expense By ID
const getExpenseById = async (id) => {
  return await Expense.findById(id)
    .populate("paidBy", "name email")
    .populate("participants", "name email")
    .populate("trip", "title")
};

// Update Expense
const updateExpense = async (id, data) => {
  return await Expense.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  })
    .populate("paidBy", "name email")
    .populate("participants", "name email")
    .populate("trip", "title")
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