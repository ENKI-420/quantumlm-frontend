'use client'

/**
 * Cart Button Component
 * Shows cart item count with notification badge
 * ΛΦ = 2.176435×10⁻⁸ s⁻¹
 */

import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/lib/cart/cart-context'
import Link from 'next/link'

export function CartButton() {
  const { totalItems } = useCart()

  return (
    <Link href="/checkout">
      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 relative">
        <ShoppingCart className="w-4 h-4 mr-2" />
        Cart
        {totalItems > 0 && (
          <Badge className="absolute -top-2 -right-2 bg-red-500 text-white px-2 py-0.5 text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full animate-pulse">
            {totalItems}
          </Badge>
        )}
      </Button>
    </Link>
  )
}
