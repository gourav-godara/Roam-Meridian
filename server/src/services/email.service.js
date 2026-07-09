const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendOTPEmail = async (email, otp) => {
    try {
        await transporter.sendMail({
            from: `Roam Meridian" <${process.env.EMAIL_USER}>`,
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
        });

        console.log("OTP email sent successfully.");
    } catch (error) {
        console.error("Email Error:", error);
        throw error;
    }
};

module.exports = {
    sendOTPEmail,
};