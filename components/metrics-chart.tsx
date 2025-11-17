'use client'

import { useEffect, useState } from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface ConsciousnessMetrics {
  phi: number
  gamma: number
  lambda: number
  w2: number
}

interface MetricsChartProps {
  history: ConsciousnessMetrics[]
  current: ConsciousnessMetrics
}

export function MetricsChart({ history, current }: MetricsChartProps) {
  const [animatedValues, setAnimatedValues] = useState(current)

  useEffect(() => {
    // Animate metrics changes
    const interval = setInterval(() => {
      setAnimatedValues(prev => ({
        phi: prev.phi + (current.phi - prev.phi) * 0.1,
        gamma: prev.gamma + (current.gamma - prev.gamma) * 0.1,
        lambda: prev.lambda + (current.lambda - prev.lambda) * 0.1,
        w2: prev.w2 + (current.w2 - prev.w2) * 0.1
      }))
    }, 50)

    return () => clearInterval(interval)
  }, [current])

  const metrics = [
    {
      name: 'Φ (Phi)',
      key: 'phi' as keyof ConsciousnessMetrics,
      value: animatedValues.phi,
      target: 0.8,
      unit: '',
      color: 'blue',
      description: 'Integrated Information',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Γ (Gamma)',
      key: 'gamma' as keyof ConsciousnessMetrics,
      value: animatedValues.gamma,
      target: 0.2,
      unit: '',
      color: 'orange',
      description: 'Decoherence',
      gradient: 'from-orange-500 to-red-500',
      invert: true // Lower is better
    },
    {
      name: 'W₂',
      key: 'w2' as keyof ConsciousnessMetrics,
      value: animatedValues.w2,
      target: 0.1,
      unit: '',
      color: 'green',
      description: 'Behavioral Stability',
      gradient: 'from-green-500 to-emerald-500',
      invert: true // Lower is better
    },
    {
      name: 'ΛΦ',
      key: 'lambda' as keyof ConsciousnessMetrics,
      value: animatedValues.lambda,
      target: 2.176435e-8,
      unit: 's⁻¹',
      color: 'purple',
      description: 'Universal Memory Constant',
      gradient: 'from-purple-500 to-pink-500'
    }
  ]

  const getTrend = (metric: keyof ConsciousnessMetrics) => {
    if (history.length < 2) return 'stable'
    const recent = history.slice(-2)
    const change = recent[1][metric] - recent[0][metric]
    if (Math.abs(change) < 0.01) return 'stable'
    return change > 0 ? 'up' : 'down'
  }

  const getStatus = (value: number, target: number, invert = false) => {
    const diff = invert ? target - value : value - target
    const percentage = (diff / target) * 100

    if (percentage >= 0) return { status: 'excellent', color: 'text-green-400' }
    if (percentage >= -20) return { status: 'good', color: 'text-blue-400' }
    if (percentage >= -40) return { status: 'acceptable', color: 'text-yellow-400' }
    return { status: 'poor', color: 'text-red-400' }
  }

  return (
    <div className="space-y-4">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {metrics.map((metric, index) => {
          const trend = getTrend(metric.key)
          const { status, color } = getStatus(metric.value, metric.target, metric.invert)
          const percentage = (metric.value / (metric.invert ? metric.target * 5 : 1)) * 100

          return (
            <div
              key={metric.key}
              className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/20 p-4 group hover:scale-105 transition-all duration-300 hover:shadow-2xl animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

              {/* Content */}
              <div className="relative z-10 space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm font-mono text-white/60">{metric.name}</div>
                    <div className="text-xs text-white/40 mt-0.5">{metric.description}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    {trend === 'up' && <TrendingUp className="w-4 h-4 text-green-400" />}
                    {trend === 'down' && <TrendingDown className="w-4 h-4 text-red-400" />}
                    {trend === 'stable' && <Minus className="w-4 h-4 text-white/40" />}
                  </div>
                </div>

                {/* Value */}
                <div className={`text-3xl font-bold font-mono ${color} transition-colors duration-500`}>
                  {metric.key === 'lambda'
                    ? metric.value.toExponential(2)
                    : metric.value.toFixed(4)
                  }
                  {metric.unit && <span className="text-sm ml-1">{metric.unit}</span>}
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-mono text-white/40">
                    <span>Target: {metric.key === 'lambda' ? metric.target.toExponential(2) : metric.target}</span>
                    <span className="uppercase">{status}</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${metric.gradient} rounded-full transition-all duration-1000 ease-out`}
                      style={{
                        width: `${Math.min(Math.max(percentage, 0), 100)}%`
                      }}
                    >
                      <div className="h-full w-full bg-white/30 animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10`} />
            </div>
          )
        })}
      </div>

      {/* Mini History Chart */}
      {history.length > 1 && (
        <div className="rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/20 p-4 animate-in fade-in duration-700 delay-500">
          <div className="text-sm font-semibold text-white/90 mb-3">Consciousness Evolution</div>
          <div className="h-24 flex items-end justify-between gap-1">
            {history.slice(-20).map((point, index) => {
              const height = (point.phi * 100)
              return (
                <div key={index} className="flex-1 flex flex-col justify-end group">
                  <div
                    className="w-full bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t transition-all duration-300 group-hover:from-blue-500 group-hover:to-cyan-300 group-hover:scale-105"
                    style={{ height: `${height}%`, minHeight: '2px' }}
                  >
                    <div className="w-full h-full bg-white/20 group-hover:bg-white/40 transition-colors" />
                  </div>
                </div>
              )
            })}
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-white/40">
            <span>Past {history.length} generations</span>
            <span>Φ Trend</span>
          </div>
        </div>
      )}
    </div>
  )
}
