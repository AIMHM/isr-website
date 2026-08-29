'use client'

import {
  useEffect,
  useState,
} from 'react'
import {
  JUMUAH_SERVICES,
} from '@/lib/siteContent'
import {
  fetchPrayerRecords,
  isPrayerRecordStale,
  type JumuahServiceRecord,
} from '@/lib/prayerRecords'
import {
  isMelbourneDaylightSaving,
} from '@/lib/prayerGovernance'

type DisplayService = {
  id: string
  campus: string
  venue: string
  time: string
  caution: boolean
}

function currentTime(
  service:
    JumuahServiceRecord,
  now: Date,
): string {
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

const FALLBACK:
  DisplayService[] =
  JUMUAH_SERVICES.map(
    (service) => ({
      id:
        service.id,
      campus:
        service.campus,
      venue:
        service.venue,
      time:
        service.time,
      caution:
        true,
    }),
  )

export default function HomeJumuahSnapshot() {
  const [
    services,
    setServices,
  ] =
    useState<
      DisplayService[]
    >(FALLBACK)

  useEffect(() => {
    let active =
      true

    fetchPrayerRecords()
      .then(
        (data) => {
          if (
            !active ||
            data.jumuahServices
              .length === 0
          ) {
            return
          }

          const now =
            new Date()

          setServices(
            data.jumuahServices.map(
              (service) => ({
                id:
                  String(
                    service.id,
                  ),
                campus:
                  service.campus,
                venue:
                  service.venue,
                time:
                  currentTime(
                    service,
                    now,
                  ),
                caution:
                  isPrayerRecordStale(
                    service,
                  ) ||
                  service
                    .verificationStatus !==
                    'verified',
              }),
            ),
          )
        },
      )
      .catch(() => {
        /*
         * Existing public ISR Jumu’ah
         * information remains the fallback.
         */
      })

    return () => {
      active =
        false
    }
  }, [])

  return (
    <div className="mt-6 space-y-3">
      {services.map(
        (service) => (
          <div
            key={service.id}
            className="rounded-2xl border border-white/10 bg-white/[0.08] p-4 sm:p-5"
          >
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="font-bold">
                  {service.campus}
                </p>

                <p className="mt-1 text-sm leading-relaxed text-white/60">
                  {service.venue}
                </p>

                {service.caution && (
                  <p className="mt-2 text-xs font-semibold text-isr-yellow">
                    Check before travel
                  </p>
                )}
              </div>

              <p className="shrink-0 text-right font-bold text-isr-yellow">
                {service.time}
              </p>
            </div>
          </div>
        ),
      )}
    </div>
  )
}