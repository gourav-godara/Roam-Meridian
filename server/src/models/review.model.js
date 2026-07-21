const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    // User who wrote the review
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Destination being reviewed
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: true,
    },

    // Itinerary from which the review was created
    // (Will connect once Planner module is completed)
    itinerary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Planner",
      required: true,
    },

    // Rating between 1 and 5
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    // User's written review
    reviewText: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },

    // Images uploaded with review
    images: [
      {
        type: String,
      },
    ],
    isEdited: {
  type: Boolean,
  default: false,
},

likes: {
  type: Number,
  default: 0,
},
  },
  
  {
    timestamps: true,
  }
);

reviewSchema.index(
  {
    user: 1,
    itinerary: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model("Review", reviewSchema);