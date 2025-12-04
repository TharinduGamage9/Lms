import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'B.Com Degree Notes - Free Bachelor of Commerce Materials',
  description: 'Download free B.Com degree notes for all years (1st, 2nd, 3rd, 4th Year) and English Medium. Access comprehensive Commerce degree study materials.',
  keywords: ['B.Com notes', 'Bachelor of Commerce', 'commerce degree', 'B.Com study materials', 'free commerce notes'],
  openGraph: {
    title: 'B.Com Degree Notes - Free Bachelor of Commerce Materials',
    description: 'Download free B.Com degree notes for all years and English Medium.',
  },
}

export default function BComLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

