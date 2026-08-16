const mongoose = require("mongoose");

// This records a booking the user made on a real external partner site
// (MakeMyTrip, IRCTC, RedBus, Zoomcar) — NOT a booking made through our
// own inventory. Roam Meridian doesn't sell tickets directly; it searches
// partner sites are opened to, and once the user completes a real booking
// there, they log it here (self-reported, with an optional reference
// number) so it shows up in their dashboard alongside their trips and
// expenses. This is the same pattern real travel-planning apps use when
// they don't hold their own ticketing inventory or license.
const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Optionally link this booking to one of the user's trips, so it
    // shows up alongside that trip's itinerary/expenses.
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      default: null,
    },

    mode: {
      type: String,
      enum: ["flight", "train", "bus", "car"],
      required: true,
    },

    partner: {
      type: String,
      enum: ["makemytrip", "irctc", "redbus", "zoomcar"],
      required: true,
    },

    origin: {
      type: String,
      required: true,
      trim: true,
    },

    // Not required — car rentals are pickup-only, no destination city.
    destination: {
      type: String,
      trim: true,
      default: "",
    },

    travelDate: {
      type: Date,
      required: true,
    },

    passengers: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },

    // Self-reported by the user after booking on the partner's site —
    // we have no way to verify these against the partner (we don't have
    // API access to them, that's the whole reason this is a redirect
    // flow). Both optional since not every user will have these handy.
    referenceNumber: {
      type: String,
      trim: true,
      default: "",
    },

    amountPaid: {
      type: Number,
      min: 0,
      default: null,
    },

    notes: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: ["confirmed", "cancelled"],
      default: "confirmed",
    },
  },
  { timestamps: true }
);

bookingSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model("Booking", bookingSchema);

