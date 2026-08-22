const Expense = require("../models/expense.model");
const Trip = require("../models/trip.model");
const User = require("../models/user.model");

// paidBy/participants can each point at a real User or at a name-only
// companion embedded in Trip.companions. Mongoose populate can't safely
// handle this mix: refPath tries to resolve every model name it sees
// (throwing on "Companion", which isn't a real collection), and pinning
// model: "User" avoids the crash but silently nulls out any
// Companion-tagged id (populate always overwrites the field with its
// query result, including a "not found" null). So instead of populate,
// every person (User or Companion) on an expense is resolved by hand
// here, in one batched pass — this is the single place that shapes
// paidBy/participants into the consistent { _id, name, isCompanion }
// callers rely on.
const resolvePeople = async (expenses) => {
  const list = Array.isArray(expenses) ? expenses : [expenses];
  const docs = list.filter(Boolean).map((e) => (e.toObject ? e.toObject() : e));

  const userIds = new Set();
  const companionIds = new Set();
  const tripIds = new Set();

  docs.forEach((doc) => {
    if (doc.paidByModel === "Companion" && doc.paidBy) {
      companionIds.add(doc.paidBy.toString());
    } else if (doc.paidBy) {
      userIds.add(doc.paidBy.toString());
    }
    (doc.participants || []).forEach((p) => {
      const id = p.id?._id || p.id;
      if (!id) return;
      if (p.model === "Companion") {
        companionIds.add(id.toString());
      } else {
        userIds.add(id.toString());
      }
    });
    if (companionIds.size > 0) {
      const tripId = doc.trip?._id || doc.trip;
      if (tripId) tripIds.add(tripId.toString());
    }
  });

  const [users, trips] = await Promise.all([
    userIds.size > 0
      ? User.find({ _id: { $in: [...userIds] } }, "name email")
      : [],
    tripIds.size > 0
      ? Trip.find({ _id: { $in: [...tripIds] } }, "companions")
      : [],
  ]);

  const userById = {};
  users.forEach((u) => {
    userById[u._id.toString()] = { _id: u._id, name: u.name, email: u.email };
  });

  const companionById = {};
  trips.forEach((trip) => {
    (trip.companions || []).forEach((c) => {
      companionById[c._id.toString()] = c.name;
    });
  });

  const resolvePerson = (id, model) => {
    const idStr = id?.toString();
    if (!idStr) return null;
    if (model === "Companion") {
      return {
        _id: id,
        name: companionById[idStr] || "Unknown companion",
        isCompanion: true,
      };
    }
    return userById[idStr]
      ? { ...userById[idStr], isCompanion: false }
      : { _id: id, name: "Unknown user", isCompanion: false };
  };

  const resolved = docs.map((doc) => ({
    ...doc,
    paidBy: doc.paidBy ? resolvePerson(doc.paidBy, doc.paidByModel) : null,
    participants: (doc.participants || []).map((p) =>
      resolvePerson(p.id?._id || p.id, p.model)
    ),
  }));

  return Array.isArray(expenses) ? resolved : resolved[0];
};

const populateExpense = (query) => query.populate("trip", "title");

// Create Expense
const createExpense = async (expenseData) => {
  const expense = await Expense.create(expenseData);

  const populated = await populateExpense(Expense.findById(expense._id));
  return resolvePeople(populated);
};

// Get All Expenses: ones the user paid, is a participant in, or created
// the trip for (so an expense split entirely between companions — no
// real user attached as payer or participant — is still visible to
// whoever created the trip, instead of vanishing from everyone's list).
const getAllExpenses = async (userId) => {
  const myTripIds = await Trip.find({ createdBy: userId }, "_id");

  const expenses = await populateExpense(
    Expense.find({
      $or: [
        { paidBy: userId, paidByModel: "User" },
        { participants: { $elemMatch: { id: userId, model: "User" } } },
        { trip: { $in: myTripIds.map((t) => t._id) } },
      ],
    }).sort({ createdAt: -1 })
  );

  return resolvePeople(expenses);
};

// Get Expense By ID
const getExpenseById = async (id) => {
  const expense = await populateExpense(Expense.findById(id));
  return resolvePeople(expense);
};

// Update Expense
const updateExpense = async (id, data) => {
  const expense = await populateExpense(
    Expense.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    })
  );
  return resolvePeople(expense);
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