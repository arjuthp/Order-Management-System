# Design Document: JWT Authentication

## Overview

This design implements JWT-based authentication for an Express.js order management system. The solution adds three core components: a JWT service for token operations, password hashing utilities using bcrypt, and authentication middleware for route protection. The design maintains backward compatibility with existing plain text passwords while migrating them to secure hashes on first login.

The implementation follows Express.js middleware patterns and integrates seamlessly with the existing user and order modules without requiring major refactoring.

## Architecture

### Component Structure

```
auth/
├── jwt.service.js          # JWT token generation and verification
├── password.service.js     # Password hashing and verification with bcrypt
├── auth.middleware.js      # Express middleware for route protection
└── auth.utils.js           # Helper functions for token extraction

user/
├── user.controller.js      # Updated with JWT token generation and password hashing
├── user.routes.js          # Updated with auth middleware on protected routes
└── user.model.js           # Unchanged

order/
├── order.controller.js     # Updated to use authenticated user from token
├── order.routes.js         # Updated with auth middleware on all routes
└── order.model.js          # Unchanged
```

### Dependencies

New dependencies to add:
- `jsonwebtoken`: JWT token generation and verification
- `bcrypt`: Password hashing
- `dotenv`: Environment variable management

### Environment Variables

Required environment variables in `.env`:
```
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=24h
```

## Components and Interfaces

### JWT Service (jwt.service.js)

Handles all JWT token operations including generation and verification.

**Functions:**

```javascript
generateToken(payload)
// Input: payload object containing { userId, email }
// Output: { token: string, expiresIn: string }
// Throws: Error if JWT_SECRET is not configured

verifyToken(token)
// Input: token string
// Output: decoded payload { userId, email, iat, exp }
// Throws: JsonWebTokenError if token is invalid
// Throws: TokenExpiredError if token is expired
```

**Implementation approach:**
- Use `jwt.sign()` with payload, secret, and expiration options
- Use `jwt.verify()` for token validation
- Read JWT_SECRET from process.env, throw error if missing
- Default expiration to 24h if JWT_EXPIRES_IN not set

### Password Service (password.service.js)

Handles password hashing and verification using bcrypt.

**Functions:**

```javascript
hashPassword(plainPassword)
// Input: plain text password string
// Output: Promise<string> - bcrypt hash
// Uses: 10 salt rounds

verifyPassword(plainPassword, hashedPassword)
// Input: plain text password, bcrypt hash
// Output: Promise<boolean> - true if match, false otherwise

isHashed(password)
// Input: password string
// Output: boolean - true if password is bcrypt hash format
// Logic: Check if string starts with "$2b$" (bcrypt identifier)
```

### Authentication Middleware (auth.middleware.js)

Express middleware that protects routes by validating JWT tokens.

**Function:**

```javascript
authenticateToken(req, res, next)
// Input: Express request with Authorization header
// Output: Calls next() if valid, sends 401 response if invalid
// Side effect: Attaches req.user = { userId, email } on success
```

**Logic flow:**
1. Extract token from Authorization header (format: "Bearer <token>")
2. If no token: return 401 with "No token provided"
3. Verify token using JWT service
4. If invalid: return 401 with "Invalid token"
5. If expired: return 401 with "Token expired"
6. If valid: attach decoded user to req.user and call next()

**Error handling:**
- Catch JsonWebTokenError → "Invalid token"
- Catch TokenExpiredError → "Token expired"
- Catch other errors → "Authentication failed"

### Auth Utils (auth.utils.js)

Helper functions for token extraction.

**Function:**

```javascript
extractTokenFromHeader(authHeader)
// Input: Authorization header string (e.g., "Bearer eyJhbGc...")
// Output: token string or null
// Logic: Split by space, return second part if first part is "Bearer"
```

## Data Models

### User Model Updates

No schema changes required. The existing User model already has the necessary fields:
- name (String, required)
- email (String, required, unique)
- password (String, required) - will store bcrypt hash
- phone (Number, optional)
- address (String, optional)
- timestamps (createdAt, updatedAt)

### Token Payload Structure

JWT tokens will contain:
```javascript
{
  userId: string,      // MongoDB ObjectId as string
  email: string,       // User's email
  iat: number,         // Issued at timestamp (added by JWT)
  exp: number          // Expiration timestamp (added by JWT)
}
```

## Controller Updates

### User Controller Changes

**handleUserRegister:**
1. Hash password using Password Service before creating user
2. Create user with hashed password
3. Generate JWT token using JWT Service
4. Return token and user info (excluding password)

**handleUserLogin:**
1. Find user by email only (not email + password)
2. If user not found: return 401 "Invalid email or password"
3. Check if password is hashed using Password Service
4. If plain text (backward compatibility): hash it, update user, proceed
5. Verify password using Password Service
6. If password incorrect: return 401 "Invalid email or password"
7. Generate JWT token
8. Return token and user info (excluding password)

**handleUpdateUser:**
1. If password is in request body: hash it before update
2. Continue with existing update logic
3. Exclude password from response

**Other handlers (list, getById, delete):**
- No changes to logic
- Will be protected by middleware in routes

### Order Controller Changes

**handleCreateOrder:**
1. Remove userId from request body extraction
2. Get userId from req.user.userId (set by auth middleware)
3. Continue with existing order creation logic

**Other handlers:**
- No changes required
- Already use req.query or req.params appropriately

## Route Protection

### User Routes

```javascript
// Public routes (no middleware)
POST /user/register
POST /user/login

// Protected routes (with authenticateToken middleware)
GET /user/list
GET /user/:id
PUT /user/:id
DELETE /user/:id
```

### Order Routes

```javascript
// All routes protected (with authenticateToken middleware)
POST /orders
GET /orders
GET /orders/:id
PUT /orders/:id
DELETE /orders/:id
```

### Product Routes

Product routes are not modified in this implementation (out of scope).

