# Trips & Itinerary Module

## 1. Overview

The Trips & Itinerary Module of **Roam Meridian** allows users to create, manage, and view their travel trips and itineraries. Users can create trips by providing details such as destination, dates, budget, number of travellers, and collaborators.

The module is implemented using **React.js, Node.js, Express.js, MongoDB, Mongoose, Axios, and Tailwind CSS**.

## 2. Create Trip

Users can create a new trip by providing the required trip details.

The trip creation form includes:

- Trip Title
- Destination
- Start Date
- End Date
- Budget
- Number of Travellers
- Collaborators
- Cover Image

After submitting the form, the trip details are sent to the backend and stored in MongoDB.

## 3. Destination Selection

Users can select a destination while creating a trip. The destination is linked to the trip using its **MongoDB ObjectId**.

This allows the application to maintain a relationship between the trip and the corresponding destination stored in the database.

## 4. Itinerary Management

Each trip can contain an itinerary consisting of multiple days and activities.

Each itinerary day can contain activities with information such as:

- Time
- Activity Title
- Location
- Notes

The itinerary structure allows users to organize their travel plans day by day.

```text
Trip
  ↓
Day 1
  ↓
Activities
  ├── Time
  ├── Title
  ├── Location
  └── Notes
  ↓
Day 2
  ↓
Activities