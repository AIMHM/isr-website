import Link from 'next/link'
import SectionHeading from '@/components/SectionHeading'
import {
  mailto,
} from '@/lib/siteContent'

const supportItems = [
  {
    title:
      'Religious accommodation or university conflict',
    description:
      'Prayer, fasting, Jumu’ah, assessments, placements, compulsory activities, religious dress or another issue affecting your ability to practise Islam at university.',
    action:
      'Contact ISR',
    href: mailto(
      'Religious Accommodation Support',
    ),
  },
  {
    title:
      'Islamophobia or discrimination',
    description:
      'If you have experienced Islamophobia, harassment, discrimination or treatment you believe relates to your Muslim identity, you can raise it with ISR.',
    action:
      'Contact ISR',
    href: mailto(
      'Confidential Muslim Student Concern',
    ),
  },
  {
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
    title:
      'Prayer-space or Jumu’ah issue',
    description:
      'Report access problems, room issues, wudu concerns, incorrect prayer information or a Friday prayer concern.',
    action:
      'Raise a prayer-space issue',
    href: mailto(
      'Prayer Space or Jumuah Issue',
    ),
  },
  {
    title:
      'Event concern',
    description:
      'Raise an access, registration, conduct, safety or other concern relating to an ISR event or program.',
    action:
      'Raise an event concern',
    href: mailto(
      'ISR Event Concern',
    ),
  },
  {
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
      <section
        aria-labelledby="support-pathways"
      >
        <SectionHeading
          eyebrow="Speak to ISR"
          title="What do you need help with?"
          description="Choose the issue that best matches what you are dealing with. You do not need to know which ISR team handles it before contacting us."
          id="support-pathways"
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {supportItems.map(
            (item) => {
              const content = (
                <>
                  <h2 className="text-xl font-bold text-isr-dark-red">
                    {item.title}
                  </h2>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-700">
                    {
                      item.description
                    }
                  </p>

                  <span className="isr-text-link mt-6">
                    {
                      item.action
                    }
                    <span aria-hidden="true">
                      →
                    </span>
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
                    key={
                      item.title
                    }
                    href={
                      item.href
                    }
                    className="isr-card isr-card-interactive group flex flex-col p-6"
                  >
                    {
                      content
                    }
                  </Link>
                )
              }

              return (
                <a
                  key={
                    item.title
                  }
                  href={
                    item.href
                  }
                  className="isr-card isr-card-interactive group flex flex-col p-6"
                >
                  {
                    content
                  }
                </a>
              )
            },
          )}
        </div>
      </section>

      <section className="mt-14 grid gap-6 lg:grid-cols-2">
        <article className="isr-card bg-isr-cream/50 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-isr-dark-red">
            Brothers and sisters
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-gray-700">
            If you would prefer your concern to be handled
            through brothers or sisters within ISR, mention
            that in your message and we can route the
            enquiry appropriately.
          </p>

          <a
            href={mailto(
              'Brothers or Sisters Student Support',
            )}
            className="isr-text-link mt-6"
          >
            Contact ISR
            <span aria-hidden="true">
              →
            </span>
          </a>
        </article>

        <article className="isr-card border-isr-yellow bg-isr-yellow/35 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-isr-dark-red">
            Before sending sensitive information
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-gray-700">
            Start with a short explanation of the issue.
            Avoid sending passwords, payment-card details,
            identity documents, detailed medical records
            or other highly sensitive material through
            ordinary email unless ISR has confirmed an
            appropriate process.
          </p>

          <p className="mt-4 text-sm leading-relaxed text-gray-700">
            ISR is a student society and is not an
            emergency, medical, legal or counselling
            service.
          </p>
        </article>
      </section>
    </>
  )
}
