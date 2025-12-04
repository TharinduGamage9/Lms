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
import Note from '../models/Note';

interface CategoryMapping {
  subjectPattern: string;
  category: string;
}

const categoryMappings: CategoryMapping[] = [
  // වාණිජ විෂය ධාරාව (Commerce Stream)
  { subjectPattern: 'Accounting', category: 'වාණිජ විෂය ධාරාව (Commerce Stream)' },
  { subjectPattern: 'Business Studies', category: 'වාණිජ විෂය ධාරාව (Commerce Stream)' },
  { subjectPattern: 'Econ', category: 'වාණිජ විෂය ධාරාව (Commerce Stream)' },
  { subjectPattern: 'ICT', category: 'වාණිජ විෂය ධාරාව (Commerce Stream)' },
  { subjectPattern: 'Stat', category: 'වාණිජ විෂය ධාරාව (Commerce Stream)' },
  
  // කලා විෂය ධාරාව (Arts Stream)
  { subjectPattern: 'Media', category: 'කලා විෂය ධාරාව (Arts Stream)' },
  { subjectPattern: 'Home Science', category: 'කලා විෂය ධාරාව (Arts Stream)' },
  { subjectPattern: 'Geography', category: 'කලා විෂය ධාරාව (Arts Stream)' },
  
  // කලා විෂය ධාරාව (Languages)
  { subjectPattern: 'Japanese', category: 'කලා විෂය ධාරාව (Languages)' },
  { subjectPattern: 'Korean', category: 'කලා විෂය ධාරාව (Languages)' },
  { subjectPattern: 'Hindi', category: 'කලා විෂය ධාරාව (Languages)' },
  { subjectPattern: 'Sinhala', category: 'කලා විෂය ධාරාව (Languages)' },
  
  // තාක්ෂණවේදය විෂය ධාරාව (Technology Stream)
  { subjectPattern: 'ET', category: 'තාක්ෂණවේදය විෂය ධාරාව (Technology Stream)' },
  { subjectPattern: 'SFT', category: 'තාක්ෂණවේදය විෂය ධාරාව (Technology Stream)' },
  
  // විද්‍යා/ගණිත විෂය ධාරාව (Science/Mathematics Stream)
  { subjectPattern: 'සංයුක්ත ගණිතය', category: 'විද්‍යා/ගණිත විෂය ධාරාව (Science/Mathematics Stream)' },
  { subjectPattern: 'Combined Maths', category: 'විද්‍යා/ගණිත විෂය ධාරාව (Science/Mathematics Stream)' },
  { subjectPattern: 'රසායන විද්‍යාව', category: 'විද්‍යා/ගණිත විෂය ධාරාව (Science/Mathematics Stream)' },
  { subjectPattern: 'Chemistry', category: 'විද්‍යා/ගණිත විෂය ධාරාව (Science/Mathematics Stream)' },
  { subjectPattern: 'භෞතික විද්‍යාව', category: 'විද්‍යා/ගණිත විෂය ධාරාව (Science/Mathematics Stream)' },
  { subjectPattern: 'Physics', category: 'විද්‍යා/ගණිත විෂය ධාරාව (Science/Mathematics Stream)' },
  { subjectPattern: 'ජීව විද්‍යාව', category: 'විද්‍යා/ගණිත විෂය ධාරාව (Science/Mathematics Stream)' },
  { subjectPattern: 'Biology', category: 'විද්‍යා/ගණිත විෂය ධාරාව (Science/Mathematics Stream)' },
];

async function updateALCategories() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI not found in environment variables');
    }
    
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Get all AL notes without categories
    const alNotes = await Note.find({ level: 'AL' });
    console.log(`Found ${alNotes.length} AL notes`);

    let updated = 0;
    let skipped = 0;

    for (const note of alNotes) {
      // Skip if already has a category
      if (note.category) {
        skipped++;
        continue;
      }

      // Find matching category
      const mapping = categoryMappings.find(m => 
        note.subject.includes(m.subjectPattern)
      );

      if (mapping) {
        note.category = mapping.category;
        await note.save();
        console.log(`✓ Updated: ${note.subject} -> ${mapping.category}`);
        updated++;
      } else {
        console.log(`⚠ No category found for: ${note.subject}`);
        skipped++;
      }
    }

    console.log('\n=== Summary ===');
    console.log(`Updated: ${updated} AL notes with categories`);
    console.log(`Skipped: ${skipped} notes (already have category or no match)`);
    console.log(`Total: ${alNotes.length} AL notes`);
    
    process.exit(0);
  } catch (error: any) {
    console.error('Error:', error);
    process.exit(1);
  }
}

updateALCategories();

