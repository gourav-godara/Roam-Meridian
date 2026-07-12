function buildPrompt({
  destination,
  budget,
  days,
  travelers,
  preferences = [],
  travelStyle,
  mustVisitPlaces = [],
  foodPreference,
  transport,
  accommodation,
}) {
  const lines = [
    `Plan a ${days}-day trip to ${destination}.`,
    `Budget: ₹${budget} for ${travelers} traveler${travelers > 1 ? "s" : ""}.`,
    `Travel style: ${travelStyle || "Balanced"}.`,
  ];

  if (preferences.length) lines.push(`Preferences: ${preferences.join(", ")}.`);
  if (mustVisitPlaces.length) lines.push(`Must-visit places: ${mustVisitPlaces.join(", ")}.`);
  if (foodPreference) lines.push(`Food preference: ${foodPreference}.`);
  if (transport) lines.push(`Preferred transport: ${transport}.`);
  if (accommodation) lines.push(`Preferred accommodation: ${accommodation}.`);

  return lines.join(" ");
}

module.exports = { buildPrompt };
