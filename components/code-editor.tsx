'use client'

import { useEffect, useRef, useState } from 'react'
import Editor, { Monaco } from '@monaco-editor/react'
import { Download, Copy, Check } from 'lucide-react'

interface CodeEditorProps {
  code: string
  language: string
  onChange?: (value: string) => void
  readOnly?: boolean
  height?: string
  filename?: string
}

export function CodeEditor({
  code,
  language,
  onChange,
  readOnly = false,
  height = '400px',
  filename
}: CodeEditorProps) {
  const [copied, setCopied] = useState(false)
  const editorRef = useRef<any>(null)

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor

    // Configure Monaco theme
    monaco.editor.defineTheme('dnalang-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
        { token: 'keyword', foreground: '569CD6' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'number', foreground: 'B5CEA8' },
        { token: 'type', foreground: '4EC9B0' },
        { token: 'function', foreground: 'DCDCAA' },
      ],
      colors: {
        'editor.background': '#0a0a0a',
        'editor.foreground': '#d4d4d4',
        'editor.lineHighlightBackground': '#ffffff0a',
        'editor.selectionBackground': '#264f78',
        'editorCursor.foreground': '#ffffff',
        'editorWhitespace.foreground': '#ffffff1a',
      }
    })

    monaco.editor.setTheme('dnalang-dark')
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const extension = getFileExtension(language)
    const name = filename || `code.${extension}`
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = name
    a.click()
    URL.revokeObjectURL(url)
  }

  const getFileExtension = (lang: string): string => {
    const extensions: Record<string, string> = {
      javascript: 'js',
      typescript: 'ts',
      python: 'py',
      java: 'java',
      cpp: 'cpp',
      c: 'c',
      rust: 'rs',
      go: 'go',
      html: 'html',
      css: 'css',
      json: 'json',
      yaml: 'yml',
      markdown: 'md',
    }
    return extensions[lang] || 'txt'
  }

  return (
    <div className="relative border border-white/20 rounded-lg overflow-hidden bg-black/60">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-black/40 border-b border-white/10">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-white/60">
            {filename || `code.${getFileExtension(language)}`}
          </span>
          <span className="text-xs font-mono text-white/40">
            {language.toUpperCase()}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded hover:bg-white/10 transition-colors"
            title="Copy code"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4 text-white/60" />
            )}
          </button>

          <button
            onClick={handleDownload}
            className="p-1.5 rounded hover:bg-white/10 transition-colors"
            title="Download file"
          >
            <Download className="w-4 h-4 text-white/60" />
          </button>
        </div>
      </div>

      {/* Editor */}
      <Editor
        height={height}
        language={language}
        value={code}
        onChange={(value) => onChange?.(value || '')}
        onMount={handleEditorDidMount}
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 13,
          lineNumbers: 'on',
          renderWhitespace: 'selection',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
          folding: true,
          lineDecorationsWidth: 10,
          lineNumbersMinChars: 3,
          glyphMargin: false,
          scrollbar: {
            vertical: 'auto',
            horizontal: 'auto',
            verticalScrollbarSize: 10,
            horizontalScrollbarSize: 10,
          },
        }}
        loading={
          <div className="flex items-center justify-center h-full bg-black/60">
            <span className="text-white/60 font-mono text-sm">Loading editor...</span>
          </div>
        }
      />
    </div>
  )
}
