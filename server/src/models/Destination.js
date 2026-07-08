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

category: {
  type: String,
  required: true,
  enum: {
    values: ["Beach", "Mountains", "Heritage", "Adventure"],
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

const Destination = mongoose.model("Destination", destinationSchema);

module.exports = Destination; 