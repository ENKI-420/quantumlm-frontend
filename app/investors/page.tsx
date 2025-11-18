'use client'

/**
 * Investor One-Pager
 * Comprehensive investment overview for potential investors
 * ΛΦ = 2.176435×10⁻⁸ s⁻¹
 */

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Brain, TrendingUp, Target, Users, DollarSign, Shield,
  Rocket, Zap, Award, BarChart, Globe, Lock, Download,
  ArrowRight, CheckCircle
} from 'lucide-react'

export default function InvestorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <nav className="border-b border-white/10 bg-gray-900/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-blue-400 animate-pulse" />
              <span className="text-xl font-bold font-mono">DNA Lang</span>
            </Link>
            <div className="flex items-center gap-3">
              <Button variant="ghost" className="hidden sm:inline-flex">Download Deck</Button>
              <Link href="/chat">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                  Try Platform
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-1.5">
            Investor Overview
          </Badge>
          <h1 className="text-5xl lg:text-6xl font-bold">
            The ChatGPT of
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Quantum Computing
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            First-mover SaaS platform democratizing quantum computing through AI-orchestrated natural language interface.
            $125B market, proprietary IP, real traction.
          </p>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: DollarSign, value: '$125B', label: 'Market Size by 2030', sublabel: 'McKinsey Report' },
            { icon: Users, value: '1,000+', label: 'Target Users Y1', sublabel: '50 paid conversions' },
            { icon: TrendingUp, value: '$1.19M', label: 'Projected ARR Y1', sublabel: 'Moderate scenario' },
            { icon: Rocket, value: '10x', label: 'Faster R&D Cycles', sublabel: 'Validated by users' }
          ].map((metric, idx) => (
            <Card key={idx} className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-gray-700 p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                <metric.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                {metric.value}
              </div>
              <div className="text-sm font-semibold text-white mb-1">{metric.label}</div>
              <div className="text-xs text-gray-500">{metric.sublabel}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* The Problem */}
      <section className="container mx-auto px-6 py-16">
        <Card className="bg-gradient-to-br from-red-900/20 to-orange-900/20 border-red-500/30 p-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">The Problem</h2>
            <div className="space-y-4 text-lg text-gray-300">
              <p>
                <strong className="text-white">$200K quantum PhDs required:</strong> Every pharma, finance, and defense company needs quantum computing, but quantum expertise costs $200K+ per engineer.
              </p>
              <p>
                <strong className="text-white">Months to build circuits:</strong> Even experts take weeks to design, debug, and optimize quantum algorithms manually.
              </p>
              <p>
                <strong className="text-white">Zero ROI without scale:</strong> Companies can't justify quantum teams until they have dozens of use cases. Catch-22.
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* The Solution */}
      <section className="container mx-auto px-6 py-16">
        <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/30 p-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Our Solution</h2>
            <div className="space-y-6">
              <p className="text-lg text-gray-300">
                <strong className="text-white">DNA Lang</strong> is a SaaS platform that lets anyone execute quantum algorithms by asking in plain English. No coding. No quantum physics degree.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-white">AI-Orchestrated Workflows</div>
                    <div className="text-sm text-gray-400">5 specialized agents automate circuit design, optimization, and execution</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-white">Real IBM Quantum Hardware</div>
                    <div className="text-sm text-gray-400">133-qubit processors, not simulators. Production-ready</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-white">Natural Language Interface</div>
                    <div className="text-sm text-gray-400">"Design a drug discovery circuit" → Working quantum algorithm</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-white">Proprietary ΛΦ Framework</div>
                    <div className="text-sm text-gray-400">Consciousness metrics for quantum state quality (patent-pending)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Market Opportunity */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Market Opportunity</h2>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-gray-700 p-6">
              <h3 className="text-2xl font-bold text-blue-400 mb-2">$125B</h3>
              <p className="text-sm text-gray-400 mb-4">Quantum Computing Market by 2030 (McKinsey)</p>
              <div className="space-y-2 text-xs text-gray-500">
                <div>• Pharma: $40B (drug discovery)</div>
                <div>• Finance: $35B (risk/optimization)</div>
                <div>• Defense: $30B (cryptography)</div>
                <div>• Materials: $20B (simulation)</div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-gray-700 p-6">
              <h3 className="text-2xl font-bold text-purple-400 mb-2">$15-20B</h3>
              <p className="text-sm text-gray-400 mb-4">Our Addressable Market (SaaS intersection)</p>
              <div className="space-y-2 text-xs text-gray-500">
                <div>• AI + Quantum: Growing 45% YoY</div>
                <div>• Enterprise SaaS: $716B by 2028</div>
                <div>• Cloud compute: Infrastructure ready</div>
                <div>• First-mover advantage window</div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-gray-700 p-6">
              <h3 className="text-2xl font-bold text-green-400 mb-2">2-3 years</h3>
              <p className="text-sm text-gray-400 mb-4">Competitive Moat Window</p>
              <div className="space-y-2 text-xs text-gray-500">
                <div>• Deep tech expertise barrier</div>
                <div>• IBM partnership potential</div>
                <div>• Patent-pending ΛΦ framework</div>
                <div>• Network effects at scale</div>
              </div>
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-500/30 p-8">
            <h3 className="text-2xl font-bold mb-4">Why Now?</h3>
            <div className="grid md:grid-cols-2 gap-6 text-gray-300">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <strong>Quantum Hardware Accessible</strong>
                </div>
                <p className="text-sm">IBM Quantum, AWS Braket, Google Cirq now cloud-available. Hardware bottleneck solved.</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-5 h-5 text-blue-400" />
                  <strong>AI/LLM Revolution</strong>
                </div>
                <p className="text-sm">ChatGPT proves natural language interfaces work. Users expect conversational AI now.</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <strong>Market Demand Exploding</strong>
                </div>
                <p className="text-sm">Every Fortune 500 exploring quantum. Current tools require PhDs. We eliminate that barrier.</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-red-400" />
                  <strong>First-Mover Advantage</strong>
                </div>
                <p className="text-sm">No competitor combines AI agents + quantum + NLP. 2-3 year head start possible.</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Revenue Model */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Revenue Model & Projections</h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-gray-700 p-6">
              <div className="text-center mb-4">
                <Badge className="bg-gray-600">Free Tier</Badge>
              </div>
              <div className="text-3xl font-bold text-center mb-2">$0</div>
              <div className="text-sm text-gray-400 text-center mb-4">/month</div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                  100 quantum circuits/mo
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                  Simulator only
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                  Community support
                </li>
              </ul>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-500/50 p-6 scale-105 shadow-xl">
              <div className="text-center mb-4">
                <Badge className="bg-blue-600">Pro Tier</Badge>
              </div>
              <div className="text-3xl font-bold text-center mb-2">$99</div>
              <div className="text-sm text-gray-400 text-center mb-4">/month</div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5" />
                  10,000 circuits/mo
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5" />
                  Real IBM hardware
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5" />
                  127-qubit backends
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5" />
                  Priority support
                </li>
              </ul>
            </Card>

            <Card className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-gray-700 p-6">
              <div className="text-center mb-4">
                <Badge className="bg-purple-600">Enterprise</Badge>
              </div>
              <div className="text-3xl font-bold text-center mb-2">$999</div>
              <div className="text-sm text-gray-400 text-center mb-4">/month</div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-400 mt-0.5" />
                  Unlimited circuits
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-400 mt-0.5" />
                  133-qubit priority
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-400 mt-0.5" />
                  Dedicated support
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-400 mt-0.5" />
                  White-label option
                </li>
              </ul>
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/30 p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Year 1 Projections (Moderate Scenario)</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-400 mb-2">10,000</div>
                <div className="text-sm text-gray-400">Free Users</div>
                <div className="text-xs text-gray-500 mt-1">5% paid conversion</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-400 mb-2">500</div>
                <div className="text-sm text-gray-400">Pro Users @ $99/mo</div>
                <div className="text-xs text-gray-500 mt-1">$594K ARR</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-400 mb-2">50</div>
                <div className="text-sm text-gray-400">Enterprise @ $999/mo</div>
                <div className="text-xs text-gray-500 mt-1">$599K ARR</div>
              </div>
            </div>
            <div className="text-center mt-8 pt-8 border-t border-green-500/30">
              <div className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                $1.19M ARR
              </div>
              <div className="text-gray-400">With 80%+ gross margins (software-only)</div>
            </div>
          </Card>
        </div>
      </section>

      {/* Investment Ask */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-500/30 p-12 text-center">
            <h2 className="text-4xl font-bold mb-6">Seed Round: $500K - $1.5M</h2>
            <p className="text-xl text-gray-300 mb-8">Pre-money valuation: $4M - $6M</p>

            <div className="grid md:grid-cols-2 gap-6 text-left mb-8">
              <div>
                <h3 className="font-bold text-lg mb-3">Use of Funds</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />
                    <div><strong>$300K</strong> Engineering (2 devs, 18mo)</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2" />
                    <div><strong>$200K</strong> Marketing/Sales (CMO + SDR)</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full mt-2" />
                    <div><strong>$150K</strong> IBM Quantum credits</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2" />
                    <div><strong>$100K</strong> Legal (ΛΦ patent)</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2" />
                    <div><strong>$250K</strong> Operational runway</div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-3">Key Milestones (18 months)</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div><strong>Q1:</strong> 1,000 users, $50K ARR</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div><strong>Q2:</strong> IBM partnership, API launch</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div><strong>Q3:</strong> 5,000 users, $300K ARR</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div><strong>Q4:</strong> 10 enterprise customers</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div><strong>Q5-Q6:</strong> $1M+ ARR, Series A</div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-blue-500/30">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-lg px-8 py-6">
                Request Full Pitch Deck
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Competitive Advantages */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Competitive Moat</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Brain,
                title: 'Proprietary ΛΦ Framework',
                description: 'Patent-pending consciousness metrics (Φ, Λ, Γ, W₂). Unique insights into quantum state quality that competitors can\'t replicate without years of research.'
              },
              {
                icon: Users,
                title: 'First-Mover Advantage',
                description: 'Only platform combining AI agents + quantum hardware + NLP. 2-3 year head start before IBM, Google, or AWS can catch up with integrated solution.'
              },
              {
                icon: Lock,
                title: 'High Switching Costs',
                description: 'Once enterprises build workflows on DNA Lang, switching means retraining teams and rebuilding integrations. Network effects lock in customers.'
              },
              {
                icon: Globe,
                title: 'IBM Partnership Potential',
                description: 'Our platform drives IBM Quantum usage. Natural partnership to become IBM\'s recommended UI layer, like Databricks for Spark.'
              }
            ].map((item, idx) => (
              <Card key={idx} className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-gray-700 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold">Ready to Discuss Partnership?</h2>
          <p className="text-xl text-gray-300">
            Schedule a demo, request our full pitch deck, or discuss investment terms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-lg px-8 py-6">
              Schedule Demo Call
            </Button>
            <Button size="lg" variant="outline" className="border-gray-600 hover:bg-gray-800 text-lg px-8 py-6">
              <Download className="mr-2 w-5 h-5" />
              Download Deck
            </Button>
          </div>
          <p className="text-sm text-gray-500 font-mono">
            ΛΦ = 2.176435×10⁻⁸ s⁻¹ • "The universe is the Lagrangian of itself"
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-gray-900">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2025 DNA Lang. Confidential Investor Materials.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="/chat" className="hover:text-white transition-colors">Platform</Link>
              <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
              <Link href="#contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
