const Trip = require("../models/trip.model");

const getAllTrips = async (req, res) => {
    try {
        const trips = await Trip.find({
            $or: [
                { createdBy: req.user.id },
                { collaborators: req.user.id },
            ],
        })
        .populate("destinationId", "name city country")
        .populate("createdBy", "name email")
        .populate("collaborators", "name email");

        res.status(200).json({
            success: true,
            count: trips.length,
            data: trips,
        });
    } catch (error){
        console.error("Error fetching trips:", error);

        res.status(500).json({
            success: false,
            message: "failed to fetch trips",
        });
    }
};

const createTrip = async (req, res) => {
    const {
        title,
        destinationId,
        startDate,
        endDate,
        travelers,
        budget,
        itinerary,
        collaborators,
        coverImage,
        isPublic,
    } = req.body;

    if(
        !title ||
        !destinationId ||
        !startDate ||
        !endDate ||
        travelers === undefined ||
        budget === undefined
    ) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required fields.",
        });
    }

    try {
        const trip = await Trip.create({
            title,
            destinationId,
            createdBy: req.user.id,
            collaborators,
            coverImage,
            startDate,
            endDate,
            travelers,
            budget,
            itinerary,
            isPublic,
        });

        return res.status(201).json({
            success: true,
            message: "Trip created successfully.",
            data: trip,
        });

    } catch (error) {
        console.error("Error creating trip:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create trip."
        });
    }
}

const addToWishlist = async (req, res) => {
    const { destinationId } = req.body;

    if (!destinationId) {
        return res.status(400).json({
            success: false,
            message: "Destination ID is required.",
        });
    }

    try {
        // Check if destination is already in wishlist
        const existingTrip = await Trip.findOne({
            createdBy: req.user.id,
            destinationId,
            status: "wishlist",
        });

        if (existingTrip) {
            return res.status(409).json({
                success: false,
                message: "Destination already exists in wishlist.",
            });
        }

        // Create wishlist entry
        const wishlistTrip = await Trip.create({
            title: "Wishlist",
            destinationId,
            createdBy: req.user.id,
            startDate: new Date(),
            endDate: new Date(),
            travelers: 1,
            budget: 0,
            status: "wishlist",
        });

        return res.status(201).json({
            success: true,
            message: "Added to wishlist successfully.",
            data: wishlistTrip,
        });

    } catch (error) {
        console.error("Error adding to wishlist:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to add destination to wishlist.",
        });
    }
};
const getTripById = async (req, res) => {
    const { id } = req.params;

    try {
        const trip = await Trip.findOne({
            _id: id,
            $or: [
                { createdBy: req.user.id },
                { collaborators: req.user.id },
            ],
        })
            .populate("destinationId", "name city country")
            .populate("createdBy", "name email")
            .populate("collaborators", "name email");

        if(!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found.",
            });
        }

        return res.status(200).json({
            success: true,
            data: trip,
        });
    } catch (error) {
        console.error("Error fetching trip:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch trip.",
        });
    }
};

const updateTrip = async (req, res)  => {
    const { id } = req.params;

    try {
        const updates = req.body;

        const updatedTrip = await Trip.findOneAndUpdate(
            {
                _id: id,
                createdBy: req.user.id,
            },
            updates,
            {
                new: true,
                runValidators: true,
            }
        );

        if(!updatedTrip) {
            return res.status(404).json({
                success: false,
                message: "trip not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Trip updated successfully.",
            data: updatedTrip,
        });
    } catch (error) {
        console.error("Error updating trip:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update trip.",
        });
    }
};

const deleteTrip = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTrip = await Trip.findOneAndDelete({
            _id: id,
            createdBy: req.user.id,
        });

        if(!deletedTrip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Trip deleted successfully.",
        });

    } catch (error) {
        console.error("Error deleting trip:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete trip.",
        });
    }
};

module.exports = {
    getAllTrips,
    createTrip,
    addToWishlist,
    getTripById,
    updateTrip,
    deleteTrip,
};
