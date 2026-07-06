# 🌍 Roam Meridian — Team API & Data Contract

> Version: v1.0
> Last Updated: July 2026
> Maintained by: Team Roam Meridian

This document is the single source of truth for the frontend and backend.

If any model changes, update this document first before implementing the change.

---

# Project Flow

Explore Page
        ↓
Destination Details
        ↓
Save Trip / Plan with AI
        ↓
Planner
        ↓
Expense Split
        ↓
Dashboard

---

# 1. Destination Model

Used by:
- Explore Page
- Destination Details
- AI Planner

```ts
Destination {
    _id
    name
    city
    state
    country

    category
    description

    images[]

    rating
    reviewCount

    estimatedBudget

    coordinates {
        latitude
        longitude
    }

    weather

    createdAt
    updatedAt
}
```

API

```
GET    /api/destinations
GET    /api/destinations/:id
```

---

# 2. Trip Model

Used by

- Planner
- Dashboard
- Save Trip
- AI Planner

```ts
Trip {
    _id

    title

    destinationId

    createdBy

    collaborators[]

    coverImage

    startDate
    endDate

    budget

    itinerary[]

    status

    isPublic

    createdAt
    updatedAt
}
```

Status

```
planning
ongoing
completed
```

API

```
GET
POST
PUT
DELETE

/api/trips
/api/trips/:id
```

---

# 3. Itinerary Item

```ts
ItineraryItem {
    day

    title

    description

    time

    location

    category
}
```

Category values

```
Sightseeing
Food
Hotel
Transport
Adventure
Shopping
Custom
```

---

# 4. Review Model

Used by

Destination Details

```ts
Review {
    _id

    destinationId

    userId

    rating

    comment

    createdAt
}
```

API

```
GET  /api/reviews?destinationId=:id

POST /api/reviews
```

POST Body

```json
{
    "destinationId": "...",
    "rating": 5,
    "comment": "Amazing place!"
}
```

---

# 5. User Model

```ts
User {
    _id

    name

    email

    avatar

    savedTrips[]

    createdTrips[]
}
```

---

# 6. Planner Page Layout

```
Planner

│
├── Trip Header
│      Cover Image
│      Trip Name
│      Destination
│
├── Date Section
│
├── Budget Section
│
├── Collaborators
│
├── Day 1
│
├── Day 2
│
├── Day 3
│
├── Expense Split
│
└── Save Button
```

---

# 7. Destination Details Layout

```
Destination

│
├── Image Gallery
│
├── Overview
│
├── Description
│
├── Map
│
├── Weather
│
├── Reviews
│
└── Action Buttons
       Save Trip
       Plan with AI
```

---

# 8. Explore Page

Components

```
SearchBar

FilterSidebar

SortDropdown

DestinationCard

Pagination
```

---

# 9. Authentication Rules

Guest

✅ Browse destinations

❌ Save Trip

❌ Planner

❌ Expense Split

❌ Dashboard

Authenticated User

✅ Everything

---

# 10. Team Responsibilities

## Gourav

- UI Architecture
- Frontend
- Planner
- Explore

---

## Vinayak

- Destination APIs
- Weather API
- Maps
- Backend

---

## Astha

- UI Design
- Figma
- Design System
- Responsive Layout

---

## Jinal

- Reviews
- Expense Split
- Frontend Integration

---

# 11. Future Features

- AI Trip Planner

- Chat Assistant

- Notifications

- Real-time Collaboration

- Offline Trips

- Trip Sharing

---

# Notes

1. Every new feature should follow this contract.

2. If any field changes,
update this file first.

3. Frontend and Backend must always stay synchronized.
