import {
  appendMarkedBlock,
  assert,
  capture,
  checkRoutes,
  ensureImport,
  frontendRoot,
  read,
  run,
  write,
} from './helpers.mjs'

console.log(`
=================================================
ISR TOOLKIT - D4.1 + D4.2 + D4.3
SELF-HEALING LOCAL BUILD
=================================================
`)

/* =========================================================
 * SAFETY
 * ========================================================= */

const branch =
  capture(
    'git',
    [
      'branch',
      '--show-current',
    ],
  )

assert(
  branch ===
    'redesign/d4-features',
  `Expected redesign/d4-features. Current: ${branch}`,
)

const d3Tag =
  capture(
    'git',
    [
      'tag',
      '--list',
      'isr-d3-local-baseline-2026-08-10',
    ],
  )

assert(
  d3Tag ===
    'isr-d3-local-baseline-2026-08-10',
  'D3 baseline tag is missing.',
)

console.log(
  'PASS - branch and D3 baseline.',
)

/* =========================================================
 * D4.1 SMART PRAYER
 * ========================================================= */

const nextPrayer =
`'use client'

import {
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  fetchPrayerTimes,
  getNextPrayer,
  type DailyPrayer,
  type PrayerTimesData,
} from '@/lib/prayerTimes'

const TIME_ZONE =
  'Australia/Melbourne'

function parsePrayerTime(
  value: string,
) {
  const match =
    value.match(
      /(\\d{1,2}):(\\d{2})/,
    )

  if (!match) {
    return null
  }

  return {
    hour:
      Number(
        match[1],
      ),

    minute:
      Number(
        match[2],
      ),
  }
}

function melbourneSeconds() {
  const parts =
    new Intl.DateTimeFormat(
      'en-AU',
      {
        timeZone:
          TIME_ZONE,

        hour:
          '2-digit',

        minute:
          '2-digit',

        second:
          '2-digit',

        hour12:
          false,
      },
    ).formatToParts(
      new Date(),
    )

  const get =
    (
      type:
        'hour' |
        'minute' |
        'second',
    ) =>
      Number(
        parts.find(
          (part) =>
            part.type ===
            type,
        )?.value ??
          '0',
      )

  let hour =
    get(
      'hour',
    )

  if (
    hour ===
    24
  ) {
    hour = 0
  }

  return (
    hour * 3600 +
    get(
      'minute',
    ) *
      60 +
    get(
      'second',
    )
  )
}

function secondsUntil(
  value: string,
) {
  const parsed =
    parsePrayerTime(
      value,
    )

  if (!parsed) {
    return null
  }

  const now =
    melbourneSeconds()

  let target =
    parsed.hour *
      3600 +
    parsed.minute *
      60

  if (
    target <=
    now
  ) {
    target +=
      24 * 3600
  }

  return Math.max(
    0,
    target - now,
  )
}

function formatCountdown(
  seconds: number,
) {
  const minutesTotal =
    Math.max(
      0,
      Math.ceil(
        seconds / 60,
      ),
    )

  const hours =
    Math.floor(
      minutesTotal / 60,
    )

  const minutes =
    minutesTotal % 60

  if (
    hours > 0 &&
    minutes > 0
  ) {
    return \`\${hours}h \${minutes}m\`
  }

  if (
    hours > 0
  ) {
    return \`\${hours}h\`
  }

  if (
    minutes <= 1
  ) {
    return 'less than a minute'
  }

  return \`\${minutes}m\`
}

function displayTime(
  value: string,
) {
  const parsed =
    parsePrayerTime(
      value,
    )

  if (!parsed) {
    return value
  }

  const suffix =
    parsed.hour >=
    12
      ? 'pm'
      : 'am'

  const hour =
    parsed.hour %
      12 ||
    12

  return \`\${hour}:\${String(
    parsed.minute,
  ).padStart(
    2,
    '0',
  )} \${suffix}\`
}

function displayDate() {
  return new Intl.DateTimeFormat(
    'en-AU',
    {
      timeZone:
        TIME_ZONE,

      weekday:
        'long',

      day:
        'numeric',

      month:
        'long',

      year:
        'numeric',
    },
  ).format(
    new Date(),
  )
}

export default function NextPrayerCountdown() {
  const [
    data,
    setData,
  ] =
    useState<PrayerTimesData | null>(
      null,
    )

  const [
    loading,
    setLoading,
  ] =
    useState(true)

  const [
    failed,
    setFailed,
  ] =
    useState(false)

  const [
    tick,
    setTick,
  ] =
    useState(
      Date.now(),
    )

  useEffect(() => {
    let active =
      true

    async function load() {
      try {
        const result =
          await fetchPrayerTimes()

        if (!active) {
          return
        }

        setData(
          result,
        )

        setFailed(
          false,
        )
      }
      catch {
        if (active) {
          setFailed(
            true,
          )
        }
      }
      finally {
        if (active) {
          setLoading(
            false,
          )
        }
      }
    }

    void load()

    const refresh =
      window.setInterval(
        () => {
          void load()
        },
        60 * 60 * 1000,
      )

    return () => {
      active = false

      window.clearInterval(
        refresh,
      )
    }
  }, [])

  useEffect(() => {
    const timer =
      window.setInterval(
        () => {
          setTick(
            Date.now(),
          )
        },
        1000,
      )

    return () => {
      window.clearInterval(
        timer,
      )
    }
  }, [])

  const next =
    useMemo<DailyPrayer | null>(
      () =>
        data
          ? getNextPrayer(
              data.timings,
            )
          : null,
      [
        data,
        tick,
      ],
    )

  const time =
    next &&
    data
      ? data.timings[
          next
        ]
      : null

  const remaining =
    useMemo(
      () =>
        time
          ? secondsUntil(
              time,
            )
          : null,
      [
        time,
        tick,
      ],
    )

  if (loading) {
    return (
      <aside
        aria-busy="true"
        className="isr-next-prayer-card animate-pulse"
      >
        <div className="h-4 w-28 rounded bg-white/20" />
        <div className="mt-5 h-10 w-48 rounded bg-white/20" />
        <div className="mt-3 h-5 w-36 rounded bg-white/15" />
      </aside>
    )
  }

  if (
    failed ||
    !data ||
    !next ||
    !time ||
    remaining === null
  ) {
    return (
      <aside className="isr-next-prayer-card">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-yellow">
          Next prayer
        </p>

        <h3 className="mt-3 text-xl font-bold text-white">
          Live countdown unavailable
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-white/65">
          The full Melbourne prayer timetable
          remains available below.
        </p>
      </aside>
    )
  }

  return (
    <aside
      className="isr-next-prayer-card"
      aria-label={\`Next prayer is \${next} at \${displayTime(
        time,
      )}\`}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-yellow">
            Next prayer
          </p>

          <h3 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
            {next}
          </h3>
        </div>

        <div className="text-right">
          <p className="text-2xl font-bold text-isr-yellow sm:text-3xl">
            {displayTime(
              time,
            )}
          </p>

          <p className="mt-1 text-xs font-semibold text-white/55">
            Melbourne time
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.08] p-4">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/55">
          Time remaining
        </p>

        <p className="mt-1 text-2xl font-bold text-white">
          {formatCountdown(
            remaining,
          )}
        </p>
      </div>

      <p className="mt-5 text-xs font-semibold text-white/55">
        {displayDate()}
      </p>

      <p className="mt-4 text-xs leading-relaxed text-white/45">
        Prayer-time reference only. This does
        not indicate congregational iqamah time.
      </p>
    </aside>
  )
}
`

write(
  'components/NextPrayerCountdown.tsx',
  nextPrayer,
)

console.log(
  'PASS - D4.1 smart prayer component.',
)

/* =========================================================
 * D4.3 PRAYER QUICK NAV
 * ========================================================= */

const prayerQuickNav =
`'use client'

import {
  useState,
} from 'react'
import {
  PRAYER_SPACES,
} from '@/lib/siteContent'

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

export default function PrayerQuickNav() {
  const [
    copied,
    setCopied,
  ] =
    useState(false)

  const links = [
    {
      id:
        'jumuah',

      label:
        'Jumu’ah',
    },

    ...PRAYER_SPACES.map(
      (
        space,
      ) => ({
        id:
          space.id,

        label:
          space.name,
      }),
    ),

    {
      id:
        'daily-prayer-times',

      label:
        'Daily timetable',
    },
  ]

  async function copyPage() {
    const url =
      window.location.href

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

      setCopied(
        true,
      )

      window.setTimeout(
        () => {
          setCopied(
            false,
          )
        },
        2200,
      )
    }
    catch {
      setCopied(
        false,
      )
    }
  }

  return (
    <div className="isr-prayer-quick-nav">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-isr-turquoise">
            Quick navigation
          </p>

          <p className="mt-1 text-sm leading-relaxed text-gray-600">
            Jump directly to Jumu’ah, a campus
            prayer space or the daily timetable.
          </p>
        </div>

        <button
          type="button"
          onClick={
            copyPage
          }
          className="shrink-0 text-sm font-bold text-isr-turquoise transition hover:text-isr-dark-red"
        >
          {copied
            ? 'Prayer page link copied'
            : 'Copy prayer page link'}
        </button>
      </div>

      <nav
        aria-label="Prayer page quick navigation"
        className="isr-prayer-quick-nav-scroll mt-4"
      >
        {links.map(
          (
            link,
          ) => (
            <a
              key={
                link.id
              }
              href={\`#\${link.id}\`}
              className="isr-prayer-quick-nav-pill"
            >
              {link.label}
            </a>
          ),
        )}
      </nav>
    </div>
  )
}
`

write(
  'components/PrayerQuickNav.tsx',
  prayerQuickNav,
)

/* =========================================================
 * STRUCTURAL PRAY PAGE PATCH
 * ========================================================= */

let pray =
  read(
    'app/pray/page.tsx',
  )

pray =
  ensureImport(
    pray,
    "import NextPrayerCountdown from '@/components/NextPrayerCountdown'",
  )

pray =
  ensureImport(
    pray,
    "import PrayerQuickNav from '@/components/PrayerQuickNav'",
  )

if (
  !pray.includes(
    '<NextPrayerCountdown',
  )
) {
  const timetablePattern =
    /<PrayerTimesTable\b[^>]*\/>/

  assert(
    timetablePattern.test(
      pray,
    ),
    'Could not structurally locate <PrayerTimesTable />.',
  )

  pray =
    pray.replace(
      timetablePattern,
      `<div className="isr-prayer-tool-stack">
                <NextPrayerCountdown />

                <PrayerTimesTable />
              </div>`,
    )
}

if (
  !pray.includes(
    '<PrayerQuickNav',
  )
) {
  const directoryPattern =
    /<PrayerSpaceDirectory\b[^>]*\/>/

  assert(
    directoryPattern.test(
      pray,
    ),
    'Could not structurally locate <PrayerSpaceDirectory />.',
  )

  pray =
    pray.replace(
      directoryPattern,
      `<PrayerQuickNav />

              <div className="mt-7">
                <PrayerSpaceDirectory />
              </div>`,
    )
}

write(
  'app/pray/page.tsx',
  pray,
)

console.log(
  'PASS - /pray structurally patched.',
)

/* =========================================================
 * D4.2 EVENT UTILITIES
 * ========================================================= */

const eventUtilities =
`'use client'

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
      /\\.\\d{3}Z$/,
      'Z',
    )
}

function escapeIcs(
  value: string,
) {
  return value
    .replace(
      /\\\\/g,
      '\\\\\\\\',
    )
    .replace(
      /;/g,
      '\\\\;',
    )
    .replace(
      /,/g,
      '\\\\,',
    )
    .replace(
      /\\r?\\n/g,
      '\\\\n',
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
    return \`\${window.location.origin}/events/\${event.id}\`
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
      \`UID:isr-event-\${event.id}@theisr.com.au\`,
      \`DTSTAMP:\${stamp(
        new Date().toISOString(),
      )}\`,
      \`DTSTART:\${stamp(
        event.date,
      )}\`,
      event.endDate
        ? \`DTEND:\${stamp(
            event.endDate,
          )}\`
        : null,
      \`SUMMARY:\${escapeIcs(
        event.name,
      )}\`,
      eventLocation
        ? \`LOCATION:\${escapeIcs(
            eventLocation,
          )}\`
        : null,
      \`DESCRIPTION:\${escapeIcs(
        \`\${event.description}\\n\\nOfficial ISR event page: \${eventUrl()}\`,
      )}\`,
      \`URL:\${eventUrl()}\`,
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
        '\\r\\n',
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
      \`\${safeName(
        event.name,
      )}.ics\`

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
          \`\${stamp(
            event.date,
          )}/\${stamp(
            event.endDate,
          )}\`,

        details:
          \`\${event.description}\\n\\n\${eventUrl()}\`,

        location:
          location(
            event,
          ),
      })

    window.open(
      \`https://calendar.google.com/calendar/render?\${params.toString()}\`,
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
        ? \` – \${formatEventTime(
            event.endDate,
          )}\`
        : ''

    if (
      navigator.share
    ) {
      try {
        await navigator.share({
          title:
            event.name,

          text:
            \`\${event.name} · \${date} · \${time}\${end}\`,

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
      aria-labelledby={\`event-tools-\${event.id}\`}
    >
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-turquoise">
        Event tools
      </p>

      <h2
        id={\`event-tools-\${event.id}\`}
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
`

write(
  'components/EventUtilities.tsx',
  eventUtilities,
)

let eventDetail =
  read(
    'components/EventDetailExperience.tsx',
  )

eventDetail =
  ensureImport(
    eventDetail,
    "import EventUtilities from '@/components/EventUtilities'",
  )

if (
  !eventDetail.includes(
    '<EventUtilities',
  )
) {
  const close =
    eventDetail.lastIndexOf(
      '</main>',
    )

  assert(
    close >=
      0,
    'Could not locate </main> in EventDetailExperience.',
  )

  const render =
`
        <section className="bg-white px-4 pb-14 sm:pb-20">
          <div className="container-isr mx-auto max-w-6xl">
            <EventUtilities event={event} />
          </div>
        </section>

`

  eventDetail =
    eventDetail.slice(
      0,
      close,
    ) +
    render +
    eventDetail.slice(
      close,
    )
}

write(
  'components/EventDetailExperience.tsx',
  eventDetail,
)

console.log(
  'PASS - D4.2 event utilities.',
)

/* =========================================================
 * D4 CSS
 * ========================================================= */

let css =
  read(
    'app/d3-experience.css',
  )

const cssBlock =
`/* ISR TOOLKIT D4 UTILITIES */

.isr-next-prayer-card {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 1.75rem;
  background:
    radial-gradient(
      circle at 88% 10%,
      rgba(80, 149, 137, 0.34),
      transparent 38%
    ),
    linear-gradient(
      145deg,
      #5B0B05,
      #430805
    );
  padding: 1.5rem;
  box-shadow:
    0 18px 45px rgba(91, 11, 5, 0.16);
}

.isr-prayer-tool-stack {
  display: grid;
  gap: 1.25rem;
}

.isr-prayer-quick-nav {
  border: 1px solid rgba(152, 174, 168, 0.28);
  border-radius: 1.5rem;
  background: #ffffff;
  padding: 1rem;
  box-shadow:
    0 8px 26px rgba(91, 11, 5, 0.05);
}

.isr-prayer-quick-nav-scroll {
  display: flex;
  gap: 0.55rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
  scroll-snap-type: x proximity;
  scrollbar-width: thin;
}

.isr-prayer-quick-nav-pill {
  display: inline-flex;
  min-height: 2.65rem;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  scroll-snap-align: start;
  border: 1px solid rgba(152, 174, 168, 0.35);
  border-radius: 9999px;
  background: rgba(234, 227, 216, 0.45);
  padding: 0.6rem 1rem;
  color: #5B0B05;
  font-size: 0.8rem;
  font-weight: 700;
}

.isr-prayer-quick-nav-pill:hover {
  border-color: #509589;
  background: #509589;
  color: #ffffff;
}

.isr-event-tools {
  border: 1px solid rgba(152, 174, 168, 0.25);
  border-radius: 1.75rem;
  background:
    linear-gradient(
      145deg,
      rgba(234, 227, 216, 0.55),
      rgba(255, 255, 255, 0.98)
    );
  padding: 1.5rem;
  box-shadow:
    0 10px 32px rgba(91, 11, 5, 0.06);
}

.isr-event-tool-button {
  display: inline-flex;
  min-height: 3rem;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(152, 174, 168, 0.34);
  border-radius: 0.9rem;
  background: #ffffff;
  padding: 0.75rem 1rem;
  color: #5B0B05;
  font-size: 0.875rem;
  font-weight: 700;
  transition:
    transform 160ms ease,
    border-color 160ms ease,
    background-color 160ms ease;
}

.isr-event-tool-button:hover {
  transform: translateY(-1px);
  border-color: rgba(80, 149, 137, 0.7);
  background: rgba(234, 227, 216, 0.45);
}

@media (min-width: 1200px) {
  .isr-prayer-tool-stack {
    grid-template-columns:
      minmax(17rem, 0.72fr)
      minmax(0, 1.28fr);
    align-items: start;
  }

  .isr-next-prayer-card {
    position: sticky;
    top: 7rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .isr-event-tool-button {
    transition: none;
  }

  .isr-event-tool-button:hover {
    transform: none;
  }
}
`

css =
  appendMarkedBlock(
    css,
    'ISR TOOLKIT D4 UTILITIES',
    cssBlock,
  )

write(
  'app/d3-experience.css',
  css,
)

/* =========================================================
 * REGRESSION AUDIT
 * ========================================================= */

const prayerDirectory =
  read(
    'components/PrayerSpaceDirectory.tsx',
  )

pray =
  read(
    'app/pray/page.tsx',
  )

eventDetail =
  read(
    'components/EventDetailExperience.tsx',
  )

const eventTools =
  read(
    'components/EventUtilities.tsx',
  )

assert(
  pray.includes(
    'NextPrayerCountdown',
  ),
  'NextPrayerCountdown missing.',
)

assert(
  pray.includes(
    'PrayerQuickNav',
  ),
  'PrayerQuickNav missing.',
)

assert(
  pray.includes(
    'PrayerTimesTable',
  ),
  'PrayerTimesTable missing.',
)

assert(
  !prayerDirectory.includes(
    'JUMUAH_SERVICES',
  ),
  'PrayerSpaceDirectory duplicates Jumuah.',
)

assert(
  !prayerDirectory.includes(
    'fetchPrayerTimes',
  ),
  'PrayerSpaceDirectory duplicates timetable.',
)

assert(
  eventDetail.includes(
    'EventUtilities',
  ),
  'Event utilities missing from event detail.',
)

assert(
  eventTools.includes(
    'BEGIN:VCALENDAR',
  ),
  'ICS export missing.',
)

assert(
  eventTools.includes(
    'calendar.google.com',
  ),
  'Google Calendar missing.',
)

assert(
  eventTools.includes(
    'navigator.share',
  ),
  'Share API missing.',
)

console.log(
  'PASS - D4 source regression audit.',
)

/* =========================================================
 * STATIC QA
 * ========================================================= */

run(
  'git',
  [
    'diff',
    '--check',
  ],
)

run(
  'npm.cmd',
  [
    'run',
    'lint',
  ],
  {
    cwd:
      frontendRoot,
  },
)

for (
  const audit
  of [
    'scripts/route-audit.mjs',
    'scripts/link-audit.mjs',
    'scripts/final-audit.mjs',
    'scripts/encoding-audit.mjs',
    'scripts/d3-structure-audit.mjs',
  ]
) {
  try {
    read(
      audit,
    )
  }
  catch {
    continue
  }

  run(
    'node',
    [
      audit,
    ],
    {
      cwd:
        frontendRoot,
    },
  )
}

console.log(
  '\nPASS - static QA complete.',
)

/* =========================================================
 * LIVE QA
 * ========================================================= */

await checkRoutes(
  [
    '/',
    '/pray',
    '/events',
    '/start',
    '/join',
    '/support',
    '/contact',
    '/updates',
    '/about',
    '/admin/login',
    '/admin/events',
    '/admin/announcements',
  ],
)

console.log(`
=================================================
ISR TOOLKIT D4 PATCH COMPLETE
=================================================

D4.1:
 - next-prayer countdown
 - Melbourne time handling
 - prayer-time / iqamah distinction

D4.2:
 - .ics calendar export
 - Google Calendar
 - copy link
 - native share
 - registration shortcut
 - event-status awareness

D4.3:
 - prayer quick navigation
 - campus links sourced from PRAYER_SPACES
 - mobile horizontal navigation

No backend.
No database.
No Supabase.
No production.
`)
