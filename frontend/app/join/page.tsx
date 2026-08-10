import type {
  Metadata,
} from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  ISR_PUBLIC,
  mailto,
} from '@/lib/siteContent'

export const metadata: Metadata = {
  title: 'Join ISR',
  description:
    'Join the ISR community, become a free member, volunteer, join the team or support Muslim students at RMIT.',
}

const pathway = [
  {
    step: '01',
    title: 'Attend',
    description:
      'Come to an event, halaqah, workshop, class or community activity.',
    href: '/events',
    label: 'See events',
  },
  {
    step: '02',
    title: 'Join',
    description:
      'Become a formal ISR member. Membership is free.',
    href: '#membership',
    label: 'Become a member',
  },
  {
    step: '03',
    title: 'Volunteer',
    description:
      'Help when you can without immediately taking on a permanent role.',
    href: '#volunteer',
    label: 'Volunteer',
  },
  {
    step: '04',
    title: 'Lead',
    description:
      'Take recurring responsibility and help shape Muslim student life at RMIT.',
    href: '#team',
    label: 'Join the team',
  },
]

export default function JoinPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/20">
      <Navbar />

      <main id="main-content">
        <section className="bg-isr-dark-red px-4 py-14 text-white sm:py-20">
          <div className="container-isr mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-isr-yellow">
                Become part of the community
              </p>

              <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                There is a place for you in ISR
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/80 sm:text-xl">
                Start by joining the community or coming
                to something. You can volunteer, join the
                team and take on leadership when you are
                ready.
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
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 px-6 py-3 font-bold text-white transition hover:bg-white/10"
                >
                  Free ISR membership
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-isr-turquoise">
                Your pathway
              </p>

              <h2 className="mt-3 text-3xl font-bold text-isr-dark-red sm:text-4xl">
                Attend. Join. Volunteer. Lead.
              </h2>

              <p className="mt-4 leading-relaxed text-gray-700">
                There is no requirement to begin with a
                committee position. Most involvement starts
                simply by becoming part of the community.
              </p>
            </div>

            <div className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {pathway.map(
                (item) => (
                  <Link
                    key={item.step}
                    href={item.href}
                    className="isr-card isr-card-interactive group flex flex-col p-5 sm:p-6"
                  >
                    <span className="text-sm font-bold text-isr-turquoise">
                      {item.step}
                    </span>

                    <h3 className="mt-3 text-xl font-bold text-isr-dark-red">
                      {item.title}
                    </h3>

                    <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-700">
                      {item.description}
                    </p>

                    <span className="mt-6 font-bold text-isr-turquoise">
                      {item.label} →
                    </span>
                  </Link>
                ),
              )}
            </div>
          </div>
        </section>

        <section
          id="community"
          className="bg-white px-4 py-14 sm:py-20"
        >
          <div className="container-isr mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-isr-turquoise">
                  Stay connected
                </p>

                <h2 className="mt-3 text-3xl font-bold text-isr-dark-red">
                  Join the ISR community
                </h2>

                <p className="mt-4 leading-relaxed text-gray-700">
                  The WhatsApp Community is one of the
                  easiest ways to stay connected to ISR
                  announcements and opportunities.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <article className="rounded-3xl border border-isr-turquoise/30 bg-isr-turquoise/5 p-6">
                  <span className="rounded-full bg-isr-turquoise/10 px-3 py-1 text-xs font-bold text-isr-turquoise">
                    Available now
                  </span>

                  <h3 className="mt-5 text-xl font-bold text-isr-dark-red">
                    Main ISR Community
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-gray-700">
                    The main Islamic Society of RMIT
                    WhatsApp Community.
                  </p>

                  <a
                    href={ISR_PUBLIC.community.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="isr-text-link mt-6"
                  >
                    Join community →
                  </a>
                </article>

                <article className="rounded-3xl border border-isr-light-blue/20 bg-white p-6">
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-600">
                    Coming soon
                  </span>

                  <h3 className="mt-5 text-xl font-bold text-isr-dark-red">
                    Brothers Community
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-gray-700">
                    The direct brothers community link
                    will be added once confirmed.
                  </p>
                </article>

                <article className="rounded-3xl border border-isr-light-blue/20 bg-white p-6">
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-600">
                    Coming soon
                  </span>

                  <h3 className="mt-5 text-xl font-bold text-isr-dark-red">
                    Sisters Community
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-gray-700">
                    The direct sisters community link
                    will be added once confirmed.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section
          id="membership"
          className="px-4 py-14 sm:py-20"
        >
          <div className="container-isr mx-auto max-w-7xl">
            <div className="rounded-[1.75rem] bg-isr-dark-red p-6 text-white sm:p-10">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div className="max-w-3xl">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-isr-yellow">
                    Formal membership
                  </p>

                  <h2 className="mt-3 text-3xl font-bold">
                    ISR membership is free
                  </h2>

                  <p className="mt-4 leading-relaxed text-white/80">
                    Formal membership gives you a direct
                    connection to the Society and helps ISR
                    maintain a strong Muslim student
                    membership base.
                  </p>
                </div>

                <a
                  href={ISR_PUBLIC.membership.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 font-bold text-isr-dark-red transition hover:bg-isr-yellow"
                >
                  Become a member
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-isr-cream/60 px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-7xl">
            <div className="grid gap-5 lg:grid-cols-2">
              <article
                id="volunteer"
                className="scroll-mt-32 rounded-[1.75rem] bg-white p-6 sm:p-8"
              >
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-isr-turquoise">
                  Volunteer
                </p>

                <h2 className="mt-3 text-3xl font-bold text-isr-dark-red">
                  Help when you can
                </h2>

                <p className="mt-4 leading-relaxed text-gray-700">
                  Volunteering is a flexible way to help
                  events, programs and community initiatives
                  without taking on a permanent committee
                  position.
                </p>

                <a
                  href={ISR_PUBLIC.volunteer.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="isr-button-primary mt-7"
                >
                  Volunteer with ISR
                </a>
              </article>

              <article
                id="team"
                className="scroll-mt-32 rounded-[1.75rem] bg-white p-6 sm:p-8"
              >
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-isr-turquoise">
                  Join the team
                </p>

                <h2 className="mt-3 text-3xl font-bold text-isr-dark-red">
                  Take on recurring responsibility
                </h2>

                <p className="mt-4 leading-relaxed text-gray-700">
                  Team roles are for students who want to
                  contribute consistently and help deliver
                  ISR&apos;s work throughout the year.
                </p>

                <a
                  href={ISR_PUBLIC.team.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="isr-button-primary mt-7"
                >
                  Apply to join the team
                </a>
              </article>
            </div>
          </div>
        </section>

        <section
          id="donate"
          className="px-4 py-14 sm:py-20"
        >
          <div className="container-isr mx-auto max-w-5xl">
            <div className="rounded-[1.75rem] border border-isr-yellow bg-isr-yellow/30 p-6 sm:p-8">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-isr-turquoise">
                    Support ISR
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-isr-dark-red">
                    Support Muslim students at RMIT
                  </h2>

                  <p className="mt-4 max-w-2xl leading-relaxed text-gray-700">
                    Contributions support ISR programs,
                    events and services for Muslim students.
                  </p>

                  <a
                    href={ISR_PUBLIC.donate.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="isr-button-primary mt-7"
                  >
                    Donate online
                  </a>
                </div>

                <div className="rounded-2xl bg-white/80 p-5 lg:min-w-72">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                    Direct bank transfer
                  </p>

                  <dl className="mt-4 space-y-4 text-sm">
                    <div>
                      <dt className="text-gray-500">
                        Account name
                      </dt>

                      <dd className="mt-1 font-bold text-isr-dark-red">
                        {ISR_PUBLIC.bank.accountName}
                      </dd>
                    </div>

                    <div>
                      <dt className="text-gray-500">
                        BSB
                      </dt>

                      <dd className="mt-1 font-bold text-isr-dark-red">
                        {ISR_PUBLIC.bank.bsb}
                      </dd>
                    </div>

                    <div>
                      <dt className="text-gray-500">
                        Account number
                      </dt>

                      <dd className="mt-1 font-bold text-isr-dark-red">
                        {ISR_PUBLIC.bank.accountNumber}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <a
                href={mailto(
                  'ISR Leadership Pathways',
                )}
                className="isr-text-link"
              >
                Ask ISR about leadership opportunities →
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
