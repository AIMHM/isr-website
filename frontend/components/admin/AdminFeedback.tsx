'use client'

type Props = {
  message: string
  type?: 'success' | 'error' | 'info'
  onDismiss?: () => void
}

const classes = {
  success:
    'border-emerald-200 bg-emerald-50 text-emerald-800',
  error:
    'border-red-200 bg-red-50 text-red-800',
  info:
    'border-isr-light-blue/40 bg-isr-light-blue/10 text-isr-dark-red',
}

export function AdminFeedback({
  message,
  type = 'info',
  onDismiss,
}: Props) {
  if (!message) return null

  return (
    <div
      role={
        type === 'error'
          ? 'alert'
          : 'status'
      }
      className={`flex items-start justify-between gap-4 rounded-xl border px-4 py-3 text-sm ${classes[type]}`}
    >
      <p className="font-medium">
        {message}
      </p>

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 font-bold opacity-60 transition hover:opacity-100"
          aria-label="Dismiss message"
        >
          ×
        </button>
      )}
    </div>
  )
}
