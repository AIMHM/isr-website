import type {
  Metadata,
} from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PrayerSpaceDirectory from '@/components/PrayerSpaceDirectory'

export const metadata: Metadata = {
  title: 'Pray at RMIT',
  description:
    'Prayer spaces, Jumu’ah arrangements and prayer times across RMIT campuses.',
}

export default function PrayPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/20">
      <Navbar />

      <main id="main-content">
        <section className="border-b border-isr-light-blue/20 bg-isr-cream/55 px-4 py-12 sm:py-16 lg:py-20">
          <div className="container-isr mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <header className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-isr-turquoise">
                  Worship on campus
                </p>

                <h1 className="mt-3 text-4xl font-bold leading-tight text-isr-dark-red sm:text-5xl">
                  Pray at RMIT
                </h1>

                <p className="mt-5 text-base leading-relaxed text-gray-700 sm:text-lg">
                  Find prayer rooms across RMIT, check
                  current Friday prayer arrangements and
                  view the Melbourne daily prayer timetable.
                </p>
              </header>

              <div className="grid gap-2 sm:grid-cols-2 lg:w-80 lg:grid-cols-1">
                <Link
                  href="#jumuah"
                  className="rounded-xl bg-isr-dark-red px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-isr-turquoise"
                >
                  Jumu’ah information
                </Link>

                <Link
                  href="#campus-prayer-spaces"
                  className="rounded-xl border border-isr-light-blue/40 bg-white px-4 py-3 text-center text-sm font-bold text-isr-dark-red transition hover:bg-isr-cream"
                >
                  Prayer rooms
                </Link>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-isr-light-blue/25 bg-white p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-isr-turquoise">
                  City Jumu’ah
                </p>

                <p className="mt-2 text-xl font-bold text-isr-dark-red">
                  1:30 pm year-round
                </p>
              </div>

              <div className="rounded-2xl border border-isr-light-blue/25 bg-white p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-isr-turquoise">
                  Bundoora Jumu’ah
                </p>

                <p className="mt-2 font-bold leading-relaxed text-isr-dark-red">
                  12:30 pm outside daylight saving
                  <span className="block">
                    1:30 pm during daylight saving
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="px-4 py-12 sm:py-16">
          <div className="container-isr mx-auto max-w-7xl">
            <PrayerSpaceDirectory />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
