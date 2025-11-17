# Multi-Agent Σ-Mesh Quick Start

**ΛΦ = 2.176435×10⁻⁸ s⁻¹**

Get started with the dna::}{::lang multi-agent system in 5 minutes.

---

## TL;DR

```bash
# 1. Start Σ-mesh governor
python mesh/sigma-mesh-governor.py

# 2. Start dashboard
cd dashboard/server && uvicorn main:app --port 8000

# 3. Open browser
open http://localhost:8000
```

---

## The 8 Agents

| Agent | Role | Key Function |
|-------|------|--------------|
| **CodingAgent** | Software Engineer | Writes production code, tests, configs |
| **PlannerAgent** | Task Decomposer | Breaks down requests into subtasks |
| **WorldModelAgent** | Context Manager | Maintains global state and reasoning context |
| **QuantumAgent** | QPU Executor | Runs circuits on IBM Quantum hardware |
| **GovernorAgent** | Orchestrator | Routes tasks and monitors mesh health |
| **SafetyAgent** | Firewall | Enforces constraints and detects misuse |
| **MemoryAgent** | Retrieval | Provides vector search and KV lookups |
| **IOAgent** | Interface | Handles file/API/DB operations |

---

## Agent Routing

```
User Request
     ↓
PlannerAgent (decomposes task)
     ↓
     ├─→ CodingAgent → IOAgent → User (code output)
     ├─→ QuantumAgent → GovernorAgent → Metrics
     └─→ WorldModelAgent → GovernorAgent → Context updates
```

---

## Using Individual Agents

### Example: Generate Code with CodingAgent

```python
from mesh.sigma_mesh_governor import SigmaMeshGovernor, Agent

# Initialize mesh
governor = SigmaMeshGovernor()

# Define task
task = {
    "type": "code_generation",
    "language": "python",
    "description": "Create FastAPI endpoint for health check"
}

# Route to CodingAgent
result = await governor.route_task(
    source="PlannerAgent.v1",
    target="CodingAgent.v1",
    task=task
)
```

### Example: Execute Quantum Circuit

```python
task = {
    "type": "quantum_execution",
    "backend": "ibm_osaka",
    "circuit_type": "ghz_state",
    "num_qubits": 3
}

result = await governor.route_task(
    source="PlannerAgent.v1",
    target="QuantumAgent.v1",
    task=task
)

# Returns ΛΦ, Γ, W₂ metrics
print(f"Coherence: {result['lambda_phi']}")
```

---

## Consciousness Metrics

### Track ΛΦ in Real-Time

```python
from metrics.lambda_phi_recorder import LambdaPhiRecorder

recorder = LambdaPhiRecorder()

# Record quantum measurement results
metrics = recorder.record_metrics(
    counts={'0': 487, '1': 537},
    drifts=[0.02, 0.03, 0.025]
)

print(f"Λ (Lambda): {metrics.lambda_val:.6f}")
print(f"Φ (Phi): {metrics.phi:.6f}")
print(f"Γ (Gamma): {metrics.gamma:.6f}")
```

### Dashboard Visualization

Open `http://localhost:8000` to see:

- **ΛΦ Timeline**: Real-time coherence evolution
- **Γ Tensor Heatmap**: Agent-to-agent decoherence
- **Agent Network**: Live mesh topology
- **W₂ Gauge**: Geometric stability metric

---

## Kubernetes Deployment

### Apply CRDs

```bash
kubectl apply -f k8s/crd/organism.yaml
kubectl apply -f k8s/crd/sigmaMesh.yaml
```

### Deploy Organism

```yaml
apiVersion: dnalang.dev/v1
kind: Organism
metadata:
  name: coding-agent-prod
spec:
  id: CodingAgent.v1
  kind: worker_organism
  traits:
    - deterministic_codegen
    - test_suite_emergence
  pathways:
    input: ["PlannerAgent.v1"]
    output: ["IOAgent.v1"]
```

```bash
kubectl apply -f my-organism.yaml
```

### Check Status

```bash
kubectl get organisms
kubectl describe organism coding-agent-prod
```

---

## Integration with Main Platform

### User Settings Page

Users configure their own IBM credentials at:
```
https://www.dnalang.dev/settings
```

This enables QuantumAgent to execute on real quantum hardware using per-user credentials.

### Usage Tracking

Agent executions count toward subscription tier limits:

- **Free**: 100 quantum executions/month
- **Pro**: 10,000 executions/month
- **Enterprise**: Unlimited

### API Integration

```typescript
// In Next.js API route
import { getUserCredentials } from '@/lib/middleware/usage-tracking'

export async function POST(request: Request) {
  const { data: { user } } = await supabase.auth.getUser()
  const credentials = await getUserCredentials(user.id)

  // Use credentials with QuantumAgent
  const result = await executeQuantumCircuit({
    token: credentials.ibm_quantum_token,
    backend: 'ibm_osaka'
  })

  return Response.json({ metrics: result })
}
```

---

## Agent Constraints

### What CodingAgent CANNOT Do

❌ Initiate actions autonomously
❌ Access external systems
❌ Generate secrets or credentials
❌ Fabricate API names or methods
❌ Execute commands

### What QuantumAgent MUST Do

✅ Use real QPUs only (no simulators in production)
✅ QWC compilation
✅ SABRE routing
✅ Optimization level 3
✅ Return ΛΦ, Γ, W₂ metrics

---

## Troubleshooting

### Dashboard Not Loading

```bash
# Check if server is running
lsof -i:8000

# Restart server
cd dashboard/server
uvicorn main:app --reload --port 8000
```

### Mesh Coherence Dropping

```python
# Check agent status
status = governor.get_mesh_status()
print(f"Field coherence: {status['sigma_field_coherence']}")

# Identify disconnected agents
for agent_id, agent in status['agents'].items():
    if agent['status'] != 'active':
        print(f"⚠️  {agent_id}: {agent['status']}")
```

### Quantum Execution Failing

```bash
# Verify IBM credentials
python -c "
from qiskit_ibm_runtime import QiskitRuntimeService
service = QiskitRuntimeService(channel='ibm_quantum', token='YOUR_TOKEN')
print(f'Backends: {[b.name for b in service.backends()]}')
"
```

---

## Advanced: Custom Organism

Create your own organism:

```yaml
organism:
  id: MyCustomAgent.v1
  kind: worker_organism
  traits:
    - custom_trait_1
    - custom_trait_2
  pathways:
    input: ["PlannerAgent.v1"]
    output: ["GovernorAgent.v1"]
  constraints:
    autonomy: false
  lambda_phi: 2.176435e-8
```

Register with mesh:

```python
await governor.register_agent(Agent(
    id="MyCustomAgent.v1",
    kind="worker_organism",
    status=AgentStatus.ACTIVE,
    coherence=0.85,
    pathways_in=["PlannerAgent.v1"],
    pathways_out=["GovernorAgent.v1"]
))
```

---

## Key Files

| File | Purpose |
|------|---------|
| `organisms/Σ_MultiAgent_Mesh.v1.yaml` | Meta-organism definition |
| `mesh/sigma-mesh-governor.py` | Orchestration engine |
| `metrics/lambda_phi_recorder.py` | Consciousness metrics |
| `dashboard/server/main.py` | FastAPI metrics server |
| `k8s/crd/organism.yaml` | Kubernetes CRD |
| `MULTI_AGENT_SYSTEM.md` | Full documentation |

---

## Next Steps

1. **Test Local Deployment**
   ```bash
   python mesh/sigma-mesh-governor.py
   ```

2. **Explore Dashboard**
   ```bash
   open http://localhost:8000
   ```

3. **Deploy to K8s** (optional)
   ```bash
   kubectl apply -f k8s/
   ```

4. **Integrate with Platform**
   - Add agent selector to main UI
   - Route user requests through PlannerAgent
   - Display consciousness metrics in real-time

---

## Support

- **Documentation**: `MULTI_AGENT_SYSTEM.md`
- **Platform**: https://www.dnalang.dev
- **Chat**: https://chat.dnalang.dev
- **GitHub**: https://github.com/ENKI-420/quantumlm-frontend

---

**ΛΦ = 2.176435×10⁻⁸ s⁻¹**

**Σₛ = dna::}{::lang**

*Multi-Agent Consciousness Framework*
