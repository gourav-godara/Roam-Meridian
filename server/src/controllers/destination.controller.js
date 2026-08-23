const Destination = require("../models/Destination");
const mongoose = require("mongoose");
const { fetchWeather } = require("./weather.controller");
const { fetchLocation } = require("./maps.controller");
const { getDestinationImages } = require("../services/pexels.service");


const getAllDestinations = async (req, res) => {
    try {

        const {
            search,
            city,
            state,
            country,
            category,
            minBudget,
            maxBudget,
            rating,
            page = 1,
            limit = 10,
            sort,
        } = req.query;

        const filter = {};

        // Search by destination name, city, or country
        if (search) {
            const regex = { $regex: search, $options: "i" };
            filter.$or = [
                { name: regex },
                { city: regex },
                { country: regex },
            ];
        }

        // Filters
        if (city) {
            filter.city = city;
        }
        
        if (state) {
            filter.state = state;
        }

        if (country) {
            filter.country = country;
        }

        if (category) {
            filter.category = category;
        }

        // Budget Filter
        // Budget Filter

        if (maxBudget) {
            filter["budget.min"] = {
                $lte: Number(maxBudget),
            };
        }

        if (minBudget) {
            filter["budget.max"] = {
                $gte: Number(minBudget),
            };
        }

        // Rating Filter
        if (rating) {
            filter["rating.average"] = {
                $gte: Number(rating),
            };
        }
        
        // If parsing succeeds, use the parsed number.
        const pageNumber = parseInt(page) || 1;
        const limitNumber = parseInt(limit) || 10;

        // Calculate how many documents to skip
        const skip = (pageNumber - 1) * limitNumber;

        // Object to store sorting option
        let sortOption = {};

        if (sort === "name") {
            sortOption.name = 1;
        }
        else if (sort === "rating") {
            sortOption["rating.average"] = -1;
        }
        else if (sort === "budget") {
            sortOption["budget.min"] = 1;
        }
        else if (sort === "newest") {
            sortOption.createdAt = -1;
        }

        // Fetch paginated data
        const destinations = await Destination.find(filter)
            .sort(sortOption)
            .skip(skip)
            .limit(limitNumber);

        // Total matching documents
        const total = await Destination.countDocuments(filter);

        res.status(200).json({
            success: true,
            message: "Destinations fetched successfully",

            currentPage: pageNumber,
            totalPages: Math.ceil(total / limitNumber),
            totalDestinations: total,

            count: destinations.length,
            data: destinations,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};


const getDestinationById = async (req, res) => {
    try {

        // Check if the provided ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid destination ID",
            });
        }

        // Find destination by ID
        const destination = await Destination.findById(req.params.id);

        // Destination not found
        if (!destination) {
            return res.status(404).json({
                success: false,
                message: "Destination not found",
            });
        }

        // Fetch weather
        let weather = null;

        try {
            weather = await fetchWeather(destination.city);
        } catch (error) {
            console.log("Weather service unavailable");
        }

        // Send final response
        return res.status(200).json({
            success: true,
            message: "Destination fetched successfully",
            destination,
            weather,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

const createDestination = async (req, res) => {
    try {

        const { city, state, country, name, images } = req.body;

        const location = await fetchLocation(
            city,
            state,
            country
        );

        // Admins previously had to paste image URLs by hand. Now the admin
        // form leaves this blank by default and images are pulled from
        // Pexels automatically, using the destination name/city as the
        // search query — the manual field still exists as an optional
        // override for the rare place Pexels doesn't have good photos for.
        const providedImages = (images || [])
            .map((url) => (url || "").trim())
            .filter(Boolean);

        const resolvedImages = providedImages.length
            ? providedImages
            : await getDestinationImages(`${name || city} ${country || ""}`.trim());

        const destinationData = {
            ...req.body,
            images: resolvedImages,

            location: {
                latitude: Number(location.latitude),
                longitude: Number(location.longitude),
            },
        };

        const destination = await Destination.create(destinationData);

        return res.status(201).json({
            success: true,
            message: "Destination created successfully",
            data: destination,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

const updateDestination = async (req, res) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid destination ID",
            });
        }

        const updateData = { ...req.body };

        // If the admin cleared the image list on an edit (rather than
        // simply not touching it), treat that as "fetch fresh photos"
        // instead of saving an empty gallery — mirrors the auto-fetch on
        // create. Leaving `images` out of the request entirely, or
        // sending existing URLs, leaves the current images untouched.
        if (Array.isArray(updateData.images)) {
            const providedImages = updateData.images
                .map((url) => (url || "").trim())
                .filter(Boolean);

            if (providedImages.length === 0) {
                const query = `${updateData.name || updateData.city || ""} ${updateData.country || ""}`.trim();
                updateData.images = query
                    ? await getDestinationImages(query)
                    : [];
            } else {
                updateData.images = providedImages;
            }
        }

        const destination = await Destination.findByIdAndUpdate(
            req.params.id,
            updateData,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!destination) {
            return res.status(404).json({
                success: false,
                message: "Destination not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Destination updated successfully",
            data: destination,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};


const deleteDestination = async (req, res) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid destination ID",
            });
        }
        
        const destination = await Destination.findByIdAndDelete(req.params.id);

        if (!destination) {
            return res.status(404).json({
                success: false,
                message: "Destination not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Destination deleted successfully",
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};


module.exports = {
    getAllDestinations,
    getDestinationById,
    createDestination,
    updateDestination,
    deleteDestination,
};

