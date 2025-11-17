'use client'

/**
 * User Settings Page
 * Manage IBM Quantum & Cloud credentials, view usage, and subscription
 */

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { Brain, Cloud, Key, CreditCard, Activity, Zap, Save, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import { PRICING_TIERS, type SubscriptionTier } from '@/lib/pricing/tiers'

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // IBM Credentials
  const [ibmQuantumToken, setIbmQuantumToken] = useState('')
  const [ibmQuantumChannel, setIbmQuantumChannel] = useState('ibm_quantum')
  const [ibmCloudApiKey, setIbmCloudApiKey] = useState('')
  const [ibmCloudRegion, setIbmCloudRegion] = useState('us-south')
  const [showQuantumToken, setShowQuantumToken] = useState(false)
  const [showCloudKey, setShowCloudKey] = useState(false)

  // User data
  const [subscription, setSubscription] = useState<any>(null)
  const [usage, setUsage] = useState<any>(null)
  const [credentials, setCredentials] = useState<any>(null)

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        window.location.href = '/login'
        return
      }

      setUser(user)

      // Load user profile
      const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      // Load subscription
      const { data: sub } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .single()

      setSubscription(sub)

      // Load credentials
      const { data: creds } = await supabase
        .from('user_credentials')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (creds) {
        setCredentials(creds)
        setIbmQuantumToken(creds.ibm_quantum_token || '')
        setIbmQuantumChannel(creds.ibm_quantum_channel || 'ibm_quantum')
        setIbmCloudApiKey(creds.ibm_cloud_api_key || '')
        setIbmCloudRegion(creds.ibm_cloud_region || 'us-south')
      }

      // Load current month usage
      const currentMonth = new Date().toISOString().slice(0, 7) // YYYY-MM
      const { data: usageData } = await supabase
        .from('user_usage')
        .select('*')
        .eq('user_id', user.id)
        .eq('month', currentMonth)
        .single()

      setUsage(usageData)

    } catch (error) {
      console.error('Error loading user data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveCredentials = async () => {
    if (!user) return

    setIsSaving(true)
    setSaveSuccess(false)

    try {
      if (credentials) {
        // Update existing credentials
        const { error } = await supabase
          .from('user_credentials')
          .update({
            ibm_quantum_token: ibmQuantumToken || null,
            ibm_quantum_channel: ibmQuantumChannel,
            ibm_cloud_api_key: ibmCloudApiKey || null,
            ibm_cloud_region: ibmCloudRegion
          })
          .eq('user_id', user.id)

        if (error) throw error
      } else {
        // Insert new credentials
        const { error } = await supabase
          .from('user_credentials')
          .insert({
            user_id: user.id,
            ibm_quantum_token: ibmQuantumToken || null,
            ibm_quantum_channel: ibmQuantumChannel,
            ibm_cloud_api_key: ibmCloudApiKey || null,
            ibm_cloud_region: ibmCloudRegion
          })

        if (error) throw error
      }

      setSaveSuccess(true)
      await loadUserData()

      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (error) {
      console.error('Error saving credentials:', error)
      alert('Failed to save credentials. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <Spinner className="w-12 h-12 text-blue-400" />
      </div>
    )
  }

  const tier = subscription?.tier || 'free'
  const tierConfig = PRICING_TIERS[tier as SubscriptionTier]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-gray-400">Manage your IBM credentials, subscription, and usage</p>
        </div>

        {/* Subscription Card */}
        <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-semibold">Subscription</h2>
            </div>
            <Badge className={
              tier === 'enterprise' ? 'bg-purple-600' :
              tier === 'pro' ? 'bg-blue-600' :
              'bg-gray-600'
            }>
              {tierConfig.name}
            </Badge>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Price</span>
              <span className="text-white font-mono font-bold">
                ${tierConfig.price.monthly}/month
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Status</span>
              <Badge className={subscription?.status === 'active' ? 'bg-green-600' : 'bg-red-600'}>
                {subscription?.status || 'active'}
              </Badge>
            </div>
            {tier === 'free' && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500">
                  Upgrade to Pro
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* Usage Card */}
        <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-6 h-6 text-green-400" />
            <h2 className="text-xl font-semibold">Current Month Usage</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Quantum Executions</span>
                <span className="text-white font-mono">
                  {usage?.quantum_executions || 0} / {tierConfig.limits.quantumExecutions === -1 ? '∞' : tierConfig.limits.quantumExecutions}
                </span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-cyan-600"
                  style={{
                    width: tierConfig.limits.quantumExecutions === -1 ? '100%' :
                      `${Math.min(((usage?.quantum_executions || 0) / tierConfig.limits.quantumExecutions) * 100, 100)}%`
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Cloud Deployments</span>
                <span className="text-white font-mono">
                  {usage?.cloud_deployments || 0} / {tierConfig.limits.cloudDeployments === -1 ? '∞' : tierConfig.limits.cloudDeployments}
                </span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-600 to-emerald-600"
                  style={{
                    width: tierConfig.limits.cloudDeployments === -1 ? '100%' :
                      `${Math.min(((usage?.cloud_deployments || 0) / tierConfig.limits.cloudDeployments) * 100, 100)}%`
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Refinement Cycles</span>
                <span className="text-white font-mono">
                  {usage?.refinement_cycles || 0} / {tierConfig.limits.refinementCycles === -1 ? '∞' : tierConfig.limits.refinementCycles}
                </span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
                  style={{
                    width: tierConfig.limits.refinementCycles === -1 ? '100%' :
                      `${Math.min(((usage?.refinement_cycles || 0) / tierConfig.limits.refinementCycles) * 100, 100)}%`
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Total Improvements</span>
                <span className="text-white font-mono">
                  {usage?.total_improvements || 0}
                </span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-600 to-red-600"
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* IBM Quantum Credentials */}
        <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-semibold">IBM Quantum Credentials</h2>
          </div>

          {tier === 'free' && (
            <div className="mb-4 p-3 bg-yellow-900/20 border border-yellow-600/30 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-200">
                <strong>Free tier:</strong> Simulator access only. Upgrade to Pro or Enterprise for real quantum hardware.
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <Label htmlFor="quantum-token" className="text-gray-300">
                IBM Quantum API Token
              </Label>
              <div className="relative mt-1">
                <Input
                  id="quantum-token"
                  type={showQuantumToken ? 'text' : 'password'}
                  value={ibmQuantumToken}
                  onChange={(e) => setIbmQuantumToken(e.target.value)}
                  placeholder="Enter your IBM Quantum API token"
                  className="bg-gray-900/50 border-gray-600 text-white pr-10"
                  disabled={tier === 'free'}
                />
                <button
                  type="button"
                  onClick={() => setShowQuantumToken(!showQuantumToken)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showQuantumToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Get your token from <a href="https://quantum.ibm.com" target="_blank" className="text-blue-400 hover:underline">IBM Quantum Platform</a>
              </p>
            </div>

            <div>
              <Label htmlFor="quantum-channel" className="text-gray-300">
                Channel
              </Label>
              <Input
                id="quantum-channel"
                value={ibmQuantumChannel}
                onChange={(e) => setIbmQuantumChannel(e.target.value)}
                className="bg-gray-900/50 border-gray-600 text-white mt-1"
                disabled={tier === 'free'}
              />
            </div>
          </div>
        </Card>

        {/* IBM Cloud Credentials */}
        <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Cloud className="w-6 h-6 text-green-400" />
            <h2 className="text-xl font-semibold">IBM Cloud Credentials</h2>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="cloud-key" className="text-gray-300">
                IBM Cloud API Key
              </Label>
              <div className="relative mt-1">
                <Input
                  id="cloud-key"
                  type={showCloudKey ? 'text' : 'password'}
                  value={ibmCloudApiKey}
                  onChange={(e) => setIbmCloudApiKey(e.target.value)}
                  placeholder="Enter your IBM Cloud API key"
                  className="bg-gray-900/50 border-gray-600 text-white pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowCloudKey(!showCloudKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showCloudKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Get your API key from <a href="https://cloud.ibm.com" target="_blank" className="text-blue-400 hover:underline">IBM Cloud Console</a>
              </p>
            </div>

            <div>
              <Label htmlFor="cloud-region" className="text-gray-300">
                Region
              </Label>
              <select
                id="cloud-region"
                value={ibmCloudRegion}
                onChange={(e) => setIbmCloudRegion(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white"
              >
                <option value="us-south">us-south (Dallas)</option>
                <option value="us-east">us-east (Washington DC)</option>
                <option value="eu-gb">eu-gb (London)</option>
                <option value="eu-de">eu-de (Frankfurt)</option>
                <option value="jp-tok">jp-tok (Tokyo)</option>
                <option value="au-syd">au-syd (Sydney)</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex items-center gap-4">
          <Button
            onClick={handleSaveCredentials}
            disabled={isSaving}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 py-6"
          >
            {isSaving ? (
              <>
                <Spinner className="w-5 h-5 mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Save Credentials
              </>
            )}
          </Button>

          {saveSuccess && (
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-sm">Saved successfully!</span>
            </div>
          )}
        </div>

        {/* Back to Chat */}
        <div className="text-center">
          <a href="/" className="text-blue-400 hover:text-blue-300 text-sm">
            ← Back to Chat
          </a>
        </div>
      </div>
    </div>
  )
}
