const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    // Trip to which this expense belongs
    itinerary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },

    // User who paid the expense
    paidBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Users who are sharing this expense
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // Expense title
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    // Expense description
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    // Amount spent
    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    // Expense category
    category: {
      type: String,
      enum: [
        "Accommodation",
        "Food",
        "Transport",
        "Shopping",
        "Activities",
        "Other",
      ],
      default: "Other",
    },

    // Current settlement status
    status: {
      type: String,
      enum: ["Pending", "Settled"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Expense", expenseSchema);