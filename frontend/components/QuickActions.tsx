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
      "Find prayer spaces, Jumu'ah information and daily prayer times.",
    href: '/pray',
    icon: FaithIcon,
  },
  {
    title: "What's happening?",
    description:
      'See upcoming events, programs and opportunities to connect.',
    href: '/events',
    icon: BookIcon,
  },
  {
    title: 'Get involved',
    description:
      'Join the community, become a member, volunteer or contribute.',
    href: '/join',
    icon: CommunityIcon,
  },
  {
    title: 'Need support?',
    description:
      'Find the right pathway for faith, wellbeing or university concerns.',
    href: '/support',
    icon: MailIcon,
  },
]

export default function QuickActions() {
  return (
    <section
      aria-labelledby="quick-actions-heading"
      className="bg-white px-4 py-16 sm:py-20"
    >
      <div className="container-isr mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-isr-turquoise">
            Student essentials
          </p>

          <h2
            id="quick-actions-heading"
            className="mt-3 text-3xl font-bold text-isr-dark-red sm:text-4xl"
          >
            What do you need?
          </h2>

          <p className="mt-4 leading-relaxed text-gray-700">
            Go straight to the information Muslim students use most.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map((action) => {
            const Icon = action.icon

            return (
              <Link
                key={action.title}
                href={action.href}
                className="isr-card isr-card-interactive group flex flex-col p-6"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-isr-turquoise/12 text-isr-turquoise">
                  <Icon className="h-6 w-6" />
                </span>

                <h3 className="mt-5 text-xl font-bold text-isr-dark-red">
                  {action.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-700">
                  {action.description}
                </p>

                <span className="isr-text-link mt-6">
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
