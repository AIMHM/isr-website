import Link from 'next/link'
import SectionHeading from '@/components/SectionHeading'

const steps = [
  {
    title: 'Attend',
    description: 'Come to an event, halaqa, workshop or community activity.',
  },
  {
    title: 'Join',
    description: 'Become part of the ISR community and formal membership.',
  },
  {
    title: 'Volunteer',
    description: 'Contribute your time and skills to something that matters.',
  },
  {
    title: 'Lead',
    description: 'Take responsibility, build experience and help serve others.',
  },
]

export default function ParticipationJourney() {
  return (
    <section className="bg-isr-dark-red px-4 py-16 text-white sm:py-20">
      <div className="container-isr mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Become part of ISR"
          title="There is more than one way to get involved"
          description="Start where you are comfortable and take the next step when you are ready."
          inverse
          align="center"
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-3xl border border-white/15 bg-white/[0.07] p-6"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-isr-yellow text-sm font-bold text-isr-dark-red">
                {index + 1}
              </span>

              <h3 className="mt-5 text-xl font-bold">
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-white/75">
                {step.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/join"
            className="inline-flex rounded-full bg-white px-7 py-3 font-bold text-isr-dark-red transition hover:bg-isr-yellow"
          >
            Explore ways to join
          </Link>
        </div>
      </div>
    </section>
  )
}
