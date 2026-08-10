'use client'

import {
  useEffect,
  useMemo,
  useState,
} from 'react'
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

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetchEvents(tab)
      .then(
        setEvents,
      )
      .catch(
        () => {
          setEvents([])
          setError(
            'We could not load events right now.',
          )
        },
      )
      .finally(
        () =>
          setLoading(false),
      )
  }, [tab])

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
                  Boolean(
                    value,
                  ),
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
              ]
                .filter(
                  Boolean,
                )
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

  return (
    <>
      <section className="border-b border-isr-light-blue/20 bg-isr-cream/55 px-4 py-12 sm:py-16">
        <div className="container-isr mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-isr-turquoise">
              ISR Events
            </p>

            <h1 className="mt-3 text-4xl font-bold text-isr-dark-red sm:text-5xl">
              Find your next event
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-gray-700">
              Islamic learning, community programs,
              workshops, social events and more.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:py-14">
        <div className="container-isr mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 rounded-3xl border border-isr-light-blue/25 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
            <div
              className="flex rounded-2xl bg-isr-cream p-1"
              role="group"
              aria-label="Event period"
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
                    key={
                      value
                    }
                    type="button"
                    onClick={() => {
                      setTab(
                        value,
                      )
                      setCampus(
                        'all',
                      )
                    }}
                    className={`rounded-xl px-5 py-2.5 text-sm font-bold transition ${
                      tab ===
                      value
                        ? 'bg-isr-dark-red text-white shadow-sm'
                        : 'text-gray-600 hover:text-isr-dark-red'
                    }`}
                  >
                    {
                      label
                    }
                  </button>
                ),
              )}
            </div>

            <div className="grid gap-3 sm:grid-cols-[1fr_auto] lg:w-[600px]">
              <label className="sr-only" htmlFor="event-search">
                Search events
              </label>

              <input
                id="event-search"
                type="search"
                value={
                  search
                }
                onChange={
                  (event) =>
                    setSearch(
                      event
                        .target
                        .value,
                    )
                }
                placeholder="Search events..."
                className="w-full rounded-xl border border-isr-light-blue/35 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-isr-turquoise focus:ring-2 focus:ring-isr-turquoise/15"
              />

              <label className="sr-only" htmlFor="campus-filter">
                Filter by campus
              </label>

              <select
                id="campus-filter"
                value={
                  campus
                }
                onChange={
                  (event) =>
                    setCampus(
                      event
                        .target
                        .value,
                    )
                }
                className="rounded-xl border border-isr-light-blue/35 bg-white px-4 py-3 text-sm font-semibold text-gray-700 outline-none focus:border-isr-turquoise"
              >
                <option value="all">
                  All campuses
                </option>

                {campuses.map(
                  (item) => (
                    <option
                      key={
                        item
                      }
                      value={
                        item
                      }
                    >
                      {item}
                    </option>
                  ),
                )}
              </select>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-isr-dark-red">
              {tab ===
              'upcoming'
                ? 'Upcoming events'
                : 'Past events'}
            </h2>

            {!loading &&
              !error && (
                <p className="text-sm text-gray-500">
                  {
                    filtered.length
                  }{' '}
                  {
                    filtered.length ===
                    1
                      ? 'event'
                      : 'events'
                  }
                </p>
              )}
          </div>

          {loading && (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map(
                (item) => (
                  <div
                    key={
                      item
                    }
                    className="h-[430px] animate-pulse rounded-3xl bg-isr-cream"
                  />
                ),
              )}
            </div>
          )}

          {!loading &&
            error && (
              <div className="mt-8 rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
                <h3 className="text-xl font-bold text-red-800">
                  Events could not be loaded
                </h3>

                <p className="mt-3 text-sm text-red-700">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    window.location.reload()
                  }
                  className="mt-5 rounded-full bg-isr-dark-red px-5 py-2.5 font-bold text-white"
                >
                  Try again
                </button>
              </div>
            )}

          {!loading &&
            !error &&
            filtered.length >
              0 && (
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map(
                  (event) => (
                    <EventCard
                      key={
                        event.id
                      }
                      event={
                        event
                      }
                    />
                  ),
                )}
              </div>
            )}

          {!loading &&
            !error &&
            filtered.length ===
              0 && (
              <div className="mt-8 rounded-3xl bg-isr-cream/65 p-10 text-center">
                <h3 className="text-2xl font-bold text-isr-dark-red">
                  No matching events
                </h3>

                <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-gray-700">
                  {search ||
                  campus !==
                    'all'
                    ? 'Try removing a search or campus filter.'
                    : tab ===
                        'upcoming'
                      ? 'There are no upcoming events listed yet. Check ISR Updates for the latest information.'
                      : 'No past events are currently available in the archive.'}
                </p>

                {(search ||
                  campus !==
                    'all') && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearch('')
                      setCampus(
                        'all',
                      )
                    }}
                    className="isr-button-secondary mt-6"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )}
        </div>
      </section>
    </>
  )
}
