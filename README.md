# Free Note Platform

A comprehensive Learning Management System platform providing free study notes and educational resources for students.

## Features

- 📚 **OL & AL Notes** - Ordinary Level and Advanced Level study materials
- 🎓 **NVQ Courses** - Vocational training courses and materials
- 🧠 **Psychology Notes** - Psychology and therapy study resources
- 💼 **B.Com Notes** - Bachelor of Commerce degree materials
- 🌍 **Language Learning** - Resources for 23+ languages
- 📖 **BA External** - BA External Degree notes
- 📝 **Grade 5** - Primary education materials
- 🔍 **SEO Optimized** - Fully optimized for search engines
- 📱 **Mobile Responsive** - Works perfectly on all devices

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB database
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd Lms
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env.local` file:
```env
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_SITE_URL=http://localhost:3000
GOOGLE_SITE_VERIFICATION=your_google_verification_code (optional)
```

4. Create admin account
```bash
npm run create-admin
```

5. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Set Environment Variables**
   In Vercel dashboard → Settings → Environment Variables:
   - `MONGODB_URI` - Your MongoDB connection string
   - `NEXT_PUBLIC_SITE_URL` - Your site URL (e.g., `https://your-app.vercel.app`)
   - `GOOGLE_SITE_VERIFICATION` - (Optional) Google Search Console code

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | Yes | MongoDB connection string |
| `NEXT_PUBLIC_SITE_URL` | Yes | Your website URL |
| `GOOGLE_SITE_VERIFICATION` | No | Google Search Console verification |

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run create-admin` - Create admin account
- `npm run add-subjects` - Add OL/AL subjects
- `npm run add-other-notes` - Add other notes
- `npm run add-nvq` - Add NVQ courses
- `npm run add-psychology` - Add psychology notes
- `npm run add-bcom` - Add B.Com notes
- `npm run add-languages` - Add language resources
- `npm run add-ba-external` - Add BA External notes
- `npm run add-grade5` - Add Grade 5 notes

## SEO Features

- ✅ Meta tags and Open Graph tags
- ✅ Structured data (JSON-LD)
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Mobile responsive design
- ✅ Semantic HTML

## License

© 2025 Free Note. All Rights Reserved.

Created by Creators
