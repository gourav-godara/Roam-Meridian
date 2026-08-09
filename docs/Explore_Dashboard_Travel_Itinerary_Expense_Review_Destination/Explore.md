# Roam Meridian — Feature Documentation
 
**Modules covered:** Explore Page
 
**Live site:** https://roam-meridian.vercel.app
**Repo:** https://github.com/gourav-godara/Roam-Meridian (branch: `main`)
 
This document covers the features built by this contributor, following
the same per-module format as `client/docs/Explore_Dashboard_Travel_Itinerary_Expense_Review_Destination/Explore.md`.
 
---
 
## 1. Explore Page
 
**Route:** `/explore`
**Frontend:** `client/src/pages/Explore/Explore.jsx`
**Backend:** `GET /api/destinations` → `server/src/controllers/destination.controller.js`
 
### What it does
The main destination discovery page. Shows every destination in the
catalog as a card grid, with search, filtering, sorting, and pagination
all resolved server-side (not filtered client-side after the fact).
 
### Key features
- **Search** — debounced text search (300ms) against destination name/city,
  so the API isn't hit on every keystroke.
- **Filters** — category (Beach, Mountains, Heritage, etc.), budget range
  (min/max), and minimum rating. Filters are staged in local state and only
  applied to the actual query when the user clicks **Apply**, so adjusting
  a slider doesn't refetch on every drag.
- **Sort** — Recommended (default), Highest Rated, Lowest Price, Newest,
  A–Z.
- **Pagination** — 12 destinations per page, Previous/Next controls.
- **Wishlist toggle** — each card has a heart/favorite button. Clicking it
  calls the wishlist hook (`useWishlist`) to add/remove that destination
  without leaving the page.
### Data flow
1. `getAllDestinations({ page, limit, search, category, minBudget,
   maxBudget, rating, sort })` is called on mount and whenever
   `page` / `debouncedQuery` / `appliedFilters` / `sort` change.
2. The raw destination documents are mapped into a flatter card-friendly
   shape (`rating.average` → `rating`, `budget.min` → `price`, etc.)
   before being handed to `DestinationGrid`.
3. Changing any filter/search/sort resets `page` back to `1`.
### Components used
`ExploreHeader`, `FilterSidebar`, `MobileFilterDrawer`, `DestinationGrid`
 
---
 