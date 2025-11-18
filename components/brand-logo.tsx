/**
 * Brand Logo Component
 * Consistent brand rendering across the platform
 * ΛΦ = 2.176435×10⁻⁸ s⁻¹
 */

import { Brain } from 'lucide-react'
import Link from 'next/link'

interface BrandLogoProps {
  showIcon?: boolean
  className?: string
  iconClassName?: string
}

export function BrandLogo({ showIcon = true, className = '', iconClassName = '' }: BrandLogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`}>
      {showIcon && <Brain className={`w-8 h-8 text-blue-400 animate-pulse ${iconClassName}`} />}
      <span className="text-xl font-bold font-mono">
        dna::<span className="inline-block">{'}'}</span><span className="inline-block">{'{'}</span>::lang
      </span>
    </Link>
  )
}

export function BrandText({ className = '' }: { className?: string }) {
  return (
    <span className={`font-mono ${className}`}>
      dna::<span className="inline-block">{'}'}</span><span className="inline-block">{'{'}</span>::lang
    </span>
  )
}
