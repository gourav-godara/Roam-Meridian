const axios = require("axios");

const getWeather = async (req, res) => {
    try {

    const { city } = req.query;

    if (!city) {
        return res.status(400).json({
            success: false,
            message: "City is required",
        });
    }
    
    //API call to OpenWeather
    const response = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
        params: {
            q: city,
            appid: process.env.WEATHER_API_KEY,
            units: "metric",
        },
    }
);

    // ⬇️ Add the weather object here
    const weather = {
        city: response.data.name,
        country: response.data.sys.country,
        temperature: response.data.main.temp,
        description: response.data.weather[0].description,
        humidity: response.data.main.humidity,
        windSpeed: response.data.wind.speed,
    };

    // ⬇️ Then return it here
    return res.status(200).json({
        success: true,
        weather,
    });

    } catch (error) {
        console.error(error.response?.data || error.message || error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch weather",
        });
    }
};

module.exports = {
    getWeather,
};