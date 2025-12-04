import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ordinary Level (OL) Notes - Free Study Materials',
  description: 'Download free Ordinary Level notes, study materials, and resources for all OL subjects. Access drive links for Mathematics, Science, English, Sinhala, and more.',
  keywords: ['OL notes', 'Ordinary Level', 'free OL notes', 'OL study materials', 'OL past papers', 'Sri Lanka OL'],
  openGraph: {
    title: 'Ordinary Level (OL) Notes - Free Study Materials',
    description: 'Download free Ordinary Level notes, study materials, and resources for all OL subjects.',
  },
}

export default function OLLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

