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
    'Explore the kinds of work students contribute to across the Islamic Society of RMIT and find a way to get involved.',
}

const teams = [
  {
    title: 'Events',
    lead: 'Organise experiences people remember.',
    description:
      'Help plan and deliver dinners, socials, workshops, major programs and the practical details that make events run well.',
    examples:
      'Planning · logistics · volunteer coordination · event delivery',
  },
  {
    title: 'Creative',
    lead: 'Shape how ISR looks and communicates.',
    description:
      'Turn ideas into clear, useful and recognisable visual communication across campaigns, events and community channels.',
    examples:
      'Design · photography · videography · campaigns · storytelling',
  },
  {
    title: 'Finance & Partnerships',
    lead: 'Help good ideas become sustainable.',
    description:
      'Support the financial and relationship work that helps ISR activities happen responsibly and consistently.',
    examples:
      'Budget support · partnerships · sponsorship · external relationships',
  },
  {
    title: 'Data & Insights',
    lead: 'Help ISR understand what students actually use.',
    description:
      'Turn participation and community information into useful insight so future decisions can be better informed.',
    examples:
      'Attendance insights · membership trends · feedback · reporting',
  },
  {
    title: 'Musallah & Prayer',
    lead: 'Support worship on campus.',
    description:
      'Help maintain a reliable prayer experience for students through prayer-space support and Jumu’ah operations.',
    examples:
      'Prayer spaces · Jumu’ah operations · practical musallah support',
  },
] as const

export default function TeamsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/15">
      <Navbar />

      <main id="main-content">
        <section className="isr-page-hero bg-isr-dark-red px-4 py-14 text-white sm:py-20">
          <div className="container-isr mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
              <div className="max-w-4xl">
                <p className="isr-eyebrow text-isr-yellow">
                  ISR Teams
                </p>

                <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                  Find the kind of work you want to help with.
                </h1>

                <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/80 sm:text-xl">
                  ISR is built by students who organise, create, support, analyse and serve. You do not need to arrive with every skill already developed.
                </p>
              </div>

              <aside className="border-l-4 border-isr-yellow pl-5">
                <p className="text-sm font-bold text-isr-yellow">
                  Not sure where you fit?
                </p>

                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  Choose the work that sounds interesting rather than trying to understand every internal title. Current recruitment needs can change between terms.
                </p>
              </aside>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
              <div className="lg:sticky lg:top-28">
                <p className="isr-eyebrow text-isr-turquoise">
                  Contribution areas
                </p>

                <h2 className="mt-3 text-3xl font-bold text-isr-dark-red sm:text-4xl">
                  Different strengths can serve the same community.
                </h2>

                <p className="mt-4 leading-relaxed text-gray-700">
                  Some students are strongest in logistics, others in design, relationships, analysis or prayer support. What matters is useful contribution, reliability and willingness to learn.
                </p>
              </div>

              <div className="divide-y divide-isr-light-blue/20 border-y border-isr-light-blue/20">
                {teams.map((team) => (
                  <article key={team.title} className="py-7 sm:px-4">
                    <div className="grid gap-3 sm:grid-cols-[0.8fr_1.2fr] sm:gap-8">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-isr-turquoise">
                          {team.title}
                        </p>

                        <h3 className="mt-2 text-xl font-bold leading-snug text-isr-dark-red sm:text-2xl">
                          {team.lead}
                        </h3>
                      </div>

                      <div>
                        <p className="leading-relaxed text-gray-700">
                          {team.description}
                        </p>

                        <p className="mt-3 text-sm font-medium leading-relaxed text-gray-500">
                          {team.examples}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-isr-cream/55 px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <article className="bg-isr-dark-red p-7 text-white sm:p-9">
                <p className="isr-eyebrow text-isr-yellow">
                  Want to contribute regularly?
                </p>

                <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                  Apply for a current ISR team opportunity.
                </h2>

                <p className="mt-4 max-w-2xl leading-relaxed text-white/75">
                  The application pathway is the right place to see the current opportunities and put your hand up for consistent team service.
                </p>

                <a
                  href={ISR_PUBLIC.team.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 font-bold text-isr-dark-red transition hover:bg-isr-yellow"
                >
                  View team opportunities ↗
                </a>
              </article>

              <article className="border-l-4 border-isr-turquoise bg-white p-7 sm:p-9">
                <p className="isr-eyebrow text-isr-turquoise">
                  Prefer something lighter?
                </p>

                <h2 className="mt-3 text-2xl font-bold text-isr-dark-red">
                  Volunteer without taking on a recurring role.
                </h2>

                <p className="mt-4 leading-relaxed text-gray-700">
                  Volunteering is a lower-commitment way to help at activities, meet the team and learn how ISR works in practice.
                </p>

                <a
                  href={ISR_PUBLIC.volunteer.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="isr-button-primary mt-7"
                >
                  Volunteer with ISR ↗
                </a>
              </article>
            </div>

            <div className="mt-8 flex flex-col gap-4 border-t border-isr-light-blue/20 pt-7 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-2xl text-sm leading-relaxed text-gray-600">
                You do not have to join a team to belong to ISR. Attending events, becoming a member and participating in the community are all valid ways to be involved.
              </p>

              <Link href="/join" className="isr-text-link shrink-0">
                See all ways to join ISR →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
