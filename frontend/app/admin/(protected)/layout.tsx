'use client'

import {
  useEffect,
  useState,
} from 'react'
import {
  usePathname,
  useRouter,
} from 'next/navigation'
import Link from 'next/link'
import {
  getToken,
  removeToken,
} from '@/lib/auth'
import { getMe } from '@/lib/admin-api'

const NAV_LINKS = [
  {
    href: '/admin/events',
    label: 'Events',
  },
  {
    href: '/admin/announcements',
    label: 'ISR Updates',
  },
]

export default function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()

  const [ready, setReady] =
    useState(false)

  useEffect(() => {
    let active = true

    const token = getToken()

    if (!token) {
      router.replace('/admin/login')
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

        if (active) {
          router.replace(
            '/admin/login',
          )
        }
      })

    return () => {
      active = false
    }
  }, [router])

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-isr-cream">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-isr-dark-red border-t-transparent" />
      </div>
    )
  }

  function handleLogout() {
    removeToken()
    router.replace('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-isr-dark-red shadow-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-14 items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <span className="text-sm font-bold tracking-wide text-isr-cream">
                ISR Admin
              </span>

              <div className="flex gap-1">
                {NAV_LINKS.map(
                  ({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                        pathname.startsWith(
                          href,
                        )
                          ? 'bg-white/15 text-white'
                          : 'text-isr-cream/70 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {label}
                    </Link>
                  ),
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="text-sm text-isr-cream/70 transition hover:text-white"
            >
              Log out
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}
