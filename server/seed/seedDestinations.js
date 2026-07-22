require("dotenv").config();

const connectDB = require("../src/config/db");
const Destination = require("../src/models/Destination");
const destinations = require("./destinations");

const seedDestinations = async () => {
  try {
    await connectDB();

    console.log("🗑 Clearing old destinations...");
    await Destination.deleteMany({});

    console.log("📍 Inserting destinations...");
    await Destination.insertMany(destinations);

    console.log(`✅ Successfully inserted ${destinations.length} destinations`);

    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding Failed");
    console.error(err);

    process.exit(1);
  }
};

seedDestinations();