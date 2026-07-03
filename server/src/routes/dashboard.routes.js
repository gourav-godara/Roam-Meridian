// backend/src/routes/dashboard.routes.js

const express = require("express");

const router = express.Router();

const dashboardController = require("../controllers/dashboard.controller");

router.get("/", dashboardController.getDashboard);

module.exports = router;