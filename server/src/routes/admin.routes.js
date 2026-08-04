const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const authorize = require("../middleware/authorization.middleware");
const adminController = require("../controllers/admin.controller");

// Every route in this file requires a logged-in admin. Destination CRUD is
// intentionally NOT duplicated here — it already lives at
// /api/destinations (POST/PUT/DELETE there are already admin-gated), so
// the admin panel's Destinations page calls those directly.
router.use(authMiddleware, authorize("admin"));

// Dashboard / analytics
router.get("/stats", adminController.getStats);

// Users
router.get("/users", adminController.getAllUsers);
router.get("/users/:id", adminController.getUserById);
router.patch("/users/:id/role", adminController.updateUserRole);
router.patch("/users/:id/status", adminController.updateUserStatus);
router.delete("/users/:id", adminController.deleteUser);

// Trips (oversight across all users)
router.get("/trips", adminController.getAllTrips);
router.delete("/trips/:id", adminController.deleteTrip);

// Reviews (moderation)
router.get("/reviews", adminController.getAllReviews);
router.delete("/reviews/:id", adminController.deleteReview);

// Expenses (read-only, for support/dispute lookup)
router.get("/expenses", adminController.getAllExpenses);

module.exports = router;
