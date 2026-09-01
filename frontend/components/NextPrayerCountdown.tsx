'use client'

import {
  useEffect,
  useState,
} from 'react'
import {
  fetchPrayerTimes,
  fetchPrayerTimesForDate,
  getNextPrayer,
  melbourneApiDate,
  type PrayerTimesData,
} from '@/lib/prayerTimes'

const TIME_ZONE =
  'Australia/Melbourne'

function parsePrayerTime(
  value: string,
) {
  const match =
    value.match(
      /(\d{1,2}):(\d{2})/,
    )

  if (!match) {
    return null
  }

  return {
    hour:
      Number(
        match[1],
      ),

    minute:
      Number(
        match[2],
      ),
  }
}

function melbourneSeconds(
  now = Date.now(),
) {
  const parts =
    new Intl.DateTimeFormat(
      'en-AU',
      {
        timeZone:
          TIME_ZONE,

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
      new Date(
        now,
      ),
    )

  const get =
    (
      type:
        | 'hour'
        | 'minute'
        | 'second',
    ) =>
      Number(
        parts.find(
          (part) =>
            part.type ===
            type,
        )?.value ?? '0',
      )

  let hour =
    get(
      'hour',
    )

  if (hour === 24) {
    hour = 0
  }

  return (
    hour * 3600 +
    get('minute') * 60 +
    get('second')
  )
}

function currentMelbourneMinutes(
  now = Date.now(),
) {
  return Math.floor(
    melbourneSeconds(
      now,
    ) /
      60,
  )
}

function prayerMinutes(
  value: string,
): number | null {
  const parsed =
    parsePrayerTime(
      value,
    )

  if (!parsed) {
    return null
  }

  return (
    parsed.hour * 60 +
    parsed.minute
  )
}

function isAfterIsha(
  timings:
    Record<string, string>,
  now = Date.now(),
): boolean {
  const isha =
    prayerMinutes(
      timings.Isha,
    )

  if (isha === null) {
    return false
  }

  return (
    currentMelbourneMinutes(
      now,
    ) >=
    isha
  )
}

function secondsUntil(
  value: string,
  now = Date.now(),
) {
  const parsed =
    parsePrayerTime(
      value,
    )

  if (!parsed) {
    return null
  }

  const current =
    melbourneSeconds(
      now,
    )

  let target =
    parsed.hour * 3600 +
    parsed.minute * 60

  if (target <= current) {
    target +=
      24 * 3600
  }

  return Math.max(
    0,
    target - current,
  )
}

function formatCountdown(
  seconds: number,
) {
  const minutesTotal =
    Math.max(
      0,
      Math.ceil(
        seconds / 60,
      ),
    )

  const hours =
    Math.floor(
      minutesTotal / 60,
    )

  const minutes =
    minutesTotal % 60

  if (
    hours > 0 &&
    minutes > 0
  ) {
    return `${hours}h ${minutes}m`
  }

  if (hours > 0) {
    return `${hours}h`
  }

  if (minutes <= 1) {
    return 'less than a minute'
  }

  return `${minutes}m`
}

function displayTime(
  value: string,
) {
  const parsed =
    parsePrayerTime(
      value,
    )

  if (!parsed) {
    return value
  }

  const suffix =
    parsed.hour >= 12
      ? 'pm'
      : 'am'

  const hour =
    parsed.hour % 12 ||
    12

  return `${hour}:${String(
    parsed.minute,
  ).padStart(
    2,
    '0',
  )} ${suffix}`
}

function displayDate(
  now = Date.now(),
) {
  return new Intl.DateTimeFormat(
    'en-AU',
    {
      timeZone:
        TIME_ZONE,

      weekday:
        'long',

      day:
        'numeric',

      month:
        'long',

      year:
        'numeric',
    },
  ).format(
    new Date(
      now,
    ),
  )
}

export default function NextPrayerCountdown() {
  const [
    data,
    setData,
  ] =
    useState<PrayerTimesData | null>(
      null,
    )

  const [
    tomorrowFajr,
    setTomorrowFajr,
  ] =
    useState<string | null>(
      null,
    )

  const [
    loading,
    setLoading,
  ] =
    useState(true)

  const [
    failed,
    setFailed,
  ] =
    useState(false)

  const [
    tick,
    setTick,
  ] =
    useState(
      Date.now(),
    )

  useEffect(() => {
    let active =
      true

    async function load() {
      try {
        const result =
          await fetchPrayerTimes()

        if (!active) {
          return
        }

        setData(
          result,
        )

        setFailed(
          false,
        )

        if (
          isAfterIsha(
            result.timings,
          )
        ) {
          try {
            const tomorrow =
              await fetchPrayerTimesForDate(
                melbourneApiDate(
                  1,
                ),
              )

            if (active) {
              setTomorrowFajr(
                tomorrow.timings
                  .Fajr ??
                  null,
              )
            }
          }
          catch {
            if (active) {
              setTomorrowFajr(
                null,
              )
            }
          }
        }
        else {
          setTomorrowFajr(
            null,
          )
        }
      }
      catch {
        if (active) {
          setFailed(
            true,
          )
        }
      }
      finally {
        if (active) {
          setLoading(
            false,
          )
        }
      }
    }

    void load()

    const refresh =
      window.setInterval(
        () => {
          void load()
        },
        15 * 60 * 1000,
      )

    return () => {
      active = false

      window.clearInterval(
        refresh,
      )
    }
  }, [])

  useEffect(() => {
    const timer =
      window.setInterval(
        () => {
          setTick(
            Date.now(),
          )
        },
        1000,
      )

    return () => {
      window.clearInterval(
        timer,
      )
    }
  }, [])

  const next =
    data
      ? getNextPrayer(
          data.timings,
        )
      : null

  const afterIsha =
    data
      ? isAfterIsha(
          data.timings,
          tick,
        )
      : false

  const time =
    next &&
    data
      ? (
          afterIsha &&
          next === 'Fajr' &&
          tomorrowFajr
            ? tomorrowFajr
            : data.timings[
                next
              ]
        )
      : null

  const remaining =
    time
      ? secondsUntil(
          time,
          tick,
        )
      : null

  if (loading) {
    return (
      <aside
        aria-busy="true"
        className="isr-next-prayer-card animate-pulse"
      >
        <div className="h-4 w-28 rounded bg-white/20" />
        <div className="mt-5 h-10 w-48 rounded bg-white/20" />
        <div className="mt-3 h-5 w-36 rounded bg-white/15" />
      </aside>
    )
  }

  if (
    failed ||
    !data ||
    !next ||
    !time ||
    remaining === null
  ) {
    return (
      <aside className="isr-next-prayer-card">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-yellow">
          Next prayer
        </p>

        <h3 className="mt-3 text-xl font-bold text-white">
          Live countdown unavailable
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-white/65">
          The full Melbourne prayer timetable
          remains available below.
        </p>
      </aside>
    )
  }

  return (
    <aside
      className="isr-next-prayer-card"
      aria-label={`Next prayer is ${next} at ${displayTime(
        time,
      )}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-yellow">
            Next prayer
          </p>

          <h3 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
            {next}
          </h3>
        </div>

        <div className="text-right">
          <p className="text-2xl font-bold text-isr-yellow sm:text-3xl">
            {displayTime(
              time,
            )}
          </p>

          <p className="mt-1 text-xs font-semibold text-white/55">
            Melbourne time
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.08] p-4">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/55">
          Time remaining
        </p>

        <p className="mt-1 text-2xl font-bold text-white">
          {formatCountdown(
            remaining,
          )}
        </p>
      </div>

      <p className="mt-5 text-xs font-semibold text-white/55">
        {displayDate(
          tick,
        )}
      </p>

      <p className="mt-4 text-xs leading-relaxed text-white/45">
        Prayer-time reference only. This does
        not indicate congregational iqamah time.
      </p>
    </aside>
  )
}
