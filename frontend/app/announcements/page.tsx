import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AnnouncementsList from '@/components/AnnouncementsList'

export const metadata: Metadata = {
  title: 'Announcements',
  description:
    'Current notices, operational updates and community announcements from the Islamic Society of RMIT.',
}

export default function AnnouncementsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/20">
      <Navbar />

      <main id="main-content" className="px-4 py-14 sm:py-20">
        <div className="container-isr mx-auto max-w-6xl">
          <header className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-isr-turquoise">
              Notices and updates
            </p>

            <h1 className="mt-3 text-4xl font-bold text-isr-dark-red sm:text-5xl">
              Announcements
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-700">
              Current operational notices, event updates and important
              information from ISR.
            </p>

            <p className="mx-auto mt-5 max-w-2xl rounded-2xl border border-isr-yellow bg-isr-yellow/40 p-4 text-sm leading-relaxed text-isr-dark-red">
              Time-sensitive notices may be removed automatically after they
              expire.
            </p>
          </header>

          <div className="mt-12">
            <AnnouncementsList />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
