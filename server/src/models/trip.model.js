const mongoose = require("mongoose");

const itineraryItemSchema = new mongoose.Schema(
    {
        day: {
            type: Number,
            required: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            trim: true,
        },

        time: {
            type: String,
            trim: true,
        },

        location: {
            type: String,
            trim: true,
        },

        category: {
            type: String,
            enum: [
                "Sightseeing",
                "Food",
                "Hotel",
                "Transport",
                "Adventure",
                "Shopping",
                "Custom",
            ],
            default: "Custom",
        },
    },

    { _id: false }
);

const tripSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        destinationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Destination",
            required: true,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        collaborators: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }
        ],

        coverImage: {
            type: String,
            default: "",
        },

        startDate: {
            type: Date,
            required: true,
        },

        endDate: {
            type: Date,
            required: true,
        },

        budget: {
            type: Number,
            required: true,
        },

        itinerary: [itineraryItemSchema],

        status: {
            type: String,
            enum: ["planning", "ongoing", "completed"],
            default: "planning",
        },

        isPublic: {
            type: Boolean,
            default: false,
        },
    },

    {
        timestamps: true,
    }
);

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
