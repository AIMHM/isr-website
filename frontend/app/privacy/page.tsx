import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy',
  description:
    'Privacy information for the Islamic Society of RMIT website and services.',
}

const sections = [
  [
    'Information ISR may collect',
    'Contact details, membership information, event registrations, volunteer information, correspondence and limited website analytics where approved.',
  ],
  [
    'How information may be used',
    'To administer membership, deliver events, respond to enquiries, manage volunteers, meet university requirements and maintain organisational records.',
  ],
  [
    'Access and sharing',
    'Information should be accessible only to authorised people and shared only where required for an approved purpose, legal obligation, safety concern or university process.',
  ],
  [
    'Storage and retention',
    'ISR must define approved storage locations, access controls, retention periods and deletion procedures before collecting sensitive information through the website.',
  ],
  [
    'Photography and media',
    'Consent and notice processes should apply to event photography, publication, removal requests and activities involving minors.',
  ],
  [
    'Your choices',
    'People should be able to ask what information ISR holds, request correction, withdraw optional consent and raise a privacy concern.',
  ],
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/20">
      <Navbar />

      <main id="main-content" className="px-4 py-14 sm:py-20">
        <div className="container-isr mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-isr-turquoise">
            Information handling
          </p>

          <h1 className="mt-3 text-4xl font-bold text-isr-dark-red sm:text-5xl">
            Privacy
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-gray-700">
            This page outlines the privacy matters ISR must address before
            collecting personal information through the redesigned website.
          </p>

          <div className="mt-6 rounded-2xl border border-isr-bright-red/20 bg-isr-yellow/50 p-4 text-sm font-semibold text-isr-dark-red">
            Prototype only: this is not yet the final approved ISR privacy
            policy.
          </div>

          <div className="mt-12 space-y-5">
            {sections.map(([title, description]) => (
              <section
                key={title}
                className="rounded-2xl border border-isr-light-blue/30 bg-white p-6"
              >
                <h2 className="text-xl font-bold text-isr-dark-red">{title}</h2>
                <p className="mt-3 leading-relaxed text-gray-700">
                  {description}
                </p>
              </section>
            ))}
          </div>

          <section className="mt-12 rounded-3xl bg-isr-dark-red p-6 text-white sm:p-8">
            <h2 className="text-2xl font-bold">Privacy enquiry</h2>
            <p className="mt-3 leading-relaxed text-white/80">
              Until a dedicated privacy contact is formally appointed, privacy
              enquiries may be directed to the official ISR email.
            </p>
            <a
              href="mailto:isr@rmit.edu.au?subject=ISR%20Privacy%20Enquiry"
              className="mt-6 inline-block rounded-full bg-white px-5 py-2.5 font-semibold text-isr-dark-red hover:bg-isr-yellow"
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
