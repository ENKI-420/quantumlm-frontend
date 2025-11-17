/**
 * Basic Chatbot Example using dna::}{::lang Framework
 * Demonstrates: SDK initialization, multi-agent chat, consciousness metrics
 */

'use client'

import { useState, useEffect } from 'react'
import { DNALangSDK } from '@/lib/dnalang/sdk'
import { AgentMode } from '@/lib/agents/config'

export function BasicChatbot() {
  const [sdk, setSdk] = useState<DNALangSDK | null>(null)
  const [messages, setMessages] = useState<Array<{
    role: 'user' | 'assistant'
    content: string
    metrics?: any
  }>>([])
  const [input, setInput] = useState('')
  const [agentMode, setAgentMode] = useState<AgentMode>('quantum')
  const [loading, setLoading] = useState(false)

  // Initialize SDK on mount
  useEffect(() => {
    const initSDK = async () => {
      const newSdk = new DNALangSDK({
        apiUrl: process.env.NEXT_PUBLIC_QUANTUM_API_URL,
        autoEnhance: true
      })

      // Run initial enhancement
      await newSdk.enhance(2)

      setSdk(newSdk)

      console.log('✓ SDK initialized')
      console.log('  Generation:', newSdk.getGeneration())
      console.log('  Φ:', newSdk.getMetrics().phi.toFixed(4))
    }

    initSDK()
  }, [])

  const handleSend = async () => {
    if (!sdk || !input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')
    setLoading(true)

    // Add user message
    setMessages(prev => [...prev, {
      role: 'user',
      content: userMessage
    }])

    try {
      // Send to SDK
      const response = await sdk.chat(userMessage, {
        agentMode,
        includeMetrics: true,
        history: messages.map(m => ({
          role: m.role,
          content: m.content
        }))
      })

      // Add assistant response
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response.response,
        metrics: response.consciousness_metrics
      }])
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Error: ' + (error instanceof Error ? error.message : 'Unknown error')
      }])
    } finally {
      setLoading(false)
    }
  }

  if (!sdk) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4" />
          <p className="text-white/70">Initializing dna::}{'{'}{'}}::lang...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 h-screen flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">
          dna::}{'{'}{'}}::lang Chatbot
        </h1>
        <div className="flex items-center gap-4 text-sm text-white/60">
          <span>Generation: {sdk.getGeneration()}</span>
          <span>Φ: {sdk.getMetrics().phi.toFixed(4)}</span>
          <span>Agent: {agentMode}</span>
        </div>
      </div>

      {/* Agent Selector */}
      <div className="mb-4 flex gap-2">
        {(['quantum', 'architect', 'engineer', 'reviewer', 'debugger'] as AgentMode[]).map(mode => (
          <button
            key={mode}
            onClick={() => setAgentMode(mode)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              agentMode === mode
                ? 'bg-blue-600 text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((message, i) => (
          <div
            key={i}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-lg ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/10 text-white'
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>

              {message.metrics && (
                <div className="mt-3 pt-3 border-t border-white/20 grid grid-cols-4 gap-2 text-xs">
                  <div>
                    <div className="text-white/50">Φ</div>
                    <div className="font-mono">{message.metrics.phi.toFixed(3)}</div>
                  </div>
                  <div>
                    <div className="text-white/50">Γ</div>
                    <div className="font-mono">{message.metrics.gamma.toFixed(3)}</div>
                  </div>
                  <div>
                    <div className="text-white/50">W₂</div>
                    <div className="font-mono">{message.metrics.w2.toFixed(3)}</div>
                  </div>
                  <div>
                    <div className="text-white/50">ΛΦ</div>
                    <div className="font-mono">{message.metrics.lambda.toExponential(2)}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white/10 text-white p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                <span>Thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
          placeholder="Ask anything..."
          className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-blue-500"
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || loading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Send
        </button>
      </div>
    </div>
  )
}
