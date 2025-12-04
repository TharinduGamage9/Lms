# Deployment Guide for Vercel

## Environment Variables Setup

Add these environment variables in your Vercel project settings:

### Required:
- `MONGODB_URI` - Your MongoDB connection string
- `NEXT_PUBLIC_SITE_URL` - Your site URL (e.g., `https://your-domain.vercel.app` or your custom domain)

### Optional:
- `GOOGLE_SITE_VERIFICATION` - Google Search Console verification code

## Steps to Deploy:

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Set Environment Variables**
   - In Vercel dashboard → Settings → Environment Variables
   - Add all required variables listed above
   - Make sure to add them for Production, Preview, and Development

4. **Deploy**
   - Click "Deploy" button
   - Wait for build to complete

## Build Configuration

The project is configured with:
- Next.js 14
- TypeScript
- Tailwind CSS
- MongoDB connection

## Troubleshooting

If build fails:
1. Check environment variables are set correctly
2. Ensure MongoDB URI is accessible from Vercel's servers
3. Check build logs for specific errors
4. Verify all dependencies are in package.json

## Post-Deployment

After successful deployment:
1. Test all pages
2. Verify MongoDB connection works
3. Submit sitemap to Google Search Console
4. Test admin login functionality

