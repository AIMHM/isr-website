const services = [
  'Prayer and religious services',
  'Islamic learning and spiritual development',
  'Community and social connection',
  'Student representation and advocacy',
  'Welfare and student support',
  'Volunteering and leadership development',
]

export default function WhatISRDoes() {
  return (
    <section className="bg-isr-light-blue/10 px-4 py-16 sm:py-20">
      <div className="container-isr mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-isr-turquoise">
              Our role
            </p>
            <h2 className="mt-2 text-3xl font-bold text-isr-dark-red sm:text-4xl">
              What ISR Does
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-gray-700">
              ISR supports Muslim students through worship, education,
              community, representation and service across university life.
            </p>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {services.map((service) => (
              <li
                key={service}
                className="rounded-xl border border-isr-light-blue/30 bg-white px-4 py-4 text-sm font-semibold text-isr-dark-red"
              >
                {service}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
