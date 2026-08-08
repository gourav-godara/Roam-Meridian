const mongoose = require("mongoose");

// Mirrors the day shape already used by Planner.js's AI-generated
// itineraries (day/title/activities/restaurants/stay/estimatedCost) so a
// future shared "day card" UI component can render either source without
// two different data shapes to branch on.
const daySchema = new mongoose.Schema(
  {
    day: { type: Number, required: true },
    title: { type: String, required: true, trim: true },
    activities: [{ type: String, trim: true }],
    restaurants: [{ type: String, trim: true }],
    stay: { type: String, trim: true, default: "" },
    estimatedCost: { type: Number, default: 0, min: 0 },
    image: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const itinerarySchema = new mongoose.Schema(
  {
    // Which destination this guide covers. Not unique — a single
    // destination can have more than one guide (e.g. a 3-day quick trip
    // and a 7-day in-depth one), same as how Gujarat Tourism lists
    // multiple itineraries per city.
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: true,
      index: true,
    },

    // Denormalized at write time so the list/search page can filter and
    // display without populating every card — same reasoning as storing
    // city/country directly on Destination rather than joining every read.
    destinationName: { type: String, required: true, trim: true },

    title: { type: String, required: true, trim: true, maxlength: 120 },
    summary: { type: String, required: true, trim: true, maxlength: 500 },
    coverImage: { type: String, trim: true, default: "" },

    durationDays: { type: Number, required: true, min: 1 },
    durationNights: { type: Number, required: true, min: 0 },

    bestTime: { type: String, trim: true, default: "" },
    estimatedBudget: { type: Number, default: 0, min: 0 },

    theme: {
      type: String,
      enum: [
        "Heritage",
        "Adventure",
        "Family",
        "Honeymoon",
        "Spiritual",
        "Nature",
        "City",
        "Budget",
        "Luxury",
      ],
      default: "Family",
    },

    days: {
      type: [daySchema],
      required: true,
      validate: {
        validator: (arr) => arr.length > 0,
        message: "An itinerary needs at least one day.",
      },
    },

    highlights: [{ type: String, trim: true }],
    tips: [{ type: String, trim: true }],

    published: { type: Boolean, default: true },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Speeds up the list page's common filters (by destination, by theme,
// text search, and the default "published only" scope).
itinerarySchema.index({ destinationName: 1 });
itinerarySchema.index({ theme: 1 });
itinerarySchema.index({ published: 1 });
itinerarySchema.index({ title: "text", destinationName: "text", summary: "text" });

module.exports = mongoose.model("Itinerary", itinerarySchema);