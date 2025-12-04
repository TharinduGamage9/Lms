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
import BCom from '../models/BCom';

interface BComData {
  subject: string;
  driveLink: string;
  year: '1st Year' | '2nd Year' | '3rd Year' | '4th Year' | 'English Medium';
}

const bcomCourses: BComData[] = [
  // 1st Year
  { subject: 'ක්ෂුද්‍ර ආර්ථික විද්‍යාව (Microeconomics)', driveLink: 'https://drive.google.com/file/d/1ae8VH67ORDloaVIbpMHQxvKfE25-Y8FL/view?usp=drive_link', year: '1st Year' },
  { subject: 'තොරතුරු කළමනාකරණය (Information Management)', driveLink: 'https://drive.google.com/file/d/18Rhg7iamBpVTyfrNo__9CdtoA8XdbRCF/view?usp=drive_link', year: '1st Year' },
  { subject: 'මූල්‍ය ගිණුම්කරණය (Financial Accounting)', driveLink: 'https://drive.google.com/file/d/1OpN5r82WGcWAsHRqe-upWDgZZ0tfzygB/view?usp=drive_link', year: '1st Year' },
  { subject: 'කළමනාකරණ මූලධර්ම (Management Principles)', driveLink: 'https://drive.google.com/file/d/1rR_mOXwrDnn2hQVlRUmPzeziEznyPr-F/view?usp=drive_link', year: '1st Year' },
  { subject: 'ව්‍යවසායකත්වය (Entrepreneurship)', driveLink: 'https://drive.google.com/file/d/15EtihBAMt6o_bcWMYEdhmSSiGYnk1VGH/view?usp=drive_link', year: '1st Year' },
  { subject: 'ව්‍යාපාර ගණිතය (Business Mathematics)', driveLink: 'https://drive.google.com/file/d/13hbNNpGzYZbmKs5VZTfbiuiKhZN6Xc7B/view?usp=drive_link', year: '1st Year' },
  { subject: 'ව්‍යාපාර සන්නිවේදනය සඳහා ඉංග්‍රීසි (English for Business Communication)', driveLink: 'https://drive.google.com/file/d/1OH4rO8SjCnqvKKmY6ApBpvpQ5js_chd5/view?usp=drive_link', year: '1st Year' },
  
  // 2nd Year
  { subject: 'අලෙවි කළමණාකරණය (Marketing Management)', driveLink: 'https://drive.google.com/file/d/1BzJ8fWBcVIyCxsc_P_JKNhZHsWDNLWaQ/view?usp=drive_link', year: '2nd Year' },
  { subject: 'පිරිවැය සහ කළමනාකරණ ගිණුම්කරණය (Cost & Management Accounting)', driveLink: 'https://drive.google.com/file/d/1GTP6mcEYtTfqRGKSIXsRGeZAJxHPy3ta/view?usp=drive_link', year: '2nd Year' },
  { subject: 'මානව සම්පත් කළමනාකරණය (Human Resource Management)', driveLink: 'https://drive.google.com/file/d/10i2KxcSiPxceIXophf7hc9xMHkSrTtax/view?usp=drive_link', year: '2nd Year' },
  { subject: 'ව්‍යාපාර සංඛ්‍යානය (Business Statistics)', driveLink: 'https://drive.google.com/file/d/1JZd6DqWghuFgn_R5LqK0VApgwdCnD1mQ/view?usp=drive_link', year: '2nd Year' },
  { subject: 'සංවිධාන චර්යාව (Organizational Behavior)', driveLink: 'https://drive.google.com/file/d/12LXkvmUwoyr6AN1JB46SNGz9WM8duxOu/view?usp=drive_link', year: '2nd Year' },
  { subject: 'සාර්ව ආර්ථික විද්‍යාව (Macroeconomics)', driveLink: 'https://drive.google.com/file/d/1KhV-mbTPTasNpki0qFK_1Ea294BG1uui/view?usp=drive_link', year: '2nd Year' },
  
  // 3rd Year
  { subject: 'පර්යේෂණ ක්‍රමවේදය (Research Methodology)', driveLink: 'https://drive.google.com/file/d/1q2n2ck6ugCl9ze9-7yVMfdOWZh8NkdBk/view?usp=drive_link', year: '3rd Year' },
  { subject: 'මූල්‍ය කළමනාකරණය (Financial Management)', driveLink: 'https://drive.google.com/file/d/1m5_47Y1Wj_2vKwIHQRDaZ93MaVlMd24Z/view?usp=drive_link', year: '3rd Year' },
  { subject: 'මෙහෙයුම් සහ සැපයුම් දාම කළමනාකරණය (Operations & Supply Chain Management)', driveLink: 'https://drive.google.com/file/d/1TwbQ9iMkJiB7JOtxtJEaxsP2PihIgrPw/view?usp=drive_link', year: '3rd Year' },
  { subject: 'විගණනය සහ සහතිකකරණය (Auditing & Assurance)', driveLink: 'https://drive.google.com/file/d/1TUoPiEwuftqPuWi5Bj9Yl0kjKkhaYSMm/view?usp=drive_link', year: '3rd Year' },
  { subject: 'ව්‍යාපාර හා ආයතනික නීතිය (Business & Corporate Law)', driveLink: 'https://drive.google.com/file/d/11kn2XbiGqIee2sEg8vH5obAlobELM9PB/view?usp=drive_link', year: '3rd Year' },
  { subject: 'ශ්‍රී ලංකාවේ බදුකරණය (Taxation in Sri Lanka)', driveLink: 'https://drive.google.com/file/d/1it_iKzS7hgCFY-V3F_fqj_DXz8yp1XBF/view?usp=drive_link', year: '3rd Year' },
  
  // 4th Year
  { subject: 'උපායමාර්ගික කළමනාකරණය (Strategic Management)', driveLink: 'https://drive.google.com/file/d/13R8jlWvXV9Q3moPpQnxEOcvvKHIDCN00/view?usp=drive_link', year: '4th Year' },
  { subject: 'සංවර්ධන ආර්ථික විද්‍යාව (Development Economics)', driveLink: 'https://drive.google.com/file/d/1nUy-Tkb1jJ7lkgDdEVAFqOPYpUPexLB3/view?usp=drive_link', year: '4th Year' },
  
  // English Medium
  { subject: 'English Medium Notes', driveLink: 'https://drive.google.com/drive/folders/1Fck7TO2h-j1EX1aOF_1xEUISSehFUwSf?usp=drive_link', year: 'English Medium' },
];

async function addBCom() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI not found in environment variables');
    }
    
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    let added = 0;
    let skipped = 0;

    for (const courseData of bcomCourses) {
      try {
        // Check if this exact combination already exists
        const existing = await BCom.findOne({
          subject: courseData.subject,
          driveLink: courseData.driveLink,
          year: courseData.year,
        });

        if (existing) {
          console.log(`Skipping duplicate: ${courseData.subject} (${courseData.year})`);
          skipped++;
          continue;
        }

        const course = new BCom({
          subject: courseData.subject,
          driveLink: courseData.driveLink,
          year: courseData.year,
        });

        await course.save();
        console.log(`✓ Added: ${courseData.subject} (${courseData.year})`);
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
    console.log(`Added: ${added} B Com courses`);
    console.log(`Skipped: ${skipped} duplicates`);
    console.log(`Total: ${bcomCourses.length} courses`);
    
    process.exit(0);
  } catch (error: any) {
    console.error('Error:', error);
    process.exit(1);
  }
}

addBCom();

