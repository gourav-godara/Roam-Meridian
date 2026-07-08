# Roam Meridian — User Flow

This document defines the primary user journey through the app. It's the reference for how pages connect, where auth is required, and which team member's module powers each step.

## Flow diagram


HOME
  │
  ▼
EXPLORE  ◄────────────────────────────────────------┐
Search • Filter • Browse                            │
  │                                                 │
  ▼                                                 │
DESTINATION DETAILS                                 │
  │                                                 │
  ┌──────────────┼──────────────┐                   │
  ▼              ▼              ▼                   │
Continue      Save Trip     Plan with AI            │
Exploring     (login if     (login if               │
  │            needed)       needed)                │
  └────────────┘  │              │                  │
                   ▼              ▼                 │
              ITINERARIES    AI PLANNER             │
                   ▲              │                 │
                   │              ▼                 │
                   │      Gemini Generates Plan     │
                   │              │                 │
                   └──── Save Trip ◄────────────────┘
                           │
                           ▼
                      ITINERARIES
                     ┌─────┴─────┐
                     ▼           ▼
              Expense Split   Reviews

Also:
Destination Details ──────► Reviews
Dashboard ──────► AI Planner
Dashboard ──────► Itineraries
Dashboard ──────► Profile
```

## Design principles

1. **Guest-first discovery.** `Home → Explore → Destination Details` require no login. Auth only gates "commit" actions (Save Trip, Plan with AI, leave a Review).
2. **Explore is a loop, not a dead end.** "Continue Exploring" returns the user to Explore so they can browse multiple destinations before ever hitting auth.
3. **Itineraries has two entry points.** A trip can be saved directly from Destination Details ("Save Trip") or generated via AI Planner and then saved. Itineraries does not depend solely on the AI module shipping.
4. **Reviews are reachable from two places.** Directly from Destination Details (no saved trip required) and from a saved Itinerary. This keeps review volume high for demo purposes even if few users complete a full AI-planned trip.
5. **Expense Split is itinerary-only.** Splitting costs requires an actual saved trip with participants, so it only appears after Save Trip.
6. **Post-login redirect resumes intent.** When login is triggered mid-action (Save Trip or Plan with AI), the user should land back on that exact action after authenticating — not on a generic Dashboard. The frontend should store the intended destination/action before redirecting to login, then resume it once the JWT is returned.

## Ownership by step

| Step                                             | Primary owner                                                    | Notes                                                                        |
|--------------------------------------------------|------------------------------------------------------------------|------------------------------------------------------------------------------|
| Home, Explore, Destination Details(UI)           | Gourav                                                           | Consumes Vinayak's destination/search APIs                                   |
| Destination data, search, filters, maps, weather | Vinayak                                                          | —                                                                            |
| Login / Signup, JWT, protected routes (backend)  | Astha                                                            | Frontend route guards are Gourav's                                           |
| AI Planner UI + Gemini integration               | Gourav                                                           | —                                                                            |
| Save generated trips (backend)                   | Astha                                                            | Trip/Itinerary model                                                         |
| Itineraries page (manual save path)              | Gourav (UI) + Astha (API)                                        | —                                                                            |
| Reviews                                          | Jinal                                                            | Backend model/API + frontend surfaced on Destination Details and Itineraries |
| Expense Split                                    | Jinal                                                            | —                                                                            |
| Dashboard                                        | Astha(user data) + Jinal(dashboard UI) + Gourav(API integration) | —                                                                            |
| Profile                                          | Astha(backend) + Gourav(UI integration) | — |

## Open implementation note

Post-login redirect (principle 6) needs a small piece of frontend state (e.g. a `redirectTo` param or stored intent) passed through the login route. No backend changes required beyond the existing auth response.
