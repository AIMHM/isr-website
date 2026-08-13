import {
  getEventStatus,
  type Event,
  type EventStatus,
} from '@/lib/events'
import {
  MELBOURNE_TIME_ZONE,
} from '@/lib/dateTime'

export const EVENT_STATUS_LABELS: Record<
  EventStatus,
  string
> = {
  scheduled:
    'Scheduled',
  'sold-out':
    'Sold out',
  postponed:
    'Postponed',
  cancelled:
    'Cancelled',
  completed:
    'Completed',
}

export const EVENT_STATUS_CLASSES: Record<
  EventStatus,
  string
> = {
  scheduled:
    'bg-isr-turquoise/10 text-isr-turquoise',
  'sold-out':
    'bg-isr-yellow/70 text-isr-dark-red',
  postponed:
    'bg-amber-100 text-amber-800',
  cancelled:
    'bg-red-100 text-red-800',
  completed:
    'bg-gray-100 text-gray-700',
}

export function eventStatus(
  event: Event,
): EventStatus {
  return getEventStatus(event)
}

export function formatEventDate(
  value: string,
): string {
  const date =
    new Date(value)

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return 'Date to be confirmed'
  }

  return new Intl.DateTimeFormat(
    'en-AU',
    {
      timeZone:
        MELBOURNE_TIME_ZONE,
      weekday:
        'short',
      day:
        'numeric',
      month:
        'short',
      year:
        'numeric',
      hour:
        'numeric',
      minute:
        '2-digit',
    },
  ).format(date)
}

export function formatEventDay(
  value: string,
): {
  day: string
  month: string
} {
  const date =
    new Date(value)

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return {
      day:
        '–',
      month:
        'TBC',
    }
  }

  return {
    day:
      new Intl.DateTimeFormat(
        'en-AU',
        {
          timeZone:
            MELBOURNE_TIME_ZONE,
          day:
            '2-digit',
        },
      ).format(date),

    month:
      new Intl.DateTimeFormat(
        'en-AU',
        {
          timeZone:
            MELBOURNE_TIME_ZONE,
          month:
            'short',
        },
      )
        .format(date)
        .toUpperCase(),
  }
}
