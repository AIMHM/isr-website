'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import {
  fetchAnnouncements,
  formatAnnouncementDate,
  type Announcement,
  type AnnouncementPriority,
} from '@/lib/announcements'
import { PinIcon } from '@/components/Icons'

const PRIORITY_CLASSES: Record<AnnouncementPriority, string> = {
  normal: 'bg-isr-light-blue/20 text-isr-dark-red',
  important: 'bg-isr-yellow text-isr-dark-red',
  urgent: 'bg-red-100 text-red-800',
}

function AnnouncementAction({
  label,
  url,
}: {
  label: string
  url: string
}) {
  if (url.startsWith('/')) {
    return (
      <Link href={url} className="isr-button-primary mt-6 text-sm">
        {label}
      </Link>
    )
  }

  return (
    <a
      href={url}
      target={url.startsWith('http') ? '_blank' : undefined}
      rel={url.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="isr-button-primary mt-6 text-sm"
    >
      {label}
    </a>
  )
}

function AnnouncementCard({
  announcement,
}: {
  announcement: Announcement
}) {
  const priority = announcement.priority ?? 'normal'

  return (
    <article
      className={`isr-card overflow-hidden ${
        priority === 'urgent'
          ? 'border-red-200'
          : announcement.pinned
            ? 'border-isr-turquoise/40'
            : ''
      }`}
    >
      {announcement.imageUrl && (
        <div className="relative aspect-[16/9] overflow-hidden bg-isr-cream">
          <Image
            src={announcement.imageUrl}
            alt=""
            fill
            aria-hidden="true"
            className="scale-110 object-cover opacity-25 blur-xl"
          />

          <Image
            src={announcement.imageUrl}
            alt={`${announcement.title} image`}
            fill
            className="object-contain p-4"
          />
        </div>
      )}

      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <time
            dateTime={announcement.createdAt}
            className="text-sm font-semibold uppercase tracking-[0.12em] text-isr-turquoise"
          >
            {formatAnnouncementDate(announcement.createdAt)}
          </time>

          {announcement.pinned && (
            <span className="inline-flex items-center gap-1 rounded-full bg-isr-turquoise/15 px-3 py-1 text-xs font-semibold text-isr-turquoise">
              <PinIcon className="h-3 w-3" />
              Pinned
            </span>
          )}

          {priority !== 'normal' && (
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${PRIORITY_CLASSES[priority]}`}
            >
              {priority}
            </span>
          )}
        </div>

        <h2 className="mt-4 text-2xl font-bold text-isr-dark-red sm:text-3xl">
          {announcement.title}
        </h2>

        <p className="mt-4 whitespace-pre-line leading-relaxed text-gray-700">
          {announcement.body}
        </p>

        {announcement.actionUrl && announcement.actionLabel && (
          <AnnouncementAction
            label={announcement.actionLabel}
            url={announcement.actionUrl}
          />
        )}
      </div>
    </article>
  )
}

export default function AnnouncementsList() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setError(false)

    try {
      setAnnouncements(await fetchAnnouncements())
    } catch {
      setAnnouncements([])
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="h-56 animate-pulse rounded-3xl bg-white ring-1 ring-isr-light-blue/20"
          />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl bg-isr-yellow/60 px-6 py-8 text-center">
        <p className="text-sm text-isr-dark-red">
          ISR updates could not be loaded right now.
        </p>

        <button
          type="button"
          onClick={() => void load()}
          className="isr-text-link mt-4"
        >
          Try again
        </button>
      </div>
    )
  }

  if (announcements.length === 0) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-isr-light-blue/30 bg-white px-6 py-12 text-center">
        <p className="text-lg font-semibold text-isr-dark-red">
          No current ISR updates
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-7">
      {announcements.map((announcement) => (
        <AnnouncementCard
          key={announcement.id}
          announcement={announcement}
        />
      ))}
    </div>
  )
}
