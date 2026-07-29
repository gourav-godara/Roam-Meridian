const Wishlist = require("../models/wishlist.model");

/**
 * Add destination to wishlist
 */
const addToWishlist = async (req, res) => {
  try {
    const { destinationId } = req.body;

    if (!destinationId) {
      return res.status(400).json({
        success: false,
        message: "Destination ID is required.",
      });
    }

    // Check duplicate
    const existing = await Wishlist.findOne({
      user: req.user.id,
      destination: destinationId,
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Destination already in wishlist.",
      });
    }

    const wishlistItem = await Wishlist.create({
      user: req.user.id,
      destination: destinationId,
    });

    return res.status(201).json({
      success: true,
      message: "Added to wishlist.",
      data: wishlistItem,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to add wishlist item.",
    });
  }
};

/**
 * Get user's wishlist
 */
const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({
      user: req.user.id,
    }).populate("destination");

    return res.status(200).json({
      success: true,
      count: wishlist.length,
      data: wishlist,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch wishlist.",
    });
  }
};

/**
 * Remove destination from wishlist
 */
const removeWishlist = async (req, res) => {
  try {
    const { destinationId } = req.params;

    await Wishlist.findOneAndDelete({
      user: req.user.id,
      destination: destinationId,
    });

    return res.status(200).json({
      success: true,
      message: "Removed from wishlist.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to remove wishlist item.",
    });
  }
};

module.exports = {
  addToWishlist,
  getWishlist,
  removeWishlist,
};