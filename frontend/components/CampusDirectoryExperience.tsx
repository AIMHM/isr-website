import Link from 'next/link'
import {
  PRAYER_SPACES,
} from '@/lib/siteContent'

export default function CampusDirectoryExperience() {
  return (
    <div className="space-y-6">
      {PRAYER_SPACES.map(
        (
          space,
        ) => (
          <article
            key={
              space.id
            }
            className="isr-campus-guide-card"
          >
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-isr-turquoise">
                  RMIT prayer space
                </p>

                <h2 className="mt-2 text-2xl font-bold text-isr-dark-red sm:text-3xl">
                  {space.name}
                </h2>

                <p className="mt-3 max-w-2xl leading-relaxed text-gray-700">
                  {space.summary}
                </p>
              </div>

              <Link
                href={
                  '/pray#' +
                  space.id
                }
                className="isr-button-primary"
              >
                Open prayer details
              </Link>
            </div>

            <dl className="mt-6 grid gap-4 border-t border-isr-light-blue/20 pt-5 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-gray-500">
                  Building
                </dt>

                <dd className="mt-1 font-semibold text-isr-dark-red">
                  {space.building}
                </dd>
              </div>

              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-gray-500">
                  Prayer rooms
                </dt>

                <dd className="mt-1 font-semibold text-isr-dark-red">
                  {space.room}
                </dd>
              </div>

              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-gray-500">
                  Published hours
                </dt>

                <dd className="mt-1 text-sm leading-relaxed text-gray-700">
                  {space.accessHours}
                </dd>
              </div>
            </dl>
          </article>
        ),
      )}

      <section className="rounded-3xl bg-isr-dark-red p-6 text-white sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-yellow">
          Friday prayer
        </p>

        <div className="mt-3 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="text-2xl font-bold">
              Looking for Jumu’ah?
            </h2>

            <p className="mt-3 max-w-2xl leading-relaxed text-white/70">
              Jumu’ah information is kept on the dedicated
              prayer page so current times and locations stay
              in one source of truth.
            </p>
          </div>

          <Link
            href="/pray#jumuah"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-5 py-3 font-bold text-isr-dark-red transition hover:bg-isr-yellow"
          >
            View Jumu’ah
          </Link>
        </div>
      </section>
    </div>
  )
}
