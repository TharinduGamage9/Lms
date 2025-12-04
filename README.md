# LMS Platform

A Learning Management System platform built with Next.js, MongoDB, and TypeScript. This platform allows admins to manage notes and drive links for OL (Ordinary Level) and AL (Advanced Level) students.

## Features

- **Student Portal**: Browse notes and drive links by level (OL/AL) and subject
- **Admin Dashboard**: Manage notes and drive links with full CRUD operations
- **Authentication**: Secure admin login system
- **Filtering**: Filter content by subject
- **Responsive Design**: Modern UI with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: bcryptjs for password hashing

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or Atlas)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Add your MongoDB connection string:
   ```
   MONGODB_URI=mongodb://localhost:27017/lms
   ```
   Or for MongoDB Atlas:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lms
   ```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Creating an Admin Account

To create an admin account, you'll need to use MongoDB directly or create a script. Here's a sample script you can run:

```javascript
// scripts/createAdmin.js
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    const admin = new Admin({
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123'
    });
    await admin.save();
    console.log('Admin created successfully');
    process.exit();
  });
```

## Project Structure

```
├── app/
│   ├── api/              # API routes
│   ├── admin/            # Admin dashboard
│   ├── ol/               # OL level page
│   ├── al/               # AL level page
│   └── page.tsx          # Home page
├── components/           # React components
├── lib/                  # Utility functions
├── models/               # MongoDB models
└── public/               # Static assets
```

## Usage

### Admin Dashboard

1. Navigate to `/admin`
2. Login with your admin credentials
3. Add, edit, or delete notes and drive links
4. Filter by level (OL/AL) and subject

### Student Portal

1. Visit the home page
2. Select OL or AL level
3. Browse notes and drive links
4. Filter by subject if needed

## License

MIT

