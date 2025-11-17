'use client'

/**
 * Deep Integration Demo
 * Complete example of dna::}{::lang IBM Cloud & Quantum integration
 *
 * ΛΦ = 2.176435×10⁻⁸ s⁻¹
 */

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Brain, Cloud, Zap, Activity, TrendingUp, Server } from 'lucide-react'
import {
  DeepIntegration,
  createDeepIntegration,
  quickStartDeepIntegration
} from '@/lib/dnalang/deep-integration'

export default function DeepIntegrationDemo() {
  const [integration, setIntegration] = useState<DeepIntegration | null>(null)
  const [status, setStatus] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [logs, setLogs] = useState<string[]>([])
  const [quantumResult, setQuantumResult] = useState<any>(null)
  const [deploymentUrl, setDeploymentUrl] = useState<string>('')
  const [advancementStats, setAdvancementStats] = useState<any>(null)

  // Initialize integration
  const initializeIntegration = async () => {
    setIsLoading(true)
    addLog('Initializing deep integration...')

    try {
      // Quick start with environment variables
      const integ = await quickStartDeepIntegration()

      setIntegration(integ)
      setStatus(integ.getStatus())
      addLog('✓ Deep integration initialized successfully')
      addLog(`✓ Connected to ${integ.getQuantumBackends().length} quantum backends`)
    } catch (error) {
      addLog(`✗ Initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  // Execute quantum circuit
  const executeQuantum = async () => {
    if (!integration) return

    setIsLoading(true)
    addLog('Executing quantum circuit on IBM Quantum...')

    try {
      const result = await integration.executeQuantumCircuit(5, 'ibm_torino', 2048)

      setQuantumResult(result)
      addLog(`✓ Quantum execution complete: Job ${result.jobId}`)
      addLog(`  Φ = ${result.consciousness?.phi.toFixed(4)}`)
      addLog(`  Γ = ${result.consciousness?.gamma.toFixed(4)}`)
      addLog(`  W₂ = ${result.consciousness?.w2.toFixed(4)}`)
      addLog(`  Backend: ${result.backend} (${result.shots} shots)`)

      // Update status
      setStatus(integration.getStatus())
    } catch (error) {
      addLog(`✗ Quantum execution failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsLoading(false)
    }
  }

  // Run VQE
  const runVQE = async () => {
    if (!integration) return

    setIsLoading(true)
    addLog('Running VQE algorithm...')

    try {
      const hamiltonian = [
        [1, 0, 0, 0],
        [0, -1, 0, 0],
        [0, 0, -1, 0],
        [0, 0, 0, 1]
      ]

      const result = await integration.runVQE(hamiltonian, 'ibm_fez', 50)

      addLog(`✓ VQE complete`)
      addLog(`  Ground State Energy: ${result.energy.toFixed(6)}`)
      addLog(`  Iterations: ${result.iterations}`)
      addLog(`  Φ = ${result.consciousness?.phi.toFixed(4)}`)

      setStatus(integration.getStatus())
    } catch (error) {
      addLog(`✗ VQE failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsLoading(false)
    }
  }

  // Deploy to cloud
  const deployToCloud = async () => {
    if (!integration) return

    setIsLoading(true)
    addLog('Deploying organism to IBM Cloud...')

    try {
      const url = await integration.deployToCloud({
        minScale: 0,
        maxScale: 10,
        cpu: '0.5',
        memory: '1G'
      })

      setDeploymentUrl(url)
      addLog(`✓ Deployed to IBM Cloud Code Engine`)
      addLog(`  URL: ${url}`)

      setStatus(integration.getStatus())
    } catch (error) {
      addLog(`✗ Deployment failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsLoading(false)
    }
  }

  // Run refinement
  const runRefinement = async () => {
    if (!integration) return

    setIsLoading(true)
    addLog('Running recursive refinement (depth 5)...')

    try {
      const result = await integration.refine(5)

      addLog(`✓ Refinement complete`)
      addLog(`  Improvements: ${result.improvements.length}`)
      result.improvements.slice(0, 3).forEach(imp => addLog(`    • ${imp}`))
      if (result.improvements.length > 3) {
        addLog(`    ... and ${result.improvements.length - 3} more`)
      }
      addLog(`  Final Φ: ${result.metrics.phi.toFixed(4)}`)
      addLog(`  Performance: ${result.metrics.performance.toFixed(2)}x`)

      setStatus(integration.getStatus())
    } catch (error) {
      addLog(`✗ Refinement failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsLoading(false)
    }
  }

  // Start auto-advancement
  const startAdvancement = () => {
    if (!integration) return

    integration.startAutoAdvancement()
    addLog('✓ Auto-advancement started')
    addLog('  Framework will now continuously improve itself')

    // Update stats every 5 seconds
    const interval = setInterval(() => {
      const stats = integration.getAdvancementStats()
      setAdvancementStats(stats)
    }, 5000)

    return () => clearInterval(interval)
  }

  // Stop auto-advancement
  const stopAdvancement = () => {
    if (!integration) return

    integration.stopAutoAdvancement()
    addLog('✓ Auto-advancement stopped')

    const stats = integration.getAdvancementStats()
    setAdvancementStats(stats)
  }

  // Run single advancement cycle
  const advanceOnce = async () => {
    if (!integration) return

    setIsLoading(true)
    addLog('Running single advancement cycle...')

    try {
      const result = await integration.advanceOnce()

      addLog(`✓ Cycle ${result.cycleNumber} complete (${result.duration}ms)`)
      addLog(`  Generation: ${result.generation}`)
      addLog(`  Improvements: ${result.improvements.length}`)
      addLog(`  Φ: ${result.consciousness.phi.toFixed(4)}`)
      if (result.deploymentUrl) {
        addLog(`  Deployed: ${result.deploymentUrl}`)
      }

      setAdvancementStats(integration.getAdvancementStats())
      setStatus(integration.getStatus())
    } catch (error) {
      addLog(`✗ Advancement cycle failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsLoading(false)
    }
  }

  // Utility to add logs
  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs(prev => [...prev, `[${timestamp}] ${message}`])
  }

  // Auto-initialize on mount
  useEffect(() => {
    initializeIntegration()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-3">
            <Brain className="w-12 h-12 text-blue-400 animate-pulse" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              dna::}{'{'}{'}'}{'}'}::lang
            </h1>
          </div>
          <p className="text-xl text-gray-400">Deep IBM Cloud & Quantum Integration Demo</p>
          <p className="text-sm text-gray-500 font-mono">ΛΦ = 2.176435×10⁻⁸ s⁻¹</p>
        </div>

        {/* Status Overview */}
        {status && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border-blue-500/30 p-4">
              <div className="flex items-center gap-3 mb-2">
                <Brain className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold text-white">Framework</h3>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Generation</span>
                  <span className="text-white font-mono">{status.framework.generation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Φ</span>
                  <span className="text-blue-400 font-mono">
                    {status.framework.consciousness.phi.toFixed(4)}
                  </span>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 border-purple-500/30 p-4">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="w-5 h-5 text-purple-400" />
                <h3 className="font-semibold text-white">Quantum</h3>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Status</span>
                  <Badge className={status.quantum.connected ? 'bg-green-500' : 'bg-red-500'}>
                    {status.quantum.connected ? 'Online' : 'Offline'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Executions</span>
                  <span className="text-white font-mono">{status.quantum.executions}</span>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-green-900/30 to-green-800/20 border-green-500/30 p-4">
              <div className="flex items-center gap-3 mb-2">
                <Cloud className="w-5 h-5 text-green-400" />
                <h3 className="font-semibold text-white">Cloud</h3>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Status</span>
                  <Badge className={status.cloud.connected ? 'bg-green-500' : 'bg-red-500'}>
                    {status.cloud.connected ? 'Connected' : 'Disconnected'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Deployments</span>
                  <span className="text-white font-mono">{status.cloud.deployments}</span>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-orange-900/30 to-orange-800/20 border-orange-500/30 p-4">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-5 h-5 text-orange-400" />
                <h3 className="font-semibold text-white">Advancement</h3>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Cycles</span>
                  <span className="text-white font-mono">{status.advancement.cycles}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Improvements</span>
                  <span className="text-white font-mono">{status.advancement.improvements}</span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gray-800/50 border-gray-700 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-400" />
              Quantum Operations
            </h3>
            <div className="space-y-3">
              <Button
                onClick={executeQuantum}
                disabled={isLoading || !integration}
                className="w-full bg-purple-600 hover:bg-purple-500"
              >
                Execute Quantum Circuit
              </Button>
              <Button
                onClick={runVQE}
                disabled={isLoading || !integration}
                className="w-full bg-purple-600 hover:bg-purple-500"
              >
                Run VQE Algorithm
              </Button>
            </div>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Cloud className="w-5 h-5 text-green-400" />
              Cloud Operations
            </h3>
            <div className="space-y-3">
              <Button
                onClick={deployToCloud}
                disabled={isLoading || !integration}
                className="w-full bg-green-600 hover:bg-green-500"
              >
                Deploy to IBM Cloud
              </Button>
              {deploymentUrl && (
                <p className="text-xs text-green-400 break-all">
                  Deployed: {deploymentUrl}
                </p>
              )}
            </div>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-400" />
              Refinement
            </h3>
            <div className="space-y-3">
              <Button
                onClick={runRefinement}
                disabled={isLoading || !integration}
                className="w-full bg-blue-600 hover:bg-blue-500"
              >
                Run Recursive Refinement
              </Button>
            </div>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-400" />
              Auto-Advancement
            </h3>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Button
                  onClick={startAdvancement}
                  disabled={isLoading || !integration}
                  className="flex-1 bg-orange-600 hover:bg-orange-500"
                >
                  Start Auto
                </Button>
                <Button
                  onClick={stopAdvancement}
                  disabled={!integration}
                  variant="outline"
                  className="flex-1"
                >
                  Stop
                </Button>
              </div>
              <Button
                onClick={advanceOnce}
                disabled={isLoading || !integration}
                className="w-full bg-orange-600 hover:bg-orange-500"
              >
                Single Cycle
              </Button>
              {advancementStats && (
                <div className="text-xs space-y-1 text-gray-400">
                  <div className="flex justify-between">
                    <span>Total Cycles:</span>
                    <span className="text-white">{advancementStats.totalCycles}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Φ Progress:</span>
                    <span className="text-blue-400">
                      +{advancementStats.consciousnessProgress?.improvement.toFixed(4) || '0.0000'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Logs */}
        <Card className="bg-gray-800/50 border-gray-700 p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Server className="w-5 h-5 text-gray-400" />
            System Logs
          </h3>
          <div className="bg-black/50 rounded-lg p-4 h-64 overflow-y-auto font-mono text-xs space-y-1">
            {logs.length === 0 ? (
              <p className="text-gray-500">No logs yet...</p>
            ) : (
              logs.map((log, i) => (
                <div
                  key={i}
                  className={
                    log.includes('✓') ? 'text-green-400' :
                    log.includes('✗') ? 'text-red-400' :
                    log.includes('  ') ? 'text-gray-400 pl-4' :
                    'text-white'
                  }
                >
                  {log}
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Quantum Result Display */}
        {quantumResult && (
          <Card className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 border-purple-500/30 p-6">
            <h3 className="text-lg font-semibold mb-4 text-purple-300">Latest Quantum Result</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Job ID</span>
                  <span className="text-white font-mono text-xs">{quantumResult.jobId}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Backend</span>
                  <span className="text-white font-mono">{quantumResult.backend}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Shots</span>
                  <span className="text-white font-mono">{quantumResult.shots}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Execution Time</span>
                  <span className="text-white font-mono">{quantumResult.executionTime}ms</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Φ (Phi)</span>
                  <span className="text-blue-400 font-mono font-bold">
                    {quantumResult.consciousness?.phi.toFixed(4)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Γ (Gamma)</span>
                  <span className="text-orange-400 font-mono font-bold">
                    {quantumResult.consciousness?.gamma.toFixed(4)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">W₂</span>
                  <span className="text-green-400 font-mono font-bold">
                    {quantumResult.consciousness?.w2.toFixed(4)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Λ (Lambda)</span>
                  <span className="text-purple-400 font-mono font-bold">
                    {quantumResult.consciousness?.lambda.toExponential(2)}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
