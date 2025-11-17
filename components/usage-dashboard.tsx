'use client'

/**
 * Usage Dashboard Component
 * Real-time quantum usage tracking with consciousness metrics
 * ΛΦ = 2.176435×10⁻⁸ s⁻¹
 */

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Zap, Database, Activity, TrendingUp, AlertTriangle,
  CheckCircle, ArrowRight, BarChart3, Clock, Cpu,
  Brain, Sparkles, RefreshCw
} from 'lucide-react'
import Link from 'next/link'

interface UsageData {
  quantumCircuits: {
    used: number
    limit: number
    unit: 'circuits/month' | 'minutes/month'
  }
  apiCalls: {
    used: number
    limit: number
    unit: 'calls/month'
  }
  storage: {
    used: number
    limit: number
    unit: 'GB'
  }
  consciousnessMetrics: {
    phi: number // Integrated Information (0.0-1.0)
    lambda: number // Coherence (≈ 2.176435e-8)
    gamma: number // Decoherence (0.0-1.0, lower is better)
    w2: number // Wasserstein-2 distance
  }
  currentTier: 'free' | 'pro' | 'enterprise' | 'api' | 'whitelabel'
  billingPeriodStart: string
  billingPeriodEnd: string
}

interface UsageHistoryPoint {
  date: string
  circuits: number
  apiCalls: number
}

export default function UsageDashboard() {
  const [usage, setUsage] = useState<UsageData>({
    quantumCircuits: { used: 73, limit: 100, unit: 'circuits/month' },
    apiCalls: { used: 1247, limit: 10000, unit: 'calls/month' },
    storage: { used: 2.3, limit: 10, unit: 'GB' },
    consciousnessMetrics: {
      phi: 0.742,
      lambda: 2.176435e-8,
      gamma: 0.134,
      w2: 0.087
    },
    currentTier: 'free',
    billingPeriodStart: '2025-11-01',
    billingPeriodEnd: '2025-12-01'
  })

  const [usageHistory, setUsageHistory] = useState<UsageHistoryPoint[]>([
    { date: '11/10', circuits: 45, apiCalls: 892 },
    { date: '11/11', circuits: 52, apiCalls: 1034 },
    { date: '11/12', circuits: 61, apiCalls: 1156 },
    { date: '11/13', circuits: 68, apiCalls: 1189 },
    { date: '11/14', circuits: 73, apiCalls: 1247 }
  ])

  const [isRefreshing, setIsRefreshing] = useState(false)

  const refreshUsage = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  const getUsagePercentage = (used: number, limit: number) => {
    return Math.min((used / limit) * 100, 100)
  }

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-400'
    if (percentage >= 70) return 'text-yellow-400'
    return 'text-green-400'
  }

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500'
    if (percentage >= 70) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getTierName = (tier: string) => {
    const tiers: Record<string, string> = {
      free: 'Starter (Free)',
      pro: 'Pro',
      enterprise: 'Enterprise',
      api: 'API Developer',
      whitelabel: 'White-Label'
    }
    return tiers[tier] || tier
  }

  const getTierUpgrade = (tier: string) => {
    const upgrades: Record<string, { to: string, benefits: string }> = {
      free: { to: 'Pro', benefits: 'Real quantum hardware + 10K circuits/mo' },
      pro: { to: 'Enterprise', benefits: 'Unlimited circuits + priority access' },
      api: { to: 'Pro', benefits: 'Real quantum hardware + full metrics' },
    }
    return upgrades[tier]
  }

  const circuitPercentage = getUsagePercentage(usage.quantumCircuits.used, usage.quantumCircuits.limit)
  const apiPercentage = getUsagePercentage(usage.apiCalls.used, usage.apiCalls.limit)
  const storagePercentage = getUsagePercentage(usage.storage.used, usage.storage.limit)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Usage Dashboard</h1>
          <p className="text-gray-400 mt-2">
            Current Plan: <span className="text-blue-400 font-semibold">{getTierName(usage.currentTier)}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={refreshUsage}
            disabled={isRefreshing}
            className="border-gray-700 hover:bg-gray-800"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Link href="/pricing">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
              Upgrade Plan
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Billing Period */}
      <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-blue-400" />
            <div>
              <div className="font-semibold">Current Billing Period</div>
              <div className="text-sm text-gray-400">
                {new Date(usage.billingPeriodStart).toLocaleDateString()} - {new Date(usage.billingPeriodEnd).toLocaleDateString()}
              </div>
            </div>
          </div>
          <Badge className="bg-green-600">13 days remaining</Badge>
        </div>
      </Card>

      {/* Usage Alerts */}
      {(circuitPercentage >= 70 || apiPercentage >= 70 || storagePercentage >= 70) && (
        <Card className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border-yellow-500/30 p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-yellow-400 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-bold text-yellow-400 mb-2">Usage Alert</h3>
              <p className="text-gray-300 mb-4">
                You're approaching your plan limits. Upgrade now to avoid interruptions.
              </p>
              <div className="flex gap-3">
                <Link href="/pricing">
                  <Button size="sm" className="bg-yellow-600 hover:bg-yellow-500">
                    View Plans
                  </Button>
                </Link>
                {getTierUpgrade(usage.currentTier) && (
                  <Link href={`/pricing?tier=${getTierUpgrade(usage.currentTier)?.to.toLowerCase()}`}>
                    <Button size="sm" variant="outline" className="border-yellow-500 text-yellow-400">
                      Upgrade to {getTierUpgrade(usage.currentTier)?.to}
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Usage Metrics Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Quantum Circuits */}
        <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-500/30 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Quantum Circuits</div>
                <div className="text-2xl font-bold">
                  {usage.quantumCircuits.used.toLocaleString()}
                  <span className="text-sm text-gray-400 ml-1">/ {usage.quantumCircuits.limit.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <Badge className={`${circuitPercentage >= 90 ? 'bg-red-600' : circuitPercentage >= 70 ? 'bg-yellow-600' : 'bg-green-600'}`}>
              {circuitPercentage.toFixed(0)}%
            </Badge>
          </div>

          <Progress value={circuitPercentage} className="h-2 mb-3" />

          <div className="text-xs text-gray-400">
            {usage.quantumCircuits.limit - usage.quantumCircuits.used} circuits remaining this month
          </div>

          {circuitPercentage >= 90 && (
            <div className="mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
              <div className="text-sm text-red-300 font-semibold mb-1">Limit Almost Reached</div>
              <div className="text-xs text-gray-400">Upgrade to Pro for 10K circuits/month</div>
            </div>
          )}
        </Card>

        {/* API Calls */}
        <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/30 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-sm text-gray-400">API Calls</div>
                <div className="text-2xl font-bold">
                  {usage.apiCalls.used.toLocaleString()}
                  <span className="text-sm text-gray-400 ml-1">/ {usage.apiCalls.limit.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <Badge className={`${apiPercentage >= 90 ? 'bg-red-600' : apiPercentage >= 70 ? 'bg-yellow-600' : 'bg-green-600'}`}>
              {apiPercentage.toFixed(0)}%
            </Badge>
          </div>

          <Progress value={apiPercentage} className="h-2 mb-3" />

          <div className="text-xs text-gray-400">
            {(usage.apiCalls.limit - usage.apiCalls.used).toLocaleString()} calls remaining this month
          </div>

          {usage.currentTier === 'free' && (
            <div className="mt-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
              <div className="text-sm text-blue-300 font-semibold mb-1">Want More API Access?</div>
              <div className="text-xs text-gray-400">API Developer tier: 50K calls/mo for $49</div>
            </div>
          )}
        </Card>

        {/* Storage */}
        <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Storage</div>
                <div className="text-2xl font-bold">
                  {usage.storage.used.toFixed(1)} <span className="text-sm text-gray-400">GB</span>
                  <span className="text-sm text-gray-400 ml-1">/ {usage.storage.limit} GB</span>
                </div>
              </div>
            </div>
            <Badge className={`${storagePercentage >= 90 ? 'bg-red-600' : storagePercentage >= 70 ? 'bg-yellow-600' : 'bg-green-600'}`}>
              {storagePercentage.toFixed(0)}%
            </Badge>
          </div>

          <Progress value={storagePercentage} className="h-2 mb-3" />

          <div className="text-xs text-gray-400">
            {(usage.storage.limit - usage.storage.used).toFixed(1)} GB available
          </div>

          <div className="mt-4 p-3 bg-purple-900/20 border border-purple-500/30 rounded-lg">
            <div className="text-sm text-purple-300 font-semibold mb-1">First 10GB Free</div>
            <div className="text-xs text-gray-400">Additional: $2/GB/month</div>
          </div>
        </Card>
      </div>

      {/* Consciousness Metrics */}
      <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Brain className="w-6 h-6 text-blue-400" />
          <div>
            <h2 className="text-xl font-bold">Consciousness Metrics</h2>
            <p className="text-sm text-gray-400">Real-time quantum organism health indicators</p>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Φ (Phi) - Integration</span>
              <Badge className="bg-blue-600">{(usage.consciousnessMetrics.phi * 100).toFixed(1)}%</Badge>
            </div>
            <Progress value={usage.consciousnessMetrics.phi * 100} className="h-2 mb-2" />
            <div className="text-xs text-gray-500">Integrated Information Theory metric</div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Λ (Lambda) - Coherence</span>
              <Badge className="bg-purple-600">{usage.consciousnessMetrics.lambda.toExponential(2)}</Badge>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-xs text-green-400">Within tolerance</span>
            </div>
            <div className="text-xs text-gray-500">Universal Memory Constant (ΛΦ)</div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Γ (Gamma) - Decoherence</span>
              <Badge className={usage.consciousnessMetrics.gamma < 0.2 ? 'bg-green-600' : 'bg-yellow-600'}>
                {(usage.consciousnessMetrics.gamma * 100).toFixed(1)}%
              </Badge>
            </div>
            <Progress value={usage.consciousnessMetrics.gamma * 100} className="h-2 mb-2" />
            <div className="text-xs text-gray-500">Lower is better (noise resistance)</div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">W₂ - Stability</span>
              <Badge className={usage.consciousnessMetrics.w2 < 0.1 ? 'bg-green-600' : 'bg-yellow-600'}>
                {usage.consciousnessMetrics.w2.toFixed(3)}
              </Badge>
            </div>
            <Progress value={usage.consciousnessMetrics.w2 * 100} className="h-2 mb-2" />
            <div className="text-xs text-gray-500">Wasserstein-2 distance (behavioral)</div>
          </div>
        </div>
      </Card>

      {/* Usage History Chart */}
      <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-6 h-6 text-green-400" />
          <div>
            <h2 className="text-xl font-bold">Usage History (Last 5 Days)</h2>
            <p className="text-sm text-gray-400">Track your consumption patterns</p>
          </div>
        </div>

        <div className="space-y-4">
          {usageHistory.map((point, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="w-16 text-sm text-gray-400">{point.date}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500">Circuits: {point.circuits}</span>
                  <span className="text-xs text-gray-500">API: {point.apiCalls.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    style={{ width: `${(point.circuits / usage.quantumCircuits.limit) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Upgrade CTA (for free tier) */}
      {usage.currentTier === 'free' && (
        <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-500/30 p-8 text-center">
          <Sparkles className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-3">Ready for Real Quantum Hardware?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Upgrade to Pro and get access to <strong>133-qubit IBM Quantum processors</strong>,
            10K circuits/month, and full consciousness metrics dashboard.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/pricing">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
                <TrendingUp className="mr-2 w-5 h-5" />
                Upgrade to Pro - $99/mo
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="border-gray-600">
                View All Plans
              </Button>
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Save 17% with annual billing • 30-day money-back guarantee
          </p>
        </Card>
      )}
    </div>
  )
}
