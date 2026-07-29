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

router.post("/wishlist/:destinationId", authMiddleware, addToWishlist);
router.post("/wishlist", authMiddleware, addToWishlist);
<<<<<<< HEAD
router.post("/wishlist/:destinationId", authMiddleware, addToWishlist);
router.get("/wishlist", authMiddleware, getWishlist);
=======

>>>>>>> 59984aef1c62f183b7f57fb3f6d16dba79aaeb30
router.get("/:id", authMiddleware, getTripById);
router.put("/:id", authMiddleware, updateTrip);
router.delete("/:id", authMiddleware, deleteTrip);

module.exports = router;