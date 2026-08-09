import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SectionHeading from '@/components/SectionHeading'

export const metadata: Metadata = {
  title: 'Governance',
  description:
    'Governance, accountability and policy information for the Islamic Society of RMIT.',
}

const governanceItems = [
  {
    title: 'Constitution',
    description:
      'Current approved governing document and controlled amendment history.',
    status: 'Document upload required',
  },
  {
    title: 'Committee and Office Holders',
    description:
      'Current executive roles, responsibilities and official term dates.',
    status: 'Annual verification required',
  },
  {
    title: 'Annual General Meeting',
    description:
      'Meeting notices, agendas, confirmed minutes and election outcomes.',
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
      'Behavioural expectations for members, volunteers, committee and participants.',
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
      'How personal information is collected, used, stored, shared and deleted.',
    status: 'Final policy required',
    href: '/privacy',
  },
  {
    title: 'Accessibility',
    description:
      'Website and event accessibility commitments and adjustment pathways.',
    status: 'Final process required',
    href: '/accessibility',
  },
  {
    title: 'Photography and Media',
    description:
      'Consent, event photography, removal requests and safeguarding requirements.',
    status: 'Approved policy required',
  },
  {
    title: 'Child Safety and Safeguarding',
    description:
      'Supervision, reporting, screening and risk controls when minors participate.',
    status: 'Applicable policy required',
  },
  {
    title: 'Financial Approvals',
    description:
      'High-level controls for expenditure, reimbursement and authorised spending.',
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
  ['Version', 'Controlled revision number'],
  ['Effective date', 'Date policy begins'],
  ['Review date', 'Scheduled reassessment'],
  ['Status', 'Draft or approved'],
  ['Superseded copy', 'Archived, not deleted'],
  ['Emergency update', 'Defined escalation process'],
]

const governancePrinciples = [
  'Decisions should identify who approved them and when.',
  'Confirmed minutes should provide an auditable record of material decisions.',
  'Financial commitments should follow delegated approval limits.',
  'Policies should have owners, versions and scheduled review dates.',
  'Access to records and systems should follow role responsibilities.',
  'Outgoing office holders should complete structured handovers.',
]

export default function GovernancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/20">
      <Navbar />

      <main id="main-content" className="px-4 py-14 sm:py-20">
        <div className="container-isr mx-auto max-w-6xl">
          <header className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-isr-turquoise">
              Transparency and accountability
            </p>

            <h1 className="mt-3 text-4xl font-bold text-isr-dark-red sm:text-5xl">
              Governance
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-gray-700">
              A public reference point for how ISR is led, how decisions are
              controlled and how organisational information should be kept
              current.
            </p>

            <div className="mt-6 rounded-2xl border border-isr-yellow bg-isr-yellow/50 p-4 text-sm font-semibold leading-relaxed text-isr-dark-red">
              This local page is a governance framework. Final approved
              constitutions, policies, minutes and procedures have not yet been
              published here.
            </div>
          </header>

          <section
            aria-labelledby="governance-library"
            className="mt-14"
          >
            <SectionHeading
              eyebrow="Governance library"
              title="Documents and accountability"
              description="Each item should eventually link to an approved, controlled and current document or register."
              id="governance-library"
            />

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {governanceItems.map((item) => {
                const content = (
                  <>
                    <p className="text-xs font-semibold uppercase tracking-wide text-isr-bright-red">
                      {item.status}
                    </p>

                    <h3 className="mt-3 text-xl font-bold text-isr-dark-red">
                      {item.title}
                    </h3>

                    <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-700">
                      {item.description}
                    </p>

                    {item.href && (
                      <span className="isr-text-link mt-6">
                        Open page
                        <span aria-hidden="true">→</span>
                      </span>
                    )}
                  </>
                )

                return item.href ? (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="isr-card isr-card-interactive flex flex-col p-6"
                  >
                    {content}
                  </Link>
                ) : (
                  <article
                    key={item.title}
                    className="isr-card flex flex-col p-6"
                  >
                    {content}
                  </article>
                )
              })}
            </div>
          </section>

          <section
            aria-labelledby="governance-principles"
            className="mt-16"
          >
            <SectionHeading
              eyebrow="Good governance"
              title="Operating principles"
              description="These controls support continuity, transparency and accountable student-society administration."
              id="governance-principles"
            />

            <ol className="mt-8 grid gap-4 md:grid-cols-2">
              {governancePrinciples.map((principle, index) => (
                <li
                  key={principle}
                  className="isr-card flex gap-4 p-5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-isr-turquoise text-sm font-bold text-white">
                    {index + 1}
                  </span>

                  <span className="text-sm font-semibold leading-relaxed text-isr-dark-red">
                    {principle}
                  </span>
                </li>
              ))}
            </ol>
          </section>

          <section className="isr-card mt-16 bg-isr-cream/50 p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-isr-turquoise">
              Document control
            </p>

            <h2 className="mt-3 text-3xl font-bold text-isr-dark-red">
              Every controlled document needs an owner and review cycle
            </h2>

            <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {controlFields.map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl bg-white p-4"
                >
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

          <section className="mt-16 overflow-hidden rounded-[2rem] bg-isr-dark-red px-6 py-8 text-white shadow-[0_20px_55px_rgba(91,11,5,0.14)] sm:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-isr-yellow">
              Governance enquiries
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Raise a governance question
            </h2>

            <p className="mt-4 max-w-3xl leading-relaxed text-white/80">
              Until a dedicated complaints and governance process is approved,
              general governance enquiries may be directed to the official ISR
              email. Sensitive complaints should ultimately use an approved,
              access-controlled process.
            </p>

            <a
              href="mailto:isr@rmit.edu.au?subject=ISR%20Governance%20Enquiry"
              className="mt-6 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-isr-dark-red transition hover:bg-isr-yellow"
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
