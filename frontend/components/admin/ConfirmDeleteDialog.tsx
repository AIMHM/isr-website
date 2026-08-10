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

interface Props {
  open: boolean
  title: string
  description: string
  onConfirm: () => Promise<void>
  onCancel: () => void
}

export function ConfirmDeleteDialog({
  open,
  title,
  description,
  onConfirm,
  onCancel,
}: Props) {
  const [
    deleting,
    setDeleting,
  ] =
    useState(false)

  const [
    error,
    setError,
  ] =
    useState('')

  useEffect(() => {
    if (open) {
      setDeleting(false)
      setError('')
    }
  }, [open])

  async function handleConfirm() {
    if (deleting) return

    setDeleting(true)
    setError('')

    try {
      await onConfirm()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Delete failed. Please try again.',
      )

      setDeleting(false)
    }
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={(nextOpen) => {
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

        {error && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          >
            {error}
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={onCancel}
            disabled={deleting}
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={deleting}
            onClick={(event) => {
              event.preventDefault()
              void handleConfirm()
            }}
            className="bg-isr-bright-red text-white hover:bg-isr-bright-red/90"
          >
            {deleting
              ? 'Deleting…'
              : 'Delete permanently'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
