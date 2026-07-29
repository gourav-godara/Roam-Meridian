const express = require("express");

const {
  getAllTrips,
  createTrip,
  addToWishlist,
  getWishlist,
  getTripById,
  updateTrip,
  deleteTrip,
} = require("../controllers/trip.controller");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

router.get("/", authMiddleware, getAllTrips);

router.get("/user", authMiddleware, getAllTrips);

router.post("/", authMiddleware, createTrip);
router.post("/wishlist", authMiddleware, addToWishlist);
router.post("/wishlist/:destinationId", authMiddleware, addToWishlist);
router.get("/wishlist", authMiddleware, getWishlist);
router.get("/:id", authMiddleware, getTripById);
router.put("/:id", authMiddleware, updateTrip);
router.delete("/:id", authMiddleware, deleteTrip);

module.exports = router;
