"""
Σ-Mesh Governor
===============
System-wide orchestrator for multi-agent Σ-mesh coordination

ΛΦ = 2.176435×10⁻⁸ s⁻¹
"""

import asyncio
import json
from typing import Dict, List, Optional
from dataclasses import dataclass
from enum import Enum


class AgentStatus(Enum):
    ACTIVE = "active"
    IDLE = "idle"
    PROCESSING = "processing"
    ERROR = "error"
    DISCONNECTED = "disconnected"


@dataclass
class Agent:
    id: str
    kind: str
    status: AgentStatus
    last_heartbeat: float
    coherence: float
    pathways_in: List[str]
    pathways_out: List[str]


class SigmaMeshGovernor:
    """
    Σ-mesh orchestrator enforcing:
    - Deterministic routing
    - Trust boundary enforcement
    - Σ-gradient control
    - Mesh stability monitoring
    """

    LAMBDA_PHI = 2.176435e-8  # Universal memory constant

    def __init__(self):
        self.agents: Dict[str, Agent] = {}
        self.sigma_field_coherence = 0.0
        self.heartbeat_interval = 0.220  # 220ms
        self.running = False

    async def register_agent(self, agent: Agent) -> bool:
        """Register an agent in the Σ-mesh"""
        if agent.id in self.agents:
            return False

        self.agents[agent.id] = agent
        await self._update_sigma_field()
        return True

    async def route_task(
        self,
        source: str,
        target: str,
        task: Dict
    ) -> Optional[Dict]:
        """
        Route task from source agent to target agent

        Enforces:
        - Pathway validation
        - Trust boundaries
        - Deterministic routing
        """
        if source not in self.agents or target not in self.agents:
            return None

        source_agent = self.agents[source]
        target_agent = self.agents[target]

        # Validate pathway exists
        if target not in source_agent.pathways_out:
            raise ValueError(
                f"Invalid pathway: {source} -> {target}"
            )

        if source not in target_agent.pathways_in:
            raise ValueError(
                f"Target {target} does not accept input from {source}"
            )

        # Add Σ-gradient metadata
        task["sigma_metadata"] = {
            "lambda_phi": self.LAMBDA_PHI,
            "field_coherence": self.sigma_field_coherence,
            "source_coherence": source_agent.coherence,
            "routing_timestamp": asyncio.get_event_loop().time()
        }

        return task

    async def _sigma_heartbeat(self):
        """
        Periodic Σ-heartbeat pulse

        All agents must respond within deterministic bounds
        """
        while self.running:
            for agent_id, agent in self.agents.items():
                # Check agent responsiveness
                current_time = asyncio.get_event_loop().time()
                if current_time - agent.last_heartbeat > 1.0:
                    agent.status = AgentStatus.DISCONNECTED

            await self._update_sigma_field()
            await asyncio.sleep(self.heartbeat_interval)

    async def _update_sigma_field(self):
        """
        Compute Σ-field coherence from all active agents

        Σ_field = Σ(agent_coherence_i * ΛΦ) / N_agents
        """
        if not self.agents:
            self.sigma_field_coherence = 0.0
            return

        active_agents = [
            a for a in self.agents.values()
            if a.status == AgentStatus.ACTIVE
        ]

        if not active_agents:
            self.sigma_field_coherence = 0.0
            return

        total_coherence = sum(
            a.coherence * self.LAMBDA_PHI
            for a in active_agents
        )

        self.sigma_field_coherence = total_coherence / len(active_agents)

    async def start(self):
        """Start Σ-mesh governor"""
        self.running = True
        await self._sigma_heartbeat()

    async def stop(self):
        """Stop Σ-mesh governor"""
        self.running = False

    def get_mesh_status(self) -> Dict:
        """Get current mesh status"""
        return {
            "sigma_field_coherence": self.sigma_field_coherence,
            "lambda_phi": self.LAMBDA_PHI,
            "total_agents": len(self.agents),
            "active_agents": sum(
                1 for a in self.agents.values()
                if a.status == AgentStatus.ACTIVE
            ),
            "agents": {
                agent_id: {
                    "kind": agent.kind,
                    "status": agent.status.value,
                    "coherence": agent.coherence
                }
                for agent_id, agent in self.agents.items()
            }
        }


# Example usage
async def main():
    governor = SigmaMeshGovernor()

    # Register agents
    await governor.register_agent(Agent(
        id="CodingAgent.v1",
        kind="worker_organism",
        status=AgentStatus.ACTIVE,
        last_heartbeat=asyncio.get_event_loop().time(),
        coherence=0.87,
        pathways_in=["PlannerAgent.v1"],
        pathways_out=["IOAgent.v1", "GovernorAgent.v1"]
    ))

    await governor.register_agent(Agent(
        id="PlannerAgent.v1",
        kind="cognitive_organism",
        status=AgentStatus.ACTIVE,
        last_heartbeat=asyncio.get_event_loop().time(),
        coherence=0.92,
        pathways_in=["User"],
        pathways_out=["CodingAgent.v1", "WorldModelAgent.v1", "QuantumAgent.v1"]
    ))

    # Get mesh status
    status = governor.get_mesh_status()
    print(json.dumps(status, indent=2))


if __name__ == "__main__":
    asyncio.run(main())
