const express = require("express");
const router = express.Router();

const travelOptionController = require("../controllers/travelOption.controller");

// Public — searching for flights/trains/buses/car rentals shouldn't
// require login, same pattern as browsing destinations.
router.get("/search", travelOptionController.searchTravelOptions);
router.get("/cities", travelOptionController.getAvailableCities);
router.get("/:id", travelOptionController.getTravelOptionById);

module.exports = router;
