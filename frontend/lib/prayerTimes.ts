import {
  API_BASE_URL,
} from '@/lib/api'
import {
  MOCK_PRAYER_TIMES,
} from '@/lib/mockData'
import {
  IS_LOCAL_MOCK_DATA,
} from '@/lib/mockMode'
import {
  IS_LOCAL_ADMIN_MODE,
} from '@/lib/localAdminMode'

export const DAILY_PRAYERS = [
  'Fajr',
  'Dhuhr',
  'Asr',
  'Maghrib',
  'Isha',
] as const

export type DailyPrayer =
  (typeof DAILY_PRAYERS)[number]

export type PrayerTimesData = {
  timings: Record<string, string>
  date: {
    readable: string
    hijri?: {
      day: string
      month: {
        en: string
      }
      year: string
    }
  }
  meta: {
    timezone: string
  }
}

export type PrayerTimesResponse = {
  data: PrayerTimesData
}

const TIMEZONE =
  'Australia/Melbourne'

function parseTimeToMinutes(
  time: string,
): number {
  const [
    hours,
    minutes,
  ] =
    time
      .split(':')
      .map(Number)

  return (
    hours * 60 +
    minutes
  )
}

function currentMinutesInMelbourne():
  number {
  const formatter =
    new Intl.DateTimeFormat(
      'en-AU',
      {
        timeZone: TIMEZONE,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      },
    )

  const parts =
    formatter.formatToParts(
      new Date(),
    )

  const hour =
    Number(
      parts.find(
        (part) =>
          part.type ===
          'hour',
      )?.value ?? 0,
    )

  const minute =
    Number(
      parts.find(
        (part) =>
          part.type ===
          'minute',
      )?.value ?? 0,
    )

  return (
    hour * 60 +
    minute
  )
}

function mockPrayerTimes():
  PrayerTimesData {
  return {
    ...MOCK_PRAYER_TIMES,
    timings: {
      ...MOCK_PRAYER_TIMES.timings,
    },
    date: {
      ...MOCK_PRAYER_TIMES.date,
    },
    meta: {
      ...MOCK_PRAYER_TIMES.meta,
    },
  }
}

export async function fetchPrayerTimes():
  Promise<PrayerTimesData> {
  if (
    IS_LOCAL_MOCK_DATA ||
    IS_LOCAL_ADMIN_MODE
  ) {
    return mockPrayerTimes()
  }

  const response =
    await fetch(
      `${API_BASE_URL}/api/prayer-times`,
    )

  if (!response.ok) {
    throw new Error(
      'Failed to fetch prayer times',
    )
  }

  const json =
    (await response.json()) as PrayerTimesResponse

  return json.data
}

export function getNextPrayer(
  timings: Record<
    string,
    string
  >,
): DailyPrayer {
  const nowMinutes =
    currentMinutesInMelbourne()

  for (
    const prayer
    of DAILY_PRAYERS
  ) {
    if (
      parseTimeToMinutes(
        timings[prayer],
      ) >
      nowMinutes
    ) {
      return prayer
    }
  }

  return 'Fajr'
}
