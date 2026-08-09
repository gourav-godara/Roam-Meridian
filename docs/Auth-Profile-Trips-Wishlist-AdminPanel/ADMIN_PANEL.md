# Admin Panel Module

## 1. Overview

The Admin Panel of **Roam Meridian** provides administrators with a centralized interface to manage and monitor important application data. It allows the administrator to access different management sections through a dedicated dashboard.

The module is implemented using **React.js, Tailwind CSS, Node.js, Express.js, MongoDB, Mongoose, Axios, and JWT-based authentication**.

## 2. Admin Dashboard

The Admin Dashboard provides an overview of important application information and acts as the main interface for accessing different administrative features.

The dashboard provides access to sections such as:

- User Management
- Destination Management
- Trip-related information
- Other application data

The administrator can navigate between the available sections through the admin panel interface.

## 3. User Management

The Admin Panel allows administrators to view and manage registered users.

The user management section provides functionality to:

- View registered users.
- View user details.
- Manage user-related information.
- Monitor users registered in the application.

User information is retrieved from the **User** collection in MongoDB through backend APIs.

## 4. Destination Management

The Destination Management section allows the administrator to manage the destinations available in Roam Meridian.

The administrator can view and manage destination information stored in the database. This ensures that the destination data used throughout the application remains up to date.

Destination information is used by other features of the application, such as:

- Explore Page
- Wishlist
- Trip Creation
- AI Planner

## 5. CRUD Operations

The Admin Panel uses backend APIs to perform management operations on application data.

The main CRUD operations include:

- **Create** — Add new records.
- **Read** — Retrieve and display existing records.
- **Update** — Modify existing information.
- **Delete** — Remove unwanted records.

These operations allow administrators to maintain application data directly through the Admin Panel.

## 6. Backend Integration

The Admin Panel communicates with the backend using Axios API requests.

The backend handles:

- Data retrieval
- Data creation
- Data updates
- Data deletion
- Request validation
- Database operations

The administrator's actions are processed by the corresponding Express.js routes and controllers before the data is updated in MongoDB.

## 7. Frontend Integration

The Admin Panel is implemented using React.js and Tailwind CSS.

The frontend provides:

- Admin dashboard interface
- Management pages
- Forms for adding and editing data
- Action buttons for managing records
- Loading states
- Error handling
- API integration using Axios

The interface provides administrators with a centralized way to manage application data.

## 8. Authentication & Authorization

The Admin Panel is protected using the application's authentication system.

JWT authentication is used to identify the authenticated administrator. Admin-specific access ensures that administrative functionality is not available to regular users.

An **Admin Panel** button is displayed on the main website only to users who have the **admin role**. Regular users cannot see this button.

When an administrator clicks the Admin Panel button, they can enter the Admin Panel and access the available administrative features.

Administrators can also assign the **admin role** to other users, allowing those users to access the Admin Panel after their role is updated.

Protected API requests include the authentication token, which is verified by the backend before processing the request.

## 9. Admin Panel Flow

The overall admin workflow is:

```text
User Logs In
       ↓
JWT Authentication
       ↓
User Role is Checked
       ↓
Is User an Admin?
     /       \
   Yes        No
    ↓          ↓
Show Admin    Admin Panel
Panel Button  Button Hidden
    ↓
Admin Clicks Admin Panel
    ↓
Admin Dashboard
       ↓
Select Management Section
       ↓
Fetch Data from Backend
       ↓
Display Data
       ↓
Admin Performs Action
       ↓
API Request
       ↓
Backend Validation
       ↓
MongoDB Updated
       ↓
Updated Data Displayed