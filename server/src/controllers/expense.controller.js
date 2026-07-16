const expenseService = require("../services/expense.service");

// Create Expense
const createExpense = async (req, res) => {
  try {
    const expense = await expenseService.createExpense({
  ...req.body,
  paidBy: req.user.id,
});

    res.status(201).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Expenses
const getAllExpenses = async (req, res) => {
  try {
    const expenses = await expenseService.getAllExpenses(req.user.id);

    res.json({
      success: true,
      data: expenses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Expense By ID
const getExpenseById = async (req, res) => {
  try {
    const expense = await expenseService.getExpenseById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    res.json({
      success: true,
      data: expense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Expense
const updateExpense = async (req, res) => {
  try {
    const expense = await expenseService.getExpenseById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    if (expense.paidBy._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You can only modify your own expenses.",
      });
    }

    const updatedExpense = await expenseService.updateExpense(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      data: updatedExpense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Expense
const deleteExpense = async (req, res) => {
  try {
    const expense = await expenseService.getExpenseById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    if (expense.paidBy._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You can only modify your own expenses.",
      });
    }
    await expenseService.deleteExpense(req.params.id);

    res.json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
};