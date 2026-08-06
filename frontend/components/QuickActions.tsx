import Link from 'next/link'

const actions = [
  {
    title: 'Find a Prayer Room',
    description:
      'View campus prayer spaces, access guidance and Jumuah information.',
    href: '/pray',
  },
  {
    title: 'View Events',
    description:
      'See upcoming ISR programs, activities and registrations.',
    href: '/events',
  },
  {
    title: 'Join ISR',
    description:
      'Explore membership, volunteering and participation pathways.',
    href: '/join',
  },
  {
    title: 'Get Student Support',
    description:
      'Find wellbeing, accommodation and university support pathways.',
    href: '/support',
  },
]

export default function QuickActions() {
  return (
    <section className="bg-isr-dark-red px-4 py-14 text-white">
      <div className="container-isr mx-auto max-w-6xl">
        <h2 className="text-2xl font-bold sm:text-3xl">
          How can we help?
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map((action) => (
            <Link
              key={action.title}
              href={action.href}
              className="rounded-2xl border border-white/15 bg-white/10 p-5 transition hover:-translate-y-1 hover:bg-white/15"
            >
              <h3 className="font-bold">
                {action.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-white/75">
                {action.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
