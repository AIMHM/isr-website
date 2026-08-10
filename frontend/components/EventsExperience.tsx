'use client'

import {
  useEffect,
  useMemo,
  useState,
} from 'react'
import Link from 'next/link'
import EventCard from '@/components/EventCard'
import {
  fetchEvents,
  type Event,
} from '@/lib/events'

type EventTab =
  | 'upcoming'
  | 'past'

export default function EventsExperience() {
  const [
    tab,
    setTab,
  ] =
    useState<EventTab>(
      'upcoming',
    )

  const [
    events,
    setEvents,
  ] =
    useState<Event[]>([])

  const [
    loading,
    setLoading,
  ] =
    useState(true)

  const [
    error,
    setError,
  ] =
    useState<string | null>(
      null,
    )

  const [
    search,
    setSearch,
  ] =
    useState('')

  const [
    campus,
    setCampus,
  ] =
    useState('all')

  const [
    reloadKey,
    setReloadKey,
  ] =
    useState(0)

  useEffect(() => {
    let active = true

    setLoading(true)
    setError(null)

    fetchEvents(tab)
      .then((data) => {
        if (active) {
          setEvents(data)
        }
      })
      .catch(() => {
        if (active) {
          setEvents([])

          setError(
            'We could not load events right now.',
          )
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [
    tab,
    reloadKey,
  ])

  const campuses =
    useMemo(
      () =>
        Array.from(
          new Set(
            events
              .map(
                (event) =>
                  event.campus,
              )
              .filter(
                (
                  value,
                ): value is string =>
                  Boolean(value),
              ),
          ),
        ).sort(),
      [events],
    )

  const filtered =
    useMemo(
      () => {
        const query =
          search
            .trim()
            .toLowerCase()

        return events.filter(
          (event) => {
            const matchesCampus =
              campus ===
                'all' ||
              event.campus ===
                campus

            const haystack =
              [
                event.name,
                event.description,
                event.venue,
                event.campus,
                event.audience,
                event.price,
              ]
                .filter(Boolean)
                .join(' ')
                .toLowerCase()

            const matchesSearch =
              !query ||
              haystack.includes(
                query,
              )

            return (
              matchesCampus &&
              matchesSearch
            )
          },
        )
      },
      [
        events,
        search,
        campus,
      ],
    )

  const filtersActive =
    Boolean(search.trim()) ||
    campus !== 'all'

  function clearFilters() {
    setSearch('')
    setCampus('all')
  }

  return (
    <>
      <section className="border-b border-isr-light-blue/20 bg-isr-dark-red px-4 py-14 text-white sm:py-20">
        <div className="container-isr mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-isr-yellow">
                ISR Events
              </p>

              <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
                Find your next event
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
                Islamic learning, workshops, community
                programs, social events and opportunities
                to meet other Muslim students.
              </p>
            </div>

            <Link
              href="/join"
              className="inline-flex w-fit items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Get involved with ISR
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:py-14">
        <div className="container-isr mx-auto max-w-7xl">
          <div className="rounded-3xl border border-isr-light-blue/25 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div
                className="grid grid-cols-2 rounded-2xl bg-isr-cream p-1"
                role="group"
                aria-label="Choose event period"
              >
                {(
                  [
                    [
                      'upcoming',
                      'Upcoming',
                    ],
                    [
                      'past',
                      'Past events',
                    ],
                  ] as const
                ).map(
                  ([
                    value,
                    label,
                  ]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => {
                        setTab(value)
                        setCampus('all')
                        setSearch('')
                      }}
                      aria-pressed={
                        tab === value
                      }
                      className={`rounded-xl px-5 py-3 text-sm font-bold transition ${
                        tab === value
                          ? 'bg-isr-dark-red text-white shadow-sm'
                          : 'text-gray-600 hover:text-isr-dark-red'
                      }`}
                    >
                      {label}
                    </button>
                  ),
                )}
              </div>

              <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] lg:w-[620px]">
                <div>
                  <label
                    className="sr-only"
                    htmlFor="event-search"
                  >
                    Search events
                  </label>

                  <input
                    id="event-search"
                    type="search"
                    value={search}
                    onChange={(event) =>
                      setSearch(
                        event.target.value,
                      )
                    }
                    placeholder="Search events..."
                    className="w-full rounded-xl border border-isr-light-blue/35 bg-white px-4 py-3 text-base text-gray-900 outline-none transition focus:border-isr-turquoise focus:ring-2 focus:ring-isr-turquoise/15 sm:text-sm"
                  />
                </div>

                <div>
                  <label
                    className="sr-only"
                    htmlFor="campus-filter"
                  >
                    Filter by campus
                  </label>

                  <select
                    id="campus-filter"
                    value={campus}
                    onChange={(event) =>
                      setCampus(
                        event.target.value,
                      )
                    }
                    className="w-full rounded-xl border border-isr-light-blue/35 bg-white px-4 py-3 text-base font-semibold text-gray-700 outline-none focus:border-isr-turquoise sm:text-sm"
                  >
                    <option value="all">
                      All campuses
                    </option>

                    {campuses.map(
                      (item) => (
                        <option
                          key={item}
                          value={item}
                        >
                          {item}
                        </option>
                      ),
                    )}
                  </select>
                </div>
              </div>
            </div>

            {filtersActive && (
              <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-isr-light-blue/15 pt-4">
                <span className="text-xs font-bold uppercase tracking-wide text-gray-500">
                  Filters
                </span>

                {search.trim() && (
                  <span className="rounded-full bg-isr-turquoise/10 px-3 py-1.5 text-xs font-semibold text-isr-dark-red">
                    Search: {search.trim()}
                  </span>
                )}

                {campus !== 'all' && (
                  <span className="rounded-full bg-isr-turquoise/10 px-3 py-1.5 text-xs font-semibold text-isr-dark-red">
                    {campus}
                  </span>
                )}

                <button
                  type="button"
                  onClick={clearFilters}
                  className="ml-auto text-xs font-bold text-isr-turquoise"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-isr-turquoise">
                {tab === 'upcoming'
                  ? 'Coming up'
                  : 'Archive'}
              </p>

              <h2 className="mt-2 text-2xl font-bold text-isr-dark-red sm:text-3xl">
                {tab === 'upcoming'
                  ? 'Upcoming events'
                  : 'Past events'}
              </h2>
            </div>

            {!loading &&
              !error && (
                <p
                  aria-live="polite"
                  className="text-sm font-semibold text-gray-500"
                >
                  {filtered.length}{' '}
                  {filtered.length ===
                  1
                    ? 'event'
                    : 'events'}
                </p>
              )}
          </div>

          {loading && (
            <>
              <span className="sr-only">
                Loading events
              </span>

              <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map(
                  (item) => (
                    <div
                      key={item}
                      className="h-[420px] animate-pulse rounded-3xl bg-isr-cream"
                    />
                  ),
                )}
              </div>
            </>
          )}

          {!loading &&
            error && (
              <div className="mt-8 rounded-3xl border border-red-200 bg-red-50 p-7 text-center sm:p-10">
                <h3 className="text-xl font-bold text-red-800">
                  Events could not be loaded
                </h3>

                <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-red-700">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setReloadKey(
                      (key) =>
                        key + 1,
                    )
                  }
                  className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-isr-dark-red px-5 py-2.5 font-bold text-white"
                >
                  Try again
                </button>
              </div>
            )}

          {!loading &&
            !error &&
            filtered.length >
              0 && (
              <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filtered.map(
                  (event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                    />
                  ),
                )}
              </div>
            )}

          {!loading &&
            !error &&
            filtered.length ===
              0 && (
              <div className="mt-8 rounded-3xl bg-isr-cream/65 p-8 text-center sm:p-12">
                <h3 className="text-2xl font-bold text-isr-dark-red">
                  {filtersActive
                    ? 'No events match those filters'
                    : tab ===
                        'upcoming'
                      ? 'No upcoming events are listed yet'
                      : 'No past events are available yet'}
                </h3>

                <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-gray-700">
                  {filtersActive
                    ? 'Try a different search, another campus, or clear the filters.'
                    : tab ===
                        'upcoming'
                      ? 'Check ISR Updates and the ISR community for the latest announcements.'
                      : 'Past event records will appear here as the archive grows.'}
                </p>

                {filtersActive ? (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="isr-button-secondary mt-6"
                  >
                    Clear filters
                  </button>
                ) : (
                  <Link
                    href="/updates"
                    className="isr-button-secondary mt-6"
                  >
                    Check ISR Updates
                  </Link>
                )}
              </div>
            )}
        </div>
      </section>
    </>
  )
}
