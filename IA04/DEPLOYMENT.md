# IA04 - JWT Authentication Deployment Guide

## Quick Deploy to Netlify

### Option 1: Netlify CLI (Recommended)

1. Install Netlify CLI globally:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Build the project:
```bash
npm run build
```

4. Deploy:
```bash
netlify deploy --prod --dir=dist
```

5. Your site will be deployed and you'll get a public URL!

### Option 2: Netlify Drag & Drop

1. Build the project:
```bash
npm run build
```

2. Go to https://app.netlify.com/drop

3. Drag and drop the `dist` folder

4. Get your instant URL!

### Option 3: Connect Git Repository

1. Push your code to GitHub
2. Go to https://app.netlify.com
3. Click "New site from Git"
4. Connect your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Deploy!

---

## Deploy to Vercel

### Option 1: Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel --prod
```

### Option 2: Vercel Dashboard

1. Go to https://vercel.com
2. Import your Git repository
3. Vercel will auto-detect Vite
4. Click Deploy!

---

## Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to package.json scripts:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Update `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/advanced-web-app/',  // Replace with your repo name
  plugins: [react()],
})
```

4. Deploy:
```bash
npm run deploy
```

5. Enable GitHub Pages:
   - Go to repository Settings > Pages
   - Source: Deploy from branch
   - Branch: gh-pages
   - Folder: / (root)

---

## Deploy to Firebase Hosting

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase:
```bash
firebase init hosting
```

Configuration:
- Public directory: `dist`
- Single-page app: Yes
- GitHub actions: No (or Yes if you want CI/CD)

4. Build and deploy:
```bash
npm run build
firebase deploy
```

---

## Test Before Deployment

Run these checks before deploying:

```bash
# Build the project
npm run build

# Preview the production build locally
npm run preview
```

Open http://localhost:4173 to test the production build.

---

## After Deployment Checklist

- [ ] Test login with demo credentials
- [ ] Test protected routes
- [ ] Test logout functionality
- [ ] Test token refresh (wait 15 min or modify token expiry)
- [ ] Test 404 page
- [ ] Test on mobile devices
- [ ] Update README.md with live demo URL

---

## Environment Variables (if using real backend)

Create `.env` file:
```
VITE_API_URL=https://your-backend-api.com
```

Update `mockApi.ts` to use real endpoints:
```typescript
const API_URL = import.meta.env.VITE_API_URL;
```

---

## Troubleshooting

### Issue: 404 on page refresh
**Solution**: Ensure you have redirects configured (see `public/_redirects` for Netlify or `vercel.json` for Vercel)

### Issue: Assets not loading
**Solution**: Check the `base` config in `vite.config.ts`

### Issue: Environment variables not working
**Solution**: Variables must start with `VITE_` prefix

---

## Performance Optimization

Before deploying to production:

1. Enable compression (most hosts do this automatically)
2. Consider code splitting for larger apps
3. Optimize images (if any)
4. Enable caching headers

---

## Security Notes

For production deployment with real backend:

1. Use HTTPS only
2. Set proper CORS headers
3. Use HTTP-only cookies for refresh tokens
4. Implement rate limiting
5. Add CSRF protection
6. Use environment variables for API endpoints
7. Don't commit `.env` files

---

## Monitoring

After deployment, monitor:

- Error rates
- Response times
- User authentication flow
- Token refresh success rate

Use tools like:
- Netlify Analytics
- Vercel Analytics
- Google Analytics
- Sentry (error tracking)

---

**Ready to deploy? Choose your platform above and follow the steps!**
