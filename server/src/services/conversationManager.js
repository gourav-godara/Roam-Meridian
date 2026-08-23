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
  /\bi want to (go to|visit|travel to)\b.+\binstead\b/i,
];

const TRAVEL_KEYWORDS =
  /\b(trip|travel|vacation|holiday|itinerary|destination|visit|tour|tourism|explore|adventure|backpack|honeymoon|getaway|journey|flight|hotel|stay|accommodation|budget|beach|mountain|sightseeing|weekend|plan|places?|days?)\b/i;

const GREETING_PATTERN =
  /^\s*(hi+|hello+|hey+|hola|yo|sup|good\s?(morning|evening|afternoon))[\s!.,]*$/i;

const DAY_LIMIT = 2;

const OFF_TOPIC_REPLY =
  "I'm your travel planning assistant, so I can only help with trips, destinations, and travel advice. Ask me something about your next trip and I'll get started! 😊";

function isExplicitNewTripRequest(message) {
  return NEW_TRIP_PATTERNS.some((pattern) => pattern.test(message));
}

function isTravelPlanningRequest(message) {
  return (
    /\b(plan|create|make|start|organize)\b.*\b(trip|itinerary|vacation|holiday|getaway)\b/i.test(
      message,
    ) ||
    /\b(i want to|i'd like to|i would like to|let'?s)\b.*\b(visit|travel to|go to)\b/i.test(
      message,
    )
  );
}

function isTravelRelated(message, conversation) {
  if (conversation.tripContext?.destination) return true;
  if (conversation.currentTrip) return true;
  if (GREETING_PATTERN.test(message)) return true;

  return TRAVEL_KEYWORDS.test(message);
}

function extractRequestedDays(message) {
  const numericMatch = message.match(/\b(\d+)\s*[- ]?\s*days?\b/i);

  if (numericMatch) {
    return parseInt(numericMatch[1], 10);
  }

  const wordDays = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
  };

  const wordMatch = message.match(
    /\b(one|two|three|four|five|six|seven|eight|nine|ten)\s*[- ]?\s*days?\b/i,
  );

  if (wordMatch) {
    return wordDays[wordMatch[1].toLowerCase()];
  }

  return null;
}

function dayLimitReply(requestedDays) {
  return `Sorry, I can only plan trips up to ${DAY_LIMIT} days for now. You asked for ${requestedDays} days. Would you like a ${DAY_LIMIT}-day itinerary instead?`;
}

async function pushCannedReply(conversation, content) {
  conversation.messages.push({
    role: "assistant",
    content,
    responseType: "chat",
    tripSnapshot: null,
  });

  await conversation.save();

  return Conversation.findById(conversation._id);
}

async function getOrCreateActiveConversation(userId) {
  let conversation = await Conversation.findOne({
    user: userId,
    status: "active",
  }).sort({ updatedAt: -1 });

  if (!conversation) {
    conversation = await Conversation.create({
      user: userId,
    });
  }

  return conversation;
}

function getRecentMessages(conversation) {
  return conversation.messages
    .filter(
      (m) =>
        !m.content.includes("Sorry, I had trouble processing"),
    )
    .slice(-3)
    .map((m) => ({
      role: m.role,
      content: m.content,
    }));
}

function mergeUserTripParams(existing, tripParams) {
  const base = existing?.toObject?.() ?? existing ?? {};

  if (!tripParams) return base;

  const merged = { ...base };

  if (tripParams.destination !== undefined) {
    merged.destination = tripParams.destination;
  }

  if (tripParams.days !== undefined) {
    merged.duration = tripParams.days;
  }

  if (tripParams.budget !== undefined) {
    merged.budget = tripParams.budget;
  }

  if (tripParams.travelers !== undefined) {
    merged.travelers = tripParams.travelers;
  }

  if (tripParams.travelStyle !== undefined) {
    merged.travelStyle = tripParams.travelStyle;
  }

  return merged;
}

function mergeTripContext(existing, aiTrip) {
  const base = existing?.toObject?.() ?? existing ?? {};

  if (!aiTrip) return base;

  return {
    ...base,
    destination: aiTrip.destination ?? base.destination,
    duration: aiTrip.days?.length ?? base.duration,
    budget: aiTrip.budget ?? base.budget,
    travelers: aiTrip.travelers ?? base.travelers,
    travelStyle: aiTrip.travelStyle ?? base.travelStyle,
  };
}

function applyItineraryUpdate(currentTrip, dayNumber, newDay) {
  if (!currentTrip || !currentTrip.days) {
    return currentTrip;
  }

  const updatedDays = currentTrip.days.map((day) =>
    day.dayNumber === dayNumber ? newDay : day,
  );

  return {
    ...currentTrip,
    days: updatedDays,
  };
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

  if (!conversation) {
    const err = new Error("Active conversation not found");
    err.statusCode = 404;
    throw err;
  }

  /*
   * Determine whether this is a genuinely new planning request BEFORE
   * modifying the existing trip context.
   */
  const forceNewTrip =
    isExplicitNewTripRequest(message) ||
    isTravelPlanningRequest(message);

  /*
   * A new trip must not inherit the previous trip's destination,
   * budget, duration, travelers, etc.
   *
   * This is important for your requirement that every new trip
   * collects its information dynamically.
   */
  if (forceNewTrip) {
    console.log("Starting a NEW trip...");

    conversation.currentTrip = null;
    conversation.tripContext = {};
    conversation.planningStage = "idle";
  }

  /*
   * Apply explicitly supplied frontend parameters AFTER resetting
   * the old trip context.
   *
   * This is important when AI Planner is opened from an Explore page
   * with a destination already selected.
   */
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

  /*
   * Domain guard.
   * This happens before OpenRouter, so unrelated requests do not
   * consume API tokens.
   */
  if (!isTravelRelated(message, conversation)) {
    console.log(
      "Off-topic message detected. No AI API call.",
    );

    return pushCannedReply(
      conversation,
      OFF_TOPIC_REPLY,
    );
  }

  /*
   * Day-limit guard.
   * Check the user's actual message first.
   */
  const requestedDays = extractRequestedDays(message);

  if (requestedDays !== null && requestedDays > DAY_LIMIT) {
    console.log(
      `Requested ${requestedDays} days. Limit is ${DAY_LIMIT}.`,
    );

    return pushCannedReply(
      conversation,
      dayLimitReply(requestedDays),
    );
  }

  /*
   * Also protect against frontend tripParams containing > 2 days.
   */
  const requestedContextDays = Number(
    conversation.tripContext?.duration,
  );

  if (
    Number.isFinite(requestedContextDays) &&
    requestedContextDays > DAY_LIMIT
  ) {
    console.log(
      `Trip context requested ${requestedContextDays} days. Limit is ${DAY_LIMIT}.`,
    );

    return pushCannedReply(
      conversation,
      dayLimitReply(requestedContextDays),
    );
  }

  console.log("Building prompt...");

  const { systemPrompt, userPrompt } = buildPrompt({
    tripContext: conversation.tripContext,
    currentTrip: conversation.currentTrip,
    recentMessages: getRecentMessages(conversation),
    latestMessage: message,
  });

  console.log("Calling AI assistant...");

  const aiResponse = await generateResponse(
    systemPrompt,
    userPrompt,
  );

  console.log("========== AI RESPONSE ==========");
  console.dir(aiResponse, { depth: null });

  if (
    aiResponse.type === "generate" &&
    aiResponse.trip
  ) {
    conversation.currentTrip = aiResponse.trip;

    conversation.tripContext = mergeTripContext(
      conversation.tripContext,
      aiResponse.trip,
    );
  } else if (
    aiResponse.type === "edit" &&
    aiResponse.scope === "day" &&
    aiResponse.day
  ) {
    conversation.currentTrip = applyItineraryUpdate(
      conversation.currentTrip,
      aiResponse.dayNumber,
      aiResponse.day,
    );
  }

  conversation.planningStage = nextPlanningStage(
    conversation.planningStage,
    aiResponse.type,
  );

  conversation.messages.push({
    role: "assistant",
    content: aiResponse.message,
    responseType: aiResponse.type,
    tripSnapshot:
      aiResponse.type === "generate" ||
      aiResponse.type === "edit"
        ? conversation.currentTrip
        : null,
  });

  await conversation.save();

  console.log(
    "Conversation saved:",
    conversation._id.toString(),
  );

  return Conversation.findById(conversation._id);
}

async function regenerate(
  userId,
  conversationId,
  { scope, dayNumber },
) {
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
      : "Regenerate the entire trip with fresh alternatives, keeping the same destination, budget, duration, travelers, and travel style.";

  return handleUserMessage(userId, {
    conversationId: conversation._id,
    message: instruction,
  });
}

async function getActiveConversation(userId) {
  return Conversation.findOne({
    user: userId,
    status: "active",
  }).sort({
    updatedAt: -1,
  });
}

module.exports = {
  getOrCreateActiveConversation,
  handleUserMessage,
  regenerate,
  getActiveConversation,
};
