const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    // Who this notification is for
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: ["expense", "settlement", "review", "trip"],
      required: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    // Where clicking the notification should take the user, e.g. "/expenses"
    link: {
      type: String,
      default: "",
    },

    // The expense/trip/review this notification is about
    relatedId: {
      type: mongoose.Schema.Types.ObjectId,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notification", notificationSchema);