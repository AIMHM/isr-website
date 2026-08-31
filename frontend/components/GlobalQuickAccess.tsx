'use client'

import Link from 'next/link'
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  usePathname,
} from 'next/navigation'

const QUICK_LINKS = [
  {
    href: '/find',
    label: 'Search ISR',
    description: 'Find prayer, events, campuses, support and student information.',
  },
  {
    href: '/pray',
    label: 'Pray at RMIT',
    description: 'Prayer spaces, Jumu’ah and daily prayer times.',
  },
  {
    href: '/events',
    label: 'What’s On',
    description: 'Events, weekly programs and current activities.',
  },
  {
    href: '/campuses',
    label: 'Campus Guide',
    description: 'City, Bundoora and Brunswick student information.',
  },
  {
    href: '/student-guide',
    label: 'Student Guide',
    description: 'New to RMIT? Start with the Muslim student essentials.',
  },
  {
    href: '/support',
    label: 'Student Support',
    description: 'Find the closest information or support pathway.',
  },
  {
    href: '/faq',
    label: 'FAQ',
    description: 'Quick answers to common ISR and Muslim student questions.',
  },
  {
    href: '/join',
    label: 'Join ISR',
    description: 'Membership, community, volunteering and team pathways.',
  },
]

export default function GlobalQuickAccess() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const openPanel = useCallback(() => {
    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null
    setOpen(true)
  }, [])

  const closePanel = useCallback(() => {
    setOpen(false)
    const previous = previousFocusRef.current
    previousFocusRef.current = null

    window.requestAnimationFrame(() => {
      previous?.focus()
    })
  }, [])

  const togglePanel = useCallback(() => {
    if (open) {
      closePanel()
    } else {
      openPanel()
    }
  }, [closePanel, open, openPanel])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target
      const editing =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        (target instanceof HTMLElement && target.isContentEditable)

      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === 'k'
      ) {
        event.preventDefault()
        togglePanel()
        return
      }

      if (event.key === 'Escape' && open) {
        event.preventDefault()
        closePanel()
        return
      }

      if (!editing && event.key === '/' && !open) {
        event.preventDefault()
        window.location.href = '/find'
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [closePanel, open, togglePanel])

  useEffect(() => {
    if (!open || !panelRef.current) return

    const panel = panelRef.current
    const firstLink = panel.querySelector<HTMLAnchorElement>('a')
    firstLink?.focus()

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function trapFocus(event: KeyboardEvent) {
      if (event.key !== 'Tab') return

      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(
          [
            'a[href]',
            'button:not([disabled])',
            '[tabindex]:not([tabindex="-1"])',
          ].join(','),
        ),
      ).filter((item) => !item.hasAttribute('disabled'))

      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement

      if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', trapFocus)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', trapFocus)
    }
  }, [open])

  if (pathname.startsWith('/admin')) {
    return null
  }

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="isr-global-quick-access"
        onClick={togglePanel}
        className="isr-global-quick-button"
      >
        <span aria-hidden="true" className="text-lg">⌕</span>
        <span>Quick access</span>
        <span aria-hidden="true" className="hidden text-[10px] font-bold opacity-50 sm:inline">
          Ctrl K
        </span>
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close quick access"
            onClick={closePanel}
            className="isr-global-quick-backdrop"
          />

          <div
            id="isr-global-quick-access"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="isr-global-quick-heading"
            className="isr-global-quick-panel"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-turquoise">
                  ISR quick access
                </p>

                <h2
                  id="isr-global-quick-heading"
                  className="mt-2 text-2xl font-bold text-isr-dark-red"
                >
                  Where do you need to go?
                </h2>
              </div>

              <button
                type="button"
                onClick={closePanel}
                className="isr-global-quick-close"
                aria-label="Close quick access"
              >
                ×
              </button>
            </div>

            <div className="mt-6 grid gap-2">
              {QUICK_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="isr-global-quick-link"
                >
                  <div>
                    <p className="font-bold text-isr-dark-red">{link.label}</p>
                    <p className="mt-1 text-xs leading-relaxed text-gray-600">{link.description}</p>
                  </div>

                  <span aria-hidden="true" className="text-isr-turquoise">→</span>
                </Link>
              ))}
            </div>

            <div className="mt-5 border-t border-isr-light-blue/20 pt-4">
              <p className="text-xs leading-relaxed text-gray-500">
                Keyboard: Ctrl/Cmd + K opens this panel. Press / from most pages to open ISR search.
              </p>
            </div>
          </div>
        </>
      )}
    </>
  )
}
