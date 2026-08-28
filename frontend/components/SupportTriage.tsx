import Link from 'next/link'
import {
  mailto,
} from '@/lib/siteContent'

type SupportOption = {
  title: string
  description: string
  action: string
  href: string
  type: 'information' | 'contact'
}

const OPTIONS: SupportOption[] = [
  {
    title: 'Prayer or Jumu’ah information',
    description:
      'Check current prayer spaces, access information and Friday prayer arrangements before sending an enquiry.',
    action: 'Open Pray at RMIT',
    href: '/pray',
    type: 'information',
  },
  {
    title: 'Event or program information',
    description:
      'Find current ISR events, recurring programs, registration information and schedule changes.',
    action: 'Open What’s On',
    href: '/events',
    type: 'information',
  },
  {
    title: 'New to RMIT',
    description:
      'Use the Student Guide for campuses, prayer, community, membership, participation and support.',
    action: 'Open Student Guide',
    href: '/student-guide',
    type: 'information',
  },
  {
    title: 'Joining or volunteering',
    description:
      'Find membership, volunteering and involvement pathways without needing to email first.',
    action: 'Open Join ISR',
    href: '/join',
    type: 'information',
  },
  {
    title: 'Religious accommodation or campus issue',
    description:
      'Contact ISR about prayer, fasting, Jumu’ah, assessments, placements, religious dress or another university issue affecting your ability to practise Islam.',
    action: 'Contact ISR',
    href: mailto('Religious Accommodation Support'),
    type: 'contact',
  },
  {
    title: 'Islamophobia, discrimination or personal concern',
    description:
      'Raise a Muslim student concern directly with ISR when the issue needs a human response rather than general website information.',
    action: 'Raise a concern',
    href: mailto('Confidential Muslim Student Concern'),
    type: 'contact',
  },
]

export default function SupportTriage() {
  return (
    <section
      aria-labelledby="support-triage-heading"
      className="isr-support-triage"
    >
      <div className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-turquoise">
          Choose the fastest pathway
        </p>

        <h2
          id="support-triage-heading"
          className="mt-3 text-3xl font-bold text-isr-dark-red sm:text-4xl"
        >
          Information first, human support when you need it
        </h2>

        <p className="mt-4 leading-relaxed text-gray-700">
          Routine information should be available immediately on the website. Matters involving accommodation, discrimination or a personal student concern can go directly to ISR.
        </p>
      </div>

      <div className="mt-8 grid gap-3 md:grid-cols-2">
        {OPTIONS.map((option) => {
          const body = (
            <>
              <div>
                <div className="flex flex-wrap gap-2">
                  <span
                    className={
                      option.type === 'information'
                        ? 'rounded-full bg-isr-turquoise/10 px-2.5 py-1 text-xs font-bold text-isr-turquoise'
                        : 'rounded-full bg-isr-yellow/35 px-2.5 py-1 text-xs font-bold text-isr-dark-red'
                    }
                  >
                    {option.type === 'information'
                      ? 'Self-service'
                      : 'Contact ISR'}
                  </span>
                </div>

                <h3 className="mt-3 font-bold text-isr-dark-red">
                  {option.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {option.description}
                </p>

                <p className="mt-4 text-sm font-bold text-isr-turquoise">
                  {option.action} →
                </p>
              </div>
            </>
          )

          if (option.href.startsWith('/')) {
            return (
              <Link
                key={option.title}
                href={option.href}
                className="isr-support-option"
              >
                {body}
              </Link>
            )
          }

          return (
            <a
              key={option.title}
              href={option.href}
              className="isr-support-option"
            >
              {body}
            </a>
          )
        })}
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-4 border-t border-isr-light-blue/20 pt-6">
        <p className="text-sm text-gray-600">
          Something else?
        </p>

        <Link
          href="/contact"
          className="isr-text-link"
        >
          View all ISR contact options →
        </Link>
      </div>
    </section>
  )
}
