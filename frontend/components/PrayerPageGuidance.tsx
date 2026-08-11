import Link from 'next/link'

export default function PrayerPageGuidance() {
  return (
    <section
      aria-labelledby="prayer-guidance-heading"
      className="isr-prayer-guidance"
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-turquoise">
            Before you travel
          </p>

          <h2
            id="prayer-guidance-heading"
            className="mt-3 text-2xl font-bold text-isr-dark-red sm:text-3xl"
          >
            Check the current campus information
          </h2>

          <p className="mt-3 max-w-2xl leading-relaxed text-gray-700">
            Prayer spaces and Friday arrangements can
            differ by campus. Use the campus guide and
            the Jumu’ah section as the website source of
            truth.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <Link
            href="/campuses"
            className="isr-button-secondary text-center"
          >
            Campus guide
          </Link>

          <Link
            href="/pray#jumuah"
            className="isr-button-primary text-center"
          >
            Jumu’ah information
          </Link>
        </div>
      </div>
    </section>
  )
}
