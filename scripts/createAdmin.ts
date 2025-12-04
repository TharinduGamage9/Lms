// Load environment variables FIRST before any other imports
import { config } from 'dotenv';
import { resolve } from 'path';
import { readFileSync } from 'fs';

// Read .env.local file directly
const envPath = resolve(process.cwd(), '.env.local');
const envFile = readFileSync(envPath, 'utf-8');
envFile.split('\n').forEach(line => {
  const [key, ...values] = line.split('=');
  if (key && values.length) {
    process.env[key.trim()] = values.join('=').trim();
  }
});

import mongoose from 'mongoose';
import Admin from '../models/Admin';

async function createAdmin() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI not found in environment variables');
    }
    
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const admin = new Admin({
      username: 'admin',
      email: 'admin@lms.com',
      password: 'admin123',
    });

    await admin.save();
    console.log('Admin created successfully!');
    // console.log('Username: admin');
    // console.log('Password: admin123')
    process.exit(0);
  } catch (error: any) {
    if (error.code === 11000) {
      console.log('Admin already exists!');
    } else {
      console.error('Error creating admin:', error);
    }
    process.exit(1);
  }
}

createAdmin();

