"use client"

import { useState } from 'react'
import { useAuth } from '@/lib/context/authContext'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {  Eye, EyeOff, Mail, Lock, User } from 'lucide-react'
import { toast } from 'sonner'

interface AuthFlowProps {
  onClose: () => void
  defaultTab?: 'signin' | 'signup'
}

export default function AuthFlow({ onClose, defaultTab = 'signin' }: AuthFlowProps) {
  const { signIn, signUp } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Sign In State
  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  // Sign Up State
  const [signUpData, setSignUpData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: ''
  })
  const [agreeToTerms, setAgreeToTerms] = useState(false)

  // Forgot Password State
  const [resetEmail, setResetEmail] = useState('')

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await signIn(signInEmail, signInPassword)
      toast.success('Successfully signed in!', {
        description: 'Welcome back!',
        duration: 3000
      })
      onClose()
      setSignInEmail('')
      setSignInPassword('')
      setShowPassword(false)
    } catch {
      toast.error('Sign in failed', { description: 'Please check your credentials.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (signUpData.password !== signUpData.confirmPassword) {
      toast.error('Passwords do not match', { duration: 3000 })
      return
    }
    if (!agreeToTerms) {
      toast.error('Please accept the terms', { duration: 3000 })
      return
    }
    setIsLoading(true)
    try {
      await signUp(signUpData)
      toast.success('Account created!', { duration: 4000 })
      onClose()
      setSignUpData({ firstName: '', lastName: '', email: '', phone: '', dateOfBirth: '', password: '', confirmPassword: '' })
      setAgreeToTerms(false)
      setShowPassword(false)
    } catch {
      toast.error('Sign up failed', { description: 'Please try again later' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast.success('Password reset email sent!', { duration: 3000 })
      setShowForgotPassword(false)
      setResetEmail('')
    }, 1000)
  }

  return (
    <div className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto p-4">
      {!showForgotPassword ? (
        <>
          <div className="mb-4">
            <h2 className="text-2xl font-semibold">Welcome</h2>
            <p className="text-gray-600">Sign in or create a new account to book appointments.</p>
          </div>

          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* Sign In */}
            <TabsContent value="signin" className="space-y-4">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="relative">
                  <Label htmlFor="signin-email">Email</Label>
                  <Mail className="absolute left-3 top-9 h-4 w-4 text-gray-400" />
                  <Input id="signin-email" type="email" value={signInEmail} onChange={(e) => setSignInEmail(e.target.value)} className="pl-10" required />
                </div>
                <div className="relative">
                  <Label htmlFor="signin-password">Password</Label>
                  <Lock className="absolute left-3 top-9 h-4 w-4 text-gray-400" />
                  <Input
                    id="signin-password"
                    type={showPassword ? 'text' : 'password'}
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 text-gray-400">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Checkbox checked={rememberMe} onCheckedChange={(checked) => setRememberMe(checked as boolean)} />
                    <span className="text-sm">Remember me</span>
                  </div>
                  <button type="button" className="text-sm text-primary hover:underline" onClick={() => setShowForgotPassword(true)}>Forgot password?</button>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>{isLoading ? 'Signing in...' : 'Sign In'}</Button>
              </form>
            </TabsContent>

            {/* Sign Up */}
            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <Label htmlFor="firstName">First Name</Label>
                    <User className="absolute left-3 top-9 h-4 w-4 text-gray-400" />
                    <Input id="firstName" value={signUpData.firstName} onChange={(e) => setSignUpData({ ...signUpData, firstName: e.target.value })} className="pl-10" required />
                  </div>
                  <div className="relative">
                    <Label htmlFor="lastName">Last Name</Label>
                    <User className="absolute left-3 top-9 h-4 w-4 text-gray-400" />
                    <Input id="lastName" value={signUpData.lastName} onChange={(e) => setSignUpData({ ...signUpData, lastName: e.target.value })} className="pl-10" required />
                  </div>
                </div>
                <div className="relative">
                  <Label htmlFor="signup-email">Email</Label>
                  <Mail className="absolute left-3 top-9 h-4 w-4 text-gray-400" />
                  <Input id="signup-email" type="email" value={signUpData.email} onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })} className="pl-10" required />
                </div>
                {/* phone, dateOfBirth, password, confirmPassword, terms... */}
                <Button type="submit" className="w-full" disabled={isLoading}>{isLoading ? 'Creating account...' : 'Create Account'}</Button>
              </form>
            </TabsContent>
          </Tabs>
        </>
      ) : (
        <form onSubmit={handleForgotPassword} className="space-y-4">
          <div className="relative">
            <Label htmlFor="reset-email">Email</Label>
            <Mail className="absolute left-3 top-9 h-4 w-4 text-gray-400" />
            <Input id="reset-email" type="email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} className="pl-10" required />
          </div>
          <div className="flex gap-3">
            <Button type="button" variant="outlined" className="flex-1" onClick={() => setShowForgotPassword(false)}>Back to Sign In</Button>
            <Button type="submit" className="flex-1" disabled={isLoading}>{isLoading ? 'Sending...' : 'Send Reset Link'}</Button>
          </div>
        </form>
      )}
    </div>
  )
}