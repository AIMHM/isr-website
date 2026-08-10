import Link from 'next/link'

const RECOVERY_LINKS = [
  {
    href: '/find',
    title: 'Search ISR',
    description:
      'Find prayer information, events, updates and student services.',
  },
  {
    href: '/pray',
    title: 'Pray at RMIT',
    description:
      'Prayer spaces, Jumu’ah and daily prayer times.',
  },
  {
    href: '/events',
    title: 'Events',
    description:
      'See upcoming Islamic Society of RMIT events.',
  },
  {
    href: '/start',
    title: 'Start Here',
    description:
      'Find the most useful ISR pathways in one place.',
  },
]

export default function NotFound() {
  return (
    <main className="bg-isr-cream px-4 py-16 sm:py-24">
      <div className="container-isr mx-auto max-w-4xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-turquoise">
          404
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-isr-dark-red sm:text-5xl">
          We could not find that page
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-700">
          The page may have moved, or the link may no longer
          be current. Use one of these ISR pathways to continue.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {RECOVERY_LINKS.map(
            (
              link,
            ) => (
              <Link
                key={
                  link.href
                }
                href={
                  link.href
                }
                className="isr-find-result"
              >
                <div>
                  <h2 className="font-bold text-isr-dark-red">
                    {link.title}
                  </h2>

                  <p className="mt-1 text-sm leading-relaxed text-gray-600">
                    {link.description}
                  </p>
                </div>

                <span
                  aria-hidden="true"
                  className="font-bold text-isr-turquoise"
                >
                  →
                </span>
              </Link>
            ),
          )}
        </div>

        <div className="mt-8">
          <Link
            href="/"
            className="isr-button-primary"
          >
            Return home
          </Link>
        </div>
      </div>
    </main>
  )
}
