export function formatDateRange(checkIn, checkOut) {
  if (!checkIn) return "";
  const opts = { month: "short", day: "numeric" };
  if (!checkOut) return checkIn.toLocaleDateString(undefined, opts);
  return `${checkIn.toLocaleDateString(undefined, opts)} – ${checkOut.toLocaleDateString(undefined, opts)}`;
}

export function formatGuestSummary(guests) {
  const total = (guests?.adults || 0) + (guests?.children || 0);
  if (!total) return "";

  const extras = [];
  if (guests?.infants) extras.push(`${guests.infants} infant${guests.infants > 1 ? "s" : ""}`);
  if (guests?.pets) extras.push(`${guests.pets} pet${guests.pets > 1 ? "s" : ""}`);

  const base = `${total} Guest${total > 1 ? "s" : ""}`;
  return extras.length ? `${base}, ${extras.join(", ")}` : base;
}
