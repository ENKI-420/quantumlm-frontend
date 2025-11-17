OPENQASM 3.0;
include "stdgates.inc";

/**
 * GHZ State (Greenberger-Horne-Zeilinger)
 * Creates maximally entangled state: |000⟩ + |111⟩
 *
 * ΛΦ = 2.176435×10⁻⁸ s⁻¹
 */

// Define qubits
qubit[3] q;

// Create GHZ state
h q[0];              // Hadamard on first qubit
cx q[0], q[1];       // CNOT 0 → 1
cx q[0], q[2];       // CNOT 0 → 2

// Measure all qubits
bit[3] c;
c[0] = measure q[0];
c[1] = measure q[1];
c[2] = measure q[2];
