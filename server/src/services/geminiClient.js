const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: process.env.GEMINI_MODEL || "gemini-2.0-flash-lite",
});

const FALLBACK_RESPONSE = {
  type: "chat",
  message: "Sorry, I had trouble processing that — could you rephrase?",
  scope: null,
  dayNumber: null,
  trip: null,
  day: null,
};

function extractJson(rawText) {
  const cleaned = rawText.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
}

function isValidEnvelope(obj) {
  if (!obj || typeof obj !== "object") return false;
  const validTypes = ["chat", "clarification", "generate", "edit"];
  if (!validTypes.includes(obj.type)) return false;
  if (typeof obj.message !== "string") return false;
  return true;
}

async function callGemini(systemPrompt, userPrompt) {
  console.log("Calling Gemini...");

  const result = await model.generateContent([
    { text: systemPrompt },
    { text: userPrompt },
  ]);

  console.log("Gemini responded.");

  const rawText = result.response.text();

  console.log("RAW RESPONSE:");
  console.log(rawText);

  return extractJson(rawText);
}

async function generateResponse(systemPrompt, userPrompt) {
  try {
    const parsed = await callGemini(systemPrompt, userPrompt);

    if (isValidEnvelope(parsed)) return parsed;

    console.error(
      "[geminiClient] Invalid envelope on first attempt:",
      JSON.stringify(parsed),
    );
  } catch (err) {
    console.error("[geminiClient] First attempt threw:", err.message);

    if (err.message.includes("503")) {
      console.log("Gemini busy. Waiting 2 seconds...");
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  try {
    const retryPrompt = `${userPrompt}

Reminder: Return ONLY a valid JSON object matching the required schema. No markdown. No explanation.`;

    const parsed = await callGemini(systemPrompt, retryPrompt);

    if (isValidEnvelope(parsed)) return parsed;

    console.error(
      "[geminiClient] Invalid envelope on retry:",
      JSON.stringify(parsed),
    );
  } catch (err) {
    console.error("[geminiClient] Retry threw:", err.message);
  }

  console.error("[geminiClient] Both attempts failed — returning fallback.");
  return FALLBACK_RESPONSE;
}

module.exports = { generateResponse };
