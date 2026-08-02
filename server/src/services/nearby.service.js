const axios = require("axios");
const { getOrSet } = require("../utils/cache");

const placeTypes = {
    restaurant: "catering.restaurant",
    hotel: "accommodation.hotel",
    cafe: "catering.cafe",
    hospital: "healthcare.hospital",
    atm: "service.financial.atm",
    petrol_pump: "service.vehicle.fuel",
    tourist_attraction: "tourism.sights",
    things_to_do: "entertainment",
    bus_stop: "public_transport",
};

const getNearbyPlaces = async (lat, lng, type, radius = 1000) => {

    const category = placeTypes[type];

    if (!category) {
        throw new Error("Invalid place type");
    }

    // Round coordinates slightly so nearby requests for "the same spot"
    // hit the cache instead of calling the API every time.
    const cacheKey = `nearby:${category}:${Number(lat).toFixed(3)}:${Number(
        lng
    ).toFixed(3)}:${radius}`;

    return getOrSet(cacheKey, 30 * 60 * 1000, async () => {
        const response = await axios.get(
            "https://api.geoapify.com/v2/places",
            {
                params: {
                    categories: category,
                    filter: `circle:${lng},${lat},${radius}`,
                    limit: 20,
                    apiKey: process.env.GEOAPIFY_API_KEY,
                },
                timeout: 10000,
            }
        );

        return response.data.features.map((place) => ({
            name: place.properties.name || "Unknown Place",
            latitude: place.properties.lat,
            longitude: place.properties.lon,
            address: place.properties.formatted || "",
            category: place.properties.categories || [],
        }));
    });
};

module.exports = {
    getNearbyPlaces,
};