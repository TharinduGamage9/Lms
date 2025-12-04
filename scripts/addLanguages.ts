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
import Language from '../models/Language';

interface LanguageData {
  subject: string;
  driveLink: string;
}

const languages: LanguageData[] = [
  { subject: 'Arabic (අරාබි)', driveLink: 'https://drive.google.com/drive/folders/19P4ypA73gMyTtP4yIc1vp6S9vfudAJIk?usp=drive_link' },
  { subject: 'Chinese (චීන)', driveLink: 'https://drive.google.com/drive/folders/1TjY000qMNL6dI2xGed8j_B5a0jPVZYcI?usp=drive_link' },
  { subject: 'Danish (ඩැනිෂ්)', driveLink: 'https://drive.google.com/drive/folders/1QhDRtlJ4AmvgalqlEPqj_NvjdWaSDFuH?usp=drive_link' },
  { subject: 'Dutch (ඩච්)', driveLink: 'https://drive.google.com/drive/folders/1DGmk7lNIP7XwghfD-OoXkZ4Bud15xjRH?usp=drive_link' },
  { subject: 'English (ඉංග්‍රීසි)', driveLink: 'https://drive.google.com/drive/folders/1dUlITPyovuUeCdF0s07MRu8x6XvP53w1?usp=drive_link' },
  { subject: 'English Literature (ඉංග්‍රීසි සාහිත්‍යය)', driveLink: 'https://drive.google.com/drive/folders/1FecJVgWaj4-S0z1xmcOuw33DOACxiid3?usp=drive_link' },
  { subject: 'Finnish (ෆිනිෂ්)', driveLink: 'https://drive.google.com/drive/folders/1YzGkpXkvp14UOEYHc0TKV7zQZ07-wqDL?usp=drive_link' },
  { subject: 'French (ප්‍රංශ)', driveLink: 'https://drive.google.com/drive/folders/1GPkmN8LRWDTC7IUgdew8b6NMtptqJFJQ?usp=drive_link' },
  { subject: 'German (ජර්මන්)', driveLink: 'https://drive.google.com/drive/folders/16CLr9s_-f2pHeNe_e0tNX-GsuuhDGhmF?usp=drive_link' },
  { subject: 'Greek (ග්‍රීක)', driveLink: 'https://drive.google.com/drive/folders/1v9ou7oOdtaCK5c3cv8l6tYSwTIsyAITM?usp=drive_link' },
  { subject: 'IELTS', driveLink: 'https://drive.google.com/drive/folders/1EMrNGOUCwVnvj3aZdqNepEsync4Xf42X?usp=drive_link' },
  { subject: 'Italian (ඉතාලි)', driveLink: 'https://drive.google.com/drive/folders/1s9x5K4fQS3951bpwVQZeHIbYkGNRoXmL?usp=drive_link' },
  { subject: 'Japanese (ජපන්)', driveLink: 'https://drive.google.com/drive/folders/1j0FpAfEifAI8HKUxwehz7Sq09Z3gqe3y?usp=drive_link' },
  { subject: 'Korean (කොරියන්)', driveLink: 'https://drive.google.com/drive/folders/1BEj5IO0-sP2XGGcjQDzCTUUONLwBmLAq?usp=drive_link' },
  { subject: 'Norwegian (නෝර්වීජියානු)', driveLink: 'https://drive.google.com/drive/folders/1CK3WFLWlGph7DX4i1zO9GsNFmCarRC0v?usp=drive_link' },
  { subject: 'Portuguese (පෘතුගීසි)', driveLink: 'https://drive.google.com/drive/folders/19AL5Dc9DR1uSMPnUrtRR-lxAGPmJBT-p?usp=drive_link' },
  { subject: 'Russian (රුසියානු)', driveLink: 'https://drive.google.com/drive/folders/1Dyvlo_QM79_34LqF7h1i_n4l8e_HC82_?usp=drive_link' },
  { subject: 'Sign Language (සංඥා භාෂාව)', driveLink: 'https://drive.google.com/drive/folders/1atgM_eFlETlk8KFKZIbiE9k3iS552Gxh?usp=drive_link' },
  { subject: 'Spanish (ස්පාඤ්ඤ)', driveLink: 'https://drive.google.com/drive/folders/1a8B6VZu5UMi9w8ETuPW4_BblIf5bso7q?usp=drive_link' },
  { subject: 'Swedish (ස්වීඩන්)', driveLink: 'https://drive.google.com/drive/folders/1ejNizSRdzMoFHxeFoyPaDiptlYWNIlVz?usp=drive_link' },
  { subject: 'Thai (තායි)', driveLink: 'https://drive.google.com/drive/folders/18icd3LEnX9hHVDIcrqLFiFFpL5Ms8kBy?usp=drive_link' },
  { subject: 'Turkish (තුර්කි)', driveLink: 'https://drive.google.com/drive/folders/1GJm7iudqcffLel8a7qkpLOzid9m8gp5G?usp=drive_link' },
  { subject: 'Writing & Communication', driveLink: 'https://drive.google.com/drive/folders/1TBzkIPKtc0S9kGi4FdLrmGcqYrIV5ydU?usp=drive_link' },
];

async function addLanguages() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI not found in environment variables');
    }
    
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    let added = 0;
    let skipped = 0;

    for (const languageData of languages) {
      try {
        // Check if this exact combination already exists
        const existing = await Language.findOne({
          subject: languageData.subject,
          driveLink: languageData.driveLink,
        });

        if (existing) {
          console.log(`Skipping duplicate: ${languageData.subject}`);
          skipped++;
          continue;
        }

        const language = new Language({
          subject: languageData.subject,
          driveLink: languageData.driveLink,
        });

        await language.save();
        console.log(`✓ Added: ${languageData.subject}`);
        added++;
      } catch (error: any) {
        if (error.code === 11000) {
          console.log(`Skipping duplicate: ${languageData.subject}`);
          skipped++;
        } else {
          console.error(`Error adding ${languageData.subject}:`, error.message);
        }
      }
    }

    console.log('\n=== Summary ===');
    console.log(`Added: ${added} languages`);
    console.log(`Skipped: ${skipped} duplicates`);
    console.log(`Total: ${languages.length} languages`);
    
    process.exit(0);
  } catch (error: any) {
    console.error('Error:', error);
    process.exit(1);
  }
}

addLanguages();


