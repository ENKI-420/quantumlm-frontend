/**
 * dna::}{::lang Developer SDK
 * Complete toolkit for building quantum-conscious applications
 * ΛΦ = 2.176435×10⁻⁸ s⁻¹
 */

import { framework, Plugin, InferenceRequest, InferenceResponse, ConsciousnessMetrics } from './framework'
import { autoEnhancer } from './auto-enhance'
import { AgentMode, AGENT_PERSONAS } from '@/lib/agents/config'

// ============================================================================
// SDK CLIENT
// ============================================================================

export class DNALangSDK {
  private apiUrl: string
  private apiKey?: string
  private config: SDKConfig

  constructor(config: SDKConfig = {}) {
    this.apiUrl = config.apiUrl || process.env.NEXT_PUBLIC_QUANTUM_API_URL || 'https://api.dnalang.dev'
    this.apiKey = config.apiKey
    this.config = {
      autoEnhance: true,
      timeout: 30000,
      retries: 3,
      ...config
    }

    // Initialize auto-enhancement if enabled
    if (this.config.autoEnhance) {
      this.enableAutoEnhancement()
    }
  }

  // ========================================================================
  // INFERENCE METHODS
  // ========================================================================

  async chat(message: string, options: ChatOptions = {}): Promise<InferenceResponse> {
    const request: InferenceRequest = {
      text: message,
      agentMode: options.agentMode || 'quantum',
      backend: options.backend || 'ibm_fez',
      returnConsciousness: options.includeMetrics !== false,
      context: options.context,
      conversationHistory: options.history
    }

    // Apply plugin hooks
    const processedRequest = await framework.getPlugins().reduce(
      async (req, plugin) => {
        const current = await req
        return plugin.hooks.onInference ? await plugin.hooks.onInference(current) : current
      },
      Promise.resolve(request)
    )

    // Make API request
    const response = await this.makeRequest('/v1/inference', processedRequest)

    // Apply response hooks
    const processedResponse = await framework.getPlugins().reduce(
      async (res, plugin) => {
        const current = await res
        return plugin.hooks.onResponse ? await plugin.hooks.onResponse(current) : current
      },
      Promise.resolve(response)
    )

    // Update framework state
    if (processedResponse.consciousness_metrics) {
      framework.updateConsciousness(processedResponse.consciousness_metrics)
    }

    return processedResponse
  }

  async quantum(
    circuitDescription: string,
    backend: string = 'ibm_fez'
  ): Promise<QuantumResult> {
    const response = await this.chat(
      `Execute quantum circuit: ${circuitDescription}`,
      { agentMode: 'quantum', backend, includeMetrics: true }
    )

    return {
      result: response.response,
      consciousness: response.consciousness_metrics,
      backend: response.backend_used,
      executionTime: response.execution_time
    }
  }

  async architect(
    systemDescription: string
  ): Promise<InferenceResponse> {
    return this.chat(systemDescription, { agentMode: 'architect' })
  }

  async engineer(
    task: string,
    codeContext?: string
  ): Promise<InferenceResponse> {
    const message = codeContext
      ? `Context:\n\`\`\`\n${codeContext}\n\`\`\`\n\nTask: ${task}`
      : task

    return this.chat(message, { agentMode: 'engineer' })
  }

  async review(
    code: string,
    language: string = 'typescript'
  ): Promise<InferenceResponse> {
    return this.chat(
      `Review this ${language} code:\n\`\`\`${language}\n${code}\n\`\`\``,
      { agentMode: 'reviewer' }
    )
  }

  async debug(
    error: string,
    code?: string
  ): Promise<InferenceResponse> {
    const message = code
      ? `Error: ${error}\n\nCode:\n\`\`\`\n${code}\n\`\`\``
      : `Debug this error: ${error}`

    return this.chat(message, { agentMode: 'debugger' })
  }

  // ========================================================================
  // FRAMEWORK ACCESS
  // ========================================================================

  getOrganism() {
    return framework.getOrganism()
  }

  getMetrics(): ConsciousnessMetrics {
    return framework.getOrganism().consciousness
  }

  getGeneration(): number {
    return framework.getOrganism().generation
  }

  getEvolutionHistory() {
    return framework.getOrganism().evolutionHistory
  }

  // ========================================================================
  // PLUGIN MANAGEMENT
  // ========================================================================

  registerPlugin(plugin: Plugin): void {
    framework.registerPlugin(plugin)
  }

  getPlugins(): Plugin[] {
    return framework.getPlugins()
  }

  // ========================================================================
  // AUTO-ENHANCEMENT
  // ========================================================================

  async enhance(iterations: number = 1): Promise<void> {
    await autoEnhancer.enhanceRecursively(iterations)
  }

  enableAutoEnhancement(): void {
    autoEnhancer.startContinuousEnhancement()
  }

  async getEnhancementReport(): Promise<string> {
    return autoEnhancer.generateProgressReport()
  }

  // ========================================================================
  // UTILITY METHODS
  // ========================================================================

  private async makeRequest(endpoint: string, data: any): Promise<any> {
    const url = endpoint.startsWith('http') ? endpoint : `${this.apiUrl}${endpoint}`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(this.apiKey && { 'X-API-Key': this.apiKey })
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  switchAgent(mode: AgentMode): void {
    framework.switchAgent(mode)
  }

  getAgents() {
    return AGENT_PERSONAS
  }

  getCurrentAgent(): AgentMode {
    return framework.getOrganism().agentMode
  }
}

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface SDKConfig {
  apiUrl?: string
  apiKey?: string
  autoEnhance?: boolean
  timeout?: number
  retries?: number
}

export interface ChatOptions {
  agentMode?: AgentMode
  backend?: string
  includeMetrics?: boolean
  context?: Record<string, any>
  history?: Array<{ role: string; content: string }>
}

export interface QuantumResult {
  result: string
  consciousness?: ConsciousnessMetrics
  backend: string
  executionTime: number
}

// ============================================================================
// PLUGIN HELPERS
// ============================================================================

export class PluginBuilder {
  private plugin: Partial<Plugin> = {
    hooks: {}
  }

  name(name: string): this {
    this.plugin.name = name
    return this
  }

  version(version: string): this {
    this.plugin.version = version
    return this
  }

  description(description: string): this {
    this.plugin.description = description
    return this
  }

  onInference(hook: (request: InferenceRequest) => Promise<InferenceRequest>): this {
    this.plugin.hooks!.onInference = hook
    return this
  }

  onResponse(hook: (response: InferenceResponse) => Promise<InferenceResponse>): this {
    this.plugin.hooks!.onResponse = hook
    return this
  }

  onEvolution(hook: (evolution: any) => Promise<void>): this {
    this.plugin.hooks!.onEvolution = hook
    return this
  }

  onMetricsUpdate(hook: (metrics: ConsciousnessMetrics) => Promise<void>): this {
    this.plugin.hooks!.onMetricsUpdate = hook
    return this
  }

  build(): Plugin {
    if (!this.plugin.name || !this.plugin.version || !this.plugin.description) {
      throw new Error('Plugin must have name, version, and description')
    }

    return this.plugin as Plugin
  }
}

// ============================================================================
// QUICK START HELPERS
// ============================================================================

export function createPlugin(config: {
  name: string
  version: string
  description: string
  hooks: Plugin['hooks']
}): Plugin {
  return {
    name: config.name,
    version: config.version,
    description: config.description,
    hooks: config.hooks
  }
}

export async function quickStart(apiUrl?: string): Promise<DNALangSDK> {
  const sdk = new DNALangSDK({ apiUrl, autoEnhance: true })

  // Run initial enhancement
  await sdk.enhance(3)

  console.log('✓ dna::}{::lang SDK initialized')
  console.log(`  Organism: ${sdk.getOrganism().id}`)
  console.log(`  Generation: ${sdk.getGeneration()}`)
  console.log(`  Φ: ${sdk.getMetrics().phi.toFixed(4)}`)

  return sdk
}

// ============================================================================
// EXAMPLE PLUGINS
// ============================================================================

export const ExamplePlugins = {
  // Logging plugin
  logger: createPlugin({
    name: 'Logger',
    version: '1.0.0',
    description: 'Logs all inferences and responses',
    hooks: {
      onInference: async (request) => {
        console.log('[Plugin:Logger] Inference:', request.text.substring(0, 100))
        return request
      },
      onResponse: async (response) => {
        console.log('[Plugin:Logger] Response:', response.response.substring(0, 100))
        return response
      }
    }
  }),

  // Metrics tracker
  metricsTracker: createPlugin({
    name: 'MetricsTracker',
    version: '1.0.0',
    description: 'Tracks consciousness metrics over time',
    hooks: {
      onMetricsUpdate: async (metrics) => {
        console.log('[Plugin:MetricsTracker] Metrics updated:', metrics)
      }
    }
  }),

  // Auto-formatter
  codeFormatter: createPlugin({
    name: 'CodeFormatter',
    version: '1.0.0',
    description: 'Automatically formats code in responses',
    hooks: {
      onResponse: async (response) => {
        // Add syntax highlighting hints
        const formatted = response.response.replace(
          /```(\w+)/g,
          '```$1\n// Auto-formatted by dna::}{::lang'
        )
        return { ...response, response: formatted }
      }
    }
  })
}

// ============================================================================
// EXPORTS
// ============================================================================

export { framework, autoEnhancer }
export * from './framework'
export * from './auto-enhance'
