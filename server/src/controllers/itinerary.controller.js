const mongoose = require("mongoose");
const Itinerary = require("../models/itinerary.model");
const Destination = require("../models/Destination");

// GET /api/itineraries
// Public. Same filter/pagination shape as getAllDestinations so the
// frontend service layer and admin table can follow the pattern devs
// already know from destinationApi.js.
const getAllItineraries = async (req, res) => {
    try {
        const {
            search,
            destinationName,
            theme,
            minDays,
            maxDays,
            page = 1,
            limit = 12,
            sort,
        } = req.query;

        const filter = { published: true };

        if (search) {
            filter.$text = { $search: search };
        }

        if (destinationName) {
            filter.destinationName = { $regex: destinationName, $options: "i" };
        }

        if (theme) {
            filter.theme = theme;
        }

        if (minDays || maxDays) {
            filter.durationDays = {};
            if (minDays) filter.durationDays.$gte = Number(minDays);
            if (maxDays) filter.durationDays.$lte = Number(maxDays);
        }

        const pageNumber = parseInt(page) || 1;
        const limitNumber = parseInt(limit) || 12;
        const skip = (pageNumber - 1) * limitNumber;

        let sortOption = { createdAt: -1 };
        if (sort === "duration") sortOption = { durationDays: 1 };
        else if (sort === "name") sortOption = { destinationName: 1 };

        const itineraries = await Itinerary.find(filter)
            .select("-days.activities -days.restaurants") // list view doesn't need full day detail
            .sort(sortOption)
            .skip(skip)
            .limit(limitNumber);

        const total = await Itinerary.countDocuments(filter);

        return res.status(200).json({
            success: true,
            message: "Itineraries fetched successfully",
            currentPage: pageNumber,
            totalPages: Math.ceil(total / limitNumber),
            totalItineraries: total,
            count: itineraries.length,
            data: itineraries,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// GET /api/itineraries/:id
// Public. Full day-by-day detail, including the linked destination's
// images/rating so the detail page doesn't need a second round trip.
const getItineraryById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid itinerary ID",
            });
        }

        const itinerary = await Itinerary.findById(req.params.id).populate(
            "destination",
            "name city state country images rating category"
        );

        if (!itinerary || !itinerary.published) {
            return res.status(404).json({
                success: false,
                message: "Itinerary not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Itinerary fetched successfully",
            data: itinerary,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// POST /api/itineraries — admin only
const createItinerary = async (req, res) => {
    try {
        const { destination: destinationId } = req.body;

        if (!destinationId || !mongoose.Types.ObjectId.isValid(destinationId)) {
            return res.status(400).json({
                success: false,
                message: "A valid destination is required.",
            });
        }

        const destinationDoc = await Destination.findById(destinationId);
        if (!destinationDoc) {
            return res.status(404).json({
                success: false,
                message: "Destination not found",
            });
        }

        const itinerary = await Itinerary.create({
            ...req.body,
            destinationName: destinationDoc.name,
            createdBy: req.user.id,
        });

        return res.status(201).json({
            success: true,
            message: "Itinerary created successfully",
            data: itinerary,
        });
    } catch (error) {
        console.error(error);

        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: Object.values(error.errors)[0]?.message || "Invalid itinerary data.",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// PUT /api/itineraries/:id — admin only
const updateItinerary = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid itinerary ID",
            });
        }

        const updates = { ...req.body };

        // If the destination is being changed, keep the denormalized
        // name in sync rather than trusting whatever the client sent.
        if (updates.destination) {
            if (!mongoose.Types.ObjectId.isValid(updates.destination)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid destination ID",
                });
            }
            const destinationDoc = await Destination.findById(updates.destination);
            if (!destinationDoc) {
                return res.status(404).json({
                    success: false,
                    message: "Destination not found",
                });
            }
            updates.destinationName = destinationDoc.name;
        }

        const itinerary = await Itinerary.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true, runValidators: true }
        );

        if (!itinerary) {
            return res.status(404).json({
                success: false,
                message: "Itinerary not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Itinerary updated successfully",
            data: itinerary,
        });
    } catch (error) {
        console.error(error);

        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: Object.values(error.errors)[0]?.message || "Invalid itinerary data.",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// DELETE /api/itineraries/:id — admin only
const deleteItinerary = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid itinerary ID",
            });
        }

        const itinerary = await Itinerary.findByIdAndDelete(req.params.id);

        if (!itinerary) {
            return res.status(404).json({
                success: false,
                message: "Itinerary not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Itinerary deleted successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// GET /api/itineraries/by-destination/:destinationId
// Public. Used on the Destination detail page to show "Suggested
// itineraries for this place" without a separate search-by-name call.
const getItinerariesByDestination = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.destinationId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid destination ID",
            });
        }

        const itineraries = await Itinerary.find({
            destination: req.params.destinationId,
            published: true,
        })
            .select("-days.activities -days.restaurants")
            .sort({ durationDays: 1 });

        return res.status(200).json({
            success: true,
            message: "Itineraries fetched successfully",
            count: itineraries.length,
            data: itineraries,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = {
    getAllItineraries,
    getItineraryById,
    createItinerary,
    updateItinerary,
    deleteItinerary,
    getItinerariesByDestination,
};