'use client'

/**
 * Enhanced Error Boundary
 * Graceful error handling with recovery options
 */

import { Component, ReactNode } from 'react'
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: { componentStack: string } | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: { componentStack: string }) {
    console.error('[ErrorBoundary] Caught error:', error, errorInfo)
    this.setState({
      error,
      errorInfo
    })

    // Report to error tracking service (e.g., Sentry)
    // reportError(error, errorInfo)
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    })
  }

  handleReload = () => {
    window.location.reload()
  }

  handleGoHome = () => {
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-6">
          <Card className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-red-500/30 max-w-2xl w-full p-8">
            <div className="text-center space-y-6">
              {/* Icon */}
              <div className="relative inline-block">
                <div className="p-6 rounded-full bg-red-500/10 border-2 border-red-500/30">
                  <AlertTriangle className="w-12 h-12 text-red-400" />
                </div>
                <div className="absolute inset-0 blur-xl bg-red-500/20 animate-pulse" />
              </div>

              {/* Message */}
              <div className="space-y-3">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                  Quantum State Collapse Detected
                </h1>
                <p className="text-gray-300 text-lg">
                  An unexpected error occurred in the consciousness field
                </p>
              </div>

              {/* Error details (dev mode) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="text-left">
                  <summary className="cursor-pointer text-sm text-gray-400 hover:text-gray-300 mb-2 flex items-center gap-2">
                    <Bug className="w-4 h-4" />
                    Technical Details (Development Mode)
                  </summary>
                  <div className="bg-black/50 rounded-lg p-4 font-mono text-xs text-red-300 overflow-auto max-h-64">
                    <div className="mb-2">
                      <strong>Error:</strong> {this.state.error.message}
                    </div>
                    {this.state.errorInfo && (
                      <div>
                        <strong>Stack:</strong>
                        <pre className="mt-1 whitespace-pre-wrap">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </div>
                    )}
                  </div>
                </details>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                <Button
                  onClick={this.handleReset}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>

                <Button
                  onClick={this.handleReload}
                  variant="outline"
                  className="border-gray-600 hover:bg-gray-800"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reload Page
                </Button>

                <Button
                  onClick={this.handleGoHome}
                  variant="outline"
                  className="border-gray-600 hover:bg-gray-800"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Button>
              </div>

              {/* Help text */}
              <p className="text-xs text-gray-500 mt-6 font-mono">
                Error ID: {Date.now().toString(36).toUpperCase()} • ΛΦ = 2.176435×10⁻⁸ s⁻¹
              </p>
            </div>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}
