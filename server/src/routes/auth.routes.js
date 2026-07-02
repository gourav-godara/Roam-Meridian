const express = require("express");

//imports registerUser function from auth.controller.js
const { registerUser } = require("../controllers/auth.controller");

const router = express.Router();


router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Auth API Working",
  });
});

router.post("/register", registerUser);

module.exports = router;
