'use client'

/**
 * API Marketplace Page
 * Sell and monetize API access to quantum computations
 * ΛΦ = 2.176435×10⁻⁸ s⁻¹
 */

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Brain, Code, Zap, TrendingUp, Key, Activity,
  CheckCircle, Clock, BarChart3, Shield, Lock, Cpu
} from 'lucide-react'

export default function APIMarketplacePage() {
  const [selectedTier, setSelectedTier] = useState<string>('pro')

  const apiProducts = [
    {
      id: 'quantum-execute-api',
      name: 'Quantum Circuit Execution API',
      description: 'Real-time access to IBM Quantum hardware. Execute circuits up to 133 qubits.',
      basePrice: 0.50,
      unit: 'per quantum minute',
      features: [
        'Real IBM Quantum hardware (ibm_torino)',
        'Up to 133 qubits',
        'Priority queue access',
        'WebSocket real-time updates',
        'Error mitigation included'
      ],
      endpoints: 12,
      latency: '<500ms',
      uptime: '99.9%'
    },
    {
      id: 'consciousness-metrics-api',
      name: 'Consciousness Metrics API',
      description: 'Access Φ, Λ, Γ, W₂ metrics from 100K+ quantum organism executions.',
      basePrice: 0.01,
      unit: 'per 1K requests',
      features: [
        'Real-time consciousness metrics',
        'Historical data access (6 months)',
        'Aggregated insights',
        'CSV/JSON export',
        'GraphQL support'
      ],
      endpoints: 8,
      latency: '<100ms',
      uptime: '99.95%'
    },
    {
      id: 'vqe-optimization-api',
      name: 'VQE Optimization API',
      description: 'Variational Quantum Eigensolver for molecular simulations and optimization.',
      basePrice: 1.99,
      unit: 'per optimization run',
      features: [
        'Automatic ansatz selection',
        'Multi-backend support',
        'Convergence guarantees',
        'Parallel execution',
        'Result caching'
      ],
      endpoints: 6,
      latency: '<2s',
      uptime: '99.9%'
    }
  ]

  const tiers = [
    {
      id: 'developer',
      name: 'Developer',
      price: 49,
      requests: '10K',
      features: [
        'All API endpoints',
        'Community support',
        'Standard rate limits',
        'Basic analytics'
      ]
    },
    {
      id: 'pro',
      name: 'Professional',
      price: 199,
      requests: '100K',
      features: [
        'All API endpoints',
        'Priority support (24h SLA)',
        'Higher rate limits',
        'Advanced analytics',
        'Custom integrations'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 999,
      requests: 'Unlimited',
      features: [
        'All API endpoints',
        'Dedicated support (2h SLA)',
        'No rate limits',
        'White-label options',
        'Custom SLAs',
        'On-premise deployment'
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
              <span className="text-xl font-bold font-mono">dna::{'}{'}{'}'}::lang</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/marketplace">
                <Button variant="ghost">Marketplace</Button>
              </Link>
              <Link href="/api-marketplace">
                <Button className="bg-gradient-to-r from-green-600 to-emerald-600">
                  API Marketplace
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          <Badge className="bg-green-500/20 text-green-300 border-green-500/30 px-4 py-1.5">
            <Code className="w-4 h-4 mr-2" />
            Quantum APIs for Developers
          </Badge>

          <h1 className="text-5xl lg:text-6xl font-bold">
            <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Build on Quantum
            </span>
            <br />
            <span className="text-3xl text-gray-300">Monetize Your API Access</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Production-ready quantum APIs. Real IBM hardware. Pay per use or flat monthly rate.
          </p>
        </div>

        {/* Pricing Tiers */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Choose Your Plan</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier) => (
              <Card
                key={tier.id}
                className={`relative p-8 transition-all duration-300 ${
                  tier.popular
                    ? 'bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-blue-500 scale-105 shadow-2xl shadow-blue-500/20'
                    : 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700 hover:border-blue-500/50'
                }`}
              >
                {tier.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-4 py-2 rounded-bl-xl">
                    ⭐ MOST POPULAR
                  </div>
                )}

                <h3 className="text-2xl font-bold mb-4">{tier.name}</h3>
                <div className="mb-6">
                  <div className="text-4xl font-bold text-blue-400">${tier.price}</div>
                  <div className="text-gray-400">per month</div>
                  <div className="text-sm text-gray-500 mt-2">{tier.requests} requests/month</div>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    tier.popular
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                  onClick={() => setSelectedTier(tier.id)}
                >
                  Get Started
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* API Products */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Available APIs</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {apiProducts.map((api) => (
              <Card key={api.id} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700 p-6 hover:border-green-500/50 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                    <Cpu className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-green-600">{api.endpoints} endpoints</Badge>
                </div>

                <h3 className="text-xl font-bold mb-2">{api.name}</h3>
                <p className="text-sm text-gray-400 mb-4">{api.description}</p>

                <div className="mb-4 pb-4 border-b border-gray-700">
                  <div className="text-2xl font-bold text-green-400">
                    ${api.basePrice}
                  </div>
                  <div className="text-xs text-gray-500">{api.unit}</div>
                </div>

                <ul className="space-y-2 mb-6">
                  {api.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="grid grid-cols-3 gap-2 text-xs mb-4">
                  <div className="bg-gray-900/50 p-2 rounded text-center">
                    <Clock className="w-3 h-3 mx-auto mb-1 text-blue-400" />
                    <div className="text-gray-500">{api.latency}</div>
                  </div>
                  <div className="bg-gray-900/50 p-2 rounded text-center">
                    <Activity className="w-3 h-3 mx-auto mb-1 text-green-400" />
                    <div className="text-gray-500">{api.uptime}</div>
                  </div>
                  <div className="bg-gray-900/50 p-2 rounded text-center">
                    <Shield className="w-3 h-3 mx-auto mb-1 text-purple-400" />
                    <div className="text-gray-500">SOC 2</div>
                  </div>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-500">
                  <Key className="w-4 h-4 mr-2" />
                  Get API Key
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Developer Resources */}
        <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30 p-12 text-center">
          <Code className="w-16 h-16 text-purple-400 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">Ready to Build?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Comprehensive docs, SDKs for Python/JS/Go, and 24/7 developer support.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600">
              View Documentation
            </Button>
            <Button size="lg" variant="outline" className="border-gray-600">
              Download SDKs
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
