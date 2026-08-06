import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StudentSupportDirectory from '@/components/StudentSupportDirectory'

export const metadata: Metadata = {
  title: 'Student Support',
  description:
    'Support pathways, religious-accommodation guidance and student welfare information from the Islamic Society of RMIT.',
}

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/20">
      <Navbar />

      <main id="main-content" className="px-4 py-14 sm:py-20">
        <div className="container-isr mx-auto max-w-6xl">
          <header className="mb-12 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-isr-turquoise">
              Guidance and welfare
            </p>

            <h1 className="mt-3 text-4xl font-bold text-isr-dark-red sm:text-5xl">
              Student Support
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-gray-700">
              Find pathways for wellbeing, religious accommodations,
              discrimination reporting and student welfare.
            </p>

            <div className="mt-6 rounded-2xl border border-isr-bright-red/20 bg-isr-yellow/50 p-4 text-sm font-semibold text-isr-dark-red">
              Contact details and university procedures shown in this local
              preview require confirmation before publication.
            </div>
          </header>

          <StudentSupportDirectory />
        </div>
      </main>

      <Footer />
    </div>
  )
}
