import type {
  Metadata,
} from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CampusGuide2Experience from '@/components/CampusGuide2Experience'

export const metadata: Metadata = {
  title:
    'RMIT Campus Guide',

  description:
    'Find prayer spaces, Jumu’ah information, ISR activities and Muslim student support across RMIT City, Bundoora and Brunswick.',
}

export default function CampusesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main id="main-content">
        <section className="bg-white px-4 py-12 sm:py-16 lg:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-turquoise">
              RMIT campus guide
            </p>

            <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-isr-dark-red sm:text-5xl lg:text-6xl">
              Find what you need on your campus
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-gray-700">
              Choose City, Bundoora or Brunswick to find prayer spaces, Jumu’ah information, what&apos;s happening and the ISR support most relevant to where you study.
            </p>

            <div className="mt-9 sm:mt-11">
              <CampusGuide2Experience />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
