# AgroMitra – Smart Krushi Sahayak Platform

AgroMitra is a modern, mobile-responsive full-stack platform designed to empower farmers with smart agricultural assistance, real-time insights, crop advisories, and farming management tools.

---

## Technology Stack

- **Frontend**: React 18, Vite, React Router 7, Lucide Icons, JavaScript, Responsive Modern CSS (Flexbox / CSS Grid / Custom Properties)
- **Backend**: Node.js, Express.js (ES Modules), Mongoose, Bcryptjs, JSONWebToken, Cookie-Parser, Express-Rate-Limit
- **Database**: MongoDB (Mongoose ODM with local or MongoDB Atlas support)
- **Authentication**: Secure HttpOnly JWT session cookies with bcrypt password hashing and rate limiting
- **Package Manager**: npm

---

## Project Structure

```
AgroMitra/
├── .env.example              # Root environment template
├── .gitignore                # Git exclusions (dependencies, secrets, build outputs)
├── README.md                 # Project documentation
├── backend/                  # Node.js + Express backend service
│   ├── .env.example          # Backend environment template
│   ├── package.json          # Backend dependencies and scripts
│   ├── tests/                # Automated security & auth tests
│   │   └── auth.test.js
│   └── src/
│       ├── config/           # Environment and DB configuration
│       │   ├── db.js
│       │   └── env.js
│       ├── controllers/      # Request handlers
│       │   ├── auth.controller.js
│       │   └── health.controller.js
│       ├── middleware/       # Custom middlewares (auth, rate limiting, errors, 404)
│       │   ├── auth.middleware.js
│       │   ├── errorHandler.js
│       │   ├── notFoundHandler.js
│       │   └── rateLimiter.js
│       ├── models/           # Mongoose schemas
│       │   └── user.model.js
│       ├── routes/           # Express route definitions
│       │   ├── auth.routes.js
│       │   ├── health.routes.js
│       │   └── index.js
│       ├── services/         # Token signing, cookies & helper services
│       │   └── auth.service.js
│       ├── app.js            # Express app setup and middleware configuration
│       └── server.js         # HTTP server entry point
└── frontend/                 # React + Vite frontend application
    ├── .env.example          # Frontend environment template
    ├── index.html            # Single page application HTML shell
    ├── package.json          # Frontend dependencies and scripts
    ├── vite.config.js        # Vite bundler configuration
    ├── public/               # Static assets
    └── src/
        ├── assets/           # Media and fallback vector graphics
        ├── components/       # Reusable UI components (Navbar, Hero, Features, About, CTA, Footer)
        ├── context/          # React context providers (AuthContext)
        ├── layouts/          # Page layout wrappers
        ├── pages/            # Application views (LandingPage, LoginPage, RegisterPage, DashboardPlaceholder)
        ├── routes/           # Routing and protected route wrappers (ProtectedRoute)
        ├── services/         # API clients (auth.service.js, api.js)
        ├── styles/           # Global and responsive stylesheets (landing.css, auth.css, dashboard.css)
        ├── App.jsx           # Main React router entry
        └── main.jsx          # React DOM mount point
```

---

## Authentication Endpoints

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/health` | Public | Server health status check |
| `POST` | `/api/auth/register` | Public (Rate-limited) | Register a new farmer account & set HttpOnly cookie |
| `POST` | `/api/auth/login` | Public (Rate-limited) | Farmer login & set HttpOnly cookie |
| `POST` | `/api/auth/logout` | Public | Clear session cookie |
| `GET` | `/api/auth/me` | Protected | Fetch authenticated farmer profile |

---

## Database Configuration (MongoDB)

AgroMitra supports both a local MongoDB instance and MongoDB Atlas:

### Option A: MongoDB Atlas (Cloud)
1. Sign up on [MongoDB Atlas](https://cloud.mongodb.com) and create a free Shared Cluster.
2. Under **Security &rarr; Database Access**, create a user (username and password).
3. Under **Security &rarr; Network Access**, add your current IP address (or `0.0.0.0/0` for development).
4. Copy your connection string and add it to `backend/.env`:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/agromitra?retryWrites=true&w=majority
   ```

### Option B: Local MongoDB
1. Ensure the MongoDB service is installed and running on port `27017`.
2. Configure `backend/.env`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/agromitra
   ```

*Note: If MongoDB is unavailable when the server starts, the backend will log a clear guidance message and continue serving the health check.*

---

## Getting Started & Setup Instructions

### Prerequisites
- Node.js (v18.0.0 or higher recommended, tested on Node v24)
- npm (v9.0.0 or higher)

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Run automated auth & security tests
npm test

# Start development server
npm run dev
```

The backend server will run on `http://localhost:5000`.
- **Health Check**: `http://localhost:5000/api/health`
- **Auth Base**: `http://localhost:5000/api/auth`

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start Vite development server
npm run dev
```

The frontend development server will run on `http://localhost:5173`.

### 3. Production Build

To build the frontend for production:
```bash
cd frontend
npm run build
```
