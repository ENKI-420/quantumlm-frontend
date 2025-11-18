'use client'

/**
 * Login / Signup Page
 * User authentication for DNA Lang platform
 */

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { Brain, Mail, Lock, User } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState('')

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      if (isLogin) {
        // Login
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        })

        if (error) throw error

        // Redirect to main app
        window.location.href = '/'
      } else {
        // Signup
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName
            }
          }
        })

        if (error) throw error

        // Show success message
        alert('Account created! Please check your email to verify your account.')
        setIsLogin(true)
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleAuth = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) throw error
    } catch (err: any) {
      setError(err.message || 'Google authentication failed')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-6">
      <Card className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-gray-700 p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-10 h-10 text-blue-400 animate-pulse" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              DNA Lang
            </h1>
          </div>
          <p className="text-gray-400">
            {isLogin ? 'Sign in to your account' : 'Create a new account'}
          </p>
          <p className="text-xs text-gray-500 mt-1 font-mono">ΛΦ = 2.176435×10⁻⁸ s⁻¹</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-900/20 border border-red-600/30 rounded-lg text-red-200 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleAuth} className="space-y-4">
          {!isLogin && (
            <div>
              <Label htmlFor="fullName" className="text-gray-300 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required={!isLogin}
                className="mt-1 bg-gray-900/50 border-gray-600 text-white"
                placeholder="John Doe"
              />
            </div>
          )}

          <div>
            <Label htmlFor="email" className="text-gray-300 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 bg-gray-900/50 border-gray-600 text-white"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-gray-300 flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="mt-1 bg-gray-900/50 border-gray-600 text-white"
              placeholder="••••••••"
            />
            {!isLogin && (
              <p className="text-xs text-gray-500 mt-1">At least 6 characters</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 py-6"
          >
            {isLoading ? (
              <>
                <Spinner className="w-5 h-5 mr-2" />
                {isLogin ? 'Signing in...' : 'Creating account...'}
              </>
            ) : (
              isLogin ? 'Sign In' : 'Create Account'
            )}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-800 text-gray-400">OR</span>
          </div>
        </div>

        {/* Google Sign In */}
        <Button
          type="button"
          onClick={handleGoogleAuth}
          variant="outline"
          className="w-full border-gray-600 hover:bg-gray-800"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </Button>

        {/* Toggle Login/Signup */}
        <div className="mt-6 text-center text-sm">
          <span className="text-gray-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </span>
          {' '}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin)
              setError('')
            }}
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </div>

        {/* Link to pricing */}
        {!isLogin && (
          <div className="mt-4 text-center">
            <a href="/pricing" className="text-xs text-gray-500 hover:text-gray-400">
              View pricing plans →
            </a>
          </div>
        )}
      </Card>
    </div>
  )
}
