const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },

        name: {
            type: String,
            trim: true,
        },

        otp: {
            type: String,
            required: true,
        },

        purpose: {
            type: String,
            enum: ["signup", "forgot-password"],
            required: true,
        },

        expiresAt: {
            type: Date,
            required: true,
        },

        isVerified: {
            type: Boolean,
            default: false,
        },

        attempts: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("OTP", otpSchema);