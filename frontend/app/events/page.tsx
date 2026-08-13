import type {
  Metadata,
} from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsOnExperience from '@/components/WhatsOnExperience'

export const metadata: Metadata = {
  title:
    'What’s On',

  description:
    'Find Islamic Society of RMIT events, weekly programs, workshops and community activities.',
}

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main id="main-content">
        <WhatsOnExperience />
      </main>

      <Footer />
    </div>
  )
}
