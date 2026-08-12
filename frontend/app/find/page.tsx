import type {
  Metadata,
} from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FindExperience from '@/components/FindExperience'

export const metadata: Metadata = {
  title:
    'Find ISR information',

  description:
    'Search Islamic Society of RMIT pages, prayer spaces, events and current ISR updates.',

  robots: {
    index: false,
    follow: true,
  },
}

export default function FindPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main id="main-content">
        <section className="bg-isr-cream px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-turquoise">
              Find it fast
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-isr-dark-red sm:text-5xl">
              What are you looking for?
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-700">
              Search ISR services, prayer spaces, events,
              updates and the most useful student pathways.
            </p>

            <div className="mt-10">
              <FindExperience />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
