'use client'

import { useEffect, useState } from 'react'
import {
  DAILY_PRAYERS,
  fetchPrayerTimes,
  getNextPrayer,
  type DailyPrayer,
  type PrayerTimesData,
} from '@/lib/prayerTimes'

const campuses = ['City Campus', 'Bundoora Campus', 'Brunswick Campus']

const fields = [
  'Building',
  'Level and room',
  'Access hours',
  'Student-card access',
  'Wudu facilities',
  'Brothers’ arrangements',
  'Sisters’ arrangements',
  'Wheelchair access',
]

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
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-3xl border border-isr-light-blue/30 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-isr-turquoise">
            Daily prayers
          </p>

          {loading && (
            <p className="mt-6 text-sm text-gray-600" aria-live="polite">
              Loading prayer times…
            </p>
          )}

          {!loading && !data && (
            <p className="mt-6 rounded-xl bg-isr-yellow/50 p-4 text-sm text-isr-dark-red">
              Prayer times are currently unavailable.
            </p>
          )}

          {!loading && data && (
            <>
              <div className="my-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-600">{data.date.readable}</p>
                  <h2 className="mt-1 text-3xl font-bold text-isr-dark-red">
                    Next: {nextPrayer}
                  </h2>
                </div>

                <p className="text-3xl font-bold text-isr-turquoise">
                  {data.timings[nextPrayer]}
                </p>
              </div>

              <div className="overflow-hidden rounded-2xl border border-isr-light-blue/30">
                <table className="w-full border-collapse">
                  <thead className="bg-isr-cream">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                        Prayer
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-600">
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
                          <td className="px-4 py-3 font-semibold text-isr-dark-red">
                            {prayer}
                            {isNext && (
                              <span className="ml-2 rounded-full bg-isr-turquoise/15 px-2 py-0.5 text-xs text-isr-turquoise">
                                Next
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-right font-mono text-gray-800">
                            {data.timings[prayer]}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-gray-500">
                Local prototype data. Calculation method, verified iqamah times,
                last-updated information and stale-data warnings will be added
                before publication.
              </p>
            </>
          )}
        </article>

        <article className="rounded-3xl border border-isr-bright-red/20 bg-isr-yellow/40 p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-isr-turquoise">
            Friday prayer
          </p>

          <h2 className="mt-4 text-3xl font-bold text-isr-dark-red">
            Jumu&apos;ah details require confirmation
          </h2>

          <p className="mt-4 leading-relaxed text-gray-700">
            Confirmed khutbah time, jama&apos;ah time, venue, access,
            capacity and accessibility arrangements will appear here.
          </p>

          <dl className="mt-6 space-y-3">
            {[
              'Khutbah time',
              'Jama’ah time',
              'Venue',
              'Overflow arrangements',
              'Accessibility',
            ].map((label) => (
              <div
                key={label}
                className="flex justify-between gap-4 rounded-xl bg-white/70 px-4 py-3 text-sm"
              >
                <dt className="font-semibold text-isr-dark-red">{label}</dt>
                <dd className="text-right text-gray-600">To be verified</dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 rounded-xl border border-isr-bright-red/20 bg-white/80 p-4 text-sm font-semibold text-isr-dark-red">
            Do not rely on this prototype when planning to attend Jumu&apos;ah.
          </p>
        </article>
      </section>

      <section className="mt-16" aria-labelledby="campus-prayer-spaces">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-isr-turquoise">
          Campus directory
        </p>

        <h2
          id="campus-prayer-spaces"
          className="mt-2 text-3xl font-bold text-isr-dark-red sm:text-4xl"
        >
          Prayer Spaces at RMIT
        </h2>

        <p className="mt-4 max-w-3xl leading-relaxed text-gray-700">
          Each listing will include verified directions, access information,
          facility details, accessibility and a last-reviewed date.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {campuses.map((campus) => (
            <article
              key={campus}
              className="rounded-3xl border border-isr-light-blue/30 bg-white p-6 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-isr-bright-red">
                Verification required
              </p>

              <h3 className="mt-3 text-2xl font-bold text-isr-dark-red">
                {campus}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-gray-700">
                Location, access and facility information must be confirmed
                before publication.
              </p>

              <dl className="mt-6 space-y-3">
                {fields.map((field) => (
                  <div
                    key={field}
                    className="border-t border-isr-light-blue/20 pt-3"
                  >
                    <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      {field}
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-isr-dark-red">
                      To be verified
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-3xl bg-isr-dark-red px-6 py-8 text-white sm:px-8">
        <h2 className="text-2xl font-bold">Report an access problem</h2>

        <p className="mt-3 max-w-3xl leading-relaxed text-white/80">
          Report locked rooms, access-card issues, missing signage, facility
          problems or incorrect website information.
        </p>

        <a
          href="mailto:isr@rmit.edu.au"
          className="mt-6 inline-block rounded-full bg-white px-5 py-2.5 font-semibold text-isr-dark-red transition hover:bg-isr-yellow"
        >
          Email ISR
        </a>
      </section>
    </>
  )
}
