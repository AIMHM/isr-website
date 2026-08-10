import type {
  Metadata,
} from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import EventDetailExperience from '@/components/EventDetailExperience'

export const metadata: Metadata = {
  title: 'ISR Event',
  description:
    'Islamic Society of RMIT event information.',
}

type EventPageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function EventPage({
  params,
}: EventPageProps) {
  const {
    id,
  } =
    await params

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <EventDetailExperience
        id={Number(id)}
      />

      <Footer />
    </div>
  )
}
