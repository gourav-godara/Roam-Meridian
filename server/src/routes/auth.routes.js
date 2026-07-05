const express = require("express");

//imports registerUser function from auth.controller.js
const { registerUser, loginUser } = require("../controllers/auth.controller");

const router = express.Router();


router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Auth API Working",
  });
});

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
