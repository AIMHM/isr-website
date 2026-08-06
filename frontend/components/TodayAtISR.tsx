'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
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

export default function TodayAtISR() {
  const [prayerData, setPrayerData] =
    useState<PrayerTimesData | null>(null)

  const [nextPrayer, setNextPrayer] =
    useState<DailyPrayer>('Fajr')

  const [announcement, setAnnouncement] =
    useState<Announcement | null>(null)

  useEffect(() => {
    fetchPrayerTimes()
      .then((data) => {
        setPrayerData(data)
        setNextPrayer(getNextPrayer(data.timings))
      })
      .catch(() => setPrayerData(null))

    fetchAnnouncements()
      .then((items) => {
        const urgent = items.find(
          (item) => item.priority === 'urgent',
        )

        const pinned = items.find(
          (item) => item.pinned,
        )

        setAnnouncement(
          urgent ?? pinned ?? items[0] ?? null,
        )
      })
      .catch(() => setAnnouncement(null))
  }, [])

  const priority =
    announcement?.priority ?? 'normal'

  return (
    <section className="bg-white px-4 py-14 sm:py-20">
      <div className="container-isr mx-auto max-w-6xl">
        {announcement &&
          priority === 'urgent' && (
            <div
              role="status"
              className="mb-8 rounded-2xl border-l-4 border-isr-bright-red bg-red-50 p-5 shadow-sm"
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-red-700">
                    Urgent ISR notice
                  </p>

                  <h2 className="mt-2 text-xl font-bold text-isr-dark-red">
                    {announcement.title}
                  </h2>

                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-700">
                    {announcement.body}
                  </p>
                </div>

                <Link
                  href="/announcements"
                  className="shrink-0 rounded-full bg-isr-bright-red px-5 py-2.5 text-center text-sm font-semibold text-white hover:bg-isr-dark-red"
                >
                  Read notice
                </Link>
              </div>
            </div>
          )}

        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-isr-turquoise">
            Essential information
          </p>

          <h2 className="mt-2 text-3xl font-bold text-isr-dark-red sm:text-4xl">
            Today at ISR
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <article className="flex flex-col rounded-2xl border border-isr-light-blue/30 bg-isr-cream/50 p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-isr-turquoise">
              Next prayer
            </p>

            {prayerData ? (
              <>
                <p className="mt-4 text-3xl font-bold text-isr-dark-red">
                  {nextPrayer}
                </p>

                <p className="mt-1 text-xl font-semibold text-gray-800">
                  {prayerData.timings[nextPrayer]}
                </p>

                <p className="mt-4 text-sm text-gray-600">
                  {prayerData.date.readable}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Melbourne · {prayerData.meta.timezone}
                </p>
              </>
            ) : (
              <p className="mt-4 text-sm text-gray-600">
                Prayer information is currently unavailable.
              </p>
            )}

            <Link
              href="/pray"
              className="mt-6 inline-block text-sm font-semibold text-isr-turquoise hover:text-isr-dark-red"
            >
              View prayer information →
            </Link>
          </article>

          <article className="flex flex-col rounded-2xl border border-isr-light-blue/30 bg-isr-yellow/40 p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-isr-turquoise">
              Jumu&apos;ah
            </p>

            <h3 className="mt-4 text-2xl font-bold text-isr-dark-red">
              Details require verification
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-gray-700">
              Khutbah time, jama&apos;ah time, venue, access
              arrangements and accessibility information will be
              published after confirmation.
            </p>

            <p className="mt-6 rounded-lg bg-white/70 px-3 py-2 text-xs font-semibold text-isr-dark-red">
              Local prototype — not official information
            </p>

            <Link
              href="/pray"
              className="mt-5 inline-block text-sm font-semibold text-isr-turquoise hover:text-isr-dark-red"
            >
              View Jumu&apos;ah information →
            </Link>
          </article>

          <article
            className={`flex flex-col rounded-2xl border p-6 shadow-sm ${
              priority === 'urgent'
                ? 'border-red-200 bg-red-50'
                : priority === 'important'
                  ? 'border-isr-yellow bg-isr-yellow/30'
                  : 'border-isr-light-blue/30 bg-white'
            }`}
          >
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-semibold uppercase tracking-wide text-isr-turquoise">
                Announcement
              </p>

              {announcement &&
                priority !== 'normal' && (
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

            {announcement ? (
              <>
                <h3 className="mt-4 text-xl font-bold text-isr-dark-red">
                  {announcement.title}
                </h3>

                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {formatAnnouncementDate(
                    announcement.createdAt,
                  )}
                </p>

                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-gray-700">
                  {announcement.body}
                </p>

                {announcement.actionLabel &&
                  announcement.actionUrl && (
                    <a
                      href={announcement.actionUrl}
                      className="mt-5 inline-block text-sm font-semibold text-isr-turquoise hover:text-isr-dark-red"
                    >
                      {announcement.actionLabel} →
                    </a>
                  )}
              </>
            ) : (
              <p className="mt-4 text-sm text-gray-600">
                No announcement is currently available.
              </p>
            )}

            <Link
              href="/announcements"
              className="mt-6 inline-block text-sm font-semibold text-isr-turquoise hover:text-isr-dark-red"
            >
              View all announcements →
            </Link>
          </article>
        </div>
      </div>
    </section>
  )
}
