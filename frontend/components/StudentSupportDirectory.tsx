import Link from 'next/link'

type SupportItem = {
  title: string
  description: string
  action: string
  href: string
  external?: boolean
  verificationRequired?: boolean
}

const supportItems: SupportItem[] = [
  {
    title: 'Wellbeing and Chaplaincy',
    description:
      'Find appropriate faith-sensitive wellbeing, pastoral and university support pathways.',
    action: 'Contact ISR for guidance',
    href: 'mailto:isr@rmit.edu.au?subject=Wellbeing%20and%20Chaplaincy%20Support',
    external: true,
    verificationRequired: true,
  },
  {
    title: 'Religious Accommodations',
    description:
      'Seek guidance regarding prayer, fasting, assessments, placements, classes and religious observance.',
    action: 'Ask about accommodations',
    href: 'mailto:isr@rmit.edu.au?subject=Religious%20Accommodation%20Enquiry',
    external: true,
    verificationRequired: true,
  },
  {
    title: 'Report Islamophobia or Discrimination',
    description:
      'Receive initial guidance on reporting harassment, discrimination, vilification or Islamophobia.',
    action: 'Request reporting guidance',
    href: 'mailto:isr@rmit.edu.au?subject=Confidential%20Reporting%20Guidance',
    external: true,
    verificationRequired: true,
  },
  {
    title: 'International Student Support',
    description:
      'Find appropriate assistance for settling into university, understanding services and connecting with community.',
    action: 'Contact ISR',
    href: 'mailto:isr@rmit.edu.au?subject=International%20Student%20Support',
    external: true,
    verificationRequired: true,
  },
  {
    title: 'Brothers’ Welfare Pathway',
    description:
      'A dedicated brothers’ welfare contact and escalation process will be listed after formal confirmation.',
    action: 'Use the general ISR contact',
    href: 'mailto:isr@rmit.edu.au?subject=Brothers%20Welfare%20Support',
    external: true,
    verificationRequired: true,
  },
  {
    title: 'Sisters’ Welfare Pathway',
    description:
      'A dedicated sisters’ welfare contact and escalation process will be listed after formal confirmation.',
    action: 'Use the general ISR contact',
    href: 'mailto:isr@rmit.edu.au?subject=Sisters%20Welfare%20Support',
    external: true,
    verificationRequired: true,
  },
]

const accommodationExamples = [
  'Prayer during classes, laboratories or placements',
  'Ramadan fasting and assessment arrangements',
  'Jumu’ah attendance and timetable conflicts',
  'Religious dress and personal modesty requirements',
  'Access to appropriate prayer and ablution facilities',
  'Islamic holidays and compulsory university activities',
]

export default function StudentSupportDirectory() {
  return (
    <>
      <section aria-labelledby="support-pathways">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-isr-turquoise">
            Support pathways
          </p>
          <h2
            id="support-pathways"
            className="mt-2 text-3xl font-bold text-isr-dark-red sm:text-4xl"
          >
            Find the right support
          </h2>
          <p className="mt-4 leading-relaxed text-gray-700">
            ISR can help students identify an appropriate pathway, but it is not
            a medical, legal, counselling or emergency service.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {supportItems.map((item) => (
            <article
              key={item.title}
              className="flex flex-col rounded-3xl border border-isr-light-blue/30 bg-white p-6 shadow-sm"
            >
              {item.verificationRequired && (
                <p className="text-xs font-semibold uppercase tracking-wide text-isr-bright-red">
                  Contact pathway under review
                </p>
              )}

              <h3 className="mt-3 text-xl font-bold text-isr-dark-red">
                {item.title}
              </h3>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-700">
                {item.description}
              </p>

              {item.external ? (
                <a
                  href={item.href}
                  className="mt-6 inline-flex items-center text-sm font-semibold text-isr-turquoise hover:text-isr-dark-red"
                >
                  {item.action} →
                </a>
              ) : (
                <Link
                  href={item.href}
                  className="mt-6 inline-flex items-center text-sm font-semibold text-isr-turquoise hover:text-isr-dark-red"
                >
                  {item.action} →
                </Link>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl border border-isr-light-blue/30 bg-isr-cream/50 p-6 sm:p-8">
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
                className="rounded-xl border border-isr-light-blue/20 bg-white px-4 py-3 text-sm text-gray-700"
              >
                {example}
              </li>
            ))}
          </ul>

          <p className="mt-6 text-sm leading-relaxed text-gray-600">
            Final guidance must align with current RMIT processes and should be
            reviewed whenever university policy changes.
          </p>
        </article>

        <article className="rounded-3xl border border-isr-bright-red/20 bg-isr-yellow/40 p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-isr-turquoise">
            Confidentiality
          </p>
          <h2 className="mt-3 text-2xl font-bold text-isr-dark-red">
            Understand the limits before sharing information
          </h2>

          <div className="mt-6 space-y-4 text-sm leading-relaxed text-gray-700">
            <p>
              ISR should handle sensitive enquiries respectfully and only share
              information with those who need it to respond.
            </p>
            <p>
              Absolute confidentiality cannot be promised where there is a
              serious risk of harm, a legal obligation, a child-safety concern
              or a need to escalate an emergency.
            </p>
            <p>
              Students should avoid sending detailed medical records, identity
              documents or highly sensitive evidence through ordinary email
              unless an appropriate secure process has been confirmed.
            </p>
          </div>

          <p className="mt-6 rounded-xl bg-white/80 p-4 text-sm font-semibold text-isr-dark-red">
            The final confidentiality statement requires formal ISR approval.
          </p>
        </article>
      </section>

      <section className="mt-16 rounded-3xl bg-isr-dark-red px-6 py-8 text-white sm:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-isr-yellow">
          Immediate danger or emergency
        </p>
        <h2 className="mt-3 text-3xl font-bold">
          ISR is not an emergency-response service
        </h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-white/80">
          In an immediate emergency, contact the appropriate emergency service
          or campus security rather than waiting for an ISR response. Verified
          RMIT emergency and crisis contacts will be added before publication.
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

      <section className="mt-16 rounded-3xl border border-isr-light-blue/30 bg-white p-6 sm:p-8">
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
