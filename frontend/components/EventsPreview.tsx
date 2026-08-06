'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  useCallback,
  useEffect,
  useState,
} from 'react'
import SectionHeading from '@/components/SectionHeading'
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
  scheduled: 'bg-isr-turquoise/15 text-isr-turquoise',
  'sold-out': 'bg-isr-yellow text-isr-dark-red',
  postponed: 'bg-amber-100 text-amber-900',
  cancelled: 'bg-red-100 text-red-800',
  completed: 'bg-isr-light-blue/25 text-isr-dark-red',
}

function EventImage({ event }: { event: Event }) {
  if (!event.imageUrl) {
    return (
      <div className="relative flex aspect-[4/3] items-end overflow-hidden bg-gradient-to-br from-isr-cream via-isr-yellow/70 to-isr-light-blue/35 p-5">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-isr-turquoise" />

        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-isr-dark-red/70">
          Islamic Society of RMIT
        </p>
      </div>
    )
  }

  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-isr-cream">
      <Image
        src={event.imageUrl}
        alt=""
        fill
        aria-hidden="true"
        className="scale-110 object-cover opacity-25 blur-xl"
        sizes="(max-width: 768px) 100vw, 33vw"
      />

      <Image
        src={event.imageUrl}
        alt={`${event.name} poster`}
        fill
        className="object-contain p-3"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
    </div>
  )
}

function EventPreviewCard({ event }: { event: Event }) {
  const { date, time } = formatEventDate(event.date)
  const status = getEventStatus(event)

  return (
    <article className="isr-card isr-card-interactive flex h-full flex-col overflow-hidden">
      <EventImage event={event} />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
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
            className="transition hover:text-isr-turquoise"
          >
            {event.name}
          </Link>
        </h3>

        <div className="mt-4 space-y-1 text-sm">
          <p className="font-semibold text-gray-800">{date}</p>

          <p className="text-gray-600">
            {time}
            {event.endDate
              ? ` – ${formatEventTime(event.endDate)}`
              : ''}
          </p>

          {event.venue && (
            <p className="text-gray-600">{event.venue}</p>
          )}
        </div>

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
          className="isr-text-link mt-auto pt-6"
        >
          View event details
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  )
}

function EventPreviewSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-3xl border border-isr-light-blue/20 bg-white">
      <div className="aspect-[4/3] bg-isr-yellow/70" />

      <div className="space-y-3 p-6">
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
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadEvents = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await fetchEvents('upcoming')
      setEvents(data.slice(0, 3))
    } catch {
      setEvents([])
      setError('Unable to load upcoming events.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadEvents()
  }, [loadEvents])

  return (
    <section
      aria-labelledby="upcoming-events-heading"
      className="bg-isr-light-blue/10 px-4 py-16 sm:py-20"
    >
      <div className="container-isr mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Community and activities"
          title="Upcoming events"
          description="Explore upcoming ISR programs, registrations and community activities."
          align="center"
          id="upcoming-events-heading"
        />

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
            <p className="text-sm text-isr-dark-red">{error}</p>

            <button
              type="button"
              onClick={() => void loadEvents()}
              className="isr-text-link mt-4"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && events.length === 0 && (
          <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-isr-light-blue/30 bg-white px-6 py-10 text-center">
            <p className="font-semibold text-isr-dark-red">
              No upcoming events are currently published.
            </p>

            <Link
              href="/announcements"
              className="isr-text-link mt-4"
            >
              Check announcements
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        )}

        {!loading && !error && events.length > 0 && (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventPreviewCard key={event.id} event={event} />
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link href="/events" className="isr-button-primary">
            View all events
          </Link>
        </div>
      </div>
    </section>
  )
}
