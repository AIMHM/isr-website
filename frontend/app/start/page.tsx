import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Start Here',
  description:
    'Essential information for Muslim students starting at RMIT.',
}

const steps = [
  {
    number: '01',
    title: 'Find somewhere to pray',
    description:
      'Check prayer-space information for your campus and learn how to access the facilities.',
    action: 'Pray at RMIT',
    href: '/pray',
  },
  {
    number: '02',
    title: "Find Jumu'ah",
    description:
      'Check the current Friday prayer venue, time and access arrangements.',
    action: "Jumu'ah information",
    href: '/pray#jumuah',
  },
  {
    number: '03',
    title: 'Join the Muslim community',
    description:
      'Find the current ISR community pathway and stay connected with Muslim students.',
    action: 'Join ISR',
    href: '/join',
  },
  {
    number: '04',
    title: 'Come to an event',
    description:
      'Events are one of the easiest ways to meet people and become part of the community.',
    action: 'Upcoming events',
    href: '/events',
  },
  {
    number: '05',
    title: 'Become a member',
    description:
      'Formal membership helps you participate more fully in ISR.',
    action: 'Membership',
    href: '/join#membership',
  },
  {
    number: '06',
    title: 'Know where to get help',
    description:
      'Find support pathways for faith, wellbeing, discrimination and university concerns.',
    action: 'Student Support',
    href: '/support',
  },
]

export default function StartPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/20">
      <Navbar />

      <main id="main-content">
        <section className="px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-isr-turquoise">
                New to RMIT?
              </p>

              <h1 className="mt-3 text-4xl font-bold text-isr-dark-red sm:text-5xl">
                Start here
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-700">
                The essentials for finding prayer, community, events and support
                as a Muslim student at RMIT.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {steps.map((step) => (
                <Link
                  key={step.number}
                  href={step.href}
                  className="isr-card isr-card-interactive group flex flex-col p-6"
                >
                  <p className="text-sm font-bold text-isr-turquoise">
                    {step.number}
                  </p>

                  <h2 className="mt-4 text-xl font-bold text-isr-dark-red">
                    {step.title}
                  </h2>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-700">
                    {step.description}
                  </p>

                  <span className="isr-text-link mt-6">
                    {step.action}
                    <span
                      aria-hidden="true"
                      className="transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-14 rounded-[2rem] bg-isr-dark-red px-6 py-9 text-center text-white sm:px-10">
              <h2 className="text-3xl font-bold">
                Still not sure where to begin?
              </h2>

              <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-white/80">
                Contact ISR and we can point you towards the right information
                or community pathway.
              </p>

              <Link
                href="/contact"
                className="mt-7 inline-flex rounded-full bg-white px-7 py-3 font-bold text-isr-dark-red transition hover:bg-isr-yellow"
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
