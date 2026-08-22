const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
    {
        time: {
            type: String,
            trim: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        location: {
            type: String,
            trim: true,
        },

        notes: {
            type: String,
            trim: true,
        },
    },
    { _id: false }
);

const itineraryDaySchema = new mongoose.Schema(
    {
        day: {
            type: Number,
            required: true,
        },

        activities: {
            type: [activitySchema],
            default: [],
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

        // Planner document from which this trip was created
        plannerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Planner",
            default: null,
        },

        collaborators: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        // Trip companions added by name only (no account required). Used
        // to split expenses with people who aren't registered users of the
        // site — e.g. a friend without an account who still joined the trip.
        companions: [
            {
                name: {
                    type: String,
                    required: true,
                    trim: true,
                    maxlength: 100,
                },
            },
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

        travelers: {
            type: Number,
            required: true,
            default: 1,
        },

        budget: {
            type: Number,
            required: true,
        },

        itinerary: {
            type: [itineraryDaySchema],
            default: [],
        },

        status: {
            type: String,
            enum: [
                "draft",
                "planning",
                "ongoing",
                "completed",
                "wishlist",
                "cancelled",
            ],
            default: "draft",
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