const User = require("../models/user.model");
const Destination = require("../models/Destination");

const getWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate("wishlist");

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

const addToWishlist = async (req, res) => {
    try {
        const { destinationId } = req.params;

        const destination = await Destination.findById(destinationId);

        if(!destination) {
            return res.status(404).json({
                success: false,
                message: "Destination not found",
            });
        }

        const user = await User.findById(req.user.id);

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
    }
};

const removeFromWishlist = async (req, res) => {
    try {
        const {destination } = req.params;

        const user = await User.findById(req.user.id);

        user.wishlist = user.wishlist.filter(
            (id) => id.toString() !== destinationId
        );

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Removed from wishlist",
            wishlist: user.wishlist,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
};