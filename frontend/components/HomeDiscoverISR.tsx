import Link from 'next/link'

const destinations = [
  {
    eyebrow:
      'About',
    title:
      'What ISR does',
    description:
      'Understand ISR’s role across worship, community, learning, support and representation at RMIT.',
    href:
      '/about',
  },
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
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-isr-turquoise">
              Explore ISR
            </p>

            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-isr-dark-red sm:text-4xl">
              Go deeper when you need to.
            </h2>

            <p className="mt-4 max-w-xl leading-relaxed text-gray-700">
              The homepage keeps the essentials close. These pages
              explain the community, the people behind it and the
              quickest ways to find more.
            </p>
          </div>

          <div className="grid overflow-hidden rounded-[1.75rem] border border-isr-light-blue/25 bg-isr-light-blue/25 sm:grid-cols-2">
            {destinations.map(
              (item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group min-h-52 bg-white p-6 transition hover:bg-isr-yellow/25 sm:p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-isr-turquoise">
                      {item.eyebrow}
                    </p>

                    <span
                      aria-hidden="true"
                      className="font-bold text-isr-turquoise transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-isr-dark-red">
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
