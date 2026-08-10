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
  Switch,
} from '@/components/ui/switch'
import {
  fromDatetimeLocalValue,
  toDatetimeLocalValue,
} from '@/lib/events'
import type {
  Announcement,
  AnnouncementPriority,
} from '@/lib/announcements'

interface Props {
  open: boolean
  announcement:
    | Announcement
    | null
  onClose: () => void
  onSubmit:
    (
      formData: FormData,
    ) => Promise<void>
}

const PRIORITIES: {
  value: AnnouncementPriority
  label: string
  description: string
}[] = [
  {
    value: 'normal',
    label: 'Normal',
    description:
      'Standard ISR information.',
  },
  {
    value: 'important',
    label: 'Important',
    description:
      'Something students should pay attention to.',
  },
  {
    value: 'urgent',
    label: 'Urgent',
    description:
      'Time-sensitive information requiring prominent display.',
  },
]

function validActionUrl(
  value: string,
): boolean {
  if (!value.trim()) {
    return true
  }

  if (
    value.startsWith('/') &&
    !value.startsWith('//')
  ) {
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

export function AnnouncementModal({
  open,
  announcement,
  onClose,
  onSubmit,
}: Props) {
  const isEdit =
    announcement !== null

  const [
    title,
    setTitle,
  ] =
    useState('')

  const [
    body,
    setBody,
  ] =
    useState('')

  const [
    pinned,
    setPinned,
  ] =
    useState(false)

  const [
    priority,
    setPriority,
  ] =
    useState<AnnouncementPriority>(
      'normal',
    )

  const [
    expiresAt,
    setExpiresAt,
  ] =
    useState('')

  const [
    actionLabel,
    setActionLabel,
  ] =
    useState('')

  const [
    actionUrl,
    setActionUrl,
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
    setTitle(
      announcement?.title ??
        '',
    )

    setBody(
      announcement?.body ??
        '',
    )

    setPinned(
      announcement?.pinned ??
        false,
    )

    setPriority(
      announcement?.priority ??
        'normal',
    )

    setExpiresAt(
      announcement?.expiresAt
        ? toDatetimeLocalValue(
            announcement.expiresAt,
          )
        : '',
    )

    setActionLabel(
      announcement?.actionLabel ??
        '',
    )

    setActionUrl(
      announcement?.actionUrl ??
        '',
    )

    setImageFile(null)

    setImagePreview(
      announcement?.imageUrl ||
        null,
    )

    setError('')
    setSubmitting(false)
  }, [
    announcement,
    open,
  ])

  useEffect(() => {
    if (!imageFile) {
      setImagePreview(
        announcement?.imageUrl ||
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
    announcement?.imageUrl,
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

    if (
      ![
        'image/jpeg',
        'image/png',
        'image/webp',
      ].includes(
        file.type,
      )
    ) {
      setError(
        'Image must be JPEG, PNG or WebP.',
      )
      return
    }

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      setError(
        'Image must be 5 MB or smaller.',
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

    if (
      !title.trim() ||
      !body.trim()
    ) {
      setError(
        'Title and update text are required.',
      )
      return
    }

    if (
      Boolean(
        actionLabel.trim(),
      ) !==
      Boolean(
        actionUrl.trim(),
      )
    ) {
      setError(
        'Action label and action link must be provided together.',
      )
      return
    }

    if (
      !validActionUrl(
        actionUrl,
      )
    ) {
      setError(
        'Action link must be a website path such as /pray or a full http/https URL.',
      )
      return
    }

    if (
      expiresAt &&
      Number.isNaN(
        new Date(
          expiresAt,
        ).getTime(),
      )
    ) {
      setError(
        'Expiry date is invalid.',
      )
      return
    }

    setError('')
    setSubmitting(true)

    const formData =
      new FormData()

    formData.set(
      'title',
      title.trim(),
    )

    formData.set(
      'body',
      body.trim(),
    )

    formData.set(
      'pinned',
      pinned
        ? 'true'
        : 'false',
    )

    formData.set(
      'priority',
      priority,
    )

    formData.set(
      'expiresAt',
      expiresAt
        ? fromDatetimeLocalValue(
            expiresAt,
          )
        : '',
    )

    formData.set(
      'actionLabel',
      actionLabel.trim(),
    )

    formData.set(
      'actionUrl',
      actionUrl.trim(),
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
          : 'The ISR Update could not be saved.',
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
        className="max-h-[92vh] overflow-y-auto sm:max-w-2xl"
      >
        <DialogHeader>
          <DialogTitle>
            {isEdit
              ? 'Edit ISR Update'
              : 'Create ISR Update'}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSave}
          className="space-y-7"
        >
          <section className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="an-title">
                Title *
              </Label>

              <Input
                id="an-title"
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value,
                  )
                }
                placeholder="e.g. Bundoora Jumu’ah Time Change"
                disabled={submitting}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="an-body">
                Update text *
              </Label>

              <Textarea
                id="an-body"
                value={body}
                onChange={(e) =>
                  setBody(
                    e.target.value,
                  )
                }
                rows={6}
                placeholder="What has changed and what should students do?"
                disabled={submitting}
              />

              <p className="text-xs text-muted-foreground">
                {
                  body.length
                } characters
              </p>
            </div>
          </section>

          <section className="space-y-4 border-t pt-6">
            <div>
              <h3 className="font-bold text-isr-dark-red">
                Visibility
              </h3>

              <p className="mt-1 text-xs text-muted-foreground">
                Use urgency carefully so genuinely important notices remain meaningful.
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="an-priority">
                Priority
              </Label>

              <select
                id="an-priority"
                value={priority}
                onChange={(e) =>
                  setPriority(
                    e.target
                      .value as AnnouncementPriority,
                  )
                }
                disabled={submitting}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none transition focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {PRIORITIES.map(
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

              <p className="text-xs text-muted-foreground">
                {
                  PRIORITIES.find(
                    (item) =>
                      item.value ===
                      priority,
                  )?.description
                }
              </p>
            </div>

            <div className="flex items-center justify-between gap-5 rounded-xl border p-4">
              <div>
                <p className="text-sm font-semibold text-isr-dark-red">
                  Pin this update
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Pinned updates are prioritised above ordinary notices.
                </p>
              </div>

              <Switch
                checked={pinned}
                onCheckedChange={
                  setPinned
                }
                disabled={submitting}
                aria-label="Pin this ISR Update"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="an-expires">
                Expire automatically
              </Label>

              <Input
                id="an-expires"
                type="datetime-local"
                value={expiresAt}
                onChange={(e) =>
                  setExpiresAt(
                    e.target.value,
                  )
                }
                disabled={submitting}
              />

              <p className="text-xs text-muted-foreground">
                Useful for room changes, event notices and other temporary information. Leave blank for no automatic expiry.
              </p>
            </div>
          </section>

          <section className="space-y-4 border-t pt-6">
            <div>
              <h3 className="font-bold text-isr-dark-red">
                Optional action
              </h3>

              <p className="mt-1 text-xs text-muted-foreground">
                Add a button only when there is a clear next step.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="an-action-label">
                  Button text
                </Label>

                <Input
                  id="an-action-label"
                  value={actionLabel}
                  onChange={(e) =>
                    setActionLabel(
                      e.target.value,
                    )
                  }
                  placeholder="View prayer information"
                  disabled={submitting}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="an-action-url">
                  Button destination
                </Label>

                <Input
                  id="an-action-url"
                  value={actionUrl}
                  onChange={(e) =>
                    setActionUrl(
                      e.target.value,
                    )
                  }
                  placeholder="/pray or https://..."
                  disabled={submitting}
                />
              </div>
            </div>
          </section>

          <section className="space-y-4 border-t pt-6">
            <div>
              <h3 className="font-bold text-isr-dark-red">
                Image
              </h3>

              <p className="mt-1 text-xs text-muted-foreground">
                Optional. JPEG, PNG or WebP. Maximum 5 MB.
              </p>
            </div>

            {imagePreview && (
              <div className="overflow-hidden rounded-2xl border bg-isr-cream">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imagePreview}
                  alt="ISR Update image preview"
                  className="max-h-72 w-full object-contain"
                />
              </div>
            )}

            <Input
              id="an-image"
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
          </section>

          <section className="rounded-2xl bg-isr-cream/60 p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-isr-turquoise">
              Preview
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-isr-dark-red">
                {
                  priority ===
                  'normal'
                    ? 'Update'
                    : priority ===
                        'important'
                      ? 'Important'
                      : 'Urgent'
                }
              </span>

              {pinned && (
                <span className="rounded-full bg-isr-dark-red px-3 py-1 text-xs font-bold text-white">
                  Pinned
                </span>
              )}
            </div>

            <h3 className="mt-4 text-xl font-bold text-isr-dark-red">
              {
                title.trim() ||
                'ISR Update title'
              }
            </h3>

            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-gray-700">
              {
                body.trim() ||
                'Your update text will appear here.'
              }
            </p>
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
                  ? 'Save ISR Update'
                  : 'Publish ISR Update'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
