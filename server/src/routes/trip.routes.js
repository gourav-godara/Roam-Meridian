const express = require("express");

const { getAllTrips } = require("../controllers/trip.controller");

const router = express.Router();

router.get("/", getAllTrips);
module.exports = router;