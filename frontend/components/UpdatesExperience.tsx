/* eslint-disable @next/next/no-img-element */
'use client'

import {
  useEffect,
  useMemo,
  useState,
} from 'react'
import Link from 'next/link'
import {
  fetchAnnouncements,
  type Announcement,
} from '@/lib/announcements'

function priorityWeight(
  item: Announcement,
): number {
  let score =
    item.pinned
      ? 100
      : 0

  if (
    item.priority ===
    'urgent'
  ) {
    score += 30
  } else if (
    item.priority ===
    'important'
  ) {
    score += 20
  } else {
    score += 10
  }

  return score
}

function priorityLabel(
  item: Announcement,
): string {
  if (
    item.priority ===
    'urgent'
  ) {
    return 'Urgent'
  }

  if (
    item.priority ===
    'important'
  ) {
    return 'Important'
  }

  return 'Update'
}

function priorityClass(
  item: Announcement,
): string {
  if (
    item.priority ===
    'urgent'
  ) {
    return 'bg-red-100 text-red-800'
  }

  if (
    item.priority ===
    'important'
  ) {
    return 'bg-isr-yellow/70 text-isr-dark-red'
  }

  return 'bg-isr-turquoise/10 text-isr-turquoise'
}

function formatDate(
  value: string,
): string {
  const date =
    new Date(value)

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return ''
  }

  return new Intl.DateTimeFormat(
    'en-AU',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    },
  ).format(date)
}

function UpdateAction({
  item,
}: {
  item: Announcement
}) {
  if (
    !item.actionLabel ||
    !item.actionUrl
  ) {
    return null
  }

  if (
    item.actionUrl.startsWith(
      '/',
    ) &&
    !item.actionUrl.startsWith(
      '//',
    )
  ) {
    return (
      <Link
        href={
          item.actionUrl
        }
        className="isr-button-secondary"
      >
        {
          item.actionLabel
        }
      </Link>
    )
  }

  return (
    <a
      href={
        item.actionUrl
      }
      target="_blank"
      rel="noopener noreferrer"
      className="isr-button-secondary"
    >
      {
        item.actionLabel
      }
    </a>
  )
}

export default function UpdatesExperience() {
  const [
    updates,
    setUpdates,
  ] =
    useState<Announcement[]>(
      [],
    )

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
    fetchAnnouncements()
      .then(
        setUpdates,
      )
      .catch(
        () =>
          setError(true),
      )
      .finally(
        () =>
          setLoading(false),
      )
  }, [])

  const sorted =
    useMemo(
      () =>
        [...updates].sort(
          (a, b) => {
            const priority =
              priorityWeight(
                b,
              ) -
              priorityWeight(
                a,
              )

            if (
              priority !== 0
            ) {
              return priority
            }

            return (
              new Date(
                b.createdAt,
              ).getTime() -
              new Date(
                a.createdAt,
              ).getTime()
            )
          },
        ),
      [updates],
    )

  return (
    <>
      <section className="bg-isr-dark-red px-4 py-14 text-white sm:py-18">
        <div className="container-isr mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-isr-yellow">
            Official notices
          </p>

          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
            ISR Updates
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/75">
            Important changes, time-sensitive notices
            and information Muslim students need to
            know.
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div className="container-isr mx-auto max-w-5xl">
          {loading && (
            <div className="space-y-5">
              {[1, 2, 3].map(
                (item) => (
                  <div
                    key={
                      item
                    }
                    className="h-60 animate-pulse rounded-3xl bg-isr-cream"
                  />
                ),
              )}
            </div>
          )}

          {!loading &&
            error && (
              <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
                <h2 className="text-xl font-bold text-red-800">
                  Updates could not be loaded
                </h2>

                <p className="mt-3 text-sm text-red-700">
                  Please try again or check ISR&apos;s
                  official community channels.
                </p>
              </div>
            )}

          {!loading &&
            !error &&
            sorted.length ===
              0 && (
              <div className="rounded-3xl bg-isr-cream/65 p-10 text-center">
                <h2 className="text-2xl font-bold text-isr-dark-red">
                  No current updates
                </h2>

                <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-gray-700">
                  There are no active ISR notices at
                  the moment.
                </p>
              </div>
            )}

          {!loading &&
            !error &&
            sorted.length >
              0 && (
              <div className="space-y-5">
                {sorted.map(
                  (item) => (
                    <article
                      key={
                        item.id
                      }
                      className={`isr-card overflow-hidden ${
                        item.pinned
                          ? 'border-isr-yellow ring-1 ring-isr-yellow/50'
                          : ''
                      }`}
                    >
                      <div className="grid md:grid-cols-[1fr_auto]">
                        <div className="p-6 sm:p-8">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`rounded-full px-3 py-1.5 text-xs font-bold ${priorityClass(item)}`}
                            >
                              {
                                priorityLabel(
                                  item,
                                )
                              }
                            </span>

                            {item.pinned && (
                              <span className="rounded-full bg-isr-dark-red px-3 py-1.5 text-xs font-bold text-white">
                                Pinned
                              </span>
                            )}

                            <span className="text-xs font-semibold text-gray-500">
                              {
                                formatDate(
                                  item.createdAt,
                                )
                              }
                            </span>
                          </div>

                          <h2 className="mt-5 text-2xl font-bold text-isr-dark-red">
                            {
                              item.title
                            }
                          </h2>

                          <p className="mt-4 whitespace-pre-line leading-relaxed text-gray-700">
                            {
                              item.body
                            }
                          </p>

                          <div className="mt-6">
                            <UpdateAction
                              item={
                                item
                              }
                            />
                          </div>
                        </div>

                        {item.imageUrl && (
                          <div className="w-full md:w-64">
                            <img
                              src={
                                item.imageUrl
                              }
                              alt=""
                              loading="lazy"
                              className="h-full min-h-52 w-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </article>
                  ),
                )}
              </div>
            )}
        </div>
      </section>
    </>
  )
}
