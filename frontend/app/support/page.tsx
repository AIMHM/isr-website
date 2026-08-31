import SupportTriage from '@/components/SupportTriage'
import SupportBoundary from '@/components/SupportBoundary'
import type {
  Metadata,
} from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StudentSupportDirectory from '@/components/StudentSupportDirectory'

export const metadata: Metadata = {
  title: 'Student Support',
  description:
    'Raise Muslim student concerns and request support from the Islamic Society of RMIT.',
}

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/15">
      <Navbar />

      <main id="main-content">
        <section className="isr-page-hero bg-isr-dark-red px-4 py-14 text-white sm:py-20">
          <div className="container-isr mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <p className="isr-eyebrow text-isr-yellow">
                Student Support
              </p>

              <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Something affecting you as a Muslim student?
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/80 sm:text-xl">
                Start with the closest pathway. Routine information
                is available immediately, while personal concerns
                can go directly to ISR for a human response.
              </p>
            </div>
          </div>
        </section>

        <section
          aria-label="Urgent support information"
          className="border-b border-red-200 bg-red-50 px-4 py-4"
        >
          <div className="container-isr mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-relaxed text-red-900">
              <strong>Immediate danger or emergency?</strong>{' '}
              ISR is not an emergency service. Call 000. For an emergency on an RMIT Melbourne campus, RMIT also directs students to Campus Security on 03 9925 3333.
            </p>

            <a
              href="https://www.rmit.edu.au/about/our-locations-and-facilities/facilities/safety-security/campus-security/emergency-crisis-support"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 shrink-0 items-center font-bold text-red-900 underline decoration-red-300 underline-offset-4 hover:decoration-red-700"
            >
              RMIT emergency support ↗
            </a>
          </div>
        </section>

        <section className="px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-7xl">
            <SupportBoundary />
          </div>
        </section>

        <section className="bg-isr-cream/45 px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-7xl">
            <StudentSupportDirectory />
          </div>
        </section>

        <section className="px-4 pb-16 sm:pb-20">
          <div className="container-isr mx-auto max-w-6xl">
            <SupportTriage />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
