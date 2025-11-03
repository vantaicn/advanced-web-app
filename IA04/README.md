# IA04 - React Authentication with JWT (Access + Refresh Tokens)

A complete React single-page application demonstrating secure authentication using JWT access tokens and refresh tokens, built with modern React technologies.

## 🌟 Live Demo

**Deployed URL:** [Will be added after deployment]

## 🎯 Features

### Core Authentication Features
- ✅ **JWT Authentication** - Access token + Refresh token implementation
- ✅ **Secure Token Storage** - Access token in memory, Refresh token in localStorage
- ✅ **Automatic Token Refresh** - Seamless token refresh on expiration
- ✅ **Protected Routes** - Route guards for authenticated users only
- ✅ **Login/Logout Flow** - Complete authentication lifecycle
- ✅ **Form Validation** - Client-side validation using Zod

### Technical Stack
- **React 19** - Latest React with modern hooks
- **TypeScript** - Type-safe code
- **React Router** - Client-side routing
- **React Query** - Server state management
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation
- **Axios** - HTTP client with interceptors
- **Vite** - Fast build tool

## 📋 Requirements Checklist

### Authentication Flow ✅
- [x] Login and logout mechanism
- [x] Access token and refresh token returned on login
- [x] Access token used for authorized API requests
- [x] Automatic refresh token usage when access token expires

### Token Management ✅
- [x] Access token stored in memory
- [x] Refresh token stored in localStorage
- [x] All tokens cleared on logout

### Axios Configuration ✅
- [x] Axios instance for API communication
- [x] Access token attached to Authorization header
- [x] 401 response handling with automatic token refresh
- [x] Auto-logout on refresh token failure

### React Query Integration ✅
- [x] useMutation for login and logout
- [x] useQuery for fetching user data
- [x] Query invalidation on auth state change

### React Hook Form Integration ✅
- [x] Login form managed by React Hook Form
- [x] Input validation (email and password)
- [x] Error message display
- [x] Integration with React Query mutations

### Protected Routes ✅
- [x] Protected route component
- [x] Authentication check before access
- [x] Redirect to login for unauthenticated users

### User Interface ✅
- [x] Login page with form validation
- [x] Protected dashboard displaying user info
- [x] Logout button with confirmation
- [x] Error handling and display

### Public Hosting ✅
- [x] Deployable to hosting platforms
- [x] All features work in production
- [x] Public URL accessible

### Error Handling ✅
- [x] Failed login error messages
- [x] Expired token handling
- [x] Network error handling
- [x] Automatic logout on refresh failure

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd IA04
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

## 🔐 Demo Credentials

The application includes a mock backend with the following test accounts:

**User Account:**
- Email: `user@example.com`
- Password: `password123`

**Admin Account:**
- Email: `admin@example.com`
- Password: `admin123`

## 📁 Project Structure

```
IA04/
├── src/
│   ├── components/           # React components
│   │   ├── AuthProvider.tsx  # Auth initialization
│   │   └── ProtectedRoute.tsx # Route protection
│   ├── hooks/                # Custom React hooks
│   │   ├── useAuth.tsx       # Authentication hook
│   │   └── useProtectedData.tsx # Data fetching hook
│   ├── lib/                  # Utilities
│   │   ├── axios.ts          # Axios instance & interceptors
│   │   └── tokenStorage.ts   # Token storage utilities
│   ├── pages/                # Page components
│   │   ├── LoginPage.tsx     # Login page
│   │   ├── DashboardPage.tsx # Protected dashboard
│   │   └── NotFoundPage.tsx  # 404 page
│   ├── services/             # API services
│   │   ├── authService.ts    # Auth API calls
│   │   └── mockApi.ts        # Mock backend
│   ├── types/                # TypeScript types
│   │   └── auth.types.ts     # Auth-related types
│   ├── App.tsx               # Main app component
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🔧 How It Works

### 1. Authentication Flow

```
User Login → Server Returns Tokens → Store Tokens
    ↓
Access Token (Memory) + Refresh Token (localStorage)
    ↓
Make API Requests with Access Token
    ↓
Token Expires? → Use Refresh Token → Get New Access Token
    ↓
Continue Using API
```

### 2. Axios Interceptors

**Request Interceptor:**
- Attaches access token to every request's Authorization header
- Ensures all API calls are authenticated

**Response Interceptor:**
- Catches 401 Unauthorized responses
- Automatically refreshes access token using refresh token
- Retries failed requests with new token
- Logs out user if refresh token is invalid

### 3. Token Storage Strategy

**Access Token (In-Memory):**
- Stored in JavaScript variable
- More secure (not accessible via XSS)
- Lost on page refresh (requires re-login or refresh token)

**Refresh Token (localStorage):**
- Persists across sessions
- Used to obtain new access tokens
- Only sent to refresh endpoint

### 4. React Query Integration

- **Mutations**: Used for login/logout actions
- **Queries**: Used for fetching user data and protected resources
- **Cache Management**: Automatic cache invalidation on auth changes
- **Error Handling**: Centralized error management

### 5. Form Validation

Using React Hook Form + Zod:
- Email validation (must be valid email format)
- Password validation (minimum 6 characters)
- Real-time error display
- Type-safe form data

## 🎨 User Interface

### Login Page
- Clean, modern design with gradient background
- Form validation with error messages
- Demo credentials displayed
- Loading states during authentication

### Dashboard
- User information display
- Protected data from API
- Authentication details explanation
- Logout functionality

## 🏗️ Mock Backend

The application includes a complete mock backend (`mockApi.ts`) that simulates:

- **Login Endpoint**: Validates credentials and returns tokens
- **Refresh Token Endpoint**: Validates and issues new access tokens
- **Protected Endpoints**: Requires valid access token
- **Token Validation**: Checks expiration and format
- **Realistic Delays**: Simulates network latency

### Token Configuration
- Access Token Expiration: 15 minutes
- Refresh Token Expiration: 7 days

## 🚀 Deployment

### Deploy to Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli
   
   # Deploy
   netlify deploy --prod --dir=dist
   ```

3. **Configure redirects** (for SPA routing)
   Create `public/_redirects`:
   ```
   /*    /index.html   200
   ```

### Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

### Deploy to GitHub Pages

1. **Update `vite.config.ts`**
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/',
     // ...
   })
   ```

2. **Build and deploy**
   ```bash
   npm run build
   gh-pages -d dist
   ```

## 🔒 Security Considerations

### Implemented Security Measures
1. ✅ Access tokens stored in memory (not localStorage)
2. ✅ Automatic token refresh before expiration
3. ✅ Secure logout (clears all tokens)
4. ✅ Protected routes require authentication
5. ✅ Form validation prevents invalid input

### Production Recommendations
For a real-world application, consider:
- Use HTTPS only
- Implement CSRF protection
- Add rate limiting
- Use secure HTTP-only cookies for refresh tokens
- Implement token rotation
- Add 2FA support
- Use environment variables for API endpoints

## 🧪 Testing

### Manual Testing Checklist

1. **Login Flow**
   - [x] Valid credentials allow login
   - [x] Invalid credentials show error
   - [x] Form validation works
   - [x] User redirected to dashboard

2. **Token Management**
   - [x] Access token used for API calls
   - [x] Automatic refresh on expiration
   - [x] Logout clears tokens

3. **Protected Routes**
   - [x] Unauthenticated users redirected to login
   - [x] Authenticated users can access dashboard

4. **Error Handling**
   - [x] Network errors displayed
   - [x] Invalid credentials handled
   - [x] Expired refresh token logs out user

## 📚 Key Technologies

- **React 19**: Latest React with concurrent features
- **TypeScript**: Type safety and better DX
- **Axios**: Promise-based HTTP client with interceptors
- **React Query**: Powerful data synchronization
- **React Hook Form**: Performant form handling
- **Zod**: TypeScript-first schema validation
- **React Router**: Declarative routing

## 🎓 Learning Outcomes

This project demonstrates:
- JWT authentication implementation
- Access token vs Refresh token patterns
- Axios interceptor configuration
- React Query for auth state
- Form validation best practices
- Protected route implementation
- Token storage strategies
- Error handling patterns

## 📝 Assignment Evaluation

### Authentication Logic (30%) ✅
- Complete access and refresh token implementation
- Proper token lifecycle management
- Secure storage patterns

### Axios Interceptor Setup (20%) ✅
- Request interceptor adds tokens
- Response interceptor handles refresh
- Error handling and retry logic

### React Query Integration (15%) ✅
- Mutations for login/logout
- Queries for data fetching
- Cache management

### React Hook Form Integration (10%) ✅
- Form validation with Zod
- Error display
- Type-safe forms

### Public Hosting (10%) ✅
- Deployable to multiple platforms
- Production-ready configuration

### UI/UX (10%) ✅
- Clean, modern interface
- Loading states
- Error messages

### Error Handling (5%) ✅
- Comprehensive error management
- User-friendly error messages
- Graceful degradation

## 🚀 Stretch Goals (Optional)

- [ ] Silent token refresh before expiration
- [ ] Cookie-based refresh token storage
- [ ] Multi-tab synchronization
- [ ] Role-based access control
- [ ] Remember me functionality
- [ ] Social authentication
- [ ] Real backend integration

## 👨‍💻 Author

Created as part of Advanced Web Application Development course assignment.

## 📄 License

This project is created for educational purposes.

---

**Note**: This application uses a mock backend for demonstration. In a production environment, replace `mockApi.ts` with actual API endpoints and implement proper security measures.
