'use client'

import {
  useState,
} from 'react'
import {
  canRegisterForEvent,
  formatEventDate,
  formatEventTime,
  getEventStatus,
  type Event,
} from '@/lib/events'

type Props = {
  event: Event
}

function stamp(
  iso: string,
) {
  return new Date(
    iso,
  )
    .toISOString()
    .replace(
      /[-:]/g,
      '',
    )
    .replace(
      /\.\d{3}Z$/,
      'Z',
    )
}

function escapeIcs(
  value: string,
) {
  return value
    .replace(
      /\\/g,
      '\\\\',
    )
    .replace(
      /;/g,
      '\\;',
    )
    .replace(
      /,/g,
      '\\,',
    )
    .replace(
      /\r?\n/g,
      '\\n',
    )
}

function safeName(
  value: string,
) {
  return (
    value
      .toLowerCase()
      .replace(
        /[^a-z0-9]+/g,
        '-',
      )
      .replace(
        /^-+|-+$/g,
        '',
      )
      .slice(
        0,
        70,
      ) ||
    'isr-event'
  )
}

function location(
  event: Event,
) {
  return [
    event.venue,
    event.campus,
  ]
    .filter(Boolean)
    .join(', ')
}

function fallbackCopy(
  value: string,
) {
  const textarea =
    document.createElement(
      'textarea',
    )

  textarea.value =
    value

  textarea.style.position =
    'fixed'

  textarea.style.opacity =
    '0'

  textarea.setAttribute(
    'readonly',
    '',
  )

  document.body.appendChild(
    textarea,
  )

  textarea.select()

  const copied =
    document.execCommand(
      'copy',
    )

  textarea.remove()

  return copied
}

export default function EventUtilities({
  event,
}: Props) {
  const [
    notice,
    setNotice,
  ] =
    useState('')

  const status =
    getEventStatus(
      event,
    )

  const calendarAllowed =
    status ===
      'scheduled' ||
    status ===
      'sold-out'

  const registrationAvailable =
    canRegisterForEvent(
      event,
    ) &&
    Boolean(
      event.ticketUrl,
    )

  const {
    date,
    time,
  } =
    formatEventDate(
      event.date,
    )

  function eventUrl() {
    return `${window.location.origin}/events/${event.id}`
  }

  function notify(
    message: string,
  ) {
    setNotice(
      message,
    )

    window.setTimeout(
      () => {
        setNotice('')
      },
      2400,
    )
  }

  function downloadCalendar() {
    if (!calendarAllowed) {
      return
    }

    const eventLocation =
      location(
        event,
      )

    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Islamic Society of RMIT//ISR Events//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:isr-event-${event.id}@theisr.com.au`,
      `DTSTAMP:${stamp(
        new Date().toISOString(),
      )}`,
      `DTSTART:${stamp(
        event.date,
      )}`,
      event.endDate
        ? `DTEND:${stamp(
            event.endDate,
          )}`
        : null,
      `SUMMARY:${escapeIcs(
        event.name,
      )}`,
      eventLocation
        ? `LOCATION:${escapeIcs(
            eventLocation,
          )}`
        : null,
      `DESCRIPTION:${escapeIcs(
        `${event.description}\n\nOfficial ISR event page: ${eventUrl()}`,
      )}`,
      `URL:${eventUrl()}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ]
      .filter(
        (
          line,
        ): line is string =>
          Boolean(
            line,
          ),
      )
      .join(
        '\r\n',
      )

    const blob =
      new Blob(
        [
          lines,
        ],
        {
          type:
            'text/calendar;charset=utf-8',
        },
      )

    const blobUrl =
      URL.createObjectURL(
        blob,
      )

    const anchor =
      document.createElement(
        'a',
      )

    anchor.href =
      blobUrl

    anchor.download =
      `${safeName(
        event.name,
      )}.ics`

    document.body.appendChild(
      anchor,
    )

    anchor.click()
    anchor.remove()

    URL.revokeObjectURL(
      blobUrl,
    )

    notify(
      'Calendar file downloaded.',
    )
  }

  function googleCalendar() {
    if (
      !calendarAllowed ||
      !event.endDate
    ) {
      return
    }

    const params =
      new URLSearchParams({
        action:
          'TEMPLATE',

        text:
          event.name,

        dates:
          `${stamp(
            event.date,
          )}/${stamp(
            event.endDate,
          )}`,

        details:
          `${event.description}\n\n${eventUrl()}`,

        location:
          location(
            event,
          ),
      })

    window.open(
      `https://calendar.google.com/calendar/render?${params.toString()}`,
      '_blank',
      'noopener,noreferrer',
    )
  }

  async function copyLink() {
    const url =
      eventUrl()

    try {
      if (
        navigator.clipboard &&
        window.isSecureContext
      ) {
        await navigator.clipboard.writeText(
          url,
        )
      }
      else if (
        !fallbackCopy(
          url,
        )
      ) {
        throw new Error(
          'Copy failed',
        )
      }

      notify(
        'Event link copied.',
      )
    }
    catch {
      notify(
        'Could not copy the event link.',
      )
    }
  }

  async function shareEvent() {
    const url =
      eventUrl()

    const end =
      event.endDate
        ? ` – ${formatEventTime(
            event.endDate,
          )}`
        : ''

    if (
      navigator.share
    ) {
      try {
        await navigator.share({
          title:
            event.name,

          text:
            `${event.name} · ${date} · ${time}${end}`,

          url,
        })

        return
      }
      catch (
        error
      ) {
        if (
          error instanceof
            DOMException &&
          error.name ===
            'AbortError'
        ) {
          return
        }
      }
    }

    await copyLink()
  }

  return (
    <section
      className="isr-event-tools"
      aria-labelledby={`event-tools-${event.id}`}
    >
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-turquoise">
        Event tools
      </p>

      <h2
        id={`event-tools-${event.id}`}
        className="mt-2 text-2xl font-bold text-isr-dark-red"
      >
        Save it. Share it. Be there.
      </h2>

      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-600">
        Save the confirmed event details or share
        the official ISR event page.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {calendarAllowed && (
          <button
            type="button"
            onClick={
              downloadCalendar
            }
            className="isr-event-tool-button"
          >
            Download calendar
          </button>
        )}

        {calendarAllowed &&
          event.endDate && (
            <button
              type="button"
              onClick={
                googleCalendar
              }
              className="isr-event-tool-button"
            >
              Google Calendar
            </button>
          )}

        <button
          type="button"
          onClick={
            copyLink
          }
          className="isr-event-tool-button"
        >
          Copy event link
        </button>

        <button
          type="button"
          onClick={
            shareEvent
          }
          className="isr-event-tool-button"
        >
          Share event
        </button>
      </div>

      {calendarAllowed &&
        !event.endDate && (
          <p className="mt-4 text-xs leading-relaxed text-gray-500">
            No end time has been published. The
            calendar download contains the confirmed
            start time only.
          </p>
        )}

      {registrationAvailable &&
        event.ticketUrl && (
          <div className="mt-5 rounded-2xl bg-isr-dark-red p-4 text-white sm:flex sm:items-center sm:justify-between sm:gap-5">
            <div>
              <p className="font-bold">
                Registration is available
              </p>

              <p className="mt-1 text-sm text-white/65">
                Continue to the registration provider
                when you are ready.
              </p>
            </div>

            <a
              href={
                event.ticketUrl
              }
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-bold text-isr-dark-red transition hover:bg-isr-yellow sm:mt-0"
            >
              Register
            </a>
          </div>
        )}

      {!calendarAllowed && (
        <p className="mt-5 rounded-xl bg-isr-cream px-4 py-3 text-sm leading-relaxed text-gray-700">
          Calendar actions are unavailable because
          this event is currently marked{' '}
          {status.replace(
            '-',
            ' ',
          )}.
          Sharing remains available.
        </p>
      )}

      <p
        aria-live="polite"
        className="mt-4 min-h-5 text-sm font-semibold text-isr-turquoise"
      >
        {notice}
      </p>
    </section>
  )
}
