# Profile Management Module

## 1. Overview

The Profile Management Module of **Roam Meridian** allows authenticated users to view and manage their personal account information. It is integrated with the authentication system and uses protected APIs to ensure that users can access and update their own profile information.

The module is implemented using **React.js, Tailwind CSS, Node.js, Express.js, MongoDB, Mongoose, and Axios**.

## 2. Profile Information

The Profile Page displays important information associated with the user's account, including:

- Name
- Email
- Role
- Date of Birth
- Member Since
- Profile Avatar

A default avatar is displayed when a profile image is not available.

## 3. View & Edit Profile

Authenticated users can view their profile information and switch to edit mode when they want to update their details.

The profile page provides:

- **View Mode** — Displays the user's current information.
- **Edit Mode** — Allows the user to modify editable profile details.
- **Save** — Saves the updated information to the backend.
- **Cancel** — Discards unsaved changes.

## 4. Profile API Integration

The Profile Page communicates with the backend through protected API endpoints.

**APIs:**

- `GET /api/auth/profile`
- `PUT /api/auth/profile`

The `GET` API retrieves the authenticated user's profile information, while the `PUT` API updates the user's profile information.

Both APIs are protected using **JWT authentication middleware**, ensuring that only authenticated users can access or modify profile information.

## 5. Profile Update Flow

The profile update process works as follows:

```text
User Opens Profile
       ↓
Fetch Profile Data
       ↓
Display User Information
       ↓
User Clicks Edit
       ↓
Modify Profile Details
       ↓
Click Save
       ↓
PUT /api/auth/profile
       ↓
Backend Updates MongoDB
       ↓
Updated Profile Displayed