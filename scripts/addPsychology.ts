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
import Psychology from '../models/Psychology';

interface PsychologyData {
  subject: string;
  driveLink: string;
}

const psychologyCourses: PsychologyData[] = [
  { subject: 'ඇබ්බැහිවීම් (මනෝවිද්‍යාව හා ප්‍රතිකාර) (Addiction Psychology & Therapy)', driveLink: 'https://drive.google.com/file/d/1wwkvBZBrtUaHYy4UnQqCtWvxbAJ1l0-O/view?usp=drive_link' },
  { subject: 'චිත්තවේගිය බුද්ධිය (Emotional Intelligence)', driveLink: 'https://drive.google.com/file/d/10LuftJU-QxKR-HkRFw0fgEqHg8prjyeb/view?usp=drive_link' },
  { subject: 'පවුල් උපදේශනය හා පවුල් ප්‍රතිකාර (Family Counseling & Family Therapy)', driveLink: 'https://drive.google.com/file/d/12iQatKz8ygCv1dqkZIyeTr2Ee5ICqLe-/view?usp=drive_link' },
  { subject: 'මනෝ උපදේශන ආචාරධර්ම (Counseling Ethics)', driveLink: 'https://drive.google.com/file/d/15KuI5qRgO18GtYLc3qWXev3YzueOEXCj/view?usp=drive_link' },
  { subject: 'මනෝ ප්‍රතිකාර (Psychotherapy)', driveLink: 'https://drive.google.com/file/d/1-qlCRw3NCG9Nvepe4EHxsPQzl_eEYcFC/view?usp=drive_link' },
  { subject: 'ලිංගික ප්‍රතිකාර (Sexual Therapy)', driveLink: 'https://drive.google.com/file/d/109LSxGfTdPuabYNA8mtofn8WA4wrof8l/view?usp=drive_link' },
  { subject: 'ශෝක උපදේශනය හා වේදනා කළමනාකරණය (Grief Counseling & Pain Management)', driveLink: 'https://drive.google.com/file/d/1OQRoezpFZsJdTKJzkNg5EdtxXdpV7Ms6/view?usp=drive_link' },
  { subject: 'ළමා ප්‍රතිකාර (Child Therapy)', driveLink: 'https://drive.google.com/file/d/1opCBmvfpjHEyI5wVbVahqTDAL3MWePXS/view?usp=drive_link' },
];

async function addPsychology() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI not found in environment variables');
    }
    
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    let added = 0;
    let skipped = 0;

    for (const courseData of psychologyCourses) {
      try {
        // Check if this exact combination already exists
        const existing = await Psychology.findOne({
          subject: courseData.subject,
          driveLink: courseData.driveLink,
        });

        if (existing) {
          console.log(`Skipping duplicate: ${courseData.subject}`);
          skipped++;
          continue;
        }

        const course = new Psychology({
          subject: courseData.subject,
          driveLink: courseData.driveLink,
        });

        await course.save();
        console.log(`✓ Added: ${courseData.subject}`);
        added++;
      } catch (error: any) {
        if (error.code === 11000) {
          console.log(`Skipping duplicate: ${courseData.subject}`);
          skipped++;
        } else {
          console.error(`Error adding ${courseData.subject}:`, error.message);
        }
      }
    }

    console.log('\n=== Summary ===');
    console.log(`Added: ${added} psychology courses`);
    console.log(`Skipped: ${skipped} duplicates`);
    console.log(`Total: ${psychologyCourses.length} courses`);
    
    process.exit(0);
  } catch (error: any) {
    console.error('Error:', error);
    process.exit(1);
  }
}

addPsychology();


