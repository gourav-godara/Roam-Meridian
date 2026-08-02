require("dotenv").config();

const axios = require("axios");

const connectDB = require("../src/config/db");
const Destination = require("../src/models/Destination");
const destinations = require("./destinations");

const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

async function fetchImages(query) {
  try {
    const response = await axios.get(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(
        query
      )}&per_page=6`,
      {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      }
    );

    return response.data.photos.map((photo) => photo.src.large);
  } catch (err) {
    console.log(`❌ Images not found for ${query}`);

    return [];
  }
}

const seedDestinations = async () => {
  try {
    await connectDB();

    console.log("🗑 Clearing old destinations...");
    await Destination.deleteMany({});

    console.log("📸 Fetching images from Pexels...");

    for (const destination of destinations) {
      destination.images = await fetchImages(destination.name);
    }

    console.log("📍 Inserting destinations...");
    await Destination.insertMany(destinations);

    console.log(`✅ Successfully inserted ${destinations.length} destinations`);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDestinations();