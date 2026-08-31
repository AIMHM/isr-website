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
  title: 'ISR Teams',
  description:
    'Explore the student teams that help bring the Islamic Society of RMIT to life.',
}

const teams = [
  {
    title: 'Events',
    description:
      'Brings ISR events, dinners, socials, workshops and major community programs to life.',
    examples:
      'Planning, logistics, event delivery and volunteer coordination.',
  },
  {
    title: 'Creative',
    description:
      'Shapes how ISR looks, feels and communicates through visual media.',
    examples:
      'Design, photography, videography, campaigns and visual storytelling.',
  },
  {
    title: 'Finance & Partnerships',
    description:
      'Supports the resources and relationships that help ISR activities happen.',
    examples:
      'Finance support, partnerships, sponsorship and external relationships.',
  },
  {
    title: 'Data & Insights',
    description:
      'Helps ISR better understand participation, reach and the student community.',
    examples:
      'Attendance insights, membership trends and useful internal reporting.',
  },
  {
    title: 'Musallah & Prayer',
    description:
      'Supports the prayer experience and practical needs of Muslim students on campus.',
    examples:
      'Prayer-space support, Jumu’ah operations and musallah-related assistance.',
  },
]

export default function TeamsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/15">
      <Navbar />

      <main id="main-content">
        <section className="bg-isr-dark-red px-4 py-14 text-white sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <p className="isr-eyebrow text-isr-yellow">
              ISR Teams
            </p>

            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              The students behind the work
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/80 sm:text-xl">
              Events do not organise themselves. Designs do
              not make themselves. Prayer spaces, community
              programs and student initiatives all depend
              on people choosing to contribute.
            </p>
          </div>
        </section>

        <section className="px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="isr-eyebrow text-isr-turquoise">
                Find your place
              </p>

              <h2 className="mt-3 text-3xl font-bold text-isr-dark-red sm:text-4xl">
                Different skills. One community.
              </h2>

              <p className="mt-4 leading-relaxed text-gray-700">
                You do not need to already know everything.
                ISR teams are places to contribute, learn,
                build experience and serve Muslim students
                alongside others.
              </p>
            </div>

            <div className="mt-9 grid gap-5 md:grid-cols-2">
              {teams.map(
                (team) => (
                  <article
                    key={team.title}
                    className="isr-card p-6 sm:p-7"
                  >
                    <h3 className="text-2xl font-bold text-isr-dark-red">
                      {team.title}
                    </h3>

                    <p className="mt-3 leading-relaxed text-gray-700">
                      {team.description}
                    </p>

                    <p className="mt-5 text-sm leading-relaxed text-gray-500">
                      {team.examples}
                    </p>
                  </article>
                ),
              )}
            </div>
          </div>
        </section>

        <section className="bg-isr-cream/55 px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
              <article className="rounded-[1.75rem] bg-isr-dark-red p-7 text-white sm:p-9">
                <p className="isr-eyebrow text-isr-yellow">
                  Ready to contribute?
                </p>

                <h2 className="mt-3 text-3xl font-bold">
                  Join the ISR team
                </h2>

                <p className="mt-4 max-w-2xl leading-relaxed text-white/75">
                  If you want to contribute consistently,
                  explore the team application pathway.
                </p>

                <a
                  href={ISR_PUBLIC.team.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 font-bold text-isr-dark-red transition hover:bg-isr-yellow"
                >
                  Apply to join the team
                </a>
              </article>

              <article className="rounded-[1.75rem] border border-isr-light-blue/25 bg-white p-7 sm:p-9">
                <p className="isr-eyebrow text-isr-turquoise">
                  Not ready for a team?
                </p>

                <h2 className="mt-3 text-3xl font-bold text-isr-dark-red">
                  Volunteer first
                </h2>

                <p className="mt-4 leading-relaxed text-gray-700">
                  Volunteering is an easy way to contribute
                  without taking on a recurring team role.
                </p>

                <a
                  href={ISR_PUBLIC.volunteer.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="isr-button-primary mt-7"
                >
                  Volunteer with ISR
                </a>
              </article>
            </div>

            <p className="mt-7 text-sm leading-relaxed text-gray-500">
              Team structures and recruitment needs can
              change between terms. Current opportunities
              are communicated through ISR’s official
              channels.
            </p>

            <div className="mt-7">
              <Link
                href="/join"
                className="isr-text-link"
              >
                See the full Join ISR pathway →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}