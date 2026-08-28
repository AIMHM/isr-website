'use client'

import {
  useEffect,
  useState,
} from 'react'
import {
  usePathname,
} from 'next/navigation'

const STORAGE_KEY =
  'isr-public-tour-v1-complete'

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
      'Here is a quick guide to the main parts of the website so you always know where to go.',
  },
  {
    title: 'Pray at RMIT',
    description:
      'Find prayer spaces, Jumuah arrangements and current prayer information across RMIT campuses.',
    selector: 'a[href="/pray"]',
  },
  {
    title: 'Whatâ€™s On',
    description:
      'This is where ISR events and recurring weekly programs come together in one place.',
    selector: 'a[href="/events"]',
  },
  {
    title: 'Campuses',
    description:
      'Open City, Bundoora and Brunswick campus information, including prayer and campus-specific activity.',
    selector: 'a[href="/campuses"]',
  },
  {
    title: 'Student Guide',
    description:
      'Use the Student Guide for the Muslim student essentials and the journey from attending to joining, volunteering and leading.',
    selector: 'a[href="/student-guide"]',
  },
  {
    title: 'Student Support',
    description:
      'If something is affecting your experience as a Muslim student, start here to find the right information or support pathway.',
    selector: 'a[href="/support"]',
  },
  {
    title: 'Join ISR',
    description:
      'Membership, community, volunteering and ways to become more involved with ISR live here.',
    selector: 'a[href="/join"]',
  },
  {
    title: 'Search',
    description:
      'Not sure where something lives? Search ISR to quickly find the right page or information.',
    selector: 'a[href="/find"]',
  },
]

function findVisibleElement(
  selector?: string,
): HTMLElement | null {
  if (!selector) {
    return null
  }

  const elements =
    Array.from(
      document.querySelectorAll<HTMLElement>(
        selector,
      ),
    )

  return (
    elements.find((element) => {
      const rect =
        element.getBoundingClientRect()

      const style =
        window.getComputedStyle(
          element,
        )

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
  const pathname =
    usePathname()

  const [
    active,
    setActive,
  ] =
    useState(false)

  const [
    index,
    setIndex,
  ] =
    useState(0)

  const [
    spotlight,
    setSpotlight,
  ] =
    useState<SpotlightRect | null>(
      null,
    )

  const isAdmin =
    pathname.startsWith(
      '/admin',
    )

  useEffect(() => {
    if (isAdmin) {
      return
    }

    function restartTour() {
      setIndex(0)
      setActive(true)
    }

    window.addEventListener(
      TOUR_EVENT,
      restartTour,
    )

    const timer =
      window.setTimeout(() => {
        const complete =
          window.localStorage.getItem(
            STORAGE_KEY,
          )

        if (!complete) {
          setIndex(0)
          setActive(true)
        }
      }, 700)

    return () => {
      window.clearTimeout(
        timer,
      )

      window.removeEventListener(
        TOUR_EVENT,
        restartTour,
      )
    }
  }, [isAdmin])

  useEffect(() => {
    if (!active || isAdmin) {
      setSpotlight(null)
      return
    }

    function updateSpotlight() {
      const element =
        findVisibleElement(
          STEPS[index].selector,
        )

      if (!element) {
        setSpotlight(null)
        return
      }

      const rect =
        element.getBoundingClientRect()

      setSpotlight({
        top: rect.top - 7,
        left: rect.left - 7,
        width: rect.width + 14,
        height: rect.height + 14,
      })
    }

    updateSpotlight()

    window.addEventListener(
      'resize',
      updateSpotlight,
    )

    window.addEventListener(
      'scroll',
      updateSpotlight,
      true,
    )

    return () => {
      window.removeEventListener(
        'resize',
        updateSpotlight,
      )

      window.removeEventListener(
        'scroll',
        updateSpotlight,
        true,
      )
    }
  }, [active, index, isAdmin])

  function finish() {
    window.localStorage.setItem(
      STORAGE_KEY,
      'true',
    )

    setActive(false)
  }

  function next() {
    if (
      index ===
      STEPS.length - 1
    ) {
      finish()
      return
    }

    setIndex(
      (current) =>
        current + 1,
    )
  }

  function previous() {
    setIndex(
      (current) =>
        Math.max(
          0,
          current - 1,
        ),
    )
  }

  if (!active || isAdmin) {
    return null
  }

  const step =
    STEPS[index]

  return (
    <div className="fixed inset-0 z-[200]">
      {spotlight ? (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed rounded-2xl border-2 border-isr-yellow transition-all duration-200"
          style={{
            top: spotlight.top,
            left: spotlight.left,
            width: spotlight.width,
            height: spotlight.height,
            boxShadow:
              '0 0 0 9999px rgba(0, 0, 0, 0.72)',
          }}
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-black/70"
        />
      )}

      <div className="pointer-events-none absolute inset-0" />

      <section
        role="dialog"
        aria-modal="true"
        aria-label="ISR website tour"
        className="fixed bottom-5 left-1/2 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 rounded-[1.5rem] bg-white p-5 shadow-2xl sm:bottom-8 sm:p-6"
      >
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-isr-turquoise">
              Website tour Â· {index + 1} of {STEPS.length}
            </p>

            <h2 className="mt-2 text-2xl font-bold text-isr-dark-red">
              {step.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={finish}
            className="rounded-full px-3 py-2 text-sm font-semibold text-gray-500 transition hover:bg-gray-100 hover:text-isr-dark-red"
          >
            Skip
          </button>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-gray-700 sm:text-base">
          {step.description}
        </p>

        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={previous}
            disabled={index === 0}
            className="rounded-full border border-isr-light-blue/40 px-4 py-2.5 text-sm font-bold text-isr-dark-red transition hover:bg-isr-cream disabled:cursor-not-allowed disabled:opacity-35"
          >
            Back
          </button>

          <div className="flex gap-1.5">
            {STEPS.map((_, stepIndex) => (
              <span
                key={stepIndex}
                aria-hidden="true"
                className={stepIndex === index ? 'h-2 w-6 rounded-full bg-isr-turquoise transition-all' : 'h-2 w-2 rounded-full bg-gray-200 transition-all'}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            className="rounded-full bg-isr-dark-red px-5 py-2.5 text-sm font-bold text-white transition hover:bg-isr-turquoise"
          >
            {
              index ===
              STEPS.length - 1
                ? 'Finish'
                : 'Next'
            }
          </button>
        </div>
      </section>
    </div>
  )
}
