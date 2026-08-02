const axios = require("axios");

const BASE_URL = "https://api.pexels.com/v1/search";

const getDestinationImages = async (query, perPage = 6) => {
  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: process.env.PEXELS_API_KEY,
      },
      params: {
        query,
        per_page: perPage,
      },
    });

    return response.data.photos.map((photo) => photo.src.large2x);
  } catch (err) {
    console.log(err.message);
    return [];
  }
};

module.exports = {
  getDestinationImages,
};