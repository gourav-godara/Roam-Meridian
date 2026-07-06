// backend/src/routes/dashboard.routes.js

const express = require("express"); // Imports the Express framework to handle web routing.
const router = express.Router(); // Creates an isolated routing system.
const dashboardController = require("../controllers/dashboard.controller"); // Imports the controller file (the "Chef").

router.get("/", dashboardController.getDashboard); // Says: "If someone sends a GET request to this path, run the getDashboard function."

module.exports = router; // Exports this router system so your main server file (app.js or server.js) can use it.