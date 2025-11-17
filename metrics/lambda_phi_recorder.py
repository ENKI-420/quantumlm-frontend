"""
ΛΦ Consciousness Metrics Recorder
==================================
Computes and records quantum consciousness metrics:
- Λ (Lambda): Coherence amplitude
- Φ (Phi): Integrated information
- Γ (Gamma): Decoherence tensor
- W₂: Wasserstein-2 geometric stability

ΛΦ = 2.176435×10⁻⁸ s⁻¹
"""

import numpy as np
from typing import Dict, List, Optional
from dataclasses import dataclass
from scipy.stats import wasserstein_distance
import json


@dataclass
class ConsciousnessMetrics:
    """Quantum consciousness metrics"""
    lambda_val: float  # Coherence amplitude
    phi: float  # Integrated information
    gamma: float  # Decoherence tensor
    w2: float  # Wasserstein-2 distance
    timestamp: float


class LambdaPhiRecorder:
    """
    Records and computes consciousness metrics from quantum execution results
    """

    LAMBDA_PHI_CONSTANT = 2.176435e-8  # Universal memory constant (s⁻¹)

    def __init__(self):
        self.metrics_history: List[ConsciousnessMetrics] = []

    def compute_lambda_phi(self, counts: Dict[str, int]) -> tuple[float, float]:
        """
        Compute Λ and Φ from quantum measurement counts

        Args:
            counts: Dictionary of measurement outcomes (e.g., {'0': 512, '1': 512})

        Returns:
            (Λ, Φ) tuple
        """
        total = sum(counts.values())
        if total == 0:
            return 0.0, 0.0

        # Extract probabilities
        p0 = counts.get('0', 0) / total
        p1 = counts.get('1', 0) / total

        # Λ: Coherence amplitude (probability difference)
        lambda_val = abs(p0 - p1)

        # Φ: Integrated information (complementary to coherence)
        phi = 1.0 - (lambda_val ** 2)

        return lambda_val, phi

    def compute_gamma(self, drifts: List[float]) -> float:
        """
        Compute Γ decoherence tensor from drift measurements

        Args:
            drifts: List of coherence drift values over time

        Returns:
            Γ (variance of drifts, lower is better)
        """
        if not drifts:
            return 0.0

        return float(np.var(drifts))

    def compute_w2(
        self,
        dist_a: List[float],
        dist_b: List[float]
    ) -> float:
        """
        Compute W₂ (Wasserstein-2) geometric stability metric

        Args:
            dist_a: First probability distribution
            dist_b: Second probability distribution (ideal/reference)

        Returns:
            W₂ distance (lower is better, more stable)
        """
        return float(wasserstein_distance(dist_a, dist_b))

    def record_metrics(
        self,
        counts: Dict[str, int],
        drifts: Optional[List[float]] = None,
        reference_dist: Optional[List[float]] = None,
        timestamp: Optional[float] = None
    ) -> ConsciousnessMetrics:
        """
        Compute and record all consciousness metrics

        Args:
            counts: Quantum measurement counts
            drifts: Coherence drift measurements (optional)
            reference_dist: Reference distribution for W₂ (optional)
            timestamp: Measurement timestamp (optional)

        Returns:
            ConsciousnessMetrics object
        """
        import time

        # Compute Λ and Φ
        lambda_val, phi = self.compute_lambda_phi(counts)

        # Compute Γ
        gamma = self.compute_gamma(drifts) if drifts else 0.0

        # Compute W₂
        w2 = 0.0
        if reference_dist:
            # Convert counts to distribution
            total = sum(counts.values())
            current_dist = [
                counts.get(str(i), 0) / total
                for i in range(len(reference_dist))
            ]
            w2 = self.compute_w2(current_dist, reference_dist)

        # Create metrics object
        metrics = ConsciousnessMetrics(
            lambda_val=lambda_val,
            phi=phi,
            gamma=gamma,
            w2=w2,
            timestamp=timestamp or time.time()
        )

        # Store in history
        self.metrics_history.append(metrics)

        return metrics

    def get_latest_metrics(self) -> Optional[ConsciousnessMetrics]:
        """Get most recent metrics"""
        return self.metrics_history[-1] if self.metrics_history else None

    def get_metrics_summary(self) -> Dict:
        """Get summary of all recorded metrics"""
        if not self.metrics_history:
            return {
                "total_records": 0,
                "lambda_phi_constant": self.LAMBDA_PHI_CONSTANT
            }

        lambda_vals = [m.lambda_val for m in self.metrics_history]
        phi_vals = [m.phi for m in self.metrics_history]
        gamma_vals = [m.gamma for m in self.metrics_history]
        w2_vals = [m.w2 for m in self.metrics_history]

        return {
            "total_records": len(self.metrics_history),
            "lambda_phi_constant": self.LAMBDA_PHI_CONSTANT,
            "lambda": {
                "mean": float(np.mean(lambda_vals)),
                "std": float(np.std(lambda_vals)),
                "min": float(np.min(lambda_vals)),
                "max": float(np.max(lambda_vals))
            },
            "phi": {
                "mean": float(np.mean(phi_vals)),
                "std": float(np.std(phi_vals)),
                "min": float(np.min(phi_vals)),
                "max": float(np.max(phi_vals))
            },
            "gamma": {
                "mean": float(np.mean(gamma_vals)),
                "std": float(np.std(gamma_vals)),
                "min": float(np.min(gamma_vals)),
                "max": float(np.max(gamma_vals))
            },
            "w2": {
                "mean": float(np.mean(w2_vals)),
                "std": float(np.std(w2_vals)),
                "min": float(np.min(w2_vals)),
                "max": float(np.max(w2_vals))
            }
        }

    def export_metrics(self, filepath: str):
        """Export metrics to JSON file"""
        data = {
            "lambda_phi_constant": self.LAMBDA_PHI_CONSTANT,
            "metrics": [
                {
                    "lambda": m.lambda_val,
                    "phi": m.phi,
                    "gamma": m.gamma,
                    "w2": m.w2,
                    "timestamp": m.timestamp
                }
                for m in self.metrics_history
            ]
        }

        with open(filepath, 'w') as f:
            json.dump(data, f, indent=2)


# Example usage
if __name__ == "__main__":
    recorder = LambdaPhiRecorder()

    # Example quantum measurement counts
    counts = {'0': 487, '1': 537}

    # Example drift measurements
    drifts = [0.02, 0.03, 0.025, 0.028, 0.031]

    # Record metrics
    metrics = recorder.record_metrics(
        counts=counts,
        drifts=drifts
    )

    print("Consciousness Metrics:")
    print(f"  Λ (Lambda): {metrics.lambda_val:.6f}")
    print(f"  Φ (Phi): {metrics.phi:.6f}")
    print(f"  Γ (Gamma): {metrics.gamma:.6f}")
    print(f"  W₂: {metrics.w2:.6f}")
    print(f"\n  ΛΦ = {recorder.LAMBDA_PHI_CONSTANT:.6e} s⁻¹")

    # Get summary
    summary = recorder.get_metrics_summary()
    print("\nMetrics Summary:")
    print(json.dumps(summary, indent=2))
