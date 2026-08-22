const axios = require("axios");
const { getOrSet } = require("../utils/cache");

const fetchWeather = async (city) => {
    return getOrSet(
        `weather:en:${city.toLowerCase()}`,
        10 * 60 * 1000, // 10 minutes — weather doesn't change second to second
        async () => {
            const response = await axios.get(
                "https://api.openweathermap.org/data/2.5/weather",
                {
                    params: {
                        q: city,
                        appid: process.env.WEATHER_API_KEY,
                        units: "metric",
                        lang: "en",
                    },
                }
            );

            return {
                city: response.data.name,
                country: response.data.sys.country,
                temp: response.data.main.temp,
                condition: response.data.weather[0].description,
                humidity: response.data.main.humidity,
                wind: Number((response.data.wind.speed * 3.6).toFixed(1)),
                feelsLike: response.data.main.feels_like,
            };
        }
    );
};

const getWeather = async (req, res) => {
    try {

        const { city } = req.query;

        if (!city) {
            return res.status(400).json({
                success: false,
                message: "City is required",
            });
        }

        // API call to OpenWeather
        const weather = await fetchWeather(city);

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
    fetchWeather,
};