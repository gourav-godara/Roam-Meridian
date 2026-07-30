const expenseService = require("../services/expense.service");
const notificationService = require("../services/notification.service");
const Trip = require("../models/trip.model");

// Confirms a user id is actually a member (creator or collaborator) of a
// trip — used to validate paidBy/participants so a client can't attribute
// an expense to, or add as a "participant", someone who isn't on the trip.
const isTripMember = (trip, userId) => {
  const id = userId.toString();
  return (
    trip.createdBy.toString() === id ||
    trip.collaborators.some((collaboratorId) => collaboratorId.toString() === id)
  );
};

// Create Expense
const createExpense = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.body.trip);

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found.",
      });
    }

    if (!isTripMember(trip, req.user.id)) {
      return res.status(403).json({
        success: false,
        message: "You must be part of this trip to add an expense to it.",
      });
    }

    // Who actually paid can be specified (e.g. logging an expense someone
    // else covered) — previously this was silently overwritten with the
    // logged-in user's id no matter what the form sent, so the "Paid By"
    // dropdown in AddExpenseModal had no real effect. Default to the
    // logged-in user if nothing was sent, but validate whoever is named
    // is actually a member of this trip.
    const paidBy = req.body.paidBy || req.user.id;

    if (!isTripMember(trip, paidBy)) {
      return res.status(400).json({
        success: false,
        message: "The selected payer must be a member of this trip.",
      });
    }

    const participants = req.body.participants || [];
    const invalidParticipant = participants.find(
      (participantId) => !isTripMember(trip, participantId)
    );

    if (invalidParticipant) {
      return res.status(400).json({
        success: false,
        message: "All participants must be members of this trip.",
      });
    }

    const expense = await expenseService.createExpense({
      ...req.body,
      paidBy,
    });

    const participantIds = participants.filter((id) => id !== req.user.id);

    if (participantIds.length > 0) {
      await notificationService.createNotificationsForUsers(participantIds, {
        type: "expense",
        message: `${expense.paidBy.name} added a new expense "${expense.title}" (₹${expense.amount})`,
        link: "/expenses",
        relatedId: expense._id,
      });
    }

    res.status(201).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    next(error);
  }
};

// Get All Expenses (only ones the user paid or is participating in)
const getAllExpenses = async (req, res, next) => {
  try {
    const expenses = await expenseService.getAllExpenses(req.user.id);

    res.json({
      success: true,
      data: expenses,
    });
  } catch (error) {
    next(error);
  }
};

// Get Expense By ID
const getExpenseById = async (req, res, next) => {
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
    next(error);
  }
};

// Update Expense (only the payer can edit)
const updateExpense = async (req, res, next) => {
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
    next(error);
  }
};

// Delete Expense (only the payer can delete)
const deleteExpense = async (req, res, next) => {
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
    next(error);
  }
};

// Settle Expense (only the payer can mark it settled)
const settleExpense = async (req, res, next) => {
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
      await notificationService.createNotificationsForUsers(participantIds, {
        type: "settlement",
        message: `${expense.paidBy.name} marked "${expense.title}" as settled`,
        link: "/expenses",
        relatedId: expense._id,
      });
    }

    res.json({
      success: true,
      data: updatedExpense,
    });
  } catch (error) {
    next(error);
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
