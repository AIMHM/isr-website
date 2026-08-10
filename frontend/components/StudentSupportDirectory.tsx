import Link from 'next/link'
import {
  mailto,
} from '@/lib/siteContent'

const supportItems = [
  {
    number: '01',
    title:
      'Religious accommodation',
    description:
      'Prayer, fasting, Jumu’ah, assessments, placements, compulsory activities, religious dress or another university issue affecting your ability to practise Islam.',
    action:
      'Contact ISR',
    href: mailto(
      'Religious Accommodation Support',
    ),
  },
  {
    number: '02',
    title:
      'Islamophobia or discrimination',
    description:
      'If you have experienced Islamophobia, harassment, discrimination or treatment you believe relates to your Muslim identity, you can raise it with ISR.',
    action:
      'Raise a concern',
    href: mailto(
      'Confidential Muslim Student Concern',
    ),
  },
  {
    number: '03',
    title:
      'Wellbeing or personal support',
    description:
      'If university life is becoming difficult and you want to speak with someone from ISR about what you are dealing with, reach out.',
    action:
      'Contact ISR',
    href: mailto(
      'Student Wellbeing Support',
    ),
  },
  {
    number: '04',
    title:
      'Prayer-space or Jumu’ah issue',
    description:
      'Report access problems, incorrect information, wudu concerns, room issues or a Friday prayer concern.',
    action:
      'Raise prayer issue',
    href: mailto(
      'Prayer Space or Jumuah Issue',
    ),
  },
  {
    number: '05',
    title:
      'ISR event concern',
    description:
      'Raise an access, registration, conduct, safety or other concern relating to an ISR event or program.',
    action:
      'Raise event concern',
    href: mailto(
      'ISR Event Concern',
    ),
  },
  {
    number: '06',
    title:
      'New to RMIT',
    description:
      'Find prayer spaces, Jumu’ah, community, membership, events and the easiest ways to get connected.',
    action:
      'Start here',
    href: '/start',
  },
]

export default function StudentSupportDirectory() {
  return (
    <>
      <section>
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-isr-turquoise">
            Find the right starting point
          </p>

          <h2 className="mt-3 text-3xl font-bold leading-tight text-isr-dark-red sm:text-4xl">
            What do you need help with?
          </h2>

          <p className="mt-4 leading-relaxed text-gray-700">
            You do not need to know which ISR team handles
            your issue before contacting us.
          </p>
        </div>

        <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {supportItems.map(
            (item) => {
              const content = (
                <>
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-isr-turquoise/10 text-xs font-bold text-isr-turquoise">
                      {item.number}
                    </span>

                    <span
                      aria-hidden="true"
                      className="text-lg text-isr-turquoise"
                    >
                      →
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-bold leading-snug text-isr-dark-red">
                    {item.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-700">
                    {item.description}
                  </p>

                  <span className="mt-6 font-bold text-isr-turquoise">
                    {item.action}
                  </span>
                </>
              )

              if (
                item.href.startsWith(
                  '/',
                )
              ) {
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="isr-card isr-card-interactive group flex flex-col p-5 sm:p-6"
                  >
                    {content}
                  </Link>
                )
              }

              return (
                <a
                  key={item.title}
                  href={item.href}
                  className="isr-card isr-card-interactive group flex flex-col p-5 sm:p-6"
                >
                  {content}
                </a>
              )
            },
          )}
        </div>
      </section>

      <section className="mt-12 grid gap-5 lg:grid-cols-2">
        <article className="rounded-[1.75rem] bg-isr-dark-red p-6 text-white sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-yellow">
            Prefer brothers or sisters?
          </p>

          <h2 className="mt-3 text-2xl font-bold">
            Tell us in your message
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-white/75">
            If you would prefer your concern to be handled
            through brothers or sisters within ISR, mention
            that when you contact us and we can route the
            enquiry appropriately.
          </p>

          <a
            href={mailto(
              'Brothers or Sisters Student Support',
            )}
            className="mt-6 inline-flex font-bold text-isr-yellow"
          >
            Contact ISR →
          </a>
        </article>

        <article className="rounded-[1.75rem] border border-isr-yellow bg-isr-yellow/35 p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-turquoise">
            Protect your information
          </p>

          <h2 className="mt-3 text-2xl font-bold text-isr-dark-red">
            Start with the minimum needed
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-gray-700">
            Begin with a short explanation of the issue.
            Avoid sending passwords, payment-card details,
            identity documents or highly sensitive records
            through ordinary email unless an appropriate
            process has first been confirmed.
          </p>

          <p className="mt-4 text-sm leading-relaxed text-gray-700">
            ISR is a student society and is not an
            emergency, medical, legal or counselling service.
          </p>
        </article>
      </section>
    </>
  )
}
