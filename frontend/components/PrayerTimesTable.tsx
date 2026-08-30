"use client"

import {
  useCallback,
  useEffect,
  useState,
} from 'react'
import {
  DAILY_PRAYERS,
  fetchPrayerTimes,
  getNextPrayer,
  type DailyPrayer,
  type PrayerTimesData,
} from '@/lib/prayerTimes'

function formatHijriDate(
  date: PrayerTimesData['date'],
): string | null {
  if (!date.hijri) {
    return null
  }

  return `${date.hijri.day} ${date.hijri.month.en} ${date.hijri.year} AH`
}

function displayPrayerTime(
  value: string,
): string {
  const match =
    value.match(
      /(\d{1,2}):(\d{2})/,
    )

  if (!match) {
    return value
  }

  const hour24 =
    Number(match[1])
  const minute =
    match[2]
  const suffix =
    hour24 >= 12
      ? 'pm'
      : 'am'
  const hour =
    hour24 % 12 || 12

  return `${hour}:${minute} ${suffix}`
}

export default function PrayerTimesTable() {
  const [
    data,
    setData,
  ] = useState<PrayerTimesData | null>(
    null,
  )
  const [
    error,
    setError,
  ] = useState<string | null>(
    null,
  )
  const [
    loading,
    setLoading,
  ] = useState(true)
  const [
    nextPrayer,
    setNextPrayer,
  ] = useState<DailyPrayer>(
    'Fajr',
  )

  const loadPrayerTimes =
    useCallback(async () => {
      setLoading(true)
      setError(null)

      try {
        const prayerData =
          await fetchPrayerTimes()

        setData(prayerData)
        setNextPrayer(
          getNextPrayer(
            prayerData.timings,
          ),
        )
      }
      catch {
        setData(null)
        setError(
          'Unable to load prayer times right now.',
        )
      }
      finally {
        setLoading(false)
      }
    }, [])

  useEffect(() => {
    void loadPrayerTimes()
  }, [loadPrayerTimes])

  useEffect(() => {
    if (!data) {
      return
    }

    const updateNextPrayer =
      () => {
        setNextPrayer(
          getNextPrayer(
            data.timings,
          ),
        )
      }

    updateNextPrayer()

    const intervalId =
      window.setInterval(
        updateNextPrayer,
        60_000,
      )

    return () =>
      window.clearInterval(
        intervalId,
      )
  }, [data])

  const hijriDate =
    data
      ? formatHijriDate(
          data.date,
        )
      : null

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white shadow-[0_18px_50px_rgba(0,0,0,0.12)]">
      <div className="border-b border-isr-light-blue/20 px-6 py-6 sm:px-8 sm:py-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-turquoise">
              Today&apos;s prayer times
            </p>

            {data && (
              <>
                <h3 className="mt-2 text-2xl font-bold text-isr-dark-red sm:text-3xl">
                  {data.date.readable}
                </h3>

                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                  {hijriDate && (
                    <span>
                      {hijriDate}
                    </span>
                  )}
                  <span>
                    Melbourne
                  </span>
                </div>
              </>
            )}
          </div>

          {data && (
            <div className="rounded-2xl bg-isr-cream/65 px-4 py-3 text-sm text-gray-600">
              <span className="font-semibold text-isr-dark-red">
                MWL
              </span>{' '}
              calculation method
            </div>
          )}
        </div>
      </div>

      {loading && (
        <div
          className="grid gap-px bg-isr-light-blue/20"
          aria-live="polite"
          aria-busy="true"
        >
          {DAILY_PRAYERS.map(
            (prayer) => (
              <div
                key={prayer}
                className="flex items-center justify-between bg-white px-6 py-5 sm:px-8"
              >
                <div className="h-4 w-20 animate-pulse rounded bg-isr-light-blue/30" />
                <div className="h-4 w-16 animate-pulse rounded bg-isr-light-blue/30" />
              </div>
            ),
          )}
        </div>
      )}

      {!loading && error && (
        <div className="px-6 py-10 text-center sm:px-8">
          <p className="font-semibold text-isr-dark-red">
            {error}
          </p>

          <button
            type="button"
            onClick={() =>
              void loadPrayerTimes()
            }
            className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full border border-isr-dark-red px-5 py-2.5 text-sm font-bold text-isr-dark-red transition hover:bg-isr-dark-red hover:text-white"
          >
            Try again
          </button>
        </div>
      )}

      {!loading && data && (
        <div className="grid gap-px bg-isr-light-blue/20">
          {DAILY_PRAYERS.map(
            (prayer) => {
              const isNext =
                prayer ===
                nextPrayer

              return (
                <div
                  key={prayer}
                  className={
                    'grid grid-cols-[1fr_auto] items-center gap-6 px-6 py-5 sm:px-8 ' +
                    (
                      isNext
                        ? 'bg-isr-yellow/45'
                        : 'bg-white'
                    )
                  }
                >
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-isr-dark-red">
                      {prayer}
                    </span>

                    {isNext && (
                      <span className="rounded-full bg-isr-dark-red px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                        Next
                      </span>
                    )}
                  </div>

                  <time className="text-lg font-bold tabular-nums text-isr-turquoise sm:text-xl">
                    {displayPrayerTime(
                      data.timings[
                        prayer
                      ],
                    )}
                  </time>
                </div>
              )
            },
          )}
        </div>
      )}
    </div>
  )
}
