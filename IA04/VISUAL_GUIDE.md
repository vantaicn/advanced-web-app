# Visual Walkthrough - IA04 Application

## 🎨 Application Screenshots (Text Description)

### 1. Login Page

```
┌────────────────────────────────────────────────────────────┐
│                                                             │
│                  Purple Gradient Background                 │
│                                                             │
│     ┌─────────────────────────────────────────────┐       │
│     │                                               │       │
│     │           Welcome Back                        │       │
│     │       Sign in to your account                 │       │
│     │                                               │       │
│     │   Email                                       │       │
│     │   ┌───────────────────────────────────┐      │       │
│     │   │ user@example.com                  │      │       │
│     │   └───────────────────────────────────┘      │       │
│     │                                               │       │
│     │   Password                                    │       │
│     │   ┌───────────────────────────────────┐      │       │
│     │   │ ••••••••••••                      │      │       │
│     │   └───────────────────────────────────┘      │       │
│     │                                               │       │
│     │   ┌───────────────────────────────────┐      │       │
│     │   │         Sign In                   │      │       │
│     │   └───────────────────────────────────┘      │       │
│     │                                               │       │
│     │   ┌─── Demo Credentials ───────────┐         │       │
│     │   │ Email: user@example.com        │         │       │
│     │   │ Password: password123          │         │       │
│     │   │ or                             │         │       │
│     │   │ Email: admin@example.com       │         │       │
│     │   │ Password: admin123             │         │       │
│     │   └────────────────────────────────┘         │       │
│     │                                               │       │
│     └─────────────────────────────────────────────┘       │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

**Features Shown:**
- Clean, centered card design
- Email and password input fields
- Blue gradient background
- Demo credentials displayed
- Modern, minimalist UI

---

### 2. Login Page - With Validation Errors

```
┌────────────────────────────────────────────────────────────┐
│     │   Email                                       │       │
│     │   ┌───────────────────────────────────┐      │       │
│     │   │ invalid-email                     │      │       │
│     │   └───────────────────────────────────┘      │       │
│     │   ⚠️ Invalid email address                   │       │
│     │                                               │       │
│     │   Password                                    │       │
│     │   ┌───────────────────────────────────┐      │       │
│     │   │ 123                               │      │       │
│     │   └───────────────────────────────────┘      │       │
│     │   ⚠️ Password must be at least 6 characters  │       │
└────────────────────────────────────────────────────────────┘
```

**Features Shown:**
- Real-time validation
- Error messages in red
- Clear error descriptions
- Inline error display

---

### 3. Login Page - Network Error

```
┌────────────────────────────────────────────────────────────┐
│     │                                               │       │
│     │   ┌─────────────────────────────────────┐    │       │
│     │   │  ⚠️ Invalid email or password       │    │       │
│     │   └─────────────────────────────────────┘    │       │
│     │                                               │       │
│     │   ┌───────────────────────────────────┐      │       │
│     │   │         Sign In                   │      │       │
│     │   └───────────────────────────────────┘      │       │
└────────────────────────────────────────────────────────────┘
```

**Features Shown:**
- Error message box
- Red background for errors
- Clear error text
- Maintains form state

---

### 4. Dashboard Page - Header

```
┌────────────────────────────────────────────────────────────┐
│  Dashboard                               [Logout]           │
│  Welcome to your protected area                            │
├────────────────────────────────────────────────────────────┤
```

**Features Shown:**
- Page title
- Subtitle
- Logout button in top right
- Clean header layout

---

### 5. Dashboard Page - User Information Card

```
├────────────────────────────────────────────────────────────┤
│  User Information                                           │
│                                                             │
│  ┌──────────────────────────────────────────────────┐     │
│  │ Name:             John Doe                        │     │
│  └──────────────────────────────────────────────────┘     │
│  ┌──────────────────────────────────────────────────┐     │
│  │ Email:            user@example.com                │     │
│  └──────────────────────────────────────────────────┘     │
│  ┌──────────────────────────────────────────────────┐     │
│  │ User ID:          1                               │     │
│  └──────────────────────────────────────────────────┘     │
│                                                             │
├────────────────────────────────────────────────────────────┤
```

**Features Shown:**
- User details display
- Clean card layout
- Gray background for info rows
- Well-organized information

---

### 6. Dashboard Page - Protected Data Card

```
├────────────────────────────────────────────────────────────┤
│  Protected Data                                             │
│                                                             │
│  This is protected data                                     │
│                                                             │
│  ┌────────────────────────────────────────────────┐       │
│  │  📄 Item 1                                      │       │
│  │     First protected item                        │       │
│  └────────────────────────────────────────────────┘       │
│  ┌────────────────────────────────────────────────┐       │
│  │  📄 Item 2                                      │       │
│  │     Second protected item                       │       │
│  └────────────────────────────────────────────────┘       │
│  ┌────────────────────────────────────────────────┐       │
│  │  📄 Item 3                                      │       │
│  │     Third protected item                        │       │
│  └────────────────────────────────────────────────┘       │
│                                                             │
│  Last updated: 11/4/2025, 12:15:00 AM                      │
│                                                             │
├────────────────────────────────────────────────────────────┤
```

**Features Shown:**
- Protected data from API
- List of items with descriptions
- Timestamp display
- Clean card design

---

### 7. Dashboard Page - Authentication Details Card

```
├────────────────────────────────────────────────────────────┤
│  Authentication Details                                     │
│                                                             │
│  ┌────────────────────────────────────────────────┐       │
│  │  🔐  Access Token                               │       │
│  │      Stored in memory (secure)                  │       │
│  │      Expires in 15 minutes                      │       │
│  └────────────────────────────────────────────────┘       │
│  ┌────────────────────────────────────────────────┐       │
│  │  🔄  Refresh Token                              │       │
│  │      Stored in localStorage                     │       │
│  │      Expires in 7 days                          │       │
│  └────────────────────────────────────────────────┘       │
│  ┌────────────────────────────────────────────────┐       │
│  │  ✨  Auto Refresh                               │       │
│  │      Automatic token refresh on expiry          │       │
│  │      Seamless authentication                    │       │
│  └────────────────────────────────────────────────┘       │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

**Features Shown:**
- Authentication explanation
- Token storage details
- Expiry information
- Educational content
- Icon-based visual hierarchy

---

### 8. 404 Not Found Page

```
┌────────────────────────────────────────────────────────────┐
│                                                             │
│                  Purple Gradient Background                 │
│                                                             │
│                         404                                 │
│                    Page Not Found                           │
│                                                             │
│        The page you're looking for doesn't exist           │
│                  or has been moved.                         │
│                                                             │
│               ┌─────────────────────┐                       │
│               │  Go to Dashboard    │                       │
│               └─────────────────────┘                       │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

**Features Shown:**
- Large 404 text
- Clear error message
- Navigation link to dashboard
- Consistent gradient background

---

## 🎬 User Flow Animations

### Flow 1: Successful Login

```
1. User on Login Page
   ↓
2. Enters valid credentials
   ↓
3. Clicks "Sign In"
   ↓
4. Button shows "Signing in..."
   ↓
5. Loading state (spinner)
   ↓
6. Success! Redirect to Dashboard
   ↓
7. Dashboard displays with user info
```

### Flow 2: Token Refresh (Automatic)

```
1. User on Dashboard
   ↓
2. Access token expires (after 15 min)
   ↓
3. User tries to load protected data
   ↓
4. 401 Error detected by interceptor
   ↓
5. Automatic refresh token call
   ↓
6. New access token received
   ↓
7. Original request retried
   ↓
8. Data loads successfully
   (User sees no interruption!)
```

### Flow 3: Logout

```
1. User clicks "Logout" button
   ↓
2. Confirmation dialog appears
   "Are you sure you want to logout?"
   ↓
3. User confirms
   ↓
4. Button shows "Logging out..."
   ↓
5. Tokens cleared
   ↓
6. Cache cleared
   ↓
7. Redirect to Login page
```

### Flow 4: Protected Route Access (Unauthenticated)

```
1. Unauthenticated user
   ↓
2. Tries to access /dashboard directly
   ↓
3. ProtectedRoute checks authentication
   ↓
4. No valid tokens found
   ↓
5. Automatic redirect to /login
   ↓
6. Login page displayed
```

---

## 🎨 Color Scheme

```
Primary Colors:
├─ Purple: #667eea (Buttons, Gradients)
├─ Violet: #764ba2 (Gradients)
└─ Blue: #667eea (Interactive elements)

Background Colors:
├─ White: #ffffff (Cards)
├─ Light Gray: #f7fafc (Page background)
└─ Lighter Gray: #f7fafc (Info sections)

Text Colors:
├─ Dark: #1a202c (Headings)
├─ Medium: #2d3748 (Body text)
├─ Light: #718096 (Subtitles)
└─ Error Red: #f56565 (Errors)

Border Colors:
├─ Light: #e2e8f0 (Cards, inputs)
└─ Focus: #667eea (Input focus)
```

---

## 📱 Responsive Design

### Desktop View (> 768px)
```
┌─────────────────────────────────────────┐
│  ┌───────────────────────────────────┐  │
│  │         Full Width Card           │  │
│  │       (max-width: 1200px)         │  │
│  └───────────────────────────────────┘  │
│                                          │
│  ┌──────────────┐  ┌──────────────┐    │
│  │  Card Grid   │  │  Card Grid   │    │
│  └──────────────┘  └──────────────┘    │
└─────────────────────────────────────────┘
```

### Mobile View (< 768px)
```
┌─────────────────┐
│  ┌───────────┐  │
│  │   Stack   │  │
│  │    All    │  │
│  │   Cards   │  │
│  │ Vertically│  │
│  └───────────┘  │
│  ┌───────────┐  │
│  │  Card 2   │  │
│  └───────────┘  │
└─────────────────┘
```

---

## ⚡ Interactive States

### Button States

**Normal:**
```
┌─────────────────┐
│    Sign In      │ (Purple background)
└─────────────────┘
```

**Hover:**
```
┌─────────────────┐
│    Sign In      │ (Slightly darker, lift effect)
└─────────────────┘
```

**Loading:**
```
┌─────────────────┐
│  Signing in...  │ (Disabled, lower opacity)
└─────────────────┘
```

**Disabled:**
```
┌─────────────────┐
│    Sign In      │ (Grayed out, cursor: not-allowed)
└─────────────────┘
```

### Input States

**Normal:**
```
┌──────────────────────────┐
│ user@example.com         │
└──────────────────────────┘
```

**Focus:**
```
┌──────────────────────────┐
│ user@example.com         │ (Blue border, shadow)
└──────────────────────────┘
```

**Error:**
```
┌──────────────────────────┐
│ invalid-email            │ (Red border)
└──────────────────────────┘
⚠️ Invalid email address
```

---

## 🎯 Key Visual Features

1. **Gradient Backgrounds**
   - Purple to violet gradient on login/404
   - Creates modern, professional look

2. **Card-Based Layout**
   - White cards on gray background
   - Subtle shadows for depth
   - Rounded corners (8px)

3. **Consistent Spacing**
   - 16px - 24px padding
   - 12px - 20px margins
   - Grid gaps: 24px

4. **Typography Hierarchy**
   - Headings: 28px - 32px, bold
   - Body: 14px - 16px, regular
   - Captions: 12px, light

5. **Loading States**
   - Spinner animation
   - Loading text
   - Disabled states

6. **Error Handling**
   - Red error boxes
   - Inline error messages
   - Clear error text

---

## 🌟 UI Highlights

✨ **Modern Design**
- Clean, minimalist interface
- Professional color scheme
- Consistent visual language

✨ **User Feedback**
- Loading states for all actions
- Clear success/error messages
- Interactive hover effects

✨ **Accessibility**
- Good color contrast
- Clear labels
- Keyboard navigation support

✨ **Responsive**
- Works on all screen sizes
- Touch-friendly on mobile
- Adaptive layouts

---

**Note**: These are text representations of the actual UI. The real application has smooth animations, gradients, and interactive elements that enhance the user experience!
