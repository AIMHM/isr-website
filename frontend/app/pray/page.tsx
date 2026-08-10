import type {
  Metadata,
} from 'next'
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

      <main
        id="main-content"
        className="px-4 py-14 sm:py-20"
      >
        <div className="container-isr mx-auto max-w-6xl">
          <header className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-isr-turquoise">
              Worship on campus
            </p>

            <h1 className="mt-3 text-4xl font-bold text-isr-dark-red sm:text-5xl">
              Pray at RMIT
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-gray-700">
              Find the City, Bundoora and Brunswick prayer
              rooms, check current Friday prayer
              arrangements and view the daily Melbourne
              prayer timetable.
            </p>

            <p className="mt-5 text-sm leading-relaxed text-gray-600">
              Bundoora Jumu&apos;ah changes between
              12:30 pm and 1:30 pm with Victorian daylight
              saving. City Jumu&apos;ah remains at
              1:30 pm year-round.
            </p>
          </header>

          <div className="mt-12">
            <PrayerSpaceDirectory />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
