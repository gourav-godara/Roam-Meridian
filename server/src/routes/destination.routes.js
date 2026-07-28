const express = require("express");

const {
    getAllDestinations,
    getDestinationById,
    createDestination,
    updateDestination,
    deleteDestination,
} = require("../controllers/destination.controller");

const authMiddleware = require("../middleware/auth.middleware");
const authorize = require("../middleware/authorization.middleware");

const router = express.Router();

// Public: anyone can browse destinations
router.get("/", getAllDestinations);
router.get("/:id", getDestinationById);

// Admin-only: writing to the shared destination catalog must be gated,
// otherwise any anonymous request can create/overwrite/delete listings.
router.post("/", authMiddleware, authorize("admin"), createDestination);
router.put("/:id", authMiddleware, authorize("admin"), updateDestination);
router.delete("/:id", authMiddleware, authorize("admin"), deleteDestination);

module.exports = router;
