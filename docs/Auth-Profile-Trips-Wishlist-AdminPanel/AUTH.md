# Authentication Module

## 1. Overview

The Authentication Module of **Roam Meridian** is responsible for secure user registration, login, account verification, password recovery, and profile management. It ensures that only authenticated users can access protected features of the application.

The module is implemented using **React.js, Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt, and Google OAuth**.

## 2. User Registration & OTP Verification

New users can register using their email and password. During registration, the system validates the entered information and checks whether the email is already registered.

A **6-digit OTP** is generated and sent to the user's email for verification. The OTP is stored temporarily in the database with an expiry time of **5 minutes**. Previous OTPs for the same purpose are removed when a new OTP is generated.

After successful OTP verification, the user's account is created.

**APIs:**

* `POST /api/auth/register`
* `POST /api/auth/verify-signup-otp`
* `POST /api/auth/create-account`
* `POST /api/auth/resend-signup-otp`

## 3. Login & JWT Authentication

Users can log in using their registered email and password. The entered password is compared with the stored password hash using **bcrypt**.

After successful authentication, the backend generates a **JWT (JSON Web Token)**. The token is stored on the frontend and attached to subsequent protected API requests through the Axios interceptor.

An authentication middleware verifies the JWT and identifies the logged-in user before allowing access to protected routes.

**API:**

`POST /api/auth/login`

**Authentication flow:**

```text
Email + Password
       ↓
Validate Credentials
       ↓
bcrypt Password Verification
       ↓
Generate JWT
       ↓
Frontend Stores Token
       ↓
Protected API Requests
```

## 4. Google Authentication

Roam Meridian also supports **Google Login/Signup**. The frontend obtains a Google access token and sends it to the backend.

The backend verifies the token and retrieves the user's Google account information. If the user already exists, the existing account is used; otherwise, a new account is created.

**API:**

`POST /api/auth/google`

This allows users to authenticate without creating a separate password.

## 5. Forgot Password

A secure OTP-based password recovery system is implemented for users who forget their password.

The process includes:

1. User enters their registered email.
2. A password-reset OTP is generated and sent to the email.
3. The OTP is verified.
4. User enters a new password.
5. The new password is hashed using bcrypt and stored in the database.

**APIs:**

* `POST /api/auth/forgot-password`
* `POST /api/auth/verify-forgot-otp`
* `POST /api/auth/reset-password`

## 6. Profile Management

Authenticated users can view and update their profile information.

The profile APIs are protected using JWT authentication middleware.

**APIs:**

* `GET /api/auth/profile`
* `PUT /api/auth/profile`

The user model contains profile-related information such as name, email, and date of birth.


## 7. Logout

The logout functionality allows users to end their authenticated session.

**API:**

`POST /api/auth/logout`

The frontend clears the authentication state and stored authentication information after logout.


## 8. Frontend Integration

The authentication system is integrated with the React frontend through dedicated components and authentication context.

Important components include:

* `Login.jsx`
* `Signup.jsx`
* `VerifyOtp`
* `OtpInput.jsx`
* `AuthInput.jsx`
* `PasswordInput.jsx`
* `AuthContext.jsx`

`AuthContext` manages the user's authentication state, while the Axios API service handles communication with the backend and automatically attaches the JWT token to protected requests.

## 9. Security Features

The Authentication Module includes the following security measures:

* **bcrypt password hashing** instead of storing plain-text passwords.
* **JWT-based authentication** for protected APIs.
* **OTP verification** for account registration and password recovery.
* **OTP expiry** after 5 minutes.
* **Input validation** for authentication requests.
* **Authentication middleware** for protected routes.
* **Google token verification** for Google authentication.
* Handling of invalid credentials, duplicate emails, invalid OTPs, and invalid tokens.


## 10. Authentication API Summary

Authentication API Endpoints

POST /api/auth/register — Register user
POST /api/auth/verify-signup-otp — Verify signup OTP
POST /api/auth/create-account — Create account
POST /api/auth/resend-signup-otp — Resend OTP
POST /api/auth/login — User login
POST /api/auth/google — Google login/signup
GET /api/auth/profile — Get profile
PUT /api/auth/profile — Update profile
POST /api/auth/logout — Logout
POST /api/auth/forgot-password — Request reset OTP
POST /api/auth/verify-forgot-otp — Verify reset OTP
POST /api/auth/reset-password — Reset password   |

## 11. Conclusion

The Authentication Module provides a secure identity and access management system for Roam Meridian. It combines **email/password authentication, OTP verification, Google authentication, JWT authorization, password recovery, and profile management**, providing the security foundation required for the application's protected features.
