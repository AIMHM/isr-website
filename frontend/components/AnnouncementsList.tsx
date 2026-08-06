'use client'

import Image from 'next/image'
import {
  useCallback,
  useEffect,
  useState,
} from 'react'
import {
  fetchAnnouncements,
  formatAnnouncementDate,
  type Announcement,
  type AnnouncementPriority,
} from '@/lib/announcements'
import { PinIcon } from '@/components/Icons'

const PRIORITY_CLASSES: Record<
  AnnouncementPriority,
  string
> = {
  normal:
    'bg-isr-light-blue/20 text-isr-dark-red',
  important:
    'bg-isr-yellow text-isr-dark-red',
  urgent:
    'bg-red-100 text-red-800',
}

function AnnouncementCard({
  announcement,
}: {
  announcement: Announcement
}) {
  const priority =
    announcement.priority ?? 'normal'

  return (
    <article
      className={`overflow-hidden rounded-2xl shadow-[0_12px_32px_rgba(91,11,5,0.08)] transition-shadow hover:shadow-[0_16px_40px_rgba(91,11,5,0.12)] ${
        priority === 'urgent'
          ? 'border-l-4 border-isr-bright-red bg-white ring-1 ring-red-200'
          : announcement.pinned
            ? 'border-l-4 border-isr-turquoise bg-isr-cream/50 ring-1 ring-isr-turquoise/25'
            : 'bg-white ring-1 ring-black/5'
      }`}
    >
      {announcement.imageUrl && (
        <div className="relative mx-auto aspect-[3/4] w-full max-w-sm bg-isr-cream">
          <Image
            src={announcement.imageUrl}
            alt={`${announcement.title} image`}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 384px"
          />
        </div>
      )}

      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <time
            dateTime={announcement.createdAt}
            className="text-sm font-semibold uppercase tracking-[0.12em] text-isr-turquoise"
          >
            {formatAnnouncementDate(
              announcement.createdAt,
            )}
          </time>

          {announcement.pinned && (
            <span className="inline-flex items-center gap-1 rounded-full bg-isr-turquoise/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-isr-turquoise">
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

        {announcement.actionUrl &&
          announcement.actionLabel && (
            <a
              href={announcement.actionUrl}
              target={
                announcement.actionUrl.startsWith(
                  'http',
                )
                  ? '_blank'
                  : undefined
              }
              rel={
                announcement.actionUrl.startsWith(
                  'http',
                )
                  ? 'noopener noreferrer'
                  : undefined
              }
              className="mt-6 inline-flex rounded-lg bg-isr-turquoise px-5 py-2.5 text-sm font-semibold text-white hover:bg-isr-dark-red"
            >
              {announcement.actionLabel}
            </a>
          )}

        <div className="mt-6 border-t border-isr-light-blue/25 pt-4 text-xs text-gray-500">
          <p>
            Content owner:{' '}
            {announcement.contentOwner ??
              'Verification required'}
          </p>

          <p className="mt-1">
            Review date:{' '}
            {announcement.reviewedAt
              ? formatAnnouncementDate(
                  announcement.reviewedAt,
                )
              : 'Verification required'}
          </p>
        </div>
      </div>
    </article>
  )
}

export default function AnnouncementsList() {
  const [announcements, setAnnouncements] =
    useState<Announcement[]>([])

  const [loading, setLoading] = useState(true)

  const [error, setError] =
    useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const data =
        await fetchAnnouncements()

      setAnnouncements(data)
    } catch {
      setAnnouncements([])
      setError(
        'Unable to load announcements right now.',
      )
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  if (loading) {
    return (
      <div
        className="mx-auto max-w-3xl space-y-6"
        aria-live="polite"
        aria-busy="true"
      >
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="animate-pulse rounded-2xl bg-isr-cream/80 p-8"
          >
            <div className="mb-4 h-4 w-32 rounded bg-isr-light-blue/30" />
            <div className="mb-3 h-8 w-3/4 rounded bg-isr-light-blue/30" />
            <div className="mb-2 h-4 w-full rounded bg-isr-light-blue/20" />
            <div className="h-4 w-5/6 rounded bg-isr-light-blue/20" />
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div
        role="alert"
        className="mx-auto max-w-xl rounded-2xl border border-isr-bright-red/20 bg-isr-yellow/60 px-6 py-8 text-center"
      >
        <p className="text-sm text-isr-dark-red">
          {error}
        </p>

        <button
          type="button"
          onClick={() => void load()}
          className="mt-4 text-sm font-semibold text-isr-turquoise underline-offset-2 hover:underline"
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
          No current announcements
        </p>

        <p className="mt-2 text-sm text-gray-600">
          Expired notices are automatically hidden.
          Check again later for new ISR updates.
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {announcements.map((announcement) => (
        <AnnouncementCard
          key={announcement.id}
          announcement={announcement}
        />
      ))}
    </div>
  )
}
