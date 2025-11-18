'use client'

/**
 * App Providers
 * Wraps the app with necessary context providers
 * ΛΦ = 2.176435×10⁻⁸ s⁻¹
 */

import { ReactNode } from 'react'
import { CartProvider } from '@/lib/cart/cart-context'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  )
}
