'use client'

import { useState } from 'react'
import { AgentMode, AGENT_PERSONAS, getAgentColor } from '@/lib/agents/config'

interface AgentSelectorProps {
  selectedAgent: AgentMode
  onAgentChange: (agent: AgentMode) => void
}

export function AgentSelector({ selectedAgent, onAgentChange }: AgentSelectorProps) {
  const [hoveredAgent, setHoveredAgent] = useState<AgentMode | null>(null)

  return (
    <div className="w-full border-b border-white/10 bg-black/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-mono text-white/60">AGENT MODE:</span>
        </div>

        <div className="flex flex-wrap gap-2">
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
                  relative px-4 py-2 rounded-lg border transition-all duration-200
                  font-mono text-sm
                  ${isSelected
                    ? `${colorClasses} border-2 font-bold`
                    : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10'
                  }
                `}
              >
                <span className="flex items-center gap-2">
                  <span>{agent.icon}</span>
                  <span>{agent.name}</span>
                </span>

                {/* Tooltip on hover */}
                {isHovered && (
                  <div className="absolute bottom-full left-0 mb-2 w-72 p-3 bg-black/95 border border-white/20 rounded-lg shadow-xl z-50">
                    <div className="text-left">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">{agent.icon}</span>
                        <span className="font-bold text-white">{agent.name}</span>
                      </div>
                      <p className="text-xs text-white/70 mb-2">{agent.description}</p>
                      <div className="text-xs">
                        <span className="text-white/50">Capabilities:</span>
                        <ul className="mt-1 space-y-1">
                          {agent.capabilities.map((cap, idx) => (
                            <li key={idx} className="text-white/60">• {cap}</li>
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

        {/* Selected agent info bar */}
        <div className="mt-3 pt-3 border-t border-white/10">
          <div className="flex items-start gap-3">
            <span className="text-2xl">{AGENT_PERSONAS[selectedAgent].icon}</span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className={`font-bold ${getAgentColor(selectedAgent)}`}>
                  {AGENT_PERSONAS[selectedAgent].name}
                </span>
                <span className="text-xs font-mono text-white/40">
                  [{selectedAgent.toUpperCase()}]
                </span>
              </div>
              <p className="text-xs text-white/60">
                {AGENT_PERSONAS[selectedAgent].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
