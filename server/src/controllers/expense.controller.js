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

const isTripCompanion = (trip, companionId) => {
  const id = companionId.toString();
  return trip.companions.some((companion) => companion._id.toString() === id);
};

// Normalizes a "who" field from the request body into { id, model }.
// Accepts either a bare id string (assumed to be a User — keeps old
// clients working) or an explicit { id, type } / { id, model } object,
// which is how the client now tags companions vs. real users.
const normalizePerson = (value) => {
  if (!value) return null;
  if (typeof value === "string") return { id: value, model: "User" };
  const model = value.type === "companion" || value.model === "Companion"
    ? "Companion"
    : "User";
  return { id: value.id || value._id, model };
};

const isValidPerson = (trip, person) =>
  person.model === "Companion"
    ? isTripCompanion(trip, person.id)
    : isTripMember(trip, person.id);

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
    // else covered) — defaults to the logged-in user. The payer can be a
    // real trip member or a name-only companion, but either way must
    // actually belong to this trip.
    const paidByPerson =
      normalizePerson(req.body.paidBy) || { id: req.user.id, model: "User" };

    if (!isValidPerson(trip, paidByPerson)) {
      return res.status(400).json({
        success: false,
        message: "The selected payer must be a member of this trip.",
      });
    }

    const participantPeople = (req.body.participants || [])
      .map(normalizePerson)
      .filter(Boolean);

    const invalidParticipant = participantPeople.find(
      (person) => !isValidPerson(trip, person)
    );

    if (invalidParticipant) {
      return res.status(400).json({
        success: false,
        message: "All participants must be members of this trip.",
      });
    }

    const expense = await expenseService.createExpense({
      ...req.body,
      paidBy: paidByPerson.id,
      paidByModel: paidByPerson.model,
      participants: participantPeople.map((p) => ({
        id: p.id,
        model: p.model,
      })),
    });

    // Only real users can receive in-app notifications — companions have
    // no account to notify.
    const participantUserIds = participantPeople
      .filter((p) => p.model === "User")
      .map((p) => p.id.toString())
      .filter((id) => id !== req.user.id);

    if (participantUserIds.length > 0) {
      await notificationService.createNotificationsForUsers(
        participantUserIds,
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

    const trip = await Trip.findById(expense.trip._id || expense.trip);

    if (!trip || !isTripMember(trip, req.user.id)) {
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

// Update Expense (any member of the trip can edit — not just the payer,
// since the payer might be a companion with no account to log in with)
const updateExpense = async (req, res, next) => {
  try {
    const expense = await expenseService.getExpenseById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    const trip = await Trip.findById(expense.trip._id || expense.trip);

    if (!trip || !isTripMember(trip, req.user.id)) {
      return res.status(403).json({
        success: false,
        message: "You must be part of this trip to edit its expenses.",
      });
    }

    // Re-normalize paidBy/participants the same way createExpense does, in
    // case the edit form changed who's involved — and re-validate against
    // the trip so a companion/user can't be substituted in from outside it.
    const updates = { ...req.body };

    if (updates.paidBy !== undefined) {
      const paidByPerson = normalizePerson(updates.paidBy);
      if (!paidByPerson || !isValidPerson(trip, paidByPerson)) {
        return res.status(400).json({
          success: false,
          message: "The selected payer must be a member of this trip.",
        });
      }
      updates.paidBy = paidByPerson.id;
      updates.paidByModel = paidByPerson.model;
    }

    if (updates.participants !== undefined) {
      const participantPeople = (updates.participants || [])
        .map(normalizePerson)
        .filter(Boolean);
      const invalidParticipant = participantPeople.find(
        (person) => !isValidPerson(trip, person)
      );
      if (invalidParticipant) {
        return res.status(400).json({
          success: false,
          message: "All participants must be members of this trip.",
        });
      }
      updates.participants = participantPeople.map((p) => ({
        id: p.id,
        model: p.model,
      }));
    }

    const updatedExpense = await expenseService.updateExpense(
      req.params.id,
      updates
    );

    res.json({
      success: true,
      data: updatedExpense,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Expense (any member of the trip can delete — not just the payer)
const deleteExpense = async (req, res, next) => {
  try {
    const expense = await expenseService.getExpenseById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    const trip = await Trip.findById(expense.trip._id || expense.trip);

    if (!trip || !isTripMember(trip, req.user.id)) {
      return res.status(403).json({
        success: false,
        message: "You must be part of this trip to delete its expenses.",
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

// Settle Expense (any member of the trip can mark it settled — not just
// the payer, since the payer might be a companion with no account, and
// even when the payer is a real user, any trip member may be the one
// physically confirming the money changed hands)
const settleExpense = async (req, res, next) => {
  try {
    const expense = await expenseService.getExpenseById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    const trip = await Trip.findById(expense.trip._id || expense.trip);

    if (!trip || !isTripMember(trip, req.user.id)) {
      return res.status(403).json({
        success: false,
        message: "You must be part of this trip to settle its expenses.",
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

    // Only notify real users — companions have no account to notify.
    const participantIds = expense.participants
      .filter((p) => !p.isCompanion)
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

