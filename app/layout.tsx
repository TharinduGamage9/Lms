import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import VisitTracker from '@/components/VisitTracker'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://freenote.lk'),
  title: {
    default: 'Free Note Platform - Free Study Notes & Educational Resources',
    template: '%s | Free Note Platform'
  },
  description: 'Access free study notes, educational materials, and resources for OL, AL, NVQ, B.Com, Psychology, Languages, BA External, and Grade 5. Download notes, past papers, and study materials for free.',
  keywords: [
    'free notes',
    'study notes',
    'educational resources',
    'OL notes',
    'AL notes',
    'Ordinary Level',
    'Advanced Level',
    'NVQ courses',
    'B.Com notes',
    'psychology notes',
    'language learning',
    'BA External',
    'Grade 5 notes',
    'free study materials',
    'Sri Lanka education',
    'download notes',
    'past papers',
    'study resources'
  ],
  authors: [{ name: 'Free Note Platform' }],
  creator: 'Free Note Platform',
  publisher: 'Free Note Platform',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://freenote.lk',
    siteName: 'Free Note Platform',
    title: 'Free Note Platform - Free Study Notes & Educational Resources',
    description: 'Access free study notes, educational materials, and resources for OL, AL, NVQ, B.Com, Psychology, Languages, BA External, and Grade 5.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Free Note Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Note Platform - Free Study Notes & Educational Resources',
    description: 'Access free study notes, educational materials, and resources for OL, AL, NVQ, B.Com, Psychology, Languages, BA External, and Grade 5.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://freenote.lk',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#4F46E5" />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL || 'https://freenote.lk'} />
      </head>
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <VisitTracker />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

