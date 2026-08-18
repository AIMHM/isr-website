import {
  IS_LOCAL_ADMIN_MODE,
  localAdminApiUrl,
} from '@/lib/localAdminMode'
import {
  API_BASE_URL,
} from '@/lib/api'
import {
  IS_LOCAL_MOCK_DATA,
} from '@/lib/mockMode'
import {
  fromDatetimeLocalValue,
} from '@/lib/events'
import {
  MELBOURNE_TIME_ZONE,
} from '@/lib/dateTime'
import type {
  CampusId,
  ContentReviewMetadata,
  PublicationStatus,
} from '@/lib/contentTypes'

export type ProgramStatus =
  | 'active'
  | 'paused'
  | 'ended'

export type ProgramRegistrationMode =
  | 'none'
  | 'required'
  | 'optional'

export type ProgramAudience =
  | 'Everyone'
  | 'Brothers'
  | 'Sisters'

export type ProgramCategory =
  | 'Islamic Learning'
  | 'Community'
  | 'Workshop'
  | 'Social'
  | 'Sports'
  | 'Professional'
  | 'Charity'
  | 'Other'

export type ProgramExceptionStatus =
  | 'cancelled'
  | 'changed'

export type ProgramException = {
  date: string
  status: ProgramExceptionStatus
  startTime?: string
  endTime?: string
  venue?: string
  note?: string
}

export type Program =
  ContentReviewMetadata & {
    id: string
    slug: string

    name: string
    summary: string
    description: string

    category: ProgramCategory

    campusId: CampusId
    campusLabel: string
    venue: string

    audience: ProgramAudience

    weekday: number
    startTime: string
    endTime: string
    intervalWeeks: 1 | 2

    activeFrom: string
    activeUntil: string

    registrationMode:
      ProgramRegistrationMode
    registrationUrl?: string | null
    price?: string | null

    status: ProgramStatus
    publicationStatus:
      PublicationStatus

    imageUrl?: string | null

    exceptions:
      ProgramException[]

    localDemo?: boolean
  }

export type ProgramOccurrenceStatus =
  | 'scheduled'
  | 'cancelled'

export type ProgramOccurrence = {
  id: string
  program: Program

  dateKey: string
  start: string
  end: string

  venue: string
  status: ProgramOccurrenceStatus

  note?: string | null
}

const WEEKDAY_LABELS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const

const dateKeyFormatter =
  new Intl.DateTimeFormat(
    'en-CA',
    {
      timeZone:
        MELBOURNE_TIME_ZONE,
      year:
        'numeric',
      month:
        '2-digit',
      day:
        '2-digit',
    },
  )

export function getMelbourneDateKey(
  value: Date = new Date(),
): string {
  return dateKeyFormatter.format(
    value,
  )
}

function dateKeyUtcMs(
  value: string,
): number {
  const [
    year,
    month,
    day,
  ] =
    value
      .split('-')
      .map(Number)

  return Date.UTC(
    year,
    month - 1,
    day,
  )
}

export function addDaysToDateKey(
  value: string,
  days: number,
): string {
  return new Date(
    dateKeyUtcMs(value) +
      days *
        24 *
        60 *
        60 *
        1000,
  )
    .toISOString()
    .slice(
      0,
      10,
    )
}

function daysBetween(
  start: string,
  end: string,
): number {
  return Math.round(
    (
      dateKeyUtcMs(end) -
      dateKeyUtcMs(start)
    ) /
      (
        24 *
        60 *
        60 *
        1000
      ),
  )
}

function weekdayForDateKey(
  value: string,
): number {
  return new Date(
    dateKeyUtcMs(value),
  ).getUTCDay()
}

export function getCurrentWeekBounds(
  now: Date = new Date(),
) {
  const today =
    getMelbourneDateKey(now)

  const weekday =
    weekdayForDateKey(today)

  const daysSinceMonday =
    (
      weekday +
      6
    ) %
    7

  const startDateKey =
    addDaysToDateKey(
      today,
      -daysSinceMonday,
    )

  const endDateKey =
    addDaysToDateKey(
      startDateKey,
      6,
    )

  const endExclusiveDateKey =
    addDaysToDateKey(
      endDateKey,
      1,
    )

  return {
    today,
    startDateKey,
    endDateKey,

    startIso:
      fromDatetimeLocalValue(
        startDateKey +
          'T00:00',
      ),

    endExclusiveIso:
      fromDatetimeLocalValue(
        endExclusiveDateKey +
          'T00:00',
      ),
  }
}

export async function fetchPrograms():
  Promise<Program[]> {
  if (
    IS_LOCAL_ADMIN_MODE
  ) {
    const response =
      await fetch(
        localAdminApiUrl(
          '/programs?scope=public',
        ),
        {
          cache:
            'no-store',
        },
      )

    if (!response.ok) {
      throw new Error(
        'Failed to fetch local programs',
      )
    }

    const json =
      await response.json()

    return json.data as Program[]
  }

  if (
    IS_LOCAL_MOCK_DATA
  ) {
    return []
  }

  const response =
    await fetch(
      `${API_BASE_URL}/api/programs`,
      typeof window ===
        'undefined'
        ? {
            next: {
              revalidate:
                60,
            },
          }
        : undefined,
    )

  if (!response.ok) {
    throw new Error(
      'Failed to fetch programs',
    )
  }

  const json =
    await response.json()

  return json.data as Program[]
}

export async function fetchProgramBySlug(
  slug: string,
): Promise<Program | null> {
  const programs =
    await fetchPrograms()

  return (
    programs.find(
      (program) =>
        program.slug ===
        slug,
    ) ??
    null
  )
}

export function expandProgramOccurrences(
  programs: Program[],
  startDateKey: string,
  endDateKey: string,
): ProgramOccurrence[] {
  const occurrences:
    ProgramOccurrence[] = []

  for (
    let dateKey =
      startDateKey;
    dateKey <=
    endDateKey;
    dateKey =
      addDaysToDateKey(
        dateKey,
        1,
      )
  ) {
    for (
      const program
      of programs
    ) {
      if (
        program.publicationStatus !==
          'published' ||
        program.status !==
          'active'
      ) {
        continue
      }

      if (
        dateKey <
          program.activeFrom ||
        dateKey >
          program.activeUntil
      ) {
        continue
      }

      if (
        weekdayForDateKey(
          dateKey,
        ) !==
        program.weekday
      ) {
        continue
      }

      const weeksSinceStart =
        Math.floor(
          daysBetween(
            program.activeFrom,
            dateKey,
          ) /
            7,
        )

      if (
        weeksSinceStart <
          0 ||
        weeksSinceStart %
          program.intervalWeeks !==
          0
      ) {
        continue
      }

      const exception =
        program.exceptions.find(
          (item) =>
            item.date ===
            dateKey,
        )

      const startTime =
        exception?.startTime ??
        program.startTime

      const endTime =
        exception?.endTime ??
        program.endTime

      const venue =
        exception?.venue ??
        program.venue

      occurrences.push({
        id:
          program.id +
          '-' +
          dateKey,

        program,

        dateKey,

        start:
          fromDatetimeLocalValue(
            dateKey +
              'T' +
              startTime,
          ),

        end:
          fromDatetimeLocalValue(
            dateKey +
              'T' +
              endTime,
          ),

        venue,

        status:
          exception?.status ===
          'cancelled'
            ? 'cancelled'
            : 'scheduled',

        note:
          exception?.note ??
          null,
      })
    }
  }

  return occurrences.sort(
    (
      first,
      second,
    ) =>
      new Date(
        first.start,
      ).getTime() -
      new Date(
        second.start,
      ).getTime(),
  )
}

export function getNextProgramOccurrence(
  programs: Program[],
  now: Date = new Date(),
): ProgramOccurrence | null {
  const start =
    getMelbourneDateKey(now)

  const end =
    addDaysToDateKey(
      start,
      56,
    )

  const nowMs =
    now.getTime()

  return (
    expandProgramOccurrences(
      programs,
      start,
      end,
    ).find(
      (occurrence) =>
        occurrence.status ===
          'scheduled' &&
        new Date(
          occurrence.start,
        ).getTime() >=
          nowMs,
    ) ??
    null
  )
}

export function formatProgramClock(
  value: string,
): string {
  const [
    hourString,
    minuteString,
  ] =
    value.split(':')

  const hour =
    Number(hourString)

  const minute =
    Number(minuteString)

  const suffix =
    hour >= 12
      ? 'pm'
      : 'am'

  const displayHour =
    hour % 12 ||
    12

  return (
    String(
      displayHour,
    ) +
    ':' +
    String(
      minute,
    ).padStart(
      2,
      '0',
    ) +
    ' ' +
    suffix
  )
}

export function formatProgramSchedule(
  program: Program,
): string {
  const frequency =
    program.intervalWeeks ===
      1
      ? 'Every '
      : 'Every 2 weeks on '

  return (
    frequency +
    WEEKDAY_LABELS[
      program.weekday
    ] +
    ' · ' +
    formatProgramClock(
      program.startTime,
    ) +
    '–' +
    formatProgramClock(
      program.endTime,
    )
  )
}

export function formatOccurrenceDate(
  occurrence:
    ProgramOccurrence,
): string {
  return new Intl.DateTimeFormat(
    'en-AU',
    {
      timeZone:
        MELBOURNE_TIME_ZONE,
      weekday:
        'long',
      day:
        'numeric',
      month:
        'long',
    },
  ).format(
    new Date(
      occurrence.start,
    ),
  )
}

export function getProgramRegistrationLabel(
  program: Program,
): string {
  if (
    program.registrationMode ===
    'none'
  ) {
    return 'No registration required'
  }

  if (
    program.registrationMode ===
    'optional'
  ) {
    return 'Registration optional'
  }

  return 'Registration required'
}
