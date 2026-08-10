'use client'

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
