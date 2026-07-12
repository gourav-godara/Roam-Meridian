const express = require("express");

const { getLocation } = require("../controllers/maps.controller");

const router = express.Router();

router.get("/", getLocation);

module.exports = router;