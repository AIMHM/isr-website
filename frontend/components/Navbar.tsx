'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const navLinks = [
  { href: '/start', label: 'Start Here' },
  { href: '/pray', label: 'Pray at RMIT' },
  { href: '/events', label: 'Events' },
  { href: '/support', label: 'Student Support' },
  { href: '/about', label: 'About ISR' },
  { href: '/contact', label: 'Contact' },
]

function isCurrentPath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [logoFailed, setLogoFailed] = useState(false)

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  return (
    <nav
      aria-label="Primary navigation"
      className="sticky top-0 z-50 px-3 pb-2 pt-3 sm:px-4 sm:pt-4"
    >
      <div className="container-isr mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[1.6rem] border border-isr-light-blue/30 bg-white/95 shadow-[0_10px_35px_rgba(91,11,5,0.10)] backdrop-blur-md">
          <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6">
            <Link
              href="/"
              aria-label="Islamic Society of RMIT home"
              className="flex min-w-0 items-center gap-3"
            >
              {!logoFailed ? (
                <Image
                  src="/images/isr_logo_transparent.png"
                  alt=""
                  width={42}
                  height={42}
                  className="h-10 w-10 shrink-0 object-contain"
                  priority
                  onError={() => setLogoFailed(true)}
                />
              ) : (
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-isr-turquoise text-sm font-bold text-white">
                  ISR
                </span>
              )}

              <span className="hidden truncate text-base font-bold text-isr-dark-red sm:block xl:text-lg">
                Islamic Society of RMIT
              </span>
            </Link>

            <div className="hidden items-center gap-1 xl:flex">
              {navLinks.map((link) => {
                const active = isCurrentPath(pathname, link.href)

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={`rounded-full px-3 py-2 text-sm font-semibold transition-colors ${
                      active
                        ? 'bg-isr-turquoise/15 text-isr-dark-red'
                        : 'text-gray-700 hover:bg-isr-cream hover:text-isr-dark-red'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}

              <Link
                href="/join"
                aria-current={
                  isCurrentPath(pathname, '/join') ? 'page' : undefined
                }
                className="ml-2 rounded-full bg-isr-turquoise px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-isr-dark-red"
              >
                Join ISR
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen((current) => !current)}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-isr-dark-red transition hover:bg-isr-cream xl:hidden"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18 18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {isOpen && (
            <div
              id="mobile-navigation"
              className="border-t border-isr-light-blue/30 px-4 pb-5 pt-3 xl:hidden"
            >
              <div className="grid gap-1 sm:grid-cols-2">
                {navLinks.map((link) => {
                  const active = isCurrentPath(pathname, link.href)

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={active ? 'page' : undefined}
                      className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                        active
                          ? 'bg-isr-turquoise/15 text-isr-dark-red'
                          : 'text-gray-700 hover:bg-isr-cream hover:text-isr-dark-red'
                      }`}
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </div>

              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                <Link
                  href="/updates"
                  className="rounded-full border border-isr-dark-red/20 px-4 py-3 text-center text-sm font-semibold text-isr-dark-red transition hover:bg-isr-cream"
                >
                  ISR Updates
                </Link>

                <Link
                  href="/governance"
                  className="rounded-full border border-isr-dark-red/20 px-4 py-3 text-center text-sm font-semibold text-isr-dark-red transition hover:bg-isr-cream"
                >
                  Policies
                </Link>

                <Link
                  href="/join"
                  className="rounded-full bg-isr-turquoise px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-isr-dark-red"
                >
                  Join ISR
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
