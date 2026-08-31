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
      'Prayer spaces, Jumu’ah and daily prayer information.',
    href: '/pray',
  },
  {
    title: 'What’s On',
    description:
      'Events, halaqas, workshops and recurring programs.',
    href: '/events',
  },
  {
    title: 'Campus Guide',
    description:
      'City, Bundoora and Brunswick Muslim student information.',
    href: '/campuses',
  },
  {
    title: 'New Students',
    description:
      'The Muslim student essentials for getting started at RMIT.',
    href: '/student-guide',
  },
  {
    title: 'Student Support',
    description:
      'Find the right pathway for a Muslim student concern.',
    href: '/support',
  },
  {
    title: 'ISR Updates',
    description:
      'Current notices, changes and operational information.',
    href: '/updates',
  },
] as const

const getInvolved = [
  {
    title: 'Free ISR membership',
    description:
      'Become an official member of the Islamic Society of RMIT.',
    href: ISR_PUBLIC.membership.url,
    action: 'Join for free',
  },
  {
    title: 'ISR WhatsApp Community',
    description:
      'Stay connected to announcements, opportunities and Muslim student life.',
    href: ISR_PUBLIC.community.url,
    action: 'Join the community',
  },
  {
    title: 'Volunteer with ISR',
    description:
      'Help with events and activities without taking on a recurring role.',
    href: ISR_PUBLIC.volunteer.url,
    action: 'Volunteer',
  },
  {
    title: 'Join an ISR team',
    description:
      'Explore consistent contribution through current team opportunities.',
    href: ISR_PUBLIC.team.url,
    action: 'View opportunities',
  },
] as const

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
] as const

export default function LinksPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main id="main-content">
        <section className="isr-page-hero bg-isr-dark-red px-4 py-14 text-white sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className="isr-eyebrow text-isr-yellow">
                Official ISR links
              </p>

              <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Everything official. One place.
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/80 sm:text-xl">
                Go straight to prayer, events, community, membership, volunteering, support or ISR’s official channels without searching through old posts and messages.
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
              <div className="lg:sticky lg:top-28">
                <p className="isr-eyebrow text-isr-turquoise">
                  Student essentials
                </p>

                <h2 className="mt-3 text-3xl font-bold text-isr-dark-red sm:text-4xl">
                  Go straight to the service you need.
                </h2>
              </div>

              <div className="divide-y divide-isr-light-blue/20 border-y border-isr-light-blue/20">
                {essentials.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex min-h-24 items-center justify-between gap-5 py-5 transition hover:bg-isr-cream/35 sm:px-4"
                  >
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold text-isr-dark-red group-hover:text-isr-turquoise">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm leading-relaxed text-gray-600">
                        {item.description}
                      </p>
                    </div>

                    <span
                      aria-hidden="true"
                      className="shrink-0 font-bold text-isr-turquoise transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-isr-cream/55 px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
              <div>
                <p className="isr-eyebrow text-isr-turquoise">
                  Join and contribute
                </p>

                <h2 className="mt-3 text-3xl font-bold text-isr-dark-red sm:text-4xl">
                  Choose the level of involvement that suits you.
                </h2>

                <p className="mt-4 leading-relaxed text-gray-700">
                  Membership, community, volunteering and team service are different options — not a ladder you have to climb.
                </p>

                <Link href="/join" className="isr-text-link mt-6">
                  Understand the options →
                </Link>
              </div>

              <div className="divide-y divide-isr-light-blue/20 border-y border-isr-light-blue/20 bg-white">
                {getInvolved.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-h-24 items-center justify-between gap-5 px-4 py-5 transition hover:bg-isr-cream/35"
                  >
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold text-isr-dark-red">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm leading-relaxed text-gray-600">
                        {item.description}
                      </p>
                    </div>

                    <span className="shrink-0 text-sm font-bold text-isr-turquoise">
                      {item.action} ↗
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <article>
                <p className="isr-eyebrow text-isr-turquoise">
                  Official channels
                </p>

                <h2 className="mt-3 text-3xl font-bold text-isr-dark-red">
                  Follow or message ISR
                </h2>

                <div className="mt-7 divide-y divide-isr-light-blue/20 border-y border-isr-light-blue/20">
                  {channels.map((channel) => (
                    <a
                      key={channel.label}
                      href={channel.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-16 items-center justify-between gap-4 py-4 transition hover:bg-isr-cream/35 sm:px-3"
                    >
                      <span className="font-bold text-isr-dark-red">
                        {channel.label}
                      </span>

                      <span className="text-sm text-gray-600">
                        {channel.detail} ↗
                      </span>
                    </a>
                  ))}
                </div>
              </article>

              <article className="border-l-4 border-isr-yellow bg-isr-cream/55 p-7 sm:p-9">
                <p className="isr-eyebrow text-isr-turquoise">
                  Support ISR
                </p>

                <h2 className="mt-3 text-3xl font-bold text-isr-dark-red">
                  Support Muslim student life
                </h2>

                <p className="mt-4 leading-relaxed text-gray-700">
                  Support ISR programs, events and services for Muslim students at RMIT.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href={ISR_PUBLIC.donate.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="isr-button-primary"
                  >
                    Donate to ISR ↗
                  </a>

                  <Link href="/contact" className="isr-button-secondary">
                    Contact ISR
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
