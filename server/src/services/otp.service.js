const OTP = require("../models/otp.model");

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const saveOTP = async (email, otp, purpose, name = null) => {
    //delete any previous otp for the same email and purpose
    await OTP.deleteMany({
        email,
        purpose,
    });

    //otp expires in 5 min
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    const otpRecord = await OTP.create({
        email,
        name,
        otp,
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

    if(otpRecord.otp !== otp) {
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