import Link from 'next/link'
import Image from 'next/image'
import {
  InstagramIcon,
  WhatsappIcon,
  MailIcon,
} from '@/components/Icons'

const studentLinks = [
  { href: '/pray', label: 'Pray at RMIT' },
  { href: '/events', label: 'Events' },
  { href: '/announcements', label: 'Announcements' },
  { href: '/support', label: 'Student Support' },
]

const organisationLinks = [
  { href: '/about', label: 'About ISR' },
  { href: '/join', label: 'Join ISR' },
  { href: '/governance', label: 'Governance' },
  { href: '/contact', label: 'Contact' },
]

const policyLinks = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/accessibility', label: 'Accessibility' },
  { href: '/sitemap.xml', label: 'Sitemap' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

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
                <span className="block">of RMIT</span>
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/75">
              The home of Muslim students at RMIT, supporting worship,
              learning, community, representation and service.
            </p>

            <p className="mt-4 text-sm font-semibold text-isr-yellow">
              Representing Muslims on campus.
            </p>
          </div>

          <div>
            <h2 className="font-bold">Student information</h2>

            <ul className="mt-4 space-y-3 text-sm text-white/75">
              {studentLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-bold">About ISR</h2>

            <ul className="mt-4 space-y-3 text-sm text-white/75">
              {organisationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h2 className="mt-7 font-bold">Policies</h2>

            <ul className="mt-4 space-y-3 text-sm text-white/75">
              {policyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-bold">Contact and community</h2>

            <div className="mt-4 flex flex-col gap-4">
              <a
                href="mailto:isr@rmit.edu.au"
                className="inline-flex items-center gap-3 text-sm text-white/75 transition hover:text-white"
              >
                <MailIcon className="h-5 w-5 shrink-0" />
                <span className="break-all">isr@rmit.edu.au</span>
              </a>

              <a
                href="https://www.instagram.com/islamicsocietyofrmit/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-sm text-white/75 transition hover:text-white"
              >
                <InstagramIcon className="h-5 w-5 shrink-0" />
                Instagram
              </a>

              <a
                href="https://api.whatsapp.com/send?phone=61418835013"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-sm text-white/75 transition hover:text-white"
              >
                <WhatsappIcon className="h-5 w-5 shrink-0" />
                WhatsApp
              </a>
            </div>

            <Link
              href="/contact"
              className="mt-6 inline-block rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold transition hover:bg-white hover:text-isr-dark-red"
            >
              Contact ISR
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/20 pt-6 text-sm text-white/65 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} Islamic Society of RMIT.</p>

          <p>
            Organisational relationship wording is pending formal verification.
          </p>
        </div>
      </div>
    </footer>
  )
}
