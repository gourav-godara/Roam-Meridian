<<<<<<< HEAD
const Wishlist = require("../models/wishlist.model");
=======
const User = require("../models/user.model");
const Destination = require("../models/Destination");

const getWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate("wishlist");

        if (!user) {
            return res.status(404).json({
            success: false,
            message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            wishlist: user.wishlist,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
>>>>>>> 59984aef1c62f183b7f57fb3f6d16dba79aaeb30

/**
 * Add destination to wishlist
 */
const addToWishlist = async (req, res) => {
  try {
    const { destinationId } = req.body;

<<<<<<< HEAD
    if (!destinationId) {
      return res.status(400).json({
        success: false,
        message: "Destination ID is required.",
      });
=======
        const destination = await Destination.findById(destinationId);

        if(!destination) {
            return res.status(404).json({
                success: false,
                message: "Destination not found",
            });
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
            success: false,
            message: "User not found",
            });
        }

        if(
            user.wishlist.some(
                (id) => id.toString() === destinationId
            )
        ) {
            return res.status(400).json({
                success:false,
                message: "Destination already in wishlist",
            });
        }

        user.wishlist.push(destinationId);

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Added to wishlist",
            wishlist: user.wishlist,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
>>>>>>> 59984aef1c62f183b7f57fb3f6d16dba79aaeb30
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

<<<<<<< HEAD
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
=======
const removeFromWishlist = async (req, res) => {
    try {
        console.log("Params:", req.params);

        const { destinationId } = req.params;
        console.log("Destination ID:", destinationId);

        const user = await User.findById(req.user.id);
        console.log("User found:", !!user);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
>>>>>>> 59984aef1c62f183b7f57fb3f6d16dba79aaeb30

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

<<<<<<< HEAD
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
=======
        return res.status(200).json({
            success: true,
            message: "Removed from wishlist",
            wishlist: user.wishlist,
        });
    } catch (error) {
        console.error("Remove wishlist error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
>>>>>>> 59984aef1c62f183b7f57fb3f6d16dba79aaeb30
};

module.exports = {
  addToWishlist,
  getWishlist,
  removeWishlist,
};