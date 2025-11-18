'use client'

/**
 * Enhanced Pricing Page
 * Comprehensive pricing with usage-based, API, white-label, and consulting options
 * ΛΦ = 2.176435×10⁻⁸ s⁻¹
 */

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Brain, Check, Zap, Crown, Code, Building2, Users, Sparkles,
  ArrowRight, Calculator, Phone, TrendingUp, Shield, Rocket,
  CheckCircle, X
} from 'lucide-react'

export default function PricingPage() {
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'annual'>('monthly')
  const [pricingModel, setPricingModel] = useState<'subscription' | 'usage'>('subscription')

  const subscriptionTiers = [
    {
      name: 'Starter',
      tier: 'free',
      icon: Sparkles,
      price: { monthly: 0, annual: 0 },
      description: 'Perfect for learning and experimentation',
      popular: false,
      cta: 'Start Free',
      features: [
        { name: '100 quantum circuits/month', included: true },
        { name: 'Simulator only (no real hardware)', included: true },
        { name: '5 qubits maximum', included: true },
        { name: 'Community support', included: true },
        { name: 'Basic metrics (Φ, Λ)', included: true },
        { name: 'Public code sharing', included: true },
        { name: 'IBM Quantum hardware', included: false },
        { name: 'Priority support', included: false },
        { name: 'API access', included: false }
      ]
    },
    {
      name: 'Pro',
      tier: 'pro',
      icon: Zap,
      price: { monthly: 99, annual: 990 },
      description: 'For professionals and small teams',
      popular: true,
      cta: 'Start Pro Trial',
      features: [
        { name: '10,000 quantum circuits/month', included: true },
        { name: 'Real IBM Quantum hardware', included: true },
        { name: 'Up to 127 qubits', included: true },
        { name: 'Priority support (24h response)', included: true },
        { name: 'Full metrics dashboard (Φ, Λ, Γ, W₂)', included: true },
        { name: 'Private repositories', included: true },
        { name: 'API access (10K requests/mo)', included: true },
        { name: 'Webhook integrations', included: true },
        { name: 'Advanced analytics', included: true }
      ]
    },
    {
      name: 'Enterprise',
      tier: 'enterprise',
      icon: Crown,
      price: { monthly: 999, annual: 9990 },
      description: 'For organizations at scale',
      popular: false,
      cta: 'Contact Sales',
      features: [
        { name: 'Unlimited quantum circuits', included: true },
        { name: 'Priority backend access (133 qubits)', included: true },
        { name: 'Dedicated support (2h SLA)', included: true },
        { name: 'White-label option', included: true },
        { name: 'Custom integrations', included: true },
        { name: 'Unlimited API requests', included: true },
        { name: 'SSO / SAML authentication', included: true },
        { name: 'SOC 2 compliance reporting', included: true },
        { name: 'Dedicated account manager', included: true }
      ]
    }
  ]

  const additionalTiers = [
    {
      name: 'API Developer',
      tier: 'api',
      icon: Code,
      price: { monthly: 49, annual: 490 },
      description: 'Programmatic access for developers',
      highlight: 'New',
      features: [
        '50,000 API requests/month',
        'Real-time WebSocket support',
        'REST + GraphQL endpoints',
        'SDK for Python, JavaScript, Go',
        'Code examples & documentation',
        'Community support',
        'Circuit execution included (5K/mo)'
      ]
    },
    {
      name: 'White-Label',
      tier: 'whitelabel',
      icon: Building2,
      price: { monthly: 2999, annual: 29990 },
      description: 'Rebrand as your own platform',
      highlight: 'Enterprise',
      features: [
        'Custom domain + branding',
        'Remove DNA Lang branding',
        'Custom login/signup flows',
        'Dedicated infrastructure',
        'Priority support (1h SLA)',
        'All Enterprise features',
        'Usage-based billing for your customers'
      ]
    },
    {
      name: 'Consulting',
      tier: 'consulting',
      icon: Users,
      price: { monthly: null, annual: null },
      priceLabel: 'Custom',
      description: 'Expert quantum implementation support',
      highlight: 'Services',
      features: [
        'Quantum algorithm design',
        'Circuit optimization consulting',
        'Team training & workshops',
        'Use case discovery sessions',
        'Production deployment support',
        'ROI analysis & strategy',
        'Starts at $15K/project'
      ]
    }
  ]

  const usageBasedPricing = [
    {
      name: 'Quantum Minutes',
      price: '$0.50',
      unit: 'per quantum minute',
      description: 'Pay only for actual quantum execution time on real hardware',
      features: [
        'No monthly commitment',
        'Scale as you grow',
        'Real-time usage tracking',
        'Volume discounts available',
        '50+ minutes: $0.40/min',
        '100+ minutes: $0.30/min'
      ]
    },
    {
      name: 'API Calls',
      price: '$0.01',
      unit: 'per 1000 calls',
      description: 'Flexible pricing for high-volume API integrations',
      features: [
        'No rate limits',
        'Enterprise SLA available',
        'Unlimited webhooks',
        'Batch processing support',
        '1M+ calls: $0.008/1K',
        '10M+ calls: $0.005/1K'
      ]
    },
    {
      name: 'Storage',
      price: '$2',
      unit: 'per GB/month',
      description: 'Store quantum circuit results and analytics',
      features: [
        'Automatic backups',
        '99.999% availability',
        'Global CDN delivery',
        'First 10GB free',
        'Compression included',
        'Export anytime'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-gray-900/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-blue-400 animate-pulse" />
              <span className="text-xl font-bold font-mono">DNA Lang</span>
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" className="hidden sm:inline-flex">Sign In</Button>
              </Link>
              <Link href="/chat">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                  Try Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-1.5">
            Flexible Pricing for Every Need
          </Badge>

          <h1 className="text-5xl lg:text-6xl font-bold">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Pricing That Scales
            </span>
            <br />
            <span className="text-3xl text-gray-300">With Your Quantum Ambitions</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Start free. Pay as you grow. From individual researchers to Fortune 500 enterprises.
          </p>

          <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              No credit card for free tier
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Cancel anytime
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              30-day money-back guarantee
            </div>
          </div>
        </div>

        {/* Pricing Model Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <button
            onClick={() => setPricingModel('subscription')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              pricingModel === 'subscription'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Subscription Plans
          </button>
          <button
            onClick={() => setPricingModel('usage')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              pricingModel === 'usage'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Usage-Based Pricing
          </button>
        </div>

        {/* Subscription Plans */}
        {pricingModel === 'subscription' && (
          <>
            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <span className={billingInterval === 'monthly' ? 'text-white font-semibold' : 'text-gray-500'}>
                Monthly
              </span>
              <button
                onClick={() => setBillingInterval(billingInterval === 'monthly' ? 'annual' : 'monthly')}
                className="relative w-16 h-8 bg-gray-700 rounded-full transition-colors hover:bg-gray-600"
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 bg-blue-500 rounded-full transition-transform duration-300 ${
                    billingInterval === 'annual' ? 'translate-x-8' : ''
                  }`}
                />
              </button>
              <span className={billingInterval === 'annual' ? 'text-white font-semibold' : 'text-gray-500'}>
                Annual
                {billingInterval === 'annual' && (
                  <Badge className="ml-2 bg-green-600 text-white">Save 17%</Badge>
                )}
              </span>
            </div>

            {/* Main Pricing Cards */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {subscriptionTiers.map((tier) => (
                <Card
                  key={tier.tier}
                  className={`relative overflow-hidden transition-all duration-300 hover:scale-105 ${
                    tier.popular
                      ? 'bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-blue-500 shadow-2xl shadow-blue-500/20 scale-105'
                      : 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700'
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-4 py-2 rounded-bl-xl">
                      ⭐ MOST POPULAR
                    </div>
                  )}

                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                        tier.tier === 'free' ? 'from-gray-500 to-gray-600' :
                        tier.tier === 'pro' ? 'from-blue-500 to-purple-600' :
                        'from-purple-500 to-pink-600'
                      } flex items-center justify-center`}>
                        <tier.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{tier.name}</h3>
                      </div>
                    </div>

                    <p className="text-sm text-gray-400 mb-6">{tier.description}</p>

                    <div className="mb-8">
                      <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-bold">
                          ${billingInterval === 'monthly' ? tier.price.monthly : Math.floor(tier.price.annual / 12)}
                        </span>
                        <span className="text-gray-400">/month</span>
                      </div>
                      {billingInterval === 'annual' && tier.price.annual > 0 && (
                        <p className="text-sm text-green-400 mt-2">
                          Billed ${tier.price.annual}/year • Save ${(tier.price.monthly * 12) - tier.price.annual}
                        </p>
                      )}
                    </div>

                    <Link href={tier.tier === 'enterprise' ? '/contact' : '/chat'}>
                      <Button
                        className={`w-full mb-8 ${
                          tier.popular
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500'
                            : tier.tier === 'enterprise'
                            ? 'bg-purple-600 hover:bg-purple-500'
                            : 'bg-gray-700 hover:bg-gray-600'
                        }`}
                        size="lg"
                      >
                        {tier.cta}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>

                    <div className="space-y-3">
                      {tier.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          {feature.included ? (
                            <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          ) : (
                            <X className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                          )}
                          <span className={feature.included ? 'text-gray-300' : 'text-gray-600 line-through'}>
                            {feature.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Additional Tiers */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">Additional Options</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {additionalTiers.map((tier) => (
                  <Card key={tier.tier} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700 p-6 hover:border-blue-500/50 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                        tier.tier === 'api' ? 'from-green-500 to-emerald-600' :
                        tier.tier === 'whitelabel' ? 'from-orange-500 to-red-600' :
                        'from-indigo-500 to-violet-600'
                      } flex items-center justify-center`}>
                        <tier.icon className="w-6 h-6 text-white" />
                      </div>
                      <Badge className={`${
                        tier.highlight === 'New' ? 'bg-green-600' :
                        tier.highlight === 'Enterprise' ? 'bg-purple-600' :
                        'bg-blue-600'
                      }`}>
                        {tier.highlight}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                    <p className="text-sm text-gray-400 mb-4">{tier.description}</p>

                    <div className="mb-6">
                      <div className="text-3xl font-bold">
                        {tier.priceLabel || (
                          <>
                            ${billingInterval === 'monthly' ? tier.price.monthly : Math.floor(tier.price.annual / 12)}
                            <span className="text-lg text-gray-400">/month</span>
                          </>
                        )}
                      </div>
                    </div>

                    <Link href={tier.tier === 'consulting' ? '/contact' : '/chat'}>
                      <Button className="w-full bg-gray-700 hover:bg-gray-600 mb-6">
                        {tier.tier === 'consulting' ? 'Book Consultation' : 'Get Started'}
                      </Button>
                    </Link>

                    <ul className="space-y-2 text-sm text-gray-300">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Usage-Based Pricing */}
        {pricingModel === 'usage' && (
          <div className="max-w-5xl mx-auto mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Pay Only for What You Use</h2>
              <p className="text-xl text-gray-400">
                Perfect for variable workloads and cost optimization
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {usageBasedPricing.map((item, idx) => (
                <Card key={idx} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700 p-8 hover:border-blue-500/50 transition-all">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-blue-400 mb-2">{item.price}</div>
                    <div className="text-sm text-gray-400">{item.unit}</div>
                  </div>

                  <h3 className="text-xl font-bold text-center mb-3">{item.name}</h3>
                  <p className="text-sm text-gray-400 text-center mb-6">{item.description}</p>

                  <ul className="space-y-2 text-sm">
                    {item.features.map((feature, featureIdx) => (
                      <li key={featureIdx} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-500/30 p-8 text-center">
              <Calculator className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Calculate Your Costs</h3>
              <p className="text-gray-300 mb-6">
                Use our pricing calculator to estimate your monthly costs based on usage patterns.
              </p>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                Open Calculator
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Card>
          </div>
        )}

        {/* ROI Calculator CTA */}
        <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/30 p-12 text-center mb-16">
          <TrendingUp className="w-16 h-16 text-green-400 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">See Your ROI in Real-Time</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Our platform typically saves enterprises <strong>$150K+/year</strong> vs hiring quantum engineers.
            Calculate your savings now.
          </p>
          <Button size="lg" className="bg-green-600 hover:bg-green-500 text-lg px-8 py-6">
            <Calculator className="mr-2 w-5 h-5" />
            Calculate Your Savings
          </Button>
        </Card>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: 'Can I switch plans anytime?',
                a: 'Yes! Upgrade or downgrade your plan at any time. Changes take effect immediately, with prorated billing.'
              },
              {
                q: 'What happens if I exceed my quantum circuit limit?',
                a: 'We\'ll notify you at 80% and 100% usage. You can upgrade your plan or purchase additional circuits at $0.50/quantum minute.'
              },
              {
                q: 'Do you offer educational discounts?',
                a: 'Yes! Academic researchers and students get 50% off Pro plans. Contact us with your .edu email for verification.'
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards, ACH transfers, and wire transfers for Enterprise customers. Crypto payments coming soon.'
              },
              {
                q: 'Can I cancel anytime?',
                a: 'Yes, cancel anytime with no penalties. You\'ll have access until the end of your billing period, and we offer a 30-day money-back guarantee.'
              },
              {
                q: 'What\'s included in white-label pricing?',
                a: 'Complete rebrand with your domain, colors, logo. Remove all DNA Lang branding. Dedicated infrastructure. Perfect for agencies and resellers.'
              }
            ].map((faq, idx) => (
              <Card key={idx} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700 p-6">
                <h3 className="text-lg font-bold mb-3">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Enterprise CTA */}
        <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30 p-12 text-center">
          <Shield className="w-16 h-16 text-purple-400 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">Need Something Custom?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Enterprise plans, volume discounts, custom integrations, dedicated infrastructure.
            Let's build the perfect solution for your organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-lg px-8 py-6">
              <Phone className="mr-2 w-5 h-5" />
              Schedule a Call
            </Button>
            <Button size="lg" variant="outline" className="border-gray-600 hover:bg-gray-800 text-lg px-8 py-6">
              Request Custom Quote
            </Button>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-gray-900 mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2025 DNA Lang. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="/chat" className="hover:text-white transition-colors">Platform</Link>
              <Link href="/investors" className="hover:text-white transition-colors">Investors</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
