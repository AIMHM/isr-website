/* eslint-disable @next/next/no-img-element */
'use client'

import {
  useEffect,
  useState,
} from 'react'
import Link from 'next/link'
import {
  fetchEventById,
  type Event,
} from '@/lib/events'
import {
  EVENT_STATUS_CLASSES,
  EVENT_STATUS_LABELS,
  eventStatus,
  formatEventDate,
} from '@/lib/eventPresentation'

export default function EventDetailExperience({
  id,
}: {
  id: number
}) {
  const [
    event,
    setEvent,
  ] =
    useState<Event | null>(
      null,
    )

  const [
    loading,
    setLoading,
  ] =
    useState(true)

  const [
    error,
    setError,
  ] =
    useState(false)

  useEffect(() => {
    fetchEventById(id)
      .then(
        setEvent,
      )
      .catch(
        () =>
          setError(true),
      )
      .finally(
        () =>
          setLoading(false),
      )
  }, [id])

  if (loading) {
    return (
      <main
        id="main-content"
        className="px-4 py-14 sm:py-20"
      >
        <div className="container-isr mx-auto max-w-6xl">
          <div className="grid animate-pulse gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="aspect-[4/5] rounded-3xl bg-isr-cream" />
            <div>
              <div className="h-8 w-32 rounded bg-isr-cream" />
              <div className="mt-6 h-14 rounded bg-isr-cream" />
              <div className="mt-5 h-40 rounded bg-isr-cream" />
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (
    error ||
    !event
  ) {
    return (
      <main
        id="main-content"
        className="px-4 py-20"
      >
        <div className="container-isr mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold text-isr-dark-red">
            Event not found
          </h1>

          <p className="mt-4 text-gray-700">
            This event may have been removed or
            is currently unavailable.
          </p>

          <Link
            href="/events"
            className="isr-button-primary mt-7"
          >
            Back to events
          </Link>
        </div>
      </main>
    )
  }

  const status =
    eventStatus(event)

  const registrationAvailable =
    Boolean(
      event.ticketUrl,
    ) &&
    status !==
      'cancelled' &&
    status !==
      'completed' &&
    status !==
      'sold-out'

  return (
    <main id="main-content">
      <section className="bg-isr-cream/55 px-4 py-8">
        <div className="container-isr mx-auto max-w-6xl">
          <Link
            href="/events"
            className="text-sm font-bold text-isr-turquoise"
          >
            ← Back to events
          </Link>
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div className="container-isr mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="overflow-hidden rounded-[2rem] bg-isr-cream shadow-sm">
            {event.imageUrl ? (
              <img
                src={
                  event.imageUrl
                }
                alt={`${event.name} poster`}
                className="h-auto w-full object-cover"
              />
            ) : (
              <div className="flex aspect-[4/5] items-center justify-center p-10 text-center">
                <p className="text-2xl font-bold text-isr-dark-red/40">
                  Islamic Society of RMIT
                </p>
              </div>
            )}
          </div>

          <article>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-3 py-1.5 text-xs font-bold ${EVENT_STATUS_CLASSES[status]}`}
              >
                {
                  EVENT_STATUS_LABELS[
                    status
                  ]
                }
              </span>

              {event.campus && (
                <span className="rounded-full bg-isr-cream px-3 py-1.5 text-xs font-bold text-isr-dark-red">
                  {
                    event.campus
                  }
                </span>
              )}

              {event.audience && (
                <span className="rounded-full bg-isr-cream px-3 py-1.5 text-xs font-bold text-isr-dark-red">
                  {
                    event.audience
                  }
                </span>
              )}
            </div>

            <h1 className="mt-5 text-4xl font-bold leading-tight text-isr-dark-red sm:text-5xl">
              {event.name}
            </h1>

            <p className="mt-5 text-lg font-bold text-isr-turquoise">
              {
                formatEventDate(
                  event.date,
                )
              }
            </p>

            {event.endDate && (
              <p className="mt-1 text-sm text-gray-600">
                Ends:{' '}
                {
                  formatEventDate(
                    event.endDate,
                  )
                }
              </p>
            )}

            {event.statusNote && (
              <div className="mt-6 rounded-2xl border border-isr-yellow bg-isr-yellow/30 p-5">
                <p className="font-bold text-isr-dark-red">
                  Event update
                </p>

                <p className="mt-2 text-sm leading-relaxed text-gray-700">
                  {
                    event.statusNote
                  }
                </p>
              </div>
            )}

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {event.venue && (
                <div className="isr-card p-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                    Venue
                  </p>

                  <p className="mt-2 font-semibold text-isr-dark-red">
                    {
                      event.venue
                    }
                  </p>
                </div>
              )}

              {event.price && (
                <div className="isr-card p-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                    Price
                  </p>

                  <p className="mt-2 font-semibold text-isr-dark-red">
                    {
                      event.price
                    }
                  </p>
                </div>
              )}

              {event.audience && (
                <div className="isr-card p-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                    Audience
                  </p>

                  <p className="mt-2 font-semibold text-isr-dark-red">
                    {
                      event.audience
                    }
                  </p>
                </div>
              )}

              {event.campus && (
                <div className="isr-card p-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                    Campus
                  </p>

                  <p className="mt-2 font-semibold text-isr-dark-red">
                    {
                      event.campus
                    }
                  </p>
                </div>
              )}
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-isr-dark-red">
                About this event
              </h2>

              <p className="mt-4 whitespace-pre-line leading-relaxed text-gray-700">
                {
                  event.description
                }
              </p>
            </div>

            {event.accessibility && (
              <div className="mt-8 rounded-2xl bg-isr-cream/65 p-5">
                <h2 className="font-bold text-isr-dark-red">
                  Access information
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-gray-700">
                  {
                    event.accessibility
                  }
                </p>
              </div>
            )}

            <div className="mt-8 border-t border-isr-light-blue/20 pt-7">
              {registrationAvailable &&
              event.ticketUrl ? (
                <a
                  href={
                    event.ticketUrl
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="isr-button-primary"
                >
                  Register for this event
                </a>
              ) : status ===
                'sold-out' ? (
                <p className="inline-flex rounded-full bg-isr-yellow/50 px-5 py-3 font-bold text-isr-dark-red">
                  This event is sold out
                </p>
              ) : status ===
                'cancelled' ? (
                <p className="inline-flex rounded-full bg-red-100 px-5 py-3 font-bold text-red-800">
                  This event has been cancelled
                </p>
              ) : status ===
                'completed' ? (
                <p className="text-sm font-semibold text-gray-600">
                  This event has finished.
                </p>
              ) : (
                <p className="text-sm font-semibold text-gray-600">
                  Registration information is not
                  currently available.
                </p>
              )}
            </div>
          </article>
        </div>
      </section>
    </main>
  )
}
