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
  service: JumuahServiceRecord,
  now: Date | null,
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
  service: JumuahServiceRecord,
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
  ] = useState<
    JumuahServiceRecord[] | null
  >(null)

  const [
    now,
    setNow,
  ] = useState<Date | null>(
    null,
  )

  useEffect(() => {
    setNow(new Date())

    let active = true

    fetchPrayerRecords()
      .then((data) => {
        if (
          active &&
          data.jumuahServices.length > 0
        ) {
          setRecords(
            data.jumuahServices,
          )
        }
      })
      .catch(() => {
        /* Safe fallback to verified static records. */
      })

    return () => {
      active = false
    }
  }, [])

  if (!records) {
    return <JumuahServices />
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
                className="overflow-hidden rounded-[1.75rem] border border-isr-light-blue/20 bg-white shadow-sm"
              >
                <div className="border-b border-isr-light-blue/20 bg-white px-6 py-6 sm:px-7">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-turquoise">
                        Jumu’ah
                      </p>

                      <h3 className="mt-2 text-2xl font-bold text-isr-dark-red">
                        {service.campus}
                      </h3>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold text-isr-dark-red">
                        {currentTime(
                          service,
                          now,
                        )}
                      </p>

                      <span
                        className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-bold ${
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
                </div>

                <div className="px-6 py-6 sm:px-7">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <dl className="sm:col-span-2">
                      <dt className="text-xs font-bold uppercase tracking-wide text-gray-500">
                        Venue
                      </dt>

                      <dd className="mt-1 text-base font-semibold leading-relaxed text-isr-dark-red">
                        {service.venue}
                      </dd>
                    </dl>

                    <dl>
                      <dt className="text-xs font-bold uppercase tracking-wide text-gray-500">
                        Brothers
                      </dt>

                      <dd className="mt-1 text-sm leading-relaxed text-gray-700">
                        {service.brothers}
                      </dd>
                    </dl>

                    <dl>
                      <dt className="text-xs font-bold uppercase tracking-wide text-gray-500">
                        Sisters
                      </dt>

                      <dd className="mt-1 text-sm leading-relaxed text-gray-700">
                        {service.sisters}
                      </dd>
                    </dl>
                  </div>

                  {service.slug ===
                    'bundoora-jumuah' && (
                    <p className="mt-5 border-l-2 border-isr-yellow bg-isr-yellow/20 px-4 py-3 text-sm leading-relaxed text-gray-700">
                      {service.timeRule}
                    </p>
                  )}

                  {service.notes && (
                    <p className="mt-5 text-xs leading-relaxed text-gray-500">
                      {service.notes}
                    </p>
                  )}
                </div>
              </article>
            )
          },
        )}
      </div>

      <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-isr-yellow bg-isr-yellow/25 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-bold text-isr-dark-red">
            Check for temporary Friday changes
          </p>

          <p className="mt-1 text-sm leading-relaxed text-gray-700">
            Exceptional room, access or timing changes are published through ISR Updates.
          </p>
        </div>

        <Link
          href="/updates"
          className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-isr-dark-red px-5 py-2.5 text-sm font-bold text-white transition hover:bg-isr-turquoise"
        >
          Check ISR Updates
        </Link>
      </div>
    </div>
  )
}
