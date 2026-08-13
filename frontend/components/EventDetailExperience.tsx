/* eslint-disable @next/next/no-img-element */
'use client'

import EventUtilities from '@/components/EventUtilities'
import {
  useEffect,
  useState,
} from 'react'
import Link from 'next/link'
import {
  fetchEventById,
  getEventRegistrationMode,
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
    let active = true

    fetchEventById(id)
      .then((data) => {
        if (active) {
          setEvent(data)
        }
      })
      .catch(() => {
        if (active) {
          setError(true)
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [id])

  if (loading) {
    return (
      <main
        id="main-content"
        className="px-4 py-12 sm:py-16"
      >
        <span className="sr-only">
          Loading event
        </span>

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
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-isr-turquoise">
            Event unavailable
          </p>

          <h1 className="mt-3 text-4xl font-bold text-isr-dark-red">
            We couldn&apos;t find this event
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-gray-700">
            It may have been removed, the link may be
            outdated, or the event record may currently
            be unavailable.
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

  const registrationMode =
    getEventRegistrationMode(
      event,
    )

  const registrationAvailable =
    Boolean(
      event.ticketUrl,
    ) &&
    (
      registrationMode ===
        'required' ||
      registrationMode ===
        'optional'
    ) &&
    status !==
      'cancelled' &&
    status !==
      'completed' &&
    status !==
      'sold-out'

  const registrationBlock = (
    <>
      {registrationAvailable &&
      event.ticketUrl ? (
        <a
          href={event.ticketUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="isr-button-primary"
        >
          Register for this event
        </a>
      ) : registrationMode ===
        'none' ? (
        <p className="rounded-xl bg-isr-turquoise/10 px-5 py-3 text-center font-bold text-isr-dark-red">
          No registration required — just attend.
        </p>
      ) : registrationMode ===
        'closed' ? (
        <p className="rounded-xl bg-gray-100 px-5 py-3 text-center font-bold text-gray-700">
          Registration is closed
        </p>
      ) : status ===
        'sold-out' ? (
        <p className="rounded-xl bg-isr-yellow/50 px-5 py-3 text-center font-bold text-isr-dark-red">
          This event is sold out
        </p>
      ) : status ===
        'cancelled' ? (
        <p className="rounded-xl bg-red-100 px-5 py-3 text-center font-bold text-red-800">
          This event has been cancelled
        </p>
      ) : status ===
        'completed' ? (
        <p className="rounded-xl bg-gray-100 px-5 py-3 text-center text-sm font-semibold text-gray-700">
          This event has finished.
        </p>
      ) : (
        <p className="rounded-xl bg-isr-cream px-5 py-3 text-center text-sm font-semibold text-gray-700">
          Registration information is not currently available.
        </p>
      )}
    </>
  )

  return (
    <main id="main-content">
      <section className="border-b border-isr-light-blue/20 bg-isr-cream/55 px-4 py-6">
        <div className="container-isr mx-auto max-w-6xl">
          <Link
            href="/events"
            className="inline-flex font-bold text-isr-turquoise"
          >
            ← Back to events
          </Link>
        </div>
      </section>

      <section className="px-4 py-10 sm:py-14 lg:py-16">
        <div className="container-isr mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-12 lg:items-start">
          <aside className="lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-[1.75rem] bg-isr-cream shadow-sm">
              {event.imageUrl ? (
                <img
                  src={event.imageUrl}
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

            <div className="mt-5 hidden lg:block">
              {registrationBlock}
            </div>
          </aside>

          <article className="min-w-0">
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
                  {event.campus}
                </span>
              )}

              {event.audience && (
                <span className="rounded-full bg-isr-cream px-3 py-1.5 text-xs font-bold text-isr-dark-red">
                  {event.audience}
                </span>
              )}
            </div>

            <h1 className="mt-5 break-words text-4xl font-bold leading-tight text-isr-dark-red sm:text-5xl">
              {event.name}
            </h1>

            <p className="mt-5 text-lg font-bold text-isr-turquoise">
              {formatEventDate(
                event.date,
              )}
            </p>

            {event.endDate && (
              <p className="mt-1 text-sm text-gray-600">
                Finishes:{' '}
                {formatEventDate(
                  event.endDate,
                )}
              </p>
            )}

            {event.statusNote && (
              <div
                role="status"
                className="mt-6 rounded-2xl border border-isr-yellow bg-isr-yellow/30 p-5"
              >
                <p className="font-bold text-isr-dark-red">
                  Event update
                </p>

                <p className="mt-2 text-sm leading-relaxed text-gray-700">
                  {event.statusNote}
                </p>
              </div>
            )}

            <section
              aria-labelledby="event-details-heading"
              className="mt-8"
            >
              <h2
                id="event-details-heading"
                className="text-xl font-bold text-isr-dark-red"
              >
                Event details
              </h2>

              <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                {event.venue && (
                  <div className="rounded-2xl border border-isr-light-blue/20 bg-white p-5">
                    <dt className="text-xs font-bold uppercase tracking-wide text-gray-500">
                      Venue
                    </dt>

                    <dd className="mt-2 font-semibold leading-relaxed text-isr-dark-red">
                      {event.venue}
                    </dd>
                  </div>
                )}

                {event.price && (
                  <div className="rounded-2xl border border-isr-light-blue/20 bg-white p-5">
                    <dt className="text-xs font-bold uppercase tracking-wide text-gray-500">
                      Price
                    </dt>

                    <dd className="mt-2 font-semibold text-isr-dark-red">
                      {event.price}
                    </dd>
                  </div>
                )}

                {event.audience && (
                  <div className="rounded-2xl border border-isr-light-blue/20 bg-white p-5">
                    <dt className="text-xs font-bold uppercase tracking-wide text-gray-500">
                      Audience
                    </dt>

                    <dd className="mt-2 font-semibold text-isr-dark-red">
                      {event.audience}
                    </dd>
                  </div>
                )}

                {event.campus && (
                  <div className="rounded-2xl border border-isr-light-blue/20 bg-white p-5">
                    <dt className="text-xs font-bold uppercase tracking-wide text-gray-500">
                      Campus
                    </dt>

                    <dd className="mt-2 font-semibold text-isr-dark-red">
                      {event.campus}
                    </dd>
                  </div>
                )}
              </dl>
            </section>

            <section className="mt-9">
              <h2 className="text-2xl font-bold text-isr-dark-red">
                About this event
              </h2>

              <p className="mt-4 whitespace-pre-line break-words leading-relaxed text-gray-700">
                {event.description}
              </p>
            </section>

            {event.accessibility && (
              <section className="mt-8 rounded-2xl bg-isr-cream/65 p-5 sm:p-6">
                <h2 className="font-bold text-isr-dark-red">
                  Access information
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-gray-700">
                  {event.accessibility}
                </p>
              </section>
            )}

            <div className="mt-8 lg:hidden">
              {registrationBlock}
            </div>

            <div className="mt-9 border-t border-isr-light-blue/20 pt-7">
              <p className="text-sm leading-relaxed text-gray-600">
                Questions about this event?
              </p>

              <Link
                href="/contact"
                className="isr-text-link mt-3"
              >
                Contact ISR →
              </Link>
            </div>
          </article>
        </div>
      </section>

        <section className="bg-white px-4 pb-14 sm:pb-20">
          <div className="container-isr mx-auto max-w-6xl">
            <EventUtilities event={event} />
          </div>
        </section>

</main>
  )
}
