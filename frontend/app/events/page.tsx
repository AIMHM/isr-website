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
        <div className="container-isr mx-auto max-w-5xl">
          <header className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-isr-turquoise">
              Community and activities
            </p>

            <h1 className="mb-4 text-4xl font-bold text-isr-dark-red md:text-5xl">
              Events
            </h1>

            <div className="mx-auto mb-6 h-1 w-16 bg-isr-bright-red" />

            <p className="mx-auto max-w-2xl text-gray-700">
              View upcoming programs and a record of activities ISR has hosted
              for the student community.
            </p>
          </header>

          <EventsTimeline />
        </div>
      </main>

      <Footer />
    </div>
  )
}
