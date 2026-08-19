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
  EventModal,
} from '@/components/admin/EventModal'
import {
  getToken,
} from '@/lib/auth'
import {
  createEvent,
  fetchAllEvents,
  updateEvent,
} from '@/lib/admin-api'
import {
  formatEventDate,
  getEventStatus,
  getEventStatusLabel,
  type Event,
  type EventStatus,
} from '@/lib/events'
import {
  IS_LOCAL_ADMIN_MODE,
} from '@/lib/localAdminMode'

const STATUS_CLASSES: Record<
  EventStatus,
  string
> = {
  scheduled:
    'bg-emerald-50 text-emerald-700',
  'sold-out':
    'bg-amber-50 text-amber-800',
  postponed:
    'bg-orange-50 text-orange-800',
  cancelled:
    'bg-red-50 text-red-700',
  completed:
    'bg-gray-100 text-gray-600',
}

const PUBLICATION_CLASSES = {
  draft:
    'bg-gray-100 text-gray-700',
  review:
    'bg-amber-100 text-amber-800',
  published:
    'bg-emerald-100 text-emerald-800',
  archived:
    'bg-slate-200 text-slate-700',
} as const

function getPublicationStatus(
  event: Event,
) {
  return (
    event.publicationStatus ??
    'published'
  )
}

function getPublicationLabel(
  event: Event,
): string {
  const status =
    getPublicationStatus(
      event,
    )

  return (
    status.charAt(0).toUpperCase() +
    status.slice(1)
  )
}
type StatusFilter =
  | 'all'
  | EventStatus

function sortEvents(
  items: Event[],
): Event[] {
  return [...items].sort(
    (a, b) =>
      new Date(
        b.date,
      ).getTime() -
      new Date(
        a.date,
      ).getTime(),
  )
}

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
    useState<StatusFilter>(
      'all',
    )

  const [
    campusFilter,
    setCampusFilter,
  ] =
    useState('all')

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

  const loadEvents =
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
            await fetchAllEvents(
              token,
            )

          setEvents(
            sortEvents(
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
              : 'Failed to load events.',
          )
        }
        finally {
          setLoading(false)
        }
      },
      [],
    )

  useEffect(() => {
    void loadEvents()
  }, [loadEvents])

  const campuses =
    useMemo(
      () =>
        Array.from(
          new Set(
            events
              .map(
                (event) =>
                  event.campus,
              )
              .filter(
                (
                  value,
                ): value is string =>
                  Boolean(
                    value,
                  ),
              ),
          ),
        ).sort(),
      [events],
    )

  const visibleEvents =
    useMemo(
      () => {
        const normalized =
          search
            .trim()
            .toLowerCase()

        return events.filter(
          (event) => {
            const effectiveStatus =
              getEventStatus(
                event,
              )

            const matchesStatus =
              statusFilter ===
                'all' ||
              effectiveStatus ===
                statusFilter

            const matchesCampus =
              campusFilter ===
                'all' ||
              event.campus ===
                campusFilter

            const searchable =
              [
                event.name,
                event.description,
                event.venue,
                event.campus,
                event.audience,
              ]
                .filter(
                  Boolean,
                )
                .join(' ')
                .toLowerCase()

            const matchesSearch =
              !normalized ||
              searchable.includes(
                normalized,
              )

            return (
              matchesStatus &&
              matchesCampus &&
              matchesSearch
            )
          },
        )
      },
      [
        events,
        search,
        statusFilter,
        campusFilter,
      ],
    )

  const stats =
    useMemo(
      () => {
        const statuses =
          events.map(
            (event) =>
              getEventStatus(
                event,
              ),
          )

        return {
          total:
            events.length,

          upcoming:
            statuses.filter(
              (status) =>
                status ===
                  'scheduled' ||
                status ===
                  'sold-out',
            ).length,

          attention:
            statuses.filter(
              (status) =>
                status ===
                  'postponed' ||
                status ===
                  'cancelled',
            ).length,

          completed:
            statuses.filter(
              (status) =>
                status ===
                'completed',
            ).length,
        }
      },
      [events],
    )

  function openCreate() {
    setSelectedEvent(null)
    setModalOpen(true)
    setFeedback('')
  }

  function openEdit(
    event: Event,
  ) {
    setSelectedEvent(event)
    setModalOpen(true)
    setFeedback('')
  }

  function closeModal() {
    setModalOpen(false)
    setSelectedEvent(null)
  }

  async function handleSubmit(
    formData: FormData,
  ) {
    const token =
      getToken()

    if (!token) {
      throw new Error(
        'Your admin session has expired. Sign in again.',
      )
    }

    if (
      selectedEvent
    ) {
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
        `Saved changes to "${updated.name}".`,
      )
    }
    else {
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
        `Created "${created.name}".`,
      )
    }
  }

  async function handleArchive(
    event: Event,
  ) {
    if (
      !window.confirm(
        `Archive "${event.name}"? It will disappear from the public website but remain available in admin.`,
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
      'name',
      event.name,
    )

    formData.set(
      'date',
      event.date,
    )

    formData.set(
      'endDate',
      event.endDate ?? '',
    )

    formData.set(
      'description',
      event.description,
    )

    formData.set(
      'ticketUrl',
      event.ticketUrl ?? '',
    )

    formData.set(
      'registrationMode',
      event.registrationMode ??
        'unknown',
    )

    formData.set(
      'category',
      event.category ?? '',
    )

    formData.set(
      'venue',
      event.venue ?? '',
    )

    formData.set(
      'campus',
      event.campus ?? '',
    )

    formData.set(
      'audience',
      event.audience ?? '',
    )

    formData.set(
      'price',
      event.price ?? '',
    )

    formData.set(
      'accessibility',
      event.accessibility ?? '',
    )

    formData.set(
      'status',
      event.status ??
        getEventStatus(
          event,
        ),
    )

    formData.set(
      'statusNote',
      event.statusNote ?? '',
    )

    formData.set(
      'publicationStatus',
      'archived',
    )

    formData.set(
      'contentOwner',
      event.contentOwner ?? '',
    )

    formData.set(
      'reviewedAt',
      event.reviewedAt ?? '',
    )

    try {
      const updated =
        await updateEvent(
          token,
          event.id,
          formData,
        )

      setEvents(
        (previous) =>
          sortEvents(
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
        `Archived "${updated.name}".`,
      )
    }
    catch (
      caught
    ) {
      setFeedback(
        caught instanceof
          Error
          ? caught.message
          : `Could not archive "${event.name}".`,
      )
    }
  }
  const hasFilters =
    Boolean(
      search.trim(),
    ) ||
    statusFilter !==
      'all' ||
    campusFilter !==
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
            Events
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-600">
            Create, review and update the event information
            students see on the public website.
          </p>
        </div>

        <Button
          onClick={
            openCreate
          }
          className="gap-2 bg-isr-dark-red text-white hover:bg-isr-turquoise"
        >
          <PlusIcon className="h-4 w-4" />
          New event
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
            Active / upcoming
          </p>

          <p className="mt-2 text-2xl font-bold text-isr-turquoise">
            {stats.upcoming}
          </p>
        </div>

        <div className="isr-admin-stat">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
            Needs attention
          </p>

          <p className="mt-2 text-2xl font-bold text-orange-700">
            {stats.attention}
          </p>
        </div>

        <div className="isr-admin-stat">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
            Completed
          </p>

          <p className="mt-2 text-2xl font-bold text-gray-600">
            {stats.completed}
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
        <div className="grid gap-3 lg:grid-cols-[1fr_190px_220px_auto]">
          <label className="relative">
            <span className="sr-only">
              Search events
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
              placeholder="Search events, venues, audiences…"
            />
          </label>

          <select
            value={statusFilter}
            onChange={(
              event,
            ) =>
              setStatusFilter(
                event.target
                  .value as StatusFilter,
              )
            }
            aria-label="Filter event status"
            className="flex h-9 rounded-md border border-input bg-white px-3 text-sm"
          >
            <option value="all">
              All statuses
            </option>

            <option value="scheduled">
              Scheduled
            </option>

            <option value="sold-out">
              Sold out
            </option>

            <option value="postponed">
              Postponed
            </option>

            <option value="cancelled">
              Cancelled
            </option>

            <option value="completed">
              Completed
            </option>
          </select>

          <select
            value={campusFilter}
            onChange={(
              event,
            ) =>
              setCampusFilter(
                event.target.value,
              )
            }
            aria-label="Filter event campus"
            className="flex h-9 rounded-md border border-input bg-white px-3 text-sm"
          >
            <option value="all">
              All campuses
            </option>

            {campuses.map(
              (campus) => (
                <option
                  key={campus}
                  value={campus}
                >
                  {campus}
                </option>
              ),
            )}
          </select>

          {hasFilters && (
            <Button
              variant="outline"
              onClick={() => {
                setSearch('')
                setStatusFilter(
                  'all',
                )
                setCampusFilter(
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
              Showing {visibleEvents.length} of {events.length} events.
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
              Events could not be loaded
            </h2>

            <p className="mt-2 text-sm text-red-800">
              {loadError}
            </p>

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
        visibleEvents.length ===
          0 && (
          <div className="mt-6 rounded-2xl border border-isr-light-blue/25 bg-white p-8 text-center">
            <h2 className="text-xl font-bold text-isr-dark-red">
              {hasFilters
                ? 'No events match these filters'
                : 'No events yet'}
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              {hasFilters
                ? 'Clear the filters or change your search.'
                : 'Create the first event when you are ready.'}
            </p>
          </div>
        )}

      {!loading &&
        !loadError &&
        visibleEvents.length >
          0 && (
          <div className="mt-6 space-y-4">
            {visibleEvents.map(
              (event) => {
                const {
                  date,
                  time,
                } =
                  formatEventDate(
                    event.date,
                  )

                const status =
                  getEventStatus(
                    event,
                  )

                return (
                  <article
                    key={event.id}
                    className="isr-admin-item overflow-hidden"
                  >
                    <div className="grid md:grid-cols-[150px_1fr]">
                      <div className="isr-admin-preview relative min-h-36 rounded-none border-0 md:min-h-full">
                        {event.imageUrl ? (
                          <img
                            src={event.imageUrl}
                            alt=""
                            className="h-full w-full object-contain p-2"
                          />
                        ) : (
                          <div className="flex h-full min-h-36 items-center justify-center p-4 text-center text-xs font-bold uppercase tracking-wide text-isr-dark-red/50">
                            No poster
                          </div>
                        )}
                      </div>

                      <div className="p-5">
                        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span
                                className={`isr-admin-status ${STATUS_CLASSES[status]}`}
                              >
                                {getEventStatusLabel(
                                  status,
                                )}
                              </span>

                              <span
                                className={`isr-admin-status ${PUBLICATION_CLASSES[getPublicationStatus(event)]}`}
                              >
                                {getPublicationLabel(
                                  event,
                                )}
                              </span>

                              {event.campus && (
                                <span className="rounded-full bg-isr-cream px-2.5 py-1 text-xs font-semibold text-isr-dark-red">
                                  {event.campus}
                                </span>
                              )}
                            </div>

                            <h2 className="mt-3 text-xl font-bold leading-snug text-isr-dark-red">
                              {event.name}
                            </h2>

                            <p className="mt-2 text-sm font-semibold text-gray-700">
                              {date} · {time}
                            </p>

                            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-500">
                              {event.venue && (
                                <span>
                                  {event.venue}
                                </span>
                              )}

                              {event.audience && (
                                <span>
                                  {event.audience}
                                </span>
                              )}

                              {event.price && (
                                <span>
                                  {event.price}
                                </span>
                              )}
                            </div>

                            {event.statusNote && (
                              <p className="mt-3 rounded-lg bg-isr-yellow/35 px-3 py-2 text-xs font-semibold leading-relaxed text-isr-dark-red">
                                {event.statusNote}
                              </p>
                            )}
                          </div>

                          <div className="isr-admin-mobile-actions flex shrink-0 flex-col gap-2 sm:flex-row">
                            {getPublicationStatus(
                              event,
                            ) ===
                              'published' && (
                              <Link
                                href={`/events/${event.id}`}
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
                                  event,
                                )
                              }
                              className="gap-2"
                            >
                              <PencilIcon className="h-4 w-4" />
                              Edit
                            </Button>
                            {getPublicationStatus(
                              event,
                            ) !==
                              'archived' && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  void handleArchive(
                                    event,
                                  )
                                }
                                className="gap-2 border-slate-300 text-slate-700 hover:bg-slate-50"
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

      <EventModal
        open={modalOpen}
        event={selectedEvent}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />

    </div>
  )
}
