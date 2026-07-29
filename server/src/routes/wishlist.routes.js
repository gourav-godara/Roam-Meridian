const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  addToWishlist,
  getWishlist,
  removeWishlist,
} = require("../controllers/wishlist.controller");

router.use(authMiddleware);

router.get("/", getWishlist);

router.post("/", addToWishlist);

router.delete("/:destinationId", removeWishlist);

module.exports = router;