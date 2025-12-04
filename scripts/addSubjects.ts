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

interface SubjectLink {
  subject: string;
  driveLink: string;
  level: 'OL' | 'AL';
  grade?: string;
}

const subjects: SubjectLink[] = [
  // Main Subjects - History
  { subject: 'ඉතිහාසය (History)', driveLink: 'https://drive.google.com/file/d/1QAXZRjUuj_MP79e27p0501nXjbEo4iZO/view?usp=drive_link', level: 'OL', grade: '10' },
  { subject: 'ඉතිහාසය (History)', driveLink: 'https://drive.google.com/file/d/16urhn8DzK72gJLRIll2MmHDA_VZaTRdU/view?usp=drive_link', level: 'OL', grade: '11' },
  { subject: 'ඉතිහාසය (History)', driveLink: 'https://drive.google.com/drive/folders/13ACyjyu9gHQVmJMCaTt2vaXEgDFhGUp2?usp=drive_link', level: 'OL', grade: '11' },
  
  // Main Subjects - Maths
  { subject: 'ගණිතය (Maths)', driveLink: 'https://drive.google.com/file/d/1SD8qUq5lrpKhy_cuBYF4yqbqgnYoPrzX/view?usp=drive_link', level: 'OL', grade: '10' },
  { subject: 'ගණිතය (Maths)', driveLink: 'https://drive.google.com/file/d/1tqTc5xbxX3okhcgzrwzQxUM53CuVMjql/view?usp=drive_link', level: 'OL', grade: '11' },
  { subject: 'ගණිතය (Maths)', driveLink: 'https://drive.google.com/drive/folders/1ccS7uKaeu4Ni4oxfCL7bsA2BPIcDrGyy?usp=drive_link', level: 'OL', grade: '11' },
  
  // Main Subjects - Science
  { subject: 'විද්‍යාව (Science)', driveLink: 'https://drive.google.com/file/d/1tqTc5xbxX3okhcgzrwzQxUM53CuVMjql/view?usp=drive_link', level: 'OL', grade: '10' },
  { subject: 'විද්‍යාව (Science)', driveLink: 'https://drive.google.com/file/d/1jMobtS8g7zyj_tn7w4i1wy8l7InEnpqv/view?usp=drive_link', level: 'OL', grade: '11' },
  
  // Languages
  { subject: 'සිංහල සාහිත්‍ය (Sinhala Literature)', driveLink: 'https://drive.google.com/file/d/1LHEwLN4OdvTZlXdZBkuEU-o4buaAJOKp/view?usp=drive_link', level: 'OL' },
  { subject: 'සිංහල ව්‍යාකරණ (Sinhala Grammar)', driveLink: 'https://drive.google.com/file/d/1SSo3igR36qoLy2TnOZKm-vcpDyEQQz-E/view?usp=drive_link', level: 'OL' },
  { subject: 'දෙවන බස (දෙමළ) (Second Language Tamil)', driveLink: 'https://drive.google.com/file/d/1EpAsLcekEwocfipHi4OgRPSz2oURhlyp/view?usp=drive_link', level: 'OL' },
  { subject: 'දෙවන බස (දෙමළ) (Second Language Tamil)', driveLink: 'https://drive.google.com/drive/folders/1IqYNiO90_tGAXU1IAIr4Aw6f2vl2HKKR?usp=drive_link', level: 'OL' },
  { subject: 'ඉංග්‍රීසි (English)', driveLink: 'https://drive.google.com/file/d/1FxMRO0_2CzLhhbS3phOSuc5bnnkYhs6s/view?usp=drive_link', level: 'OL' },
  { subject: 'ඉංග්‍රීසි (English)', driveLink: 'https://drive.google.com/drive/folders/1OV85u5KqXmhUadl0pvTpgehAPRqJEP0K?usp=drive_link', level: 'OL' },
  
  // Religious Subjects
  { subject: 'බුද්ධ ධර්මය (Buddhism)', driveLink: 'https://drive.google.com/file/d/12XGqMP6VYNjmAhP-vqkfQcXHqvpUId14/view?usp=drive_link', level: 'OL' },
  { subject: 'ක්‍රිස්තියානි ධර්මය (Christianity)', driveLink: 'https://drive.google.com/file/d/1wjFQWqXP29rla3rcIZ-SSHR8QWAZirED/view?usp=drive_link', level: 'OL' },
  { subject: 'කතෝලික දහම (Catholic)', driveLink: 'https://drive.google.com/file/d/1CTyd-kZtNfSmlU12spOENtI41LDPnT1a/view?usp=drive_link', level: 'OL' },
  { subject: 'කතෝලික දහම (Catholic)', driveLink: 'https://drive.google.com/drive/folders/11i-Qid2iiGgZRxWWIxJCe3_KJf91eyhH?usp=drive_link', level: 'OL' },
  { subject: 'හින්දු දහම (Hinduism)', driveLink: 'https://drive.google.com/file/d/1hF7vs5Qy9j0hEfWtu-q6LH80Al7wmY7i/view?usp=drive_link', level: 'OL' },
  { subject: 'ඉස්ලාම් දහම (Islam)', driveLink: 'https://drive.google.com/file/d/1Ah0XQkFE6R6RFcYKfJw9lTEZZ36xJIaS/view?usp=drive_link', level: 'OL' },
  
  // Basket Subjects
  { subject: 'ICT (තොරතුරු තාක්ෂණය)', driveLink: 'https://drive.google.com/file/d/1GvSZcaB8WkUj7Oeaaz5MQrDFYbQHYQek/view?usp=drive_link', level: 'OL' },
  { subject: 'භූගෝල විද්‍යාව (Geography)', driveLink: 'https://drive.google.com/file/d/1X4a-MnHIyJ0AZQONyzPj8RfXrsKO8HR8/view?usp=drive_link', level: 'OL' },
  { subject: 'ව්‍යාපාර හා ගිණුම්කරණය (Commerce)', driveLink: 'https://drive.google.com/file/d/1AboK7fk1Cl9dpN2sFAV7ce4G_oakxDp3/view?usp=drive_link', level: 'OL' },
  { subject: 'පුරවැසි අධ්‍යාපනය (Civics)', driveLink: 'https://drive.google.com/file/d/1eo6vOsAJeO8kk0UlO8g63v_lLhbZSLAm/view?usp=drive_link', level: 'OL' },
  { subject: 'සෞඛ්‍ය හා ශාරීරික අධ්‍යාපනය (Health)', driveLink: 'https://drive.google.com/file/d/1ZkYlp4RVrKBZ0uBWxXgYmJTFfp4XWusi/view?usp=drive_link', level: 'OL' },
  { subject: 'ඇග්‍රි (Agriculture)', driveLink: 'https://drive.google.com/drive/folders/1cNnFwaoJN6QWqvUYfpcTKn_nzsN4oEbG?usp=drive_link', level: 'OL' },
  { subject: 'හෝම් සයන්ස් (Home Science)', driveLink: 'https://drive.google.com/drive/folders/1EIomihc6-nt4CpNFfHf7u7n0jdn3bBNK?usp=drive_link', level: 'OL' },
  { subject: 'Art', driveLink: 'https://drive.google.com/drive/folders/18l31KSsiYwi_dhJMnQNZ5UCcJMAnXFQz?usp=drive_link', level: 'OL' },
  { subject: 'Dancing', driveLink: 'https://drive.google.com/drive/folders/1X6nfaEves8oVEMWteUPToRVK2DFOoCQP?usp=drive_link', level: 'OL' },
  { subject: 'Drama', driveLink: 'https://drive.google.com/drive/folders/1-APqMXkAFT3SjbfS7B603yAkXwn8j85f?usp=drive_link', level: 'OL' },
  { subject: 'Eastern Music', driveLink: 'https://drive.google.com/drive/folders/1c_nd7VssHfqGTFjX4cjFTxxE4w-_hmUm?usp=drive_link', level: 'OL' },
  { subject: 'English Medium', driveLink: 'https://drive.google.com/drive/folders/1lUPdlgSkMob_kVb4BX3ssByFqYDcBoxA?usp=drive_link', level: 'OL' },
];

async function addSubjects() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI not found in environment variables');
    }
    
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    let added = 0;
    let skipped = 0;

    for (const subjectData of subjects) {
      try {
        // Check if this exact combination already exists
        const existing = await Note.findOne({
          subject: subjectData.subject,
          driveLink: subjectData.driveLink,
          level: subjectData.level,
        });

        if (existing) {
          console.log(`Skipping duplicate: ${subjectData.subject} - ${subjectData.driveLink.substring(0, 50)}...`);
          skipped++;
          continue;
        }

        const note = new Note({
          subject: subjectData.subject,
          driveLink: subjectData.driveLink,
          level: subjectData.level,
        });

        await note.save();
        console.log(`✓ Added: ${subjectData.subject}${subjectData.grade ? ` (Grade ${subjectData.grade})` : ''}`);
        added++;
      } catch (error: any) {
        if (error.code === 11000) {
          console.log(`Skipping duplicate: ${subjectData.subject}`);
          skipped++;
        } else {
          console.error(`Error adding ${subjectData.subject}:`, error.message);
        }
      }
    }

    console.log('\n=== Summary ===');
    console.log(`Added: ${added} notes`);
    console.log(`Skipped: ${skipped} duplicates`);
    console.log(`Total: ${subjects.length} subjects`);
    
    process.exit(0);
  } catch (error: any) {
    console.error('Error:', error);
    process.exit(1);
  }
}

addSubjects();


