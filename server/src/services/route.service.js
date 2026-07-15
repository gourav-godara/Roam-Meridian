const axios = require("axios");

const getRoute = async (
    startLat,
    startLng,
    endLat,
    endLng
) => {

    const response = await axios.get(

        `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${endLng},${endLat}`,

        {
            params: {
                overview: "full",
                geometries: "geojson",
            },
        }
    );

    if (
        !response.data.routes ||
        response.data.routes.length === 0
    ) {
        throw new Error("Route not found");
    }

    const route = response.data.routes[0];

    return {

        distance: route.distance,

        duration: route.duration,

        geometry: route.geometry,

    };
};

module.exports = {
    getRoute,
};