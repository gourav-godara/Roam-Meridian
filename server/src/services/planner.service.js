const Planner = require("../models/Planner");
const conversationManager = require("./conversationManager");

async function sendMessage(userId, { conversationId, message }) {
  return conversationManager.handleUserMessage(userId, {
    conversationId,
    message,
  });
}

async function regenerateConversation(
  userId,
  conversationId,
  { scope, dayNumber },
) {
  return conversationManager.regenerate(userId, conversationId, {
    scope,
    dayNumber,
  });
}

async function getActiveConversation(userId) {
  return conversationManager.getActiveConversation(userId);
}

async function savePlan(userId, planId) {
  const plan = await Planner.findOneAndUpdate(
    { _id: planId, user: userId },
    { saved: true },
    { new: true },
  );
  if (!plan) {
    const err = new Error("Plan not found");
    err.statusCode = 404;
    throw err;
  }
  return plan;
}

async function duplicatePlan(userId, planId) {
  const original = await Planner.findOne({ _id: planId, user: userId }).lean();
  if (!original) {
    const err = new Error("Plan not found");
    err.statusCode = 404;
    throw err;
  }
  delete original._id;
  delete original.createdAt;
  delete original.updatedAt;

  const copy = await Planner.create({
    ...original,
    response: {
      ...original.response,
      title: `${original.response.title} (Copy)`,
    },
    saved: false,
    favorite: false,
  });
  return copy;
}

async function getHistory(userId, { search } = {}) {
  const query = { user: userId };
  if (search) {
    query.destination = { $regex: search, $options: "i" };
  }
  return Planner.find(query).sort({ createdAt: -1 });
}

async function getPlanById(userId, planId) {
  const plan = await Planner.findOne({ _id: planId, user: userId });
  if (!plan) {
    const err = new Error("Plan not found");
    err.statusCode = 404;
    throw err;
  }
  return plan;
}

async function updatePlan(userId, planId, updates) {
  const allowed = ["destination", "days", "budget", "travelers", "travelStyle"];
  const safeUpdates = {};
  allowed.forEach((key) => {
    if (updates[key] !== undefined) safeUpdates[key] = updates[key];
  });

  const plan = await Planner.findOneAndUpdate(
    { _id: planId, user: userId },
    safeUpdates,
    { new: true },
  );
  if (!plan) {
    const err = new Error("Plan not found");
    err.statusCode = 404;
    throw err;
  }
  return plan;
}

async function deletePlan(userId, planId) {
  const plan = await Planner.findOneAndDelete({ _id: planId, user: userId });
  if (!plan) {
    const err = new Error("Plan not found");
    err.statusCode = 404;
    throw err;
  }
  return plan;
}

async function favoritePlan(userId, planId) {
  const plan = await Planner.findOne({ _id: planId, user: userId });
  if (!plan) {
    const err = new Error("Plan not found");
    err.statusCode = 404;
    throw err;
  }
  plan.favorite = !plan.favorite;
  await plan.save();
  return plan;
}

module.exports = {
  sendMessage,
  regenerateConversation,
  getActiveConversation,
  savePlan,
  duplicatePlan,
  getHistory,
  getPlanById,
  updatePlan,
  deletePlan,
  favoritePlan,
};
