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
  title: 'About ISR',
  description:
    'Learn about the Islamic Society of RMIT, what it does, who it serves and its history.',
}

const areas = [
  {
    number: '01',
    title: 'Worship',
    description:
      'Supporting daily prayer, Jumu’ah and Muslim religious life across RMIT campuses.',
    href: '/pray',
  },
  {
    number: '02',
    title: 'Islamic learning',
    description:
      'Creating opportunities to learn, ask questions and strengthen Islamic knowledge.',
    href: '/events',
  },
  {
    number: '03',
    title: 'Community',
    description:
      'Building belonging, friendship and connection throughout university life.',
    href: '/join',
  },
  {
    number: '04',
    title: 'Student support',
    description:
      'Helping Muslim students raise concerns and navigate challenges affecting their experience.',
    href: '/support',
  },
  {
    number: '05',
    title: 'Representation',
    description:
      'Representing Muslim student needs and advocating for a better campus experience.',
    href: '/contact',
  },
  {
    number: '06',
    title: 'Service',
    description:
      'Giving students opportunities to volunteer, contribute, develop and lead.',
    href: '/join#volunteer',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/20">
      <Navbar />

      <main id="main-content">
        <section className="bg-isr-dark-red px-4 py-14 text-white sm:py-20">
          <div className="container-isr mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-isr-yellow">
                About ISR
              </p>

              <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                {ISR_PUBLIC.tagline}
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/80 sm:text-xl">
                The Islamic Society of RMIT exists to
                support Muslim student life through faith,
                knowledge, community, service, support and
                representation.
              </p>

              <p className="mt-5 max-w-3xl text-sm leading-relaxed text-white/60 sm:text-base">
                Whether someone has just arrived at RMIT,
                needs somewhere to pray, wants to meet other
                Muslims, is looking for Islamic learning,
                needs support or wants to contribute, ISR
                aims to be a reliable place to begin.
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-isr-turquoise">
                  Why ISR exists
                </p>

                <h2 className="mt-3 text-3xl font-bold leading-tight text-isr-dark-red sm:text-4xl">
                  Supporting Muslim students throughout university life
                </h2>

                <p className="mt-5 leading-relaxed text-gray-700">
                  {ISR_PUBLIC.mission}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {areas.map(
                  (area) => (
                    <Link
                      key={area.number}
                      href={area.href}
                      className="isr-card isr-card-interactive group p-5 sm:p-6"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-xs font-bold text-isr-turquoise">
                          {area.number}
                        </span>

                        <span
                          aria-hidden="true"
                          className="text-isr-turquoise transition-transform group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </div>

                      <h3 className="mt-4 text-xl font-bold text-isr-dark-red">
                        {area.title}
                      </h3>

                      <p className="mt-3 text-sm leading-relaxed text-gray-700">
                        {area.description}
                      </p>
                    </Link>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-7xl">
            <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
              <article className="rounded-[1.75rem] bg-isr-dark-red p-6 text-white sm:p-9">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-isr-yellow">
                  Our history
                </p>

                <h2 className="mt-3 text-3xl font-bold">
                  A community built over decades
                </h2>

                <p className="mt-5 leading-relaxed text-white/80">
                  Muslim student life at RMIT has a
                  documented history extending back
                  decades. The record includes early prayer
                  facilities, the RMIT Islamic Society,
                  prayer-space advocacy, Islamic education,
                  community events, inter-university work
                  and the transition from RMITIS to ISR.
                </p>

                <p className="mt-4 text-sm leading-relaxed text-white/60">
                  The historical archive is continuing to
                  grow as additional primary records and
                  former committee material are recovered.
                </p>

                <Link
                  href="/about/history"
                  className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 font-bold text-isr-dark-red transition hover:bg-isr-yellow"
                >
                  Explore our history
                </Link>
              </article>

              <article className="rounded-[1.75rem] border border-isr-light-blue/20 bg-isr-cream/60 p-6 sm:p-9">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-isr-turquoise">
                  ISR today
                </p>

                <h2 className="mt-3 text-3xl font-bold text-isr-dark-red">
                  Faith. Knowledge. Community. Service.
                </h2>

                <p className="mt-5 leading-relaxed text-gray-700">
                  ISR supports Muslim student life across
                  RMIT through prayer support, programs,
                  events, community channels, volunteering
                  and student representation.
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  <Link
                    href="/join"
                    className="isr-button-primary"
                  >
                    Join ISR
                  </Link>

                  <Link
                    href="/teams"
                    className="isr-button-secondary"
                  >
                    Explore teams
                  </Link>

                  <Link
                    href="/pray"
                    className="isr-button-secondary"
                  >
                    Pray at RMIT
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-7xl">
            <div className="grid gap-4 md:grid-cols-3">
              <Link
                href="/events"
                className="isr-card isr-card-interactive p-6"
              >
                <p className="text-xs font-bold uppercase tracking-wide text-isr-turquoise">
                  Participate
                </p>

                <h2 className="mt-3 text-xl font-bold text-isr-dark-red">
                  What&apos;s happening?
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-gray-700">
                  See upcoming ISR programs and events.
                </p>
              </Link>

              <Link
                href="/support"
                className="isr-card isr-card-interactive p-6"
              >
                <p className="text-xs font-bold uppercase tracking-wide text-isr-turquoise">
                  Support
                </p>

                <h2 className="mt-3 text-xl font-bold text-isr-dark-red">
                  Need help?
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-gray-700">
                  Raise a Muslim student concern with ISR.
                </p>
              </Link>

              <Link
                href="/contact"
                className="isr-card isr-card-interactive p-6"
              >
                <p className="text-xs font-bold uppercase tracking-wide text-isr-turquoise">
                  Contact
                </p>

                <h2 className="mt-3 text-xl font-bold text-isr-dark-red">
                  Speak to ISR
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-gray-700">
                  Find the right contact pathway.
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
