const express = require("express");

const {
    getAllItineraries,
    getItineraryById,
    createItinerary,
    updateItinerary,
    deleteItinerary,
    getItinerariesByDestination,
} = require("../controllers/itinerary.controller");

const authMiddleware = require("../middleware/auth.middleware");
const authorize = require("../middleware/authorization.middleware");

const router = express.Router();

// Public: anyone can browse curated itineraries — this is content meant
// to be read before signing up, same as the destination catalog.
router.get("/", getAllItineraries);
router.get("/by-destination/:destinationId", getItinerariesByDestination);
router.get("/:id", getItineraryById);

// Admin-only: writing to the shared itinerary catalog must be gated,
// same reasoning as destination.routes.js.
router.post("/", authMiddleware, authorize("admin"), createItinerary);
router.put("/:id", authMiddleware, authorize("admin"), updateItinerary);
router.delete("/:id", authMiddleware, authorize("admin"), deleteItinerary);

module.exports = router;