'use client'

import {
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  usePathname,
} from 'next/navigation'

const TOUR_EVENT =
  'isr:tour:start'

type TourStep = {
  title: string
  description: string
  selector?: string
}

type SpotlightRect = {
  top: number
  left: number
  width: number
  height: number
}

const STEPS: TourStep[] = [
  {
    title: 'Welcome to ISR',
    description:
      'Use this short tour whenever you want a reminder of the main student pathways on the website.',
  },
  {
    title: 'Pray at RMIT',
    description:
      'Find prayer spaces, current prayer information and ISR Jumu’ah arrangements across RMIT.',
    selector: 'a[href="/pray"]',
  },
  {
    title: 'What’s On',
    description:
      'Find one-off events, halaqas, workshops and recurring weekly programs in one place.',
    selector: 'a[href="/events"]',
  },
  {
    title: 'Campus Guide',
    description:
      'Choose City, Bundoora or Brunswick for campus-specific prayer, Jumu’ah and activity information.',
    selector: 'a[href="/campuses"]',
  },
  {
    title: 'New Students',
    description:
      'Start with the Muslim student essentials if you are new to RMIT: prayer, Jumu’ah, community and support.',
    selector: 'a[href="/student-guide"]',
  },
  {
    title: 'Student Support',
    description:
      'If something is affecting your experience as a Muslim student, use Student Support to find the closest pathway.',
    selector: 'a[href="/support"]',
  },
  {
    title: 'Join ISR',
    description:
      'Find membership, community, volunteering and team opportunities without needing to understand ISR’s internal structure.',
    selector: 'a[href="/join"]',
  },
  {
    title: 'Search ISR',
    description:
      'When you know what you need but not where it lives, Search ISR can find pages, prayer spaces, programs, events and updates.',
    selector: 'a[href="/find"]',
  },
]

function findVisibleElement(
  selector?: string,
): HTMLElement | null {
  if (!selector) return null

  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(selector),
  )

  return (
    elements.find((element) => {
      const rect = element.getBoundingClientRect()
      const style = window.getComputedStyle(element)

      return (
        rect.width > 0 &&
        rect.height > 0 &&
        style.display !== 'none' &&
        style.visibility !== 'hidden'
      )
    }) ?? null
  )
}

export default function SiteTour() {
  const pathname = usePathname()
  const [active, setActive] = useState(false)
  const [index, setIndex] = useState(0)
  const [spotlight, setSpotlight] =
    useState<SpotlightRect | null>(null)

  const dialogRef = useRef<HTMLElement | null>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const isAdmin = pathname.startsWith('/admin')

  function restoreFocus() {
    const previous = previousFocusRef.current
    previousFocusRef.current = null

    window.requestAnimationFrame(() => {
      previous?.focus()
    })
  }

  function finish() {
    setActive(false)
    restoreFocus()
  }

  useEffect(() => {
    if (isAdmin) return

    function startTour() {
      setIndex(0)
      setActive(true)
    }

    window.addEventListener(TOUR_EVENT, startTour)

    return () => {
      window.removeEventListener(TOUR_EVENT, startTour)
    }
  }, [isAdmin])

  useEffect(() => {
    if (!active || isAdmin) return

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusFrame = window.requestAnimationFrame(() => {
      dialogRef.current?.focus()
    })

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        setActive(false)
        restoreFocus()
        return
      }

      if (event.key !== 'Tab') return

      const dialog = dialogRef.current
      if (!dialog) return

      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          [
            'button:not([disabled])',
            'a[href]',
            '[tabindex]:not([tabindex="-1"])',
          ].join(','),
        ),
      ).filter((item) => !item.hasAttribute('disabled'))

      if (focusable.length === 0) {
        event.preventDefault()
        dialog.focus()
        return
      }

      const currentIndex = focusable.indexOf(
        document.activeElement as HTMLElement,
      )

      if (event.shiftKey) {
        if (currentIndex <= 0) {
          event.preventDefault()
          focusable[focusable.length - 1].focus()
        }

        return
      }

      if (
        currentIndex === -1 ||
        currentIndex === focusable.length - 1
      ) {
        event.preventDefault()
        focusable[0].focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.cancelAnimationFrame(focusFrame)
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [active, isAdmin])

  useEffect(() => {
    if (!active || isAdmin) {
      setSpotlight(null)
      return
    }

    function updateSpotlight() {
      const element = findVisibleElement(STEPS[index].selector)

      if (!element) {
        setSpotlight(null)
        return
      }

      const rect = element.getBoundingClientRect()

      setSpotlight({
        top: rect.top - 7,
        left: rect.left - 7,
        width: rect.width + 14,
        height: rect.height + 14,
      })
    }

    updateSpotlight()
    window.addEventListener('resize', updateSpotlight)
    window.addEventListener('scroll', updateSpotlight, true)

    return () => {
      window.removeEventListener('resize', updateSpotlight)
      window.removeEventListener('scroll', updateSpotlight, true)
    }
  }, [active, index, isAdmin])

  function next() {
    if (index === STEPS.length - 1) {
      finish()
      return
    }

    setIndex((current) => current + 1)
  }

  function previous() {
    setIndex((current) => Math.max(0, current - 1))
  }

  if (!active || isAdmin) return null

  const step = STEPS[index]

  return (
    <div className="fixed inset-0 z-[200]">
      {spotlight ? (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed rounded-xl border-2 border-isr-yellow transition-all duration-200"
          style={{
            top: spotlight.top,
            left: spotlight.left,
            width: spotlight.width,
            height: spotlight.height,
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.72)',
          }}
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-black/70"
        />
      )}

      <section
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="isr-tour-title"
        aria-describedby="isr-tour-description"
        className="fixed bottom-4 left-1/2 max-h-[calc(100vh-2rem)] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl outline-none sm:bottom-8 sm:p-6"
      >
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-isr-turquoise">
              Website tour · {index + 1} of {STEPS.length}
            </p>

            <h2
              id="isr-tour-title"
              className="mt-2 text-2xl font-bold text-isr-dark-red"
            >
              {step.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={finish}
            className="min-h-11 rounded-full px-3 py-2 text-sm font-semibold text-gray-500 transition hover:bg-gray-100 hover:text-isr-dark-red"
          >
            Close
          </button>
        </div>

        <p
          id="isr-tour-description"
          className="mt-3 text-sm leading-relaxed text-gray-700 sm:text-base"
        >
          {step.description}
        </p>

        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={previous}
            disabled={index === 0}
            className="min-h-11 rounded-full border border-isr-light-blue/40 px-4 py-2.5 text-sm font-bold text-isr-dark-red transition hover:bg-isr-cream disabled:cursor-not-allowed disabled:opacity-35"
          >
            Back
          </button>

          <div className="flex gap-1.5" aria-hidden="true">
            {STEPS.map((_, stepIndex) => (
              <span
                key={stepIndex}
                className={
                  stepIndex === index
                    ? 'h-2 w-6 rounded-full bg-isr-turquoise transition-all'
                    : 'h-2 w-2 rounded-full bg-gray-200 transition-all'
                }
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            className="min-h-11 rounded-full bg-isr-dark-red px-5 py-2.5 text-sm font-bold text-white transition hover:bg-isr-turquoise"
          >
            {index === STEPS.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>

        <p className="sr-only">
          Press Escape to close the website tour.
        </p>
      </section>
    </div>
  )
}
