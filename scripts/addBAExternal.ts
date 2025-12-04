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
import BAExternal from '../models/BAExternal';

interface BAExternalData {
  subject: string;
  medium: string;
  driveLink: string;
}

const baExternalCourses: BAExternalData[] = [
  // Anthropology
  { subject: 'Anthropology (මානව විද්‍යාව)', medium: 'English Medium', driveLink: 'https://drive.google.com/file/d/1inDkfltxqZixg9hDkTWtwOshUAvdyhEH/view?usp=drive_link' },
  { subject: 'Anthropology (මානව විද්‍යාව)', medium: 'Sinhala Medium', driveLink: 'https://drive.google.com/file/d/1FiGy-fgMBGcasGwRpk_sDvudsadraRLU/view?usp=drive_link' },
  { subject: 'Anthropology (මානව විද්‍යාව)', medium: 'More Resources', driveLink: 'https://drive.google.com/drive/folders/1SUNKyWUAzciBs6GU5XE1Z7qLT8HrcAZ0?usp=drive_link' },
  
  // Archaeology
  { subject: 'Archaeology (පුරාවිද්‍යාව)', medium: 'English Medium', driveLink: 'https://drive.google.com/file/d/1wjzWz_XLx1SRjiyJmhi7tFszQboO0cdy/view?usp=drive_link' },
  { subject: 'Archaeology (පුරාවිද්‍යාව)', medium: 'Sinhala Medium', driveLink: 'https://drive.google.com/file/d/1VVCC8Tm8xcMkmNRNVnEfqEQ5C6GelWJu/view?usp=drive_link' },
  { subject: 'Archaeology (පුරාවිද්‍යාව)', medium: 'More Resources', driveLink: 'https://drive.google.com/drive/folders/1ju5Zmjv0RJNwQKLqq9AZChnCYnu0uYdJ?usp=drive_link' },
  
  // International Relations
  { subject: 'International Relations (ජාත්‍යන්තර සබඳතා)', medium: 'Sinhala Medium', driveLink: 'https://drive.google.com/file/d/1MUJTtuRI4ij75cO2hib4nQhu7j1cUEu_/view?usp=drive_link' },
  { subject: 'International Relations (ජාත්‍යන්තර සබඳතා)', medium: 'More Resources', driveLink: 'https://drive.google.com/drive/folders/1DCwEqIm2n_0iC4xAi7arrM0KLVNswNoK?usp=drive_link' },
  
  // Library Science
  { subject: 'Library Science (පුස්තකාල විද්‍යාව)', medium: 'English Medium', driveLink: 'https://drive.google.com/file/d/1u0dmcbhmj_L6C0e6FsqdLOsZ4kO-wjtq/view?usp=drive_link' },
  { subject: 'Library Science (පුස්තකාල විද්‍යාව)', medium: 'Sinhala Medium', driveLink: 'https://drive.google.com/file/d/15qsL_yQD0lsRMZ16J2I2xYd2Wga_w54K/view?usp=drive_link' },
  
  // Mass Communication
  { subject: 'Mass Communication (ජන සන්නිවේදනය)', medium: 'English Medium', driveLink: 'https://drive.google.com/file/d/1W5LwG9nXDSNx6z8EBi6JLZxzpHI0M0zl/view?usp=drive_link' },
  { subject: 'Mass Communication (ජන සන්නිවේදනය)', medium: 'Sinhala Medium', driveLink: 'https://drive.google.com/file/d/1997bQDUk2s-6zY6MbTlohI-yqI4ky2DO/view?usp=drive_link' },
  { subject: 'Mass Communication (ජන සන්නිවේදනය)', medium: 'More Resources 01', driveLink: 'https://drive.google.com/drive/folders/1u56CYumnm0alUABrrdX-x-Umk7aYkP9d?usp=drive_link' },
  { subject: 'Mass Communication (ජන සන්නිවේදනය)', medium: 'More Resources 02', driveLink: 'https://drive.google.com/drive/folders/1KaEZq8SCCmSHKeiGkBgFaPoiwUhY_4pL?usp=drive_link' },
  
  // Psychology
  { subject: 'Psychology (මනෝවිද්‍යාව)', medium: 'English Medium', driveLink: 'https://drive.google.com/file/d/1z6BC1x--GlnB0hWwj6wkW6jIxqNyoIG2/view?usp=drive_link' },
  { subject: 'Psychology (මනෝවිද්‍යාව)', medium: 'Sinhala Medium', driveLink: 'https://drive.google.com/file/d/1AOeFIwq4agSBd0ABH72u7uxebnHiYpsf/view?usp=drive_link' },
  { subject: 'Psychology (මනෝවිද්‍යාව)', medium: 'More Resources', driveLink: 'https://web.facebook.com/share/p/1BiUbqnf2o/' },
  
  // Peace & Conflict Resolution
  { subject: 'Peace & Conflict Resolution (සාමය හා ගැටුම් නිරාකරණය)', medium: 'Sinhala Medium', driveLink: 'https://drive.google.com/file/d/1Mi2lWUw15Gs3W5Zof5E4g1vTPNKyRM5w/view?usp=drive_link' },
  
  // Economics
  { subject: 'Economics (ආර්ථික විද්‍යාව)', medium: 'English Medium', driveLink: 'https://drive.google.com/file/d/1q5pbiDVQ7UINUnZhicvf0uioH-87aZ5x/view?usp=drive_link' },
  { subject: 'Economics (ආර්ථික විද්‍යාව)', medium: 'Sinhala Medium', driveLink: 'https://drive.google.com/file/d/15mZNetuj4XXb8LWPfCJr3CboI4wd-hsX/view?usp=drive_link' },
  
  // Philosophy
  { subject: 'Philosophy (දර්ශනය)', medium: 'English Medium', driveLink: 'https://drive.google.com/file/d/1rNh1BjJ0nRerKWXpKsIUHUfingRxjbRn/view?usp=drive_link' },
  { subject: 'Philosophy (දර්ශනය)', medium: 'Sinhala Medium', driveLink: 'https://drive.google.com/file/d/1-IQ2cwwhe8XggLYzkhrx1n5_m-Bqec5R/view?usp=drive_link' },
  
  // Political Science
  { subject: 'Political Science (දේශපාලන විද්‍යාව)', medium: 'English Medium', driveLink: 'https://drive.google.com/file/d/1GNwv3zU2ndJotNJ1L1TjJ_TIY8MnS1ZI/view?usp=drive_link' },
  { subject: 'Political Science (දේශපාලන විද්‍යාව)', medium: 'Sinhala Medium', driveLink: 'https://drive.google.com/file/d/1UXoq8AOPYu0A-j3nIacS2IfUOpz6HyI9/view?usp=drive_link' },
  
  // Social Work
  { subject: 'Social Work (සමාජ වැඩ)', medium: 'English Medium', driveLink: 'https://drive.google.com/file/d/1tCPVYlG32pxbOjIx81jpeoBdUThBAnhA/view?usp=drive_link' },
  { subject: 'Social Work (සමාජ වැඩ)', medium: 'Sinhala Medium', driveLink: 'https://drive.google.com/file/d/1Z_pVk78PuK6naTkdmgQjUsWV6KJ77cfm/view?usp=drive_link' },
  
  // Sociology
  { subject: 'Sociology (සමාජ විද්‍යාව)', medium: 'Download Note', driveLink: 'https://drive.google.com/file/d/197k9zEUmAYboRNHT1g-fJ7MF6_qyPjjf/view?usp=drive_link' },
];

async function addBAExternal() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI not found in environment variables');
    }
    
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    let added = 0;
    let skipped = 0;

    for (const courseData of baExternalCourses) {
      try {
        // Check if this exact combination already exists
        const existing = await BAExternal.findOne({
          subject: courseData.subject,
          medium: courseData.medium,
          driveLink: courseData.driveLink,
        });

        if (existing) {
          console.log(`Skipping duplicate: ${courseData.subject} - ${courseData.medium}`);
          skipped++;
          continue;
        }

        const course = new BAExternal({
          subject: courseData.subject,
          medium: courseData.medium,
          driveLink: courseData.driveLink,
        });

        await course.save();
        console.log(`✓ Added: ${courseData.subject} - ${courseData.medium}`);
        added++;
      } catch (error: any) {
        if (error.code === 11000) {
          console.log(`Skipping duplicate: ${courseData.subject} - ${courseData.medium}`);
          skipped++;
        } else {
          console.error(`Error adding ${courseData.subject}:`, error.message);
        }
      }
    }

    console.log('\n=== Summary ===');
    console.log(`Added: ${added} BA External courses`);
    console.log(`Skipped: ${skipped} duplicates`);
    console.log(`Total: ${baExternalCourses.length} courses`);
    
    process.exit(0);
  } catch (error: any) {
    console.error('Error:', error);
    process.exit(1);
  }
}

addBAExternal();


