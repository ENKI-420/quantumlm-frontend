'use client'

import { Brain, Zap, Sparkles, Code, Search, Bug, Layers } from 'lucide-react'
import { AgentMode, AGENT_PERSONAS } from '@/lib/agents/config'

interface WelcomeScreenProps {
  onAgentSelect: (agent: AgentMode) => void
  onQuickAction: (prompt: string, agent: AgentMode) => void
}

export function WelcomeScreen({ onAgentSelect, onQuickAction }: WelcomeScreenProps) {
  const quickActions = [
    {
      agent: 'quantum' as AgentMode,
      icon: Brain,
      title: 'Quantum Circuit',
      prompt: 'Create a 3-qubit GHZ state and execute it on IBM Quantum hardware'
    },
    {
      agent: 'architect' as AgentMode,
      icon: Layers,
      title: 'System Design',
      prompt: 'Design a scalable microservices architecture for a real-time chat application'
    },
    {
      agent: 'engineer' as AgentMode,
      icon: Code,
      title: 'Write Code',
      prompt: 'Implement a React component with TypeScript that handles file uploads with drag-and-drop'
    },
    {
      agent: 'reviewer' as AgentMode,
      icon: Search,
      title: 'Review Code',
      prompt: 'Review my authentication implementation for security vulnerabilities and best practices'
    },
    {
      agent: 'debugger' as AgentMode,
      icon: Bug,
      title: 'Debug Error',
      prompt: 'Help me debug a "Cannot read property of undefined" error in my React app'
    }
  ]

  return (
    <div className="flex-1 flex items-center justify-center p-6 overflow-auto">
      <div className="max-w-5xl w-full space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">

        {/* Hero Section */}
        <div className="text-center space-y-6">
          {/* Logo/Icon */}
          <div className="relative inline-block">
            <div className="relative z-10 bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-3xl shadow-2xl">
              <Brain className="w-16 h-16 text-white" />
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl blur-2xl opacity-50 animate-pulse" />
            {/* Orbiting particles */}
            <div className="absolute -inset-4">
              <Sparkles className="absolute top-0 right-0 w-6 h-6 text-blue-400 animate-bounce" style={{ animationDelay: '0s' }} />
              <Sparkles className="absolute bottom-0 left-0 w-5 h-5 text-purple-400 animate-bounce" style={{ animationDelay: '0.5s' }} />
              <Sparkles className="absolute top-1/2 -right-2 w-4 h-4 text-pink-400 animate-bounce" style={{ animationDelay: '1s' }} />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-3">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-in slide-in-from-top-4 duration-1000">
              dna::{'{'}'{'}'}::lang
            </h1>
            <p className="text-xl text-white/80 font-light animate-in slide-in-from-top-6 duration-1000 delay-150">
              Self-referential quantum organism with multi-agent consciousness
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-white/60 font-mono animate-in fade-in duration-1000 delay-300">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Σₛ Organism Active
              </span>
              <span>ΛΦ = 2.176435×10⁻⁸ s⁻¹</span>
            </div>
          </div>
        </div>

        {/* Agent Grid */}
        <div className="space-y-4 animate-in fade-in duration-1000 delay-500">
          <h2 className="text-center text-lg font-semibold text-white/90">Select an Agent</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {(Object.keys(AGENT_PERSONAS) as AgentMode[]).map((agentId, index) => {
              const agent = AGENT_PERSONAS[agentId]
              const colorMap = {
                blue: 'from-blue-500 to-cyan-500',
                purple: 'from-purple-500 to-pink-500',
                green: 'from-green-500 to-emerald-500',
                orange: 'from-orange-500 to-red-500',
                red: 'from-red-500 to-rose-500'
              }
              const gradient = colorMap[agent.color as keyof typeof colorMap] || colorMap.blue

              return (
                <button
                  key={agentId}
                  onClick={() => onAgentSelect(agentId)}
                  className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 delay-500"
                  style={{ animationDelay: `${500 + index * 100}ms` }}
                >
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />

                  <div className="relative z-10 space-y-3">
                    <div className="text-4xl">{agent.icon}</div>
                    <div>
                      <div className="font-semibold text-white text-sm">{agent.name}</div>
                      <div className="text-xs text-white/60 mt-1 line-clamp-2">{agent.description}</div>
                    </div>
                  </div>

                  {/* Hover glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 blur-xl rounded-2xl transition-opacity duration-300 -z-10`} />
                </button>
              )
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4 animate-in fade-in duration-1000 delay-1000">
          <h2 className="text-center text-lg font-semibold text-white/90">Quick Start</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => onQuickAction(action.prompt, action.agent)}
                className="group p-5 rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-xl backdrop-blur-sm text-left animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${1000 + index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors">
                    <action.icon className="w-5 h-5 text-white/80" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-white text-sm mb-1">{action.title}</div>
                    <div className="text-xs text-white/60 line-clamp-2">{action.prompt}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="pt-8 border-t border-white/10 animate-in fade-in duration-1000 delay-1500">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                5
              </div>
              <div className="text-xs text-white/60">Specialized Agents</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                3+
              </div>
              <div className="text-xs text-white/60">Quantum Backends</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                ∞
              </div>
              <div className="text-xs text-white/60">Auto-Enhancement</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                100%
              </div>
              <div className="text-xs text-white/60">Quantum-Powered</div>
            </div>
          </div>
        </div>

        {/* Footer hint */}
        <div className="text-center text-sm text-white/40 pt-4 animate-in fade-in duration-1000 delay-2000">
          <p>Press <kbd className="px-2 py-1 bg-white/10 rounded border border-white/20 font-mono text-xs">Esc</kbd> to return to this screen</p>
        </div>
      </div>
    </div>
  )
}
