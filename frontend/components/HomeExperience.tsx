'use client'

import {
  useEffect,
  useMemo,
  useState,
} from 'react'
import Link from 'next/link'
import EventCard from '@/components/EventCard'
import type {
  Event,
} from '@/lib/events'
import {
  fetchEvents,
} from '@/lib/events'
import {
  fetchAnnouncements,
  type Announcement,
} from '@/lib/announcements'
import {
  ISR_PUBLIC,
  JUMUAH_SERVICES,
} from '@/lib/siteContent'

const quickActions = [
  {
    number: '01',
    title: 'I need somewhere to pray',
    description:
      'Find your campus prayer room, wudu information and current Jumu’ah arrangements.',
    href: '/pray',
    action: 'Pray at RMIT',
  },
  {
    number: '02',
    title: 'What is happening?',
    description:
      'See upcoming programs, events, workshops and community activities.',
    href: '/events',
    action: 'View events',
  },
  {
    number: '03',
    title: 'I need support',
    description:
      'Raise something affecting your experience as a Muslim student at RMIT.',
    href: '/support',
    action: 'Talk to ISR',
  },
  {
    number: '04',
    title: 'I want to get involved',
    description:
      'Join the community, become a member, volunteer or take on a team role.',
    href: '/join',
    action: 'Join ISR',
  },
]

const whatWeDo = [
  {
    title: 'Prayer & Jumu’ah',
    text: 'Helping Muslim students find and use prayer spaces across RMIT.',
  },
  {
    title: 'Islamic learning',
    text: 'Classes, reminders, workshops and opportunities to strengthen knowledge.',
  },
  {
    title: 'Community',
    text: 'Events and spaces where Muslim students can meet, connect and belong.',
  },
  {
    title: 'Student support',
    text: 'A starting point when something is affecting your Muslim student experience.',
  },
  {
    title: 'Representation',
    text: 'Representing Muslim student needs and concerns on campus.',
  },
  {
    title: 'Service & leadership',
    text: 'Opportunities to volunteer, contribute, develop and lead.',
  },
]

function priorityScore(
  announcement: Announcement,
): number {
  let score =
    announcement.pinned
      ? 100
      : 0

  if (
    announcement.priority ===
    'urgent'
  ) {
    score += 30
  } else if (
    announcement.priority ===
    'important'
  ) {
    score += 20
  } else {
    score += 10
  }

  return score
}

export default function HomeExperience() {
  const [
    events,
    setEvents,
  ] =
    useState<Event[]>([])

  const [
    announcements,
    setAnnouncements,
  ] =
    useState<Announcement[]>([])

  const [
    loading,
    setLoading,
  ] =
    useState(true)

  useEffect(() => {
    Promise.all([
      fetchEvents('upcoming'),
      fetchAnnouncements(),
    ])
      .then(
        ([
          eventData,
          announcementData,
        ]) => {
          setEvents(
            eventData.slice(
              0,
              3,
            ),
          )

          setAnnouncements(
            announcementData,
          )
        },
      )
      .catch(() => {
        setEvents([])
        setAnnouncements([])
      })
      .finally(() =>
        setLoading(false),
      )
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
    <main id="main-content">
      <section className="relative overflow-hidden bg-isr-dark-red px-4 py-14 text-white sm:py-20 lg:py-24">
        <div
          aria-hidden="true"
          className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-isr-turquoise/20 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-isr-yellow/10 blur-3xl"
        />

        <div className="container-isr relative mx-auto grid max-w-7xl gap-9 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-14">
          <div className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-isr-yellow sm:text-sm">
              Islamic Society of RMIT
            </p>

            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">
              {ISR_PUBLIC.tagline}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:mt-6 sm:text-xl">
              Prayer. Islamic learning. Community.
              Support. Representation. A place to belong
              throughout your time at RMIT.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
              <Link
                href="/pray"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 font-bold text-isr-dark-red transition hover:bg-isr-yellow"
              >
                Find a prayer room
              </Link>

              <Link
                href="/join"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-6 py-3 font-bold text-white transition hover:bg-white/10"
              >
                Join ISR
              </Link>
            </div>

            <div className="mt-7 grid max-w-xl grid-cols-1 gap-2 text-sm text-white/70 sm:grid-cols-2 sm:gap-4">
              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="text-white/60">
                  Membership
                </span>

                <strong className="ml-2 text-white">
                  Free
                </strong>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                City • Bundoora • Brunswick
              </div>
            </div>
          </div>

          <aside className="rounded-[1.75rem] border border-white/15 bg-white/10 p-5 backdrop-blur sm:p-7 lg:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-isr-yellow sm:text-sm">
                  Friday prayer
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  Jumu’ah at RMIT
                </h2>
              </div>

              <Link
                href="/pray#jumuah"
                className="hidden text-sm font-bold text-isr-yellow sm:inline-flex"
              >
                Full details →
              </Link>
            </div>

            <div className="mt-5 space-y-3">
              {JUMUAH_SERVICES.map(
                (service) => (
                  <div
                    key={service.id}
                    className="rounded-2xl border border-white/10 bg-white/10 p-4 sm:p-5"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <p className="font-bold">
                        {service.campus}
                      </p>

                      <p className="font-bold text-isr-yellow">
                        {service.time}
                      </p>
                    </div>

                    <p className="mt-2 text-sm leading-relaxed text-white/70">
                      {service.venue}
                    </p>
                  </div>
                ),
              )}
            </div>

            <Link
              href="/pray#jumuah"
              className="mt-5 inline-flex text-sm font-bold text-isr-yellow sm:hidden"
            >
              Full Jumu’ah information →
            </Link>
          </aside>
        </div>
      </section>

      <section className="bg-isr-cream/55 px-4 py-14 sm:py-18">
        <div className="container-isr mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-isr-turquoise">
              Find what you need
            </p>

            <h2 className="mt-3 text-3xl font-bold leading-tight text-isr-dark-red sm:text-4xl">
              What can ISR help you with?
            </h2>

            <p className="mt-4 max-w-2xl leading-relaxed text-gray-700">
              You should not need to know how ISR is
              structured to find what you need.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 xl:grid-cols-4">
            {quickActions.map(
              (item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="isr-card isr-card-interactive group flex min-h-0 flex-col p-5 sm:min-h-60 sm:p-6"
                >
                  <span className="text-xs font-bold text-isr-turquoise">
                    {item.number}
                  </span>

                  <h3 className="mt-4 text-xl font-bold leading-snug text-isr-dark-red">
                    {item.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-700">
                    {item.description}
                  </p>

                  <span className="mt-6 font-bold text-isr-turquoise">
                    {item.action}{' '}
                    <span
                      aria-hidden="true"
                      className="inline-block transition group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </Link>
              ),
            )}
          </div>
        </div>
      </section>

      {importantUpdate && (
        <section className="px-4 py-10 sm:py-12">
          <div className="container-isr mx-auto max-w-7xl">
            <div className="rounded-[1.75rem] border border-isr-yellow bg-isr-yellow/30 p-5 sm:p-7">
              <div className="grid gap-5 lg:grid-cols-[auto_1fr_auto] lg:items-center">
                <span className="inline-flex w-fit rounded-full bg-isr-dark-red px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
                  {importantUpdate.priority ===
                  'urgent'
                    ? 'Urgent update'
                    : importantUpdate.pinned
                      ? 'Pinned update'
                      : 'Important update'}
                </span>

                <div>
                  <h2 className="text-xl font-bold text-isr-dark-red">
                    {importantUpdate.title}
                  </h2>

                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-700">
                    {importantUpdate.body}
                  </p>
                </div>

                <Link
                  href="/updates"
                  className="font-bold text-isr-dark-red"
                >
                  ISR Updates →
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="bg-white px-4 py-14 sm:py-20">
        <div className="container-isr mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-isr-turquoise">
                Upcoming
              </p>

              <h2 className="mt-3 text-3xl font-bold leading-tight text-isr-dark-red sm:text-4xl">
                What’s happening at ISR?
              </h2>

              <p className="mt-3 text-gray-700">
                Find your next event, program or
                community activity.
              </p>
            </div>

            <Link
              href="/events"
              className="w-fit font-bold text-isr-turquoise"
            >
              View all events →
            </Link>
          </div>

          {loading ? (
            <div className="mt-8 grid gap-5 sm:mt-10 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map(
                (item) => (
                  <div
                    key={item}
                    className="h-96 animate-pulse rounded-3xl bg-isr-cream"
                  />
                ),
              )}
            </div>
          ) : events.length > 0 ? (
            <div className="mt-8 grid gap-5 sm:mt-10 md:grid-cols-2 lg:grid-cols-3">
              {events.map(
                (event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    compact
                  />
                ),
              )}
            </div>
          ) : (
            <div className="mt-8 rounded-3xl bg-isr-cream/70 p-7 text-center sm:mt-10 sm:p-10">
              <h3 className="text-xl font-bold text-isr-dark-red">
                No upcoming events are listed yet
              </h3>

              <p className="mx-auto mt-3 max-w-xl text-sm text-gray-700">
                Check ISR Updates or our community
                channels for the latest announcements.
              </p>

              <Link
                href="/updates"
                className="isr-text-link mt-5"
              >
                View ISR Updates →
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="bg-isr-dark-red px-4 py-14 text-white sm:py-20">
        <div className="container-isr mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-isr-yellow">
                New to RMIT?
              </p>

              <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
                Start university with the essentials
                already sorted
              </h2>

              <p className="mt-5 max-w-xl leading-relaxed text-white/75">
                Find your prayer room, know where
                Jumu’ah is, join the Muslim community,
                attend your first event and know where
                to turn if you need help.
              </p>

              <Link
                href="/start"
                className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 font-bold text-isr-dark-red transition hover:bg-isr-yellow"
              >
                Start here
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                'Find your campus musallah',
                'Check Jumu’ah',
                'Join the WhatsApp Community',
                'Become a free ISR member',
                'Find an upcoming event',
                'Know how to contact ISR',
              ].map(
                (
                  item,
                  index,
                ) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/10 p-4 sm:p-5"
                  >
                    <span className="text-xs font-bold text-isr-yellow">
                      0{index + 1}
                    </span>

                    <p className="mt-2 font-semibold">
                      {item}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:py-20">
        <div className="container-isr mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-isr-turquoise">
              Become part of ISR
            </p>

            <h2 className="mt-3 text-3xl font-bold leading-tight text-isr-dark-red sm:text-4xl">
              Attend. Join. Volunteer. Lead.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-gray-700">
              You do not need to begin with a title.
              Start by becoming part of the community
              and grow from there.
            </p>
          </div>

          <div className="mx-auto mt-9 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: '01',
                title: 'Attend',
                text:
                  'Come to an event, class or community activity.',
              },
              {
                step: '02',
                title: 'Join',
                text:
                  'Become a free formal member of ISR.',
              },
              {
                step: '03',
                title: 'Volunteer',
                text:
                  'Help deliver programs and support the community.',
              },
              {
                step: '04',
                title: 'Lead',
                text:
                  'Take responsibility and help shape what comes next.',
              },
            ].map(
              (item) => (
                <article
                  key={item.step}
                  className="isr-card p-5 sm:p-6"
                >
                  <span className="text-sm font-bold text-isr-turquoise">
                    {item.step}
                  </span>

                  <h3 className="mt-3 text-xl font-bold text-isr-dark-red">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-gray-700">
                    {item.text}
                  </p>
                </article>
              ),
            )}
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              href="/join"
              className="isr-button-primary"
            >
              Explore ways to join
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-isr-cream/60 px-4 py-14 sm:py-20">
        <div className="container-isr mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-isr-turquoise">
                What ISR does
              </p>

              <h2 className="mt-3 text-3xl font-bold leading-tight text-isr-dark-red">
                Supporting Muslim student life
              </h2>

              <p className="mt-4 max-w-xl leading-relaxed text-gray-700">
                ISR exists so Muslim students have a
                stronger religious, social and student
                experience at RMIT.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {whatWeDo.map(
                (item) => (
                  <article
                    key={item.title}
                    className="rounded-2xl bg-white p-5 shadow-sm"
                  >
                    <h3 className="font-bold text-isr-dark-red">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-gray-700">
                      {item.text}
                    </p>
                  </article>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:py-20">
        <div className="container-isr mx-auto max-w-7xl">
          <div className="rounded-[1.75rem] bg-isr-dark-red px-5 py-9 text-center text-white sm:px-10 sm:py-14">
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
              Your Muslim community at RMIT starts here
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-white/75">
              Membership is free. Join the community,
              meet other Muslims and become part of ISR.
            </p>

            <div className="mx-auto mt-8 flex max-w-2xl flex-col justify-center gap-3 sm:flex-row">
              <a
                href={ISR_PUBLIC.community.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 font-bold text-isr-dark-red transition hover:bg-isr-yellow"
              >
                Join WhatsApp Community
              </a>

              <Link
                href="/join"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-6 py-3 font-bold text-white transition hover:bg-white/10"
              >
                Join ISR
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
