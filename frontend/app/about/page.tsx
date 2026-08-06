import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'About ISR | Islamic Society of RMIT',
  description:
    'Learn about the purpose, services and governance of the Islamic Society of RMIT.',
}

const serviceAreas = [
  {
    title: 'Prayer and Worship',
    description:
      'Supporting access to daily prayer, Jumuah information and appropriate campus facilities.',
  },
  {
    title: 'Islamic Learning',
    description:
      'Delivering talks, workshops, reminders and educational programs for students.',
  },
  {
    title: 'Community and Belonging',
    description:
      'Creating welcoming opportunities for Muslim students to connect and build lasting relationships.',
  },
  {
    title: 'Student Representation',
    description:
      'Representing Muslim student needs and raising campus concerns through appropriate university channels.',
  },
  {
    title: 'Welfare and Support',
    description:
      'Helping students identify suitable wellbeing, accommodation and support pathways.',
  },
  {
    title: 'Leadership and Volunteering',
    description:
      'Developing students through volunteering, structured teams, mentoring and committee service.',
  },
]

const structureAreas = [
  {
    title: 'Executive Committee',
    description:
      'Responsible for strategic direction, governance, approvals and organisational accountability.',
  },
  {
    title: 'Administration',
    description:
      'Maintains meetings, records, correspondence, policies, notices and institutional knowledge.',
  },
  {
    title: 'Finance and Partnerships',
    description:
      'Supports budgeting, financial controls, reimbursements, grants, sponsorships and acquittals.',
  },
  {
    title: 'Religious Affairs',
    description:
      'Supports prayer facilities, Jumuah, Islamic programs and religious-content oversight.',
  },
  {
    title: 'Events and Community',
    description:
      'Plans and delivers social, educational, cultural and community programs.',
  },
  {
    title: 'Media and Communications',
    description:
      'Maintains ISR branding, public communications, campaigns and digital platforms.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/20">
      <Navbar />

      <main id="main-content">
        <section className="px-4 py-16 sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-isr-turquoise">
                About ISR
              </p>

              <h1 className="mt-3 text-4xl font-bold text-isr-dark-red sm:text-5xl">
                The home of Muslim students at RMIT
              </h1>

              <p className="mt-5 text-lg leading-relaxed text-gray-700">
                The Islamic Society of RMIT supports Muslim students through
                worship, learning, community, representation, welfare and
                leadership opportunities.
              </p>

              <div className="mt-6 rounded-2xl border border-isr-bright-red/20 bg-isr-yellow/50 p-4 text-sm font-semibold text-isr-dark-red">
                ISR historical dates and milestone claims require documentary
                verification before publication.
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-isr-turquoise">
                  Our purpose
                </p>

                <h2 className="mt-3 text-3xl font-bold text-isr-dark-red">
                  Supporting Muslim student life
                </h2>

                <p className="mt-4 leading-relaxed text-gray-700">
                  ISR exists to help Muslim students practise their faith,
                  connect with community, participate fully in university life
                  and contribute positively to RMIT.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {serviceAreas.map((area) => (
                  <article
                    key={area.title}
                    className="rounded-2xl border border-isr-light-blue/30 bg-isr-cream/40 p-5"
                  >
                    <h3 className="font-bold text-isr-dark-red">{area.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-700">
                      {area.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="mission-and-values"
          className="bg-isr-light-blue/10 px-4 py-16 sm:py-20"
        >
          <div className="container-isr mx-auto max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-isr-turquoise">
              Mission and values
            </p>

            <h2 className="mt-3 text-3xl font-bold text-isr-dark-red">
              Faith, service and responsibility
            </h2>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {[
                [
                  'Faith-centred',
                  'ISR programs and conduct should remain consistent with its Islamic purpose.',
                ],
                [
                  'Student-focused',
                  'Services should respond to genuine student needs across RMIT campuses.',
                ],
                [
                  'Accountable',
                  'Decisions, approvals and responsibilities should remain transparent and auditable.',
                ],
                [
                  'Welcoming',
                  'Students should be treated respectfully regardless of background or level of involvement.',
                ],
                [
                  'Collaborative',
                  'ISR should work constructively with students, university stakeholders and appropriate community partners.',
                ],
                [
                  'Sustainable',
                  'Policies, records and role systems should support smooth leadership transitions.',
                ],
              ].map(([title, description]) => (
                <article
                  key={title}
                  className="rounded-2xl border border-isr-light-blue/30 bg-white p-6"
                >
                  <h3 className="font-bold text-isr-dark-red">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-700">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-isr-turquoise">
              Organisational structure
            </p>

            <h2 className="mt-3 text-3xl font-bold text-isr-dark-red">
              How ISR delivers its work
            </h2>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {structureAreas.map((area) => (
                <article
                  key={area.title}
                  className="rounded-2xl border border-isr-light-blue/30 bg-isr-cream/40 p-5"
                >
                  <h3 className="font-bold text-isr-dark-red">{area.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-700">
                    {area.description}
                  </p>
                </article>
              ))}
            </div>

            <p className="mt-6 rounded-2xl bg-isr-yellow/50 p-4 text-sm text-isr-dark-red">
              Final team names, office holders, role descriptions and term
              dates require annual verification.
            </p>
          </div>
        </section>

        <section className="px-4 py-16 sm:py-20">
          <div className="container-isr mx-auto max-w-6xl rounded-3xl bg-isr-dark-red px-6 py-8 text-white sm:px-8">
            <h2 className="text-3xl font-bold">Take part in ISR</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-white/80">
              Become a member, volunteer, attend an event or learn more about
              how ISR is governed.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/join"
                className="rounded-full bg-white px-5 py-2.5 font-semibold text-isr-dark-red hover:bg-isr-yellow"
              >
                Join ISR
              </Link>

              <Link
                href="/governance"
                className="rounded-full border border-white/30 px-5 py-2.5 font-semibold text-white hover:bg-white/10"
              >
                View Governance
              </Link>

              <Link
                href="/contact"
                className="rounded-full border border-white/30 px-5 py-2.5 font-semibold text-white hover:bg-white/10"
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
