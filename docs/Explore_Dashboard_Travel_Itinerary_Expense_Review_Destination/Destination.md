# Roam Meridian — Feature Documentation
 
**Modules covered:** Destination Page
 
**Live site:** https://roam-meridian.vercel.app
**Repo:** https://github.com/gourav-godara/Roam-Meridian (branch: `main`)
 
This document covers the features built by this contributor, following
the same per-module format as `client/docs/Explore_Dashboard_Travel_Itinerary_Expense_Review_Destination/Destination.md`.
 
---
## 2. Destination Detail Page
 
**Route:** `/destination/:id`
**Frontend:** `client/src/pages/Destination/Destination.jsx`
**Backend:**
- `GET /api/destinations/:id` — destination detail
- `GET /api/maps/nearby` — nearby places (restaurants, hotels,
  attractions, things-to-do), via `server/src/services/nearby.service.js`
  (Geoapify Places API)
- `GET /api/maps/route` — turn-by-turn route between two points
- `GET /api/weather` — current weather for the destination's city
- `GET /api/reviews?destination=:id` — reviews for this destination
### What it does
The full profile page for a single destination: photo gallery, overview,
live weather, an interactive map with nearby-place search and routing,
and reviews — everything a user needs to decide on and plan a visit.
 
### Key features
- **Gallery & header** — image carousel, name/location/category, quick
  info cards (best time to visit, duration, entry requirements).
- **Weather** — live current-weather card for the destination's city.
- **Nearby places, in 4 categories** — Top Attractions, Things to Do,
  Restaurants, Hotels. All four call the same
  `getNearbyPlaces(lat, lng, type, radius)` service with a different
  `type` (`tourist_attraction`, `things_to_do`, `restaurant`, `hotel`),
  so they share one code path and one response shape.
- **Interactive map (Leaflet)** — clicking **Show Route** on any nearby
  place draws a route (green polyline) from the destination to that
  place, and shows distance/duration plus a **"Get Directions in Google
  Maps"** button that deep-links to Google Maps for turn-by-turn
  navigation. This exists on both the mobile and the desktop (sticky
  sidebar) map — both must receive `selectedPlace` as a prop, or the
  directions button won't render on that view even though the route line
  still draws (this was an actual bug that got fixed — worth knowing if
  it ever seems to regress).
- **Reviews** — shows existing reviews for the destination, with an
  average rating pulled from `getAverageRating`. Logged-in users who have
  a **completed trip** to this destination can write a review (image
  upload supported, up to 5 images).
- **Action buttons** — Wishlist (add/remove) and **Plan with AI**, which
  navigates to `/planner?destinationId=&destinationName=` so the AI
  Planner opens pre-filled with this destination.
### Data flow
On mount: fetch destination detail → in parallel, fetch weather and the
4 nearby-place categories (restaurants/hotels/attractions/things-to-do)
→ fetch reviews. Clicking "Show Route" on any place calls
`handlePlaceRoute(place)`, which sets `selectedPlace` and fetches
`routeData` from the maps route endpoint.
 
---