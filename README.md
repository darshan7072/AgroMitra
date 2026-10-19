# AgroMitra – Smart Krushi Sahayak Platform

AgroMitra is a modern, mobile-responsive full-stack platform designed to empower farmers with smart agricultural assistance, real-time insights, crop advisories, and farming management tools.

---

## Technology Stack

- **Frontend**: React 18, Vite, JavaScript, Responsive Modern CSS (Flexbox / CSS Grid / Custom Properties)
- **Backend**: Node.js, Express.js (ES Modules)
- **Database**: MongoDB (to be integrated in subsequent features)
- **Authentication**: JWT & secure password hashing (to be integrated in subsequent features)
- **Package Manager**: npm

---

## Project Structure

```
AgroMitra/
├── .env.example              # Root environment template
├── .gitignore                # Git exclusions (dependencies, secrets, build outputs)
├── README.md                 # Project documentation
├── backend/                  # Node.js + Express backend service
│   ├── package.json          # Backend dependencies and scripts
│   └── src/
│       ├── config/           # Environment and server configuration
│       │   └── env.js
│       ├── controllers/      # Request handlers
│       │   └── health.controller.js
│       ├── middleware/       # Custom middlewares (errors, 404, auth)
│       │   ├── errorHandler.js
│       │   └── notFoundHandler.js
│       ├── models/           # Database models (Mongoose schemas)
│       ├── routes/           # Express route definitions
│       │   ├── health.routes.js
│       │   └── index.js
│       ├── services/         # Business logic and external services
│       ├── app.js            # Express app setup and middleware configuration
│       └── server.js         # HTTP server entry point
└── frontend/                 # React + Vite frontend application
    ├── index.html            # Single page application HTML shell
    ├── package.json          # Frontend dependencies and scripts
    ├── vite.config.js        # Vite bundler configuration
    ├── public/               # Static assets
    └── src/
        ├── assets/           # Media and graphic assets
        ├── components/       # Reusable UI components
        ├── layouts/          # Page layout wrappers
        ├── pages/            # Application views/pages
        ├── routes/           # Route definitions
        ├── services/         # API clients and HTTP services
        │   └── api.js
        ├── styles/           # Global and responsive stylesheet system
        │   ├── App.css
        │   └── index.css
        ├── App.jsx           # Main React component
        └── main.jsx          # React DOM entry point
```

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

# Start development server
npm run dev
```

The backend server will run on `http://localhost:5000`.
- **Health Check**: `http://localhost:5000/api/health`

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

The output will be generated in `frontend/dist/`.
