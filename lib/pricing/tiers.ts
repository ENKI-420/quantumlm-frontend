/**
 * Pricing Tiers and Limits for dna::}{::lang Platform
 * ΛΦ = 2.176435×10⁻⁸ s⁻¹
 */

export type SubscriptionTier = 'free' | 'pro' | 'enterprise'

export interface PricingTier {
  name: string
  tier: SubscriptionTier
  price: {
    monthly: number
    annual: number
  }
  limits: {
    quantumExecutions: number // per month
    cloudDeployments: number // per month
    refinementCycles: number // per month
    maxQubits: number
    backends: string[]
    autoAdvancement: boolean
    recursiveDepth: number
    support: 'community' | 'email' | 'priority' | 'dedicated'
    analytics: boolean
    apiAccess: boolean
    customIntegrations: boolean
  }
  features: string[]
  popular?: boolean
}

export const PRICING_TIERS: Record<SubscriptionTier, PricingTier> = {
  free: {
    name: 'Free',
    tier: 'free',
    price: {
      monthly: 0,
      annual: 0
    },
    limits: {
      quantumExecutions: 100, // 100 quantum executions per month
      cloudDeployments: 2, // 2 deployments per month
      refinementCycles: 50, // 50 refinement cycles per month
      maxQubits: 5, // Max 5 qubits
      backends: ['simulator'], // Simulator only
      autoAdvancement: false, // No auto-advancement
      recursiveDepth: 3, // Max depth 3
      support: 'community',
      analytics: false,
      apiAccess: false,
      customIntegrations: false
    },
    features: [
      '100 quantum executions/month',
      '2 cloud deployments/month',
      '50 refinement cycles/month',
      'Up to 5 qubits',
      'Simulator access only',
      'Manual advancement',
      'Recursive depth: 3',
      'Community support',
      '5 specialized AI agents',
      'Consciousness metrics (Φ, Γ, Λ, W₂)',
      'Basic UI/UX'
    ]
  },

  pro: {
    name: 'Pro',
    tier: 'pro',
    price: {
      monthly: 99,
      annual: 990 // 2 months free
    },
    limits: {
      quantumExecutions: 10000, // 10k quantum executions per month
      cloudDeployments: 100, // 100 deployments per month
      refinementCycles: 5000, // 5k refinement cycles per month
      maxQubits: 127, // Up to 127 qubits
      backends: ['ibm_torino', 'ibm_marrakesh', 'ibm_fez', 'simulator'], // Real quantum hardware
      autoAdvancement: true, // Auto-advancement enabled
      recursiveDepth: 10, // Max depth 10
      support: 'email',
      analytics: true,
      apiAccess: true,
      customIntegrations: false
    },
    features: [
      '10,000 quantum executions/month',
      '100 cloud deployments/month',
      '5,000 refinement cycles/month',
      'Up to 127 qubits',
      'Real IBM Quantum hardware access',
      'Auto-advancement (continuous improvement)',
      'Recursive depth: 10',
      'Email support (24h response)',
      'Advanced analytics dashboard',
      'REST API access',
      'VQE & QAOA algorithms',
      'Multi-backend execution',
      'ΛΦ-preserving transpilation',
      'Priority queue access',
      'Export organism snapshots'
    ],
    popular: true
  },

  enterprise: {
    name: 'Enterprise',
    tier: 'enterprise',
    price: {
      monthly: 999,
      annual: 9990 // 2 months free
    },
    limits: {
      quantumExecutions: -1, // Unlimited
      cloudDeployments: -1, // Unlimited
      refinementCycles: -1, // Unlimited
      maxQubits: 156, // Up to 156 qubits
      backends: ['ibm_torino', 'ibm_marrakesh', 'ibm_fez', 'ibm_kyoto', 'ibm_osaka', 'simulator'], // All backends
      autoAdvancement: true,
      recursiveDepth: -1, // Unlimited depth
      support: 'dedicated',
      analytics: true,
      apiAccess: true,
      customIntegrations: true
    },
    features: [
      'Unlimited quantum executions',
      'Unlimited cloud deployments',
      'Unlimited refinement cycles',
      'Up to 156 qubits',
      'All IBM Quantum backends',
      'Priority hardware access',
      'Auto-advancement (aggressive)',
      'Unlimited recursive depth',
      'Dedicated support engineer',
      'Custom integrations',
      'White-label options',
      'SLA guarantee (99.9% uptime)',
      'Advanced security features',
      'Custom quantum algorithms',
      'Bulk organism deployment',
      'Multi-tenant management',
      'Custom pricing for volume',
      'Dedicated Slack channel'
    ]
  }
}

/**
 * Check if user has exceeded usage limits
 */
export function checkUsageLimit(
  tier: SubscriptionTier,
  usageType: keyof PricingTier['limits'],
  currentUsage: number
): {
  allowed: boolean
  limit: number
  remaining: number
  exceeded: boolean
} {
  const tierConfig = PRICING_TIERS[tier]
  const limit = tierConfig.limits[usageType] as number

  // -1 means unlimited
  if (limit === -1) {
    return {
      allowed: true,
      limit: -1,
      remaining: -1,
      exceeded: false
    }
  }

  const remaining = Math.max(0, limit - currentUsage)
  const exceeded = currentUsage >= limit

  return {
    allowed: !exceeded,
    limit,
    remaining,
    exceeded
  }
}

/**
 * Get user's current tier configuration
 */
export function getTierConfig(tier: SubscriptionTier): PricingTier {
  return PRICING_TIERS[tier]
}

/**
 * Check if feature is available for tier
 */
export function hasFeature(tier: SubscriptionTier, feature: keyof PricingTier['limits']): boolean {
  const config = PRICING_TIERS[tier]
  const value = config.limits[feature]

  if (typeof value === 'boolean') {
    return value
  }

  if (typeof value === 'number') {
    return value !== 0
  }

  if (Array.isArray(value)) {
    return value.length > 0
  }

  return Boolean(value)
}

/**
 * Format price for display
 */
export function formatPrice(amount: number, interval: 'monthly' | 'annual'): string {
  if (amount === 0) {
    return 'Free'
  }

  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  }).format(amount)

  return `${formatted}/${interval === 'monthly' ? 'mo' : 'yr'}`
}

/**
 * Calculate savings for annual billing
 */
export function calculateAnnualSavings(tier: SubscriptionTier): number {
  const config = PRICING_TIERS[tier]
  const monthlyTotal = config.price.monthly * 12
  const annualPrice = config.price.annual
  return monthlyTotal - annualPrice
}
