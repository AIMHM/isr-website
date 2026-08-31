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
  title: 'Student Guide',
  description:
    'The essential first steps for Muslim students getting started at RMIT.',
}

const firstDay = [
  {
    number: '01',
    label: 'Campus',
    title: 'Find your prayer space',
    description:
      'Choose City, Bundoora or Brunswick and see the prayer location, room and access information for your campus.',
    href: '/campuses',
    action: 'Find my campus prayer space',
  },
  {
    number: '02',
    label: 'Friday',
    title: 'Know where Jumu’ah is',
    description:
      'Check the current ISR Friday prayer arrangements before making plans around classes or travel.',
    href: '/pray#jumuah',
    action: 'Check Jumu’ah details',
  },
  {
    number: '03',
    label: 'Community',
    title: 'Join the ISR WhatsApp Community',
    description:
      'Keep one reliable channel for announcements, opportunities and Muslim student life at RMIT.',
    href: ISR_PUBLIC.community.url,
    action: 'Join the WhatsApp Community',
    external: true,
  },
]

const settleIn = [
  {
    title: 'Come to something',
    description:
      'Browse events, halaqas, workshops, socials and regular programs happening through ISR.',
    href: '/events',
    action: 'See what’s on',
  },
  {
    title: 'Become an ISR member',
    description:
      'Formal membership is free and gives you a direct connection to the Society.',
    href: ISR_PUBLIC.membership.url,
    action: 'Join ISR for free',
    external: true,
  },
  {
    title: 'Know where to get support',
    description:
      'If something is affecting your experience as a Muslim student, start with the support pathway that fits the situation.',
    href: '/support',
    action: 'Open Student Support',
  },
]

export default function StudentGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/15">
      <Navbar />

      <main id="main-content">
        <section className="isr-page-hero bg-isr-dark-red px-4 py-14 text-white sm:py-20">
          <div className="container-isr mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
              <div className="max-w-4xl">
                <p className="isr-eyebrow text-isr-yellow">
                  New to RMIT?
                </p>

                <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                  Start here as a Muslim student.
                </h1>

                <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/80 sm:text-xl">
                  Find somewhere to pray, know the Friday arrangements and get connected. Everything else can come after that.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    href="/campuses"
                    className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 font-bold text-isr-dark-red transition hover:bg-isr-yellow"
                  >
                    Find my campus
                  </Link>

                  <Link
                    href="/pray#jumuah"
                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-6 py-3 font-bold text-white transition hover:bg-white/10"
                  >
                    Check Jumu’ah
                  </Link>
                </div>
              </div>

              <aside className="border-l-4 border-isr-yellow pl-5">
                <p className="text-sm font-bold text-isr-yellow">
                  This guide is for Muslim student life.
                </p>

                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  For enrolment, student cards, orientation, timetables and general university setup, use RMIT’s official New Students guidance.
                </p>

                <a
                  href="https://www.rmit.edu.au/students/new-students"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex min-h-11 items-center font-bold text-white underline decoration-white/35 underline-offset-4 transition hover:decoration-isr-yellow"
                >
                  Open RMIT New Students ↗
                </a>
              </aside>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="isr-eyebrow text-isr-turquoise">
                First-day essentials
              </p>

              <h2 className="mt-3 text-3xl font-bold text-isr-dark-red sm:text-4xl">
                Three things worth knowing first
              </h2>

              <p className="mt-4 leading-relaxed text-gray-700">
                You do not need to understand every ISR page or program. These three steps cover the information most likely to matter immediately on campus.
              </p>
            </div>

            <ol className="mt-9 divide-y divide-isr-light-blue/20 border-y border-isr-light-blue/20">
              {firstDay.map((step) => {
                const content = (
                  <>
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-isr-dark-red text-sm font-bold text-white">
                      {step.number}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-isr-turquoise">
                        {step.label}
                      </p>

                      <h3 className="mt-1 text-xl font-bold text-isr-dark-red sm:text-2xl">
                        {step.title}
                      </h3>

                      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-700">
                        {step.description}
                      </p>
                    </div>

                    <span className="font-bold text-isr-turquoise sm:shrink-0">
                      {step.action} →
                    </span>
                  </>
                )

                return (
                  <li key={step.number}>
                    {step.external ? (
                      <a
                        href={step.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-h-28 flex-col gap-4 py-6 transition hover:bg-isr-cream/35 sm:flex-row sm:items-center sm:px-3"
                      >
                        {content}
                      </a>
                    ) : (
                      <Link
                        href={step.href}
                        className="flex min-h-28 flex-col gap-4 py-6 transition hover:bg-isr-cream/35 sm:flex-row sm:items-center sm:px-3"
                      >
                        {content}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ol>
          </div>
        </section>

        <section className="bg-isr-cream/55 px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
              <div className="max-w-xl">
                <p className="isr-eyebrow text-isr-turquoise">
                  Once you’re settled
                </p>

                <h2 className="mt-3 text-3xl font-bold text-isr-dark-red sm:text-4xl">
                  Turn information into belonging
                </h2>

                <p className="mt-4 leading-relaxed text-gray-700">
                  The website should help you do more than locate a room. When you are ready, use ISR to find people, participate and know where to turn when you need help.
                </p>
              </div>

              <div className="grid gap-4">
                {settleIn.map((item) => {
                  const body = (
                    <>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xl font-bold text-isr-dark-red">
                          {item.title}
                        </h3>

                        <p className="mt-2 text-sm leading-relaxed text-gray-700">
                          {item.description}
                        </p>
                      </div>

                      <span className="font-bold text-isr-turquoise sm:shrink-0">
                        {item.action} →
                      </span>
                    </>
                  )

                  if (item.external) {
                    return (
                      <a
                        key={item.title}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col gap-4 rounded-2xl border border-isr-light-blue/20 bg-white p-5 transition hover:border-isr-turquoise/40 sm:flex-row sm:items-center sm:p-6"
                      >
                        {body}
                      </a>
                    )
                  }

                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="flex flex-col gap-4 rounded-2xl border border-isr-light-blue/20 bg-white p-5 transition hover:border-isr-turquoise/40 sm:flex-row sm:items-center sm:p-6"
                    >
                      {body}
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
              <article className="rounded-[1.75rem] bg-isr-dark-red p-7 text-white sm:p-9">
                <p className="isr-eyebrow text-isr-yellow">
                  Need a human?
                </p>

                <h2 className="mt-3 text-3xl font-bold">
                  You do not need to know who handles your question.
                </h2>

                <p className="mt-4 max-w-2xl leading-relaxed text-white/75">
                  If you are unsure where something belongs, contact ISR or start with Student Support. The website should route the issue from there.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    href="/support"
                    className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 font-bold text-isr-dark-red transition hover:bg-isr-yellow"
                  >
                    Start with Student Support
                  </Link>

                  <Link
                    href="/contact"
                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-6 py-3 font-bold text-white transition hover:bg-white/10"
                  >
                    Contact ISR
                  </Link>
                </div>
              </article>

              <article className="border-l-4 border-isr-turquoise bg-isr-cream/55 p-7 sm:p-9">
                <p className="isr-eyebrow text-isr-turquoise">
                  Want to contribute?
                </p>

                <h2 className="mt-3 text-2xl font-bold text-isr-dark-red">
                  Attend first. Take on more when you’re ready.
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-gray-700">
                  ISR involvement can grow naturally from attending, to membership, volunteering and team service.
                </p>

                <Link
                  href="/join"
                  className="isr-text-link mt-6"
                >
                  See ways to join ISR →
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
