import Link from 'next/link'

const activeTools = [
  {
    title: 'Events',
    description:
      'Create and maintain one-off ISR events.',
    href: '/admin/events',
  },
  {
    title: 'ISR Updates',
    description:
      'Publish operational notices and time-sensitive information.',
    href: '/admin/announcements',
  },
]

const nextSystems = [
  {
    title: 'Programs',
    description:
      'Weekly halaqas, workshops and recurring campus programs.',
  },
  {
    title: 'Prayer & Jumu’ah',
    description:
      'Verified prayer spaces, Friday prayer and operational changes.',
  },
  {
    title: 'Campuses',
    description:
      'City, Bundoora and Brunswick Muslim student information.',
  },
  {
    title: 'Content Health',
    description:
      'Review dates, source verification and stale-content warnings.',
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
          Manage current ISR website content and monitor the
          systems being expanded for Website 2.0.
        </p>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-isr-dark-red">
          Available now
        </h2>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {activeTools.map((tool) => (
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
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-gray-500">
              Website 2.0
            </p>

            <h2 className="mt-2 text-xl font-bold text-isr-dark-red">
              Systems being prepared
            </h2>
          </div>

          <span className="rounded-full bg-isr-yellow/40 px-3 py-1.5 text-xs font-bold text-isr-dark-red">
            Foundation phase
          </span>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {nextSystems.map((tool) => (
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
          ))}
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
          Prayer, Jumu’ah, campus access, public links and
          governance information will gain source verification
          and review controls before they become fully editable
          through admin.
        </p>
      </section>
    </div>
  )
}
