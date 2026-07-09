import { DESTINATIONS } from "./destinations";

const thumb = (seed) => `https://picsum.photos/seed/${seed}/300/200`;
const avatar = (seed) => `https://i.pravatar.cc/80?u=${seed}`;

const CATEGORY_HIGHLIGHTS = {
  Mountains: ["Scenic Views", "Snow Activities", "Trekking", "Local Food", "Photography"],
  Beach: ["Water Sports", "Sunset Views", "Local Food", "Nightlife", "Shopping"],
  Heritage: ["Historical Sites", "Local Food", "Shopping", "Photography", "Architecture"],
  Adventure: ["Adventure Sports", "Scenic Views", "Trekking", "Local Food", "Camping"],
  Wildlife: ["Wildlife Safari", "Scenic Views", "Photography", "Nature Walks", "Local Food"],
  Nature: ["Scenic Views", "Nature Walks", "Local Food", "Photography", "Camping"],
  Camping: ["Camping", "Scenic Views", "Adventure Sports", "Local Food", "Stargazing"],
  Snow: ["Snow Activities", "Scenic Views", "Adventure Sports", "Local Food", "Photography"],
  City: ["Shopping", "Local Food", "Nightlife", "Architecture", "Photography"],
  Spiritual: ["Historical Sites", "Local Food", "Shopping", "Photography", "Peaceful Walks"],
  Food: ["Local Food", "Shopping", "Nightlife", "Photography", "Markets"],
};

function buildDetails(base) {
  const seedPrefix = `d${base.id}`;
  const highlights = CATEGORY_HIGHLIGHTS[base.category] || CATEGORY_HIGHLIGHTS.Nature;

  const highlightPlaces = Object.fromEntries(
    highlights.map((h, i) => [
      h,
      [
        { id: `${seedPrefix}-hl${i}-1`, name: `${h} Spot Near ${base.name}`, distance: `${2 + i} km away`, rating: 4.5, image: thumb(`${seedPrefix}-hl${i}-1`) },
        { id: `${seedPrefix}-hl${i}-2`, name: `${base.name} ${h} Corner`, distance: `${4 + i} km away`, rating: 4.3, image: thumb(`${seedPrefix}-hl${i}-2`) },
      ],
    ])
  );

  return {
    id: base.id,
    name: base.name,
    location: base.location,
    category: base.category,
    description: `Explore ${base.name}, known for its ${base.category.toLowerCase()} charm — a favorite pick for travelers seeking something memorable in ${base.location}.`,
    rating: base.rating,
    reviewCount: base.reviews,
    images: [
      base.image,
      thumb(`${seedPrefix}-2`),
      thumb(`${seedPrefix}-3`),
      thumb(`${seedPrefix}-4`),
      thumb(`${seedPrefix}-5`),
      thumb(`${seedPrefix}-6`),
    ],
    info: {
      bestTime: "Oct - Mar",
      idealFor: base.category,
      duration: "3-5 days",
      budget: `₹${base.price.toLocaleString("en-IN")}`,
    },
    overview: `${base.name} is a wonderful destination in ${base.location}, perfect for travelers who love ${base.category.toLowerCase()} experiences. With a rating of ${base.rating} from ${base.reviews} travelers, it's a well-loved spot for making lasting memories.`,
    highlights,
    highlightPlaces,
    weather: { temp: 18, condition: "Partly Cloudy", humidity: 55, wind: 10, feelsLike: 17 },
    mapImage: thumb(`${seedPrefix}-map`),
    attractions: [
      { id: `${seedPrefix}-a1`, name: `${base.name} Viewpoint`, distance: "5 km from center", rating: 4.6, image: thumb(`${seedPrefix}-attr1`) },
      { id: `${seedPrefix}-a2`, name: `${base.name} Old Town`, distance: "2 km from center", rating: 4.5, image: thumb(`${seedPrefix}-attr2`) },
      { id: `${seedPrefix}-a3`, name: `${base.name} Market`, distance: "1.5 km from center", rating: 4.4, image: thumb(`${seedPrefix}-attr3`) },
      { id: `${seedPrefix}-a4`, name: `${base.name} Lakeside`, distance: "8 km from center", rating: 4.7, image: thumb(`${seedPrefix}-attr4`) },
    ],
    thingsToDo: [
      { id: `${seedPrefix}-t1`, title: `${base.category} Experience`, duration: "2-3 hrs", price: "₹1,500", image: thumb(`${seedPrefix}-td1`) },
      { id: `${seedPrefix}-t2`, title: "Guided City Walk", duration: "2 hrs", price: "₹700", image: thumb(`${seedPrefix}-td2`) },
      { id: `${seedPrefix}-t3`, title: "Local Food Tour", duration: "3 hrs", price: "₹1,200", image: thumb(`${seedPrefix}-td3`) },
      { id: `${seedPrefix}-t4`, title: "Sunset Photography Spot", duration: "1 hr", price: "Free", image: thumb(`${seedPrefix}-td4`) },
    ],
    restaurants: [
      { id: `${seedPrefix}-r1`, name: `${base.name} Kitchen`, cuisine: "Local · Multi-cuisine", rating: 4.5, cost: "₹900 for two", image: thumb(`${seedPrefix}-r1`) },
      { id: `${seedPrefix}-r2`, name: "The Corner Cafe", cuisine: "Cafe · Continental", rating: 4.4, cost: "₹700 for two", image: thumb(`${seedPrefix}-r2`) },
      { id: `${seedPrefix}-r3`, name: "Spice Route", cuisine: "Indian · Regional", rating: 4.6, cost: "₹1,100 for two", image: thumb(`${seedPrefix}-r3`) },
    ],
    hotels: [
      { id: `${seedPrefix}-h1`, name: `${base.name} Grand Stay`, rating: 4.6, pricePerNight: `₹${Math.round(base.price * 0.35).toLocaleString("en-IN")}`, image: thumb(`${seedPrefix}-h1`) },
      { id: `${seedPrefix}-h2`, name: "Riverside Cottage", rating: 4.4, pricePerNight: `₹${Math.round(base.price * 0.25).toLocaleString("en-IN")}`, image: thumb(`${seedPrefix}-h2`) },
      { id: `${seedPrefix}-h3`, name: "Heritage Boutique Hotel", rating: 4.7, pricePerNight: `₹${Math.round(base.price * 0.5).toLocaleString("en-IN")}`, image: thumb(`${seedPrefix}-h3`) },
    ],
    reviews: [
      { id: `${seedPrefix}-rv1`, name: "Ananya Sharma", rating: 5, date: "2 weeks ago", avatar: avatar(`${seedPrefix}-1`), text: `${base.name} exceeded expectations — the ${base.category.toLowerCase()} experience here is unforgettable.` },
      { id: `${seedPrefix}-rv2`, name: "Rahul Mehta", rating: 4, date: "1 month ago", avatar: avatar(`${seedPrefix}-2`), text: "Great trip overall, though it does get crowded during peak season." },
      { id: `${seedPrefix}-rv3`, name: "Priya Nair", rating: 5, date: "1 month ago", avatar: avatar(`${seedPrefix}-3`), text: "Would visit again in a heartbeat. Highly recommend for a short getaway." },
    ],
    aiItinerary: {
      days: [
        { day: 1, title: `Arrival in ${base.name}`, items: ["Check-in & rest", `Evening walk around ${base.name}`, "Dinner at a local restaurant"] },
        { day: 2, title: `${base.category} Day`, items: [`${base.category} activities`, "Visit top attractions", "Local market shopping"] },
        { day: 3, title: "Relax & Departure", items: ["Leisure morning", "Lunch by the viewpoint", "Departure"] },
      ],
    },
  };
}

export function getDestinationById(id) {
  const base = DESTINATIONS.find((d) => String(d.id) === String(id));
  return buildDetails(base || DESTINATIONS[0]);
}
