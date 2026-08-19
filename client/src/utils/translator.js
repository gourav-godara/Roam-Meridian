const translationCache = new Map();

export function hasNonLatin(text) {
  if (!text || typeof text !== "string") return false;
  return /[^\u0000-\u024F]/.test(text);
}

export async function translateToEnglish(text) {
  if (!text || typeof text !== "string") return text || "";
  const trimmed = text.trim();
  if (!trimmed || !hasNonLatin(trimmed)) return trimmed;

  const key = trimmed.toLowerCase();
  if (translationCache.has(key)) {
    return translationCache.get(key);
  }

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(
      trimmed
    )}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    const data = await response.json();
    if (data && Array.isArray(data[0])) {
      const translated = data[0]
        .map((s) => (s && s[0] ? s[0] : ""))
        .join("")
        .trim();
      if (translated) {
        translationCache.set(key, translated);
        return translated;
      }
    }
  } catch (error) {
    console.warn("Client translation fallback:", error.message);
  }

  return trimmed;
}

export async function translatePlaces(places = []) {
  if (!Array.isArray(places) || places.length === 0) return [];

  // Check if any place actually has non-Latin text
  const needsTranslation = places.some(
    (p) => hasNonLatin(p.name) || hasNonLatin(p.address)
  );

  if (!needsTranslation) {
    return places;
  }

  return Promise.all(
    places.map(async (p) => {
      let name = p.name;
      let address = p.address;

      if (hasNonLatin(name)) {
        name = await translateToEnglish(name);
      }
      if (hasNonLatin(address)) {
        address = await translateToEnglish(address);
      }

      return {
        ...p,
        name,
        address,
      };
    })
  );
}
