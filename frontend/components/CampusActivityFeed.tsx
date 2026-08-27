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
  fetchPrograms,
  formatProgramSchedule,
  type Program,
} from '@/lib/programs'

export type CampusGuideKey =
  | 'city'
  | 'bundoora'
  | 'brunswick'

function normalizeCampus(
  value?: string | null,
): CampusGuideKey | null {
  if (!value) {
    return null
  }

  const normalized =
    value.toLowerCase()

  if (
    normalized.includes(
      'bundoora',
    )
  ) {
    return 'bundoora'
  }

  if (
    normalized.includes(
      'brunswick',
    )
  ) {
    return 'brunswick'
  }

  if (
    normalized.includes(
      'city',
    )
  ) {
    return 'city'
  }

  return null
}

export default function CampusActivityFeed({
  campusKey,
  campusLabel,
}: {
  campusKey: CampusGuideKey
  campusLabel: string
}) {
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
    unavailable,
    setUnavailable,
  ] =
    useState(false)

  useEffect(() => {
    let active =
      true

    Promise.allSettled([
      fetchEvents(
        'upcoming',
      ),
      fetchPrograms(),
    ])
      .then(
        (results) => {
          if (!active) {
            return
          }

          const [
            eventResult,
            programResult,
          ] =
            results

          let success =
            0

          if (
            eventResult.status ===
            'fulfilled'
          ) {
            setEvents(
              eventResult.value,
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

          setUnavailable(
            success === 0,
          )
        },
      )
      .finally(() => {
        if (active) {
          setLoading(
            false,
          )
        }
      })

    return () => {
      active = false
    }
  }, [])

  const campusEvents =
    useMemo(
      () =>
        events
          .filter(
            (event) =>
              normalizeCampus(
                event.campus,
              ) ===
                campusKey &&
              getEventStatus(
                event,
              ) !==
                'completed',
          )
          .slice(
            0,
            3,
          ),
      [
        events,
        campusKey,
      ],
    )

  const campusPrograms =
    useMemo(
      () =>
        programs
          .filter(
            (program) =>
              normalizeCampus(
                program.campusLabel,
              ) ===
                campusKey &&
              program.status ===
                'active' &&
              program.publicationStatus ===
                'published',
          )
          .slice(
            0,
            3,
          ),
      [
        programs,
        campusKey,
      ],
    )

  return (
    <div className="mt-8 border-t border-isr-light-blue/20 pt-7">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-isr-turquoise">
            Campus life
          </p>

          <h3 className="mt-2 text-2xl font-bold text-isr-dark-red">
            What’s on at {campusLabel}
          </h3>
        </div>

        <Link
          href="/events"
          className="isr-text-link"
        >
          View all activities →
        </Link>
      </div>

      {loading && (
        <div className="mt-5 rounded-2xl bg-isr-cream/60 p-5 text-sm text-gray-600">
          Loading campus activities…
        </div>
      )}

      {!loading &&
        unavailable && (
          <div className="mt-5 rounded-2xl border border-isr-light-blue/20 bg-isr-cream/40 p-5">
            <p className="font-bold text-isr-dark-red">
              Campus activity feed is temporarily unavailable.
            </p>

            <p className="mt-2 text-sm leading-relaxed text-gray-700">
              Use What’s On for the full current ISR events and programs listing.
            </p>
          </div>
        )}

      {!loading &&
        !unavailable &&
        campusEvents.length ===
          0 &&
        campusPrograms.length ===
          0 && (
          <div className="mt-5 rounded-2xl border border-isr-light-blue/20 bg-isr-cream/40 p-5">
            <p className="font-bold text-isr-dark-red">
              No current campus-specific activities are listed here.
            </p>

            <p className="mt-2 text-sm leading-relaxed text-gray-700">
              Some ISR activities are open across campuses. Check What’s On for the complete listing.
            </p>
          </div>
        )}

      {!loading &&
        !unavailable &&
        (
          campusEvents.length >
            0 ||
          campusPrograms.length >
            0
        ) && (
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <div>
              <p className="text-sm font-bold text-isr-dark-red">
                Upcoming events
              </p>

              <div className="mt-3 space-y-3">
                {campusEvents.length ===
                  0 && (
                  <p className="rounded-2xl bg-isr-cream/50 p-4 text-sm text-gray-600">
                    No campus-specific upcoming events are currently listed.
                  </p>
                )}

                {campusEvents.map(
                  (event) => {
                    const formatted =
                      formatEventDate(
                        event.date,
                      )

                    return (
                      <Link
                        key={
                          event.id
                        }
                        href={
                          `/events/${event.id}`
                        }
                        className="block rounded-2xl border border-isr-light-blue/20 bg-white p-4 transition hover:border-isr-turquoise/50"
                      >
                        <p className="text-xs font-bold uppercase tracking-wide text-isr-turquoise">
                          {formatted.date}
                        </p>

                        <p className="mt-2 font-bold text-isr-dark-red">
                          {event.name}
                        </p>

                        <p className="mt-1 text-sm text-gray-600">
                          {formatted.time}
                          {event.venue
                            ? ` · ${event.venue}`
                            : ''}
                        </p>
                      </Link>
                    )
                  },
                )}
              </div>
            </div>

            <div>
              <p className="text-sm font-bold text-isr-dark-red">
                Weekly programs
              </p>

              <div className="mt-3 space-y-3">
                {campusPrograms.length ===
                  0 && (
                  <p className="rounded-2xl bg-isr-cream/50 p-4 text-sm text-gray-600">
                    No active campus-specific weekly programs are currently listed.
                  </p>
                )}

                {campusPrograms.map(
                  (program) => (
                    <Link
                      key={
                        program.id
                      }
                      href={
                        `/programs/${program.slug}`
                      }
                      className="block rounded-2xl border border-isr-light-blue/20 bg-white p-4 transition hover:border-isr-turquoise/50"
                    >
                      <p className="text-xs font-bold uppercase tracking-wide text-isr-turquoise">
                        {program.category}
                      </p>

                      <p className="mt-2 font-bold text-isr-dark-red">
                        {program.name}
                      </p>

                      <p className="mt-1 text-sm leading-relaxed text-gray-600">
                        {formatProgramSchedule(
                          program,
                        )}
                      </p>

                      <p className="mt-1 text-sm text-gray-600">
                        {program.venue}
                      </p>
                    </Link>
                  ),
                )}
              </div>
            </div>
          </div>
        )}
    </div>
  )
}
