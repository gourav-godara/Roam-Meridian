const express = require("express");

const {
    getLocation,
    getReverseLocation,
    getRouteDetails,
    getNearby,
} = require("../controllers/maps.controller");

const router = express.Router();

router.get("/", getLocation);
router.get("/reverse", getReverseLocation);
router.get("/route", getRouteDetails);
router.get("/nearby", getNearby);

module.exports = router;