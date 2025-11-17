/**
 * Usage Tracking Middleware
 * Tracks and enforces usage limits for multi-user platform
 */

import { supabaseAdmin } from '../supabase/client'
import { checkUsageLimit, type SubscriptionTier } from '../pricing/tiers'

export interface UsageTrackingResult {
  allowed: boolean
  reason?: string
  remaining?: number
  limit?: number
}

/**
 * Track and check quantum execution usage
 */
export async function trackQuantumExecution(userId: string): Promise<UsageTrackingResult> {
  try {
    // Get user's subscription tier
    const { data: subscription } = await supabaseAdmin
      .from('subscriptions')
      .select('tier, status')
      .eq('user_id', userId)
      .single()

    if (!subscription || subscription.status !== 'active') {
      return {
        allowed: false,
        reason: 'No active subscription found'
      }
    }

    const tier = subscription.tier as SubscriptionTier

    // Get current month usage
    const currentMonth = new Date().toISOString().slice(0, 7)
    const { data: usage } = await supabaseAdmin
      .from('user_usage')
      .select('quantum_executions')
      .eq('user_id', userId)
      .eq('month', currentMonth)
      .single()

    const currentUsage = usage?.quantum_executions || 0

    // Check limits
    const limitCheck = checkUsageLimit(tier, 'quantumExecutions', currentUsage)

    if (!limitCheck.allowed) {
      return {
        allowed: false,
        reason: `Monthly quantum execution limit exceeded (${limitCheck.limit} executions)`,
        remaining: 0,
        limit: limitCheck.limit
      }
    }

    // Increment usage
    if (usage) {
      await supabaseAdmin
        .from('user_usage')
        .update({ quantum_executions: currentUsage + 1 })
        .eq('user_id', userId)
        .eq('month', currentMonth)
    } else {
      await supabaseAdmin
        .from('user_usage')
        .insert({
          user_id: userId,
          month: currentMonth,
          quantum_executions: 1,
          cloud_deployments: 0,
          refinement_cycles: 0,
          total_improvements: 0
        })
    }

    return {
      allowed: true,
      remaining: limitCheck.remaining - 1,
      limit: limitCheck.limit
    }
  } catch (error) {
    console.error('Usage tracking error:', error)
    return {
      allowed: false,
      reason: 'Usage tracking failed'
    }
  }
}

/**
 * Track cloud deployment usage
 */
export async function trackCloudDeployment(userId: string): Promise<UsageTrackingResult> {
  try {
    const { data: subscription } = await supabaseAdmin
      .from('subscriptions')
      .select('tier, status')
      .eq('user_id', userId)
      .single()

    if (!subscription || subscription.status !== 'active') {
      return {
        allowed: false,
        reason: 'No active subscription found'
      }
    }

    const tier = subscription.tier as SubscriptionTier
    const currentMonth = new Date().toISOString().slice(0, 7)

    const { data: usage } = await supabaseAdmin
      .from('user_usage')
      .select('cloud_deployments')
      .eq('user_id', userId)
      .eq('month', currentMonth)
      .single()

    const currentUsage = usage?.cloud_deployments || 0
    const limitCheck = checkUsageLimit(tier, 'cloudDeployments', currentUsage)

    if (!limitCheck.allowed) {
      return {
        allowed: false,
        reason: `Monthly cloud deployment limit exceeded (${limitCheck.limit} deployments)`,
        remaining: 0,
        limit: limitCheck.limit
      }
    }

    if (usage) {
      await supabaseAdmin
        .from('user_usage')
        .update({ cloud_deployments: currentUsage + 1 })
        .eq('user_id', userId)
        .eq('month', currentMonth)
    } else {
      await supabaseAdmin
        .from('user_usage')
        .insert({
          user_id: userId,
          month: currentMonth,
          quantum_executions: 0,
          cloud_deployments: 1,
          refinement_cycles: 0,
          total_improvements: 0
        })
    }

    return {
      allowed: true,
      remaining: limitCheck.remaining - 1,
      limit: limitCheck.limit
    }
  } catch (error) {
    console.error('Cloud deployment tracking error:', error)
    return {
      allowed: false,
      reason: 'Usage tracking failed'
    }
  }
}

/**
 * Track refinement cycle usage
 */
export async function trackRefinementCycle(userId: string, improvements: number = 0): Promise<UsageTrackingResult> {
  try {
    const { data: subscription } = await supabaseAdmin
      .from('subscriptions')
      .select('tier, status')
      .eq('user_id', userId)
      .single()

    if (!subscription || subscription.status !== 'active') {
      return {
        allowed: false,
        reason: 'No active subscription found'
      }
    }

    const tier = subscription.tier as SubscriptionTier
    const currentMonth = new Date().toISOString().slice(0, 7)

    const { data: usage } = await supabaseAdmin
      .from('user_usage')
      .select('refinement_cycles, total_improvements')
      .eq('user_id', userId)
      .eq('month', currentMonth)
      .single()

    const currentUsage = usage?.refinement_cycles || 0
    const limitCheck = checkUsageLimit(tier, 'refinementCycles', currentUsage)

    if (!limitCheck.allowed) {
      return {
        allowed: false,
        reason: `Monthly refinement cycle limit exceeded (${limitCheck.limit} cycles)`,
        remaining: 0,
        limit: limitCheck.limit
      }
    }

    if (usage) {
      await supabaseAdmin
        .from('user_usage')
        .update({
          refinement_cycles: currentUsage + 1,
          total_improvements: (usage.total_improvements || 0) + improvements
        })
        .eq('user_id', userId)
        .eq('month', currentMonth)
    } else {
      await supabaseAdmin
        .from('user_usage')
        .insert({
          user_id: userId,
          month: currentMonth,
          quantum_executions: 0,
          cloud_deployments: 0,
          refinement_cycles: 1,
          total_improvements: improvements
        })
    }

    return {
      allowed: true,
      remaining: limitCheck.remaining - 1,
      limit: limitCheck.limit
    }
  } catch (error) {
    console.error('Refinement cycle tracking error:', error)
    return {
      allowed: false,
      reason: 'Usage tracking failed'
    }
  }
}

/**
 * Get user's current usage stats
 */
export async function getUserUsage(userId: string): Promise<{
  quantum_executions: number
  cloud_deployments: number
  refinement_cycles: number
  total_improvements: number
}> {
  const currentMonth = new Date().toISOString().slice(0, 7)

  const { data: usage } = await supabaseAdmin
    .from('user_usage')
    .select('*')
    .eq('user_id', userId)
    .eq('month', currentMonth)
    .single()

  return {
    quantum_executions: usage?.quantum_executions || 0,
    cloud_deployments: usage?.cloud_deployments || 0,
    refinement_cycles: usage?.refinement_cycles || 0,
    total_improvements: usage?.total_improvements || 0
  }
}

/**
 * Get user credentials
 */
export async function getUserCredentials(userId: string) {
  const { data: credentials } = await supabaseAdmin
    .from('user_credentials')
    .select('*')
    .eq('user_id', userId)
    .single()

  return credentials
}
