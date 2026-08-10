import Link from 'next/link'
import {
  ISR_PUBLIC,
  PRAYER_SPACES,
} from '@/lib/siteContent'

const TASKS = [
  {
    title:
      'Find something',
    description:
      'Search ISR pages, prayer spaces, events and updates.',
    href:
      '/find',
  },
  {
    title:
      'Campus guide',
    description:
      'Jump directly to RMIT prayer-space information.',
    href:
      '/campuses',
  },
  {
    title:
      'Friday prayer',
    description:
      'Check current Jumu’ah times and locations.',
    href:
      '/pray#jumuah',
  },
  {
    title:
      'Upcoming events',
    description:
      'See what ISR is running next.',
    href:
      '/events',
  },
  {
    title:
      'Current ISR updates',
    description:
      'Check prayer, event and campus notices.',
    href:
      '/updates',
  },
  {
    title:
      'Student support',
    description:
      'Contact ISR about a concern or support need.',
    href:
      '/support',
  },
  {
    title:
      'Become a member',
    description:
      'Join ISR membership for free.',
    href:
      '/join',
  },
]

export default function StartUtilityPanel() {
  return (
    <section
      aria-labelledby="student-task-heading"
      className="isr-student-task-panel"
    >
      <div className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-turquoise">
          Student shortcuts
        </p>

        <h2
          id="student-task-heading"
          className="mt-3 text-3xl font-bold text-isr-dark-red sm:text-4xl"
        >
          Need something quickly?
        </h2>

        <p className="mt-4 leading-relaxed text-gray-700">
          Go straight to the information Muslim students
          most often need at RMIT.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TASKS.map(
          (
            task,
          ) => (
            <Link
              key={
                task.title
              }
              href={
                task.href
              }
              className="isr-student-task-card"
            >
              <h3 className="font-bold text-isr-dark-red">
                {task.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {task.description}
              </p>

              <span className="mt-4 inline-flex text-sm font-bold text-isr-turquoise">
                Open →
              </span>
            </Link>
          ),
        )}

        <a
          href={
            ISR_PUBLIC.community.url
          }
          target="_blank"
          rel="noopener noreferrer"
          className="isr-student-task-card"
        >
          <h3 className="font-bold text-isr-dark-red">
            Join the ISR community
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-gray-600">
            Enter the main ISR WhatsApp community.
          </p>

          <span className="mt-4 inline-flex text-sm font-bold text-isr-turquoise">
            Open WhatsApp ↗
          </span>
        </a>
      </div>

      <div className="mt-8 border-t border-isr-light-blue/25 pt-6">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-gray-500">
          Prayer spaces by campus
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {PRAYER_SPACES.map(
            (
              space,
            ) => (
              <Link
                key={
                  space.id
                }
                href={
                  '/pray#' +
                  space.id
                }
                className="isr-student-campus-pill"
              >
                {space.name}
              </Link>
            ),
          )}
        </div>
      </div>
    </section>
  )
}
