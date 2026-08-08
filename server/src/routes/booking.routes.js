const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const bookingController = require("../controllers/booking.controller");

// Public — no login needed just to see which partner a mode redirects to,
// or to get the redirect URL (same as clicking a plain outbound link).
router.get("/partners", bookingController.getPartners);
router.get("/redirect-url", bookingController.getRedirectUrl);

router.use(authMiddleware);

router.post("/", bookingController.createBooking);
router.get("/", bookingController.getUserBookings);
router.get("/:id", bookingController.getBookingById);
router.put("/:id", bookingController.updateBooking);
router.delete("/:id", bookingController.deleteBooking);

module.exports = router;

