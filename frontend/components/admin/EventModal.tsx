'use client'

import {
  useEffect,
  useMemo,
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
  onSubmit: (
    formData: FormData,
  ) => Promise<void>
}

function validHttpUrl(
  value: string,
): boolean {
  if (!value.trim()) {
    return true
  }

  try {
    const url =
      new URL(
        value,
      )

    return (
      url.protocol ===
        'http:' ||
      url.protocol ===
        'https:'
    )
  }
  catch {
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
    event !==
    null

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
    ticketUrl,
    setTicketUrl,
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
    contentOwner,
    setContentOwner,
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
    error,
    setError,
  ] =
    useState('')

  const [
    submitting,
    setSubmitting,
  ] =
    useState(false)

  const [
    dirty,
    setDirty,
  ] =
    useState(false)

  useEffect(() => {
    if (!open) {
      return
    }

    setName(
      event?.name ??
        '',
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

    setVenue(
      event?.venue ??
        '',
    )

    setCampus(
      event?.campus ??
        '',
    )

    setAudience(
      event?.audience ??
        '',
    )

    setPrice(
      event?.price ??
        '',
    )

    setAccessibility(
      event?.accessibility ??
        '',
    )

    setTicketUrl(
      event?.ticketUrl ??
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

    setContentOwner(
      event?.contentOwner ??
        '',
    )

    setImageFile(null)
    setError('')
    setDirty(false)
  }, [
    event,
    open,
  ])

  const requiresStatusNote =
    status ===
      'cancelled' ||
    status ===
      'postponed'

  const imageLabel =
    useMemo(
      () => {
        if (
          imageFile
        ) {
          return imageFile.name
        }

        if (
          event?.imageUrl
        ) {
          return 'Current poster retained'
        }

        return 'No poster selected'
      },
      [
        imageFile,
        event,
      ],
    )

  function change(
    setter:
      React.Dispatch<
        React.SetStateAction<string>
      >,
    value: string,
  ) {
    setter(value)
    setDirty(true)
  }

  function requestClose() {
    if (
      submitting
    ) {
      return
    }

    if (
      dirty &&
      !window.confirm(
        'Discard unsaved event changes?',
      )
    ) {
      return
    }

    onClose()
  }

  async function handleSave() {
    if (
      !name.trim() ||
      !date ||
      !description.trim()
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
        'A poster image is required when creating a new event.',
      )

      return
    }

    if (
      endDate &&
      new Date(
        fromDatetimeLocalValue(
          endDate,
        ),
      ).getTime() <
        new Date(
          fromDatetimeLocalValue(
            date,
          ),
        ).getTime()
    ) {
      setError(
        'The end time cannot be earlier than the start time.',
      )

      return
    }

    if (
      !validHttpUrl(
        ticketUrl,
      )
    ) {
      setError(
        'Registration URL must be a valid http or https link.',
      )

      return
    }

    if (
      requiresStatusNote &&
      !statusNote.trim()
    ) {
      setError(
        'Cancelled and postponed events need a public status note.',
      )

      return
    }

    setError('')
    setSubmitting(true)

    const formData =
      new FormData()

    formData.set(
      'name',
      name.trim(),
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
      description.trim(),
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

    formData.set(
      'contentOwner',
      contentOwner.trim(),
    )

    if (
      imageFile
    ) {
      formData.set(
        'image',
        imageFile,
      )
    }

    try {
      await onSubmit(
        formData,
      )

      setDirty(false)
      onClose()
    }
    catch (
      caught
    ) {
      setError(
        caught instanceof
          Error
          ? caught.message
          : 'The event could not be saved.',
      )
    }
    finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(
        nextOpen,
      ) => {
        if (!nextOpen) {
          requestClose()
        }
      }}
    >
      <DialogContent
        className="max-h-[92vh] overflow-y-auto sm:max-w-3xl"
        showCloseButton={
          false
        }
      >
        <DialogHeader>
          <DialogTitle className="text-2xl text-isr-dark-red">
            {isEdit
              ? 'Edit event'
              : 'Create event'}
          </DialogTitle>
        </DialogHeader>

        <p className="text-sm text-gray-600">
          Fields marked with * are required.
          Public-facing information should be confirmed
          before saving.
        </p>

        <div className="space-y-5 py-2">
          <section className="isr-admin-fieldset">
            <h3 className="isr-admin-fieldset-title">
              Event essentials
            </h3>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="ev-name"
                  className="isr-admin-required"
                >
                  Event name
                </Label>

                <Input
                  id="ev-name"
                  value={name}
                  onChange={(
                    inputEvent,
                  ) =>
                    change(
                      setName,
                      inputEvent
                        .target
                        .value,
                    )
                  }
                  placeholder="e.g. ISR Heritage Dinner"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="ev-date"
                    className="isr-admin-required"
                  >
                    Starts
                  </Label>

                  <Input
                    id="ev-date"
                    type="datetime-local"
                    value={date}
                    onChange={(
                      inputEvent,
                    ) =>
                      change(
                        setDate,
                        inputEvent
                          .target
                          .value,
                      )
                    }
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="ev-end-date">
                    Ends
                    <span className="ml-1 font-normal text-gray-400">
                      optional
                    </span>
                  </Label>

                  <Input
                    id="ev-end-date"
                    type="datetime-local"
                    value={endDate}
                    onChange={(
                      inputEvent,
                    ) =>
                      change(
                        setEndDate,
                        inputEvent
                          .target
                          .value,
                      )
                    }
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="ev-desc"
                  className="isr-admin-required"
                >
                  Description
                </Label>

                <Textarea
                  id="ev-desc"
                  value={description}
                  onChange={(
                    inputEvent,
                  ) =>
                    change(
                      setDescription,
                      inputEvent
                        .target
                        .value,
                    )
                  }
                  rows={5}
                  placeholder="What should students know about this event?"
                />

                <p className="text-xs text-gray-500">
                  {description.length} characters
                </p>
              </div>
            </div>
          </section>

          <section className="isr-admin-fieldset">
            <h3 className="isr-admin-fieldset-title">
              Location & audience
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="ev-campus">
                  Campus
                </Label>

                <Input
                  id="ev-campus"
                  value={campus}
                  onChange={(
                    inputEvent,
                  ) =>
                    change(
                      setCampus,
                      inputEvent
                        .target
                        .value,
                    )
                  }
                  placeholder="e.g. City campus"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="ev-venue">
                  Venue
                </Label>

                <Input
                  id="ev-venue"
                  value={venue}
                  onChange={(
                    inputEvent,
                  ) =>
                    change(
                      setVenue,
                      inputEvent
                        .target
                        .value,
                    )
                  }
                  placeholder="e.g. Building 80, Level 6, Room 5"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="ev-audience">
                  Audience
                </Label>

                <Input
                  id="ev-audience"
                  value={audience}
                  onChange={(
                    inputEvent,
                  ) =>
                    change(
                      setAudience,
                      inputEvent
                        .target
                        .value,
                    )
                  }
                  placeholder="e.g. All students / Brothers / Sisters"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="ev-accessibility">
                  Accessibility information
                </Label>

                <Input
                  id="ev-accessibility"
                  value={accessibility}
                  onChange={(
                    inputEvent,
                  ) =>
                    change(
                      setAccessibility,
                      inputEvent
                        .target
                        .value,
                    )
                  }
                  placeholder="Confirmed access information"
                />
              </div>
            </div>
          </section>

          <section className="isr-admin-fieldset">
            <h3 className="isr-admin-fieldset-title">
              Registration & price
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="ev-ticket">
                  Registration URL
                </Label>

                <Input
                  id="ev-ticket"
                  type="url"
                  value={ticketUrl}
                  onChange={(
                    inputEvent,
                  ) =>
                    change(
                      setTicketUrl,
                      inputEvent
                        .target
                        .value,
                    )
                  }
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="ev-price">
                  Price
                </Label>

                <Input
                  id="ev-price"
                  value={price}
                  onChange={(
                    inputEvent,
                  ) =>
                    change(
                      setPrice,
                      inputEvent
                        .target
                        .value,
                    )
                  }
                  placeholder="e.g. Free / $15"
                />
              </div>
            </div>
          </section>

          <section className="isr-admin-fieldset">
            <h3 className="isr-admin-fieldset-title">
              Public status
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="ev-status">
                  Status
                </Label>

                <select
                  id="ev-status"
                  value={status}
                  onChange={(
                    inputEvent,
                  ) => {
                    setStatus(
                      inputEvent
                        .target
                        .value as EventStatus,
                    )

                    setDirty(true)
                  }}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
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
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="ev-status-note"
                  className={
                    requiresStatusNote
                      ? 'isr-admin-required'
                      : ''
                  }
                >
                  Status note
                </Label>

                <Input
                  id="ev-status-note"
                  value={statusNote}
                  onChange={(
                    inputEvent,
                  ) =>
                    change(
                      setStatusNote,
                      inputEvent
                        .target
                        .value,
                    )
                  }
                  placeholder="Explain a cancellation, postponement or other important change"
                />
              </div>
            </div>
          </section>

          <section className="isr-admin-fieldset">
            <h3 className="isr-admin-fieldset-title">
              Poster & internal ownership
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label
                  htmlFor="ev-image"
                  className={
                    isEdit
                      ? ''
                      : 'isr-admin-required'
                  }
                >
                  {isEdit
                    ? 'Replace poster'
                    : 'Event poster'}
                </Label>

                <Input
                  id="ev-image"
                  type="file"
                  accept="image/*"
                  onChange={(
                    inputEvent,
                  ) => {
                    setImageFile(
                      inputEvent
                        .target
                        .files?.[0] ??
                        null,
                    )

                    setDirty(true)
                  }}
                  className="cursor-pointer"
                />

                <p className="text-xs text-gray-500">
                  {imageLabel}
                </p>

                {event?.imageUrl && (
                  <a
                    href={event.imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex text-xs font-bold text-isr-turquoise hover:text-isr-dark-red"
                  >
                    View current poster →
                  </a>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="ev-owner">
                  Internal content owner
                </Label>

                <Input
                  id="ev-owner"
                  value={contentOwner}
                  onChange={(
                    inputEvent,
                  ) =>
                    change(
                      setContentOwner,
                      inputEvent
                        .target
                        .value,
                    )
                  }
                  placeholder="e.g. Events Team"
                />

                <p className="text-xs text-gray-500">
                  Internal management information.
                  This is not displayed publicly.
                </p>
              </div>
            </div>
          </section>

          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800"
            >
              {error}
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={
              requestClose
            }
            disabled={
              submitting
            }
          >
            Cancel
          </Button>

          <Button
            onClick={
              handleSave
            }
            disabled={
              submitting
            }
            className="bg-isr-dark-red text-white hover:bg-isr-dark-red/90"
          >
            {submitting
              ? 'Saving…'
              : isEdit
                ? 'Save changes'
                : 'Create event'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
