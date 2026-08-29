'use client'

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import Link from 'next/link'
import {
  getToken,
} from '@/lib/auth'
import {
  fetchAllAnnouncements,
  fetchAllEvents,
  fetchAllPrograms,
} from '@/lib/admin-api'
import type {
  Announcement,
} from '@/lib/announcements'
import type {
  Event,
} from '@/lib/events'
import type {
  Program,
} from '@/lib/programs'
import {
  fetchAdminPrayerRecords,
  isPrayerRecordStale,
  type JumuahServiceRecord,
  type PrayerSpaceRecord,
} from '@/lib/prayerRecords'

function workflowPending(
  status?: string,
): boolean {
  return (
    status === 'draft' ||
    status === 'review'
  )
}

export default function ContentHealthPage() {
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
    announcements,
    setAnnouncements,
  ] =
    useState<Announcement[]>([])

  const [
    prayerSpaces,
    setPrayerSpaces,
  ] =
    useState<PrayerSpaceRecord[]>([])

  const [
    jumuahServices,
    setJumuahServices,
  ] =
    useState<JumuahServiceRecord[]>([])

  const [
    loading,
    setLoading,
  ] =
    useState(true)

  const [
    warnings,
    setWarnings,
  ] =
    useState<string[]>([])

  const load =
    useCallback(
      async () => {
        setLoading(true)
        setWarnings([])

        const token =
          getToken()

        if (!token) {
          setWarnings([
            'Admin session missing.',
          ])
          setLoading(false)
          return
        }

        const [
          eventsResult,
          programsResult,
          announcementsResult,
          prayerResult,
        ] =
          await Promise.allSettled([
            fetchAllEvents(
              token,
            ),
            fetchAllPrograms(
              token,
            ),
            fetchAllAnnouncements(
              token,
            ),
            fetchAdminPrayerRecords(
              token,
            ),
          ])

        const nextWarnings:
          string[] = []

        if (
          eventsResult.status ===
          'fulfilled'
        ) {
          setEvents(
            eventsResult.value,
          )
        } else {
          nextWarnings.push(
            'Events could not be loaded.',
          )
        }

        if (
          programsResult.status ===
          'fulfilled'
        ) {
          setPrograms(
            programsResult.value,
          )
        } else {
          nextWarnings.push(
            'Programs could not be loaded.',
          )
        }

        if (
          announcementsResult.status ===
          'fulfilled'
        ) {
          setAnnouncements(
            announcementsResult.value,
          )
        } else {
          nextWarnings.push(
            'ISR Updates could not be loaded.',
          )
        }

        if (
          prayerResult.status ===
          'fulfilled'
        ) {
          setPrayerSpaces(
            prayerResult.value
              .prayerSpaces,
          )

          setJumuahServices(
            prayerResult.value
              .jumuahServices,
          )
        } else {
          nextWarnings.push(
            'Prayer records could not be loaded. This may remain unavailable until prayer persistence is active in the current environment.',
          )
        }

        setWarnings(
          nextWarnings,
        )

        setLoading(false)
      },
      [],
    )

  useEffect(() => {
    void load()
  }, [load])

  const health =
    useMemo(
      () => {
        const prayerRecords = [
          ...prayerSpaces,
          ...jumuahServices,
        ]

        const total =
          events.length +
          programs.length +
          announcements.length +
          prayerRecords.length

        const missingOwner =
          events.filter(
            (item) =>
              !item.contentOwner,
          ).length +
          programs.filter(
            (item) =>
              !item.contentOwner,
          ).length +
          announcements.filter(
            (item) =>
              !item.contentOwner,
          ).length +
          prayerRecords.filter(
            (item) =>
              !item.contentOwner,
          ).length

        const missingReview =
          events.filter(
            (item) =>
              !item.reviewedAt,
          ).length +
          programs.filter(
            (item) =>
              !item.lastReviewedAt,
          ).length +
          announcements.filter(
            (item) =>
              !item.reviewedAt,
          ).length +
          prayerRecords.filter(
            (item) =>
              !item.reviewedAt,
          ).length

        const workflowQueue =
          events.filter(
            (item) =>
              workflowPending(
                item.publicationStatus,
              ),
          ).length +
          programs.filter(
            (item) =>
              workflowPending(
                item.publicationStatus,
              ),
          ).length +
          announcements.filter(
            (item) =>
              workflowPending(
                item.publicationStatus,
              ),
          ).length +
          prayerRecords.filter(
            (item) =>
              workflowPending(
                item.publicationStatus,
              ),
          ).length

        const prayerAttention =
          prayerRecords.filter(
            (item) =>
              item.verificationStatus !==
                'verified' ||
              isPrayerRecordStale(
                item,
              ),
          ).length

        return {
          total,
          missingOwner,
          missingReview,
          workflowQueue,
          prayerAttention,
        }
      },
      [
        announcements,
        events,
        jumuahServices,
        prayerSpaces,
        programs,
      ],
    )

  const prayerRecords = [
    ...prayerSpaces,
    ...jumuahServices,
  ]

  const sections = [
    {
      title: 'Events',
      href: '/admin/events',
      total:
        events.length,
      ownerIssues:
        events.filter(
          (item) =>
            !item.contentOwner,
        ).length,
      reviewIssues:
        events.filter(
          (item) =>
            !item.reviewedAt,
        ).length,
      workflow:
        events.filter(
          (item) =>
            workflowPending(
              item.publicationStatus,
            ),
        ).length,
    },
    {
      title: 'Programs',
      href: '/admin/programs',
      total:
        programs.length,
      ownerIssues:
        programs.filter(
          (item) =>
            !item.contentOwner,
        ).length,
      reviewIssues:
        programs.filter(
          (item) =>
            !item.lastReviewedAt,
        ).length,
      workflow:
        programs.filter(
          (item) =>
            workflowPending(
              item.publicationStatus,
            ),
        ).length,
    },
    {
      title: 'ISR Updates',
      href:
        '/admin/announcements',
      total:
        announcements.length,
      ownerIssues:
        announcements.filter(
          (item) =>
            !item.contentOwner,
        ).length,
      reviewIssues:
        announcements.filter(
          (item) =>
            !item.reviewedAt,
        ).length,
      workflow:
        announcements.filter(
          (item) =>
            workflowPending(
              item.publicationStatus,
            ),
        ).length,
    },
    {
      title:
        'Prayer & Jumu’ah',
      href:
        '/admin/prayer',
      total:
        prayerRecords.length,
      ownerIssues:
        prayerRecords.filter(
          (item) =>
            !item.contentOwner,
        ).length,
      reviewIssues:
        prayerRecords.filter(
          (item) =>
            !item.reviewedAt,
        ).length,
      workflow:
        prayerRecords.filter(
          (item) =>
            workflowPending(
              item.publicationStatus,
            ),
        ).length,
    },
  ]

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-turquoise">
            Content Health
          </p>

          <h1 className="mt-3 text-3xl font-bold text-isr-dark-red sm:text-4xl">
            Know what needs attention
          </h1>

          <p className="mt-4 leading-relaxed text-gray-600">
            This dashboard surfaces missing ownership,
            missing review records, publication queues and
            prayer information that may require verification.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            void load()
          }}
          className="rounded-xl bg-isr-dark-red px-4 py-2.5 text-sm font-bold text-white transition hover:bg-isr-turquoise"
        >
          Refresh health check
        </button>
      </div>

      {warnings.length > 0 && (
        <section className="mt-7 rounded-2xl border border-amber-300 bg-amber-50 p-5">
          <h2 className="font-bold text-amber-900">
            Partial data
          </h2>

          <ul className="mt-3 space-y-2 text-sm text-amber-900">
            {warnings.map(
              (warning) => (
                <li
                  key={warning}
                >
                  • {warning}
                </li>
              ),
            )}
          </ul>
        </section>
      )}

      {loading ? (
        <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-8 text-sm text-gray-600">
          Running content health checks…
        </div>
      ) : (
        <>
          <section className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {[
              {
                label:
                  'Managed records',
                value:
                  health.total,
              },
              {
                label:
                  'Missing owner',
                value:
                  health.missingOwner,
              },
              {
                label:
                  'Missing review date',
                value:
                  health.missingReview,
              },
              {
                label:
                  'Draft / review queue',
                value:
                  health.workflowQueue,
              },
              {
                label:
                  'Prayer attention',
                value:
                  health.prayerAttention,
              },
            ].map(
              (metric) => (
                <article
                  key={metric.label}
                  className="rounded-2xl border border-isr-light-blue/20 bg-white p-5"
                >
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                    {metric.label}
                  </p>

                  <p className="mt-3 text-3xl font-bold text-isr-dark-red">
                    {metric.value}
                  </p>
                </article>
              ),
            )}
          </section>

          <section className="mt-10">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold text-isr-dark-red">
                Content areas
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Missing metadata is not automatically an
                error, but it identifies records worth
                checking before relying on them as current
                public information.
              </p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {sections.map(
                (section) => (
                  <Link
                    key={section.title}
                    href={section.href}
                    className="rounded-2xl border border-isr-light-blue/25 bg-white p-6 transition hover:border-isr-turquoise hover:shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-lg font-bold text-isr-dark-red">
                        {section.title}
                      </h3>

                      <span className="font-bold text-isr-turquoise">
                        →
                      </span>
                    </div>

                    <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <dt className="text-gray-500">
                          Records
                        </dt>

                        <dd className="font-bold text-isr-dark-red">
                          {section.total}
                        </dd>
                      </div>

                      <div>
                        <dt className="text-gray-500">
                          Missing owner
                        </dt>

                        <dd className="font-bold text-isr-dark-red">
                          {section.ownerIssues}
                        </dd>
                      </div>

                      <div>
                        <dt className="text-gray-500">
                          Missing review
                        </dt>

                        <dd className="font-bold text-isr-dark-red">
                          {section.reviewIssues}
                        </dd>
                      </div>

                      <div>
                        <dt className="text-gray-500">
                          Workflow queue
                        </dt>

                        <dd className="font-bold text-isr-dark-red">
                          {section.workflow}
                        </dd>
                      </div>
                    </dl>
                  </Link>
                ),
              )}
            </div>
          </section>

          <section className="mt-10 rounded-2xl bg-isr-dark-red p-6 text-white sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-isr-yellow">
              Operating principle
            </p>

            <h2 className="mt-3 text-2xl font-bold">
              Content should have an owner
            </h2>

            <p className="mt-4 max-w-4xl text-sm leading-relaxed text-white/75">
              Important public information should be
              attributable to a responsible content owner
              and periodically reviewed. Verification,
              review dates and publication status are
              separate controls and should not be treated
              as interchangeable.
            </p>
          </section>
        </>
      )}
    </div>
  )
}