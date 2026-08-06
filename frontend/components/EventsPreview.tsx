'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  useCallback,
  useEffect,
  useState,
} from 'react'
import {
  fetchEvents,
  formatEventDate,
  formatEventTime,
  getEventStatus,
  getEventStatusLabel,
  type Event,
  type EventStatus,
} from '@/lib/events'

const STATUS_CLASSES: Record<EventStatus, string> = {
  scheduled:
    'bg-isr-turquoise/15 text-isr-turquoise',
  'sold-out':
    'bg-isr-yellow text-isr-dark-red',
  postponed:
    'bg-amber-100 text-amber-900',
  cancelled:
    'bg-red-100 text-red-800',
  completed:
    'bg-isr-light-blue/25 text-isr-dark-red',
}

function EventPreviewCard({
  event,
}: {
  event: Event
}) {
  const { date, time } =
    formatEventDate(event.date)

  const status = getEventStatus(event)

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-isr-light-blue/30 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      {event.imageUrl ? (
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-isr-cream">
          <Image
            src={event.imageUrl}
            alt={`${event.name} poster`}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      ) : (
        <div className="relative flex h-32 items-end overflow-hidden bg-gradient-to-br from-isr-cream to-isr-yellow p-5">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-isr-turquoise" />

          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-isr-dark-red/70">
            Islamic Society of RMIT
          </p>
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${STATUS_CLASSES[status]}`}
          >
            {getEventStatusLabel(status)}
          </span>

          {event.campus && (
            <span className="rounded-full bg-isr-cream px-3 py-1 text-xs font-semibold text-isr-dark-red">
              {event.campus}
            </span>
          )}
        </div>

        <h3 className="mt-4 text-xl font-bold leading-snug text-isr-dark-red">
          <Link
            href={`/events/${event.id}`}
            className="hover:text-isr-turquoise"
          >
            {event.name}
          </Link>
        </h3>

        <p className="mt-3 text-sm font-semibold text-gray-700">
          {date}
        </p>

        <p className="mt-1 text-sm text-gray-600">
          {time}
          {event.endDate
            ? ` - ${formatEventTime(event.endDate)}`
            : ''}
        </p>

        {event.venue && (
          <p className="mt-2 text-sm text-gray-600">
            {event.venue}
          </p>
        )}

        {event.statusNote && (
          <p className="mt-4 rounded-xl bg-isr-yellow/50 px-3 py-2 text-xs font-semibold leading-relaxed text-isr-dark-red">
            {event.statusNote}
          </p>
        )}

        <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-gray-700">
          {event.description}
        </p>

        <Link
          href={`/events/${event.id}`}
          className="mt-auto pt-6 text-sm font-semibold text-isr-turquoise hover:text-isr-dark-red"
        >
          View event details →
        </Link>
      </div>
    </article>
  )
}

function EventPreviewSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl bg-white">
      <div className="h-36 bg-isr-yellow" />

      <div className="space-y-3 p-5">
        <div className="h-5 w-24 rounded bg-isr-light-blue/30" />
        <div className="h-7 w-4/5 rounded bg-isr-light-blue/30" />
        <div className="h-4 w-1/2 rounded bg-isr-light-blue/20" />
        <div className="h-4 w-full rounded bg-isr-light-blue/20" />
        <div className="h-4 w-5/6 rounded bg-isr-light-blue/20" />
      </div>
    </div>
  )
}

export default function EventsPreview() {
  const [events, setEvents] =
    useState<Event[]>([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState<string | null>(null)

  const loadEvents = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const data =
        await fetchEvents('upcoming')

      setEvents(data.slice(0, 3))
    } catch {
      setEvents([])
      setError(
        'Unable to load upcoming events.',
      )
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadEvents()
  }, [loadEvents])

  return (
    <section className="bg-isr-light-blue/10 px-4 py-16 sm:py-20">
      <div className="container-isr mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-isr-turquoise">
            Community and activities
          </p>

          <h2 className="mt-3 text-3xl font-bold text-isr-dark-red sm:text-4xl">
            Upcoming events
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-700">
            Explore upcoming ISR programs, registrations
            and community activities.
          </p>
        </div>

        {loading && (
          <div
            className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            aria-live="polite"
            aria-busy="true"
          >
            {[0, 1, 2].map((index) => (
              <EventPreviewSkeleton key={index} />
            ))}
          </div>
        )}

        {!loading && error && (
          <div
            role="alert"
            className="mx-auto mt-10 max-w-xl rounded-2xl border border-isr-bright-red/20 bg-isr-yellow/60 px-6 py-8 text-center"
          >
            <p className="text-sm text-isr-dark-red">
              {error}
            </p>

            <button
              type="button"
              onClick={() => void loadEvents()}
              className="mt-4 text-sm font-semibold text-isr-turquoise underline-offset-2 hover:underline"
            >
              Try again
            </button>
          </div>
        )}

        {!loading &&
          !error &&
          events.length === 0 && (
            <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-isr-light-blue/30 bg-white px-6 py-10 text-center">
              <p className="font-semibold text-isr-dark-red">
                No upcoming events are currently published.
              </p>

              <Link
                href="/announcements"
                className="mt-4 inline-block text-sm font-semibold text-isr-turquoise hover:text-isr-dark-red"
              >
                Check announcements →
              </Link>
            </div>
          )}

        {!loading &&
          !error &&
          events.length > 0 && (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventPreviewCard
                  key={event.id}
                  event={event}
                />
              ))}
            </div>
          )}

        <div className="mt-10 text-center">
          <Link
            href="/events"
            className="inline-block rounded-full bg-isr-turquoise px-7 py-3 font-semibold text-white hover:bg-isr-dark-red"
          >
            View all events
          </Link>
        </div>
      </div>
    </section>
  )
}
