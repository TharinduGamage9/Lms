import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BA External Degree Notes - Free Study Materials',
  description: 'Download free BA External Degree notes for Anthropology, Archaeology, International Relations, Psychology, Economics, Philosophy, Political Science, and more in English and Sinhala Medium.',
  keywords: ['BA External', 'BA External notes', 'external degree', 'free BA notes', 'BA study materials'],
  openGraph: {
    title: 'BA External Degree Notes - Free Study Materials',
    description: 'Download free BA External Degree notes for various subjects in English and Sinhala Medium.',
  },
}

export default function BAExternalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}


