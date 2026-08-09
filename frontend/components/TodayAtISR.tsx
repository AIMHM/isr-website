'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import SectionHeading from '@/components/SectionHeading'
import {
  fetchPrayerTimes,
  getNextPrayer,
  type DailyPrayer,
  type PrayerTimesData,
} from '@/lib/prayerTimes'
import {
  fetchAnnouncements,
  formatAnnouncementDate,
  type Announcement,
} from '@/lib/announcements'

function AnnouncementAction({
  label,
  url,
}: {
  label: string
  url: string
}) {
  const classes = 'isr-text-link mt-5'

  if (url.startsWith('/')) {
    return (
      <Link href={url} className={classes}>
        {label}
        <span aria-hidden="true">â†’</span>
      </Link>
    )
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
    >
      {label}
      <span aria-hidden="true">â†’</span>
    </a>
  )
}

export default function TodayAtISR() {
  const [prayerData, setPrayerData] =
    useState<PrayerTimesData | null>(null)

  const [nextPrayer, setNextPrayer] =
    useState<DailyPrayer>('Fajr')

  const [prayerLoading, setPrayerLoading] =
    useState(true)

  const [announcements, setAnnouncements] =
    useState<Announcement[]>([])

  const [announcementLoading, setAnnouncementLoading] =
    useState(true)

  useEffect(() => {
    fetchPrayerTimes()
      .then((data) => {
        setPrayerData(data)
        setNextPrayer(getNextPrayer(data.timings))
      })
      .catch(() => setPrayerData(null))
      .finally(() => setPrayerLoading(false))

    fetchAnnouncements()
      .then((items) => setAnnouncements(items))
      .catch(() => setAnnouncements([]))
      .finally(() => setAnnouncementLoading(false))
  }, [])

  const urgentAnnouncement =
    announcements.find((item) => item.priority === 'urgent') ?? null

  const featuredAnnouncement =
    announcements.find(
      (item) => item.pinned && item !== urgentAnnouncement,
    ) ??
    announcements.find((item) => item !== urgentAnnouncement) ??
    urgentAnnouncement

  const priority =
    featuredAnnouncement?.priority ?? 'normal'

  return (
    <section
      aria-labelledby="today-at-isr-heading"
      className="bg-white px-4 py-16 sm:py-20"
    >
      <div className="container-isr mx-auto max-w-6xl">
        {urgentAnnouncement && (
          <div
            role="alert"
            className="mb-10 overflow-hidden rounded-3xl border border-red-200 bg-red-50 shadow-sm"
          >
            <div className="grid sm:grid-cols-[auto_1fr_auto] sm:items-center">
              <div className="flex h-full items-center justify-center bg-isr-bright-red px-5 py-4 text-xs font-bold uppercase tracking-[0.14em] text-white">
                Urgent
              </div>

              <div className="px-5 py-5">
                <h2 className="text-lg font-bold text-isr-dark-red">
                  {urgentAnnouncement.title}
                </h2>

                <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-gray-700">
                  {urgentAnnouncement.body}
                </p>
              </div>

              <div className="px-5 pb-5 sm:pb-0">
                <Link
                  href="/announcements"
                  className="inline-flex rounded-full bg-isr-bright-red px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-isr-dark-red"
                >
                  Read notice
                </Link>
              </div>
            </div>
          </div>
        )}

        <SectionHeading
          eyebrow="Essential information"
          title="Today at ISR"
          description="Prayer information, Jumuâ€™ah updates and important notices in one place."
          id="today-at-isr-heading"
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <article className="isr-card flex min-h-72 flex-col bg-isr-cream/45 p-6 sm:p-7">
            <p className="text-sm font-semibold uppercase tracking-wide text-isr-turquoise">
              Next prayer
            </p>

            {prayerLoading ? (
              <div className="mt-6 animate-pulse space-y-3" aria-live="polite">
                <div className="h-9 w-32 rounded bg-isr-light-blue/25" />
                <div className="h-7 w-20 rounded bg-isr-light-blue/20" />
                <div className="h-4 w-44 rounded bg-isr-light-blue/20" />
              </div>
            ) : prayerData ? (
              <>
                <p className="mt-5 text-4xl font-bold text-isr-dark-red">
                  {nextPrayer}
                </p>

                <p className="mt-1 text-2xl font-semibold text-gray-800">
                  {prayerData.timings[nextPrayer]}
                </p>

                <div className="mt-5 border-t border-isr-light-blue/25 pt-4">
                  <p className="text-sm text-gray-600">
                    {prayerData.date.readable}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Melbourne Â· {prayerData.meta.timezone}
                  </p>
                </div>
              </>
            ) : (
              <p className="mt-5 text-sm leading-relaxed text-gray-600">
                Prayer information is currently unavailable.
              </p>
            )}

            <Link href="/pray" className="isr-text-link mt-auto pt-6">
              View prayer information
              <span aria-hidden="true">â†’</span>
            </Link>
          </article>

          <article className="isr-card flex min-h-72 flex-col border-isr-yellow bg-isr-yellow/40 p-6 sm:p-7">
            <p className="text-sm font-semibold uppercase tracking-wide text-isr-turquoise">
              Friday prayer
            </p>

            <h3 className="mt-5 text-2xl font-bold text-isr-dark-red">
              Jumuâ€™ah details pending confirmation
            </h3>

            <p className="mt-4 text-sm leading-relaxed text-gray-700">
              Khutbah time, jamaâ€™ah time, venue, access arrangements and
              accessibility information will appear once verified.
            </p>

            <p className="mt-5 rounded-xl border border-isr-dark-red/10 bg-white/75 px-4 py-3 text-xs font-semibold leading-relaxed text-isr-dark-red">
              Confirm current arrangements before travelling to campus.
            </p>

            <Link href="/pray" className="isr-text-link mt-auto pt-6">
              View Jumuâ€™ah information
              <span aria-hidden="true">â†’</span>
            </Link>
          </article>

          <article
            className={`isr-card flex min-h-72 flex-col p-6 sm:p-7 ${
              priority === 'urgent'
                ? 'border-red-200 bg-red-50'
                : priority === 'important'
                  ? 'border-isr-yellow bg-isr-yellow/25'
                  : 'bg-white'
            }`}
          >
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-semibold uppercase tracking-wide text-isr-turquoise">
                Announcement
              </p>

              {featuredAnnouncement && priority !== 'normal' && (
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${
                    priority === 'urgent'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-isr-yellow text-isr-dark-red'
                  }`}
                >
                  {priority}
                </span>
              )}
            </div>

            {announcementLoading ? (
              <div className="mt-6 animate-pulse space-y-3" aria-live="polite">
                <div className="h-6 w-4/5 rounded bg-isr-light-blue/25" />
                <div className="h-4 w-28 rounded bg-isr-light-blue/20" />
                <div className="h-4 w-full rounded bg-isr-light-blue/20" />
                <div className="h-4 w-5/6 rounded bg-isr-light-blue/20" />
              </div>
            ) : featuredAnnouncement ? (
              <>
                <h3 className="mt-5 text-xl font-bold text-isr-dark-red">
                  {featuredAnnouncement.title}
                </h3>

                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {formatAnnouncementDate(featuredAnnouncement.createdAt)}
                </p>

                <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-gray-700">
                  {featuredAnnouncement.body}
                </p>

                {featuredAnnouncement.actionLabel &&
                  featuredAnnouncement.actionUrl && (
                    <AnnouncementAction
                      label={featuredAnnouncement.actionLabel}
                      url={featuredAnnouncement.actionUrl}
                    />
                  )}
              </>
            ) : (
              <p className="mt-5 text-sm leading-relaxed text-gray-600">
                No announcement is currently available.
              </p>
            )}

            <Link
              href="/announcements"
              className="isr-text-link mt-auto pt-6"
            >
              View all announcements
              <span aria-hidden="true">â†’</span>
            </Link>
          </article>
        </div>
      </div>
    </section>
  )
}
