import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SectionHeading from '@/components/SectionHeading'

export const metadata: Metadata = {
  title: 'About ISR',
  description:
    'Learn about the purpose, services and organisational structure of the Islamic Society of RMIT.',
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
      'Delivering talks, workshops, reminders and educational opportunities for students.',
  },
  {
    title: 'Community and Belonging',
    description:
      'Creating welcoming opportunities for Muslim students to connect and build meaningful relationships.',
  },
  {
    title: 'Student Representation',
    description:
      'Raising Muslim student needs and campus concerns through appropriate university channels.',
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

const values = [
  {
    title: 'Faith-centred',
    description:
      'Programs and conduct should remain consistent with ISR’s Islamic purpose.',
  },
  {
    title: 'Student-focused',
    description:
      'Services should respond to genuine Muslim student needs across RMIT.',
  },
  {
    title: 'Accountable',
    description:
      'Decisions, approvals and responsibilities should remain clear and auditable.',
  },
  {
    title: 'Welcoming',
    description:
      'Students should be treated respectfully regardless of background or level of involvement.',
  },
  {
    title: 'Collaborative',
    description:
      'ISR should work constructively with students, university stakeholders and appropriate community partners.',
  },
  {
    title: 'Sustainable',
    description:
      'Records, policies and role systems should support smooth leadership transitions.',
  },
]

const structureAreas = [
  {
    title: 'Executive Committee',
    description:
      'Strategic direction, governance, approvals and organisational accountability.',
  },
  {
    title: 'Administration',
    description:
      'Meetings, records, correspondence, policies, notices and institutional knowledge.',
  },
  {
    title: 'Finance and Partnerships',
    description:
      'Budgets, financial controls, reimbursements, grants, sponsorships and acquittals.',
  },
  {
    title: 'Religious Affairs',
    description:
      'Prayer facilities, Jumuah, Islamic programs and religious-content oversight.',
  },
  {
    title: 'Events and Community',
    description:
      'Social, educational, cultural and community programs.',
  },
  {
    title: 'Media and Communications',
    description:
      'Branding, public communications, campaigns and digital platforms.',
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
                The Islamic Society of RMIT supports Muslim students through
                worship, learning, community, representation, welfare and
                opportunities to serve.
              </p>

              <div className="mt-7 rounded-2xl border border-isr-yellow bg-isr-yellow/50 p-4 text-sm font-semibold leading-relaxed text-isr-dark-red">
                Historical dates, establishment claims and organisational
                milestones will only be published after documentary
                verification.
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="about-purpose"
          className="bg-white px-4 py-16 sm:py-20"
        >
          <div className="container-isr mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
              <SectionHeading
                eyebrow="Our purpose"
                title="Supporting Muslim student life"
                description="ISR aims to help Muslim students practise their faith, connect with community, participate confidently in university life and contribute positively to RMIT."
                id="about-purpose"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                {serviceAreas.map((area) => (
                  <article
                    key={area.title}
                    className="isr-card p-5 sm:p-6"
                  >
                    <h3 className="font-bold text-isr-dark-red">
                      {area.title}
                    </h3>

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
          aria-labelledby="values-heading"
          className="bg-isr-light-blue/10 px-4 py-16 sm:py-20"
        >
          <div className="container-isr mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Mission and values"
              title="Faith, service and responsibility"
              description="These principles describe the direction of the local redesign and should be aligned with the final approved constitution and policies before publication."
              id="values-heading"
            />

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {values.map((value, index) => (
                <article
                  key={value.title}
                  className="isr-card p-6"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-isr-turquoise">
                    0{index + 1}
                  </p>

                  <h3 className="mt-4 text-lg font-bold text-isr-dark-red">
                    {value.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-gray-700">
                    {value.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="structure-heading"
          className="bg-white px-4 py-16 sm:py-20"
        >
          <div className="container-isr mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Organisational structure"
              title="How ISR delivers its work"
              description="ISR work is distributed across committee portfolios and operational teams. Final role names and responsibilities require annual verification."
              id="structure-heading"
            />

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {structureAreas.map((area) => (
                <article
                  key={area.title}
                  className="isr-card p-5 sm:p-6"
                >
                  <h3 className="font-bold text-isr-dark-red">
                    {area.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-gray-700">
                    {area.description}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-isr-yellow bg-isr-yellow/45 p-5 text-sm leading-relaxed text-isr-dark-red">
              Committee office holders, team names, role descriptions and term
              dates should be controlled through an annually reviewed register.
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <div className="overflow-hidden rounded-[2rem] bg-isr-dark-red px-6 py-9 text-white shadow-[0_20px_55px_rgba(91,11,5,0.16)] sm:px-9 lg:flex lg:items-center lg:justify-between lg:gap-10">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-isr-yellow">
                  Take part
                </p>

                <h2 className="mt-3 text-3xl font-bold">
                  Become part of the ISR community
                </h2>

                <p className="mt-4 max-w-2xl leading-relaxed text-white/80">
                  Join as a member, volunteer your skills, attend an event or
                  learn more about how ISR is governed.
                </p>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:shrink-0">
                <Link
                  href="/join"
                  className="rounded-full bg-white px-6 py-3 text-center font-semibold text-isr-dark-red transition hover:bg-isr-yellow"
                >
                  Join ISR
                </Link>

                <Link
                  href="/governance"
                  className="rounded-full border border-white/30 px-6 py-3 text-center font-semibold text-white transition hover:bg-white/10"
                >
                  Governance
                </Link>

                <Link
                  href="/contact"
                  className="rounded-full border border-white/30 px-6 py-3 text-center font-semibold text-white transition hover:bg-white/10"
                >
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
