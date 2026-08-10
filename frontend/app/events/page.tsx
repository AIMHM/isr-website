import type {
  Metadata,
} from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import EventsExperience from '@/components/EventsExperience'

export const metadata: Metadata = {
  title: 'Events',
  description:
    'Find upcoming Islamic Society of RMIT events, programs, workshops and community activities.',
}

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main id="main-content">
        <EventsExperience />
      </main>

      <Footer />
    </div>
  )
}
