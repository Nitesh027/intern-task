# MERN Job Portal - Setup & Deployment Guide
💼 MERN Job Portal - Setup & Deployment Guide

A Full Stack Job Management Web App built using MongoDB, Express.js, React.js, and Node.js (MERN Stack).
Implements secure authentication, job posting, data visualization, and a responsive dashboar— built for CargoFirst Internship Evaluation.

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### 🏃‍♂️ Fast Setup (5 minutes)

1. **Clone Repository**
```bash
git clone <your-repo-url>
cd mern-job-portal
```

2. **Backend Setup**
```bash
cd Backend
npm install
# Create .env file with:
# MONGO_URI=mongodb://localhost:27017/mern-task
# JWT_SECRET=your-secret-key
# PORT=5000
npm start
```

3. **Frontend Setup**
```bash
cd Frontend
npm install
npm run dev
```

4. **Access Application**
- Frontend: http://localhost:5176
- Backend API: http://localhost:5000

## 📁 Project Structure

```
📦 MERN Job Portal
├── 📁 Backend/
│   ├── 📁 controllers/         # Business logic
│   ├── 📁 models/             # Database schemas
│   ├── 📁 routes/             # API endpoints
│   ├── 📁 middleware/         # Authentication middleware
│   ├── 📁 config/             # Database configuration
│   └── 📄 server.js           # Server entry point
├── 📁 Frontend/
│   ├── 📁 src/
│   │   ├── 📁 pages/          # React page components
│   │   ├── 📁 components/     # Reusable components
│   │   └── 📁 api/            # HTTP client setup
│   ├── 📄 package.json
│   └── 📄 vite.config.js
└── 📄 README.md
```

## ⚙️ Environment Configuration

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/mern-task
JWT_SECRET=mern-task-secret-key-2024
```

### MongoDB Setup Options

#### Option 1: Local MongoDB
```bash
# Install MongoDB locally
# Start MongoDB service
mongod

# Database will be created automatically
```

#### Option 2: MongoDB Atlas (Cloud)
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-task
```

## 🛠️ Development Workflow

### Backend Development
```bash
cd Backend
npm run dev     # Start with nodemon for auto-restart
npm start       # Start production server
npm test        # Run tests (if implemented)
```

### Frontend Development
```bash
cd Frontend
npm run dev     # Start development server with HMR
npm run build   # Build for production
npm run preview # Preview production build
```

## 🔒 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcryptjs
- ✅ Protected API routes
- ✅ Input validation and sanitization
- ✅ CORS configuration
- ✅ Environment variable protection

## 📊 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (hashed),
  status: String (Enable/Disable),
  created_at: Date,
  updated_at: Date
}
```

### Jobs Collection
```javascript
{
  _id: ObjectId,
  jobTitle: String (required),
  jobDescription: String (required),
  lastDate: Date (required),
  companyName: String (required),
  status: String (Active/Inactive),
  user: ObjectId (ref: User),
  created_at: Date,
  updated_at: Date
}
```

## 🌐 API Endpoints

### Authentication Routes
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify JWT token

### Job Management Routes
- `GET /api/jobs` - Get user's jobs
- `POST /api/jobs/add` - Create new job
- `GET /api/jobs/:id` - Get specific job
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job
- `GET /api/jobs/count` - Get job count

## 🎨 UI Components

### Pages
- **LandingPage**: Professional MERN showcase
- **Login/Register**: Authentication forms
- **Dashboard**: Main application interface
- **JobPosted**: Job management with CRUD
- **Profile**: User profile management
- **CustomerAnalysis**: Charts and analytics

### Components
- **Logo**: MERN branding components
- **JobForm**: Job creation form
- **Sidebar**: Navigation menu
- **PrivateRoute**: Route protection

## 📱 Responsive Design

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Features
- Mobile-first design approach
- Collapsible sidebar navigation
- Responsive charts and tables
- Touch-friendly interfaces

## 🧪 Testing Guide

### Manual Testing Checklist

#### Authentication
- [ ] User registration works
- [ ] Login with valid credentials
- [ ] Login with invalid credentials fails
- [ ] Protected routes redirect to login
- [ ] Logout clears session

#### Job Management
- [ ] Create new job posting
- [ ] View all posted jobs
- [ ] Edit existing job
- [ ] Delete job with confirmation
- [ ] Form validation works

#### Navigation
- [ ] Sidebar navigation works
- [ ] All pages load correctly
- [ ] Mobile menu functions
- [ ] Logout redirects properly

#### Responsiveness
- [ ] Mobile layout works
- [ ] Tablet layout works
- [ ] Desktop layout works
- [ ] Charts are responsive

## 🚀 Deployment Options

### Option 1: Local Development
Already configured for local development with above setup.

### Option 2: Production Deployment

#### Backend (Node.js hosting)
```bash
# Build and start
npm install --production
npm start

# Environment variables needed:
# - MONGO_URI
# - JWT_SECRET
# - PORT
```

#### Frontend (Static hosting)
```bash
# Build for production
npm run build

# Deploy dist/ folder to:
# - Netlify
# - Vercel
# - GitHub Pages
# - Any static hosting service
```

### Option 3: Docker Deployment
```dockerfile
# Backend Dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]

# Frontend Dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🔧 Troubleshooting

### Common Issues

#### "Cannot connect to MongoDB"
- Ensure MongoDB is running
- Check MONGO_URI in .env file
- Verify network connectivity

#### "JWT token invalid"
- Check JWT_SECRET configuration
- Verify token format and expiration
- Clear localStorage and re-login

#### "CORS error"
- Verify backend CORS configuration
- Check frontend API base URL
- Ensure both servers are running

#### "Port already in use"
- Change PORT in .env file
- Kill existing processes
- Use different port numbers

### Performance Optimization
- Enable gzip compression
- Optimize image sizes
- Use React.memo for components
- Implement pagination for large datasets
- Cache API responses

## 📞 Support & Contact

### Development Team
- **Project**: MERN Job Portal
- **Created**: November 2025
- **Technology**: MongoDB, Express.js, React.js, Node.js

### Getting Help
1. Check this documentation first
2. Review console errors
3. Check network tab for API issues
4. Verify environment configuration
5. Test with fresh database

---

**🎯 This application is ready for production deployment and technical evaluation.**