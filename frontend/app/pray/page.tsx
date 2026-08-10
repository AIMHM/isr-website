import type {
  Metadata,
} from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PrayerSpaceDirectory from '@/components/PrayerSpaceDirectory'
import PrayerTimesTable from '@/components/PrayerTimesTable'
import {
  JUMUAH_SERVICES,
} from '@/lib/siteContent'

export const metadata: Metadata = {
  title: 'Pray at RMIT',
  description:
    'Prayer rooms, Jumu’ah arrangements and daily prayer times across RMIT campuses.',
}

const prayerEssentials = [
  {
    number: '01',
    title: 'Find your prayer room',
    text:
      'City, Bundoora East, Bundoora West and Brunswick prayer spaces are listed below.',
    href: '#campus-prayer-spaces',
  },
  {
    number: '02',
    title: 'Check Jumu’ah',
    text:
      'Friday prayer arrangements differ by campus and season.',
    href: '#jumuah',
  },
  {
    number: '03',
    title: 'Check prayer times',
    text:
      'Use the Melbourne daily timetable when planning your prayers.',
    href: '#daily-prayer-times',
  },
]

export default function PrayPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/15">
      <Navbar />

      <main id="main-content">
        <section className="isr-hero-grid relative overflow-hidden bg-isr-dark-red px-4 py-14 text-white sm:py-20">
          <div
            aria-hidden="true"
            className="isr-hero-glow -right-20 -top-24 h-80 w-80 bg-isr-turquoise"
          />

          <div className="container-isr relative mx-auto max-w-7xl">
            <div className="grid gap-9 lg:grid-cols-[1fr_0.85fr] lg:items-end">
              <header className="max-w-4xl">
                <p className="isr-eyebrow text-isr-yellow">
                  Worship on campus
                </p>

                <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                  Pray at RMIT
                </h1>

                <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/80 sm:text-xl">
                  Find your musallah, check Jumu’ah and
                  plan your daily prayers without searching
                  through multiple pages or messages.
                </p>
              </header>

              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                <a
                  href="#jumuah"
                  className="rounded-xl bg-white px-4 py-3 text-center text-sm font-bold text-isr-dark-red transition hover:bg-isr-yellow"
                >
                  Jumu’ah
                </a>

                <a
                  href="#campus-prayer-spaces"
                  className="rounded-xl border border-white/20 px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-white/10"
                >
                  Prayer rooms
                </a>

                <a
                  href="#daily-prayer-times"
                  className="rounded-xl border border-white/20 px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-white/10"
                >
                  Daily timetable
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-isr-light-blue/15 bg-white px-4">
          <div className="isr-fade-edge container-isr mx-auto max-w-7xl">
            <nav
              aria-label="Prayer page sections"
              className="isr-prayer-nav flex gap-2 overflow-x-auto py-4 pr-8"
            >
              <a
                href="#jumuah"
                className="isr-campus-pill bg-isr-dark-red text-white"
              >
                Friday prayer
              </a>

              <a
                href="#campus-prayer-spaces"
                className="isr-campus-pill bg-isr-cream text-isr-dark-red"
              >
                Campus prayer rooms
              </a>

              <a
                href="#daily-prayer-times"
                className="isr-campus-pill bg-isr-cream text-isr-dark-red"
              >
                Daily prayer times
              </a>

              <Link
                href="/contact"
                className="isr-campus-pill bg-isr-cream text-isr-dark-red"
              >
                Report an issue
              </Link>
            </nav>
          </div>
        </section>

        <section
          id="jumuah"
          className="scroll-mt-28 px-4 py-14 sm:py-20"
        >
          <div className="container-isr mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
              <div>
                <p className="isr-eyebrow text-isr-turquoise">
                  Friday prayer
                </p>

                <h2 className="mt-4 text-3xl font-bold leading-tight text-isr-dark-red sm:text-4xl">
                  Jumu’ah at RMIT
                </h2>

                <p className="mt-4 max-w-xl leading-relaxed text-gray-700">
                  Friday prayer arrangements are different
                  across campuses. Check the location and
                  time before travelling.
                </p>

                <div className="mt-6 rounded-2xl border border-isr-yellow bg-isr-yellow/30 p-5">
                  <p className="font-bold text-isr-dark-red">
                    Brunswick
                  </p>

                  <p className="mt-2 text-sm leading-relaxed text-gray-700">
                    There is currently no ISR Jumu’ah service
                    at the Brunswick campus.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {JUMUAH_SERVICES.map(
                  (service) => (
                    <article
                      key={service.id}
                      className="isr-prayer-summary rounded-[1.75rem] border border-isr-light-blue/20 p-6 shadow-sm sm:p-7"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-turquoise">
                            Jumu’ah
                          </p>

                          <h3 className="mt-2 text-2xl font-bold text-isr-dark-red">
                            {service.campus}
                          </h3>
                        </div>

                        <span className="rounded-full bg-isr-dark-red px-4 py-2 text-sm font-bold text-white">
                          {service.time}
                        </span>
                      </div>

                      <p className="mt-5 text-sm leading-relaxed text-gray-700">
                        {service.venue}
                      </p>
                    </article>
                  ),
                )}
              </div>
            </div>

            <div className="mt-8 rounded-[1.75rem] bg-isr-dark-red p-6 text-white sm:p-8">
              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-yellow">
                    City
                  </p>

                  <h3 className="mt-2 text-2xl font-bold">
                    1:30 pm year-round
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    City Jumu’ah remains at 1:30 pm.
                  </p>
                </div>

                <div className="border-t border-white/15 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-yellow">
                    Bundoora
                  </p>

                  <h3 className="mt-2 text-2xl font-bold">
                    Time changes with daylight saving
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    12:30 pm outside Victorian daylight
                    saving and 1:30 pm during daylight saving.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-isr-cream/50 px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-7xl">
            <div className="grid gap-4 lg:grid-cols-3">
              {prayerEssentials.map(
                (item) => (
                  <a
                    key={item.number}
                    href={item.href}
                    className="isr-card isr-card-interactive bg-white p-5 sm:p-6"
                  >
                    <span className="text-xs font-bold text-isr-turquoise">
                      {item.number}
                    </span>

                    <h3 className="mt-3 text-xl font-bold text-isr-dark-red">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-gray-700">
                      {item.text}
                    </p>
                  </a>
                ),
              )}
            </div>
          </div>
        </section>

        <section
          id="campus-prayer-spaces"
          className="scroll-mt-28 px-4 py-14 sm:py-20"
        >
          <div className="container-isr mx-auto max-w-7xl">
            <div className="mb-9 max-w-3xl">
              <p className="isr-eyebrow text-isr-turquoise">
                Campus directory
              </p>

              <h2 className="mt-4 text-3xl font-bold text-isr-dark-red sm:text-4xl">
                Find your prayer room
              </h2>

              <p className="mt-4 leading-relaxed text-gray-700">
                Prayer spaces are listed by campus with
                separate brothers’ and sisters’ rooms where
                applicable.
              </p>
            </div>

            <PrayerSpaceDirectory />
          </div>
        </section>

        <section
          id="daily-prayer-times"
          className="scroll-mt-28 bg-isr-dark-red px-4 py-14 sm:py-20"
        >
          <div className="container-isr mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[0.65fr_1.35fr] lg:items-start">
              <div className="text-white">
                <p className="isr-eyebrow text-isr-yellow">
                  Daily prayers
                </p>

                <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                  Melbourne prayer timetable
                </h2>

                <p className="mt-4 max-w-xl leading-relaxed text-white/70">
                  Use today’s prayer times when planning
                  your day on campus. Campus prayer-room
                  access information remains in the directory above.
                </p>

                <p className="mt-5 text-sm leading-relaxed text-white/55">
                  Prayer times and room access are different
                  pieces of information. Always check the
                  campus directory for the room you intend
                  to use.
                </p>
              </div>

              <PrayerTimesTable />
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-5xl">
            <div className="rounded-[1.75rem] border border-isr-yellow bg-isr-yellow/30 p-6 sm:p-8">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-turquoise">
                    Something wrong?
                  </p>

                  <h2 className="mt-3 text-2xl font-bold text-isr-dark-red">
                    Report a prayer-space or Jumu’ah issue
                  </h2>

                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                    Tell ISR if a room is inaccessible,
                    information appears incorrect, or you
                    encounter another prayer-space issue.
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="isr-button-primary"
                >
                  Contact ISR
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
