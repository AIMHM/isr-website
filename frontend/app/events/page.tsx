import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import EventsTimeline from '@/components/EventsTimeline'

export const metadata: Metadata = {
  title: 'Events',
  description:
    'Upcoming and past events from the Islamic Society of RMIT.',
}

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/30">
      <Navbar />

      <main id="main-content" className="px-4 py-14 sm:py-20">
        <div className="container-isr mx-auto max-w-6xl">
          <header className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-isr-turquoise">
              What's happening
            </p>

            <h1 className="mt-3 text-4xl font-bold text-isr-dark-red sm:text-5xl">
              ISR Events
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-700">
              Find something happening, bring a friend and become part of the
              community.
            </p>
          </header>

          <div className="mt-12">
            <EventsTimeline />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
