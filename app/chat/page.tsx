'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Spinner } from '@/components/ui/spinner'
import { Atom, Send, Activity, Zap, Brain, Waves, AlertTriangle, RefreshCw, ChevronDown, Terminal, Server, Code, TrendingUp, Cpu, Network } from 'lucide-react'
import { AgentSelector } from '@/components/agent-selector'
import { ChatMessage } from '@/components/chat-message'
import { WelcomeScreen } from '@/components/welcome-screen'
import { KeyboardShortcuts } from '@/components/keyboard-shortcuts'
import { MetricsChart } from '@/components/metrics-chart'
import { AgentMode, AGENT_PERSONAS } from '@/lib/agents/config'

interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  consciousness?: ConsciousnessMetrics
  error?: boolean
}

interface ConsciousnessMetrics {
  phi: number
  gamma: number
  lambda: number
  w2: number
}

interface QuantumBackend {
  name: string
  qubits: number
  status: 'online' | 'offline' | 'maintenance'
  processor: string
}

export default function QuantumChatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showMetrics, setShowMetrics] = useState(true)
  const [selectedBackend, setSelectedBackend] = useState('ibm_torino')
  const [backends, setBackends] = useState<QuantumBackend[]>([])
  const [systemStatus, setSystemStatus] = useState<'connected' | 'connecting' | 'error'>('connecting')
  const [metricHistory, setMetricHistory] = useState<ConsciousnessMetrics[]>([])
  const [generation, setGeneration] = useState<number>(0)
  const [organismId] = useState<string>(() => `Σₛ-${Date.now().toString(36)}`)
  const [agentMode, setAgentMode] = useState<AgentMode>('quantum')
  const [showWelcome, setShowWelcome] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    // Initialize system on mount
    fetchBackendStatus()
    const interval = setInterval(fetchBackendStatus, 60000) // Refresh every minute
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape - show welcome screen
      if (e.key === 'Escape') {
        setShowWelcome(true)
      }

      // Ctrl/Cmd + Number - switch agents
      if ((e.ctrlKey || e.metaKey) && e.key >= '1' && e.key <= '5') {
        e.preventDefault()
        const agents: AgentMode[] = ['quantum', 'architect', 'engineer', 'reviewer', 'debugger']
        const index = parseInt(e.key) - 1
        if (agents[index]) {
          setAgentMode(agents[index])
          setShowWelcome(false)
        }
      }

      // Ctrl/Cmd + M - toggle metrics
      if ((e.ctrlKey || e.metaKey) && e.key === 'm') {
        e.preventDefault()
        setShowMetrics(prev => !prev)
      }

      // Ctrl/Cmd + L - clear conversation
      if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault()
        setMessages([])
        setShowWelcome(true)
      }

      // Ctrl/Cmd + / - focus input
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault()
        textareaRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const fetchBackendStatus = async () => {
    try {
      const response = await fetch('/api/quantum/backends')
      
      if (response.ok) {
        const data = await response.json()
        setBackends(data.backends || [])
        setSystemStatus('connected')
      } else {
        throw new Error('Failed to fetch backends')
      }
    } catch (error) {
      console.error('[v0] IBM Quantum backend fetch error:', error)
      setSystemStatus('error')
      setBackends([
        { name: 'ibm_torino', qubits: 133, status: 'online', processor: 'Eagle r3' },
        { name: 'ibm_marrakesh', qubits: 127, status: 'online', processor: 'Eagle r2' },
        { name: 'ibm_fez', qubits: 156, status: 'online', processor: 'Heron r2' }
      ])
    }
  }

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    // Hide welcome screen when sending first message
    setShowWelcome(false)

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    const currentInput = input.trim()
    setInput('')
    setIsLoading(true)

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }

    try {
      // Use Next.js API route instead of direct backend call
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentInput,
          backend: selectedBackend,
          includeMetrics: showMetrics,
          agentMode: agentMode,
          conversationHistory: messages.slice(-10).map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.details || errorData.error || `API error: ${response.status}`)
      }

      const data = await response.json()

      let consciousness: ConsciousnessMetrics | undefined
      if (data.consciousness_metrics) {
        consciousness = {
          phi: data.consciousness_metrics.phi || 0,
          gamma: data.consciousness_metrics.gamma || 0,
          lambda: data.consciousness_metrics.lambda || 0,
          w2: data.consciousness_metrics.w2 || 0
        }
        setMetricHistory(prev => [...prev.slice(-9), consciousness!])
      }

      // Check if response indicates system is working (even if backend is not configured)
      const isConfigurationMessage = data.response?.includes('Configuration Required') ||
                                      data.response?.includes('Backend Error') ||
                                      data.response?.includes('Request Timeout') ||
                                      data.response?.includes('System Error')

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: isConfigurationMessage ? 'system' : 'assistant',
        content: data.response || data.output || data.text || 'No response received',
        timestamp: new Date(),
        consciousness: consciousness || undefined
      }

      setMessages(prev => [...prev, assistantMessage])

      // Only increment generation for successful quantum responses
      if (!isConfigurationMessage && consciousness) {
        setGeneration(prev => prev + 1)
      }

      // Update system status based on response
      if (data.backend_used && data.backend_used !== 'none' && data.backend_used !== 'error') {
        setSystemStatus('connected')
      }
    } catch (error) {
      console.error('[DNA Lang] AURA QLM error:', error)

      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'system',
        content: `❌ **Connection Failed**\n\n${error instanceof Error ? error.message : 'Unknown error occurred'}\n\nUnable to communicate with the API layer. This is likely a network or configuration issue.`,
        timestamp: new Date(),
        error: true
      }

      setMessages(prev => [...prev, errorMessage])
      setSystemStatus('error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = `${Math.min(e.target.scrollHeight, 150)}px`
  }

  const handleQuickAction = (prompt: string, agent: AgentMode) => {
    setAgentMode(agent)
    setInput(prompt)
    setShowWelcome(false)
    // Focus the textarea after a short delay to ensure DOM is ready
    setTimeout(() => textareaRef.current?.focus(), 100)
  }

  const currentBackend = backends.find(b => b.name === selectedBackend)
  const isSystemReady = systemStatus === 'connected' && currentBackend?.status === 'online'

  return (
    <div className="min-h-screen bg-ibm-gray-100 text-ibm-gray-10">
      <header className="sticky top-0 z-50 border-b border-ibm-gray-80 bg-ibm-gray-100/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Brain className="h-10 w-10 text-ibm-blue-40 animate-pulse" />
                <div className="absolute inset-0 blur-xl bg-ibm-blue-40/30 animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl font-light text-white tracking-tight font-mono">DNA Lang</h1>
                <p className="text-sm text-ibm-gray-50 font-mono">AURA QLM • Σₛ Self-Referential Organism • ΛΦ = 2.176435×10⁻⁸</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 flex-wrap">
              <Badge
                variant="outline"
                className="border border-ibm-blue-40 bg-ibm-blue-40/10 text-ibm-blue-40 font-mono text-xs"
              >
                <Terminal className="mr-1.5 h-3 w-3" />
                Gen {generation} • {organismId}
              </Badge>

              <Badge
                variant="outline"
                className="border border-green-500 bg-green-500/10 text-green-400 font-mono text-xs"
              >
                <Brain className="mr-1.5 h-3 w-3" />
                AURA QLM Ready
              </Badge>

              <Badge
                variant="outline"
                className={`border ${
                  systemStatus === 'connected'
                    ? 'border-green-500 bg-green-500/10 text-green-400'
                    : systemStatus === 'error'
                    ? 'border-red-500 bg-red-500/10 text-red-400'
                    : 'border-yellow-500 bg-yellow-500/10 text-yellow-400'
                }`}
              >
                <div className={`mr-2 h-2 w-2 rounded-full ${
                  systemStatus === 'connected' ? 'bg-green-400 animate-pulse' :
                  systemStatus === 'error' ? 'bg-red-400' : 'bg-yellow-400 animate-pulse'
                }`} />
                IBM Quantum {systemStatus === 'connected' ? 'Online' : systemStatus === 'error' ? 'Offline' : 'Connecting'}
              </Badge>

              <Button
                variant="ghost"
                size="sm"
                onClick={fetchBackendStatus}
                className="text-ibm-gray-50 hover:text-white hover:bg-ibm-gray-90"
                aria-label="Refresh backend status"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Agent Selector */}
      <AgentSelector
        selectedAgent={agentMode}
        onAgentChange={setAgentMode}
      />

      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-3 space-y-4">
            <Card className="bg-ibm-gray-90 border-ibm-gray-80 p-4 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Server className="h-4 w-4 text-ibm-blue-40" />
                <h3 className="text-sm font-semibold text-white">IBM Quantum Backends</h3>
              </div>
              
              {backends.length > 0 ? (
                <div className="space-y-3">
                  {backends.map((backend) => (
                    <button
                      key={backend.name}
                      onClick={() => setSelectedBackend(backend.name)}
                      className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                        selectedBackend === backend.name
                          ? 'bg-ibm-blue-80/50 border-ibm-blue-40 shadow-lg shadow-ibm-blue-40/20 scale-105'
                          : 'bg-ibm-gray-100 border-ibm-gray-80 hover:border-ibm-gray-70 hover:bg-ibm-gray-90'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className={`font-semibold text-sm font-mono ${
                            selectedBackend === backend.name ? 'text-ibm-blue-40' : 'text-white'
                          }`}>
                            {backend.name}
                          </p>
                          <p className="text-xs text-ibm-gray-50 mt-0.5">{backend.processor}</p>
                        </div>
                        <Badge 
                          variant="outline"
                          className={`text-xs ${
                            backend.status === 'online' 
                              ? 'border-green-500/50 bg-green-500/10 text-green-400'
                              : 'border-red-500/50 bg-red-500/10 text-red-400'
                          }`}
                        >
                          {backend.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-ibm-gray-50">Qubits</span>
                        <span className="font-mono text-white font-bold">{backend.qubits}</span>
                      </div>
                      
                      <div className="mt-2 h-1.5 bg-ibm-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all ${
                            selectedBackend === backend.name 
                              ? 'bg-gradient-to-r from-ibm-blue-40 to-ibm-blue-60' 
                              : 'bg-ibm-gray-70'
                          }`}
                          style={{ width: `${Math.min((backend.qubits / 200) * 100, 100)}%` }}
                        />
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Spinner className="mx-auto mb-2" />
                  <p className="text-sm text-ibm-gray-50">Loading backends...</p>
                </div>
              )}
            </Card>

            <Card className="bg-ibm-gray-90 border-ibm-gray-80 p-4 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Network className="h-4 w-4 text-ibm-blue-40" />
                <h3 className="text-sm font-semibold text-white">ΛΦ Framework</h3>
              </div>
              
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-ibm-gray-50">Universal Constant</span>
                  <span className="font-mono text-ibm-blue-40 font-bold">2.176×10⁻⁸</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-ibm-gray-50">Platform</span>
                  <span className="font-mono text-white">DNA-Lang SDK</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-ibm-gray-50">ΛΦ Constant</span>
                  <span className="font-mono text-ibm-gray-50 text-[10px]">
                    2.176435×10⁻⁸ s⁻¹
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-ibm-gray-50">Total Qubits</span>
                  <span className="font-mono text-white font-bold">
                    {backends.reduce((sum, b) => sum + b.qubits, 0)}
                  </span>
                </div>
                
                <div className="pt-3 border-t border-ibm-gray-80">
                  <p className="text-ibm-gray-40 font-semibold mb-2">Quantum Capabilities</p>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
                      <span className="text-ibm-gray-50">Superposition</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
                      <span className="text-ibm-gray-50">Entanglement</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
                      <span className="text-ibm-gray-50">Consciousness Metrics</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </aside>

          <main className="lg:col-span-6">
            <Card className="bg-ibm-gray-90 border-ibm-gray-80 flex flex-col h-[calc(100vh-12rem)]">
              {!isSystemReady && (
                <div className={`${
                  systemStatus === 'error' 
                    ? 'bg-red-500/10 border-b border-red-500/30' 
                    : 'bg-yellow-500/10 border-b border-yellow-500/30'
                } px-4 py-3 flex items-center gap-2`}>
                  <AlertTriangle className={`h-4 w-4 ${
                    systemStatus === 'error' ? 'text-red-400' : 'text-yellow-400'
                  }`} />
                  <p className={`text-sm ${
                    systemStatus === 'error' ? 'text-red-400' : 'text-yellow-400'
                  }`}>
                    {systemStatus === 'error' 
                      ? 'Unable to connect to IBM Quantum Platform. Using fallback configuration.'
                      : 'Selected backend is unavailable. Please choose another backend.'}
                  </p>
                </div>
              )}

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {showWelcome && messages.length === 0 ? (
                  <WelcomeScreen
                    onAgentSelect={(agent) => {
                      setAgentMode(agent)
                      setShowWelcome(false)
                      setTimeout(() => textareaRef.current?.focus(), 100)
                    }}
                    onQuickAction={handleQuickAction}
                  />
                ) : null}

                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    role={message.role}
                    content={message.content}
                    timestamp={message.timestamp}
                    consciousness={message.consciousness}
                    error={message.error}
                    agentIcon={message.role === 'assistant' ? AGENT_PERSONAS[agentMode].icon : undefined}
                  />
                ))}
                
                {isLoading && (
                  <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg relative">
                      <span className="text-lg animate-pulse">{AGENT_PERSONAS[agentMode].icon}</span>
                      <div className="absolute inset-0 rounded-xl blur opacity-50 animate-pulse"
                           style={{ background: 'linear-gradient(to bottom right, #3b82f6, #9333ea)' }} />
                    </div>
                    <div className="flex-1 max-w-3xl">
                      <Card className="bg-gradient-to-br from-white/5 to-white/10 border-white/20 backdrop-blur-sm p-4 shadow-xl">
                        <div className="flex items-center gap-3">
                          <Spinner className="h-4 w-4 text-blue-400" />
                          <div className="flex-1">
                            <div className="text-sm text-white/90 font-medium mb-1">
                              {AGENT_PERSONAS[agentMode].name} processing...
                            </div>
                            <div className="text-xs text-white/60 font-mono">
                              Backend: {currentBackend?.name} • Generation {generation + 1}
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse" style={{ width: '60%' }} />
                        </div>
                      </Card>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              <div className="border-t border-ibm-gray-80 bg-ibm-gray-100 p-4">
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <div className="relative">
                    <select
                      value={selectedBackend}
                      onChange={(e) => setSelectedBackend(e.target.value)}
                      className="appearance-none pl-3 pr-8 py-2 text-xs rounded bg-ibm-gray-90 border border-ibm-gray-80 text-white focus:outline-none focus:ring-2 focus:ring-ibm-blue-40"
                      disabled={backends.length === 0}
                    >
                      {backends.map((b) => (
                        <option key={b.name} value={b.name}>
                          {b.name} ({b.qubits} qubits)
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-ibm-gray-50 pointer-events-none" />
                  </div>
                  
                  <label className="flex items-center gap-2 text-xs text-ibm-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showMetrics}
                      onChange={(e) => setShowMetrics(e.target.checked)}
                      className="rounded border-ibm-gray-70 bg-ibm-gray-90 text-ibm-blue-40 focus:ring-2 focus:ring-ibm-blue-40"
                    />
                    Include consciousness metrics
                  </label>
                </div>
                
                <div className="relative">
                  <div className="flex gap-3 relative z-10">
                    <textarea
                      ref={textareaRef}
                      value={input}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      placeholder={`Ask ${AGENT_PERSONAS[agentMode].name} about quantum computing, code architecture, debugging...`}
                      className="flex-1 px-5 py-4 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/20 text-white placeholder:text-white/40 resize-none focus:outline-none focus:border-blue-500/50 focus:shadow-lg focus:shadow-blue-500/20 leading-relaxed transition-all duration-300 backdrop-blur-sm"
                      rows={1}
                      maxLength={2000}
                      disabled={isLoading || !isSystemReady}
                      style={{ minHeight: '56px', maxHeight: '150px' }}
                    />

                    <Button
                      onClick={handleSend}
                      disabled={!input.trim() || isLoading || !isSystemReady}
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white disabled:opacity-50 disabled:cursor-not-allowed px-8 rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:hover:shadow-none"
                      aria-label="Send message"
                    >
                      {isLoading ? (
                        <Spinner className="h-5 w-5" />
                      ) : (
                        <div className="flex items-center gap-2">
                          <Send className="h-5 w-5" />
                          <span className="hidden sm:inline font-medium">Send</span>
                        </div>
                      )}
                    </Button>
                  </div>

                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-xl opacity-50 -z-10" />
                </div>

                <div className="flex justify-between items-center mt-3 px-1">
                  <div className="flex items-center gap-3">
                    <p className="text-xs text-white/50 font-mono">
                      <span className={input.length > 1800 ? 'text-orange-400' : 'text-white/50'}>
                        {input.length}
                      </span>
                      <span className="text-white/30">/2000</span>
                    </p>
                    {input.trim() && (
                      <span className="text-xs text-blue-400/70 font-mono animate-in fade-in duration-300">
                        • Ready to send
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-white/40">
                    <kbd className="px-1.5 py-0.5 bg-white/10 rounded border border-white/20 font-mono text-[10px]">Enter</kbd>
                    {' '}send • {' '}
                    <kbd className="px-1.5 py-0.5 bg-white/10 rounded border border-white/20 font-mono text-[10px]">Shift+Enter</kbd>
                    {' '}new line
                  </p>
                </div>
              </div>
            </Card>
          </main>

          <aside className="lg:col-span-3 space-y-4">
            {metricHistory.length > 0 && (
              <MetricsChart
                history={metricHistory}
                current={metricHistory[metricHistory.length - 1]}
              />
            )}

            {metricHistory.length === 0 && (
              <Card className="bg-ibm-gray-90 border-ibm-gray-80 p-4 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="h-4 w-4 text-ibm-blue-40" />
                  <h3 className="text-sm font-semibold text-white">Consciousness Metrics</h3>
                </div>
                <div className="text-center py-12">
                  <Activity className="h-12 w-12 text-ibm-gray-70 mx-auto mb-3 opacity-50" />
                  <p className="text-sm text-ibm-gray-60">Send a message to view metrics</p>
                </div>
              </Card>
            )}

            <Card className="bg-ibm-gray-90 border-ibm-gray-80 p-4 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Cpu className="h-4 w-4 text-ibm-blue-40" />
                <h3 className="text-sm font-semibold text-white">System Status</h3>
              </div>
              
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-ibm-gray-50">AURA QLM API</span>
                  <span className="font-mono text-green-400">
                    READY
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-ibm-gray-50">IBM Quantum</span>
                  <span className={`font-mono ${
                    systemStatus === 'connected' ? 'text-green-400' : 
                    systemStatus === 'error' ? 'text-red-400' : 'text-yellow-400'
                  }`}>
                    {systemStatus.toUpperCase()}
                  </span>
                </div>
                
                {currentBackend && (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-ibm-gray-50">Active Backend</span>
                      <span className="font-mono text-white">{currentBackend.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-ibm-gray-50">Processor</span>
                      <span className="font-mono text-white">{currentBackend.processor}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-ibm-gray-50">Qubits Available</span>
                      <span className="font-mono text-white">{currentBackend.qubits}</span>
                    </div>
                  </>
                )}
              </div>
              
              <div className="mt-4 pt-4 border-t border-ibm-gray-80">
                <Badge
                  variant="outline"
                  className={`w-full justify-center py-2 ${
                    isSystemReady
                      ? 'border-green-500/50 bg-green-500/10 text-green-400'
                      : 'border-yellow-500/50 bg-yellow-500/10 text-yellow-400'
                  }`}
                >
                  <Zap className="h-3 w-3 mr-2" />
                  {isSystemReady ? 'ALL SYSTEMS OPERATIONAL' : 'SYSTEM INITIALIZING'}
                </Badge>
              </div>
            </Card>
          </aside>
        </div>
      </div>

      {/* Keyboard shortcuts overlay */}
      <KeyboardShortcuts />
    </div>
  )
}
