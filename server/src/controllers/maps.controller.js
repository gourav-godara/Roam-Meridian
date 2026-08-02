const axios = require("axios");
const { getRoute } = require("../services/route.service");
const { getNearbyPlaces } = require("../services/nearby.service");
const { getOrSet } = require("../utils/cache");

const fetchLocation = async (city, state, country) => {
    return getOrSet(
        `geocode:${city},${state},${country}`.toLowerCase(),
        24 * 60 * 60 * 1000, // 24 hours — coordinates for a place don't change
        async () => {
            const response = await axios.get(
                "https://nominatim.openstreetmap.org/search",
                {
                    params: {
                        q: `${city}, ${state}, ${country}`,
                        format: "json",
                        limit: 1,
                    },
                    headers: {
                        "User-Agent": "RoamMeridian/1.0",
                    },
                }
            );

            if (response.data.length === 0) {
                throw new Error("Location not found");
            }

            const location = response.data[0];

            return {
                latitude: location.lat,
                longitude: location.lon,
                address: location.display_name,
            };
        }
    );
};

const reverseGeocode = async (latitude, longitude) => {

    const response = await axios.get(
        "https://nominatim.openstreetmap.org/reverse",
        {
            params: {
                lat: latitude,
                lon: longitude,
                format: "json",
            },
            headers: {
                "User-Agent": "RoamMeridian/1.0",
            },
        }
    );

    const address = response.data.address;

    return {
        address: response.data.display_name,
        city: address.city || address.town || address.village || "",
        state: address.state || "",
        country: address.country || "",
    };
};

const getLocation = async (req, res) => {
    try {
        const { city, state, country } = req.query;

        if (!city) {
            return res.status(400).json({
                success: false,
                message: "City is required",
            });
        }

        const location = await fetchLocation(city, state, country);

        return res.status(200).json({
            success: true,
            location,
        });

    } catch (error) {
        console.error(error.response?.data || error.message || error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch location",
        });
    }
};

const getReverseLocation = async (req, res) => {
    try {
        const { lat, lng } = req.query;

        if (!lat || !lng) {
            return res.status(400).json({
                success: false,
                message: "Latitude and Longitude are required",
            });
        }

        const location = await reverseGeocode(lat, lng);

        res.status(200).json({
            success: true,
            data: location,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getRouteDetails = async (req, res) => {
    try {
        const {
            startLat,
            startLng,
            endLat,
            endLng,
        } = req.query;

        if (
            !startLat ||
            !startLng ||
            !endLat ||
            !endLng
        ) {
            return res.status(400).json({
                success: false,
                message: "Start and End coordinates are required",
            });
        }

        const route = await getRoute(
            startLat,
            startLng,
            endLat,
            endLng
        );

        res.status(200).json({
            success: true,
            data: route,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getNearby = async (req, res) => {
    try {

        const {
            lat,
            lng,
            type,
            radius,
        } = req.query;

        if (!lat || !lng || !type) {
            return res.status(400).json({
                success: false,
                message: "Latitude, Longitude and Type are required",
            });
        }

        const places = await getNearbyPlaces(
            lat,
            lng,
            type,
            radius
        );

        res.status(200).json({
            success: true,
            data: places,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getLocation,
    fetchLocation,
    reverseGeocode,
    getReverseLocation,
    getRouteDetails,
    getNearby,
};