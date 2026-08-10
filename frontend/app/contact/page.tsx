import type {
  Metadata,
} from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
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
      'Membership, community, ISR information or another general question.',
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
      'Raise something affecting your experience as a Muslim student.',
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
      'Report incorrect, outdated, broken or inaccessible website information.',
    subject:
      'ISR Website Correction',
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/15">
      <Navbar />

      <main id="main-content">
        <section className="isr-page-hero bg-isr-dark-red px-4 py-14 text-white sm:py-20">
          <div className="container-isr mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <p className="isr-eyebrow text-isr-yellow">
                Contact ISR
              </p>

              <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Choose the easiest way to reach us
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/80 sm:text-xl">
                For most questions, you can email, call or
                message ISR directly. You do not need to
                know which committee member to contact.
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:py-16">
          <div className="container-isr mx-auto max-w-7xl">
            <div className="grid gap-7 lg:grid-cols-[0.72fr_1.28fr]">
              <aside className="isr-sticky-rail self-start rounded-[1.75rem] bg-isr-cream/65 p-6 sm:p-8">
                <p className="isr-eyebrow text-isr-turquoise">
                  Official channels
                </p>

                <h2 className="mt-4 text-2xl font-bold text-isr-dark-red">
                  Islamic Society of RMIT
                </h2>

                <div className="mt-7 grid gap-3">
                  <a
                    href={`mailto:${ISR_PUBLIC.email}`}
                    className="isr-contact-method rounded-xl border border-isr-light-blue/25 bg-white p-4"
                  >
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                      Email
                    </p>

                    <p className="mt-1 break-all font-bold text-isr-turquoise">
                      {ISR_PUBLIC.email}
                    </p>
                  </a>

                  <a
                    href={ISR_PUBLIC.phone.href}
                    className="isr-contact-method rounded-xl border border-isr-light-blue/25 bg-white p-4"
                  >
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                      Phone
                    </p>

                    <p className="mt-1 font-bold text-isr-dark-red">
                      {ISR_PUBLIC.phone.label}
                    </p>
                  </a>

                  <a
                    href={ISR_PUBLIC.whatsapp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="isr-contact-method rounded-xl bg-isr-dark-red p-4 text-white"
                  >
                    <p className="text-xs font-bold uppercase tracking-wide text-isr-yellow">
                      WhatsApp
                    </p>

                    <p className="mt-1 font-bold">
                      Message ISR
                    </p>
                  </a>
                </div>

                <div className="mt-6 flex flex-wrap gap-4 text-sm font-bold">
                  <a
                    href={ISR_PUBLIC.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-isr-turquoise"
                  >
                    Instagram
                  </a>

                  <a
                    href={ISR_PUBLIC.tiktok.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-isr-turquoise"
                  >
                    TikTok
                  </a>
                </div>
              </aside>

              <div>
                <p className="isr-eyebrow text-isr-turquoise">
                  Email pathways
                </p>

                <h2 className="mt-4 text-3xl font-bold text-isr-dark-red sm:text-4xl">
                  What are you contacting us about?
                </h2>

                <p className="mt-4 max-w-2xl leading-relaxed text-gray-700">
                  Choosing a category gives the email a
                  useful subject line. Everything still goes
                  to ISR.
                </p>

                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {enquiries.map(
                    (
                      enquiry,
                    ) => (
                      <a
                        key={
                          enquiry.title
                        }
                        href={mailto(
                          enquiry.subject,
                        )}
                        className="isr-choice-card isr-card isr-card-interactive flex flex-col p-5 sm:p-6"
                      >
                        <h3 className="text-xl font-bold text-isr-dark-red">
                          {
                            enquiry.title
                          }
                        </h3>

                        <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-700">
                          {
                            enquiry.description
                          }
                        </p>

                        <span className="mt-6 font-bold text-isr-turquoise">
                          Email ISR →
                        </span>
                      </a>
                    ),
                  )}
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              <article className="rounded-[1.75rem] bg-isr-dark-red p-6 text-white sm:p-8">
                <p className="isr-eyebrow text-isr-yellow">
                  Student issue?
                </p>

                <h2 className="mt-4 text-2xl font-bold">
                  Use Student Support
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-white/75">
                  If something is affecting your experience
                  as a Muslim student, the support page
                  provides more specific starting points.
                </p>

                <Link
                  href="/support"
                  className="mt-6 inline-flex font-bold text-isr-yellow"
                >
                  Student Support →
                </Link>
              </article>

              <article className="rounded-[1.75rem] border border-isr-yellow bg-isr-yellow/30 p-6 sm:p-8">
                <p className="isr-eyebrow text-isr-turquoise">
                  Sensitive information
                </p>

                <h2 className="mt-4 text-2xl font-bold text-isr-dark-red">
                  Send the minimum needed first
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-gray-700">
                  Avoid sending passwords, payment-card
                  information, identity documents or
                  detailed sensitive records through
                  ordinary email unless an appropriate
                  process has been confirmed.
                </p>

                <Link
                  href="/privacy"
                  className="isr-text-link mt-6"
                >
                  Privacy information →
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
