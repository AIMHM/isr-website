/* eslint-disable @next/next/no-img-element */

import Link from 'next/link'
import type {
  Event,
} from '@/lib/events'
import {
  EVENT_STATUS_CLASSES,
  EVENT_STATUS_LABELS,
  eventStatus,
  formatEventDate,
  formatEventDay,
} from '@/lib/eventPresentation'

export default function EventCard({
  event,
  compact = false,
}: {
  event: Event
  compact?: boolean
}) {
  const status =
    eventStatus(event)

  const date =
    formatEventDay(
      event.date,
    )

  return (
    <article className="isr-card group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-isr-cream to-isr-light-blue/35">
        {event.imageUrl ? (
          <img
            src={
              event.imageUrl
            }
            alt={`${event.name} poster`}
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full items-center justify-center px-8 text-center">
            <p className="text-lg font-bold text-isr-dark-red/45">
              Islamic Society of RMIT
            </p>
          </div>
        )}

        <div className="absolute left-4 top-4 rounded-xl bg-white px-3 py-2 text-center shadow-sm">
          <span className="block text-lg font-bold leading-none text-isr-dark-red">
            {date.day}
          </span>

          <span className="mt-1 block text-[10px] font-bold tracking-wide text-isr-turquoise">
            {date.month}
          </span>
        </div>

        <span
          className={`absolute right-4 top-4 rounded-full px-3 py-1.5 text-xs font-bold shadow-sm ${EVENT_STATUS_CLASSES[status]}`}
        >
          {
            EVENT_STATUS_LABELS[
              status
            ]
          }
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap gap-2 text-xs font-semibold text-gray-500">
          {event.campus && (
            <span className="rounded-full bg-isr-cream px-3 py-1">
              {
                event.campus
              }
            </span>
          )}

          {event.audience && (
            <span className="rounded-full bg-isr-cream px-3 py-1">
              {
                event.audience
              }
            </span>
          )}
        </div>

        <Link
          href={`/events/${event.id}`}
          className="mt-4 text-xl font-bold leading-snug text-isr-dark-red transition hover:text-isr-turquoise"
        >
          {event.name}
        </Link>

        <p className="mt-3 text-sm font-semibold text-isr-turquoise">
          {
            formatEventDate(
              event.date,
            )
          }
        </p>

        {!compact && (
          <p className="mt-4 line-clamp-4 flex-1 text-sm leading-relaxed text-gray-700">
            {
              event.description
            }
          </p>
        )}

        {event.statusNote && (
          <p className="mt-4 rounded-xl bg-isr-yellow/30 p-3 text-sm font-medium text-isr-dark-red">
            {
              event.statusNote
            }
          </p>
        )}

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-isr-light-blue/20 pt-4">
          <div className="text-sm text-gray-600">
            {event.venue && (
              <span>
                {
                  event.venue
                }
              </span>
            )}

            {event.price && (
              <span className="ml-2 font-semibold text-isr-dark-red">
                • {
                  event.price
                }
              </span>
            )}
          </div>

          <Link
            href={`/events/${event.id}`}
            className="inline-flex min-h-11 items-center font-bold text-isr-turquoise transition hover:text-isr-dark-red"
          >
            View details →
          </Link>
        </div>
      </div>
    </article>
  )
}
