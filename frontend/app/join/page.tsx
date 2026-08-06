import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Join ISR | Islamic Society of RMIT',
  description:
    'Join, volunteer and participate in the Islamic Society of RMIT.',
}

const pathways = [
  {
    title: 'Formal Membership',
    description:
      'Become an official ISR member through the approved RMIT and RUSU membership process.',
    action: 'Become a member',
    href: 'https://campus.hellorubric.com/?s=10733',
    external: true,
    status: 'Available',
  },
  {
    title: 'Join the ISR Community',
    description:
      'Connect through the official ISR community and receive relevant updates and opportunities.',
    action: 'Contact ISR for the current link',
    href: 'mailto:isr@rmit.edu.au?subject=ISR%20Community%20Access',
    external: true,
    status: 'Link verification required',
  },
  {
    title: 'Volunteer with ISR',
    description:
      'Assist with events, administration, religious programs, media, logistics and student support.',
    action: 'Express interest',
    href: 'mailto:isr@rmit.edu.au?subject=ISR%20Volunteer%20Expression%20of%20Interest',
    external: true,
    status: 'Application pathway under review',
  },
  {
    title: 'Join a Subcommittee',
    description:
      'Contribute regularly within an ISR team and develop practical leadership experience.',
    action: 'Ask about current openings',
    href: 'mailto:isr@rmit.edu.au?subject=ISR%20Subcommittee%20Opportunities',
    external: true,
    status: 'Positions vary by semester',
  },
  {
    title: 'Committee Elections',
    description:
      'Learn about eligibility, nomination requirements, election notices and committee responsibilities.',
    action: 'View governance information',
    href: '/governance',
    external: false,
    status: 'Election information requires annual review',
  },
  {
    title: 'Attend Without Membership',
    description:
      'Many public ISR activities may be open to non-members, subject to the event audience, capacity and registration rules.',
    action: 'View upcoming events',
    href: '/events',
    external: false,
    status: 'Check each event listing',
  },
]

const volunteerAreas = [
  'Events and logistics',
  'Media and marketing',
  'Religious programs',
  'Administration and governance',
  'Partnerships and sponsorships',
  'Student support and welfare',
  'Technology and website systems',
  'Community engagement',
]

export default function JoinPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/20">
      <Navbar />

      <main className="px-4 py-16 sm:py-20">
        <div className="container-isr mx-auto max-w-6xl">
          <header className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-isr-turquoise">
              Membership and service
            </p>

            <h1 className="mt-3 text-4xl font-bold text-isr-dark-red sm:text-5xl">
              Join ISR
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-gray-700">
              Become a member, volunteer your skills, join a team or take part
              in the Muslim student community at RMIT.
            </p>
          </header>

          <section className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {pathways.map((pathway) => {
              const classes =
                'flex flex-col rounded-3xl border border-isr-light-blue/30 bg-white p-6 shadow-sm transition hover:border-isr-turquoise/50 hover:shadow-md'

              const content = (
                <>
                  <p className="text-xs font-semibold uppercase tracking-wide text-isr-bright-red">
                    {pathway.status}
                  </p>

                  <h2 className="mt-3 text-xl font-bold text-isr-dark-red">
                    {pathway.title}
                  </h2>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-700">
                    {pathway.description}
                  </p>

                  <span className="mt-6 text-sm font-semibold text-isr-turquoise">
                    {pathway.action} →
                  </span>
                </>
              )

              return pathway.external ? (
                <a
                  key={pathway.title}
                  href={pathway.href}
                  target={pathway.href.startsWith('http') ? '_blank' : undefined}
                  rel={pathway.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={classes}
                >
                  {content}
                </a>
              ) : (
                <Link
                  key={pathway.title}
                  href={pathway.href}
                  className={classes}
                >
                  {content}
                </Link>
              )
            })}
          </section>

          <section className="mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-isr-turquoise">
                Volunteer opportunities
              </p>

              <h2 className="mt-3 text-3xl font-bold text-isr-dark-red">
                Contribute according to your strengths
              </h2>

              <p className="mt-4 leading-relaxed text-gray-700">
                Volunteers should receive a clear role, responsible team lead,
                code-of-conduct expectations, task instructions and an
                appropriate induction before beginning work.
              </p>

              <div className="mt-6 rounded-2xl bg-isr-yellow/50 p-5 text-sm leading-relaxed text-isr-dark-red">
                Volunteer roles involving children, sensitive information,
                finances or higher-risk activities may require additional
                screening, approval, training or Working With Children Check
                verification.
              </div>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2">
              {volunteerAreas.map((area) => (
                <li
                  key={area}
                  className="rounded-2xl border border-isr-light-blue/30 bg-isr-cream/50 px-5 py-4 font-semibold text-isr-dark-red"
                >
                  {area}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-16 rounded-3xl bg-isr-dark-red px-6 py-8 text-white sm:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-isr-yellow">
              Not sure where to begin?
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Tell ISR how you would like to contribute
            </h2>

            <p className="mt-4 max-w-3xl leading-relaxed text-white/80">
              Include your campus, availability, interests and any relevant
              experience. Do not send sensitive identity documents through
              ordinary email unless specifically requested through an approved
              process.
            </p>

            <a
              href="mailto:isr@rmit.edu.au?subject=Joining%20or%20Volunteering%20with%20ISR"
              className="mt-6 inline-block rounded-full bg-white px-5 py-2.5 font-semibold text-isr-dark-red transition hover:bg-isr-yellow"
            >
              Contact ISR
            </a>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
