import Link from 'next/link'
import SectionHeading from '@/components/SectionHeading'

const supportAreas = [
  {
    title: 'New to RMIT',
    description:
      'Orientation and community guidance for Muslim students beginning at RMIT.',
  },
  {
    title: 'Wellbeing and Chaplaincy',
    description:
      'Faith-sensitive wellbeing, pastoral and university support pathways.',
  },
  {
    title: 'Religious Accommodations',
    description:
      'Guidance for prayer, fasting, assessments, placements and university participation.',
  },
  {
    title: 'Report Discrimination',
    description:
      'Initial guidance for responding to Islamophobia, harassment or discrimination.',
  },
]

export default function StudentSupportPreview() {
  return (
    <section
      aria-labelledby="student-support-preview-heading"
      className="bg-white px-4 py-16 sm:py-20"
    >
      <div className="container-isr mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="Student support"
              title="Support beyond events"
              description="ISR helps Muslim students identify appropriate pathways for faith, wellbeing, university participation and belonging."
              id="student-support-preview-heading"
            />

            <div className="mt-6 rounded-2xl border border-isr-yellow bg-isr-yellow/40 p-4 text-sm leading-relaxed text-isr-dark-red">
              Contact routes and university processes remain subject to
              verification before publication.
            </div>

            <Link href="/support" className="isr-button-primary mt-7">
              View student support
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {supportAreas.map((area, index) => (
              <Link
                key={area.title}
                href="/support"
                className="isr-card isr-card-interactive group p-5 sm:p-6"
              >
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-isr-turquoise">
                  0{index + 1}
                </p>

                <h3 className="mt-4 text-lg font-bold text-isr-dark-red">
                  {area.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-gray-700">
                  {area.description}
                </p>

                <span className="isr-text-link mt-5">
                  Learn more
                  <span
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
