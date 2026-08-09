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

const campuses = [
  {
    name: 'City Campus',
    summary:
      'Central-campus prayer access, facilities and directions.',
  },
  {
    name: 'Bundoora Campus',
    summary:
      'Prayer-space availability and access guidance for Bundoora students.',
  },
  {
    name: 'Brunswick Campus',
    summary:
      'Prayer options, facility information and campus directions.',
  },
]

const directoryFields = [
  'Building',
  'Level and room',
  'Access hours',
  'Student-card access',
  'Wudu facilities',
  "Brothers' arrangements",
  "Sisters' arrangements",
  'Wheelchair access',
]

const jumuahFields = [
  'Khutbah time',
  "Jama'ah time",
  'Venue',
  'Overflow arrangements',
  'Accessibility',
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
      <section
        aria-labelledby="daily-prayer-heading"
        className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]"
      >
        <article className="isr-card p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-isr-turquoise">
            Daily prayers
          </p>

          <h2
            id="daily-prayer-heading"
            className="mt-3 text-2xl font-bold text-isr-dark-red sm:text-3xl"
          >
            Melbourne prayer timetable
          </h2>

          {loading && (
            <div
              className="mt-7 animate-pulse space-y-4"
              aria-live="polite"
              aria-busy="true"
            >
              <div className="h-8 w-52 rounded bg-isr-light-blue/25" />
              <div className="h-12 w-32 rounded bg-isr-light-blue/20" />
              <div className="h-72 rounded-2xl bg-isr-cream" />
            </div>
          )}

          {!loading && !data && (
            <div
              role="alert"
              className="mt-7 rounded-2xl border border-isr-bright-red/20 bg-isr-yellow/50 p-5"
            >
              <p className="font-semibold text-isr-dark-red">
                Prayer times are currently unavailable.
              </p>

              <p className="mt-2 text-sm leading-relaxed text-gray-700">
                Confirm the current time through a reliable local source before
                relying on this page.
              </p>
            </div>
          )}

          {!loading && data && (
            <>
              <div className="my-7 flex flex-col gap-4 rounded-2xl bg-isr-cream/60 p-5 sm:flex-row sm:items-end sm:justify-between">
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
                        Adhan time
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

              <div className="mt-5 space-y-2 text-xs leading-relaxed text-gray-500">
                <p>
                  Times shown are prayer-time estimates for Melbourne and are
                  not verified congregational iqamah times.
                </p>

                <p>
                  Timezone: {data.meta.timezone}. Calculation method,
                  last-updated information and stale-data warnings require final
                  verification.
                </p>
              </div>
            </>
          )}
        </article>

        <article className="isr-card border-isr-yellow bg-isr-yellow/40 p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-isr-turquoise">
            Friday prayer
          </p>

          <h2 className="mt-4 text-3xl font-bold text-isr-dark-red">
            Jumu&apos;ah details pending confirmation
          </h2>

          <p className="mt-4 leading-relaxed text-gray-700">
            Confirmed khutbah time, congregational prayer time, venue, capacity
            and accessibility arrangements will appear here.
          </p>

          <dl className="mt-7 space-y-3">
            {jumuahFields.map((label) => (
              <div
                key={label}
                className="flex flex-col gap-1 rounded-xl border border-isr-dark-red/5 bg-white/75 px-4 py-3 sm:flex-row sm:justify-between sm:gap-4"
              >
                <dt className="font-semibold text-isr-dark-red">
                  {label}
                </dt>

                <dd className="text-sm text-gray-600">
                  To be verified
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 rounded-xl border border-isr-bright-red/20 bg-white/80 p-4 text-sm font-semibold leading-relaxed text-isr-dark-red">
            Confirm current Jumu&apos;ah arrangements before travelling to
            campus.
          </p>
        </article>
      </section>

      <section
        className="mt-16"
        aria-labelledby="campus-prayer-spaces"
      >
        <SectionHeading
          eyebrow="Campus directory"
          title="Prayer spaces at RMIT"
          description="Each campus listing will include verified directions, access arrangements, facility details and a last-reviewed date."
          id="campus-prayer-spaces"
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {campuses.map((campus) => (
            <article
              key={campus.name}
              className="isr-card flex flex-col p-6"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-isr-turquoise/12 text-isr-turquoise">
                <LocationIcon className="h-5 w-5" />
              </span>

              <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-isr-bright-red">
                Verification required
              </p>

              <h3 className="mt-2 text-2xl font-bold text-isr-dark-red">
                {campus.name}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-gray-700">
                {campus.summary}
              </p>

              <dl className="mt-6 space-y-3">
                {directoryFields.map((field) => (
                  <div
                    key={field}
                    className="border-t border-isr-light-blue/20 pt-3"
                  >
                    <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      {field}
                    </dt>

                    <dd className="mt-1 text-sm font-semibold text-isr-dark-red">
                      To be verified
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 overflow-hidden rounded-[2rem] bg-isr-dark-red px-6 py-8 text-white shadow-[0_20px_55px_rgba(91,11,5,0.14)] sm:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-isr-yellow">
          Facilities reporting
        </p>

        <h2 className="mt-3 text-3xl font-bold">
          Report a prayer-space access problem
        </h2>

        <p className="mt-4 max-w-3xl leading-relaxed text-white/80">
          Report locked rooms, access-card issues, missing signage, wudu
          facility problems or incorrect website information.
        </p>

        <a
          href="mailto:isr@rmit.edu.au?subject=Prayer%20Space%20Access%20Issue"
          className="mt-6 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-isr-dark-red transition hover:bg-isr-yellow"
        >
          Email ISR
        </a>
      </section>
    </>
  )
}
