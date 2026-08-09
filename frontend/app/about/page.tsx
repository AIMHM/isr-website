import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SectionHeading from '@/components/SectionHeading'

export const metadata: Metadata = {
  title: 'About ISR',
  description:
    'Learn about the purpose of the Islamic Society of RMIT.',
}

const areas = [
  {
    title: 'Worship',
    description:
      "Supporting prayer, Jumu'ah and Muslim religious life on campus.",
  },
  {
    title: 'Community',
    description:
      'Creating opportunities for Muslim students to meet, connect and belong.',
  },
  {
    title: 'Support',
    description:
      'Helping students navigate faith, wellbeing and university concerns.',
  },
  {
    title: 'Representation',
    description:
      'Representing Muslim student needs through appropriate university channels.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/20">
      <Navbar />

      <main id="main-content">
        <section className="px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-isr-turquoise">
                About ISR
              </p>

              <h1 className="mt-3 text-4xl font-bold text-isr-dark-red sm:text-5xl lg:text-6xl">
                The home of Muslim students at RMIT
              </h1>

              <p className="mt-6 text-lg leading-relaxed text-gray-700">
                The Islamic Society of RMIT exists to support Muslim student
                life through worship, community, support and representation.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Why ISR exists"
              title="Supporting Muslim students throughout university life"
              description="ISR provides a place to practise faith, meet other Muslims, participate in community and raise Muslim student needs."
            />

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {areas.map((area) => (
                <article key={area.title} className="isr-card p-6">
                  <h2 className="text-xl font-bold text-isr-dark-red">
                    {area.title}
                  </h2>

                  <p className="mt-3 text-sm leading-relaxed text-gray-700">
                    {area.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-isr-light-blue/10 px-4 py-16 sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <SectionHeading
                  eyebrow="Who is it for?"
                  title="Muslim students at RMIT"
                  description="Whether you have just arrived, have been at RMIT for years, attend occasionally or want to take on responsibility, ISR should help you find a place in the community."
                />
              </div>

              <div className="isr-card p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-isr-dark-red">
                  Get involved
                </h2>

                <p className="mt-4 leading-relaxed text-gray-700">
                  Attend an event, join the community, become a member,
                  volunteer or help lead an initiative.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/join" className="isr-button-primary">
                    Join ISR
                  </Link>

                  <Link href="/events" className="isr-button-secondary">
                    See events
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <div className="rounded-[2rem] bg-isr-dark-red px-6 py-9 text-white sm:px-9 lg:flex lg:items-center lg:justify-between">
              <div>
                <h2 className="text-3xl font-bold">
                  Need something from ISR?
                </h2>

                <p className="mt-4 max-w-2xl text-white/80">
                  Find prayer information, student support or the right contact
                  pathway.
                </p>
              </div>

              <Link
                href="/contact"
                className="mt-7 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-isr-dark-red transition hover:bg-isr-yellow lg:mt-0"
              >
                Contact ISR
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
