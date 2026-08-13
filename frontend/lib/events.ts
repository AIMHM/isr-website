import {
  MELBOURNE_TIME_ZONE,
} from '@/lib/dateTime'
import { API_BASE_URL } from '@/lib/api'
import { MOCK_EVENTS } from '@/lib/mockData'
import { IS_LOCAL_MOCK_DATA } from '@/lib/mockMode'
import {
  IS_LOCAL_ADMIN_MODE,
  localAdminApiUrl,
} from '@/lib/localAdminMode'

export type EventStatus =
  | 'scheduled'
  | 'sold-out'
  | 'postponed'
  | 'cancelled'
  | 'completed'

export type EventRegistrationMode =
  | 'none'
  | 'required'
  | 'optional'
  | 'closed'
  | 'unknown'

export type Event = {
  id: number
  name: string
  date: string
  imageUrl: string
  description: string
  ticketUrl: string | null

  registrationMode?: EventRegistrationMode
  category?: string | null

  endDate?: string | null
  venue?: string | null
  campus?: string | null
  audience?: string | null
  price?: string | null
  accessibility?: string | null
  status?: EventStatus
  statusNote?: string | null
  contentOwner?: string | null
  reviewedAt?: string | null
}

export type EventsFilter = 'all' | 'upcoming' | 'past'

export type EventsResponse = {
  data: Event[]
}

export type EventResponse = {
  data: Event
}


function formatDatetimeLocalInTimeZone(
  date: Date,
  timeZone: string,
): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(date)

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? ''

  let hour = get('hour')
  if (hour === '24') hour = '00'

  return `${get('year')}-${get('month')}-${get('day')}T${hour}:${get(
    'minute',
  )}`
}

export function toDatetimeLocalValue(isoDate: string): string {
  return formatDatetimeLocalInTimeZone(
    new Date(isoDate),
    MELBOURNE_TIME_ZONE,
  )
}

export function fromDatetimeLocalValue(
  localValue: string,
): string {
  const [datePart, timePart] = localValue.split('T')
  const [year, month, day] = datePart.split('-').map(Number)
  const [hour, minute] = timePart.split(':').map(Number)

  let utcMs = Date.UTC(
    year,
    month - 1,
    day,
    hour,
    minute,
  )

  for (let i = 0; i < 4; i++) {
    const formatted = formatDatetimeLocalInTimeZone(
      new Date(utcMs),
      MELBOURNE_TIME_ZONE,
    )

    if (formatted === localValue) {
      return new Date(utcMs).toISOString()
    }

    const [formattedDate, formattedTime] =
      formatted.split('T')

    const [
      formattedYear,
      formattedMonth,
      formattedDay,
    ] = formattedDate.split('-').map(Number)

    const [formattedHour, formattedMinute] =
      formattedTime.split(':').map(Number)

    utcMs +=
      Date.UTC(
        year,
        month - 1,
        day,
        hour,
        minute,
      ) -
      Date.UTC(
        formattedYear,
        formattedMonth - 1,
        formattedDay,
        formattedHour,
        formattedMinute,
      )
  }

  return new Date(utcMs).toISOString()
}

export function formatEventDate(isoDate: string): {
  date: string
  time: string
} {
  const parsed = new Date(isoDate)

  const date = new Intl.DateTimeFormat('en-AU', {
    timeZone: MELBOURNE_TIME_ZONE,
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(parsed)

  const time = new Intl.DateTimeFormat('en-AU', {
    timeZone: MELBOURNE_TIME_ZONE,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(parsed)

  return { date, time }
}

export function formatEventTime(isoDate: string): string {
  return new Intl.DateTimeFormat('en-AU', {
    timeZone: MELBOURNE_TIME_ZONE,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(isoDate))
}

export function isEventPast(isoDate: string): boolean {
  return new Date(isoDate).getTime() < Date.now()
}

export function getEventStatus(
  event: Event,
): EventStatus {
  const effectiveEnd =
    event.endDate ?? event.date

  if (
    event.status === 'scheduled' &&
    isEventPast(effectiveEnd)
  ) {
    return 'completed'
  }

  if (event.status) {
    return event.status
  }

  return isEventPast(effectiveEnd)
    ? 'completed'
    : 'scheduled'
}
export function getEventStatusLabel(
  status: EventStatus,
): string {
  const labels: Record<EventStatus, string> = {
    scheduled: 'Upcoming',
    'sold-out': 'Sold out',
    postponed: 'Postponed',
    cancelled: 'Cancelled',
    completed: 'Completed',
  }

  return labels[status]
}

export function getEventRegistrationMode(
  event: Event,
): EventRegistrationMode {
  if (event.registrationMode) {
    return event.registrationMode
  }

  if (event.ticketUrl) {
    return 'required'
  }

  return 'unknown'
}

export function getEventRegistrationLabel(
  event: Event,
): string {
  const mode =
    getEventRegistrationMode(
      event,
    )

  const labels:
    Record<
      EventRegistrationMode,
      string
    > = {
      none:
        'No registration required',
      required:
        'Registration required',
      optional:
        'Registration optional',
      closed:
        'Registration closed',
      unknown:
        'Registration information to be confirmed',
    }

  return labels[mode]
}

export function canRegisterForEvent(
  event: Event,
): boolean {
  const status =
    getEventStatus(
      event,
    )

  const mode =
    getEventRegistrationMode(
      event,
    )

  return (
    Boolean(event.ticketUrl) &&
    (
      mode === 'required' ||
      mode === 'optional'
    ) &&
    status !== 'cancelled' &&
    status !== 'postponed' &&
    status !== 'completed' &&
    status !== 'sold-out'
  )
}

export function sortEventsForDisplay(
  events: Event[],
): Event[] {
  const now = Date.now()

  return [...events].sort((a, b) => {
    const aTime = new Date(a.date).getTime()
    const bTime = new Date(b.date).getTime()

    const aUpcoming =
      getEventStatus(a) !== 'completed' &&
      aTime >= now

    const bUpcoming =
      getEventStatus(b) !== 'completed' &&
      bTime >= now

    if (aUpcoming !== bUpcoming) {
      return aUpcoming ? -1 : 1
    }

    if (aUpcoming) {
      return aTime - bTime
    }

    return bTime - aTime
  })
}

function fetchOptions(): RequestInit | undefined {
  return typeof window === 'undefined'
    ? { next: { revalidate: 60 } }
    : undefined
}

export async function fetchEvents(
  filter: EventsFilter = 'all',
): Promise<Event[]> {
  if (IS_LOCAL_ADMIN_MODE) {
    const query =
      filter === 'all'
        ? ''
        : `?filter=${filter}`

    const response =
      await fetch(
        localAdminApiUrl(
          `/events${query}`,
        ),
        {
          cache: 'no-store',
        },
      )

    if (!response.ok) {
      throw new Error(
        'Failed to fetch local events',
      )
    }

    const json =
      (await response.json()) as EventsResponse

    return sortEventsForDisplay(
      json.data,
    )
  }

  if (IS_LOCAL_MOCK_DATA) {
    const events = MOCK_EVENTS.map(
      (event) => ({
        ...event,
      }),
    ) as Event[]

    const filtered =
      events.filter((event) => {
        const status =
          getEventStatus(event)

        if (
          filter === 'upcoming'
        ) {
          return (
            status !==
            'completed'
          )
        }

        if (filter === 'past') {
          return (
            status ===
            'completed'
          )
        }

        return true
      })

    return sortEventsForDisplay(
      filtered,
    )
  }

  const query =
    filter === 'all'
      ? ''
      : `?filter=${filter}`

  const response =
    await fetch(
      `${API_BASE_URL}/api/events${query}`,
      fetchOptions(),
    )

  if (!response.ok) {
    throw new Error(
      'Failed to fetch events',
    )
  }

  const json =
    (await response.json()) as EventsResponse

  return sortEventsForDisplay(
    json.data,
  )
}

export async function fetchEventById(
  id: number,
): Promise<Event | null> {
  if (IS_LOCAL_ADMIN_MODE) {
    const response =
      await fetch(
        localAdminApiUrl(
          `/events/${id}`,
        ),
        {
          cache: 'no-store',
        },
      )

    if (
      response.status === 404
    ) {
      return null
    }

    if (!response.ok) {
      throw new Error(
        'Failed to fetch local event',
      )
    }

    const json =
      (await response.json()) as EventResponse

    return json.data
  }

  if (IS_LOCAL_MOCK_DATA) {
    const event =
      MOCK_EVENTS.find(
        (item) =>
          item.id === id,
      )

    return event
      ? ({
          ...event,
        } as Event)
      : null
  }

  const response =
    await fetch(
      `${API_BASE_URL}/api/events/${id}`,
      fetchOptions(),
    )

  if (
    response.status === 404
  ) {
    return null
  }

  if (!response.ok) {
    throw new Error(
      'Failed to fetch event',
    )
  }

  const json =
    (await response.json()) as EventResponse

  return json.data
}