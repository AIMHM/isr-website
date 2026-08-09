'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import {
  canRegisterForEvent,
  fetchEvents,
  formatEventDate,
  formatEventTime,
  getEventStatus,
  getEventStatusLabel,
  sortEventsForDisplay,
  type Event,
  type EventStatus,
  type EventsFilter,
} from '@/lib/events'
import { ArrowRight } from '@/components/Icons'

const FILTERS: { value: EventsFilter; label: string }[] = [
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'past', label: 'Past' },
]

const STATUS_CLASSES: Record<EventStatus, string> = {
  scheduled: 'bg-isr-turquoise/15 text-isr-turquoise',
  'sold-out': 'bg-isr-yellow text-isr-dark-red',
  postponed: 'bg-amber-100 text-amber-900',
  cancelled: 'bg-red-100 text-red-800',
  completed: 'bg-isr-light-blue/25 text-isr-dark-red',
}

function EventPoster({ event }: { event: Event }) {
  if (!event.imageUrl) {
    return (
      <div className="relative flex aspect-[4/3] items-end overflow-hidden bg-gradient-to-br from-isr-cream via-isr-yellow/70 to-isr-light-blue/35 p-6">
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
        sizes="(max-width: 1024px) 100vw, 420px"
      />

      <Image
        src={event.imageUrl}
        alt={`${event.name} poster`}
        fill
        className="object-contain p-4"
        sizes="(max-width: 1024px) 100vw, 420px"
      />
    </div>
  )
}

function EventCard({ event }: { event: Event }) {
  const { date, time } = formatEventDate(event.date)
  const status = getEventStatus(event)
  const registrationAvailable = canRegisterForEvent(event)

  return (
    <article className="isr-card isr-card-interactive overflow-hidden">
      <div className="grid lg:grid-cols-[0.76fr_1.24fr]">
        <EventPoster event={event} />

        <div className="flex flex-col p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
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

          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1">
            <time
              dateTime={event.date}
              className="text-sm font-semibold uppercase tracking-[0.12em] text-isr-turquoise"
            >
              {date}
            </time>

            <span className="text-sm text-gray-600">
              {time}
              {event.endDate ? ` – ${formatEventTime(event.endDate)}` : ''}
            </span>
          </div>

          <h2 className="mt-3 text-2xl font-bold text-isr-dark-red sm:text-3xl">
            <Link
              href={`/events/${event.id}`}
              className="transition hover:text-isr-turquoise"
            >
              {event.name}
            </Link>
          </h2>

          {event.statusNote && (
            <p className="mt-4 rounded-xl bg-isr-yellow/60 px-4 py-3 text-sm font-semibold leading-relaxed text-isr-dark-red">
              {event.statusNote}
            </p>
          )}

          <p className="mt-4 line-clamp-3 leading-relaxed text-gray-700">
            {event.description}
          </p>

          <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-3">
            {event.venue && (
              <div>
                <dt className="font-semibold text-isr-dark-red">Venue</dt>
                <dd className="mt-1 text-gray-700">{event.venue}</dd>
              </div>
            )}

            {event.audience && (
              <div>
                <dt className="font-semibold text-isr-dark-red">Audience</dt>
                <dd className="mt-1 text-gray-700">{event.audience}</dd>
              </div>
            )}

            {event.price && (
              <div>
                <dt className="font-semibold text-isr-dark-red">Price</dt>
                <dd className="mt-1 text-gray-700">{event.price}</dd>
              </div>
            )}
          </dl>

          <div className="mt-auto flex flex-wrap gap-3 pt-7">
            <Link
              href={`/events/${event.id}`}
              className="isr-button-secondary gap-2 text-sm"
            >
              View details
              <ArrowRight />
            </Link>

            {registrationAvailable && event.ticketUrl && (
              <a
                href={event.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="isr-button-primary gap-2 text-sm"
              >
                Register
                <ArrowRight />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export default function EventsTimeline() {
  const [filter, setFilter] = useState<EventsFilter>('upcoming')
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const loadEvents = useCallback(async (selectedFilter: EventsFilter) => {
    setLoading(true)
    setError(false)

    try {
      const data = await fetchEvents(selectedFilter)
      setEvents(sortEventsForDisplay(data))
    } catch {
      setEvents([])
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadEvents(filter)
  }, [filter, loadEvents])

  return (
    <div>
      <div className="mb-10 flex justify-center gap-2" aria-label="Filter events">
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            aria-pressed={filter === value}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
              filter === value
                ? 'bg-isr-turquoise text-white'
                : 'bg-white text-gray-700 ring-1 ring-isr-light-blue/40 hover:text-isr-dark-red'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {loading && (
        <div className="space-y-7">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="h-72 animate-pulse rounded-3xl bg-white ring-1 ring-isr-light-blue/20"
            />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="mx-auto max-w-xl rounded-2xl bg-isr-yellow/60 px-6 py-8 text-center">
          <p className="text-sm text-isr-dark-red">
            Events could not be loaded right now.
          </p>

          <button
            type="button"
            onClick={() => void loadEvents(filter)}
            className="isr-text-link mt-4"
          >
            Try again
          </button>
        </div>
      )}

      {!loading && !error && events.length === 0 && (
        <div className="mx-auto max-w-xl rounded-2xl border border-isr-light-blue/30 bg-white px-6 py-12 text-center">
          <p className="text-lg font-semibold text-isr-dark-red">
            {filter === 'upcoming'
              ? 'No upcoming events are currently listed'
              : 'No past events are currently available'}
          </p>

          <Link href="/updates" className="isr-button-primary mt-6 text-sm">
            Check ISR updates
          </Link>
        </div>
      )}

      {!loading && !error && events.length > 0 && (
        <div className="space-y-7">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  )
}
