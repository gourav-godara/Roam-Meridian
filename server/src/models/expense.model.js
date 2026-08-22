const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    // Trip to which this expense belongs
    trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trip",
    required: true,
},

    // User who paid the expense. Either a real registered user, or a
    // name-only trip companion (see Trip.companions) — paidByModel says
    // which one this id refers to.
    paidBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "paidByModel",
    },

    paidByModel: {
      type: String,
      enum: ["User", "Companion"],
      default: "User",
    },

    // People sharing this expense. Each entry is either a real registered
    // user or a name-only trip companion, disambiguated per-entry by model.
    participants: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          refPath: "participants.model",
        },
        model: {
          type: String,
          enum: ["User", "Companion"],
          default: "User",
        },
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