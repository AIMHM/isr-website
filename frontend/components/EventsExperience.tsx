'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  canRegisterForEvent,
  fetchEvents,
  formatEventDate,
  formatEventTime,
  getEventStatus,
  getEventStatusLabel,
  sortEventsForDisplay,
  type Event,
  type EventStatus,
  type EventsFilter,
} from '@/lib/events'

const STATUS_CLASSES: Record<EventStatus, string> = {
  scheduled:
    'bg-isr-turquoise/12 text-isr-turquoise',
  'sold-out':
    'bg-isr-yellow text-isr-dark-red',
  postponed:
    'bg-amber-100 text-amber-900',
  cancelled:
    'bg-red-100 text-red-800',
  completed:
    'bg-isr-light-blue/25 text-isr-dark-red',
}

const FILTERS: {
  value: EventsFilter
  label: string
}[] = [
  {
    value: 'upcoming',
    label: 'Upcoming',
  },
  {
    value: 'past',
    label: 'Past',
  },
]

function EventPoster({
  event,
}: {
  event: Event
}) {
  if (!event.imageUrl) {
    return (
      <div className="isr-event-poster-frame flex aspect-[4/3] items-end p-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-turquoise">
            Islamic Society of RMIT
          </p>

          <p className="mt-2 max-w-xs text-lg font-bold leading-snug text-isr-dark-red">
            {event.name}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="isr-event-poster-frame relative aspect-[4/3]">
      <Image
        src={event.imageUrl}
        alt=""
        fill
        aria-hidden="true"
        className="scale-110 object-cover opacity-20 blur-xl"
        sizes="(max-width: 1024px) 100vw, 420px"
      />

      <Image
        src={event.imageUrl}
        alt={`${event.name} poster`}
        fill
        className="object-contain p-3 sm:p-4"
        sizes="(max-width: 1024px) 100vw, 420px"
      />
    </div>
  )
}

function EventListingCard({
  event,
}: {
  event: Event
}) {
  const {
    date,
    time,
  } =
    formatEventDate(
      event.date,
    )

  const status =
    getEventStatus(
      event,
    )

  const registrationAvailable =
    canRegisterForEvent(
      event,
    )

  return (
    <article className="isr-card overflow-hidden">
      <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
        <EventPoster event={event} />

        <div className="flex flex-col p-5 sm:p-7 lg:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${STATUS_CLASSES[status]}`}
            >
              <span className="isr-status-dot" />
              {getEventStatusLabel(
                status,
              )}
            </span>

            {event.campus && (
              <span className="rounded-full bg-isr-cream px-3 py-1.5 text-xs font-bold text-isr-dark-red">
                {event.campus}
              </span>
            )}

            {event.audience && (
              <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600">
                {event.audience}
              </span>
            )}
          </div>

          <time
            dateTime={event.date}
            className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-isr-turquoise"
          >
            {date}
          </time>

          <h2 className="mt-2 text-2xl font-bold leading-tight text-isr-dark-red sm:text-3xl">
            <Link
              href={`/events/${event.id}`}
              className="transition hover:text-isr-turquoise"
            >
              {event.name}
            </Link>
          </h2>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-700">
            <span className="font-semibold">
              {time}
              {event.endDate
                ? ` – ${formatEventTime(
                    event.endDate,
                  )}`
                : ''}
            </span>

            {event.venue && (
              <span>
                {event.venue}
              </span>
            )}
          </div>

          {event.statusNote && (
            <div className="mt-5 rounded-2xl border border-isr-yellow bg-isr-yellow/35 px-4 py-3 text-sm font-semibold leading-relaxed text-isr-dark-red">
              {event.statusNote}
            </div>
          )}

          <p className="mt-5 line-clamp-3 leading-relaxed text-gray-700">
            {event.description}
          </p>

          <div className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
            {event.price && (
              <div className="rounded-xl bg-isr-cream/65 px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                  Price
                </p>

                <p className="mt-1 font-bold text-isr-dark-red">
                  {event.price}
                </p>
              </div>
            )}

            {event.accessibility && (
              <div className="rounded-xl bg-isr-cream/65 px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                  Accessibility
                </p>

                <p className="mt-1 line-clamp-2 text-gray-700">
                  {event.accessibility}
                </p>
              </div>
            )}
          </div>

          <div className="mt-auto flex flex-col gap-3 pt-7 sm:flex-row">
            <Link
              href={`/events/${event.id}`}
              className="isr-button-secondary text-sm"
            >
              Event details
            </Link>

            {registrationAvailable &&
              event.ticketUrl && (
                <a
                  href={event.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="isr-button-primary text-sm"
                >
                  Register
                </a>
              )}
          </div>
        </div>
      </div>
    </article>
  )
}

export default function EventsExperience() {
  const [
    filter,
    setFilter,
  ] =
    useState<EventsFilter>(
      'upcoming',
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
    useState(false)

  const load =
    useCallback(
      async (
        selectedFilter:
          EventsFilter,
      ) => {
        setLoading(true)
        setError(false)

        try {
          const data =
            await fetchEvents(
              selectedFilter,
            )

          setEvents(
            sortEventsForDisplay(
              data,
            ),
          )
        }
        catch {
          setEvents([])
          setError(true)
        }
        finally {
          setLoading(false)
        }
      },
      [],
    )

  useEffect(() => {
    void load(filter)
  }, [filter, load])

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

  const visibleEvents =
    useMemo(
      () => {
        const normalized =
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

            const searchable =
              [
                event.name,
                event.description,
                event.venue,
                event.campus,
                event.audience,
              ]
                .filter(Boolean)
                .join(' ')
                .toLowerCase()

            const matchesSearch =
              !normalized ||
              searchable.includes(
                normalized,
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

  const hasFilters =
    Boolean(
      search.trim(),
    ) ||
    campus !==
      'all'

  return (
    <>
      <section className="isr-page-hero bg-isr-dark-red px-4 py-14 text-white sm:py-20">
        <div className="container-isr mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="isr-eyebrow text-isr-yellow">
              ISR Events
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Find something worth showing up for
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/80 sm:text-xl">
              Classes, workshops, socials,
              community programs and other
              opportunities to connect with
              Muslim students at RMIT.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-isr-light-blue/20 bg-white px-4 py-5">
        <div className="container-isr mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div
            className="flex gap-2"
            aria-label="Event period"
          >
            {FILTERS.map(
              ({
                value,
                label,
              }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    setFilter(
                      value,
                    )
                  }
                  aria-pressed={
                    filter ===
                    value
                  }
                  className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
                    filter ===
                    value
                      ? 'bg-isr-dark-red text-white'
                      : 'bg-isr-cream text-isr-dark-red hover:bg-isr-light-blue/20'
                  }`}
                >
                  {label}
                </button>
              ),
            )}
          </div>

          <p className="text-sm text-gray-600">
            {loading
              ? 'Loading events…'
              : `${visibleEvents.length} ${
                  visibleEvents.length ===
                  1
                    ? 'event'
                    : 'events'
                } shown`}
          </p>
        </div>
      </section>

      <section className="bg-isr-cream/45 px-4 py-12 sm:py-16">
        <div className="container-isr mx-auto max-w-7xl">
          <div className="rounded-[1.5rem] border border-isr-light-blue/20 bg-white p-4 shadow-sm sm:p-5">
            <div className="grid gap-3 md:grid-cols-[1fr_260px_auto]">
              <div>
                <label
                  htmlFor="event-search"
                  className="sr-only"
                >
                  Search events
                </label>

                <input
                  id="event-search"
                  type="search"
                  value={search}
                  onChange={(
                    event,
                  ) =>
                    setSearch(
                      event.target
                        .value,
                    )
                  }
                  placeholder="Search events, venues or audiences"
                  className="min-h-12 w-full rounded-xl border border-isr-light-blue/30 bg-white px-4 text-sm outline-none transition focus:border-isr-turquoise"
                />
              </div>

              <div>
                <label
                  htmlFor="event-campus"
                  className="sr-only"
                >
                  Filter by campus
                </label>

                <select
                  id="event-campus"
                  value={campus}
                  onChange={(
                    event,
                  ) =>
                    setCampus(
                      event.target
                        .value,
                    )
                  }
                  className="min-h-12 w-full rounded-xl border border-isr-light-blue/30 bg-white px-4 text-sm font-semibold text-isr-dark-red outline-none transition focus:border-isr-turquoise"
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

              {hasFilters && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch('')
                    setCampus(
                      'all',
                    )
                  }}
                  className="min-h-12 rounded-xl border border-isr-light-blue/30 px-5 text-sm font-bold text-isr-dark-red transition hover:bg-isr-cream"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {loading && (
            <div className="mt-8 space-y-6">
              {[1, 2, 3].map(
                (item) => (
                  <div
                    key={item}
                    className="h-80 animate-pulse rounded-[1.5rem] bg-white"
                  />
                ),
              )}
            </div>
          )}

          {!loading &&
            error && (
              <div className="mx-auto mt-8 max-w-xl rounded-3xl border border-isr-yellow bg-white p-8 text-center">
                <h2 className="text-xl font-bold text-isr-dark-red">
                  Events could not be loaded
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-gray-700">
                  Try loading the
                  current event list
                  again.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    void load(
                      filter,
                    )
                  }
                  className="isr-button-primary mt-6"
                >
                  Try again
                </button>
              </div>
            )}

          {!loading &&
            !error &&
            visibleEvents.length ===
              0 && (
              <div className="mx-auto mt-8 max-w-2xl rounded-3xl bg-white p-8 text-center shadow-sm">
                <h2 className="text-2xl font-bold text-isr-dark-red">
                  {hasFilters
                    ? 'Nothing matches those filters'
                    : filter ===
                        'upcoming'
                      ? 'No upcoming events are listed yet'
                      : 'No past events are available yet'}
                </h2>

                <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-gray-700">
                  {hasFilters
                    ? 'Clear the filters and try again.'
                    : 'Check ISR Updates for the latest information.'}
                </p>

                {hasFilters ? (
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
                ) : (
                  <Link
                    href="/updates"
                    className="isr-button-primary mt-6"
                  >
                    ISR Updates
                  </Link>
                )}
              </div>
            )}

          {!loading &&
            !error &&
            visibleEvents.length >
              0 && (
              <div className="mt-8 space-y-6">
                {visibleEvents.map(
                  (event) => (
                    <EventListingCard
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
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:py-16">
        <div className="container-isr mx-auto max-w-5xl">
          <div className="rounded-[1.75rem] bg-isr-dark-red p-6 text-white sm:p-8">
            <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-center">
              <div>
                <h2 className="text-2xl font-bold">
                  Want to hear about events earlier?
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70">
                  Join the ISR community
                  and keep an eye on ISR
                  Updates.
                </p>
              </div>

              <Link
                href="/join#community"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 font-bold text-isr-dark-red transition hover:bg-isr-yellow"
              >
                Join the community
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
