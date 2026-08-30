'use client'

import Link from 'next/link'
import {
  useEffect,
  useMemo,
  useState,
} from 'react'
import NextPrayerCountdown from '@/components/NextPrayerCountdown'
import {
  fetchAnnouncements,
  type Announcement,
} from '@/lib/announcements'

const studentActions = [
  {
    label: 'Prayer',
    title: 'Find somewhere to pray',
    description:
      'Prayer times, musallah locations, opening hours and campus directions.',
    href: '/pray',
  },
  {
    label: 'Friday',
    title: 'Find Jumu’ah',
    description:
      'Current Friday prayer times, rooms and campus-specific information.',
    href: '/pray#jumuah',
  },
  {
    label: 'What’s on',
    title: 'See what is happening',
    description:
      'Events, classes, workshops, socials and recurring ISR programs.',
    href: '/events',
  },
  {
    label: 'Starting out',
    title: 'New to RMIT?',
    description:
      'Get the Muslim student essentials sorted without searching everywhere.',
    href: '/student-guide',
  },
  {
    label: 'Community',
    title: 'Join ISR',
    description:
      'Become a free member, join the community or find a way to volunteer.',
    href: '/join',
  },
  {
    label: 'Support',
    title: 'I need help',
    description:
      'Find the right starting point when something is affecting student life.',
    href: '/support',
  },
]

function priorityScore(
  announcement: Announcement,
): number {
  let score = announcement.pinned
    ? 100
    : 0

  if (
    announcement.priority ===
    'urgent'
  ) {
    score += 30
  }
  else if (
    announcement.priority ===
    'important'
  ) {
    score += 20
  }
  else {
    score += 10
  }

  return score
}

export default function HomeExperience() {
  const [
    announcements,
    setAnnouncements,
  ] = useState<Announcement[]>([])

  useEffect(() => {
    let active = true

    fetchAnnouncements()
      .then((data) => {
        if (active) {
          setAnnouncements(data)
        }
      })
      .catch(() => {
        if (active) {
          setAnnouncements([])
        }
      })

    return () => {
      active = false
    }
  }, [])

  const importantUpdate =
    useMemo(
      () =>
        [...announcements]
          .sort(
            (a, b) =>
              priorityScore(b) -
              priorityScore(a),
          )
          .find(
            (item) =>
              item.pinned ||
              item.priority ===
                'urgent' ||
              item.priority ===
                'important',
          ),
      [announcements],
    )

  return (
    <>
      <section className="relative overflow-hidden bg-isr-dark-red px-4 py-14 text-white sm:py-20 lg:py-24">
        <div
          aria-hidden="true"
          className="absolute -right-28 -top-32 h-96 w-96 rounded-full bg-isr-turquoise/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-36 -left-28 h-96 w-96 rounded-full bg-isr-yellow/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.22)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.22)_1px,transparent_1px)] [background-size:42px_42px]"
        />

        <div className="container-isr relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-isr-yellow sm:text-sm">
              Islamic Society of RMIT
            </p>

            <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
              The home of Muslim students at RMIT.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/78 sm:text-xl">
              Pray, learn, belong and get support across City,
              Bundoora and Brunswick — without having to work out
              where to look first.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/pray"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 font-bold text-isr-dark-red transition hover:bg-isr-yellow"
              >
                Pray at RMIT
              </Link>

              <Link
                href="/student-guide"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-6 py-3 font-bold text-white transition hover:bg-white/10"
              >
                New student guide
              </Link>

              <Link
                href="/events"
                className="inline-flex min-h-12 items-center justify-center px-3 py-3 font-bold text-isr-yellow transition hover:text-white"
              >
                See what’s on →
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-2 text-xs font-semibold text-white/65 sm:text-sm">
              <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5">
                Free membership
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5">
                City
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5">
                Bundoora
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5">
                Brunswick
              </span>
            </div>
          </div>

          <div className="lg:pl-2">
            <NextPrayerCountdown />

            <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/10 p-4 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between">
              <p>
                Times shown are Melbourne prayer-time references.
              </p>

              <Link
                href="/pray"
                className="shrink-0 font-bold text-isr-yellow hover:text-white"
              >
                Full prayer guide →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {importantUpdate && (
        <section className="border-b border-isr-yellow/60 bg-isr-yellow/45 px-4 py-4">
          <div className="container-isr mx-auto max-w-7xl">
            <Link
              href="/updates"
              className="group grid min-h-12 gap-3 sm:grid-cols-[auto_1fr_auto] sm:items-center"
            >
              <span className="w-fit rounded-full bg-isr-dark-red px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white">
                {importantUpdate.priority ===
                'urgent'
                  ? 'Urgent'
                  : importantUpdate.pinned
                    ? 'Pinned'
                    : 'Important'}
              </span>

              <div className="min-w-0">
                <p className="font-bold text-isr-dark-red">
                  {importantUpdate.title}
                </p>
                <p className="mt-0.5 line-clamp-1 text-sm text-gray-700">
                  {importantUpdate.body}
                </p>
              </div>

              <span className="font-bold text-isr-dark-red transition-transform group-hover:translate-x-1">
                Read →
              </span>
            </Link>
          </div>
        </section>
      )}

      <section className="bg-isr-cream/45 px-4 py-14 sm:py-18">
        <div className="container-isr mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-isr-turquoise">
              Start here
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-isr-dark-red sm:text-4xl">
              What do you need right now?
            </h2>

            <p className="mt-4 max-w-2xl leading-relaxed text-gray-700">
              The fastest routes to the things Muslim students use most.
            </p>
          </div>

          <div className="mt-8 grid gap-px overflow-hidden rounded-[1.75rem] border border-isr-light-blue/25 bg-isr-light-blue/25 sm:grid-cols-2 lg:grid-cols-3">
            {studentActions.map(
              (item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group min-h-44 bg-white p-6 transition hover:bg-isr-yellow/25 sm:p-7"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-bold uppercase tracking-[0.16em] text-isr-turquoise">
                      {item.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-lg font-bold text-isr-turquoise transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-bold leading-snug text-isr-dark-red">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    {item.description}
                  </p>
                </Link>
              ),
            )}
          </div>
        </div>
      </section>
    </>
  )
}
