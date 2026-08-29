'use client'


import AdminUtilityBar from '@/components/admin/AdminUtilityBar'
import {
  useEffect,
  useState,
} from 'react'
import Link from 'next/link'
import {
  usePathname,
  useRouter,
} from 'next/navigation'
import {
  getToken,
  removeToken,
} from '@/lib/auth'
import {
  getMe,
} from '@/lib/admin-api'
import {
  IS_LOCAL_ADMIN_MODE,
} from '@/lib/localAdminMode'

const NAV_LINKS = [
  {
    href:
      '/admin',
    label:
      'Overview',
  },
  {
    href:
      '/admin/events',
    label:
      'Events',
  },
  {
    href:
      '/admin/programs',
    label:
      'Programs',
  },
  {
    href:
      '/admin/announcements',
    label:
      'ISR Updates',
  },
  {
    href:
      '/admin/prayer',
    label:
      'Prayer',
  },
  {
    href:
      '/admin/content-health',
    label:
      'Content Health',
  },
]

export default function AdminProtectedLayout({
  children,
}: {
  children:
    React.ReactNode
}) {
  const router =
    useRouter()

  const pathname =
    usePathname()

  const [
    ready,
    setReady,
  ] =
    useState(false)

  useEffect(() => {
    let active =
      true

    const token =
      getToken()

    if (!token) {
      router.replace(
        '/admin/login',
      )
      return
    }

    getMe(token)
      .then(() => {
        if (active) {
          setReady(true)
        }
      })
      .catch(() => {
        removeToken()

        router.replace(
          '/admin/login',
        )
      })

    return () => {
      active = false
    }
  }, [router])

  function handleLogout() {
    removeToken()

    router.replace(
      '/admin/login',
    )
  }

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-isr-cream">
        <div className="text-center">
          <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-isr-dark-red border-t-transparent" />

          <p className="mt-4 text-sm font-semibold text-isr-dark-red">
            Checking admin session…
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-white/10 bg-isr-dark-red text-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/admin"
                className="text-lg font-bold"
              >
                ISR Admin
              </Link>

              {IS_LOCAL_ADMIN_MODE && (
                <span className="rounded-full bg-isr-yellow px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-isr-dark-red">
                  Local sandbox
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/"
                target="_blank"
                className="rounded-lg border border-white/20 px-3 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white" rel="noopener noreferrer">
                View website ↗
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg border border-white/20 px-3 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                Log out
              </button>
            </div>
          </div>

          <nav
            aria-label="Admin navigation"
            className="mt-4 flex gap-2 overflow-x-auto pb-1"
          >
            {NAV_LINKS.map(
              (link) => {
                const active =
                  link.href === '/admin'
                    ? pathname === '/admin'
                    : pathname.startsWith(
                        link.href,
                      )

                return (
                  <Link
                    key={
                      link.href
                    }
                    href={
                      link.href
                    }
                    aria-current={
                      active
                        ? 'page'
                        : undefined
                    }
                    className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-bold transition ${
                      active
                        ? 'bg-white text-isr-dark-red'
                        : 'bg-white/10 text-white/80 hover:bg-white/15 hover:text-white'
                    }`}
                  >
                    {
                      link.label
                    }
                  </Link>
                )
              },
            )}
          </nav>
        </div>
      </header>

      <AdminUtilityBar />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {children}
      </main>
    </div>
  )
}
