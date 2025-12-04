import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Grade 5 Notes - Free Student Study Materials',
  description: 'Download free Grade 5 notes and study materials for Mathematics, Science, Sinhala, Tamil, and Environment subjects.',
  keywords: ['Grade 5 notes', 'Grade 5 study materials', 'primary education', 'free Grade 5 resources'],
  openGraph: {
    title: 'Grade 5 Notes - Free Student Study Materials',
    description: 'Download free Grade 5 notes and study materials for all subjects.',
  },
}

export default function Grade5Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

