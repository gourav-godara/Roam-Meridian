const Trip = require("../models/trip.model");

const getAllTrips = async (req, res) => {
    try {
        const trips = await Trip.find({
            createdBy: req.user.id,
        });

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

module.exports = {
    getAllTrips,
    createTrip,
};