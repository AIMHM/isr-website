'use client'

import {
  useEffect,
  useState,
} from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  Input,
} from '@/components/ui/input'
import {
  Label,
} from '@/components/ui/label'

interface Props {
  open: boolean
  title: string
  description: string
  confirmationText?: string
  onConfirm: () => Promise<void>
  onCancel: () => void
}

export function ConfirmDeleteDialog({
  open,
  title,
  description,
  confirmationText,
  onConfirm,
  onCancel,
}: Props) {
  const [
    deleting,
    setDeleting,
  ] =
    useState(false)

  const [
    typed,
    setTyped,
  ] =
    useState('')

  useEffect(() => {
    if (open) {
      setTyped('')
    }
  }, [open])

  const confirmed =
    !confirmationText ||
    typed.trim() ===
      confirmationText.trim()

  async function handleConfirm() {
    if (!confirmed) {
      return
    }

    setDeleting(true)

    try {
      await onConfirm()
    }
    finally {
      setDeleting(false)
    }
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={(
        nextOpen,
      ) => {
        if (
          !nextOpen &&
          !deleting
        ) {
          onCancel()
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title}
          </AlertDialogTitle>

          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {confirmationText && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4">
            <Label
              htmlFor="delete-confirmation"
              className="text-sm text-red-900"
            >
              Type{' '}
              <strong>
                {confirmationText}
              </strong>{' '}
              to confirm
            </Label>

            <Input
              id="delete-confirmation"
              value={typed}
              onChange={(
                event,
              ) =>
                setTyped(
                  event.target.value,
                )
              }
              autoComplete="off"
              className="mt-2 bg-white"
            />
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={
              onCancel
            }
            disabled={
              deleting
            }
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={
              handleConfirm
            }
            disabled={
              deleting ||
              !confirmed
            }
            className="bg-isr-bright-red text-white hover:bg-isr-bright-red/90"
          >
            {deleting
              ? 'Deleting…'
              : 'Permanently delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
