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
  EventModal,
} from '@/components/admin/EventModal'
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
  createEvent,
  deleteEvent,
  fetchAllEvents,
  updateEvent,
} from '@/lib/admin-api'
import {
  EVENT_STATUS_CLASSES,
  EVENT_STATUS_LABELS,
  eventStatus,
  formatEventDate,
} from '@/lib/eventPresentation'
import type {
  Event,
  EventStatus,
} from '@/lib/events'

function sortEvents(
  list: Event[],
): Event[] {
  return [...list].sort(
    (a, b) =>
      new Date(
        b.date,
      ).getTime() -
      new Date(
        a.date,
      ).getTime(),
  )
}

const FILTERS: {
  value:
    | 'all'
    | EventStatus
  label: string
}[] = [
  {
    value: 'all',
    label: 'All',
  },
  {
    value: 'scheduled',
    label: 'Scheduled',
  },
  {
    value: 'sold-out',
    label: 'Sold out',
  },
  {
    value: 'postponed',
    label: 'Postponed',
  },
  {
    value: 'cancelled',
    label: 'Cancelled',
  },
  {
    value: 'completed',
    label: 'Completed',
  },
]

export default function AdminEventsPage() {
  const [
    events,
    setEvents,
  ] =
    useState<Event[]>([])

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
    statusFilter,
    setStatusFilter,
  ] =
    useState<
      | 'all'
      | EventStatus
    >('all')

  const [
    modalOpen,
    setModalOpen,
  ] =
    useState(false)

  const [
    selectedEvent,
    setSelectedEvent,
  ] =
    useState<Event | null>(
      null,
    )

  const [
    deleteOpen,
    setDeleteOpen,
  ] =
    useState(false)

  const [
    eventToDelete,
    setEventToDelete,
  ] =
    useState<Event | null>(
      null,
    )

  const loadEvents =
    useCallback(
      async () => {
        setLoading(true)
        setLoadError('')

        try {
          const data =
            await fetchAllEvents()

          setEvents(
            sortEvents(
              data,
            ),
          )
        } catch (err) {
          setLoadError(
            err instanceof Error
              ? err.message
              : 'Failed to load events.',
          )
        } finally {
          setLoading(false)
        }
      },
      [],
    )

  useEffect(() => {
    void loadEvents()
  }, [loadEvents])

  const filteredEvents =
    useMemo(
      () => {
        const query =
          search
            .trim()
            .toLowerCase()

        return events.filter(
          (event) => {
            const status =
              eventStatus(
                event,
              )

            const matchesStatus =
              statusFilter ===
                'all' ||
              status ===
                statusFilter

            const text =
              [
                event.name,
                event.venue,
                event.campus,
                event.audience,
                event.description,
              ]
                .filter(
                  Boolean,
                )
                .join(' ')
                .toLowerCase()

            const matchesSearch =
              !query ||
              text.includes(
                query,
              )

            return (
              matchesStatus &&
              matchesSearch
            )
          },
        )
      },
      [
        events,
        search,
        statusFilter,
      ],
    )

  function openCreate() {
    setSelectedEvent(null)
    setModalOpen(true)
    setFeedback('')
  }

  function openEdit(
    event: Event,
  ) {
    setSelectedEvent(
      event,
    )

    setModalOpen(true)
    setFeedback('')
  }

  function openDelete(
    event: Event,
  ) {
    setEventToDelete(
      event,
    )

    setDeleteOpen(true)
    setFeedback('')
  }

  function closeDelete() {
    setDeleteOpen(false)
    setEventToDelete(
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

    if (selectedEvent) {
      const updated =
        await updateEvent(
          token,
          selectedEvent.id,
          formData,
        )

      setEvents(
        (previous) =>
          sortEvents(
            previous.map(
              (event) =>
                event.id ===
                updated.id
                  ? updated
                  : event,
            ),
          ),
      )

      setFeedback(
        `"${updated.name}" was updated.`,
      )
    } else {
      const created =
        await createEvent(
          token,
          formData,
        )

      setEvents(
        (previous) =>
          sortEvents([
            ...previous,
            created,
          ]),
      )

      setFeedback(
        `"${created.name}" was created.`,
      )
    }
  }

  async function handleDelete() {
    if (!eventToDelete) {
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
      eventToDelete

    await deleteEvent(
      token,
      deleting.id,
    )

    setEvents(
      (previous) =>
        previous.filter(
          (event) =>
            event.id !==
            deleting.id,
        ),
    )

    closeDelete()

    setFeedback(
      `"${deleting.name}" was deleted.`,
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
            Events
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-600">
            Create and maintain the public event listings shown on the ISR website.
          </p>
        </div>

        <Button
          onClick={openCreate}
          className="bg-isr-turquoise text-white hover:bg-isr-turquoise/90"
        >
          <PlusIcon className="size-4" />
          New event
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
        <label className="sr-only" htmlFor="admin-event-search">
          Search events
        </label>

        <input
          id="admin-event-search"
          type="search"
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value,
            )
          }
          placeholder="Search event name, campus, venue..."
          className="rounded-xl border border-isr-light-blue/40 px-4 py-2.5 text-sm outline-none focus:border-isr-turquoise focus:ring-2 focus:ring-isr-turquoise/15"
        />

        <label className="sr-only" htmlFor="admin-event-status">
          Filter event status
        </label>

        <select
          id="admin-event-status"
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value as
                | 'all'
                | EventStatus,
            )
          }
          className="rounded-xl border border-isr-light-blue/40 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 outline-none focus:border-isr-turquoise"
        >
          {FILTERS.map(
            (filter) => (
              <option
                key={
                  filter.value
                }
                value={
                  filter.value
                }
              >
                {
                  filter.label
                }
              </option>
            ),
          )}
        </select>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-gray-500">
        <p>
          {
            filteredEvents.length
          } {
            filteredEvents.length ===
            1
              ? 'event'
              : 'events'
          }
        </p>

        {(search ||
          statusFilter !==
            'all') && (
          <button
            type="button"
            onClick={() => {
              setSearch('')
              setStatusFilter(
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
                void loadEvents()
              }
              className="mt-4"
            >
              Try again
            </Button>
          </div>
        )}

      {!loading &&
        !loadError &&
        filteredEvents.length ===
          0 && (
          <div className="mt-8 rounded-2xl border bg-white p-10 text-center">
            <h2 className="text-xl font-bold text-isr-dark-red">
              No matching events
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              Create an event or change the current filters.
            </p>
          </div>
        )}

      {!loading &&
        !loadError &&
        filteredEvents.length >
          0 && (
          <div className="mt-8 space-y-4">
            {filteredEvents.map(
              (event) => {
                const status =
                  eventStatus(
                    event,
                  )

                return (
                  <article
                    key={
                      event.id
                    }
                    className="overflow-hidden rounded-2xl border bg-white shadow-sm"
                  >
                    <div className="grid sm:grid-cols-[130px_1fr] lg:grid-cols-[130px_1fr_auto]">
                      <div className="flex min-h-32 items-center justify-center bg-isr-cream">
                        {event.imageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={
                              event.imageUrl
                            }
                            alt=""
                            className="h-full max-h-40 w-full object-cover"
                          />
                        ) : (
                          <span className="px-4 text-center text-xs font-bold text-isr-dark-red/40">
                            No poster
                          </span>
                        )}
                      </div>

                      <div className="p-5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold ${EVENT_STATUS_CLASSES[status]}`}
                          >
                            {
                              EVENT_STATUS_LABELS[
                                status
                              ]
                            }
                          </span>

                          {event.campus && (
                            <span className="rounded-full bg-isr-cream px-3 py-1 text-xs font-semibold text-isr-dark-red">
                              {
                                event.campus
                              }
                            </span>
                          )}
                        </div>

                        <h2 className="mt-3 text-xl font-bold text-isr-dark-red">
                          {
                            event.name
                          }
                        </h2>

                        <p className="mt-2 text-sm font-semibold text-isr-turquoise">
                          {
                            formatEventDate(
                              event.date,
                            )
                          }
                        </p>

                        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-600">
                          {event.venue && (
                            <span>
                              {
                                event.venue
                              }
                            </span>
                          )}

                          {event.audience && (
                            <span>
                              {
                                event.audience
                              }
                            </span>
                          )}

                          {event.price && (
                            <span className="font-semibold">
                              {
                                event.price
                              }
                            </span>
                          )}
                        </div>

                        {event.statusNote && (
                          <p className="mt-3 rounded-lg bg-isr-yellow/35 px-3 py-2 text-xs font-medium text-isr-dark-red">
                            {
                              event.statusNote
                            }
                          </p>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-2 border-t p-4 sm:col-span-2 lg:col-span-1 lg:flex-col lg:justify-center lg:border-l lg:border-t-0">
                        <Link
                          href={`/events/${event.id}`}
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
                              event,
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
                              event,
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

      <EventModal
        open={modalOpen}
        event={selectedEvent}
        onClose={() =>
          setModalOpen(false)
        }
        onSubmit={handleSubmit}
      />

      <ConfirmDeleteDialog
        open={deleteOpen}
        title="Delete event?"
        description={
          eventToDelete
            ? `You are about to permanently delete "${eventToDelete.name}". This removes it from the website and cannot be undone.`
            : 'This event will be permanently deleted.'
        }
        onConfirm={handleDelete}
        onCancel={closeDelete}
      />
    </div>
  )
}
