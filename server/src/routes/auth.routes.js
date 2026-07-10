const authMiddleware = require("../middleware/auth.middleware");
const express = require("express");

const { registerUser, loginUser, getProfile, updateProfile, logoutUser, forgotPassword, verifyForgotOTP, resetPassword } = require("../controllers/auth.controller");

const { validateRegister, validateLogin, validateUpdateProfile } = require("../middleware/validation.middleware");

const router = express.Router();


router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Auth API Working",
  });
});

//router.METHOD(PATH, FUNCTION)
router.post("/register", validateRegister, registerUser);

router.post("/login", validateLogin, loginUser);

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

module.exports = router;
