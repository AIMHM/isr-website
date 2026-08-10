import type {
  Metadata,
} from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  InstagramIcon,
  MailIcon,
  WhatsappIcon,
} from '@/components/Icons'
import {
  ISR_PUBLIC,
  mailto,
} from '@/lib/siteContent'

export const metadata: Metadata = {
  title: 'Contact ISR',
  description:
    'Contact the Islamic Society of RMIT.',
}

const enquiries = [
  {
    title:
      'General enquiry',
    description:
      'Membership, community, ISR information or a general question.',
    subject:
      'General ISR Enquiry',
  },
  {
    title:
      'Events and programs',
    description:
      'Registrations, event access, cancellations or program information.',
    subject:
      'ISR Event Enquiry',
  },
  {
    title:
      'Prayer and facilities',
    description:
      'Prayer spaces, Jumu’ah, access or another campus prayer concern.',
    subject:
      'Prayer and Facilities Enquiry',
  },
  {
    title:
      'Student support',
    description:
      'Raise a concern affecting your experience as a Muslim student.',
    subject:
      'Student Support Enquiry',
  },
  {
    title:
      'Collaboration or sponsorship',
    description:
      'Partnerships, speakers, sponsorships, invitations or collaboration proposals.',
    subject:
      'ISR Collaboration Enquiry',
  },
  {
    title:
      'Website correction',
    description:
      'Report incorrect, outdated, broken or inaccessible information.',
    subject:
      'ISR Website Correction',
  },
  {
    title:
      'Historical archive',
    description:
      'Share a lead about ISR, RMITIS, past committees, campaigns, events or Muslim student history at RMIT.',
    subject:
      'ISR Historical Archive Contribution',
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/20">
      <Navbar />

      <main
        id="main-content"
        className="px-4 py-14 sm:py-20"
      >
        <div className="container-isr mx-auto max-w-6xl">
          <header className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-isr-turquoise">
              Contact ISR
            </p>

            <h1 className="mt-3 text-4xl font-bold text-isr-dark-red sm:text-5xl">
              How can we help?
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-gray-700">
              Choose the enquiry that best matches what
              you need, or contact ISR through one of our
              official channels.
            </p>
          </header>

          <section className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {enquiries.map(
              (enquiry) => (
                <a
                  key={
                    enquiry.title
                  }
                  href={mailto(
                    enquiry.subject,
                  )}
                  className="isr-card isr-card-interactive group flex flex-col p-6"
                >
                  <h2 className="text-xl font-bold text-isr-dark-red">
                    {
                      enquiry.title
                    }
                  </h2>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-700">
                    {
                      enquiry.description
                    }
                  </p>

                  <span className="isr-text-link mt-6">
                    Email ISR
                    <span aria-hidden="true">
                      →
                    </span>
                  </span>
                </a>
              ),
            )}
          </section>

          <section className="mt-16 grid gap-6 lg:grid-cols-2">
            <article className="isr-card bg-isr-cream/50 p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-isr-dark-red">
                Official channels
              </h2>

              <div className="mt-7 space-y-5">
                <a
                  href={`mailto:${ISR_PUBLIC.email}`}
                  className="flex items-center gap-4"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-isr-turquoise">
                    <MailIcon className="h-5 w-5" />
                  </span>

                  <span>
                    <span className="block font-semibold text-isr-dark-red">
                      Email
                    </span>

                    <span className="text-sm text-isr-turquoise">
                      {
                        ISR_PUBLIC
                          .email
                      }
                    </span>
                  </span>
                </a>

                <a
                  href={
                    ISR_PUBLIC
                      .phone.href
                  }
                  className="flex items-center gap-4"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-sm font-bold text-isr-turquoise">
                    PH
                  </span>

                  <span>
                    <span className="block font-semibold text-isr-dark-red">
                      Phone
                    </span>

                    <span className="text-sm text-isr-turquoise">
                      {
                        ISR_PUBLIC
                          .phone
                          .label
                      }
                    </span>
                  </span>
                </a>

                <a
                  href={
                    ISR_PUBLIC
                      .whatsapp
                      .url
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-isr-turquoise">
                    <WhatsappIcon className="h-5 w-5" />
                  </span>

                  <span>
                    <span className="block font-semibold text-isr-dark-red">
                      WhatsApp
                    </span>

                    <span className="text-sm text-isr-turquoise">
                      {
                        ISR_PUBLIC
                          .whatsapp
                          .label
                      }
                    </span>
                  </span>
                </a>

                <a
                  href={
                    ISR_PUBLIC
                      .instagram
                      .url
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-isr-turquoise">
                    <InstagramIcon className="h-5 w-5" />
                  </span>

                  <span>
                    <span className="block font-semibold text-isr-dark-red">
                      Instagram
                    </span>

                    <span className="text-sm text-isr-turquoise">
                      {
                        ISR_PUBLIC
                          .instagram
                          .label
                      }
                    </span>
                  </span>
                </a>

                <a
                  href={
                    ISR_PUBLIC
                      .tiktok.url
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-xs font-bold text-isr-turquoise">
                    TT
                  </span>

                  <span>
                    <span className="block font-semibold text-isr-dark-red">
                      TikTok
                    </span>

                    <span className="text-sm text-isr-turquoise">
                      {
                        ISR_PUBLIC
                          .tiktok
                          .label
                      }
                    </span>
                  </span>
                </a>
              </div>
            </article>

            <article className="isr-card border-isr-yellow bg-isr-yellow/35 p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-isr-dark-red">
                Sending something sensitive?
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-gray-700">
                Start with the minimum information needed
                to explain your enquiry. Do not send
                passwords, payment-card information,
                identity documents or detailed sensitive
                records through ordinary email unless an
                appropriate process has been confirmed.
              </p>

              <Link
                href="/privacy"
                className="isr-text-link mt-6"
              >
                Privacy information
                <span aria-hidden="true">
                  →
                </span>
              </Link>

              <Link
                href="/support"
                className="isr-text-link mt-4"
              >
                Student Support
                <span aria-hidden="true">
                  →
                </span>
              </Link>
            </article>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
