import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NVQ Courses - Free Diploma & Certificate Notes',
  description: 'Download free NVQ course materials for ICT, Construction, Automotive, Hospitality, Healthcare, and more. Access NVQ diploma and certificate notes.',
  keywords: ['NVQ courses', 'NVQ notes', 'free NVQ materials', 'NVQ diploma', 'NVQ certificate', 'vocational training'],
  openGraph: {
    title: 'NVQ Courses - Free Diploma & Certificate Notes',
    description: 'Download free NVQ course materials for ICT, Construction, Automotive, Hospitality, Healthcare, and more.',
  },
}

export default function NVQLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}


