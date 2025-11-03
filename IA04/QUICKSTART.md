# Quick Start Guide - IA04 JWT Authentication

## 🚀 5-Minute Quick Start

### 1. Install Dependencies
```bash
cd IA04
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open in Browser
Navigate to: **http://localhost:5173**

### 4. Login with Demo Credentials
- **Email**: `user@example.com`
- **Password**: `password123`

### 5. Explore Features
- ✅ View your dashboard
- ✅ See protected data
- ✅ Logout and login again
- ✅ Test form validation

---

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start dev server (http://localhost:5173)

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
```

---

## 🔑 Demo Accounts

### User Account
- Email: `user@example.com`
- Password: `password123`
- Role: Regular user

### Admin Account
- Email: `admin@example.com`
- Password: `admin123`
- Role: Administrator

---

## 🗂️ Project Structure (Simplified)

```
IA04/
├── src/
│   ├── pages/           # Login, Dashboard, 404
│   ├── components/      # ProtectedRoute, AuthProvider
│   ├── hooks/           # useAuth, useProtectedData
│   ├── services/        # API calls, Mock backend
│   ├── lib/             # Axios, Token storage
│   └── types/           # TypeScript types
├── public/              # Static assets
└── package.json         # Dependencies
```

---

## 🔐 Key Features

### ✅ Authentication
- JWT access tokens (15 min expiry)
- Refresh tokens (7 day expiry)
- Automatic token refresh
- Secure storage (memory + localStorage)

### ✅ Form Validation
- React Hook Form
- Zod schema validation
- Real-time error messages

### ✅ Protected Routes
- Route guards
- Auto-redirect to login
- Persistent sessions

### ✅ State Management
- React Query for server state
- Automatic caching
- Optimistic updates

---

## 🛠️ Common Tasks

### Change Token Expiry Time
Edit `src/services/mockApi.ts`:
```typescript
// Line ~62
const accessToken = generateToken(user.id, 15 * 60 * 1000); // 15 minutes
const refreshToken = generateToken(user.id, 7 * 24 * 60 * 60 * 1000); // 7 days
```

### Add New Protected Route
1. Create page component in `src/pages/`
2. Add route in `src/App.tsx`:
```tsx
<Route
  path="/your-route"
  element={
    <ProtectedRoute>
      <YourPage />
    </ProtectedRoute>
  }
/>
```

### Add New Demo User
Edit `src/services/mockApi.ts`:
```typescript
const MOCK_USERS = [
  // Add your user here
  {
    id: '3',
    email: 'newuser@example.com',
    password: 'newpassword',
    name: 'New User'
  }
];
```

### Connect to Real Backend
1. Replace `mockApi.ts` with real API calls
2. Update `axios.ts` baseURL:
```typescript
export const api = axios.create({
  baseURL: 'https://your-api.com',
});
```

---

## 🐛 Troubleshooting

### Problem: "Cannot find module"
**Solution**: 
```bash
rm -rf node_modules package-lock.json
npm install
```

### Problem: Port 5173 already in use
**Solution**: 
```bash
# Kill process on port 5173
npx kill-port 5173

# Or use different port
npm run dev -- --port 3000
```

### Problem: TypeScript errors
**Solution**: 
```bash
# Check TypeScript configuration
npx tsc --noEmit
```

### Problem: "Module not found" after git clone
**Solution**:
```bash
npm install
```

### Problem: Blank screen after login
**Solution**: 
- Open DevTools Console
- Check for errors
- Verify token storage in Application tab

---

## 📚 Learn More

- **Full Documentation**: See `README.md`
- **Testing Guide**: See `TESTING.md`
- **Architecture**: See `ARCHITECTURE.md`
- **Deployment**: See `DEPLOYMENT.md`

---

## 🎯 What's Next?

### After Basic Setup
1. ✅ Run the app and test all features
2. ✅ Read the architecture documentation
3. ✅ Follow the testing guide
4. ✅ Deploy to hosting platform

### Extend the Project
- [ ] Add user registration
- [ ] Add password reset
- [ ] Add user profile page
- [ ] Add role-based access
- [ ] Connect real backend
- [ ] Add more protected routes

---

## 💡 Tips

1. **Keep DevTools Open**: Monitor network, console, and localStorage
2. **Test Error Cases**: Try invalid credentials, expired tokens
3. **Check Token Flow**: Watch network tab during token refresh
4. **Understand the Code**: Read inline comments in key files
5. **Experiment**: Modify token expiry times to see refresh in action

---

## 📞 Getting Help

### Check These First
1. README.md - Full documentation
2. TESTING.md - Comprehensive testing guide
3. ARCHITECTURE.md - System design details
4. Console errors in browser DevTools

### Common Questions

**Q: Where are tokens stored?**
A: Access token in memory, refresh token in localStorage

**Q: How does auto-refresh work?**
A: Axios interceptor catches 401 errors and refreshes token automatically

**Q: Why use mock API?**
A: For demonstration. Replace with real backend for production.

**Q: Is this production-ready?**
A: Core logic is solid, but add real backend and enhanced security for production.

---

## ✅ Quick Checklist

Before you start:
- [ ] Node.js installed (v18+)
- [ ] npm or yarn available
- [ ] Git installed (optional)
- [ ] Code editor ready (VS Code recommended)

Getting started:
- [ ] Dependencies installed (`npm install`)
- [ ] Dev server running (`npm run dev`)
- [ ] Browser open (localhost:5173)
- [ ] Logged in with demo credentials
- [ ] All features tested

Ready to deploy:
- [ ] Build succeeds (`npm run build`)
- [ ] Preview works (`npm run preview`)
- [ ] No console errors
- [ ] All tests pass
- [ ] README updated with live URL

---

**Happy Coding! 🎉**

Need more help? Check the full documentation in `README.md` or `ARCHITECTURE.md`.
