import type {
  Metadata,
} from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProgramDetailExperience from '@/components/ProgramDetailExperience'

export const metadata: Metadata = {
  title:
    'ISR Program',

  description:
    'Recurring program information from the Islamic Society of RMIT.',
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{
    slug: string
  }>
}) {
  const {
    slug,
  } =
    await params

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <ProgramDetailExperience
        slug={
          slug
        }
      />

      <Footer />
    </div>
  )
}
