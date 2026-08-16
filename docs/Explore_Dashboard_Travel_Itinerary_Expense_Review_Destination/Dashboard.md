# Roam Meridian — Feature Documentation
 
**Modules covered:** Dashboard Page
 
**Live site:** https://roam-meridian.vercel.app
**Repo:** https://github.com/gourav-godara/Roam-Meridian (branch: `main`)
 
This document covers the features built by this contributor, following
the same per-module format as `client/docs/Explore_Dashboard_Travel_Itinerary_Expense_Review_Destination/Dashboard.md`.
 
---

## 3. Dashboard
 
**Route:** `/dashboard`
**Frontend:** `client/src/pages/Dashboard/Dashboard.jsx`,
`client/src/hooks/useDashboard.js`
**Backend:** `GET /api/dashboard` → `server/src/controllers/dashboard.controller.js`
 
### What it does
The logged-in user's home base — a single aggregated view of their trips,
spending, reviews, and recommendations, so they don't have to visit five
different pages to see "where am I at."
 
### Key features
- **Greeting header** — time-of-day-aware greeting ("Good Morning" /
  "Good Afternoon" / "Good Evening") using the user's first name.
- **Stats grid** — high-level counts (trips, reviews, etc.) via
  `StatsGrid`.
- **Expense summary card** — quick view of total spend / owed, pulled
  from the same aggregation the Expense page uses (see below).
- **Upcoming trip** — the next trip by date, shown as a highlighted card.
- **Continue Planning** — trips still in `planning`/`draft` status the
  user hasn't finished setting up.
- **Travel history** — past completed trips.
- **Recent reviews** — the user's own recently written reviews.
- **Recommendations** — a sidebar of suggested destinations.
- **Activity timeline** — a recent-activity feed (bookings, expenses,
  reviews, etc.).
- **Error state with retry** — if the dashboard fetch fails, the page
  shows a clear message and a **Try Again** button instead of leaving a
  blank screen (this was previously a silent failure — improved during
  this module's work).
### Data flow
Everything comes from **one** call: `GET /api/dashboard`. The backend
aggregates trips, expenses, reviews, and recommendations server-side so
the frontend doesn't need to make 5+ separate requests on page load.
 
---