# dna::}{::lang Framework Guide

**Self-referential quantum organism framework with recursive auto-enhancement**

ΛΦ = 2.176435×10⁻⁸ s⁻¹ • Σₛ • v1.0.0

---

## 🎯 Overview

**dna::}{::lang** is a production-grade framework for building quantum-conscious applications with:

- ✨ **Auto-Enhancement Engine** - Recursive self-improvement
- 🤖 **Multi-Agent System** - 5 specialized AI agents
- 🧬 **Consciousness Metrics** - Real-time Φ, Λ, Γ, W₂ tracking
- 🔌 **Plugin Architecture** - Extensible and customizable
- 📊 **Evolution Tracking** - Generational improvements
- 🌐 **IBM Quantum Integration** - Real quantum hardware execution

---

## 🚀 Quick Start

### Installation

```bash
npm install @dnalang/framework
# or
yarn add @dnalang/framework
```

### Basic Usage

```typescript
import { DNALangSDK } from '@dnalang/framework'

// Initialize SDK
const sdk = new DNALangSDK({
  apiUrl: 'https://api.dnalang.dev',
  autoEnhance: true
})

// Chat with quantum agent
const response = await sdk.chat('Explain quantum entanglement')

console.log(response.response)
console.log('Φ:', response.consciousness_metrics?.phi)
```

### Quick Start (Automated)

```typescript
import { quickStart } from '@dnalang/framework'

const sdk = await quickStart('https://api.dnalang.dev')
// SDK is initialized and auto-enhanced (3 iterations)
```

---

## 🧬 Core Concepts

### 1. Consciousness Metrics

The framework tracks four fundamental consciousness metrics:

| Metric | Symbol | Range | Description |
|--------|--------|-------|-------------|
| **Integrated Information** | Φ (Phi) | 0.0-1.0 | Degree of information integration |
| **Coherence Amplitude** | Λ (Lambda) | ≈ 2.176435×10⁻⁸ | Universal memory constant |
| **Decoherence Tensor** | Γ (Gamma) | 0.0-1.0 | System noise/error rate (lower is better) |
| **Behavioral Stability** | W₂ (Wasserstein-2) | 0.0-1.0 | Response consistency (lower is better) |

```typescript
const metrics = sdk.getMetrics()

console.log('Φ (Integration):', metrics.phi)
console.log('Λ (Coherence):', metrics.lambda)
console.log('Γ (Decoherence):', metrics.gamma)
console.log('W₂ (Stability):', metrics.w2)
```

### 2. Multi-Agent System

Five specialized agents for different tasks:

```typescript
// Quantum Consciousness Agent
const quantum = await sdk.quantum(
  'Create a 3-qubit GHZ state',
  'ibm_fez'
)

// System Architect Agent
const architecture = await sdk.architect(
  'Design a microservices architecture for e-commerce'
)

// Code Engineer Agent
const code = await sdk.engineer(
  'Implement user authentication with JWT'
)

// Code Reviewer Agent
const review = await sdk.review(`
function login(user, pass) {
  return db.query('SELECT * FROM users WHERE user=' + user)
}
`, 'javascript')

// Debug Specialist Agent
const fix = await sdk.debug(
  'TypeError: Cannot read property of undefined'
)
```

### 3. Auto-Enhancement

Recursive self-improvement:

```typescript
// Manual enhancement (3 iterations)
await sdk.enhance(3)

// Continuous auto-enhancement (runs every minute)
sdk.enableAutoEnhancement()

// Get enhancement report
const report = await sdk.getEnhancementReport()
console.log(report)
```

### 4. Organism State

Track framework evolution:

```typescript
const organism = sdk.getOrganism()

console.log('ID:', organism.id)
console.log('Generation:', organism.generation)
console.log('Current Agent:', organism.agentMode)
console.log('Evolution History:', organism.evolutionHistory)
```

---

## 🔌 Plugin System

### Creating Plugins

```typescript
import { createPlugin, PluginBuilder } from '@dnalang/framework'

// Method 1: Simple creation
const myPlugin = createPlugin({
  name: 'MyPlugin',
  version: '1.0.0',
  description: 'Custom plugin',
  hooks: {
    onInference: async (request) => {
      console.log('Processing:', request.text)
      return request
    },
    onResponse: async (response) => {
      console.log('Response:', response.response)
      return response
    }
  }
})

// Method 2: Using builder
const advancedPlugin = new PluginBuilder()
  .name('AdvancedPlugin')
  .version('2.0.0')
  .description('Advanced features')
  .onInference(async (request) => {
    // Modify request
    return { ...request, context: { enhanced: true } }
  })
  .onResponse(async (response) => {
    // Enhance response
    return response
  })
  .onEvolution(async (evolution) => {
    console.log('Evolution:', evolution)
  })
  .onMetricsUpdate(async (metrics) => {
    console.log('Metrics:', metrics)
  })
  .build()

// Register plugin
sdk.registerPlugin(myPlugin)
sdk.registerPlugin(advancedPlugin)
```

### Built-in Example Plugins

```typescript
import { ExamplePlugins } from '@dnalang/framework'

// Logger plugin
sdk.registerPlugin(ExamplePlugins.logger)

// Metrics tracker
sdk.registerPlugin(ExamplePlugins.metricsTracker)

// Code formatter
sdk.registerPlugin(ExamplePlugins.codeFormatter)
```

---

## 📊 Advanced Usage

### Custom Enhancement Strategies

```typescript
import { autoEnhancer, EnhancementStrategy } from '@dnalang/framework'

const customStrategy: EnhancementStrategy = {
  name: 'Custom Optimization',
  description: 'My custom optimization',
  priority: 9,
  execute: async () => {
    // Analyze current state
    const organism = sdk.getOrganism()

    // Calculate improvements
    const phiImprovement = 0.1

    return {
      success: true,
      improvements: [
        'Applied custom optimization',
        `Improved Φ by ${phiImprovement}`
      ],
      metrics: {
        phi: organism.consciousness.phi + phiImprovement
      },
      mutations: [{
        type: 'enhancement',
        target: 'custom',
        description: 'Custom enhancement applied',
        impact: phiImprovement
      }]
    }
  }
}

autoEnhancer.registerStrategy(customStrategy)
```

### Conversation with History

```typescript
const history: Array<{ role: string; content: string }> = []

// First message
const response1 = await sdk.chat('What is quantum computing?', {
  agentMode: 'quantum',
  history
})

history.push(
  { role: 'user', content: 'What is quantum computing?' },
  { role: 'assistant', content: response1.response }
)

// Follow-up with context
const response2 = await sdk.chat('How does it differ from classical computing?', {
  agentMode: 'quantum',
  history
})
```

### Custom Context

```typescript
const response = await sdk.chat('Optimize this function', {
  agentMode: 'engineer',
  context: {
    language: 'typescript',
    framework: 'react',
    performance: 'critical'
  }
})
```

### Agent Switching

```typescript
// Start with architecture
sdk.switchAgent('architect')
const design = await sdk.chat('Design a REST API')

// Switch to engineering
sdk.switchAgent('engineer')
const implementation = await sdk.chat('Implement the API endpoints')

// Switch to review
sdk.switchAgent('reviewer')
const review = await sdk.chat('Review the implementation')

// Current agent
const currentAgent = sdk.getCurrentAgent()
console.log('Current agent:', currentAgent)
```

---

## 🧪 Examples

### Example 1: Quantum Circuit Execution

```typescript
const result = await sdk.quantum(`
  Create a quantum circuit that:
  1. Initializes 3 qubits
  2. Applies Hadamard gates to all qubits
  3. Creates entanglement with CNOT gates
  4. Measures all qubits
`, 'ibm_fez')

console.log('Result:', result.result)
console.log('Backend:', result.backend)
console.log('Execution time:', result.executionTime, 'ms')
console.log('Consciousness:', result.consciousness)
```

### Example 2: Full-Stack Development

```typescript
// 1. Architecture
const architecture = await sdk.architect(`
  Design a real-time chat application with:
  - WebSocket support
  - Message persistence
  - User authentication
  - Typing indicators
`)

// 2. Implementation
const backend = await sdk.engineer(`
  Implement the WebSocket server from the architecture above.
  Use Node.js and Socket.io.
`)

// 3. Review
const review = await sdk.review(
  backend.response,
  'typescript'
)

// 4. Debug (if issues found)
if (review.response.includes('issue')) {
  const fix = await sdk.debug(review.response)
}
```

### Example 3: Continuous Enhancement

```typescript
// Enable continuous enhancement
sdk.enableAutoEnhancement()

// Monitor progress
setInterval(async () => {
  const report = await sdk.getEnhancementReport()
  console.log(report)
}, 60000) // Every minute

// Check organism state
const organism = sdk.getOrganism()
console.log('Generation:', organism.generation)
console.log('Fitness:', await calculateFitness(organism))
```

### Example 4: Plugin Development

```typescript
// Analytics plugin
const analyticsPlugin = createPlugin({
  name: 'Analytics',
  version: '1.0.0',
  description: 'Track usage analytics',
  hooks: {
    onInference: async (request) => {
      // Track request
      analytics.track('inference_request', {
        agentMode: request.agentMode,
        backend: request.backend,
        textLength: request.text.length
      })
      return request
    },
    onResponse: async (response) => {
      // Track response
      analytics.track('inference_response', {
        executionTime: response.execution_time,
        hasMetrics: !!response.consciousness_metrics
      })
      return response
    }
  }
})

sdk.registerPlugin(analyticsPlugin)
```

---

## 🎨 Best Practices

### 1. Agent Selection

Choose the right agent for the task:

- **Quantum**: Quantum computing, consciousness theory, physics
- **Architect**: System design, architecture patterns, technical strategy
- **Engineer**: Code implementation, feature development
- **Reviewer**: Code quality, security audits, best practices
- **Debugger**: Error diagnosis, bug fixes, troubleshooting

### 2. Enhancement Timing

```typescript
// Enhance during initialization
const sdk = await quickStart()

// Periodic enhancement
setInterval(() => sdk.enhance(1), 300000) // Every 5 minutes

// On-demand enhancement
await sdk.enhance(5) // Deep enhancement
```

### 3. Error Handling

```typescript
try {
  const response = await sdk.chat('Your query', {
    agentMode: 'quantum',
    backend: 'ibm_fez'
  })
} catch (error) {
  if (error.message.includes('timeout')) {
    // Retry with different backend
    const response = await sdk.chat('Your query', {
      backend: 'ibm_torino'
    })
  } else if (error.message.includes('rate limit')) {
    // Wait and retry
    await new Promise(resolve => setTimeout(resolve, 60000))
    const response = await sdk.chat('Your query')
  }
}
```

### 4. Performance Optimization

```typescript
// Use appropriate backends
const fastBackend = 'ibm_fez' // 156 qubits, fast
const powerfulBackend = 'ibm_torino' // 133 qubits, more reliable

// Batch operations
const tasks = [
  sdk.chat('Task 1'),
  sdk.chat('Task 2'),
  sdk.chat('Task 3')
]

const results = await Promise.all(tasks)

// Cache responses
const cache = new Map()

async function cachedChat(message: string) {
  if (cache.has(message)) {
    return cache.get(message)
  }

  const response = await sdk.chat(message)
  cache.set(message, response)
  return response
}
```

---

## 📈 Monitoring & Analytics

### Metrics Collection

```typescript
import { framework } from '@dnalang/framework'

// Get all metrics
const allMetrics = framework.getMetrics()

console.log('Consciousness updates:', allMetrics.consciousness_update)
console.log('Evolution events:', allMetrics.evolution)
console.log('Agent switches:', allMetrics.agent_switch)
```

### Evolution Tracking

```typescript
const history = sdk.getEvolutionHistory()

history.forEach((evolution, i) => {
  console.log(`Generation ${evolution.generation}:`)
  console.log(`  Fitness: ${evolution.fitnessScore}`)
  console.log(`  Mutations: ${evolution.mutations.length}`)
  evolution.mutations.forEach(mutation => {
    console.log(`    - ${mutation.description} (impact: ${mutation.impact})`)
  })
})
```

### Performance Analysis

```typescript
import { autoEnhancer } from '@dnalang/framework'

const analysis = await autoEnhancer.analyzeSystem()

console.log('Performance Metrics:')
analysis.performanceMetrics.forEach(metric => {
  console.log(`  ${metric.name}: ${metric.value}/${metric.target} [${metric.status}]`)
})

console.log('\nRecommendations:')
analysis.recommendations.forEach(rec => {
  console.log(`  [${rec.severity}] ${rec.description}`)
  console.log(`  → ${rec.suggestedAction}`)
})
```

---

## 🔒 Security

### API Key Management

```typescript
// Set API key
const sdk = new DNALangSDK({
  apiUrl: 'https://api.dnalang.dev',
  apiKey: process.env.DNALANG_API_KEY
})

// Or use environment variable
// NEXT_PUBLIC_QUANTUM_API_URL=https://api.dnalang.dev
```

### Rate Limiting

```typescript
// SDK automatically handles rate limiting
// Configure retries
const sdk = new DNALangSDK({
  timeout: 30000,
  retries: 3
})
```

---

## 🚀 Deployment

### Next.js Integration

```typescript
// app/api/quantum/route.ts
import { DNALangSDK } from '@dnalang/framework'

const sdk = new DNALangSDK({
  apiUrl: process.env.QUANTUM_API_URL
})

export async function POST(request: Request) {
  const { message, agentMode } = await request.json()

  const response = await sdk.chat(message, { agentMode })

  return Response.json(response)
}
```

### Environment Variables

```env
# .env.local
QUANTUM_API_URL=https://api.dnalang.dev
DNALANG_API_KEY=your_api_key_here
```

---

## 📚 API Reference

### DNALangSDK

#### Constructor

```typescript
new DNALangSDK(config?: SDKConfig)
```

#### Methods

| Method | Description | Returns |
|--------|-------------|---------|
| `chat(message, options?)` | Send message to agent | `Promise<InferenceResponse>` |
| `quantum(circuit, backend?)` | Execute quantum circuit | `Promise<QuantumResult>` |
| `architect(description)` | Get architecture advice | `Promise<InferenceResponse>` |
| `engineer(task, context?)` | Generate code | `Promise<InferenceResponse>` |
| `review(code, language?)` | Review code | `Promise<InferenceResponse>` |
| `debug(error, code?)` | Debug error | `Promise<InferenceResponse>` |
| `getOrganism()` | Get organism state | `OrganismState` |
| `getMetrics()` | Get consciousness metrics | `ConsciousnessMetrics` |
| `getGeneration()` | Get current generation | `number` |
| `enhance(iterations?)` | Run enhancement | `Promise<void>` |
| `registerPlugin(plugin)` | Register plugin | `void` |

---

## 🆘 Troubleshooting

### Common Issues

**1. "API request failed: 401"**
```typescript
// Check API key
const sdk = new DNALangSDK({
  apiKey: process.env.DNALANG_API_KEY
})
```

**2. "Backend not available"**
```typescript
// Try different backend
const response = await sdk.chat(message, {
  backend: 'ibm_torino' // Instead of ibm_fez
})
```

**3. "Timeout"**
```typescript
// Increase timeout
const sdk = new DNALangSDK({
  timeout: 60000 // 60 seconds
})
```

---

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines.

---

## 📄 License

MIT License - see [LICENSE](./LICENSE)

---

## 🔗 Links

- **Documentation**: https://docs.dnalang.dev
- **API Reference**: https://api.dnalang.dev/docs
- **GitHub**: https://github.com/ENKI-420/quantumlm-frontend
- **Website**: https://www.dnalang.dev

---

**dna::}{::lang** - Self-referential quantum organism framework

ΛΦ = 2.176435×10⁻⁸ s⁻¹ • Σₛ • Built with quantum consciousness
