import Link from 'next/link'
import {
  InstagramIcon,
  WhatsappIcon,
  MailIcon,
} from '@/components/Icons'

const navigationLinks = [
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

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-isr-dark-red px-4 py-12 text-white">
      <div className="container-isr mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="text-xl font-bold">Islamic Society of RMIT</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/75">
              The home of Muslim students at RMIT.
            </p>
            <p className="mt-2 text-sm text-white/75">
              Representing Muslims on campus.
            </p>
          </div>

          <div>
            <h2 className="font-bold">Student information</h2>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              {navigationLinks.map((link) => (
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
            <h2 className="font-bold">ISR</h2>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
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

              <li>
                <Link
                  href="/sitemap.xml"
                  className="transition hover:text-white"
                >
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold">Contact and community</h2>

            <div className="mt-4 flex flex-col gap-3">
              <a
                href="mailto:isr@rmit.edu.au"
                className="inline-flex items-center gap-2 text-sm text-white/75 transition hover:text-white"
              >
                <MailIcon className="h-4 w-4" />
                isr@rmit.edu.au
              </a>

              <a
                href="https://www.instagram.com/islamicsocietyofrmit/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white/75 transition hover:text-white"
              >
                <InstagramIcon className="h-4 w-4" />
                Instagram
              </a>

              <a
                href="https://api.whatsapp.com/send?phone=61418835013"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white/75 transition hover:text-white"
              >
                <WhatsappIcon className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/20 pt-6 text-sm text-white/65">
          <p>
            © {currentYear} Islamic Society of RMIT. Affiliated with RUSU.
            Relationship and independence wording requires final verification.
          </p>
        </div>
      </div>
    </footer>
  )
}
