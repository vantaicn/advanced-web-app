# Architecture Documentation - IA04 JWT Authentication

## 🏗️ System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                          React Application                       │
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                      React Router                          │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐    │  │
│  │  │  Login   │  │Dashboard │  │   Protected Routes   │    │  │
│  │  │  Page    │  │  Page    │  │   (Auth Guard)       │    │  │
│  │  └──────────┘  └──────────┘  └──────────────────────┘    │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    React Query Layer                       │  │
│  │  ┌──────────────┐  ┌─────────────┐  ┌────────────────┐   │  │
│  │  │ useMutation  │  │  useQuery   │  │  Query Cache   │   │  │
│  │  │ (Login/Out)  │  │  (User/Data)│  │  (State Mgmt)  │   │  │
│  │  └──────────────┘  └─────────────┘  └────────────────┘   │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Axios Instance                          │  │
│  │  ┌──────────────────┐       ┌──────────────────────┐     │  │
│  │  │   Request        │       │    Response          │     │  │
│  │  │   Interceptor    │       │    Interceptor       │     │  │
│  │  │ (Add Token)      │       │  (Refresh Token)     │     │  │
│  │  └──────────────────┘       └──────────────────────┘     │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                   Token Storage                            │  │
│  │  ┌──────────────────┐       ┌──────────────────────┐     │  │
│  │  │  Access Token    │       │   Refresh Token      │     │  │
│  │  │  (In Memory)     │       │   (localStorage)     │     │  │
│  │  └──────────────────┘       └──────────────────────┘     │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Mock API Service                        │  │
│  │  (Simulates Backend - Replace with Real API)              │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## 📦 Component Architecture

### 1. **Entry Point** (`main.tsx`)
```
main.tsx
  └── Renders App Component
```

### 2. **App Component** (`App.tsx`)
```
App
  ├── QueryClientProvider (React Query)
  │     └── BrowserRouter (React Router)
  │           └── AuthProvider (Auth Initialization)
  │                 └── Routes
  │                       ├── / → Navigate to /dashboard
  │                       ├── /login → LoginPage
  │                       ├── /dashboard → ProtectedRoute → DashboardPage
  │                       └── * → NotFoundPage
```

### 3. **Authentication Flow**

```
┌─────────────┐
│ User enters │
│ credentials │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│ React Hook Form │
│   Validation    │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│  useAuth hook   │
│ (React Query)   │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│  authService    │
│   .login()      │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│    mockApi      │
│  .login()       │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│ Return tokens   │
│ + user data     │
└──────┬──────────┘
       │
       ▼
┌─────────────────────────────┐
│ Store tokens:               │
│ - Access: Memory            │
│ - Refresh: localStorage     │
└──────┬──────────────────────┘
       │
       ▼
┌─────────────────┐
│ Navigate to     │
│   /dashboard    │
└─────────────────┘
```

### 4. **Token Refresh Flow**

```
┌─────────────────┐
│ API Request     │
│ (with token)    │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│ Request         │
│ Interceptor     │
│ (adds token)    │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│   API Call      │
└──────┬──────────┘
       │
       ▼
    Token Valid? ──Yes──▶ Return Response
       │
       No (401)
       │
       ▼
┌─────────────────────┐
│ Response            │
│ Interceptor catches │
│      401            │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ Get Refresh Token   │
│ from localStorage   │
└──────┬──────────────┘
       │
       ▼
    Has Refresh? ──No──▶ Logout & Redirect
       │
       Yes
       │
       ▼
┌─────────────────────┐
│ Call Refresh        │
│ Endpoint            │
└──────┬──────────────┘
       │
       ▼
  Refresh Valid? ──No──▶ Logout & Redirect
       │
       Yes
       │
       ▼
┌─────────────────────┐
│ Get New Access      │
│ Token               │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ Update Access Token │
│ in Memory           │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ Retry Original      │
│ Request             │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ Return Response     │
└─────────────────────┘
```

## 🔐 Security Architecture

### Token Storage Strategy

**Access Token (In-Memory)**
```javascript
// lib/axios.ts
let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const getAccessToken = (): string | null => {
  return accessToken;
};
```

**Benefits:**
- ✅ Not accessible via XSS attacks
- ✅ Automatically cleared on tab close
- ✅ Most secure for short-lived tokens

**Drawbacks:**
- ⚠️ Lost on page refresh (mitigated by refresh token)

**Refresh Token (localStorage)**
```javascript
// lib/tokenStorage.ts
export const tokenStorage = {
  setRefreshToken: (token: string): void => {
    localStorage.setItem('refreshToken', token);
  },
  
  getRefreshToken: (): string | null => {
    return localStorage.getItem('refreshToken');
  },
  
  removeRefreshToken: (): void => {
    localStorage.removeItem('refreshToken');
  }
};
```

**Benefits:**
- ✅ Persists across sessions
- ✅ Allows automatic re-authentication

**Drawbacks:**
- ⚠️ Vulnerable to XSS (mitigated by short validity period)
- ⚠️ Should use HTTP-only cookies in production

### Security Measures Implemented

1. **Token Separation**
   - Access token: Short-lived (15 min), in-memory
   - Refresh token: Long-lived (7 days), persistent

2. **Automatic Refresh**
   - Seamless token refresh on expiration
   - No user interaction required

3. **Request Interception**
   - All requests automatically authenticated
   - No manual token management needed

4. **Protected Routes**
   - Route guards check authentication
   - Automatic redirect to login

5. **Form Validation**
   - Client-side validation with Zod
   - Type-safe form handling

## 📊 Data Flow Architecture

### 1. **Authentication State Management**

```
React Query Cache
  ├── ['user'] → User object
  ├── ['protectedData'] → Protected resources
  └── Mutations
        ├── loginMutation
        └── logoutMutation
```

### 2. **Custom Hooks Architecture**

**useAuth Hook**
```typescript
useAuth()
  ├── loginMutation (useMutation)
  │     ├── mutationFn: authService.login
  │     └── onSuccess: navigate to dashboard
  │
  ├── logoutMutation (useMutation)
  │     ├── mutationFn: authService.logout
  │     └── onSuccess: clear cache & navigate
  │
  ├── userQuery (useQuery)
  │     ├── queryKey: ['user']
  │     ├── queryFn: authService.getCurrentUser
  │     └── enabled: when access token exists
  │
  └── Helper methods
        ├── isAuthenticated
        └── initializeAuth
```

**useProtectedData Hook**
```typescript
useProtectedData()
  └── useQuery
        ├── queryKey: ['protectedData']
        ├── queryFn: authService.getProtectedData
        ├── enabled: when authenticated
        └── staleTime: 2 minutes
```

## 🎨 UI Component Hierarchy

```
App
├── AuthProvider
│   └── Loading State (during initialization)
│
└── Routes
    ├── LoginPage
    │   ├── Form (React Hook Form)
    │   │   ├── Email Input (with validation)
    │   │   ├── Password Input (with validation)
    │   │   ├── Submit Button (with loading state)
    │   │   └── Error Display
    │   └── Demo Credentials Card
    │
    ├── ProtectedRoute (HOC)
    │   └── DashboardPage
    │       ├── Header
    │       │   ├── Title & Subtitle
    │       │   └── Logout Button
    │       │
    │       └── Content
    │           ├── User Info Card
    │           ├── Protected Data Card
    │           └── Auth Details Card
    │
    └── NotFoundPage
        └── 404 Message + Navigation
```

## 🔄 State Management Strategy

### React Query for Server State
- **Mutations**: Login, Logout
- **Queries**: User data, Protected data
- **Cache**: Automatic caching and invalidation
- **Optimistic Updates**: Instant UI feedback

### Local State (useState)
- Form inputs (managed by React Hook Form)
- UI state (loading, errors)
- Minimal local state needed

### Context (via React Query)
- Authentication state shared globally
- No need for Redux/Context API
- React Query handles state synchronization

## 📱 Responsive Design Architecture

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Responsive Patterns
1. **Flexible Layouts**
   - CSS Flexbox for component layout
   - Auto-adjusting card grids

2. **Responsive Typography**
   - Scaled font sizes
   - Proper line heights

3. **Touch-Friendly**
   - Large button targets
   - Adequate spacing
   - Touch event handling

## 🚀 Performance Optimizations

### 1. **Code Splitting**
- Route-based code splitting (React Router)
- Lazy loading for components (when needed)

### 2. **React Query Optimizations**
- Stale-while-revalidate strategy
- Background refetching
- Automatic garbage collection

### 3. **Build Optimizations**
- Vite for fast builds
- Tree shaking
- Minification
- Compression

### 4. **Request Optimization**
- Axios request queuing during refresh
- Prevent duplicate refresh calls
- Request cancellation (built-in)

## 🧪 Testing Architecture

### Testing Pyramid
```
        ╱╲
       ╱E2E╲         (Manual - User flows)
      ╱──────╲
     ╱Integr.╲       (Component + API integration)
    ╱──────────╲
   ╱   Unit     ╲    (Individual functions)
  ╱──────────────╲
```

### Test Coverage Areas
1. **Unit Tests** (Future)
   - Token storage utilities
   - Form validation logic
   - Helper functions

2. **Integration Tests** (Future)
   - Authentication flow
   - API interactions
   - Route navigation

3. **E2E Tests** (Manual)
   - Complete user journeys
   - Cross-browser testing
   - Performance testing

## 🔧 Error Handling Architecture

### Error Boundaries
```
App Level
  ├── Network Errors (Axios)
  │     └── Retry logic
  │
  ├── Authentication Errors
  │     ├── Invalid credentials
  │     ├── Token expiration
  │     └── Refresh failure → Logout
  │
  ├── Validation Errors (Zod)
  │     └── Form-level display
  │
  └── React Query Errors
        ├── Query errors
        ├── Mutation errors
        └── User-friendly messages
```

### Error Recovery Strategies

1. **Automatic Recovery**
   - Token refresh on 401
   - Retry failed requests
   - Background refetch on error

2. **User-Initiated Recovery**
   - Retry buttons
   - Re-login flow
   - Clear error messages

3. **Graceful Degradation**
   - Show cached data when possible
   - Partial feature availability
   - Informative error states

## 🏗️ Scalability Considerations

### Current Architecture (MVP)
- ✅ Mock API (for demonstration)
- ✅ Simple token management
- ✅ Basic error handling

### Production-Ready Enhancements

1. **Backend Integration**
   - Replace mockApi with real API
   - Environment variables for endpoints
   - Proper CORS configuration

2. **Enhanced Security**
   - HTTP-only cookies for refresh token
   - CSRF protection
   - Rate limiting
   - Token rotation

3. **Advanced Features**
   - Role-based access control
   - Multi-factor authentication
   - Session management
   - Device tracking

4. **Monitoring & Analytics**
   - Error tracking (Sentry)
   - Performance monitoring
   - User analytics
   - Authentication metrics

5. **Testing Infrastructure**
   - Unit tests (Jest/Vitest)
   - Integration tests (Testing Library)
   - E2E tests (Playwright/Cypress)
   - CI/CD pipeline

## 📚 Technology Stack Rationale

| Technology | Purpose | Why Chosen |
|-----------|---------|------------|
| React 19 | UI Framework | Latest features, great ecosystem |
| TypeScript | Type Safety | Catch errors at compile time |
| Vite | Build Tool | Fast dev server, optimized builds |
| React Router | Routing | Industry standard, powerful features |
| React Query | State Management | Server state specialization |
| React Hook Form | Form Handling | Performant, minimal re-renders |
| Zod | Validation | Type-safe schemas, TS integration |
| Axios | HTTP Client | Interceptors, request handling |

## 🎯 Design Patterns Used

1. **Custom Hooks Pattern**
   - `useAuth`, `useProtectedData`
   - Reusable authentication logic

2. **Higher-Order Component (HOC)**
   - `ProtectedRoute` wrapper
   - Route protection logic

3. **Provider Pattern**
   - `AuthProvider` for initialization
   - `QueryClientProvider` for state

4. **Interceptor Pattern**
   - Axios request/response interceptors
   - Automatic token handling

5. **Repository Pattern**
   - `authService` abstracts API calls
   - Easy to mock or replace

## 📖 File Organization Rationale

```
src/
├── components/     # Reusable UI components
├── hooks/          # Custom React hooks
├── lib/            # Utilities & configuration
├── pages/          # Route-level components
├── services/       # API interaction layer
└── types/          # TypeScript type definitions
```

**Benefits:**
- Clear separation of concerns
- Easy to navigate
- Scalable structure
- Feature-based organization possible

---

This architecture provides a solid foundation for a production-ready authentication system while remaining simple enough for learning and demonstration purposes.
