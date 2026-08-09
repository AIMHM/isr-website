'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  fetchAnnouncements,
  type Announcement,
} from '@/lib/announcements'

function ActionLink({
  announcement,
}: {
  announcement: Announcement
}) {
  if (!announcement.actionLabel || !announcement.actionUrl) return null

  if (announcement.actionUrl.startsWith('/')) {
    return (
      <Link href={announcement.actionUrl} className="isr-button-secondary text-sm">
        {announcement.actionLabel}
      </Link>
    )
  }

  return (
    <a
      href={announcement.actionUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="isr-button-secondary text-sm"
    >
      {announcement.actionLabel}
    </a>
  )
}

export default function TodayAtISR() {
  const [urgent, setUrgent] = useState<Announcement | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnnouncements()
      .then((items) => {
        setUrgent(
          items.find((item) => item.priority === 'urgent') ?? null,
        )
      })
      .catch(() => setUrgent(null))
      .finally(() => setLoading(false))
  }, [])

  if (loading || !urgent) return null

  return (
    <section className="bg-white px-4 pb-16 sm:pb-20">
      <div className="container-isr mx-auto max-w-6xl">
        <div
          role="alert"
          className="overflow-hidden rounded-[2rem] border border-red-200 bg-red-50 shadow-sm"
        >
          <div className="grid gap-5 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-bright-red">
                Important ISR update
              </p>

              <h2 className="mt-3 text-2xl font-bold text-isr-dark-red">
                {urgent.title}
              </h2>

              <p className="mt-3 max-w-3xl leading-relaxed text-gray-700">
                {urgent.body}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <ActionLink announcement={urgent} />

              <Link href="/updates" className="isr-button-primary text-sm">
                View ISR updates
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
