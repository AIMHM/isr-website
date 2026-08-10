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
  title: 'Privacy',
  description:
    'Privacy information for the Islamic Society of RMIT website.',
}

const principles = [
  {
    title: 'Only share what is needed',
    text:
      'When contacting ISR, start with the minimum information necessary for us to understand your enquiry.',
  },
  {
    title: 'Be careful with sensitive information',
    text:
      'Avoid sending passwords, payment-card details, identity documents, detailed health records or other highly sensitive information through ordinary website or email channels unless an appropriate process has been confirmed.',
  },
  {
    title: 'External services have their own policies',
    text:
      'Links to membership, registration, social media, messaging and donation services take you to third-party platforms that operate under their own privacy practices.',
  },
  {
    title: 'Ask if you are unsure',
    text:
      'If you are concerned about how to send information to ISR, contact us first before transmitting sensitive material.',
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/20">
      <Navbar />

      <main id="main-content">
        <section className="bg-isr-dark-red px-4 py-14 text-white sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-isr-yellow">
                Privacy
              </p>

              <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
                Protecting information you share with ISR
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/80 sm:text-lg">
                This page explains practical privacy
                principles for using the ISR website and
                contacting the Society.
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <div className="grid gap-5 md:grid-cols-2">
              {principles.map(
                (principle) => (
                  <article
                    key={principle.title}
                    className="isr-card p-6 sm:p-7"
                  >
                    <h2 className="text-xl font-bold text-isr-dark-red">
                      {principle.title}
                    </h2>

                    <p className="mt-3 text-sm leading-relaxed text-gray-700">
                      {principle.text}
                    </p>
                  </article>
                ),
              )}
            </div>

            <section className="mt-10 rounded-[1.75rem] bg-isr-cream/65 p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-isr-dark-red">
                Information submitted through external platforms
              </h2>

              <p className="mt-4 leading-relaxed text-gray-700">
                ISR links to external services for functions
                such as membership, event registration,
                messaging, social media, forms and
                donations. When you leave the ISR website,
                the external provider may collect and
                process information according to its own
                privacy terms and settings.
              </p>

              <p className="mt-4 leading-relaxed text-gray-700">
                Before submitting sensitive information,
                review what the service is requesting and
                only provide information that is necessary
                for the relevant purpose.
              </p>
            </section>

            <section className="mt-10 rounded-[1.75rem] border border-isr-yellow bg-isr-yellow/35 p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-isr-dark-red">
                Need to discuss a privacy concern?
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-gray-700">
                Contact ISR if you believe information has
                been sent incorrectly, a website pathway is
                requesting inappropriate information, or you
                are unsure how to send something safely.
              </p>

              <a
                href={mailto(
                  'ISR Privacy Enquiry',
                )}
                className="isr-button-primary mt-6"
              >
                Contact ISR
              </a>
            </section>

            <div className="mt-10 flex flex-wrap gap-5 text-sm">
              <Link
                href="/contact"
                className="isr-text-link"
              >
                Contact ISR →
              </Link>

              <Link
                href="/accessibility"
                className="isr-text-link"
              >
                Accessibility →
              </Link>
            </div>

            <p className="mt-10 text-xs leading-relaxed text-gray-500">
              Contact email: {ISR_PUBLIC.email}
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
