import fs from 'node:fs'
import path from 'node:path'

import {
  appendMarkedBlock,
  assert,
  ensureImport,
  frontendRoot,
  read,
  write,
} from './helpers.mjs'

console.log(`
=================================================
ISR D5
DISCOVERY + CAMPUS UX + ACCESSIBILITY
=================================================
`)

/* =========================================================
 * 1. SITE-WIDE FIND / SEARCH
 * ========================================================= */

const findExperience =
String.raw`'use client'

import Link from 'next/link'
import {
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  fetchEvents,
  formatEventDate,
  type Event,
} from '@/lib/events'
import {
  fetchAnnouncements,
  type Announcement,
} from '@/lib/announcements'
import {
  PRAYER_SPACES,
} from '@/lib/siteContent'

type SearchItem = {
  id: string
  title: string
  description: string
  href: string
  category:
    | 'Page'
    | 'Prayer'
    | 'Event'
    | 'ISR Update'
}

const STATIC_ITEMS: SearchItem[] = [
  {
    id: 'start',
    title: 'Start Here',
    description:
      'New to RMIT or ISR? Start with the essentials.',
    href: '/start',
    category: 'Page',
  },
  {
    id: 'pray',
    title: 'Pray at RMIT',
    description:
      'Prayer spaces, Jumu’ah and daily prayer times.',
    href: '/pray',
    category: 'Page',
  },
  {
    id: 'jumuah',
    title: 'Jumu’ah at RMIT',
    description:
      'Current Friday prayer locations and times.',
    href: '/pray#jumuah',
    category: 'Prayer',
  },
  {
    id: 'events',
    title: 'ISR Events',
    description:
      'Upcoming and past Islamic Society of RMIT events.',
    href: '/events',
    category: 'Page',
  },
  {
    id: 'updates',
    title: 'ISR Updates',
    description:
      'Operational notices and time-sensitive ISR information.',
    href: '/updates',
    category: 'Page',
  },
  {
    id: 'support',
    title: 'Student Support',
    description:
      'Contact ISR about a concern or support need.',
    href: '/support',
    category: 'Page',
  },
  {
    id: 'join',
    title: 'Join ISR',
    description:
      'Free membership, volunteering and team pathways.',
    href: '/join',
    category: 'Page',
  },
  {
    id: 'contact',
    title: 'Contact ISR',
    description:
      'Official Islamic Society of RMIT contact channels.',
    href: '/contact',
    category: 'Page',
  },
  {
    id: 'about',
    title: 'About ISR',
    description:
      'Who ISR is, what it does and why it exists.',
    href: '/about',
    category: 'Page',
  },
  {
    id: 'history',
    title: 'ISR History',
    description:
      'The current historical record and research gateway.',
    href: '/about/history',
    category: 'Page',
  },
  {
    id: 'campuses',
    title: 'Campus Guide',
    description:
      'Prayer-space shortcuts across RMIT campuses.',
    href: '/campuses',
    category: 'Page',
  },
]

const CATEGORY_ORDER = [
  'Page',
  'Prayer',
  'Event',
  'ISR Update',
] as const

function normalize(
  value: string,
) {
  return value
    .toLowerCase()
    .normalize(
      'NFKD',
    )
    .replace(
      /[\u0300-\u036f]/g,
      '',
    )
}

export default function FindExperience() {
  const [
    query,
    setQuery,
  ] =
    useState('')

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
    loading,
    setLoading,
  ] =
    useState(true)

  useEffect(() => {
    let active =
      true

    Promise.allSettled([
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
            eventResult,
            updateResult,
          ] =
            results

          if (
            eventResult.status ===
            'fulfilled'
          ) {
            setEvents(
              eventResult.value,
            )
          }

          if (
            updateResult.status ===
            'fulfilled'
          ) {
            setUpdates(
              updateResult.value,
            )
          }
        },
      )
      .finally(
        () => {
          if (active) {
            setLoading(
              false,
            )
          }
        },
      )

    return () => {
      active = false
    }
  }, [])

  const items =
    useMemo(
      () => {
        const prayerItems:
          SearchItem[] =
          PRAYER_SPACES.map(
            (
              space,
            ) => ({
              id:
                'prayer-' +
                space.id,

              title:
                space.name,

              description:
                [
                  space.building,
                  space.room,
                  space.summary,
                ]
                  .filter(
                    Boolean,
                  )
                  .join(
                    ' · ',
                  ),

              href:
                '/pray#' +
                space.id,

              category:
                'Prayer',
            }),
          )

        const eventItems:
          SearchItem[] =
          events.map(
            (
              event,
            ) => {
              const formatted =
                formatEventDate(
                  event.date,
                )

              return {
                id:
                  'event-' +
                  event.id,

                title:
                  event.name,

                description:
                  [
                    formatted.date,
                    event.campus,
                    event.venue,
                  ]
                    .filter(
                      Boolean,
                    )
                    .join(
                      ' · ',
                    ),

                href:
                  '/events/' +
                  event.id,

                category:
                  'Event',
              }
            },
          )

        const updateItems:
          SearchItem[] =
          updates.map(
            (
              update,
            ) => ({
              id:
                'update-' +
                update.id,

              title:
                update.title,

              description:
                update.body,

              href:
                '/updates#update-' +
                update.id,

              category:
                'ISR Update',
            }),
          )

        return [
          ...STATIC_ITEMS,
          ...prayerItems,
          ...eventItems,
          ...updateItems,
        ]
      },
      [
        events,
        updates,
      ],
    )

  const results =
    useMemo(
      () => {
        const value =
          normalize(
            query.trim(),
          )

        if (!value) {
          return items
        }

        const terms =
          value
            .split(
              /\s+/,
            )
            .filter(
              Boolean,
            )

        return items.filter(
          (
            item,
          ) => {
            const haystack =
              normalize(
                [
                  item.title,
                  item.description,
                  item.category,
                ].join(
                  ' ',
                ),
              )

            return terms.every(
              (
                term,
              ) =>
                haystack.includes(
                  term,
                ),
            )
          },
        )
      },
      [
        items,
        query,
      ],
    )

  const grouped =
    useMemo(
      () =>
        CATEGORY_ORDER.map(
          (
            category,
          ) => ({
            category,

            items:
              results.filter(
                (
                  item,
                ) =>
                  item.category ===
                  category,
              ),
          }),
        ).filter(
          (
            group,
          ) =>
            group.items.length >
            0,
        ),
      [
        results,
      ],
    )

  return (
    <div>
      <section className="isr-find-panel">
        <label
          htmlFor="isr-site-search"
          className="text-xs font-bold uppercase tracking-[0.18em] text-isr-turquoise"
        >
          Search ISR
        </label>

        <div className="mt-3 flex gap-3">
          <input
            id="isr-site-search"
            type="search"
            autoComplete="off"
            autoFocus
            value={
              query
            }
            onChange={
              (
                event,
              ) =>
                setQuery(
                  event.target.value,
                )
            }
            placeholder="Try Jumu’ah, Bundoora, membership, support..."
            className="min-h-14 w-full rounded-2xl border border-isr-light-blue/35 bg-white px-5 text-base text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-isr-turquoise focus:ring-4 focus:ring-isr-turquoise/10"
          />

          {query && (
            <button
              type="button"
              onClick={() =>
                setQuery('')
              }
              className="isr-button-secondary shrink-0"
            >
              Clear
            </button>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-gray-600">
          <p
            aria-live="polite"
          >
            {loading
              ? 'Loading current ISR information…'
              : results.length +
                ' result' +
                (results.length ===
                1
                  ? ''
                  : 's')}
          </p>

          <Link
            href="/start"
            className="font-bold text-isr-turquoise hover:text-isr-dark-red"
          >
            Not sure where to start? →
          </Link>
        </div>
      </section>

      {results.length ===
      0 ? (
        <section className="mt-8 rounded-3xl border border-isr-light-blue/25 bg-white p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold text-isr-dark-red">
            Nothing matched that search
          </h2>

          <p className="mx-auto mt-3 max-w-xl leading-relaxed text-gray-600">
            Try a campus name, prayer, event, membership,
            support or another shorter search term.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() =>
                setQuery('')
              }
              className="isr-button-secondary"
            >
              Show everything
            </button>

            <Link
              href="/contact"
              className="isr-button-primary"
            >
              Contact ISR
            </Link>
          </div>
        </section>
      ) : (
        <div className="mt-8 space-y-10">
          {grouped.map(
            (
              group,
            ) => (
              <section
                key={
                  group.category
                }
                aria-labelledby={
                  'search-category-' +
                  group.category
                    .toLowerCase()
                    .replace(
                      /\s+/g,
                      '-',
                    )
                }
              >
                <div className="flex items-center justify-between gap-4">
                  <h2
                    id={
                      'search-category-' +
                      group.category
                        .toLowerCase()
                        .replace(
                          /\s+/g,
                          '-',
                        )
                    }
                    className="text-xl font-bold text-isr-dark-red"
                  >
                    {group.category}
                  </h2>

                  <span className="text-sm font-semibold text-gray-500">
                    {group.items.length}
                  </span>
                </div>

                <div className="mt-4 grid gap-3">
                  {group.items.map(
                    (
                      item,
                    ) => (
                      <Link
                        key={
                          item.id
                        }
                        href={
                          item.href
                        }
                        className="isr-find-result"
                      >
                        <div className="min-w-0">
                          <h3 className="font-bold text-isr-dark-red">
                            {item.title}
                          </h3>

                          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-gray-600">
                            {item.description}
                          </p>
                        </div>

                        <span
                          aria-hidden="true"
                          className="shrink-0 font-bold text-isr-turquoise"
                        >
                          →
                        </span>
                      </Link>
                    ),
                  )}
                </div>
              </section>
            ),
          )}
        </div>
      )}
    </div>
  )
}
`

write(
  'components/FindExperience.tsx',
  findExperience,
)

const findPage =
String.raw`import type {
  Metadata,
} from 'next'
import FindExperience from '@/components/FindExperience'

export const metadata: Metadata = {
  title:
    'Find ISR information',

  description:
    'Search Islamic Society of RMIT pages, prayer spaces, events and current ISR updates.',
}

export default function FindPage() {
  return (
    <main>
      <section className="bg-isr-cream px-4 py-14 sm:py-20">
        <div className="container-isr mx-auto max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-turquoise">
            Find it fast
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-isr-dark-red sm:text-5xl">
            What are you looking for?
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-700">
            Search ISR services, prayer spaces, events,
            updates and the most useful student pathways.
          </p>

          <div className="mt-10">
            <FindExperience />
          </div>
        </div>
      </section>
    </main>
  )
}
`

write(
  'app/find/page.tsx',
  findPage,
)

console.log(
  'PASS - ISR site search.',
)

/* =========================================================
 * 2. CAMPUS GUIDE
 * ========================================================= */

const campusExperience =
String.raw`import Link from 'next/link'
import {
  PRAYER_SPACES,
} from '@/lib/siteContent'

export default function CampusDirectoryExperience() {
  return (
    <div className="space-y-6">
      {PRAYER_SPACES.map(
        (
          space,
        ) => (
          <article
            key={
              space.id
            }
            className="isr-campus-guide-card"
          >
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-isr-turquoise">
                  RMIT prayer space
                </p>

                <h2 className="mt-2 text-2xl font-bold text-isr-dark-red sm:text-3xl">
                  {space.name}
                </h2>

                <p className="mt-3 max-w-2xl leading-relaxed text-gray-700">
                  {space.summary}
                </p>
              </div>

              <Link
                href={
                  '/pray#' +
                  space.id
                }
                className="isr-button-primary"
              >
                Open prayer details
              </Link>
            </div>

            <dl className="mt-6 grid gap-4 border-t border-isr-light-blue/20 pt-5 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-gray-500">
                  Building
                </dt>

                <dd className="mt-1 font-semibold text-isr-dark-red">
                  {space.building}
                </dd>
              </div>

              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-gray-500">
                  Prayer rooms
                </dt>

                <dd className="mt-1 font-semibold text-isr-dark-red">
                  {space.room}
                </dd>
              </div>

              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-gray-500">
                  Published hours
                </dt>

                <dd className="mt-1 text-sm leading-relaxed text-gray-700">
                  {space.accessHours}
                </dd>
              </div>
            </dl>
          </article>
        ),
      )}

      <section className="rounded-3xl bg-isr-dark-red p-6 text-white sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-yellow">
          Friday prayer
        </p>

        <div className="mt-3 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="text-2xl font-bold">
              Looking for Jumu’ah?
            </h2>

            <p className="mt-3 max-w-2xl leading-relaxed text-white/70">
              Jumu’ah information is kept on the dedicated
              prayer page so current times and locations stay
              in one source of truth.
            </p>
          </div>

          <Link
            href="/pray#jumuah"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-5 py-3 font-bold text-isr-dark-red transition hover:bg-isr-yellow"
          >
            View Jumu’ah
          </Link>
        </div>
      </section>
    </div>
  )
}
`

write(
  'components/CampusDirectoryExperience.tsx',
  campusExperience,
)

const campusPage =
String.raw`import type {
  Metadata,
} from 'next'
import CampusDirectoryExperience from '@/components/CampusDirectoryExperience'

export const metadata: Metadata = {
  title:
    'RMIT campus prayer guide',

  description:
    'Find Islamic Society of RMIT prayer-space information across RMIT campuses.',
}

export default function CampusesPage() {
  return (
    <main>
      <section className="bg-white px-4 py-14 sm:py-20">
        <div className="container-isr mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-turquoise">
            Campus guide
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-isr-dark-red sm:text-5xl">
            Find your prayer space at RMIT
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-gray-700">
            Use this directory as a quick campus entry point.
            Full prayer and Jumu’ah information remains on the
            dedicated Pray at RMIT page.
          </p>

          <div className="mt-10">
            <CampusDirectoryExperience />
          </div>
        </div>
      </section>
    </main>
  )
}
`

write(
  'app/campuses/page.tsx',
  campusPage,
)

console.log(
  'PASS - campus guide.',
)

/* =========================================================
 * 3. IMPROVE START HERE SHORTCUTS
 * ========================================================= */

let startUtility =
  read(
    'components/StartUtilityPanel.tsx',
  )

if (
  !startUtility.includes(
    "href:\n      '/find'",
  )
) {
  const taskArray =
    "const TASKS = ["

  assert(
    startUtility.includes(
      taskArray,
    ),
    'Could not locate StartUtilityPanel task list.',
  )

  startUtility =
    startUtility.replace(
      taskArray,
      `const TASKS = [
  {
    title:
      'Find something',
    description:
      'Search ISR pages, prayer spaces, events and updates.',
    href:
      '/find',
  },
  {
    title:
      'Campus guide',
    description:
      'Jump directly to RMIT prayer-space information.',
    href:
      '/campuses',
  },`,
    )
}

write(
  'components/StartUtilityPanel.tsx',
  startUtility,
)

console.log(
  'PASS - Start Here discovery shortcuts.',
)

/* =========================================================
 * 4. BETTER 404 RECOVERY
 * ========================================================= */

const notFound =
String.raw`import Link from 'next/link'

const RECOVERY_LINKS = [
  {
    href: '/find',
    title: 'Search ISR',
    description:
      'Find prayer information, events, updates and student services.',
  },
  {
    href: '/pray',
    title: 'Pray at RMIT',
    description:
      'Prayer spaces, Jumu’ah and daily prayer times.',
  },
  {
    href: '/events',
    title: 'Events',
    description:
      'See upcoming Islamic Society of RMIT events.',
  },
  {
    href: '/start',
    title: 'Start Here',
    description:
      'Find the most useful ISR pathways in one place.',
  },
]

export default function NotFound() {
  return (
    <main className="bg-isr-cream px-4 py-16 sm:py-24">
      <div className="container-isr mx-auto max-w-4xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-turquoise">
          404
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-isr-dark-red sm:text-5xl">
          We could not find that page
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-700">
          The page may have moved, or the link may no longer
          be current. Use one of these ISR pathways to continue.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {RECOVERY_LINKS.map(
            (
              link,
            ) => (
              <Link
                key={
                  link.href
                }
                href={
                  link.href
                }
                className="isr-find-result"
              >
                <div>
                  <h2 className="font-bold text-isr-dark-red">
                    {link.title}
                  </h2>

                  <p className="mt-1 text-sm leading-relaxed text-gray-600">
                    {link.description}
                  </p>
                </div>

                <span
                  aria-hidden="true"
                  className="font-bold text-isr-turquoise"
                >
                  →
                </span>
              </Link>
            ),
          )}
        </div>

        <div className="mt-8">
          <Link
            href="/"
            className="isr-button-primary"
          >
            Return home
          </Link>
        </div>
      </div>
    </main>
  )
}
`

write(
  'app/not-found.tsx',
  notFound,
)

console.log(
  'PASS - 404 recovery.',
)

/* =========================================================
 * 5. PUBLIC STRUCTURED DATA
 * ========================================================= */

const structuredData =
String.raw`export default function PublicStructuredData() {
  const data = {
    '@context':
      'https://schema.org',

    '@type':
      'Organization',

    name:
      'Islamic Society of RMIT',

    url:
      'https://theisr.com.au',

    email:
      'isr@rmit.edu.au',

    telephone:
      '+61 418 835 013',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html:
          JSON.stringify(
            data,
          ),
      }}
    />
  )
}
`

write(
  'components/PublicStructuredData.tsx',
  structuredData,
)

let layout =
  read(
    'app/layout.tsx',
  )

layout =
  ensureImport(
    layout,
    "import PublicStructuredData from '@/components/PublicStructuredData'",
  )

if (
  !layout.includes(
    '<PublicStructuredData',
  )
) {
  const bodyPattern =
    /<body([^>]*)>/

  assert(
    bodyPattern.test(
      layout,
    ),
    'Could not locate layout body.',
  )

  layout =
    layout.replace(
      bodyPattern,
      `<body$1>
        <PublicStructuredData />`,
    )
}

/* =========================================================
 * 6. ACCESSIBILITY — GLOBAL SKIP LINK
 * ========================================================= */

if (
  !layout.includes(
    'Skip to main content',
  )
) {
  const structuredMarker =
    '<PublicStructuredData />'

  assert(
    layout.includes(
      structuredMarker,
    ),
    'Structured data insertion marker missing.',
  )

  layout =
    layout.replace(
      structuredMarker,
      `<PublicStructuredData />

        <a
          href="#isr-page-content"
          className="isr-skip-link"
        >
          Skip to main content
        </a>`,
    )
}

if (
  !layout.includes(
    'id="isr-page-content"',
  )
) {
  const childPattern =
    /\{children\}/

  assert(
    childPattern.test(
      layout,
    ),
    'Could not locate children in root layout.',
  )

  layout =
    layout.replace(
      childPattern,
      `<div
          id="isr-page-content"
          tabIndex={-1}
        >
          {children}
        </div>`,
    )
}

write(
  'app/layout.tsx',
  layout,
)

console.log(
  'PASS - structured data + skip navigation.',
)

/* =========================================================
 * 7. ADMIN PREVIEW SHORTCUTS
 * ========================================================= */

let adminUtility =
  read(
    'components/admin/AdminUtilityBar.tsx',
  )

if (
  !adminUtility.includes(
    "href: '/find'",
  )
) {
  const arrayEnd =
    `const PUBLIC_LINKS = [`

  assert(
    adminUtility.includes(
      arrayEnd,
    ),
    'AdminUtilityBar public-links array missing.',
  )

  adminUtility =
    adminUtility.replace(
      arrayEnd,
      `const PUBLIC_LINKS = [
  {
    href: '/find',
    label: 'Find',
  },
  {
    href: '/campuses',
    label: 'Campuses',
  },`,
    )
}

write(
  'components/admin/AdminUtilityBar.tsx',
  adminUtility,
)

console.log(
  'PASS - admin discovery previews.',
)

/* =========================================================
 * 8. D5 VISUAL SYSTEM
 * ========================================================= */

let css =
  read(
    'app/d3-experience.css',
  )

const d5Css =
String.raw`/* ISR TOOLKIT D5 DISCOVERY LAYER */

.isr-skip-link {
  position: fixed;
  top: 0.75rem;
  left: 0.75rem;
  z-index: 9999;
  transform: translateY(-180%);
  border-radius: 9999px;
  background: #5B0B05;
  padding: 0.7rem 1rem;
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 700;
  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.18);
  transition:
    transform 150ms ease;
}

.isr-skip-link:focus {
  transform: translateY(0);
  outline: 3px solid #509589;
  outline-offset: 3px;
}

.isr-find-panel {
  border: 1px solid rgba(152, 174, 168, 0.3);
  border-radius: 1.75rem;
  background: rgba(255, 255, 255, 0.92);
  padding: 1.25rem;
  box-shadow:
    0 12px 36px rgba(91, 11, 5, 0.06);
}

.isr-find-result {
  display: flex;
  min-height: 5.5rem;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border: 1px solid rgba(152, 174, 168, 0.25);
  border-radius: 1.15rem;
  background: #ffffff;
  padding: 1rem 1.15rem;
  transition:
    transform 150ms ease,
    border-color 150ms ease,
    box-shadow 150ms ease;
}

.isr-find-result:hover {
  transform: translateY(-1px);
  border-color: rgba(80, 149, 137, 0.65);
  box-shadow:
    0 8px 24px rgba(91, 11, 5, 0.05);
}

.isr-find-result:focus-visible {
  outline: 3px solid rgba(80, 149, 137, 0.45);
  outline-offset: 3px;
}

.isr-campus-guide-card {
  border: 1px solid rgba(152, 174, 168, 0.25);
  border-radius: 1.75rem;
  background: #ffffff;
  padding: 1.5rem;
  box-shadow:
    0 10px 30px rgba(91, 11, 5, 0.05);
}

a:focus-visible,
button:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible {
  outline: 3px solid rgba(80, 149, 137, 0.5);
  outline-offset: 3px;
}

@media (min-width: 640px) {
  .isr-find-panel {
    padding: 1.5rem;
  }

  .isr-campus-guide-card {
    padding: 2rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .isr-skip-link,
  .isr-find-result {
    transition: none;
  }

  .isr-find-result:hover {
    transform: none;
  }
}
`

css =
  appendMarkedBlock(
    css,
    'ISR TOOLKIT D5 DISCOVERY LAYER',
    d5Css,
  )

write(
  'app/d3-experience.css',
  css,
)

/* =========================================================
 * 9. D5 AUDIT
 * ========================================================= */

const d5Audit =
String.raw`import fs from 'node:fs'
import path from 'node:path'

const root =
  process.cwd()

function read(
  relative,
) {
  return fs.readFileSync(
    path.join(
      root,
      relative,
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

const find =
  read(
    'components/FindExperience.tsx',
  )

const findPage =
  read(
    'app/find/page.tsx',
  )

const campuses =
  read(
    'components/CampusDirectoryExperience.tsx',
  )

const campusPage =
  read(
    'app/campuses/page.tsx',
  )

const start =
  read(
    'components/StartUtilityPanel.tsx',
  )

const notFound =
  read(
    'app/not-found.tsx',
  )

const layout =
  read(
    'app/layout.tsx',
  )

const structured =
  read(
    'components/PublicStructuredData.tsx',
  )

const prayerDirectory =
  read(
    'components/PrayerSpaceDirectory.tsx',
  )

expect(
  find.includes(
    'fetchEvents',
  ),
  'Find page does not search events.',
)

expect(
  find.includes(
    'fetchAnnouncements',
  ),
  'Find page does not search ISR Updates.',
)

expect(
  find.includes(
    'PRAYER_SPACES',
  ),
  'Find page does not search prayer spaces.',
)

expect(
  find.includes(
    "'/updates#update-'",
  ),
  'Find page does not deep-link ISR Updates.',
)

expect(
  findPage.includes(
    'Metadata',
  ),
  'Find page metadata missing.',
)

expect(
  campuses.includes(
    'PRAYER_SPACES',
  ),
  'Campus guide is not tied to central prayer data.',
)

expect(
  campuses.includes(
    '/pray#jumuah',
  ),
  'Campus guide Jumuah pathway missing.',
)

expect(
  campusPage.includes(
    'Metadata',
  ),
  'Campus page metadata missing.',
)

expect(
  start.includes(
    "'/find'",
  ),
  'Start Here search shortcut missing.',
)

expect(
  start.includes(
    "'/campuses'",
  ),
  'Start Here campus shortcut missing.',
)

expect(
  notFound.includes(
    '/find',
  ),
  '404 search recovery missing.',
)

expect(
  notFound.includes(
    '/pray',
  ),
  '404 prayer recovery missing.',
)

expect(
  layout.includes(
    'Skip to main content',
  ),
  'Global skip link missing.',
)

expect(
  layout.includes(
    'id="isr-page-content"',
  ),
  'Skip-link target missing.',
)

expect(
  layout.includes(
    'PublicStructuredData',
  ),
  'Structured data component missing from layout.',
)

expect(
  structured.includes(
    "'Organization'",
  ),
  'Organization structured data missing.',
)

expect(
  !structured.includes(
    'Charity',
  ),
  'Unsupported charity claim in structured data.',
)

expect(
  !structured.includes(
    'incorporated',
  ),
  'Unsupported incorporated-status claim in structured data.',
)

expect(
  !prayerDirectory.includes(
    'JUMUAH_SERVICES',
  ),
  'Prayer directory duplicates Jumuah.',
)

expect(
  !prayerDirectory.includes(
    'fetchPrayerTimes',
  ),
  'Prayer directory duplicates daily timetable.',
)

console.log(
  '\nISR D5 AUDIT\n',
)

if (
  failures.length ===
  0
) {
  console.log(
    'PASS - D5 discovery, campus and accessibility contracts.',
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
  'scripts/d5-audit.mjs',
  d5Audit,
)

/* =========================================================
 * 10. EXTEND HEALTH.MJS WITH NEW ROUTES/AUDIT
 * ========================================================= */

let health =
  read(
    'scripts/isr-dev/health.mjs',
  )

if (
  !health.includes(
    "'scripts/d5-audit.mjs'",
  )
) {
  const auditAnchor =
    "'scripts/d4-services-audit.mjs',"

  if (
    health.includes(
      auditAnchor,
    )
  ) {
    health =
      health.replace(
        auditAnchor,
        `${auditAnchor}
  'scripts/d5-audit.mjs',`,
      )
  }
}

if (
  !health.includes(
    "'/find'",
  )
) {
  const routeAnchor =
    "'/start',"

  if (
    health.includes(
      routeAnchor,
    )
  ) {
    health =
      health.replace(
        routeAnchor,
        `${routeAnchor}
    '/find',
    '/campuses',`,
      )
  }
}

write(
  'scripts/isr-dev/health.mjs',
  health,
)

console.log(`
=================================================
ISR D5 PATCH COMPLETE
=================================================

Added:
 - site-wide ISR search
 - prayer-space search
 - event search
 - ISR Update search
 - direct search result deep-links
 - campus prayer guide
 - stronger Start Here discovery
 - accessible 404 recovery
 - global skip navigation
 - stronger keyboard focus states
 - organization structured data
 - admin preview shortcuts
 - D5 regression audit
 - D5 routes in health checker
`)
