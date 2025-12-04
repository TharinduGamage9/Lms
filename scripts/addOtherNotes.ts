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
import OtherNote from '../models/OtherNote';

interface OtherNoteData {
  subject: string;
  driveLink: string;
}

const otherNotes: OtherNoteData[] = [
  { subject: 'Agriculture', driveLink: 'https://drive.google.com/drive/folders/1JMcqka3xtrtWnCMrNyhivlnTLuahZDH_?usp=drive_link' },
  { subject: 'Anthropology', driveLink: 'https://drive.google.com/drive/folders/14xE8z2O7TmRjlpChCBpwDEGLwwRSloC5?usp=drive_link' },
  { subject: 'Buddhist Psychology', driveLink: 'https://drive.google.com/drive/folders/1y5TK0OEbGSIFBcdRjuFbwYTM9Ke6wDs3?usp=drive_link' },
  { subject: 'Digital Marketing', driveLink: 'https://drive.google.com/drive/folders/1q1YjB75h24s2uZM8Fjusq7BeVRwdZRzR?usp=drive_link' },
  { subject: 'TESL', driveLink: 'https://drive.google.com/drive/folders/1IRFP8DyDxk08yXXicof8i414x4qQ_YGL?usp=drive_link' },
  { subject: 'Fashion Design', driveLink: 'https://drive.google.com/drive/folders/1RqZ1CI1LB1Qa3myaKdqaGBcWOa7LXfAk?usp=drive_link' },
  { subject: 'Fiverr', driveLink: 'https://drive.google.com/drive/folders/1ObNxKZkAWCq_90Jbe36dX3qFDQJE-exQ?usp=drive_link' },
  { subject: 'Entrepreneur', driveLink: 'https://drive.google.com/drive/folders/1c2EcrwvCzjKnop0OKTbQCxn6vGhKf_dG?usp=drive_link' },
  { subject: 'India History', driveLink: 'https://drive.google.com/drive/folders/1LP6NCxNasQRb_3fgSpOuHqsZjv0BlEyf?usp=drive_link' },
  { subject: 'Indesign', driveLink: 'https://drive.google.com/drive/folders/1gIOIB0Lsz1sUGzMomctOhpv2Gima5f5g?usp=drive_link' },
  { subject: 'Molecular Biology', driveLink: 'https://drive.google.com/drive/folders/1UIoo5qZoUKapo98qdP19KmJZGUWsfe8z?usp=drive_link' },
  { subject: 'Primary Education', driveLink: 'https://drive.google.com/drive/folders/1PsM_V4jw3vHOT0gSCDmBM_mcMnX4zmlR?usp=drive_link' },
  { subject: 'Project Management', driveLink: 'https://drive.google.com/drive/folders/1WGpm9oudACkAmSazEKsx7-zZuOiPUbGq?usp=drive_link' },
  { subject: 'AAT', driveLink: 'https://drive.google.com/open?id=1laLZ2p4doTJwiSn49LQzgiPUE7A8b2-1&usp=drive_copy' },
  { subject: 'Accounting', driveLink: 'https://drive.google.com/drive/folders/1-O1FT1xIzwFL2ZCMis49wVyFKQC3-oP6?usp=drive_link' },
  { subject: 'Agriculture', driveLink: 'https://drive.google.com/drive/folders/1nnq8OuBBDITeIWrfQQ5CQSSFIiffMIB5?usp=drive_link' },
  { subject: 'English', driveLink: 'https://drive.google.com/drive/folders/1O5-pm2Um9R9P7-hwS6Ub6IugT6cIOvoT?usp=drive_link' },
  { subject: 'Economics', driveLink: 'https://drive.google.com/drive/folders/1_6vlnGTO_3Io80dPLcNDqxlFbF1NdxPh?usp=drive_link' },
  { subject: 'General Test', driveLink: 'https://drive.google.com/drive/folders/1oezlsPt5gvzy_t6kskts00SsUDXb079w?usp=drive_link' },
  { subject: 'Science', driveLink: 'https://drive.google.com/drive/folders/1HBM9q-LvgTcilmyRg-1Ur-DbXpusSlOm?usp=drive_link' },
  { subject: 'Data Analysis', driveLink: 'https://drive.google.com/drive/folders/1n5oyxgIv5u-lEXIN7nf_Okgczxs4w8G-?usp=drive_link' },
  { subject: 'Anthropology', driveLink: 'https://drive.google.com/drive/folders/1SUNKyWUAzciBs6GU5XE1Z7qLT8HrcAZ0?usp=drive_link' },
  { subject: 'Archaeology', driveLink: 'https://drive.google.com/drive/folders/1ju5Zmjv0RJNwQKLqq9AZChnCYnu0uYdJ?usp=drive_link' },
  { subject: 'Basic Computer', driveLink: 'https://drive.google.com/drive/folders/1DoR3hrAGUouHq6r7ccZ19oi22F8BkoTY?usp=drive_link' },
  { subject: 'Basic ICT', driveLink: 'https://drive.google.com/drive/folders/1mVL-FZ4tJy8XMADQH5ycYpM4ajni6hXm?usp=drive_link' },
  { subject: 'Bio Psychology', driveLink: 'https://drive.google.com/drive/folders/12KOZ5E9XUs8i-vlhViZYDbcJgeE6eVw3?usp=drive_link' },
  { subject: 'බුද්ධ දර්ශනය (Buddhist Philosophy)', driveLink: 'https://drive.google.com/drive/folders/1x4e0CU4aZ-7Md_Xvio1yKcGIfKnBoV_h?usp=drive_link' },
  { subject: 'බුදු දහම (Buddhism)', driveLink: 'https://drive.google.com/drive/folders/1pIqNAqtdLFcdK_1GgSM6ns50ie1gKsix?usp=drive_link' },
  { subject: 'Criminology', driveLink: 'https://drive.google.com/drive/folders/1mifmwvR9AO2ENSoVudhc0wAHt_z1fpX3?usp=drive_link' },
  { subject: 'Business Studies', driveLink: 'https://drive.google.com/drive/folders/11F_mLPWZrKf1rvS8OviRBW3BAWW3adSB?usp=drive_link' },
  { subject: 'BIT', driveLink: 'https://drive.google.com/open?id=1OZcRP5mlQ_TMMiDlxNWA93VV5ODz2kod&usp=drive_copy' },
  { subject: 'BST', driveLink: 'https://drive.google.com/drive/folders/1yoGexkM9eQslFzUDb5EddorZw-SqlC-w?usp=drive_link' },
  { subject: 'IQ & GK', driveLink: 'https://drive.google.com/drive/folders/18lI-sfvX2stJ5CovVY_UySxjqBYIrdE9?usp=drive_link' },
  { subject: 'Business Management', driveLink: 'https://drive.google.com/drive/folders/1prmV3x3tpZ_jYaKtHI1EddVum8TDWNzT?usp=drive_link' },
  { subject: 'Business Studies', driveLink: 'https://drive.google.com/open?id=11F_mLPWZrKf1rvS8OviRBW3BAWW3adSB&usp=drive_copy' },
  { subject: 'CA', driveLink: 'https://drive.google.com/drive/folders/1Qgljk3HqcD4TegM65fiZt9CCVvW_agnq?usp=drive_link' },
  { subject: 'Chemistry', driveLink: 'https://drive.google.com/drive/folders/1Zmy_K5NFCx5DU2F3AkG551xxLwinxXz2?usp=drive_link' },
  { subject: 'Christianity', driveLink: 'https://drive.google.com/drive/folders/11LxIIwMLI3EtZts8-J8RdqV_Se0Zmf4x?usp=drive_link' },
  { subject: 'Clinical Psychology', driveLink: 'https://drive.google.com/drive/folders/1imZQaQ7eDtDRv18sLX3Juh2ixg5coMWD?usp=drive_link' },
  { subject: 'Combined Maths', driveLink: 'https://drive.google.com/drive/folders/1Cm3wD7ziKPmNo5SxNQU1ZFeyP7eMbIWC?usp=drive_link' },
  { subject: 'Counseling', driveLink: 'https://drive.google.com/open?id=1VkTrV6hcMV2ImzKMT6uIp76isvi4kimO&usp=drive_copy' },
  { subject: 'Counseling', driveLink: 'https://drive.google.com/open?id=17GWxnY5lMn4NjiqRgldEVhxg6EZEk615&usp=drive_copy' },
  { subject: 'Counseling', driveLink: 'https://drive.google.com/open?id=1-UOkGv5oxmIZvJbY8nvkJcnaCHQ78-YW&usp=drive_copy' },
  { subject: 'International Relations', driveLink: 'https://drive.google.com/drive/folders/1vTgGn1ncqClBpAPJE8dCeL2SPsua2xCt?usp=drive_link' },
  { subject: 'Japanese', driveLink: 'https://drive.google.com/drive/folders/1CgGxebdb5AO2BghT2Rz37gphruaus0X4?usp=drive_link' },
  { subject: 'Law College Entrance Papers', driveLink: 'https://drive.google.com/drive/folders/1FOcwA9-BvZMLJN-cWLpyqF10U2nVIqQ1?usp=drive_link' },
  { subject: 'Management', driveLink: 'https://drive.google.com/drive/folders/1bqBC9QA6u4lmGxZy1L1YQvXs5XtKc52u?usp=drive_link' },
  { subject: 'Media Studies', driveLink: 'https://drive.google.com/drive/folders/1aiWtejG7bIwcYvwnMx-yJeLuq4o4XPHp?usp=drive_link' },
  { subject: 'Philosophy', driveLink: 'https://drive.google.com/drive/folders/1i2ztAVHKFyvaYeijCvpZ-iiEJmh8wKxz?usp=drive_link' },
  { subject: 'Photoshop', driveLink: 'https://drive.google.com/drive/folders/1F7rnprF4j4_rO_DBpkzPxhleq78vKAvH?usp=drive_link' },
  { subject: 'Political Science', driveLink: 'https://drive.google.com/drive/folders/1vl8yn08-KY_STHWY8OkdmOHtsx7rKDGM?usp=drive_link' },
  { subject: 'රේගු විභාගය (Customs Exam)', driveLink: 'https://drive.google.com/drive/folders/185joMfJD7aCDmdpo36wI2_y3q_7fGSbH?usp=drive_link' },
  { subject: 'Russian', driveLink: 'https://drive.google.com/drive/folders/1156ixEtEXnE5YxrzYpjKg-6L-q25zRYf?usp=drive_link' },
  { subject: 'Sexual Psychology', driveLink: 'https://drive.google.com/drive/folders/1Xd9bzpmnWr7bnOuDxzuvDgJPKbKomHGe?usp=drive_link' },
  { subject: 'Sociology', driveLink: 'https://drive.google.com/drive/folders/1vn_R66upX8yQUBjPRxw2f5WnayfNDQRr?usp=drive_link' },
  { subject: 'SPSS', driveLink: 'https://drive.google.com/drive/folders/1KK2Q8fMEY-UmdmSSL5COUS0bIP3ObByR?usp=drive_link' },
  { subject: 'Stress Management', driveLink: 'https://drive.google.com/drive/folders/1OIE85TfFxLo5l9RWb75ihh81hizNKqlL?usp=drive_link' },
  { subject: 'Tamil', driveLink: 'https://drive.google.com/drive/folders/1t1JfU0OsBcoYiLn2H9sG7XtkFo2Yhgmp?usp=drive_link' },
  { subject: 'Korean', driveLink: 'https://drive.google.com/drive/folders/1vSkkn2jkfCeh7ZPttAM4-OfdVXjW75pk?usp=drive_link' },
  { subject: 'Child Psychology', driveLink: 'https://drive.google.com/drive/folders/1PfNMMDsvDN1-HfQDudsPvAQKWQ2BSOx5?usp=drive_link' },
  { subject: 'Clinical Psychology', driveLink: 'https://drive.google.com/drive/folders/1imZQaQ7eDtDRv18sLX3Juh2ixg5coMWD?usp=drive_link' },
  { subject: 'Cognitive Psychology', driveLink: 'https://drive.google.com/drive/folders/1PFyoq8I3alf83dgF9V_8lTZ8hVfKuzTR?usp=drive_link' },
  { subject: 'Counseling', driveLink: 'https://drive.google.com/drive/folders/1PFyoq8I3alf83dgF9V_8lTZ8hVfKuzTR?usp=drive_link' },
  { subject: 'Cyber Security', driveLink: 'https://drive.google.com/drive/folders/16HZJQeaz97H6WDdGJ5Jic2oFxTkyTIfe?usp=drive_link' },
  { subject: 'First Aid', driveLink: 'https://drive.google.com/drive/folders/1MuoPGlDaUes5HesRt-gddzWTqTpNZpf5?usp=drive_link' },
  { subject: 'Forensic', driveLink: 'https://drive.google.com/drive/folders/16YypRVvaJPZ5xzm0srNThbjkcwfby-sj?usp=drive_link' },
  { subject: 'ගුරු විභාග (Teacher Exam)', driveLink: 'https://drive.google.com/drive/folders/1otToW_HYqY5y9TMvCWvTBwMkUePZNw2-?usp=drive_link' },
  { subject: 'Hindi', driveLink: 'https://drive.google.com/drive/folders/1O-g9-zzAKYjl2VAOu7Ap6hhgS703qzE1?usp=drive_link' },
  { subject: 'HRM', driveLink: 'https://drive.google.com/drive/folders/1zqmQwh8rN5jzX6T_h8fNHMGtTupwqQxa?usp=drive_link' },
  { subject: 'LLB', driveLink: 'https://drive.google.com/drive/folders/19tli6Sr2PnEzlhU1QIBdYbYuIhJNiQtx?usp=drive_link' },
  { subject: 'IELTS', driveLink: 'https://drive.google.com/drive/folders/1_OnUrnkXFMV4Fv7AlJlsEfSdvouBbbdA?usp=drive_link' },
  { subject: 'TESL', driveLink: 'https://drive.google.com/drive/folders/1plZ1vJP9vlNSKtst2FkhfEnOsvX0Rvfs?usp=drive_link' },
  { subject: 'Statistics', driveLink: 'https://drive.google.com/drive/folders/1OhuHL_aZGL6H19sDHl4gVC7Kmqelud_O?usp=drive_link' },
  { subject: 'Sri Lankan History', driveLink: 'https://drive.google.com/drive/folders/1sr240HlZeGvaXCFkifZZaFrTPeBguAnJ?usp=drive_link' },
  { subject: 'PTE', driveLink: 'https://drive.google.com/drive/folders/1QGqyTUC2_U4zjn1Gr-28xtFnd6t5cLiH?usp=drive_link' },
  { subject: 'Psychotherapy', driveLink: 'https://drive.google.com/drive/folders/1QGqyTUC2_U4zjn1Gr-28xtFnd6t5cLiH?usp=drive_link' },
  { subject: 'Psychometrics', driveLink: 'https://drive.google.com/drive/folders/1YgXcd8WCgkd5AYDduoddK3hic9CPitCh?usp=drive_link' },
  // New subjects from Part 2
  { subject: 'Art', driveLink: 'https://drive.google.com/open?id=1P64EE6rRYFPj0RXRQhpu3vwPJ4VLvg9E&usp=drive_copy' },
  { subject: 'Buddhism', driveLink: 'https://drive.google.com/open?id=1nDhsnBZNqxOLrfELYw0NjKG65ipw6dTv&usp=drive_copy' },
  { subject: 'Catholic', driveLink: 'https://drive.google.com/open?id=1NlVigirLCh4L6uOUflmFI_5UwPYQq-B0&usp=drive_copy' },
  { subject: 'Civic', driveLink: 'https://drive.google.com/open?id=1ehwX3Z9u1Ui0bjHu2aAdUTa67h8P2dVK&usp=drive_copy' },
  { subject: 'Commerce', driveLink: 'https://drive.google.com/open?id=1ROJc5Gy0gl3RXbomr8aebrP3P3tGN0jP&usp=drive_copy' },
  { subject: 'English', driveLink: 'https://drive.google.com/open?id=1zxdpI6WZq2CpPS4mYM6_YAoYIw2DB0Ob&usp=drive_copy' },
  { subject: 'Geography', driveLink: 'https://drive.google.com/open?id=1pjdA_c9Ld6Z2-vCiFx39CuZBPuctuDxm&usp=drive_copy' },
  { subject: 'Health', driveLink: 'https://drive.google.com/open?id=1yZig6tY7U4P3ZwDjoeU6_a8LZPqAQqjj&usp=drive_copy' },
  { subject: 'History', driveLink: 'https://drive.google.com/open?id=1tj04R60CuEqMpIOD7UbknSEE40GckNBG&usp=drive_copy' },
  { subject: 'ICT', driveLink: 'https://drive.google.com/open?id=18QDZLSTGzA-EVdy9Sa6ZM2BgNTka74rf&usp=drive_copy' },
  { subject: 'Islam', driveLink: 'https://drive.google.com/open?id=1nBmMr9fSAHtwmfwBxexbzlgYjhBelWQH&usp=drive_copy' },
  { subject: 'Maths', driveLink: 'https://drive.google.com/open?id=1f5wU9ZrLxoel4Ffz0ZARcJRQiykkIse9&usp=drive_copy' },
  { subject: 'Literature', driveLink: 'https://drive.google.com/open?id=1GlgBjVhZCJz1K0Dz9XZkjfCXixlsmJbN&usp=drive_copy' },
  { subject: 'Science', driveLink: 'https://drive.google.com/open?id=1eA0Hc6HP--rN5D2TeeNuqg-Slx5AcSmK&usp=drive_copy' },
  { subject: 'Sinhala', driveLink: 'https://drive.google.com/open?id=1eA0Hc6HP--rN5D2TeeNuqg-Slx5AcSmK&usp=drive_copy' },
  { subject: 'Tamil', driveLink: 'https://drive.google.com/open?id=19Y0RSsm2KkThzrLzAhsS5O2idaRih8AH&usp=drive_copy' },
];

async function addOtherNotes() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI not found in environment variables');
    }
    
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    let added = 0;
    let skipped = 0;

    for (const noteData of otherNotes) {
      try {
        // Check if this exact combination already exists
        const existing = await OtherNote.findOne({
          subject: noteData.subject,
          driveLink: noteData.driveLink,
        });

        if (existing) {
          console.log(`Skipping duplicate: ${noteData.subject}`);
          skipped++;
          continue;
        }

        const note = new OtherNote({
          subject: noteData.subject,
          driveLink: noteData.driveLink,
        });

        await note.save();
        console.log(`✓ Added: ${noteData.subject}`);
        added++;
      } catch (error: any) {
        if (error.code === 11000) {
          console.log(`Skipping duplicate: ${noteData.subject}`);
          skipped++;
        } else {
          console.error(`Error adding ${noteData.subject}:`, error.message);
        }
      }
    }

    console.log('\n=== Summary ===');
    console.log(`Added: ${added} other notes`);
    console.log(`Skipped: ${skipped} duplicates`);
    console.log(`Total: ${otherNotes.length} subjects`);
    
    process.exit(0);
  } catch (error: any) {
    console.error('Error:', error);
    process.exit(1);
  }
}

addOtherNotes();

