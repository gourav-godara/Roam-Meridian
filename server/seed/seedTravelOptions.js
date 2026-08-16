require("dotenv").config();

const connectDB = require("../src/config/db");
const TravelOption = require("../src/models/travelOption.model");

// Major Indian hub cities travelers would realistically search FROM.
const HUBS = ["Delhi", "Mumbai", "Bengaluru", "Chennai", "Kolkata", "Hyderabad"];

// Domestic destinations pulled from the existing destination seed data —
// these get flight + train + bus + car-rental options, since all four
// modes make sense for a domestic Indian trip.
const DOMESTIC_DESTINATIONS = [
  "Manali", "Shimla", "Leh", "Darjeeling", "Auli", "Kaza", "Nainital",
  "Mussoorie", "Munnar", "Ooty", "Kodaikanal", "Gangtok", "Mount Abu",
  "Panaji", "Kovalam", "Varkala", "Gokarna", "Puducherry", "Port Blair",
  "Diu", "Kavaratti", "Alappuzha", "Mahabalipuram", "Jaipur", "Udaipur",
  "Jodhpur", "Agra", "Hampi", "Khajuraho", "Mysore", "Varanasi",
  "Rishikesh", "Bir", "Madikeri", "Tawang", "Ramnagar", "Kaziranga",
];

// International destinations — flights only (no domestic train/bus/car
// rental inventory across an ocean).
const INTERNATIONAL_DESTINATIONS = [
  "Paris", "Dubai", "Denpasar", "Malé", "Interlaken", "Tokyo",
  "Singapore", "New York", "Rome", "Santorini",
];

const AIRLINES = ["IndiGo", "Air India", "Vistara", "SpiceJet", "Akasa Air"];
const INTL_AIRLINES = ["Air India", "Emirates", "Singapore Airlines", "Qatar Airways", "Vistara"];
const TRAIN_OPERATORS = ["Indian Railways"];
const BUS_OPERATORS = ["RedBus Travels", "VRL Travels", "SRS Travels", "Zing Bus"];
const CAR_AGENCIES = ["Zoomcar", "Revv", "MyChoize"];

const CAR_MODELS = [
  { model: "Maruti Swift", transmission: "Manual", fuelType: "Petrol", seats: 5 },
  { model: "Hyundai Creta", transmission: "Automatic", fuelType: "Diesel", seats: 5 },
  { model: "Mahindra Thar", transmission: "Manual", fuelType: "Diesel", seats: 4 },
  { model: "Toyota Innova", transmission: "Manual", fuelType: "Diesel", seats: 7 },
  { model: "Tata Nexon EV", transmission: "Automatic", fuelType: "Electric", seats: 5 },
];

const randomOf = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Spreads generated departures across the next 30 days so search-by-date
// actually has something to find regardless of what date the person tries.
function randomFutureDate(daysAhead = 30) {
  const date = new Date();
  date.setDate(date.getDate() + randomInt(1, daysAhead));
  date.setHours(randomInt(5, 22), randomOf([0, 15, 30, 45]), 0, 0);
  return date;
}

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

function buildFlight(origin, destination, international = false) {
  const departureTime = randomFutureDate();
  const durationMinutes = international
    ? randomInt(240, 900)
    : randomInt(75, 220);
  const airline = randomOf(international ? INTL_AIRLINES : AIRLINES);
  const totalSeats = randomInt(120, 180);
  const bookedAlready = randomInt(0, Math.floor(totalSeats * 0.6));

  return {
    mode: "flight",
    operator: airline,
    code: `${airline.slice(0, 2).toUpperCase()}-${randomInt(100, 999)}`,
    origin: { city: origin, terminal: `${origin} Airport` },
    destination: { city: destination, terminal: `${destination} Airport` },
    departureTime,
    arrivalTime: addMinutes(departureTime, durationMinutes),
    durationMinutes,
    price: international
      ? randomInt(28000, 85000)
      : randomInt(2800, 9500),
    totalSeats,
    seatsAvailable: totalSeats - bookedAlready,
    details: {
      class: randomOf(["Economy", "Economy", "Economy", "Premium Economy", "Business"]),
      stops: international ? randomOf([0, 0, 1]) : 0,
      baggage: "15kg check-in + 7kg cabin",
    },
  };
}

function buildTrain(origin, destination) {
  const departureTime = randomFutureDate();
  const durationMinutes = randomInt(300, 1200);
  const totalSeats = randomInt(60, 300);
  const bookedAlready = randomInt(0, Math.floor(totalSeats * 0.7));
  const trainClass = randomOf(["Sleeper", "AC 3-Tier", "AC 2-Tier", "AC First"]);

  const priceByClass = {
    Sleeper: randomInt(300, 900),
    "AC 3-Tier": randomInt(900, 1800),
    "AC 2-Tier": randomInt(1600, 2800),
    "AC First": randomInt(2800, 4500),
  };

  return {
    mode: "train",
    operator: randomOf(TRAIN_OPERATORS),
    code: String(randomInt(10000, 29999)),
    origin: { city: origin, terminal: `${origin} Junction` },
    destination: { city: destination, terminal: `${destination} Station` },
    departureTime,
    arrivalTime: addMinutes(departureTime, durationMinutes),
    durationMinutes,
    price: priceByClass[trainClass],
    totalSeats,
    seatsAvailable: totalSeats - bookedAlready,
    details: { trainClass },
  };
}

function buildBus(origin, destination) {
  const departureTime = randomFutureDate();
  const durationMinutes = randomInt(180, 720);
  const totalSeats = randomInt(30, 45);
  const bookedAlready = randomInt(0, Math.floor(totalSeats * 0.6));
  const busType = randomOf([
    "AC Sleeper", "Non-AC Seater", "Volvo Multi-Axle", "AC Seater/Sleeper",
  ]);

  return {
    mode: "bus",
    operator: randomOf(BUS_OPERATORS),
    code: `BUS-${randomInt(1000, 9999)}`,
    origin: { city: origin, terminal: `${origin} Bus Stand` },
    destination: { city: destination, terminal: `${destination} Bus Stand` },
    departureTime,
    arrivalTime: addMinutes(departureTime, durationMinutes),
    durationMinutes,
    price: randomInt(400, 2200),
    totalSeats,
    seatsAvailable: totalSeats - bookedAlready,
    details: { busType },
  };
}

function buildCarRental(city) {
  const pickupTime = randomFutureDate();
  const rentalDays = randomOf([1, 1, 2, 3, 5, 7]);
  const durationMinutes = rentalDays * 24 * 60;
  const car = randomOf(CAR_MODELS);
  const totalUnits = randomInt(3, 12);
  const bookedAlready = randomInt(0, Math.max(totalUnits - 1, 0));
  const pricePerDay = randomInt(1200, 5500);

  return {
    mode: "car",
    operator: randomOf(CAR_AGENCIES),
    code: `${car.model.split(" ")[0].slice(0, 3).toUpperCase()}-${randomInt(100, 999)}`,
    origin: { city, terminal: `${city} — Self Pickup Point` },
    destination: { city, terminal: `${city} — Self Drop-off Point` },
    departureTime: pickupTime,
    arrivalTime: addMinutes(pickupTime, durationMinutes),
    durationMinutes,
    price: pricePerDay * rentalDays,
    totalSeats: totalUnits,
    seatsAvailable: totalUnits - bookedAlready,
    details: {
      carModel: car.model,
      transmission: car.transmission,
      fuelType: car.fuelType,
      seats: car.seats,
    },
  };
}

async function seedTravelOptions() {
  try {
    await connectDB();

    console.log("🗑  Clearing old travel options...");
    await TravelOption.deleteMany({});

    const options = [];

    // Domestic: each hub -> each domestic destination, 2-4 departures per
    // mode per route, so search results feel like a real inventory
    // rather than exactly one result per query.
    HUBS.forEach((hub) => {
      DOMESTIC_DESTINATIONS.forEach((destination) => {
        if (hub === destination) return;

        const flightCount = randomInt(2, 4);
        for (let i = 0; i < flightCount; i++) {
          options.push(buildFlight(hub, destination));
        }

        // Not every hub-destination pair realistically has a direct
        // train/bus (e.g. flying to Port Blair) — skip those modes for
        // island/far destinations to keep the data plausible.
        const noRailOrRoad = ["Port Blair", "Kavaratti", "Leh", "Kaza"];

        if (!noRailOrRoad.includes(destination)) {
          const trainCount = randomInt(1, 3);
          for (let i = 0; i < trainCount; i++) {
            options.push(buildTrain(hub, destination));
          }

          const busCount = randomInt(1, 3);
          for (let i = 0; i < busCount; i++) {
            options.push(buildBus(hub, destination));
          }
        }
      });

      // Car rentals are searched by pickup city, not route — one per hub
      // and a few per popular destination.
      options.push(buildCarRental(hub));
    });

    DOMESTIC_DESTINATIONS.forEach((destination) => {
      const carCount = randomInt(1, 2);
      for (let i = 0; i < carCount; i++) {
        options.push(buildCarRental(destination));
      }
    });

    // International: flights only, from major hubs.
    ["Delhi", "Mumbai", "Bengaluru"].forEach((hub) => {
      INTERNATIONAL_DESTINATIONS.forEach((destination) => {
        const flightCount = randomInt(1, 3);
        for (let i = 0; i < flightCount; i++) {
          options.push(buildFlight(hub, destination, true));
        }
      });
    });

    console.log(`📦 Inserting ${options.length} travel options...`);
    await TravelOption.insertMany(options);

    console.log(`✅ Seeded ${options.length} travel options successfully.`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedTravelOptions();
