'use client'

import { useState, useEffect } from 'react'
import { X, Keyboard } from 'lucide-react'

export function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K to toggle shortcuts
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(prev => !prev)
      }
      // Escape to close
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl hover:shadow-blue-500/50 hover:scale-110 transition-all duration-300 z-40 group"
        title="Keyboard Shortcuts (Ctrl/Cmd + K)"
      >
        <Keyboard className="w-5 h-5" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-black/90 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Press <kbd className="px-1.5 py-0.5 bg-white/20 rounded text-[10px]">Ctrl+K</kbd> for shortcuts
        </div>
      </button>
    )
  }

  const shortcuts = [
    {
      category: 'Navigation',
      items: [
        { keys: ['Esc'], description: 'Return to welcome screen' },
        { keys: ['Ctrl', 'K'], description: 'Toggle this shortcuts panel' },
        { keys: ['Ctrl', '\\'], description: 'Toggle sidebar' },
      ]
    },
    {
      category: 'Messaging',
      items: [
        { keys: ['Enter'], description: 'Send message' },
        { keys: ['Shift', 'Enter'], description: 'New line in message' },
        { keys: ['Ctrl', 'L'], description: 'Clear conversation' },
      ]
    },
    {
      category: 'Agents',
      items: [
        { keys: ['Ctrl', '1'], description: 'Switch to Quantum agent' },
        { keys: ['Ctrl', '2'], description: 'Switch to Architect agent' },
        { keys: ['Ctrl', '3'], description: 'Switch to Engineer agent' },
        { keys: ['Ctrl', '4'], description: 'Switch to Reviewer agent' },
        { keys: ['Ctrl', '5'], description: 'Switch to Debugger agent' },
      ]
    },
    {
      category: 'View',
      items: [
        { keys: ['Ctrl', 'M'], description: 'Toggle consciousness metrics' },
        { keys: ['Ctrl', 'B'], description: 'Cycle quantum backends' },
        { keys: ['Ctrl', '/'], description: 'Focus message input' },
      ]
    }
  ]

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl border border-white/20 shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-auto animate-in slide-in-from-bottom-8 duration-500">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-white/10 p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                <Keyboard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Keyboard Shortcuts</h2>
                <p className="text-sm text-white/60">Master dna::{'{'}{'}'}{'}'}::lang with these shortcuts</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors group"
            >
              <X className="w-6 h-6 text-white/60 group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>

        {/* Shortcuts Grid */}
        <div className="p-6 space-y-8">
          {shortcuts.map((section, index) => (
            <div
              key={section.category}
              className="animate-in fade-in slide-in-from-left-4 duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="text-lg font-semibold text-white/90 mb-4 flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-blue-400" />
                {section.category}
              </h3>
              <div className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 group"
                  >
                    <span className="text-white/80 text-sm group-hover:text-white transition-colors">
                      {item.description}
                    </span>
                    <div className="flex items-center gap-1">
                      {item.keys.map((key, keyIndex) => (
                        <span key={keyIndex} className="flex items-center gap-1">
                          <kbd className="px-3 py-1.5 bg-gradient-to-br from-white/20 to-white/10 border border-white/30 rounded-lg text-white font-mono text-xs shadow-lg group-hover:from-white/30 group-hover:to-white/20 transition-all">
                            {key}
                          </kbd>
                          {keyIndex < item.keys.length - 1 && (
                            <span className="text-white/40 text-xs">+</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gradient-to-t from-gray-900 to-transparent border-t border-white/10 p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between text-sm">
            <div className="text-white/60">
              Press <kbd className="px-2 py-1 bg-white/10 rounded border border-white/20 font-mono text-xs">Esc</kbd> or <kbd className="px-2 py-1 bg-white/10 rounded border border-white/20 font-mono text-xs">Ctrl+K</kbd> to close
            </div>
            <div className="text-white/40">
              ΛΦ = 2.176435×10⁻⁸ s⁻¹
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
