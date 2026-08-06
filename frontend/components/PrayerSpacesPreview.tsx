const campuses = [
  {
    name: 'City Campus',
    description:
      'Building, level, room, access hours and wudu information require verification.',
  },
  {
    name: 'Bundoora Campus',
    description:
      'Prayer-space location and access arrangements require verification.',
  },
  {
    name: 'Brunswick Campus',
    description:
      'Prayer-space availability and campus directions require verification.',
  },
]

export default function PrayerSpacesPreview() {
  return (
    <section id="prayer-spaces" className="bg-isr-cream/60 px-4 py-16 sm:py-20">
      <div className="container-isr mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-isr-turquoise">
            Campus facilities
          </p>
          <h2 className="mt-2 text-3xl font-bold text-isr-dark-red sm:text-4xl">
            Prayer Spaces at RMIT
          </h2>
          <p className="mt-4 leading-relaxed text-gray-700">
            Verified directions, access arrangements and facility information
            will be added before this section is published.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {campuses.map((campus) => (
            <article
              key={campus.name}
              className="rounded-2xl border border-isr-light-blue/30 bg-white p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-isr-bright-red">
                Verification required
              </p>
              <h3 className="mt-3 text-xl font-bold text-isr-dark-red">
                {campus.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-700">
                {campus.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
