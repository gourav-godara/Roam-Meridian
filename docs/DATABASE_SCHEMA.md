# 🗄️ Roam Meridian Database Schema

Version 1.0

---

Collections

Users

Destinations

Trips

Reviews

Expenses

---

Users

```
_id
name
email
password
avatar

savedTrips[]

createdTrips[]

createdAt
updatedAt
```

---

Destinations

```
_id

name

city

state

country

description

category

images[]

rating

reviewCount

estimatedBudget

coordinates

weather

createdAt
updatedAt
```

---

Trips

```
_id

title

destinationId

createdBy

collaborators[]

coverImage

startDate

endDate

budget

status

itinerary[]

isPublic

createdAt
updatedAt
```

---

Reviews

```
_id

destinationId

userId

rating

comment

createdAt
```

---

Expenses

```
_id

tripId

paidBy

amount

category

description

splitBetween[]

createdAt
```

---

Relationships

User

↓

Trips

↓

Destination

↓

Reviews

↓

Expenses
