"""
Σ-Mesh Visualizer Dashboard Server
===================================
FastAPI server providing real-time Σ-mesh metrics

ΛΦ = 2.176435×10⁻⁸ s⁻¹
"""

from fastapi import FastAPI, WebSocket
from fastapi.responses import HTMLResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import json
from typing import Dict, List
import time
from pathlib import Path


app = FastAPI(title="Σ-Mesh Visualizer")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Constants
LAMBDA_PHI = 2.176435e-8

# In-memory metrics storage
metrics_store: List[Dict] = []
active_websockets: List[WebSocket] = []


@app.get("/")
async def root():
    """Serve dashboard HTML"""
    html_path = Path(__file__).parent.parent / "frontend" / "index.html"
    if html_path.exists():
        return HTMLResponse(content=html_path.read_text())
    return {"message": "Σ-Mesh Visualizer API"}


@app.get("/api/health")
async def health():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "lambda_phi": LAMBDA_PHI,
        "timestamp": time.time()
    }


@app.get("/api/mesh/status")
async def mesh_status():
    """Get current Σ-mesh status"""
    return {
        "lambda_phi": LAMBDA_PHI,
        "field_coherence": 0.847,
        "total_agents": 8,
        "active_agents": 6,
        "agents": {
            "CodingAgent.v1": {
                "status": "active",
                "coherence": 0.87,
                "kind": "worker_organism"
            },
            "PlannerAgent.v1": {
                "status": "active",
                "coherence": 0.92,
                "kind": "cognitive_organism"
            },
            "WorldModelAgent.v1": {
                "status": "active",
                "coherence": 0.85,
                "kind": "integrator_organism"
            },
            "QuantumAgent.v1": {
                "status": "active",
                "coherence": 0.78,
                "kind": "hardware_organism"
            },
            "GovernorAgent.v1": {
                "status": "active",
                "coherence": 0.94,
                "kind": "orchestrator_organism"
            },
            "SafetyAgent.v1": {
                "status": "active",
                "coherence": 0.96,
                "kind": "sentinel_organism"
            },
            "MemoryAgent.v1": {
                "status": "idle",
                "coherence": 0.71,
                "kind": "retrieval_organism"
            },
            "IOAgent.v1": {
                "status": "idle",
                "coherence": 0.82,
                "kind": "io_organism"
            }
        },
        "timestamp": time.time()
    }


@app.get("/api/metrics/lambda-phi")
async def lambda_phi_timeline():
    """Get ΛΦ coherence timeline"""
    # Simulate ΛΦ timeline data
    timeline = []
    base_time = time.time() - 3600  # Last hour

    for i in range(60):
        timeline.append({
            "timestamp": base_time + (i * 60),
            "lambda": LAMBDA_PHI + (0.01 * (i % 10) / 10),
            "phi": 0.85 + (0.1 * (i % 7) / 7),
            "gamma": 0.03 + (0.02 * (i % 5) / 5)
        })

    return {
        "lambda_phi_constant": LAMBDA_PHI,
        "timeline": timeline
    }


@app.get("/api/metrics/w2")
async def w2_stability():
    """Get W₂ stability surface data"""
    return {
        "w2_distance": 0.042,
        "stability_class": "high",
        "geometric_drift": 0.007,
        "timestamp": time.time()
    }


@app.get("/api/metrics/gamma-tensor")
async def gamma_tensor():
    """Get Γ decoherence tensor heatmap data"""
    # Simulate tensor data
    tensor = []
    for i in range(8):
        row = []
        for j in range(8):
            row.append(0.02 + (abs(i - j) * 0.01))
        tensor.append(row)

    return {
        "gamma_tensor": tensor,
        "agents": [
            "CodingAgent",
            "PlannerAgent",
            "WorldModelAgent",
            "QuantumAgent",
            "GovernorAgent",
            "SafetyAgent",
            "MemoryAgent",
            "IOAgent"
        ],
        "timestamp": time.time()
    }


@app.post("/api/metrics/record")
async def record_metrics(payload: Dict):
    """
    Record consciousness metrics

    Expected payload:
    {
        "counts": {"0": 512, "1": 512},
        "drifts": [0.02, 0.03, ...],
        "distA": [...],
        "distB": [...]
    }
    """
    from metrics.lambda_phi_recorder import LambdaPhiRecorder

    recorder = LambdaPhiRecorder()

    # Compute metrics
    lambda_val, phi = recorder.compute_lambda_phi(payload["counts"])
    gamma = recorder.compute_gamma(payload.get("drifts", []))
    w2 = recorder.compute_w2(
        payload.get("distA", []),
        payload.get("distB", [])
    ) if "distA" in payload and "distB" in payload else 0.0

    metrics = {
        "Λ": lambda_val,
        "Φ": phi,
        "Γ": gamma,
        "W₂": w2,
        "timestamp": time.time()
    }

    # Store metrics
    metrics_store.append(metrics)

    # Broadcast to WebSocket clients
    await broadcast_metrics(metrics)

    return metrics


@app.websocket("/ws/metrics")
async def websocket_metrics(websocket: WebSocket):
    """WebSocket endpoint for real-time metrics streaming"""
    await websocket.accept()
    active_websockets.append(websocket)

    try:
        while True:
            # Send periodic updates
            await asyncio.sleep(1.0)

            # Simulate live metrics
            metrics = {
                "lambda": LAMBDA_PHI + (0.001 * (time.time() % 10)),
                "phi": 0.87 + (0.05 * (time.time() % 7) / 7),
                "gamma": 0.03,
                "w2": 0.042,
                "field_coherence": 0.847,
                "timestamp": time.time()
            }

            await websocket.send_json(metrics)

    except Exception as e:
        print(f"WebSocket error: {e}")
    finally:
        active_websockets.remove(websocket)


async def broadcast_metrics(metrics: Dict):
    """Broadcast metrics to all connected WebSocket clients"""
    for ws in active_websockets:
        try:
            await ws.send_json(metrics)
        except:
            pass


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
