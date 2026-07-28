const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema(
  {
    name: {
  type: String,
  required: true,
  trim: true,
},

city: {
  type: String,
  required: true,
  trim: true,
},

state: {
    type: String,
    required: true,
    trim: true,
},

country: {
  type: String,
  required: true,
  trim: true,
},

description: {
  type: String,
  required: true,
  trim: true,
},

bestTime: {
    type: String,
    trim: true,
},

duration: {
    type: String,
    trim: true,
},

// Visa/passport/permit info — explicitly requested in the competition
// handbook's "Destination Listings" requirement.
entryRequirements: {
    type: String,
    trim: true,
    default: "",
},

category: {
  type: String,
  required: true,
  enum: {
  values: [
    "Beach",
    "Mountains",
    "Heritage",
    "Adventure",
    "Nature",
    "Wildlife",
    "City",
    "Spiritual",
    "Snow",
    "Food",
  ],
  message: "{VALUE} is not a valid category",
},
},

images: [
    {
        type: String,
        trim: true,
    },
],

budget: {
    min: {
        type: Number,
        required: true,
        min: 0,
    },
    max: {
        type: Number,
        required: true,
        min: 0,
    },
    currency: {
        type: String,
        default: "INR",
    },
},

rating: {
    average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    count: {
        type: Number,
        default: 0,
        min: 0,
    },
},

location: {
    latitude: {
        type: Number,
        required: true,
        min: -90,
        max: 90,
    },
    longitude: {
        type: Number,
        required: true,
        min: -180,
        max: 180,
    },
},
},
{
    timestamps: true,
}
);

// Speeds up the common filters/sorts used by getAllDestinations
// (city/country/category filters, rating sort).
destinationSchema.index({ city: 1 });
destinationSchema.index({ country: 1 });
destinationSchema.index({ category: 1 });
destinationSchema.index({ "rating.average": -1 });

const Destination = mongoose.model("Destination", destinationSchema);

module.exports = Destination;