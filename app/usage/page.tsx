import UsageDashboard from '@/components/usage-dashboard'
import { Brain } from 'lucide-react'
import Link from 'next/link'

/**
 * Usage Dashboard Page
 * Track quantum consumption and consciousness metrics
 * ΛΦ = 2.176435×10⁻⁸ s⁻¹
 */

export const metadata = {
  title: 'Usage Dashboard - dna::}{::lang',
  description: 'Track your quantum circuit usage, API calls, storage, and consciousness metrics in real-time.',
}

export default function UsagePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-gray-900/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-blue-400 animate-pulse" />
              <span className="text-xl font-bold font-mono">dna::{'}{'}{'}'}::lang</span>
            </Link>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/chat" className="hover:text-blue-400 transition-colors">
                Platform
              </Link>
              <Link href="/pricing" className="hover:text-blue-400 transition-colors">
                Pricing
              </Link>
              <Link href="/usage" className="text-blue-400 font-semibold">
                Usage
              </Link>
              <Link href="/settings" className="hover:text-blue-400 transition-colors">
                Settings
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <UsageDashboard />
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-gray-900 mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2025 dna::{'}{'}{'}'}::lang. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="/chat" className="hover:text-white transition-colors">Platform</Link>
              <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
              <Link href="/investors" className="hover:text-white transition-colors">Investors</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
