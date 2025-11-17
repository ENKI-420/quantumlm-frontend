/**
 * NLP2 Orchestration API
 * Natural language to multi-agent workflow orchestration
 *
 * ΛΦ = 2.176435×10⁻⁸ s⁻¹
 */

import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'
import { nlp2Orchestrator } from '@/lib/nlp2/orchestrator'
import { nlp2DevAgent } from '@/lib/nlp2/devagent'
import { nlp2QuantumOrchestrator } from '@/lib/nlp2/quantum-orchestrator'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

interface NLP2Request {
  input: string
  mode?: 'auto' | 'dev' | 'quantum' | 'research'
  execute?: boolean
  context?: Record<string, any>
}

/**
 * POST /api/nlp2/orchestrate
 * Main NLP2 orchestration endpoint
 */
export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Parse request
    const body: NLP2Request = await request.json()
    const { input, mode = 'auto', execute = false, context = {} } = body

    if (!input || input.trim().length === 0) {
      return NextResponse.json(
        { error: 'Input is required' },
        { status: 400 }
      )
    }

    // Route to appropriate orchestrator based on mode
    let result: any

    if (mode === 'quantum') {
      // Quantum experiment orchestration
      result = await handleQuantumOrchestration(input, user.id, execute)
    } else if (mode === 'dev') {
      // Development workflow orchestration
      result = await handleDevOrchestration(input, user.id, execute, context)
    } else {
      // Auto-detect mode based on intent
      const intent = nlp2Orchestrator.parseIntent(input)

      if (intent.type === 'quantum_experiment' || intent.type === 'quantum_circuit') {
        result = await handleQuantumOrchestration(input, user.id, execute)
      } else {
        result = await handleDevOrchestration(input, user.id, execute, context)
      }
    }

    return NextResponse.json(result)

  } catch (error: any) {
    console.error('NLP2 orchestration error:', error)
    return NextResponse.json(
      { error: error.message || 'Orchestration failed' },
      { status: 500 }
    )
  }
}

/**
 * Handle quantum experiment orchestration
 */
async function handleQuantumOrchestration(
  input: string,
  userId: string,
  execute: boolean
) {
  // Parse quantum request
  const { experiment, confidence, suggestions } =
    nlp2QuantumOrchestrator.parseQuantumRequest(input)

  if (!experiment) {
    return {
      success: false,
      mode: 'quantum',
      error: 'Could not match to a quantum experiment',
      suggestions
    }
  }

  // If execute is true, run the experiment
  let experimentResult = null
  if (execute) {
    experimentResult = await nlp2QuantumOrchestrator.executeExperiment(
      experiment,
      userId
    )
  }

  return {
    success: true,
    mode: 'quantum',
    confidence,
    experiment: {
      id: experiment.id,
      name: experiment.name,
      description: experiment.description,
      circuit_type: experiment.circuit_type,
      num_qubits: experiment.num_qubits,
      shots: experiment.shots,
      backend: experiment.backend,
      expected_metrics: experiment.expected_metrics
    },
    result: experimentResult,
    suggestions,
    next_steps: execute ? [
      'Review experimental results',
      'Compare metrics with expected values',
      'Run validation analysis'
    ] : [
      'Set execute=true to run the experiment',
      'Review experiment parameters',
      'Check backend availability'
    ]
  }
}

/**
 * Handle development workflow orchestration
 */
async function handleDevOrchestration(
  input: string,
  userId: string,
  execute: boolean,
  context: Record<string, any>
) {
  // Process development request
  const { plan, workflow, suggestions } =
    await nlp2DevAgent.processDevelopmentRequest(input)

  return {
    success: true,
    mode: 'dev',
    intent: {
      type: plan.intent.type,
      confidence: plan.intent.confidence,
      complexity: plan.intent.complexity,
      entities: plan.intent.entities
    },
    workflow: workflow ? {
      id: workflow.id,
      name: workflow.name,
      description: workflow.description,
      steps: workflow.steps.map(step => ({
        id: step.id,
        name: step.name,
        description: step.description,
        agent: step.agent,
        dependencies: step.dependencies,
        auto_execute: step.auto_execute
      })),
      estimated_time: workflow.estimated_time
    } : null,
    orchestration_plan: {
      tasks: plan.tasks.map(task => ({
        agent: task.agent,
        task_type: task.task.type,
        description: task.task.description,
        priority: task.priority,
        dependencies: task.dependencies
      })),
      execution_order: plan.execution_order,
      estimated_duration: plan.estimated_duration,
      requires_approval: plan.requires_approval
    },
    suggestions,
    next_steps: workflow ? [
      `Execute ${workflow.name} workflow`,
      `${workflow.steps.length} steps to complete`,
      `Estimated time: ~${Math.round(workflow.estimated_time / 60)} minutes`
    ] : [
      'Custom orchestration plan generated',
      `${plan.tasks.length} agents will be coordinated`,
      plan.requires_approval ? 'Requires manual approval before execution' : 'Ready for auto-execution'
    ]
  }
}

/**
 * GET /api/nlp2/orchestrate
 * Get available workflows and experiments
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const mode = searchParams.get('mode')

    if (mode === 'quantum') {
      // List quantum experiments
      const experiments = nlp2QuantumOrchestrator.listExperiments()
      return NextResponse.json({
        mode: 'quantum',
        experiments: experiments.map(exp => ({
          id: exp.id,
          name: exp.name,
          description: exp.description,
          circuit_type: exp.circuit_type,
          num_qubits: exp.num_qubits,
          backend: exp.backend
        }))
      })
    } else if (mode === 'dev') {
      // List dev workflows
      const workflows = nlp2DevAgent.listWorkflows()
      return NextResponse.json({
        mode: 'dev',
        workflows: workflows.map(wf => ({
          id: wf.id,
          name: wf.name,
          description: wf.description,
          steps: wf.steps.length,
          estimated_time: wf.estimated_time
        }))
      })
    } else {
      // List both
      return NextResponse.json({
        quantum_experiments: nlp2QuantumOrchestrator.listExperiments().length,
        dev_workflows: nlp2DevAgent.listWorkflows().length,
        modes: ['auto', 'dev', 'quantum', 'research']
      })
    }

  } catch (error: any) {
    console.error('NLP2 list error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to list resources' },
      { status: 500 }
    )
  }
}
