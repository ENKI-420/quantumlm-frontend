/**
 * Supabase Client Configuration
 * Multi-user authentication and database access
 */

import { createClient } from '@supabase/supabase-js'

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          subscription_tier: 'free' | 'pro' | 'enterprise'
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['users']['Insert']>
      }
      user_credentials: {
        Row: {
          id: string
          user_id: string
          ibm_quantum_token: string | null
          ibm_quantum_channel: string
          ibm_cloud_api_key: string | null
          ibm_cloud_region: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['user_credentials']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['user_credentials']['Insert']>
      }
      user_usage: {
        Row: {
          id: string
          user_id: string
          month: string
          quantum_executions: number
          cloud_deployments: number
          refinement_cycles: number
          total_improvements: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['user_usage']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['user_usage']['Insert']>
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          tier: 'free' | 'pro' | 'enterprise'
          status: 'active' | 'cancelled' | 'expired'
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          current_period_end: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['subscriptions']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['subscriptions']['Insert']>
      }
    }
  }
}

// Get Supabase URL and key with fallbacks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

// Client-side Supabase client (optional - only if env vars are set)
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : null

// Server-side Supabase client
export async function createServerClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null
  }

  const { cookies } = await import('next/headers')
  const { createServerClient: createSupabaseServerClient } = await import('@supabase/ssr')
  const cookieStore = await cookies()

  return createSupabaseServerClient<Database>(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Server component
          }
        },
      },
    }
  )
}

// Service role client (admin operations) - optional
export const supabaseAdmin = supabaseUrl && supabaseServiceRoleKey
  ? createClient<Database>(
      supabaseUrl,
      supabaseServiceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )
  : null
