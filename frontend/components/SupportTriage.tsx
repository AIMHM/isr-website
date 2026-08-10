import Link from 'next/link'

const OPTIONS = [
  {
    title:
      'Prayer or Jumu’ah',

    description:
      'Prayer-space information, access issues or Friday prayer questions.',

    subject:
      'ISR Prayer / Jumuah Enquiry',
  },
  {
    title:
      'Event question',

    description:
      'Ask about an ISR event, registration or attendance information.',

    subject:
      'ISR Event Enquiry',
  },
  {
    title:
      'Joining ISR',

    description:
      'Membership, volunteering, teams or ways to become involved.',

    subject:
      'Joining ISR',
  },
  {
    title:
      'Student concern',

    description:
      'Ask ISR for guidance about a student concern or campus issue.',

    subject:
      'ISR Student Support Enquiry',
  },
  {
    title:
      'General question',

    description:
      'Anything that does not fit the other pathways.',

    subject:
      'ISR General Enquiry',
  },
]

function emailUrl(
  subject: string,
) {
  return (
    'mailto:isr@rmit.edu.au?subject=' +
    encodeURIComponent(
      subject,
    )
  )
}

export default function SupportTriage() {
  return (
    <section
      aria-labelledby="support-triage-heading"
      className="isr-support-triage"
    >
      <div className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-turquoise">
          Find the right ISR pathway
        </p>

        <h2
          id="support-triage-heading"
          className="mt-3 text-3xl font-bold text-isr-dark-red sm:text-4xl"
        >
          What do you need help with?
        </h2>

        <p className="mt-4 leading-relaxed text-gray-700">
          Choose the closest option and your email
          will open with the enquiry type already
          filled in.
        </p>
      </div>

      <div className="mt-8 grid gap-3 md:grid-cols-2">
        {OPTIONS.map(
          (
            option,
          ) => (
            <a
              key={
                option.title
              }
              href={
                emailUrl(
                  option.subject,
                )
              }
              className="isr-support-option"
            >
              <div>
                <h3 className="font-bold text-isr-dark-red">
                  {
                    option.title
                  }
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {
                    option.description
                  }
                </p>
              </div>

              <span
                aria-hidden="true"
                className="shrink-0 font-bold text-isr-turquoise"
              >
                →
              </span>
            </a>
          ),
        )}
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-4 border-t border-isr-light-blue/20 pt-6">
        <p className="text-sm text-gray-600">
          Not sure which one to use?
        </p>

        <Link
          href="/contact"
          className="isr-text-link"
        >
          View all ISR contact options
          <span aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </section>
  )
}
