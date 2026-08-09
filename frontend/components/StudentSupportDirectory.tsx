import Link from 'next/link'
import SectionHeading from '@/components/SectionHeading'

const supportItems = [
  {
    title: 'Religious accommodations',
    description:
      'Prayer, fasting, assessments, placements, classes and other religious needs.',
    action: 'Ask ISR for guidance',
    href: 'mailto:isr@rmit.edu.au?subject=Religious%20Accommodation%20Enquiry',
  },
  {
    title: 'Islamophobia or discrimination',
    description:
      'Find an appropriate pathway if you experience harassment, discrimination or Islamophobia.',
    action: 'Request guidance',
    href: 'mailto:isr@rmit.edu.au?subject=Discrimination%20or%20Islamophobia%20Guidance',
  },
  {
    title: 'Wellbeing and chaplaincy',
    description:
      'Find appropriate faith-sensitive wellbeing, pastoral or university support.',
    action: 'Ask about support',
    href: 'mailto:isr@rmit.edu.au?subject=Wellbeing%20Support',
  },
  {
    title: 'Muslim student support',
    description:
      'Contact ISR when you are unsure where to go or need help navigating Muslim student life.',
    action: 'Contact ISR',
    href: 'mailto:isr@rmit.edu.au?subject=Muslim%20Student%20Support',
  },
  {
    title: 'New to RMIT',
    description:
      'Start with prayer, community, events, membership and essential student information.',
    action: 'Start here',
    href: '/start',
  },
]

function SupportAction({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  if (href.startsWith('/')) {
    return (
      <Link href={href} className="isr-text-link mt-6">
        {children}
        <span aria-hidden="true">→</span>
      </Link>
    )
  }

  return (
    <a href={href} className="isr-text-link mt-6">
      {children}
      <span aria-hidden="true">→</span>
    </a>
  )
}

export default function StudentSupportDirectory() {
  return (
    <>
      <section aria-labelledby="support-pathways">
        <SectionHeading
          eyebrow="Find the right next step"
          title="What do you need help with?"
          description="ISR can help you identify an appropriate pathway. We are not a medical, legal, counselling or emergency service."
          id="support-pathways"
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {supportItems.map((item) => (
            <article
              key={item.title}
              className="isr-card flex flex-col p-6"
            >
              <h3 className="text-xl font-bold text-isr-dark-red">
                {item.title}
              </h3>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-700">
                {item.description}
              </p>

              <SupportAction href={item.href}>
                {item.action}
              </SupportAction>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-6 lg:grid-cols-2">
        <article className="isr-card bg-isr-cream/50 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-isr-dark-red">
            What ISR can help with
          </h2>

          <ul className="mt-6 space-y-3 text-sm leading-relaxed text-gray-700">
            {[
              'Helping you identify the right RMIT or community pathway',
              'Explaining how to raise a Muslim student concern',
              'Directing prayer and religious-accommodation questions',
              'Connecting students with appropriate community support',
            ].map((item) => (
              <li
                key={item}
                className="rounded-xl border border-isr-light-blue/20 bg-white px-4 py-3"
              >
                {item}
              </li>
            ))}
          </ul>
        </article>

        <article className="isr-card border-isr-yellow bg-isr-yellow/40 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-isr-dark-red">
            Before sharing sensitive information
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-relaxed text-gray-700">
            <p>
              Avoid sending identity documents, medical records, passwords,
              payment-card details or highly sensitive evidence through
              ordinary email.
            </p>

            <p>
              ISR cannot promise absolute confidentiality where there is a
              serious safety concern or legal obligation to escalate.
            </p>
          </div>

          <Link href="/privacy" className="isr-text-link mt-6">
            Privacy information
            <span aria-hidden="true">→</span>
          </Link>
        </article>
      </section>

      <section className="mt-16 rounded-[2rem] bg-isr-dark-red px-6 py-9 text-white sm:px-9">
        <h2 className="text-3xl font-bold">
          Immediate danger or emergency?
        </h2>

        <p className="mt-4 max-w-3xl leading-relaxed text-white/80">
          ISR is not an emergency-response service. Use the appropriate
          emergency or university safety service rather than waiting for an ISR
          response.
        </p>
      </section>
    </>
  )
}
