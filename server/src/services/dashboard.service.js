// backend/src/services/dashboard.service.js
const Destination = require("../models/Destination");
const User = require("../models/user.model");
const Trip = require("../models/trip.model");
const Review = require("../models/review.model");
const Expense = require("../models/expense.model");
const getDashboardData = async (userId) => { // An async function that will later fetch data from MongoDB.
  const trips = await Trip.find({
    createdBy: userId,
}).populate("destinationId");
const today = new Date();

const totalTrips = trips.length;

const upcomingTrips = trips.filter(
    trip => new Date(trip.startDate) >= today
);

const completedTrips = trips.filter(
    trip => trip.status === "completed"
);
const countries = new Set();

trips.forEach((trip) => {
  if (trip.destinationId?.country) {
    countries.add(trip.destinationId.country);
  }
});
const recentReviews = await Review.find({
  user: userId,
})
  .populate("destination")
  .sort({ createdAt: -1 })
  .limit(5);
  const expenses = await Expense.find({
  $or: [
    { paidBy: userId },
    { participants: userId },
  ],
})
  .populate("paidBy", "name")
  .populate("participants", "name");
const totalSpent = expenses.reduce(
  (sum, expense) => sum + expense.amount,
  0
);
let youOwe = 0;
let youAreOwed = 0;

expenses.forEach((expense) => {
  if (expense.status === "Settled") return;

  const participants = expense.participants || [];

  if (participants.length === 0) return;

  const share = expense.amount / participants.length;

  const paidByMe =
    expense.paidBy._id.toString() === userId.toString();

  if (paidByMe) {
    // Others owe me
    participants.forEach((participant) => {
      if (participant._id.toString() !== userId.toString()) {
        youAreOwed += share;
      }
    });
  } else {
    // I owe the payer
    const iAmParticipant = participants.some(
      (participant) =>
        participant._id.toString() === userId.toString()
    );

    if (iAmParticipant) {
      youOwe += share;
    }
  }
});
const user = await User.findById(userId);
const destinations = await Destination.find().limit(4);
const upcomingTripData = upcomingTrips[0]
  ? {
      name: upcomingTrips[0].title,
      location:
        `${upcomingTrips[0].destinationId.city}, ${upcomingTrips[0].destinationId.country}`,
      dates:
        new Date(upcomingTrips[0].startDate).toLocaleDateString() +
        " - " +
        new Date(upcomingTrips[0].endDate).toLocaleDateString(),
      image: upcomingTrips[0].coverImage,
      companions: [],
      extraCompanions: upcomingTrips[0].collaborators.length,
      status: upcomingTrips[0].status,
    }
  : null;
  const calculateProgress = (trip) => {
  let progress = 20; // Trip exists

  if (trip.startDate && trip.endDate) progress += 20;
  if (trip.budget > 0) progress += 20;
  if (trip.itinerary && trip.itinerary.length > 0) progress += 40;

  return progress;
};
  const continuePlanning = trips
  .filter((trip) => trip.status === "planning")
  .map((trip) => ({
    id: trip._id,
    name: trip.title,
    location: `${trip.destinationId?.city}, ${trip.destinationId?.country}`,
    progress: calculateProgress(trip),
    image: trip.coverImage || "https://placehold.co/400x300",
  }));
  const recentBookings = trips
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .slice(0, 5)
  .map((trip) => ({
    id: trip._id,
    name: trip.title,
    location: `${trip.destinationId?.city}, ${trip.destinationId?.country}`,
    date: `Start: ${new Date(trip.startDate).toLocaleDateString()}`,
    status:
      trip.status.charAt(0).toUpperCase() + trip.status.slice(1),
    amount: `₹${trip.budget}`,
    image: trip.coverImage || "https://placehold.co/100x100",
  }));
  const recommendations = destinations.map((destination) => ({
  id: destination._id,
  name: destination.name,
  location: `${destination.city}, ${destination.country}`,
  rating: destination.rating.average,
  budget: `₹${destination.budget.min} - ₹${destination.budget.max}`,
  image:
    destination.images?.[0] || "https://placehold.co/300x200",
}));
const activityTimeline = [];

// Recent reviews
recentReviews.forEach((review) => {
  activityTimeline.push({
    id: review._id,
    icon: "star",
    text: `You reviewed ${
      review.destination?.name || "a destination"
    }`,
    time: new Date(review.createdAt).toLocaleDateString(),
  });
});

// Recent trips
trips.slice(0, 3).forEach((trip) => {
  activityTimeline.push({
    id: `trip-${trip._id}`,
    icon: "calendar",
    text: `Created trip "${trip.title}"`,
    time: new Date(trip.createdAt).toLocaleDateString(),
  });
});

// Recent expenses
expenses.slice(0, 3).forEach((expense) => {
  activityTimeline.push({
    id: `expense-${expense._id}`,
    icon: "sparkles",
    text: `Added expense of ₹${expense.amount}`,
    time: new Date(expense.createdAt).toLocaleDateString(),
  });
});

// Latest first
activityTimeline.sort(
  (a, b) => new Date(b.time) - new Date(a.time)
);
const positions = [
  { top: "25%", left: "45%" },
  { top: "35%", left: "60%" },
  { top: "50%", left: "30%" },
  { top: "65%", left: "70%" },
  { top: "20%", left: "80%" },
];

const mapPins = trips.map((trip, index) => ({
  id: trip._id,
  top: positions[index % positions.length].top,
  left: positions[index % positions.length].left,
  type: trip.status === "completed" ? "visited" : "wishlist",
}));

// Shaped for the dashboard's ReviewCard component
const recentReviewsFormatted = recentReviews.map((review) => ({
  id: review._id,
  destination: review.destination?.name || "Destination",
  image:
    review.images?.[0] ||
    review.destination?.images?.[0] ||
    "https://placehold.co/100x100",
  rating: review.rating,
  review: review.reviewText,
  createdAt: new Date(review.createdAt).toLocaleDateString(),
}));

  return { // Returns a massive object full of data arrays.
    user: {
  name: user.name,
  email: user.email,
  role: user.role,
  avatar: user.avatar || null,
},
    stats: [
  {
    key: "trips",
    label: "Total Trips",
    value: totalTrips,
    sub: `${upcomingTrips.length} upcoming`,
    icon: "briefcase",
  },
  {
    key: "places",
    label: "Places Visited",
    value: countries.size,
    sub: `${countries.size} countries`,
    icon: "mapPin",
  },
  {
    key: "spent",
    label: "Total Spent",
    value: `₹${totalSpent}`,
    sub: "All Time",
    icon: "wallet",
  },
  {
    key: "reviews",
    label: "Reviews Given",
    value: recentReviews.length,
    sub: "Helped others",
    icon: "star",
  },
],

  
    upcomingTrip: upcomingTripData,
continuePlanning,
recentBookings,
recommendations,

mapPins,

activityTimeline,

travelTip: {
  text: "Visit popular attractions early in the morning to avoid crowds.",
  },
    recentReviews: recentReviewsFormatted,

    expenseSummary: {
  totalSpent,
  youOwe: Number(youOwe.toFixed(2)),
  youAreOwed: Number(youAreOwed.toFixed(2)),
  recentExpenses: expenses.slice(0, 5),
},
    travelHistory: completedTrips,
  };
};

module.exports = {
  getDashboardData,
};