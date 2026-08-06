import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  canRegisterForEvent,
  fetchEventById,
  formatEventDate,
  formatEventTime,
  getEventStatus,
  getEventStatusLabel,
  type EventStatus,
} from '@/lib/events'

type PageProps = {
  params: Promise<{ id: string }>
}

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

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params
  const eventId = Number(id)

  if (!Number.isInteger(eventId)) {
    return {
      title: 'Event Not Found',
    }
  }

  try {
    const event =
      await fetchEventById(eventId)

    if (!event) {
      return {
        title: 'Event Not Found',
      }
    }

    return {
      title: event.name,
      description: event.description,
    }
  } catch {
    return {
      title: 'Events',
    }
  }
}

export default async function EventDetailPage({
  params,
}: PageProps) {
  const { id } = await params
  const eventId = Number(id)

  if (!Number.isInteger(eventId)) {
    notFound()
  }

  const event =
    await fetchEventById(eventId)

  if (!event) {
    notFound()
  }

  const { date, time } =
    formatEventDate(event.date)

  const status = getEventStatus(event)
  const registrationAvailable =
    canRegisterForEvent(event)

  return (
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/20">
      <Navbar />

      <main
        id="main-content"
        className="px-4 py-16 sm:py-20"
      >
        <div className="container-isr mx-auto max-w-5xl">
          <Link
            href="/events"
            className="inline-flex text-sm font-semibold text-isr-turquoise hover:text-isr-dark-red"
          >
            Back to events
          </Link>

          <article className="mt-8 overflow-hidden rounded-3xl border border-isr-light-blue/30 bg-white shadow-sm">
            {event.imageUrl && (
              <div className="relative mx-auto aspect-[3/4] w-full max-w-xl bg-isr-cream">
                <Image
                  src={event.imageUrl}
                  alt={`${event.name} poster`}
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 576px"
                />
              </div>
            )}

            <div className="p-6 sm:p-10">
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

              <h1 className="mt-5 text-3xl font-bold text-isr-dark-red sm:text-5xl">
                {event.name}
              </h1>

              {event.statusNote && (
                <div
                  role="status"
                  className="mt-6 rounded-2xl border border-isr-bright-red/20 bg-isr-yellow/60 p-4 font-semibold text-isr-dark-red"
                >
                  {event.statusNote}
                </div>
              )}

              <dl className="mt-8 grid gap-5 rounded-2xl bg-isr-cream/50 p-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-semibold text-isr-dark-red">
                    Date
                  </dt>
                  <dd className="mt-1 text-gray-700">
                    {date}
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-semibold text-isr-dark-red">
                    Time
                  </dt>
                  <dd className="mt-1 text-gray-700">
                    {time}
                    {event.endDate
                      ? ` - ${formatEventTime(event.endDate)}`
                      : ''}
                  </dd>
                </div>

                {event.venue && (
                  <div>
                    <dt className="text-sm font-semibold text-isr-dark-red">
                      Venue
                    </dt>
                    <dd className="mt-1 text-gray-700">
                      {event.venue}
                    </dd>
                  </div>
                )}

                {event.campus && (
                  <div>
                    <dt className="text-sm font-semibold text-isr-dark-red">
                      Campus
                    </dt>
                    <dd className="mt-1 text-gray-700">
                      {event.campus}
                    </dd>
                  </div>
                )}

                {event.audience && (
                  <div>
                    <dt className="text-sm font-semibold text-isr-dark-red">
                      Audience
                    </dt>
                    <dd className="mt-1 text-gray-700">
                      {event.audience}
                    </dd>
                  </div>
                )}

                {event.price && (
                  <div>
                    <dt className="text-sm font-semibold text-isr-dark-red">
                      Price
                    </dt>
                    <dd className="mt-1 text-gray-700">
                      {event.price}
                    </dd>
                  </div>
                )}
              </dl>

              <section className="mt-8">
                <h2 className="text-2xl font-bold text-isr-dark-red">
                  About this event
                </h2>

                <p className="mt-4 whitespace-pre-line leading-relaxed text-gray-700">
                  {event.description}
                </p>
              </section>

              {event.accessibility && (
                <section className="mt-8 rounded-2xl border border-isr-light-blue/30 bg-white p-5">
                  <h2 className="text-lg font-bold text-isr-dark-red">
                    Accessibility
                  </h2>

                  <p className="mt-2 text-sm leading-relaxed text-gray-700">
                    {event.accessibility}
                  </p>

                  <Link
                    href="/accessibility"
                    className="mt-3 inline-flex text-sm font-semibold text-isr-turquoise hover:text-isr-dark-red"
                  >
                    Accessibility information
                  </Link>
                </section>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                {registrationAvailable &&
                  event.ticketUrl && (
                    <a
                      href={event.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-isr-turquoise px-6 py-3 font-semibold text-white hover:bg-isr-dark-red"
                    >
                      Register for this event
                    </a>
                  )}

                {status === 'sold-out' && (
                  <span className="rounded-lg bg-isr-yellow px-6 py-3 font-semibold text-isr-dark-red">
                    This event is sold out
                  </span>
                )}

                {status === 'cancelled' && (
                  <span className="rounded-lg bg-red-100 px-6 py-3 font-semibold text-red-800">
                    This event has been cancelled
                  </span>
                )}

                {status === 'postponed' && (
                  <span className="rounded-lg bg-amber-100 px-6 py-3 font-semibold text-amber-900">
                    Registration paused pending a new date
                  </span>
                )}
              </div>

              <div className="mt-10 border-t border-isr-light-blue/30 pt-6 text-xs leading-relaxed text-gray-500">
                <p>
                  Content owner:{' '}
                  {event.contentOwner ??
                    'Verification required'}
                </p>

                <p className="mt-1">
                  Last reviewed:{' '}
                  {event.reviewedAt
                    ? new Intl.DateTimeFormat(
                        'en-AU',
                        {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        },
                      ).format(
                        new Date(
                          event.reviewedAt,
                        ),
                      )
                    : 'Verification required'}
                </p>
              </div>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  )
}
