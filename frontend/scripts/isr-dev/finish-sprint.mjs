import fs from 'node:fs'
import path from 'node:path'

import {
  appendMarkedBlock,
  assert,
  ensureImport,
  read,
  write,
} from './helpers.mjs'

console.log(`
=================================================
ISR FINISH SPRINT
D9 + D10 + D11
=================================================
`)

/* =========================================================
 * 1. EVENT DISCOVERY HELPERS
 * ========================================================= */

const eventDiscovery =
String.raw`'use client'

import {
  useMemo,
  useState,
} from 'react'

export type EventDiscoveryFilter =
  'all' |
  'upcoming' |
  'past'

type Props = {
  onSearch?: (
    value: string,
  ) => void

  onFilter?: (
    value:
      EventDiscoveryFilter,
  ) => void
}

const FILTERS:
  {
    label: string
    value: EventDiscoveryFilter
  }[] =
[
  {
    label:
      'All',

    value:
      'all',
  },
  {
    label:
      'Upcoming',

    value:
      'upcoming',
  },
  {
    label:
      'Past',

    value:
      'past',
  },
]

export default function EventDiscoveryBar({
  onSearch,
  onFilter,
}: Props) {
  const [
    search,
    setSearch,
  ] =
    useState('')

  const [
    active,
    setActive,
  ] =
    useState<EventDiscoveryFilter>(
      'all',
    )

  const normalized =
    useMemo(
      () =>
        search.trim(),
      [
        search,
      ],
    )

  return (
    <section
      aria-label="Event discovery tools"
      className="isr-event-discovery"
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <label
            htmlFor="isr-event-search"
            className="text-xs font-bold uppercase tracking-[0.16em] text-isr-turquoise"
          >
            Search events
          </label>

          <input
            id="isr-event-search"
            type="search"
            value={
              search
            }
            onChange={
              (
                event,
              ) => {
                const value =
                  event.target.value

                setSearch(
                  value,
                )

                onSearch?.(
                  value,
                )
              }
            }
            placeholder="Search by event name, campus or venue"
            className="mt-2 min-h-12 w-full rounded-2xl border border-isr-light-blue/35 bg-white px-4 text-sm outline-none focus:border-isr-turquoise focus:ring-4 focus:ring-isr-turquoise/10"
          />

          {normalized && (
            <button
              type="button"
              onClick={() => {
                setSearch('')
                onSearch?.('')
              }}
              className="mt-2 text-xs font-bold text-isr-turquoise hover:text-isr-dark-red"
            >
              Clear search
            </button>
          )}
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-gray-500">
            Show
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            {FILTERS.map(
              (
                filter,
              ) => (
                <button
                  key={
                    filter.value
                  }
                  type="button"
                  aria-pressed={
                    active ===
                    filter.value
                  }
                  onClick={() => {
                    setActive(
                      filter.value,
                    )

                    onFilter?.(
                      filter.value,
                    )
                  }}
                  className={
                    active ===
                    filter.value
                      ? 'isr-event-filter is-active'
                      : 'isr-event-filter'
                  }
                >
                  {
                    filter.label
                  }
                </button>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
`

write(
  'components/EventDiscoveryBar.tsx',
  eventDiscovery,
)

/* =========================================================
 * 2. PRAYER PAGE SERVICE NOTICE
 * ========================================================= */

const prayerGuidance =
String.raw`import Link from 'next/link'

export default function PrayerPageGuidance() {
  return (
    <section
      aria-labelledby="prayer-guidance-heading"
      className="isr-prayer-guidance"
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-turquoise">
            Before you travel
          </p>

          <h2
            id="prayer-guidance-heading"
            className="mt-3 text-2xl font-bold text-isr-dark-red sm:text-3xl"
          >
            Check the current campus information
          </h2>

          <p className="mt-3 max-w-2xl leading-relaxed text-gray-700">
            Prayer spaces and Friday arrangements can
            differ by campus. Use the campus guide and
            the Jumu’ah section as the website source of
            truth.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <Link
            href="/campuses"
            className="isr-button-secondary text-center"
          >
            Campus guide
          </Link>

          <Link
            href="/pray#jumuah"
            className="isr-button-primary text-center"
          >
            Jumu’ah information
          </Link>
        </div>
      </div>
    </section>
  )
}
`

write(
  'components/PrayerPageGuidance.tsx',
  prayerGuidance,
)

let pray =
  read(
    'app/pray/page.tsx',
  )

pray =
  ensureImport(
    pray,
    "import PrayerPageGuidance from '@/components/PrayerPageGuidance'",
  )

if (
  !pray.includes(
    '<PrayerPageGuidance',
  )
) {
  const firstComponentCandidates = [
    '<NextPrayerCountdown',
    '<PrayerQuickNav',
    '<PrayerTimesTable',
    '<PrayerSpaceDirectory',
  ]

  let insertion =
    -1

  for (
    const candidate
    of firstComponentCandidates
  ) {
    insertion =
      pray.indexOf(
        candidate,
      )

    if (
      insertion >=
      0
    ) {
      break
    }
  }

  if (
    insertion >=
    0
  ) {
    const lineStart =
      pray.lastIndexOf(
        '\n',
        insertion,
      ) +
      1

    pray =
      pray.slice(
        0,
        lineStart,
      ) +
      `          <PrayerPageGuidance />

` +
      pray.slice(
        lineStart,
      )
  }
  else {
    const close =
      pray.lastIndexOf(
        '</main>',
      )

    assert(
      close >=
        0,
      'Could not place PrayerPageGuidance.',
    )

    pray =
      pray.slice(
        0,
        close,
      ) +
      `
        <section className="px-4 pb-10">
          <div className="container-isr mx-auto max-w-6xl">
            <PrayerPageGuidance />
          </div>
        </section>

` +
      pray.slice(
        close,
      )
  }
}

write(
  'app/pray/page.tsx',
  pray,
)

/* =========================================================
 * 3. UPDATE DEEP-LINK HIGHLIGHT
 * ========================================================= */

let css =
  read(
    'app/d3-experience.css',
  )

const finishCss =
String.raw`/* ISR TOOLKIT FINISH SPRINT */

/* Events */

.isr-event-discovery {
  border: 1px solid rgba(152, 174, 168, 0.28);
  border-radius: 1.5rem;
  background: rgba(255, 255, 255, 0.96);
  padding: 1.25rem;
  box-shadow:
    0 8px 26px rgba(91, 11, 5, 0.04);
}

.isr-event-filter {
  min-height: 2.6rem;
  border: 1px solid rgba(152, 174, 168, 0.34);
  border-radius: 9999px;
  background: #ffffff;
  padding: 0.55rem 1rem;
  color: #5B0B05;
  font-size: 0.78rem;
  font-weight: 750;
}

.isr-event-filter:hover,
.isr-event-filter.is-active {
  border-color: #509589;
  background: rgba(80, 149, 137, 0.1);
  color: #509589;
}

/* Prayer */

.isr-prayer-guidance {
  border: 1px solid rgba(152, 174, 168, 0.28);
  border-radius: 1.75rem;
  background:
    linear-gradient(
      135deg,
      rgba(234, 227, 216, 0.5),
      #ffffff
    );
  padding: 1.5rem;
}

/* Updates */

[id^="update-"] {
  scroll-margin-top: 8rem;
}

[id^="update-"]:target {
  outline:
    3px solid rgba(80, 149, 137, 0.35);
  outline-offset:
    4px;
  border-color:
    rgba(80, 149, 137, 0.7);
  box-shadow:
    0 18px 46px rgba(80, 149, 137, 0.12);
}

/* Admin */

.isr-admin-content-shell {
  max-width: 82rem;
  margin-inline: auto;
}

.isr-admin-content-heading {
  letter-spacing: -0.025em;
}

/* Mobile reliability */

@media (max-width: 639px) {
  .isr-event-discovery,
  .isr-prayer-guidance {
    border-radius: 1.35rem;
    padding: 1rem;
  }

  [id^="update-"] {
    scroll-margin-top: 6rem;
  }
}

/* Accessibility */

@media (prefers-reduced-motion: reduce) {
  [id^="update-"]:target {
    scroll-behavior: auto;
  }
}
`

css =
  appendMarkedBlock(
    css,
    'ISR TOOLKIT FINISH SPRINT',
    finishCss,
  )

write(
  'app/d3-experience.css',
  css,
)

/* =========================================================
 * 4. ADMIN DASHBOARD QA PANEL
 * ========================================================= */

const adminQa =
String.raw`'use client'

import Link from 'next/link'

const CHECKS = [
  {
    title:
      'Events',

    description:
      'Check dates, status, campus, venue, registration and public preview.',

    admin:
      '/admin/events',

    public:
      '/events',
  },
  {
    title:
      'ISR Updates',

    description:
      'Check priority, expiry, pinned status, action links and public preview.',

    admin:
      '/admin/announcements',

    public:
      '/updates',
  },
  {
    title:
      'Prayer information',

    description:
      'Review the student-facing prayer and campus information before publication.',

    admin:
      '/pray',

    public:
      '/pray',
  },
]

export default function AdminContentQaPanel() {
  return (
    <section
      aria-labelledby="admin-content-qa-heading"
      className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-turquoise">
        Content QA
      </p>

      <h2
        id="admin-content-qa-heading"
        className="isr-admin-content-heading mt-3 text-2xl font-bold text-isr-dark-red"
      >
        Review before publishing
      </h2>

      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-600">
        Use the admin view and the public preview
        together. Confirm operational details rather
        than relying on old event or prayer information.
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {CHECKS.map(
          (
            item,
          ) => (
            <article
              key={
                item.title
              }
              className="rounded-2xl border border-gray-200 bg-gray-50 p-5"
            >
              <h3 className="font-bold text-isr-dark-red">
                {
                  item.title
                }
              </h3>

              <p className="mt-2 min-h-16 text-sm leading-relaxed text-gray-600">
                {
                  item.description
                }
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  href={
                    item.admin
                  }
                  className="rounded-full bg-isr-dark-red px-4 py-2 text-xs font-bold text-white"
                >
                  Manage
                </Link>

                <Link
                  href={
                    item.public
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-bold text-isr-dark-red"
                >
                  Public preview
                </Link>
              </div>
            </article>
          ),
        )}
      </div>
    </section>
  )
}
`

write(
  'components/admin/AdminContentQaPanel.tsx',
  adminQa,
)

/* =========================================================
 * 5. ADMIN ROOT PAGE ENHANCEMENT
 * ========================================================= */

const adminPage =
  'app/admin/(protected)/page.tsx'

if (
  fs.existsSync(
    path.join(
      process.cwd(),
      adminPage,
    ),
  )
) {
  let source =
    read(
      adminPage,
    )

  source =
    ensureImport(
      source,
      "import AdminContentQaPanel from '@/components/admin/AdminContentQaPanel'",
    )

  if (
    !source.includes(
      '<AdminContentQaPanel',
    )
  ) {
    const close =
      source.lastIndexOf(
        '</main>',
      )

    if (
      close >=
      0
    ) {
      source =
        source.slice(
          0,
          close,
        ) +
        `
        <div className="mt-8">
          <AdminContentQaPanel />
        </div>

` +
        source.slice(
          close,
        )
    }
    else {
      const returnClose =
        source.lastIndexOf(
          '</div>',
        )

      if (
        returnClose >=
        0
      ) {
        source =
          source.slice(
            0,
            returnClose,
          ) +
          `
        <div className="mt-8">
          <AdminContentQaPanel />
        </div>
` +
          source.slice(
            returnClose,
          )
      }
    }
  }

  write(
    adminPage,
    source,
  )
}

/* =========================================================
 * 6. SEO / METADATA AUDIT
 * ========================================================= */

const seoAudit =
String.raw`import fs from 'node:fs'
import path from 'node:path'

const root =
  process.cwd()

const routes = [
  'app/page.tsx',
  'app/start/page.tsx',
  'app/pray/page.tsx',
  'app/events/page.tsx',
  'app/updates/page.tsx',
  'app/join/page.tsx',
  'app/support/page.tsx',
  'app/about/page.tsx',
  'app/contact/page.tsx',
  'app/find/page.tsx',
  'app/campuses/page.tsx',
]

const failures = []

for (
  const route
  of routes
) {
  const absolute =
    path.join(
      root,
      route,
    )

  if (
    !fs.existsSync(
      absolute,
    )
  ) {
    failures.push(
      route +
      ': route file missing',
    )

    continue
  }

  const source =
    fs.readFileSync(
      absolute,
      'utf8',
    )

  if (
    route !==
      'app/page.tsx' &&
    !source.includes(
      'Metadata',
    )
  ) {
    failures.push(
      route +
      ': Metadata export/import missing',
    )
  }
}

const layout =
  fs.readFileSync(
    path.join(
      root,
      'app/layout.tsx',
    ),
    'utf8',
  )

if (
  !layout.includes(
    'metadataBase',
  )
) {
  failures.push(
    'Root metadataBase missing',
  )
}

if (
  !layout.includes(
    'openGraph',
  )
) {
  failures.push(
    'Root Open Graph metadata missing',
  )
}

const sitemap =
  path.join(
    root,
    'app/sitemap.ts',
  )

if (
  !fs.existsSync(
    sitemap,
  )
) {
  failures.push(
    'sitemap.ts missing',
  )
}

const robots =
  path.join(
    root,
    'app/robots.ts',
  )

if (
  !fs.existsSync(
    robots,
  )
) {
  failures.push(
    'robots.ts missing',
  )
}

console.log(
  '\nISR SEO AUDIT\n',
)

if (
  failures.length ===
  0
) {
  console.log(
    'PASS - metadata, sitemap and robots foundations.',
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
  'scripts/seo-audit.mjs',
  seoAudit,
)

/* =========================================================
 * 7. ACCESSIBILITY STATIC AUDIT
 * ========================================================= */

const accessibilityAudit =
String.raw`import fs from 'node:fs'
import path from 'node:path'

const root =
  process.cwd()

function collect(
  directory,
) {
  if (
    !fs.existsSync(
      directory,
    )
  ) {
    return []
  }

  return fs
    .readdirSync(
      directory,
      {
        withFileTypes:
          true,
      },
    )
    .flatMap(
      (
        entry,
      ) => {
        const absolute =
          path.join(
            directory,
            entry.name,
          )

        if (
          entry.isDirectory()
        ) {
          return collect(
            absolute,
          )
        }

        return (
          /\.(tsx|ts)$/.test(
            entry.name,
          )
            ? [
                absolute,
              ]
            : []
        )
      },
    )
}

const files = [
  ...collect(
    path.join(
      root,
      'app',
    ),
  ),

  ...collect(
    path.join(
      root,
      'components',
    ),
  ),
]

const failures = []

for (
  const file
  of files
) {
  const source =
    fs.readFileSync(
      file,
      'utf8',
    )

  if (
    source.includes(
      'target="_blank"',
    ) &&
    !source.includes(
      'noopener',
    )
  ) {
    failures.push(
      path.relative(
        root,
        file,
      ) +
      ': target blank without noopener',
    )
  }

  if (
    /<img\b/.test(
      source,
    ) &&
    !/alt=/.test(
      source,
    )
  ) {
    failures.push(
      path.relative(
        root,
        file,
      ) +
      ': raw img may be missing alt text',
    )
  }
}

const layout =
  fs.readFileSync(
    path.join(
      root,
      'app/layout.tsx',
    ),
    'utf8',
  )

if (
  !layout.includes(
    'Skip to main content',
  )
) {
  failures.push(
    'Global skip link missing',
  )
}

const css =
  fs.readFileSync(
    path.join(
      root,
      'app/d3-experience.css',
    ),
    'utf8',
  )

if (
  !css.includes(
    'prefers-reduced-motion',
  )
) {
  failures.push(
    'Reduced motion rules missing',
  )
}

if (
  !css.includes(
    ':focus-visible',
  )
) {
  failures.push(
    'Focus-visible styles missing',
  )
}

console.log(
  '\nISR ACCESSIBILITY STATIC AUDIT\n',
)

if (
  failures.length ===
  0
) {
  console.log(
    'PASS - accessibility static contracts.',
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
  'scripts/accessibility-audit.mjs',
  accessibilityAudit,
)

/* =========================================================
 * 8. PUBLIC LINK / CONTENT RELIABILITY AUDIT
 * ========================================================= */

const readinessAudit =
String.raw`import fs from 'node:fs'
import path from 'node:path'

const root =
  process.cwd()

const failures = []
const warnings = []

function collect(
  directory,
) {
  if (
    !fs.existsSync(
      directory,
    )
  ) {
    return []
  }

  return fs
    .readdirSync(
      directory,
      {
        withFileTypes:
          true,
      },
    )
    .flatMap(
      (
        entry,
      ) => {
        const absolute =
          path.join(
            directory,
            entry.name,
          )

        if (
          entry.isDirectory()
        ) {
          if (
            entry.name ===
            'admin'
          ) {
            return []
          }

          return collect(
            absolute,
          )
        }

        return (
          /\.(tsx|ts)$/.test(
            entry.name,
          )
            ? [
                absolute,
              ]
            : []
        )
      },
    )
}

const publicFiles = [
  ...collect(
    path.join(
      root,
      'app',
    ),
  ),

  ...collect(
    path.join(
      root,
      'components',
    ),
  ),
]

for (
  const file
  of publicFiles
) {
  const source =
    fs.readFileSync(
      file,
      'utf8',
    )

  const relative =
    path.relative(
      root,
      file,
    )

  if (
    source.includes(
      'Linktree',
    )
  ) {
    failures.push(
      relative +
      ': Linktree reference remains',
    )
  }

  if (
    source.includes(
      'contentOwner',
    )
  ) {
    failures.push(
      relative +
      ': internal contentOwner exposed publicly',
    )
  }

  if (
    source.includes(
      'reviewedAt',
    )
  ) {
    failures.push(
      relative +
      ': internal reviewedAt exposed publicly',
    )
  }

  if (
    /prototype only/i.test(
      source,
    )
  ) {
    warnings.push(
      relative +
      ': prototype wording remains',
    )
  }

  if (
    /verification required/i.test(
      source,
    )
  ) {
    warnings.push(
      relative +
      ': verification wording remains',
    )
  }

  if (
    /pending confirmation/i.test(
      source,
    )
  ) {
    warnings.push(
      relative +
      ': pending confirmation wording remains',
    )
  }
}

console.log(
  '\nISR READINESS AUDIT\n',
)

for (
  const warning
  of warnings
) {
  console.log(
    'WARN - ' +
    warning,
  )
}

if (
  failures.length ===
  0
) {
  console.log(
    '\nPASS - no critical public readiness violations.',
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
  'scripts/readiness-audit.mjs',
  readinessAudit,
)

/* =========================================================
 * 9. FINISH SPRINT AUDIT
 * ========================================================= */

const finishAudit =
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
  value,
  message,
) {
  if (!value) {
    failures.push(
      message,
    )
  }
}

const pray =
  read(
    'app/pray/page.tsx',
  )

const guidance =
  read(
    'components/PrayerPageGuidance.tsx',
  )

const css =
  read(
    'app/d3-experience.css',
  )

const adminQa =
  read(
    'components/admin/AdminContentQaPanel.tsx',
  )

expect(
  pray.includes(
    'PrayerPageGuidance',
  ),
  'Prayer guidance not mounted.',
)

expect(
  guidance.includes(
    '/campuses',
  ),
  'Prayer guidance lacks campus guide.',
)

expect(
  guidance.includes(
    '/pray#jumuah',
  ),
  'Prayer guidance lacks Jumuah shortcut.',
)

expect(
  css.includes(
    '[id^="update-"]:target',
  ),
  'Update deep-link highlighting missing.',
)

expect(
  adminQa.includes(
    'Public preview',
  ),
  'Admin QA public preview missing.',
)

expect(
  adminQa.includes(
    '/admin/events',
  ),
  'Admin QA events link missing.',
)

console.log(
  '\nISR FINISH SPRINT AUDIT\n',
)

if (
  failures.length ===
  0
) {
  console.log(
    'PASS - finish sprint contracts.',
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
  'scripts/finish-sprint-audit.mjs',
  finishAudit,
)

/* =========================================================
 * 10. REGISTER ALL AUDITS IN HEALTH
 * ========================================================= */

let health =
  read(
    'scripts/isr-dev/health.mjs',
  )

const newAudits = [
  "'scripts/seo-audit.mjs'",
  "'scripts/accessibility-audit.mjs'",
  "'scripts/readiness-audit.mjs'",
  "'scripts/finish-sprint-audit.mjs'",
]

for (
  const audit
  of newAudits
) {
  if (
    health.includes(
      audit,
    )
  ) {
    continue
  }

  const anchorCandidates = [
    "'scripts/d8-audit.mjs',",
    "'scripts/d7-audit.mjs',",
    "'scripts/d6-audit.mjs',",
  ]

  let inserted =
    false

  for (
    const anchor
    of anchorCandidates
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
  ${audit},`,
        )

      inserted =
        true

      break
    }
  }

  assert(
    inserted,
    'Could not register ' +
      audit,
  )
}

write(
  'scripts/isr-dev/health.mjs',
  health,
)

console.log(`
=================================================
FINISH SPRINT PATCH COMPLETE
=================================================

Added/refined:
 - event discovery component
 - prayer pre-travel guidance
 - update deep-link highlighting
 - admin content QA panel
 - SEO audit
 - accessibility static audit
 - public readiness audit
 - finish sprint audit
 - extended health suite
`)
