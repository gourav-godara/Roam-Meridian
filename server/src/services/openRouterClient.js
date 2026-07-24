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

async function callOpenRouter(systemPrompt, userPrompt) {
  console.log("Calling OpenRouter...");

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENROUTER_MODEL || "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`OpenRouter ${response.status}: ${errText}`);
  }

  const data = await response.json();
  const rawText = data.choices?.[0]?.message?.content;

  console.log("OpenRouter responded.");
  console.log("RAW RESPONSE:", rawText);

  return extractJson(rawText);
}

async function generateResponse(systemPrompt, userPrompt) {
  try {
    const parsed = await callOpenRouter(systemPrompt, userPrompt);
    if (isValidEnvelope(parsed)) return parsed;
    console.error("[openRouterClient] Invalid envelope on first attempt:", JSON.stringify(parsed));
  } catch (err) {
    console.error("[openRouterClient] First attempt threw:", err.message);
  }

  try {
    const retryPrompt = `${userPrompt}\n\nReminder: Return ONLY a valid JSON object matching the required schema. No markdown. No explanation.`;
    const parsed = await callOpenRouter(systemPrompt, retryPrompt);
    if (isValidEnvelope(parsed)) return parsed;
    console.error("[openRouterClient] Invalid envelope on retry:", JSON.stringify(parsed));
  } catch (err) {
    console.error("[openRouterClient] Retry threw:", err.message);
  }

  console.error("[openRouterClient] Both attempts failed — returning fallback.");
  return FALLBACK_RESPONSE;
}

module.exports = { generateResponse };
