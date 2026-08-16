const itineraries = [
  // ============================================================
  // MANALI
  // ============================================================
  {
    destinationName: "Manali",
    title: "5 Days in Manali — Mountains, Valleys & Adventure",
    summary:
      "A classic Himachal getaway covering Old Manali, Solang Valley, Atal Tunnel, Sissu and local attractions.",

    imageQuery: "Manali Himachal Pradesh India mountains",
    coverImage: "",

    durationDays: 5,
    durationNights: 4,
    bestTime: "October to June",
    estimatedBudget: 22000,
    theme: "Adventure",

    highlights: [
      "Solang Valley",
      "Hadimba Temple",
      "Old Manali",
      "Atal Tunnel & Sissu",
      "Vashisht Springs",
    ],

    tips: [
      "Carry warm layers because evenings can be cold.",
      "Check road and weather conditions before visiting high-altitude areas.",
      "Book adventure activities in advance during peak season.",
    ],

    days: [
      {
        day: 1,
        title: "Arrival & Old Manali",
        imageQuery: "Old Manali Himachal Pradesh India",
        activities: [
          "Arrive and check in",
          "Explore Old Manali",
          "Visit Manu Temple",
          "Evening walk along the river",
        ],
        restaurants: ["Cafe 1947", "Johnson's Cafe"],
        stay: "Old Manali",
        estimatedCost: 5000,
        image: "",
      },
      {
        day: 2,
        title: "Solang Valley Adventure",
        imageQuery: "Solang Valley Manali India",
        activities: [
          "Visit Solang Valley",
          "Enjoy cable car ride",
          "Try paragliding or zorbing",
          "Explore nearby viewpoints",
        ],
        restaurants: ["Local Himachali dhabas"],
        stay: "Old Manali",
        estimatedCost: 5000,
        image: "",
      },
      {
        day: 3,
        title: "Atal Tunnel & Sissu",
        imageQuery: "Sissu Himachal Pradesh India",
        activities: [
          "Drive towards Atal Tunnel",
          "Visit Sissu village",
          "Visit Sissu waterfall",
          "Enjoy scenic Beas Valley views",
        ],
        restaurants: ["Roadside Himachali restaurants"],
        stay: "Old Manali",
        estimatedCost: 5500,
        image: "",
      },
      {
        day: 4,
        title: "Hadimba Temple & Vashisht",
        imageQuery: "Hadimba Temple Manali India",
        activities: [
          "Visit Hadimba Devi Temple",
          "Explore Van Vihar",
          "Visit Vashisht Temple",
          "Relax at Vashisht hot springs",
        ],
        restaurants: ["The Lazy Dog", "Renaissance Restaurant"],
        stay: "Old Manali",
        estimatedCost: 4000,
        image: "",
      },
      {
        day: 5,
        title: "Local Shopping & Departure",
        imageQuery: "Mall Road Manali India",
        activities: [
          "Explore Mall Road",
          "Buy local handicrafts",
          "Enjoy breakfast",
          "Departure",
        ],
        restaurants: ["Mall Road cafes"],
        stay: "Departure day",
        estimatedCost: 2500,
        image: "",
      },
    ],
  },

  // ============================================================
  // SHIMLA
  // ============================================================
  {
    destinationName: "Shimla",
    title: "4 Days in Shimla — Hills, Heritage & Views",
    summary:
      "A relaxed Shimla itinerary covering the Ridge, Mall Road, Jakhoo Temple, Kufri and colonial heritage.",

    imageQuery: "Shimla Himachal Pradesh India",
    coverImage: "",

    durationDays: 4,
    durationNights: 3,
    bestTime: "March to June",
    estimatedBudget: 17000,
    theme: "Nature",

    highlights: [
      "Mall Road",
      "The Ridge",
      "Jakhoo Temple",
      "Kufri",
      "Toy Train",
    ],

    tips: [
      "Walk around the Ridge and Mall Road in the evening.",
      "Carry comfortable shoes because Shimla involves steep walking.",
      "Check toy-train availability before planning the ride.",
    ],

    days: [
      {
        day: 1,
        title: "Arrival & Mall Road",
        imageQuery: "Shimla Mall Road India",
        activities: [
          "Arrive and check in",
          "Explore Mall Road",
          "Visit The Ridge",
          "Evening at Scandal Point",
        ],
        restaurants: ["Wake & Bake Cafe", "Indian Coffee House"],
        stay: "Shimla",
        estimatedCost: 4500,
        image: "",
      },
      {
        day: 2,
        title: "Jakhoo Temple & Local Heritage",
        imageQuery: "Jakhoo Temple Shimla India",
        activities: [
          "Visit Jakhoo Temple",
          "Explore Christ Church",
          "Walk around the Ridge",
          "Visit colonial-era buildings",
        ],
        restaurants: ["Himachali Rasoi"],
        stay: "Shimla",
        estimatedCost: 4000,
        image: "",
      },
      {
        day: 3,
        title: "Kufri & Himalayan Views",
        imageQuery: "Kufri Shimla India",
        activities: [
          "Visit Kufri",
          "Explore Himalayan Nature Park",
          "Enjoy mountain viewpoints",
          "Return to Shimla",
        ],
        restaurants: ["Local Kufri restaurants"],
        stay: "Shimla",
        estimatedCost: 5000,
        image: "",
      },
      {
        day: 4,
        title: "Toy Train & Departure",
        imageQuery: "Shimla toy train India",
        activities: [
          "Morning leisure",
          "Toy train experience if available",
          "Local shopping",
          "Departure",
        ],
        restaurants: ["Local cafe"],
        stay: "Departure day",
        estimatedCost: 2500,
        image: "",
      },
    ],
  },

  // ============================================================
  // LEH LADAKH
  // ============================================================
  {
    destinationName: "Leh Ladakh",
    title: "7 Days in Leh Ladakh — High Passes & Pangong",
    summary:
      "An adventure through Leh, Nubra Valley, Pangong Lake and famous Himalayan mountain passes.",

    imageQuery: "Leh Ladakh Pangong Lake India",
    coverImage: "",

    durationDays: 7,
    durationNights: 6,
    bestTime: "May to September",
    estimatedBudget: 42000,
    theme: "Adventure",

    highlights: [
      "Leh Palace",
      "Shanti Stupa",
      "Nubra Valley",
      "Pangong Lake",
      "Khardung La",
    ],

    tips: [
      "Spend your first day acclimatizing.",
      "Carry warm clothing even during summer.",
      "Keep medicines and water available because of high altitude.",
    ],

    days: [
      {
        day: 1,
        title: "Arrival & Acclimatization",
        imageQuery: "Leh Ladakh India",
        activities: [
          "Arrive in Leh",
          "Check in",
          "Rest and acclimatize",
          "Short evening walk if comfortable",
        ],
        restaurants: ["Local Leh cafe"],
        stay: "Leh",
        estimatedCost: 5500,
        image: "",
      },
      {
        day: 2,
        title: "Leh Palace & Shanti Stupa",
        imageQuery: "Leh Palace Shanti Stupa",
        activities: [
          "Visit Leh Palace",
          "Visit Shanti Stupa",
          "Explore Leh Market",
          "Visit local monasteries",
        ],
        restaurants: ["Local Ladakhi restaurants"],
        stay: "Leh",
        estimatedCost: 5000,
        image: "",
      },
      {
        day: 3,
        title: "Khardung La & Nubra Valley",
        imageQuery: "Khardung La Nubra Valley Ladakh",
        activities: [
          "Drive towards Khardung La",
          "Cross the mountain pass",
          "Reach Nubra Valley",
          "Explore local villages",
        ],
        restaurants: ["Local Nubra restaurants"],
        stay: "Nubra Valley",
        estimatedCost: 6500,
        image: "",
      },
      {
        day: 4,
        title: "Nubra Valley Exploration",
        imageQuery: "Nubra Valley Ladakh India",
        activities: [
          "Visit Diskit Monastery",
          "See the giant Buddha statue",
          "Visit Hunder sand dunes",
          "Explore the valley",
        ],
        restaurants: ["Local Nubra restaurants"],
        stay: "Nubra Valley",
        estimatedCost: 5500,
        image: "",
      },
      {
        day: 5,
        title: "Pangong Lake",
        imageQuery: "Pangong Lake Ladakh India",
        activities: [
          "Drive towards Pangong Lake",
          "Enjoy lake views",
          "Photography",
          "Sunset near the lake",
        ],
        restaurants: ["Local camps"],
        stay: "Pangong",
        estimatedCost: 7000,
        image: "",
      },
      {
        day: 6,
        title: "Pangong to Leh",
        imageQuery: "Pangong Lake road Ladakh",
        activities: [
          "Morning at Pangong Lake",
          "Drive back towards Leh",
          "Stop at scenic viewpoints",
          "Relax in Leh",
        ],
        restaurants: ["Local Leh restaurants"],
        stay: "Leh",
        estimatedCost: 5500,
        image: "",
      },
      {
        day: 7,
        title: "Leh Market & Departure",
        imageQuery: "Leh Market Ladakh India",
        activities: [
          "Local shopping",
          "Buy souvenirs",
          "Relax before departure",
          "Departure",
        ],
        restaurants: ["Local cafe"],
        stay: "Departure day",
        estimatedCost: 2500,
        image: "",
      },
    ],
  },

  // ============================================================
  // DARJEELING
  // ============================================================
  {
    destinationName: "Darjeeling",
    title: "4 Days in Darjeeling — Tea, Trains & Kanchenjunga",
    summary:
      "Explore Darjeeling's famous sunrise viewpoints, tea gardens, monasteries and heritage railway.",

    imageQuery: "Darjeeling West Bengal India",
    coverImage: "",

    durationDays: 4,
    durationNights: 3,
    bestTime: "March to May",
    estimatedBudget: 18000,
    theme: "Nature",

    highlights: [
      "Tiger Hill sunrise",
      "Darjeeling Himalayan Railway",
      "Tea gardens",
      "Batasia Loop",
      "Peace Pagoda",
    ],

    tips: [
      "Leave early for Tiger Hill sunrise.",
      "Carry a light jacket.",
      "Book the toy train in advance during peak season.",
    ],

    days: [
      {
        day: 1,
        title: "Arrival & Darjeeling Town",
        imageQuery: "Darjeeling Mall Road India",
        activities: [
          "Arrive and check in",
          "Explore Mall Road",
          "Visit Chowrasta",
          "Enjoy mountain views",
        ],
        restaurants: ["Glenary's"],
        stay: "Darjeeling town",
        estimatedCost: 4500,
        image: "",
      },
      {
        day: 2,
        title: "Tiger Hill & Batasia Loop",
        imageQuery: "Tiger Hill Darjeeling sunrise",
        activities: [
          "Watch sunrise at Tiger Hill",
          "Visit Batasia Loop",
          "Visit Ghoom Monastery",
          "Explore Darjeeling Himalayan Railway",
        ],
        restaurants: ["Local Darjeeling restaurants"],
        stay: "Darjeeling town",
        estimatedCost: 5000,
        image: "",
      },
      {
        day: 3,
        title: "Tea Gardens & Peace Pagoda",
        imageQuery: "Darjeeling tea gardens India",
        activities: [
          "Visit a tea estate",
          "Tea tasting",
          "Visit Japanese Peace Pagoda",
          "Explore local markets",
        ],
        restaurants: ["Keventers"],
        stay: "Darjeeling town",
        estimatedCost: 4500,
        image: "",
      },
      {
        day: 4,
        title: "Local Shopping & Departure",
        imageQuery: "Darjeeling West Bengal India",
        activities: [
          "Morning walk",
          "Buy Darjeeling tea",
          "Local souvenir shopping",
          "Departure",
        ],
        restaurants: ["Local cafe"],
        stay: "Departure day",
        estimatedCost: 2500,
        image: "",
      },
    ],
  },

  // ============================================================
  // AULI
  // ============================================================
  {
    destinationName: "Auli",
    title: "4 Days in Auli — Snow, Skiing & Himalayas",
    summary:
      "A scenic Himalayan escape featuring Auli's ski slopes, ropeway, mountain viewpoints and nearby Joshimath.",

    imageQuery: "Auli Uttarakhand India snow mountains",
    coverImage: "",

    durationDays: 4,
    durationNights: 3,
    bestTime: "December to March",
    estimatedBudget: 22000,
    theme: "Adventure",

    highlights: [
      "Auli ski slopes",
      "Auli ropeway",
      "Gurso Bugyal",
      "Joshimath",
      "Chenab Lake",
    ],

    tips: [
      "Winter roads can be affected by snowfall.",
      "Book ski equipment and lessons early.",
      "Carry proper thermal clothing.",
    ],

    days: [
      {
        day: 1,
        title: "Arrival & Auli",
        imageQuery: "Auli Uttarakhand India",
        activities: [
          "Arrive in Joshimath",
          "Take the ropeway towards Auli",
          "Check in",
          "Enjoy Himalayan sunset",
        ],
        restaurants: ["Local Auli restaurants"],
        stay: "Auli",
        estimatedCost: 6000,
        image: "",
      },
      {
        day: 2,
        title: "Skiing & Snow Activities",
        imageQuery: "Auli skiing India",
        activities: [
          "Skiing lesson",
          "Explore snow-covered slopes",
          "Enjoy cable car views",
          "Photography",
        ],
        restaurants: ["Local mountain cafe"],
        stay: "Auli",
        estimatedCost: 6500,
        image: "",
      },
      {
        day: 3,
        title: "Gurso Bugyal & Joshimath",
        imageQuery: "Gurso Bugyal Auli India",
        activities: [
          "Explore Gurso Bugyal",
          "Enjoy Himalayan viewpoints",
          "Visit Joshimath",
          "Return to Auli",
        ],
        restaurants: ["Local Joshimath restaurants"],
        stay: "Auli",
        estimatedCost: 5500,
        image: "",
      },
      {
        day: 4,
        title: "Mountain Views & Departure",
        imageQuery: "Auli Himalayan mountains India",
        activities: [
          "Morning mountain views",
          "Local shopping",
          "Return towards Joshimath",
          "Departure",
        ],
        restaurants: ["Local cafe"],
        stay: "Departure day",
        estimatedCost: 3500,
        image: "",
      },
    ],
  },

  // ============================================================
  // SPITI VALLEY
  // ============================================================
  {
    destinationName: "Spiti Valley",
    title: "7 Days in Spiti Valley — Monasteries & High Mountains",
    summary:
      "A road-trip itinerary through Kaza, Key Monastery, Kibber, Dhankar and the dramatic Spiti landscape.",

    imageQuery: "Spiti Valley Himachal Pradesh India",
    coverImage: "",

    durationDays: 7,
    durationNights: 6,
    bestTime: "June to September",
    estimatedBudget: 30000,
    theme: "Adventure",

    highlights: [
      "Key Monastery",
      "Kibber",
      "Chandratal Lake",
      "Kaza",
      "Dhankar",
    ],

    tips: [
      "Acclimatize properly because Spiti is a high-altitude region.",
      "Road conditions can change quickly.",
      "Carry cash because network connectivity can be limited.",
    ],

    days: [
      {
        day: 1,
        title: "Arrival & Kaza",
        imageQuery: "Kaza Spiti Valley India",
        activities: [
          "Arrive in Kaza",
          "Check in",
          "Rest and acclimatize",
          "Explore Kaza market",
        ],
        restaurants: ["Local Kaza cafe"],
        stay: "Kaza",
        estimatedCost: 5000,
        image: "",
      },
      {
        day: 2,
        title: "Key Monastery",
        imageQuery: "Key Monastery Spiti India",
        activities: [
          "Visit Key Monastery",
          "Visit Kibber village",
          "Explore high-altitude landscapes",
          "Return to Kaza",
        ],
        restaurants: ["Local Spiti restaurants"],
        stay: "Kaza",
        estimatedCost: 4500,
        image: "",
      },
      {
        day: 3,
        title: "Dhankar Valley",
        imageQuery: "Dhankar Monastery Spiti India",
        activities: [
          "Drive towards Dhankar",
          "Visit Dhankar Monastery",
          "Explore Dhankar village",
          "Enjoy valley views",
        ],
        restaurants: ["Local guesthouse meals"],
        stay: "Kaza",
        estimatedCost: 4500,
        image: "",
      },
      {
        day: 4,
        title: "Kibber & Local Villages",
        imageQuery: "Kibber Spiti Valley India",
        activities: [
          "Explore Kibber",
          "Visit nearby villages",
          "Meet local communities",
          "Photography",
        ],
        restaurants: ["Local cafes"],
        stay: "Kaza",
        estimatedCost: 4000,
        image: "",
      },
      {
        day: 5,
        title: "Chandratal Region",
        imageQuery: "Chandratal Lake Himachal Pradesh India",
        activities: [
          "Drive towards Chandratal",
          "Enjoy mountain landscapes",
          "Visit the lake if road conditions permit",
          "Camp overnight if available",
        ],
        restaurants: ["Camp meals"],
        stay: "Chandratal region",
        estimatedCost: 6000,
        image: "",
      },
      {
        day: 6,
        title: "Return Journey",
        imageQuery: "Spiti Valley mountain road India",
        activities: [
          "Start return journey",
          "Scenic road stops",
          "Explore local villages",
          "Rest in Kaza",
        ],
        restaurants: ["Local restaurant"],
        stay: "Kaza",
        estimatedCost: 4000,
        image: "",
      },
      {
        day: 7,
        title: "Kaza & Departure",
        imageQuery: "Kaza Spiti Valley India",
        activities: [
          "Morning local exploration",
          "Buy souvenirs",
          "Final photographs",
          "Departure",
        ],
        restaurants: ["Local cafe"],
        stay: "Departure day",
        estimatedCost: 2500,
        image: "",
      },
    ],
  },

  // ============================================================
  // NAINITAL
  // ============================================================
  {
    destinationName: "Nainital",
    title: "3 Days in Nainital — Lake & Hills",
    summary:
      "A peaceful hill-station itinerary around Naini Lake, viewpoints, temples and nearby Bhimtal.",

    imageQuery: "Nainital Uttarakhand India Naini Lake",
    coverImage: "",

    durationDays: 3,
    durationNights: 2,
    bestTime: "March to June",
    estimatedBudget: 14000,
    theme: "Nature",

    highlights: [
      "Naini Lake",
      "Naina Devi Temple",
      "Snow View Point",
      "Mall Road",
      "Bhimtal",
    ],

    tips: [
      "Start sightseeing early to avoid traffic.",
      "Boating is best enjoyed during calmer weather.",
      "Carry a light jacket for evenings.",
    ],

    days: [
      {
        day: 1,
        title: "Arrival & Naini Lake",
        imageQuery: "Naini Lake Nainital India",
        activities: [
          "Arrive and check in",
          "Boat ride on Naini Lake",
          "Visit Naina Devi Temple",
          "Explore Mall Road",
        ],
        restaurants: ["Local Nainital cafe"],
        stay: "Nainital",
        estimatedCost: 5000,
        image: "",
      },
      {
        day: 2,
        title: "Snow View & Bhimtal",
        imageQuery: "Snow View Point Nainital India",
        activities: [
          "Visit Snow View Point",
          "Explore Himalayan viewpoints",
          "Drive to Bhimtal",
          "Enjoy lakeside evening",
        ],
        restaurants: ["Local restaurants"],
        stay: "Nainital",
        estimatedCost: 5500,
        image: "",
      },
      {
        day: 3,
        title: "Local Shopping & Departure",
        imageQuery: "Nainital Mall Road India",
        activities: [
          "Morning walk",
          "Local shopping",
          "Enjoy breakfast",
          "Departure",
        ],
        restaurants: ["Local cafe"],
        stay: "Departure day",
        estimatedCost: 2500,
        image: "",
      },
    ],
  },

  // ============================================================
  // MUSSOORIE
  // ============================================================
  {
    destinationName: "Mussoorie",
    title: "4 Days in Mussoorie — Queen of the Hills",
    summary:
      "Explore Mussoorie's famous waterfalls, viewpoints, Mall Road and peaceful hill trails.",

    imageQuery: "Mussoorie Uttarakhand India hills",
    coverImage: "",

    durationDays: 4,
    durationNights: 3,
    bestTime: "March to June",
    estimatedBudget: 16000,
    theme: "Nature",

    highlights: [
      "Mall Road",
      "Kempty Falls",
      "Gun Hill",
      "Lal Tibba",
      "Company Garden",
    ],

    tips: [
      "Avoid peak-hour traffic around Mall Road.",
      "Wear comfortable shoes for hill walks.",
      "Kempty Falls can be crowded during holidays.",
    ],

    days: [
      {
        day: 1,
        title: "Arrival & Mall Road",
        imageQuery: "Mussoorie Mall Road India",
        activities: [
          "Arrive and check in",
          "Explore Mall Road",
          "Visit Camel's Back Road",
          "Enjoy sunset",
        ],
        restaurants: ["Local Mussoorie cafes"],
        stay: "Mussoorie",
        estimatedCost: 4500,
        image: "",
      },
      {
        day: 2,
        title: "Kempty Falls",
        imageQuery: "Kempty Falls Mussoorie India",
        activities: [
          "Visit Kempty Falls",
          "Explore surrounding hills",
          "Return to Mussoorie",
          "Evening market walk",
        ],
        restaurants: ["Local restaurants"],
        stay: "Mussoorie",
        estimatedCost: 4500,
        image: "",
      },
      {
        day: 3,
        title: "Gun Hill & Lal Tibba",
        imageQuery: "Lal Tibba Mussoorie India",
        activities: [
          "Visit Gun Hill",
          "Explore Landour",
          "Visit Lal Tibba",
          "Enjoy cafes",
        ],
        restaurants: ["Landour cafes"],
        stay: "Mussoorie",
        estimatedCost: 4500,
        image: "",
      },
      {
        day: 4,
        title: "Company Garden & Departure",
        imageQuery: "Company Garden Mussoorie India",
        activities: [
          "Visit Company Garden",
          "Local shopping",
          "Breakfast",
          "Departure",
        ],
        restaurants: ["Local cafe"],
        stay: "Departure day",
        estimatedCost: 2500,
        image: "",
      },
    ],
  },

  // ============================================================
  // GOA
  // ============================================================
  {
    destinationName: "Goa",
    title: "4 Days in Goa — Beaches, Forts & Nightlife",
    summary:
      "A balanced Goa itinerary covering North Goa beaches, Old Goa heritage and peaceful South Goa.",

    imageQuery: "Goa India beaches",
    coverImage: "",

    durationDays: 4,
    durationNights: 3,
    bestTime: "November to February",
    estimatedBudget: 18000,
    theme: "Beach",

    highlights: [
      "Baga Beach",
      "Fort Aguada",
      "Anjuna",
      "Old Goa",
      "Palolem Beach",
    ],

    tips: [
      "Renting a scooter can make local travel easier.",
      "Check local rules before swimming or participating in water sports.",
      "South Goa is generally quieter than North Goa.",
    ],

    days: [
      {
        day: 1,
        title: "Arrival & Baga Beach",
        imageQuery: "Baga Beach Goa India",
        activities: [
          "Arrive and check in",
          "Relax at Baga Beach",
          "Explore Calangute",
          "Sunset at Fort Aguada",
        ],
        restaurants: ["Britto's", "Souza Lobo"],
        stay: "Baga / Calangute",
        estimatedCost: 5000,
        image: "",
      },
      {
        day: 2,
        title: "Anjuna & Vagator",
        imageQuery: "Anjuna Vagator Goa India",
        activities: [
          "Visit Anjuna",
          "Explore local market",
          "Visit Vagator viewpoints",
          "Enjoy evening nightlife",
        ],
        restaurants: ["Local beach restaurants"],
        stay: "Baga / Calangute",
        estimatedCost: 5000,
        image: "",
      },
      {
        day: 3,
        title: "Old Goa & South Goa",
        imageQuery: "Old Goa Basilica India",
        activities: [
          "Visit Basilica of Bom Jesus",
          "Explore Old Goa",
          "Drive towards South Goa",
          "Relax at Palolem Beach",
        ],
        restaurants: ["Martin's Corner"],
        stay: "South Goa",
        estimatedCost: 5000,
        image: "",
      },
      {
        day: 4,
        title: "Beach Morning & Departure",
        imageQuery: "Goa beach India",
        activities: [
          "Relax at the beach",
          "Buy souvenirs",
          "Enjoy breakfast",
          "Departure",
        ],
        restaurants: ["Local cafe"],
        stay: "Departure day",
        estimatedCost: 3000,
        image: "",
      },
    ],
  },

  // ============================================================
  // JAIPUR
  // ============================================================
  {
    destinationName: "Jaipur",
    title: "3 Days in Jaipur — The Pink City",
    summary:
      "A heritage-focused trip through Jaipur's forts, palaces, bazaars and famous viewpoints.",

    imageQuery: "Jaipur Rajasthan India Pink City",
    coverImage: "",

    durationDays: 3,
    durationNights: 2,
    bestTime: "October to March",
    estimatedBudget: 12000,
    theme: "Heritage",

    highlights: [
      "Amber Fort",
      "City Palace",
      "Hawa Mahal",
      "Jantar Mantar",
      "Nahargarh Fort",
    ],

    tips: [
      "Visit Amber Fort early to avoid crowds.",
      "Bargaining is common in local bazaars.",
      "Carry water during outdoor sightseeing.",
    ],

    days: [
      {
        day: 1,
        title: "Amber Fort & City Palace",
        imageQuery: "Amber Fort Jaipur India",
        activities: [
          "Visit Amber Fort",
          "Explore City Palace",
          "Visit Jantar Mantar",
          "Evening in the Old City",
        ],
        restaurants: ["LMB"],
        stay: "Jaipur Old City",
        estimatedCost: 4500,
        image: "",
      },
      {
        day: 2,
        title: "Hawa Mahal & Bazaars",
        imageQuery: "Hawa Mahal Jaipur India",
        activities: [
          "Visit Hawa Mahal",
          "Explore Johari Bazaar",
          "Visit Bapu Bazaar",
          "Enjoy Rajasthani dinner",
        ],
        restaurants: ["Rawat Mishthan Bhandar", "Chokhi Dhani"],
        stay: "Jaipur Old City",
        estimatedCost: 4500,
        image: "",
      },
      {
        day: 3,
        title: "Nahargarh Fort & Departure",
        imageQuery: "Nahargarh Fort Jaipur India",
        activities: [
          "Visit Nahargarh Fort",
          "Enjoy city views",
          "Local shopping",
          "Departure",
        ],
        restaurants: ["Local cafe"],
        stay: "Departure day",
        estimatedCost: 3000,
        image: "",
      },
    ],
  },

  // ============================================================
  // UDAIPUR
  // ============================================================
  {
    destinationName: "Udaipur",
    title: "3 Days in Udaipur — City of Lakes",
    summary:
      "A romantic itinerary around Udaipur's palaces, lakes, gardens and old city.",

    imageQuery: "Udaipur Rajasthan India Lake Pichola",
    coverImage: "",

    durationDays: 3,
    durationNights: 2,
    bestTime: "September to March",
    estimatedBudget: 14000,
    theme: "Honeymoon",

    highlights: [
      "City Palace",
      "Lake Pichola",
      "Jag Mandir",
      "Saheliyon Ki Bari",
      "Fateh Sagar Lake",
    ],

    tips: [
      "Book a sunset boat ride during peak season.",
      "The old city is best explored on foot.",
      "Rooftop restaurants offer excellent lake views.",
    ],

    days: [
      {
        day: 1,
        title: "City Palace & Lake Pichola",
        imageQuery: "Lake Pichola Udaipur India",
        activities: [
          "Explore City Palace",
          "Visit Lake Pichola",
          "Take a sunset boat ride",
          "Visit Jag Mandir",
        ],
        restaurants: ["Ambrai Restaurant"],
        stay: "Lake Pichola",
        estimatedCost: 5000,
        image: "",
      },
      {
        day: 2,
        title: "Gardens & Old City",
        imageQuery: "Jagdish Temple Udaipur India",
        activities: [
          "Visit Saheliyon Ki Bari",
          "Visit Jagdish Temple",
          "Explore old city lanes",
          "Enjoy rooftop dinner",
        ],
        restaurants: ["Upre by 1559 AD"],
        stay: "Lake Pichola",
        estimatedCost: 5000,
        image: "",
      },
      {
        day: 3,
        title: "Fateh Sagar & Departure",
        imageQuery: "Fateh Sagar Lake Udaipur India",
        activities: [
          "Visit Fateh Sagar Lake",
          "Local handicraft shopping",
          "Enjoy breakfast",
          "Departure",
        ],
        restaurants: ["Local cafe"],
        stay: "Departure day",
        estimatedCost: 3000,
        image: "",
      },
    ],
  },

  // ============================================================
  // MUNNAR
  // ============================================================
  {
    destinationName: "Munnar",
    title: "4 Days in Munnar — Tea Gardens & Hills",
    summary:
      "A relaxed Western Ghats trip covering tea plantations, Eravikulam, Mattupetty Dam and Top Station.",

    imageQuery: "Munnar Kerala India tea plantations",
    coverImage: "",

    durationDays: 4,
    durationNights: 3,
    bestTime: "September to May",
    estimatedBudget: 16000,
    theme: "Nature",

    highlights: [
      "Tea Museum",
      "Eravikulam National Park",
      "Mattupetty Dam",
      "Top Station",
      "Kundala Lake",
    ],

    tips: [
      "Start early for popular attractions.",
      "Carry a light jacket.",
      "Weather can change quickly in the hills.",
    ],

    days: [
      {
        day: 1,
        title: "Arrival & Tea Gardens",
        imageQuery: "Munnar tea gardens Kerala India",
        activities: [
          "Arrive and check in",
          "Explore nearby tea gardens",
          "Visit Tea Museum",
          "Relax in Munnar town",
        ],
        restaurants: ["Rapsy Restaurant"],
        stay: "Munnar",
        estimatedCost: 4500,
        image: "",
      },
      {
        day: 2,
        title: "Eravikulam & Mattupetty",
        imageQuery: "Eravikulam National Park Munnar India",
        activities: [
          "Visit Eravikulam National Park",
          "Visit Mattupetty Dam",
          "Explore Echo Point",
          "Return to Munnar",
        ],
        restaurants: ["Sree Mahaveer Bhavan"],
        stay: "Munnar",
        estimatedCost: 4500,
        image: "",
      },
      {
        day: 3,
        title: "Top Station & Kundala",
        imageQuery: "Top Station Munnar Kerala India",
        activities: [
          "Visit Top Station",
          "Visit Kundala Lake",
          "Enjoy boating",
          "Explore scenic viewpoints",
        ],
        restaurants: ["Saravana Bhavan"],
        stay: "Munnar",
        estimatedCost: 4500,
        image: "",
      },
      {
        day: 4,
        title: "Tea Shopping & Departure",
        imageQuery: "Munnar Kerala tea plantation",
        activities: [
          "Visit local shops",
          "Buy tea and spices",
          "Relaxed breakfast",
          "Departure",
        ],
        restaurants: ["Local cafe"],
        stay: "Departure day",
        estimatedCost: 2500,
        image: "",
      },
    ],
  },

  // ============================================================
  // RISHIKESH
  // ============================================================
  {
    destinationName: "Rishikesh",
    title: "3 Days in Rishikesh — Ganga, Yoga & Adventure",
    summary:
      "A mix of spirituality and adventure featuring rafting, ashrams, bridges and Ganga Aarti.",

    imageQuery: "Rishikesh India Ganga river mountains",
    coverImage: "",

    durationDays: 3,
    durationNights: 2,
    bestTime: "September to April",
    estimatedBudget: 9000,
    theme: "Spiritual",

    highlights: [
      "Laxman Jhula area",
      "Ganga Aarti",
      "River rafting",
      "Beatles Ashram",
      "Riverside yoga",
    ],

    tips: [
      "Check river conditions before booking rafting.",
      "Arrive early for Ganga Aarti.",
      "Wear comfortable footwear for walking.",
    ],

    days: [
      {
        day: 1,
        title: "Arrival & Ganga Ghats",
        imageQuery: "Ram Jhula Rishikesh India",
        activities: [
          "Arrive and check in",
          "Explore Ram Jhula area",
          "Visit local ashrams",
          "Attend Ganga Aarti",
        ],
        restaurants: ["Chotiwala"],
        stay: "Tapovan / Rishikesh",
        estimatedCost: 3000,
        image: "",
      },
      {
        day: 2,
        title: "River Rafting & Beatles Ashram",
        imageQuery: "Rishikesh river rafting India",
        activities: [
          "White-water rafting",
          "Explore Beatles Ashram",
          "Walk beside the Ganga",
          "Relax at a riverside cafe",
        ],
        restaurants: ["Little Buddha Cafe"],
        stay: "Tapovan / Rishikesh",
        estimatedCost: 4000,
        image: "",
      },
      {
        day: 3,
        title: "Yoga & Departure",
        imageQuery: "Rishikesh yoga Ganga India",
        activities: [
          "Morning yoga or meditation",
          "Local shopping",
          "Enjoy breakfast",
          "Departure",
        ],
        restaurants: ["Local cafe"],
        stay: "Departure day",
        estimatedCost: 2000,
        image: "",
      },
    ],
  },

  // ============================================================
  // PARIS
  // ============================================================
  {
    destinationName: "Paris",
    title: "5 Days in Paris — Landmarks, Art & Romance",
    summary:
      "A first-time Paris itinerary covering iconic landmarks, museums, Montmartre, Seine and Versailles.",

    imageQuery: "Paris France Eiffel Tower city",
    coverImage: "",

    durationDays: 5,
    durationNights: 4,
    bestTime: "April to June",
    estimatedBudget: 90000,
    theme: "Honeymoon",

    highlights: [
      "Eiffel Tower",
      "Louvre Museum",
      "Montmartre",
      "Seine River Cruise",
      "Versailles",
    ],

    tips: [
      "Book major attractions ahead of time.",
      "Use public transportation for most city travel.",
      "Keep one flexible evening for exploring local cafes.",
    ],

    days: [
      {
        day: 1,
        title: "Arrival & Eiffel Tower",
        imageQuery: "Eiffel Tower Paris France",
        activities: [
          "Arrive and check in",
          "Visit Eiffel Tower",
          "Walk around Champ de Mars",
          "Evening city walk",
        ],
        restaurants: ["Local French bistro"],
        stay: "Central Paris",
        estimatedCost: 18000,
        image: "",
      },
      {
        day: 2,
        title: "Louvre & Île de la Cité",
        imageQuery: "Louvre Museum Paris France",
        activities: [
          "Explore Louvre Museum",
          "Visit Île de la Cité",
          "See Notre-Dame exterior",
          "Visit Sainte-Chapelle",
        ],
        restaurants: ["Angelina Paris"],
        stay: "Central Paris",
        estimatedCost: 18000,
        image: "",
      },
      {
        day: 3,
        title: "Montmartre & Seine",
        imageQuery: "Montmartre Sacre Coeur Paris France",
        activities: [
          "Visit Sacré-Cœur",
          "Explore Montmartre",
          "Visit local cafes",
          "Take a Seine River cruise",
        ],
        restaurants: ["La Maison Rose"],
        stay: "Central Paris",
        estimatedCost: 17000,
        image: "",
      },
      {
        day: 4,
        title: "Versailles Day Trip",
        imageQuery: "Palace of Versailles France",
        activities: [
          "Travel to Versailles",
          "Explore the palace",
          "Walk through the gardens",
          "Return to Paris",
        ],
        restaurants: ["Local Versailles restaurant"],
        stay: "Central Paris",
        estimatedCost: 20000,
        image: "",
      },
      {
        day: 5,
        title: "Champs-Élysées & Departure",
        imageQuery: "Arc de Triomphe Paris France",
        activities: [
          "Visit Arc de Triomphe",
          "Walk along Champs-Élysées",
          "Last-minute shopping",
          "Departure",
        ],
        restaurants: ["Local French cafe"],
        stay: "Departure day",
        estimatedCost: 7000,
        image: "",
      },
    ],
  },

  // ============================================================
  // DUBAI
  // ============================================================
  {
    destinationName: "Dubai",
    title: "4 Days in Dubai — Skyline, Desert & Souks",
    summary:
      "A city-and-desert itinerary combining Burj Khalifa, Dubai Mall, desert safari, souks and Palm Jumeirah.",

    imageQuery: "Dubai UAE skyline Burj Khalifa",
    coverImage: "",

    durationDays: 4,
    durationNights: 3,
    bestTime: "November to March",
    estimatedBudget: 75000,
    theme: "City",

    highlights: [
      "Burj Khalifa",
      "Desert Safari",
      "Dubai Mall",
      "Old Dubai Souks",
      "Palm Jumeirah",
    ],

    tips: [
      "Book Burj Khalifa tickets ahead of time.",
      "Choose desert activities according to your comfort level.",
      "Keep sun protection with you during outdoor activities.",
    ],

    days: [
      {
        day: 1,
        title: "Arrival & Downtown Dubai",
        imageQuery: "Burj Khalifa Dubai UAE",
        activities: [
          "Arrive and check in",
          "Visit Burj Khalifa",
          "Explore Dubai Mall",
          "Watch Dubai Fountain show",
        ],
        restaurants: ["Downtown Dubai restaurants"],
        stay: "Downtown Dubai",
        estimatedCost: 20000,
        image: "",
      },
      {
        day: 2,
        title: "Desert Safari",
        imageQuery: "Dubai desert safari dunes UAE",
        activities: [
          "Dune bashing",
          "Camel riding",
          "Sandboarding",
          "Desert camp dinner",
        ],
        restaurants: ["Desert camp dinner"],
        stay: "Downtown Dubai",
        estimatedCost: 18000,
        image: "",
      },
      {
        day: 3,
        title: "Old Dubai & Marina",
        imageQuery: "Dubai Creek Gold Souk UAE",
        activities: [
          "Explore Dubai Creek",
          "Visit Gold Souk",
          "Visit Spice Souk",
          "Evening at Dubai Marina",
        ],
        restaurants: ["Old Dubai restaurants"],
        stay: "Downtown Dubai",
        estimatedCost: 18000,
        image: "",
      },
      {
        day: 4,
        title: "Palm Jumeirah & Departure",
        imageQuery: "Palm Jumeirah Dubai UAE",
        activities: [
          "Explore Palm Jumeirah",
          "See Atlantis",
          "Last-minute shopping",
          "Departure",
        ],
        restaurants: ["JBR restaurants"],
        stay: "Departure day",
        estimatedCost: 10000,
        image: "",
      },
    ],
  },

  // ============================================================
  // BALI
  // ============================================================
  {
    destinationName: "Bali",
    title: "6 Days in Bali — Temples, Beaches & Rice Terraces",
    summary:
      "A tropical Bali itinerary combining Ubud, rice terraces, temples, waterfalls and beach time.",

    imageQuery: "Bali Indonesia rice terrace beach",
    coverImage: "",

    durationDays: 6,
    durationNights: 5,
    bestTime: "April to October",
    estimatedBudget: 95000,
    theme: "Beach",

    highlights: [
      "Ubud",
      "Tegallalang Rice Terrace",
      "Uluwatu Temple",
      "Nusa Dua",
      "Bali waterfalls",
    ],

    tips: [
      "Carry modest clothing for temple visits.",
      "Start sightseeing early to avoid crowds.",
      "Check local weather before planning water activities.",
    ],

    days: [
      {
        day: 1,
        title: "Arrival & Ubud",
        imageQuery: "Ubud Bali Indonesia",
        activities: [
          "Arrive and check in",
          "Explore Ubud center",
          "Visit Ubud Market",
          "Relax at a local cafe",
        ],
        restaurants: ["Local Ubud restaurant"],
        stay: "Ubud",
        estimatedCost: 16000,
        image: "",
      },
      {
        day: 2,
        title: "Rice Terraces & Temples",
        imageQuery: "Tegallalang Rice Terrace Bali",
        activities: [
          "Visit Tegallalang Rice Terrace",
          "Visit a Balinese temple",
          "Explore local villages",
          "Enjoy traditional food",
        ],
        restaurants: ["Local Balinese restaurant"],
        stay: "Ubud",
        estimatedCost: 16000,
        image: "",
      },
      {
        day: 3,
        title: "Waterfalls & Nature",
        imageQuery: "Bali waterfall Indonesia",
        activities: [
          "Visit a Bali waterfall",
          "Explore surrounding forests",
          "Photography",
          "Return to Ubud",
        ],
        restaurants: ["Local cafe"],
        stay: "Ubud",
        estimatedCost: 15000,
        image: "",
      },
      {
        day: 4,
        title: "Uluwatu & Southern Bali",
        imageQuery: "Uluwatu Temple Bali Indonesia",
        activities: [
          "Travel to southern Bali",
          "Visit Uluwatu Temple",
          "Enjoy coastal viewpoints",
          "Sunset by the ocean",
        ],
        restaurants: ["Jimbaran seafood restaurants"],
        stay: "Nusa Dua",
        estimatedCost: 18000,
        image: "",
      },
      {
        day: 5,
        title: "Nusa Dua Beach Day",
        imageQuery: "Nusa Dua Bali beach",
        activities: [
          "Relax at Nusa Dua",
          "Enjoy beach activities",
          "Explore nearby coastline",
          "Sunset walk",
        ],
        restaurants: ["Beachside restaurant"],
        stay: "Nusa Dua",
        estimatedCost: 18000,
        image: "",
      },
      {
        day: 6,
        title: "Leisure & Departure",
        imageQuery: "Bali beach Indonesia",
        activities: [
          "Relaxed morning",
          "Local shopping",
          "Buy souvenirs",
          "Departure",
        ],
        restaurants: ["Local cafe"],
        stay: "Departure day",
        estimatedCost: 12000,
        image: "",
      },
    ],
  },

  // ============================================================
  // MALDIVES
  // ============================================================
  {
    destinationName: "Maldives",
    title: "5 Days in Maldives — Islands, Lagoons & Relaxation",
    summary:
      "A relaxing island escape focused on beaches, lagoons, snorkeling and resort experiences.",

    imageQuery: "Maldives overwater villa beach",
    coverImage: "",

    durationDays: 5,
    durationNights: 4,
    bestTime: "November to April",
    estimatedBudget: 180000,
    theme: "Honeymoon",

    highlights: [
      "Malé",
      "Resort Island",
      "Snorkeling",
      "Lagoon Cruise",
      "Sunset Beach",
    ],

    tips: [
      "Confirm transfer arrangements from Malé to your resort.",
      "Use reef-safe sunscreen.",
      "Check weather conditions before water activities.",
    ],

    days: [
      {
        day: 1,
        title: "Arrival & Resort",
        imageQuery: "Maldives resort island",
        activities: [
          "Arrive in Malé",
          "Transfer to resort",
          "Check in",
          "Relax on the beach",
        ],
        restaurants: ["Resort restaurant"],
        stay: "Island resort",
        estimatedCost: 45000,
        image: "",
      },
      {
        day: 2,
        title: "Snorkeling & Lagoon",
        imageQuery: "Maldives snorkeling coral reef",
        activities: [
          "Morning snorkeling",
          "Explore coral reefs",
          "Relax at the lagoon",
          "Sunset beach walk",
        ],
        restaurants: ["Resort restaurant"],
        stay: "Island resort",
        estimatedCost: 40000,
        image: "",
      },
      {
        day: 3,
        title: "Island & Water Activities",
        imageQuery: "Maldives turquoise lagoon",
        activities: [
          "Explore nearby island",
          "Enjoy water activities",
          "Relax by the pool",
          "Sunset",
        ],
        restaurants: ["Resort restaurant"],
        stay: "Island resort",
        estimatedCost: 40000,
        image: "",
      },
      {
        day: 4,
        title: "Lagoon Cruise",
        imageQuery: "Maldives sunset cruise",
        activities: [
          "Lagoon cruise",
          "Photography",
          "Relax at the resort",
          "Sunset cruise",
        ],
        restaurants: ["Resort restaurant"],
        stay: "Island resort",
        estimatedCost: 35000,
        image: "",
      },
      {
        day: 5,
        title: "Malé & Departure",
        imageQuery: "Male Maldives city",
        activities: [
          "Return towards Malé",
          "Explore local market if time permits",
          "Buy souvenirs",
          "Departure",
        ],
        restaurants: ["Local restaurant"],
        stay: "Departure day",
        estimatedCost: 20000,
        image: "",
      },
    ],
  },

  // ============================================================
  // TOKYO
  // ============================================================
  {
    destinationName: "Tokyo",
    title: "5 Days in Tokyo — Tradition, Technology & Culture",
    summary:
      "A city itinerary combining Tokyo's traditional temples, modern neighborhoods, shopping districts and skyline.",

    imageQuery: "Tokyo Japan Shibuya city",
    coverImage: "",

    durationDays: 5,
    durationNights: 4,
    bestTime: "March to May",
    estimatedBudget: 140000,
    theme: "City",

    highlights: [
      "Shibuya",
      "Asakusa",
      "Senso-ji",
      "Tokyo Skytree",
      "Meiji Shrine",
    ],

    tips: [
      "Use public transport for efficient city travel.",
      "Avoid blocking sidewalks and train entrances.",
      "Reserve popular attractions when possible.",
    ],

    days: [
      {
        day: 1,
        title: "Arrival & Shibuya",
        imageQuery: "Shibuya Tokyo Japan",
        activities: [
          "Arrive and check in",
          "Explore Shibuya",
          "See Shibuya Crossing",
          "Evening city walk",
        ],
        restaurants: ["Local Tokyo restaurant"],
        stay: "Central Tokyo",
        estimatedCost: 28000,
        image: "",
      },
      {
        day: 2,
        title: "Asakusa & Senso-ji",
        imageQuery: "Sensoji Temple Asakusa Tokyo",
        activities: [
          "Visit Senso-ji Temple",
          "Explore Asakusa",
          "Visit Nakamise Street",
          "See Tokyo Skytree",
        ],
        restaurants: ["Local Japanese restaurant"],
        stay: "Central Tokyo",
        estimatedCost: 28000,
        image: "",
      },
      {
        day: 3,
        title: "Meiji Shrine & Harajuku",
        imageQuery: "Meiji Shrine Tokyo Japan",
        activities: [
          "Visit Meiji Shrine",
          "Explore Harajuku",
          "Walk along Omotesando",
          "Shopping",
        ],
        restaurants: ["Harajuku restaurants"],
        stay: "Central Tokyo",
        estimatedCost: 28000,
        image: "",
      },
      {
        day: 4,
        title: "Modern Tokyo",
        imageQuery: "Tokyo city skyline Japan",
        activities: [
          "Explore modern Tokyo district",
          "Visit observation deck",
          "Shopping",
          "Enjoy Japanese dinner",
        ],
        restaurants: ["Local Tokyo restaurant"],
        stay: "Central Tokyo",
        estimatedCost: 32000,
        image: "",
      },
      {
        day: 5,
        title: "Shopping & Departure",
        imageQuery: "Tokyo Japan shopping district",
        activities: [
          "Local shopping",
          "Buy souvenirs",
          "Final city walk",
          "Departure",
        ],
        restaurants: ["Local cafe"],
        stay: "Departure day",
        estimatedCost: 24000,
        image: "",
      },
    ],
  },

  // ============================================================
  // SINGAPORE
  // ============================================================
  {
    destinationName: "Singapore",
    title: "4 Days in Singapore — Gardens, Skyline & Sentosa",
    summary:
      "A modern city itinerary featuring Marina Bay, Gardens by the Bay, Sentosa and cultural neighborhoods.",

    imageQuery: "Singapore Marina Bay Gardens by Bay",
    coverImage: "",

    durationDays: 4,
    durationNights: 3,
    bestTime: "February to April",
    estimatedBudget: 100000,
    theme: "City",

    highlights: [
      "Marina Bay",
      "Gardens by the Bay",
      "Sentosa",
      "Chinatown",
      "Singapore Flyer",
    ],

    tips: [
      "Singapore's public transport is convenient and efficient.",
      "Carry water because the climate is warm and humid.",
      "Check attraction timings before visiting.",
    ],

    days: [
      {
        day: 1,
        title: "Arrival & Marina Bay",
        imageQuery: "Marina Bay Singapore",
        activities: [
          "Arrive and check in",
          "Explore Marina Bay",
          "Visit Merlion Park",
          "Evening skyline views",
        ],
        restaurants: ["Local Singapore restaurant"],
        stay: "Central Singapore",
        estimatedCost: 25000,
        image: "",
      },
      {
        day: 2,
        title: "Gardens by the Bay",
        imageQuery: "Gardens by the Bay Singapore",
        activities: [
          "Visit Gardens by the Bay",
          "Explore Cloud Forest",
          "Visit Flower Dome",
          "Enjoy evening light show",
        ],
        restaurants: ["Local restaurant"],
        stay: "Central Singapore",
        estimatedCost: 28000,
        image: "",
      },
      {
        day: 3,
        title: "Sentosa Island",
        imageQuery: "Sentosa Island Singapore",
        activities: [
          "Explore Sentosa",
          "Enjoy beach activities",
          "Visit attractions",
          "Evening leisure",
        ],
        restaurants: ["Sentosa restaurants"],
        stay: "Central Singapore",
        estimatedCost: 30000,
        image: "",
      },
      {
        day: 4,
        title: "Chinatown & Departure",
        imageQuery: "Chinatown Singapore",
        activities: [
          "Explore Chinatown",
          "Buy souvenirs",
          "Final shopping",
          "Departure",
        ],
        restaurants: ["Local cafe"],
        stay: "Departure day",
        estimatedCost: 17000,
        image: "",
      },
    ],
  },

  // ============================================================
  // NEW YORK CITY
  // ============================================================
  {
    destinationName: "New York City",
    title: "5 Days in New York — Icons, Parks & Broadway",
    summary:
      "A first-time New York itinerary covering Manhattan landmarks, Central Park, the Statue of Liberty and Broadway.",

    imageQuery: "New York Times Square Statue Liberty",
    coverImage: "",

    durationDays: 5,
    durationNights: 4,
    bestTime: "April to June",
    estimatedBudget: 190000,
    theme: "City",

    highlights: [
      "Times Square",
      "Central Park",
      "Statue of Liberty",
      "Brooklyn Bridge",
      "Broadway",
    ],

    tips: [
      "Use the subway for most city travel.",
      "Book Broadway shows and major attractions early.",
      "Wear comfortable shoes because there is lots of walking.",
    ],

    days: [
      {
        day: 1,
        title: "Arrival & Times Square",
        imageQuery: "Times Square New York USA",
        activities: [
          "Arrive and check in",
          "Explore Times Square",
          "Walk around Broadway",
          "Evening city views",
        ],
        restaurants: ["Local New York restaurant"],
        stay: "Manhattan",
        estimatedCost: 38000,
        image: "",
      },
      {
        day: 2,
        title: "Central Park & Manhattan",
        imageQuery: "Central Park New York USA",
        activities: [
          "Explore Central Park",
          "Visit nearby museums",
          "Walk through Midtown",
          "Enjoy evening skyline",
        ],
        restaurants: ["Local Manhattan restaurant"],
        stay: "Manhattan",
        estimatedCost: 38000,
        image: "",
      },
      {
        day: 3,
        title: "Statue of Liberty",
        imageQuery: "Statue of Liberty New York USA",
        activities: [
          "Visit Statue of Liberty",
          "Explore Lower Manhattan",
          "Visit 9/11 Memorial area",
          "Walk through Wall Street",
        ],
        restaurants: ["Local restaurant"],
        stay: "Manhattan",
        estimatedCost: 40000,
        image: "",
      },
      {
        day: 4,
        title: "Brooklyn Bridge & Broadway",
        imageQuery: "Brooklyn Bridge New York USA",
        activities: [
          "Walk across Brooklyn Bridge",
          "Explore Brooklyn",
          "Return to Manhattan",
          "Watch a Broadway show",
        ],
        restaurants: ["Local restaurant"],
        stay: "Manhattan",
        estimatedCost: 45000,
        image: "",
      },
      {
        day: 5,
        title: "Shopping & Departure",
        imageQuery: "New York Manhattan shopping",
        activities: [
          "Final shopping",
          "Enjoy breakfast",
          "Last city walk",
          "Departure",
        ],
        restaurants: ["Local cafe"],
        stay: "Departure day",
        estimatedCost: 29000,
        image: "",
      },
    ],
  },

  // ============================================================
  // ROME
  // ============================================================
  {
    destinationName: "Rome",
    title: "4 Days in Rome — Ancient History & Italian Culture",
    summary:
      "Explore ancient Roman landmarks, Vatican City, famous fountains and traditional Italian neighborhoods.",

    imageQuery: "Rome Colosseum Italy",
    coverImage: "",

    durationDays: 4,
    durationNights: 3,
    bestTime: "April to June",
    estimatedBudget: 130000,
    theme: "Heritage",

    highlights: [
      "Colosseum",
      "Roman Forum",
      "Trevi Fountain",
      "Vatican City",
      "Pantheon",
    ],

    tips: [
      "Book major attractions in advance.",
      "Wear comfortable shoes for historic areas.",
      "Dress appropriately when visiting churches.",
    ],

    days: [
      {
        day: 1,
        title: "Arrival & Colosseum",
        imageQuery: "Colosseum Rome Italy",
        activities: [
          "Arrive and check in",
          "Visit Colosseum",
          "Explore Roman Forum",
          "Evening walk",
        ],
        restaurants: ["Local Italian trattoria"],
        stay: "Central Rome",
        estimatedCost: 35000,
        image: "",
      },
      {
        day: 2,
        title: "Vatican City",
        imageQuery: "Vatican City Rome Italy",
        activities: [
          "Visit Vatican Museums",
          "Visit St. Peter's Basilica",
          "Explore Vatican area",
          "Enjoy Italian dinner",
        ],
        restaurants: ["Local Roman trattoria"],
        stay: "Central Rome",
        estimatedCost: 35000,
        image: "",
      },
      {
        day: 3,
        title: "Trevi Fountain & Pantheon",
        imageQuery: "Trevi Fountain Rome Italy",
        activities: [
          "Visit Trevi Fountain",
          "Visit Pantheon",
          "Explore Piazza Navona",
          "Explore local streets",
        ],
        restaurants: ["Local Italian restaurant"],
        stay: "Central Rome",
        estimatedCost: 35000,
        image: "",
      },
      {
        day: 4,
        title: "Local Shopping & Departure",
        imageQuery: "Rome Italy streets",
        activities: [
          "Morning walk",
          "Buy Italian souvenirs",
          "Final coffee",
          "Departure",
        ],
        restaurants: ["Local cafe"],
        stay: "Departure day",
        estimatedCost: 25000,
        image: "",
      },
    ],
  },

  // ============================================================
  // SANTORINI
  // ============================================================
  {
    destinationName: "Santorini",
    title: "4 Days in Santorini — Caldera, Villages & Sunsets",
    summary:
      "A romantic island itinerary covering Oia, Fira, volcanic landscapes, beaches and famous sunsets.",

    imageQuery: "Santorini Greece blue domes sunset",
    coverImage: "",

    durationDays: 4,
    durationNights: 3,
    bestTime: "April to October",
    estimatedBudget: 160000,
    theme: "Honeymoon",

    highlights: [
      "Oia sunset",
      "Fira",
      "Caldera cruise",
      "Red Beach",
      "Akrotiri",
    ],

    tips: [
      "Oia sunset viewpoints become crowded, so arrive early.",
      "Wear comfortable footwear on the island's uneven paths.",
      "Check ferry and cruise timings in advance.",
    ],

    days: [
      {
        day: 1,
        title: "Arrival & Fira",
        imageQuery: "Fira Santorini Greece",
        activities: [
          "Arrive and check in",
          "Explore Fira",
          "Walk along the caldera",
          "Enjoy sunset",
        ],
        restaurants: ["Local Greek restaurant"],
        stay: "Fira / Oia",
        estimatedCost: 45000,
        image: "",
      },
      {
        day: 2,
        title: "Oia & Famous Sunset",
        imageQuery: "Oia Santorini Greece sunset",
        activities: [
          "Explore Oia",
          "Visit blue-domed viewpoints",
          "Explore local shops",
          "Watch sunset",
        ],
        restaurants: ["Local Greek restaurant"],
        stay: "Fira / Oia",
        estimatedCost: 40000,
        image: "",
      },
      {
        day: 3,
        title: "Caldera Cruise & Red Beach",
        imageQuery: "Santorini caldera cruise Greece",
        activities: [
          "Take a caldera cruise",
          "Explore volcanic scenery",
          "Visit Red Beach",
          "Relax by the sea",
        ],
        restaurants: ["Local Greek restaurant"],
        stay: "Fira / Oia",
        estimatedCost: 45000,
        image: "",
      },
      {
        day: 4,
        title: "Akrotiri & Departure",
        imageQuery: "Akrotiri Santorini Greece",
        activities: [
          "Visit Akrotiri",
          "Buy local souvenirs",
          "Final island walk",
          "Departure",
        ],
        restaurants: ["Local cafe"],
        stay: "Departure day",
        estimatedCost: 30000,
        image: "",
      },
    ],
  },

  // ============================================================
  // ADDITIONAL DESTINATIONS
  // ============================================================
];

module.exports = itineraries;
