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
  Trash2Icon,
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
  ConfirmDeleteDialog,
} from '@/components/admin/ConfirmDeleteDialog'
import {
  getToken,
} from '@/lib/auth'
import {
  createAnnouncement,
  deleteAnnouncement,
  fetchAllAnnouncements,
  updateAnnouncement,
} from '@/lib/admin-api'
import {
  formatAnnouncementDate,
  isAnnouncementExpired,
  sortAnnouncements,
  type Announcement,
  type AnnouncementPriority,
} from '@/lib/announcements'
import {
  IS_LOCAL_ADMIN_MODE,
} from '@/lib/localAdminMode'

type PriorityFilter =
  | 'all'
  | AnnouncementPriority

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

  const [
    deleteOpen,
    setDeleteOpen,
  ] =
    useState(false)

  const [
    announcementToDelete,
    setAnnouncementToDelete,
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

        pinned:
          announcements.filter(
            (item) =>
              item.pinned,
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
              ]
                .filter(
                  Boolean,
                )
                .join(' ')
                .toLowerCase()

            return (
              matchesPriority &&
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

  function openDelete(
    announcement:
      Announcement,
  ) {
    setAnnouncementToDelete(
      announcement,
    )

    setDeleteOpen(true)
    setFeedback('')
  }

  function closeModal() {
    setModalOpen(false)
    setSelectedAnnouncement(
      null,
    )
  }

  function closeDelete() {
    setDeleteOpen(false)
    setAnnouncementToDelete(
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

  async function handleDelete() {
    if (
      !announcementToDelete
    ) {
      return
    }

    const token =
      getToken()

    if (!token) {
      setFeedback(
        'Your admin session has expired.',
      )

      closeDelete()

      return
    }

    const title =
      announcementToDelete
        .title

    try {
      await deleteAnnouncement(
        token,
        announcementToDelete.id,
      )

      setAnnouncements(
        (previous) =>
          previous.filter(
            (item) =>
              item.id !==
              announcementToDelete.id,
          ),
      )

      setFeedback(
        `Deleted "${title}".`,
      )
    }
    catch (
      caught
    ) {
      setFeedback(
        caught instanceof
          Error
          ? caught.message
          : `Could not delete "${title}".`,
      )
    }
    finally {
      closeDelete()
    }
  }

  const hasFilters =
    Boolean(
      search.trim(),
    ) ||
    priorityFilter !==
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

      <section className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
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
            Pinned
          </p>

          <p className="mt-2 text-2xl font-bold text-isr-turquoise">
            {stats.pinned}
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
        <div className="grid gap-3 lg:grid-cols-[1fr_190px_190px_auto]">
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
            value={
              priorityFilter
            }
            onChange={(
              event,
            ) =>
              setPriorityFilter(
                event.target
                  .value as PriorityFilter,
              )
            }
            aria-label="Filter ISR Update priority"
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
            value={
              visibilityFilter
            }
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
            aria-label="Filter ISR Update visibility"
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
                                {priority}
                              </span>

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
                              announcement.contentOwner) && (
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

                                {announcement.contentOwner && (
                                  <span>
                                    Owner: {announcement.contentOwner}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          <div className="isr-admin-mobile-actions flex shrink-0 flex-col gap-2 sm:flex-row">
                            <Link
                              href="/updates"
                              target="_blank"
                              className="inline-flex h-9 items-center justify-center gap-2 rounded-md border px-3 text-sm font-semibold text-isr-dark-red hover:bg-isr-cream" rel="noopener noreferrer">
                              <ExternalLinkIcon className="h-4 w-4" />
                              Preview
                            </Link>

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

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                openDelete(
                                  announcement,
                                )
                              }
                              className="gap-2 border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
                            >
                              <Trash2Icon className="h-4 w-4" />
                              Delete
                            </Button>
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

      <ConfirmDeleteDialog
        open={
          deleteOpen
        }
        title="Permanently delete ISR Update?"
        description={`This will delete "${announcementToDelete?.title ?? ''}". This cannot be undone.`}
        confirmationText={
          announcementToDelete?.title
        }
        onConfirm={
          handleDelete
        }
        onCancel={
          closeDelete
        }
      />
    </div>
  )
}
