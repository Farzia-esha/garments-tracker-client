# Garments Order & Production Tracker System

## Live Site
- **Client:** [ https://charming-florentine-ba9143.netlify.app ]  
- **Server:** [https://garments-tracker-system.vercel.app ]  

---

## Project Overview
The **Garments Order & Production Tracker System** is a full-stack web application built to help small and medium-sized garment factories efficiently manage their production workflow. Users can place orders, track production stages, and monitor order progress. Managers can add and manage products, while admins oversee users, orders, and system activities.  

The platform focuses on real-time updates, role-based access control, and a smooth user experience for all stakeholders.

---

## 🧩 Core Technologies Used

### 💻 Frontend
- React (Vite)
- React Router
- TailwindCSS
- Framer Motion
- SweetAlert2
- React Hot Toast
- Axios
- imgbb

### ⚙️ Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- Firebase Admin SDK (Authentication)
- Stripe (Online Payment)


### 🚀 Deployment
- Client → Netlify / Vercel  
- Server → Vercel  
- Database → MongoDB Atlas  

---

## Main Features

### User Authentication
- Email/password login & registration
- Firebase authentication with JWT verification
- Google login (optional)
- Role-based access: Buyer, Manager, Admin
- Conditional navbar based on user login and role

### Product Management
- Managers can add/update/delete products
- Admin can manage all products and toggle "Show on Home"
- Detailed product view with images, description, category, price, minimum order, and payment options

### Order & Booking System
- Buyers can place orders
- Booking form auto-fills product details and email
- Validates order quantity (cannot exceed available quantity or below minimum order)
- Tracks order progress through stages:
  - Order Placed → Cutting → Sewing → Finishing → QC Checked → Packed → Shipped
- Payment integration via Stripe (supports online payment)
- Prevents duplicate bookings by sessionId

### Dashboard
#### Admin Dashboard
- Manage Users: Approve/Suspend with reason and feedback
- View All Products: Update, Delete, Show on Home toggle
- View All Orders: Filter/Search, View tracking

#### Manager Dashboard
- Add Product: Form with validation and image/video preview
- Manage Products: Update/Delete
- Pending Orders: Approve/Reject orders
- Approved Orders: Add tracking info

#### Buyer Dashboard
- My Orders: View orders, cancel if pending
- Track Order: View timeline and current status
- My Profile: View personal info, suspend feedback if applicable

### UI & Design Features
- Fully responsive design (desktop, tablet, mobile)
- Hero banner with call-to-action
- Products section with dynamic data from backend
- Customer feedback carousel
- Extra design sections for better UX
- Loading spinner during API calls
- Toast/SweetAlert notifications for CRUD actions
- Dark/Light theme toggle
- Dynamic page titles

---

## 📦 Dependencies

### Client
"dependencies": {
    "@tailwindcss/vite": "^4.1.17",
    "@tanstack/react-query": "^5.90.12",
    "axios": "^1.13.2",
    "firebase": "^12.6.0",
    "framer-motion": "^12.23.25",
    "leaflet": "^1.9.4",
    "lucide": "^0.556.0",
    "lucide-react": "^0.556.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-hook-form": "^7.68.0",
    "react-icons": "^5.5.0",
    "react-leaflet": "^5.0.0-rc.2",
    "react-router": "^7.10.1",
    "react-toastify": "^11.0.5",
    "sweetalert2": "^11.26.3",
    "swiper": "^12.0.3",
    "tailwindcss": "^4.1.17"
  }

  
---

## How to Run Locally

### Client Setup
```bash
git clone <client-repo-link>
cd <client-folder>
npm install
npm run dev

.env file

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_BACKEND_BASE_URL=https://your-server.vercel.app
VITE_IMGBB_KEY=
⚙️ Server Setup

git clone <git server ripo link>
cd rentwheels-server
npm install
npm run start
📁 .env file (Do not push this to GitHub):

PORT=3000
MONGODB_URI=your_mongodb_uri
ACCESS_TOKEN_SECRET=your_secret_key
