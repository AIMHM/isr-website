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
    'Learn why the Islamic Society of RMIT exists and how it supports Muslim student life at RMIT.',
}

const areas = [
  {
    title: 'Pray',
    description:
      'Find prayer spaces, daily prayer information and ISR Jumu’ah arrangements across RMIT.',
    href: '/pray',
    action: 'Pray at RMIT',
  },
  {
    title: 'Learn',
    description:
      'Find Islamic learning, halaqas, workshops and other opportunities to grow in knowledge.',
    href: '/events',
    action: 'See what’s on',
  },
  {
    title: 'Belong',
    description:
      'Meet other Muslims, join the community and build friendships through student life.',
    href: '/join',
    action: 'Join ISR',
  },
  {
    title: 'Get support',
    description:
      'Start a conversation when something is affecting your experience as a Muslim student.',
    href: '/support',
    action: 'Student Support',
  },
  {
    title: 'Be represented',
    description:
      'ISR raises Muslim student needs and works to improve the campus experience where it can.',
    href: '/contact',
    action: 'Contact ISR',
  },
  {
    title: 'Contribute',
    description:
      'Attend, volunteer or serve consistently through the student teams that help ISR operate.',
    href: '/join',
    action: 'Ways to get involved',
  },
] as const

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/15">
      <Navbar />

      <main id="main-content">
        <section className="isr-page-hero bg-isr-dark-red px-4 py-14 text-white sm:py-20">
          <div className="container-isr mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.65fr] lg:items-end">
              <div className="max-w-4xl">
                <p className="isr-eyebrow text-isr-yellow">
                  About ISR
                </p>

                <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                  {ISR_PUBLIC.tagline}
                </h1>

                <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/80 sm:text-xl">
                  The Islamic Society of RMIT exists so Muslim students have a clear place to turn for worship, Islamic learning, community, support, representation and service.
                </p>
              </div>

              <aside className="border-l-4 border-isr-yellow pl-5">
                <p className="text-sm font-bold text-isr-yellow">
                  Built around Muslim student life
                </p>

                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  The website is organised around what students need to do — pray, find Jumu’ah, attend something, get support or become involved — rather than around ISR’s internal structure.
                </p>
              </aside>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
              <div className="lg:sticky lg:top-28">
                <p className="isr-eyebrow text-isr-turquoise">
                  Why ISR exists
                </p>

                <h2 className="mt-3 text-3xl font-bold leading-tight text-isr-dark-red sm:text-4xl">
                  Supporting Muslim students throughout university life
                </h2>

                <p className="mt-5 leading-relaxed text-gray-700">
                  {ISR_PUBLIC.mission}
                </p>
              </div>

              <div className="divide-y divide-isr-light-blue/20 border-y border-isr-light-blue/20">
                {areas.map((area) => (
                  <Link
                    key={area.title}
                    href={area.href}
                    className="group flex min-h-28 flex-col gap-3 py-6 transition hover:bg-isr-cream/35 sm:flex-row sm:items-center sm:justify-between sm:px-4"
                  >
                    <div className="min-w-0 max-w-2xl">
                      <h3 className="text-xl font-bold text-isr-dark-red sm:text-2xl">
                        {area.title}
                      </h3>

                      <p className="mt-2 text-sm leading-relaxed text-gray-700">
                        {area.description}
                      </p>
                    </div>

                    <span className="font-bold text-isr-turquoise sm:shrink-0">
                      {area.action} →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-isr-cream/55 px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <div className="grid gap-6 lg:grid-cols-2">
              <article className="border-l-4 border-isr-turquoise bg-white p-7 sm:p-9">
                <p className="isr-eyebrow text-isr-turquoise">
                  For students
                </p>

                <h2 className="mt-3 text-3xl font-bold text-isr-dark-red">
                  Start with the need you have today
                </h2>

                <p className="mt-4 leading-relaxed text-gray-700">
                  You do not need to understand ISR before using it. If you need somewhere to pray, an event to attend, a support pathway or a way to meet people, begin there.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href="/student-guide" className="isr-button-primary">
                    New student guide
                  </Link>

                  <Link href="/find" className="isr-button-secondary">
                    Find something
                  </Link>
                </div>
              </article>

              <article className="bg-isr-dark-red p-7 text-white sm:p-9">
                <p className="isr-eyebrow text-isr-yellow">
                  For contributors
                </p>

                <h2 className="mt-3 text-3xl font-bold">
                  Service makes the community possible
                </h2>

                <p className="mt-4 leading-relaxed text-white/75">
                  ISR depends on students who choose to help with activities, creative work, prayer support, partnerships, insight and other practical work behind the community.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href="/teams"
                    className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 font-bold text-isr-dark-red transition hover:bg-isr-yellow"
                  >
                    Explore ISR teams
                  </Link>

                  <Link
                    href="/join"
                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-6 py-3 font-bold text-white transition hover:bg-white/10"
                  >
                    Ways to join
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <div className="flex flex-col gap-5 border-y border-isr-light-blue/20 py-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="isr-eyebrow text-isr-turquoise">
                  Need something specific?
                </p>

                <h2 className="mt-2 text-2xl font-bold text-isr-dark-red">
                  Go directly to the right ISR pathway.
                </h2>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/events" className="isr-button-secondary">
                  What’s On
                </Link>

                <Link href="/support" className="isr-button-secondary">
                  Student Support
                </Link>

                <Link href="/contact" className="isr-button-primary">
                  Contact ISR
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
