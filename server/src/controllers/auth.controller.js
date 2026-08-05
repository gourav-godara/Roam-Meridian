const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
    verifyGoogleAccessToken,
} = require("../services/google.service");

const { sendOTPEmail } = require("../services/email.service");
const { generateOTP, saveOTP, verifyOTP } = require("../services/otp.service");
const OTP = require("../models/otp.model");

const registerUser = async (req, res) => {
    try {
        const { name, email } = req.body;

        const existingUser = await User.findOne({ email });

        if(existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already registered. Please use a different email.",
            });
        }

        const otp = generateOTP();

        await saveOTP(email, otp, "signup", name);

        await sendOTPEmail(email, otp);

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully.",
        });
    } catch (error) {
        console.error("Register Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

const verifySignupOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if(!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP are required.",
            });
        }

        await verifyOTP(email, otp, "signup");

        return res.status(200).json({
            success: true,
            message: "OTP verified successfully.",
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const createAccount = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;

        if(password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match.",
            });
        }

        const otpRecord = await OTP.findOne({
            email,
            purpose: "signup",
            isVerified: true,
        });

        if(!otpRecord) {
            return res.status(400).json({
                success: false,
                message: "Please verify your OTP first.",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 8);

        const user = await User.create({
            name: otpRecord.name,
            email: otpRecord.email,
            password: hashedPassword,
        });

        await OTP.deleteMany({
            email,
            purpose: "signup",
        });

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role,
            },

            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        return res.status(201).json({
            success: true,
            message: "Account created successfully.",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        console.error("Create Account Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

const resendSignupOTP = async (req, res) => {
    try {
        const { email } = req.body;

        if(!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required.",
            });
        }

        const existingUser = await User.findOne({ email });

        if(existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email is already registered.",
            });
        }

        const otpRecord = await OTP.findOne({
            email,
            purpose: "signup",
        });

        if(!otpRecord) {
            return res.status(404).json({
                success: false,
                message: "Signup request not found. Please register again.",
            });
        }

        const otp = generateOTP();

        await saveOTP(email, otp, "signup", otpRecord.name);

        await sendOTPEmail(email, otp);

        return res.status(200).json({
            success: true,
            message: "OTP resent successfully.",
        });

    } catch (error) {
        console.error("Resend Signup OTP Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if(!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            });
        }

        if (user.isActive === false) {
            return res.status(403).json({
                success: false,
                message:
                    "Your account has been suspended. Contact support if you think this is a mistake.",
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );
        console.log("===== LOGIN CONTROLLER =====");
console.log(user);
console.log("role =", user.role);
        return res.status(200).json({
            success: true,
            message: "Login successful.",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
},

        });
    } catch (error) {
        console.error("Login Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

const googleLogin = async (req, res) => {
    try {
        const { accessToken } = req.body;

        if(!accessToken) {
            return res.status(400).json({
                success: false,
                message: "Google ID Token is required.",
            });
        }

        const googleUser = await verifyGoogleAccessToken(accessToken);

        if(!googleUser.emailVerified) {
            return res.status(400).json({
                success: false,
                message: "Google email is not verified.",
            });
        }

        let user = await User.findOne({
            email: googleUser.email,
        });

        if(!user) {
            user = await User.create({
                name: googleUser.name,
                email: googleUser.email,
                googleId: googleUser.googleId,
                authProvider: "google",
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role,
            },

            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        return res.status(200).json({
            success: true,
            message: "Google login successful.",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,

            },
        });

    } catch (error) {
        console.error("Google Login Error:", error);

        return res.status(500).json({
            success: false,
            message: "Google login failed.",
        });
    }
};

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        return res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                authProvider: user.authProvider,
                dateOfBirth: user.dateOfBirth,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
        });
    } catch (error) {
        console.error("Get Profile Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { name, email, dateOfBirth, profileImage } = req.body;

        const user = await User.findById(req.user.id);

        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        if(email && email !== user.email) {
            const existingUser = await User.findOne({ email });

            if(existingUser) {
                return res.status(409).json({
                    success: false,
                    message: "Email already in use.",
                });
            }

            user.email = email;
        }

        if(name) {
            user.name = name;
        }

        if(dateOfBirth !== undefined) {
            user.dateOfBirth = dateOfBirth;
        }

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                authProvider: user.authProvider,
                dateOfBirth: user.dateOfBirth,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
        });
    } catch (error) {
        console.error("Update Profile Error:", error);

        return res.status(500).json({
            success: false,
            message: "Interval server error.",
        });
    }
};

const logoutUser = async (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Logout successfull."
    });
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if(!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required.",
            });
        }

        const user = await User.findOne({ email });

        if(user) {
            const otp = generateOTP();
            await saveOTP(email, otp, "forgot-password");
            await sendOTPEmail(email, otp);
        }

        return res.status(200).json({
            success: true,
            message:
                "If an account exists for this email, an OTP has been sent.",
        });

    } catch (error) {
        console.error("Forgot Password Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

const verifyForgotOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if(!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP are required.",
            });
        }

        await verifyOTP(email, otp, "forgot-password");

        return res.status(200).json({
            success: true,
            message: "OTP verified successfully.",
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        if(!email || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Email and new password are required."
            });
        }

        const otpRecord = await OTP.findOne({
            email,
            purpose: "forgot-password",
            isVerified: true,
        });

        if(!otpRecord) {
            return res.status(400).json({
                success: false,
                message: "OTP verification required.",
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 8);

        await User.findOneAndUpdate(
            { email },
            { password: hashedPassword }
        );

        await OTP.deleteMany({
            email,
            purpose: "forgot-password",
        });

        return res.status(200).json({
            success: true,
            message: "Password reset successfully.",
        });

    } catch (error) {
        console.error("Reset Password Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

module.exports = {
    registerUser,
    verifySignupOTP,
    createAccount,
    resendSignupOTP,
    loginUser,
    googleLogin,
    getProfile,
    updateProfile,
    logoutUser,
    forgotPassword,
    verifyForgotOTP,
    resetPassword,
};