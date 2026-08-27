'use client'

import {
  useEffect,
  useMemo,
  useState,
} from 'react'
import Link from 'next/link'
import {
  JUMUAH_SERVICES,
  PRAYER_SPACES,
} from '@/lib/siteContent'
import {
  fetchPrayerRecords,
} from '@/lib/prayerRecords'

type CampusKey =
  | 'city'
  | 'bundoora'
  | 'brunswick'

type CampusSpace = {
  key: string
  campus: string
  name: string
  building: string
  room: string
  accessHours: string
  href: string
}

type CampusJumuah = {
  key: string
  campus: string
  venue: string
  schedule: string
}

const CAMPUSES: {
  key: CampusKey
  label: string
  description: string
}[] = [
  {
    key: 'city',
    label: 'City',
    description:
      'Prayer, Jumu’ah and Muslim student essentials for RMIT City campus.',
  },
  {
    key: 'bundoora',
    label: 'Bundoora',
    description:
      'Bundoora East and West prayer information, Jumu’ah and campus links.',
  },
  {
    key: 'brunswick',
    label: 'Brunswick',
    description:
      'Brunswick prayer information and quick access to ISR services.',
  },
]

function campusKey(
  value: string,
): CampusKey {
  const normalized =
    value.toLowerCase()

  if (
    normalized.includes(
      'bundoora',
    )
  ) {
    return 'bundoora'
  }

  if (
    normalized.includes(
      'brunswick',
    )
  ) {
    return 'brunswick'
  }

  return 'city'
}

const FALLBACK_SPACES:
  CampusSpace[] =
    PRAYER_SPACES.map(
      (space) => ({
        key: space.id,
        campus:
          space.campus,
        name:
          space.name,
        building:
          space.building,
        room:
          space.room,
        accessHours:
          space.accessHours,
        href:
          `/pray#${space.id}`,
      }),
    )

const FALLBACK_JUMUAH:
  CampusJumuah[] =
    JUMUAH_SERVICES.map(
      (service) => ({
        key:
          service.id,
        campus:
          service.campus,
        venue:
          service.venue,
        schedule:
          service.time,
      }),
    )

export default function CampusGuide2Experience() {
  const [
    spaces,
    setSpaces,
  ] =
    useState<
      CampusSpace[]
    >(
      FALLBACK_SPACES,
    )

  const [
    jumuah,
    setJumuah,
  ] =
    useState<
      CampusJumuah[]
    >(
      FALLBACK_JUMUAH,
    )

  const [
    managed,
    setManaged,
  ] =
    useState(false)

  useEffect(() => {
    let active =
      true

    fetchPrayerRecords()
      .then(
        (data) => {
          if (!active) {
            return
          }

          if (
            data.prayerSpaces
              .length > 0
          ) {
            setSpaces(
              data.prayerSpaces.map(
                (space) => ({
                  key:
                    space.slug,
                  campus:
                    space.campus,
                  name:
                    space.name,
                  building:
                    space.building,
                  room:
                    space.room,
                  accessHours:
                    space.accessHours,
                  href:
                    `/pray#${space.slug}`,
                }),
              ),
            )

            setManaged(true)
          }

          if (
            data.jumuahServices
              .length > 0
          ) {
            setJumuah(
              data.jumuahServices.map(
                (service) => ({
                  key:
                    service.slug,
                  campus:
                    service.campus,
                  venue:
                    service.venue,
                  schedule:
                    service.timeRule,
                }),
              ),
            )
          }
        },
      )
      .catch(() => {
        // Static ISR prayer records remain the safe fallback.
      })

    return () => {
      active = false
    }
  }, [])

  const campusData =
    useMemo(
      () =>
        CAMPUSES.map(
          (campus) => ({
            ...campus,
            spaces:
              spaces.filter(
                (space) =>
                  campusKey(
                    space.campus,
                  ) ===
                  campus.key,
              ),
            jumuah:
              jumuah.filter(
                (service) =>
                  campusKey(
                    service.campus,
                  ) ===
                  campus.key,
              ),
          }),
        ),
      [
        spaces,
        jumuah,
      ],
    )

  return (
    <div>
      <nav
        aria-label="Campus shortcuts"
        className="flex flex-wrap gap-2"
      >
        {CAMPUSES.map(
          (campus) => (
            <a
              key={campus.key}
              href={`#${campus.key}`}
              className="isr-campus-pill bg-isr-cream text-isr-dark-red transition hover:bg-isr-turquoise hover:text-white"
            >
              {campus.label}
            </a>
          ),
        )}
      </nav>

      <div className="mt-8 grid gap-6">
        {campusData.map(
          (campus) => (
            <section
              key={campus.key}
              id={campus.key}
              className="scroll-mt-28 rounded-[2rem] border border-isr-light-blue/20 bg-white p-6 shadow-sm sm:p-8"
            >
              <div className="grid gap-7 lg:grid-cols-[0.72fr_1.28fr]">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-turquoise">
                    RMIT campus
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-isr-dark-red">
                    {campus.label}
                  </h2>

                  <p className="mt-4 leading-relaxed text-gray-700">
                    {campus.description}
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-isr-cream p-4">
                      <p className="text-2xl font-bold text-isr-dark-red">
                        {campus.spaces.length}
                      </p>

                      <p className="mt-1 text-xs font-bold uppercase tracking-wide text-gray-500">
                        Prayer locations
                      </p>
                    </div>

                    <div className="rounded-2xl bg-isr-cream p-4">
                      <p className="text-sm font-bold text-isr-dark-red">
                        {campus.jumuah.length > 0
                          ? 'Available'
                          : 'Not listed'}
                      </p>

                      <p className="mt-2 text-xs font-bold uppercase tracking-wide text-gray-500">
                        ISR Jumu’ah
                      </p>
                    </div>
                  </div>

                  {managed && (
                    <p className="mt-4 text-xs font-semibold text-emerald-700">
                      Using published ISR-managed prayer records.
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  {campus.spaces.map(
                    (space) => (
                      <article
                        key={space.key}
                        className="rounded-2xl border border-isr-light-blue/20 bg-isr-cream/35 p-5"
                      >
                        <h3 className="text-lg font-bold text-isr-dark-red">
                          {space.name}
                        </h3>

                        <p className="mt-2 text-sm font-semibold text-gray-700">
                          {space.building}
                        </p>

                        <p className="mt-2 text-sm leading-relaxed text-gray-600">
                          {space.room}
                        </p>

                        <p className="mt-2 text-xs leading-relaxed text-gray-500">
                          Published access: {space.accessHours}
                        </p>

                        <Link
                          href={space.href}
                          className="mt-4 inline-flex text-sm font-bold text-isr-dark-red underline underline-offset-4"
                        >
                          Open prayer details
                        </Link>
                      </article>
                    ),
                  )}

                  {campus.jumuah.map(
                    (service) => (
                      <article
                        key={service.key}
                        className="rounded-2xl bg-isr-dark-red p-5 text-white"
                      >
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-yellow">
                          Friday prayer
                        </p>

                        <p className="mt-3 font-bold">
                          {service.venue}
                        </p>

                        <p className="mt-2 text-sm leading-relaxed text-white/70">
                          {service.schedule}
                        </p>

                        <Link
                          href="/pray#jumuah"
                          className="mt-4 inline-flex text-sm font-bold text-isr-yellow underline underline-offset-4"
                        >
                          Check Jumu’ah details
                        </Link>
                      </article>
                    ),
                  )}

                  {campus.jumuah.length === 0 && (
                    <div className="rounded-2xl border border-isr-yellow bg-isr-yellow/20 p-5">
                      <p className="font-bold text-isr-dark-red">
                        No ISR Jumu’ah service is currently listed for this campus.
                      </p>

                      <p className="mt-2 text-sm leading-relaxed text-gray-700">
                        Check the Prayer page and ISR Updates before making Friday prayer plans.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>
          ),
        )}
      </div>

      <section className="mt-10 rounded-[2rem] bg-isr-dark-red p-6 text-white sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-yellow">
          Around your campus
        </p>

        <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
          More than prayer spaces
        </h2>

        <p className="mt-3 max-w-3xl leading-relaxed text-white/70">
          Move from your campus guide into ISR activities, student support and operational updates.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/pray"
            className="rounded-xl bg-white px-4 py-4 text-center text-sm font-bold text-isr-dark-red transition hover:bg-isr-yellow"
          >
            Pray at RMIT
          </Link>

          <Link
            href="/events"
            className="rounded-xl border border-white/20 px-4 py-4 text-center text-sm font-bold text-white transition hover:bg-white/10"
          >
            What’s On
          </Link>

          <Link
            href="/support"
            className="rounded-xl border border-white/20 px-4 py-4 text-center text-sm font-bold text-white transition hover:bg-white/10"
          >
            Student Support
          </Link>

          <Link
            href="/updates"
            className="rounded-xl border border-white/20 px-4 py-4 text-center text-sm font-bold text-white transition hover:bg-white/10"
          >
            ISR Updates
          </Link>
        </div>
      </section>
    </div>
  )
}
