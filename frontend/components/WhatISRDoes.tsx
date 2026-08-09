import Link from 'next/link'
import SectionHeading from '@/components/SectionHeading'

const services = [
  {
    title: 'Worship',
    description:
      "Prayer spaces, Jumu'ah information and support for practising Islam on campus.",
  },
  {
    title: 'Community',
    description:
      'Events, gatherings and opportunities for Muslim students to connect.',
  },
  {
    title: 'Support',
    description:
      'Helping students find appropriate university and community pathways.',
  },
  {
    title: 'Representation',
    description:
      'Representing Muslim student needs through appropriate RMIT channels.',
  },
]

export default function WhatISRDoes() {
  return (
    <section
      aria-labelledby="what-isr-does-heading"
      className="bg-isr-light-blue/10 px-4 py-16 sm:py-20"
    >
      <div className="container-isr mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="What ISR does"
          title="Supporting Muslim student life"
          description="Our work centres on worship, community, support and representation."
          align="center"
          id="what-isr-does-heading"
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article key={service.title} className="isr-card p-6">
              <h3 className="text-xl font-bold text-isr-dark-red">
                {service.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-gray-700">
                {service.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-14 rounded-[2rem] bg-isr-turquoise px-6 py-9 text-center text-white sm:px-10">
          <h2 className="text-3xl font-bold">
            Your Muslim community at RMIT starts here
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-white/85">
            Come to an event, join the community, become a member or volunteer
            with ISR.
          </p>

          <Link
            href="/join"
            className="mt-7 inline-flex rounded-full bg-white px-7 py-3 font-bold text-isr-dark-red transition hover:bg-isr-yellow"
          >
            Join ISR
          </Link>
        </div>
      </div>
    </section>
  )
}
