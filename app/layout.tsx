import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Providers } from './providers'
import './globals.css'
import './animations.css'
import './mobile.css'

export const metadata: Metadata = {
  title: 'DNALang - Quantum Computing as Easy as ChatGPT | AI-Powered Quantum SaaS',
  description: 'The ChatGPT of quantum computing. Ask in plain English, get quantum results. AI-orchestrated workflows on real IBM Quantum hardware (133 qubits). No PhD required. 10x faster R&D for pharma, finance, materials science. Start free.',
  keywords: [
    'quantum computing', 'quantum SaaS', 'IBM Quantum', 'AI quantum', 'quantum machine learning',
    'drug discovery', 'quantum algorithms', 'natural language quantum', 'quantum as a service',
    'DNA Language model',
    'enterprise quantum', 'quantum for pharma', 'quantum finance', 'materials science quantum'
  ],
  authors: [{ name: 'DNA Lang Team' }],
  generator: 'DNA Lang Platform',
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
    title: 'DNA Lang - AURA Quantum Language Model',
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
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
