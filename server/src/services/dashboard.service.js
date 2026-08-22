// backend/src/services/dashboard.service.js
const Destination = require("../models/Destination");
const User = require("../models/user.model");
const Trip = require("../models/trip.model");
const Review = require("../models/review.model");
const Expense = require("../models/expense.model");

const getDashboardData = async (userId) => {
  const trips = await Trip.find({
  createdBy: userId,
  status: { $ne: "wishlist" },
}).populate("destinationId");

  const today = new Date();

  const totalTrips = trips.length;

  const upcomingTrips = trips.filter(
    (trip) => new Date(trip.startDate) >= today
  );

  const completedTrips = trips.filter((trip) => trip.status === "completed");

  // Countries the user has actually completed a trip in — used for the
  // "Places Visited" stat. Previously this counted countries across ALL
  // trips (including ones not yet taken), which mislabeled the stat.
  const visitedCountries = new Set();
  completedTrips.forEach((trip) => {
    if (trip.destinationId?.country) {
      visitedCountries.add(trip.destinationId.country);
    }
  });

  const recentReviews = await Review.find({
    user: userId,
  })
    .populate("destination")
    .sort({ createdAt: -1 })
    .limit(5);

  // paidBy/participants can each be a real User or a name-only trip
  // companion (see Trip.companions), disambiguated per-entry by
  // paidByModel / participants[].model. Only the "User" side can ever
  // match this dashboard's userId, and Mongoose can't .populate() a
  // mixed refPath array the simple way, so we populate just the User
  // rows and treat everything else (companions, or a since-deleted
  // user) as an unresolvable participant that's skipped in the
  // owe/owed math below rather than crashing on a missing _id.
  const expenses = await Expense.find({
    $or: [
      { paidBy: userId, paidByModel: "User" },
      { participants: { $elemMatch: { id: userId, model: "User" } } },
    ],
  })
    .populate({ path: "paidBy", select: "name", strictPopulate: false })
    .populate({
      path: "participants.id",
      select: "name",
      strictPopulate: false,
    });

  const totalSpent = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  // A participant's populated id is only a real user doc when the
  // subdocument's model is "User" — for a companion entry, participants.id
  // is left as the raw ObjectId (refPath skips it), so isUserParticipant
  // is the guard that keeps the math below from ever calling .toString()
  // on the wrong shape or counting a companion as someone who can owe/be
  // owed in-app.
  const isUserParticipant = (participant) =>
    participant.model === "User" && participant.id && participant.id._id;

  let youOwe = 0;
  let youAreOwed = 0;

  expenses.forEach((expense) => {
    if (expense.status === "Settled") return;

    // paidBy can be null if paidByModel is "Companion" (not populated) or
    // that user was later deleted — guard against it instead of letting
    // `.toString()` throw and silently blanking the whole dashboard for
    // this user.
    if (expense.paidByModel !== "User" || !expense.paidBy) return;

    const allParticipants = expense.participants || [];
    // Companions can't owe/be owed in-app (no account), so only real users
    // count toward the split here.
    const participants = allParticipants.filter(isUserParticipant);

    if (participants.length === 0) return;

    // Split the bill amongst everyone who shares it, INCLUDING the payer.
    // The previous version divided only by participants.length and then
    // only charged non-payer participants, which effectively refunded the
    // payer's own share back to them in full — payer paid the amount but
    // got reimbursed for the whole thing, not just the others' shares.
    const payerIsParticipant = participants.some(
      (participant) => participant.id._id.toString() === userId.toString()
    );
    const shareCount = payerIsParticipant
      ? participants.length
      : participants.length + 1;
    const share = expense.amount / shareCount;

    const paidByMe = expense.paidBy._id.toString() === userId.toString();

    if (paidByMe) {
      // Others owe me their share each
      participants.forEach((participant) => {
        if (participant.id._id.toString() !== userId.toString()) {
          youAreOwed += share;
        }
      });
    } else {
      // I owe the payer my share, if I'm one of the participants
      const iAmParticipant = participants.some(
        (participant) => participant.id._id.toString() === userId.toString()
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
        // Guard against a trip whose destination was deleted/never set —
        // previously this threw a TypeError and the whole dashboard
        // request failed with a 500.
        location: upcomingTrips[0].destinationId
          ? `${upcomingTrips[0].destinationId.city}, ${upcomingTrips[0].destinationId.country}`
          : "Destination unavailable",
        dates:
          new Date(upcomingTrips[0].startDate).toLocaleDateString() +
          " - " +
          new Date(upcomingTrips[0].endDate).toLocaleDateString(),
        image:
  upcomingTrips[0].coverImage ||
  upcomingTrips[0].destinationId?.images?.[0] ||
  "https://placehold.co/400x300",
        companions: [],
        extraCompanions:
          upcomingTrips[0].collaborators.length +
          (upcomingTrips[0].companions?.length || 0),
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
      location: trip.destinationId
        ? `${trip.destinationId.city}, ${trip.destinationId.country}`
        : "Destination unavailable",
      progress: calculateProgress(trip),
      image:
  trip.coverImage ||
  trip.destinationId?.images?.[0] ||
  "https://placehold.co/400x300",
    }));

  const recommendations = destinations.map((destination) => ({
    id: destination._id,
    name: destination.name,
    location: `${destination.city}, ${destination.country}`,
    rating: destination.rating.average,
    budget: `₹${destination.budget.min} - ₹${destination.budget.max}`,
    image: destination.images?.[0] || "https://placehold.co/300x200",
  }));

  // Build the activity timeline with a real Date object kept alongside the
  // display string, so we can sort chronologically before formatting.
  // The previous version sorted AFTER converting to toLocaleDateString(),
  // which compares strings like "7/9/2026" vs "7/26/2026" lexicographically
  // — not chronologically — so "latest first" was effectively random.
  const activityTimelineRaw = [];

  recentReviews.forEach((review) => {
    activityTimelineRaw.push({
      id: review._id,
      icon: "star",
      text: `You reviewed ${review.destination?.name || "a destination"}`,
      date: new Date(review.createdAt),
    });
  });

  trips.slice(0, 3).forEach((trip) => {
    activityTimelineRaw.push({
      id: `trip-${trip._id}`,
      icon: "calendar",
      text: `Created trip "${trip.title}"`,
      date: new Date(trip.createdAt),
    });
  });

  expenses.slice(0, 3).forEach((expense) => {
    activityTimelineRaw.push({
      id: `expense-${expense._id}`,
      icon: "sparkles",
      text: `Added expense of ₹${expense.amount}`,
      date: new Date(expense.createdAt),
    });
  });

  const activityTimeline = activityTimelineRaw
    .sort((a, b) => b.date - a.date)
    .map(({ id, icon, text, date }) => ({
      id,
      icon,
      text,
      time: date.toLocaleDateString(),
    }));

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

  // Shaped for the dashboard's RecentReviews component. Field names here
  // (_id, reviewText, rating as a number) must match what
  // RecentReviews.jsx actually reads — a previous mismatch (id/review vs
  // _id/reviewText) meant the review text and React key never rendered.
  const recentReviewsFormatted = recentReviews.map((review) => ({
    _id: review._id,
    destinationName: review.destination?.name || "Destination",
    image:
      review.images?.[0] ||
      review.destination?.images?.[0] ||
      "https://placehold.co/100x100",
    rating: review.rating,
    reviewText: review.reviewText,
    createdAt: new Date(review.createdAt).toLocaleDateString(),
  }));

  return {
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
        value: visitedCountries.size,
        sub: `${visitedCountries.size} countries`,
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
