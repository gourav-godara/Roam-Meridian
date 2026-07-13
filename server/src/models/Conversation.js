const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  role: { type: String, enum: ["user", "assistant"], required: true },
  content: { type: String, required: true },
  responseType: {
    type: String,
    enum: ["chat", "clarification", "generate", "edit", null],
    default: null,
  },
  tripSnapshot: { type: mongoose.Schema.Types.Mixed, default: null },
  createdAt: { type: Date, default: Date.now },
});

const tripContextSchema = new mongoose.Schema(
  {
    destination: { type: String, default: null },
    duration: { type: Number, default: null },
    budget: { type: Number, default: null },
    travelers: { type: Number, default: null },
    travelStyle: { type: String, default: null },
    interests: [{ type: String }],
    constraints: [{ type: String }],
    preferences: { type: mongoose.Schema.Types.Mixed, default: {} },
    conversationSummary: { type: String, default: "" },
  },
  { _id: false }
);

const conversationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    status: { type: String, enum: ["active", "saved", "abandoned"], default: "active" },
    planningStage: {
      type: String,
      enum: ["idle", "clarifying", "planning", "generated", "editing", "saved"],
      default: "idle",
    },
    messages: [messageSchema],
    tripContext: { type: tripContextSchema, default: () => ({}) },
    currentTrip: { type: mongoose.Schema.Types.Mixed, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", conversationSchema);
