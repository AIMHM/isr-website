import Link from 'next/link'
import SectionHeading from '@/components/SectionHeading'

const services = [
  {
    title: 'Prayer and Worship',
    description:
      'Supporting prayer access, Jumu’ah information and appropriate campus facilities.',
  },
  {
    title: 'Islamic Learning',
    description:
      'Talks, workshops, reminders and educational opportunities for students.',
  },
  {
    title: 'Community',
    description:
      'Welcoming spaces for connection, friendship and shared student experiences.',
  },
  {
    title: 'Representation',
    description:
      'Raising Muslim student needs through appropriate university channels.',
  },
  {
    title: 'Student Support',
    description:
      'Helping students identify suitable welfare and accommodation pathways.',
  },
  {
    title: 'Leadership',
    description:
      'Developing students through volunteering, teamwork and committee service.',
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
          eyebrow="Our role"
          title="What ISR does"
          description="ISR supports Muslim students through worship, education, community, representation and service across university life."
          align="center"
          id="what-isr-does-heading"
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="isr-card p-5 sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-bold text-isr-dark-red">
                  {service.title}
                </h3>

                <span className="text-sm font-bold text-isr-turquoise/65">
                  0{index + 1}
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-gray-700">
                {service.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-14 overflow-hidden rounded-[2rem] bg-isr-dark-red px-6 py-9 text-white shadow-[0_20px_55px_rgba(91,11,5,0.16)] sm:px-9 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <SectionHeading
            eyebrow="Take part"
            title="Find your place in the ISR community"
            description="Become a member, attend an event, volunteer your skills or learn more about how ISR serves Muslim students."
            inverse
          />

          <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:shrink-0">
            <Link
              href="/join"
              className="inline-flex justify-center rounded-full bg-white px-6 py-3 font-bold text-isr-dark-red transition hover:bg-isr-yellow"
            >
              Join ISR
            </Link>

            <Link
              href="/about"
              className="inline-flex justify-center rounded-full border border-white/30 px-6 py-3 font-bold text-white transition hover:bg-white/10"
            >
              About ISR
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
