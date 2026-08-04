const FALLBACK_RESPONSE = {
  type: "chat",
  message: "Sorry, I had trouble processing that — could you rephrase?",
  scope: null,
  dayNumber: null,
  trip: null,
  day: null,
};

function extractJson(rawText) {
  if (!rawText) throw new Error("Empty response");

  const cleaned = rawText
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    const match = cleaned.match(/\{[\s\S]*\}/);

    if (!match) {
      throw new Error("No JSON found");
    }

    return JSON.parse(match[0]);
  }
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

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL,

        max_tokens: 1800,
        temperature: 0.4,

        response_format: {
          type: "json_object",
        },

        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    },
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`OpenRouter ${response.status}: ${errText}`);
  }

  const data = await response.json();

  console.log("MODEL:", data.model);
  console.log("PROVIDER:", data.provider);
  console.log(JSON.stringify(data, null, 2));
  console.log("Finish reason:", data.choices?.[0]?.finish_reason);
  console.log("Usage:", data.usage);

  const rawText =
    typeof data.choices?.[0]?.message?.content === "string"
      ? data.choices[0].message.content
      : JSON.stringify(data.choices?.[0]?.message?.content);

  console.log("================================");
  console.log("RAW AI RESPONSE");
  console.log(rawText);
  console.log("================================");

  try {
    return extractJson(rawText);
  } catch (err) {
    console.log("JSON PARSE FAILED");
    console.log(err.message);

    require("fs").writeFileSync("bad-response.txt", rawText, "utf8");

    throw err;
  }
}

async function generateResponse(systemPrompt, userPrompt) {
  try {
    const parsed = await callOpenRouter(systemPrompt, userPrompt);
    if (isValidEnvelope(parsed)) return parsed;
    console.error(
      "[openRouterClient] Invalid envelope on first attempt:",
      JSON.stringify(parsed),
    );
  } catch (err) {
    console.error("[openRouterClient] First attempt threw:", err.message);
  }

  try {
    const retryPrompt = `${userPrompt}\n\nReminder: Return ONLY a valid JSON object matching the required schema. No markdown. No explanation.`;
    const parsed = await callOpenRouter(systemPrompt, retryPrompt);
    if (isValidEnvelope(parsed)) return parsed;
    console.error(
      "[openRouterClient] Invalid envelope on retry:",
      JSON.stringify(parsed),
    );
  } catch (err) {
    console.error(err.message);

    if (err.message.includes("402")) {
      return {
        type: "chat",
        message:
          "The AI service has run out of credits. Please add OpenRouter credits or switch to another model.",
        scope: null,
        dayNumber: null,
        trip: null,
        day: null,
      };
    }
  }

  console.error(
    "[openRouterClient] Both attempts failed — returning fallback.",
  );
  return FALLBACK_RESPONSE;
}

module.exports = { generateResponse };
