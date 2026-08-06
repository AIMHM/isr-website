import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PrayerSpaceDirectory from '@/components/PrayerSpaceDirectory'

export const metadata: Metadata = {
  title: 'Pray at RMIT | Islamic Society of RMIT',
  description:
    'Prayer times, Jumuah information and prayer-space guidance for Muslim students at RMIT.',
}

export default function PrayPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/20">
      <Navbar />

      <main id="main-content" className="px-4 py-14 sm:py-20">
        <div className="container-isr mx-auto max-w-6xl">
          <header className="mb-12 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-isr-turquoise">
              Worship on campus
            </p>
            <h1 className="mt-3 text-4xl font-bold text-isr-dark-red sm:text-5xl">
              Pray at RMIT
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-gray-700">
              Find daily prayer information, Jumu&apos;ah updates and
              campus-specific prayer-space guidance.
            </p>
            <div className="mt-6 rounded-2xl border border-isr-bright-red/20 bg-isr-yellow/50 p-4 text-sm font-semibold text-isr-dark-red">
              Campus prayer-space and Jumu&apos;ah details shown in this local preview
              require confirmation before publication.
            </div>
          </header>

          <PrayerSpaceDirectory />
        </div>
      </main>

      <Footer />
    </div>
  )
}
