export const user = {
  name: "Gourav Godara",
  email: "gourav@example.com",
  role: "Explorer",
  avatar: null,
};

export const stats = [
  { key: "trips", label: "Total Trips", value: "12", sub: "2 upcoming", icon: "briefcase" },
  { key: "places", label: "Places Visited", value: "18", sub: "4 countries", icon: "mapPin" },
  { key: "wishlist", label: "Wishlist", value: "24", sub: "Saved places", icon: "heart" },
  { key: "spent", label: "Total Spent", value: "₹1,24,560", sub: "All time", icon: "wallet" },
  { key: "reviews", label: "Reviews Given", value: "8", sub: "Helped others", icon: "star" },
];

export const upcomingTrip = {
  name: "Manali Getaway",
  location: "Manali, Himachal Pradesh",
  dates: "25 Aug - 28 Aug, 2025",
  image: "https://picsum.photos/seed/manali-trip/700/500",
  companions: [
    { id: 1, avatar: "https://i.pravatar.cc/40?u=c1" },
    { id: 2, avatar: "https://i.pravatar.cc/40?u=c2" },
    { id: 3, avatar: "https://i.pravatar.cc/40?u=c3" },
  ],
  extraCompanions: 2,
  status: "Confirmed",
};

export const quickLinks = [
  { label: "View All Bookings", to: "/dashboard/bookings", icon: "calendar" },
  { label: "My Wishlist", to: "/dashboard/wishlist", icon: "heart" },
  { label: "AI Itinerary", to: "/planner", icon: "sparkles" },
  { label: "Expense Tracker", to: "/dashboard/expenses", icon: "wallet" },
  { label: "Download Invoices", to: "/dashboard/invoices", icon: "fileText" },
];

export const continuePlanning = [
  { id: 1, name: "Ladakh Adventure", location: "Leh, Ladakh", progress: 60, image: "https://picsum.photos/seed/ladakh/400/300" },
  { id: 2, name: "Kerala Backwaters", location: "Alleppey, Kerala", progress: 30, image: "https://picsum.photos/seed/kerala/400/300" },
  { id: 3, name: "Spiti Valley", location: "Himachal Pradesh", progress: 20, image: "https://picsum.photos/seed/spiti/400/300" },
  { id: 4, name: "Rishikesh Retreat", location: "Uttarakhand", progress: 10, image: "https://picsum.photos/seed/rishikesh/400/300" },
];

export const recentBookings = [
  { id: 1, name: "Snow Valley Resorts", location: "Manali, HP", date: "Check-in: 25 Aug 2025", status: "Confirmed", amount: "₹12,500", image: "https://picsum.photos/seed/booking1/100/100" },
  { id: 2, name: "Volvo Bus", location: "Delhi → Manali", date: "24 Aug 2025", status: "Confirmed", amount: "₹2,800", image: "https://picsum.photos/seed/booking2/100/100" },
  { id: 3, name: "River Rafting", location: "Rishikesh, UK", date: "20 Aug 2025", status: "Completed", amount: "₹1,200", image: "https://picsum.photos/seed/booking3/100/100" },
];

export const recommendations = [
  { id: 1, name: "Udaipur", location: "Rajasthan", rating: 4.6, budget: "₹15,000", image: "https://picsum.photos/seed/udaipur/300/200" },
  { id: 2, name: "Coorg", location: "Karnataka", rating: 4.8, budget: "₹11,200", image: "https://picsum.photos/seed/coorg/300/200" },
];

export const mapPins = [
  { id: 1, type: "visited", top: "38%", left: "22%" },
  { id: 2, type: "wishlist", top: "58%", left: "28%" },
  { id: 3, type: "visited", top: "42%", left: "82%" },
];

export const activityTimeline = [
  { id: 1, icon: "star", text: "You reviewed Manali", time: "2 days ago" },
  { id: 2, icon: "heart", text: "Added Coorg to wishlist", time: "3 days ago" },
  { id: 3, icon: "calendar", text: "Booking confirmed", time: "5 days ago" },
  { id: 4, icon: "sparkles", text: "AI trip plan created", time: "1 week ago" },
  { id: 5, icon: "mapPin", text: "Visited Rishikesh", time: "2 weeks ago" },
];

export const travelTip = {
  text: "Visit popular attractions early in the morning to avoid crowds.",
};
