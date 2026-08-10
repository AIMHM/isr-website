import fs from 'node:fs'

import {
  appendMarkedBlock,
  assert,
  ensureImport,
  read,
  write,
} from './helpers.mjs'

console.log(`
=================================================
ISR D7
STUDENT EXPERIENCE
=================================================
`)

/* =========================================================
 * HOME — STUDENT DASHBOARD
 * ========================================================= */

const dashboard =
String.raw`'use client'

import Link from 'next/link'
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

import {
  fetchEvents,
  formatEventDate,
  getEventStatus,
  type Event,
} from '@/lib/events'

import {
  fetchAnnouncements,
  type Announcement,
} from '@/lib/announcements'

type LoadState =
  'loading' |
  'ready' |
  'partial'

function findNextEvent(
  events: Event[],
): Event | null {
  const now =
    Date.now()

  return [...events]
    .filter(
      (
        event,
      ) => {
        const status =
          getEventStatus(
            event,
          )

        return (
          new Date(
            event.date,
          ).getTime() >=
            now &&
          status !==
            'cancelled' &&
          status !==
            'completed'
        )
      },
    )
    .sort(
      (
        first,
        second,
      ) =>
        new Date(
          first.date,
        ).getTime() -
        new Date(
          second.date,
        ).getTime(),
    )[0] ??
    null
}

function pickUpdate(
  updates: Announcement[],
): Announcement | null {
  return (
    updates.find(
      (
        update,
      ) =>
        update.priority ===
        'urgent',
    ) ??
    updates.find(
      (
        update,
      ) =>
        update.pinned,
    ) ??
    updates[0] ??
    null
  )
}

export default function HomeStudentDashboard() {
  const [
    prayer,
    setPrayer,
  ] =
    useState<PrayerTimesData | null>(
      null,
    )

  const [
    nextPrayer,
    setNextPrayer,
  ] =
    useState<DailyPrayer>(
      'Fajr',
    )

  const [
    events,
    setEvents,
  ] =
    useState<Event[]>(
      [],
    )

  const [
    updates,
    setUpdates,
  ] =
    useState<Announcement[]>(
      [],
    )

  const [
    state,
    setState,
  ] =
    useState<LoadState>(
      'loading',
    )

  useEffect(
    () => {
      let active =
        true

      Promise.allSettled([
        fetchPrayerTimes(),
        fetchEvents(),
        fetchAnnouncements(),
      ])
        .then(
          (
            results,
          ) => {
            if (!active) {
              return
            }

            const [
              prayerResult,
              eventsResult,
              updatesResult,
            ] =
              results

            let success =
              0

            if (
              prayerResult.status ===
              'fulfilled'
            ) {
              setPrayer(
                prayerResult.value,
              )

              setNextPrayer(
                getNextPrayer(
                  prayerResult
                    .value
                    .timings,
                ),
              )

              success +=
                1
            }

            if (
              eventsResult.status ===
              'fulfilled'
            ) {
              setEvents(
                eventsResult.value,
              )

              success +=
                1
            }

            if (
              updatesResult.status ===
              'fulfilled'
            ) {
              setUpdates(
                updatesResult.value,
              )

              success +=
                1
            }

            setState(
              success ===
                3
                ? 'ready'
                : 'partial',
            )
          },
        )

      return () => {
        active =
          false
      }
    },
    [],
  )

  const nextEvent =
    useMemo(
      () =>
        findNextEvent(
          events,
        ),
      [
        events,
      ],
    )

  const currentUpdate =
    useMemo(
      () =>
        pickUpdate(
          updates,
        ),
      [
        updates,
      ],
    )

  return (
    <section
      aria-labelledby="student-dashboard-heading"
      className="isr-home-dashboard-section"
    >
      <div className="container-isr mx-auto max-w-6xl px-4">
        <div className="isr-home-dashboard-shell">
          <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-isr-turquoise">
                Your ISR dashboard
              </p>

              <h2
                id="student-dashboard-heading"
                className="mt-3 text-3xl font-bold tracking-tight text-isr-dark-red sm:text-4xl"
              >
                The essentials at a glance
              </h2>

              <p className="mt-4 max-w-xl leading-relaxed text-gray-700">
                Prayer, events and important ISR
                information without having to search
                across the website.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <Link
                href="/find"
                className="isr-dashboard-top-action"
              >
                <span>
                  Search ISR
                </span>

                <span
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>

              <Link
                href="/campuses"
                className="isr-dashboard-top-action"
              >
                <span>
                  Campus guide
                </span>

                <span
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>

              <Link
                href="/start"
                className="isr-dashboard-top-action"
              >
                <span>
                  Start here
                </span>

                <span
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </div>
          </div>

          {state ===
            'loading' ? (
            <div
              aria-live="polite"
              className="mt-8 grid gap-4 md:grid-cols-3"
            >
              {[0, 1, 2].map(
                (
                  item,
                ) => (
                  <div
                    key={
                      item
                    }
                    className="h-48 animate-pulse rounded-3xl bg-white/75"
                  />
                ),
              )}
            </div>
          ) : (
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              <article className="isr-dashboard-card">
                <div className="flex items-center justify-between gap-3">
                  <p className="isr-dashboard-label">
                    Next prayer
                  </p>

                  <span
                    aria-hidden="true"
                    className="text-xl"
                  >
                    ◐
                  </span>
                </div>

                {prayer ? (
                  <>
                    <p className="mt-5 text-3xl font-bold text-isr-dark-red">
                      {nextPrayer}
                    </p>

                    <p className="mt-1 text-2xl font-semibold text-isr-turquoise">
                      {
                        prayer
                          .timings[
                          nextPrayer
                        ]
                      }
                    </p>

                    <p className="mt-4 text-xs leading-relaxed text-gray-500">
                      Prayer-time reference for
                      Melbourne. This is not a
                      congregational iqamah time.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="mt-5 font-bold text-isr-dark-red">
                      Prayer information unavailable
                    </p>

                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      Open the prayer page for
                      locations and other information.
                    </p>
                  </>
                )}

                <Link
                  href="/pray"
                  className="isr-text-link mt-auto pt-6"
                >
                  Pray at RMIT
                  <span aria-hidden="true">
                    →
                  </span>
                </Link>
              </article>

              <article className="isr-dashboard-card">
                <div className="flex items-center justify-between gap-3">
                  <p className="isr-dashboard-label">
                    Coming up
                  </p>

                  <span
                    aria-hidden="true"
                    className="text-xl"
                  >
                    ◇
                  </span>
                </div>

                {nextEvent ? (
                  <>
                    <p className="mt-5 text-xl font-bold leading-snug text-isr-dark-red">
                      {
                        nextEvent.name
                      }
                    </p>

                    <p className="mt-3 text-sm font-semibold text-isr-turquoise">
                      {
                        formatEventDate(
                          nextEvent.date,
                        ).date
                      }
                    </p>

                    {nextEvent.campus && (
                      <p className="mt-2 text-sm text-gray-600">
                        {
                          nextEvent.campus
                        }
                      </p>
                    )}

                    <Link
                      href={
                        '/events/' +
                        nextEvent.id
                      }
                      className="isr-text-link mt-auto pt-6"
                    >
                      View event
                      <span aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </>
                ) : (
                  <>
                    <p className="mt-5 font-bold text-isr-dark-red">
                      No upcoming event displayed
                    </p>

                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      Check the full ISR events
                      directory for current listings.
                    </p>

                    <Link
                      href="/events"
                      className="isr-text-link mt-auto pt-6"
                    >
                      Browse events
                      <span aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </>
                )}
              </article>

              <article className="isr-dashboard-card">
                <div className="flex items-center justify-between gap-3">
                  <p className="isr-dashboard-label">
                    ISR update
                  </p>

                  <span
                    aria-hidden="true"
                    className="text-xl"
                  >
                    ◉
                  </span>
                </div>

                {currentUpdate ? (
                  <>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {currentUpdate.priority ===
                        'urgent' && (
                        <span className="rounded-full bg-red-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-red-800">
                          Urgent
                        </span>
                      )}

                      {currentUpdate.pinned && (
                        <span className="rounded-full bg-isr-turquoise/10 px-2.5 py-1 text-[11px] font-bold text-isr-turquoise">
                          Pinned
                        </span>
                      )}
                    </div>

                    <p className="mt-3 text-xl font-bold leading-snug text-isr-dark-red">
                      {
                        currentUpdate.title
                      }
                    </p>

                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-gray-600">
                      {
                        currentUpdate.body
                      }
                    </p>

                    <Link
                      href={
                        '/updates#update-' +
                        currentUpdate.id
                      }
                      className="isr-text-link mt-auto pt-6"
                    >
                      Read update
                      <span aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </>
                ) : (
                  <>
                    <p className="mt-5 font-bold text-isr-dark-red">
                      No current update displayed
                    </p>

                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      Published ISR notices will
                      appear in the updates area.
                    </p>

                    <Link
                      href="/updates"
                      className="isr-text-link mt-auto pt-6"
                    >
                      ISR Updates
                      <span aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </>
                )}
              </article>
            </div>
          )}

          {state ===
            'partial' && (
            <p
              role="status"
              className="mt-5 text-xs leading-relaxed text-gray-500"
            >
              Some live information could not be
              loaded. Available ISR information is
              still shown above.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
`

write(
  'components/HomeStudentDashboard.tsx',
  dashboard,
)

/* =========================================================
 * INSERT DASHBOARD INTO HOMEPAGE
 * ========================================================= */

let home =
  read(
    'app/page.tsx',
  )

home =
  ensureImport(
    home,
    "import HomeStudentDashboard from '@/components/HomeStudentDashboard'",
  )

if (
  !home.includes(
    '<HomeStudentDashboard',
  )
) {
  const footerIndex =
    home.lastIndexOf(
      '<Footer',
    )

  if (
    footerIndex >=
    0
  ) {
    home =
      home.slice(
        0,
        footerIndex,
      ) +
      `        <HomeStudentDashboard />

` +
      home.slice(
        footerIndex,
      )
  }
  else if (
    home.includes(
      '<HomeExperience />',
    )
  ) {
    home =
      home.replace(
        '<HomeExperience />',
        `<HomeExperience />
      <HomeStudentDashboard />`,
      )
  }
  else {
    throw new Error(
      'Could not safely place HomeStudentDashboard.',
    )
  }
}

write(
  'app/page.tsx',
  home,
)

console.log(
  'PASS - homepage student dashboard.',
)

/* =========================================================
 * JOIN ISR MEMBERSHIP SPOTLIGHT
 * ========================================================= */

const membershipSpotlight =
String.raw`import Link from 'next/link'

const MEMBERSHIP_URL =
  'https://campus.hellorubric.com/?s=10733'

const JOURNEY = [
  {
    number:
      '01',

    title:
      'Join',

    description:
      'Become an ISR member through the official membership pathway.',
  },
  {
    number:
      '02',

    title:
      'Attend',

    description:
      'Meet people through ISR events, programs and community activities.',
  },
  {
    number:
      '03',

    title:
      'Volunteer',

    description:
      'Contribute time or skills when opportunities are available.',
  },
  {
    number:
      '04',

    title:
      'Lead',

    description:
      'Take greater responsibility through future team and leadership pathways.',
  },
]

export default function JoinMembershipSpotlight() {
  return (
    <section
      aria-labelledby="membership-spotlight-heading"
      className="isr-membership-spotlight"
    >
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <div className="inline-flex rounded-full bg-isr-turquoise/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-isr-turquoise">
            Membership is free
          </div>

          <h2
            id="membership-spotlight-heading"
            className="mt-5 text-3xl font-bold tracking-tight text-isr-dark-red sm:text-4xl"
          >
            Become part of ISR
          </h2>

          <p className="mt-4 max-w-xl leading-relaxed text-gray-700">
            Formal ISR membership does not cost
            anything. Use the official membership
            page to join, then participate at the
            level that suits you.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={
                MEMBERSHIP_URL
              }
              target="_blank"
              rel="noopener noreferrer"
              className="isr-button-primary text-center"
            >
              Become a member
            </a>

            <Link
              href="/events"
              className="isr-button-secondary text-center"
            >
              Attend an event first
            </Link>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-gray-500">
            Membership opens on the external
            Rubric membership system.
          </p>
        </div>

        <ol className="grid gap-3 sm:grid-cols-2">
          {JOURNEY.map(
            (
              item,
            ) => (
              <li
                key={
                  item.number
                }
                className="isr-membership-step"
              >
                <span className="text-xs font-bold text-isr-turquoise">
                  {
                    item.number
                  }
                </span>

                <h3 className="mt-3 text-lg font-bold text-isr-dark-red">
                  {
                    item.title
                  }
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {
                    item.description
                  }
                </p>
              </li>
            ),
          )}
        </ol>
      </div>
    </section>
  )
}
`

write(
  'components/JoinMembershipSpotlight.tsx',
  membershipSpotlight,
)

let join =
  read(
    'app/join/page.tsx',
  )

join =
  ensureImport(
    join,
    "import JoinMembershipSpotlight from '@/components/JoinMembershipSpotlight'",
  )

if (
  !join.includes(
    '<JoinMembershipSpotlight',
  )
) {
  const close =
    join.lastIndexOf(
      '</main>',
    )

  assert(
    close >=
      0,
    'Could not locate Join page </main>.',
  )

  join =
    join.slice(
      0,
      close,
    ) +
    `
        <section className="px-4 pb-16 sm:pb-20">
          <div className="container-isr mx-auto max-w-6xl">
            <JoinMembershipSpotlight />
          </div>
        </section>

` +
    join.slice(
      close,
    )
}

write(
  'app/join/page.tsx',
  join,
)

console.log(
  'PASS - Join ISR membership experience.',
)

/* =========================================================
 * SUPPORT TRIAGE
 * ========================================================= */

const supportTriage =
String.raw`import Link from 'next/link'

const OPTIONS = [
  {
    title:
      'Prayer or Jumu’ah',

    description:
      'Prayer-space information, access issues or Friday prayer questions.',

    subject:
      'ISR Prayer / Jumuah Enquiry',
  },
  {
    title:
      'Event question',

    description:
      'Ask about an ISR event, registration or attendance information.',

    subject:
      'ISR Event Enquiry',
  },
  {
    title:
      'Joining ISR',

    description:
      'Membership, volunteering, teams or ways to become involved.',

    subject:
      'Joining ISR',
  },
  {
    title:
      'Student concern',

    description:
      'Ask ISR for guidance about a student concern or campus issue.',

    subject:
      'ISR Student Support Enquiry',
  },
  {
    title:
      'General question',

    description:
      'Anything that does not fit the other pathways.',

    subject:
      'ISR General Enquiry',
  },
]

function emailUrl(
  subject: string,
) {
  return (
    'mailto:isr@rmit.edu.au?subject=' +
    encodeURIComponent(
      subject,
    )
  )
}

export default function SupportTriage() {
  return (
    <section
      aria-labelledby="support-triage-heading"
      className="isr-support-triage"
    >
      <div className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-turquoise">
          Find the right ISR pathway
        </p>

        <h2
          id="support-triage-heading"
          className="mt-3 text-3xl font-bold text-isr-dark-red sm:text-4xl"
        >
          What do you need help with?
        </h2>

        <p className="mt-4 leading-relaxed text-gray-700">
          Choose the closest option and your email
          will open with the enquiry type already
          filled in.
        </p>
      </div>

      <div className="mt-8 grid gap-3 md:grid-cols-2">
        {OPTIONS.map(
          (
            option,
          ) => (
            <a
              key={
                option.title
              }
              href={
                emailUrl(
                  option.subject,
                )
              }
              className="isr-support-option"
            >
              <div>
                <h3 className="font-bold text-isr-dark-red">
                  {
                    option.title
                  }
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {
                    option.description
                  }
                </p>
              </div>

              <span
                aria-hidden="true"
                className="shrink-0 font-bold text-isr-turquoise"
              >
                →
              </span>
            </a>
          ),
        )}
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-4 border-t border-isr-light-blue/20 pt-6">
        <p className="text-sm text-gray-600">
          Not sure which one to use?
        </p>

        <Link
          href="/contact"
          className="isr-text-link"
        >
          View all ISR contact options
          <span aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </section>
  )
}
`

write(
  'components/SupportTriage.tsx',
  supportTriage,
)

let support =
  read(
    'app/support/page.tsx',
  )

support =
  ensureImport(
    support,
    "import SupportTriage from '@/components/SupportTriage'",
  )

if (
  !support.includes(
    '<SupportTriage',
  )
) {
  const close =
    support.lastIndexOf(
      '</main>',
    )

  assert(
    close >=
      0,
    'Could not locate Support page </main>.',
  )

  support =
    support.slice(
      0,
      close,
    ) +
    `
        <section className="px-4 pb-16 sm:pb-20">
          <div className="container-isr mx-auto max-w-6xl">
            <SupportTriage />
          </div>
        </section>

` +
    support.slice(
      close,
    )
}

write(
  'app/support/page.tsx',
  support,
)

console.log(
  'PASS - Student Support triage.',
)

/* =========================================================
 * D7 CSS
 * ========================================================= */

let css =
  read(
    'app/d3-experience.css',
  )

const d7Css =
String.raw`/* ISR TOOLKIT D7 STUDENT EXPERIENCE */

.isr-home-dashboard-section {
  background:
    linear-gradient(
      180deg,
      #ffffff,
      rgba(234, 227, 216, 0.34)
    );
  padding: 1rem 0 4rem;
}

.isr-home-dashboard-shell {
  overflow: hidden;
  border: 1px solid rgba(152, 174, 168, 0.28);
  border-radius: 2rem;
  background:
    radial-gradient(
      circle at 90% 0%,
      rgba(80, 149, 137, 0.14),
      transparent 34%
    ),
    rgba(255, 255, 255, 0.94);
  padding: 1.5rem;
  box-shadow:
    0 18px 55px rgba(91, 11, 5, 0.07);
}

.isr-dashboard-top-action {
  display: flex;
  min-height: 3.25rem;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  border: 1px solid rgba(152, 174, 168, 0.28);
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.88);
  padding: 0.8rem 1rem;
  color: #5B0B05;
  font-size: 0.8rem;
  font-weight: 700;
}

.isr-dashboard-top-action:hover {
  border-color: #509589;
  color: #509589;
}

.isr-dashboard-card {
  display: flex;
  min-height: 17rem;
  flex-direction: column;
  border: 1px solid rgba(152, 174, 168, 0.24);
  border-radius: 1.5rem;
  background: #ffffff;
  padding: 1.35rem;
  box-shadow:
    0 8px 25px rgba(91, 11, 5, 0.045);
}

.isr-dashboard-label {
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #509589;
}

.isr-membership-spotlight {
  overflow: hidden;
  border-radius: 2rem;
  background:
    radial-gradient(
      circle at 88% 10%,
      rgba(235, 232, 203, 0.4),
      transparent 34%
    ),
    #ffffff;
  border: 1px solid rgba(152, 174, 168, 0.28);
  padding: 1.5rem;
  box-shadow:
    0 16px 45px rgba(91, 11, 5, 0.06);
}

.isr-membership-step {
  border: 1px solid rgba(152, 174, 168, 0.25);
  border-radius: 1.25rem;
  background: rgba(234, 227, 216, 0.32);
  padding: 1.2rem;
}

.isr-support-triage {
  border-radius: 2rem;
  border: 1px solid rgba(152, 174, 168, 0.28);
  background:
    linear-gradient(
      145deg,
      rgba(234, 227, 216, 0.48),
      #ffffff
    );
  padding: 1.5rem;
}

.isr-support-option {
  display: flex;
  min-height: 7.5rem;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border: 1px solid rgba(152, 174, 168, 0.25);
  border-radius: 1.25rem;
  background: #ffffff;
  padding: 1.2rem;
  transition:
    transform 150ms ease,
    border-color 150ms ease,
    box-shadow 150ms ease;
}

.isr-support-option:hover {
  transform: translateY(-1px);
  border-color: rgba(80, 149, 137, 0.65);
  box-shadow:
    0 8px 24px rgba(91, 11, 5, 0.05);
}

@media (min-width: 640px) {
  .isr-home-dashboard-section {
    padding-bottom: 5rem;
  }

  .isr-home-dashboard-shell,
  .isr-membership-spotlight,
  .isr-support-triage {
    padding: 2rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .isr-support-option {
    transition: none;
  }

  .isr-support-option:hover {
    transform: none;
  }
}
`

css =
  appendMarkedBlock(
    css,
    'ISR TOOLKIT D7 STUDENT EXPERIENCE',
    d7Css,
  )

write(
  'app/d3-experience.css',
  css,
)

/* =========================================================
 * D7 AUDIT
 * ========================================================= */

const audit =
String.raw`import fs from 'node:fs'
import path from 'node:path'

const root =
  process.cwd()

function read(
  file,
) {
  return fs.readFileSync(
    path.join(
      root,
      file,
    ),
    'utf8',
  )
}

const failures = []

function expect(
  condition,
  message,
) {
  if (!condition) {
    failures.push(
      message,
    )
  }
}

const home =
  read(
    'app/page.tsx',
  )

const dashboard =
  read(
    'components/HomeStudentDashboard.tsx',
  )

const join =
  read(
    'app/join/page.tsx',
  )

const membership =
  read(
    'components/JoinMembershipSpotlight.tsx',
  )

const support =
  read(
    'app/support/page.tsx',
  )

const triage =
  read(
    'components/SupportTriage.tsx',
  )

expect(
  home.includes(
    'HomeStudentDashboard',
  ),
  'Homepage dashboard is not mounted.',
)

expect(
  dashboard.includes(
    'fetchPrayerTimes',
  ),
  'Homepage dashboard has no prayer data.',
)

expect(
  dashboard.includes(
    'fetchEvents',
  ),
  'Homepage dashboard has no event data.',
)

expect(
  dashboard.includes(
    'fetchAnnouncements',
  ),
  'Homepage dashboard has no updates data.',
)

expect(
  dashboard.includes(
    'This is not a',
  ) &&
  dashboard.includes(
    'iqamah',
  ),
  'Prayer dashboard does not distinguish prayer time from iqamah.',
)

expect(
  join.includes(
    'JoinMembershipSpotlight',
  ),
  'Join membership spotlight is not mounted.',
)

expect(
  membership.includes(
    'Membership is free',
  ),
  'Free membership message is missing.',
)

expect(
  membership.includes(
    'campus.hellorubric.com',
  ),
  'Rubric membership pathway is missing.',
)

expect(
  support.includes(
    'SupportTriage',
  ),
  'Support triage is not mounted.',
)

expect(
  triage.includes(
    'isr@rmit.edu.au',
  ),
  'Support triage is not routed to ISR.',
)

expect(
  !triage.includes(
    'Safer Community',
  ),
  'Support triage contains an unapproved external pathway.',
)

expect(
  !triage.includes(
    'RUSU',
  ),
  'Support triage contains RUSU.',
)

console.log(
  '\nISR D7 AUDIT\n',
)

if (
  failures.length ===
  0
) {
  console.log(
    'PASS - D7 student experience contracts.',
  )

  process.exit(
    0,
  )
}

for (
  const failure
  of failures
) {
  console.error(
    'FAIL - ' +
    failure,
  )
}

process.exit(
  1,
)
`

write(
  'scripts/d7-audit.mjs',
  audit,
)

/* =========================================================
 * EXTEND HEALTH
 * ========================================================= */

let health =
  read(
    'scripts/isr-dev/health.mjs',
  )

if (
  !health.includes(
    "'scripts/d7-audit.mjs'",
  )
) {
  const anchors = [
    "'scripts/d6-audit.mjs',",
    "'scripts/content-safety-audit.mjs',",
    "'scripts/d5-audit.mjs',",
  ]

  let done =
    false

  for (
    const anchor
    of anchors
  ) {
    if (
      health.includes(
        anchor,
      )
    ) {
      health =
        health.replace(
          anchor,
          `${anchor}
  'scripts/d7-audit.mjs',`,
        )

      done =
        true

      break
    }
  }

  assert(
    done,
    'Could not register D7 audit in health.mjs.',
  )
}

write(
  'scripts/isr-dev/health.mjs',
  health,
)

console.log(`
=================================================
ISR D7 PATCH COMPLETE
=================================================

Added:
 - homepage student dashboard
 - next prayer snapshot
 - upcoming event snapshot
 - priority ISR Update snapshot
 - Search / Campus / Start shortcuts
 - stronger Join ISR membership experience
 - prominent free-membership messaging
 - direct Rubric membership action
 - membership participation journey
 - student-support triage
 - pre-filled ISR support emails
 - mobile/responsive polish
 - D7 automated audit
`)
