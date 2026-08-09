'use client'

import { useEffect, useState } from 'react'
import SectionHeading from '@/components/SectionHeading'
import { LocationIcon } from '@/components/Icons'
import {
  DAILY_PRAYERS,
  fetchPrayerTimes,
  getNextPrayer,
  type DailyPrayer,
  type PrayerTimesData,
} from '@/lib/prayerTimes'
import {
  ISR_PUBLIC,
  JUMUAH,
  PRAYER_SPACES,
} from '@/lib/siteContent'

function displayValue(value: string | null) {
  return value ?? 'Details being confirmed'
}

export default function PrayerSpaceDirectory() {
  const [data, setData] = useState<PrayerTimesData | null>(null)
  const [nextPrayer, setNextPrayer] = useState<DailyPrayer>('Fajr')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPrayerTimes()
      .then((prayerData) => {
        setData(prayerData)
        setNextPrayer(getNextPrayer(prayerData.timings))
      })
      .catch(() => setData(null))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <section aria-labelledby="campus-prayer-spaces">
        <SectionHeading
          eyebrow="First things first"
          title="Where can I pray?"
          description="Choose your campus to find prayer-space information."
          id="campus-prayer-spaces"
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {PRAYER_SPACES.map((campus) => (
            <article
              id={campus.id}
              key={campus.id}
              className="isr-card scroll-mt-32 p-6"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-isr-turquoise/12 text-isr-turquoise">
                <LocationIcon className="h-5 w-5" />
              </span>

              <h2 className="mt-5 text-2xl font-bold text-isr-dark-red">
                {campus.name}
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-gray-700">
                {campus.summary}
              </p>

              <dl className="mt-6 space-y-3">
                {[
                  ['Building', campus.building],
                  ['Level and room', campus.room],
                  ['Access hours', campus.accessHours],
                  ['Wudu facilities', campus.wudu],
                  ["Brothers' arrangements", campus.brothers],
                  ["Sisters' arrangements", campus.sisters],
                  ['Accessibility', campus.accessibility],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="border-t border-isr-light-blue/20 pt-3"
                  >
                    <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      {label}
                    </dt>

                    <dd className="mt-1 text-sm font-semibold text-isr-dark-red">
                      {displayValue(value)}
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section
        id="jumuah"
        className="mt-16 scroll-mt-32"
        aria-labelledby="jumuah-heading"
      >
        <div className="isr-card border-isr-yellow bg-isr-yellow/40 p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-isr-turquoise">
            Friday prayer
          </p>

          <h2
            id="jumuah-heading"
            className="mt-3 text-3xl font-bold text-isr-dark-red"
          >
            Jumu&apos;ah at RMIT
          </h2>

          <p className="mt-4 max-w-3xl leading-relaxed text-gray-700">
            Find the current Friday prayer location, time and access
            arrangements.
          </p>

          <dl className="mt-8 grid gap-3 md:grid-cols-2">
            {[
              ['Campus', JUMUAH.campus],
              ['Venue', JUMUAH.venue],
              ['Khutbah time', JUMUAH.khutbahTime],
              ["Jama'ah time", JUMUAH.jamaahTime],
              ["Brothers' arrangements", JUMUAH.brothers],
              ["Sisters' arrangements", JUMUAH.sisters],
              ['Accessibility', JUMUAH.accessibility],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-xl border border-isr-dark-red/5 bg-white/80 px-4 py-3"
              >
                <dt className="text-sm font-semibold text-isr-dark-red">
                  {label}
                </dt>

                <dd className="mt-1 text-sm text-gray-600">
                  {displayValue(value)}
                </dd>
              </div>
            ))}
          </dl>

          {!JUMUAH.verified && (
            <p className="mt-6 text-sm font-semibold leading-relaxed text-isr-dark-red">
              Current Jumu&apos;ah arrangements are still being confirmed.
            </p>
          )}
        </div>
      </section>

      <section className="mt-16" aria-labelledby="daily-prayer-heading">
        <SectionHeading
          eyebrow="Daily prayer times"
          title="Melbourne prayer timetable"
          description="Daily prayer-time guidance. These are not congregational iqamah times."
          id="daily-prayer-heading"
        />

        <div className="isr-card mt-8 p-6 sm:p-8">
          {loading && (
            <div className="animate-pulse space-y-4">
              <div className="h-12 w-48 rounded bg-isr-light-blue/20" />
              <div className="h-72 rounded-2xl bg-isr-cream" />
            </div>
          )}

          {!loading && !data && (
            <div
              role="alert"
              className="rounded-2xl border border-isr-bright-red/20 bg-isr-yellow/50 p-5"
            >
              <p className="font-semibold text-isr-dark-red">
                Prayer times are currently unavailable.
              </p>
            </div>
          )}

          {!loading && data && (
            <>
              <div className="mb-7 flex flex-col gap-4 rounded-2xl bg-isr-cream/60 p-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm text-gray-600">
                    {data.date.readable}
                  </p>

                  <p className="mt-1 text-3xl font-bold text-isr-dark-red">
                    Next: {nextPrayer}
                  </p>
                </div>

                <p className="text-4xl font-bold text-isr-turquoise">
                  {data.timings[nextPrayer]}
                </p>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-isr-light-blue/30">
                <table className="w-full min-w-80 border-collapse">
                  <thead className="bg-isr-cream">
                    <tr>
                      <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                        Prayer
                      </th>

                      <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-600">
                        Time
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {DAILY_PRAYERS.map((prayer) => {
                      const isNext = prayer === nextPrayer

                      return (
                        <tr
                          key={prayer}
                          className={
                            isNext
                              ? 'bg-isr-turquoise/10'
                              : 'border-t border-isr-light-blue/20'
                          }
                        >
                          <td className="px-5 py-4 font-semibold text-isr-dark-red">
                            {prayer}

                            {isNext && (
                              <span className="ml-2 rounded-full bg-isr-turquoise/15 px-2 py-1 text-xs text-isr-turquoise">
                                Next
                              </span>
                            )}
                          </td>

                          <td className="px-5 py-4 text-right font-mono font-semibold text-gray-800">
                            {data.timings[prayer]}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <p className="mt-5 text-xs leading-relaxed text-gray-500">
                Timezone: {data.meta.timezone}.
              </p>
            </>
          )}
        </div>
      </section>

      <section className="mt-16 overflow-hidden rounded-[2rem] bg-isr-dark-red px-6 py-8 text-white sm:px-8">
        <h2 className="text-3xl font-bold">
          Something wrong with a prayer space?
        </h2>

        <p className="mt-4 max-w-3xl leading-relaxed text-white/80">
          Let ISR know about locked rooms, access issues, signage, wudu
          facilities or incorrect information.
        </p>

        <a
          href={`mailto:${ISR_PUBLIC.email}?subject=Prayer%20Space%20Access%20Issue`}
          className="mt-6 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-isr-dark-red transition hover:bg-isr-yellow"
        >
          Report an issue
        </a>
      </section>
    </>
  )
}
