const axios = require("axios");

// In-memory translation cache to avoid redundant API calls
const translationCache = new Map();

/**
 * Checks if a string contains non-Latin characters (e.g. Japanese, Chinese, Cyrillic, Arabic, Hangul, Devanagari, Thai, etc.)
 * @param {string} text
 * @returns {boolean}
 */
function hasNonLatin(text) {
  if (!text || typeof text !== "string") return false;
  return /[^\u0000-\u024F]/.test(text);
}

/**
 * Translates a single text to English using Google Translate public endpoint.
 * @param {string} text
 * @returns {Promise<string>}
 */
async function translateToEnglish(text) {
  if (!text || typeof text !== "string") return text || "";
  const trimmed = text.trim();
  if (!trimmed || !hasNonLatin(trimmed)) return trimmed;

  const cacheKey = trimmed.toLowerCase();
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(
      trimmed
    )}`;

    const response = await axios.get(url, {
      timeout: 5000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (
      response.data &&
      Array.isArray(response.data[0]) &&
      response.data[0].length > 0
    ) {
      const translated = response.data[0]
        .map((segment) => (segment && segment[0] ? segment[0] : ""))
        .join("")
        .trim();

      if (translated) {
        translationCache.set(cacheKey, translated);
        return translated;
      }
    }
  } catch (error) {
    console.warn(`Translation fallback for "${trimmed}":`, error.message);
  }

  return trimmed;
}

/**
 * Efficiently translates a batch of texts in chunks using separator joining.
 * Falls back to individual item translation if batching fails.
 * @param {string[]} texts
 * @returns {Promise<string[]>}
 */
async function translateBatch(texts) {
  if (!Array.isArray(texts)) return [];

  // Identify which items need translation
  const results = new Array(texts.length);
  const toTranslateIndices = [];
  const toTranslateTexts = [];

  for (let i = 0; i < texts.length; i++) {
    const raw = texts[i];
    if (!raw || typeof raw !== "string") {
      results[i] = raw || "";
      continue;
    }

    const trimmed = raw.trim();
    if (!trimmed || !hasNonLatin(trimmed)) {
      results[i] = trimmed;
      continue;
    }

    const cacheKey = trimmed.toLowerCase();
    if (translationCache.has(cacheKey)) {
      results[i] = translationCache.get(cacheKey);
      continue;
    }

    toTranslateIndices.push(i);
    toTranslateTexts.push(trimmed);
  }

  if (toTranslateTexts.length === 0) {
    return results;
  }

  // Chunk in batches of 15 to avoid URL length limits
  const CHUNK_SIZE = 15;
  const SEPARATOR = "\n;;;\n";

  for (let c = 0; c < toTranslateTexts.length; c += CHUNK_SIZE) {
    const chunkTexts = toTranslateTexts.slice(c, c + CHUNK_SIZE);
    const chunkIndices = toTranslateIndices.slice(c, c + CHUNK_SIZE);
    const combined = chunkTexts.join(SEPARATOR);

    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(
        combined
      )}`;

      const response = await axios.get(url, {
        timeout: 6000,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      });

      if (response.data && Array.isArray(response.data[0])) {
        const fullText = response.data[0]
          .map((segment) => (segment && segment[0] ? segment[0] : ""))
          .join("");

        const splitTranslations = fullText.split(/\s*;;;\s*/);

        for (let j = 0; j < chunkTexts.length; j++) {
          const original = chunkTexts[j];
          const translated = (splitTranslations[j] || "").trim() || original;
          const origIdx = chunkIndices[j];

          translationCache.set(original.toLowerCase(), translated);
          results[origIdx] = translated;
        }
        continue;
      }
    } catch (err) {
      console.warn("Batch translation error, falling back to individual:", err.message);
    }

    // Fallback: translate individually
    for (let j = 0; j < chunkTexts.length; j++) {
      const original = chunkTexts[j];
      const origIdx = chunkIndices[j];
      const translated = await translateToEnglish(original);
      results[origIdx] = translated;
    }
  }

  return results;
}

module.exports = {
  hasNonLatin,
  translateToEnglish,
  translateBatch,
};
