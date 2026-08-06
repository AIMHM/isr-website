import Link from 'next/link'
import {
  FaithIcon,
  BookIcon,
  CommunityIcon,
  MailIcon,
} from '@/components/Icons'

const actions = [
  {
    title: 'Pray at RMIT',
    description:
      'View prayer times, Jumu’ah guidance and campus prayer spaces.',
    href: '/pray',
    icon: FaithIcon,
  },
  {
    title: 'Explore Events',
    description:
      'Discover upcoming ISR programs, activities and registrations.',
    href: '/events',
    icon: BookIcon,
  },
  {
    title: 'Join ISR',
    description:
      'Explore membership, volunteering and participation pathways.',
    href: '/join',
    icon: CommunityIcon,
  },
  {
    title: 'Get Support',
    description:
      'Find welfare, accommodation and university support pathways.',
    href: '/support',
    icon: MailIcon,
  },
]

export default function QuickActions() {
  return (
    <section
      aria-labelledby="quick-actions-heading"
      className="bg-isr-dark-red px-4 py-14 text-white sm:py-16"
    >
      <div className="container-isr mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-isr-yellow">
              Quick access
            </p>

            <h2
              id="quick-actions-heading"
              className="mt-2 text-2xl font-bold sm:text-3xl"
            >
              How can we help?
            </h2>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-white/70">
            Go directly to the information and services students use most.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map((action) => {
            const Icon = action.icon

            return (
              <Link
                key={action.title}
                href={action.href}
                className="group rounded-2xl border border-white/15 bg-white/[0.07] p-5 transition hover:-translate-y-1 hover:border-white/30 hover:bg-white/[0.12]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-isr-yellow">
                  <Icon className="h-6 w-6" />
                </span>

                <h3 className="mt-5 font-bold">{action.title}</h3>

                <p className="mt-2 text-sm leading-relaxed text-white/72">
                  {action.description}
                </p>

                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-isr-yellow">
                  Open
                  <span
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
