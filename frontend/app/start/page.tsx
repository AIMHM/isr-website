import StartUtilityPanel from '@/components/StartUtilityPanel'
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
  title: 'Start Here',
  description:
    'The essential first steps for Muslim students getting started at RMIT.',
}

const steps = [
  {
    number: '01',
    eyebrow: 'Prayer',
    title:
      'Start with your campus',
    description:
      'Open the guide for City, Bundoora or Brunswick, then jump to prayer, Jumu’ah, activities and ISR services from one campus entry point.',
    href: '/campuses',
    action:
      'Open campus guide',
  },
  {
    number: '02',
    eyebrow: 'Friday',
    title:
      'Know your Jumu’ah arrangements',
    description:
      'City and Bundoora have different Friday arrangements, while Brunswick currently has no ISR Jumu’ah.',
    href: '/pray#jumuah',
    action:
      'Check Jumu’ah',
  },
  {
    number: '03',
    eyebrow: 'Community',
    title:
      'Join the ISR WhatsApp Community',
    description:
      'Stay connected to announcements, opportunities and Muslim student life at RMIT.',
    href: ISR_PUBLIC.community.url,
    action:
      'Join WhatsApp Community',
    external: true,
  },
  {
    number: '04',
    eyebrow: 'Membership',
    title:
      'Become a free ISR member',
    description:
      'Formal membership is free and helps strengthen the Society’s Muslim student membership.',
    href: ISR_PUBLIC.membership.url,
    action:
      'Become a member',
    external: true,
  },
  {
    number: '05',
    eyebrow: 'Participate',
    title:
      'Come to something',
    description:
      'Classes, workshops, socials and community activities are one of the easiest ways to meet people.',
    href: '/events',
    action:
      'Browse events',
  },
  {
    number: '06',
    eyebrow: 'Support',
    title:
      'Know where to turn if something happens',
    description:
      'If something is affecting your experience as a Muslim student, you can begin with ISR.',
    href: '/support',
    action:
      'Student Support',
  },
]

export default function StartPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/15">
      <Navbar />

      <main id="main-content">
        <section className="isr-page-hero bg-isr-dark-red px-4 py-14 text-white sm:py-20">
          <div className="container-isr mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
              <div className="max-w-4xl">
                <p className="isr-eyebrow text-isr-yellow">
                  New to RMIT?
                </p>

                <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                  Get the Muslim student essentials sorted
                </h1>

                <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/80 sm:text-xl">
                  You do not need to learn everything about
                  ISR on day one. Start with prayer,
                  Jumu’ah, community, membership and a
                  contact point.
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-white/15 bg-white/[0.08] p-5">
                <p className="text-sm font-bold text-isr-yellow">
                  Six useful first steps
                </p>

                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  You can complete them in any order.
                  The goal is simply to make campus
                  easier to navigate.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <div className="grid gap-4">
              {steps.map(
                (step) => {
                  const body = (
                    <>
                      <div className="isr-journey-number">
                        {step.number}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-isr-turquoise">
                          {step.eyebrow}
                        </p>

                        <h2 className="mt-2 text-xl font-bold text-isr-dark-red sm:text-2xl">
                          {step.title}
                        </h2>

                        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-700">
                          {step.description}
                        </p>
                      </div>

                      <span className="shrink-0 font-bold text-isr-turquoise">
                        {step.action} →
                      </span>
                    </>
                  )

                  if (
                    step.external
                  ) {
                    return (
                      <a
                        key={step.number}
                        href={
                          step.href
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="isr-choice-card isr-card isr-card-interactive flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-6"
                      >
                        {body}
                      </a>
                    )
                  }

                  return (
                    <Link
                      key={step.number}
                      href={step.href}
                      className="isr-choice-card isr-card isr-card-interactive flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-6"
                    >
                      {body}
                    </Link>
                  )
                },
              )}
            </div>
          </div>
        </section>

        <section className="bg-isr-cream/55 px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <div className="grid gap-5 lg:grid-cols-3">
              <article className="rounded-[1.75rem] bg-white p-6 sm:p-7">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-isr-turquoise">
                  Already settled in?
                </p>

                <h2 className="mt-3 text-2xl font-bold text-isr-dark-red">
                  Get involved
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-gray-700">
                  Volunteer, join the team or contribute to
                  Muslim student life.
                </p>

                <Link
                  href="/join"
                  className="isr-text-link mt-6"
                >
                  Ways to get involved →
                </Link>
              </article>

              <article className="rounded-[1.75rem] bg-white p-6 sm:p-7">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-isr-turquoise">
                  Need something?
                </p>

                <h2 className="mt-3 text-2xl font-bold text-isr-dark-red">
                  Talk to ISR
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-gray-700">
                  You do not need to know which team or
                  person handles your enquiry.
                </p>

                <Link
                  href="/contact"
                  className="isr-text-link mt-6"
                >
                  Contact ISR →
                </Link>
              </article>

              <article className="rounded-[1.75rem] bg-isr-dark-red p-6 text-white sm:p-7">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-isr-yellow">
                  Learn more
                </p>

                <h2 className="mt-3 text-2xl font-bold">
                  What is ISR?
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  Learn why the Society exists and what it
                  does for Muslim students.
                </p>

                <Link
                  href="/about"
                  className="mt-6 inline-flex font-bold text-isr-yellow"
                >
                  About ISR →
                </Link>
              </article>
            </div>
          </div>
        </section>

        <div className="container-isr mx-auto max-w-6xl px-4 pb-16 sm:pb-20">
          <StartUtilityPanel />
        </div>

</main>

      <Footer />
    </div>
  )
}
