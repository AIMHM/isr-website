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
    label: 'What’s On',
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
    if (!menuOpen) {
      return
    }

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
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow =
        ''

      return
    }

    document.body.style.overflow =
      'hidden'

    return () => {
      document.body.style.overflow =
        ''
    }
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-50 border-b border-isr-light-blue/20 bg-white/95 backdrop-blur-md">
      <div className="container-isr mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          aria-label="Islamic Society of RMIT home"
          className="flex shrink-0 items-center gap-3 rounded-xl"
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
                  key={link.href}
                  href={link.href}
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
                  {link.label}
                </Link>
              )
            },
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/find"
            aria-label="Search ISR"
            className="hidden min-h-11 items-center justify-center rounded-full border border-isr-light-blue/35 px-4 text-sm font-bold text-isr-dark-red transition hover:border-isr-turquoise hover:text-isr-turquoise sm:inline-flex"
          >
            Search
          </Link>

          <Link
            href="/join"
            aria-current={
              isActive(
                pathname,
                '/join',
              )
                ? 'page'
                : undefined
            }
            className={`hidden rounded-full px-5 py-2.5 text-sm font-bold transition sm:inline-flex ${
              isActive(
                pathname,
                '/join',
              )
                ? 'bg-isr-turquoise text-white'
                : 'bg-isr-dark-red text-white hover:bg-isr-turquoise'
            }`}
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
            aria-expanded={menuOpen}
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
        <>
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() =>
              setMenuOpen(false)
            }
            className="fixed inset-0 top-[69px] z-[-1] bg-black/20 xl:hidden"
          />

          <div
            id="mobile-navigation"
            className="max-h-[calc(100vh-69px)] overflow-y-auto border-t border-isr-light-blue/20 bg-white px-4 pb-6 pt-3 shadow-lg xl:hidden"
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
                        key={link.href}
                        href={link.href}
                        aria-current={
                          active
                            ? 'page'
                            : undefined
                        }
                        className={`rounded-xl px-4 py-3 text-base font-semibold sm:text-sm ${
                          active
                            ? 'bg-isr-turquoise/10 text-isr-dark-red'
                            : 'text-gray-700 hover:bg-isr-cream'
                        }`}
                      >
                        {link.label}
                      </Link>
                    )
                  },
                )}
              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <Link
                  href="/updates"
                  className="rounded-xl border border-isr-light-blue/30 px-4 py-3 text-center font-bold text-isr-dark-red"
                >
                  ISR Updates
                </Link>

                <Link
                  href="/join"
                  className="rounded-xl bg-isr-dark-red px-5 py-3 text-center font-bold text-white"
                >
                  Join ISR
                </Link>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  )
}
