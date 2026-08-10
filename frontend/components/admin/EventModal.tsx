'use client'

import {
  useEffect,
  useState,
} from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Button,
} from '@/components/ui/button'
import {
  Input,
} from '@/components/ui/input'
import {
  Label,
} from '@/components/ui/label'
import {
  Textarea,
} from '@/components/ui/textarea'
import {
  fromDatetimeLocalValue,
  toDatetimeLocalValue,
  type Event,
  type EventStatus,
} from '@/lib/events'

interface Props {
  open: boolean
  event: Event | null
  onClose: () => void
  onSubmit:
    (
      formData: FormData,
    ) => Promise<void>
}

const STATUSES: {
  value: EventStatus
  label: string
}[] = [
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

function validHttpUrl(
  value: string,
): boolean {
  if (!value.trim()) {
    return true
  }

  try {
    const url =
      new URL(value)

    return (
      url.protocol === 'http:' ||
      url.protocol === 'https:'
    )
  } catch {
    return false
  }
}

export function EventModal({
  open,
  event,
  onClose,
  onSubmit,
}: Props) {
  const isEdit =
    event !== null

  const [
    name,
    setName,
  ] =
    useState('')

  const [
    date,
    setDate,
  ] =
    useState('')

  const [
    endDate,
    setEndDate,
  ] =
    useState('')

  const [
    description,
    setDescription,
  ] =
    useState('')

  const [
    ticketUrl,
    setTicketUrl,
  ] =
    useState('')

  const [
    venue,
    setVenue,
  ] =
    useState('')

  const [
    campus,
    setCampus,
  ] =
    useState('')

  const [
    audience,
    setAudience,
  ] =
    useState('')

  const [
    price,
    setPrice,
  ] =
    useState('')

  const [
    accessibility,
    setAccessibility,
  ] =
    useState('')

  const [
    status,
    setStatus,
  ] =
    useState<EventStatus>(
      'scheduled',
    )

  const [
    statusNote,
    setStatusNote,
  ] =
    useState('')

  const [
    imageFile,
    setImageFile,
  ] =
    useState<File | null>(
      null,
    )

  const [
    imagePreview,
    setImagePreview,
  ] =
    useState<string | null>(
      null,
    )

  const [
    error,
    setError,
  ] =
    useState('')

  const [
    submitting,
    setSubmitting,
  ] =
    useState(false)

  useEffect(() => {
    setName(
      event?.name ?? '',
    )

    setDate(
      event
        ? toDatetimeLocalValue(
            event.date,
          )
        : '',
    )

    setEndDate(
      event?.endDate
        ? toDatetimeLocalValue(
            event.endDate,
          )
        : '',
    )

    setDescription(
      event?.description ??
        '',
    )

    setTicketUrl(
      event?.ticketUrl ??
        '',
    )

    setVenue(
      event?.venue ?? '',
    )

    setCampus(
      event?.campus ?? '',
    )

    setAudience(
      event?.audience ?? '',
    )

    setPrice(
      event?.price ?? '',
    )

    setAccessibility(
      event?.accessibility ??
        '',
    )

    setStatus(
      event?.status ??
        'scheduled',
    )

    setStatusNote(
      event?.statusNote ??
        '',
    )

    setImageFile(null)
    setImagePreview(
      event?.imageUrl ||
        null,
    )

    setError('')
    setSubmitting(false)
  }, [event, open])

  useEffect(() => {
    if (!imageFile) {
      setImagePreview(
        event?.imageUrl ||
          null,
      )
      return
    }

    const objectUrl =
      URL.createObjectURL(
        imageFile,
      )

    setImagePreview(
      objectUrl,
    )

    return () => {
      URL.revokeObjectURL(
        objectUrl,
      )
    }
  }, [
    imageFile,
    event?.imageUrl,
  ])

  function handleImage(
    file:
      | File
      | null,
  ) {
    if (!file) {
      setImageFile(null)
      return
    }

    const allowed =
      [
        'image/jpeg',
        'image/png',
        'image/webp',
      ]

    if (
      !allowed.includes(
        file.type,
      )
    ) {
      setError(
        'Poster must be JPEG, PNG or WebP.',
      )
      return
    }

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      setError(
        'Poster must be 5 MB or smaller.',
      )
      return
    }

    setError('')
    setImageFile(file)
  }

  async function handleSave(
    submitEvent:
      React.FormEvent,
  ) {
    submitEvent.preventDefault()

    const cleanName =
      name.trim()

    const cleanDescription =
      description.trim()

    if (
      !cleanName ||
      !date ||
      !cleanDescription
    ) {
      setError(
        'Event name, start date/time and description are required.',
      )
      return
    }

    if (
      !isEdit &&
      !imageFile
    ) {
      setError(
        'A poster is required when creating a new event.',
      )
      return
    }

    if (
      endDate &&
      new Date(
        endDate,
      ).getTime() <
        new Date(
          date,
        ).getTime()
    ) {
      setError(
        'End time cannot be before the start time.',
      )
      return
    }

    if (
      !validHttpUrl(
        ticketUrl,
      )
    ) {
      setError(
        'Registration link must use http:// or https://.',
      )
      return
    }

    if (
      (
        status ===
          'cancelled' ||
        status ===
          'postponed'
      ) &&
      !statusNote.trim()
    ) {
      setError(
        'Cancelled and postponed events need a public status message explaining what students should know.',
      )
      return
    }

    setError('')
    setSubmitting(true)

    const formData =
      new FormData()

    formData.set(
      'name',
      cleanName,
    )

    formData.set(
      'date',
      fromDatetimeLocalValue(
        date,
      ),
    )

    formData.set(
      'endDate',
      endDate
        ? fromDatetimeLocalValue(
            endDate,
          )
        : '',
    )

    formData.set(
      'description',
      cleanDescription,
    )

    formData.set(
      'ticketUrl',
      ticketUrl.trim(),
    )

    formData.set(
      'venue',
      venue.trim(),
    )

    formData.set(
      'campus',
      campus.trim(),
    )

    formData.set(
      'audience',
      audience.trim(),
    )

    formData.set(
      'price',
      price.trim(),
    )

    formData.set(
      'accessibility',
      accessibility.trim(),
    )

    formData.set(
      'status',
      status,
    )

    formData.set(
      'statusNote',
      statusNote.trim(),
    )

    if (imageFile) {
      formData.set(
        'image',
        imageFile,
      )
    }

    try {
      await onSubmit(
        formData,
      )

      onClose()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'The event could not be saved.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (
          !nextOpen &&
          !submitting
        ) {
          onClose()
        }
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="max-h-[92vh] overflow-y-auto sm:max-w-3xl"
      >
        <DialogHeader>
          <DialogTitle>
            {isEdit
              ? 'Edit event'
              : 'Create event'}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSave}
          className="space-y-7"
        >
          <section className="space-y-4">
            <div>
              <h3 className="font-bold text-isr-dark-red">
                Essential information
              </h3>

              <p className="mt-1 text-xs text-muted-foreground">
                These fields form the main public event listing.
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="ev-name">
                Event name *
              </Label>

              <Input
                id="ev-name"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value,
                  )
                }
                placeholder="e.g. ISR Heritage Dinner"
                disabled={submitting}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="ev-date">
                  Start date &amp; time *
                </Label>

                <Input
                  id="ev-date"
                  type="datetime-local"
                  value={date}
                  onChange={(e) =>
                    setDate(
                      e.target.value,
                    )
                  }
                  disabled={submitting}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="ev-end">
                  End date &amp; time
                </Label>

                <Input
                  id="ev-end"
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) =>
                    setEndDate(
                      e.target.value,
                    )
                  }
                  disabled={submitting}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="ev-desc">
                Description *
              </Label>

              <Textarea
                id="ev-desc"
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value,
                  )
                }
                rows={6}
                placeholder="What is happening, who is it for, and what should attendees know?"
                disabled={submitting}
              />

              <p className="text-xs text-muted-foreground">
                {
                  description.length
                } characters
              </p>
            </div>
          </section>

          <section className="space-y-4 border-t pt-6">
            <div>
              <h3 className="font-bold text-isr-dark-red">
                Location and attendance
              </h3>

              <p className="mt-1 text-xs text-muted-foreground">
                Keep venue, campus and audience information student-friendly.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="ev-campus">
                  Campus
                </Label>

                <Input
                  id="ev-campus"
                  value={campus}
                  onChange={(e) =>
                    setCampus(
                      e.target.value,
                    )
                  }
                  placeholder="City campus"
                  disabled={submitting}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="ev-venue">
                  Venue
                </Label>

                <Input
                  id="ev-venue"
                  value={venue}
                  onChange={(e) =>
                    setVenue(
                      e.target.value,
                    )
                  }
                  placeholder="Building 80, Level 6, Room 5"
                  disabled={submitting}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="ev-audience">
                  Audience
                </Label>

                <Input
                  id="ev-audience"
                  value={audience}
                  onChange={(e) =>
                    setAudience(
                      e.target.value,
                    )
                  }
                  placeholder="All students / Brothers / Sisters"
                  disabled={submitting}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="ev-price">
                  Price
                </Label>

                <Input
                  id="ev-price"
                  value={price}
                  onChange={(e) =>
                    setPrice(
                      e.target.value,
                    )
                  }
                  placeholder="Free / $15"
                  disabled={submitting}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="ev-ticket">
                Registration link
              </Label>

              <Input
                id="ev-ticket"
                type="url"
                value={ticketUrl}
                onChange={(e) =>
                  setTicketUrl(
                    e.target.value,
                  )
                }
                placeholder="https://..."
                disabled={submitting}
              />

              <p className="text-xs text-muted-foreground">
                Leave blank if registration is not required or not available yet.
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="ev-accessibility">
                Access information
              </Label>

              <Textarea
                id="ev-accessibility"
                value={accessibility}
                onChange={(e) =>
                  setAccessibility(
                    e.target.value,
                  )
                }
                rows={3}
                placeholder="Step-free access, lift access, seating arrangements or other information students may need."
                disabled={submitting}
              />
            </div>
          </section>

          <section className="space-y-4 border-t pt-6">
            <div>
              <h3 className="font-bold text-isr-dark-red">
                Event status
              </h3>

              <p className="mt-1 text-xs text-muted-foreground">
                Status changes are visible to students on event cards and the event page.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="ev-status">
                  Status
                </Label>

                <select
                  id="ev-status"
                  value={status}
                  onChange={(e) =>
                    setStatus(
                      e.target
                        .value as EventStatus,
                    )
                  }
                  disabled={submitting}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none transition focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {STATUSES.map(
                    (item) => (
                      <option
                        key={
                          item.value
                        }
                        value={
                          item.value
                        }
                      >
                        {
                          item.label
                        }
                      </option>
                    ),
                  )}
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="ev-status-note">
                  Public status message
                </Label>

                <Input
                  id="ev-status-note"
                  value={statusNote}
                  onChange={(e) =>
                    setStatusNote(
                      e.target.value,
                    )
                  }
                  placeholder="e.g. A new date will be announced soon."
                  disabled={submitting}
                />
              </div>
            </div>

            {(
              status ===
                'cancelled' ||
              status ===
                'postponed'
            ) && (
              <p className="rounded-lg bg-isr-yellow/40 px-4 py-3 text-xs font-medium text-isr-dark-red">
                A clear public status message is required so students know what has changed.
              </p>
            )}
          </section>

          <section className="space-y-4 border-t pt-6">
            <div>
              <h3 className="font-bold text-isr-dark-red">
                Event poster
              </h3>

              <p className="mt-1 text-xs text-muted-foreground">
                JPEG, PNG or WebP. Maximum 5 MB.
              </p>
            </div>

            {imagePreview && (
              <div className="overflow-hidden rounded-2xl border bg-isr-cream">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imagePreview}
                  alt="Event poster preview"
                  className="max-h-80 w-full object-contain"
                />
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="ev-image">
                {isEdit
                  ? 'Replace poster'
                  : 'Upload poster *'}
              </Label>

              <Input
                id="ev-image"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                disabled={submitting}
                onChange={(e) =>
                  handleImage(
                    e.target
                      .files?.[0] ??
                      null,
                  )
                }
                className="cursor-pointer"
              />

              {imageFile && (
                <p className="text-xs font-medium text-isr-turquoise">
                  Selected: {
                    imageFile.name
                  }
                </p>
              )}
            </div>
          </section>

          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
            >
              {error}
            </div>
          )}

          <DialogFooter className="sticky bottom-0 -mx-6 border-t bg-white px-6 py-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={submitting}
              className="bg-isr-dark-red text-isr-cream hover:bg-isr-dark-red/90"
            >
              {submitting
                ? 'Saving…'
                : isEdit
                  ? 'Save event'
                  : 'Create event'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
