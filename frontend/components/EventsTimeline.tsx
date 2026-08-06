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

function EventCard({
  event,
  isLast,
}: {
  event: Event
  isLast: boolean
}) {
  const { date, time } = formatEventDate(event.date)
  const status = getEventStatus(event)
  const registrationAvailable =
    canRegisterForEvent(event)

  return (
    <article className="relative flex gap-6 md:gap-10">
      <div className="relative flex shrink-0 flex-col items-center">
        <div
          className={`relative z-10 flex h-5 w-5 items-center justify-center rounded-full ring-4 ring-isr-cream ${
            status === 'completed'
              ? 'bg-isr-light-blue'
              : status === 'cancelled'
                ? 'bg-isr-bright-red'
                : 'bg-isr-turquoise'
          }`}
          aria-hidden="true"
        >
          <div className="h-2 w-2 rounded-full bg-white" />
        </div>

        {!isLast && (
          <div
            className="absolute top-5 h-[calc(100%+2rem)] w-0.5 bg-gradient-to-b from-isr-turquoise/70 via-isr-light-blue/60 to-isr-turquoise/40"
            aria-hidden="true"
          />
        )}
      </div>

      <div
        className={`mb-12 flex-1 overflow-hidden rounded-2xl bg-white shadow-[0_12px_32px_rgba(91,11,5,0.08)] ring-1 ring-black/5 transition-shadow hover:shadow-[0_16px_40px_rgba(91,11,5,0.12)] ${
          status === 'completed' ? 'opacity-90' : ''
        }`}
      >
        {event.imageUrl && (
          <div className="relative mx-auto aspect-[3/4] w-full max-w-sm bg-isr-cream">
            <Image
              src={event.imageUrl}
              alt={`${event.name} poster`}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 384px"
            />
          </div>
        )}

        <div className="p-6 sm:p-8">
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

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
            <time
              dateTime={event.date}
              className="text-sm font-semibold uppercase tracking-[0.12em] text-isr-turquoise"
            >
              {date}
            </time>

            <span className="text-sm text-gray-600">
              {time}
              {event.endDate
                ? ` - ${formatEventTime(event.endDate)}`
                : ''}
            </span>
          </div>

          <h2 className="mt-3 text-2xl font-bold text-isr-dark-red sm:text-3xl">
            <Link
              href={`/events/${event.id}`}
              className="transition-colors hover:text-isr-turquoise"
            >
              {event.name}
            </Link>
          </h2>

          {event.statusNote && (
            <p className="mt-4 rounded-xl bg-isr-yellow/60 px-4 py-3 text-sm font-semibold text-isr-dark-red">
              {event.statusNote}
            </p>
          )}

          <p className="mt-4 line-clamp-3 leading-relaxed text-gray-700">
            {event.description}
          </p>

          <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
            {event.venue && (
              <div>
                <dt className="font-semibold text-isr-dark-red">
                  Venue
                </dt>
                <dd className="text-gray-700">
                  {event.venue}
                </dd>
              </div>
            )}

            {event.audience && (
              <div>
                <dt className="font-semibold text-isr-dark-red">
                  Audience
                </dt>
                <dd className="text-gray-700">
                  {event.audience}
                </dd>
              </div>
            )}

            {event.price && (
              <div>
                <dt className="font-semibold text-isr-dark-red">
                  Price
                </dt>
                <dd className="text-gray-700">
                  {event.price}
                </dd>
              </div>
            )}

            {event.accessibility && (
              <div>
                <dt className="font-semibold text-isr-dark-red">
                  Accessibility
                </dt>
                <dd className="text-gray-700">
                  {event.accessibility}
                </dd>
              </div>
            )}
          </dl>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/events/${event.id}`}
              className="inline-flex items-center gap-2 rounded-lg border-2 border-isr-turquoise px-5 py-2.5 text-sm font-semibold text-isr-turquoise transition-colors hover:bg-isr-turquoise hover:text-white"
            >
              View details
              <ArrowRight />
            </Link>

            {registrationAvailable && event.ticketUrl && (
              <a
                href={event.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-isr-turquoise px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-isr-dark-red"
              >
                Register
                <ArrowRight />
              </a>
            )}

            {status === 'sold-out' && (
              <span className="inline-flex items-center rounded-lg bg-isr-yellow px-5 py-2.5 text-sm font-semibold text-isr-dark-red">
                Registration closed
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export default function EventsTimeline() {
  const [filter, setFilter] =
    useState<EventsFilter>('upcoming')

  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  const [error, setError] =
    useState<string | null>(null)

  const loadEvents = useCallback(
    async (selectedFilter: EventsFilter) => {
      setLoading(true)
      setError(null)

      try {
        const data =
          await fetchEvents(selectedFilter)

        setEvents(sortEventsForDisplay(data))
      } catch {
        setEvents([])
        setError(
          'Unable to load events right now.',
        )
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
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                active
                  ? 'bg-isr-turquoise text-white'
                  : 'bg-white text-gray-700 ring-1 ring-isr-light-blue/40 hover:text-isr-turquoise'
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
          className="mx-auto max-w-3xl space-y-8"
          aria-live="polite"
          aria-busy="true"
        >
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="flex gap-6"
            >
              <div className="h-5 w-5 shrink-0 animate-pulse rounded-full bg-isr-light-blue/40" />

              <div className="flex-1 animate-pulse rounded-2xl bg-isr-cream/80 p-8">
                <div className="mb-4 h-4 w-40 rounded bg-isr-light-blue/30" />
                <div className="mb-3 h-8 w-3/4 rounded bg-isr-light-blue/30" />
                <div className="mb-2 h-4 w-full rounded bg-isr-light-blue/20" />
                <div className="h-4 w-5/6 rounded bg-isr-light-blue/20" />
              </div>
            </div>
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
            className="mt-4 text-sm font-semibold text-isr-turquoise underline-offset-2 hover:underline"
          >
            Try again
          </button>
        </div>
      )}

      {!loading &&
        !error &&
        events.length === 0 && (
          <div className="mx-auto max-w-xl rounded-2xl border border-isr-light-blue/30 bg-white px-6 py-12 text-center">
            <p className="text-lg font-semibold text-isr-dark-red">
              {filter === 'upcoming'
                ? 'No upcoming events are currently published'
                : filter === 'past'
                  ? 'No completed events are available'
                  : 'No events are currently published'}
            </p>

            <p className="mt-2 text-sm text-gray-600">
              Check ISR announcements and official
              social channels for further updates.
            </p>

            <Link
              href="/announcements"
              className="mt-5 inline-flex rounded-lg bg-isr-turquoise px-5 py-2.5 text-sm font-semibold text-white hover:bg-isr-dark-red"
            >
              View announcements
            </Link>
          </div>
        )}

      {!loading &&
        !error &&
        events.length > 0 && (
          <div className="mx-auto max-w-3xl">
            {events.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                isLast={
                  index === events.length - 1
                }
              />
            ))}
          </div>
        )}
    </div>
  )
}
