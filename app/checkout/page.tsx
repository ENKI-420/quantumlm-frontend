'use client'

/**
 * Checkout Page
 * Complete purchase flow with Stripe integration
 * ΛΦ = 2.176435×10⁻⁸ s⁻¹
 */

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { useCart } from '@/lib/cart/cart-context'
import {
  Brain, ShoppingCart, Trash2, Plus, Minus, CreditCard,
  Lock, CheckCircle, AlertTriangle, ArrowLeft, Sparkles
} from 'lucide-react'

export default function CheckoutPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart, hasSubscriptions } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [email, setEmail] = useState('')
  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)

  const handleCheckout = async () => {
    setIsProcessing(true)

    try {
      // Simulate Stripe checkout
      await new Promise(resolve => setTimeout(resolve, 2000))

      // In production, this would call your Stripe API:
      // const response = await fetch('/api/stripe/create-checkout-session', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ items, email })
      // })
      // const { url } = await response.json()
      // window.location.href = url

      clearCart()
      setOrderComplete(true)
    } catch (error) {
      console.error('Checkout error:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const applyPromoCode = () => {
    if (promoCode === 'QUANTUM50') {
      setDiscount(totalPrice * 0.5)
    } else if (promoCode === 'WELCOME20') {
      setDiscount(totalPrice * 0.2)
    }
  }

  const finalTotal = Math.max(0, totalPrice - discount)

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-gray-900/80 backdrop-blur-xl">
          <div className="container mx-auto px-6 py-4">
            <Link href="/" className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-blue-400 animate-pulse" />
              <span className="text-xl font-bold font-mono">DNALang</span>
            </Link>
          </div>
        </nav>

        <div className="container mx-auto px-6 py-20">
          <Card className="max-w-2xl mx-auto bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/30 p-12 text-center">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-xl text-gray-300 mb-8">
              Thank you for your purchase. Check your email for access details.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/marketplace">
                <Button size="lg" variant="outline" className="border-gray-600">
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Back to Marketplace
                </Button>
              </Link>
              <Link href="/chat">
                <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600">
                  Start Using Products
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-gray-900/80 backdrop-blur-xl">
          <div className="container mx-auto px-6 py-4">
            <Link href="/" className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-blue-400 animate-pulse" />
              <span className="text-xl font-bold font-mono">DNALang</span>
            </Link>
          </div>
        </nav>

        <div className="container mx-auto px-6 py-20">
          <Card className="max-w-2xl mx-auto bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700 p-12 text-center">
            <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-gray-400 mb-8">
              Browse our marketplace to find quantum insights and algorithms
            </p>
            <Link href="/marketplace">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
                Browse Marketplace
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-gray-900/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-blue-400 animate-pulse" />
              <span className="text-xl font-bold font-mono">DNALang</span>
            </Link>
            <Link href="/marketplace">
              <Button variant="ghost">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">Shopping Cart</h1>
              <Badge className="bg-blue-600 text-white px-4 py-2">
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </Badge>
            </div>

            {items.map((item) => (
              <Card key={item.id} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700 p-6">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-400 mb-4">
                      <Badge className="bg-gray-700">{item.category}</Badge>
                      <span>by {item.seller}</span>
                    </div>

                    {item.priceType === 'subscription' && (
                      <Badge className="bg-blue-600 mb-4">Monthly Subscription</Badge>
                    )}
                    {item.priceType === 'revenue-share' && (
                      <Badge className="bg-purple-600 mb-4">
                        {item.revenueShare}% Revenue Share
                      </Badge>
                    )}

                    <div className="flex items-center gap-4">
                      {item.priceType !== 'subscription' && (
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-700"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-12 text-center font-mono">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-700"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-400 hover:text-red-300"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-400">
                      {item.priceType === 'revenue-share' ? 'Free' : `$${item.price * item.quantity}`}
                    </div>
                    {item.priceType === 'subscription' && (
                      <div className="text-xs text-gray-500 mt-1">per month</div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700 p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              {/* Email */}
              <div className="mb-6">
                <label className="text-sm text-gray-400 mb-2 block">Email Address</label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-900 border-gray-700 focus:border-blue-500"
                />
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="text-sm text-gray-400 mb-2 block">Promo Code</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="QUANTUM50"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    className="bg-gray-900 border-gray-700"
                  />
                  <Button
                    variant="outline"
                    className="border-gray-700"
                    onClick={applyPromoCode}
                  >
                    Apply
                  </Button>
                </div>
                {discount > 0 && (
                  <div className="mt-2 text-sm text-green-400 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Promo code applied!
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 py-4 border-t border-b border-gray-700">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                {hasSubscriptions && (
                  <div className="text-xs text-yellow-400 flex items-center gap-2">
                    <AlertTriangle className="w-3 h-3" />
                    Includes recurring subscriptions
                  </div>
                )}
              </div>

              <div className="flex justify-between text-xl font-bold mt-4 mb-6">
                <span>Total</span>
                <span className="text-blue-400">${finalTotal.toFixed(2)}</span>
              </div>

              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 mb-4"
                onClick={handleCheckout}
                disabled={isProcessing || !email}
              >
                {isProcessing ? (
                  <>Processing...</>
                ) : (
                  <>
                    <CreditCard className="mr-2 w-5 h-5" />
                    Proceed to Payment
                  </>
                )}
              </Button>

              <div className="text-xs text-gray-500 text-center flex items-center justify-center gap-2">
                <Lock className="w-3 h-3" />
                Secure checkout powered by Stripe
              </div>

              {/* Trust Signals */}
              <div className="mt-6 pt-6 border-t border-gray-700 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  30-day money-back guarantee
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Instant access after purchase
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Cancel subscriptions anytime
                </div>
              </div>
            </Card>

            {/* Promo Banner */}
            <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30 p-6 mt-6">
              <Sparkles className="w-8 h-8 text-purple-400 mb-3" />
              <h3 className="font-bold mb-2">Valid Promo Codes</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <code className="bg-gray-900/50 px-2 py-1 rounded">QUANTUM50</code>
                  <span className="text-gray-400">50% off</span>
                </div>
                <div className="flex items-center justify-between">
                  <code className="bg-gray-900/50 px-2 py-1 rounded">WELCOME20</code>
                  <span className="text-gray-400">20% off</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
