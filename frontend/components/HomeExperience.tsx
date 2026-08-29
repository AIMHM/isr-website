'use client'

import {
  useEffect,
  useMemo,
  useState,
} from 'react'
import Link from 'next/link'
import HomeWhatsOn from '@/components/HomeWhatsOn'
import HomeCampusPreference from '@/components/HomeCampusPreference'
import HomeJumuahSnapshot from '@/components/HomeJumuahSnapshot'
import {
  fetchAnnouncements,
  type Announcement,
} from '@/lib/announcements'
import {
  ISR_PUBLIC,
} from '@/lib/siteContent'

const studentActions = [
  {
    number: '01',
    label: 'Prayer',
    title: 'I need somewhere to pray',
    description:
      'Find prayer rooms, Jumu’ah information and the daily prayer timetable.',
    href: '/pray',
  },
  {
    number: '02',
    label: 'What’s On',
    title: 'What is happening?',
    description:
      'See upcoming classes, workshops, socials and community programs.',
    href: '/events',
  },
  {
    number: '03',
    label: 'Support',
    title: 'I need help',
    description:
      'Raise something affecting your experience as a Muslim student at RMIT.',
    href: '/support',
  },
  {
    number: '04',
    label: 'Community',
    title: 'I want to get involved',
    description:
      'Join the community, become a member, volunteer or take on a team role.',
    href: '/join',
  },
]

const impactAreas = [
  {
    title: 'Prayer & Jumu’ah',
    text:
      'Helping Muslim students worship throughout the university week.',
  },
  {
    title: 'Islamic learning',
    text:
      'Programs that strengthen knowledge, confidence and connection to Islam.',
  },
  {
    title: 'Community',
    text:
      'Creating spaces where Muslims meet, build friendships and belong.',
  },
  {
    title: 'Student support',
    text:
      'A clear starting point when something is affecting Muslim student life.',
  },
  {
    title: 'Representation',
    text:
      'Representing Muslim student needs and concerns on campus.',
  },
  {
    title: 'Service & leadership',
    text:
      'Giving students meaningful ways to contribute, volunteer and lead.',
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
  ] =
    useState<Announcement[]>([])

  useEffect(() => {
    let active = true

    fetchAnnouncements()
      .then(
        (
          data,
        ) => {
          if (active) {
            setAnnouncements(
              data,
            )
          }
        },
      )
      .catch(() => {
        if (active) {
          setAnnouncements(
            [],
          )
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
      <section className="isr-hero-grid relative overflow-hidden bg-isr-dark-red px-4 py-14 text-white sm:py-20 lg:py-24">
        <div
          aria-hidden="true"
          className="isr-hero-glow -right-24 -top-16 h-80 w-80 bg-isr-turquoise"
        />

        <div
          aria-hidden="true"
          className="isr-hero-glow -bottom-28 -left-24 h-72 w-72 bg-isr-yellow"
        />

        <div className="container-isr relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
          <div>
            <p className="isr-eyebrow text-isr-yellow">
              Islamic Society of RMIT
            </p>

            <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-[1.04] sm:text-5xl lg:text-6xl xl:text-7xl">
              A Muslim student
              <span className="block text-isr-yellow">
                should always know where to turn.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-xl">
              Prayer, Islamic learning, community,
              support and representation throughout
              your time at RMIT.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/student-guide"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 font-bold text-isr-dark-red transition hover:bg-isr-yellow"
              >
                New to RMIT? Student Guide
              </Link>

              <Link
                href="/pray"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-6 py-3 font-bold text-white transition hover:bg-white/10"
              >
                Find a prayer room
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/65">
              <span>
                Membership{' '}
                <strong className="text-white">
                  free
                </strong>
              </span>

              <span>City</span>
              <span>Bundoora</span>
              <span>Brunswick</span>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-white/15 bg-white/[0.09] p-5 shadow-2xl backdrop-blur-md sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="isr-eyebrow text-isr-yellow">
                  Friday
                </p>

                <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                  Jumu’ah at RMIT
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  Check the campus before you travel.
                </p>
              </div>

              <Link
                href="/pray#jumuah"
                className="hidden rounded-full border border-white/15 px-4 py-2 text-xs font-bold text-white sm:inline-flex"
              >
                Full details
              </Link>
            </div>
            <HomeJumuahSnapshot />

            <Link
              href="/pray#jumuah"
              className="mt-5 inline-flex text-sm font-bold text-isr-yellow sm:hidden"
            >
              Full Jumu’ah information →
            </Link>
          </aside>
        </div>
      </section>

      <section className="border-b border-isr-light-blue/15 bg-white px-4 py-5">
        <div className="container-isr mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold text-gray-600">
            Looking for something quickly?
          </p>

          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold">
            <Link href="/pray" className="text-isr-turquoise">
              Prayer rooms
            </Link>

            <Link href="/events" className="text-isr-turquoise">
              Events
            </Link>

            <Link href="/updates" className="text-isr-turquoise">
              ISR Updates
            </Link>

            <Link href="/contact" className="text-isr-turquoise">
              Contact
            </Link>
          </div>
        </div>
      </section>

      <HomeCampusPreference />

      {importantUpdate && (
        <section className="px-4 pt-10 sm:pt-14">
          <div className="container-isr mx-auto max-w-7xl">
            <Link
              href="/updates"
              className="group block rounded-[1.75rem] border border-isr-yellow bg-isr-yellow/30 p-5 transition hover:bg-isr-yellow/40 sm:p-6"
            >
              <div className="grid gap-4 md:grid-cols-[auto_1fr_auto] md:items-center">
                <span className="w-fit rounded-full bg-isr-dark-red px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
                  {importantUpdate.priority ===
                  'urgent'
                    ? 'Urgent'
                    : importantUpdate.pinned
                      ? 'Pinned'
                      : 'Important'}
                </span>

                <div>
                  <h2 className="font-bold text-isr-dark-red sm:text-lg">
                    {importantUpdate.title}
                  </h2>

                  <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-gray-700">
                    {importantUpdate.body}
                  </p>
                </div>

                <span className="font-bold text-isr-dark-red transition-transform group-hover:translate-x-1">
                  View →
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section className="bg-isr-cream/50 px-4 py-14 sm:py-20">
        <div className="container-isr mx-auto max-w-7xl">
          <div className="isr-section-rule">
            <p className="isr-eyebrow text-isr-turquoise">
              Student essentials
            </p>
          </div>

          <div className="mt-5 max-w-3xl">
            <h2 className="text-3xl font-bold leading-tight text-isr-dark-red sm:text-4xl">
              What do you need right now?
            </h2>

            <p className="mt-4 leading-relaxed text-gray-700">
              You should not need to understand how ISR is
              structured before finding the right place to go.
            </p>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {studentActions.map(
              (item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="isr-utility-card border border-isr-light-blue/20 bg-white p-5 pr-12 shadow-sm sm:p-6 sm:pr-12"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-bold text-isr-turquoise">
                      {item.number}
                    </span>

                    <span className="rounded-full bg-isr-turquoise/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-isr-turquoise">
                      {item.label}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-bold leading-snug text-isr-dark-red">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-gray-700">
                    {item.description}
                  </p>
                </Link>
              ),
            )}
          </div>
        </div>
      </section>

      <HomeWhatsOn />

      <section className="bg-isr-dark-red px-4 py-14 text-white sm:py-20">
        <div className="container-isr mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
            <div>
              <p className="isr-eyebrow text-isr-yellow">
                First semester?
              </p>

              <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
                Get the Muslim student essentials sorted first
              </h2>

              <p className="mt-5 max-w-xl leading-relaxed text-white/72">
                Prayer room. Jumu’ah. Community. Membership.
                Your first event. A contact point if you need help.
              </p>

              <Link
                href="/student-guide"
                className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 font-bold text-isr-dark-red transition hover:bg-isr-yellow"
              >
                Open Student Guide
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  number: '01',
                  label: 'Find your musallah',
                },
                {
                  number: '02',
                  label: 'Know your Jumu’ah',
                },
                {
                  number: '03',
                  label: 'Join the community',
                },
                {
                  number: '04',
                  label: 'Become a member',
                },
                {
                  number: '05',
                  label: 'Attend something',
                },
                {
                  number: '06',
                  label: 'Know who to contact',
                },
              ].map(
                (item) => (
                  <div
                    key={item.number}
                    className="rounded-2xl border border-white/10 bg-white/[0.08] p-5"
                  >
                    <span className="text-xs font-bold text-isr-yellow">
                      {item.number}
                    </span>

                    <p className="mt-3 font-semibold">
                      {item.label}
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
          <div className="mx-auto max-w-3xl text-center">
            <p className="isr-eyebrow mx-auto text-isr-turquoise">
              Your pathway
            </p>

            <h2 className="mt-4 text-3xl font-bold text-isr-dark-red sm:text-4xl">
              Attend. Join. Volunteer. Lead.
            </h2>

            <p className="mt-4 leading-relaxed text-gray-700">
              Community involvement does not start with a title.
              Start small and grow into responsibility.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-4">
            {[
              {
                step: '1',
                title: 'Attend',
                text:
                  'Come to an event, class or community activity.',
              },
              {
                step: '2',
                title: 'Join',
                text:
                  'Become a free formal member of ISR.',
              },
              {
                step: '3',
                title: 'Volunteer',
                text:
                  'Help deliver programs and support the community.',
              },
              {
                step: '4',
                title: 'Lead',
                text:
                  'Take responsibility and help shape what comes next.',
              },
            ].map(
              (item) => (
                <article
                  key={item.step}
                  className="isr-step-line text-center"
                >
                  <span className="relative z-10 mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-isr-dark-red font-bold text-white">
                    {item.step}
                  </span>

                  <h3 className="mt-4 text-xl font-bold text-isr-dark-red">
                    {item.title}
                  </h3>

                  <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-gray-700">
                    {item.text}
                  </p>
                </article>
              ),
            )}
          </div>

          <div className="mt-9 flex justify-center">
            <Link
              href="/join"
              className="isr-button-primary"
            >
              Explore ways to join
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-isr-cream/55 px-4 py-14 sm:py-20">
        <div className="container-isr mx-auto max-w-7xl">
          <div className="grid gap-9 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="isr-eyebrow text-isr-turquoise">
                Why ISR exists
              </p>

              <h2 className="mt-4 text-3xl font-bold leading-tight text-isr-dark-red sm:text-4xl">
                Supporting Muslim student life
              </h2>

              <p className="mt-4 max-w-xl leading-relaxed text-gray-700">
                A student society should make Muslim life at
                university easier to navigate, stronger and
                more connected.
              </p>

              <Link
                href="/about"
                className="isr-text-link mt-6"
              >
                About ISR →
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {impactAreas.map(
                (item) => (
                  <article
                    key={item.title}
                    className="rounded-2xl border border-isr-light-blue/15 bg-white p-5"
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
          <div className="relative overflow-hidden rounded-[2rem] bg-isr-dark-red px-5 py-10 text-center text-white sm:px-10 sm:py-14">
            <div
              aria-hidden="true"
              className="isr-hero-glow -right-16 -top-20 h-52 w-52 bg-isr-turquoise"
            />

            <div className="relative">
              <p className="isr-eyebrow mx-auto text-isr-yellow">
                Join the community
              </p>

              <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">
                Your Muslim community at RMIT starts here
              </h2>

              <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-white/72">
                Membership is free. Join the community, meet
                other Muslims and become part of ISR.
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
        </div>
      </section>
    </>
  )
}
