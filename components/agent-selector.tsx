'use client'

import { useState } from 'react'
import { AgentMode, AGENT_PERSONAS, getAgentColor } from '@/lib/agents/config'
import { Sparkles, ChevronRight } from 'lucide-react'

interface AgentSelectorProps {
  selectedAgent: AgentMode
  onAgentChange: (agent: AgentMode) => void
}

export function AgentSelector({ selectedAgent, onAgentChange }: AgentSelectorProps) {
  const [hoveredAgent, setHoveredAgent] = useState<AgentMode | null>(null)

  return (
    <div className="w-full border-b border-white/10 bg-gradient-to-b from-black/60 via-black/40 to-transparent backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="h-4 w-4 text-blue-400 animate-pulse" />
          <span className="text-xs font-mono text-white/80 tracking-wider uppercase">Select Agent Mode</span>
          <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
        </div>

        <div className="flex flex-wrap gap-3">
          {(Object.keys(AGENT_PERSONAS) as AgentMode[]).map((agentId) => {
            const agent = AGENT_PERSONAS[agentId]
            const isSelected = selectedAgent === agentId
            const isHovered = hoveredAgent === agentId
            const colorClasses = getAgentColor(agentId)

            return (
              <button
                key={agentId}
                onClick={() => onAgentChange(agentId)}
                onMouseEnter={() => setHoveredAgent(agentId)}
                onMouseLeave={() => setHoveredAgent(null)}
                className={`
                  relative group px-5 py-3 rounded-xl border transition-all duration-300 ease-out
                  font-mono text-sm transform hover:scale-105
                  ${isSelected
                    ? `${colorClasses} border-2 font-bold shadow-lg scale-105`
                    : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10 hover:border-white/30'
                  }
                `}
              >
                {/* Glow effect for selected agent */}
                {isSelected && (
                  <div className="absolute inset-0 rounded-xl blur-xl opacity-50 -z-10 animate-pulse"
                       style={{
                         background: agent.color === 'blue' ? '#3b82f6' :
                                   agent.color === 'purple' ? '#a855f7' :
                                   agent.color === 'green' ? '#22c55e' :
                                   agent.color === 'orange' ? '#f97316' :
                                   '#ef4444'
                       }} />
                )}

                <span className="flex items-center gap-2.5">
                  <span className="text-lg">{agent.icon}</span>
                  <span className="hidden sm:inline">{agent.name}</span>
                  <span className="sm:hidden">{agent.name.split(' ')[0]}</span>
                  {isSelected && <ChevronRight className="h-3 w-3 animate-pulse" />}
                </span>

                {/* Tooltip on hover */}
                {isHovered && !isSelected && (
                  <div className="absolute bottom-full left-0 mb-3 w-80 p-4 bg-gradient-to-br from-black via-gray-900 to-black border border-white/30 rounded-xl shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
                    <div className="text-left">
                      <div className="flex items-center gap-3 mb-3 pb-3 border-b border-white/10">
                        <span className="text-2xl">{agent.icon}</span>
                        <div>
                          <span className="font-bold text-white block">{agent.name}</span>
                          <span className="text-xs text-white/50 font-mono">{agentId.toUpperCase()}</span>
                        </div>
                      </div>
                      <p className="text-xs text-white/80 mb-3 leading-relaxed">{agent.description}</p>
                      <div className="text-xs">
                        <span className="text-white/60 font-semibold">Capabilities:</span>
                        <ul className="mt-2 space-y-1.5">
                          {agent.capabilities.map((cap, idx) => (
                            <li key={idx} className="text-white/70 flex items-start gap-2">
                              <ChevronRight className="h-3 w-3 mt-0.5 flex-shrink-0 text-blue-400" />
                              <span>{cap}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* Enhanced selected agent info bar */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-4 bg-gradient-to-r from-white/5 to-transparent p-4 rounded-xl border border-white/10">
            <div className="relative">
              <span className="text-3xl">{AGENT_PERSONAS[selectedAgent].icon}</span>
              <div className="absolute -inset-1 rounded-full blur opacity-50"
                   style={{
                     background: AGENT_PERSONAS[selectedAgent].color === 'blue' ? '#3b82f6' :
                               AGENT_PERSONAS[selectedAgent].color === 'purple' ? '#a855f7' :
                               AGENT_PERSONAS[selectedAgent].color === 'green' ? '#22c55e' :
                               AGENT_PERSONAS[selectedAgent].color === 'orange' ? '#f97316' :
                               '#ef4444'
                   }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1 flex-wrap">
                <span className={`font-bold text-lg ${getAgentColor(selectedAgent)}`}>
                  {AGENT_PERSONAS[selectedAgent].name}
                </span>
                <span className="text-xs font-mono text-white/40 px-2 py-1 bg-white/5 rounded border border-white/10">
                  {selectedAgent.toUpperCase()}
                </span>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                {AGENT_PERSONAS[selectedAgent].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
