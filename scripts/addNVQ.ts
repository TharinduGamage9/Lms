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
import NVQ from '../models/NVQ';

interface NVQData {
  subject: string;
  driveLink: string;
  category: string;
}

const nvqCourses: NVQData[] = [
  // ICT
  { subject: 'ICT Technician', driveLink: 'https://drive.google.com/drive/folders/1xL9ZRN8rveg3M7ox3e1qloz4gthdA8pv?usp=drive_link', category: 'ICT' },
  { subject: 'Computer Hardware Technician', driveLink: 'https://drive.google.com/drive/folders/1y-F2iq9e0AIHyGbIfxPAryeYgjvUnM3M?usp=drive_link', category: 'ICT' },
  { subject: 'Network Technician / Network Administrator', driveLink: 'https://drive.google.com/drive/folders/1sMy-bNPOltnr0c0cbq-c1bn7AW1C44ge?usp=drive_link', category: 'ICT' },
  { subject: 'Software Developer', driveLink: 'https://drive.google.com/drive/folders/1I0tQsdip3BATB2VbbYD2YFk1zqV1Y37j?usp=drive_link', category: 'ICT' },
  { subject: 'Web Designer / Web Developer', driveLink: 'https://drive.google.com/drive/folders/1OITPGlI_W85mT9Xykw8sIV3fLa-KiQ_A?usp=drive_link', category: 'ICT' },
  { subject: 'Computer Graphic Designer', driveLink: 'https://drive.google.com/drive/folders/1FW5f_-copT0UBdjL2JXTM6LudUgg1w9R?usp=drive_link', category: 'ICT' },
  { subject: 'Cyber Security', driveLink: 'https://drive.google.com/drive/folders/11Cyj2IJZU2TCpWa7Zm9ZthF9Sqp7PAHc?usp=drive_link', category: 'ICT' },
  { subject: 'Computer Application Assistant', driveLink: 'https://drive.google.com/drive/folders/16kF0jO9df_ouv2sL3OtC_X2J9aJ3tbrV?usp=drive_link', category: 'ICT' },
  
  // Construction & Engineering Technology
  { subject: 'Quantity Surveying', driveLink: 'https://drive.google.com/file/d/1TXRrdC2495pvvCEwRDFAg_DU6MoGFqKQ/view?usp=drive_link', category: 'Construction & Engineering Technology' },
  { subject: 'Construction Technology (Masonry, Tiling, etc.)', driveLink: 'https://drive.google.com/file/d/1WwncqcYy7v3JjU5BwEsxVAb7brohL8oi/view?usp=drive_link', category: 'Construction & Engineering Technology' },
  { subject: 'Draughtsperson (AutoCAD)', driveLink: 'https://drive.google.com/file/d/19daKoYgvllm46MPnJl7b2M9233Ym3cGF/view?usp=drive_link', category: 'Construction & Engineering Technology' },
  { subject: 'Welding Technology', driveLink: 'https://drive.google.com/file/d/1h7E9EAeMv5gS_kHTsXP8yb_nH2jnMADb/view?usp=drive_link', category: 'Construction & Engineering Technology' },
  { subject: 'Electrician (Domestic & Industrial)', driveLink: 'https://drive.google.com/file/d/10_wKQKqsrqX_fou9edlFuoHEaTt-heoe/view?usp=drive_link', category: 'Construction & Engineering Technology' },
  { subject: 'Plumbing', driveLink: 'https://drive.google.com/file/d/1gr-MF0uBuLEkxA8zREPsunrP2W-L7HD3/view?usp=drive_link', category: 'Construction & Engineering Technology' },
  { subject: 'Refrigeration & Air Conditioning (RAC)', driveLink: 'https://drive.google.com/file/d/1PxVrUxNM0t6vLczYLW41ynb5LBH_Ni6H/view?usp=drive_link', category: 'Construction & Engineering Technology' },
  { subject: 'Aluminium Fabricator', driveLink: 'https://drive.google.com/file/d/1Owih1pFQTnCmmIigi_99MUNbnilNEY3v/view?usp=drive_link', category: 'Construction & Engineering Technology' },
  { subject: 'Machinist (Turner, Miller)', driveLink: 'https://drive.google.com/file/d/1ZuFd10V0JjWllkhe4-EjscZTQg2Dh0N4/view?usp=drive_link', category: 'Construction & Engineering Technology' },
  
  // Automotive Technology
  { subject: 'Automobile Mechanic', driveLink: 'https://drive.google.com/file/d/1I6O8gcnKN0UQCjRSHB48ArubgvkjLES3/view?usp=drive_link', category: 'Automotive Technology' },
  { subject: 'Automobile Electrician / Auto Electrical', driveLink: 'https://drive.google.com/file/d/11TBI1ZpKapPsO-CEmbQRldXzEryMtwLS/view?usp=drive_link', category: 'Automotive Technology' },
  { subject: 'Outboard Motor Technician', driveLink: 'https://drive.google.com/file/d/1-6Yz_3-s1kS31t2AhMA4TY-NrWKMumYd/view?usp=drive_link', category: 'Automotive Technology' },
  { subject: 'Hybrid Vehicle Technology', driveLink: 'https://drive.google.com/file/d/1Ic6MvBa_6CRzj6EDaR5jTiFJVQOgf2Jc/view?usp=drive_link', category: 'Automotive Technology' },
  
  // Hospitality & Tourism
  { subject: 'Hospitality Management', driveLink: 'https://drive.google.com/file/d/1myLct4TpnNjsezLKW8heTxpeE4rdI4k8/view?usp=drive_link', category: 'Hospitality & Tourism' },
  { subject: 'Hotel Housekeeping', driveLink: 'https://drive.google.com/file/d/1Hp4Ow-UHEy6p6qRMAApeGPCkTwS9U4f-/view?usp=drive_link', category: 'Hospitality & Tourism' },
  { subject: 'Front Office Operations', driveLink: 'https://drive.google.com/file/d/1Hiq6pdLt1EN_PBlXg0s5k9ULPXKIMYAq/view?usp=drive_link', category: 'Hospitality & Tourism' },
  { subject: 'Professional Cookery (Chef)', driveLink: 'https://drive.google.com/file/d/1R04pTjPRNWztY0NuxN_IEnlTIRiwAueu/view?usp=drive_link', category: 'Hospitality & Tourism' },
  { subject: 'Pastry & Bakery', driveLink: 'https://drive.google.com/file/d/1wz8gOALDUlsJ7mkiPTmjEiEgPxKzKZL8/view?usp=drive_link', category: 'Hospitality & Tourism' },
  { subject: 'Food & Beverage Service', driveLink: 'https://drive.google.com/file/d/10n-sLjIxHVx5Erean1rQRw-DT2jrZ3dW/view?usp=drive_link', category: 'Hospitality & Tourism' },
  { subject: 'Travel & Tour Management', driveLink: 'https://drive.google.com/file/d/1UW16Zv8E34V6A6YCZOG1zwaOovmEsl1Z/view?usp=drive_link', category: 'Hospitality & Tourism' },
  
  // Healthcare & Social Care
  { subject: 'Nursing (Higher Diploma)', driveLink: 'https://drive.google.com/drive/folders/1Q3ZM_LHWgjJyxuL09Yy4bAyuT2IUDKa7?usp=drive_link', category: 'Healthcare & Social Care' },
  { subject: 'Caregiver (Aged & Special Needs Care)', driveLink: 'https://drive.google.com/file/d/1SMSVava3to3I49jbtvdvwolbEXW3wcNM/view?usp=drive_link', category: 'Healthcare & Social Care' },
  { subject: 'Nurse Assistant', driveLink: 'https://drive.google.com/file/d/11OYuafCo-D9r_nGBOztbvmhm43UQRPmE/view?usp=drive_link', category: 'Healthcare & Social Care' },
];

async function addNVQ() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI not found in environment variables');
    }
    
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    let added = 0;
    let skipped = 0;

    for (const courseData of nvqCourses) {
      try {
        // Check if this exact combination already exists
        const existing = await NVQ.findOne({
          subject: courseData.subject,
          driveLink: courseData.driveLink,
          category: courseData.category,
        });

        if (existing) {
          console.log(`Skipping duplicate: ${courseData.subject}`);
          skipped++;
          continue;
        }

        const course = new NVQ({
          subject: courseData.subject,
          driveLink: courseData.driveLink,
          category: courseData.category,
        });

        await course.save();
        console.log(`✓ Added: ${courseData.subject} (${courseData.category})`);
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
    console.log(`Added: ${added} NVQ courses`);
    console.log(`Skipped: ${skipped} duplicates`);
    console.log(`Total: ${nvqCourses.length} courses`);
    
    process.exit(0);
  } catch (error: any) {
    console.error('Error:', error);
    process.exit(1);
  }
}

addNVQ();

