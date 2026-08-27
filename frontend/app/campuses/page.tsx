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
    'Find prayer spaces, Jumu’ah information, activities, support and Muslim student essentials across RMIT campuses.',
}

export default function CampusesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main id="main-content">
        <section className="bg-white px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-turquoise">
              Campus guide
            </p>

            <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-isr-dark-red sm:text-5xl">
              Your Muslim student guide to RMIT campuses
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-gray-700">
              Start with your campus. Find prayer and Jumu’ah information, then move quickly to ISR activities, student support and operational updates.
            </p>

            <div className="mt-10">
              <CampusGuide2Experience />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
