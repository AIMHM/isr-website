import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SectionHeading from '@/components/SectionHeading'

export const metadata: Metadata = {
  title: 'Privacy',
  description:
    'Privacy information for the Islamic Society of RMIT website and services.',
}

const sections = [
  {
    title: 'Information ISR may collect',
    description:
      'Contact details, membership information, event registrations, volunteer information, correspondence and limited website analytics where approved.',
  },
  {
    title: 'Why information may be used',
    description:
      'To administer membership, deliver events, respond to enquiries, manage volunteers, meet university requirements and maintain organisational records.',
  },
  {
    title: 'Access and sharing',
    description:
      'Information should be available only to authorised people and shared only where required for an approved purpose, legal obligation, safety concern or university process.',
  },
  {
    title: 'Storage and security',
    description:
      'Approved storage systems, access controls, account ownership and security responsibilities should be documented before sensitive information is collected.',
  },
  {
    title: 'Retention and deletion',
    description:
      'ISR should define how long each category of information is retained and how obsolete records are securely archived or deleted.',
  },
  {
    title: 'Photography and media',
    description:
      'Clear notice, consent and removal processes should apply to event photography and activities involving minors.',
  },
  {
    title: 'Third-party services',
    description:
      'External registration, email, storage, analytics and communications providers should be identified where they handle personal information.',
  },
  {
    title: 'Access and correction',
    description:
      'People should be able to ask what information ISR holds, request correction and raise a concern about information handling.',
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/20">
      <Navbar />

      <main id="main-content" className="px-4 py-14 sm:py-20">
        <div className="container-isr mx-auto max-w-5xl">
          <header className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-isr-turquoise">
              Information handling
            </p>

            <h1 className="mt-3 text-4xl font-bold text-isr-dark-red sm:text-5xl">
              Privacy
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-gray-700">
              This page identifies the privacy controls that should govern ISR
              information collection and handling.
            </p>

            <div className="mt-6 rounded-2xl border border-isr-yellow bg-isr-yellow/50 p-4 text-sm font-semibold leading-relaxed text-isr-dark-red">
              Local prototype only. This is not yet the final approved ISR
              privacy policy.
            </div>
          </header>

          <section
            aria-labelledby="privacy-framework"
            className="mt-14"
          >
            <SectionHeading
              eyebrow="Privacy framework"
              title="How information should be handled"
              description="Any final policy should reflect the actual systems, legal obligations, university requirements and approved ISR practices in operation."
              id="privacy-framework"
            />

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {sections.map((section) => (
                <article
                  key={section.title}
                  className="isr-card p-6"
                >
                  <h3 className="text-xl font-bold text-isr-dark-red">
                    {section.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-gray-700">
                    {section.description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="isr-card mt-14 border-isr-yellow bg-isr-yellow/35 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-isr-dark-red">
              Before sending sensitive information
            </h2>

            <p className="mt-4 leading-relaxed text-gray-700">
              Do not send passwords, payment-card details, identity documents,
              detailed medical records or highly sensitive evidence through
              ordinary email unless an approved secure process has been
              established.
            </p>

            <Link
              href="/contact"
              className="isr-text-link mt-5"
            >
              View contact pathways
              <span aria-hidden="true">→</span>
            </Link>
          </section>

          <section className="mt-14 overflow-hidden rounded-[2rem] bg-isr-dark-red p-6 text-white shadow-[0_20px_55px_rgba(91,11,5,0.14)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-isr-yellow">
              Privacy enquiry
            </p>

            <h2 className="mt-3 text-2xl font-bold">
              Ask about your information
            </h2>

            <p className="mt-3 max-w-3xl leading-relaxed text-white/80">
              Until a dedicated privacy contact is formally appointed, privacy
              enquiries may be directed to the official ISR email.
            </p>

            <a
              href="mailto:isr@rmit.edu.au?subject=ISR%20Privacy%20Enquiry"
              className="mt-6 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-isr-dark-red transition hover:bg-isr-yellow"
            >
              Email ISR
            </a>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
