'use client'

import {
  useEffect,
  useRef,
  useState,
} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  usePathname,
} from 'next/navigation'

const links = [
  {
    href: '/pray',
    label: 'Pray at RMIT',
  },
  {
    href: '/events',
    label: 'What’s On',
  },
  {
    href: '/campuses',
    label: 'Campuses',
  },
  {
    href: '/student-guide',
    label: 'Student Guide',
  },
  {
    href: '/support',
    label: 'Support',
  },
  {
    href: '/about',
    label: 'About ISR',
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
  const pathname = usePathname()

  const menuButtonRef = useRef<HTMLButtonElement | null>(null)
  const mobileMenuRef = useRef<HTMLDivElement | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        setMenuOpen(false)
        menuButtonRef.current?.focus()
        return
      }

      if (event.key !== 'Tab') return

      const panel = mobileMenuRef.current
      if (!panel) return

      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(
          [
            'a[href]',
            'button:not([disabled])',
            '[tabindex]:not([tabindex="-1"])',
          ].join(','),
        ),
      ).filter((item) => !item.hasAttribute('disabled'))

      if (focusable.length === 0) {
        event.preventDefault()
        panel.focus()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement

      if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
        return
      }

      if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = ''
      return
    }

    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return

    const frame = window.requestAnimationFrame(() => {
      const firstMobileLink =
        mobileMenuRef.current?.querySelector<HTMLAnchorElement>('a')

      firstMobileLink?.focus()
    })

    return () => {
      window.cancelAnimationFrame(frame)
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
          {links.map((link) => {
            const active = isActive(pathname, link.href)

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`rounded-full px-3 py-2 text-sm font-semibold transition ${
                  active
                    ? 'bg-isr-turquoise/10 text-isr-dark-red'
                    : 'text-gray-600 hover:bg-isr-cream hover:text-isr-dark-red'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
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
              isActive(pathname, '/join') ? 'page' : undefined
            }
            className={`hidden rounded-full px-5 py-2.5 text-sm font-bold text-white transition sm:inline-flex ${
              isActive(pathname, '/join')
                ? 'bg-isr-dark-red ring-2 ring-isr-turquoise ring-offset-2'
                : 'bg-isr-dark-red hover:bg-isr-turquoise hover:text-isr-dark-red'
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
            ref={menuButtonRef}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-isr-light-blue/40 text-isr-dark-red transition hover:bg-isr-cream xl:hidden"
          >
            <span
              aria-hidden="true"
              className="relative block h-5 w-5"
            >
              <span
                className={`absolute left-0 top-1 block h-0.5 w-5 bg-current transition ${
                  menuOpen ? 'translate-y-1.5 rotate-45' : ''
                }`}
              />

              <span
                className={`absolute left-0 top-2.5 block h-0.5 w-5 bg-current transition ${
                  menuOpen ? 'opacity-0' : ''
                }`}
              />

              <span
                className={`absolute left-0 top-4 block h-0.5 w-5 bg-current transition ${
                  menuOpen ? '-translate-y-1.5 -rotate-45' : ''
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
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 top-[69px] z-[-1] bg-black/20 xl:hidden"
          />

          <div
            ref={mobileMenuRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            tabIndex={-1}
            className="max-h-[calc(100vh-69px)] overflow-y-auto border-t border-isr-light-blue/20 bg-white px-4 pb-6 pt-3 shadow-lg xl:hidden"
          >
            <nav
              aria-label="Mobile navigation"
              className="container-isr mx-auto max-w-7xl"
            >
              <div className="grid gap-1 sm:grid-cols-2">
                {links.map((link) => {
                  const active = isActive(pathname, link.href)

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={active ? 'page' : undefined}
                      className={`rounded-xl px-4 py-3 text-base font-semibold sm:text-sm ${
                        active
                          ? 'bg-isr-turquoise/10 text-isr-dark-red'
                          : 'text-gray-700 hover:bg-isr-cream'
                      }`}
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <Link
                  href="/find"
                  className="rounded-xl border border-isr-light-blue/30 px-4 py-3 text-center text-sm font-bold text-isr-dark-red"
                >
                  Search ISR
                </Link>

                <Link
                  href="/faq"
                  className="rounded-xl border border-isr-light-blue/30 px-4 py-3 text-center text-sm font-bold text-isr-dark-red"
                >
                  FAQ
                </Link>

                <Link
                  href="/updates"
                  className="rounded-xl border border-isr-light-blue/30 px-4 py-3 text-center text-sm font-bold text-isr-dark-red"
                >
                  ISR Updates
                </Link>

                <Link
                  href="/join"
                  className="rounded-xl bg-isr-dark-red px-5 py-3 text-center text-sm font-bold text-white"
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
