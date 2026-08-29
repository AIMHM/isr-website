import type {
  Metadata,
} from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  mailto,
} from '@/lib/siteContent'

export const metadata: Metadata = {
  title: 'Governance & Policies',
  description:
    'Public governance and policy information for the Islamic Society of RMIT.',
}

const areas = [
  {
    title: 'Responsible leadership',
    description:
      'ISR is led by student office-bearers and committee members who are responsible for carrying out the Society’s work and stewarding its resources.',
  },
  {
    title: 'Financial accountability',
    description:
      'Society expenditure, reimbursements, funding and approvals are expected to follow applicable ISR and university-club processes.',
  },
  {
    title: 'Safety and risk',
    description:
      'Events and activities should be planned with appropriate safety, venue, risk and participant considerations.',
  },
  {
    title: 'Records and continuity',
    description:
      'Important decisions, approvals, policies and operational records should be preserved so future committees can understand what occurred and continue the work responsibly.',
  },
]

export default function GovernancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/20">
      <Navbar />

      <main id="main-content">
        <section className="bg-isr-dark-red px-4 py-14 text-white sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-isr-yellow">
                Governance & Policies
              </p>

              <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
                Responsible stewardship of ISR
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/80 sm:text-lg">
                This page provides a simple public overview
                of how ISR approaches governance,
                accountability and responsible operations.
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <div className="grid gap-5 md:grid-cols-2">
              {areas.map(
                (area) => (
                  <article
                    key={area.title}
                    className="isr-card p-6 sm:p-7"
                  >
                    <h2 className="text-xl font-bold text-isr-dark-red">
                      {area.title}
                    </h2>

                    <p className="mt-3 text-sm leading-relaxed text-gray-700">
                      {area.description}
                    </p>
                  </article>
                ),
              )}
            </div>

            <div className="mt-10 rounded-[1.75rem] border border-isr-light-blue/25 bg-white p-6 sm:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-isr-turquoise">
                Public documents
              </p>

              <h2 className="mt-3 text-2xl font-bold text-isr-dark-red">
                Policy documents will be published when appropriate
              </h2>

              <p className="mt-4 max-w-3xl leading-relaxed text-gray-700">
                ISR maintains internal operational and
                governance records. Documents should only
                be published publicly where they are
                appropriate for public access and do not
                expose confidential, personal, financial or
                security-sensitive information.
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              <article className="rounded-[1.75rem] bg-isr-cream/65 p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-isr-dark-red">
                  Questions about ISR governance?
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-gray-700">
                  Contact ISR if you have a legitimate
                  enquiry about a public policy, process or
                  governance matter.
                </p>

                <a
                  href={mailto(
                    'ISR Governance Enquiry',
                  )}
                  className="isr-text-link mt-6"
                >
                  Email ISR →
                </a>
              </article>

              <article className="rounded-[1.75rem] bg-isr-dark-red p-6 text-white sm:p-8">
                <h2 className="text-2xl font-bold">
                  Looking for student information?
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-white/75">
                  Most students will find what they need in
                  Pray at RMIT, Events, Join ISR, Student
                  Support or Contact.
                </p>

                <Link
                  href="/student-guide"
                  className="mt-6 inline-flex font-bold text-isr-yellow"
                >
                  Student Guide →
                </Link>
              </article>
            </div>

            <p className="mt-10 text-xs leading-relaxed text-gray-500">
              Public governance information on this website
              is an overview only. Internal records and
              committee processes remain subject to the
              Society&apos;s applicable governing documents
              and requirements.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
