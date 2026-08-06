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
  const [prayerData, setPrayerData] = useState<PrayerTimesData | null>(null)
  const [nextPrayer, setNextPrayer] = useState<DailyPrayer>('Fajr')
  const [announcement, setAnnouncement] = useState<Announcement | null>(null)

  useEffect(() => {
    fetchPrayerTimes()
      .then((data) => {
        setPrayerData(data)
        setNextPrayer(getNextPrayer(data.timings))
      })
      .catch(() => setPrayerData(null))

    fetchAnnouncements()
      .then((items) => {
        const pinned = items.find((item) => item.pinned)
        setAnnouncement(pinned ?? items[0] ?? null)
      })
      .catch(() => setAnnouncement(null))
  }, [])

  return (
    <section className="bg-white px-4 py-16 sm:py-20">
      <div className="container-isr mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-isr-turquoise">
            Essential information
          </p>
          <h2 className="mt-2 text-3xl font-bold text-isr-dark-red sm:text-4xl">
            Today at ISR
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <article className="rounded-2xl border border-isr-light-blue/30 bg-isr-cream/50 p-6">
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

            <a
              href="#prayer-spaces"
              className="mt-6 inline-block text-sm font-semibold text-isr-turquoise hover:text-isr-dark-red"
            >
              Find a prayer space →
            </a>
          </article>

          <article className="rounded-2xl border border-isr-light-blue/30 bg-isr-yellow/40 p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-isr-turquoise">
              Jumu&apos;ah
            </p>
            <h3 className="mt-4 text-2xl font-bold text-isr-dark-red">
              Details require verification
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-700">
              Khutbah time, jama&apos;ah time, venue, access arrangements and
              accessibility information will be published after confirmation.
            </p>
            <p className="mt-6 rounded-lg bg-white/70 px-3 py-2 text-xs font-semibold text-isr-dark-red">
              Local prototype — not official information
            </p>
          </article>

          <article className="rounded-2xl border border-isr-light-blue/30 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-isr-turquoise">
              Important announcement
            </p>

            {announcement ? (
              <>
                <h3 className="mt-4 text-xl font-bold text-isr-dark-red">
                  {announcement.title}
                </h3>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {formatAnnouncementDate(announcement.createdAt)}
                </p>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-gray-700">
                  {announcement.body}
                </p>
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
              View announcements →
            </Link>
          </article>
        </div>
      </div>
    </section>
  )
}
