import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import TodayAtISR from '@/components/TodayAtISR'
import QuickActions from '@/components/QuickActions'
import EventsPreview from '@/components/EventsPreview'
import PrayerSpacesPreview from '@/components/PrayerSpacesPreview'
import StudentSupportPreview from '@/components/StudentSupportPreview'
import WhatISRDoes from '@/components/WhatISRDoes'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main id="main-content">
        <Hero />
        <TodayAtISR />
        <QuickActions />
        <EventsPreview />
        <PrayerSpacesPreview />
        <StudentSupportPreview />
        <WhatISRDoes />
      </main>

      <Footer />
    </div>
  )
}
