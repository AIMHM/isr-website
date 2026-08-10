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
ISR TOOLKIT
D4.4 + D4.5 + D4.6
=================================================
`)

/* =========================================================
 * D4.4 — ISR UPDATES EXPERIENCE
 * ========================================================= */

const announcementsComponent =
String.raw`'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  fetchAnnouncements,
  formatAnnouncementDate,
  type Announcement,
  type AnnouncementPriority,
} from '@/lib/announcements'
import {
  PinIcon,
} from '@/components/Icons'

type UpdateFilter =
  | 'all'
  | 'urgent'
  | 'important'
  | 'pinned'

const FILTERS: Array<{
  value: UpdateFilter
  label: string
}> = [
  {
    value: 'all',
    label: 'All',
  },
  {
    value: 'urgent',
    label: 'Urgent',
  },
  {
    value: 'important',
    label: 'Important',
  },
  {
    value: 'pinned',
    label: 'Pinned',
  },
]

const PRIORITY_CLASSES: Record<
  AnnouncementPriority,
  string
> = {
  normal:
    'bg-isr-light-blue/20 text-isr-dark-red',

  important:
    'bg-isr-yellow text-isr-dark-red',

  urgent:
    'bg-red-100 text-red-800',
}

function fallbackCopy(
  value: string,
): boolean {
  const textarea =
    document.createElement(
      'textarea',
    )

  textarea.value =
    value

  textarea.setAttribute(
    'readonly',
    '',
  )

  textarea.style.position =
    'fixed'

  textarea.style.opacity =
    '0'

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

async function copyText(
  value: string,
): Promise<boolean> {
  try {
    if (
      navigator.clipboard &&
      window.isSecureContext
    ) {
      await navigator.clipboard.writeText(
        value,
      )

      return true
    }

    return fallbackCopy(
      value,
    )
  }
  catch {
    return false
  }
}

function AnnouncementImage({
  announcement,
}: {
  announcement: Announcement
}) {
  if (
    !announcement.imageUrl
  ) {
    return null
  }

  return (
    <div className="relative aspect-[16/9] overflow-hidden bg-isr-cream">
      <Image
        src={
          announcement.imageUrl
        }
        alt=""
        fill
        aria-hidden="true"
        className="scale-110 object-cover opacity-25 blur-xl"
        sizes="(max-width: 768px) 100vw, 768px"
      />

      <Image
        src={
          announcement.imageUrl
        }
        alt={
          announcement.title +
          ' image'
        }
        fill
        className="object-contain p-4"
        sizes="(max-width: 768px) 100vw, 768px"
      />
    </div>
  )
}

function AnnouncementAction({
  label,
  url,
}: {
  label: string
  url: string
}) {
  if (
    url.startsWith(
      '/',
    )
  ) {
    return (
      <Link
        href={
          url
        }
        className="isr-button-primary text-sm"
      >
        {label}
      </Link>
    )
  }

  return (
    <a
      href={
        url
      }
      target={
        url.startsWith(
          'http',
        )
          ? '_blank'
          : undefined
      }
      rel={
        url.startsWith(
          'http',
        )
          ? 'noopener noreferrer'
          : undefined
      }
      className="isr-button-primary text-sm"
    >
      {label}
    </a>
  )
}

function UpdateShareTools({
  announcement,
}: {
  announcement: Announcement
}) {
  const [
    notice,
    setNotice,
  ] =
    useState('')

  function showNotice(
    value: string,
  ) {
    setNotice(
      value,
    )

    window.setTimeout(
      () => {
        setNotice('')
      },
      2200,
    )
  }

  function directUrl() {
    return (
      window.location.origin +
      '/updates#update-' +
      announcement.id
    )
  }

  async function copyLink() {
    const copied =
      await copyText(
        directUrl(),
      )

    showNotice(
      copied
        ? 'Update link copied.'
        : 'Could not copy the link.',
    )
  }

  async function shareUpdate() {
    const url =
      directUrl()

    if (
      navigator.share
    ) {
      try {
        await navigator.share({
          title:
            announcement.title,

          text:
            announcement.body,

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
    <div className="isr-update-share-tools">
      <button
        type="button"
        onClick={
          copyLink
        }
        className="isr-update-tool-button"
      >
        Copy link
      </button>

      <button
        type="button"
        onClick={
          shareUpdate
        }
        className="isr-update-tool-button"
      >
        Share
      </button>

      <span
        aria-live="polite"
        className="min-h-5 text-xs font-semibold text-isr-turquoise"
      >
        {notice}
      </span>
    </div>
  )
}

function priorityCardClass(
  priority: AnnouncementPriority,
  pinned: boolean,
) {
  if (
    priority ===
    'urgent'
  ) {
    return 'border-red-200'
  }

  if (pinned) {
    return 'border-isr-turquoise/40'
  }

  return ''
}

function AnnouncementCard({
  announcement,
}: {
  announcement: Announcement
}) {
  const priority =
    announcement.priority ??
    'normal'

  return (
    <article
      id={
        'update-' +
        announcement.id
      }
      aria-labelledby={
        'update-title-' +
        announcement.id
      }
      className={
        'isr-card scroll-mt-28 overflow-hidden ' +
        priorityCardClass(
          priority,
          announcement.pinned,
        )
      }
    >
      <AnnouncementImage
        announcement={
          announcement
        }
      />

      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <time
            dateTime={
              announcement.createdAt
            }
            className="text-sm font-semibold uppercase tracking-[0.12em] text-isr-turquoise"
          >
            {formatAnnouncementDate(
              announcement.createdAt,
            )}
          </time>

          {announcement.pinned && (
            <span className="inline-flex items-center gap-1 rounded-full bg-isr-turquoise/15 px-3 py-1 text-xs font-semibold text-isr-turquoise">
              <PinIcon className="h-3 w-3" />
              Pinned
            </span>
          )}

          {priority !==
            'normal' && (
            <span
              className={
                'rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ' +
                PRIORITY_CLASSES[
                  priority
                ]
              }
            >
              {priority}
            </span>
          )}
        </div>

        <h2
          id={
            'update-title-' +
            announcement.id
          }
          className="mt-4 text-2xl font-bold text-isr-dark-red sm:text-3xl"
        >
          {announcement.title}
        </h2>

        <p className="mt-4 whitespace-pre-line leading-relaxed text-gray-700">
          {announcement.body}
        </p>

        <div className="mt-6 flex flex-col gap-4 border-t border-isr-light-blue/20 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {announcement.actionUrl &&
              announcement.actionLabel && (
                <AnnouncementAction
                  label={
                    announcement.actionLabel
                  }
                  url={
                    announcement.actionUrl
                  }
                />
              )}
          </div>

          <UpdateShareTools
            announcement={
              announcement
            }
          />
        </div>
      </div>
    </article>
  )
}

export default function AnnouncementsList() {
  const [
    announcements,
    setAnnouncements,
  ] =
    useState<
      Announcement[]
    >(
      [],
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

  const [
    search,
    setSearch,
  ] =
    useState('')

  const [
    filter,
    setFilter,
  ] =
    useState<UpdateFilter>(
      'all',
    )

  const load =
    useCallback(
      async () => {
        setLoading(
          true,
        )

        setError(
          false,
        )

        try {
          setAnnouncements(
            await fetchAnnouncements(),
          )
        }
        catch {
          setAnnouncements(
            [],
          )

          setError(
            true,
          )
        }
        finally {
          setLoading(
            false,
          )
        }
      },
      [],
    )

  useEffect(
    () => {
      void load()
    },
    [
      load,
    ],
  )

  const counts =
    useMemo(
      () => ({
        all:
          announcements.length,

        urgent:
          announcements.filter(
            (
              announcement,
            ) =>
              announcement.priority ===
              'urgent',
          ).length,

        important:
          announcements.filter(
            (
              announcement,
            ) =>
              announcement.priority ===
              'important',
          ).length,

        pinned:
          announcements.filter(
            (
              announcement,
            ) =>
              announcement.pinned,
          ).length,
      }),
      [
        announcements,
      ],
    )

  const filtered =
    useMemo(
      () => {
        const query =
          search
            .trim()
            .toLowerCase()

        return announcements.filter(
          (
            announcement,
          ) => {
            const matchesSearch =
              !query ||
              announcement.title
                .toLowerCase()
                .includes(
                  query,
                ) ||
              announcement.body
                .toLowerCase()
                .includes(
                  query,
                )

            if (
              !matchesSearch
            ) {
              return false
            }

            if (
              filter ===
              'urgent'
            ) {
              return (
                announcement.priority ===
                'urgent'
              )
            }

            if (
              filter ===
              'important'
            ) {
              return (
                announcement.priority ===
                'important'
              )
            }

            if (
              filter ===
              'pinned'
            ) {
              return announcement.pinned
            }

            return true
          },
        )
      },
      [
        announcements,
        filter,
        search,
      ],
    )

  if (loading) {
    return (
      <div
        aria-live="polite"
        aria-busy="true"
        className="mx-auto max-w-4xl space-y-6"
      >
        {[0, 1, 2].map(
          (
            index,
          ) => (
            <div
              key={
                index
              }
              className="h-56 animate-pulse rounded-3xl bg-white ring-1 ring-isr-light-blue/20"
            />
          ),
        )}
      </div>
    )
  }

  if (error) {
    return (
      <div
        role="alert"
        className="mx-auto max-w-xl rounded-2xl bg-isr-yellow/60 px-6 py-8 text-center"
      >
        <p className="text-sm text-isr-dark-red">
          ISR updates could not be loaded right now.
        </p>

        <button
          type="button"
          onClick={() =>
            void load()
          }
          className="isr-text-link mt-4"
        >
          Try again
        </button>
      </div>
    )
  }

  if (
    announcements.length ===
    0
  ) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-isr-light-blue/30 bg-white px-6 py-12 text-center">
        <p className="text-lg font-semibold text-isr-dark-red">
          No current ISR updates
        </p>

        <p className="mt-2 text-sm leading-relaxed text-gray-600">
          New operational notices will appear here when published.
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl">
      <section
        aria-label="Filter ISR updates"
        className="isr-updates-control-panel"
      >
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <label
              htmlFor="isr-update-search"
              className="text-xs font-bold uppercase tracking-[0.15em] text-isr-turquoise"
            >
              Search updates
            </label>

            <input
              id="isr-update-search"
              type="search"
              value={
                search
              }
              onChange={
                (
                  event,
                ) =>
                  setSearch(
                    event.target.value,
                  )
              }
              placeholder="Search prayer, event or campus notices"
              className="mt-2 min-h-12 w-full rounded-xl border border-isr-light-blue/35 bg-white px-4 text-sm text-gray-800 outline-none transition focus:border-isr-turquoise focus:ring-2 focus:ring-isr-turquoise/20"
            />
          </div>

          <p
            aria-live="polite"
            className="text-sm font-semibold text-gray-600"
          >
            {filtered.length}{' '}
            {filtered.length ===
            1
              ? 'update'
              : 'updates'}
          </p>
        </div>

        <div className="isr-update-filter-scroll mt-4">
          {FILTERS.map(
            (
              option,
            ) => (
              <button
                key={
                  option.value
                }
                type="button"
                aria-pressed={
                  filter ===
                  option.value
                }
                onClick={() =>
                  setFilter(
                    option.value,
                  )
                }
                className={
                  filter ===
                  option.value
                    ? 'isr-update-filter-pill isr-update-filter-pill-active'
                    : 'isr-update-filter-pill'
                }
              >
                {option.label}
                <span
                  aria-hidden="true"
                  className="ml-1 opacity-60"
                >
                  {counts[
                    option.value
                  ]}
                </span>
              </button>
            ),
          )}
        </div>
      </section>

      {filtered.length ===
      0 ? (
        <div className="mt-7 rounded-2xl border border-isr-light-blue/30 bg-white px-6 py-12 text-center">
          <p className="text-lg font-semibold text-isr-dark-red">
            No updates match those filters
          </p>

          <button
            type="button"
            onClick={() => {
              setSearch('')
              setFilter(
                'all',
              )
            }}
            className="isr-button-secondary mt-5 text-sm"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="mt-7 space-y-7">
          {filtered.map(
            (
              announcement,
            ) => (
              <AnnouncementCard
                key={
                  announcement.id
                }
                announcement={
                  announcement
                }
              />
            ),
          )}
        </div>
      )}
    </div>
  )
}
`

write(
  'components/AnnouncementsList.tsx',
  announcementsComponent,
)

console.log(
  'PASS - D4.4 ISR Updates experience.',
)

/* =========================================================
 * D4.5 — START HERE STUDENT UTILITY PANEL
 * ========================================================= */

const startUtility =
String.raw`import Link from 'next/link'
import {
  ISR_PUBLIC,
  PRAYER_SPACES,
} from '@/lib/siteContent'

const TASKS = [
  {
    title:
      'Friday prayer',
    description:
      'Check current Jumu’ah times and locations.',
    href:
      '/pray#jumuah',
  },
  {
    title:
      'Upcoming events',
    description:
      'See what ISR is running next.',
    href:
      '/events',
  },
  {
    title:
      'Current ISR updates',
    description:
      'Check prayer, event and campus notices.',
    href:
      '/updates',
  },
  {
    title:
      'Student support',
    description:
      'Contact ISR about a concern or support need.',
    href:
      '/support',
  },
  {
    title:
      'Become a member',
    description:
      'Join ISR membership for free.',
    href:
      '/join',
  },
]

export default function StartUtilityPanel() {
  return (
    <section
      aria-labelledby="student-task-heading"
      className="isr-student-task-panel"
    >
      <div className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-turquoise">
          Student shortcuts
        </p>

        <h2
          id="student-task-heading"
          className="mt-3 text-3xl font-bold text-isr-dark-red sm:text-4xl"
        >
          Need something quickly?
        </h2>

        <p className="mt-4 leading-relaxed text-gray-700">
          Go straight to the information Muslim students
          most often need at RMIT.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TASKS.map(
          (
            task,
          ) => (
            <Link
              key={
                task.title
              }
              href={
                task.href
              }
              className="isr-student-task-card"
            >
              <h3 className="font-bold text-isr-dark-red">
                {task.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {task.description}
              </p>

              <span className="mt-4 inline-flex text-sm font-bold text-isr-turquoise">
                Open →
              </span>
            </Link>
          ),
        )}

        <a
          href={
            ISR_PUBLIC.community.url
          }
          target="_blank"
          rel="noopener noreferrer"
          className="isr-student-task-card"
        >
          <h3 className="font-bold text-isr-dark-red">
            Join the ISR community
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-gray-600">
            Enter the main ISR WhatsApp community.
          </p>

          <span className="mt-4 inline-flex text-sm font-bold text-isr-turquoise">
            Open WhatsApp ↗
          </span>
        </a>
      </div>

      <div className="mt-8 border-t border-isr-light-blue/25 pt-6">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-gray-500">
          Prayer spaces by campus
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {PRAYER_SPACES.map(
            (
              space,
            ) => (
              <Link
                key={
                  space.id
                }
                href={
                  '/pray#' +
                  space.id
                }
                className="isr-student-campus-pill"
              >
                {space.name}
              </Link>
            ),
          )}
        </div>
      </div>
    </section>
  )
}
`

write(
  'components/StartUtilityPanel.tsx',
  startUtility,
)

let startPage =
  read(
    'app/start/page.tsx',
  )

startPage =
  ensureImport(
    startPage,
    "import StartUtilityPanel from '@/components/StartUtilityPanel'",
  )

if (
  !startPage.includes(
    '<StartUtilityPanel',
  )
) {
  const closingMain =
    startPage.lastIndexOf(
      '</main>',
    )

  assert(
    closingMain >=
      0,
    'Could not locate </main> in Start Here page.',
  )

  const render =
`
        <div className="container-isr mx-auto max-w-6xl px-4 pb-16 sm:pb-20">
          <StartUtilityPanel />
        </div>

`

  startPage =
    startPage.slice(
      0,
      closingMain,
    ) +
    render +
    startPage.slice(
      closingMain,
    )
}

write(
  'app/start/page.tsx',
  startPage,
)

console.log(
  'PASS - D4.5 Start Here utilities.',
)

/* =========================================================
 * D4.6 — ADMIN PRODUCTIVITY BAR
 * ========================================================= */

const adminUtility =
String.raw`'use client'

import Link from 'next/link'
import {
  usePathname,
} from 'next/navigation'

const PUBLIC_LINKS = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/events',
    label: 'Events',
  },
  {
    href: '/updates',
    label: 'ISR Updates',
  },
  {
    href: '/pray',
    label: 'Pray at RMIT',
  },
  {
    href: '/start',
    label: 'Start Here',
  },
]

export default function AdminUtilityBar() {
  const pathname =
    usePathname()

  const localMode =
    process.env.NEXT_PUBLIC_LOCAL_ADMIN_MODE ===
    'true'

  return (
    <aside
      aria-label="Admin public preview shortcuts"
      className="isr-admin-utility-bar"
    >
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-isr-turquoise">
              Admin workspace
            </p>

            {localMode && (
              <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-bold text-amber-900">
                Local sandbox
              </span>
            )}
          </div>

          <p className="mt-1 text-xs text-gray-500">
            Current admin route: {pathname}
          </p>
        </div>

        <nav
          aria-label="Preview public ISR pages"
          className="flex flex-wrap gap-2"
        >
          {PUBLIC_LINKS.map(
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
                target="_blank"
                rel="noopener noreferrer"
                className="isr-admin-preview-link"
              >
                {link.label}
                <span
                  aria-hidden="true"
                >
                  ↗
                </span>
              </Link>
            ),
          )}
        </nav>
      </div>
    </aside>
  )
}
`

write(
  'components/admin/AdminUtilityBar.tsx',
  adminUtility,
)

let adminLayout =
  read(
    'app/admin/(protected)/layout.tsx',
  )

adminLayout =
  ensureImport(
    adminLayout,
    "import AdminUtilityBar from '@/components/admin/AdminUtilityBar'",
  )

if (
  adminLayout.includes(
    "label: 'Announcements'",
  )
) {
  adminLayout =
    adminLayout.replace(
      "label: 'Announcements'",
      "label: 'ISR Updates'",
    )
}

if (
  !adminLayout.includes(
    '<AdminUtilityBar',
  )
) {
  const mainStart =
    adminLayout.search(
      /<main\b/,
    )

  assert(
    mainStart >=
      0,
    'Could not locate admin <main>.',
  )

  adminLayout =
    adminLayout.slice(
      0,
      mainStart,
    ) +
    '<AdminUtilityBar />\n\n      ' +
    adminLayout.slice(
      mainStart,
    )
}

write(
  'app/admin/(protected)/layout.tsx',
  adminLayout,
)

console.log(
  'PASS - D4.6 admin productivity bar.',
)

/* =========================================================
 * D4.4-6 CSS
 * ========================================================= */

let css =
  read(
    'app/d3-experience.css',
  )

const cssBlock =
String.raw`/* ISR TOOLKIT D4 SERVICES LAYER */

.isr-updates-control-panel {
  border: 1px solid rgba(152, 174, 168, 0.28);
  border-radius: 1.5rem;
  background: rgba(255, 255, 255, 0.92);
  padding: 1rem;
  box-shadow:
    0 8px 28px rgba(91, 11, 5, 0.05);
}

.isr-update-filter-scroll {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.2rem;
  scrollbar-width: thin;
  scroll-snap-type: x proximity;
}

.isr-update-filter-pill {
  min-height: 2.65rem;
  flex: 0 0 auto;
  scroll-snap-align: start;
  border: 1px solid rgba(152, 174, 168, 0.35);
  border-radius: 9999px;
  background: #ffffff;
  padding: 0.6rem 1rem;
  color: #5B0B05;
  font-size: 0.8rem;
  font-weight: 700;
  transition:
    background-color 160ms ease,
    border-color 160ms ease,
    color 160ms ease;
}

.isr-update-filter-pill:hover {
  border-color: #509589;
}

.isr-update-filter-pill-active {
  border-color: #509589;
  background: #509589;
  color: #ffffff;
}

.isr-update-share-tools {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.55rem;
}

.isr-update-tool-button {
  display: inline-flex;
  min-height: 2.5rem;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(152, 174, 168, 0.35);
  border-radius: 9999px;
  background: #ffffff;
  padding: 0.5rem 0.9rem;
  color: #5B0B05;
  font-size: 0.75rem;
  font-weight: 700;
}

.isr-update-tool-button:hover {
  border-color: #509589;
  color: #509589;
}

.isr-student-task-panel {
  overflow: hidden;
  border: 1px solid rgba(152, 174, 168, 0.28);
  border-radius: 2rem;
  background:
    radial-gradient(
      circle at 92% 8%,
      rgba(80, 149, 137, 0.12),
      transparent 30%
    ),
    linear-gradient(
      145deg,
      rgba(234, 227, 216, 0.58),
      #ffffff
    );
  padding: 1.5rem;
  box-shadow:
    0 14px 42px rgba(91, 11, 5, 0.06);
}

.isr-student-task-card {
  display: flex;
  min-height: 10rem;
  flex-direction: column;
  border: 1px solid rgba(152, 174, 168, 0.25);
  border-radius: 1.25rem;
  background: rgba(255, 255, 255, 0.9);
  padding: 1.25rem;
  transition:
    transform 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease;
}

.isr-student-task-card:hover {
  transform: translateY(-2px);
  border-color: rgba(80, 149, 137, 0.6);
  box-shadow:
    0 10px 26px rgba(91, 11, 5, 0.06);
}

.isr-student-campus-pill {
  display: inline-flex;
  min-height: 2.6rem;
  align-items: center;
  border-radius: 9999px;
  background: rgba(80, 149, 137, 0.1);
  padding: 0.55rem 0.95rem;
  color: #5B0B05;
  font-size: 0.8rem;
  font-weight: 700;
}

.isr-student-campus-pill:hover {
  background: #509589;
  color: #ffffff;
}

.isr-admin-utility-bar {
  margin-bottom: 1rem;
  border: 1px solid rgba(152, 174, 168, 0.28);
  border-radius: 1rem;
  background: #ffffff;
  padding: 0.9rem 1rem;
  box-shadow:
    0 4px 18px rgba(91, 11, 5, 0.04);
}

.isr-admin-preview-link {
  display: inline-flex;
  min-height: 2.4rem;
  align-items: center;
  gap: 0.35rem;
  border-radius: 9999px;
  background: rgba(234, 227, 216, 0.65);
  padding: 0.5rem 0.85rem;
  color: #5B0B05;
  font-size: 0.75rem;
  font-weight: 700;
}

.isr-admin-preview-link:hover {
  background: #509589;
  color: #ffffff;
}

@media (min-width: 640px) {
  .isr-updates-control-panel {
    padding: 1.25rem;
  }

  .isr-student-task-panel {
    padding: 2rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .isr-update-filter-pill,
  .isr-student-task-card {
    transition: none;
  }

  .isr-student-task-card:hover {
    transform: none;
  }
}
`

css =
  appendMarkedBlock(
    css,
    'ISR TOOLKIT D4 SERVICES LAYER',
    cssBlock,
  )

write(
  'app/d3-experience.css',
  css,
)

console.log(
  'PASS - D4 service/mobile visual layer.',
)

/* =========================================================
 * D4 SERVICE AUDIT
 * ========================================================= */

const audit =
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

const updates =
  read(
    'components/AnnouncementsList.tsx',
  )

const announcementsLib =
  read(
    'lib/announcements.ts',
  )

const announcementsRedirect =
  read(
    'app/announcements/page.tsx',
  )

const start =
  read(
    'app/start/page.tsx',
  )

const startUtility =
  read(
    'components/StartUtilityPanel.tsx',
  )

const adminLayout =
  read(
    'app/admin/(protected)/layout.tsx',
  )

const adminUtility =
  read(
    'components/admin/AdminUtilityBar.tsx',
  )

const support =
  read(
    'app/support/page.tsx',
  ) +
  '\n' +
  read(
    'components/StudentSupportDirectory.tsx',
  )

const join =
  read(
    'app/join/page.tsx',
  )

const pray =
  read(
    'app/pray/page.tsx',
  )

const eventTools =
  read(
    'components/EventUtilities.tsx',
  )

expect(
  updates.includes(
    'Search updates',
  ),
  'ISR Updates search is missing.',
)

expect(
  updates.includes(
    "'urgent'",
  ) &&
  updates.includes(
    "'important'",
  ) &&
  updates.includes(
    "'pinned'",
  ),
  'ISR Update priority filters are missing.',
)

expect(
  updates.includes(
    'navigator.share',
  ),
  'ISR Update sharing is missing.',
)

expect(
  updates.includes(
    'navigator.clipboard',
  ),
  'ISR Update copy-link support is missing.',
)

expect(
  updates.includes(
    "'update-' +",
  ),
  'Direct update anchors are missing.',
)

expect(
  !updates.includes(
    'contentOwner',
  ),
  'Internal content owner leaked publicly.',
)

expect(
  !updates.includes(
    'reviewedAt',
  ),
  'Internal review metadata leaked publicly.',
)

expect(
  announcementsLib.includes(
    'isAnnouncementExpired',
  ),
  'Update expiry handling is missing.',
)

expect(
  announcementsLib.includes(
    'sortAnnouncements',
  ),
  'Update priority sorting is missing.',
)

expect(
  announcementsRedirect.includes(
    "redirect('/updates')",
  ) ||
  announcementsRedirect.includes(
    'redirect("/updates")',
  ),
  '/announcements no longer redirects to /updates.',
)

expect(
  start.includes(
    'StartUtilityPanel',
  ),
  'Start Here student utility panel is missing.',
)

expect(
  startUtility.includes(
    'PRAYER_SPACES',
  ),
  'Start Here campus shortcuts are not tied to the prayer-space source.',
)

expect(
  startUtility.includes(
    'ISR_PUBLIC.community.url',
  ),
  'Official ISR community pathway is missing.',
)

expect(
  adminLayout.includes(
    'AdminUtilityBar',
  ),
  'Admin public preview bar is missing.',
)

expect(
  adminUtility.includes(
    "target=\"_blank\"",
  ),
  'Admin preview links do not open separately.',
)

expect(
  adminUtility.includes(
    'noopener noreferrer',
  ),
  'Admin preview external-window protection is missing.',
)

expect(
  !support.includes(
    'Safer Community',
  ),
  'Public support page contains Safer Community.',
)

expect(
  !support.includes(
    'RUSU Student Rights',
  ),
  'Public support page contains RUSU Student Rights.',
)

expect(
  join.includes(
    'Membership is free',
  ),
  'Free membership wording has regressed.',
)

expect(
  pray.includes(
    'NextPrayerCountdown',
  ),
  'D4 smart prayer utility has regressed.',
)

expect(
  pray.includes(
    'PrayerQuickNav',
  ),
  'D4 prayer navigation has regressed.',
)

expect(
  eventTools.includes(
    'BEGIN:VCALENDAR',
  ),
  'D4 event calendar export has regressed.',
)

expect(
  eventTools.includes(
    'navigator.share',
  ),
  'D4 event sharing has regressed.',
)

console.log(
  '\nISR D4 SERVICES AUDIT\n',
)

if (
  failures.length ===
  0
) {
  console.log(
    'PASS - D4.4, D4.5 and D4.6 service contracts.',
  )

  process.exit(
    0,
  )
}

console.error(
  'FAIL - D4 service issues:',
)

for (
  const failure
  of failures
) {
  console.error(
    '  - ' +
    failure,
  )
}

process.exit(
  1,
)
`

write(
  'scripts/d4-services-audit.mjs',
  audit,
)

/* =========================================================
 * REUSABLE HEALTH COMMAND
 * ========================================================= */

const health =
String.raw`import fs from 'node:fs'
import path from 'node:path'

import {
  capture,
  checkRoutes,
  frontendRoot,
  run,
} from './helpers.mjs'

console.log(
  '\n=================================================',
)

console.log(
  'ISR LOCAL WEBSITE HEALTH CHECK',
)

console.log(
  '=================================================\n',
)

const branch =
  capture(
    'git',
    [
      'branch',
      '--show-current',
    ],
  )

if (
  branch !==
  'ideas'
) {
  throw new Error(
    'Unexpected branch: ' +
    branch,
  )
}

console.log(
  'PASS - branch: ' +
  branch,
)

const status =
  capture(
    'git',
    [
      'status',
      '--porcelain',
    ],
  )

const unsafe =
  status
    .split(
      '\n',
    )
    .filter(
      Boolean,
    )
    .filter(
      (
        line,
      ) => {
        const file =
          line.slice(
            3,
          )

        return (
          file.includes(
            '.local-data',
          ) ||
          /(^|[\\/])\.env($|\.)/.test(
            file,
          )
        )
      },
    )

if (
  unsafe.length >
  0
) {
  throw new Error(
    'Private/local files visible to Git:\n' +
    unsafe.join(
      '\n',
    ),
  )
}

console.log(
  'PASS - private/local Git safety.',
)

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

const audits = [
  'scripts/route-audit.mjs',
  'scripts/link-audit.mjs',
  'scripts/final-audit.mjs',
  'scripts/encoding-audit.mjs',
  'scripts/d3-structure-audit.mjs',
  'scripts/d4-regression-audit.mjs',
  'scripts/d4-services-audit.mjs',
]

for (
  const audit
  of audits
) {
  const absolute =
    path.join(
      frontendRoot,
      audit,
    )

  if (
    !fs.existsSync(
      absolute,
    )
  ) {
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
  '\nLIVE LOCALHOST:',
)

await checkRoutes(
  [
    '/',
    '/start',
    '/pray',
    '/events',
    '/updates',
    '/join',
    '/support',
    '/about',
    '/about/history',
    '/contact',
    '/admin/login',
    '/admin/events',
    '/admin/announcements',
  ],
)

const missing =
  await fetch(
    'http://localhost:3000/isr-health-check-not-a-real-page',
  )

if (
  missing.status !==
  404
) {
  throw new Error(
    '404 regression failed. Received HTTP ' +
    missing.status,
  )
}

console.log(
  'PASS  404  missing route',
)

console.log(
  '\n=================================================',
)

console.log(
  'ISR LOCAL HEALTH CHECK PASSED',
)

console.log(
  '=================================================\n',
)
`

write(
  'scripts/isr-dev/health.mjs',
  health,
)

console.log(
  'PASS - reusable health command installed.',
)

/* =========================================================
 * CONTRACT CHECK BEFORE LEAVING PATCH PHASE
 * ========================================================= */

const finalUpdates =
  read(
    'components/AnnouncementsList.tsx',
  )

const finalStart =
  read(
    'app/start/page.tsx',
  )

const finalAdmin =
  read(
    'app/admin/(protected)/layout.tsx',
  )

assert(
  finalUpdates.includes(
    'Search updates',
  ),
  'Updates patch failed.',
)

assert(
  finalStart.includes(
    'StartUtilityPanel',
  ),
  'Start utility integration failed.',
)

assert(
  finalAdmin.includes(
    'AdminUtilityBar',
  ),
  'Admin utility integration failed.',
)

console.log(`
=================================================
D4.4 + D4.5 + D4.6 PATCH COMPLETE
=================================================

 - ISR Updates search + filters
 - urgent / important / pinned views
 - direct update anchors
 - copy/share update actions
 - Start Here quick-task hub
 - prayer campus shortcuts
 - official community shortcut
 - admin public preview bar
 - local sandbox indicator
 - accessibility/mobile utility styles
 - internal metadata leakage audit
 - support-routing safety audit
 - reusable health.mjs command
`)
