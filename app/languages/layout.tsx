import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Language Learning Resources - Free Materials for 23+ Languages',
  description: 'Learn 23+ languages for free including English, Japanese, Korean, French, German, Spanish, IELTS, English Literature, and more. Download free language learning resources.',
  keywords: ['language learning', 'free language resources', 'IELTS', 'English Literature', 'Japanese', 'Korean', 'learn languages free'],
  openGraph: {
    title: 'Language Learning Resources - Free Materials for 23+ Languages',
    description: 'Learn 23+ languages for free including English, Japanese, Korean, French, German, Spanish, and more.',
  },
}

export default function LanguagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

