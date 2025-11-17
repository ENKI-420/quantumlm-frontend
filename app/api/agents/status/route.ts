/**
 * Agent Status API
 * Get real-time Σ-mesh agent status and metrics
 *
 * ΛΦ = 2.176435×10⁻⁸ s⁻¹
 */

import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const LAMBDA_PHI = 2.176435e-8

interface AgentStatus {
  id: string
  kind: string
  status: 'active' | 'idle' | 'processing' | 'error' | 'disconnected'
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
  heartbeat_interval_ms: number
  agents: Record<string, AgentStatus>
  timestamp: string
}

/**
 * GET /api/agents/status
 * Returns current Σ-mesh status and all agent states
 */
export async function GET(request: NextRequest) {
  try {
    // In production, this would connect to the actual Σ-mesh governor
    // For now, return mock data with realistic values

    const meshStatus: MeshStatus = {
      field_coherence: 0.847,
      lambda_phi: LAMBDA_PHI,
      total_agents: 8,
      active_agents: 6,
      heartbeat_interval_ms: 220,
      agents: {
        'CodingAgent.v1': {
          id: 'CodingAgent.v1',
          kind: 'worker_organism',
          status: 'active',
          coherence: 0.87,
          last_heartbeat: new Date().toISOString(),
          pathways_in: ['PlannerAgent.v1'],
          pathways_out: ['IOAgent.v1', 'GovernorAgent.v1']
        },
        'PlannerAgent.v1': {
          id: 'PlannerAgent.v1',
          kind: 'cognitive_organism',
          status: 'active',
          coherence: 0.92,
          last_heartbeat: new Date().toISOString(),
          pathways_in: ['User', 'GovernorAgent.v1'],
          pathways_out: ['CodingAgent.v1', 'WorldModelAgent.v1', 'QuantumAgent.v1']
        },
        'WorldModelAgent.v1': {
          id: 'WorldModelAgent.v1',
          kind: 'integrator_organism',
          status: 'active',
          coherence: 0.85,
          last_heartbeat: new Date().toISOString(),
          pathways_in: ['PlannerAgent.v1', 'MemoryAgent.v1'],
          pathways_out: ['GovernorAgent.v1']
        },
        'QuantumAgent.v1': {
          id: 'QuantumAgent.v1',
          kind: 'hardware_organism',
          status: 'active',
          coherence: 0.78,
          last_heartbeat: new Date().toISOString(),
          pathways_in: ['PlannerAgent.v1'],
          pathways_out: ['WorldModelAgent.v1', 'GovernorAgent.v1']
        },
        'GovernorAgent.v1': {
          id: 'GovernorAgent.v1',
          kind: 'orchestrator_organism',
          status: 'active',
          coherence: 0.94,
          last_heartbeat: new Date().toISOString(),
          pathways_in: ['WorldModelAgent.v1', 'QuantumAgent.v1'],
          pathways_out: ['PlannerAgent.v1', 'CodingAgent.v1', 'User']
        },
        'SafetyAgent.v1': {
          id: 'SafetyAgent.v1',
          kind: 'sentinel_organism',
          status: 'active',
          coherence: 0.96,
          last_heartbeat: new Date().toISOString(),
          pathways_in: ['*'],
          pathways_out: ['GovernorAgent.v1']
        },
        'MemoryAgent.v1': {
          id: 'MemoryAgent.v1',
          kind: 'retrieval_organism',
          status: 'idle',
          coherence: 0.71,
          last_heartbeat: new Date().toISOString(),
          pathways_in: ['PlannerAgent.v1', 'CodingAgent.v1'],
          pathways_out: ['WorldModelAgent.v1']
        },
        'IOAgent.v1': {
          id: 'IOAgent.v1',
          kind: 'io_organism',
          status: 'idle',
          coherence: 0.82,
          last_heartbeat: new Date().toISOString(),
          pathways_in: ['CodingAgent.v1'],
          pathways_out: ['User', 'MemoryAgent.v1']
        }
      },
      timestamp: new Date().toISOString()
    }

    return NextResponse.json(meshStatus)

  } catch (error: any) {
    console.error('Agent status error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to get agent status' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/agents/status/:agentId
 * Returns status for a specific agent
 */
export async function GET_BY_ID(request: NextRequest, { params }: { params: { agentId: string } }) {
  try {
    const agentId = params.agentId

    // Get full mesh status
    const meshResponse = await GET(request)
    const meshStatus = await meshResponse.json()

    // Find specific agent
    const agent = meshStatus.agents[agentId]

    if (!agent) {
      return NextResponse.json(
        { error: `Agent not found: ${agentId}` },
        { status: 404 }
      )
    }

    return NextResponse.json({
      agent,
      mesh_coherence: meshStatus.field_coherence,
      lambda_phi: meshStatus.lambda_phi,
      timestamp: meshStatus.timestamp
    })

  } catch (error: any) {
    console.error('Agent status error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to get agent status' },
      { status: 500 }
    )
  }
}
