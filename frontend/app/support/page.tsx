import SupportTriage from '@/components/SupportTriage'
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
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/15">
      <Navbar />

      <main id="main-content">
        <section className="isr-page-hero bg-isr-dark-red px-4 py-14 text-white sm:py-20">
          <div className="container-isr mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <p className="isr-eyebrow text-isr-yellow">
                Student Support
              </p>

              <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Something affecting you as a Muslim student?
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/80 sm:text-xl">
                Start with ISR. Tell us what happened and
                what you are looking for — you do not need
                to identify the right internal team first.
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-7xl">
            <StudentSupportDirectory />
          </div>
        </section>

        <section className="px-4 pb-16 sm:pb-20">
          <div className="container-isr mx-auto max-w-6xl">
            <SupportTriage />
          </div>
        </section>

</main>

      <Footer />
    </div>
  )
}
