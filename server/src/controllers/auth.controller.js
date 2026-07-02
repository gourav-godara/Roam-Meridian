const User = require("../models/User");

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required fields.",
        });
    }

    const existingUser = await User.findOne({ email });

    if(existingUser) {
        return res.status(409).json({
            success: false,
            message: "Email already registered. Please use a different email.",
        });
    }
    
    return res.status(200).json({
        success: true,
        message: "Register API working",
    });
};

module.exports = {
    registerUser,
};