# Wishlist Module

## 1. Overview

The Wishlist Module of **Roam Meridian** allows users to save their preferred travel destinations for future reference. Users can add destinations to their wishlist from the Explore section and view their saved destinations from the Wishlist Page.

The module is implemented using **React.js, Node.js, Express.js, MongoDB, Mongoose, Axios, and Tailwind CSS**.

## 2. Add Destination to Wishlist

Users can add a destination to their wishlist by clicking the **heart icon** associated with the destination.

When a destination is added, its reference is stored in the user's wishlist in the database. This allows the user to access the destination later without searching for it again.

The wishlist is associated with the authenticated user, ensuring that each user has their own saved destinations.

## 3. Remove Destination from Wishlist

Users can remove a previously saved destination from their wishlist by clicking the heart icon again or using the remove option available on the Wishlist Page.

After removal, the destination is deleted from the user's wishlist and is no longer displayed in the saved destinations.

## 4. Wishlist Page

The Wishlist Page displays all destinations saved by the authenticated user.

Each saved destination can display information such as:

- Destination Name
- Destination Image
- Location
- Description
- Other destination details

Users can access the destination from the Wishlist Page and remove it from their saved destinations when required.

## 5. Wishlist API Integration

The Wishlist Module communicates with the backend through protected API endpoints.

The APIs handle operations such as:

- Adding a destination to the wishlist.
- Retrieving the user's wishlist.
- Removing a destination from the wishlist.

The wishlist APIs use **JWT authentication** to identify the currently logged-in user.

## 6. Frontend Integration

The Wishlist functionality is integrated into the React frontend through the Explore and Wishlist pages.

The frontend:

- Displays the wishlist/heart icon for destinations.
- Sends API requests when a destination is added or removed.
- Retrieves the user's saved destinations.
- Displays saved destinations on the Wishlist Page.
- Updates the UI after wishlist changes.

Axios is used for communication between the frontend and backend, while the authentication token is automatically attached to protected requests.

## 7. Database Integration

Wishlist information is stored in MongoDB and associated with the corresponding user and destination.

The wishlist maintains references between:

- **User** — The user who saved the destination.
- **Destination** — The destination added to the wishlist.

This relationship allows the application to retrieve only the destinations saved by the currently authenticated user.

## 8. Wishlist Flow

The wishlist process works as follows:

```text
User Views Destination
       ↓
Clicks Heart Icon
       ↓
Wishlist API Request
       ↓
Backend Verifies User
       ↓
Destination Added to Wishlist
       ↓
Wishlist Updated
       ↓
Saved Destination Displayed on Wishlist Page