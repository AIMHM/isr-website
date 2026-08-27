'use client'

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import Link from 'next/link'
import {
  ArchiveIcon,
  CheckCircle2Icon,
  ExternalLinkIcon,
  PencilIcon,
  RefreshCwIcon,
  ShieldCheckIcon,
  TriangleAlertIcon,
} from 'lucide-react'
import {
  Button,
} from '@/components/ui/button'
import {
  Input,
} from '@/components/ui/input'
import {
  getToken,
} from '@/lib/auth'
import {
  IS_LOCAL_ADMIN_MODE,
} from '@/lib/localAdminMode'
import type {
  PublicationStatus,
} from '@/lib/contentTypes'
import {
  fetchAdminPrayerRecords,
  isPrayerRecordStale,
  updateJumuahServiceRecord,
  updatePrayerSpaceRecord,
  type JumuahServiceRecord,
  type PrayerSpaceRecord,
  type PrayerVerificationStatus,
} from '@/lib/prayerRecords'

const PUBLICATION_CLASSES:
  Record<
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

const VERIFICATION_CLASSES:
  Record<
    PrayerVerificationStatus,
    string
  > = {
    verified:
      'bg-emerald-50 text-emerald-800',
    'needs-review':
      'bg-amber-100 text-amber-900',
    temporary:
      'bg-blue-100 text-blue-800',
  }

function titleCase(
  value: string,
): string {
  return value
    .split('-')
    .map(
      (part) =>
        part.charAt(0).toUpperCase() +
        part.slice(1),
    )
    .join(' ')
}

function formatDate(
  value?: string | null,
): string {
  if (!value) {
    return 'Not recorded'
  }

  const parsed =
    new Date(value)

  if (
    Number.isNaN(
      parsed.getTime(),
    )
  ) {
    return 'Invalid date'
  }

  return new Intl.DateTimeFormat(
    'en-AU',
    {
      day:
        'numeric',
      month:
        'short',
      year:
        'numeric',
    },
  ).format(parsed)
}

function nextReviewDate():
  string {
  const next =
    new Date()

  next.setDate(
    next.getDate() + 90,
  )

  return next.toISOString()
}

export default function AdminPrayerPage() {
  const [
    prayerSpaces,
    setPrayerSpaces,
  ] =
    useState<
      PrayerSpaceRecord[]
    >([])

  const [
    jumuahServices,
    setJumuahServices,
  ] =
    useState<
      JumuahServiceRecord[]
    >([])

  const [
    loading,
    setLoading,
  ] =
    useState(true)

  const [
    error,
    setError,
  ] =
    useState('')

  const [
    feedback,
    setFeedback,
  ] =
    useState('')

  const [
    editingSpace,
    setEditingSpace,
  ] =
    useState<
      PrayerSpaceRecord | null
    >(null)

  const [
    editingJumuah,
    setEditingJumuah,
  ] =
    useState<
      JumuahServiceRecord | null
    >(null)

  const [
    saving,
    setSaving,
  ] =
    useState(false)

  const load =
    useCallback(
      async () => {
        setLoading(true)
        setError('')

        try {
          const token =
            getToken()

          if (!token) {
            throw new Error(
              'Admin session missing.',
            )
          }

          const data =
            await fetchAdminPrayerRecords(
              token,
            )

          setPrayerSpaces(
            data.prayerSpaces,
          )

          setJumuahServices(
            data.jumuahServices,
          )
        }
        catch (
          caught
        ) {
          setError(
            caught instanceof Error
              ? caught.message
              : 'Failed to load prayer records.',
          )
        }
        finally {
          setLoading(false)
        }
      },
      [],
    )

  useEffect(() => {
    void load()
  }, [load])

  const allRecords =
    useMemo(
      () => [
        ...prayerSpaces,
        ...jumuahServices,
      ],
      [
        prayerSpaces,
        jumuahServices,
      ],
    )

  const stats =
    useMemo(
      () => ({
        total:
          allRecords.length,

        published:
          allRecords.filter(
            (record) =>
              record.publicationStatus ===
              'published',
          ).length,

        verified:
          allRecords.filter(
            (record) =>
              record.verificationStatus ===
              'verified',
          ).length,

        needsReview:
          allRecords.filter(
            (record) =>
              isPrayerRecordStale(
                record,
              ) ||
              record.verificationStatus ===
                'needs-review',
          ).length,
      }),
      [allRecords],
    )

  async function markPrayerReviewed(
    record:
      PrayerSpaceRecord,
  ) {
    const token =
      getToken()

    if (!token) {
      return
    }

    setSaving(true)

    try {
      const updated =
        await updatePrayerSpaceRecord(
          token,
          record.id,
          {
            verificationStatus:
              'verified',

            reviewedAt:
              new Date().toISOString(),

            reviewDueAt:
              nextReviewDate(),
          },
        )

      setPrayerSpaces(
        (previous) =>
          previous.map(
            (item) =>
              item.id ===
                updated.id
                ? updated
                : item,
          ),
      )

      setFeedback(
        `${updated.name} marked reviewed and verified.`,
      )
    }
    catch (
      caught
    ) {
      setFeedback(
        caught instanceof Error
          ? caught.message
          : 'Could not update prayer record.',
      )
    }
    finally {
      setSaving(false)
    }
  }

  async function markJumuahReviewed(
    record:
      JumuahServiceRecord,
  ) {
    const token =
      getToken()

    if (!token) {
      return
    }

    setSaving(true)

    try {
      const updated =
        await updateJumuahServiceRecord(
          token,
          record.id,
          {
            verificationStatus:
              'verified',

            reviewedAt:
              new Date().toISOString(),

            reviewDueAt:
              nextReviewDate(),
          },
        )

      setJumuahServices(
        (previous) =>
          previous.map(
            (item) =>
              item.id ===
                updated.id
                ? updated
                : item,
          ),
      )

      setFeedback(
        `${updated.campus} Jumu’ah marked reviewed and verified.`,
      )
    }
    catch (
      caught
    ) {
      setFeedback(
        caught instanceof Error
          ? caught.message
          : 'Could not update Jumu’ah.',
      )
    }
    finally {
      setSaving(false)
    }
  }

  async function archivePrayer(
    record:
      PrayerSpaceRecord,
  ) {
    const token =
      getToken()

    if (!token) {
      return
    }

    const updated =
      await updatePrayerSpaceRecord(
        token,
        record.id,
        {
          publicationStatus:
            'archived',
        },
      )

    setPrayerSpaces(
      (previous) =>
        previous.map(
          (item) =>
            item.id ===
              updated.id
              ? updated
              : item,
        ),
    )
  }

  async function archiveJumuah(
    record:
      JumuahServiceRecord,
  ) {
    const token =
      getToken()

    if (!token) {
      return
    }

    const updated =
      await updateJumuahServiceRecord(
        token,
        record.id,
        {
          publicationStatus:
            'archived',
        },
      )

    setJumuahServices(
      (previous) =>
        previous.map(
          (item) =>
            item.id ===
              updated.id
              ? updated
              : item,
        ),
    )
  }

  async function savePrayer() {
    if (!editingSpace) {
      return
    }

    const token =
      getToken()

    if (!token) {
      return
    }

    setSaving(true)

    try {
      const updated =
        await updatePrayerSpaceRecord(
          token,
          editingSpace.id,
          editingSpace,
        )

      setPrayerSpaces(
        (previous) =>
          previous.map(
            (item) =>
              item.id ===
                updated.id
                ? updated
                : item,
          ),
      )

      setEditingSpace(null)

      setFeedback(
        `Saved ${updated.name}.`,
      )
    }
    finally {
      setSaving(false)
    }
  }

  async function saveJumuah() {
    if (!editingJumuah) {
      return
    }

    const token =
      getToken()

    if (!token) {
      return
    }

    setSaving(true)

    try {
      const updated =
        await updateJumuahServiceRecord(
          token,
          editingJumuah.id,
          editingJumuah,
        )

      setJumuahServices(
        (previous) =>
          previous.map(
            (item) =>
              item.id ===
                updated.id
                ? updated
                : item,
          ),
      )

      setEditingJumuah(null)

      setFeedback(
        `Saved ${updated.campus} Jumu’ah.`,
      )
    }
    finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-turquoise">
              Operational information
            </p>

            {IS_LOCAL_ADMIN_MODE && (
              <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-amber-900">
                Local sandbox
              </span>
            )}
          </div>

          <h1 className="mt-2 text-3xl font-bold text-isr-dark-red">
            Prayer & Jumu’ah
          </h1>

          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-600">
            Maintain permanent prayer-space and Jumu’ah information, verify accuracy and surface records that are overdue for review.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={() =>
              void load()
            }
            className="gap-2"
          >
            <RefreshCwIcon className="h-4 w-4" />
            Refresh
          </Button>

          <Link
            href="/pray"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-isr-dark-red px-4 text-sm font-bold text-white transition hover:bg-isr-turquoise"
          >
            <ExternalLinkIcon className="h-4 w-4" />
            View Prayer page
          </Link>
        </div>
      </header>

      <section className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="isr-admin-stat">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
            Managed
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
            Verified
          </p>
          <p className="mt-2 text-2xl font-bold text-isr-turquoise">
            {stats.verified}
          </p>
        </div>

        <div className="isr-admin-stat">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
            Needs review
          </p>
          <p className="mt-2 text-2xl font-bold text-orange-700">
            {stats.needsReview}
          </p>
        </div>
      </section>

      {feedback && (
        <div className="mt-5 rounded-xl border border-isr-turquoise/20 bg-isr-turquoise/5 px-4 py-3 text-sm font-semibold text-isr-dark-red">
          {feedback}
        </div>
      )}

      {error && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
          {error}
        </div>
      )}

      {loading ? (
        <div className="isr-admin-empty mt-6">
          Loading prayer information…
        </div>
      ) : (
        <>
          <section className="mt-8">
            <h2 className="text-2xl font-bold text-isr-dark-red">
              Prayer spaces
            </h2>

            {prayerSpaces.length === 0 ? (
              <div className="isr-admin-empty mt-4">
                No persistent prayer-space records exist yet.
              </div>
            ) : (
              <div className="mt-4 grid gap-4">
                {prayerSpaces.map(
                  (record) => {
                    const stale =
                      isPrayerRecordStale(
                        record,
                      )

                    return (
                      <article
                        key={record.id}
                        className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                      >
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap gap-2">
                              <span className={`isr-admin-status ${PUBLICATION_CLASSES[record.publicationStatus]}`}>
                                {titleCase(
                                  record.publicationStatus,
                                )}
                              </span>

                              <span className={`isr-admin-status ${VERIFICATION_CLASSES[record.verificationStatus]}`}>
                                {titleCase(
                                  record.verificationStatus,
                                )}
                              </span>

                              {stale && (
                                <span className="isr-admin-status bg-red-100 text-red-800">
                                  <TriangleAlertIcon className="mr-1 inline h-3.5 w-3.5" />
                                  Review overdue
                                </span>
                              )}
                            </div>

                            <h3 className="mt-3 text-xl font-bold text-isr-dark-red">
                              {record.name}
                            </h3>

                            <p className="mt-1 text-sm font-semibold text-isr-turquoise">
                              {record.campus}
                            </p>

                            <p className="mt-3 text-sm leading-relaxed text-gray-600">
                              {record.summary}
                            </p>

                            <div className="mt-4 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
                              <div>
                                <p className="text-xs font-bold uppercase text-gray-400">
                                  Location
                                </p>
                                <p className="mt-1">
                                  {record.building} · {record.room}
                                </p>
                              </div>

                              <div>
                                <p className="text-xs font-bold uppercase text-gray-400">
                                  Owner
                                </p>
                                <p className="mt-1">
                                  {record.contentOwner || 'Not assigned'}
                                </p>
                              </div>

                              <div>
                                <p className="text-xs font-bold uppercase text-gray-400">
                                  Reviewed
                                </p>
                                <p className="mt-1">
                                  {formatDate(
                                    record.reviewedAt,
                                  )}
                                </p>
                              </div>

                              <div>
                                <p className="text-xs font-bold uppercase text-gray-400">
                                  Review due
                                </p>
                                <p className={`mt-1 ${stale ? 'font-bold text-red-700' : ''}`}>
                                  {formatDate(
                                    record.reviewDueAt,
                                  )}
                                </p>
                              </div>
                            </div>

                            {record.sourceLabel && (
                              <p className="mt-4 text-xs text-gray-500">
                                Source: {record.sourceLabel}
                              </p>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={saving}
                              onClick={() =>
                                void markPrayerReviewed(
                                  record,
                                )
                              }
                              className="gap-2"
                            >
                              <ShieldCheckIcon className="h-4 w-4" />
                              Mark reviewed
                            </Button>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                setEditingSpace(
                                  record,
                                )
                              }
                              className="gap-2"
                            >
                              <PencilIcon className="h-4 w-4" />
                              Edit
                            </Button>

                            {record.publicationStatus !==
                              'archived' && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  void archivePrayer(
                                    record,
                                  )
                                }
                                className="gap-2 border-slate-300 text-slate-700"
                              >
                                <ArchiveIcon className="h-4 w-4" />
                                Archive
                              </Button>
                            )}
                          </div>
                        </div>
                      </article>
                    )
                  },
                )}
              </div>
            )}
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold text-isr-dark-red">
              Jumu’ah services
            </h2>

            {jumuahServices.length === 0 ? (
              <div className="isr-admin-empty mt-4">
                No persistent Jumu’ah records exist yet.
              </div>
            ) : (
              <div className="mt-4 grid gap-4">
                {jumuahServices.map(
                  (record) => {
                    const stale =
                      isPrayerRecordStale(
                        record,
                      )

                    return (
                      <article
                        key={record.id}
                        className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                      >
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap gap-2">
                              <span className={`isr-admin-status ${PUBLICATION_CLASSES[record.publicationStatus]}`}>
                                {titleCase(
                                  record.publicationStatus,
                                )}
                              </span>

                              <span className={`isr-admin-status ${VERIFICATION_CLASSES[record.verificationStatus]}`}>
                                {titleCase(
                                  record.verificationStatus,
                                )}
                              </span>

                              {stale && (
                                <span className="isr-admin-status bg-red-100 text-red-800">
                                  Review overdue
                                </span>
                              )}
                            </div>

                            <h3 className="mt-3 text-xl font-bold text-isr-dark-red">
                              {record.campus} Jumu’ah
                            </h3>

                            <p className="mt-1 text-sm font-semibold text-isr-turquoise">
                              {record.venue}
                            </p>

                            <p className="mt-3 text-sm leading-relaxed text-gray-600">
                              {record.timeRule}
                            </p>

                            <div className="mt-4 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
                              <div>
                                <p className="text-xs font-bold uppercase text-gray-400">
                                  Standard
                                </p>
                                <p className="mt-1">
                                  {record.standardTime || 'N/A'}
                                </p>
                              </div>

                              <div>
                                <p className="text-xs font-bold uppercase text-gray-400">
                                  DST
                                </p>
                                <p className="mt-1">
                                  {record.daylightSavingTime || 'N/A'}
                                </p>
                              </div>

                              <div>
                                <p className="text-xs font-bold uppercase text-gray-400">
                                  Reviewed
                                </p>
                                <p className="mt-1">
                                  {formatDate(
                                    record.reviewedAt,
                                  )}
                                </p>
                              </div>

                              <div>
                                <p className="text-xs font-bold uppercase text-gray-400">
                                  Review due
                                </p>
                                <p className={`mt-1 ${stale ? 'font-bold text-red-700' : ''}`}>
                                  {formatDate(
                                    record.reviewDueAt,
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={saving}
                              onClick={() =>
                                void markJumuahReviewed(
                                  record,
                                )
                              }
                              className="gap-2"
                            >
                              <CheckCircle2Icon className="h-4 w-4" />
                              Mark reviewed
                            </Button>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                setEditingJumuah(
                                  record,
                                )
                              }
                              className="gap-2"
                            >
                              <PencilIcon className="h-4 w-4" />
                              Edit
                            </Button>

                            {record.publicationStatus !==
                              'archived' && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  void archiveJumuah(
                                    record,
                                  )
                                }
                                className="gap-2 border-slate-300 text-slate-700"
                              >
                                <ArchiveIcon className="h-4 w-4" />
                                Archive
                              </Button>
                            )}
                          </div>
                        </div>
                      </article>
                    )
                  },
                )}
              </div>
            )}
          </section>

          <section className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <p className="font-bold text-amber-900">
              Temporary changes belong in ISR Updates
            </p>

            <p className="mt-1 text-sm leading-relaxed text-amber-900/80">
              Temporary closures, room changes, access problems and altered Jumu’ah times should be published as time-limited ISR Updates rather than overwriting the permanent campus record.
            </p>

            <Link
              href="/admin/announcements"
              className="mt-3 inline-flex text-sm font-bold text-isr-dark-red underline underline-offset-4"
            >
              Manage ISR Updates
            </Link>
          </section>
        </>
      )}

      {editingSpace && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold text-isr-dark-red">
              Edit prayer space
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Input
                value={editingSpace.name}
                onChange={(event) =>
                  setEditingSpace({
                    ...editingSpace,
                    name:
                      event.target.value,
                  })
                }
                placeholder="Name"
              />

              <Input
                value={editingSpace.campus}
                onChange={(event) =>
                  setEditingSpace({
                    ...editingSpace,
                    campus:
                      event.target.value,
                  })
                }
                placeholder="Campus"
              />

              <Input
                value={editingSpace.building}
                onChange={(event) =>
                  setEditingSpace({
                    ...editingSpace,
                    building:
                      event.target.value,
                  })
                }
                placeholder="Building"
              />

              <Input
                value={editingSpace.room}
                onChange={(event) =>
                  setEditingSpace({
                    ...editingSpace,
                    room:
                      event.target.value,
                  })
                }
                placeholder="Room"
              />

              <Input
                value={editingSpace.contentOwner ?? ''}
                onChange={(event) =>
                  setEditingSpace({
                    ...editingSpace,
                    contentOwner:
                      event.target.value,
                  })
                }
                placeholder="Content owner"
              />

              <Input
                value={editingSpace.sourceLabel ?? ''}
                onChange={(event) =>
                  setEditingSpace({
                    ...editingSpace,
                    sourceLabel:
                      event.target.value,
                  })
                }
                placeholder="Source"
              />

              <select
                value={editingSpace.publicationStatus}
                onChange={(event) =>
                  setEditingSpace({
                    ...editingSpace,
                    publicationStatus:
                      event.target.value as PublicationStatus,
                  })
                }
                className="flex h-9 rounded-md border border-input bg-white px-3 text-sm"
              >
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
                value={editingSpace.verificationStatus}
                onChange={(event) =>
                  setEditingSpace({
                    ...editingSpace,
                    verificationStatus:
                      event.target.value as PrayerVerificationStatus,
                  })
                }
                className="flex h-9 rounded-md border border-input bg-white px-3 text-sm"
              >
                <option value="verified">
                  Verified
                </option>
                <option value="needs-review">
                  Needs review
                </option>
                <option value="temporary">
                  Temporary
                </option>
              </select>
            </div>

            <textarea
              value={editingSpace.summary}
              onChange={(event) =>
                setEditingSpace({
                  ...editingSpace,
                  summary:
                    event.target.value,
                })
              }
              rows={4}
              className="mt-4 w-full rounded-md border border-input bg-white px-3 py-2 text-sm"
            />

            <div className="mt-5 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  setEditingSpace(null)
                }
              >
                Cancel
              </Button>

              <Button
                disabled={saving}
                onClick={() =>
                  void savePrayer()
                }
                className="bg-isr-dark-red text-white hover:bg-isr-turquoise"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}

      {editingJumuah && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold text-isr-dark-red">
              Edit Jumu’ah service
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Input
                value={editingJumuah.campus}
                onChange={(event) =>
                  setEditingJumuah({
                    ...editingJumuah,
                    campus:
                      event.target.value,
                  })
                }
                placeholder="Campus"
              />

              <Input
                value={editingJumuah.venue}
                onChange={(event) =>
                  setEditingJumuah({
                    ...editingJumuah,
                    venue:
                      event.target.value,
                  })
                }
                placeholder="Venue"
              />

              <Input
                value={editingJumuah.standardTime ?? ''}
                onChange={(event) =>
                  setEditingJumuah({
                    ...editingJumuah,
                    standardTime:
                      event.target.value,
                  })
                }
                placeholder="Standard time"
              />

              <Input
                value={editingJumuah.daylightSavingTime ?? ''}
                onChange={(event) =>
                  setEditingJumuah({
                    ...editingJumuah,
                    daylightSavingTime:
                      event.target.value,
                  })
                }
                placeholder="DST time"
              />

              <Input
                value={editingJumuah.contentOwner ?? ''}
                onChange={(event) =>
                  setEditingJumuah({
                    ...editingJumuah,
                    contentOwner:
                      event.target.value,
                  })
                }
                placeholder="Content owner"
              />

              <Input
                value={editingJumuah.sourceLabel ?? ''}
                onChange={(event) =>
                  setEditingJumuah({
                    ...editingJumuah,
                    sourceLabel:
                      event.target.value,
                  })
                }
                placeholder="Source"
              />

              <select
                value={editingJumuah.publicationStatus}
                onChange={(event) =>
                  setEditingJumuah({
                    ...editingJumuah,
                    publicationStatus:
                      event.target.value as PublicationStatus,
                  })
                }
                className="flex h-9 rounded-md border border-input bg-white px-3 text-sm"
              >
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
                value={editingJumuah.verificationStatus}
                onChange={(event) =>
                  setEditingJumuah({
                    ...editingJumuah,
                    verificationStatus:
                      event.target.value as PrayerVerificationStatus,
                  })
                }
                className="flex h-9 rounded-md border border-input bg-white px-3 text-sm"
              >
                <option value="verified">
                  Verified
                </option>
                <option value="needs-review">
                  Needs review
                </option>
                <option value="temporary">
                  Temporary
                </option>
              </select>
            </div>

            <textarea
              value={editingJumuah.timeRule}
              onChange={(event) =>
                setEditingJumuah({
                  ...editingJumuah,
                  timeRule:
                    event.target.value,
                })
              }
              rows={3}
              className="mt-4 w-full rounded-md border border-input bg-white px-3 py-2 text-sm"
            />

            <textarea
              value={editingJumuah.notes}
              onChange={(event) =>
                setEditingJumuah({
                  ...editingJumuah,
                  notes:
                    event.target.value,
                })
              }
              rows={3}
              className="mt-4 w-full rounded-md border border-input bg-white px-3 py-2 text-sm"
            />

            <div className="mt-5 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  setEditingJumuah(null)
                }
              >
                Cancel
              </Button>

              <Button
                disabled={saving}
                onClick={() =>
                  void saveJumuah()
                }
                className="bg-isr-dark-red text-white hover:bg-isr-turquoise"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
