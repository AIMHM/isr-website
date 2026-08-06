import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  MailIcon,
  WhatsappIcon,
  InstagramIcon,
  LocationIcon,
} from '@/components/Icons'

export const metadata: Metadata = {
  title: 'Contact ISR',
  description:
    'Contact the Islamic Society of RMIT for student support, events, partnerships and general enquiries.',
}

const enquiryTypes = [
  {
    title: 'General Enquiries',
    description:
      'Membership, community access, general questions and information about ISR.',
    subject: 'General ISR Enquiry',
  },
  {
    title: 'Events and Programs',
    description:
      'Questions about registrations, event access, cancellations or program information.',
    subject: 'ISR Event Enquiry',
  },
  {
    title: 'Prayer and Facilities',
    description:
      'Prayer-space access, Jumu’ah information, facilities or campus prayer concerns.',
    subject: 'Prayer and Facilities Enquiry',
  },
  {
    title: 'Student Support',
    description:
      'Initial guidance regarding wellbeing, accommodations or university support pathways.',
    subject: 'Student Support Enquiry',
  },
  {
    title: 'Partnerships and Sponsorships',
    description:
      'Collaboration proposals, sponsorships, community partnerships and external invitations.',
    subject: 'Partnership or Sponsorship Enquiry',
  },
  {
    title: 'Website Correction',
    description:
      'Report outdated, inaccessible, inaccurate or broken website information.',
    subject: 'ISR Website Correction',
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/20">
      <Navbar />

      <main id="main-content" className="px-4 py-14 sm:py-20">
        <div className="container-isr mx-auto max-w-6xl">
          <header className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-isr-turquoise">
              Contact ISR
            </p>

            <h1 className="mt-3 text-4xl font-bold text-isr-dark-red sm:text-5xl">
              Find the right contact pathway
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-gray-700">
              Choose the category that best matches your enquiry so it can be
              directed to the appropriate ISR team.
            </p>
          </header>

          <section
            aria-labelledby="contact-categories"
            className="mt-12"
          >
            <h2 id="contact-categories" className="sr-only">
              Enquiry categories
            </h2>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {enquiryTypes.map((enquiry) => (
                <a
                  key={enquiry.title}
                  href={`mailto:isr@rmit.edu.au?subject=${encodeURIComponent(
                    enquiry.subject,
                  )}`}
                  className="group flex flex-col rounded-3xl border border-isr-light-blue/30 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-isr-turquoise/50 hover:shadow-md"
                >
                  <h3 className="text-xl font-bold text-isr-dark-red">
                    {enquiry.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-700">
                    {enquiry.description}
                  </p>

                  <span className="mt-6 text-sm font-semibold text-isr-turquoise transition group-hover:text-isr-dark-red">
                    Email ISR →
                  </span>
                </a>
              ))}
            </div>
          </section>

          <section className="mt-16 grid gap-8 lg:grid-cols-2">
            <article className="rounded-3xl border border-isr-light-blue/30 bg-isr-cream/50 p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-isr-dark-red">
                Official contact channels
              </h2>

              <div className="mt-6 space-y-5">
                <a
                  href="mailto:isr@rmit.edu.au"
                  className="group flex items-start gap-4 rounded-2xl p-2 transition hover:bg-white/70"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-isr-turquoise">
                    <MailIcon className="h-5 w-5" />
                  </span>

                  <span>
                    <span className="block font-semibold text-isr-dark-red">
                      Email
                    </span>
                    <span className="text-sm text-isr-turquoise group-hover:text-isr-dark-red">
                      isr@rmit.edu.au
                    </span>
                  </span>
                </a>

                <a
                  href="https://api.whatsapp.com/send?phone=61418835013"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 rounded-2xl p-2 transition hover:bg-white/70"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-isr-turquoise">
                    <WhatsappIcon className="h-5 w-5" />
                  </span>

                  <span>
                    <span className="block font-semibold text-isr-dark-red">
                      WhatsApp
                    </span>
                    <span className="text-sm text-isr-turquoise group-hover:text-isr-dark-red">
                      Message ISR
                    </span>
                  </span>
                </a>

                <a
                  href="https://www.instagram.com/islamicsocietyofrmit/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 rounded-2xl p-2 transition hover:bg-white/70"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-isr-turquoise">
                    <InstagramIcon className="h-5 w-5" />
                  </span>

                  <span>
                    <span className="block font-semibold text-isr-dark-red">
                      Instagram
                    </span>
                    <span className="text-sm text-isr-turquoise group-hover:text-isr-dark-red">
                      @islamicsocietyofrmit
                    </span>
                  </span>
                </a>

                <div className="flex items-start gap-4 rounded-2xl p-2">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-isr-turquoise">
                    <LocationIcon className="h-5 w-5" />
                  </span>

                  <span>
                    <span className="block font-semibold text-isr-dark-red">
                      Location
                    </span>
                    <span className="text-sm text-gray-700">
                      RMIT University, Melbourne
                    </span>
                  </span>
                </div>
              </div>
            </article>

            <article className="rounded-3xl border border-isr-bright-red/20 bg-isr-yellow/40 p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-isr-turquoise">
                Privacy and safety
              </p>

              <h2 className="mt-3 text-2xl font-bold text-isr-dark-red">
                Before sending sensitive information
              </h2>

              <div className="mt-5 space-y-4 text-sm leading-relaxed text-gray-700">
                <p>
                  Do not send identity documents, detailed medical records,
                  passwords, payment-card information or highly sensitive
                  evidence through ordinary email.
                </p>

                <p>
                  ISR is not an emergency, medical, legal or counselling
                  service. Urgent matters should be directed to the appropriate
                  professional or emergency service.
                </p>

                <p>
                  Response-time commitments and inbox ownership must be
                  formally approved before publication.
                </p>
              </div>

              <Link
                href="/privacy"
                className="mt-6 inline-block text-sm font-semibold text-isr-turquoise hover:text-isr-dark-red"
              >
                Read the privacy notice →
              </Link>
            </article>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
