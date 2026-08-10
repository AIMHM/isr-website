import type {
  Metadata,
} from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StudentSupportDirectory from '@/components/StudentSupportDirectory'

export const metadata: Metadata = {
  title: 'Student Support',
  description:
    'Raise Muslim student concerns and request support from the Islamic Society of RMIT.',
}

export default function SupportPage() {
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
              Student Support
            </p>

            <h1 className="mt-3 text-4xl font-bold text-isr-dark-red sm:text-5xl">
              Talk to ISR
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-gray-700">
              If something is affecting your experience
              as a Muslim student at RMIT, ISR can be a
              place to begin.
            </p>

            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              You do not need to work out the correct
              internal team before contacting us. Tell us
              what has happened and what support you are
              looking for.
            </p>
          </header>

          <div className="mt-12">
            <StudentSupportDirectory />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
