const authMiddleware = require("../middleware/auth.middleware");
const express = require("express");

const { registerUser, verifySignupOTP, createAccount, resendSignupOTP, loginUser, googleLogin, getProfile, updateProfile, logoutUser, forgotPassword, verifyForgotOTP, resetPassword } = require("../controllers/auth.controller");

const { validateRegister, validateCreateAccount, validateLogin, validateUpdateProfile } = require("../middleware/validation.middleware");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Auth API Working",
  });
});

//router.METHOD(PATH, FUNCTION)
router.post("/register", validateRegister, registerUser);

router.post("/verify-signup-otp", verifySignupOTP);

router.post(
  "/create-account",
  validateCreateAccount,
  createAccount
);

router.post("/login", validateLogin, loginUser);

router.post("/google", googleLogin);

router.get("/profile", authMiddleware, getProfile);

router.put(
  "/profile",
  authMiddleware,
  validateUpdateProfile,
  updateProfile
);

router.post("/logout", logoutUser);

router.post("/forgot-password", forgotPassword);

router.post("/verify-forgot-otp", verifyForgotOTP);

router.post("/reset-password", resetPassword);

router.post("/resend-signup-otp", resendSignupOTP);

module.exports = router;
