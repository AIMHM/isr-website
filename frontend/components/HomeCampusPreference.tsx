'use client'

import {
  useEffect,
  useState,
} from 'react'
import Link from 'next/link'

type Campus =
  | 'City'
  | 'Bundoora'
  | 'Brunswick'

const STORAGE_KEY =
  'isr-preferred-campus-v1'

const CAMPUSES: {
  value: Campus
  description: string
}[] = [
  {
    value: 'City',
    description:
      'Prayer, Jumu’ah, events and Muslim student life in the CBD.',
  },
  {
    value: 'Bundoora',
    description:
      'East and West campus prayer information and ISR activity.',
  },
  {
    value: 'Brunswick',
    description:
      'Prayer information, activities and ISR student pathways.',
  },
]

function campusAnchor(
  campus: Campus,
): string {
  return campus.toLowerCase()
}

export default function HomeCampusPreference() {
  const [
    selected,
    setSelected,
  ] =
    useState<Campus | null>(
      null,
    )

  useEffect(() => {
    const saved =
      window.localStorage.getItem(
        STORAGE_KEY,
      )

    if (
      saved === 'City' ||
      saved === 'Bundoora' ||
      saved === 'Brunswick'
    ) {
      setSelected(saved)
    }
  }, [])

  function choose(
    campus: Campus,
  ) {
    window.localStorage.setItem(
      STORAGE_KEY,
      campus,
    )

    setSelected(campus)

    window.dispatchEvent(
      new CustomEvent(
        'isr:campus:change',
        {
          detail: campus,
        },
      ),
    )
  }

  function clear() {
    window.localStorage.removeItem(
      STORAGE_KEY,
    )

    setSelected(null)

    window.dispatchEvent(
      new CustomEvent(
        'isr:campus:change',
        {
          detail: null,
        },
      ),
    )
  }

  return (
    <section className="bg-white px-4 py-12 sm:py-16">
      <div className="container-isr mx-auto max-w-7xl">
        <div className="rounded-[2rem] border border-isr-light-blue/20 bg-isr-cream/50 p-6 sm:p-8">
          <div className="grid gap-7 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div>
              <p className="isr-eyebrow text-isr-turquoise">
                Your campus
              </p>

              <h2 className="mt-3 text-3xl font-bold leading-tight text-isr-dark-red">
                Where are you usually based?
              </h2>

              <p className="mt-4 leading-relaxed text-gray-700">
                Choose your usual campus and ISR can give
                you faster links to the information most
                relevant to you.
              </p>

              <p className="mt-4 text-xs leading-relaxed text-gray-500">
                Your preference is stored only in this
                browser. There is no account or student
                tracking attached to it.
              </p>
            </div>

            <div>
              <div className="grid gap-3 sm:grid-cols-3">
                {CAMPUSES.map(
                  (campus) => {
                    const active =
                      selected ===
                      campus.value

                    return (
                      <button
                        key={
                          campus.value
                        }
                        type="button"
                        onClick={() =>
                          choose(
                            campus.value,
                          )
                        }
                        className={
                          'rounded-2xl border p-5 text-left transition ' +
                          (
                            active
                              ? 'border-isr-turquoise bg-white shadow-sm'
                              : 'border-isr-light-blue/20 bg-white/70 hover:border-isr-turquoise'
                          )
                        }
                      >
                        <span className="font-bold text-isr-dark-red">
                          {
                            campus.value
                          }
                        </span>

                        <p className="mt-2 text-xs leading-relaxed text-gray-600">
                          {
                            campus.description
                          }
                        </p>

                        {active && (
                          <span className="mt-4 inline-flex rounded-full bg-isr-turquoise/10 px-3 py-1 text-xs font-bold text-isr-turquoise">
                            Your campus
                          </span>
                        )}
                      </button>
                    )
                  },
                )}
              </div>

              {selected && (
                <div className="mt-5 rounded-2xl bg-isr-dark-red p-5 text-white">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-isr-yellow">
                        Quick access
                      </p>

                      <h3 className="mt-2 text-xl font-bold">
                        {selected} campus
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={clear}
                      className="text-xs font-semibold text-white/60 underline underline-offset-4 hover:text-white"
                    >
                      Clear preference
                    </button>
                  </div>

                  <div className="mt-5 grid gap-2 sm:grid-cols-3">
                    <Link
                      href={
                        '/campuses#' +
                        campusAnchor(
                          selected,
                        )
                      }
                      className="rounded-xl bg-white px-4 py-3 text-center text-sm font-bold text-isr-dark-red transition hover:bg-isr-yellow"
                    >
                      Campus guide
                    </Link>

                    <Link
                      href={
                        '/events?campus=' +
                        encodeURIComponent(
                          selected,
                        )
                      }
                      className="rounded-xl border border-white/20 px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-white/10"
                    >
                      What&apos;s On
                    </Link>

                    <Link
                      href="/pray"
                      className="rounded-xl border border-white/20 px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-white/10"
                    >
                      Prayer
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
