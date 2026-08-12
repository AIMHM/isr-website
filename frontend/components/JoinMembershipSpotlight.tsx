import Link from 'next/link'
import {
  ISR_PUBLIC,
} from '@/lib/siteContent'

const JOURNEY = [
  {
    number:
      '01',

    title:
      'Join',

    description:
      'Become an ISR member through the official membership pathway.',
  },
  {
    number:
      '02',

    title:
      'Attend',

    description:
      'Meet people through ISR events, programs and community activities.',
  },
  {
    number:
      '03',

    title:
      'Volunteer',

    description:
      'Contribute time or skills when opportunities are available.',
  },
  {
    number:
      '04',

    title:
      'Lead',

    description:
      'Take greater responsibility through future team and leadership pathways.',
  },
]

export default function JoinMembershipSpotlight() {
  return (
    <section
      aria-labelledby="membership-spotlight-heading"
      className="isr-membership-spotlight"
    >
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <div className="inline-flex rounded-full bg-isr-turquoise/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-isr-turquoise">
            Membership is free
          </div>

          <h2
            id="membership-spotlight-heading"
            className="mt-5 text-3xl font-bold tracking-tight text-isr-dark-red sm:text-4xl"
          >
            Become part of ISR
          </h2>

          <p className="mt-4 max-w-xl leading-relaxed text-gray-700">
            Formal ISR membership does not cost
            anything. Use the official membership
            page to join, then participate at the
            level that suits you.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={
                ISR_PUBLIC.membership.url
              }
              target="_blank"
              rel="noopener noreferrer"
              className="isr-button-primary text-center"
            >
              Become a member
            </a>

            <Link
              href="/events"
              className="isr-button-secondary text-center"
            >
              Attend an event first
            </Link>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-gray-500">
            Membership opens on the external
            Rubric membership system.
          </p>
        </div>

        <ol className="grid gap-3 sm:grid-cols-2">
          {JOURNEY.map(
            (
              item,
            ) => (
              <li
                key={
                  item.number
                }
                className="isr-membership-step"
              >
                <span className="text-xs font-bold text-isr-turquoise">
                  {
                    item.number
                  }
                </span>

                <h3 className="mt-3 text-lg font-bold text-isr-dark-red">
                  {
                    item.title
                  }
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {
                    item.description
                  }
                </p>
              </li>
            ),
          )}
        </ol>
      </div>
    </section>
  )
}
