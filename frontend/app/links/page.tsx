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
  title: 'ISR Links',
  description:
    'Official Islamic Society of RMIT links for prayer, events, membership, community, volunteering, teams, support and social channels.',
}

const essentials = [
  {
    title: 'Pray at RMIT',
    description:
      'Prayer spaces, Jumu’ah and prayer information across RMIT.',
    href: '/pray',
  },
  {
    title: 'What’s On',
    description:
      'Upcoming events, weekly programs and activities.',
    href: '/events',
  },
  {
    title: 'Campus Guide',
    description:
      'Muslim student information for City, Bundoora and Brunswick.',
    href: '/campuses',
  },
  {
    title: 'Student Guide',
    description:
      'New to RMIT or ISR? Start with the essentials.',
    href: '/student-guide',
  },
  {
    title: 'Student Support',
    description:
      'Find the right information or support pathway.',
    href: '/support',
  },
  {
    title: 'ISR Updates',
    description:
      'Current notices and operational updates.',
    href: '/updates',
  },
]

const getInvolved = [
  {
    title: 'Free ISR Membership',
    description:
      'Become an official member of the Islamic Society of RMIT.',
    href: ISR_PUBLIC.membership.url,
  },
  {
    title: 'ISR WhatsApp Community',
    description:
      'Stay connected with Muslim student life at RMIT.',
    href: ISR_PUBLIC.community.url,
  },
  {
    title: 'Volunteer with ISR',
    description:
      'Help with events, programs and community activities.',
    href: ISR_PUBLIC.volunteer.url,
  },
  {
    title: 'Join the ISR Team',
    description:
      'Take on consistent responsibility within ISR.',
    href: ISR_PUBLIC.team.url,
  },
]

const channels = [
  {
    label: 'Instagram',
    detail: ISR_PUBLIC.instagram.label,
    href: ISR_PUBLIC.instagram.url,
  },
  {
    label: 'TikTok',
    detail: ISR_PUBLIC.tiktok.label,
    href: ISR_PUBLIC.tiktok.url,
  },
  {
    label: 'WhatsApp',
    detail: 'Message ISR',
    href: ISR_PUBLIC.whatsapp.url,
  },
]

export default function LinksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/15">
      <Navbar />

      <main id="main-content">
        <section className="bg-isr-dark-red px-4 py-14 text-white sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <p className="isr-eyebrow text-isr-yellow">
              Official ISR links
            </p>

            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Everything ISR.
              <span className="block text-isr-yellow">
                One place.
              </span>
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/80 sm:text-xl">
              Prayer, events, community, membership,
              volunteering, teams, support and official ISR
              channels without searching through old posts
              or messages.
            </p>
          </div>
        </section>

        <section className="px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <p className="isr-eyebrow text-isr-turquoise">
              Quick access
            </p>

            <h2 className="mt-3 text-3xl font-bold text-isr-dark-red">
              Find what you need
            </h2>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {essentials.map(
                (item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="isr-card isr-card-interactive group p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl font-bold text-isr-dark-red">
                        {item.title}
                      </h3>

                      <span
                        aria-hidden="true"
                        className="font-bold text-isr-turquoise transition group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-gray-700">
                      {item.description}
                    </p>
                  </Link>
                ),
              )}
            </div>
          </div>
        </section>

        <section className="bg-isr-cream/55 px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <p className="isr-eyebrow text-isr-turquoise">
              Get involved
            </p>

            <h2 className="mt-3 text-3xl font-bold text-isr-dark-red">
              Become part of ISR
            </h2>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {getInvolved.map(
                (item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="isr-card isr-card-interactive p-6"
                  >
                    <h3 className="text-xl font-bold text-isr-dark-red">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-gray-700">
                      {item.description}
                    </p>

                    <span className="mt-5 inline-flex font-bold text-isr-turquoise">
                      Open official link ↗
                    </span>
                  </a>
                ),
              )}
            </div>

            <div className="mt-6">
              <Link
                href="/teams"
                className="isr-text-link"
              >
                Explore ISR teams →
              </Link>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
              <article className="rounded-[1.75rem] bg-isr-dark-red p-7 text-white sm:p-9">
                <p className="isr-eyebrow text-isr-yellow">
                  Official channels
                </p>

                <h2 className="mt-3 text-3xl font-bold">
                  Follow and contact ISR
                </h2>

                <div className="mt-7 grid gap-3">
                  {channels.map(
                    (channel) => (
                      <a
                        key={channel.label}
                        href={channel.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl bg-white/10 p-4 transition hover:bg-white/15"
                      >
                        <span className="font-bold">
                          {channel.label}
                        </span>

                        <span className="ml-2 text-sm text-white/60">
                          {channel.detail}
                        </span>
                      </a>
                    ),
                  )}
                </div>
              </article>

              <article className="rounded-[1.75rem] border border-isr-yellow bg-isr-yellow/25 p-7 sm:p-9">
                <p className="isr-eyebrow text-isr-turquoise">
                  Support ISR
                </p>

                <h2 className="mt-3 text-3xl font-bold text-isr-dark-red">
                  Support Muslim student life
                </h2>

                <p className="mt-4 leading-relaxed text-gray-700">
                  Support ISR programs, events and services
                  for Muslim students at RMIT.
                </p>

                <a
                  href={ISR_PUBLIC.donate.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="isr-button-primary mt-7"
                >
                  Donate to ISR
                </a>

                <Link
                  href="/contact"
                  className="isr-text-link mt-5"
                >
                  Contact ISR →
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