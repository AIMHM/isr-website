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
    title: 'General enquiry',
    description:
      'Membership, community, ISR information or a general question.',
    subject:
      'General ISR Enquiry',
  },
  {
    title: 'Events and programs',
    description:
      'Registrations, event access, cancellations or program information.',
    subject:
      'ISR Event Enquiry',
  },
  {
    title: 'Prayer and facilities',
    description:
      'Prayer spaces, Jumu’ah, access or another campus prayer concern.',
    subject:
      'Prayer and Facilities Enquiry',
  },
  {
    title: 'Student support',
    description:
      'Raise a concern affecting your experience as a Muslim student.',
    subject:
      'Student Support Enquiry',
  },
  {
    title: 'Collaboration or sponsorship',
    description:
      'Partnerships, speakers, sponsorships, invitations or collaboration proposals.',
    subject:
      'ISR Collaboration Enquiry',
  },
  {
    title: 'Website correction',
    description:
      'Report incorrect, outdated, broken or inaccessible website information.',
    subject:
      'ISR Website Correction',
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/20">
      <Navbar />

      <main id="main-content">
        <section className="bg-isr-dark-red px-4 py-14 text-white sm:py-20">
          <div className="container-isr mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-isr-yellow">
                Contact ISR
              </p>

              <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
                How can we help?
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/80 sm:text-lg">
                Choose the enquiry that best matches what
                you need, or contact ISR through one of our
                official channels.
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:py-16">
          <div className="container-isr mx-auto max-w-7xl">
            <div className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
              <aside className="rounded-[1.75rem] bg-isr-cream/65 p-6 sm:p-8 lg:sticky lg:top-28 lg:self-start">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-turquoise">
                  Official contact
                </p>

                <h2 className="mt-3 text-2xl font-bold text-isr-dark-red">
                  Islamic Society of RMIT
                </h2>

                <div className="mt-7 space-y-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                      Email
                    </p>

                    <a
                      href={`mailto:${ISR_PUBLIC.email}`}
                      className="mt-1 block break-all font-bold text-isr-turquoise"
                    >
                      {ISR_PUBLIC.email}
                    </a>
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                      Phone
                    </p>

                    <a
                      href={ISR_PUBLIC.phone.href}
                      className="mt-1 block font-bold text-isr-dark-red"
                    >
                      {ISR_PUBLIC.phone.label}
                    </a>
                  </div>

                  <div className="grid gap-2">
                    <a
                      href={ISR_PUBLIC.whatsapp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl bg-isr-dark-red px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-isr-turquoise"
                    >
                      Message on WhatsApp
                    </a>

                    <a
                      href={ISR_PUBLIC.instagram.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl border border-isr-light-blue/40 bg-white px-4 py-3 text-center text-sm font-bold text-isr-dark-red"
                    >
                      Instagram
                    </a>

                    <a
                      href={ISR_PUBLIC.tiktok.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl border border-isr-light-blue/40 bg-white px-4 py-3 text-center text-sm font-bold text-isr-dark-red"
                    >
                      TikTok
                    </a>
                  </div>
                </div>
              </aside>

              <div>
                <div className="max-w-2xl">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-isr-turquoise">
                    Choose your enquiry
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-isr-dark-red">
                    Send it to the right starting point
                  </h2>
                </div>

                <div className="mt-7 grid gap-4 md:grid-cols-2">
                  {enquiries.map(
                    (enquiry) => (
                      <a
                        key={enquiry.title}
                        href={mailto(
                          enquiry.subject,
                        )}
                        className="isr-card isr-card-interactive group flex flex-col p-5 sm:p-6"
                      >
                        <h3 className="text-xl font-bold text-isr-dark-red">
                          {enquiry.title}
                        </h3>

                        <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-700">
                          {enquiry.description}
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
                <h2 className="text-2xl font-bold">
                  Need student support?
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-white/75">
                  If something is affecting your experience
                  as a Muslim student, the Student Support
                  page will help you identify the best ISR
                  starting point.
                </p>

                <Link
                  href="/support"
                  className="mt-6 inline-flex font-bold text-isr-yellow"
                >
                  Student Support →
                </Link>
              </article>

              <article className="rounded-[1.75rem] border border-isr-yellow bg-isr-yellow/35 p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-isr-dark-red">
                  Sending sensitive information?
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-gray-700">
                  Start with the minimum information needed
                  to explain your enquiry. Avoid sending
                  passwords, payment-card information,
                  identity documents or detailed sensitive
                  records through ordinary email unless an
                  appropriate process has been confirmed.
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
