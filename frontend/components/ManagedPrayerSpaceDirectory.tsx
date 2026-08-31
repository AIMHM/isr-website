'use client'

import {
  useEffect,
  useState,
} from 'react'
import {
  LocationIcon,
} from '@/components/Icons'
import PrayerSpaceDirectory from '@/components/PrayerSpaceDirectory'
import {
  fetchPrayerRecords,
  isPrayerRecordStale,
  type PrayerSpaceRecord,
} from '@/lib/prayerRecords'

function verificationLabel(
  record:
    PrayerSpaceRecord,
): string {
  if (
    isPrayerRecordStale(
      record,
    )
  ) {
    return 'Check before travel'
  }

  if (
    record.verificationStatus ===
    'verified'
  ) {
    return 'Verified'
  }

  if (
    record.verificationStatus ===
    'temporary'
  ) {
    return 'Temporary'
  }

  return 'Check before travel'
}

export default function ManagedPrayerSpaceDirectory() {
  const [
    records,
    setRecords,
  ] =
    useState<
      PrayerSpaceRecord[] | null
    >(null)

  useEffect(() => {
    let active =
      true

    fetchPrayerRecords()
      .then(
        (data) => {
          if (
            active &&
            data.prayerSpaces.length >
              0
          ) {
            setRecords(
              data.prayerSpaces,
            )
          }
        },
      )
      .catch(() => {
        /*
         * The persistent Prayer database may not
         * exist yet because its migration is
         * deliberately not executed during
         * development.
         *
         * In that case the existing verified
         * static directory remains the fail-safe.
         */
      })

    return () => {
      active = false
    }
  }, [])

  if (!records) {
    return (
      <PrayerSpaceDirectory />
    )
  }

  return (
    <section
      aria-label="RMIT prayer-space directory"
    >
      <div className="grid gap-5 md:grid-cols-2">
        {records.map(
          (
            space,
            index,
          ) => {
            const stale =
              isPrayerRecordStale(
                space,
              )

            const isFirstBundoora =
              space.slug
                .toLowerCase()
                .startsWith(
                  'bundoora',
                ) &&
              !records
                .slice(
                  0,
                  index,
                )
                .some(
                  (
                    previous,
                  ) =>
                    previous.slug
                      .toLowerCase()
                      .startsWith(
                        'bundoora',
                      ),
                )

            return (
              <div
                key={space.id}
                className="relative"
              >
                {isFirstBundoora && (
                  <span
                    id="bundoora"
                    className="absolute -top-28"
                    aria-hidden="true"
                  />
                )}

                <article
                  id={space.slug}
                  className="isr-card h-full scroll-mt-32 p-6 sm:p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-isr-turquoise/12 text-isr-turquoise">
                      <LocationIcon className="h-5 w-5" />
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        !stale &&
                        space.verificationStatus ===
                          'verified'
                          ? 'bg-emerald-50 text-emerald-800'
                          : 'bg-amber-50 text-amber-800'
                      }`}
                    >
                      {verificationLabel(
                        space,
                      )}
                    </span>
                  </div>

                  <h3 className="mt-5 text-2xl font-bold text-isr-dark-red">
                    {space.name}
                  </h3>

                  <p className="mt-2 text-xs font-bold uppercase tracking-wide text-isr-turquoise">
                    {space.campus}
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-gray-700">
                    {space.summary}
                  </p>

                  {(stale ||
                    space.verificationStatus !==
                      'verified') && (
                    <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-900">
                      This information should be confirmed before making a special trip. Check ISR Updates for temporary access changes.
                    </p>
                  )}

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <dl className="border-t border-isr-light-blue/20 pt-4 sm:col-span-2">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Building
                      </dt>

                      <dd className="mt-1 text-sm font-semibold text-isr-dark-red">
                        {space.building}
                      </dd>
                    </dl>

                    <dl className="border-t border-isr-light-blue/20 pt-4 sm:col-span-2">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Prayer rooms
                      </dt>

                      <dd className="mt-1 text-sm font-semibold text-isr-dark-red">
                        {space.room}
                      </dd>
                    </dl>

                    <dl className="border-t border-isr-light-blue/20 pt-4 sm:col-span-2">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Published hours
                      </dt>

                      <dd className="mt-1 text-sm leading-relaxed text-gray-700">
                        {space.accessHours}
                      </dd>
                    </dl>

                    <dl className="border-t border-isr-light-blue/20 pt-4">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Brothers
                      </dt>

                      <dd className="mt-1 text-sm leading-relaxed text-gray-700">
                        {space.brothers}
                      </dd>
                    </dl>

                    <dl className="border-t border-isr-light-blue/20 pt-4">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Sisters
                      </dt>

                      <dd className="mt-1 text-sm leading-relaxed text-gray-700">
                        {space.sisters}
                      </dd>
                    </dl>

                    <dl className="border-t border-isr-light-blue/20 pt-4 sm:col-span-2">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Wudu
                      </dt>

                      <dd className="mt-1 text-sm leading-relaxed text-gray-700">
                        {space.wudu}
                      </dd>
                    </dl>

                    <dl className="border-t border-isr-light-blue/20 pt-4 sm:col-span-2">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Accessibility
                      </dt>

                      <dd className="mt-1 text-sm leading-relaxed text-gray-700">
                        {space.accessibility}
                      </dd>
                    </dl>
                  </div>
                </article>
              </div>
            )
          },
        )}
      </div>
    </section>
  )
}
