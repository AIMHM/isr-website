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
  formatAnnouncementDate,
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
        href={item.actionUrl}
        className="isr-button-secondary"
      >
        {item.actionLabel}
      </Link>
    )
  }

  return (
    <a
      href={item.actionUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="isr-button-secondary"
    >
      {item.actionLabel}
    </a>
  )
}

export default function UpdatesExperience() {
  const [
    updates,
    setUpdates,
  ] =
    useState<Announcement[]>([])

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

  const [
    reloadKey,
    setReloadKey,
  ] =
    useState(0)

  useEffect(() => {
    let active = true

    setLoading(true)
    setError(false)

    fetchAnnouncements()
      .then((data) => {
        if (active) {
          setUpdates(data)
        }
      })
      .catch(() => {
        if (active) {
          setUpdates([])
          setError(true)
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
  }, [reloadKey])

  const sorted =
    useMemo(
      () =>
        [...updates].sort(
          (a, b) => {
            const priority =
              priorityWeight(b) -
              priorityWeight(a)

            if (priority !== 0) {
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

  const highlighted =
    sorted.filter(
      (item) =>
        item.pinned ||
        item.priority ===
          'urgent',
    )

  const regular =
    sorted.filter(
      (item) =>
        !highlighted.some(
          (highlight) =>
            highlight.id ===
            item.id,
        ),
    )

  return (
    <>
      <section className="bg-isr-dark-red px-4 py-14 text-white sm:py-20">
        <div className="container-isr mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-isr-yellow">
                Official notices
              </p>

              <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
                ISR Updates
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
                Important changes, prayer information,
                event notices and other time-sensitive
                information Muslim students need to know.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex w-fit rounded-full border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Report outdated information
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div className="container-isr mx-auto max-w-5xl">
          {loading && (
            <>
              <span className="sr-only">
                Loading ISR Updates
              </span>

              <div className="space-y-5">
                {[1, 2, 3].map(
                  (item) => (
                    <div
                      key={item}
                      className="h-60 animate-pulse rounded-3xl bg-isr-cream"
                    />
                  ),
                )}
              </div>
            </>
          )}

          {!loading &&
            error && (
              <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
                <h2 className="text-xl font-bold text-red-800">
                  Updates could not be loaded
                </h2>

                <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-red-700">
                  Please try again. If the problem continues,
                  check ISR&apos;s official community channels.
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
            sorted.length ===
              0 && (
              <div className="rounded-3xl bg-isr-cream/65 p-10 text-center">
                <h2 className="text-2xl font-bold text-isr-dark-red">
                  No current ISR Updates
                </h2>

                <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-gray-700">
                  There are no active notices at the moment.
                </p>
              </div>
            )}

          {!loading &&
            !error &&
            highlighted.length >
              0 && (
              <section aria-labelledby="priority-updates">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-turquoise">
                  Important now
                </p>

                <h2
                  id="priority-updates"
                  className="mt-2 text-2xl font-bold text-isr-dark-red"
                >
                  Priority updates
                </h2>

                <div className="mt-6 space-y-5">
                  {highlighted.map(
                    (item) => (
                      <article
                        key={item.id}
                        id={`update-${item.id}`}
                        className={`overflow-hidden rounded-[1.75rem] border bg-white ${
                          item.priority ===
                          'urgent'
                            ? 'border-red-200 ring-1 ring-red-100'
                            : 'border-isr-yellow ring-1 ring-isr-yellow/40'
                        }`}
                      >
                        <div className="grid md:grid-cols-[1fr_auto]">
                          <div className="p-6 sm:p-8">
                            <div className="flex flex-wrap items-center gap-2">
                              <span
                                className={`rounded-full px-3 py-1.5 text-xs font-bold ${priorityClass(item)}`}
                              >
                                {priorityLabel(
                                  item,
                                )}
                              </span>

                              {item.pinned && (
                                <span className="rounded-full bg-isr-dark-red px-3 py-1.5 text-xs font-bold text-white">
                                  Pinned
                                </span>
                              )}

                              <span className="text-xs font-semibold text-gray-500">
                                {formatAnnouncementDate(
                                  item.createdAt,
                                )}
                              </span>
                            </div>

                            <h3 className="mt-5 text-2xl font-bold leading-snug text-isr-dark-red">
                              {item.title}
                            </h3>

                            <p className="mt-4 whitespace-pre-line break-words leading-relaxed text-gray-700">
                              {item.body}
                            </p>

                            <div className="mt-6">
                              <UpdateAction
                                item={item}
                              />
                            </div>
                          </div>

                          {item.imageUrl && (
                            <div className="w-full md:w-72">
                              <img
                                src={item.imageUrl}
                                alt=""
                                loading="lazy"
                                className="h-full min-h-56 w-full object-cover"
                              />
                            </div>
                          )}
                        </div>
                      </article>
                    ),
                  )}
                </div>
              </section>
            )}

          {!loading &&
            !error &&
            regular.length >
              0 && (
              <section
                className={
                  highlighted.length >
                  0
                    ? 'mt-14'
                    : ''
                }
                aria-labelledby="all-updates"
              >
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-turquoise">
                  Latest
                </p>

                <h2
                  id="all-updates"
                  className="mt-2 text-2xl font-bold text-isr-dark-red"
                >
                  Recent updates
                </h2>

                <div className="mt-6 space-y-5">
                  {regular.map(
                    (item) => (
                      <article
                        key={item.id}
                        id={`update-${item.id}`}
                        className="overflow-hidden rounded-[1.75rem] border border-isr-light-blue/20 bg-white"
                      >
                        <div className="grid md:grid-cols-[1fr_auto]">
                          <div className="p-6 sm:p-8">
                            <div className="flex flex-wrap items-center gap-2">
                              <span
                                className={`rounded-full px-3 py-1.5 text-xs font-bold ${priorityClass(item)}`}
                              >
                                {priorityLabel(
                                  item,
                                )}
                              </span>

                              <span className="text-xs font-semibold text-gray-500">
                                {formatAnnouncementDate(
                                  item.createdAt,
                                )}
                              </span>
                            </div>

                            <h3 className="mt-5 text-2xl font-bold leading-snug text-isr-dark-red">
                              {item.title}
                            </h3>

                            <p className="mt-4 whitespace-pre-line break-words leading-relaxed text-gray-700">
                              {item.body}
                            </p>

                            <div className="mt-6">
                              <UpdateAction
                                item={item}
                              />
                            </div>
                          </div>

                          {item.imageUrl && (
                            <div className="w-full md:w-64">
                              <img
                                src={item.imageUrl}
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
              </section>
            )}
        </div>
      </section>
    </>
  )
}
