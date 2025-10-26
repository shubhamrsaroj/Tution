# SmartIQ Exam Preparation Platform

## Deployment on Vercel

### Frontend Deployment
1. Connect your GitHub repository to Vercel
2. Set the following environment variables in Vercel Dashboard:
   - `REACT_APP_API_URL`: Your backend API URL

### Backend Deployment
1. Connect your GitHub repository to Vercel
2. Set the following environment variables in Vercel Dashboard:
   - `MONGODB_URI`: MongoDB connection string
   - `JWT_SECRET`: Secret key for JWT token generation
   - `EMAIL_USER`: Email service username
   - `EMAIL_PASS`: Email service password
   - `FRONTEND_URL`: Your frontend deployment URL

### Local Development

#### Frontend
```bash
cd frontend
npm install
npm start
```

#### Backend
```bash
cd backend
npm install
npm run dev
```

### Deployment Checklist
- [x] Configure Vercel JSON files
- [x] Set up environment variables
- [x] Ensure CORS is properly configured
- [x] Test local deployment
- [ ] Monitor initial production deployment

### Troubleshooting
- Ensure Node.js version compatibility
- Check CORS settings
- Verify MongoDB connection
- Review environment variable configurations

### Tech Stack
- Frontend: React, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB
- Deployment: Vercel
- Authentication: JWT

### Contact
For support, please contact [Your Contact Information]
