const MODE_PREFIX = {
  flight: "FL",
  train: "TR",
  bus: "BS",
  car: "CR",
};

const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I to avoid confusion

const generateBookingReference = (mode) => {
  const prefix = MODE_PREFIX[mode] || "RM";

  let random = "";
  for (let i = 0; i < 6; i++) {
    random += CHARS[Math.floor(Math.random() * CHARS.length)];
  }

  return `RM-${prefix}-${random}`;
};

module.exports = { generateBookingReference };
