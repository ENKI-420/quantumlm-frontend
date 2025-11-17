'use client'

/**
 * Toast Notification System
 * Elegant notification system with quantum-themed styling
 */

import { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface Toast {
  id: string
  type: ToastType
  title: string
  message?: string
  duration?: number
}

interface ToastContextValue {
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random()}`
    const newToast: Toast = { ...toast, id }
    setToasts(prev => [...prev, newToast])

    // Auto-remove after duration
    const duration = toast.duration || 5000
    setTimeout(() => {
      removeToast(id)
    }, duration)
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

function ToastContainer({ toasts, onRemove }: { toasts: Toast[], onRemove: (id: string) => void }) {
  return (
    <div
      className="fixed top-6 right-6 z-50 space-y-3 pointer-events-none"
      role="region"
      aria-label="Notifications"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  )
}

function ToastItem({ toast, onRemove }: { toast: Toast, onRemove: (id: string) => void }) {
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // Trigger exit animation before removal
    const duration = toast.duration || 5000
    const exitTimer = setTimeout(() => {
      setIsExiting(true)
    }, duration - 300)

    return () => clearTimeout(exitTimer)
  }, [toast.duration])

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />
  }

  const styles = {
    success: {
      bg: 'bg-gradient-to-br from-green-900/95 to-green-800/95',
      border: 'border-green-500/50',
      text: 'text-green-300',
      icon: 'text-green-400',
      glow: 'shadow-lg shadow-green-500/20'
    },
    error: {
      bg: 'bg-gradient-to-br from-red-900/95 to-red-800/95',
      border: 'border-red-500/50',
      text: 'text-red-300',
      icon: 'text-red-400',
      glow: 'shadow-lg shadow-red-500/20'
    },
    warning: {
      bg: 'bg-gradient-to-br from-orange-900/95 to-orange-800/95',
      border: 'border-orange-500/50',
      text: 'text-orange-300',
      icon: 'text-orange-400',
      glow: 'shadow-lg shadow-orange-500/20'
    },
    info: {
      bg: 'bg-gradient-to-br from-blue-900/95 to-blue-800/95',
      border: 'border-blue-500/50',
      text: 'text-blue-300',
      icon: 'text-blue-400',
      glow: 'shadow-lg shadow-blue-500/20'
    }
  }

  const style = styles[toast.type]

  return (
    <div
      className={`
        pointer-events-auto
        min-w-[320px] max-w-md
        ${style.bg} ${style.border} ${style.glow}
        border backdrop-blur-xl
        rounded-xl p-4
        transition-all duration-300
        ${isExiting
          ? 'animate-out slide-out-to-right-full fade-out'
          : 'animate-in slide-in-from-right-full fade-in'
        }
      `}
      role="alert"
      aria-live={toast.type === 'error' ? 'assertive' : 'polite'}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className={`flex-shrink-0 ${style.icon}`}>
          {icons[toast.type]}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-white text-sm mb-1">
            {toast.title}
          </h4>
          {toast.message && (
            <p className={`text-xs ${style.text} leading-relaxed`}>
              {toast.message}
            </p>
          )}
        </div>

        {/* Close button */}
        <button
          onClick={() => onRemove(toast.id)}
          className="flex-shrink-0 text-white/50 hover:text-white transition-colors"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full ${
            toast.type === 'success' ? 'bg-green-400' :
            toast.type === 'error' ? 'bg-red-400' :
            toast.type === 'warning' ? 'bg-orange-400' :
            'bg-blue-400'
          } rounded-full transition-all`}
          style={{
            animation: `shrink ${toast.duration || 5000}ms linear forwards`
          }}
        />
      </div>

      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  )
}
