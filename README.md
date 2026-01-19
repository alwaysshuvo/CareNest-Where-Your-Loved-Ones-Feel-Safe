# CareNest – Where Your Loved Ones Feel Safe

A modern, full-stack home care service platform built with **Next.js 16**, **TypeScript**, **MongoDB**, and **NextAuth**. CareNest connects families with trusted caregivers for baby care, elderly care, and sick care services.

---

## 🌐 Live Links

- **Live Application**: [https://carenest-family.vercel.app](https://carenest-family.vercel.app)
- **GitHub Repository**: [https://github.com/alwaysshuvo/CareNest-Where-Your-Loved-Ones-Feel-Safe](https://github.com/alwaysshuvo/CareNest-Where-Your-Loved-Ones-Feel-Safe)

---

## 🔐 Demo Credentials

Test the application with these credentials:

```
Email:    user@mail.com
Password: 123asD
```

Or sign up using **Google** or **GitHub OAuth**.

---

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 + PostCSS
- **UI Components**: Radix UI (Dialog, Dropdown Menu)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: React Hot Toast, SweetAlert2

### Backend & Database
- **Runtime**: Node.js
- **API Routes**: Next.js Route Handlers (REST API)
- **Database**: MongoDB (Atlas)
- **Password Hashing**: bcryptjs

### Authentication
- **NextAuth v4** (Session Strategy: JWT)
- **Providers**:
  - Email/Password (Credentials Provider)
  - Google OAuth 2.0
  - GitHub OAuth

### Image Management
- **Image Hosting**: ImgBB
- **Image Optimization**: Next.js Image Component

### Deployment
- **Frontend & API**: Vercel
- **Database**: MongoDB Atlas (Cloud)

---

## ✨ Key Features

### 1. **Authentication & Authorization**
- User registration with email verification and validation
- Secure login with email/password credentials
- OAuth integration (Google & GitHub)
- JWT-based session management
- Protected routes requiring authentication
- Role-based user profiles

### 2. **Service Browsing**
- **Three Care Categories**:
  - **Baby Care**: Hourly, half-day, full-day, newborn, night care, feeding, learning, hygiene, emergency services
  - **Elderly Care**: Hourly, half-day, full-day, companion, mobility, medication reminder, dementia, Alzheimer's, physiotherapy, diabetic care, palliative care, end-of-life care
  - **Sick Care**: Hourly, half-day, full-day, night care, post-hospital recovery, chronic illness, fever/flu, COVID recovery, injury recovery
- Searchable service catalog with 50+ services
- Category-based filtering
- Detailed service descriptions and pricing
- Responsive grid layout with pagination
- Service skeleton loading state

### 3. **Booking System**
- Intuitive booking form with service details
- Dynamic pricing calculation (price × duration)
- Division & district selection (Bangladesh locations)
- Address and contact information collection
- Duration selection (flexible days)
- Personal notes/special requests
- Real-time total cost calculation
- Booking confirmation via SweetAlert2

### 4. **My Bookings Management**
- View all personal bookings
- Booking status tracking:
  - **Pending**: Awaiting approval
  - **Approved**: Ready for service
  - **Cancelled**: User-cancelled bookings
- Cancel booking with reason selection
- Booking card displays service image, price, date, and status
- List updates in real-time after cancellation
- Private route (requires authentication)

### 5. **User Profile**
- View authenticated user information
- Update profile name and phone
- Profile picture upload to ImgBB
- Server-side session validation
- Protected profile access

### 6. **Navigation & UX**
- Responsive navbar with authenticated/unauthenticated states
- Dynamic user menu with profile and logout options
- Footer with company information and links
- Global route change loader (page transitions)
- Hero section with call-to-action
- Testimonials showcase
- Why Choose Us section
- Mobile-first responsive design

---

## 📍 Application Routes & Pages

### Public Routes
| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing page with hero, services overview, testimonials |
| `/services` | Services Catalog | Browse all care services with filtering & pagination |
| `/services/[id]` | Service Details | View single service details with booking button |
| `/login` | Login | Email/password or OAuth login |
| `/register` | Register | User registration with profile setup |

### Protected Routes (Requires Authentication)
| Route | Page | Description |
|-------|------|-------------|
| `/my-bookings` | My Bookings | User's booking history with status tracking |
| `/booking/[serviceId]` | Booking Form | Create new booking for service |
| `/profile` | User Profile | View and edit user information |

---

## 🔐 Authentication Flow

### Email/Password Registration
```
User Registration Form
↓
POST /api/register
↓
Validate inputs & check duplicate email
↓
Hash password with bcryptjs
↓
Store user in MongoDB (users collection)
↓
Redirect to login
```

### Email/Password Login
```
Login Form (Email + Password)
↓
signIn('credentials') via NextAuth
↓
CredentialsProvider authorization callback
↓
Query users collection by email
↓
Compare password with bcrypt
↓
Generate JWT session token
↓
Redirect to /my-bookings or callback URL
```

### OAuth Flow (Google/GitHub)
```
User clicks "Sign in with Google/GitHub"
↓
OAuth consent screen
↓
NextAuth handles token exchange
↓
Check if user exists in MongoDB
↓
Create user if new (via GoogleProvider/GitHubProvider)
↓
Generate JWT session
↓
Redirect to dashboard
```

### Protected Routes
```
Access /my-bookings or /booking/[serviceId]
↓
Middleware checks for valid JWT token
↓
getServerSession(authOptions)
↓
If no token → redirect to /login
↓
If valid token → allow access
```

---

## 📅 Service Browsing & Booking Workflow

### Step 1: Browse Services
```
User → /services
↓
Display all 50+ services
↓
Filter by category (Baby/Elderly/Sick)
↓
Search by service name
↓
Paginate results (10 per page)
```

### Step 2: View Service Details
```
Click service card
↓
/services/[id]
↓
Display full description, image, price
↓
Show quick facts (trained caregiver, flexible timing, safe)
```

### Step 3: Initiate Booking
```
Click "Book Now"
↓
/booking/[serviceId]
↓
Check authentication status
↓
Display booking form (if logged in)
↓
Redirect to /login (if not authenticated)
```

### Step 4: Complete Booking Form
```
Select Duration (days)
↓
Choose Division/District
↓
Enter Address & Phone
↓
Add special notes (optional)
↓
Review total cost (price × duration)
↓
Submit booking
```

### Step 5: Booking Confirmation
```
POST /api/bookings
↓
Verify user session
↓
Save booking to MongoDB
↓
Set initial status: "pending"
↓
Success toast notification
↓
Redirect to /my-bookings
```

---

## 📦 My Bookings & Status Lifecycle

### Booking Status States

```
PENDING
├─ Awaiting admin approval/confirmation
├─ User can view details
└─ User can cancel booking

APPROVED
├─ Service ready to be provided
├─ User can view service date
└─ User can cancel (if needed)

CANCELLED
├─ User-initiated cancellation
├─ Requires cancellation reason
└─ Booking remains in history
```

### Booking Cancellation Flow
```
User clicks "Cancel Booking"
↓
SweetAlert2 modal appears
↓
User selects cancellation reason:
  - Too expensive
  - Service delayed
  - Change of plan
  - Found better service
  - Other
↓
User enters custom reason (if Other selected)
↓
PATCH /api/bookings/[id]
↓
Update booking status to "cancelled"
↓
Store cancelReason & cancelledAt timestamp
↓
Update UI with new status
```

### BookingCard Component Display
```
Service Image
↓
Service Title & Category
↓
User Name & Phone
↓
Booking Date & Duration
↓
Total Cost
↓
Current Status Badge
├─ Pending (yellow)
├─ Approved (green)
└─ Cancelled (red)
↓
Action Buttons
└─ Cancel (if pending/approved)
```

---

## 🗄️ Database Collections Overview

### **carenestDB** (MongoDB Database)

#### **users Collection**
Stores user account information

```javascript
{
  _id: ObjectId,
  
  // Authentication
  email: string (unique),
  password: string (bcrypt hashed),
  provider: "credentials" | "google" | "github",
  
  // Profile
  nid: string,
  name: string,
  phone: string,
  image: string | null,
  
  // System
  role: "user" | "admin",
  createdAt: Date
}
```

#### **bookings Collection**
Stores all booking records

```javascript
{
  _id: ObjectId,
  
  // User Info
  userEmail: string,
  userName: string,
  phone: string,
  
  // Service Info
  serviceId: string,
  serviceTitle: string,
  serviceImage: string,
  price: number (per day),
  
  // Booking Details
  duration: number (days),
  division: string,
  district: string,
  address: string,
  totalCost: number,
  notes: string,
  
  // Status
  status: "pending" | "approved-ready" | "cancelled",
  cancelReason: string | null,
  cancelledAt: Date | null,
  
  // Timestamps
  createdAt: Date
}
```

#### **services Collection** (Future - Currently in-memory)
Ready for admin service management

```javascript
{
  _id: ObjectId,
  
  id: string (unique slug),
  title: string,
  shortDesc: string,
  details: string,
  price: number,
  image: string,
  category: "baby" | "elderly" | "sick",
  
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔌 API Endpoints

### **Authentication**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signin` | NextAuth login endpoint |
| POST | `/api/auth/callback/[provider]` | OAuth callback |
| GET | `/api/auth/session` | Get current session |
| POST | `/api/register` | Register new user |

### **Bookings**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/bookings` | Get user's bookings (protected) |
| POST | `/api/bookings` | Create new booking (protected) |
| PATCH | `/api/bookings/[id]` | Cancel booking (protected) |
| DELETE | `/api/bookings/[id]` | Delete booking (protected) |

### **Profile**
| Method | Endpoint | Description |
|--------|----------|-------------|
| PUT | `/api/profile` | Update user profile (protected) |

### **User Registration**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register` | Create new account |

---

## 📋 Environment Variables

### Create `.env.local` file:

```env
# NextAuth Configuration
NEXTAUTH_SECRET=your_random_secret_string
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/carenestDB

# Image Hosting (ImgBB)
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
```

---

## 🚀 Installation & Setup Guide

### Prerequisites
- Node.js 18+ and npm
- MongoDB Atlas account
- Google/GitHub OAuth apps (optional but recommended)

### Step 1: Clone Repository
```bash
git clone https://github.com/alwaysshuvo/CareNest-Where-Your-Loved-Ones-Feel-Safe.git
cd carenest
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
```bash
# Copy example env file
cp .env.example .env.local

# Edit .env.local with your credentials
nano .env.local
```

### Step 4: Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in browser.

### Step 5: Build for Production
```bash
npm run build
npm start
```

---

## 📁 Folder Structure

```
carenest/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/
│   │   │   │   └── route.ts          # NextAuth configuration
│   │   │   ├── bookings/
│   │   │   │   ├── route.ts          # GET bookings, POST new booking
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts      # PATCH/DELETE booking
│   │   │   ├── register/
│   │   │   │   └── route.ts          # User registration
│   │   │   └── profile/
│   │   │       └── route.ts          # PUT update profile
│   │   ├── booking/
│   │   │   └── [serviceId]/
│   │   │       └── page.jsx          # Booking form page
│   │   ├── services/
│   │   │   ├── page.tsx              # Services catalog
│   │   │   └── [id]/
│   │   │       └── page.tsx          # Service details
│   │   ├── my-bookings/
│   │   │   └── page.tsx              # User bookings (protected)
│   │   ├── login/
│   │   │   └── page.tsx              # Login page
│   │   ├── register/
│   │   │   └── page.tsx              # Registration page
│   │   ├── profile/
│   │   │   └── page.tsx              # User profile (protected)
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Home page
│   │   ├── not-found.tsx             # 404 page
│   │   ├── globals.css               # Global styles
│   │   ├── components/
│   │   │   ├── home/
│   │   │   │   ├── Hero.tsx
│   │   │   │   ├── Services.tsx
│   │   │   │   ├── WhyChooseUs.tsx
│   │   │   │   └── Testimonials.tsx
│   │   │   ├── booking/
│   │   │   │   ├── BookingForm.tsx
│   │   │   │   └── BookingCard.tsx
│   │   │   ├── common/
│   │   │   │   ├── Navbar.tsx
│   │   │   │   └── Footer.tsx
│   │   │   ├── profile/
│   │   │   │   └── ProfileView.tsx
│   │   │   ├── ui/
│   │   │   │   └── [Radix UI components]
│   │   │   ├── RouteLoader.tsx       # Page transition loader
│   │   │   └── Loader.tsx
│   │   ├── context/
│   │   │   └── SessionProviderWrapper.tsx
│   │   ├── hooks/
│   │   │   └── [Custom React hooks]
│   │   ├── lib/
│   │   │   ├── auth.ts               # NextAuth configuration
│   │   │   ├── mongodb.ts            # MongoDB connection
│   │   │   └── utils.ts              # Utility functions
│   │   ├── styles/
│   │   │   └── [Additional styles]
│   │   └── utils/
│   │       └── [Utility files]
│   ├── data/
│   │   └── services.ts               # 50+ service definitions
│   └── components.json               # Shadcn UI config
├── public/
│   └── assets/
│       ├── services/
│       │   ├── baby-*.{jpg,webp}    # Baby care images
│       │   ├── elderly-*.jpg         # Elderly care images
│       │   └── sick-*.jpeg           # Sick care images
│       └── [Other assets]
├── middleware.ts                     # NextAuth middleware
├── next.config.ts                    # Next.js configuration
├── tsconfig.json                     # TypeScript configuration
├── tailwind.config.js                # Tailwind CSS configuration
├── postcss.config.mjs                # PostCSS configuration
├── package.json                      # Dependencies
├── .env                              # Environment variables (example)
└── README.md                         # This file
```

---

## 📸 Screenshots

### Home Page
![Hero Section](https://via.placeholder.com/800x400?text=Home+Page+Hero+Section)

### Services Catalog
![Services](https://via.placeholder.com/800x400?text=Services+Catalog+Page)

### Service Details
![Service Details](https://via.placeholder.com/800x400?text=Service+Details+Page)

### Booking Form
![Booking Form](https://via.placeholder.com/800x400?text=Booking+Form+Page)

### My Bookings
![My Bookings](https://via.placeholder.com/800x400?text=My+Bookings+Page)

### Login Page
![Login](https://via.placeholder.com/800x400?text=Login+Page)

### User Profile
![Profile](https://via.placeholder.com/800x400?text=User+Profile+Page)

---

## 🔄 Middleware Configuration

The application uses NextAuth middleware to protect specific routes:

```typescript
// Protected Routes:
// - /my-bookings/:path*      (requires authentication)
// - /services/:path*/booking (requires authentication)
```

When unauthenticated users try to access protected routes, they are redirected to `/login` with a callback URL to return after login.

---

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import GitHub repository
   - Configure environment variables in Vercel dashboard

3. **Deploy**
   ```bash
   vercel deploy
   ```

### Environment Setup on Vercel
Add these variables in Vercel Project Settings:
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`
- `MONGODB_URI`
- `NEXT_PUBLIC_IMGBB_API_KEY`

---

## 🔮 Future Improvements

### Phase 2: Advanced Features
- **Admin Dashboard**: Manage services, view all bookings, user management
- **Payment Integration**: Stripe/SSLCommerz payment gateway
- **Review & Ratings**: User reviews and caregiver ratings
- **Notifications**: Email/SMS booking confirmations and updates
- **Real-time Chat**: In-app messaging between users and caregivers

### Phase 3: Enhanced Functionality
- **Caregiver Profiles**: Verify and list available caregivers
- **Availability Scheduling**: Calendar view for booking slots
- **Background Checks**: Security verification for caregivers
- **Service Analytics**: Track bookings, revenue, user trends
- **Mobile App**: Native React Native/Flutter application

### Phase 4: Scaling & Performance
- **Search Optimization**: Elasticsearch for better service search
- **Caching**: Redis for performance optimization
- **CDN**: Cloudflare for faster image delivery
- **Multi-language Support**: Localization (Bengali, English, etc.)
- **Accessibility**: WCAG compliance improvements

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the MIT License.

---

## 👤 Author / Credits

**Developed by**: [Ali Hossen Shuvo](https://github.com/alwaysshuvo)

- **GitHub**: [@alwaysshuvo](https://github.com/alwaysshuvo)
- **Email**: Contact via GitHub
- **Portfolio**: [https://alwaysshuvo.github.io](https://alwaysshuvo.github.io)

### Special Thanks
- **Next.js & Vercel**: Amazing framework and deployment platform
- **MongoDB**: Reliable database solution
- **NextAuth**: Secure authentication library
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations
- **SweetAlert2**: Beautiful dialog boxes

---

## 📞 Support & Contact

For issues, questions, or suggestions:
- **GitHub Issues**: [Report bugs](https://github.com/alwaysshuvo/CareNest-Where-Your-Loved-Ones-Feel-Safe/issues)
- **GitHub Discussions**: [Ask questions](https://github.com/alwaysshuvo/CareNest-Where-Your-Loved-Ones-Feel-Safe/discussions)

---

**Last Updated**: January 2026

**Version**: 1.0.0

---

Made with ❤️ for families who care.
