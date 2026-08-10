'use client'

import {
  useEffect,
  useState,
} from 'react'
import Link from 'next/link'
import SectionHeading from '@/components/SectionHeading'
import {
  LocationIcon,
} from '@/components/Icons'
import {
  DAILY_PRAYERS,
  fetchPrayerTimes,
  getNextPrayer,
  type DailyPrayer,
  type PrayerTimesData,
} from '@/lib/prayerTimes'
import {
  JUMUAH_SERVICES,
  PRAYER_SPACES,
  mailto,
} from '@/lib/siteContent'

export default function PrayerSpaceDirectory() {
  const [
    data,
    setData,
  ] =
    useState<PrayerTimesData | null>(
      null,
    )

  const [
    nextPrayer,
    setNextPrayer,
  ] =
    useState<DailyPrayer>('Fajr')

  const [
    loading,
    setLoading,
  ] =
    useState(true)

  useEffect(() => {
    fetchPrayerTimes()
      .then(
        (prayerData) => {
          setData(prayerData)
          setNextPrayer(
            getNextPrayer(
              prayerData.timings,
            ),
          )
        },
      )
      .catch(
        () =>
          setData(null),
      )
      .finally(
        () =>
          setLoading(false),
      )
  }, [])

  return (
    <>
      <section
        aria-labelledby="campus-prayer-spaces"
      >
        <div
          id="bundoora"
          className="scroll-mt-32"
        />

        <SectionHeading
          eyebrow="First things first"
          title="Where can I pray?"
          description="Choose the location that matches your campus. Bundoora has separate East and West prayer facilities."
          id="campus-prayer-spaces"
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {PRAYER_SPACES.map(
            (space) => (
              <article
                id={space.id}
                key={space.id}
                className="isr-card scroll-mt-32 p-6 sm:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-isr-turquoise/12 text-isr-turquoise">
                    <LocationIcon className="h-5 w-5" />
                  </span>

                  <span className="rounded-full bg-isr-turquoise/10 px-3 py-1 text-xs font-semibold text-isr-turquoise">
                    Confirmed
                  </span>
                </div>

                <h2 className="mt-5 text-2xl font-bold text-isr-dark-red">
                  {space.name}
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-gray-700">
                  {space.summary}
                </p>

                <dl className="mt-6 space-y-4">
                  <div className="border-t border-isr-light-blue/20 pt-4">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Building
                    </dt>

                    <dd className="mt-1 text-sm font-semibold text-isr-dark-red">
                      {space.building}
                    </dd>
                  </div>

                  <div className="border-t border-isr-light-blue/20 pt-4">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Prayer rooms
                    </dt>

                    <dd className="mt-1 text-sm font-semibold text-isr-dark-red">
                      {space.room}
                    </dd>
                  </div>

                  <div className="border-t border-isr-light-blue/20 pt-4">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Published hours
                    </dt>

                    <dd className="mt-1 text-sm text-gray-700">
                      {space.accessHours}
                    </dd>
                  </div>

                  <div className="border-t border-isr-light-blue/20 pt-4">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Brothers
                    </dt>

                    <dd className="mt-1 text-sm text-gray-700">
                      {space.brothers}
                    </dd>
                  </div>

                  <div className="border-t border-isr-light-blue/20 pt-4">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Sisters
                    </dt>

                    <dd className="mt-1 text-sm text-gray-700">
                      {space.sisters}
                    </dd>
                  </div>

                  <div className="border-t border-isr-light-blue/20 pt-4">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Wudu
                    </dt>

                    <dd className="mt-1 text-sm text-gray-700">
                      {space.wudu}
                    </dd>
                  </div>

                  <div className="border-t border-isr-light-blue/20 pt-4">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Accessibility
                    </dt>

                    <dd className="mt-1 text-sm text-gray-700">
                      {space.accessibility}
                    </dd>
                  </div>
                </dl>
              </article>
            ),
          )}
        </div>
      </section>

      <section
        id="jumuah"
        className="mt-16 scroll-mt-32"
        aria-labelledby="jumuah-heading"
      >
        <SectionHeading
          eyebrow="Friday prayer"
          title="Jumu’ah at RMIT"
          description="Current regular Friday prayer arrangements for City and Bundoora."
          id="jumuah-heading"
        />

        <div className="mt-9 grid gap-6 lg:grid-cols-2">
          {JUMUAH_SERVICES.map(
            (service) => (
              <article
                key={service.id}
                className="isr-card border-isr-yellow bg-isr-yellow/30 p-6 sm:p-8"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-isr-turquoise">
                  {service.campus}
                </p>

                <p className="mt-3 text-2xl font-bold text-isr-dark-red">
                  {service.time}
                </p>

                <dl className="mt-6 space-y-4">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Venue
                    </dt>

                    <dd className="mt-1 text-sm font-semibold text-isr-dark-red">
                      {service.venue}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Brothers
                    </dt>

                    <dd className="mt-1 text-sm text-gray-700">
                      {service.brothers}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Sisters
                    </dt>

                    <dd className="mt-1 text-sm text-gray-700">
                      {service.sisters}
                    </dd>
                  </div>
                </dl>

                <p className="mt-6 rounded-2xl bg-white/70 p-4 text-sm leading-relaxed text-gray-700">
                  {service.notes}
                </p>
              </article>
            ),
          )}
        </div>

        <div className="mt-6 rounded-2xl border border-isr-light-blue/30 bg-white p-5">
          <p className="font-semibold text-isr-dark-red">
            Brunswick Campus
          </p>

          <p className="mt-2 text-sm leading-relaxed text-gray-700">
            There is currently no regular Brunswick
            Jumu&apos;ah. The Brunswick rooms remain
            available for daily prayer during their
            published hours.
          </p>
        </div>
      </section>

      <section
        className="mt-16"
        aria-labelledby="daily-prayer-heading"
      >
        <SectionHeading
          eyebrow="Daily timetable"
          title="Melbourne prayer times"
          description="Use the daily timetable as a time reference. Campus prayer-room availability is listed separately above."
          id="daily-prayer-heading"
        />

        <div className="mt-9 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <article className="isr-card p-6 sm:p-8">
            {loading && (
              <div
                className="animate-pulse space-y-4"
                aria-live="polite"
                aria-busy="true"
              >
                <div className="h-8 w-52 rounded bg-isr-light-blue/25" />
                <div className="h-60 rounded-2xl bg-isr-cream" />
              </div>
            )}

            {!loading &&
              data && (
                <>
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-500">
                        {
                          data.date
                            .readable
                        }
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        {
                          data.meta
                            .timezone
                        }
                      </p>
                    </div>

                    <div className="rounded-2xl bg-isr-turquoise/10 px-4 py-3 text-right">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Next prayer
                      </p>

                      <p className="mt-1 font-bold text-isr-dark-red">
                        {
                          nextPrayer
                        }{' '}
                        {
                          data.timings[
                            nextPrayer
                          ]
                        }
                      </p>
                    </div>
                  </div>

                  <dl className="mt-7 divide-y divide-isr-light-blue/20">
                    {DAILY_PRAYERS.map(
                      (
                        prayer,
                      ) => (
                        <div
                          key={
                            prayer
                          }
                          className="flex items-center justify-between py-4"
                        >
                          <dt
                            className={
                              prayer ===
                              nextPrayer
                                ? 'font-bold text-isr-dark-red'
                                : 'font-semibold text-gray-700'
                            }
                          >
                            {
                              prayer
                            }
                          </dt>

                          <dd
                            className={
                              prayer ===
                              nextPrayer
                                ? 'font-bold text-isr-turquoise'
                                : 'text-gray-700'
                            }
                          >
                            {
                              data
                                .timings[
                                prayer
                              ]
                            }
                          </dd>
                        </div>
                      ),
                    )}
                  </dl>
                </>
              )}

            {!loading &&
              !data && (
                <div className="rounded-2xl bg-isr-cream p-6">
                  <p className="font-semibold text-isr-dark-red">
                    Prayer timetable unavailable
                  </p>

                  <p className="mt-2 text-sm leading-relaxed text-gray-700">
                    The daily timetable could not be loaded.
                    Campus room and Jumu&apos;ah information
                    above remains available.
                  </p>
                </div>
              )}
          </article>

          <article className="isr-card bg-isr-cream/50 p-6 sm:p-8">
            <h3 className="text-2xl font-bold text-isr-dark-red">
              Something changed?
            </h3>

            <p className="mt-4 text-sm leading-relaxed text-gray-700">
              Prayer rooms and Friday arrangements can
              occasionally be affected by campus access,
              room changes or exceptional circumstances.
              Check ISR Updates and tell us if information
              on this page needs correction.
            </p>

            <Link
              href="/updates"
              className="isr-text-link mt-6"
            >
              Check ISR Updates
              <span aria-hidden="true">
                →
              </span>
            </Link>

            <a
              href={mailto(
                'Prayer Space or Jumuah Information',
              )}
              className="isr-text-link mt-4"
            >
              Contact ISR
              <span aria-hidden="true">
                →
              </span>
            </a>
          </article>
        </div>
      </section>
    </>
  )
}
