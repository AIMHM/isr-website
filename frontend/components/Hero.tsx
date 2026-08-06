import Image from 'next/image'
import Link from 'next/link'

const focusAreas = [
  'Prayer',
  'Community',
  'Student support',
  'Leadership',
]

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-br from-isr-cream via-white to-isr-yellow/45 px-4 pb-16 pt-10 sm:pb-20 sm:pt-14 lg:pb-24 lg:pt-16"
    >
      <div
        aria-hidden="true"
        className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-isr-turquoise/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-isr-bright-red/10 blur-3xl"
      />

      <div className="container-isr relative mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-isr-turquoise">
              Islamic Society of RMIT
            </p>

            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.08] text-isr-dark-red sm:text-5xl lg:text-6xl">
              The home of Muslim students at RMIT
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-700 sm:text-xl">
              Worship, learning, friendship, representation and practical
              support throughout university life.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/join" className="isr-button-primary">
                Join ISR
              </Link>

              <Link href="/events" className="isr-button-secondary">
                Explore events
              </Link>

              <Link
                href="/pray"
                className="isr-text-link justify-center rounded-full px-5 py-3 sm:justify-start"
              >
                Pray at RMIT
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <ul className="mt-8 flex flex-wrap gap-2" aria-label="ISR focus areas">
              {focusAreas.map((area) => (
                <li
                  key={area}
                  className="rounded-full border border-isr-light-blue/35 bg-white/75 px-3 py-1.5 text-xs font-semibold text-isr-dark-red shadow-sm"
                >
                  {area}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div
              aria-hidden="true"
              className="absolute -inset-6 rounded-[2.5rem] bg-isr-turquoise/10 blur-2xl"
            />

            <div className="relative overflow-hidden rounded-[2.25rem] border border-isr-light-blue/35 bg-white/90 p-7 shadow-[0_24px_70px_rgba(91,11,5,0.12)] backdrop-blur sm:p-9">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-isr-turquoise">
                    Muslim student life
                  </p>

                  <h2 className="mt-3 text-2xl font-bold text-isr-dark-red">
                    Faith. Knowledge. Service.
                  </h2>
                </div>

                <Image
                  src="/images/isr_logo_transparent.png"
                  alt=""
                  width={88}
                  height={88}
                  className="h-20 w-20 shrink-0 object-contain"
                  priority
                />
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  ['Pray', 'Campus prayer information'],
                  ['Connect', 'Community and belonging'],
                  ['Learn', 'Islamic education'],
                  ['Contribute', 'Volunteer and lead'],
                ].map(([title, description]) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-isr-light-blue/25 bg-isr-cream/45 p-4"
                  >
                    <p className="font-bold text-isr-dark-red">{title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-gray-600">
                      {description}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-7 border-t border-isr-light-blue/25 pt-5 text-sm leading-relaxed text-gray-600">
                Representing Muslims on campus and helping students participate
                confidently in RMIT life.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
