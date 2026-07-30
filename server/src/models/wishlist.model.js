const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// One user can save one destination only once
wishlistSchema.index(
  { user: 1, destination: 1 },
  { unique: true }
);

module.exports = mongoose.model("Wishlist", wishlistSchema);