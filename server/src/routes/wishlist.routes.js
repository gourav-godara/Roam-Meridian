const express = require("express");
const router = express.Router();

const {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
} = require("../controllers/wishlist.controller");

const authMiddleware = require("../middleware/auth.middleware");

router.get("/", authMiddleware, getWishlist);

router.post("/:destinationId", authMiddleware, addToWishlist);

router.delete("/:destinationId", authMiddlweare, removeFromWishlist);

module.exports = router;