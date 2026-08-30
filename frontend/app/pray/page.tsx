import PrayerIssueReporter from '@/components/PrayerIssueReporter'
import PrayerQuickNav from '@/components/PrayerQuickNav'
import NextPrayerCountdown from '@/components/NextPrayerCountdown'
import type {
  Metadata,
} from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ManagedPrayerSpaceDirectory from '@/components/ManagedPrayerSpaceDirectory'
import PrayerTimesTable from '@/components/PrayerTimesTable'
import ManagedJumuahServices from '@/components/ManagedJumuahServices'

export const metadata: Metadata = {
  title: 'Pray at RMIT',
  description:
    'Prayer rooms, Jumu’ah arrangements and daily prayer times across RMIT campuses.',
}

export default function PrayPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main id="main-content">
        <section className="relative overflow-hidden bg-isr-dark-red px-4 py-14 text-white sm:py-20 lg:py-24">
          <div
            aria-hidden="true"
            className="absolute -right-28 -top-28 h-96 w-96 rounded-full bg-isr-turquoise/25 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-isr-yellow/12 blur-3xl"
          />

          <div className="container-isr relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
            <header className="max-w-4xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-isr-yellow sm:text-sm">
                Worship on campus
              </p>

              <h1 className="mt-4 text-4xl font-bold leading-[1.04] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
                Pray at RMIT
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/78 sm:text-xl">
                Find the right musallah, see the next prayer,
                check Jumu’ah and get the room details you need
                before you walk across campus.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="#campus-prayer-spaces"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 font-bold text-isr-dark-red transition hover:bg-isr-yellow"
                >
                  Find a prayer room
                </a>

                <a
                  href="#jumuah"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-6 py-3 font-bold text-white transition hover:bg-white/10"
                >
                  Jumu’ah details
                </a>

                <a
                  href="#daily-prayer-times"
                  className="inline-flex min-h-12 items-center justify-center px-3 py-3 font-bold text-isr-yellow transition hover:text-white"
                >
                  Today’s timetable →
                </a>
              </div>

              <p className="mt-7 max-w-2xl text-sm leading-relaxed text-white/55">
                Prayer times are Melbourne calculation times, not congregational iqamah times.
              </p>
            </header>

            <div>
              <NextPrayerCountdown />
            </div>
          </div>
        </section>

        <section className="border-b border-isr-light-blue/15 bg-isr-cream/45 px-4 py-8 sm:py-10">
          <div className="container-isr mx-auto max-w-7xl">
            <PrayerQuickNav />
          </div>
        </section>

        <section
          id="campus-prayer-spaces"
          className="scroll-mt-28 px-4 py-14 sm:py-20"
        >
          <div className="container-isr mx-auto max-w-7xl">
            <div className="mb-9 grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-isr-turquoise">
                  Prayer spaces
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight text-isr-dark-red sm:text-4xl">
                  Find the room for your campus
                </h2>
              </div>

              <p className="max-w-2xl leading-relaxed text-gray-700 lg:justify-self-end">
                City, Bundoora East, Bundoora West and Brunswick each have their own prayer-space details. Building, room, access hours, brothers’ and sisters’ locations and wudu information are kept together below.
              </p>
            </div>

            <ManagedPrayerSpaceDirectory />
          </div>
        </section>

        <section
          id="jumuah"
          className="scroll-mt-28 bg-isr-cream/55 px-4 py-14 sm:py-20"
        >
          <div className="container-isr mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[0.62fr_1.38fr] lg:items-start">
              <div className="lg:sticky lg:top-28">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-isr-turquoise">
                  Friday prayer
                </p>

                <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-isr-dark-red sm:text-4xl">
                  Jumu’ah at RMIT
                </h2>

                <p className="mt-4 max-w-xl leading-relaxed text-gray-700">
                  City and Bundoora have different Friday arrangements. Bundoora also changes with Victorian daylight saving, so use the current time shown here rather than an old flyer or screenshot.
                </p>

                <p className="mt-5 text-sm leading-relaxed text-gray-500">
                  Brunswick currently has no ISR Jumu’ah service. Temporary changes are published through ISR Updates.
                </p>
              </div>

              <ManagedJumuahServices />
            </div>
          </div>
        </section>

        <section
          id="daily-prayer-times"
          className="scroll-mt-28 bg-isr-dark-red px-4 py-14 sm:py-20"
        >
          <div className="container-isr mx-auto max-w-7xl">
            <div className="grid gap-9 lg:grid-cols-[0.62fr_1.38fr] lg:items-start">
              <div className="text-white lg:sticky lg:top-28">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-isr-yellow">
                  Today
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  Melbourne prayer timetable
                </h2>

                <p className="mt-4 max-w-xl leading-relaxed text-white/70">
                  Use the daily timetable to plan around classes, then use the campus directory above to find the room you intend to pray in.
                </p>

                <div className="mt-6 border-l-2 border-isr-yellow/70 pl-4 text-sm leading-relaxed text-white/55">
                  ISR displays Muslim World League calculation times for Melbourne. These are prayer-time references and do not represent iqamah times.
                </div>
              </div>

              <PrayerTimesTable />
            </div>
          </div>
        </section>

        <section className="bg-isr-cream/60 px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <PrayerIssueReporter />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
