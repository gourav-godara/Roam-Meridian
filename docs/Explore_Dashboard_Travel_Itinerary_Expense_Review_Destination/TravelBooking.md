# Roam Meridian — Feature Documentation
 
**Modules covered:** TravelBooking Page
 
**Live site:** https://roam-meridian.vercel.app
**Repo:** https://github.com/gourav-godara/Roam-Meridian (branch: `main`)
 
This document covers the features built by this contributor, following
the same per-module format as `client/docs/Explore_Dashboard_Travel_Itinerary_Expense_Review_Destination/TravelBooking.md`.
 
---

## 6. Travel Booking
 
**Route:** `/travel-booking` (search), `/travel-booking/log` (log a
completed booking)
**Frontend:** `client/src/pages/TravelBooking/TravelBooking.jsx`,
`LogBooking.jsx`, `BookingConfirmation.jsx`
**Backend:**
- `server/src/routes/travelOption.routes.js` — search flights/trains/buses/car rentals
- `server/src/routes/booking.routes.js` — partner redirect + self-logged bookings
### Important — how this actually works
Roam Meridian **does not sell tickets directly** and has no live
inventory of its own. This module is a **search-and-redirect** flow: the
user searches by mode/origin/destination/date, and is redirected to a
real, trusted partner site to complete the actual booking with live
prices. This is the same model most travel-planning apps use when they
don't hold their own ticketing license or API access — see the comment
block at the top of `server/src/models/Booking.js` for the full
reasoning.
 
| Mode | Partner |
|---|---|
| Flight | MakeMyTrip |
| Train | IRCTC |
| Bus | RedBus |
| Car rental | Zoomcar |
 
### Key features
- **Search form** — mode tabs (flight/train/bus/car), origin, destination
  (not required for car — pickup-only), date, passenger count.
- **Redirect** — `getRedirectUrl({ mode, origin, destination, date })`
  returns a partner URL, which opens in a new tab. The user completes
  their actual booking there.
- **Log Booking** — right after redirecting, the user is sent to
  `/travel-booking/log` with the search details pre-filled, so if they do
  complete a booking on the partner site, logging it back into Roam
  Meridian (self-reported reference number, amount paid, notes) is a
  single extra step rather than a separate flow they have to remember to
  come back for.
- **Optional trip link** — a logged booking can be linked to one of the
  user's trips, so it shows up alongside that trip's itinerary and
  expenses.
- **Booking history** — `GET /api/bookings` lists everything the user has
  logged; shown on `DashboardBookings.jsx`.
### Data model note
Because these are self-reported (Roam Meridian has no API access to
verify against MakeMyTrip/IRCTC/RedBus/Zoomcar), `referenceNumber` and
`amountPaid` are both optional fields on the `Booking` model — not every
user will have them handy when logging.
 
---