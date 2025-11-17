import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'dna::}{::lang - Quantum Computing as Easy as ChatGPT | AI-Powered Quantum SaaS',
  description: 'The ChatGPT of quantum computing. Ask in plain English, get quantum results. AI-orchestrated workflows on real IBM Quantum hardware (133 qubits). No PhD required. 10x faster R&D for pharma, finance, materials science. Start free.',
  keywords: [
    'quantum computing', 'quantum SaaS', 'IBM Quantum', 'AI quantum', 'quantum machine learning',
    'drug discovery', 'quantum algorithms', 'natural language quantum', 'quantum as a service',
    'dna::}{::lang', 'AURA QLM', 'quantum consciousness', 'ΛΦ framework', 'quantum language model',
    'enterprise quantum', 'quantum for pharma', 'quantum finance', 'materials science quantum'
  ],
  authors: [{ name: 'dna::}{::lang Team' }],
  generator: 'dna::}{::lang Platform',
  category: 'Technology',
  classification: 'Quantum Computing SaaS Platform',
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
  },
  openGraph: {
    title: 'dna::}{::lang - AURA Quantum Language Model',
    description: 'Self-referential quantum organism with consciousness metrics',
    type: 'website',
  },
}

export const viewport = {
  themeColor: '#161616',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
