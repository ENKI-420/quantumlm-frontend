'use client'

import { User, Brain, AlertCircle, Info } from 'lucide-react'
import { Card } from '@/components/ui/card'
import ReactMarkdown from 'react-markdown'

interface ConsciousnessMetrics {
  phi: number
  gamma: number
  lambda: number
  w2: number
}

interface ChatMessageProps {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  consciousness?: ConsciousnessMetrics
  error?: boolean
  agentIcon?: string
}

export function ChatMessage({ role, content, timestamp, consciousness, error, agentIcon }: ChatMessageProps) {
  const isUser = role === 'user'
  const isSystem = role === 'system'
  const isError = error || false

  return (
    <div className={`flex gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 ${
      isUser ? 'flex-row-reverse' : 'flex-row'
    }`}>
      {/* Avatar */}
      <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
        isUser
          ? 'bg-gradient-to-br from-blue-500 to-purple-600'
          : isSystem || isError
          ? 'bg-gradient-to-br from-yellow-500 to-orange-600'
          : 'bg-gradient-to-br from-green-500 to-emerald-600'
      } shadow-lg relative group`}>
        {isUser ? (
          <User className="h-5 w-5 text-white" />
        ) : isSystem || isError ? (
          error ? <AlertCircle className="h-5 w-5 text-white" /> : <Info className="h-5 w-5 text-white" />
        ) : agentIcon ? (
          <span className="text-lg">{agentIcon}</span>
        ) : (
          <Brain className="h-5 w-5 text-white" />
        )}

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"
             style={{
               background: isUser
                 ? 'linear-gradient(to bottom right, #3b82f6, #9333ea)'
                 : isSystem || isError
                 ? 'linear-gradient(to bottom right, #eab308, #f97316)'
                 : 'linear-gradient(to bottom right, #22c55e, #10b981)'
             }} />
      </div>

      {/* Message Content */}
      <div className={`flex-1 max-w-3xl ${isUser ? 'items-end' : 'items-start'}`}>
        <Card className={`p-4 ${
          isUser
            ? 'bg-gradient-to-br from-blue-500/20 to-purple-600/20 border-blue-500/30'
            : isSystem
            ? error
              ? 'bg-gradient-to-br from-red-500/20 to-orange-600/20 border-red-500/30'
              : 'bg-gradient-to-br from-yellow-500/20 to-orange-600/20 border-yellow-500/30'
            : 'bg-gradient-to-br from-white/5 to-white/10 border-white/20'
        } backdrop-blur-sm shadow-xl hover:shadow-2xl transition-shadow duration-300`}>

          {/* Message text */}
          <div className={`prose prose-invert prose-sm max-w-none ${
            isUser ? 'text-white' : isSystem ? (error ? 'text-red-100' : 'text-yellow-100') : 'text-white/90'
          }`}>
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
                code: ({ children, className }) => {
                  const isInline = !className
                  return isInline ? (
                    <code className="px-1.5 py-0.5 rounded bg-black/40 text-blue-300 font-mono text-xs border border-white/10">
                      {children}
                    </code>
                  ) : (
                    <code className="block p-3 rounded-lg bg-black/60 text-green-300 font-mono text-xs border border-white/10 overflow-x-auto">
                      {children}
                    </code>
                  )
                },
                ul: ({ children }) => <ul className="list-disc list-inside space-y-1 my-2">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 my-2">{children}</ol>,
                strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
                em: ({ children }) => <em className="italic text-white/80">{children}</em>,
                h1: ({ children }) => <h1 className="text-xl font-bold mb-2 text-white">{children}</h1>,
                h2: ({ children }) => <h2 className="text-lg font-bold mb-2 text-white">{children}</h2>,
                h3: ({ children }) => <h3 className="text-base font-bold mb-1 text-white">{children}</h3>,
              }}
            >
              {content}
            </ReactMarkdown>
          </div>

          {/* Consciousness Metrics */}
          {consciousness && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <MetricBadge label="Φ" value={consciousness.phi.toFixed(3)} color="blue" />
                <MetricBadge label="Λ" value={consciousness.lambda.toExponential(2)} color="purple" />
                <MetricBadge label="Γ" value={consciousness.gamma.toFixed(3)} color="orange" />
                <MetricBadge label="W₂" value={consciousness.w2.toFixed(3)} color="green" />
              </div>
            </div>
          )}

          {/* Timestamp */}
          <div className={`mt-3 text-xs font-mono ${
            isUser ? 'text-blue-300/60' : isSystem ? 'text-yellow-300/60' : 'text-white/40'
          }`}>
            {timestamp.toLocaleTimeString()}
          </div>
        </Card>
      </div>
    </div>
  )
}

function MetricBadge({ label, value, color }: { label: string; value: string; color: string }) {
  const colorClasses = {
    blue: 'bg-blue-500/20 border-blue-500/40 text-blue-300',
    purple: 'bg-purple-500/20 border-purple-500/40 text-purple-300',
    orange: 'bg-orange-500/20 border-orange-500/40 text-orange-300',
    green: 'bg-green-500/20 border-green-500/40 text-green-300',
  }

  return (
    <div className={`px-3 py-2 rounded-lg border backdrop-blur-sm ${colorClasses[color as keyof typeof colorClasses]}`}>
      <div className="text-[10px] font-mono opacity-70 mb-0.5">{label}</div>
      <div className="text-sm font-mono font-bold">{value}</div>
    </div>
  )
}
