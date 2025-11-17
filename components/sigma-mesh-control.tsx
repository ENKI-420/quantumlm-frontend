'use client'

/**
 * Σ-Mesh Control Panel
 * Real-time agent status and execution control
 *
 * ΛΦ = 2.176435×10⁻⁸ s⁻¹
 */

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Brain, Code, Layers, Cpu, Shield, Database, Workflow, Network,
  Activity, ChevronRight
} from 'lucide-react'

interface MeshAgent {
  id: string
  kind: string
  status: string
  coherence: number
  last_heartbeat: string
  pathways_in: string[]
  pathways_out: string[]
}

interface MeshStatus {
  field_coherence: number
  lambda_phi: number
  total_agents: number
  active_agents: number
  agents: Record<string, MeshAgent>
}

export default function SigmaMeshControl() {
  const [meshStatus, setMeshStatus] = useState<MeshStatus | null>(null)
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch mesh status
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch('/api/agents/status')
        if (response.ok) {
          const data = await response.json()
          setMeshStatus(data)
        }
      } catch (error) {
        console.error('Failed to fetch mesh status:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStatus()

    // Poll every 2 seconds
    const interval = setInterval(fetchStatus, 2000)
    return () => clearInterval(interval)
  }, [])

  const getAgentIcon = (agentId: string) => {
    if (agentId.startsWith('Coding')) return <Code className="w-4 h-4" />
    if (agentId.startsWith('Planner')) return <Workflow className="w-4 h-4" />
    if (agentId.startsWith('Quantum')) return <Cpu className="w-4 h-4" />
    if (agentId.startsWith('WorldModel')) return <Layers className="w-4 h-4" />
    if (agentId.startsWith('Governor')) return <Network className="w-4 h-4" />
    if (agentId.startsWith('Safety')) return <Shield className="w-4 h-4" />
    if (agentId.startsWith('Memory')) return <Database className="w-4 h-4" />
    if (agentId.startsWith('IO')) return <Brain className="w-4 h-4" />
    return <Activity className="w-4 h-4" />
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'idle': return 'bg-yellow-500'
      case 'processing': return 'bg-blue-500 animate-pulse'
      case 'error': return 'bg-red-500'
      case 'disconnected': return 'bg-gray-500'
      default: return 'bg-gray-400'
    }
  }

  if (loading || !meshStatus) {
    return (
      <Card className="bg-ibm-gray-90 border-ibm-gray-80 p-6">
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500" />
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Mesh Status Header */}
      <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-500/30 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Network className="w-6 h-6 text-blue-400" />
            <div>
              <h3 className="text-lg font-bold text-white">Σ-Mesh Status</h3>
              <p className="text-sm text-ibm-gray-50 font-mono">
                ΛΦ = {meshStatus.lambda_phi.toExponential(6)} s⁻¹
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-400">
              {meshStatus.field_coherence.toFixed(3)}
            </div>
            <div className="text-xs text-ibm-gray-50">Field Coherence</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-green-400" />
            <span className="text-sm text-white">
              {meshStatus.active_agents} / {meshStatus.total_agents} Active
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-white font-mono">220ms Heartbeat</span>
          </div>
        </div>
      </Card>

      {/* Agent Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {Object.entries(meshStatus.agents).map(([agentId, agent]) => {
          const isSelected = selectedAgent === agentId

          return (
            <Card
              key={agentId}
              className={`group cursor-pointer transition-all duration-200 ${
                isSelected
                  ? 'bg-blue-900/50 border-blue-500 ring-2 ring-blue-500'
                  : 'bg-ibm-gray-90 border-ibm-gray-80 hover:border-ibm-gray-70'
              }`}
              onClick={() => setSelectedAgent(isSelected ? null : agentId)}
            >
              <div className="p-4 space-y-3">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getAgentIcon(agentId)}
                    <span className="text-sm font-bold text-white">
                      {agentId.split('.')[0]}
                    </span>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)}`} />
                </div>

                {/* Metrics */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-ibm-gray-50">Coherence:</span>
                    <span className="text-white font-mono">{agent.coherence.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-ibm-gray-50">Status:</span>
                    <Badge className={`${getStatusColor(agent.status)} text-white text-xs`}>
                      {agent.status}
                    </Badge>
                  </div>
                </div>

                {/* Pathways (expanded view) */}
                {isSelected && (
                  <div className="pt-3 border-t border-ibm-gray-80 space-y-2 animate-in fade-in slide-in-from-top-2">
                    <div>
                      <p className="text-xs text-ibm-gray-50 mb-1">Input From:</p>
                      <div className="flex flex-wrap gap-1">
                        {agent.pathways_in.map((path, idx) => (
                          <Badge key={idx} className="text-xs bg-green-500/20 text-green-400 border-green-500/30">
                            {path.split('.')[0]}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-ibm-gray-50 mb-1">Output To:</p>
                      <div className="flex flex-wrap gap-1">
                        {agent.pathways_out.map((path, idx) => (
                          <Badge key={idx} className="text-xs bg-blue-500/20 text-blue-400 border-blue-500/30">
                            {path.split('.')[0]}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
