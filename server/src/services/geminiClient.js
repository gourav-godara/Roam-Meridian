const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const FALLBACK_RESPONSE = {
  type: "chat",
  message: "Sorry, I had trouble processing that — could you rephrase?",
  scope: null,
  dayNumber: null,
  trip: null,
  day: null,
};

function extractJson(rawText) {
  // Gemini sometimes wraps JSON in ```json fences despite instructions — strip them defensively.
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
  const result = await model.generateContent([
    { text: systemPrompt },
    { text: userPrompt },
  ]);
  const rawText = result.response.text();
  return extractJson(rawText);
}

async function generateResponse(systemPrompt, userPrompt) {
  try {
    const parsed = await callGemini(systemPrompt, userPrompt);
    if (isValidEnvelope(parsed)) return parsed;
  } catch (err) {
    // fall through to retry
  }

  // Retry once with a stricter reminder appended
  try {
    const retryPrompt = `${userPrompt}\n\nReminder: your last response was not valid JSON. Return ONLY the JSON object, nothing else — no markdown, no explanation.`;
    const parsed = await callGemini(systemPrompt, retryPrompt);
    if (isValidEnvelope(parsed)) return parsed;
  } catch (err) {
    // fall through to fallback
  }

  return FALLBACK_RESPONSE;
}

module.exports = { generateResponse };
