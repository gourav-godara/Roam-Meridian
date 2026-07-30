const destinations = [
  // ==========================
// MOUNTAIN DESTINATIONS
// ==========================

{
  name: "Manali",
  city: "Manali",
  state: "Himachal Pradesh",
  country: "India",

  description:
    "A beautiful Himalayan destination famous for snow-covered peaks, Solang Valley, adventure sports, scenic rivers, and peaceful pine forests.",

  bestTime: "October - June",

  duration: "4-5 Days",

  category: "Mountains",

  images: [
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1597074866923-dc0589150358?w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1622308644420-b20142dc993c?w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?w=1200&auto=format&fit=crop"
  ],

  budget: {
    min: 12000,
    max: 30000,
    currency: "INR",
  },

  rating: {
    average: 4.8,
    count: 5420,
  },

  location: {
    latitude: 32.2432,
    longitude: 77.1892,
  },
},

{
  name: "Shimla",
  city: "Shimla",
  state: "Himachal Pradesh",
  country: "India",

  description:
    "The Queen of Hills offers colonial architecture, pleasant weather, toy train rides, scenic viewpoints, and charming streets.",

  bestTime: "March - June",

  duration: "3-4 Days",

  category: "Mountains",

  images: [
    "https://images.unsplash.com/photo-1597076537068-7cbe6c5cb918?w=1200&auto=format&fit=crop"
  ],

  budget: {
    min: 10000,
    max: 24000,
    currency: "INR",
  },

  rating: {
    average: 4.7,
    count: 4830,
  },

  location: {
    latitude: 31.1048,
    longitude: 77.1734,
  },
},

{
  name: "Leh Ladakh",
  city: "Leh",
  state: "Ladakh",
  country: "India",

  description:
    "Known for breathtaking mountain passes, Pangong Lake, monasteries, Nubra Valley, and thrilling bike expeditions.",

  bestTime: "May - September",

  duration: "6-8 Days",

  category: "Mountains",

  images: [
    "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=1200&auto=format&fit=crop"
  ],

  budget: {
    min: 25000,
    max: 60000,
    currency: "INR",
  },

  rating: {
    average: 4.9,
    count: 6840,
  },

  location: {
    latitude: 34.1526,
    longitude: 77.5771,
  },
},

{
  name: "Darjeeling",
  city: "Darjeeling",
  state: "West Bengal",
  country: "India",

  description:
    "Famous for tea gardens, the Toy Train, Tiger Hill sunrise, Kanchenjunga views and cool weather.",

  bestTime: "March - May",

  duration: "3-5 Days",

  category: "Mountains",

  images: [
    "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&auto=format&fit=crop"
  ],

  budget: {
    min: 11000,
    max: 25000,
    currency: "INR",
  },

  rating: {
    average: 4.7,
    count: 3921,
  },

  location: {
    latitude: 27.036,
    longitude: 88.2627,
  },
},

{
  name: "Auli",
  city: "Auli",
  state: "Uttarakhand",
  country: "India",

  description:
    "India's premier skiing destination offering snow-covered mountains, cable cars, and panoramic Himalayan views.",

  bestTime: "December - March",

  duration: "3-4 Days",

  category: "Mountains",

  images: [
    "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1200&auto=format&fit=crop"
  ],

  budget: {
    min: 14000,
    max: 32000,
    currency: "INR",
  },

  rating: {
    average: 4.8,
    count: 2210,
  },

  location: {
    latitude: 30.528,
    longitude: 79.566,
  },
},

{
  name: "Spiti Valley",
  city: "Kaza",
  state: "Himachal Pradesh",
  country: "India",

  description:
    "A cold desert valley known for dramatic landscapes, monasteries, high-altitude villages and adventure road trips.",

  bestTime: "June - September",

  duration: "7-9 Days",

  category: "Mountains",

  images: [
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&auto=format&fit=crop"
  ],

  budget: {
    min: 22000,
    max: 45000,
    currency: "INR",
  },

  rating: {
    average: 4.9,
    count: 1840,
  },

  location: {
    latitude: 32.246,
    longitude: 78.034,
  },
},

{
  name: "Nainital",
  city: "Nainital",
  state: "Uttarakhand",
  country: "India",

  description:
    "A peaceful hill station centered around the beautiful Naini Lake, surrounded by lush green mountains.",

  bestTime: "March - June",

  duration: "3 Days",

  category: "Mountains",

  images: [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop"
  ],

  budget: {
    min: 9000,
    max: 22000,
    currency: "INR",
  },

  rating: {
    average: 4.6,
    count: 3520,
  },

  location: {
    latitude: 29.3919,
    longitude: 79.4542,
  },
},

{
  name: "Mussoorie",
  city: "Mussoorie",
  state: "Uttarakhand",
  country: "India",

  description:
    "Popularly known as the Queen of the Hills, famous for waterfalls, cable cars, colonial charm and Himalayan scenery.",

  bestTime: "March - June",

  duration: "3-4 Days",

  category: "Mountains",

  images: [
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&auto=format&fit=crop"
  ],

  budget: {
    min: 10000,
    max: 24000,
    currency: "INR",
  },

  rating: {
    average: 4.7,
    count: 4125,
  },

  location: {
    latitude: 30.4598,
    longitude: 78.0644,
  },
},

  // ==========================
// BEACH DESTINATIONS
// ==========================

{
  name: "Goa",
  city: "Panaji",
  state: "Goa",
  country: "India",

  description:
    "India's beach paradise known for nightlife, Portuguese heritage, beaches, seafood and water sports.",

  bestTime: "November - February",
  duration: "3-5 Days",
  category: "Beach",

  images: [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop"
  ],

  budget: {
    min: 10000,
    max: 35000,
    currency: "INR",
  },

  rating: {
    average: 4.8,
    count: 8612,
  },

  location: {
    latitude: 15.4909,
    longitude: 73.8278,
  },
},

{
  name: "Kovalam",
  city: "Kovalam",
  state: "Kerala",
  country: "India",

  description:
    "A serene beach destination famous for crescent-shaped beaches, Ayurvedic resorts and lighthouse views.",

  bestTime: "October - March",
  duration: "3 Days",
  category: "Beach",

  images: [
    "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1200&auto=format&fit=crop"
  ],

  budget: {
    min: 9000,
    max: 22000,
    currency: "INR",
  },

  rating: {
    average: 4.7,
    count: 3120,
  },

  location: {
    latitude: 8.4004,
    longitude: 76.9784,
  },
},

{
  name: "Varkala",
  city: "Varkala",
  state: "Kerala",
  country: "India",

  description:
    "Known for dramatic sea cliffs, peaceful beaches, cafes and breathtaking sunsets.",

  bestTime: "October - March",
  duration: "3-4 Days",
  category: "Beach",

  images: [
    "https://images.unsplash.com/photo-1493558103817-58b2924bce98?w=1200&auto=format&fit=crop"
  ],

  budget: {
    min: 8000,
    max: 20000,
    currency: "INR",
  },

  rating: {
    average: 4.8,
    count: 2870,
  },

  location: {
    latitude: 8.7379,
    longitude: 76.7163,
  },
},

{
  name: "Gokarna",
  city: "Gokarna",
  state: "Karnataka",
  country: "India",

  description:
    "A peaceful coastal town with beautiful beaches, trekking trails and relaxed vibes.",

  bestTime: "October - March",
  duration: "3 Days",
  category: "Beach",

  images: [
    "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=1200&auto=format&fit=crop"
  ],

  budget: {
    min: 7000,
    max: 18000,
    currency: "INR",
  },

  rating: {
    average: 4.7,
    count: 2910,
  },

  location: {
    latitude: 14.5479,
    longitude: 74.3188,
  },
},

{
  name: "Pondicherry",
  city: "Puducherry",
  state: "Puducherry",
  country: "India",

  description:
    "French colonial town famous for beaches, colorful streets, cafés and Auroville.",

  bestTime: "October - February",
  duration: "3 Days",
  category: "Beach",

  images: [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop"
  ],

  budget: {
    min: 9000,
    max: 24000,
    currency: "INR",
  },

  rating: {
    average: 4.6,
    count: 4012,
  },

  location: {
    latitude: 11.9139,
    longitude: 79.8145,
  },
},

{
  name: "Andaman Islands",
  city: "Port Blair",
  state: "Andaman & Nicobar",
  country: "India",

  description:
    "Crystal-clear water, coral reefs, scuba diving and white sand beaches.",

  bestTime: "October - May",
  duration: "5-7 Days",
  category: "Beach",

  images: [
    "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&auto=format&fit=crop"
  ],

  budget: {
    min: 28000,
    max: 65000,
    currency: "INR",
  },

  rating: {
    average: 4.9,
    count: 5260,
  },

  location: {
    latitude: 11.6234,
    longitude: 92.7265,
  },
},

{
  name: "Diu",
  city: "Diu",
  state: "Daman & Diu",
  country: "India",

  description:
    "A small island famous for Portuguese architecture, beaches and historic forts.",

  bestTime: "October - February",
  duration: "2-3 Days",
  category: "Beach",

  images: [
    "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1200&auto=format&fit=crop"
  ],

  budget: {
    min: 7000,
    max: 17000,
    currency: "INR",
  },

  rating: {
    average: 4.5,
    count: 1850,
  },

  location: {
    latitude: 20.7144,
    longitude: 70.9874,
  },
},

{
  name: "Lakshadweep",
  city: "Kavaratti",
  state: "Lakshadweep",
  country: "India",

  description:
    "India's tropical island paradise featuring turquoise lagoons, coral reefs and untouched beaches.",

  bestTime: "October - March",
  duration: "5 Days",
  category: "Beach",

  images: [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop"
  ],

  budget: {
    min: 35000,
    max: 80000,
    currency: "INR",
  },

  rating: {
    average: 4.9,
    count: 1980,
  },

  location: {
    latitude: 10.5667,
    longitude: 72.6417,
  },
},
  // ==========================
// HERITAGE DESTINATIONS
// ==========================

{
  name: "Jaipur",
  city: "Jaipur",
  state: "Rajasthan",
  country: "India",

  description:
    "The Pink City famous for Amer Fort, City Palace, Hawa Mahal and vibrant markets.",

  bestTime: "October - March",
  duration: "3-4 Days",
  category: "Heritage",

  images: [
    "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200&auto=format&fit=crop"
  ],

  budget: {
    min: 9000,
    max: 25000,
    currency: "INR",
  },

  rating: {
    average: 4.8,
    count: 5600,
  },

  location: {
    latitude: 26.9124,
    longitude: 75.7873,
  },
},

{
  name: "Udaipur",
  city: "Udaipur",
  state: "Rajasthan",
  country: "India",

  description:
    "Known as the City of Lakes, featuring royal palaces, heritage hotels and beautiful lakes.",

  bestTime: "October - March",
  duration: "3 Days",
  category: "Heritage",

  images: [
    "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=1200&auto=format&fit=crop"
  ],

  budget: {
    min: 12000,
    max: 30000,
    currency: "INR",
  },

  rating: {
    average: 4.9,
    count: 4720,
  },

  location: {
    latitude: 24.5854,
    longitude: 73.7125,
  },
},

{
  name: "Jodhpur",
  city: "Jodhpur",
  state: "Rajasthan",
  country: "India",

  description:
    "The Blue City famous for Mehrangarh Fort, blue-painted houses and rich Rajput culture.",

  bestTime: "October - February",
  duration: "2-3 Days",
  category: "Heritage",

  images: [
    "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&auto=format&fit=crop"
  ],

  budget: {
    min: 9000,
    max: 24000,
    currency: "INR",
  },

  rating: {
    average: 4.7,
    count: 3950,
  },

  location: {
    latitude: 26.2389,
    longitude: 73.0243,
  },
},

{
  name: "Agra",
  city: "Agra",
  state: "Uttar Pradesh",
  country: "India",

  description:
    "Home to the Taj Mahal, Agra Fort and Mughal architecture.",

  bestTime: "October - March",
  duration: "2 Days",
  category: "Heritage",

  images: [
    "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&auto=format&fit=crop"
  ],

  budget: {
    min: 7000,
    max: 18000,
    currency: "INR",
  },

  rating: {
    average: 4.8,
    count: 8600,
  },

  location: {
    latitude: 27.1767,
    longitude: 78.0081,
  },
},

{
  name: "Hampi",
  city: "Hampi",
  state: "Karnataka",
  country: "India",

  description:
    "UNESCO World Heritage Site with ancient temples, ruins and stunning landscapes.",

  bestTime: "October - February",
  duration: "3 Days",
  category: "Heritage",

  images: [
    "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=1200&auto=format&fit=crop"
  ],

  budget: {
    min: 7000,
    max: 17000,
    currency: "INR",
  },

  rating: {
    average: 4.8,
    count: 2780,
  },

  location: {
    latitude: 15.335,
    longitude: 76.46,
  },
},

{
  name: "Khajuraho",
  city: "Khajuraho",
  state: "Madhya Pradesh",
  country: "India",

  description:
    "UNESCO temples renowned for magnificent carvings and architecture.",

  bestTime: "October - March",
  duration: "2 Days",
  category: "Heritage",

  images: [
    "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1200&auto=format&fit=crop"
  ],

  budget: {
    min: 7000,
    max: 18000,
    currency: "INR",
  },

  rating: {
    average: 4.7,
    count: 2150,
  },

  location: {
    latitude: 24.8318,
    longitude: 79.9199,
  },
},

{
  name: "Mysore",
  city: "Mysore",
  state: "Karnataka",
  country: "India",

  description:
    "Famous for Mysore Palace, Dasara Festival and rich royal heritage.",

  bestTime: "October - February",
  duration: "2-3 Days",
  category: "Heritage",

  images: [
    "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=1200&auto=format&fit=crop"
  ],

  budget: {
    min: 8000,
    max: 20000,
    currency: "INR",
  },

  rating: {
    average: 4.7,
    count: 3660,
  },

  location: {
    latitude: 12.2958,
    longitude: 76.6394,
  },
},

{
  name: "Varanasi",
  city: "Varanasi",
  state: "Uttar Pradesh",
  country: "India",

  description:
    "One of the world's oldest living cities, known for ghats, temples and Ganga Aarti.",

  bestTime: "October - March",
  duration: "3 Days",
  category: "Heritage",

  images: [
    "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=1200&auto=format&fit=crop"
  ],

  budget: {
    min: 6000,
    max: 18000,
    currency: "INR",
  },

  rating: {
    average: 4.8,
    count: 7120,
  },

  location: {
    latitude: 25.3176,
    longitude: 82.9739,
  },
},

  // ==========================
// ADVENTURE DESTINATIONS
// ==========================

{
  name: "Rishikesh",
  city: "Rishikesh",
  state: "Uttarakhand",
  country: "India",

  description:
    "The Yoga Capital of the World famous for river rafting, bungee jumping, camping and Ganga Aarti.",

  bestTime: "September - April",
  duration: "3-4 Days",
  category: "Adventure",

  images: [
    "https://images.unsplash.com/photo-1624555130581-1d9cca783bc0?w=1200&auto=format&fit=crop"
  ],

  budget: {
    min: 8000,
    max: 22000,
    currency: "INR",
  },

  rating: {
    average: 4.8,
    count: 5200,
  },

  location: {
    latitude: 30.0869,
    longitude: 78.2676,
  },
},

{
  name: "Ladakh",
  city: "Leh",
  state: "Ladakh",
  country: "India",

  description:
    "High-altitude mountain desert famous for bike trips, Pangong Lake, monasteries and breathtaking landscapes.",

  bestTime: "May - September",
  duration: "6-8 Days",
  category: "Adventure",

  images: [
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&auto=format&fit=crop"
  ],

  budget: {
    min: 25000,
    max: 60000,
    currency: "INR",
  },

  rating: {
    average: 4.9,
    count: 7800,
  },

  location: {
    latitude: 34.1526,
    longitude: 77.577,
  },
},

{
  name: "Spiti Valley",
  city: "Kaza",
  state: "Himachal Pradesh",
  country: "India",

  description:
    "Remote Himalayan valley famous for rugged roads, monasteries and spectacular mountain views.",

  bestTime: "June - September",
  duration: "7 Days",
  category: "Adventure",

  images: [
    "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1200&auto=format&fit=crop"
  ],

  budget: {
    min: 18000,
    max: 45000,
    currency: "INR",
  },

  rating: {
    average: 4.9,
    count: 2950,
  },

  location: {
    latitude: 32.246,
    longitude: 78.034,
  },
},

{
  name: "Bir Billing",
  city: "Bir",
  state: "Himachal Pradesh",
  country: "India",

  description:
    "India's paragliding capital with scenic mountains, monasteries and peaceful cafes.",

  bestTime: "March - June",
  duration: "2-3 Days",
  category: "Adventure",

  images: [
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&auto=format&fit=crop"
  ],

  budget: {
    min: 9000,
    max: 22000,
    currency: "INR",
  },

  rating: {
    average: 4.8,
    count: 2100,
  },

  location: {
    latitude: 32.049,
    longitude: 76.717,
  },
},

{
  name: "Auli",
  city: "Auli",
  state: "Uttarakhand",
  country: "India",

  description:
    "India's premier skiing destination offering snow sports and panoramic Himalayan views.",

  bestTime: "December - February",
  duration: "3 Days",
  category: "Adventure",

  images: [
    "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1200&auto=format&fit=crop"
  ],

  budget: {
    min: 12000,
    max: 30000,
    currency: "INR",
  },

  rating: {
    average: 4.7,
    count: 2550,
  },

  location: {
    latitude: 30.528,
    longitude: 79.566,
  },
},

{
  name: "Coorg",
  city: "Madikeri",
  state: "Karnataka",
  country: "India",

  description:
    "Coffee plantations, waterfalls, trekking trails and wildlife make Coorg an adventure paradise.",

  bestTime: "October - March",
  duration: "3 Days",
  category: "Adventure",

  images: [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop"
  ],

  budget: {
    min: 10000,
    max: 25000,
    currency: "INR",
  },

  rating: {
    average: 4.7,
    count: 3400,
  },

  location: {
    latitude: 12.4244,
    longitude: 75.7382,
  },
},

{
  name: "Tawang",
  city: "Tawang",
  state: "Arunachal Pradesh",
  country: "India",

  description:
    "Snow-covered mountains, monasteries and thrilling Himalayan road journeys.",

  bestTime: "March - October",
  duration: "5 Days",
  category: "Adventure",

  images: [
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&auto=format&fit=crop"
  ],

  budget: {
    min: 18000,
    max: 42000,
    currency: "INR",
  },

  rating: {
    average: 4.8,
    count: 1800,
  },

  location: {
    latitude: 27.586,
    longitude: 91.859,
  },
},

{
  name: "Zanskar Valley",
  city: "Padum",
  state: "Ladakh",
  country: "India",

  description:
    "One of India's most remote trekking and river rafting destinations.",

  bestTime: "June - September",
  duration: "7 Days",
  category: "Adventure",

  images: [
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&auto=format&fit=crop"
  ],

  budget: {
    min: 22000,
    max: 55000,
    currency: "INR",
  },

  rating: {
    average: 4.9,
    count: 1200,
  },

  location: {
    latitude: 33.466,
    longitude: 76.888,
  },
},
];

module.exports = destinations;