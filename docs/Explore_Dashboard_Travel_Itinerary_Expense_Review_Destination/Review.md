# Roam Meridian — Feature Documentation
 
**Modules covered:** Review Page
 
**Live site:** https://roam-meridian.vercel.app
**Repo:** https://github.com/gourav-godara/Roam-Meridian (branch: `main`)
 
This document covers the features built by this contributor, following
the same per-module format as `client/docs/Explore_Dashboard_Travel_Itinerary_Expense_Review_Destination/Review.md`.
 
---

## 5. Reviews
 
**Route:** `/reviews` (general reviews page), plus reviews shown inline
on each Destination page
**Frontend:** `client/src/pages/Reviews/ReviewPage.jsx`,
`client/src/hooks/useReview.js`
**Backend:** `server/src/routes/review.routes.js` →
`server/src/controllers/review.controller.js`
 
| Method | Endpoint | Notes |
|---|---|---|
| POST | `/api/reviews` | Create a review (up to 5 images) |
| GET | `/api/reviews` | List reviews (public; `?mine=true` scopes to the logged-in user) |
| GET | `/api/reviews/average` | Average rating (used on Destination pages) |
| GET | `/api/reviews/:id` | Get one review |
| PUT | `/api/reviews/:id` | Update a review |
| DELETE | `/api/reviews/:id` | Delete a review |
 
### What it does
Lets users share feedback on destinations they've actually traveled to,
and lets other users browse that feedback before planning their own
trip.
 
### Key features
- **Tied to completed trips** — a user can only write a review for a
  destination they have a **completed** trip to. `ReviewPage.jsx` pulls
  the user's trips via `getTrips()` and filters to `completedTrips`
  before offering the "Write a Review" option — this stops
  reviews-without-visits.
- **Stats** — `ReviewStats` shows aggregate numbers (average rating,
  total count) for context.
- **Filter & sort** — search by keyword, filter by star rating, sort by
  latest / highest / lowest.
- **Image uploads** — up to 5 images per review, handled by
  `upload.middleware.js` (multer) server-side.
- **Edit/Delete** — a user can edit or delete their own reviews.
---