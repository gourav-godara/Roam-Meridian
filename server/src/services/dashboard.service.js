// backend/src/services/dashboard.service.js

const getDashboardData = async () => { // An async function that will later fetch data from MongoDB.
  return { // Returns a massive object full of data arrays.
    stats: { // Object containing counter statistics for the top cards.
      totalTrips: 5,
      upcomingTrips: 2,
      savedTrips: 10,
      reviews: 8,
      totalExpenses: 25000,
      groupTrips: 4,
    },

    upcomingTrips: [ // Array of objects representing future vacation bookings.
  {
    _id: "1",
    destination: "Manali Getaway",
    location: "Manali, Himachal Pradesh",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600",
    startDate: "20 May 2026",
    endDate: "25 May 2026",
    members: 4,
    status: "In 5 Days",
  },
  {
    _id: "2",
    destination: "Goa Beach Trip",
    location: "Goa, India",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600",
    startDate: "10 Jun 2026",
    endDate: "15 Jun 2026",
    members: 3,
    status: "In 26 Days",
  },
  {
    _id: "3",
    destination: "Dubai Adventure",
    location: "Dubai, UAE",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600",
    startDate: "05 Jul 2026",
    endDate: "12 Jul 2026",
    members: 5,
    status: "In 51 Days",
  },
],

    recentReviews: [ // Array of objects containing user trip logs and ratings.
  {
    _id: "1",
    destination: "Goa",
    rating: 5,
    review:
      "Amazing beaches, great nightlife and wonderful food. Highly recommended!",
    createdAt: "2 days ago",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600",
  },
  {
    _id: "2",
    destination: "Manali",
    rating: 4,
    review:
      "Beautiful mountains and snowfall. Perfect destination for winter vacations.",
    createdAt: "1 week ago",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600",
  },
],

    expenseSummary: {  // Financial statistics and transaction lists.
  totalSpent: 25000,
  youOwe: 1500,
  youAreOwed: 500,
  recentExpenses: [
    {
      _id: "1",
      title: "Hotel Booking",
      amount: 8000,
      paidBy: "Jinal"
    },
    {
      _id: "2",
      title: "Dinner",
      amount: 2200,
      paidBy: "Gourav"
    }
  ]
},

    travelHistory: [
  {
    _id: "1",
    destination: "Jaipur",
    location: "Rajasthan",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600",
    month: "January",
    year: "2026",
  },
  {
    _id: "2",
    destination: "Kerala",
    location: "India",
    image:
      "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=600",
    month: "December",
    year: "2025",
  },
  {
    _id: "3",
    destination: "Thailand",
    location: "Thailand",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600",
    month: "October",
    year: "2025",
  }
],
  };
};

module.exports = {
  getDashboardData,
};