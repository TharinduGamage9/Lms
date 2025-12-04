// Load environment variables FIRST before any other imports
import { readFileSync } from 'fs';
import { resolve } from 'path';

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
import bcrypt from 'bcryptjs';

async function verifyAdmin() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI not found in environment variables');
    }
    
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find admin
    const admin = await Admin.findOne({ username: 'admin' });
    
    if (!admin) {
      console.log('Admin not found. Creating new admin...');
      const newAdmin = new Admin({
        username: 'admin',
        email: 'admin@lms.com',
        password: 'admin123',
      });
      await newAdmin.save();
      console.log('Admin created successfully!');
      console.log('Username: admin');
      console.log('Password: admin123');
    } else {
      console.log('Admin found:', {
        username: admin.username,
        email: admin.email,
        passwordHash: admin.password.substring(0, 20) + '...',
      });
      
      // Test password comparison
      const testPassword = 'admin123';
      const isMatch = await admin.comparePassword(testPassword);
      console.log(`Password '${testPassword}' matches:`, isMatch);
      
      // If password doesn't match, update it
      if (!isMatch) {
        console.log('Password mismatch detected. Updating password...');
        admin.password = 'admin123';
        await admin.save();
        console.log('Password updated successfully!');
        
        // Verify again
        const updatedAdmin = await Admin.findOne({ username: 'admin' });
        const verifyMatch = await updatedAdmin!.comparePassword('admin123');
        console.log('Verification after update:', verifyMatch);
      }
    }
    
    process.exit(0);
  } catch (error: any) {
    console.error('Error:', error);
    process.exit(1);
  }
}

verifyAdmin();


