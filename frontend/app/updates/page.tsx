import type {
  Metadata,
} from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import UpdatesExperience from '@/components/UpdatesExperience'

export const metadata: Metadata = {
  title: 'ISR Updates',
  description:
    'Official Islamic Society of RMIT notices, changes and important student information.',
}

export default function UpdatesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main id="main-content">
        <UpdatesExperience />
      </main>

      <Footer />
    </div>
  )
}
