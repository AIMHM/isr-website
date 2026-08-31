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
    'Attend, become a member, volunteer and contribute to the Islamic Society of RMIT community.',
}

const pathways = [
  {
    label: 'Attend',
    title: 'I want to meet people first',
    description:
      'Start with an event, halaqa, workshop, social or regular program. No title or commitment is needed.',
    href: '/events',
    action: 'See what’s on',
  },
  {
    label: 'Member',
    title: 'I want to formally join ISR',
    description:
      'ISR membership is free and gives you a direct connection to the Society as a Muslim student at RMIT.',
    href: ISR_PUBLIC.membership.url,
    action: 'Become a member',
    external: true,
  },
  {
    label: 'Volunteer',
    title: 'I want to help sometimes',
    description:
      'Help deliver events and community activities without taking on an ongoing team role.',
    href: ISR_PUBLIC.volunteer.url,
    action: 'Volunteer with ISR',
    external: true,
  },
  {
    label: 'Team',
    title: 'I want to contribute regularly',
    description:
      'Join an ISR team and take responsibility for part of the work that keeps the Society running.',
    href: ISR_PUBLIC.team.url,
    action: 'Apply for a team',
    external: true,
  },
]

export default function JoinPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/15">
      <Navbar />

      <main id="main-content">
        <section className="bg-isr-dark-red px-4 py-14 text-white sm:py-20">
          <div className="container-isr mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
              <div className="max-w-4xl">
                <p className="isr-eyebrow text-isr-yellow">
                  Join ISR
                </p>

                <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                  You can belong before you volunteer.
                </h1>

                <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/80 sm:text-xl">
                  Attend something, join the community, become a member or help out. Choose the level of involvement that makes sense for you now.
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

                  <Link
                    href="/events"
                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-6 py-3 font-bold text-white transition hover:bg-white/10"
                  >
                    See what’s happening
                  </Link>
                </div>
              </div>

              <aside className="border-l-4 border-isr-yellow pl-5">
                <p className="text-sm font-bold text-isr-yellow">
                  Not sure where to start?
                </p>

                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  Attending one activity or joining the WhatsApp Community is enough. You do not need to commit to a team to be part of ISR.
                </p>
              </aside>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="isr-eyebrow text-isr-turquoise">
                Choose your next step
              </p>

              <h2 className="mt-3 text-3xl font-bold text-isr-dark-red sm:text-4xl">
                Four ways to be part of ISR
              </h2>

              <p className="mt-4 leading-relaxed text-gray-700">
                These are options, not a ladder you are expected to climb. Pick the level of involvement that fits your time and interest.
              </p>
            </div>

            <div className="mt-9 grid gap-4 md:grid-cols-2">
              {pathways.map((pathway) => {
                const content = (
                  <>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-isr-turquoise">
                      {pathway.label}
                    </p>

                    <h3 className="mt-3 text-2xl font-bold text-isr-dark-red">
                      {pathway.title}
                    </h3>

                    <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-700">
                      {pathway.description}
                    </p>

                    <span className="mt-6 inline-flex min-h-11 items-center font-bold text-isr-turquoise">
                      {pathway.action} →
                    </span>
                  </>
                )

                if (pathway.external) {
                  return (
                    <a
                      key={pathway.label}
                      href={pathway.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-full flex-col rounded-[1.5rem] border border-isr-light-blue/20 bg-white p-6 transition hover:border-isr-turquoise/40 hover:shadow-sm"
                    >
                      {content}
                    </a>
                  )
                }

                return (
                  <Link
                    key={pathway.label}
                    href={pathway.href}
                    className="flex min-h-full flex-col rounded-[1.5rem] border border-isr-light-blue/20 bg-white p-6 transition hover:border-isr-turquoise/40 hover:shadow-sm"
                  >
                    {content}
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        <section className="bg-isr-cream/55 px-4 py-14 sm:py-20">
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
                  Formal ISR membership is free. If you want a direct formal connection to the Society, this is the simplest step.
                </p>

                <a
                  href={ISR_PUBLIC.membership.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 font-bold text-isr-dark-red transition hover:bg-isr-yellow"
                >
                  Join ISR for free
                </a>
              </article>

              <article className="border-l-4 border-isr-turquoise bg-white p-7 sm:p-9">
                <p className="isr-eyebrow text-isr-turquoise">
                  Community
                </p>

                <h2 className="mt-3 text-3xl font-bold text-isr-dark-red">
                  Stay connected without committing
                </h2>

                <p className="mt-4 leading-relaxed text-gray-700">
                  The WhatsApp Community is the quickest way to keep up with announcements and opportunities even if you are not ready to volunteer.
                </p>

                <a
                  href={ISR_PUBLIC.community.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="isr-button-primary mt-7"
                >
                  Join the WhatsApp Community
                </a>
              </article>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <article className="rounded-[1.75rem] border border-isr-light-blue/25 bg-isr-cream/35 p-7 sm:p-9">
                <p className="isr-eyebrow text-isr-turquoise">
                  Volunteer or join a team
                </p>

                <h2 className="mt-3 text-3xl font-bold text-isr-dark-red">
                  Help make Muslim student life happen
                </h2>

                <p className="mt-4 leading-relaxed text-gray-700">
                  Volunteer for individual activities when you can, or join a team if you want to contribute more consistently. ISR work spans events, creative, partnerships, data, prayer support and other student-facing functions.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href={ISR_PUBLIC.volunteer.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="isr-button-secondary"
                  >
                    Volunteer with ISR
                  </a>

                  <a
                    href={ISR_PUBLIC.team.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="isr-button-primary"
                  >
                    Apply to a team
                  </a>
                </div>
              </article>

              <article className="rounded-[1.75rem] bg-isr-dark-red p-7 text-white sm:p-9">
                <p className="isr-eyebrow text-isr-yellow">
                  Responsibility
                </p>

                <h2 className="mt-3 text-2xl font-bold">
                  Leadership comes after service
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-white/75">
                  Consistency, reliability, good character and willingness to take responsibility are what prepare people to lead well over time.
                </p>

                <Link
                  href="/teams"
                  className="mt-6 inline-flex min-h-11 items-center font-bold text-isr-yellow underline decoration-isr-yellow/35 underline-offset-4"
                >
                  See how ISR teams work →
                </Link>
              </article>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
