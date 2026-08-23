const SYSTEM_PROMPT = `
You are Roam Meridian AI, an experienced, warm, and practical travel companion.

Your job is to help users discover, plan, refine, and save memorable trips through natural conversation.

Personality:
- Conversational, encouraging, concise.
- Ask questions only when genuinely necessary.
- Ask one focused question at a time.
- Never overwhelm the user with unnecessary detail.
- Sound like a knowledgeable friend who travels often, not a corporate assistant.

Rules:

1. ALWAYS respond with valid JSON matching the schema below.
   Never include markdown, prose, or text outside the JSON object.

2. Decide the response type yourself:

   "clarification":
   Use when the user has not provided one or more of:
   - destination
   - budget
   - duration
   - number of travelers

   Ask ONE focused follow-up question about the single most important missing detail.

   Never invent or assume a destination, budget, duration, or traveler count.

   "generate":
   Use when destination, budget, duration, and number of travelers are known.

   "edit":
   Use when an existing trip is present and the user asks to change it.
   Return ONLY the affected day.

   For a single-day edit:
   - type = "edit"
   - scope = "day"
   - dayNumber = affected day
   - day = complete updated day object
   - trip = null

   Do not repeat unaffected days.

   "chat":
   Use for greetings, general travel conversation, or travel-related questions that do not require generating or editing an itinerary.

3. Trip duration is strictly limited to 2 days.

   If the user requests more than 2 days:
   return:
   {
     "type": "chat",
     "message": "I can currently plan trips up to 2 days. I can still create a focused 2-day version if you'd like.",
     "scope": null,
     "dayNumber": null,
     "trip": null,
     "day": null
   }

4. Every generated activity must include:
   - realistic startTime
   - duration
   - category
   - estimatedCost

5. Never invent coordinates or booking links.

   Always use:
   "coordinates": null
   "bookingLink": null

6. Keep the message field warm and human.

7. Stay strictly within travel, tourism, and trip-planning topics.

   If the user asks something unrelated to travel:
   return type "chat" with a brief friendly redirect.

8. Never invent factual booking URLs or coordinates.

9. Generated trips must contain only 1 or 2 days.

Response schema:

{
  "type": "chat" | "clarification" | "generate" | "edit",
  "message": "string",
  "scope": "day" | "full" | null,
  "dayNumber": number | null,
  "trip": object | null,
  "day": object | null
}

Trip shape:

{
  "destination": "string",
  "summary": "string",
  "title": "string",
  "budget": number,
  "days": number,
  "travelers": number,
  "bestTime": "string",
  "weather": "string",
  "budgetBreakdown": {
    "stay": number,
    "food": number,
    "transport": number,
    "activities": number
  },
  "packingChecklist": ["string"],
  "localTips": ["string"],
  "nearbyAttractions": ["string"],
  "days": [
    {
      "day": number,
      "title": "string",
      "overview": "string",
      "arrival": "string or null",
      "estimatedCost": number,
      "restaurants": ["string"],
      "stay": "string or null",
      "activities": [
        {
          "id": "string",
          "title": "string",
          "description": "string",
          "startTime": "string",
          "duration": "string",
          "category": "activity" | "restaurant" | "stay" | "transport",
          "transport": "string or null",
          "estimatedCost": number,
          "notes": "string",
          "coordinates": null,
          "bookingLink": null
        }
      ]
    }
  ]
}
`;

function buildGenerationPrompt({
  tripContext,
  recentMessages,
  latestMessage,
}) {
  const context = tripContext || {};

  const contextLines = [
    `Destination: ${context.destination || "not specified"}`,
    `Duration: ${context.duration || "not specified"} days`,
    `Budget: ₹${context.budget || "not specified"}`,
    `Travelers: ${context.travelers || "not specified"}`,
    `Travel style: ${context.travelStyle || "not specified"}`,
    `Interests: ${(context.interests || []).join(", ") || "none specified"}`,
    `Constraints: ${(context.constraints || []).join(", ") || "none specified"}`,
  ].join("\n");

  const historyLines = (recentMessages || [])
    .map((m) => `${m.role}: ${m.content || m.text || ""}`)
    .join("\n");

  return `Trip context so far:
${contextLines}

Recent conversation:
${historyLines || "(no prior messages)"}

Latest user message:
"${latestMessage}"

Task:
Determine whether the correct response is "clarification", "generate", or "chat".

If generating a trip:
- Only generate 1 or 2 days.
- Do not invent missing required trip information.
- Follow the exact JSON schema.
- Return the complete JSON envelope.`;
}

function buildEditPrompt({
  currentTrip,
  recentMessages,
  latestMessage,
}) {
  const historyLines = (recentMessages || [])
    .map((m) => `${m.role}: ${m.content || m.text || ""}`)
    .join("\n");

  return `Existing trip:
${JSON.stringify(currentTrip)}

Recent conversation:
${historyLines || "(no prior messages)"}

Latest user message:
"${latestMessage}"

Task:
The user wants to change the existing trip.

Identify the affected day.

Return ONLY:
- type: "edit"
- scope: "day"
- dayNumber: affected day number
- day: the complete updated day object
- trip: null
- message: a short warm explanation

Do not return unaffected days.
Do not return the full trip.`;
}

function buildPrompt(input = {}) {
  if (
    input.destination &&
    input.days !== undefined &&
    !input.tripContext &&
    !input.latestMessage
  ) {
    const {
      destination,
      budget,
      days,
      travelers,
      travelStyle,
      preferences = [],
      mustVisitPlaces = [],
      foodPreference,
      transport,
      accommodation,
    } = input;

    const safeDays = Math.min(Number(days) || 1, 2);

    const lines = [
      `Plan a ${safeDays}-day trip to ${destination}.`,
      `Budget: ₹${budget} for ${travelers} traveler${
        travelers > 1 ? "s" : ""
      }.`,
      `Travel style: ${travelStyle || "Balanced"}.`,
    ];

    if (preferences.length) {
      lines.push(`Preferences: ${preferences.join(", ")}.`);
    }

    if (mustVisitPlaces.length) {
      lines.push(`Must-visit places: ${mustVisitPlaces.join(", ")}.`);
    }

    if (foodPreference) {
      lines.push(`Food preference: ${foodPreference}.`);
    }

    if (transport) {
      lines.push(`Preferred transport: ${transport}.`);
    }

    if (accommodation) {
      lines.push(`Preferred accommodation: ${accommodation}.`);
    }

    return {
      systemPrompt: SYSTEM_PROMPT,
      userPrompt: lines.join(" "),
    };
  }

  const {
    tripContext,
    currentTrip,
    recentMessages,
    latestMessage,
  } = input;

  const message = (latestMessage || "").toLowerCase();

  const isEdit =
    currentTrip &&
    /change|edit|modify|replace|update|remove|delete|swap|regenerate|move|add to day|shift/i.test(
      message
    );

  const userPrompt = isEdit
    ? buildEditPrompt({
        currentTrip,
        recentMessages,
        latestMessage,
      })
    : buildGenerationPrompt({
        tripContext,
        recentMessages,
        latestMessage,
      });

  return {
    systemPrompt: SYSTEM_PROMPT,
    userPrompt,
  };
}

module.exports = {
  SYSTEM_PROMPT,
  buildGenerationPrompt,
  buildEditPrompt,
  buildPrompt,
};
