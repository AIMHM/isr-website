import Link from 'next/link'

const boundaries = [
  {
    eyebrow: 'ISR can help',
    title: 'Start with the student society',
    description:
      'ISR can listen, help you identify the right pathway, explain society information, raise Muslim student concerns and help you communicate a campus issue clearly.',
  },
  {
    eyebrow: 'Formal decisions',
    title: 'RMIT remains the decision-maker',
    description:
      'ISR can support and advocate, but formal academic, administrative, conduct, accessibility and university service decisions remain with the relevant RMIT process or staff.',
  },
  {
    eyebrow: 'Professional support',
    title: 'Use the appropriate professional service',
    description:
      'ISR is not an emergency, medical, legal or counselling service. Where a matter needs professional or urgent support, use the appropriate qualified or emergency service.',
  },
]

export default function SupportBoundary() {
  return (
    <section
      aria-labelledby="support-boundary-heading"
      className="rounded-[2rem] border border-isr-light-blue/20 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="max-w-3xl">
        <p className="isr-eyebrow text-isr-turquoise">
          How support works
        </p>

        <h2
          id="support-boundary-heading"
          className="mt-4 text-3xl font-bold leading-tight text-isr-dark-red sm:text-4xl"
        >
          Start with ISR, then use the right pathway
        </h2>

        <p className="mt-4 leading-relaxed text-gray-700">
          You do not need to know which person or team should handle your concern before reaching out. ISR can help you work out the next step without pretending to replace formal university or professional services.
        </p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {boundaries.map((item) => (
          <article
            key={item.title}
            className="rounded-[1.5rem] bg-isr-cream/55 p-5"
          >
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-isr-turquoise">
              {item.eyebrow}
            </p>

            <h3 className="mt-3 text-xl font-bold text-isr-dark-red">
              {item.title}
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-gray-700">
              {item.description}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-[1.5rem] border border-isr-yellow bg-isr-yellow/25 p-5">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-isr-turquoise">
            Privacy first
          </p>

          <h3 className="mt-3 text-xl font-bold text-isr-dark-red">
            Begin with the minimum information needed
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-gray-700">
            Your first message can simply explain what happened, what outcome you are seeking and how ISR can contact you. The website does not ask you to upload detailed sensitive case files.
          </p>

          <p className="mt-3 text-sm leading-relaxed text-gray-700">
            Do not send passwords, payment-card details, identity documents or highly sensitive records through ordinary email unless an appropriate process has first been confirmed.
          </p>

          <Link
            href="/privacy"
            className="isr-text-link mt-5"
          >
            Read privacy information →
          </Link>
        </article>

        <article className="rounded-[1.5rem] bg-isr-dark-red p-5 text-white">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-isr-yellow">
            Not sure?
          </p>

          <h3 className="mt-3 text-xl font-bold">
            Contact ISR anyway
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-white/70">
            If none of the pathways below fit, use the general contact page. You do not need to work out the internal owner yourself.
          </p>

          <Link
            href="/contact"
            className="mt-5 inline-flex font-bold text-isr-yellow"
          >
            Contact ISR →
          </Link>
        </article>
      </div>
    </section>
  )
}
