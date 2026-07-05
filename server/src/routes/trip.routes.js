const express = require("express");

const { getAllTrips } = require("../controllers/trip.controller");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

router.get("/", authMiddleware, getAllTrips);
module.exports = router;