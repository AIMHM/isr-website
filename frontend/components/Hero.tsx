import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-isr-cream via-white to-isr-yellow/45 px-4 pb-16 pt-10 sm:pb-20 sm:pt-14 lg:pb-24 lg:pt-16">
      <div
        aria-hidden="true"
        className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-isr-turquoise/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-isr-bright-red/10 blur-3xl"
      />

      <div className="container-isr relative mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-isr-turquoise">
              Islamic Society of RMIT
            </p>

            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.08] text-isr-dark-red sm:text-5xl lg:text-6xl">
              The home of Muslim students at RMIT
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-700 sm:text-xl">
              Find somewhere to pray, discover what is happening, get support
              and become part of the Muslim community at RMIT.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/pray" className="isr-button-primary">
                Pray at RMIT
              </Link>

              <Link href="/events" className="isr-button-secondary">
                See upcoming events
              </Link>

              <Link
                href="/join"
                className="isr-text-link justify-center rounded-full px-5 py-3 sm:justify-start"
              >
                Join ISR
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div
              aria-hidden="true"
              className="absolute -inset-6 rounded-[2.5rem] bg-isr-turquoise/10 blur-2xl"
            />

            <div className="relative overflow-hidden rounded-[2.25rem] border border-isr-light-blue/35 bg-white/90 p-7 shadow-[0_24px_70px_rgba(91,11,5,0.12)] backdrop-blur sm:p-8">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-isr-turquoise">
                    New to RMIT?
                  </p>

                  <h2 className="mt-3 text-2xl font-bold text-isr-dark-red">
                    Start with the essentials
                  </h2>
                </div>

                <Image
                  src="/images/isr_logo_transparent.png"
                  alt=""
                  width={78}
                  height={78}
                  className="h-16 w-16 shrink-0 object-contain"
                  priority
                />
              </div>

              <ol className="mt-7 space-y-3">
                {[
                  'Find the prayer space',
                  "Check Jumu'ah information",
                  'Join the Muslim community',
                  'Come to your first ISR event',
                ].map((item, index) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 rounded-2xl bg-isr-cream/60 px-4 py-3"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-isr-turquoise text-xs font-bold text-white">
                      {index + 1}
                    </span>

                    <span className="text-sm font-semibold text-isr-dark-red">
                      {item}
                    </span>
                  </li>
                ))}
              </ol>

              <Link href="/student-guide" className="isr-button-primary mt-6 w-full">
                Open Student Guide
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
