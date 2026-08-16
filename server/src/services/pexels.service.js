const axios = require("axios");

const BASE_URL = "https://api.pexels.com/v1/search";

const getDestinationImages = async (query, perPage = 6) => {
    try {
        if (!process.env.PEXELS_API_KEY) {
            console.error("PEXELS_API_KEY is missing from .env");
            return [];
        }

        const response = await axios.get(BASE_URL, {
            headers: {
                Authorization: process.env.PEXELS_API_KEY,
            },
            params: {
                query,
                per_page: perPage,
                orientation: "landscape",
            },
        });

        return response.data.photos.map((photo) => photo.src.large);
    } catch (error) {
        console.error(
            `Pexels error for "${query}":`,
            error.response?.data || error.message
        );

        return [];
    }
};

module.exports = {
    getDestinationImages,
};