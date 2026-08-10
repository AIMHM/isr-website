'use client'

import {
  useEffect,
  useState,
} from 'react'
import {
  useRouter,
} from 'next/navigation'
import {
  Button,
} from '@/components/ui/button'
import {
  Input,
} from '@/components/ui/input'
import {
  Label,
} from '@/components/ui/label'
import {
  getToken,
  removeToken,
  setToken,
} from '@/lib/auth'
import {
  getMe,
  signIn,
} from '@/lib/admin-api'
import {
  IS_LOCAL_ADMIN_MODE,
} from '@/lib/localAdminMode'

export default function AdminLoginPage() {
  const router =
    useRouter()

  const [
    email,
    setEmail,
  ] =
    useState('')

  const [
    password,
    setPassword,
  ] =
    useState('')

  const [
    error,
    setError,
  ] =
    useState('')

  const [
    loading,
    setLoading,
  ] =
    useState(false)

  const [
    checking,
    setChecking,
  ] =
    useState(true)

  useEffect(() => {
    let active =
      true

    const token =
      getToken()

    if (!token) {
      setChecking(false)
      return
    }

    getMe(token)
      .then(() => {
        if (active) {
          router.replace(
            '/admin/events',
          )
        }
      })
      .catch(() => {
        removeToken()

        if (active) {
          setChecking(false)
        }
      })

    return () => {
      active = false
    }
  }, [router])

  async function handleSubmit(
    event:
      React.FormEvent,
  ) {
    event.preventDefault()

    if (
      !email.trim() ||
      !password
    ) {
      setError(
        'Email and password are required.',
      )
      return
    }

    setLoading(true)
    setError('')

    try {
      const token =
        await signIn(
          email.trim(),
          password,
        )

      setToken(token)

      await getMe(token)

      router.replace(
        '/admin/events',
      )
    } catch (err) {
      removeToken()

      setError(
        err instanceof Error
          ? err.message
          : 'Sign in failed.',
      )
    } finally {
      setLoading(false)
    }
  }

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-isr-cream">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-isr-dark-red border-t-transparent" />
      </div>
    )
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-isr-cream to-white px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border bg-white p-7 shadow-xl sm:p-9">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-isr-turquoise">
            Islamic Society of RMIT
          </p>

          <h1 className="mt-3 text-3xl font-bold text-isr-dark-red">
            ISR Admin
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-gray-600">
            Sign in to manage website events and ISR Updates.
          </p>

          {IS_LOCAL_ADMIN_MODE && (
            <div className="mt-5 rounded-xl border border-isr-yellow bg-isr-yellow/35 px-4 py-3 text-xs font-semibold text-isr-dark-red">
              Local admin sandbox — changes stay in the local development environment.
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <div className="space-y-1.5">
            <Label htmlFor="email">
              Admin email
            </Label>

            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value,
                )
              }
              placeholder="admin@example.com"
              required
              autoComplete="email"
              disabled={loading}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">
              Password
            </Label>

            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value,
                )
              }
              required
              autoComplete="current-password"
              disabled={loading}
            />
          </div>

          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
            >
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-isr-dark-red text-isr-cream hover:bg-isr-dark-red/90"
          >
            {loading
              ? 'Signing in…'
              : 'Sign in'}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs leading-relaxed text-gray-500">
          Admin access is for authorised ISR website administrators.
        </p>
      </div>
    </main>
  )
}
