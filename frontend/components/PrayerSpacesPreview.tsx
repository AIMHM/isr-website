import Link from 'next/link'
import SectionHeading from '@/components/SectionHeading'
import { LocationIcon } from '@/components/Icons'

const links = [
  {
    title: 'City Campus',
    description: 'Prayer-space directions, access and facility information.',
    href: '/pray#city',
  },
  {
    title: 'Bundoora Campus',
    description: 'Prayer-space availability and campus guidance.',
    href: '/pray#bundoora',
  },
  {
    title: 'Brunswick Campus',
    description: 'Campus prayer options and access information.',
    href: '/pray#brunswick',
  },
  {
    title: "Jumu'ah",
    description: 'Friday prayer time, venue and access arrangements.',
    href: '/pray#jumuah',
  },
]

export default function PrayerSpacesPreview() {
  return (
    <section
      aria-labelledby="prayer-spaces-heading"
      className="bg-isr-cream/60 px-4 py-16 sm:py-20"
    >
      <div className="container-isr mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Worship on campus"
            title="Pray at RMIT"
            description="Find somewhere to pray and check the latest Friday prayer information."
            id="prayer-spaces-heading"
          />

          <Link href="/pray" className="isr-button-secondary shrink-0">
            Full prayer guide
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="isr-card isr-card-interactive group flex flex-col p-6"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-isr-turquoise/12 text-isr-turquoise">
                <LocationIcon className="h-5 w-5" />
              </span>

              <h3 className="mt-5 text-xl font-bold text-isr-dark-red">
                {item.title}
              </h3>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-700">
                {item.description}
              </p>

              <span className="isr-text-link mt-6">
                View information
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
    </section>
  )
}
