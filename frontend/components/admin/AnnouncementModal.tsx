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
import { Switch } from '@/components/ui/switch'
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
  announcement: Announcement | null
  onClose: () => void
  onSubmit: (
    formData: FormData,
  ) => Promise<void>
}

export function AnnouncementModal({
  open,
  announcement,
  onClose,
  onSubmit,
}: Props) {
  const isEdit =
    announcement !== null

  const [title, setTitle] =
    useState('')
  const [body, setBody] =
    useState('')
  const [pinned, setPinned] =
    useState(false)
  const [priority, setPriority] =
    useState<AnnouncementPriority>(
      'normal',
    )
  const [expiresAt, setExpiresAt] =
    useState('')
  const [actionLabel, setActionLabel] =
    useState('')
  const [actionUrl, setActionUrl] =
    useState('')
  const [imageFile, setImageFile] =
    useState<File | null>(null)
  const [error, setError] =
    useState('')
  const [submitting, setSubmitting] =
    useState(false)

  useEffect(() => {
    setTitle(
      announcement?.title ?? '',
    )
    setBody(
      announcement?.body ?? '',
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
      announcement?.actionUrl ?? '',
    )

    setImageFile(null)
    setError('')
  }, [announcement, open])

  async function handleSave() {
    if (
      !title.trim() ||
      !body.trim()
    ) {
      setError(
        'Title and update text are required',
      )
      return
    }

    if (
      Boolean(actionLabel.trim()) !==
      Boolean(actionUrl.trim())
    ) {
      setError(
        'Action label and action link must be provided together',
      )
      return
    }

    const formData = new FormData()

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
      pinned ? 'true' : 'false',
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
        className="max-h-[90vh] overflow-y-auto sm:max-w-xl"
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle>
            {isEdit
              ? 'Edit ISR Update'
              : 'New ISR Update'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="an-title">
              Title
            </Label>

            <Input
              id="an-title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="an-body">
              Update
            </Label>

            <Textarea
              id="an-body"
              rows={5}
              value={body}
              onChange={(e) =>
                setBody(e.target.value)
              }
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
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
                className="flex h-9 w-full rounded-md border bg-white px-3 text-sm"
              >
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
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="an-expiry">
                Expiry
              </Label>

              <Input
                id="an-expiry"
                type="datetime-local"
                value={expiresAt}
                onChange={(e) =>
                  setExpiresAt(
                    e.target.value,
                  )
                }
              />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border px-4 py-3">
            <div>
              <p className="text-sm font-medium">
                Pin update
              </p>

              <p className="text-xs text-muted-foreground">
                Keeps this above standard updates.
              </p>
            </div>

            <Switch
              checked={pinned}
              onCheckedChange={
                setPinned
              }
            />
          </div>

          <div className="rounded-xl border bg-gray-50 p-4">
            <p className="text-sm font-semibold">
              Optional action
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Fill in both fields or leave both blank.
            </p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
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
                  placeholder="View details"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="an-action-url">
                  Link
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
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="an-image">
              Image
            </Label>

            <Input
              id="an-image"
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
                : 'Create ISR Update'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
