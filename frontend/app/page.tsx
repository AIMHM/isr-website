import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import QuickActions from '@/components/QuickActions'
import TodayAtISR from '@/components/TodayAtISR'
import EventsPreview from '@/components/EventsPreview'
import PrayerSpacesPreview from '@/components/PrayerSpacesPreview'
import NewStudentPreview from '@/components/NewStudentPreview'
import ParticipationJourney from '@/components/ParticipationJourney'
import WhatISRDoes from '@/components/WhatISRDoes'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main id="main-content">
        <Hero />
        <QuickActions />
        <TodayAtISR />
        <EventsPreview />
        <PrayerSpacesPreview />
        <NewStudentPreview />
        <ParticipationJourney />
        <WhatISRDoes />
      </main>

      <Footer />
    </div>
  )
}
