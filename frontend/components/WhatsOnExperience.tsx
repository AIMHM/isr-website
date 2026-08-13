'use client'

import {
  useEffect,
  useMemo,
  useState,
} from 'react'
import Link from 'next/link'
import EventCard from '@/components/EventCard'
import ProgramCard from '@/components/ProgramCard'
import {
  fetchEvents,
  formatEventDate,
  getEventRegistrationLabel,
  getEventRegistrationMode,
  getEventStatus,
  sortEventsForDisplay,
  type Event,
} from '@/lib/events'
import {
  expandProgramOccurrences,
  fetchPrograms,
  formatOccurrenceDate,
  formatProgramClock,
  getCurrentWeekBounds,
  getProgramRegistrationLabel,
  type Program,
  type ProgramOccurrence,
} from '@/lib/programs'
import {
  IS_LOCAL_ADMIN_MODE,
} from '@/lib/localAdminMode'

type View =
  | 'week'
  | 'events'
  | 'programs'
  | 'past'

const VIEWS: {
  value: View
  label: string
}[] = [
  {
    value:
      'week',
    label:
      'This Week',
  },
  {
    value:
      'events',
    label:
      'Events',
  },
  {
    value:
      'programs',
    label:
      'Weekly Programs',
  },
  {
    value:
      'past',
    label:
      'Past Events',
  },
]

type WeekItem =
  | {
      type: 'event'
      key: string
      start: number
      event: Event
    }
  | {
      type: 'program'
      key: string
      start: number
      occurrence:
        ProgramOccurrence
    }

function searchableEvent(
  event: Event,
): string {
  return [
    event.name,
    event.description,
    event.venue,
    event.campus,
    event.audience,
    event.category,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}

function searchableProgram(
  program: Program,
): string {
  return [
    program.name,
    program.summary,
    program.description,
    program.venue,
    program.campusLabel,
    program.audience,
    program.category,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}

function WeekEventRow({
  event,
}: {
  event: Event
}) {
  const formatted =
    formatEventDate(
      event.date,
    )

  const registrationMode =
    getEventRegistrationMode(
      event,
    )

  return (
    <article className="rounded-3xl border border-isr-light-blue/20 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-[150px_1fr_auto] sm:items-center">
        <div>
          <span className="rounded-full bg-isr-dark-red px-3 py-1.5 text-xs font-bold text-white">
            Event
          </span>

          <p className="mt-3 text-sm font-bold text-isr-turquoise">
            {formatted.date}
          </p>

          <p className="mt-1 text-sm text-gray-600">
            {formatted.time}
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-isr-dark-red">
            {event.name}
          </h3>

          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
            {event.campus && (
              <span>
                {event.campus}
              </span>
            )}

            {event.venue && (
              <span>
                {event.venue}
              </span>
            )}
          </div>

          {registrationMode !==
            'unknown' && (
            <p className="mt-3 text-sm font-semibold text-gray-700">
              {getEventRegistrationLabel(
                event,
              )}
            </p>
          )}
        </div>

        <Link
          href={
            '/events/' +
            event.id
          }
          className="isr-button-secondary text-sm"
        >
          Details
        </Link>
      </div>
    </article>
  )
}

function WeekProgramRow({
  occurrence,
}: {
  occurrence:
    ProgramOccurrence
}) {
  const program =
    occurrence.program

  return (
    <article
      className={
        'rounded-3xl border bg-white p-5 shadow-sm sm:p-6 ' +
        (
          occurrence.status ===
            'cancelled'
            ? 'border-red-200'
            : 'border-isr-turquoise/25'
        )
      }
    >
      <div className="grid gap-5 sm:grid-cols-[150px_1fr_auto] sm:items-center">
        <div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-isr-turquoise/10 px-3 py-1.5 text-xs font-bold text-isr-turquoise">
              Weekly program
            </span>

            {program.localDemo && (
              <span className="rounded-full bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-900">
                Local demo
              </span>
            )}
          </div>

          <p className="mt-3 text-sm font-bold text-isr-dark-red">
            {formatOccurrenceDate(
              occurrence,
            )}
          </p>

          <p className="mt-1 text-sm text-gray-600">
            {formatProgramClock(
              program.startTime,
            )}
          </p>
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-bold text-isr-dark-red">
              {program.name}
            </h3>

            {occurrence.status ===
              'cancelled' && (
              <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-800">
                Cancelled
              </span>
            )}
          </div>

          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
            <span>
              {program.campusLabel}
            </span>

            <span>
              {occurrence.venue}
            </span>

            <span>
              {program.audience}
            </span>
          </div>

          <p className="mt-3 text-sm font-semibold text-isr-dark-red">
            {getProgramRegistrationLabel(
              program,
            )}
          </p>

          {occurrence.note && (
            <p className="mt-3 rounded-xl bg-isr-yellow/30 px-4 py-3 text-sm font-semibold text-isr-dark-red">
              {occurrence.note}
            </p>
          )}
        </div>

        <Link
          href={
            '/programs/' +
            program.slug
          }
          className="isr-button-secondary text-sm"
        >
          Details
        </Link>
      </div>
    </article>
  )
}

export default function WhatsOnExperience() {
  const [
    view,
    setView,
  ] =
    useState<View>(
      'week',
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
    programs,
    setPrograms,
  ] =
    useState<Program[]>([])

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

  useEffect(() => {
    let active = true

    Promise.allSettled([
      fetchEvents('all'),
      fetchPrograms(),
    ])
      .then(
        (
          results,
        ) => {
          if (!active) {
            return
          }

          const [
            eventResult,
            programResult,
          ] =
            results

          let success = 0

          if (
            eventResult.status ===
            'fulfilled'
          ) {
            setEvents(
              sortEventsForDisplay(
                eventResult.value,
              ),
            )

            success += 1
          }

          if (
            programResult.status ===
            'fulfilled'
          ) {
            setPrograms(
              programResult.value,
            )

            success += 1
          }

          setError(
            success === 0,
          )
        },
      )
      .finally(() => {
        if (active) {
          setLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [])

  const normalizedSearch =
    search
      .trim()
      .toLowerCase()

  const campusOptions =
    useMemo(
      () =>
        Array.from(
          new Set([
            ...events
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

            ...programs.map(
              (program) =>
                program.campusLabel,
            ),
          ]),
        ).sort(),
      [
        events,
        programs,
      ],
    )

  const visiblePrograms =
    useMemo(
      () =>
        programs.filter(
          (program) => {
            const campusMatch =
              campus ===
                'all' ||
              program.campusLabel ===
                campus

            const searchMatch =
              !normalizedSearch ||
              searchableProgram(
                program,
              ).includes(
                normalizedSearch,
              )

            return (
              campusMatch &&
              searchMatch &&
              program.status ===
                'active'
            )
          },
        ),
      [
        programs,
        campus,
        normalizedSearch,
      ],
    )

  const visibleUpcomingEvents =
    useMemo(
      () =>
        events.filter(
          (event) => {
            const status =
              getEventStatus(
                event,
              )

            const campusMatch =
              campus ===
                'all' ||
              event.campus ===
                campus

            const searchMatch =
              !normalizedSearch ||
              searchableEvent(
                event,
              ).includes(
                normalizedSearch,
              )

            return (
              status !==
                'completed' &&
              campusMatch &&
              searchMatch
            )
          },
        ),
      [
        events,
        campus,
        normalizedSearch,
      ],
    )

  const visiblePastEvents =
    useMemo(
      () =>
        events.filter(
          (event) => {
            const campusMatch =
              campus ===
                'all' ||
              event.campus ===
                campus

            const searchMatch =
              !normalizedSearch ||
              searchableEvent(
                event,
              ).includes(
                normalizedSearch,
              )

            return (
              getEventStatus(
                event,
              ) ===
                'completed' &&
              campusMatch &&
              searchMatch
            )
          },
        ),
      [
        events,
        campus,
        normalizedSearch,
      ],
    )

  const weekItems =
    useMemo(
      () => {
        const week =
          getCurrentWeekBounds()

        const now =
          Date.now()

        const eventItems:
          WeekItem[] =
          events
            .filter(
              (event) => {
                const start =
                  new Date(
                    event.date,
                  ).getTime()

                const status =
                  getEventStatus(
                    event,
                  )

                return (
                  start >=
                    Math.max(
                      new Date(
                        week.startIso,
                      ).getTime(),
                      now,
                    ) &&
                  start <
                    new Date(
                      week.endExclusiveIso,
                    ).getTime() &&
                  status !==
                    'completed'
                )
              },
            )
            .map(
              (event) => ({
                type:
                  'event' as const,

                key:
                  'event-' +
                  event.id,

                start:
                  new Date(
                    event.date,
                  ).getTime(),

                event,
              }),
            )

        const programItems:
          WeekItem[] =
          expandProgramOccurrences(
            programs,
            week.today,
            week.endDateKey,
          )
            .filter(
              (occurrence) =>
                new Date(
                  occurrence.start,
                ).getTime() >=
                now,
            )
            .map(
              (occurrence) => ({
                type:
                  'program' as const,

                key:
                  'program-' +
                  occurrence.id,

                start:
                  new Date(
                    occurrence.start,
                  ).getTime(),

                occurrence,
              }),
            )

        return [
          ...eventItems,
          ...programItems,
        ]
          .filter(
            (item) => {
              if (
                item.type ===
                'event'
              ) {
                const campusMatch =
                  campus ===
                    'all' ||
                  item.event
                    .campus ===
                    campus

                const searchMatch =
                  !normalizedSearch ||
                  searchableEvent(
                    item.event,
                  ).includes(
                    normalizedSearch,
                  )

                return (
                  campusMatch &&
                  searchMatch
                )
              }

              const program =
                item.occurrence
                  .program

              const campusMatch =
                campus ===
                  'all' ||
                program
                  .campusLabel ===
                  campus

              const searchMatch =
                !normalizedSearch ||
                searchableProgram(
                  program,
                ).includes(
                  normalizedSearch,
                )

              return (
                campusMatch &&
                searchMatch
              )
            },
          )
          .sort(
            (
              first,
              second,
            ) =>
              first.start -
              second.start,
          )
      },
      [
        events,
        programs,
        campus,
        normalizedSearch,
      ],
    )

  const hasFilters =
    Boolean(
      normalizedSearch,
    ) ||
    campus !==
      'all'

  return (
    <>
      <section className="isr-page-hero bg-isr-dark-red px-4 py-14 text-white sm:py-20">
        <div className="container-isr mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="isr-eyebrow text-isr-yellow">
              What&apos;s On
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Events and regular life at ISR
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/80 sm:text-xl">
              Find one-off events alongside the weekly
              halaqas, workshops and regular programs
              that keep Muslim student life moving.
            </p>
          </div>
        </div>
      </section>

      {IS_LOCAL_ADMIN_MODE && (
        <section className="border-b border-amber-200 bg-amber-50 px-4 py-4">
          <div className="container-isr mx-auto max-w-7xl">
            <p className="text-sm font-semibold leading-relaxed text-amber-900">
              Local preview: recurring Programs currently use
              demo data so the Website 2.0 experience can be
              tested safely. These program details are not
              public ISR claims and will not appear in production.
            </p>
          </div>
        </section>
      )}

      <section className="border-b border-isr-light-blue/20 bg-white px-4 py-5">
        <div className="container-isr mx-auto max-w-7xl">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {VIEWS.map(
              (
                item,
              ) => (
                <button
                  key={
                    item.value
                  }
                  type="button"
                  onClick={() =>
                    setView(
                      item.value,
                    )
                  }
                  aria-pressed={
                    view ===
                    item.value
                  }
                  className={
                    'whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold transition ' +
                    (
                      view ===
                        item.value
                        ? 'bg-isr-dark-red text-white'
                        : 'bg-isr-cream text-isr-dark-red hover:bg-isr-light-blue/20'
                    )
                  }
                >
                  {item.label}
                </button>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="bg-isr-cream/45 px-4 py-10 sm:py-14">
        <div className="container-isr mx-auto max-w-7xl">
          <div className="rounded-3xl border border-isr-light-blue/20 bg-white p-4 shadow-sm sm:p-5">
            <div className="grid gap-3 md:grid-cols-[1fr_260px_auto]">
              <div>
                <label
                  htmlFor="whats-on-search"
                  className="sr-only"
                >
                  Search what&apos;s on
                </label>

                <input
                  id="whats-on-search"
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
                  placeholder="Search halaqa, workshop, venue, audience..."
                  className="min-h-12 w-full rounded-xl border border-isr-light-blue/30 bg-white px-4 text-sm outline-none transition focus:border-isr-turquoise"
                />
              </div>

              <div>
                <label
                  htmlFor="whats-on-campus"
                  className="sr-only"
                >
                  Filter by campus
                </label>

                <select
                  id="whats-on-campus"
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

                  {campusOptions.map(
                    (
                      item,
                    ) => (
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
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {[1, 2, 3, 4].map(
                (
                  item,
                ) => (
                  <div
                    key={
                      item
                    }
                    className="h-72 animate-pulse rounded-3xl bg-white"
                  />
                ),
              )}
            </div>
          )}

          {!loading &&
            error && (
            <div className="mt-8 rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
              <h2 className="text-xl font-bold text-red-800">
                What&apos;s On could not be loaded
              </h2>

              <p className="mt-3 text-sm text-red-700">
                Refresh the page or check ISR Updates.
              </p>
            </div>
          )}

          {!loading &&
            !error &&
            view ===
              'week' && (
            <section
              className="mt-9"
              aria-labelledby="this-week-heading"
            >
              <p className="isr-eyebrow text-isr-turquoise">
                Right now
              </p>

              <h2
                id="this-week-heading"
                className="mt-3 text-3xl font-bold text-isr-dark-red"
              >
                This week at ISR
              </h2>

              <p className="mt-3 max-w-2xl leading-relaxed text-gray-700">
                One chronological view of upcoming events
                and regular programs for the rest of this week.
              </p>

              {weekItems.length >
                0 ? (
                <div className="mt-7 space-y-4">
                  {weekItems.map(
                    (
                      item,
                    ) =>
                      item.type ===
                      'event' ? (
                        <WeekEventRow
                          key={
                            item.key
                          }
                          event={
                            item.event
                          }
                        />
                      ) : (
                        <WeekProgramRow
                          key={
                            item.key
                          }
                          occurrence={
                            item.occurrence
                          }
                        />
                      ),
                  )}
                </div>
              ) : (
                <div className="mt-7 rounded-3xl bg-white p-8 text-center">
                  <h3 className="text-xl font-bold text-isr-dark-red">
                    Nothing else is listed this week
                  </h3>

                  <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-gray-700">
                    Browse upcoming events or weekly programs
                    for activities outside the current week.
                  </p>
                </div>
              )}
            </section>
          )}

          {!loading &&
            !error &&
            view ===
              'events' && (
            <section className="mt-9">
              <p className="isr-eyebrow text-isr-turquoise">
                One-off activities
              </p>

              <h2 className="mt-3 text-3xl font-bold text-isr-dark-red">
                Upcoming events
              </h2>

              {visibleUpcomingEvents.length >
                0 ? (
                <div className="mt-7 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {visibleUpcomingEvents.map(
                    (
                      event,
                    ) => (
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
              ) : (
                <div className="mt-7 rounded-3xl bg-white p-8 text-center">
                  <h3 className="text-xl font-bold text-isr-dark-red">
                    No upcoming events match
                  </h3>

                  <p className="mt-3 text-sm text-gray-700">
                    Try clearing the filters or check weekly programs.
                  </p>
                </div>
              )}
            </section>
          )}

          {!loading &&
            !error &&
            view ===
              'programs' && (
            <section
              id="programs"
              className="mt-9"
            >
              <p className="isr-eyebrow text-isr-turquoise">
                Regular at ISR
              </p>

              <h2 className="mt-3 text-3xl font-bold text-isr-dark-red">
                Weekly programs
              </h2>

              <p className="mt-3 max-w-2xl leading-relaxed text-gray-700">
                Halaqas, workshops and recurring activities
                students can build into their normal university week.
              </p>

              {visiblePrograms.length >
                0 ? (
                <div className="mt-7 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {visiblePrograms.map(
                    (
                      program,
                    ) => (
                      <ProgramCard
                        key={
                          program.id
                        }
                        program={
                          program
                        }
                      />
                    ),
                  )}
                </div>
              ) : (
                <div className="mt-7 rounded-3xl bg-white p-8 text-center">
                  <h3 className="text-xl font-bold text-isr-dark-red">
                    No weekly programs are currently listed
                  </h3>

                  <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-gray-700">
                    Confirmed recurring ISR programs will appear
                    here once the Programs backend is connected.
                  </p>
                </div>
              )}
            </section>
          )}

          {!loading &&
            !error &&
            view ===
              'past' && (
            <section className="mt-9">
              <p className="isr-eyebrow text-isr-turquoise">
                Archive
              </p>

              <h2 className="mt-3 text-3xl font-bold text-isr-dark-red">
                Past events
              </h2>

              {visiblePastEvents.length >
                0 ? (
                <div className="mt-7 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {visiblePastEvents.map(
                    (
                      event,
                    ) => (
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
              ) : (
                <div className="mt-7 rounded-3xl bg-white p-8 text-center">
                  <h3 className="text-xl font-bold text-isr-dark-red">
                    No past events match
                  </h3>
                </div>
              )}
            </section>
          )}
        </div>
      </section>
    </>
  )
}
