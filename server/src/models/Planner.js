const mongoose = require("mongoose");

const daySchema = new mongoose.Schema(
  {
    day: { type: Number, required: true },
    title: { type: String, required: true },
    arrival: { type: String, default: "" },
    activities: [{ type: String }],
    restaurants: [{ type: String }],
    stay: { type: String, default: "" },
    estimatedCost: { type: Number, default: 0 },
  },
  { _id: false }
);

const budgetBreakdownSchema = new mongoose.Schema(
  {
    stay: { type: Number, default: 0 },
    food: { type: Number, default: 0 },
    transport: { type: Number, default: 0 },
    activities: { type: Number, default: 0 },
  },
  { _id: false }
);

const responseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    days: [daySchema],
    totalBudget: { type: Number, default: 0 },
    budgetBreakdown: budgetBreakdownSchema,
    packingChecklist: [{ type: String }],
    bestTime: { type: String, default: "" },
    weather: { type: String, default: "" },
    localTips: [{ type: String }],
    emergencyNumbers: [
      {
        label: { type: String },
        number: { type: String },
      },
    ],
    nearbyAttractions: [{ type: String }],
  },
  { _id: false }
);

const plannerSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    destination: { type: String, required: true },
    days: { type: Number, required: true },
    budget: { type: Number, required: true },
    travelers: { type: Number, required: true, default: 1 },
    travelStyle: { type: String, default: "Balanced" },
    prompt: { type: String, required: true },
    response: { type: responseSchema, required: true },
    saved: { type: Boolean, default: false },
    favorite: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Planner", plannerSchema);
