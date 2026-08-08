const mongoose = require("mongoose");

// A single "listing" a user can search for and book — a flight, train,
// bus, or car rental. One shared schema instead of four separate models
// because they share the vast majority of fields (origin, destination,
// timing, price, operator, seats); mode-specific extras live in `details`.
//
// NOTE ON DATA SOURCE: this collection is seeded with realistic mock
// inventory (see server/src/seed/travelOptions.seed.js) rather than
// pulled from a live airline/rail/bus GDS. A real production version of
// this feature would call a paid third-party API (e.g. Amadeus for
// flights) instead of querying this collection directly — the
// service/controller layer here is written so that swap only touches
// travelOption.service.js, not the routes, the booking model, or any
// frontend code.
const travelOptionSchema = new mongoose.Schema(
  {
    mode: {
      type: String,
      enum: ["flight", "train", "bus", "car"],
      required: true,
    },

    operator: {
      // Airline / rail operator / bus company / rental agency name
      type: String,
      required: true,
      trim: true,
    },

    // Human-readable code shown to the user, e.g. "6E-204", "12951",
    // "RM-BUS-118". Not required to be globally unique — uniqueness is
    // enforced at the (mode, code, departureTime) level implicitly by
    // there simply being one seeded row per real-world instance.
    code: {
      type: String,
      trim: true,
    },

    origin: {
      city: { type: String, required: true, trim: true },
      terminal: { type: String, trim: true }, // airport code / station / stand name
    },

    destination: {
      city: { type: String, required: true, trim: true },
      terminal: { type: String, trim: true },
    },

    // Car rentals are priced/booked by pickup point + duration rather
    // than a departure/arrival pair, but we still store both so every
    // mode can be queried and sorted the same way (arrival = pickup +
    // rental duration for cars).
    departureTime: {
      type: Date,
      required: true,
    },

    arrivalTime: {
      type: Date,
      required: true,
    },

    durationMinutes: {
      type: Number,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    currency: {
      type: String,
      default: "INR",
    },

    // Total inventory for this listing and how many are left. Seats
    // decrement on booking and increment back on cancellation — see
    // booking.service.js.
    totalSeats: {
      type: Number,
      required: true,
      min: 0,
    },

    seatsAvailable: {
      type: Number,
      required: true,
      min: 0,
    },

    // Mode-specific extras that don't apply across the board.
    details: {
      // flight
      class: { type: String }, // Economy / Premium Economy / Business
      stops: { type: Number, default: 0 },
      baggage: { type: String }, // e.g. "15kg check-in + 7kg cabin"

      // train
      trainClass: { type: String }, // Sleeper / AC 3-Tier / AC 2-Tier / AC First

      // bus
      busType: { type: String }, // AC Sleeper / Non-AC Seater / Volvo Multi-Axle

      // car
      carModel: { type: String },
      transmission: { type: String }, // Manual / Automatic
      fuelType: { type: String },
      seats: { type: Number }, // seats IN the car, distinct from totalSeats (units available to rent)
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Powers the main search: mode + route + date range.
travelOptionSchema.index({ mode: 1, "origin.city": 1, "destination.city": 1, departureTime: 1 });

module.exports = mongoose.model("TravelOption", travelOptionSchema);
