import type {
  Metadata,
} from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SectionHeading from '@/components/SectionHeading'
import {
  ISR_PUBLIC,
} from '@/lib/siteContent'

export const metadata: Metadata = {
  title: 'About ISR',
  description:
    'Learn about the Islamic Society of RMIT, its purpose and its history.',
}

const areas = [
  {
    title: 'Worship',
    description:
      'Supporting daily prayer, Jumu’ah and Muslim religious life across RMIT.',
  },
  {
    title: 'Islamic learning',
    description:
      'Creating opportunities to learn, ask questions and strengthen Islamic knowledge.',
  },
  {
    title: 'Community',
    description:
      'Building belonging, friendship and connection throughout university life.',
  },
  {
    title: 'Student support',
    description:
      'Helping Muslim students raise concerns and navigate challenges affecting their university experience.',
  },
  {
    title: 'Representation',
    description:
      'Representing Muslim student needs and advocating for a better campus experience.',
  },
  {
    title: 'Service',
    description:
      'Giving students opportunities to volunteer, contribute, develop and lead.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/20">
      <Navbar />

      <main id="main-content">
        <section className="px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-isr-turquoise">
                About ISR
              </p>

              <h1 className="mt-3 text-4xl font-bold leading-tight text-isr-dark-red sm:text-5xl lg:text-6xl">
                {ISR_PUBLIC.tagline}
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-gray-700 sm:text-xl">
                The Islamic Society of RMIT exists to
                support Muslim student life through faith,
                knowledge, community, service, support and
                representation.
              </p>

              <p className="mt-4 max-w-3xl leading-relaxed text-gray-700">
                Whether someone has just arrived at RMIT,
                needs somewhere to pray, wants to meet other
                Muslims, is looking for Islamic learning,
                needs support or wants to contribute, ISR
                aims to be a reliable place to begin.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Why ISR exists"
              title="Supporting Muslim students throughout university life"
              description={ISR_PUBLIC.mission}
            />

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {areas.map(
                (area) => (
                  <article
                    key={area.title}
                    className="isr-card p-6"
                  >
                    <h2 className="text-xl font-bold text-isr-dark-red">
                      {area.title}
                    </h2>

                    <p className="mt-3 text-sm leading-relaxed text-gray-700">
                      {area.description}
                    </p>
                  </article>
                ),
              )}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <article className="rounded-[2rem] bg-isr-dark-red p-7 text-white sm:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-isr-yellow">
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
                  major prayer-space advocacy, Islamic
                  education, community events,
                  inter-university collaboration and the
                  2024 transition from RMITIS to ISR.
                </p>

                <p className="mt-4 text-sm leading-relaxed text-white/65">
                  The exact founding year remains under
                  research, and ISR does not publish a
                  guessed date as fact.
                </p>

                <Link
                  href="/about/history"
                  className="mt-7 inline-flex rounded-full bg-white px-6 py-3 font-bold text-isr-dark-red transition hover:bg-isr-yellow"
                >
                  Explore our history
                </Link>
              </article>

              <article className="isr-card p-7 sm:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-isr-turquoise">
                  ISR today
                </p>

                <h2 className="mt-3 text-3xl font-bold text-isr-dark-red">
                  Faith. Knowledge. Community. Service.
                </h2>

                <p className="mt-5 leading-relaxed text-gray-700">
                  ISR serves Muslim student life across the
                  City, Bundoora and Brunswick campuses
                  through prayer support, programs, events,
                  community channels, volunteering and
                  student representation.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href="/join"
                    className="isr-button-primary"
                  >
                    Join ISR
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

        <section className="bg-isr-cream/60 px-4 py-16 sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <div className="grid gap-6 md:grid-cols-3">
              <Link
                href="/events"
                className="isr-card isr-card-interactive p-6"
              >
                <h2 className="text-xl font-bold text-isr-dark-red">
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
                <h2 className="text-xl font-bold text-isr-dark-red">
                  Need support?
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-gray-700">
                  Raise a Muslim student concern with ISR.
                </p>
              </Link>

              <Link
                href="/contact"
                className="isr-card isr-card-interactive p-6"
              >
                <h2 className="text-xl font-bold text-isr-dark-red">
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
