const axios = require("axios");
const { getOrSet } = require("../utils/cache");
const { hasNonLatin, translateBatch } = require("../utils/translator");

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

/**
 * Attempts to extract an English name from Geoapify/OpenStreetMap metadata
 * before falling back to machine translation.
 */
function extractEnglishCandidate(properties = {}) {
    const raw = properties.datasource?.raw || {};

    const candidates = [
        properties.name_international?.en,
        raw["name:en"],
        raw["int_name"],
        raw["name:en_rm"],
        raw["alt_name:en"],
        raw["brand:en"],
        properties.name_other?.en,
        properties.name_other?.["name:en"],
    ];

    for (const candidate of candidates) {
        if (
            candidate &&
            typeof candidate === "string" &&
            candidate.trim().length > 0 &&
            !hasNonLatin(candidate)
        ) {
            return candidate.trim();
        }
    }

    // Check address_line1 if it's already in Latin characters and not just numbers
    if (
        properties.address_line1 &&
        typeof properties.address_line1 === "string" &&
        !hasNonLatin(properties.address_line1) &&
        !/^\d+[\s,/-]*$/.test(properties.address_line1.trim())
    ) {
        return properties.address_line1.trim();
    }

    // Check original name if already in Latin script
    if (
        properties.name &&
        typeof properties.name === "string" &&
        !hasNonLatin(properties.name)
    ) {
        return properties.name.trim();
    }

    return properties.name || "Unknown Place";
}

const getNearbyPlaces = async (
    lat,
    lng,
    type,
    radius = 1000
) => {
    const category = placeTypes[type];

    if (!category) {
        throw new Error("Invalid place type");
    }

    const cacheKey = `nearby:en:v3:${category}:${Number(lat).toFixed(
        3
    )}:${Number(lng).toFixed(3)}:${radius}`;

    return getOrSet(
        cacheKey,
        30 * 60 * 1000,
        async () => {
            const response = await axios.get(
                "https://api.geoapify.com/v2/places",
                {
                    params: {
                        categories: category,
                        filter: `circle:${lng},${lat},${radius}`,
                        limit: 20,
                        lang: "en",
                        apiKey: process.env.GEOAPIFY_API_KEY,
                    },
                    timeout: 10000,
                }
            );

            const features = response.data?.features || [];

            const rawPlaces = features.map((place) => {
                const properties = place.properties || {};
                const name = extractEnglishCandidate(properties);
                const address = properties.formatted || "";

                return {
                    name,
                    address,
                    latitude: properties.lat,
                    longitude: properties.lon,
                    category: properties.categories || [],
                };
            });

            // Translate non-Latin names and addresses efficiently in batches
            const namesToTranslate = rawPlaces.map((p) => p.name);
            const addressesToTranslate = rawPlaces.map((p) => p.address);

            const [translatedNames, translatedAddresses] = await Promise.all([
                translateBatch(namesToTranslate),
                translateBatch(addressesToTranslate),
            ]);

            const places = rawPlaces.map((p, idx) => ({
                ...p,
                name: translatedNames[idx] || p.name,
                address: translatedAddresses[idx] || p.address,
            }));

            return places;
        }
    );
};

module.exports = {
    getNearbyPlaces,
};