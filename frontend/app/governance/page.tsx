import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Governance | Islamic Society of RMIT',
  description:
    'Governance, accountability and policy information for the Islamic Society of RMIT.',
}

const governanceItems = [
  {
    title: 'Constitution',
    description:
      'The current approved ISR constitution and amendment history.',
    status: 'Document upload required',
  },
  {
    title: 'Committee and Office Holders',
    description:
      'Current executive roles, committee responsibilities and official term dates.',
    status: 'Annual verification required',
  },
  {
    title: 'Annual General Meeting',
    description:
      'AGM notices, agendas, confirmed minutes and election outcomes.',
    status: 'Publication process required',
  },
  {
    title: 'Elections',
    description:
      'Eligibility, nominations, voting procedures, notices and declared results.',
    status: 'Annual review required',
  },
  {
    title: 'Code of Conduct',
    description:
      'Behavioural expectations for members, volunteers, committee and event participants.',
    status: 'Approved policy required',
  },
  {
    title: 'Complaints and Appeals',
    description:
      'How concerns are submitted, acknowledged, assessed, escalated and recorded.',
    status: 'Approved procedure required',
  },
  {
    title: 'Privacy',
    description:
      'How ISR collects, uses, stores, shares and deletes personal information.',
    status: 'Privacy notice required',
  },
  {
    title: 'Accessibility',
    description:
      'ISR commitments and the process for requesting reasonable adjustments.',
    status: 'Accessibility statement required',
  },
  {
    title: 'Photography and Media',
    description:
      'Consent, event photography, child-safe practice and removal requests.',
    status: 'Approved policy required',
  },
  {
    title: 'Child Safety and Safeguarding',
    description:
      'Requirements when minors participate, including supervision, reporting and screening.',
    status: 'Applicable policy required',
  },
  {
    title: 'Financial Approvals',
    description:
      'High-level transparency regarding approvals, reimbursements and authorised spending.',
    status: 'Governance summary required',
  },
  {
    title: 'Affiliation and Independence',
    description:
      'Accurate wording regarding ISR, RUSU, RMIT University and external organisations.',
    status: 'Wording requires confirmation',
  },
]

const controlFields = [
  ['Document owner', 'Named committee role'],
  ['Approver', 'Authorised ISR body'],
  ['Effective date', 'Date policy begins'],
  ['Review date', 'Scheduled reassessment'],
  ['Version number', 'Controlled revision number'],
  ['Superseded version', 'Archived, not deleted'],
  ['Publication status', 'Draft or approved'],
  ['Emergency update', 'Named escalation process'],
]

export default function GovernancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/20">
      <Navbar />

      <main className="px-4 py-16 sm:py-20">
        <div className="container-isr mx-auto max-w-6xl">
          <header className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-isr-turquoise">
              Transparency and accountability
            </p>

            <h1 className="mt-3 text-4xl font-bold text-isr-dark-red sm:text-5xl">
              Governance
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-gray-700">
              Understand how ISR is led, how decisions are recorded and how
              members can raise questions or concerns.
            </p>

            <div className="mt-6 rounded-2xl border border-isr-bright-red/20 bg-isr-yellow/50 p-4 text-sm font-semibold text-isr-dark-red">
              This local prototype does not yet contain final approved ISR
              policies or governing documents.
            </div>
          </header>

          <section className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {governanceItems.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-isr-light-blue/30 bg-white p-6 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-isr-bright-red">
                  {item.status}
                </p>

                <h2 className="mt-3 text-xl font-bold text-isr-dark-red">
                  {item.title}
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-gray-700">
                  {item.description}
                </p>
              </article>
            ))}
          </section>

          <section className="mt-16 rounded-3xl border border-isr-light-blue/30 bg-isr-cream/50 p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-isr-turquoise">
              Document control
            </p>

            <h2 className="mt-3 text-3xl font-bold text-isr-dark-red">
              Every policy needs an owner and review cycle
            </h2>

            <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {controlFields.map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-white p-4">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    {label}
                  </dt>
                  <dd className="mt-2 text-sm font-semibold text-isr-dark-red">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mt-16 rounded-3xl bg-isr-dark-red px-6 py-8 text-white sm:px-8">
            <h2 className="text-3xl font-bold">
              Governance enquiry or complaint
            </h2>

            <p className="mt-4 max-w-3xl leading-relaxed text-white/80">
              Until a dedicated complaints process is approved and published,
              governance enquiries may be directed to the official ISR email.
              Sensitive matters should ultimately use an approved,
              access-controlled process.
            </p>

            <a
              href="mailto:isr@rmit.edu.au?subject=ISR%20Governance%20Enquiry"
              className="mt-6 inline-block rounded-full bg-white px-5 py-2.5 font-semibold text-isr-dark-red transition hover:bg-isr-yellow"
            >
              Contact ISR
            </a>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
