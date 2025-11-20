# User Authentication API

This project is a User Authentication API built with Express, PostgreSQL, and Prisma. It provides endpoints for user registration, login, and fetching user details, utilizing JWT for authentication and bcrypt for password hashing.

## Features

- User registration
- User login
- Fetch user details
- JWT authentication
- Password hashing with bcrypt

## Technologies Used

- Node.js
- Express
- PostgreSQL
- Prisma ORM
- bcrypt
- jsonwebtoken
- TypeScript

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd user-auth-api
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Set up the PostgreSQL database:**
   - Create a PostgreSQL database for the project.
   - Update the `.env.example` file with your database connection details and JWT secret.
   - Rename `.env.example` to `.env`.

4. **Run Prisma migrations:**
   ```
   npx prisma migrate dev --name init
   ```

5. **Start the application:**
   ```
   npm run start
   ```

## API Endpoints

### User Registration

- **POST** `/api/auth/register`
  - Request body: `{ "username": "string", "password": "string" }`
  - Response: User details

### User Login

- **POST** `/api/auth/login`
  - Request body: `{ "username": "string", "password": "string" }`
  - Response: JWT token

### Get User Details

- **GET** `/api/auth/user`
  - Headers: `Authorization: Bearer <token>`
  - Response: User details

## Middleware

The API includes middleware for protecting routes that require authentication. Ensure to include the JWT token in the Authorization header for protected routes.

## License

This project is licensed under the MIT License.