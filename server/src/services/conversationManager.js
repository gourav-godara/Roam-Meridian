const Conversation = require("../models/Conversation");
const { buildPrompt } = require("../utils/promptBuilder");
const { generateResponse } = require("./openRouterClient");

const NEW_TRIP_PATTERNS = [
  /\binstead\b/i,
  /\bforget\b/i,
  /\bchange (the )?destination\b/i,
  /\banother trip\b/i,
  /\ba new trip\b/i,
  /\bstart over\b/i,
  /\bswitch to\b/i,
  /\bdon'?t want to go to\b/i,
  /\bnot .{0,20}anymore\b/i,
  /\bplan a (new )?trip to\b/i,
  /\bi want to (go to|visit)\b.{0,40}\binstead\b/i,
];

function isExplicitNewTripRequest(message) {
  return NEW_TRIP_PATTERNS.some((pattern) => pattern.test(message));
}

const RECENT_MESSAGE_WINDOW = 6;

async function getOrCreateActiveConversation(userId) {
  let conversation = await Conversation.findOne({
    user: userId,
    status: "active",
  }).sort({ updatedAt: -1 });
  if (!conversation) {
    conversation = await Conversation.create({ user: userId });
  }
  return conversation;
}

function getRecentMessages(conversation) {
  return conversation.messages
    .filter((m) => !m.content.includes("Sorry, I had trouble processing"))
    .slice(-3)
    .map((m) => ({
      role: m.role,
      content: m.content,
    }));
}

function mergeUserTripParams(existing, tripParams) {
  const base = existing.toObject?.() ?? existing;
  if (!tripParams) return base;

  const merged = { ...base };
  if (tripParams.destination !== undefined)
    merged.destination = tripParams.destination;
  if (tripParams.days !== undefined) merged.duration = tripParams.days;
  if (tripParams.budget !== undefined) merged.budget = tripParams.budget;
  if (tripParams.travelers !== undefined)
    merged.travelers = tripParams.travelers;
  if (tripParams.travelStyle !== undefined)
    merged.travelStyle = tripParams.travelStyle;

  return merged;
}

function mergeTripContext(existing, aiTrip) {
  const base = existing.toObject?.() ?? existing;
  if (!aiTrip) return base;

  return {
    ...base,
    destination: aiTrip.destination ?? base.destination,
    duration: aiTrip.days?.length ?? base.duration,
    budget: aiTrip.budget ?? base.budget,
    travelers: base.travelers,
    travelStyle: base.travelStyle,
  };
}

function applyItineraryUpdate(currentTrip, dayNumber, newDay) {
  if (!currentTrip || !currentTrip.days) return currentTrip;
  const updatedDays = currentTrip.days.map((d) =>
    d.dayNumber === dayNumber ? newDay : d,
  );
  return { ...currentTrip, days: updatedDays };
}

function nextPlanningStage(currentStage, responseType) {
  switch (responseType) {
    case "clarification":
      return "clarifying";
    case "generate":
      return "generated";
    case "edit":
      return "editing";
    case "chat":
    default:
      return currentStage === "idle" ? "idle" : currentStage;
  }
}

async function handleUserMessage(
  userId,
  { conversationId, message, tripParams },
) {
  console.log("========== NEW MESSAGE ==========");
  console.log("User:", message);

  const conversation = conversationId
    ? await Conversation.findOne({
        _id: conversationId,
        user: userId,
        status: "active",
      })
    : await getOrCreateActiveConversation(userId);

  console.log("Conversation loaded");

  if (!conversation) {
    const err = new Error("Active conversation not found");
    err.statusCode = 404;
    throw err;
  }

  if (tripParams) {
    conversation.tripContext = mergeUserTripParams(
      conversation.tripContext,
      tripParams,
    );
  }

  conversation.messages.push({
    role: "user",
    content: message,
  });

  const forceNewTrip =
    isExplicitNewTripRequest(message) ||
    /\bplan\b/i.test(message) ||
    /\bitinerary\b/i.test(message) ||
    /\btrip\b/i.test(message) ||
    /\bvisit\b/i.test(message);

  if (forceNewTrip) {
    console.log("Starting a NEW trip...");
    conversation.currentTrip = null;
  }

  console.log("Building prompt...");

  const { systemPrompt, userPrompt } = buildPrompt({
    tripContext: conversation.tripContext,
    currentTrip: conversation.currentTrip,
    recentMessages: getRecentMessages(conversation),
    latestMessage: message,
  });

  console.log("Calling Ai-Assistant...");

  console.log("========== SYSTEM PROMPT ==========");
  console.log(systemPrompt);

  console.log("========== USER PROMPT ==========");
  console.log(userPrompt);

  console.log("========== CURRENT TRIP ==========");
  console.log(JSON.stringify(conversation.currentTrip, null, 2));

  const aiResponse = await generateResponse(systemPrompt, userPrompt);

  console.log("========== AI RESPONSE ==========");
  console.dir(aiResponse, { depth: null });

  console.log("TYPE:", aiResponse.type);
  console.log("HAS TRIP:", !!aiResponse.trip);

  if (aiResponse.type === "generate" && aiResponse.trip) {
    console.log("Updating trip...");
    conversation.currentTrip = aiResponse.trip;

    console.log("CURRENT TRIP AFTER UPDATE:");
    console.dir(conversation.currentTrip, { depth: null });

    conversation.tripContext = mergeTripContext(
      conversation.tripContext,
      aiResponse.trip,
    );
  } else if (
    aiResponse.type === "edit" &&
    aiResponse.scope === "day" &&
    aiResponse.day
  ) {
    console.log("Editing day...");
    conversation.currentTrip = applyItineraryUpdate(
      conversation.currentTrip,
      aiResponse.dayNumber,
      aiResponse.day,
    );
  }

  console.log("Saving conversation...");

  conversation.planningStage = nextPlanningStage(
    conversation.planningStage,
    aiResponse.type,
  );

  conversation.messages.push({
    role: "assistant",
    content: aiResponse.message,
    responseType: aiResponse.type,
    tripSnapshot:
      aiResponse.type === "generate" || aiResponse.type === "edit"
        ? conversation.currentTrip
        : null,
  });

  await conversation.save();

  console.log("BEFORE SAVE:");
  console.log("currentTrip =", conversation.currentTrip ? "EXISTS" : "NULL");

  console.log("Conversation saved");
  console.log("==========================");

  const savedConversation = await Conversation.findById(conversation._id);

  return savedConversation;
}

async function regenerate(userId, conversationId, { scope, dayNumber }) {
  const conversation = await Conversation.findOne({
    _id: conversationId,
    user: userId,
    status: "active",
  });
  if (!conversation) {
    const err = new Error("Active conversation not found");
    err.statusCode = 404;
    throw err;
  }

  const instruction =
    scope === "day"
      ? `Regenerate day ${dayNumber} of the current trip with fresh alternatives.`
      : "Regenerate the entire trip with fresh alternatives, keeping the same destination, budget, and duration.";

  return handleUserMessage(userId, {
    conversationId: conversation._id,
    message: instruction,
  });
}

async function getActiveConversation(userId) {
  return Conversation.findOne({ user: userId, status: "active" }).sort({
    updatedAt: -1,
  });
}

module.exports = {
  getOrCreateActiveConversation,
  handleUserMessage,
  regenerate,
  getActiveConversation,
};
