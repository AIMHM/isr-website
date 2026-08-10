import type {
  Metadata,
} from 'next'
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
      'Find the brothers’ and sisters’ prayer rooms for City, Bundoora East, Bundoora West and Brunswick.',
    action: 'Pray at RMIT',
    href: '/pray',
  },
  {
    number: '02',
    title: 'Know where Jumu’ah is',
    description:
      'Check City and Bundoora Friday prayer times and locations before you travel.',
    action: 'Jumu’ah information',
    href: '/pray#jumuah',
  },
  {
    number: '03',
    title: 'Join the Muslim community',
    description:
      'Join the ISR WhatsApp Community so you stay connected to Muslim student life.',
    action: 'Community links',
    href: '/join#community',
  },
  {
    number: '04',
    title: 'Come to something',
    description:
      'Events and programs are one of the easiest ways to meet people and become part of ISR.',
    action: 'Upcoming events',
    href: '/events',
  },
  {
    number: '05',
    title: 'Become an ISR member',
    description:
      'ISR membership is free and gives you a formal connection to the Society.',
    action: 'Free membership',
    href: '/join#membership',
  },
  {
    number: '06',
    title: 'Know where to get help',
    description:
      'If something is affecting your experience as a Muslim student, ISR can be a place to begin.',
    action: 'Student Support',
    href: '/support',
  },
]

export default function StartPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/20">
      <Navbar />

      <main id="main-content">
        <section className="border-b border-isr-light-blue/20 bg-isr-dark-red px-4 py-14 text-white sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-isr-yellow">
                New to RMIT?
              </p>

              <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Start here
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-xl">
                The essentials for prayer, Jumu’ah,
                community, membership, events and support
                as a Muslim student at RMIT.
              </p>

              <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/60">
                You do not need to figure everything out
                on your first day. These six steps will
                get you connected.
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:py-16 lg:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {steps.map(
                (step) => (
                  <Link
                    key={step.number}
                    href={step.href}
                    className="isr-card isr-card-interactive group flex min-h-0 flex-col p-5 sm:min-h-64 sm:p-6"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-isr-turquoise/10 text-sm font-bold text-isr-turquoise">
                        {step.number}
                      </span>

                      <span
                        aria-hidden="true"
                        className="text-xl text-isr-turquoise transition-transform group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </div>

                    <h2 className="mt-5 text-xl font-bold leading-snug text-isr-dark-red">
                      {step.title}
                    </h2>

                    <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-700">
                      {step.description}
                    </p>

                    <span className="mt-6 font-bold text-isr-turquoise">
                      {step.action}
                    </span>
                  </Link>
                ),
              )}
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="rounded-[1.75rem] bg-isr-cream/70 p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-turquoise">
                  One useful rule
                </p>

                <h2 className="mt-3 text-2xl font-bold text-isr-dark-red">
                  You do not have to wait until you know
                  people to become part of ISR.
                </h2>

                <p className="mt-4 max-w-2xl leading-relaxed text-gray-700">
                  Come to an event, join the community,
                  pray on campus or send us a message.
                  Starting small is completely fine.
                </p>
              </div>

              <Link
                href="/join"
                className="isr-button-primary lg:min-w-48"
              >
                Join ISR
              </Link>
            </div>

            <div className="mt-10 rounded-[1.75rem] bg-isr-dark-red px-5 py-9 text-center text-white sm:px-10 sm:py-12">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Still not sure where to begin?
              </h2>

              <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-white/75">
                Contact ISR and tell us what you need.
                You do not need to know which team or
                person handles it.
              </p>

              <Link
                href="/contact"
                className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-7 py-3 font-bold text-isr-dark-red transition hover:bg-isr-yellow"
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
