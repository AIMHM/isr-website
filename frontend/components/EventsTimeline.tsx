'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  useCallback,
  useEffect,
  useState,
} from 'react'
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

const FILTERS: {
  value: EventsFilter
  label: string
}[] = [
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'all', label: 'All events' },
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
    <article
      className={`isr-card isr-card-interactive overflow-hidden ${
        status === 'completed' ? 'opacity-90' : ''
      }`}
    >
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
              {event.endDate
                ? ` – ${formatEventTime(event.endDate)}`
                : ''}
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

          <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
            {event.venue && (
              <div>
                <dt className="font-semibold text-isr-dark-red">
                  Venue
                </dt>

                <dd className="mt-1 text-gray-700">
                  {event.venue}
                </dd>
              </div>
            )}

            {event.audience && (
              <div>
                <dt className="font-semibold text-isr-dark-red">
                  Audience
                </dt>

                <dd className="mt-1 text-gray-700">
                  {event.audience}
                </dd>
              </div>
            )}

            {event.price && (
              <div>
                <dt className="font-semibold text-isr-dark-red">
                  Price
                </dt>

                <dd className="mt-1 text-gray-700">
                  {event.price}
                </dd>
              </div>
            )}

            {event.accessibility && (
              <div>
                <dt className="font-semibold text-isr-dark-red">
                  Accessibility
                </dt>

                <dd className="mt-1 line-clamp-2 text-gray-700">
                  {event.accessibility}
                </dd>
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

            {status === 'sold-out' && (
              <span className="inline-flex items-center rounded-full bg-isr-yellow px-5 py-3 text-sm font-semibold text-isr-dark-red">
                Registration closed
              </span>
            )}

            {status === 'cancelled' && (
              <span className="inline-flex items-center rounded-full bg-red-100 px-5 py-3 text-sm font-semibold text-red-800">
                Event cancelled
              </span>
            )}

            {status === 'postponed' && (
              <span className="inline-flex items-center rounded-full bg-amber-100 px-5 py-3 text-sm font-semibold text-amber-900">
                Registration paused
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

function EventSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-3xl border border-isr-light-blue/20 bg-white">
      <div className="grid lg:grid-cols-[0.76fr_1.24fr]">
        <div className="aspect-[4/3] bg-isr-yellow/60" />

        <div className="space-y-4 p-8">
          <div className="h-5 w-32 rounded bg-isr-light-blue/30" />
          <div className="h-8 w-4/5 rounded bg-isr-light-blue/30" />
          <div className="h-4 w-full rounded bg-isr-light-blue/20" />
          <div className="h-4 w-5/6 rounded bg-isr-light-blue/20" />
          <div className="h-12 w-36 rounded-full bg-isr-light-blue/20" />
        </div>
      </div>
    </div>
  )
}

export default function EventsTimeline() {
  const [filter, setFilter] =
    useState<EventsFilter>('upcoming')

  const [events, setEvents] =
    useState<Event[]>([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState<string | null>(null)

  const loadEvents = useCallback(
    async (selectedFilter: EventsFilter) => {
      setLoading(true)
      setError(null)

      try {
        const data = await fetchEvents(selectedFilter)
        setEvents(sortEventsForDisplay(data))
      } catch {
        setEvents([])
        setError('Unable to load events right now.')
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  useEffect(() => {
    void loadEvents(filter)
  }, [filter, loadEvents])

  return (
    <div>
      <div
        className="mb-10 flex flex-wrap justify-center gap-2"
        aria-label="Filter events"
      >
        {FILTERS.map(({ value, label }) => {
          const active = filter === value

          return (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                active
                  ? 'bg-isr-turquoise text-white shadow-sm'
                  : 'bg-white text-gray-700 ring-1 ring-isr-light-blue/40 hover:text-isr-dark-red'
              }`}
              aria-pressed={active}
            >
              {label}
            </button>
          )
        })}
      </div>

      {loading && (
        <div
          className="space-y-7"
          aria-live="polite"
          aria-busy="true"
        >
          {[0, 1, 2].map((index) => (
            <EventSkeleton key={index} />
          ))}
        </div>
      )}

      {!loading && error && (
        <div
          role="alert"
          className="mx-auto max-w-xl rounded-2xl border border-isr-bright-red/20 bg-isr-yellow/60 px-6 py-8 text-center"
        >
          <p className="text-sm text-isr-dark-red">
            {error}
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
        <div className="mx-auto max-w-xl rounded-2xl border border-isr-light-blue/30 bg-white px-6 py-12 text-center shadow-sm">
          <p className="text-lg font-semibold text-isr-dark-red">
            {filter === 'upcoming'
              ? 'No upcoming events are currently published'
              : filter === 'past'
                ? 'No completed events are available'
                : 'No events are currently published'}
          </p>

          <p className="mt-2 text-sm leading-relaxed text-gray-600">
            Check announcements and official ISR social channels for further
            updates.
          </p>

          <Link
            href="/announcements"
            className="isr-button-primary mt-6 text-sm"
          >
            View announcements
          </Link>
        </div>
      )}

      {!loading && !error && events.length > 0 && (
        <div className="space-y-7">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
            />
          ))}
        </div>
      )}
    </div>
  )
}
