# Roam Meridian — Feature Documentation
 
**Modules covered:** Itinerary Page
 
**Live site:** https://roam-meridian.vercel.app
**Repo:** https://github.com/gourav-godara/Roam-Meridian (branch: `main`)
 
This document covers the features built by this contributor, following
the same per-module format as `client/docs/Explore_Dashboard_Travel_Itinerary_Expense_Review_Destination/Itinerary.md`.
 
---

## 7. Travel Itinerary Guide
 
**Route:** `/itinerary-guide` (browse), `/itinerary-guide/:id` (detail)
**Frontend:** `client/src/pages/ItineraryGuide/ItineraryGuideList.jsx`,
`ItineraryGuideDetail.jsx`
**Backend:** `server/src/routes/itinerary.routes.js` →
`server/src/controllers/itinerary.controller.js`
 
| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/itineraries` | Public — browse/search/filter |
| GET | `/api/itineraries/by-destination/:destinationId` | Public |
| GET | `/api/itineraries/:id` | Public — full day-by-day detail |
| POST | `/api/itineraries` | Admin only |
| PUT | `/api/itineraries/:id` | Admin only |
| DELETE | `/api/itineraries/:id` | Admin only |
 
### What it does
A curated, editorial library of ready-made day-by-day trip guides —
modeled on Gujarat Tourism's travel-itinerary page. This is **reference
content only**: browsing it never creates or saves anything to the
user's account. It exists so a user researching, say, Paris, can read a
realistic 5-day plan (which landmarks on which day, where to eat, where
to stay) before deciding how to plan their own trip.
 
### Why this is separate from the AI Planner
The AI Planner (Gemini-based) generates itineraries live, on demand —
but it's constrained by API token limits, so it can't reliably produce
long, detailed, many-day plans on every request. This module solves that
by having **admin-authored, pre-written** itineraries for popular
destinations that load instantly and can be as long/detailed as needed,
with the AI Planner positioned purely as an on-the-fly *suggestion* tool
alongside it — not the source of what gets saved.
 
### How it connects to Trips (without storing anything itself)
This module deliberately does **not** feed into trip creation. The
actual flow (built by a teammate) is: a user reads an itinerary here for
inspiration → goes to **Create Trip** → enters trip dates → the trip form
generates one manual entry per day (matching the trip's date range) where
the user writes their own plan for that day. Nothing from this guide is
auto-copied in — it's reference material, not a template that gets
cloned. The **"Plan This Trip"** button on an itinerary's detail page
does open the AI Planner pre-filled with that destination
(`/planner?destinationId=&destinationName=`) purely as a further
suggestion tool, same reasoning as the button on the Destination page.
 
### Data shape
Each itinerary belongs to one `Destination` (by ObjectId) and contains a
`days[]` array — one entry per day, each with a title, a list of
activities, restaurant suggestions, a suggested stay area, an estimated
cost, and an optional image. A single destination can have **more than
one** itinerary (e.g. a 3-day quick trip and a 7-day in-depth one),
mirroring how Gujarat Tourism lists multiple itineraries per city.
 
### Content
Launch content covers 8 popular destinations end-to-end (Manali, Goa,
Jaipur, Udaipur, Munnar, Rishikesh, Paris, Dubai), written with real
named attractions/restaurants rather than placeholder text — seeded via
`server/seed/itineraries.js` + `seedItineraries.js`. Additional
destinations can be added any time through the Admin → Itineraries form
(`/admin/itineraries/new`), no code changes required.
 
### Admin authoring
Admins manage this content at `/admin/itineraries` (list) and
`/admin/itineraries/new` / `/admin/itineraries/:id/edit` (form). The form
supports adding/removing day blocks dynamically, each with repeatable
activity/restaurant fields, plus a `published` toggle so a draft can be
prepared before going live on the public guide.
 
---
 
## Cross-cutting notes
 
- **Auth pattern** — all authenticated routes use `auth.middleware.js`
  (JWT, `role` embedded in the token) plus `authorization.middleware.js`
  (`authorize("admin")`) for admin-only routes. Public routes (Explore,
  Destination detail, Itinerary Guide, Travel Booking search) work
  without login; write actions (reviews, expenses, bookings, wishlist)
  require it.
- **Response shape** — most endpoints return `{ success, message, data }`
  (a few older ones, like `getDestinationById`, key the payload under a
  named field like `destination` instead of `data` — worth checking the
  actual controller if something isn't showing up as expected).
- **Toasts** — all user-facing success/error feedback goes through
  `ToastContext` (`useToast()`), not `alert()` or silent console errors.
 