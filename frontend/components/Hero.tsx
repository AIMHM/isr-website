import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section
      id="hero"
      className="overflow-hidden bg-gradient-to-br from-isr-cream via-white to-isr-yellow/40 px-4 pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-24"
    >
      <div className="container-isr mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-isr-turquoise">
              Islamic Society of RMIT
            </p>

            <h1 className="max-w-3xl text-4xl font-bold leading-tight text-isr-dark-red sm:text-5xl lg:text-6xl">
              The Home of Muslim Students at RMIT
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-700">
              Prayer, community, support and opportunities for Muslim students
              across RMIT University.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://campus.hellorubric.com/?s=10733"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-isr-turquoise px-6 py-3 font-semibold text-white transition-colors hover:bg-isr-dark-red"
              >
                Join ISR
              </a>

              <Link
                href="/events"
                className="rounded-full border-2 border-isr-dark-red px-6 py-3 font-semibold text-isr-dark-red transition-colors hover:bg-isr-dark-red hover:text-white"
              >
                View Events
              </Link>

              <a
                href="#prayer-spaces"
                className="rounded-full px-6 py-3 font-semibold text-isr-turquoise underline decoration-isr-turquoise/30 underline-offset-4 hover:text-isr-dark-red"
              >
                Find a Prayer Space
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-8 rounded-full bg-isr-turquoise/10 blur-3xl" />
            <div className="relative rounded-[2rem] border border-isr-light-blue/30 bg-white/85 p-8 text-center shadow-[0_20px_60px_rgba(91,11,5,0.1)] backdrop-blur">
              <Image
                src="/images/isr_logo_transparent.png"
                alt="Islamic Society of RMIT logo"
                width={220}
                height={220}
                className="mx-auto h-auto w-44 object-contain"
                priority
              />

              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-isr-turquoise">
                Representing Muslims on campus
              </p>

              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Worship, learning, friendship, advocacy and student support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
