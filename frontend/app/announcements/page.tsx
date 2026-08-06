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

      <main
        id="main-content"
        className="px-4 py-16 sm:py-20"
      >
        <div className="container-isr mx-auto max-w-5xl">
          <header className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-isr-turquoise">
              Notices and updates
            </p>

            <h1 className="mt-3 text-4xl font-bold text-isr-dark-red md:text-5xl">
              Announcements
            </h1>

            <div className="mx-auto mt-5 h-1 w-16 bg-isr-bright-red" />

            <p className="mx-auto mt-6 max-w-2xl text-gray-700">
              Current ISR notices are shown here.
              Time-sensitive announcements may expire
              automatically when they are no longer
              relevant.
            </p>
          </header>

          <AnnouncementsList />
        </div>
      </main>

      <Footer />
    </div>
  )
}
