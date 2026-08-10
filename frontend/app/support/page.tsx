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

      <main id="main-content">
        <section className="bg-isr-dark-red px-4 py-14 text-white sm:py-20">
          <div className="container-isr mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-isr-yellow">
                Student Support
              </p>

              <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
                Talk to ISR
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/80 sm:text-lg">
                If something is affecting your experience
                as a Muslim student at RMIT, ISR can be a
                place to begin.
              </p>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/60">
                Tell us what has happened and what support
                you are looking for. You do not need to
                identify the right internal team first.
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-7xl">
            <StudentSupportDirectory />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
