'use client'

import Link from 'next/link'
import {
  useEffect,
  useMemo,
  useState,
} from 'react'

import {
  fetchPrayerTimes,
  getNextPrayer,
  type DailyPrayer,
  type PrayerTimesData,
} from '@/lib/prayerTimes'

import {
  fetchEvents,
  formatEventDate,
  getEventStatus,
  type Event,
} from '@/lib/events'

import {
  fetchAnnouncements,
  type Announcement,
} from '@/lib/announcements'

type LoadState =
  'loading' |
  'ready' |
  'partial'

function campusMatches(
  event: Event,
  campus: string,
): boolean {
  return (
    event.campus ?? ''
  )
    .toLowerCase()
    .includes(
      campus.toLowerCase(),
    )
}

function findNextEvent(
  events: Event[],
  preferredCampus:
    string | null,
): Event | null {
  const now =
    Date.now()

  const candidates =
    [...events]
      .filter(
        (
          event,
        ) => {
          const status =
            getEventStatus(
              event,
            )

          return (
            new Date(
              event.date,
            ).getTime() >=
              now &&
            status !==
              'cancelled' &&
            status !==
              'completed'
          )
        },
      )
      .sort(
        (
          first,
          second,
        ) =>
          new Date(
            first.date,
          ).getTime() -
          new Date(
            second.date,
          ).getTime(),
      )

  if (
    preferredCampus
  ) {
    const campusEvent =
      candidates.find(
        (
          event,
        ) =>
          campusMatches(
            event,
            preferredCampus,
          ),
      )

    if (campusEvent) {
      return campusEvent
    }
  }

  return (
    candidates[0] ??
    null
  )
}

function pickUpdate(
  updates: Announcement[],
): Announcement | null {
  return (
    updates.find(
      (
        update,
      ) =>
        update.priority ===
        'urgent',
    ) ??
    updates.find(
      (
        update,
      ) =>
        update.pinned,
    ) ??
    updates[0] ??
    null
  )
}

export default function HomeStudentDashboard() {
  const [
    prayer,
    setPrayer,
  ] =
    useState<PrayerTimesData | null>(
      null,
    )

  const [
    nextPrayer,
    setNextPrayer,
  ] =
    useState<DailyPrayer>(
      'Fajr',
    )

  const [
    events,
    setEvents,
  ] =
    useState<Event[]>(
      [],
    )

  const [
    preferredCampus,
    setPreferredCampus,
  ] =
    useState<string | null>(
      null,
    )

  const [
    updates,
    setUpdates,
  ] =
    useState<Announcement[]>(
      [],
    )

  const [
    state,
    setState,
  ] =
    useState<LoadState>(
      'loading',
    )

  useEffect(
    () => {
      let active =
        true

      Promise.allSettled([
        fetchPrayerTimes(),
        fetchEvents(),
        fetchAnnouncements(),
      ])
        .then(
          (
            results,
          ) => {
            if (!active) {
              return
            }

            const [
              prayerResult,
              eventsResult,
              updatesResult,
            ] =
              results

            let success =
              0

            if (
              prayerResult.status ===
              'fulfilled'
            ) {
              setPrayer(
                prayerResult.value,
              )

              setNextPrayer(
                getNextPrayer(
                  prayerResult
                    .value
                    .timings,
                ),
              )

              success +=
                1
            }

            if (
              eventsResult.status ===
              'fulfilled'
            ) {
              setEvents(
                eventsResult.value,
              )

              success +=
                1
            }

            if (
              updatesResult.status ===
              'fulfilled'
            ) {
              setUpdates(
                updatesResult.value,
              )

              success +=
                1
            }

            setState(
              success ===
                3
                ? 'ready'
                : 'partial',
            )
          },
        )

      return () => {
        active =
          false
      }
    },
    [],
  )

  useEffect(() => {
    const storageKey =
      'isr-preferred-campus-v1'

    const saved =
      window.localStorage.getItem(
        storageKey,
      )

    if (
      saved === 'City' ||
      saved === 'Bundoora' ||
      saved === 'Brunswick'
    ) {
      setPreferredCampus(
        saved,
      )
    }

    const handleCampusChange: EventListener =
      (event) => {
      const campusEvent =
        event as
          CustomEvent<
            string | null
          >

      setPreferredCampus(
        campusEvent.detail,
      )
    }

    window.addEventListener(
      'isr:campus:change',
      handleCampusChange,
    )

    return () => {
      window.removeEventListener(
        'isr:campus:change',
        handleCampusChange,
      )
    }
  }, [])
  const nextEvent =
    useMemo(
      () =>
        findNextEvent(
          events,
          preferredCampus,
        ),
      [
        events,
        preferredCampus,
      ],
    )

  const currentUpdate =
    useMemo(
      () =>
        pickUpdate(
          updates,
        ),
      [
        updates,
      ],
    )

  return (
    <section
      aria-labelledby="student-dashboard-heading"
      className="isr-home-dashboard-section"
    >
      <div className="container-isr mx-auto max-w-6xl px-4">
        <div className="isr-home-dashboard-shell">
          <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-isr-turquoise">
                Your ISR dashboard
              </p>

              <h2
                id="student-dashboard-heading"
                className="mt-3 text-3xl font-bold tracking-tight text-isr-dark-red sm:text-4xl"
              >
                The essentials at a glance
              </h2>

              <p className="mt-4 max-w-xl leading-relaxed text-gray-700">
                Prayer, the next listed event and important
                ISR information without having to search
                across the website.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <Link
                href="/find"
                className="isr-dashboard-top-action"
              >
                <span>
                  Search ISR
                </span>

                <span
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>

              <Link
                href="/campuses"
                className="isr-dashboard-top-action"
              >
                <span>
                  Campus guide
                </span>

                <span
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>

              <Link
                href="/student-guide"
                className="isr-dashboard-top-action"
              >
                <span>
                  Student Guide
                </span>

                <span
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </div>
          </div>

          {state ===
            'loading' ? (
            <div
              aria-live="polite"
              className="mt-8 grid gap-4 md:grid-cols-3"
            >
              {[0, 1, 2].map(
                (
                  item,
                ) => (
                  <div
                    key={
                      item
                    }
                    className="h-48 animate-pulse rounded-3xl bg-white/75"
                  />
                ),
              )}
            </div>
          ) : (
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              <article className="isr-dashboard-card">
                <div className="flex items-center justify-between gap-3">
                  <p className="isr-dashboard-label">
                    Next prayer
                  </p>

                  <span
                    aria-hidden="true"
                    className="text-xl"
                  >
                    ◐
                  </span>
                </div>

                {prayer ? (
                  <>
                    <p className="mt-5 text-3xl font-bold text-isr-dark-red">
                      {nextPrayer}
                    </p>

                    <p className="mt-1 text-2xl font-semibold text-isr-turquoise">
                      {
                        prayer
                          .timings[
                          nextPrayer
                        ]
                      }
                    </p>

                    <p className="mt-4 text-xs leading-relaxed text-gray-500">
                      Prayer-time reference for
                      Melbourne. This is not a
                      congregational iqamah time.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="mt-5 font-bold text-isr-dark-red">
                      Prayer information unavailable
                    </p>

                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      Open the prayer page for
                      locations and other information.
                    </p>
                  </>
                )}

                <Link
                  href="/pray"
                  className="isr-text-link mt-auto pt-6"
                >
                  Pray at RMIT
                  <span aria-hidden="true">
                    →
                  </span>
                </Link>
              </article>

              <article className="isr-dashboard-card">
                <div className="flex items-center justify-between gap-3">
                  <p className="isr-dashboard-label">
                    {preferredCampus
                      ? preferredCampus +
                        ' next event'
                      : 'Next event'}
                  </p>

                  <span
                    aria-hidden="true"
                    className="text-xl"
                  >
                    ◇
                  </span>
                </div>

                {nextEvent ? (
                  <>
                    <p className="mt-5 text-xl font-bold leading-snug text-isr-dark-red">
                      {
                        nextEvent.name
                      }
                    </p>

                    <p className="mt-3 text-sm font-semibold text-isr-turquoise">
                      {
                        formatEventDate(
                          nextEvent.date,
                        ).date
                      }
                    </p>

                    {nextEvent.campus && (
                      <p className="mt-2 text-sm text-gray-600">
                        {
                          nextEvent.campus
                        }
                      </p>
                    )}

                    <Link
                      href={
                        '/events/' +
                        nextEvent.id
                      }
                      className="isr-text-link mt-auto pt-6"
                    >
                      View event
                      <span aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </>
                ) : (
                  <>
                    <p className="mt-5 font-bold text-isr-dark-red">
                      No upcoming event displayed
                    </p>

                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      Check the full ISR events
                      directory for current listings.
                    </p>

                    <Link
                      href="/events"
                      className="isr-text-link mt-auto pt-6"
                    >
                      Browse events
                      <span aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </>
                )}
              </article>

              <article className="isr-dashboard-card">
                <div className="flex items-center justify-between gap-3">
                  <p className="isr-dashboard-label">
                    ISR update
                  </p>

                  <span
                    aria-hidden="true"
                    className="text-xl"
                  >
                    ◉
                  </span>
                </div>

                {currentUpdate ? (
                  <>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {currentUpdate.priority ===
                        'urgent' && (
                        <span className="rounded-full bg-red-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-red-800">
                          Urgent
                        </span>
                      )}

                      {currentUpdate.pinned && (
                        <span className="rounded-full bg-isr-turquoise/10 px-2.5 py-1 text-[11px] font-bold text-isr-turquoise">
                          Pinned
                        </span>
                      )}
                    </div>

                    <p className="mt-3 text-xl font-bold leading-snug text-isr-dark-red">
                      {
                        currentUpdate.title
                      }
                    </p>

                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-gray-600">
                      {
                        currentUpdate.body
                      }
                    </p>

                    <Link
                      href={
                        '/updates#update-' +
                        currentUpdate.id
                      }
                      className="isr-text-link mt-auto pt-6"
                    >
                      Read update
                      <span aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </>
                ) : (
                  <>
                    <p className="mt-5 font-bold text-isr-dark-red">
                      No current update displayed
                    </p>

                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      Published ISR notices will
                      appear in the updates area.
                    </p>

                    <Link
                      href="/updates"
                      className="isr-text-link mt-auto pt-6"
                    >
                      ISR Updates
                      <span aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </>
                )}
              </article>
            </div>
          )}

          {state ===
            'partial' && (
            <p
              role="status"
              className="mt-5 text-xs leading-relaxed text-gray-500"
            >
              Some live information could not be
              loaded. Available ISR information is
              still shown above.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
