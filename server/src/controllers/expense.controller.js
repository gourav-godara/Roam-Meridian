const expenseService = require("../services/expense.service");
const notificationService = require("../services/notification.service");

// Create Expense
const createExpense = async (req, res) => {
  try {
    const expense = await expenseService.createExpense({
      ...req.body,
      paidBy: req.user.id,
    });

    const participantIds = (req.body.participants || []).filter(
      (id) => id !== req.user.id
    );

    if (participantIds.length > 0) {
      await notificationService.createNotificationsForUsers(
        participantIds,
        {
          type: "expense",
          message: `${expense.paidBy.name} added a new expense "${expense.title}" (₹${expense.amount})`,
          link: "/expenses",
          relatedId: expense._id,
        }
      );
    }

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

// Get All Expenses (only ones the user paid or is participating in)
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

    const isPayer = expense.paidBy._id.toString() === req.user.id;
    const isParticipant = expense.participants.some(
      (p) => p._id.toString() === req.user.id
    );

    if (!isPayer && !isParticipant) {
      return res.status(403).json({
        success: false,
        message: "Access denied.",
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

// Update Expense (only the payer can edit)
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

// Delete Expense (only the payer can delete)
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
        message: "You can only delete your own expenses.",
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

// Settle Expense (only the payer can mark it settled)
const settleExpense = async (req, res) => {
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
        message: "Only the payer can settle this expense.",
      });
    }

    if (expense.status === "Settled") {
      return res.status(400).json({
        success: false,
        message: "Expense is already settled.",
      });
    }

    const updatedExpense = await expenseService.updateExpense(req.params.id, {
      status: "Settled",
    });

    const participantIds = expense.participants
      .map((p) => p._id.toString())
      .filter((id) => id !== req.user.id);

    if (participantIds.length > 0) {
      await notificationService.createNotificationsForUsers(
        participantIds,
        {
          type: "settlement",
          message: `${expense.paidBy.name} marked "${expense.title}" as settled`,
          link: "/expenses",
          relatedId: expense._id,
        }
      );
    }

    res.json({
      success: true,
      data: updatedExpense,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  settleExpense,
};