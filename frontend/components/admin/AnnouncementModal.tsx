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
    Announcement |
    null
  onClose: () => void
  onSubmit: (
    formData: FormData,
  ) => Promise<void>
}

function validActionUrl(
  value: string,
): boolean {
  if (!value.trim()) {
    return true
  }

  if (
    value.startsWith(
      '/',
    )
  ) {
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

export function AnnouncementModal({
  open,
  announcement,
  onClose,
  onSubmit,
}: Props) {
  const isEdit =
    announcement !==
    null

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
            announcement
              .expiresAt,
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

    setContentOwner(
      announcement?.contentOwner ??
        '',
    )

    setImageFile(null)
    setError('')
    setDirty(false)
  }, [
    announcement,
    open,
  ])

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
        'Discard unsaved ISR Update changes?',
      )
    ) {
      return
    }

    onClose()
  }

  async function handleSave() {
    if (
      !title.trim() ||
      !body.trim()
    ) {
      setError(
        'Title and update text are required.',
      )

      return
    }

    const hasActionLabel =
      Boolean(
        actionLabel.trim(),
      )

    const hasActionUrl =
      Boolean(
        actionUrl.trim(),
      )

    if (
      hasActionLabel !==
      hasActionUrl
    ) {
      setError(
        'Action label and action URL must either both be supplied or both be blank.',
      )

      return
    }

    if (
      !validActionUrl(
        actionUrl,
      )
    ) {
      setError(
        'Action URL must be an internal path beginning with / or a valid http/https URL.',
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
          : 'The ISR Update could not be saved.',
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
              ? 'Edit ISR Update'
              : 'Create ISR Update'}
          </DialogTitle>
        </DialogHeader>

        <p className="text-sm text-gray-600">
          Use ISR Updates for operational or
          time-sensitive information students may
          need to act on.
        </p>

        <div className="space-y-5 py-2">
          <section className="isr-admin-fieldset">
            <h3 className="isr-admin-fieldset-title">
              Update content
            </h3>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="an-title"
                  className="isr-admin-required"
                >
                  Title
                </Label>

                <Input
                  id="an-title"
                  value={title}
                  onChange={(
                    inputEvent,
                  ) =>
                    change(
                      setTitle,
                      inputEvent
                        .target
                        .value,
                    )
                  }
                  placeholder="What changed?"
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="an-body"
                  className="isr-admin-required"
                >
                  Update text
                </Label>

                <Textarea
                  id="an-body"
                  value={body}
                  onChange={(
                    inputEvent,
                  ) =>
                    change(
                      setBody,
                      inputEvent
                        .target
                        .value,
                    )
                  }
                  rows={7}
                  placeholder="Give students the information they actually need."
                />

                <p className="text-xs text-gray-500">
                  {body.length} characters
                </p>
              </div>
            </div>
          </section>

          <section className="isr-admin-fieldset">
            <h3 className="isr-admin-fieldset-title">
              Visibility & priority
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="an-priority">
                  Priority
                </Label>

                <select
                  id="an-priority"
                  value={priority}
                  onChange={(
                    inputEvent,
                  ) => {
                    setPriority(
                      inputEvent
                        .target
                        .value as AnnouncementPriority,
                    )

                    setDirty(true)
                  }}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
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
                  <span className="ml-1 font-normal text-gray-400">
                    optional
                  </span>
                </Label>

                <Input
                  id="an-expiry"
                  type="datetime-local"
                  value={expiresAt}
                  onChange={(
                    inputEvent,
                  ) =>
                    change(
                      setExpiresAt,
                      inputEvent
                        .target
                        .value,
                    )
                  }
                />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-4 rounded-xl border bg-white px-4 py-4">
              <div>
                <Label htmlFor="an-pinned">
                  Pin update
                </Label>

                <p className="mt-1 text-xs leading-relaxed text-gray-500">
                  Pinned updates receive stronger
                  prominence and appear before ordinary
                  updates.
                </p>
              </div>

              <Switch
                id="an-pinned"
                checked={pinned}
                onCheckedChange={(
                  checked,
                ) => {
                  setPinned(
                    checked,
                  )

                  setDirty(true)
                }}
              />
            </div>
          </section>

          <section className="isr-admin-fieldset">
            <h3 className="isr-admin-fieldset-title">
              Optional action
            </h3>

            <p className="mb-4 text-xs leading-relaxed text-gray-500">
              Only add an action when students genuinely
              need somewhere to go next.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="an-action-label">
                  Button label
                </Label>

                <Input
                  id="an-action-label"
                  value={actionLabel}
                  onChange={(
                    inputEvent,
                  ) =>
                    change(
                      setActionLabel,
                      inputEvent
                        .target
                        .value,
                    )
                  }
                  placeholder="e.g. Register now"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="an-action-url">
                  Button destination
                </Label>

                <Input
                  id="an-action-url"
                  value={actionUrl}
                  onChange={(
                    inputEvent,
                  ) =>
                    change(
                      setActionUrl,
                      inputEvent
                        .target
                        .value,
                    )
                  }
                  placeholder="/events or https://..."
                />
              </div>
            </div>
          </section>

          <section className="isr-admin-fieldset">
            <h3 className="isr-admin-fieldset-title">
              Image & internal ownership
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="an-image">
                  Image
                  <span className="ml-1 font-normal text-gray-400">
                    optional
                  </span>
                </Label>

                <Input
                  id="an-image"
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

                {imageFile && (
                  <p className="text-xs text-gray-500">
                    Selected: {imageFile.name}
                  </p>
                )}

                {announcement?.imageUrl && (
                  <a
                    href={
                      announcement.imageUrl
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex text-xs font-bold text-isr-turquoise hover:text-isr-dark-red"
                  >
                    View current image →
                  </a>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="an-owner">
                  Internal content owner
                </Label>

                <Input
                  id="an-owner"
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
                  placeholder="e.g. Administration"
                />

                <p className="text-xs text-gray-500">
                  Internal management information only.
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
                : 'Create update'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
