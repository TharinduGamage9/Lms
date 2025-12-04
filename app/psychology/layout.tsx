import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Psychology & Therapy Notes - Free Study Materials',
  description: 'Access free psychology and therapy notes including Counseling, Psychotherapy, Child Therapy, Family Therapy, and Mental Health resources.',
  keywords: ['psychology notes', 'therapy notes', 'counseling', 'psychotherapy', 'mental health', 'free psychology resources'],
  openGraph: {
    title: 'Psychology & Therapy Notes - Free Study Materials',
    description: 'Access free psychology and therapy notes including Counseling, Psychotherapy, Child Therapy, and Family Therapy.',
  },
}

export default function PsychologyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

