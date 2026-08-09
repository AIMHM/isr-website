import Link from 'next/link'
import SectionHeading from '@/components/SectionHeading'

type SupportItem = {
  title: string
  description: string
  action: string
  href: string
  status: string
}

const supportItems: SupportItem[] = [
  {
    title: 'Wellbeing and Chaplaincy',
    description:
      'Find appropriate faith-sensitive wellbeing, pastoral and university support pathways.',
    action: 'Contact ISR for guidance',
    href: 'mailto:isr@rmit.edu.au?subject=Wellbeing%20and%20Chaplaincy%20Support',
    status: 'Contact pathway under review',
  },
  {
    title: 'Religious Accommodations',
    description:
      'Seek guidance regarding prayer, fasting, assessments, placements, classes and religious observance.',
    action: 'Ask about accommodations',
    href: 'mailto:isr@rmit.edu.au?subject=Religious%20Accommodation%20Enquiry',
    status: 'Guidance under review',
  },
  {
    title: 'Report Islamophobia or Discrimination',
    description:
      'Receive initial guidance on reporting harassment, discrimination, vilification or Islamophobia.',
    action: 'Request reporting guidance',
    href: 'mailto:isr@rmit.edu.au?subject=Confidential%20Reporting%20Guidance',
    status: 'Reporting pathway under review',
  },
  {
    title: 'International Student Support',
    description:
      'Find assistance for settling into university, understanding services and connecting with community.',
    action: 'Contact ISR',
    href: 'mailto:isr@rmit.edu.au?subject=International%20Student%20Support',
    status: 'Contact pathway under review',
  },
  {
    title: "Brothers' Welfare Pathway",
    description:
      "A dedicated brothers' welfare contact and escalation process will be listed after formal confirmation.",
    action: 'Use the general ISR contact',
    href: 'mailto:isr@rmit.edu.au?subject=Brothers%20Welfare%20Support',
    status: 'Dedicated contact pending',
  },
  {
    title: "Sisters' Welfare Pathway",
    description:
      "A dedicated sisters' welfare contact and escalation process will be listed after formal confirmation.",
    action: 'Use the general ISR contact',
    href: 'mailto:isr@rmit.edu.au?subject=Sisters%20Welfare%20Support',
    status: 'Dedicated contact pending',
  },
]

const accommodationExamples = [
  'Prayer during classes, laboratories or placements',
  'Ramadan fasting and assessment arrangements',
  "Jumu'ah attendance and timetable conflicts",
  'Religious dress and personal modesty requirements',
  'Access to suitable prayer and ablution facilities',
  'Islamic holidays and compulsory university activities',
]

export default function StudentSupportDirectory() {
  return (
    <>
      <section aria-labelledby="support-pathways">
        <SectionHeading
          eyebrow="Support pathways"
          title="Find the right support"
          description="ISR can help identify an appropriate pathway, but it is not a medical, legal, counselling or emergency service."
          id="support-pathways"
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {supportItems.map((item) => (
            <article
              key={item.title}
              className="isr-card isr-card-interactive flex flex-col p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-isr-bright-red">
                {item.status}
              </p>

              <h3 className="mt-3 text-xl font-bold text-isr-dark-red">
                {item.title}
              </h3>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-700">
                {item.description}
              </p>

              <a
                href={item.href}
                className="isr-text-link mt-6"
              >
                {item.action}
                <span aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-6 lg:grid-cols-2">
        <article className="isr-card bg-isr-cream/50 p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-isr-turquoise">
            Religious accommodations
          </p>

          <h2 className="mt-3 text-2xl font-bold text-isr-dark-red">
            Matters students may need help raising
          </h2>

          <ul className="mt-6 space-y-3">
            {accommodationExamples.map((example) => (
              <li
                key={example}
                className="rounded-xl border border-isr-light-blue/20 bg-white px-4 py-3 text-sm leading-relaxed text-gray-700"
              >
                {example}
              </li>
            ))}
          </ul>

          <p className="mt-6 text-sm leading-relaxed text-gray-600">
            Guidance must align with current RMIT processes and should be
            reviewed whenever university policy changes.
          </p>
        </article>

        <article className="isr-card border-isr-yellow bg-isr-yellow/40 p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-isr-turquoise">
            Privacy and safety
          </p>

          <h2 className="mt-3 text-2xl font-bold text-isr-dark-red">
            Understand the limits before sharing information
          </h2>

          <div className="mt-6 space-y-4 text-sm leading-relaxed text-gray-700">
            <p>
              Sensitive enquiries should be handled respectfully and shared
              only with those required to respond.
            </p>

            <p>
              Absolute confidentiality cannot be promised where there is a
              serious risk of harm, a legal obligation, a child-safety concern
              or a need to escalate an emergency.
            </p>

            <p>
              Avoid sending medical records, identity documents or highly
              sensitive evidence through ordinary email unless a secure process
              has been confirmed.
            </p>
          </div>

          <p className="mt-6 rounded-xl bg-white/80 p-4 text-sm font-semibold leading-relaxed text-isr-dark-red">
            Final confidentiality, escalation and child-safety wording requires
            formal ISR approval.
          </p>

          <Link href="/privacy" className="isr-text-link mt-5">
            Read the privacy notice
            <span aria-hidden="true">→</span>
          </Link>
        </article>
      </section>

      <section className="mt-16 overflow-hidden rounded-[2rem] bg-isr-dark-red px-6 py-8 text-white shadow-[0_20px_55px_rgba(91,11,5,0.14)] sm:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-isr-yellow">
          Immediate danger or emergency
        </p>

        <h2 className="mt-3 text-3xl font-bold">
          ISR is not an emergency-response service
        </h2>

        <p className="mt-4 max-w-3xl leading-relaxed text-white/80">
          In an immediate emergency, contact the appropriate emergency service
          or campus security rather than waiting for an ISR response.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="mailto:isr@rmit.edu.au?subject=Student%20Support%20Enquiry"
            className="rounded-full bg-white px-5 py-2.5 font-semibold text-isr-dark-red transition hover:bg-isr-yellow"
          >
            Email ISR
          </a>

          <Link
            href="/contact"
            className="rounded-full border border-white/30 px-5 py-2.5 font-semibold text-white transition hover:bg-white/10"
          >
            View contact page
          </Link>
        </div>
      </section>

      <section className="isr-card mt-16 p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-isr-turquoise">
          Content governance
        </p>

        <h2 className="mt-3 text-2xl font-bold text-isr-dark-red">
          Support information must remain current
        </h2>

        <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Content owner', 'Secretary or approved welfare lead'],
            ['Approver', 'President and relevant executive officer'],
            ['Review frequency', 'Quarterly and after policy changes'],
            ['Urgent updates', 'Publish immediately after verification'],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-2xl bg-isr-cream/60 p-4"
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
    </>
  )
}
