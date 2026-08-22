const Expense = require("../models/expense.model");
const Trip = require("../models/trip.model");

// paidBy/participants can point at a real User (populated normally via
// refPath) or at a name-only companion embedded in Trip.companions
// (Mongoose can't populate into an embedded subdocument, so those are
// resolved by hand here). Every expense in/out of this service goes
// through this so callers always see a consistent { _id, name } shape
// for both kinds of person.
const attachCompanionNames = async (expense) => {
  if (!expense) return expense;

  const doc = expense.toObject ? expense.toObject() : expense;

  const companionIds = [];
  if (doc.paidByModel === "Companion" && doc.paidBy) {
    companionIds.push(doc.paidBy.toString());
  }
  (doc.participants || []).forEach((p) => {
    if (p.model === "Companion" && p.id) {
      companionIds.push(p.id.toString());
    }
  });

  let companionMap = {};
  if (companionIds.length > 0 && doc.trip) {
    const tripId = doc.trip._id || doc.trip;
    const trip = await Trip.findById(tripId, "companions");
    (trip?.companions || []).forEach((c) => {
      companionMap[c._id.toString()] = c.name;
    });
  }

  if (doc.paidByModel === "Companion") {
    doc.paidBy = {
      _id: doc.paidBy,
      name: companionMap[doc.paidBy?.toString()] || "Unknown companion",
      isCompanion: true,
    };
  }

  doc.participants = (doc.participants || []).map((p) =>
    p.model === "Companion"
      ? {
          _id: p.id,
          name: companionMap[p.id?.toString()] || "Unknown companion",
          isCompanion: true,
        }
      : { _id: p.id?._id || p.id, name: p.id?.name, isCompanion: false }
  );

  return doc;
};

// refPath populate always tries to resolve *every* model name it finds
// across the documents being populated — including "Companion", which
// isn't a real collection (companions live embedded in Trip.companions,
// resolved by hand in attachCompanionNames below). If any document in the
// batch has a Companion-tagged paidBy/participant, a plain refPath
// populate throws "Schema hasn't been registered for model Companion" and
// takes the whole request down with it. Pinning model: "User" here tells
// Mongoose to only ever resolve against the User collection — a
// Companion-tagged id then just comes back unpopulated (still the raw
// ObjectId), which attachCompanionNames already handles.
const populateExpense = (query) =>
  query
    .populate({
      path: "paidBy",
      model: "User",
      select: "name email",
      strictPopulate: false,
    })
    .populate({
      path: "participants.id",
      model: "User",
      select: "name email",
      strictPopulate: false,
    })
    .populate("trip", "title");

// Create Expense
const createExpense = async (expenseData) => {
  const expense = await Expense.create(expenseData);

  const populated = await populateExpense(Expense.findById(expense._id));
  return attachCompanionNames(populated);
};

// Get All Expenses (paid by the user or shared with them)
const getAllExpenses = async (userId) => {
  const expenses = await populateExpense(
    Expense.find({
      $or: [
        { paidBy: userId, paidByModel: "User" },
        { participants: { $elemMatch: { id: userId, model: "User" } } },
      ],
    }).sort({ createdAt: -1 })
  );

  return Promise.all(expenses.map(attachCompanionNames));
};

// Get Expense By ID
const getExpenseById = async (id) => {
  const expense = await populateExpense(Expense.findById(id));
  return attachCompanionNames(expense);
};

// Update Expense
const updateExpense = async (id, data) => {
  const expense = await populateExpense(
    Expense.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    })
  );
  return attachCompanionNames(expense);
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