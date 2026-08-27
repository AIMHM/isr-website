'use client'

import {
  useEffect,
  useState,
} from 'react'
import Link from 'next/link'
import JumuahServices from '@/components/JumuahServices'
import {
  fetchPrayerRecords,
  isPrayerRecordStale,
  type JumuahServiceRecord,
} from '@/lib/prayerRecords'
import {
  isMelbourneDaylightSaving,
} from '@/lib/prayerGovernance'

function currentTime(
  service:
    JumuahServiceRecord,
  now:
    Date | null,
): string {
  if (!now) {
    return (
      service.standardTime ??
      service.daylightSavingTime ??
      service.timeRule
    )
  }

  if (
    service.slug ===
    'bundoora-jumuah'
  ) {
    return isMelbourneDaylightSaving(
      now,
    )
      ? service.daylightSavingTime ??
          service.standardTime ??
          service.timeRule
      : service.standardTime ??
          service.daylightSavingTime ??
          service.timeRule
  }

  return (
    service.standardTime ??
    service.daylightSavingTime ??
    service.timeRule
  )
}

function verificationLabel(
  service:
    JumuahServiceRecord,
): string {
  if (
    isPrayerRecordStale(
      service,
    )
  ) {
    return 'Check before travel'
  }

  if (
    service.verificationStatus ===
    'verified'
  ) {
    return 'Verified'
  }

  if (
    service.verificationStatus ===
    'temporary'
  ) {
    return 'Temporary'
  }

  return 'Check before travel'
}

export default function ManagedJumuahServices() {
  const [
    records,
    setRecords,
  ] =
    useState<
      JumuahServiceRecord[] | null
    >(null)

  const [
    now,
    setNow,
  ] =
    useState<Date | null>(
      null,
    )

  useEffect(() => {
    setNow(
      new Date(),
    )

    let active =
      true

    fetchPrayerRecords()
      .then(
        (data) => {
          if (
            active &&
            data.jumuahServices.length >
              0
          ) {
            setRecords(
              data.jumuahServices,
            )
          }
        },
      )
      .catch(() => {
        /*
         * Safe fallback to existing static ISR
         * Jumu’ah information while persistent
         * records are unavailable or unseeded.
         */
      })

    return () => {
      active = false
    }
  }, [])

  if (!records) {
    return (
      <JumuahServices />
    )
  }

  return (
    <div>
      <div className="grid gap-4 lg:grid-cols-2">
        {records.map(
          (service) => {
            const stale =
              isPrayerRecordStale(
                service,
              )

            return (
              <article
                key={service.id}
                className="isr-prayer-summary rounded-[1.75rem] border border-isr-light-blue/20 bg-white p-6 shadow-sm sm:p-7"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-turquoise">
                      Jumu’ah
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-isr-dark-red">
                      {service.campus}
                    </h3>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span className="rounded-full bg-isr-dark-red px-4 py-2 text-sm font-bold text-white">
                      {currentTime(
                        service,
                        now,
                      )}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        !stale &&
                        service.verificationStatus ===
                          'verified'
                          ? 'bg-emerald-50 text-emerald-800'
                          : 'bg-amber-50 text-amber-900'
                      }`}
                    >
                      {verificationLabel(
                        service,
                      )}
                    </span>
                  </div>
                </div>

                <dl className="mt-6 space-y-4">
                  <div className="border-t border-isr-light-blue/20 pt-4">
                    <dt className="text-xs font-bold uppercase tracking-wide text-gray-500">
                      Schedule rule
                    </dt>

                    <dd className="mt-1 text-sm leading-relaxed text-gray-700">
                      {service.timeRule}
                    </dd>
                  </div>

                  <div className="border-t border-isr-light-blue/20 pt-4">
                    <dt className="text-xs font-bold uppercase tracking-wide text-gray-500">
                      Venue
                    </dt>

                    <dd className="mt-1 text-sm font-semibold text-isr-dark-red">
                      {service.venue}
                    </dd>
                  </div>

                  <div className="grid gap-4 border-t border-isr-light-blue/20 pt-4 sm:grid-cols-2">
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-wide text-gray-500">
                        Brothers
                      </dt>

                      <dd className="mt-1 text-sm leading-relaxed text-gray-700">
                        {service.brothers}
                      </dd>
                    </div>

                    <div>
                      <dt className="text-xs font-bold uppercase tracking-wide text-gray-500">
                        Sisters
                      </dt>

                      <dd className="mt-1 text-sm leading-relaxed text-gray-700">
                        {service.sisters}
                      </dd>
                    </div>
                  </div>
                </dl>

                <p className="mt-5 rounded-xl bg-isr-cream/60 px-4 py-3 text-xs leading-relaxed text-gray-600">
                  {service.notes}
                </p>
              </article>
            )
          },
        )}
      </div>

      <div className="mt-6 rounded-2xl border border-isr-yellow bg-isr-yellow/25 p-5 sm:flex sm:items-center sm:justify-between sm:gap-6">
        <div>
          <p className="font-bold text-isr-dark-red">
            Temporary Jumu’ah changes
          </p>

          <p className="mt-1 text-sm leading-relaxed text-gray-700">
            Exceptional room, access or timing changes are published through ISR Updates rather than changing the permanent campus record.
          </p>
        </div>

        <Link
          href="/updates"
          className="mt-4 inline-flex shrink-0 rounded-xl bg-isr-dark-red px-4 py-2.5 text-sm font-bold text-white transition hover:bg-isr-turquoise sm:mt-0"
        >
          Check ISR Updates
        </Link>
      </div>

      <div className="mt-6 rounded-2xl border border-isr-light-blue/25 bg-white p-5">
        <p className="font-bold text-isr-dark-red">
          Brunswick
        </p>

        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          There is currently no ISR Jumu’ah service at the Brunswick campus.
        </p>
      </div>
    </div>
  )
}
