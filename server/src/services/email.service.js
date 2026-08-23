const axios = require("axios");

// Cloud hosts like Render block outbound SMTP ports (25/465/587) on their
// free tier, which is why nodemailer + Gmail SMTP worked locally but hung
// for minutes and then failed once deployed. Brevo's HTTP API runs over
// standard HTTPS (port 443), which isn't blocked, and its free tier lets
// a single verified sender address send to any recipient — no custom
// domain/DNS setup required.
const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

const sendOTPEmail = async (email, otp) => {
    try {
        await axios.post(
            BREVO_API_URL,
            {
                sender: {
                    name: "Roam Meridian",
                    email: process.env.BREVO_SENDER_EMAIL,
                },
                to: [{ email }],
                subject: "Roam Meridian - OTP Verification",
                htmlContent: `
                    <div style="font-family: Arial, sans-serif;">
                        <h2>Roam Meridian</h2>
                        <p>Your OTP for verification is:</p>
                        <h1 style="letter-spacing: 4px;">${otp}</h1>
                        <p>This OTP is valid for <strong>5 minutes</strong></p>
                        <p>If you did not request this, you can ignore this email.</p>
                    </div>
                `,
            },
            {
                headers: {
                    "api-key": process.env.BREVO_API_KEY,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            }
        );

        console.log("OTP email sent successfully.");
    } catch (error) {
        console.error("Email Error:", error.response?.data || error.message);
        throw error;
    }
};

module.exports = {
    sendOTPEmail,
};