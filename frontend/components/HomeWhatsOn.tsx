'use client'

import {
  useEffect,
  useMemo,
  useState,
} from 'react'
import Link from 'next/link'
import {
  fetchEvents,
  formatEventDate,
  getEventStatus,
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

type HomeActivity =
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

export default function HomeWhatsOn() {
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

  useEffect(() => {
    let active = true

    Promise.allSettled([
      fetchEvents('upcoming'),
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

          if (
            eventResult.status ===
            'fulfilled'
          ) {
            setEvents(
              eventResult.value,
            )
          }

          if (
            programResult.status ===
            'fulfilled'
          ) {
            setPrograms(
              programResult.value,
            )
          }
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

  const activities =
    useMemo(
      () => {
        const week =
          getCurrentWeekBounds()

        const now =
          Date.now()

        const eventItems:
          HomeActivity[] =
          events
            .filter(
              (
                event,
              ) => {
                const start =
                  new Date(
                    event.date,
                  ).getTime()

                return (
                  start >=
                    now &&
                  start <
                    new Date(
                      week.endExclusiveIso,
                    ).getTime() &&
                  getEventStatus(
                    event,
                  ) !==
                    'completed'
                )
              },
            )
            .map(
              (
                event,
              ) => ({
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
          HomeActivity[] =
          expandProgramOccurrences(
            programs,
            week.today,
            week.endDateKey,
          )
            .filter(
              (
                occurrence,
              ) =>
                new Date(
                  occurrence.start,
                ).getTime() >=
                  now,
            )
            .map(
              (
                occurrence,
              ) => ({
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
          .sort(
            (
              first,
              second,
            ) =>
              first.start -
              second.start,
          )
          .slice(
            0,
            4,
          )
      },
      [
        events,
        programs,
      ],
    )

  return (
    <section className="bg-white px-4 py-14 sm:py-20">
      <div className="container-isr mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="isr-eyebrow text-isr-turquoise">
              What&apos;s On
            </p>

            <h2 className="mt-4 text-3xl font-bold text-isr-dark-red sm:text-4xl">
              This week at ISR
            </h2>

            <p className="mt-3 max-w-2xl text-gray-700">
              One-off events and the regular weekly programs
              that are happening around campus.
            </p>
          </div>

          <Link
            href="/events"
            className="isr-text-link"
          >
            View everything →
          </Link>
        </div>

        {loading ? (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[1, 2, 3, 4].map(
              (
                item,
              ) => (
                <div
                  key={
                    item
                  }
                  className="h-44 animate-pulse rounded-3xl bg-isr-cream"
                />
              ),
            )}
          </div>
        ) : activities.length >
          0 ? (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {activities.map(
              (
                item,
              ) => {
                if (
                  item.type ===
                  'event'
                ) {
                  const formatted =
                    formatEventDate(
                      item.event
                        .date,
                    )

                  return (
                    <Link
                      key={
                        item.key
                      }
                      href={
                        '/events/' +
                        item.event
                          .id
                      }
                      className="isr-card isr-card-interactive p-5 sm:p-6"
                    >
                      <span className="rounded-full bg-isr-dark-red px-3 py-1.5 text-xs font-bold text-white">
                        Event
                      </span>

                      <p className="mt-4 text-sm font-bold text-isr-turquoise">
                        {formatted.date}
                        {' · '}
                        {formatted.time}
                      </p>

                      <h3 className="mt-2 text-xl font-bold text-isr-dark-red">
                        {item.event.name}
                      </h3>

                      {item.event
                        .campus && (
                        <p className="mt-3 text-sm text-gray-600">
                          {
                            item.event
                              .campus
                          }
                        </p>
                      )}
                    </Link>
                  )
                }

                const occurrence =
                  item.occurrence

                const program =
                  occurrence.program

                return (
                  <Link
                    key={
                      item.key
                    }
                    href={
                      '/programs/' +
                      program.slug
                    }
                    className="isr-card isr-card-interactive p-5 sm:p-6"
                  >
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

                    <p className="mt-4 text-sm font-bold text-isr-turquoise">
                      {formatOccurrenceDate(
                        occurrence,
                      )}
                      {' · '}
                      {formatProgramClock(
                        program.startTime,
                      )}
                    </p>

                    <h3 className="mt-2 text-xl font-bold text-isr-dark-red">
                      {program.name}
                    </h3>

                    <p className="mt-3 text-sm font-semibold text-gray-700">
                      {getProgramRegistrationLabel(
                        program,
                      )}
                    </p>

                    <p className="mt-2 text-sm text-gray-600">
                      {
                        program
                          .campusLabel
                      }
                      {' · '}
                      {
                        occurrence
                          .venue
                      }
                    </p>
                  </Link>
                )
              },
            )}
          </div>
        ) : (
          <div className="mt-8 rounded-3xl bg-isr-cream/65 p-8 text-center">
            <h3 className="text-xl font-bold text-isr-dark-red">
              Nothing else is listed this week
            </h3>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-gray-700">
              Browse the full What&apos;s On page for upcoming
              events and recurring programs.
            </p>

            <Link
              href="/events"
              className="isr-text-link mt-5"
            >
              What&apos;s On →
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
