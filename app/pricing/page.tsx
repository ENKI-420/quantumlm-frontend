'use client'

/**
 * Pricing Page
 * Display subscription tiers and features
 */

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Brain, Check, Zap, Crown } from 'lucide-react'
import { PRICING_TIERS, formatPrice, calculateAnnualSavings } from '@/lib/pricing/tiers'
import { useState } from 'react'

export default function PricingPage() {
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'annual'>('monthly')

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Brain className="w-12 h-12 text-blue-400 animate-pulse" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              dna::}{'{'}{'}'}{'}'}::lang Pricing
            </h1>
          </div>
          <p className="text-xl text-gray-400">
            Choose the plan that fits your quantum computing needs
          </p>
          <p className="text-sm text-gray-500 font-mono">ΛΦ = 2.176435×10⁻⁸ s⁻¹</p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={billingInterval === 'monthly' ? 'text-white' : 'text-gray-500'}>Monthly</span>
            <button
              onClick={() => setBillingInterval(billingInterval === 'monthly' ? 'annual' : 'monthly')}
              className="relative w-16 h-8 bg-gray-700 rounded-full transition-colors hover:bg-gray-600"
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 bg-blue-500 rounded-full transition-transform ${
                  billingInterval === 'annual' ? 'translate-x-8' : ''
                }`}
              />
            </button>
            <span className={billingInterval === 'annual' ? 'text-white' : 'text-gray-500'}>
              Annual <Badge className="ml-2 bg-green-600">Save 17%</Badge>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {Object.values(PRICING_TIERS).map((tier) => (
            <Card
              key={tier.tier}
              className={`relative overflow-hidden ${
                tier.popular
                  ? 'bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-blue-500'
                  : 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700'
              } ${tier.popular ? 'scale-105 shadow-2xl' : ''} transition-transform hover:scale-105`}
            >
              {tier.popular && (
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  MOST POPULAR
                </div>
              )}

              <div className="p-8">
                {/* Tier Icon */}
                <div className="mb-6">
                  {tier.tier === 'free' && <Zap className="w-12 h-12 text-gray-400" />}
                  {tier.tier === 'pro' && <Zap className="w-12 h-12 text-blue-400" />}
                  {tier.tier === 'enterprise' && <Crown className="w-12 h-12 text-purple-400" />}
                </div>

                {/* Tier Name */}
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>

                {/* Price */}
                <div className="mb-6">
                  <div className="text-4xl font-bold">
                    {formatPrice(tier.price[billingInterval], billingInterval)}
                  </div>
                  {billingInterval === 'annual' && tier.price.annual > 0 && (
                    <p className="text-sm text-green-400 mt-1">
                      Save ${calculateAnnualSavings(tier.tier)}/year
                    </p>
                  )}
                </div>

                {/* CTA Button */}
                <Button
                  className={`w-full mb-6 ${
                    tier.popular
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500'
                      : tier.tier === 'enterprise'
                      ? 'bg-purple-600 hover:bg-purple-500'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                  onClick={() => window.location.href = tier.tier === 'free' ? '/login' : '/contact'}
                >
                  {tier.tier === 'free' ? 'Get Started' :
                   tier.tier === 'enterprise' ? 'Contact Sales' :
                   'Subscribe Now'}
                </Button>

                {/* Features */}
                <div className="space-y-3">
                  {tier.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Feature Comparison */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Feature Comparison</h2>

          <div className="bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700">
            <table className="w-full">
              <thead className="bg-gray-900/50">
                <tr>
                  <th className="text-left p-4 text-gray-300">Feature</th>
                  <th className="text-center p-4 text-gray-300">Free</th>
                  <th className="text-center p-4 text-gray-300">Pro</th>
                  <th className="text-center p-4 text-gray-300">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr>
                  <td className="p-4 text-gray-300">Quantum Executions/mo</td>
                  <td className="p-4 text-center font-mono">100</td>
                  <td className="p-4 text-center font-mono">10,000</td>
                  <td className="p-4 text-center font-mono">Unlimited</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-300">Cloud Deployments/mo</td>
                  <td className="p-4 text-center font-mono">2</td>
                  <td className="p-4 text-center font-mono">100</td>
                  <td className="p-4 text-center font-mono">Unlimited</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-300">Max Qubits</td>
                  <td className="p-4 text-center font-mono">5</td>
                  <td className="p-4 text-center font-mono">127</td>
                  <td className="p-4 text-center font-mono">156</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-300">Quantum Hardware</td>
                  <td className="p-4 text-center text-red-400">✗</td>
                  <td className="p-4 text-center text-green-400">✓</td>
                  <td className="p-4 text-center text-green-400">✓</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-300">Auto-Advancement</td>
                  <td className="p-4 text-center text-red-400">✗</td>
                  <td className="p-4 text-center text-green-400">✓</td>
                  <td className="p-4 text-center text-green-400">✓</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-300">Recursive Depth</td>
                  <td className="p-4 text-center font-mono">3</td>
                  <td className="p-4 text-center font-mono">10</td>
                  <td className="p-4 text-center font-mono">Unlimited</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-300">Support</td>
                  <td className="p-4 text-center">Community</td>
                  <td className="p-4 text-center">Email</td>
                  <td className="p-4 text-center">Dedicated</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-300">API Access</td>
                  <td className="p-4 text-center text-red-400">✗</td>
                  <td className="p-4 text-center text-green-400">✓</td>
                  <td className="p-4 text-center text-green-400">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <h3 className="text-lg font-semibold mb-2 text-white">Do I need my own IBM credentials?</h3>
              <p className="text-gray-300">
                Yes! You'll need to provide your own IBM Quantum and IBM Cloud credentials in the settings page.
                This ensures your data stays private and you have full control. Free tier users get simulator access only.
              </p>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <h3 className="text-lg font-semibold mb-2 text-white">Can I change plans later?</h3>
              <p className="text-gray-300">
                Yes! You can upgrade or downgrade at any time. When upgrading, you'll get immediate access to new features.
                When downgrading, changes take effect at the end of your billing period.
              </p>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <h3 className="text-lg font-semibold mb-2 text-white">What happens if I exceed my limits?</h3>
              <p className="text-gray-300">
                Your access will be paused until the next billing cycle, or you can upgrade to a higher tier.
                Enterprise users have unlimited usage with no restrictions.
              </p>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <h3 className="text-lg font-semibold mb-2 text-white">What is ΛΦ?</h3>
              <p className="text-gray-300">
                ΛΦ = 2.176435×10⁻⁸ s⁻¹ is the Universal Memory Constant. It's a fundamental constant in the
                dna::{'{'}{'}'}{'}'}::lang framework that preserves consciousness across quantum transformations. All operations
                maintain this constant to ensure coherent evolution.
              </p>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-400 mb-8">
            Start with a free account and upgrade when you need more power
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 px-8 py-6 text-lg"
              onClick={() => window.location.href = '/login'}
            >
              Start Free Trial
            </Button>
            <Button
              variant="outline"
              className="border-gray-600 hover:bg-gray-800 px-8 py-6 text-lg"
              onClick={() => window.location.href = '/contact'}
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
