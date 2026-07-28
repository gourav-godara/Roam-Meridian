const bcrypt = require("bcryptjs");
const OTP = require("../models/otp.model");

const MAX_ATTEMPTS = 5;

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const saveOTP = async (email, otp, purpose, name = null) => {
    await OTP.deleteMany({
        email,
        purpose,
    });

    //otp expires in 5 min
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    const hashedOtp = await bcrypt.hash(otp, 10);

    const otpRecord = await OTP.create({
        email,
        name,
        otp: hashedOtp,
        purpose,
        expiresAt,
    });

    return otpRecord;
};

const verifyOTP = async (email, otp, purpose) => {
    const otpRecord = await OTP.findOne({
        email,
        purpose,
    });

    if(!otpRecord) {
        throw new Error("OTP not found.");
    }

    if(otpRecord.expiresAt < new Date()) {
        throw new Error("OTP has expired.");
    }

    if(otpRecord.attempts >= MAX_ATTEMPTS) {
        throw new Error(
            "Too many incorrect attempts. Please request a new OTP."
        );
    }

    const isMatch = await bcrypt.compare(otp, otpRecord.otp);

    if(!isMatch) {
        otpRecord.attempts += 1;
        await otpRecord.save();
        throw new Error("Invalid OTP.");
    }

    otpRecord.isVerified = true;
    await otpRecord.save();

    return otpRecord;
};

module.exports = {
    generateOTP,
    saveOTP,
    verifyOTP,
};