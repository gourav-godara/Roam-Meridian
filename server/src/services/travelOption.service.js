const TravelOption = require("../models/travelOption.model");

// Searches the seeded inventory. See the NOTE ON DATA SOURCE comment in
// travelOption.model.js — this is the one function you'd swap out to call
// a real airline/rail/bus API instead, without touching the controller,
// routes, or any frontend code, since the return shape would stay the
// same.
const searchTravelOptions = async ({
  mode,
  originCity,
  destinationCity,
  date, // yyyy-mm-dd, matches departureTime's calendar day
  passengers = 1,
  page = 1,
  limit = 20,
}) => {
  const filter = { isActive: true };

  if (mode) filter.mode = mode;

  if (originCity) {
    filter["origin.city"] = { $regex: `^${originCity}$`, $options: "i" };
  }

  if (destinationCity) {
    filter["destination.city"] = {
      $regex: `^${destinationCity}$`,
      $options: "i",
    };
  }

  if (date) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    filter.departureTime = { $gte: start, $lte: end };
  }

  filter.seatsAvailable = { $gte: Number(passengers) || 1 };

  const pageNumber = parseInt(page) || 1;
  const limitNumber = parseInt(limit) || 20;
  const skip = (pageNumber - 1) * limitNumber;

  const [options, total] = await Promise.all([
    TravelOption.find(filter)
      .sort({ departureTime: 1 })
      .skip(skip)
      .limit(limitNumber),
    TravelOption.countDocuments(filter),
  ]);

  return {
    options,
    total,
    currentPage: pageNumber,
    totalPages: Math.ceil(total / limitNumber),
  };
};

// Distinct city names available for a given mode — powers the "From" /
// "To" autocomplete on the search form so users aren't guessing at valid
// input.
const getAvailableCities = async (mode) => {
  const filter = { isActive: true };
  if (mode) filter.mode = mode;

  const [origins, destinations] = await Promise.all([
    TravelOption.distinct("origin.city", filter),
    TravelOption.distinct("destination.city", filter),
  ]);

  const cities = new Set([...origins, ...destinations]);
  return Array.from(cities).sort();
};

const getTravelOptionById = async (id) => {
  return TravelOption.findById(id);
};

module.exports = {
  searchTravelOptions,
  getAvailableCities,
  getTravelOptionById,
};
