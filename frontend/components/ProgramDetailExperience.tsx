'use client'

import {
  useEffect,
  useMemo,
  useState,
} from 'react'
import Link from 'next/link'
import {
  addDaysToDateKey,
  expandProgramOccurrences,
  fetchProgramBySlug,
  formatOccurrenceDate,
  formatProgramClock,
  formatProgramSchedule,
  getMelbourneDateKey,
  getNextProgramOccurrence,
  getProgramRegistrationLabel,
  type Program,
} from '@/lib/programs'

export default function ProgramDetailExperience({
  slug,
  initialProgram,
}: {
  slug: string
  initialProgram?: Program
}) {
  const [
    program,
    setProgram,
  ] =
    useState<Program | null>(
      initialProgram ??
      null,
    )

  const [
    loading,
    setLoading,
  ] =
    useState(
      initialProgram ===
        undefined,
    )

  const [
    error,
    setError,
  ] =
    useState(false)

  useEffect(() => {
    if (
      initialProgram
    ) {
      return
    }

    let active =
      true

    fetchProgramBySlug(
      slug,
    )
      .then(
        (
          data,
        ) => {
          if (active) {
            setProgram(
              data,
            )
          }
        },
      )
      .catch(() => {
        if (active) {
          setError(true)
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false)
        }
      })

    return () => {
      active =
        false
    }
  }, [
    slug,
    initialProgram,
  ])

  const upcoming =
    useMemo(
      () => {
        if (!program) {
          return []
        }

        const start =
          getMelbourneDateKey()

        const end =
          addDaysToDateKey(
            start,
            35,
          )

        return expandProgramOccurrences(
          [
            program,
          ],
          start,
          end,
        ).slice(
          0,
          5,
        )
      },
      [
        program,
      ],
    )

  const next =
    useMemo(
      () =>
        program
          ? getNextProgramOccurrence(
              [
                program,
              ],
            )
          : null,
      [
        program,
      ],
    )

  if (loading) {
    return (
      <main
        id="main-content"
        className="px-4 py-16"
      >
        <span className="sr-only">
          Loading program
        </span>

        <div className="container-isr mx-auto max-w-5xl">
          <div className="h-80 animate-pulse rounded-3xl bg-isr-cream" />
        </div>
      </main>
    )
  }

  if (
    error ||
    !program
  ) {
    return (
      <main
        id="main-content"
        className="px-4 py-20"
      >
        <div className="container-isr mx-auto max-w-3xl text-center">
          <p className="isr-eyebrow mx-auto text-isr-turquoise">
            Program unavailable
          </p>

          <h1 className="mt-4 text-4xl font-bold text-isr-dark-red">
            We couldn&apos;t load this program
          </h1>

          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-gray-700">
            The program may no longer be available, or its
            information may be temporarily unavailable.
          </p>

          <Link
            href="/events"
            className="isr-button-primary mt-7"
          >
            Back to What&apos;s On
          </Link>
        </div>
      </main>
    )
  }

  const registrationAvailable =
    program.status ===
      'active' &&
    program.registrationMode !==
      'none' &&
    Boolean(
      program.registrationUrl,
    )

  const registrationBlock =
    registrationAvailable &&
    program.registrationUrl ? (
      <a
        href={
          program.registrationUrl
        }
        target="_blank"
        rel="noopener noreferrer"
        className="isr-button-primary w-full"
      >
        Register for this program
      </a>
    ) : program.registrationMode ===
        'none' &&
      program.status ===
        'active' ? (
      <p className="rounded-xl bg-isr-turquoise/10 px-5 py-3 text-center text-sm font-bold text-isr-dark-red">
        No registration required — just attend.
      </p>
    ) : null

  const statusLabel =
    program.status ===
      'active'
      ? 'Active program'
      : program.status ===
          'paused'
        ? 'Program paused'
        : 'Program ended'

  return (
    <main id="main-content">
      <section className="bg-isr-dark-red px-4 py-14 text-white sm:py-20">
        <div className="container-isr mx-auto max-w-6xl">
          <Link
            href="/events"
            className="font-bold text-isr-yellow"
          >
            ← What&apos;s On
          </Link>

          <div className="mt-8 max-w-4xl">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold">
                Regular program
              </span>

              <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold">
                {program.category}
              </span>

              <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold">
                {statusLabel}
              </span>

              {program.localDemo && (
                <span className="rounded-full bg-isr-yellow px-3 py-1.5 text-xs font-bold text-isr-dark-red">
                  Local demo
                </span>
              )}
            </div>

            <h1 className="mt-5 break-words text-4xl font-bold leading-tight sm:text-5xl">
              {program.name}
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/80">
              {program.summary}
            </p>

            <div className="mt-6 max-w-md lg:hidden">
              {registrationBlock}
            </div>
          </div>
        </div>
      </section>

      {program.localDemo && (
        <section className="border-b border-amber-200 bg-amber-50 px-4 py-4">
          <div className="container-isr mx-auto max-w-6xl">
            <p className="text-sm font-semibold text-amber-900">
              This is local development data used to test
              recurring Programs. It is not published ISR
              program information.
            </p>
          </div>
        </section>
      )}

      <section className="px-4 py-12 sm:py-16">
        <div className="container-isr mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            {next ? (
              <section className="rounded-3xl border border-isr-turquoise/25 bg-isr-cream/40 p-6 sm:p-8">
                <p className="isr-eyebrow text-isr-turquoise">
                  Next session
                </p>

                <h2 className="mt-3 text-2xl font-bold text-isr-dark-red">
                  {formatOccurrenceDate(
                    next,
                  )}
                </h2>

                <p className="mt-3 font-semibold text-isr-turquoise">
                  {formatProgramClock(
                    program.startTime,
                  )}
                  {' – '}
                  {formatProgramClock(
                    program.endTime,
                  )}
                </p>

                <p className="mt-2 text-gray-700">
                  {next.venue}
                </p>

                {next.note && (
                  <p className="mt-5 rounded-xl bg-isr-yellow/35 p-4 text-sm font-semibold text-isr-dark-red">
                    {next.note}
                  </p>
                )}
              </section>
            ) : (
              <section className="rounded-3xl border border-isr-light-blue/20 bg-isr-cream/40 p-6 sm:p-8">
                <p className="isr-eyebrow text-isr-turquoise">
                  Next session
                </p>

                <h2 className="mt-3 text-xl font-bold text-isr-dark-red">
                  No upcoming session is currently listed
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-gray-700">
                  Check What&apos;s On or ISR Updates for
                  current activity information.
                </p>
              </section>
            )}

            <section className="mt-8">
              <h2 className="text-2xl font-bold text-isr-dark-red">
                About this program
              </h2>

              <p className="mt-4 whitespace-pre-line break-words leading-relaxed text-gray-700">
                {program.description}
              </p>
            </section>

            <section className="mt-9">
              <h2 className="text-2xl font-bold text-isr-dark-red">
                Upcoming sessions
              </h2>

              {upcoming.length >
              0 ? (
                <div className="mt-5 space-y-3">
                  {upcoming.map(
                    (
                      occurrence,
                    ) => (
                      <article
                        key={
                          occurrence.id
                        }
                        className={
                          'rounded-2xl border p-5 ' +
                          (
                            occurrence.status ===
                              'cancelled'
                              ? 'border-red-200 bg-red-50'
                              : 'border-isr-light-blue/20 bg-white'
                          )
                        }
                      >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <p className="font-bold text-isr-dark-red">
                              {formatOccurrenceDate(
                                occurrence,
                              )}
                            </p>

                            <p className="mt-1 text-sm text-gray-600">
                              {occurrence.venue}
                            </p>
                          </div>

                          <p className="text-sm font-semibold text-isr-turquoise">
                            {occurrence.status ===
                              'cancelled'
                              ? 'Cancelled'
                              : formatProgramClock(
                                  program.startTime,
                                )}
                          </p>
                        </div>

                        {occurrence.note && (
                          <p className="mt-3 text-sm leading-relaxed text-gray-700">
                            {occurrence.note}
                          </p>
                        )}
                      </article>
                    ),
                  )}
                </div>
              ) : (
                <p className="mt-4 text-sm leading-relaxed text-gray-600">
                  No future sessions are currently listed.
                </p>
              )}
            </section>
          </div>

          <aside className="self-start rounded-3xl bg-isr-cream/65 p-6 sm:p-7 lg:sticky lg:top-28">
            <p className="isr-eyebrow text-isr-turquoise">
              Regular schedule
            </p>

            <p className="mt-4 text-xl font-bold leading-relaxed text-isr-dark-red">
              {formatProgramSchedule(
                program,
              )}
            </p>

            <dl className="mt-7 space-y-5 text-sm">
              <div>
                <dt className="font-bold text-gray-500">
                  Campus
                </dt>

                <dd className="mt-1 font-semibold text-isr-dark-red">
                  {program.campusLabel}
                </dd>
              </div>

              <div>
                <dt className="font-bold text-gray-500">
                  Venue
                </dt>

                <dd className="mt-1 font-semibold text-isr-dark-red">
                  {program.venue}
                </dd>
              </div>

              <div>
                <dt className="font-bold text-gray-500">
                  Audience
                </dt>

                <dd className="mt-1 font-semibold text-isr-dark-red">
                  {program.audience}
                </dd>
              </div>

              <div>
                <dt className="font-bold text-gray-500">
                  Attendance
                </dt>

                <dd className="mt-1 font-semibold text-isr-dark-red">
                  {getProgramRegistrationLabel(
                    program,
                  )}
                </dd>
              </div>

              {program.price && (
                <div>
                  <dt className="font-bold text-gray-500">
                    Cost
                  </dt>

                  <dd className="mt-1 font-semibold text-isr-dark-red">
                    {program.price}
                  </dd>
                </div>
              )}
            </dl>

            <div className="mt-7 hidden lg:block">
              {registrationBlock}
            </div>

            <div className="mt-7 border-t border-isr-light-blue/20 pt-5">
              <Link
                href={
                  '/events?campus=' +
                  encodeURIComponent(
                    program.campusLabel,
                  )
                }
                className="isr-text-link"
              >
                More {program.campusLabel} activities →
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}