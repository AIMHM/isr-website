import Link from 'next/link'

const actions = [
  {
    title: 'Find a Prayer Room',
    description: 'View campus prayer-space information and access guidance.',
    href: '#prayer-spaces',
  },
  {
    title: 'View Events',
    description: 'See upcoming ISR programs, activities and registrations.',
    href: '/events',
  },
  {
    title: 'Join ISR',
    description: 'Become a formal member of the Islamic Society of RMIT.',
    href: 'https://campus.hellorubric.com/?s=10733',
    external: true,
  },
  {
    title: 'Contact ISR',
    description: 'Send an enquiry or reach the appropriate ISR contact.',
    href: '/contact',
  },
]

export default function QuickActions() {
  return (
    <section className="bg-isr-dark-red px-4 py-14 text-white">
      <div className="container-isr mx-auto max-w-6xl">
        <h2 className="text-2xl font-bold sm:text-3xl">How can we help?</h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map((action) =>
            action.external ? (
              <a
                key={action.title}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/15 bg-white/10 p-5 transition hover:bg-white/15"
              >
                <h3 className="font-bold">{action.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  {action.description}
                </p>
              </a>
            ) : (
              <Link
                key={action.title}
                href={action.href}
                className="rounded-2xl border border-white/15 bg-white/10 p-5 transition hover:bg-white/15"
              >
                <h3 className="font-bold">{action.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  {action.description}
                </p>
              </Link>
            ),
          )}
        </div>
      </div>
    </section>
  )
}
