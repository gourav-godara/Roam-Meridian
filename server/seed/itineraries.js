// Each entry's `destinationName` is matched against Destination.name at
// seed time (see seedItineraries.js) — no hardcoded ObjectIds.
// Pexels imageQuery fields are used by the image population script
// to fetch relevant images from the Pexels API.
//
// Keep destinationName spelled exactly as it appears in seed/destinations.js.

const itineraries = [
  // ============================================================
  // MANALI — 5 Days / 4 Nights
  // ============================================================
  {
    destinationName: "Manali",
    title: "5 Days in Manali — Mountains, Valleys & Adventure",
    summary:
      "A classic Himachal getaway covering Old Manali's cafes, Solang Valley's adventure sports, and a day trip to the dramatic Rohtang Pass / Sissu region.",

    imageQuery: "Manali Himachal Pradesh India mountains",
    coverImage: "",

    durationDays: 5,
    durationNights: 4,
    bestTime: "October to June",
    estimatedBudget: 22000,
    theme: "Adventure",

    highlights: [
      "Solang Valley cable car & paragliding",
      "Hadimba Temple in the cedar forest",
      "Old Manali cafes along the river",
      "Rohtang Pass / Atal Tunnel day trip",
      "Vashisht hot water springs",
    ],

    tips: [
      "Carry warm layers even in summer — evenings drop sharply.",
      "Book Rohtang Pass permits in advance during peak season (May–June).",
      "Old Manali is best explored on foot — parking is limited.",
    ],

    days: [
      {
        day: 1,
        title: "Arrival & Old Manali",
        imageQuery: "Old Manali Himachal Pradesh India",
        activities: [
          "Check in and settle near the Manalsu river",
          "Evening walk through Old Manali's lanes",
          "Visit the Manu Temple",
        ],
        restaurants: ["Cafe 1947", "Johnson's Cafe"],
        stay: "Old Manali or Mall Road area",
        estimatedCost: 3000,
        image: "",
      },
      {
        day: 2,
        title: "Solang Valley Adventure",
        imageQuery: "Solang Valley Manali India",
        activities: [
          "Cable car ride over Solang Valley",
          "Paragliding or zorbing (seasonal)",
          "Snow activities at higher points (winter)",
        ],
        restaurants: ["Local valley dhabas"],
        stay: "Same hotel, Manali",
        estimatedCost: 3500,
        image: "",
      },
      {
        day: 3,
        title: "Rohtang Pass / Atal Tunnel & Sissu",
        imageQuery: "Sissu Himachal Pradesh India",
        activities: [
          "Drive to Atal Tunnel (Rohtang Pass alternative)",
          "Sissu village and waterfall",
          "Photo stops along the Beas river",
        ],
        restaurants: ["Roadside Himachali dhabas"],
        stay: "Same hotel, Manali",
        estimatedCost: 4000,
        image: "",
      },
      {
        day: 4,
        title: "Hadimba Temple & Vashisht Springs",
        imageQuery: "Hadimba Temple Manali India",
        activities: [
          "Hadimba Devi Temple in the deodar forest",
          "Vashisht hot water springs and temple",
          "Club House and Van Vihar for a relaxed evening",
        ],
        restaurants: ["The Lazy Dog Lounge", "Renaissance Restaurant"],
        stay: "Same hotel, Manali",
        estimatedCost: 3000,
        image: "",
      },
      {
        day: 5,
        title: "Local Sightseeing & Departure",
        imageQuery: "Naggar Castle Manali India",
        activities: [
          "Naggar Castle (if time permits)",
          "Last-minute shopping on Mall Road",
          "Departure",
        ],
        restaurants: ["Mall Road eateries"],
        stay: "Departure day",
        estimatedCost: 1500,
        image: "",
      },
    ],
  },

  // ============================================================
  // GOA — 4 Days / 3 Nights
  // ============================================================
  {
    destinationName: "Goa",
    title: "4 Days in Goa — Beaches, Forts & Nightlife",
    summary:
      "A balanced North-and-South Goa trip: lively beaches and markets up north, quieter shores and Portuguese heritage down south.",

    imageQuery: "Goa India beach coastline",
    coverImage: "",

    durationDays: 4,
    durationNights: 3,
    bestTime: "November to February",
    estimatedBudget: 18000,
    theme: "Adventure",

    highlights: [
      "Baga & Calangute beaches",
      "Fort Aguada sunset point",
      "Anjuna flea market (Wednesdays)",
      "Basilica of Bom Jesus, Old Goa",
      "South Goa's Palolem beach",
    ],

    tips: [
      "Rent a scooter for the most flexible way to explore both coasts.",
      "Anjuna flea market only runs on Wednesdays — plan around it.",
      "South Goa beaches are calmer if you want to avoid crowds.",
    ],

    days: [
      {
        day: 1,
        title: "Arrival & North Goa Beaches",
        imageQuery: "Baga Beach Goa India",
        activities: [
          "Check in near Calangute or Baga",
          "Relax at Baga Beach",
          "Sunset at Fort Aguada",
        ],
        restaurants: ["Britto's, Baga", "Souza Lobo, Calangute"],
        stay: "Calangute / Baga",
        estimatedCost: 3500,
        image: "",
      },
      {
        day: 2,
        title: "Anjuna, Vagator & Nightlife",
        imageQuery: "Anjuna Vagator Goa India",
        activities: [
          "Anjuna flea market (if it's a Wednesday)",
          "Vagator's cliffside viewpoints",
          "Evening at a beach shack or club in Anjuna",
        ],
        restaurants: ["Curlies, Anjuna", "Thalassa, Vagator"],
        stay: "Calangute / Baga",
        estimatedCost: 4000,
        image: "",
      },
      {
        day: 3,
        title: "Old Goa Heritage & South Goa",
        imageQuery: "Palolem Beach Goa India",
        activities: [
          "Basilica of Bom Jesus & Se Cathedral, Old Goa",
          "Drive down to South Goa",
          "Evening at Palolem or Colva beach",
        ],
        restaurants: ["Martin's Corner, Betalbatim"],
        stay: "South Goa (optional change)",
        estimatedCost: 3500,
        image: "",
      },
      {
        day: 4,
        title: "Leisure Morning & Departure",
        imageQuery: "Goa beach sunset India",
        activities: [
          "Relaxed beach morning",
          "Local souvenir shopping",
          "Departure",
        ],
        restaurants: ["Cafe near hotel"],
        stay: "Departure day",
        estimatedCost: 1500,
        image: "",
      },
    ],
  },

  // ============================================================
  // JAIPUR — 3 Days / 2 Nights
  // ============================================================
  {
    destinationName: "Jaipur",
    title: "3 Days in Jaipur — The Pink City's Forts & Bazaars",
    summary:
      "A compact heritage trail through Jaipur's most iconic forts and palaces, with time built in for the old city's markets and food.",

    imageQuery: "Jaipur Rajasthan India Pink City",
    coverImage: "",

    durationDays: 3,
    durationNights: 2,
    bestTime: "October to March",
    estimatedBudget: 12000,
    theme: "Heritage",

    highlights: [
      "Amber Fort",
      "City Palace & Jantar Mantar",
      "Hawa Mahal photo stop",
      "Johari Bazaar & Bapu Bazaar shopping",
      "Nahargarh Fort sunset",
    ],

    tips: [
      "Visit Amber Fort early morning to beat both heat and crowds.",
      "Bargaining is expected in the bazaars.",
      "Nahargarh Fort at sunset offers the best view of the whole city.",
    ],

    days: [
      {
        day: 1,
        title: "Amber Fort & City Palace",
        imageQuery: "Amber Fort Jaipur India",
        activities: [
          "Amber Fort — explore the courtyards and mirror palace",
          "City Palace complex",
          "Jantar Mantar observatory",
        ],
        restaurants: ["Laxmi Misthan Bhandar (LMB)"],
        stay: "Near Hawa Mahal / Old City",
        estimatedCost: 3000,
        image: "",
      },
      {
        day: 2,
        title: "Hawa Mahal & Bazaars",
        imageQuery: "Hawa Mahal Jaipur India",
        activities: [
          "Hawa Mahal photo stop at sunrise",
          "Johari Bazaar for jewelry and textiles",
          "Bapu Bazaar for handicrafts",
        ],
        restaurants: [
          "Rawat Mishthan Bhandar",
          "Chokhi Dhani (evening cultural dinner)",
        ],
        stay: "Near Hawa Mahal / Old City",
        estimatedCost: 3500,
        image: "",
      },
      {
        day: 3,
        title: "Nahargarh Fort & Departure",
        imageQuery: "Nahargarh Fort Jaipur India",
        activities: [
          "Nahargarh Fort for panoramic city views",
          "Last-minute shopping",
          "Departure",
        ],
        restaurants: ["Cafe near Nahargarh"],
        stay: "Departure day",
        estimatedCost: 1500,
        image: "",
      },
    ],
  },

  // ============================================================
  // UDAIPUR — 3 Days / 2 Nights
  // ============================================================
  {
    destinationName: "Udaipur",
    title: "3 Days in Udaipur — City of Lakes",
    summary:
      "A romantic itinerary centered on Udaipur's palaces and lakes, with a boat ride at sunset and time in the old city's narrow lanes.",

    imageQuery: "Udaipur Rajasthan India Lake Pichola",
    coverImage: "",

    durationDays: 3,
    durationNights: 2,
    bestTime: "September to March",
    estimatedBudget: 14000,
    theme: "Honeymoon",

    highlights: [
      "City Palace complex",
      "Lake Pichola boat ride",
      "Jag Mandir island palace",
      "Saheliyon Ki Bari gardens",
      "Old city lanes near Jagdish Temple",
    ],

    tips: [
      "Book the Lake Pichola sunset boat ride in advance in peak season.",
      "The old city is very walkable — good shoes over cabs for short hops.",
    ],

    days: [
      {
        day: 1,
        title: "City Palace & Lake Pichola",
        imageQuery: "Lake Pichola Udaipur India",
        activities: [
          "City Palace museum and courtyards",
          "Lake Pichola boat ride at sunset",
          "Jag Mandir island palace stop",
        ],
        restaurants: ["Ambrai Restaurant (lakeside)"],
        stay: "Near Lake Pichola",
        estimatedCost: 3500,
        image: "",
      },
      {
        day: 2,
        title: "Gardens & Old City",
        imageQuery: "Jagdish Temple Udaipur India old city",
        activities: [
          "Saheliyon Ki Bari gardens",
          "Jagdish Temple",
          "Wander the old city lanes and rooftop cafes",
        ],
        restaurants: ["Upre by 1559 AD", "Jheel's Ginger Coffee Bar"],
        stay: "Near Lake Pichola",
        estimatedCost: 3000,
        image: "",
      },
      {
        day: 3,
        title: "Fateh Sagar Lake & Departure",
        imageQuery: "Fateh Sagar Lake Udaipur India",
        activities: [
          "Fateh Sagar Lake and Nehru Garden",
          "Local handicraft shopping",
          "Departure",
        ],
        restaurants: ["Cafe near Fateh Sagar"],
        stay: "Departure day",
        estimatedCost: 1500,
        image: "",
      },
    ],
  },

  // ============================================================
  // MUNNAR — 4 Days / 3 Nights
  // ============================================================
  {
    destinationName: "Munnar",
    title: "4 Days in Munnar — Tea Gardens & Hills",
    summary:
      "A slow-paced Western Ghats trip through rolling tea estates, viewpoints, and Eravikulam National Park's high-altitude grasslands.",

    imageQuery: "Munnar Kerala India tea plantations",
    coverImage: "",

    durationDays: 4,
    durationNights: 3,
    bestTime: "September to May",
    estimatedBudget: 16000,
    theme: "Nature",

    highlights: [
      "Tea gardens and Tea Museum",
      "Eravikulam National Park",
      "Mattupetty Dam & Echo Point",
      "Top Station viewpoint",
      "Attukal waterfalls",
    ],

    tips: [
      "Mornings are best for Eravikulam — it can close early if crowded.",
      "Carry a light jacket; hill mornings and evenings are cool year-round.",
    ],

    days: [
      {
        day: 1,
        title: "Arrival & Tea Gardens",
        imageQuery: "Munnar tea gardens Kerala India",
        activities: [
          "Check in and short walk through nearby tea estates",
          "Tata Tea Museum",
        ],
        restaurants: ["Rapsy Restaurant"],
        stay: "Munnar town",
        estimatedCost: 2500,
        image: "",
      },
      {
        day: 2,
        title: "Eravikulam National Park & Mattupetty",
        imageQuery: "Eravikulam National Park Munnar India",
        activities: [
          "Eravikulam National Park (Nilgiri Tahr sightings)",
          "Mattupetty Dam",
          "Echo Point",
        ],
        restaurants: ["Sree Mahaveer Bhavan"],
        stay: "Munnar town",
        estimatedCost: 3000,
        image: "",
      },
      {
        day: 3,
        title: "Top Station & Waterfalls",
        imageQuery: "Top Station Munnar Kerala India",
        activities: [
          "Top Station viewpoint (Western Ghats panorama)",
          "Attukal / Lakkam waterfalls",
          "Kundala Lake boating",
        ],
        restaurants: ["Saravana Bhavan, Munnar"],
        stay: "Munnar town",
        estimatedCost: 3000,
        image: "",
      },
      {
        day: 4,
        title: "Leisure & Departure",
        imageQuery: "Munnar Kerala tea plantation hills",
        activities: [
          "Spice plantation visit",
          "Local shopping — tea, spices, chocolate",
          "Departure",
        ],
        restaurants: ["Cafe near town"],
        stay: "Departure day",
        estimatedCost: 1500,
        image: "",
      },
    ],
  },

  // ============================================================
  // RISHIKESH — 3 Days / 2 Nights
  // ============================================================
  {
    destinationName: "Rishikesh",
    title: "3 Days in Rishikesh — Ganga, Yoga & Adventure",
    summary:
      "A mix of spiritual mornings by the Ganga and adventure afternoons — river rafting, the iconic suspension bridges, and the evening Ganga Aarti.",

    imageQuery: "Rishikesh India Ganga river mountains",
    coverImage: "",

    durationDays: 3,
    durationNights: 2,
    bestTime: "September to April",
    estimatedBudget: 9000,
    theme: "Spiritual",

    highlights: [
      "Laxman Jhula & Ram Jhula",
      "Triveni Ghat Ganga Aarti",
      "White water rafting on the Ganga",
      "Beatles Ashram (Chaurasi Kutia)",
      "Yoga session by the riverbank",
    ],

    tips: [
      "Rafting season runs roughly September to June — check before booking.",
      "Attend the Ganga Aarti at Triveni Ghat at sunset — arrive early for a good spot.",
    ],

    days: [
      {
        day: 1,
        title: "Arrival & Ghats",
        imageQuery: "Ram Jhula Rishikesh India Ganga",
        activities: [
          "Check in, walk across Laxman Jhula",
          "Explore Ram Jhula and nearby ashrams",
          "Evening Ganga Aarti at Triveni Ghat",
        ],
        restaurants: ["Ganga Beach Restaurant", "Chotiwala"],
        stay: "Near Laxman Jhula / Tapovan",
        estimatedCost: 2000,
        image: "",
      },
      {
        day: 2,
        title: "River Rafting & Beatles Ashram",
        imageQuery: "Rishikesh river rafting India",
        activities: [
          "White water rafting (Shivpuri to Rishikesh stretch)",
          "Beatles Ashram (Chaurasi Kutia) — art-covered ruins",
        ],
        restaurants: ["Little Buddha Cafe"],
        stay: "Near Laxman Jhula / Tapovan",
        estimatedCost: 3500,
        image: "",
      },
      {
        day: 3,
        title: "Yoga Morning & Departure",
        imageQuery: "Rishikesh yoga Ganga river India",
        activities: [
          "Riverside yoga or meditation session",
          "Local market for spiritual souvenirs",
          "Departure",
        ],
        restaurants: ["Cafe near the ghats"],
        stay: "Departure day",
        estimatedCost: 1500,
        image: "",
      },
    ],
  },

  // ============================================================
  // PARIS — 5 Days / 4 Nights
  // ============================================================
  {
    destinationName: "Paris",
    title: "5 Days in Paris — Landmarks, Art & Romance",
    summary:
      "A first-timer's Paris covering the essential landmarks, world-class museums, and a river cruise, paced to avoid rushing any single day.",

    imageQuery: "Paris France Eiffel Tower city",
    coverImage: "",

    durationDays: 5,
    durationNights: 4,
    bestTime: "April to June, September to October",
    estimatedBudget: 90000,
    theme: "Honeymoon",

    highlights: [
      "Eiffel Tower (day and night views)",
      "Louvre Museum",
      "Montmartre & Sacré-Cœur",
      "Seine river cruise",
      "Palace of Versailles day trip",
    ],

    tips: [
      "Book Louvre and Eiffel Tower tickets online in advance to skip queues.",
      "The Paris Museum Pass is worth it if visiting 3+ attractions.",
      "Versailles is a half-day trip — go early to beat tour groups.",
    ],

    days: [
      {
        day: 1,
        title: "Arrival & Eiffel Tower",
        imageQuery: "Eiffel Tower Paris France",
        activities: [
          "Check in near central Paris",
          "Eiffel Tower — go up at sunset for the light show",
          "Walk along the Champ de Mars",
        ],
        restaurants: ["Le Comptoir du Relais"],
        stay: "Le Marais or Saint-Germain",
        estimatedCost: 10000,
        image: "",
      },
      {
        day: 2,
        title: "Louvre & Île de la Cité",
        imageQuery: "Louvre Museum Paris France",
        activities: [
          "Louvre Museum — Mona Lisa and key wings",
          "Notre-Dame exterior and Île de la Cité",
          "Sainte-Chapelle stained glass",
        ],
        restaurants: ["Angelina Paris (for the hot chocolate)"],
        stay: "Le Marais or Saint-Germain",
        estimatedCost: 9000,
        image: "",
      },
      {
        day: 3,
        title: "Montmartre & Seine Cruise",
        imageQuery: "Montmartre Sacre Coeur Paris France",
        activities: [
          "Sacré-Cœur Basilica and Montmartre's artist square",
          "Wander the cafes of Montmartre",
          "Evening Seine river cruise",
        ],
        restaurants: ["La Maison Rose, Montmartre"],
        stay: "Le Marais or Saint-Germain",
        estimatedCost: 8000,
        image: "",
      },
      {
        day: 4,
        title: "Palace of Versailles Day Trip",
        imageQuery: "Palace of Versailles France",
        activities: [
          "Palace of Versailles — Hall of Mirrors, gardens",
          "Marie Antoinette's estate (if time permits)",
        ],
        restaurants: ["La Flottille, Versailles gardens"],
        stay: "Le Marais or Saint-Germain",
        estimatedCost: 9000,
        image: "",
      },
      {
        day: 5,
        title: "Champs-Élysées & Departure",
        imageQuery: "Arc de Triomphe Champs Elysees Paris France",
        activities: [
          "Arc de Triomphe",
          "Stroll down the Champs-Élysées",
          "Departure",
        ],
        restaurants: ["Ladurée, Champs-Élysées"],
        stay: "Departure day",
        estimatedCost: 5000,
        image: "",
      },
    ],
  },

  // ============================================================
  // DUBAI — 4 Days / 3 Nights
  // ============================================================
  {
    destinationName: "Dubai",
    title: "4 Days in Dubai — Skyline, Desert & Souks",
    summary:
      "A city-and-desert combo: the modern skyline and malls of new Dubai, a desert safari, and the older souks along Dubai Creek.",

    imageQuery: "Dubai UAE skyline Burj Khalifa",
    coverImage: "",

    durationDays: 4,
    durationNights: 3,
    bestTime: "November to March",
    estimatedBudget: 75000,
    theme: "City",

    highlights: [
      "Burj Khalifa observation deck",
      "Desert safari with dune bashing",
      "Dubai Mall & the Dubai Fountain",
      "Old Dubai — Gold & Spice Souks",
      "Palm Jumeirah & Atlantis views",
    ],

    tips: [
      "Book Burj Khalifa 'At the Top' tickets online — sunset slots sell out fast.",
      "Desert safaris typically include dinner — check if it's included before booking separately.",
    ],

    days: [
      {
        day: 1,
        title: "Arrival & Downtown Dubai",
        imageQuery: "Burj Khalifa Dubai UAE skyline",
        activities: [
          "Check in near Downtown Dubai",
          "Burj Khalifa observation deck at sunset",
          "Dubai Fountain show at Dubai Mall",
        ],
        restaurants: ["At.mosphere, Burj Khalifa"],
        stay: "Downtown Dubai",
        estimatedCost: 18000,
        image: "",
      },
      {
        day: 2,
        title: "Desert Safari",
        imageQuery: "Dubai desert safari dunes UAE",
        activities: [
          "Dune bashing in a 4x4",
          "Camel riding and sandboarding",
          "Bedouin camp dinner with cultural show",
        ],
        restaurants: ["Included desert camp dinner"],
        stay: "Downtown Dubai",
        estimatedCost: 15000,
        image: "",
      },
      {
        day: 3,
        title: "Old Dubai & Marina",
        imageQuery: "Dubai Creek Gold Souk Dubai UAE",
        activities: [
          "Abra boat ride across Dubai Creek",
          "Gold Souk and Spice Souk",
          "Evening at Dubai Marina Walk",
        ],
        restaurants: ["Al Ustad Special Kabab (Old Dubai)"],
        stay: "Downtown Dubai",
        estimatedCost: 12000,
        image: "",
      },
      {
        day: 4,
        title: "Palm Jumeirah & Departure",
        imageQuery: "Palm Jumeirah Dubai UAE Atlantis",
        activities: [
          "Palm Jumeirah and Atlantis exteriors",
          "Last-minute mall shopping",
          "Departure",
        ],
        restaurants: ["The Beach at JBR"],
        stay: "Departure day",
        estimatedCost: 8000,
        image: "",
      },
    ],
  },
];

module.exports = itineraries;

