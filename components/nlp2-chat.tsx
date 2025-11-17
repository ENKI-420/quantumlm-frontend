'use client'

/**
 * NLP2 Chat Interface
 * Natural language multi-agent orchestration interface
 *
 * ΛΦ = 2.176435×10⁻⁸ s⁻¹
 */

import { useState, useRef, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Send, Sparkles, Bot, User, Cpu, Code, Workflow,
  CheckCircle, Clock, AlertTriangle
} from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  metadata?: any
}

interface NLP2ChatProps {
  mode?: 'auto' | 'dev' | 'quantum'
  onExperimentExecute?: (result: any) => void
}

export default function NLP2Chat({ mode = 'auto', onExperimentExecute }: NLP2ChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'I\'m your NLP2 multi-agent orchestrator. Describe what you want to build or experiment with in natural language.',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isProcessing) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsProcessing(true)

    try {
      // Call NLP2 orchestration API
      const response = await fetch('/api/nlp2/orchestrate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input,
          mode,
          execute: false // Start with planning only
        })
      })

      if (!response.ok) {
        throw new Error('Orchestration failed')
      }

      const result = await response.json()

      // Create assistant response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: formatOrchestrationResponse(result),
        timestamp: new Date(),
        metadata: result
      }

      setMessages(prev => [...prev, assistantMessage])

    } catch (error) {
      console.error('NLP2 error:', error)

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsProcessing(false)
    }
  }

  const formatOrchestrationResponse = (result: any): string => {
    if (!result.success) {
      return result.error || 'Failed to process request'
    }

    if (result.mode === 'quantum') {
      return formatQuantumResponse(result)
    } else {
      return formatDevResponse(result)
    }
  }

  const formatQuantumResponse = (result: any): string => {
    const { experiment, suggestions, next_steps } = result

    let response = `**Quantum Experiment Matched**\n\n`
    response += `**${experiment.name}**\n`
    response += `${experiment.description}\n\n`
    response += `**Configuration:**\n`
    response += `- Circuit Type: ${experiment.circuit_type}\n`
    response += `- Qubits: ${experiment.num_qubits}\n`
    response += `- Shots: ${experiment.shots}\n`
    response += `- Backend: ${experiment.backend}\n\n`

    if (suggestions && suggestions.length > 0) {
      response += `**Suggestions:**\n`
      suggestions.forEach((s: string) => {
        response += `- ${s}\n`
      })
      response += `\n`
    }

    if (next_steps && next_steps.length > 0) {
      response += `**Next Steps:**\n`
      next_steps.forEach((s: string) => {
        response += `- ${s}\n`
      })
    }

    return response
  }

  const formatDevResponse = (result: any): string => {
    const { intent, workflow, orchestration_plan, suggestions, next_steps } = result

    let response = `**Development Workflow Detected**\n\n`
    response += `**Intent:** ${intent.type}\n`
    response += `**Confidence:** ${(intent.confidence * 100).toFixed(0)}%\n`
    response += `**Complexity:** ${intent.complexity}\n\n`

    if (workflow) {
      response += `**Matched Workflow:** ${workflow.name}\n`
      response += `${workflow.description}\n\n`
      response += `**Steps:**\n`
      workflow.steps.forEach((step: any, idx: number) => {
        response += `${idx + 1}. ${step.name} (${step.agent})\n`
        response += `   ${step.description}\n`
      })
      response += `\n**Estimated Time:** ~${Math.round(workflow.estimated_time / 60)} minutes\n\n`
    }

    if (orchestration_plan) {
      response += `**Orchestration Plan:**\n`
      response += `- ${orchestration_plan.tasks.length} agents will collaborate\n`
      response += `- Execution order: ${orchestration_plan.execution_order.join(' → ')}\n`
      response += `- Duration: ~${orchestration_plan.estimated_duration}s\n\n`
    }

    if (suggestions && suggestions.length > 0) {
      response += `**Suggestions:**\n`
      suggestions.forEach((s: string) => {
        response += `- ${s}\n`
      })
      response += `\n`
    }

    if (next_steps && next_steps.length > 0) {
      response += `**Next Steps:**\n`
      next_steps.forEach((s: string) => {
        response += `- ${s}\n`
      })
    }

    return response
  }

  const examplePrompts = mode === 'quantum' ? [
    'Run a 3-qubit GHZ state experiment',
    'Measure Bell pair fidelity on ibm_osaka',
    'Execute Loschmidt echo coherence probe',
    'Run VQE for hydrogen molecule'
  ] : [
    'Create a FastAPI endpoint for user authentication',
    'Build a full-stack feature for real-time chat',
    'Debug the database connection error',
    'Design a microservices architecture for e-commerce'
  ]

  return (
    <div className="flex flex-col h-full max-h-[800px]">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-ibm-gray-80 bg-ibm-gray-90">
        <div className="relative">
          <Sparkles className="w-6 h-6 text-blue-400" />
          <div className="absolute inset-0 blur-md bg-blue-400/30 animate-pulse" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white">NLP2 Orchestrator</h3>
          <p className="text-sm text-ibm-gray-50 font-mono">
            Mode: {mode} • ΛΦ = 2.176435×10⁻⁸
          </p>
        </div>
        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
          {mode === 'quantum' ? <Cpu className="w-3 h-3 mr-1" /> : <Code className="w-3 h-3 mr-1" />}
          {mode.toUpperCase()}
        </Badge>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.type === 'assistant' && (
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              </div>
            )}

            <Card className={`max-w-[80%] ${
              message.type === 'user'
                ? 'bg-blue-900/30 border-blue-500/30'
                : 'bg-ibm-gray-90 border-ibm-gray-80'
            }`}>
              <div className="p-4">
                <div className="prose prose-invert prose-sm max-w-none">
                  {message.content.split('\n').map((line, idx) => {
                    if (line.startsWith('**') && line.endsWith('**')) {
                      return (
                        <p key={idx} className="font-bold text-white mb-2">
                          {line.replace(/\*\*/g, '')}
                        </p>
                      )
                    } else if (line.startsWith('- ')) {
                      return (
                        <p key={idx} className="text-ibm-gray-50 ml-4">
                          • {line.substring(2)}
                        </p>
                      )
                    } else if (line.trim()) {
                      return (
                        <p key={idx} className="text-ibm-gray-50">
                          {line}
                        </p>
                      )
                    }
                    return <br key={idx} />
                  })}
                </div>

                {message.metadata?.workflow && (
                  <div className="mt-3 pt-3 border-t border-ibm-gray-80">
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-500"
                      onClick={() => {
                        // TODO: Execute workflow
                        console.log('Execute workflow:', message.metadata.workflow)
                      }}
                    >
                      <Workflow className="w-3 h-3 mr-2" />
                      Execute Workflow
                    </Button>
                  </div>
                )}
              </div>
            </Card>

            {message.type === 'user' && (
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              </div>
            )}
          </div>
        ))}

        {isProcessing && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <Card className="bg-ibm-gray-90 border-ibm-gray-80">
              <div className="p-4">
                <div className="flex items-center gap-2 text-ibm-gray-50">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                  <span className="ml-2">Orchestrating agents...</span>
                </div>
              </div>
            </Card>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Example Prompts */}
      {messages.length <= 1 && (
        <div className="px-4 pb-2">
          <p className="text-xs text-ibm-gray-50 mb-2">Try these examples:</p>
          <div className="flex flex-wrap gap-2">
            {examplePrompts.slice(0, 3).map((prompt, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => setInput(prompt)}
              >
                {prompt}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-ibm-gray-80">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe what you want to build or experiment with..."
            className="flex-1 bg-ibm-gray-90 border border-ibm-gray-80 rounded-lg px-4 py-3 text-white placeholder-ibm-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isProcessing}
          />
          <Button
            type="submit"
            disabled={isProcessing || !input.trim()}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}
