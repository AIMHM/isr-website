import type {
  PublicJumuahService,
} from '@/lib/siteContent'

export type PrayerVerificationState =
  | 'verified'
  | 'needs-review'
  | 'temporary'

export type PrayerGovernanceRecord = {
  contentOwner: string
  verification:
    PrayerVerificationState

  reviewedAt:
    string | null

  reviewIntervalDays:
    number

  sourceLabel:
    string | null
}

const DEFAULT_GOVERNANCE:
  PrayerGovernanceRecord = {
    contentOwner:
      'Islamic Society of RMIT',

    verification:
      'needs-review',

    reviewedAt:
      null,

    reviewIntervalDays:
      90,

    sourceLabel:
      null,
  }

export const PRAYER_INFORMATION_GOVERNANCE:
  Record<
    string,
    PrayerGovernanceRecord
  > = {
    city: {
      contentOwner:
        'Islamic Society of RMIT',

      verification:
        'verified',

      reviewedAt:
        null,

      reviewIntervalDays:
        90,

      sourceLabel:
        'ISR operational prayer-space record',
    },

    'bundoora-east': {
      contentOwner:
        'Islamic Society of RMIT',

      verification:
        'verified',

      reviewedAt:
        null,

      reviewIntervalDays:
        90,

      sourceLabel:
        'ISR operational prayer-space record',
    },

    'bundoora-west': {
      contentOwner:
        'Islamic Society of RMIT',

      verification:
        'verified',

      reviewedAt:
        null,

      reviewIntervalDays:
        90,

      sourceLabel:
        'ISR operational prayer-space record',
    },

    brunswick: {
      contentOwner:
        'Islamic Society of RMIT',

      verification:
        'verified',

      reviewedAt:
        null,

      reviewIntervalDays:
        90,

      sourceLabel:
        'ISR operational prayer-space record',
    },

    'city-jumuah': {
      contentOwner:
        'Islamic Society of RMIT',

      verification:
        'verified',

      reviewedAt:
        null,

      reviewIntervalDays:
        60,

      sourceLabel:
        'ISR operational Jumu’ah record',
    },

    'bundoora-jumuah': {
      contentOwner:
        'Islamic Society of RMIT',

      verification:
        'verified',

      reviewedAt:
        null,

      reviewIntervalDays:
        60,

      sourceLabel:
        'ISR operational Jumu’ah record',
    },
  }

export function getPrayerGovernance(
  id: string,
): PrayerGovernanceRecord {
  return (
    PRAYER_INFORMATION_GOVERNANCE[
      id
    ] ??
    DEFAULT_GOVERNANCE
  )
}

export function getPrayerVerificationLabel(
  id: string,
): string {
  const state =
    getPrayerGovernance(
      id,
    ).verification

  if (state === 'verified') {
    return 'Verified'
  }

  if (state === 'temporary') {
    return 'Temporary'
  }

  return 'Check before travel'
}

function melbourneWallClockUtcMs(
  at: Date,
): number {
  const parts =
    new Intl.DateTimeFormat(
      'en-CA',
      {
        timeZone:
          'Australia/Melbourne',

        year:
          'numeric',

        month:
          '2-digit',

        day:
          '2-digit',

        hour:
          '2-digit',

        minute:
          '2-digit',

        second:
          '2-digit',

        hour12:
          false,
      },
    ).formatToParts(
      at,
    )

  const value = (
    type:
      Intl.DateTimeFormatPartTypes,
  ) =>
    Number(
      parts.find(
        (part) =>
          part.type ===
          type,
      )?.value ??
        0,
    )

  let hour =
    value(
      'hour',
    )

  if (hour === 24) {
    hour = 0
  }

  return Date.UTC(
    value(
      'year',
    ),
    value(
      'month',
    ) - 1,
    value(
      'day',
    ),
    hour,
    value(
      'minute',
    ),
    value(
      'second',
    ),
  )
}

export function getMelbourneUtcOffsetMinutes(
  at: Date =
    new Date(),
): number {
  return Math.round(
    (
      melbourneWallClockUtcMs(
        at,
      ) -
      at.getTime()
    ) /
      60_000,
  )
}

export function isMelbourneDaylightSaving(
  at: Date =
    new Date(),
): boolean {
  return (
    getMelbourneUtcOffsetMinutes(
      at,
    ) >
    600
  )
}

export function getCurrentJumuahTime(
  service:
    PublicJumuahService,
  at: Date =
    new Date(),
): string {
  if (
    service.id ===
    'bundoora-jumuah'
  ) {
    return isMelbourneDaylightSaving(
      at,
    )
      ? '1:30 pm'
      : '12:30 pm'
  }

  if (
    service.id ===
    'city-jumuah'
  ) {
    return '1:30 pm'
  }

  return service.time
}

export function getJumuahScheduleRule(
  service:
    PublicJumuahService,
): string {
  if (
    service.id ===
    'bundoora-jumuah'
  ) {
    return '12:30 pm outside Victorian daylight saving · 1:30 pm during daylight saving'
  }

  if (
    service.id ===
    'city-jumuah'
  ) {
    return '1:30 pm year-round'
  }

  return service.time
}

export function prayerRecordNeedsReview(
  id: string,
  now: Date =
    new Date(),
): boolean {
  const record =
    getPrayerGovernance(
      id,
    )

  if (!record.reviewedAt) {
    return true
  }

  const reviewed =
    new Date(
      record.reviewedAt,
    )

  if (
    Number.isNaN(
      reviewed.getTime(),
    )
  ) {
    return true
  }

  const ageDays =
    (
      now.getTime() -
      reviewed.getTime()
    ) /
    86_400_000

  return (
    ageDays >
    record.reviewIntervalDays
  )
}
