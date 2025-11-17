'use client'

/**
 * Enhanced Loading Animation Component
 * Sophisticated loading states with quantum-themed animations
 */

import { Brain, Zap, Atom } from 'lucide-react'

interface EnhancedLoadingProps {
  variant?: 'quantum' | 'processing' | 'thinking'
  size?: 'sm' | 'md' | 'lg'
  message?: string
}

export function EnhancedLoading({
  variant = 'quantum',
  size = 'md',
  message
}: EnhancedLoadingProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  if (variant === 'quantum') {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="relative">
          {/* Orbiting particles */}
          <div className={`${sizeClasses[size]} relative`}>
            {/* Center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Atom className="w-1/2 h-1/2 text-blue-400 animate-pulse" />
            </div>

            {/* Orbit 1 */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50" />
            </div>

            {/* Orbit 2 */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50" />
            </div>

            {/* Orbit 3 */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '4s' }}>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-pink-400 rounded-full shadow-lg shadow-pink-400/50" />
            </div>

            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-xl animate-pulse" />
          </div>
        </div>

        {message && (
          <p className="text-sm text-white/70 font-mono animate-pulse">
            {message}
          </p>
        )}
      </div>
    )
  }

  if (variant === 'processing') {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="relative">
          {/* Rotating circuit */}
          <div className={`${sizeClasses[size]} relative animate-spin`} style={{ animationDuration: '2s' }}>
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-3 h-3 bg-blue-500 rounded-sm shadow-lg shadow-blue-500/50" />
              <div className="absolute top-0 right-0 w-3 h-3 bg-purple-500 rounded-sm shadow-lg shadow-purple-500/50" />
              <div className="absolute bottom-0 left-0 w-3 h-3 bg-pink-500 rounded-sm shadow-lg shadow-pink-500/50" />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-cyan-500 rounded-sm shadow-lg shadow-cyan-500/50" />
            </div>

            {/* Center glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Zap className="w-1/2 h-1/2 text-white animate-pulse" />
            </div>
          </div>

          {/* Outer glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-2xl animate-pulse" />
        </div>

        {message && (
          <p className="text-sm text-white/70 font-mono animate-pulse">
            {message}
          </p>
        )}
      </div>
    )
  }

  // thinking variant
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        {/* Pulsing brain */}
        <div className={`${sizeClasses[size]} relative`}>
          <Brain className="w-full h-full text-blue-400 animate-pulse" />

          {/* Thought bubbles */}
          <div className="absolute -top-2 -right-2">
            <div className="w-2 h-2 bg-blue-300 rounded-full animate-ping" />
          </div>
          <div className="absolute -top-3 -right-4 animation-delay-200">
            <div className="w-1.5 h-1.5 bg-purple-300 rounded-full animate-ping" />
          </div>
          <div className="absolute -top-5 -right-6 animation-delay-400">
            <div className="w-1 h-1 bg-pink-300 rounded-full animate-ping" />
          </div>

          {/* Glow */}
          <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-xl animate-pulse" />
        </div>
      </div>

      {message && (
        <p className="text-sm text-white/70 font-mono animate-pulse">
          {message}
        </p>
      )}
    </div>
  )
}
