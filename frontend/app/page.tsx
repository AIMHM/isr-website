import HomeStudentDashboard from '@/components/HomeStudentDashboard'
import HomeDiscoverISR from '@/components/HomeDiscoverISR'
import type {
  Metadata,
} from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HomeExperience from '@/components/HomeExperience'

export const metadata: Metadata = {
  title:
    'Islamic Society of RMIT',
  description:
    'The home of Muslim students at RMIT. Find prayer spaces, Jumu’ah, events, community, membership and student support.',
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main id="main-content">
        <HomeExperience />
        <HomeStudentDashboard />
        <HomeDiscoverISR />
      </main>

      <Footer />
    </div>
  )
}
