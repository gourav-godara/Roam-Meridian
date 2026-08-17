const axios = require("axios");

const sendOTPEmail = async (email, otp) => {
    try {
        await axios.post(
            "https://api.resend.com/emails",
            {
                from: "Roam Meridian <onboarding@resend.dev>",
                to: email,
                subject: "Roam Meridian - OTP Verification",
                html: `
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
                    Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("OTP email sent successfully.");
    } catch (error) {
        console.error(
            "Email Error:",
            error.response?.data || error.message
        );
        throw error;
    }
};

module.exports = {
    sendOTPEmail,
};