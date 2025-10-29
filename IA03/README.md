# IA03 - User Registration System

A complete User Registration System built with **NestJS** (Backend) and **React** (Frontend) with TypeScript.

## 🚀 Features

### Backend (NestJS)
- ✅ User registration API endpoint (`POST /user/register`)
- ✅ MongoDB database integration with Mongoose
- ✅ Password hashing with bcrypt
- ✅ Email uniqueness validation
- ✅ Comprehensive error handling
- ✅ CORS enabled for frontend communication
- ✅ Environment variable configuration
- ✅ Input validation using class-validator

### Frontend (React + TypeScript)
- ✅ React Router for navigation (Home, Login, Register)
- ✅ React Hook Form for form validation
- ✅ Zod schema validation
- ✅ React Query for API state management
- ✅ Tailwind CSS for styling
- ✅ Responsive design
- ✅ Loading and error states
- ✅ Success feedback messages

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd IA03
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Edit .env file with your MongoDB URI
# MONGODB_URI=mongodb://localhost:27017/user-registration
# PORT=3000
```

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# The default API URL is http://localhost:3000
# VITE_API_BASE_URL=http://localhost:3000
```

### 4. MongoDB Setup

**Option A: Local MongoDB**
- Install MongoDB from [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
- Start MongoDB service:
  ```bash
  # Windows
  net start MongoDB
  
  # macOS/Linux
  sudo systemctl start mongod
  ```

**Option B: MongoDB Atlas (Cloud)**
- Create a free account at [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Create a cluster and get your connection string
- Update `MONGODB_URI` in `backend/.env` with your Atlas connection string

## 🚀 Running the Application

### Start Backend Server

```bash
cd backend
npm run start:dev
```

The backend will start on `http://localhost:3000`

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

## 📚 API Documentation

### POST /user/register

Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "email": "user@example.com",
    "createdAt": "2025-10-29T10:00:00.000Z"
  }
}
```

**Error Responses:**

- **409 Conflict** - Email already exists
```json
{
  "statusCode": 409,
  "message": "Email already exists"
}
```

- **400 Bad Request** - Validation error
```json
{
  "statusCode": 400,
  "message": ["Email is required", "Password must be at least 6 characters long"]
}
```

## 🎨 Frontend Pages

### 1. Home Page (`/`)
- Welcome screen with system overview
- Navigation buttons to Login and Register
- Features showcase

### 2. Register Page (`/register`)
- Registration form with validation
- Fields: Email, Password, Confirm Password
- Real-time validation feedback
- API integration with React Query
- Success message and auto-redirect to login

### 3. Login Page (`/login`)
- Login form with validation
- Fields: Email, Password
- Remember me checkbox
- Mock login functionality (UI only)

## 🏗️ Project Structure

```
IA03/
├── backend/
│   ├── src/
│   │   ├── user/
│   │   │   ├── dto/
│   │   │   │   └── register.dto.ts      # Validation DTO
│   │   │   ├── user.controller.ts       # API endpoints
│   │   │   ├── user.service.ts          # Business logic
│   │   │   ├── user.schema.ts           # MongoDB schema
│   │   │   └── user.module.ts           # NestJS module
│   │   ├── app.module.ts                # Main module
│   │   └── main.ts                      # Entry point
│   ├── .env                             # Environment variables
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── user.ts                  # API client
    │   ├── config/
    │   │   └── api.ts                   # API configuration
    │   ├── pages/
    │   │   ├── Home.tsx                 # Home page
    │   │   ├── Login.tsx                # Login page
    │   │   └── Register.tsx             # Register page
    │   ├── App.tsx                      # Main app component
    │   ├── main.tsx                     # Entry point
    │   └── index.css                    # Global styles
    ├── .env                             # Environment variables
    └── package.json
```

## 🔒 Security Features

- ✅ Password hashing using bcrypt (10 salt rounds)
- ✅ Environment variables for sensitive data
- ✅ CORS configuration
- ✅ Input validation and sanitization
- ✅ Email uniqueness check

## 🧪 Testing

### Backend
```bash
cd backend

# Run unit tests
npm test

# Run e2e tests
npm run test:e2e

# Run with coverage
npm run test:cov
```

### Frontend
```bash
cd frontend

# Run linter
npm run lint
```

## 📦 Building for Production

### Backend
```bash
cd backend
npm run build
npm run start:prod
```

### Frontend
```bash
cd frontend
npm run build
# Serve the dist folder with a static server
```

## 🌐 Deployment

### Backend Deployment Options:
- **Heroku**: Easy deployment with MongoDB Atlas
- **Railway**: Modern platform with automatic deployments
- **Render**: Free tier available
- **AWS EC2**: Full control
- **DigitalOcean**: Simple VPS

### Frontend Deployment Options:
- **Vercel**: Best for React apps (recommended)
- **Netlify**: Easy deployment from Git
- **GitHub Pages**: Free static hosting
- **AWS S3 + CloudFront**: Scalable solution

### Deployment Steps (Example with Vercel + Railway):

**Backend (Railway):**
1. Create account on [Railway](https://railway.app)
2. Create new project and connect GitHub repo
3. Add MongoDB plugin or connect to MongoDB Atlas
4. Set environment variables
5. Deploy

**Frontend (Vercel):**
1. Create account on [Vercel](https://vercel.com)
2. Import GitHub repository
3. Set `VITE_API_BASE_URL` to your Railway backend URL
4. Deploy

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Error:**
- Check if MongoDB is running
- Verify `MONGODB_URI` in `.env` file
- Check firewall settings for MongoDB Atlas

**Port Already in Use:**
- Change `PORT` in `.env` file
- Kill the process using port 3000: `npx kill-port 3000`

### Frontend Issues

**API Connection Error:**
- Verify backend is running on port 3000
- Check `VITE_API_BASE_URL` in `.env` file
- Check CORS configuration in backend

**Tailwind CSS Not Working:**
- Restart development server
- Clear cache: `rm -rf node_modules .vite && npm install`

## 📝 Technologies Used

### Backend
- **NestJS** - Progressive Node.js framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **bcrypt** - Password hashing
- **class-validator** - Validation decorators
- **class-transformer** - Object transformation

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Routing
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **React Query** - Server state management
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS

## 👨‍💻 Author

**Student ID:** [Your ID]  
**Name:** [Your Name]  
**Course:** Advanced Web Application  
**Assignment:** IA03 - User Registration API with React Frontend

## 📄 License

This project is created for educational purposes.

## 🎯 Rubric Checklist

- [x] **Backend Implementation (4 points)**
  - [x] API Endpoint `/user/register` (2 points)
  - [x] Error Handling (2 points)

- [x] **Frontend Implementation (5 points)**
  - [x] Routing (Home, Login, Sign Up) (1 point)
  - [x] Sign Up Page (Form, Validation, API Integration with React Query) (2 points)
  - [x] Login Page (Form, Validation, UI) (2 points)

- [ ] **Deployment (1 point)**
  - [ ] Public host deployment

**Total: 9/10 points** (Deployment pending)
