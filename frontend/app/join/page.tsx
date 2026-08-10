import type {
  Metadata,
} from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SectionHeading from '@/components/SectionHeading'
import {
  ISR_PUBLIC,
  mailto,
} from '@/lib/siteContent'

export const metadata: Metadata = {
  title: 'Join ISR',
  description:
    'Join the ISR community, become a free member, volunteer, join the team or support Muslim students at RMIT.',
}

const volunteerAreas = [
  'Events and logistics',
  'Media and communications',
  'Religious programs',
  'Community engagement',
  'Administration',
  'Partnerships',
  'Technology and digital systems',
  'Musallah support',
]

function ExternalButton({
  href,
  children,
}: {
  href: string
  children:
    React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="isr-button-primary"
    >
      {children}
    </a>
  )
}

export default function JoinPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/20">
      <Navbar />

      <main
        id="main-content"
        className="px-4 py-14 sm:py-20"
      >
        <div className="container-isr mx-auto max-w-6xl">
          <header className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-isr-turquoise">
              Become part of the community
            </p>

            <h1 className="mt-3 text-4xl font-bold text-isr-dark-red sm:text-5xl">
              Join ISR
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-gray-700">
              You do not need to start by taking on a role.
              Join the community, come to something,
              become a member, volunteer when you can and
              take on more responsibility when you are
              ready.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {[
                'Discover',
                'Attend',
                'Join',
                'Volunteer',
                'Lead',
              ].map(
                (
                  step,
                  index,
                ) => (
                  <div
                    key={step}
                    className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-isr-light-blue/30"
                  >
                    <span className="text-xs font-bold text-isr-turquoise">
                      {
                        index +
                        1
                      }
                    </span>

                    <span className="text-sm font-semibold text-isr-dark-red">
                      {
                        step
                      }
                    </span>
                  </div>
                ),
              )}
            </div>
          </header>

          <section
            id="community"
            className="mt-14 scroll-mt-32"
          >
            <SectionHeading
              eyebrow="Stay connected"
              title="Join the ISR community"
              description="The main ISR WhatsApp Community is free to join and is the easiest way to stay connected to community announcements and opportunities."
            />

            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              <article className="isr-card border-isr-turquoise/30 bg-isr-turquoise/5 p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-isr-turquoise">
                  Available now
                </p>

                <h2 className="mt-3 text-xl font-bold text-isr-dark-red">
                  Main ISR Community
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-gray-700">
                  Join the main Islamic Society of RMIT
                  WhatsApp Community.
                </p>

                <a
                  href={
                    ISR_PUBLIC
                      .community
                      .url
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="isr-text-link mt-6"
                >
                  Join WhatsApp Community
                  <span aria-hidden="true">
                    →
                  </span>
                </a>
              </article>

              <article className="isr-card p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Placeholder
                </p>

                <h2 className="mt-3 text-xl font-bold text-isr-dark-red">
                  Brothers Community
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-gray-700">
                  The separate Brothers Community link
                  will be added here once supplied.
                </p>

                <span className="mt-6 inline-flex rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-600">
                  {
                    ISR_PUBLIC
                      .brothersCommunity
                      .placeholder
                  }
                </span>
              </article>

              <article className="isr-card p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Placeholder
                </p>

                <h2 className="mt-3 text-xl font-bold text-isr-dark-red">
                  Sisters Community
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-gray-700">
                  The separate Sisters Community link
                  will be added here once supplied.
                </p>

                <span className="mt-6 inline-flex rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-600">
                  {
                    ISR_PUBLIC
                      .sistersCommunity
                      .placeholder
                  }
                </span>
              </article>
            </div>
          </section>

          <section
            id="membership"
            className="mt-16 scroll-mt-32"
          >
            <div className="rounded-[2rem] bg-isr-dark-red p-7 text-white sm:p-10">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div className="max-w-3xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-isr-yellow">
                    Formal membership
                  </p>

                  <h2 className="mt-3 text-3xl font-bold">
                    ISR membership is free
                  </h2>

                  <p className="mt-4 leading-relaxed text-white/80">
                    Become an official ISR member through
                    the current Rubric membership page.
                    Membership helps ISR maintain a
                    stronger, connected Muslim student
                    community and gives students a formal
                    pathway into participation and
                    leadership.
                  </p>
                </div>

                <ExternalButton
                  href={
                    ISR_PUBLIC
                      .membership
                      .url
                  }
                >
                  Become a member
                </ExternalButton>
              </div>
            </div>
          </section>

          <section className="mt-16">
            <SectionHeading
              eyebrow="Take part"
              title="There is more than one way to contribute"
              description="Start with the level of involvement that works for you."
            />

            <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              <article className="isr-card flex flex-col p-6">
                <h2 className="text-xl font-bold text-isr-dark-red">
                  Attend
                </h2>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-700">
                  Come to events, workshops, halaqaat,
                  classes and community activities.
                </p>

                <Link
                  href="/events"
                  className="isr-text-link mt-6"
                >
                  Upcoming events
                  <span aria-hidden="true">
                    →
                  </span>
                </Link>
              </article>

              <article
                id="volunteer"
                className="isr-card flex scroll-mt-32 flex-col p-6"
              >
                <h2 className="text-xl font-bold text-isr-dark-red">
                  Volunteer
                </h2>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-700">
                  Help when you can without immediately
                  taking on a permanent team role.
                </p>

                <a
                  href={
                    ISR_PUBLIC
                      .volunteer
                      .url
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="isr-text-link mt-6"
                >
                  Volunteer with ISR
                  <span aria-hidden="true">
                    →
                  </span>
                </a>
              </article>

              <article
                id="team"
                className="isr-card flex scroll-mt-32 flex-col p-6"
              >
                <h2 className="text-xl font-bold text-isr-dark-red">
                  Join the team
                </h2>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-700">
                  Take on recurring responsibility and
                  contribute within an ISR team.
                </p>

                <a
                  href={
                    ISR_PUBLIC
                      .team.url
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="isr-text-link mt-6"
                >
                  Apply to the team
                  <span aria-hidden="true">
                    →
                  </span>
                </a>
              </article>

              <article className="isr-card flex flex-col p-6">
                <h2 className="text-xl font-bold text-isr-dark-red">
                  Lead
                </h2>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-700">
                  Develop experience, take ownership and
                  help shape the future of Muslim student
                  life at RMIT.
                </p>

                <a
                  href={mailto(
                    'ISR Leadership Pathways',
                  )}
                  className="isr-text-link mt-6"
                >
                  Ask about leadership
                  <span aria-hidden="true">
                    →
                  </span>
                </a>
              </article>
            </div>
          </section>

          <section className="mt-16 grid gap-6 lg:grid-cols-2">
            <article className="isr-card bg-isr-cream/50 p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-isr-dark-red">
                Where could I help?
              </h2>

              <div className="mt-6 flex flex-wrap gap-2">
                {volunteerAreas.map(
                  (area) => (
                    <span
                      key={area}
                      className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-isr-dark-red shadow-sm"
                    >
                      {area}
                    </span>
                  ),
                )}
              </div>
            </article>

            <article
              id="donate"
              className="isr-card scroll-mt-32 border-isr-yellow bg-isr-yellow/30 p-6 sm:p-8"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-isr-turquoise">
                Support ISR
              </p>

              <h2 className="mt-3 text-2xl font-bold text-isr-dark-red">
                Support Muslim students at RMIT
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-gray-700">
                Contributions help ISR fund activities
                and services for Muslim students.
              </p>

              <a
                href={
                  ISR_PUBLIC
                    .donate.url
                }
                target="_blank"
                rel="noopener noreferrer"
                className="isr-button-primary mt-6"
              >
                Donate online
              </a>

              <div className="mt-7 rounded-2xl bg-white/75 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Direct bank transfer
                </p>

                <dl className="mt-4 grid gap-3 text-sm">
                  <div>
                    <dt className="font-semibold text-gray-500">
                      Account Name
                    </dt>

                    <dd className="font-bold text-isr-dark-red">
                      {
                        ISR_PUBLIC
                          .bank
                          .accountName
                      }
                    </dd>
                  </div>

                  <div>
                    <dt className="font-semibold text-gray-500">
                      BSB
                    </dt>

                    <dd className="font-bold text-isr-dark-red">
                      {
                        ISR_PUBLIC
                          .bank.bsb
                      }
                    </dd>
                  </div>

                  <div>
                    <dt className="font-semibold text-gray-500">
                      Account Number
                    </dt>

                    <dd className="font-bold text-isr-dark-red">
                      {
                        ISR_PUBLIC
                          .bank
                          .accountNumber
                      }
                    </dd>
                  </div>
                </dl>
              </div>
            </article>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
