import Image from 'next/image'
import Link from 'next/link'
import {
  InstagramIcon,
  MailIcon,
  WhatsappIcon,
} from '@/components/Icons'
import {
  ISR_PUBLIC,
} from '@/lib/siteContent'

const studentLinks = [
  {
    href: '/start',
    label: 'Start Here',
  },
  {
    href: '/pray',
    label: 'Pray at RMIT',
  },
  {
    href: '/events',
    label: 'Events',
  },
  {
    href: '/support',
    label: 'Student Support',
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
    href: '/about',
    label: 'About ISR',
  },
  {
    href: '/about/history',
    label: 'Our History',
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
  {
    href: '/sitemap.xml',
    label: 'Sitemap',
  },
]

export default function Footer() {
  const currentYear =
    new Date().getFullYear()

  return (
    <footer className="bg-isr-dark-red px-4 py-12 text-white sm:py-14">
      <div className="container-isr mx-auto max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.25fr_0.8fr_0.8fr_1fr]">
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

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/75">
              {
                ISR_PUBLIC
                  .tagline
              }.
            </p>

            <p className="mt-4 text-sm font-semibold text-isr-yellow">
              {
                ISR_PUBLIC
                  .representationTagline
              }
            </p>
          </div>

          <div>
            <h2 className="font-bold">
              For students
            </h2>

            <ul className="mt-4 space-y-3 text-sm text-white/75">
              {studentLinks.map(
                (link) => (
                  <li
                    key={
                      link.href
                    }
                  >
                    <Link
                      href={
                        link.href
                      }
                      className="transition hover:text-white"
                    >
                      {
                        link.label
                      }
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

            <ul className="mt-4 space-y-3 text-sm text-white/75">
              {organisationLinks.map(
                (link) => (
                  <li
                    key={
                      link.href
                    }
                  >
                    <Link
                      href={
                        link.href
                      }
                      className="transition hover:text-white"
                    >
                      {
                        link.label
                      }
                    </Link>
                  </li>
                ),
              )}
            </ul>

            <h2 className="mt-7 font-bold">
              Policies
            </h2>

            <ul className="mt-4 space-y-3 text-sm text-white/75">
              {policyLinks.map(
                (link) => (
                  <li
                    key={
                      link.href
                    }
                  >
                    <Link
                      href={
                        link.href
                      }
                      className="transition hover:text-white"
                    >
                      {
                        link.label
                      }
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h2 className="font-bold">
              Connect
            </h2>

            <div className="mt-5 space-y-4">
              <a
                href={`mailto:${ISR_PUBLIC.email}`}
                className="flex items-center gap-3 text-sm text-white/75 transition hover:text-white"
              >
                <MailIcon className="h-5 w-5 shrink-0" />

                <span>
                  {
                    ISR_PUBLIC
                      .email
                  }
                </span>
              </a>

              <a
                href={
                  ISR_PUBLIC
                    .whatsapp.url
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-white/75 transition hover:text-white"
              >
                <WhatsappIcon className="h-5 w-5 shrink-0" />

                <span>
                  WhatsApp
                </span>
              </a>

              <a
                href={
                  ISR_PUBLIC
                    .instagram.url
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-white/75 transition hover:text-white"
              >
                <InstagramIcon className="h-5 w-5 shrink-0" />

                <span>
                  Instagram
                </span>
              </a>

              <a
                href={
                  ISR_PUBLIC
                    .tiktok.url
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-white/75 transition hover:text-white"
              >
                <span className="flex h-5 w-5 items-center justify-center text-[9px] font-bold">
                  TT
                </span>

                <span>
                  TikTok
                </span>
              </a>

              <a
                href={
                  ISR_PUBLIC
                    .phone.href
                }
                className="block text-sm text-white/75 transition hover:text-white"
              >
                {
                  ISR_PUBLIC
                    .phone.label
                }
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/15 pt-7 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} Islamic Society of RMIT
          </p>

          <p>
            The home of Muslim students at RMIT.
          </p>
        </div>
      </div>
    </footer>
  )
}
