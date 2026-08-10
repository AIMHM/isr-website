'use client'

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import Link from 'next/link'
import {
  PencilIcon,
  PlusIcon,
  Trash2Icon,
} from 'lucide-react'
import {
  Button,
} from '@/components/ui/button'
import {
  AnnouncementModal,
} from '@/components/admin/AnnouncementModal'
import {
  ConfirmDeleteDialog,
} from '@/components/admin/ConfirmDeleteDialog'
import {
  AdminFeedback,
} from '@/components/admin/AdminFeedback'
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

const PRIORITY_CLASSES: Record<
  AnnouncementPriority,
  string
> = {
  normal:
    'bg-isr-turquoise/10 text-isr-turquoise',
  important:
    'bg-isr-yellow/70 text-isr-dark-red',
  urgent:
    'bg-red-100 text-red-800',
}

function formatExpiry(
  value: string,
): string {
  const date =
    new Date(value)

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return 'Invalid expiry'
  }

  return new Intl.DateTimeFormat(
    'en-AU',
    {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    },
  ).format(date)
}

export default function AdminUpdatesPage() {
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
    useState<
      | 'all'
      | AnnouncementPriority
      | 'expired'
    >('all')

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

  const loadUpdates =
    useCallback(
      async () => {
        setLoading(true)
        setLoadError('')

        try {
          const data =
            await fetchAllAnnouncements()

          setUpdates(
            sortAnnouncements(
              data,
            ),
          )
        } catch (err) {
          setLoadError(
            err instanceof Error
              ? err.message
              : 'Failed to load ISR Updates.',
          )
        } finally {
          setLoading(false)
        }
      },
      [],
    )

  useEffect(() => {
    void loadUpdates()
  }, [loadUpdates])

  const filteredUpdates =
    useMemo(
      () => {
        const query =
          search
            .trim()
            .toLowerCase()

        return updates.filter(
          (update) => {
            const priority =
              update.priority ??
              'normal'

            const expired =
              isAnnouncementExpired(
                update,
              )

            const matchesPriority =
              priorityFilter ===
                'all' ||
              (
                priorityFilter ===
                  'expired'
                  ? expired
                  : priority ===
                    priorityFilter
              )

            const matchesSearch =
              !query ||
              `${update.title} ${update.body}`
                .toLowerCase()
                .includes(query)

            return (
              matchesPriority &&
              matchesSearch
            )
          },
        )
      },
      [
        updates,
        search,
        priorityFilter,
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
    update: Announcement,
  ) {
    setSelectedAnnouncement(
      update,
    )

    setModalOpen(true)
    setFeedback('')
  }

  function openDelete(
    update: Announcement,
  ) {
    setAnnouncementToDelete(
      update,
    )

    setDeleteOpen(true)
    setFeedback('')
  }

  function closeDelete() {
    setDeleteOpen(false)

    setAnnouncementToDelete(
      null,
    )
  }

  async function handleSubmit(
    formData: FormData,
  ) {
    const token =
      getToken()

    if (!token) {
      throw new Error(
        'Admin session is unavailable. Please sign in again.',
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

      setUpdates(
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
        `"${updated.title}" was updated.`,
      )
    } else {
      const created =
        await createAnnouncement(
          token,
          formData,
        )

      setUpdates(
        (previous) =>
          sortAnnouncements([
            created,
            ...previous,
          ]),
      )

      setFeedback(
        `"${created.title}" was published.`,
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
      throw new Error(
        'Admin session is unavailable. Please sign in again.',
      )
    }

    const deleting =
      announcementToDelete

    await deleteAnnouncement(
      token,
      deleting.id,
    )

    setUpdates(
      (previous) =>
        previous.filter(
          (item) =>
            item.id !==
            deleting.id,
        ),
    )

    closeDelete()

    setFeedback(
      `"${deleting.title}" was deleted.`,
    )
  }

  return (
    <div>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-isr-turquoise">
            Website content
          </p>

          <h1 className="mt-2 text-3xl font-bold text-isr-dark-red">
            ISR Updates
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-600">
            Manage important notices, prayer changes, event changes and other time-sensitive student information.
          </p>
        </div>

        <Button
          onClick={openCreate}
          className="bg-isr-turquoise text-white hover:bg-isr-turquoise/90"
        >
          <PlusIcon className="size-4" />
          New ISR Update
        </Button>
      </div>

      {feedback && (
        <div className="mt-6">
          <AdminFeedback
            message={feedback}
            type="success"
            onDismiss={() =>
              setFeedback('')
            }
          />
        </div>
      )}

      <div className="mt-6 grid gap-3 rounded-2xl border bg-white p-4 sm:grid-cols-[1fr_auto]">
        <label
          className="sr-only"
          htmlFor="admin-update-search"
        >
          Search ISR Updates
        </label>

        <input
          id="admin-update-search"
          type="search"
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value,
            )
          }
          placeholder="Search updates..."
          className="rounded-xl border border-isr-light-blue/40 px-4 py-2.5 text-sm outline-none focus:border-isr-turquoise focus:ring-2 focus:ring-isr-turquoise/15"
        />

        <label
          className="sr-only"
          htmlFor="admin-update-priority"
        >
          Filter ISR Updates
        </label>

        <select
          id="admin-update-priority"
          value={priorityFilter}
          onChange={(e) =>
            setPriorityFilter(
              e.target.value as
                | 'all'
                | AnnouncementPriority
                | 'expired',
            )
          }
          className="rounded-xl border border-isr-light-blue/40 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 outline-none focus:border-isr-turquoise"
        >
          <option value="all">
            All updates
          </option>

          <option value="urgent">
            Urgent
          </option>

          <option value="important">
            Important
          </option>

          <option value="normal">
            Normal
          </option>

          <option value="expired">
            Expired
          </option>
        </select>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-gray-500">
        <p>
          {
            filteredUpdates.length
          } {
            filteredUpdates.length ===
            1
              ? 'update'
              : 'updates'
          }
        </p>

        {(search ||
          priorityFilter !==
            'all') && (
          <button
            type="button"
            onClick={() => {
              setSearch('')
              setPriorityFilter(
                'all',
              )
            }}
            className="font-semibold text-isr-turquoise"
          >
            Clear filters
          </button>
        )}
      </div>

      {loading && (
        <div className="mt-8 grid gap-4">
          {[1, 2, 3].map(
            (item) => (
              <div
                key={
                  item
                }
                className="h-40 animate-pulse rounded-2xl bg-white"
              />
            ),
          )}
        </div>
      )}

      {!loading &&
        loadError && (
          <div className="mt-8">
            <AdminFeedback
              message={
                loadError
              }
              type="error"
            />

            <Button
              variant="outline"
              onClick={() =>
                void loadUpdates()
              }
              className="mt-4"
            >
              Try again
            </Button>
          </div>
        )}

      {!loading &&
        !loadError &&
        filteredUpdates.length ===
          0 && (
          <div className="mt-8 rounded-2xl border bg-white p-10 text-center">
            <h2 className="text-xl font-bold text-isr-dark-red">
              No matching ISR Updates
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              Publish a new update or change the current filters.
            </p>
          </div>
        )}

      {!loading &&
        !loadError &&
        filteredUpdates.length >
          0 && (
          <div className="mt-8 space-y-4">
            {filteredUpdates.map(
              (update) => {
                const priority =
                  update.priority ??
                  'normal'

                const expired =
                  isAnnouncementExpired(
                    update,
                  )

                return (
                  <article
                    key={
                      update.id
                    }
                    className={`rounded-2xl border bg-white p-5 shadow-sm sm:p-6 ${
                      expired
                        ? 'opacity-70'
                        : ''
                    }`}
                  >
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold ${
                              PRIORITY_CLASSES[
                                priority
                              ]
                            }`}
                          >
                            {
                              priority ===
                              'normal'
                                ? 'Normal'
                                : priority ===
                                    'important'
                                  ? 'Important'
                                  : 'Urgent'
                            }
                          </span>

                          {update.pinned && (
                            <span className="rounded-full bg-isr-dark-red px-3 py-1 text-xs font-bold text-white">
                              Pinned
                            </span>
                          )}

                          {expired && (
                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-700">
                              Expired
                            </span>
                          )}
                        </div>

                        <h2 className="mt-4 text-xl font-bold text-isr-dark-red">
                          {
                            update.title
                          }
                        </h2>

                        <p className="mt-2 text-sm leading-relaxed text-gray-700">
                          {
                            update.body.length >
                            220
                              ? `${update.body.slice(
                                  0,
                                  220,
                                )}…`
                              : update.body
                          }
                        </p>

                        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-gray-500">
                          <span>
                            Posted {
                              formatAnnouncementDate(
                                update.createdAt,
                              )
                            }
                          </span>

                          {update.expiresAt && (
                            <span>
                              Expires {
                                formatExpiry(
                                  update.expiresAt,
                                )
                              }
                            </span>
                          )}

                          {update.actionLabel && (
                            <span>
                              Action: {
                                update.actionLabel
                              }
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex shrink-0 flex-wrap gap-2 lg:flex-col">
                        <Link
                          href="/updates"
                          target="_blank"
                          className="rounded-lg border px-3 py-2 text-xs font-bold text-gray-700 transition hover:bg-gray-50"
                        >
                          Public view ↗
                        </Link>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            openEdit(
                              update,
                            )
                          }
                        >
                          <PencilIcon className="size-4" />
                          Edit
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            openDelete(
                              update,
                            )
                          }
                          className="text-red-700 hover:bg-red-50 hover:text-red-800"
                        >
                          <Trash2Icon className="size-4" />
                          Delete
                        </Button>
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
        onClose={() =>
          setModalOpen(false)
        }
        onSubmit={handleSubmit}
      />

      <ConfirmDeleteDialog
        open={deleteOpen}
        title="Delete ISR Update?"
        description={
          announcementToDelete
            ? `You are about to permanently delete "${announcementToDelete.title}". This cannot be undone.`
            : 'This ISR Update will be permanently deleted.'
        }
        onConfirm={handleDelete}
        onCancel={closeDelete}
      />
    </div>
  )
}
