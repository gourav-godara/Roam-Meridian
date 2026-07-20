const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

const MODEL = process.env.OPENROUTER_MODEL || "openai/gpt-4.1-mini";

const FALLBACK_RESPONSE = {
  type: "chat",
  message: "Sorry, I had trouble processing that — could you rephrase?",
  scope: null,
  dayNumber: null,
  trip: null,
  day: null,
};

function extractJson(text) {
  const cleaned = text.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
}

function isValidEnvelope(obj) {
  if (!obj || typeof obj !== "object") return false;

  const validTypes = ["chat", "clarification", "generate", "edit"];

  if (!validTypes.includes(obj.type)) return false;
  if (typeof obj.message !== "string") return false;

  return true;
}

async function callOpenRouter(systemPrompt, userPrompt) {
  console.log("=================================");
  console.log("Calling OpenRouter...");
  console.log("MODEL:", MODEL);

  const completion = await client.chat.completions.create({
    model: MODEL,
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: userPrompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 1500,
  });

  const rawText = completion.choices[0].message.content;

  console.log("========== RAW AI RESPONSE ==========");
  console.log(rawText);
  console.log("=====================================");

  return extractJson(rawText);
}

async function generateResponse(systemPrompt, userPrompt) {
  try {
    const parsed = await callOpenRouter(systemPrompt, userPrompt);

    if (isValidEnvelope(parsed)) {
      return parsed;
    }

    console.error("Invalid envelope:", parsed);
  } catch (err) {
    console.error("OpenRouter Error:", err.message);
  }

  return FALLBACK_RESPONSE;
}

module.exports = {
  generateResponse,
};
