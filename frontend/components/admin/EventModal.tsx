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
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
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

const STATUSES: {
  value: EventStatus
  label: string
}[] = [
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'sold-out', label: 'Sold out' },
  { value: 'postponed', label: 'Postponed' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'completed', label: 'Completed' },
]

export function EventModal({
  open,
  event,
  onClose,
  onSubmit,
}: Props) {
  const isEdit = event !== null

  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [description, setDescription] = useState('')
  const [campus, setCampus] = useState('')
  const [venue, setVenue] = useState('')
  const [audience, setAudience] = useState('')
  const [price, setPrice] = useState('')
  const [ticketUrl, setTicketUrl] = useState('')
  const [accessibility, setAccessibility] = useState('')
  const [status, setStatus] =
    useState<EventStatus>('scheduled')
  const [statusNote, setStatusNote] = useState('')
  const [imageFile, setImageFile] =
    useState<File | null>(null)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] =
    useState(false)

  useEffect(() => {
    setName(event?.name ?? '')

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
      event?.description ?? '',
    )
    setCampus(event?.campus ?? '')
    setVenue(event?.venue ?? '')
    setAudience(event?.audience ?? '')
    setPrice(event?.price ?? '')
    setTicketUrl(event?.ticketUrl ?? '')
    setAccessibility(
      event?.accessibility ?? '',
    )
    setStatus(
      event?.status ?? 'scheduled',
    )
    setStatusNote(
      event?.statusNote ?? '',
    )
    setImageFile(null)
    setError('')
  }, [event, open])

  async function handleSave() {
    if (
      !name.trim() ||
      !date ||
      !description.trim()
    ) {
      setError(
        'Name, start time and description are required',
      )
      return
    }

    if (!isEdit && !imageFile) {
      setError(
        'An event poster is required',
      )
      return
    }

    const start =
      fromDatetimeLocalValue(date)

    const end = endDate
      ? fromDatetimeLocalValue(
          endDate,
        )
      : ''

    if (
      end &&
      new Date(end).getTime() <
        new Date(start).getTime()
    ) {
      setError(
        'End time cannot be before start time',
      )
      return
    }

    const formData = new FormData()

    formData.set('name', name.trim())
    formData.set('date', start)
    formData.set('endDate', end)

    formData.set(
      'description',
      description.trim(),
    )

    formData.set(
      'campus',
      campus.trim(),
    )

    formData.set(
      'venue',
      venue.trim(),
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
      'ticketUrl',
      ticketUrl.trim(),
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

    setSubmitting(true)
    setError('')

    try {
      await onSubmit(formData)
      onClose()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose()
      }}
    >
      <DialogContent
        className="max-h-[90vh] overflow-y-auto sm:max-w-2xl"
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle>
            {isEdit
              ? 'Edit Event'
              : 'New Event'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="ev-name">
              Event name
            </Label>

            <Input
              id="ev-name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="ev-start">
                Start
              </Label>

              <Input
                id="ev-start"
                type="datetime-local"
                value={date}
                onChange={(e) =>
                  setDate(e.target.value)
                }
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="ev-end">
                End
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
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="ev-description">
              Description
            </Label>

            <Textarea
              id="ev-description"
              rows={5}
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value,
                )
              }
            />
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
                  setCampus(e.target.value)
                }
                placeholder="City campus"
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
                  setVenue(e.target.value)
                }
                placeholder="Building, level, room"
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
                placeholder="Everyone, Brothers, Sisters..."
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
                  setPrice(e.target.value)
                }
                placeholder="Free or $15"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="ev-ticket">
              Registration URL
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
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="ev-accessibility">
              Accessibility
            </Label>

            <Textarea
              id="ev-accessibility"
              rows={3}
              value={accessibility}
              onChange={(e) =>
                setAccessibility(
                  e.target.value,
                )
              }
            />
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
                className="flex h-9 w-full rounded-md border bg-white px-3 text-sm"
              >
                {STATUSES.map(
                  (option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ),
                )}
              </select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="ev-status-note">
                Status message
              </Label>

              <Input
                id="ev-status-note"
                value={statusNote}
                onChange={(e) =>
                  setStatusNote(
                    e.target.value,
                  )
                }
                placeholder="New date being confirmed"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="ev-image">
              {isEdit
                ? 'Replace poster'
                : 'Event poster'}
            </Label>

            {event?.imageUrl && (
              <p className="text-xs text-muted-foreground">
                Current poster:{' '}
                <a
                  href={event.imageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-isr-turquoise underline"
                >
                  view
                </a>
              </p>
            )}

            <Input
              id="ev-image"
              type="file"
              accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
              onChange={(e) =>
                setImageFile(
                  e.target.files?.[0] ??
                    null,
                )
              }
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={submitting}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSave}
            disabled={submitting}
            className="bg-isr-dark-red text-isr-cream hover:bg-isr-dark-red/90"
          >
            {submitting
              ? 'Saving...'
              : isEdit
                ? 'Save Changes'
                : 'Create Event'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
