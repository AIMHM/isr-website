import type {
  Metadata,
} from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  ISR_PUBLIC,
} from '@/lib/siteContent'

export const metadata: Metadata = {
  title: 'Join ISR',
  description:
    'Attend, join, volunteer and become part of the Islamic Society of RMIT community.',
}

const journey = [
  {
    number: '01',
    label: 'Attend',
    title: 'Show up',
    description:
      'Come to an ISR event, weekly program or community activity.',
    href: '/events',
  },
  {
    number: '02',
    label: 'Join',
    title: 'Become a member',
    description:
      'Formal ISR membership is free and gives you a direct connection to the Society.',
    href: '#membership',
  },
  {
    number: '03',
    label: 'Volunteer',
    title: 'Help out',
    description:
      'Contribute at events and activities without taking on a permanent role.',
    href: '#volunteer',
  },
  {
    number: '04',
    label: 'Team',
    title: 'Serve consistently',
    description:
      'Join an ISR team and contribute regularly alongside other students.',
    href: '/teams',
  },
  {
    number: '05',
    label: 'Lead',
    title: 'Grow into responsibility',
    description:
      'Leadership grows from service, reliability and taking responsibility over time.',
    href: '#lead',
  },
]

export default function JoinPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/15">
      <Navbar />

      <main id="main-content">
        <section className="bg-isr-dark-red px-4 py-14 text-white sm:py-20">
          <div className="container-isr mx-auto max-w-7xl">
            <p className="isr-eyebrow text-isr-yellow">
              Join ISR
            </p>

            <h1 className="mt-4 max-w-5xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Come as you are.
              <span className="block text-isr-yellow">
                Grow into contribution.
              </span>
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/80 sm:text-xl">
              You do not need a title to belong here.
              Attend something, meet people, become a
              member and contribute when you are ready.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={ISR_PUBLIC.community.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 font-bold text-isr-dark-red transition hover:bg-isr-yellow"
              >
                Join WhatsApp Community
              </a>

              <a
                href={ISR_PUBLIC.membership.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-6 py-3 font-bold text-white transition hover:bg-white/10"
              >
                Free ISR membership
              </a>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="isr-eyebrow text-isr-turquoise">
                Your ISR journey
              </p>

              <h2 className="mt-3 text-3xl font-bold text-isr-dark-red sm:text-4xl">
                Attend. Join. Volunteer. Team. Lead.
              </h2>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {journey.map(
                (step) => (
                  <Link
                    key={step.number}
                    href={step.href}
                    className="isr-card isr-card-interactive p-5"
                  >
                    <span className="text-xs font-bold text-isr-turquoise">
                      {step.number} · {step.label}
                    </span>

                    <h3 className="mt-4 text-xl font-bold text-isr-dark-red">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-gray-700">
                      {step.description}
                    </p>
                  </Link>
                ),
              )}
            </div>
          </div>
        </section>

        <section
          id="membership"
          className="scroll-mt-28 bg-isr-cream/55 px-4 py-14 sm:py-20"
        >
          <div className="container-isr mx-auto max-w-6xl">
            <div className="grid gap-6 lg:grid-cols-2">
              <article className="rounded-[1.75rem] bg-isr-dark-red p-7 text-white sm:p-9">
                <p className="isr-eyebrow text-isr-yellow">
                  Membership
                </p>

                <h2 className="mt-3 text-3xl font-bold">
                  Become an ISR member
                </h2>

                <p className="mt-4 leading-relaxed text-white/75">
                  Formal ISR membership is free. It is one
                  of the simplest ways to strengthen the
                  Muslim student community at RMIT.
                </p>

                <a
                  href={ISR_PUBLIC.membership.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 font-bold text-isr-dark-red transition hover:bg-isr-yellow"
                >
                  Become a member
                </a>
              </article>

              <article className="rounded-[1.75rem] border border-isr-light-blue/25 bg-white p-7 sm:p-9">
                <p className="isr-eyebrow text-isr-turquoise">
                  Community
                </p>

                <h2 className="mt-3 text-3xl font-bold text-isr-dark-red">
                  Stay connected
                </h2>

                <p className="mt-4 leading-relaxed text-gray-700">
                  Join the ISR WhatsApp Community for a
                  simple way to stay connected with Muslim
                  student life.
                </p>

                <a
                  href={ISR_PUBLIC.community.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="isr-button-primary mt-7"
                >
                  Join the community
                </a>
              </article>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <div className="grid gap-5 lg:grid-cols-2">
              <article
                id="volunteer"
                className="scroll-mt-28 rounded-[1.75rem] border border-isr-light-blue/25 bg-isr-cream/35 p-7 sm:p-9"
              >
                <p className="isr-eyebrow text-isr-turquoise">
                  Volunteer
                </p>

                <h2 className="mt-3 text-3xl font-bold text-isr-dark-red">
                  Help make something happen
                </h2>

                <p className="mt-4 leading-relaxed text-gray-700">
                  Help with events and join students working across events,
                  creative, finance and partnerships, data
                  and insights, prayer support and other ISR
                  work.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href="/teams"
                    className="isr-button-secondary"
                  >
                    Explore the teams
                  </Link>

                  <a
                    href={ISR_PUBLIC.team.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="isr-button-primary"
                  >
                    Apply to join
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section
          id="lead"
          className="scroll-mt-28 bg-white px-4 py-14 sm:py-20"
        >
          <div className="container-isr mx-auto max-w-6xl">
            <div className="rounded-[2rem] bg-isr-dark-red p-7 text-white sm:p-10">
              <p className="isr-eyebrow text-isr-yellow">
                Leadership
              </p>

              <h2 className="mt-3 max-w-3xl text-3xl font-bold sm:text-4xl">
                Leadership starts with service
              </h2>

              <p className="mt-5 max-w-3xl leading-relaxed text-white/75">
                ISR leadership is not the first step.
                Consistent service, reliability, good
                character and willingness to take
                responsibility are what prepare people to
                lead well.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={ISR_PUBLIC.team.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 font-bold text-isr-dark-red transition hover:bg-isr-yellow"
                >
                  Start by joining a team
                </a>

                <Link
                  href="/events"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-6 py-3 font-bold text-white transition hover:bg-white/10"
                >
                  Attend something first
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-isr-cream/55 px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <div className="grid gap-5 md:grid-cols-3">
              <Link
                href="/events"
                className="isr-card isr-card-interactive p-6"
              >
                <p className="isr-eyebrow text-isr-turquoise">
                  Attend
                </p>

                <h2 className="mt-3 text-xl font-bold text-isr-dark-red">
                  See what’s happening
                </h2>
              </Link>

              <Link
                href="/links"
                className="isr-card isr-card-interactive p-6"
              >
                <p className="isr-eyebrow text-isr-turquoise">
                  Quick links
                </p>

                <h2 className="mt-3 text-xl font-bold text-isr-dark-red">
                  Everything ISR
                </h2>
              </Link>

              <a
                href={ISR_PUBLIC.donate.url}
                target="_blank"
                rel="noopener noreferrer"
                className="isr-card isr-card-interactive p-6"
              >
                <p className="isr-eyebrow text-isr-turquoise">
                  Support
                </p>

                <h2 className="mt-3 text-xl font-bold text-isr-dark-red">
                  Support ISR
                </h2>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
