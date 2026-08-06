import Link from 'next/link'
import SectionHeading from '@/components/SectionHeading'
import { LocationIcon } from '@/components/Icons'

const campuses = [
  {
    name: 'City Campus',
    description:
      'Prayer-space location, room access, wudu facilities and campus directions.',
  },
  {
    name: 'Bundoora Campus',
    description:
      'Prayer-space availability, access arrangements and facility guidance.',
  },
  {
    name: 'Brunswick Campus',
    description:
      'Campus prayer options, directions and access information.',
  },
]

export default function PrayerSpacesPreview() {
  return (
    <section
      id="prayer-spaces"
      aria-labelledby="prayer-spaces-heading"
      className="bg-isr-cream/60 px-4 py-16 sm:py-20"
    >
      <div className="container-isr mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Campus facilities"
            title="Prayer spaces at RMIT"
            description="Find campus-specific directions, access guidance and facility information."
            id="prayer-spaces-heading"
          />

          <Link href="/pray" className="isr-button-secondary shrink-0">
            View prayer guide
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {campuses.map((campus) => (
            <Link
              key={campus.name}
              href="/pray"
              className="isr-card isr-card-interactive group flex flex-col p-6"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-isr-turquoise/12 text-isr-turquoise">
                <LocationIcon className="h-5 w-5" />
              </span>

              <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-isr-bright-red">
                Details pending verification
              </p>

              <h3 className="mt-2 text-xl font-bold text-isr-dark-red">
                {campus.name}
              </h3>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-700">
                {campus.description}
              </p>

              <span className="isr-text-link mt-6">
                View campus information
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

        <p className="mt-6 text-sm leading-relaxed text-gray-600">
          Campus locations and access arrangements must be confirmed before
          publication.
        </p>
      </div>
    </section>
  )
}
