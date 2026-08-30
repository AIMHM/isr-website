import Link from 'next/link'

const destinations = [
  {
    eyebrow:
      'Community',
    title:
      'Meet the teams',
    description:
      'See the student teams helping bring ISR events, media, prayer support and community work to life.',
    href:
      '/teams',
  },

  {
    eyebrow:
      'Quick access',
    title:
      'Everything ISR',
    description:
      'Official links for membership, community, volunteering, social channels and student essentials.',
    href:
      '/links',
  },
  {
    eyebrow:
      'Questions',
    title:
      'ISR FAQ',
    description:
      'Quick answers about prayer, Jumu’ah, events, joining, volunteering and support.',
    href:
      '/faq',
  },
]

export default function HomeDiscoverISR() {
  return (
    <section className="bg-isr-cream/45 px-4 py-14 sm:py-20">
      <div className="container-isr mx-auto max-w-7xl">
        <div className="grid gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div>
            <p className="isr-eyebrow text-isr-turquoise">
              Explore ISR
            </p>

            <h2 className="mt-3 text-3xl font-bold leading-tight text-isr-dark-red sm:text-4xl">
              There is more to discover
            </h2>

            <p className="mt-4 max-w-xl leading-relaxed text-gray-700">
              Learn about the community, the students
              behind the work, ISR&apos;s history and the
              quickest ways to find what you need.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {destinations.map(
              (item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="isr-card isr-card-interactive group p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="isr-eyebrow text-isr-turquoise">
                      {item.eyebrow}
                    </p>

                    <span
                      aria-hidden="true"
                      className="font-bold text-isr-turquoise transition group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-isr-dark-red">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-gray-700">
                    {item.description}
                  </p>
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  )
}