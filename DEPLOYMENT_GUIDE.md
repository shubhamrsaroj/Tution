# Exam Prep Platform Deployment Guide

## Prerequisites
- Node.js (v14+ recommended)
- Vercel CLI (`npm install -g vercel`)
- Vercel Account

## Frontend Deployment

### Step 1: Prepare Frontend
```bash
cd frontend
npm install
```

### Step 2: Vercel Deployment
```bash
# Login to Vercel
vercel login

# Deploy to Vercel
vercel

# Set environment variables
vercel env add REACT_APP_API_URL production
```

### Environment Variables
- `REACT_APP_API_URL`: Backend API base URL

## Backend Deployment

### Step 1: Prepare Backend
```bash
cd backend
npm install
```

### Step 2: Vercel Deployment
```bash
# Deploy to Vercel
vercel

# Set environment variables
vercel env add MONGODB_URI production
vercel env add JWT_SECRET production
vercel env add EMAIL_USER production
vercel env add EMAIL_PASS production
vercel env add FRONTEND_URL production
```

### Environment Variables
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `EMAIL_USER`: Email service username
- `EMAIL_PASS`: Email service password
- `FRONTEND_URL`: Frontend application URL

## Troubleshooting
- Ensure all environment variables are set
- Check Vercel logs for any deployment issues
- Verify CORS settings if frontend-backend communication fails

## Recommended Vercel Settings
- Frontend: Static Build (React)
- Backend: Node.js serverless functions
- Custom Domain: Configure in Vercel dashboard

## Post-Deployment Checks
1. Verify frontend is accessible
2. Test backend API endpoints
3. Check environment-specific configurations
