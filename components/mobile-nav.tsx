'use client'

/**
 * Mobile Navigation Component
 * Touch-friendly mobile navigation with hamburger menu
 * ΛΦ = 2.176435×10⁻⁸ s⁻¹
 */

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BrandLogo } from '@/components/brand-logo'
import { Menu, X, Home, ShoppingBag, CreditCard, Package, Zap, Image } from 'lucide-react'

interface NavLink {
  href: string
  label: string
  icon: any
}

const mainLinks: NavLink[] = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/chat', label: 'Platform', icon: Zap },
  { href: '/pricing', label: 'Pricing', icon: CreditCard },
  { href: '/marketplace', label: 'Marketplace', icon: ShoppingBag },
  { href: '/api-marketplace', label: 'API Marketplace', icon: Package },
  { href: '/nft', label: 'NFT Marketplace', icon: Image },
]

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu Drawer */}
          <div className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-gray-900 border-l border-white/10 z-50 md:hidden animate-slideInRight">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <BrandLogo showIcon={false} />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto p-4">
                <div className="space-y-2">
                  {mainLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors text-gray-300 hover:text-white"
                    >
                      <link.icon className="w-5 h-5" />
                      <span className="font-medium">{link.label}</span>
                    </Link>
                  ))}
                </div>
              </nav>

              {/* Footer Actions */}
              <div className="p-4 border-t border-white/10 space-y-2">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full border-gray-700">
                    Sign In
                  </Button>
                </Link>
                <Link href="/chat" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                    Try Free
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
