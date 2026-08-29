import Link from 'next/link'

const activeTools = [
  {
    title: 'Events',
    description:
      'Create and maintain one-off ISR events.',
    href: '/admin/events',
  },
  {
    title: 'Programs',
    description:
      'Maintain recurring ISR programs and schedules.',
    href: '/admin/programs',
  },
  {
    title: 'ISR Updates',
    description:
      'Manage operational notices and time-sensitive public information.',
    href: '/admin/announcements',
  },
  {
    title: 'Prayer & Jumu’ah',
    description:
      'Maintain managed prayer-space and Friday-prayer records.',
    href: '/admin/prayer',
  },
  {
    title: 'Content Health',
    description:
      'Surface missing ownership, review dates and information that may need verification.',
    href: '/admin/content-health',
  },
]

const nextSystems = [
  {
    title: 'Campuses',
    description:
      'Managed campus information for City, Bundoora and Brunswick.',
  },
  {
    title: 'Community & public links',
    description:
      'Editable membership, volunteer, community and public-link records.',
  },
  {
    title: 'Organisation & governance',
    description:
      'Managed leadership, public documents and governance-register information.',
  },
  {
    title: 'Users & permissions',
    description:
      'More granular administrative roles and editing permissions.',
  },
]

export default function AdminIndexPage() {
  return (
    <div>
      <div className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-turquoise">
          ISR Admin
        </p>

        <h1 className="mt-3 text-3xl font-bold text-isr-dark-red sm:text-4xl">
          Website operations
        </h1>

        <p className="mt-4 leading-relaxed text-gray-600">
          Manage ISR’s current public information and
          quickly identify content that requires review.
        </p>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-isr-dark-red">
          Available now
        </h2>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {activeTools.map(
            (tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="rounded-2xl border border-isr-light-blue/25 bg-white p-6 transition hover:border-isr-turquoise hover:shadow-sm"
              >
                <h3 className="text-lg font-bold text-isr-dark-red">
                  {tool.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {tool.description}
                </p>

                <span className="mt-5 inline-flex text-sm font-bold text-isr-turquoise">
                  Open →
                </span>
              </Link>
            ),
          )}
        </div>
      </section>

      <section className="mt-10">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-gray-500">
          Website 2.0
        </p>

        <h2 className="mt-2 text-xl font-bold text-isr-dark-red">
          Next management systems
        </h2>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {nextSystems.map(
            (tool) => (
              <article
                key={tool.title}
                className="rounded-2xl border border-dashed border-isr-light-blue/35 bg-isr-cream/35 p-6"
              >
                <h3 className="font-bold text-isr-dark-red">
                  {tool.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {tool.description}
                </p>
              </article>
            ),
          )}
        </div>
      </section>

      <section className="mt-10 rounded-2xl bg-isr-dark-red p-6 text-white">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-isr-yellow">
          Current principle
        </p>

        <h2 className="mt-3 text-xl font-bold">
          Accuracy before automation
        </h2>

        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/75">
          Publication status, verification, content
          ownership and review freshness are separate
          controls. Important public information should
          not rely on a single indicator of accuracy.
        </p>
      </section>
    </div>
  )
}