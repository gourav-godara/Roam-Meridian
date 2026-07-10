const axios = require("axios");

const fetchLocation = async (city) => {
    const response = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
            params: {
                q: city,
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
};

const getLocation = async (req, res) => {
    try {
        const { city } = req.query;

        if (!city) {
            return res.status(400).json({
                success: false,
                message: "City is required",
            });
        }

        const location = await fetchLocation(city);

        return res.status(200).json({
            success: true,
            location,
        });

    } catch (error) {
        console.error(error.response?.data || error.message || error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch location",
        });
    }
};

module.exports = {
    getLocation,
    fetchLocation,
};