'use client'

import {
  useEffect,
  useMemo,
  useState,
} from 'react'
import Link from 'next/link'
import CampusActivityFeed from '@/components/CampusActivityFeed'
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
      'Prayer spaces, Friday prayer and ISR activity around RMIT City.',
  },
  {
    key: 'bundoora',
    label: 'Bundoora',
    description:
      'Prayer spaces across Bundoora East and West, Friday prayer and campus activity.',
  },
  {
    key: 'brunswick',
    label: 'Brunswick',
    description:
      'Prayer information and the ISR activity relevant to students at Brunswick.',
  },
]

function campusKey(
  value: string,
): CampusKey {
  const normalized = value.toLowerCase()

  if (normalized.includes('bundoora')) {
    return 'bundoora'
  }

  if (normalized.includes('brunswick')) {
    return 'brunswick'
  }

  return 'city'
}

const FALLBACK_SPACES: CampusSpace[] = PRAYER_SPACES.map(
  (space) => ({
    key: space.id,
    campus: space.campus,
    name: space.name,
    building: space.building,
    room: space.room,
    accessHours: space.accessHours,
    href: `/pray#${space.id}`,
  }),
)

const FALLBACK_JUMUAH: CampusJumuah[] = JUMUAH_SERVICES.map(
  (service) => ({
    key: service.id,
    campus: service.campus,
    venue: service.venue,
    schedule: service.time,
  }),
)

export default function CampusGuide2Experience() {
  const [spaces, setSpaces] = useState<CampusSpace[]>(FALLBACK_SPACES)
  const [jumuah, setJumuah] = useState<CampusJumuah[]>(FALLBACK_JUMUAH)

  useEffect(() => {
    let active = true

    fetchPrayerRecords()
      .then((data) => {
        if (!active) {
          return
        }

        if (data.prayerSpaces.length > 0) {
          setSpaces(
            data.prayerSpaces.map((space) => ({
              key: space.slug,
              campus: space.campus,
              name: space.name,
              building: space.building,
              room: space.room,
              accessHours: space.accessHours,
              href: `/pray#${space.slug}`,
            })),
          )
        }

        if (data.jumuahServices.length > 0) {
          setJumuah(
            data.jumuahServices.map((service) => ({
              key: service.slug,
              campus: service.campus,
              venue: service.venue,
              schedule: service.timeRule,
            })),
          )
        }
      })
      .catch(() => {
        // Static verified ISR prayer records remain the safe fallback.
      })

    return () => {
      active = false
    }
  }, [])

  const campusData = useMemo(
    () =>
      CAMPUSES.map((campus) => ({
        ...campus,
        spaces: spaces.filter(
          (space) => campusKey(space.campus) === campus.key,
        ),
        jumuah: jumuah.filter(
          (service) => campusKey(service.campus) === campus.key,
        ),
      })),
    [spaces, jumuah],
  )

  return (
    <div>
      <nav
        aria-label="Choose your RMIT campus"
        className="grid gap-3 sm:grid-cols-3"
      >
        {CAMPUSES.map((campus) => (
          <a
            key={campus.key}
            href={`#${campus.key}`}
            className="group border-t-4 border-isr-turquoise bg-isr-cream/60 px-5 py-5 transition hover:bg-isr-cream"
          >
            <span className="block text-lg font-bold text-isr-dark-red">
              {campus.label}
            </span>
            <span className="mt-1 block text-sm leading-relaxed text-gray-600">
              Prayer · Jumu&apos;ah · What&apos;s on
            </span>
            <span className="mt-3 inline-flex min-h-8 items-center text-sm font-bold text-isr-turquoise transition group-hover:text-isr-dark-red">
              Open campus guide ↓
            </span>
          </a>
        ))}
      </nav>

      <div className="mt-12 space-y-14 sm:mt-16 sm:space-y-20">
        {campusData.map((campus) => (
          <section
            key={campus.key}
            id={campus.key}
            className="scroll-mt-28"
          >
            <div className="border-b border-isr-light-blue/25 pb-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-turquoise">
                RMIT campus
              </p>

              <div className="mt-3 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <h2 className="text-4xl font-bold tracking-tight text-isr-dark-red sm:text-5xl">
                    {campus.label}
                  </h2>

                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-700">
                    {campus.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/pray"
                    className="isr-button-secondary"
                  >
                    Prayer times
                  </Link>

                  <Link
                    href={
                      '/events?campus=' +
                      encodeURIComponent(campus.label)
                    }
                    className="isr-button-primary"
                  >
                    What&apos;s on here
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-7 grid gap-8 lg:grid-cols-[1.18fr_0.82fr]">
              <div>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-isr-turquoise">
                      Pray on campus
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-isr-dark-red">
                      Prayer spaces
                    </h3>
                  </div>

                  <Link
                    href="/pray#spaces"
                    className="hidden text-sm font-bold text-isr-turquoise transition hover:text-isr-dark-red sm:inline-flex"
                  >
                    All prayer details →
                  </Link>
                </div>

                {campus.spaces.length > 0 ? (
                  <div className="mt-5 divide-y divide-isr-light-blue/20 border-y border-isr-light-blue/20">
                    {campus.spaces.map((space) => (
                      <article
                        key={space.key}
                        className="grid gap-3 py-5 sm:grid-cols-[1fr_auto] sm:items-center"
                      >
                        <div>
                          <h4 className="text-lg font-bold text-isr-dark-red">
                            {space.name}
                          </h4>

                          <p className="mt-1 text-sm font-semibold text-gray-700">
                            {space.building}
                          </p>

                          <p className="mt-1 text-sm leading-relaxed text-gray-600">
                            {space.room}
                          </p>

                          <p className="mt-2 text-xs leading-relaxed text-gray-500">
                            Access: {space.accessHours}
                          </p>
                        </div>

                        <Link
                          href={space.href}
                          className="inline-flex min-h-11 items-center font-bold text-isr-turquoise transition hover:text-isr-dark-red"
                        >
                          Open details →
                        </Link>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="mt-5 border-l-4 border-isr-yellow bg-isr-yellow/20 px-5 py-4">
                    <p className="font-bold text-isr-dark-red">
                      No ISR prayer-space record is currently listed for this campus.
                    </p>
                  </div>
                )}
              </div>

              <aside>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-isr-turquoise">
                  Friday
                </p>
                <h3 className="mt-2 text-2xl font-bold text-isr-dark-red">
                  Jumu&apos;ah
                </h3>

                {campus.jumuah.length > 0 ? (
                  <div className="mt-5 space-y-3">
                    {campus.jumuah.map((service) => (
                      <article
                        key={service.key}
                        className="bg-isr-dark-red p-5 text-white"
                      >
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-isr-yellow">
                          ISR Jumu&apos;ah
                        </p>

                        <p className="mt-3 text-lg font-bold leading-relaxed">
                          {service.venue}
                        </p>

                        <p className="mt-2 text-sm leading-relaxed text-white/75">
                          {service.schedule}
                        </p>

                        <Link
                          href="/pray#jumuah"
                          className="mt-4 inline-flex min-h-11 items-center text-sm font-bold text-isr-yellow transition hover:text-white"
                        >
                          Check Friday details →
                        </Link>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="mt-5 border-l-4 border-isr-yellow bg-isr-yellow/20 px-5 py-4">
                    <p className="font-bold text-isr-dark-red">
                      No ISR Jumu&apos;ah service is currently listed for {campus.label}.
                    </p>

                    <p className="mt-2 text-sm leading-relaxed text-gray-700">
                      Check the Prayer page and ISR Updates before making Friday prayer plans.
                    </p>

                    <Link
                      href="/pray#jumuah"
                      className="mt-3 inline-flex min-h-11 items-center text-sm font-bold text-isr-turquoise transition hover:text-isr-dark-red"
                    >
                      View Jumu&apos;ah information →
                    </Link>
                  </div>
                )}
              </aside>
            </div>

            <div className="mt-10">
              <CampusActivityFeed
                campusKey={campus.key}
                campusLabel={campus.label}
              />
            </div>

            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 border-t border-isr-light-blue/20 pt-6 text-sm">
              <Link
                href="/student-guide"
                className="isr-text-link"
              >
                New student guide →
              </Link>

              <Link
                href="/support"
                className="isr-text-link"
              >
                Student support →
              </Link>

              <Link
                href="/updates"
                className="isr-text-link"
              >
                ISR updates →
              </Link>
            </div>
          </section>
        ))}
      </div>

      <section className="mt-16 border-t border-isr-light-blue/20 pt-10 sm:mt-20">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-turquoise">
              Need something else?
            </p>

            <h2 className="mt-3 text-2xl font-bold text-isr-dark-red sm:text-3xl">
              Continue from campus into the wider ISR community
            </h2>

            <p className="mt-3 max-w-2xl leading-relaxed text-gray-700">
              Find student support, regular activities, the new-student guide or ways to get involved.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/student-guide"
              className="isr-button-secondary"
            >
              New to RMIT
            </Link>

            <Link
              href="/join"
              className="isr-button-primary"
            >
              Join ISR
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
