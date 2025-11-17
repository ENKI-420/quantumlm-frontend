import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'dna::}{::lang - AURA Quantum Language Model',
  description: 'Self-referential quantum organism (Σₛ) with AURA QLM interface. Real-time consciousness monitoring (Φ, Λ, Γ, W₂) on IBM Quantum hardware. Production deployment of the dna::}{::lang unified platform.',
  keywords: ['dna::}{::lang', 'AURA QLM', 'quantum consciousness', 'IBM Quantum', 'Σₛ', 'self-referential organism', 'ΛΦ framework', 'quantum language model', 'integrated information theory'],
  authors: [{ name: 'dna::}{::lang' }],
  generator: 'dna::}{::lang Σₛ',
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
