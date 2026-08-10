'use client'

import {
  useEffect,
  useState,
} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  usePathname,
} from 'next/navigation'

const links = [
  {
    href: '/start',
    label: 'Start Here',
  },
  {
    href: '/pray',
    label: 'Pray at RMIT',
  },
  {
    href: '/events',
    label: 'Events',
  },
  {
    href: '/support',
    label: 'Student Support',
  },
  {
    href: '/about',
    label: 'About ISR',
  },
  {
    href: '/contact',
    label: 'Contact',
  },
]

function isActive(
  pathname: string,
  href: string,
): boolean {
  return (
    pathname === href ||
    pathname.startsWith(
      `${href}/`,
    )
  )
}

export default function Navbar() {
  const pathname =
    usePathname()

  const [
    menuOpen,
    setMenuOpen,
  ] =
    useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    function onKeyDown(
      event: KeyboardEvent,
    ) {
      if (
        event.key ===
        'Escape'
      ) {
        setMenuOpen(false)
      }
    }

    window.addEventListener(
      'keydown',
      onKeyDown,
    )

    return () =>
      window.removeEventListener(
        'keydown',
        onKeyDown,
      )
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-isr-light-blue/20 bg-white/95 backdrop-blur">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[100] focus:rounded-lg focus:bg-isr-dark-red focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <div className="container-isr mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          aria-label="Islamic Society of RMIT home"
          className="flex shrink-0 items-center gap-3"
        >
          <Image
            src="/images/isr_logo_transparent.png"
            alt=""
            width={48}
            height={48}
            priority
            className="h-11 w-11 object-contain"
          />

          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-bold text-isr-dark-red">
              Islamic Society
            </span>

            <span className="block text-xs font-semibold text-isr-turquoise">
              of RMIT
            </span>
          </span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 xl:flex"
        >
          {links.map(
            (link) => {
              const active =
                isActive(
                  pathname,
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
                  className={`rounded-full px-3 py-2 text-sm font-semibold transition ${
                    active
                      ? 'bg-isr-turquoise/10 text-isr-dark-red'
                      : 'text-gray-600 hover:bg-isr-cream hover:text-isr-dark-red'
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

        <div className="flex items-center gap-2">
          <Link
            href="/join"
            className="hidden rounded-full bg-isr-dark-red px-5 py-2.5 text-sm font-bold text-white transition hover:bg-isr-turquoise sm:inline-flex"
          >
            Join ISR
          </Link>

          <button
            type="button"
            aria-label={
              menuOpen
                ? 'Close navigation menu'
                : 'Open navigation menu'
            }
            aria-expanded={
              menuOpen
            }
            aria-controls="mobile-navigation"
            onClick={() =>
              setMenuOpen(
                (open) =>
                  !open,
              )
            }
            className="flex h-11 w-11 items-center justify-center rounded-full border border-isr-light-blue/40 text-isr-dark-red transition hover:bg-isr-cream xl:hidden"
          >
            <span
              aria-hidden="true"
              className="relative block h-5 w-5"
            >
              <span
                className={`absolute left-0 top-1 block h-0.5 w-5 bg-current transition ${
                  menuOpen
                    ? 'translate-y-1.5 rotate-45'
                    : ''
                }`}
              />

              <span
                className={`absolute left-0 top-2.5 block h-0.5 w-5 bg-current transition ${
                  menuOpen
                    ? 'opacity-0'
                    : ''
                }`}
              />

              <span
                className={`absolute left-0 top-4 block h-0.5 w-5 bg-current transition ${
                  menuOpen
                    ? '-translate-y-1.5 -rotate-45'
                    : ''
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-isr-light-blue/20 bg-white px-4 pb-5 pt-3 xl:hidden"
        >
          <nav
            aria-label="Mobile navigation"
            className="container-isr mx-auto max-w-7xl"
          >
            <div className="grid gap-1 sm:grid-cols-2">
              {links.map(
                (link) => {
                  const active =
                    isActive(
                      pathname,
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
                      className={`rounded-xl px-4 py-3 text-sm font-semibold ${
                        active
                          ? 'bg-isr-turquoise/10 text-isr-dark-red'
                          : 'text-gray-700 hover:bg-isr-cream'
                      }`}
                    >
                      {
                        link.label
                      }
                    </Link>
                  )
                },
              )}
            </div>

            <Link
              href="/join"
              className="mt-4 flex w-full justify-center rounded-xl bg-isr-dark-red px-5 py-3 font-bold text-white"
            >
              Join ISR
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
