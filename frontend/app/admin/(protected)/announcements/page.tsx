'use client'

/* eslint-disable @next/next/no-img-element */

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import Link from 'next/link'
import {
  ExternalLinkIcon,
  PencilIcon,
  PinIcon,
  PlusIcon,
  SearchIcon,
  ArchiveIcon,
} from 'lucide-react'
import {
  Button,
} from '@/components/ui/button'
import {
  Input,
} from '@/components/ui/input'
import {
  AnnouncementModal,
} from '@/components/admin/AnnouncementModal'

import {
  getToken,
} from '@/lib/auth'
import {
  createAnnouncement,
  fetchAllAnnouncements,
  updateAnnouncement,
} from '@/lib/admin-api'
import {
  formatAnnouncementDate,
  isAnnouncementExpired,
  sortAnnouncements,
  ANNOUNCEMENT_SCOPES,
  type Announcement,
  type AnnouncementPriority,
  type AnnouncementScope,
} from '@/lib/announcements'
import type {
  PublicationStatus,
} from '@/lib/contentTypes'
import {
  IS_LOCAL_ADMIN_MODE,
} from '@/lib/localAdminMode'

type PriorityFilter =
  | 'all'
  | AnnouncementPriority

type PublicationFilter =
  | 'all'
  | PublicationStatus

type ScopeFilter =
  | 'all'
  | AnnouncementScope

const PRIORITY_CLASSES: Record<
  AnnouncementPriority,
  string
> = {
  normal:
    'bg-gray-100 text-gray-600',
  important:
    'bg-amber-50 text-amber-800',
  urgent:
    'bg-red-50 text-red-700',
}

const PUBLICATION_CLASSES: Record<
  PublicationStatus,
  string
> = {
  draft:
    'bg-gray-100 text-gray-700',
  review:
    'bg-amber-100 text-amber-800',
  published:
    'bg-emerald-100 text-emerald-800',
  archived:
    'bg-slate-200 text-slate-700',
}

function publicationOf(
  announcement: Announcement,
): PublicationStatus {
  return (
    announcement.publicationStatus ??
    'published'
  )
}

function scopeOf(
  announcement: Announcement,
): AnnouncementScope {
  return (
    announcement.scope ??
    'general'
  )
}

function titleCase(
  value: string,
): string {
  return (
    value.charAt(0).toUpperCase() +
    value.slice(1)
  )
}
export default function AdminAnnouncementsPage() {
  const [
    announcements,
    setAnnouncements,
  ] =
    useState<Announcement[]>(
      [],
    )

  const [
    loading,
    setLoading,
  ] =
    useState(true)

  const [
    loadError,
    setLoadError,
  ] =
    useState('')

  const [
    feedback,
    setFeedback,
  ] =
    useState('')

  const [
    search,
    setSearch,
  ] =
    useState('')

  const [
    priorityFilter,
    setPriorityFilter,
  ] =
    useState<PriorityFilter>(
      'all',
    )

  const [
    publicationFilter,
    setPublicationFilter,
  ] =
    useState<PublicationFilter>(
      'all',
    )

  const [
    scopeFilter,
    setScopeFilter,
  ] =
    useState<ScopeFilter>(
      'all',
    )

  const [
    visibilityFilter,
    setVisibilityFilter,
  ] =
    useState<
      'all' |
      'active' |
      'expired'
    >(
      'all',
    )

  const [
    modalOpen,
    setModalOpen,
  ] =
    useState(false)

  const [
    selectedAnnouncement,
    setSelectedAnnouncement,
  ] =
    useState<Announcement | null>(
      null,
    )


  const loadAnnouncements =
    useCallback(
      async () => {
        setLoading(true)
        setLoadError('')

        try {
          const token =
            getToken()

          if (!token) {
            throw new Error(
              'Your admin session has expired. Sign in again.',
            )
          }

          const data =
            await fetchAllAnnouncements(
              token,
            )

          setAnnouncements(
            sortAnnouncements(
              data,
            ),
          )
        }
        catch (
          caught
        ) {
          setLoadError(
            caught instanceof
              Error
              ? caught.message
              : 'Failed to load ISR Updates.',
          )
        }
        finally {
          setLoading(false)
        }
      },
      [],
    )

  useEffect(() => {
    void loadAnnouncements()
  }, [loadAnnouncements])

  const stats =
    useMemo(
      () => ({
        total:
          announcements.length,

        published:
          announcements.filter(
            (item) =>
              publicationOf(item) ===
              'published',
          ).length,

        review:
          announcements.filter(
            (item) =>
              publicationOf(item) ===
              'review',
          ).length,

        archived:
          announcements.filter(
            (item) =>
              publicationOf(item) ===
              'archived',
          ).length,

        urgent:
          announcements.filter(
            (item) =>
              item.priority ===
              'urgent',
          ).length,

        expired:
          announcements.filter(
            isAnnouncementExpired,
          ).length,
      }),
      [announcements],
    )

  const visibleAnnouncements =
    useMemo(
      () => {
        const normalized =
          search
            .trim()
            .toLowerCase()

        return announcements.filter(
          (item) => {
            const priority =
              item.priority ??
              'normal'

            const expired =
              isAnnouncementExpired(
                item,
              )

            const matchesPriority =
              priorityFilter ===
                'all' ||
              priority ===
                priorityFilter

            const publicationStatus =
              publicationOf(
                item,
              )

            const scope =
              scopeOf(
                item,
              )

            const matchesPublication =
              publicationFilter ===
                'all' ||
              publicationStatus ===
                publicationFilter

            const matchesScope =
              scopeFilter ===
                'all' ||
              scope ===
                scopeFilter

            const matchesVisibility =
              visibilityFilter ===
                'all' ||
              (
                visibilityFilter ===
                  'expired'
                  ? expired
                  : !expired
              )

            const searchable =
              [
                item.title,
                item.body,
                item.actionLabel,
                item.contentOwner,
                item.campus,
                item.audience,
                item.scope,
                item.publicationStatus,
              ]
                .filter(
                  Boolean,
                )
                .join(' ')
                .toLowerCase()

            return (
              matchesPriority &&
              matchesPublication &&
              matchesScope &&
              matchesVisibility &&
              (
                !normalized ||
                searchable.includes(
                  normalized,
                )
              )
            )
          },
        )
      },
      [
        announcements,
        search,
        priorityFilter,
        publicationFilter,
        scopeFilter,
        visibilityFilter,
      ],
    )

  function openCreate() {
    setSelectedAnnouncement(
      null,
    )

    setModalOpen(true)
    setFeedback('')
  }

  function openEdit(
    announcement:
      Announcement,
  ) {
    setSelectedAnnouncement(
      announcement,
    )

    setModalOpen(true)
    setFeedback('')
  }


  function closeModal() {
    setModalOpen(false)
    setSelectedAnnouncement(
      null,
    )
  }


  async function handleSubmit(
    formData:
      FormData,
  ) {
    const token =
      getToken()

    if (!token) {
      throw new Error(
        'Your admin session has expired. Sign in again.',
      )
    }

    if (
      selectedAnnouncement
    ) {
      const updated =
        await updateAnnouncement(
          token,
          selectedAnnouncement.id,
          formData,
        )

      setAnnouncements(
        (previous) =>
          sortAnnouncements(
            previous.map(
              (item) =>
                item.id ===
                updated.id
                  ? updated
                  : item,
            ),
          ),
      )

      setFeedback(
        `Saved "${updated.title}".`,
      )
    }
    else {
      const created =
        await createAnnouncement(
          token,
          formData,
        )

      setAnnouncements(
        (previous) =>
          sortAnnouncements([
            ...previous,
            created,
          ]),
      )

      setFeedback(
        `Created "${created.title}".`,
      )
    }
  }

  async function handleArchive(
    announcement: Announcement,
  ) {
    if (
      !window.confirm(
        `Archive "${announcement.title}"? It will disappear from the public ISR Updates feed but remain available in admin.`,
      )
    ) {
      return
    }

    const token =
      getToken()

    if (!token) {
      setFeedback(
        'Your admin session has expired.',
      )
      return
    }

    const formData =
      new FormData()

    formData.set(
      'title',
      announcement.title,
    )

    formData.set(
      'body',
      announcement.body,
    )

    formData.set(
      'pinned',
      announcement.pinned
        ? 'true'
        : 'false',
    )

    formData.set(
      'priority',
      announcement.priority ??
        'normal',
    )

    formData.set(
      'expiresAt',
      announcement.expiresAt ??
        '',
    )

    formData.set(
      'actionLabel',
      announcement.actionLabel ??
        '',
    )

    formData.set(
      'actionUrl',
      announcement.actionUrl ??
        '',
    )

    formData.set(
      'publicationStatus',
      'archived',
    )

    formData.set(
      'scope',
      announcement.scope ??
        'general',
    )

    formData.set(
      'campus',
      announcement.campus ??
        '',
    )

    formData.set(
      'audience',
      announcement.audience ??
        '',
    )

    formData.set(
      'contentOwner',
      announcement.contentOwner ??
        '',
    )

    formData.set(
      'reviewedAt',
      announcement.reviewedAt ??
        '',
    )

    try {
      const updated =
        await updateAnnouncement(
          token,
          announcement.id,
          formData,
        )

      setAnnouncements(
        (previous) =>
          sortAnnouncements(
            previous.map(
              (item) =>
                item.id ===
                updated.id
                  ? updated
                  : item,
            ),
          ),
      )

      setFeedback(
        `Archived "${updated.title}".`,
      )
    }
    catch (
      caught
    ) {
      setFeedback(
        caught instanceof Error
          ? caught.message
          : `Could not archive "${announcement.title}".`,
      )
    }
  }
  const hasFilters =
    Boolean(
      search.trim(),
    ) ||
    priorityFilter !==
      'all' ||
    publicationFilter !==
      'all' ||
    scopeFilter !==
      'all' ||
    visibilityFilter !==
      'all'

  return (
    <div>
      <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-turquoise">
              Content management
            </p>

            {IS_LOCAL_ADMIN_MODE && (
              <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-amber-900">
                Local sandbox
              </span>
            )}
          </div>

          <h1 className="mt-2 text-3xl font-bold text-isr-dark-red">
            ISR Updates
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-600">
            Manage important notices, temporary changes and
            operational information shown to students.
          </p>
        </div>

        <Button
          onClick={
            openCreate
          }
          className="gap-2 bg-isr-dark-red text-white hover:bg-isr-turquoise"
        >
          <PlusIcon className="h-4 w-4" />
          New ISR Update
        </Button>
      </header>

      <section className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <div className="isr-admin-stat">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
            Total
          </p>
          <p className="mt-2 text-2xl font-bold text-isr-dark-red">
            {stats.total}
          </p>
        </div>

        <div className="isr-admin-stat">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
            Published
          </p>
          <p className="mt-2 text-2xl font-bold text-emerald-700">
            {stats.published}
          </p>
        </div>

        <div className="isr-admin-stat">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
            Review
          </p>
          <p className="mt-2 text-2xl font-bold text-amber-700">
            {stats.review}
          </p>
        </div>

        <div className="isr-admin-stat">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
            Archived
          </p>
          <p className="mt-2 text-2xl font-bold text-slate-600">
            {stats.archived}
          </p>
        </div>

        <div className="isr-admin-stat">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
            Urgent
          </p>
          <p className="mt-2 text-2xl font-bold text-red-700">
            {stats.urgent}
          </p>
        </div>

        <div className="isr-admin-stat">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
            Expired
          </p>
          <p className="mt-2 text-2xl font-bold text-gray-600">
            {stats.expired}
          </p>
        </div>
      </section>
      {feedback && (
        <div
          role="status"
          className="mt-5 rounded-xl border border-isr-turquoise/25 bg-isr-turquoise/5 px-4 py-3 text-sm font-semibold text-isr-dark-red"
        >
          {feedback}
        </div>
      )}

      <section className="isr-admin-toolbar mt-6">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[1fr_160px_175px_160px_165px_auto]">
          <label className="relative">
            <span className="sr-only">
              Search ISR Updates
            </span>

            <SearchIcon className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-gray-400" />

            <Input
              value={search}
              onChange={(
                event,
              ) =>
                setSearch(
                  event.target.value,
                )
              }
              className="pl-9"
              placeholder="Search updates…"
            />
          </label>

          <select
            value={priorityFilter}
            onChange={(
              event,
            ) =>
              setPriorityFilter(
                event.target
                  .value as PriorityFilter,
              )
            }
            aria-label="Filter priority"
            className="flex h-9 rounded-md border border-input bg-white px-3 text-sm"
          >
            <option value="all">
              All priorities
            </option>
            <option value="normal">
              Normal
            </option>
            <option value="important">
              Important
            </option>
            <option value="urgent">
              Urgent
            </option>
          </select>

          <select
            value={publicationFilter}
            onChange={(
              event,
            ) =>
              setPublicationFilter(
                event.target
                  .value as PublicationFilter,
              )
            }
            aria-label="Filter publication state"
            className="flex h-9 rounded-md border border-input bg-white px-3 text-sm"
          >
            <option value="all">
              All publication states
            </option>
            <option value="draft">
              Draft
            </option>
            <option value="review">
              Review
            </option>
            <option value="published">
              Published
            </option>
            <option value="archived">
              Archived
            </option>
          </select>

          <select
            value={scopeFilter}
            onChange={(
              event,
            ) =>
              setScopeFilter(
                event.target
                  .value as ScopeFilter,
              )
            }
            aria-label="Filter update type"
            className="flex h-9 rounded-md border border-input bg-white px-3 text-sm"
          >
            <option value="all">
              All types
            </option>

            {ANNOUNCEMENT_SCOPES.map(
              (value) => (
                <option
                  key={value}
                  value={value}
                >
                  {titleCase(value)}
                </option>
              ),
            )}
          </select>

          <select
            value={visibilityFilter}
            onChange={(
              event,
            ) =>
              setVisibilityFilter(
                event.target
                  .value as
                  | 'all'
                  | 'active'
                  | 'expired',
              )
            }
            aria-label="Filter expiry"
            className="flex h-9 rounded-md border border-input bg-white px-3 text-sm"
          >
            <option value="all">
              Active & expired
            </option>
            <option value="active">
              Active only
            </option>
            <option value="expired">
              Expired only
            </option>
          </select>

          {hasFilters && (
            <Button
              variant="outline"
              onClick={() => {
                setSearch('')
                setPriorityFilter(
                  'all',
                )
                setPublicationFilter(
                  'all',
                )
                setScopeFilter(
                  'all',
                )
                setVisibilityFilter(
                  'all',
                )
              }}
            >
              Clear
            </Button>
          )}
        </div>

        {!loading &&
          !loadError && (
            <p className="mt-3 text-xs text-gray-500">
              Showing {visibleAnnouncements.length} of {announcements.length} updates.
            </p>
          )}
      </section>
      {loading && (
        <div className="mt-6 space-y-4">
          {[1, 2, 3].map(
            (item) => (
              <div
                key={item}
                className="h-40 animate-pulse rounded-2xl bg-white"
              />
            ),
          )}
        </div>
      )}

      {!loading &&
        loadError && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-6">
            <h2 className="font-bold text-red-900">
              ISR Updates could not be loaded
            </h2>

            <p className="mt-2 text-sm text-red-800">
              {loadError}
            </p>

            <Button
              variant="outline"
              onClick={() =>
                void loadAnnouncements()
              }
              className="mt-4"
            >
              Try again
            </Button>
          </div>
        )}

      {!loading &&
        !loadError &&
        visibleAnnouncements.length ===
          0 && (
          <div className="mt-6 rounded-2xl border border-isr-light-blue/25 bg-white p-8 text-center">
            <h2 className="text-xl font-bold text-isr-dark-red">
              {hasFilters
                ? 'No updates match these filters'
                : 'No ISR Updates yet'}
            </h2>
          </div>
        )}

      {!loading &&
        !loadError &&
        visibleAnnouncements.length >
          0 && (
          <div className="mt-6 space-y-4">
            {visibleAnnouncements.map(
              (
                announcement,
              ) => {
                const priority =
                  announcement.priority ??
                  'normal'

                const expired =
                  isAnnouncementExpired(
                    announcement,
                  )

                const publicationStatus =
                  publicationOf(
                    announcement,
                  )

                const scope =
                  scopeOf(
                    announcement,
                  )

                return (
                  <article
                    key={
                      announcement.id
                    }
                    className={`isr-admin-item overflow-hidden ${
                      expired
                        ? 'opacity-70'
                        : ''
                    }`}
                  >
                    <div
                      className={
                        announcement.imageUrl
                          ? 'grid md:grid-cols-[150px_1fr]'
                          : ''
                      }
                    >
                      {announcement.imageUrl && (
                        <div className="isr-admin-preview relative min-h-36 rounded-none border-0">
                          <img
                            src={
                              announcement.imageUrl
                            }
                            alt=""
                            className="h-full w-full object-contain p-2"
                          />
                        </div>
                      )}

                      <div className="p-5">
                        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span
                                className={`isr-admin-status ${PRIORITY_CLASSES[priority]}`}
                              >
                                {titleCase(
                                  priority,
                                )}
                              </span>

                              <span
                                className={`isr-admin-status ${PUBLICATION_CLASSES[publicationStatus]}`}
                              >
                                {titleCase(
                                  publicationStatus,
                                )}
                              </span>

                              <span className="isr-admin-status bg-isr-turquoise/10 text-isr-turquoise">
                                {titleCase(
                                  scope,
                                )}
                              </span>

                              {announcement.campus && (
                                <span className="isr-admin-status bg-isr-light-blue/15 text-isr-dark-red">
                                  {titleCase(
                                    announcement.campus,
                                  )}
                                </span>
                              )}

                              {announcement.pinned && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-isr-turquoise/10 px-2.5 py-1 text-xs font-bold text-isr-turquoise">
                                  <PinIcon className="h-3 w-3" />
                                  Pinned
                                </span>
                              )}

                              {expired && (
                                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-bold text-gray-600">
                                  Expired
                                </span>
                              )}
                            </div>

                            <h2 className="mt-3 text-xl font-bold leading-snug text-isr-dark-red">
                              {announcement.title}
                            </h2>

                            <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                              {formatAnnouncementDate(
                                announcement.createdAt,
                              )}
                            </p>

                            <p className="mt-3 line-clamp-3 max-w-3xl text-sm leading-relaxed text-gray-700">
                              {announcement.body}
                            </p>

                            {(announcement.actionLabel ||
                              announcement.expiresAt ||
                              announcement.contentOwner ||
                              announcement.audience ||
                              announcement.reviewedAt) && (
                              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-gray-500">
                                {announcement.actionLabel && (
                                  <span>
                                    Action: {announcement.actionLabel}
                                  </span>
                                )}

                                {announcement.expiresAt && (
                                  <span>
                                    Expires: {formatAnnouncementDate(
                                      announcement.expiresAt,
                                    )}
                                  </span>
                                )}

                                {announcement.audience && (
                                  <span>
                                    Audience: {announcement.audience}
                                  </span>
                                )}

                                {announcement.contentOwner && (
                                  <span>
                                    Owner: {announcement.contentOwner}
                                  </span>
                                )}

                                {announcement.reviewedAt && (
                                  <span>
                                    Reviewed: {formatAnnouncementDate(
                                      announcement.reviewedAt,
                                    )}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          <div className="isr-admin-mobile-actions flex shrink-0 flex-col gap-2 sm:flex-row">
                            {publicationStatus ===
                              'published' &&
                              !expired && (
                              <Link
                                href="/updates"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-9 items-center justify-center gap-2 rounded-md border px-3 text-sm font-semibold text-isr-dark-red hover:bg-isr-cream"
                              >
                                <ExternalLinkIcon className="h-4 w-4" />
                                Preview
                              </Link>
                            )}

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                openEdit(
                                  announcement,
                                )
                              }
                              className="gap-2"
                            >
                              <PencilIcon className="h-4 w-4" />
                              Edit
                            </Button>

                            {publicationStatus !==
                              'archived' && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  void handleArchive(
                                    announcement,
                                  )
                                }
                                className="gap-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                              >
                                <ArchiveIcon className="h-4 w-4" />
                                Archive
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                )
              },
            )}
          </div>
        )}

      <AnnouncementModal
        open={modalOpen}
        announcement={
          selectedAnnouncement
        }
        onClose={
          closeModal
        }
        onSubmit={
          handleSubmit
        }
      />


    </div>
  )
}
