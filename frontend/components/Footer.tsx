import Image from 'next/image'
import TourReplayButton from '@/components/TourReplayButton'
import Link from 'next/link'
import {
  ISR_PUBLIC,
} from '@/lib/siteContent'

const studentLinks = [
  {
    href: '/find',
    label: 'Search ISR',
  },
  {
    href: '/campuses',
    label: 'Campus Guide',
  },
  {
    href: '/student-guide',
    label: 'Student Guide',
  },
  {
    href: '/pray',
    label: 'Pray at RMIT',
  },
  {
    href: '/events',
    label: 'What’s On',
  },
  {
    href: '/support',
    label: 'Student Support',
  },
  {
    href: '/faq',
    label: 'FAQ',
  },
  {
    href: '/updates',
    label: 'ISR Updates',
  },
]

const organisationLinks = [
  {
    href: '/join',
    label: 'Join ISR',
  },
  {
    href: '/teams',
    label: 'Our Teams',
  },
  {
    href: '/links',
    label: 'ISR Links',
  },
  {
    href: '/about',
    label: 'About ISR',
  },

  {
    href: '/contact',
    label: 'Contact ISR',
  },
]

const policyLinks = [
  {
    href: '/governance',
    label: 'Governance & Policies',
  },
  {
    href: '/privacy',
    label: 'Privacy',
  },
  {
    href: '/accessibility',
    label: 'Accessibility',
  },
]

export default function Footer() {
  const currentYear =
    new Date().getFullYear()

  return (
    <footer className="bg-isr-dark-red px-4 py-12 text-white sm:py-14">
      <div className="container-isr mx-auto max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-3"
              aria-label="Islamic Society of RMIT home"
            >
              <span className="rounded-xl bg-white p-2">
                <Image
                  src="/images/isr_logo_transparent.png"
                  alt=""
                  width={46}
                  height={46}
                  className="h-10 w-10 object-contain"
                />
              </span>

              <span className="font-bold leading-tight">
                Islamic Society
                <span className="block">
                  of RMIT
                </span>
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">
              {ISR_PUBLIC.tagline}.
            </p>

            <p className="mt-4 text-sm font-semibold text-isr-yellow">
              {ISR_PUBLIC.representationTagline}
            </p>

            <div className="mt-6">
              <a
                href={ISR_PUBLIC.community.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-full bg-white px-4 py-2.5 text-sm font-bold text-isr-dark-red transition hover:bg-isr-yellow"
              >
                Join the community
              </a>
            </div>
          </div>

          <div>
            <h2 className="font-bold">
              For students
            </h2>

            <ul className="mt-4 space-y-3 text-sm text-white/70">
              {studentLinks.map(
                (link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h2 className="font-bold">
              ISR
            </h2>

            <ul className="mt-4 space-y-3 text-sm text-white/70">
              {organisationLinks.map(
                (link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>

            <h2 className="mt-7 font-bold">
              Policies
            </h2>

            <ul className="mt-4 space-y-3 text-sm text-white/70">
              {policyLinks.map(
                (link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h2 className="font-bold">
              Contact
            </h2>

            <div className="mt-4 space-y-4 text-sm">
              <a
                href={`mailto:${ISR_PUBLIC.email}`}
                className="block break-all text-white/70 transition hover:text-white"
              >
                {ISR_PUBLIC.email}
              </a>

              <a
                href={ISR_PUBLIC.phone.href}
                className="block text-white/70 transition hover:text-white"
              >
                {ISR_PUBLIC.phone.label}
              </a>

              <a
                href={ISR_PUBLIC.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white/70 transition hover:text-white"
              >
                WhatsApp
              </a>

              <a
                href={ISR_PUBLIC.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white/70 transition hover:text-white"
              >
                Instagram
              </a>

              <a
                href={ISR_PUBLIC.tiktok.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white/70 transition hover:text-white"
              >
                TikTok
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-7">
          <div className="flex flex-col gap-3 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {currentYear} Islamic Society of RMIT
            </p>

            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <Link
                href="/privacy"
                className="hover:text-white"
              >
                Privacy
              </Link>

              <Link
                href="/accessibility"
                className="hover:text-white"
              >
                Accessibility
              </Link>

              <Link
                href="/sitemap.xml"
                className="hover:text-white"
              >
                Sitemap
              </Link>

              <TourReplayButton />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
