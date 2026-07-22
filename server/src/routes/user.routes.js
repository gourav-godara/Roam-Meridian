const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth.middleware");

const userController = require("../controllers/user.controller");

router.get(
  "/search",
  auth,
  userController.searchUsers
);

module.exports = router;