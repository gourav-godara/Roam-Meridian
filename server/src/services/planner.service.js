const Planner = require("../models/Planner");
const { buildPrompt } = require("../utils/promptBuilder");

// ---- Mock AI generation --------------------------------------------------
// Swap the body of this function for a real OpenAI/Gemini/Claude call later.
// Controller and everything downstream is agnostic to how this is implemented.
async function callAIModel(prompt, { destination, days, budget, travelers }) {
  const perDayBudget = Math.round(budget / days);

  const generatedDays = Array.from({ length: days }, (_, i) => {
    const dayNum = i + 1;
    const isFirst = dayNum === 1;
    const isLast = dayNum === days;

    return {
      day: dayNum,
      title: isFirst ? `Arrival in ${destination}` : isLast ? "Departure" : `Exploring ${destination}`,
      arrival: isFirst ? `Check-in and settle in at ${destination}` : "",
      activities: isFirst
        ? ["Check-in & rest", `Evening walk around ${destination}`]
        : isLast
        ? ["Leisure morning", "Pack and check out"]
        : ["Morning sightseeing", "Local market visit", "Sunset viewpoint"],
      restaurants: [`${destination} Kitchen`, "The Corner Cafe"],
      stay: isLast ? "" : `Recommended stay in ${destination}`,
      estimatedCost: perDayBudget,
    };
  });

  return {
    title: `${destination} ${travelers > 1 ? "Group" : "Solo"} Trip`,
    days: generatedDays,
    totalBudget: budget,
    budgetBreakdown: {
      stay: Math.round(budget * 0.35),
      food: Math.round(budget * 0.25),
      transport: Math.round(budget * 0.2),
      activities: Math.round(budget * 0.2),
    },
    packingChecklist: [
      "Comfortable walking shoes",
      "Weather-appropriate clothing",
      "Power bank & charger",
      "ID proof & travel documents",
      "Basic medication kit",
    ],
    bestTime: "October - March",
    weather: "Pleasant, 15-25°C",
    localTips: [
      "Carry cash for local markets, cards aren't always accepted.",
      "Book accommodation in advance during peak season.",
    ],
    emergencyNumbers: [
      { label: "Police", number: "100" },
      { label: "Ambulance", number: "108" },
      { label: "Tourist Helpline", number: "1363" },
    ],
    nearbyAttractions: [`${destination} Viewpoint`, `${destination} Old Town`, `${destination} Market`],
  };
}
// ---------------------------------------------------------------------------

async function generatePlan(userId, input) {
  const prompt = buildPrompt(input);
  const response = await callAIModel(prompt, input);

  const plan = await Planner.create({
    user: userId,
    destination: input.destination,
    days: input.days,
    budget: input.budget,
    travelers: input.travelers || 1,
    travelStyle: input.travelStyle || "Balanced",
    prompt,
    response,
    saved: false,
    favorite: false,
  });

  return plan;
}

async function regenerateDay(userId, planId, dayNumber) {
  const plan = await Planner.findOne({ _id: planId, user: userId });
  if (!plan) {
    const err = new Error("Plan not found");
    err.statusCode = 404;
    throw err;
  }

  const perDayBudget = Math.round(plan.budget / plan.days);
  const newDay = {
    day: dayNumber,
    title: `Regenerated Day ${dayNumber} in ${plan.destination}`,
    arrival: "",
    activities: ["Alternate local experience", "Hidden gem exploration", "Local food tasting"],
    restaurants: [`${plan.destination} Bistro`, "Riverside Diner"],
    stay: `Alternate stay option in ${plan.destination}`,
    estimatedCost: perDayBudget,
  };

  plan.response.days = plan.response.days.map((d) => (d.day === dayNumber ? newDay : d));
  await plan.save();
  return plan;
}

async function savePlan(userId, planId) {
  const plan = await Planner.findOneAndUpdate(
    { _id: planId, user: userId },
    { saved: true },
    { new: true }
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
    response: { ...original.response, title: `${original.response.title} (Copy)` },
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
    { new: true }
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
  generatePlan,
  regenerateDay,
  savePlan,
  duplicatePlan,
  getHistory,
  getPlanById,
  updatePlan,
  deletePlan,
  favoritePlan,
};
