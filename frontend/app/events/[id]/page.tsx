import type {
  Metadata,
} from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import EventDetailExperience from '@/components/EventDetailExperience'

export const metadata: Metadata = {
  title: 'ISR Event',
  description:
    'Event information from the Islamic Society of RMIT.',
}

export default async function EventPage({
  params,
}: {
  params: Promise<{
    id: string
  }>
}) {
  const {
    id,
  } =
    await params

  const eventId =
    Number(id)

  return (
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/20">
      <Navbar />

      <EventDetailExperience
        id={eventId}
      />

      <Footer />
    </div>
  )
}
