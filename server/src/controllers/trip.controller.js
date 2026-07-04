const Trip = require("../models/trip.model");

const getAllTrips = async (req, res) => {
    try {
        const trips = await Trip.find();

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

module.exports = {
    getAllTrips,
};