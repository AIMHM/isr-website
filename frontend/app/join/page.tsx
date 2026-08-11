import JoinMembershipSpotlight from '@/components/JoinMembershipSpotlight'
import type {
  Metadata,
} from 'next'
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

const pathways = [
  {
    number: '01',
    title: 'Join the community',
    description:
      'Stay connected to announcements and Muslim student life through the main ISR WhatsApp Community.',
    href: '#community',
  },
  {
    number: '02',
    title: 'Become a member',
    description:
      'Formal ISR membership is free.',
    href: '#membership',
  },
  {
    number: '03',
    title: 'Volunteer',
    description:
      'Help with events and community initiatives without taking on a permanent role.',
    href: '#volunteer',
  },
  {
    number: '04',
    title: 'Join the team',
    description:
      'Take recurring responsibility and help deliver ISR’s work throughout the year.',
    href: '#team',
  },
]

export default function JoinPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/15">
      <Navbar />

      <main id="main-content">
        <section className="isr-page-hero bg-isr-dark-red px-4 py-14 text-white sm:py-20">
          <div className="container-isr mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <p className="isr-eyebrow text-isr-yellow">
                Join ISR
              </p>

              <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Start with community.
                <span className="block text-isr-yellow">
                  Grow into contribution.
                </span>
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/80 sm:text-xl">
                You do not need a committee title to be
                part of ISR. Join the community, become a
                member, attend something and contribute
                when you are ready.
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

        <section className="px-4 py-12 sm:py-16">
          <div className="container-isr mx-auto max-w-7xl">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {pathways.map(
                (pathway) => (
                  <a
                    key={
                      pathway.number
                    }
                    href={
                      pathway.href
                    }
                    className="isr-choice-card isr-card isr-card-interactive p-5 sm:p-6"
                  >
                    <span className="text-xs font-bold text-isr-turquoise">
                      {
                        pathway.number
                      }
                    </span>

                    <h2 className="mt-4 text-xl font-bold text-isr-dark-red">
                      {pathway.title}
                    </h2>

                    <p className="mt-3 text-sm leading-relaxed text-gray-700">
                      {
                        pathway.description
                      }
                    </p>
                  </a>
                ),
              )}
            </div>
          </div>
        </section>

        <section
          id="community"
          className="scroll-mt-28 bg-white px-4 py-14 sm:py-20"
        >
          <div className="container-isr mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
              <div>
                <p className="isr-eyebrow text-isr-turquoise">
                  Stay connected
                </p>

                <h2 className="mt-4 text-3xl font-bold text-isr-dark-red sm:text-4xl">
                  Join the community
                </h2>

                <p className="mt-4 max-w-xl leading-relaxed text-gray-700">
                  The main ISR WhatsApp Community is the
                  easiest public starting point for staying
                  connected.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <article className="rounded-[1.5rem] border border-isr-turquoise/30 bg-isr-turquoise/5 p-6">
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
                    className="isr-button-primary mt-6 text-sm"
                  >
                    Join community
                  </a>
                </article>

                <article className="rounded-[1.5rem] border border-isr-light-blue/20 bg-isr-cream/45 p-6">
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-gray-600">
                    Link coming soon
                  </span>

                  <h3 className="mt-5 text-xl font-bold text-isr-dark-red">
                    Brothers Community
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-gray-700">
                    The direct brothers link will be added
                    once confirmed.
                  </p>
                </article>

                <article className="rounded-[1.5rem] border border-isr-light-blue/20 bg-isr-cream/45 p-6">
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-gray-600">
                    Link coming soon
                  </span>

                  <h3 className="mt-5 text-xl font-bold text-isr-dark-red">
                    Sisters Community
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-gray-700">
                    The direct sisters link will be added
                    once confirmed.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section
          id="membership"
          className="scroll-mt-28 bg-isr-cream/50 px-4 py-14 sm:py-20"
        >
          <div className="container-isr mx-auto max-w-6xl">
            <div className="rounded-[2rem] bg-isr-dark-red p-6 text-white sm:p-9">
              <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="isr-eyebrow text-isr-yellow">
                    Formal membership
                  </p>

                  <h2 className="mt-4 text-3xl font-bold">
                    Membership is free
                  </h2>

                  <p className="mt-4 max-w-2xl leading-relaxed text-white/75">
                    Becoming a formal member strengthens
                    ISR’s Muslim student membership base and
                    gives you a direct formal connection to
                    the Society.
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

        <section className="bg-white px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-7xl">
            <div className="grid gap-5 lg:grid-cols-2">
              <article
                id="volunteer"
                className="scroll-mt-28 rounded-[1.75rem] border border-isr-light-blue/20 bg-isr-cream/35 p-6 sm:p-8"
              >
                <p className="isr-eyebrow text-isr-turquoise">
                  Volunteer
                </p>

                <h2 className="mt-4 text-3xl font-bold text-isr-dark-red">
                  Help when you can
                </h2>

                <p className="mt-4 leading-relaxed text-gray-700">
                  Volunteer at events, programs and
                  community initiatives without taking on a
                  permanent committee position.
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
                className="scroll-mt-28 rounded-[1.75rem] border border-isr-light-blue/20 bg-isr-cream/35 p-6 sm:p-8"
              >
                <p className="isr-eyebrow text-isr-turquoise">
                  Join the team
                </p>

                <h2 className="mt-4 text-3xl font-bold text-isr-dark-red">
                  Take recurring responsibility
                </h2>

                <p className="mt-4 leading-relaxed text-gray-700">
                  Team roles are for students who want to
                  contribute consistently throughout the
                  year.
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
          className="bg-isr-cream/55 px-4 py-14 sm:py-20"
        >
          <div className="container-isr mx-auto max-w-6xl">
            <div className="grid gap-6 rounded-[2rem] border border-isr-yellow bg-isr-yellow/25 p-6 sm:p-8 lg:grid-cols-[1fr_0.7fr]">
              <div>
                <p className="isr-eyebrow text-isr-turquoise">
                  Support ISR
                </p>

                <h2 className="mt-4 text-3xl font-bold text-isr-dark-red">
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

              <div className="rounded-[1.5rem] bg-white/80 p-5 sm:p-6">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-gray-500">
                  Direct bank transfer
                </p>

                <dl className="mt-5 space-y-4 text-sm">
                  <div>
                    <dt className="text-gray-500">
                      Account name
                    </dt>

                    <dd className="mt-1 font-bold text-isr-dark-red">
                      {
                        ISR_PUBLIC.bank
                          .accountName
                      }
                    </dd>
                  </div>

                  <div>
                    <dt className="text-gray-500">
                      BSB
                    </dt>

                    <dd className="mt-1 font-bold text-isr-dark-red">
                      {
                        ISR_PUBLIC.bank
                          .bsb
                      }
                    </dd>
                  </div>

                  <div>
                    <dt className="text-gray-500">
                      Account number
                    </dt>

                    <dd className="mt-1 font-bold text-isr-dark-red">
                      {
                        ISR_PUBLIC.bank
                          .accountNumber
                      }
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="mt-8 text-center">
              <a
                href={mailto(
                  'ISR Leadership Pathways',
                )}
                className="isr-text-link"
              >
                Ask about leadership opportunities →
              </a>
            </div>
          </div>
        </section>

        <section className="px-4 pb-16 sm:pb-20">
          <div className="container-isr mx-auto max-w-6xl">
            <JoinMembershipSpotlight />
          </div>
        </section>

</main>

      <Footer />
    </div>
  )
}
