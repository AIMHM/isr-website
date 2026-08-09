import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SectionHeading from '@/components/SectionHeading'
import { ISR_PUBLIC, mailto } from '@/lib/siteContent'

export const metadata: Metadata = {
  title: 'Join ISR',
  description:
    'Join the Muslim community, become a member and volunteer with the Islamic Society of RMIT.',
}

const membershipHref =
  ISR_PUBLIC.membership.verified
    ? ISR_PUBLIC.membership.url
    : mailto('ISR Membership Enquiry')

const membershipAction =
  ISR_PUBLIC.membership.verified
    ? 'Become a member'
    : 'Ask about current membership'

const communityHref =
  ISR_PUBLIC.community.verified && ISR_PUBLIC.community.url
    ? ISR_PUBLIC.community.url
    : mailto('ISR Community Access')

const pathways = [
  {
    id: 'community',
    title: 'Join the community',
    description:
      'Stay connected with Muslim students and hear about ISR activities and opportunities.',
    action: 'Join the community',
    href: communityHref,
  },
  {
    id: 'membership',
    title: 'Become an ISR member',
    description:
      'Join ISR formally and become part of the society through the current membership system.',
    action: membershipAction,
    href: membershipHref,
  },
  {
    id: 'attend',
    title: 'Attend',
    description:
      'Come to events, workshops, halaqaat and community activities.',
    action: 'See upcoming events',
    href: '/events',
  },
  {
    id: 'volunteer',
    title: 'Volunteer',
    description:
      'Give some of your time and skills to help ISR serve Muslim students.',
    action: 'Express interest',
    href: mailto('ISR Volunteer Expression of Interest'),
  },
  {
    id: 'team',
    title: 'Join a team',
    description:
      'Take on recurring responsibility and contribute within an ISR team.',
    action: 'Ask about opportunities',
    href: mailto('ISR Team Opportunities'),
  },
  {
    id: 'lead',
    title: 'Lead',
    description:
      'Build experience, take responsibility and help shape the future of the community.',
    action: 'Ask about leadership pathways',
    href: mailto('ISR Leadership Pathways'),
  },
]

const volunteerAreas = [
  'Events and logistics',
  'Media and communications',
  'Religious programs',
  'Community engagement',
  'Administration',
  'Technology and digital systems',
]

function Action({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  if (href.startsWith('/')) {
    return (
      <Link href={href} className="isr-text-link mt-6">
        {children}
        <span aria-hidden="true">→</span>
      </Link>
    )
  }

  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="isr-text-link mt-6"
    >
      {children}
      <span aria-hidden="true">→</span>
    </a>
  )
}

export default function JoinPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/20">
      <Navbar />

      <main id="main-content" className="px-4 py-14 sm:py-20">
        <div className="container-isr mx-auto max-w-6xl">
          <header className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-isr-turquoise">
              Become part of the community
            </p>

            <h1 className="mt-3 text-4xl font-bold text-isr-dark-red sm:text-5xl">
              Join ISR
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-gray-700">
              Attend, join, volunteer or take on responsibility at the level
              that suits you.
            </p>
          </header>

          <section className="mt-12">
            <div className="flex flex-wrap gap-2">
              {['Discover', 'Attend', 'Join', 'Volunteer', 'Lead'].map(
                (step, index) => (
                  <div
                    key={step}
                    className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-isr-light-blue/30"
                  >
                    <span className="text-xs font-bold text-isr-turquoise">
                      {index + 1}
                    </span>

                    <span className="text-sm font-semibold text-isr-dark-red">
                      {step}
                    </span>
                  </div>
                ),
              )}
            </div>
          </section>

          <section className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {pathways.map((pathway) => (
              <article
                id={pathway.id}
                key={pathway.id}
                className="isr-card flex scroll-mt-32 flex-col p-6"
              >
                <h2 className="text-xl font-bold text-isr-dark-red">
                  {pathway.title}
                </h2>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-700">
                  {pathway.description}
                </p>

                <Action href={pathway.href}>
                  {pathway.action}
                </Action>
              </article>
            ))}
          </section>

          <section className="mt-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHeading
              eyebrow="Volunteer with ISR"
              title="Contribute according to your strengths"
              description="ISR needs people willing to learn, contribute and work with others."
            />

            <div className="grid gap-3 sm:grid-cols-2">
              {volunteerAreas.map((area) => (
                <div
                  key={area}
                  className="isr-card px-5 py-4 font-semibold text-isr-dark-red"
                >
                  {area}
                </div>
              ))}
            </div>
          </section>

          <section className="mt-16 rounded-[2rem] bg-isr-dark-red px-6 py-9 text-white sm:px-9">
            <h2 className="text-3xl font-bold">
              Not sure where you fit?
            </h2>

            <p className="mt-4 max-w-2xl leading-relaxed text-white/80">
              Tell us what you are interested in and how much time you can
              realistically contribute.
            </p>

            <a
              href={mailto('Joining ISR')}
              className="mt-7 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-isr-dark-red transition hover:bg-isr-yellow"
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
