'use client'

import {
  LocationIcon,
} from '@/components/Icons'
import {
  PRAYER_SPACES,
} from '@/lib/siteContent'
import {
  getPrayerGovernance,
  getPrayerVerificationLabel,
} from '@/lib/prayerGovernance'

export default function PrayerSpaceDirectory() {
  return (
    <section
      aria-label="RMIT prayer-space directory"
    >
      <div className="grid gap-5 md:grid-cols-2">
        {PRAYER_SPACES.map(
          (
            space,
            index,
          ) => {
            const governance =
              getPrayerGovernance(
                space.id,
              )

            const isFirstBundoora =
              space.id
                .toLowerCase()
                .startsWith(
                  'bundoora',
                ) &&
              !PRAYER_SPACES
                .slice(
                  0,
                  index,
                )
                .some(
                  (
                    previous,
                  ) =>
                    previous.id
                      .toLowerCase()
                      .startsWith(
                        'bundoora',
                      ),
                )

            return (
              <div
                key={space.id}
                className="relative"
              >
                {isFirstBundoora && (
                  <span
                    id="bundoora"
                    className="absolute -top-28"
                    aria-hidden="true"
                  />
                )}

                <article
                  id={space.id}
                  className="isr-card h-full scroll-mt-32 p-6 sm:p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-isr-turquoise/12 text-isr-turquoise">
                      <LocationIcon className="h-5 w-5" />
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        governance.verification ===
                        'verified'
                          ? 'bg-emerald-50 text-emerald-800'
                          : 'bg-amber-50 text-amber-800'
                      }`}
                    >
                      {getPrayerVerificationLabel(
                        space.id,
                      )}
                    </span>
                  </div>

                  <h3 className="mt-5 text-2xl font-bold text-isr-dark-red">
                    {space.name}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-gray-700">
                    {space.summary}
                  </p>

                  <p className="mt-3 text-xs leading-relaxed text-gray-500">
                    Operational information managed by {governance.contentOwner}.
                    Temporary access changes should be checked in ISR Updates.
                  </p>

                  <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="border-t border-isr-light-blue/20 pt-4 sm:col-span-2">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Building
                      </dt>

                      <dd className="mt-1 text-sm font-semibold text-isr-dark-red">
                        {space.building}
                      </dd>
                    </div>

                    <div className="border-t border-isr-light-blue/20 pt-4 sm:col-span-2">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Prayer rooms
                      </dt>

                      <dd className="mt-1 text-sm font-semibold text-isr-dark-red">
                        {space.room}
                      </dd>
                    </div>

                    <div className="border-t border-isr-light-blue/20 pt-4 sm:col-span-2">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Published hours
                      </dt>

                      <dd className="mt-1 text-sm leading-relaxed text-gray-700">
                        {space.accessHours}
                      </dd>
                    </div>

                    <div className="border-t border-isr-light-blue/20 pt-4">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Brothers
                      </dt>

                      <dd className="mt-1 text-sm leading-relaxed text-gray-700">
                        {space.brothers}
                      </dd>
                    </div>

                    <div className="border-t border-isr-light-blue/20 pt-4">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Sisters
                      </dt>

                      <dd className="mt-1 text-sm leading-relaxed text-gray-700">
                        {space.sisters}
                      </dd>
                    </div>

                    <div className="border-t border-isr-light-blue/20 pt-4 sm:col-span-2">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Wudu
                      </dt>

                      <dd className="mt-1 text-sm leading-relaxed text-gray-700">
                        {space.wudu}
                      </dd>
                    </div>

                    <div className="border-t border-isr-light-blue/20 pt-4 sm:col-span-2">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Accessibility
                      </dt>

                      <dd className="mt-1 text-sm leading-relaxed text-gray-700">
                        {space.accessibility}
                      </dd>
                    </div>
                  </dl>
                </article>
              </div>
            )
          },
        )}
      </div>
    </section>
  )
}
