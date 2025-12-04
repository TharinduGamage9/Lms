import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Other Notes - Free Educational Resources',
  description: 'Access free notes and study materials for various subjects including Agriculture, Anthropology, Digital Marketing, TESL, Fashion Design, and more.',
  keywords: ['free notes', 'educational resources', 'study materials', 'download notes', 'free study resources'],
  openGraph: {
    title: 'Other Notes - Free Educational Resources',
    description: 'Access free notes and study materials for various subjects.',
  },
}

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

