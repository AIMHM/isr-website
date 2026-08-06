const supportAreas = [
  {
    title: 'New to RMIT',
    description:
      'Orientation information for Muslim students beginning at RMIT.',
  },
  {
    title: 'Wellbeing and Chaplaincy',
    description:
      'Verified university and community support pathways.',
  },
  {
    title: 'Religious Accommodations',
    description:
      'Guidance for prayer, fasting, assessments and university participation.',
  },
  {
    title: 'Report Discrimination',
    description:
      'Clear pathways for reporting Islamophobia, harassment or discrimination.',
  },
]

export default function StudentSupportPreview() {
  return (
    <section className="bg-white px-4 py-16 sm:py-20">
      <div className="container-isr mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-isr-turquoise">
              Student support
            </p>
            <h2 className="mt-2 text-3xl font-bold text-isr-dark-red sm:text-4xl">
              Support beyond events
            </h2>
            <p className="mt-4 leading-relaxed text-gray-700">
              ISR aims to help Muslim students navigate university life,
              wellbeing, faith and belonging.
            </p>
            <p className="mt-5 rounded-xl bg-isr-yellow/50 p-4 text-sm text-isr-dark-red">
              These pathways are placeholders until the relevant ISR and RMIT
              contacts are verified.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {supportAreas.map((area) => (
              <article
                key={area.title}
                className="rounded-2xl border border-isr-light-blue/30 bg-isr-cream/40 p-5"
              >
                <h3 className="font-bold text-isr-dark-red">{area.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">
                  {area.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
