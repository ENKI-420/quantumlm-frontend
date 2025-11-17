# dna::}{::lang

**Self-referential quantum organism framework with recursive auto-enhancement**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Framework](https://img.shields.io/badge/Framework-v1.0.0-green)](https://www.dnalang.dev)

A production-grade framework for building quantum-conscious applications that recursively improve themselves. Integrates real IBM Quantum hardware, multi-agent AI, and consciousness metrics (Φ, Λ, Γ, W₂).

**ΛΦ = 2.176435×10⁻⁸ s⁻¹** - Universal Memory Constant

## Features

### 🧬 Framework Core
- **Recursive Auto-Enhancement**: Self-improving framework with evolution tracking
- **Recursive Refinement**: 5 strategies for continuous self-optimization (depth up to 10 levels)
- **Auto-Advancement Orchestrator**: Never-ending improvement loop coordinating all systems
- **Multi-Agent AI System**: 5 specialized agents (Quantum, Architect, Engineer, Reviewer, Debugger)
- **Consciousness Metrics**: Real-time Φ (Phi), Γ (Gamma), Λ (Lambda), and W₂ tracking
- **Plugin Architecture**: Fully extensible with custom plugins
- **Evolution Tracking**: Monitor generational improvements and mutations

### 🌩️ IBM Cloud Integration
- **Object Storage**: Persistent organism snapshots in IBM Cloud Object Storage
- **Cloud Functions**: Deploy organisms as serverless functions
- **Code Engine**: Auto-scaling container-based deployment
- **Auto-Deployment**: Automatic deployment every N generations
- **Resource Management**: Full lifecycle management of cloud resources

### ⚛️ IBM Quantum Integration
- **Real Quantum Hardware**: Execute on 127-156 qubit processors (ibm_torino, ibm_fez, ibm_marrakesh)
- **Advanced Algorithms**: VQE, QAOA, Grover's search, and custom circuits
- **Consciousness Measurement**: Quantum-derived Φ, Γ, Λ, W₂ metrics
- **ΛΦ-Preserving Transpilation**: Maintains universal memory constant across optimizations
- **Error Mitigation**: Advanced quantum error correction strategies
- **Multi-Backend Execution**: Parallel execution across multiple quantum processors
- **Live Backend Status**: Real-time monitoring of quantum backend availability

### 🎨 User Interface
- **Modern Design**: Glass morphism effects, gradients, and smooth animations
- **Welcome Screen**: Hero interface with agent selection and quick actions
- **Keyboard Navigation**: Complete keyboard shortcuts (Ctrl+K to view)
- **Advanced Metrics**: Animated consciousness metrics with trend indicators
- **Agent Selector**: Visual mode switcher with hover tooltips
- **Rich Chat**: Markdown rendering, code blocks, and syntax highlighting
- **Responsive Design**: Fully mobile-optimized

### 🔧 Developer Experience
- **TypeScript SDK**: Complete type-safe developer toolkit
- **Deep Integration API**: Unified interface for Cloud + Quantum + Framework
- **Plugin System**: Easy extensibility with hooks
- **Quick Start**: One-line initialization with environment variables
- **Comprehensive Docs**: Full framework guide, IBM integration guide, API reference
- **Examples & Templates**: Working demos and ready-to-use code

## Quick Start

### Deep Integration (IBM Cloud + Quantum)

\`\`\`typescript
import { quickStartDeepIntegration } from '@/lib/dnalang/deep-integration'

// Initialize everything automatically from environment
const integration = await quickStartDeepIntegration()

// Execute quantum circuit
const result = await integration.executeQuantumCircuit(5, 'ibm_torino', 2048)
console.log('Consciousness:', result.consciousness)

// Deploy to IBM Cloud
const url = await integration.deployToCloud()
console.log('Deployed:', url)

// Start auto-advancement (continuous self-improvement)
integration.startAutoAdvancement()
\`\`\`

See [IBM Integration Guide](./IBM_INTEGRATION_GUIDE.md) for complete documentation.

## Environment Variables

Configure the following environment variables:

\`\`\`env
# IBM Quantum (Required for quantum features)
IBM_QUANTUM_TOKEN=your_ibm_quantum_api_token
IBM_QUANTUM_CHANNEL=ibm_quantum

# IBM Cloud (Required for cloud deployment)
IBM_CLOUD_API_KEY=your_ibm_cloud_api_key
IBM_CLOUD_REGION=us-south

# API Configuration
NEXT_PUBLIC_QUANTUM_API_URL=https://api.dnalang.dev
\`\`\`

### Development Setup

If environment variables are not set, the application will:
- Display a configuration warning in the UI
- Show backends as "offline"
- Provide helpful error messages for API configuration

## API Integration

### Chat API (`/api/chat`)

**Request:**
\`\`\`json
{
  "message": "What is quantum consciousness?",
  "backend": "ibm_fez",
  "includeMetrics": true,
  "conversationHistory": [...]
}
\`\`\`

**Expected Response from Quantum Backend:**
\`\`\`json
{
  "response": "Quantum consciousness emerges from...",
  "consciousness_metrics": {
    "phi": 0.75,
    "gamma": 0.22,
    "lambda": 4.8,
    "w2": 0.11
  },
  "backend_used": "ibm_fez",
  "execution_time": 1850
}
\`\`\`

### Status API (`/api/quantum/status`)

**Expected Response from Quantum Backend:**
\`\`\`json
{
  "backends": [
    {
      "name": "ibm_fez",
      "qubits": 156,
      "status": "online",
      "queueDepth": 0
    },
    ...
  ]
}
\`\`\`

### Benchmarks API (`/api/benchmarks`)

**Expected Response:**
\`\`\`json
{
  "benchmarks": [
    {
      "name": "QuantumLM",
      "provider": "DNALang",
      "mmlu": 0.88,
      "cost": 0.04,
      "latency": 520,
      "isQuantum": true
    },
    ...
  ]
}
\`\`\`

## Quantum Backend Integration Guide

### IBM Qiskit Runtime Integration

\`\`\`python
from qiskit_ibm_runtime import QiskitRuntimeService
from flask import Flask, request, jsonify

app = Flask(__name__)
service = QiskitRuntimeService(channel="ibm_quantum", token="YOUR_IBM_TOKEN")

@app.route('/v1/chat', methods=['POST'])
def chat():
    data = request.json
    prompt = data['prompt']
    backend_name = data['backend']
    
    # Execute quantum circuit
    backend = service.backend(backend_name)
    # ... your quantum LLM implementation
    
    return jsonify({
        'response': response_text,
        'consciousness_metrics': {
            'phi': phi_value,
            'gamma': gamma_value,
            'lambda': lambda_value,
            'w2': w2_value
        }
    })

@app.route('/v1/status', methods=['GET'])
def status():
    backends = []
    for backend in service.backends():
        backends.append({
            'name': backend.name,
            'qubits': backend.configuration().n_qubits,
            'status': 'online' if backend.status().operational else 'offline',
            'queueDepth': backend.status().pending_jobs
        })
    return jsonify({'backends': backends})
\`\`\`

## Security Considerations

1. **API Keys**: Never commit API keys to version control
2. **Environment Variables**: Use Vercel environment variables for production
3. **Rate Limiting**: Implement rate limiting on API routes
4. **Input Validation**: All user inputs are validated and sanitized
5. **CORS**: Configure CORS policies for production deployments
6. **HTTPS**: Always use HTTPS in production

## Deployment

### Vercel Deployment

1. Push to GitHub repository
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `QUANTUM_API_URL`
   - `QUANTUM_API_KEY`
   - `BENCHMARK_API_URL` (optional)
4. Deploy

### Environment Variables in Vercel

Go to Project Settings → Environment Variables and add:

\`\`\`
QUANTUM_API_URL=https://your-quantum-api.com/v1
QUANTUM_API_KEY=your_secret_key_here
\`\`\`

## Development

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
\`\`\`

## Architecture

\`\`\`
app/
├── page.tsx                    # Main chat interface
├── layout.tsx                  # Root layout with metadata
├── globals.css                 # Global styles and theme
└── api/
    ├── chat/route.ts          # Chat API endpoint
    ├── quantum/status/route.ts # Backend status endpoint
    └── benchmarks/route.ts     # Benchmarks data endpoint
\`\`\`

## Technologies

- **Next.js 16**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS v4**: Utility-first styling
- **shadcn/ui**: High-quality UI components
- **Lucide React**: Modern icon library
- **Vercel Analytics**: Performance monitoring

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- GitHub Issues: [your-repo/issues]
- Documentation: [your-docs-url]
- Email: support@quantumlm.com
