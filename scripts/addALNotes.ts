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

interface ALNoteData {
  subject: string;
  driveLink: string;
  level: 'AL';
  category: string;
}

const alNotes: ALNoteData[] = [
  // වාණිජ විෂය ධාරාව (Commerce Stream)
  { subject: 'Accounting', driveLink: 'https://drive.google.com/file/d/1gYi4nVTyiF4qbDKlaVfrwM67/view?usp=drive_link', level: 'AL', category: 'වාණිජ විෂය ධාරාව (Commerce Stream)' },
  { subject: 'Accounting', driveLink: 'https://drive.google.com/file/d/1tngYjYv3ITBUeAmq4seq/view?usp=drive_link', level: 'AL', category: 'වාණිජ විෂය ධාරාව (Commerce Stream)' },
  { subject: 'Accounting Pass Papers', driveLink: 'https://drive.google.com/file/d/1AXn32x_5VV0m1JjbhxwblQSKEnI/view?usp=drive_link', level: 'AL', category: 'වාණිජ විෂය ධාරාව (Commerce Stream)' },
  { subject: 'Business Studies', driveLink: 'https://drive.google.com/file/d/1A9FyCh1DpPvRlyQrpbQFdMn2N7q/view?usp=drive_link', level: 'AL', category: 'වාණිජ විෂය ධාරාව (Commerce Stream)' },
  { subject: 'Econ', driveLink: 'https://drive.google.com/file/d/1XyyuXbpnAGIzAAF0PNMAzKOIy41/view?usp=drive_link', level: 'AL', category: 'වාණිජ විෂය ධාරාව (Commerce Stream)' },
  { subject: 'ICT', driveLink: 'https://drive.google.com/file/d/1-VrKpVEeCT1DDuy0c3FRC5vaSaT/view?usp=drive_link', level: 'AL', category: 'වාණිජ විෂය ධාරාව (Commerce Stream)' },
  { subject: 'ICT', driveLink: 'https://drive.google.com/file/d/15z1-KLgSI---hfqo08O/view?usp=drive_link', level: 'AL', category: 'වාණිජ විෂය ධාරාව (Commerce Stream)' },
  { subject: 'ICT', driveLink: 'https://drive.google.com/file/d/1_l8Qr2p3DktLO4Encg74uk/view?usp=drive_link', level: 'AL', category: 'වාණිජ විෂය ධාරාව (Commerce Stream)' }, // Password = sub@kavidx
  { subject: 'ICT', driveLink: 'https://drive.google.com/file/d/1HepTix5xAkIq30mOzYozFHgwHZ3/view?usp=drive_link', level: 'AL', category: 'වාණිජ විෂය ධාරාව (Commerce Stream)' },
  { subject: 'ICT', driveLink: 'https://drive.google.com/file/d/1Piqc_QyvfDOmJNndjFzcL147_Fd/view?usp=drive_link', level: 'AL', category: 'වාණිජ විෂය ධාරාව (Commerce Stream)' },
  { subject: 'ICT', driveLink: 'https://drive.google.com/file/d/15KZmbxiUZ2r4tbKSddVRAhh6Anp/view?usp=drive_link', level: 'AL', category: 'වාණිජ විෂය ධාරාව (Commerce Stream)' },
  { subject: 'ICT Short Notes', driveLink: 'https://drive.google.com/file/d/1mwZTEiM7NhNo5XJsotSWoFcWvQK/view?usp=drive_link', level: 'AL', category: 'වාණිජ විෂය ධාරාව (Commerce Stream)' },
  { subject: 'Stat', driveLink: 'https://drive.google.com/file/d/1tngYjYv3ITBUeAmq4seq/view?usp=drive_link', level: 'AL', category: 'වාණිජ විෂය ධාරාව (Commerce Stream)' },
  
  // කලා විෂය ධාරාව (Arts Stream)
  { subject: 'Media', driveLink: 'https://drive.google.com/file/d/1OoBk93u1NmMoeX1q6AK5fKqh3lo/view?usp=drive_link', level: 'AL', category: 'කලා විෂය ධාරාව (Arts Stream)' },
  { subject: 'Media', driveLink: 'https://drive.google.com/file/d/1GiDkzRW1FcZeY895WJpZN8a61At/view?usp=drive_link', level: 'AL', category: 'කලා විෂය ධාරාව (Arts Stream)' },
  { subject: 'Home Science', driveLink: 'https://drive.google.com/file/d/1hHQDeHsUQlkY5mpoHVG/view?usp=drive_link', level: 'AL', category: 'කලා විෂය ධාරාව (Arts Stream)' },
  { subject: 'Home Science', driveLink: 'https://drive.google.com/file/d/1601yqkiyTimiSgzje5EdnT/view?usp=drive_link', level: 'AL', category: 'කලා විෂය ධාරාව (Arts Stream)' },
  { subject: 'Geography', driveLink: 'https://drive.google.com/file/d/198Z48q-hl9n4H/view?usp=drive_link', level: 'AL', category: 'කලා විෂය ධාරාව (Arts Stream)' },
  { subject: 'Geography', driveLink: 'https://drive.google.com/file/d/116b3y63ZZXncT2HT7uV/view?usp=drive_link', level: 'AL', category: 'කලා විෂය ධාරාව (Arts Stream)' },
  { subject: 'Geography', driveLink: 'https://drive.google.com/file/d/1YoTR3Y63J46xgC_eBJQ3btMMg/view?usp=drive_link', level: 'AL', category: 'කලා විෂය ධාරාව (Arts Stream)' },
  
  // කලා විෂය ධාරාව (Languages)
  { subject: 'Japanese', driveLink: 'https://drive.google.com/file/d/1Piqc_QyvfDOmJNndjFzcL147_Fd/view?usp=drive_link', level: 'AL', category: 'කලා විෂය ධාරාව (Languages)' },
  { subject: 'Japanese', driveLink: 'https://drive.google.com/file/d/10gFiRBZe/view?usp=drive_link', level: 'AL', category: 'කලා විෂය ධාරාව (Languages)' },
  { subject: 'Korean', driveLink: 'https://drive.google.com/file/d/1e2w52bcOMQ/view?usp=drive_link', level: 'AL', category: 'කලා විෂය ධාරාව (Languages)' },
  { subject: 'Hindi', driveLink: 'https://drive.google.com/file/d/1mbBF/view?usp=drive_link', level: 'AL', category: 'කලා විෂය ධාරාව (Languages)' },
  { subject: 'Sinhala', driveLink: 'https://drive.google.com/file/d/10v36oT_2Vw7Tmud/view?usp=drive_link', level: 'AL', category: 'කලා විෂය ධාරාව (Languages)' },
  
  // තාක්ෂණවේදය විෂය ධාරාව (Technology Stream)
  { subject: 'ET', driveLink: 'https://drive.google.com/file/d/1CqiLw8a4wVSWlLO8C69NfDit2wW/view?usp=drive_link', level: 'AL', category: 'තාක්ෂණවේදය විෂය ධාරාව (Technology Stream)' },
  { subject: 'ICT', driveLink: 'https://drive.google.com/file/d/1mPdYHQHH4LO/view?usp=drive_link', level: 'AL', category: 'තාක්ෂණවේදය විෂය ධාරාව (Technology Stream)' },
  { subject: 'SFT', driveLink: 'https://drive.google.com/file/d/1TkZzT34I5XaVne/view?usp=drive_link', level: 'AL', category: 'තාක්ෂණවේදය විෂය ධාරාව (Technology Stream)' },
  
  // විද්‍යා/ගණිත විෂය ධාරාව (Science/Mathematics Stream)
  { subject: 'සංයුක්ත ගණිතය (Combined Maths)', driveLink: 'https://drive.google.com/file/d/1Cm3wD7ziKPmNo5SxNQU1ZFeyP7e/view?usp=drive_link', level: 'AL', category: 'විද්‍යා/ගණිත විෂය ධාරාව (Science/Mathematics Stream)' },
  { subject: 'රසායන විද්‍යාව (Chemistry)', driveLink: 'https://drive.google.com/file/d/1Zmy/view?usp=drive_link', level: 'AL', category: 'විද්‍යා/ගණිත විෂය ධාරාව (Science/Mathematics Stream)' },
  { subject: 'භෞතික විද්‍යාව (Physics)', driveLink: 'https://drive.google.com/file/d/1zh1lvoQr1XMZpfa6BGJ7/view?usp=drive_link', level: 'AL', category: 'විද්‍යා/ගණිත විෂය ධාරාව (Science/Mathematics Stream)' },
  { subject: 'ජීව විද්‍යාව (Biology)', driveLink: 'https://drive.google.com/file/d/1zxE8FG7l0/view?usp=drive_link', level: 'AL', category: 'විද්‍යා/ගණිත විෂය ධාරාව (Science/Mathematics Stream)' },
  { subject: 'Biology Resource Books', driveLink: 'https://drive.google.com/file/d/14hPdgc67OrM6X57ONexej2/view?usp=drive_link', level: 'AL', category: 'විද්‍යා/ගණිත විෂය ධාරාව (Science/Mathematics Stream)' },
];

async function addALNotes() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI not found in environment variables');
    }
    
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    let added = 0;
    let skipped = 0;

    for (const noteData of alNotes) {
      try {
        // Check if this exact combination already exists
        const existing = await Note.findOne({
          subject: noteData.subject,
          driveLink: noteData.driveLink,
          level: noteData.level,
        });

        if (existing) {
          console.log(`Skipping duplicate: ${noteData.subject} (${noteData.level})`);
          skipped++;
          continue;
        }

        const note = new Note({
          subject: noteData.subject,
          driveLink: noteData.driveLink,
          level: noteData.level,
          category: noteData.category,
        });

        await note.save();
        console.log(`✓ Added: ${noteData.subject} (${noteData.level})`);
        added++;
      } catch (error: any) {
        if (error.code === 11000) {
          console.log(`Skipping duplicate: ${noteData.subject} (${noteData.level})`);
          skipped++;
        } else {
          console.error(`Error adding ${noteData.subject}:`, error.message);
        }
      }
    }

    console.log('\n=== Summary ===');
    console.log(`Added: ${added} AL notes`);
    console.log(`Skipped: ${skipped} duplicates`);
    console.log(`Total: ${alNotes.length} notes`);
    
    process.exit(0);
  } catch (error: any) {
    console.error('Error:', error);
    process.exit(1);
  }
}

addALNotes();

