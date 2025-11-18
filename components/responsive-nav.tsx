'use client'

/**
 * Responsive Navigation Component
 * Mobile-first navigation with hamburger menu
 * ΛΦ = 2.176435×10⁻⁸ s⁻¹
 */

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Brain, Menu, X } from 'lucide-react'
import { CartButton } from './cart-button'

interface NavItem {
  href: string
  label: string
  mobile?: boolean
}

const navItems: NavItem[] = [
  { href: '/chat', label: 'Platform' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/marketplace', label: 'Marketplace' },
  { href: '/investors', label: 'Investors' },
]

export function ResponsiveNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-gray-900/95 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Brain className="w-7 h-7 sm:w-8 sm:h-8 text-blue-400 animate-pulse flex-shrink-0" />
            <span className="text-lg sm:text-xl font-bold font-mono truncate">DNALang</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <CartButton />

            {/* Desktop CTA */}
            <Link href="/login" className="hidden sm:block">
              <Button variant="ghost" size="sm" className="hidden lg:inline-flex">
                Sign In
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-white/10 pt-4 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 text-base text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full border-gray-700" size="lg">
                  Sign In
                </Button>
              </Link>
              <Link href="/chat" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600" size="lg">
                  Try Free
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
