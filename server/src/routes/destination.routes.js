const express = require("express");

const {
    getAllDestinations,
    getDestinationById,
    createDestination,
    updateDestination,
    deleteDestination,
} = require("../controllers/destination.controller");


const router = express.Router();

router.get("/", getAllDestinations);
router.get("/:id", getDestinationById);
router.post("/", createDestination);
router.put("/:id", updateDestination);
router.delete("/:id", deleteDestination);

module.exports = router;
