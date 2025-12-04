import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Advanced Level (AL) Notes - Free Study Materials by Stream',
  description: 'Download free Advanced Level notes organized by stream: Commerce, Arts, Technology, Science/Mathematics. Access AL notes, past papers, and study resources.',
  keywords: ['AL notes', 'Advanced Level', 'free AL notes', 'AL study materials', 'AL past papers', 'Commerce stream', 'Arts stream', 'Science stream'],
  openGraph: {
    title: 'Advanced Level (AL) Notes - Free Study Materials by Stream',
    description: 'Download free Advanced Level notes organized by stream: Commerce, Arts, Technology, Science/Mathematics.',
  },
}

export default function ALLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}


