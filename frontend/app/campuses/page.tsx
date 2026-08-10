import type {
  Metadata,
} from 'next'
import CampusDirectoryExperience from '@/components/CampusDirectoryExperience'

export const metadata: Metadata = {
  title:
    'RMIT campus prayer guide',

  description:
    'Find Islamic Society of RMIT prayer-space information across RMIT campuses.',
}

export default function CampusesPage() {
  return (
    <main>
      <section className="bg-white px-4 py-14 sm:py-20">
        <div className="container-isr mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-turquoise">
            Campus guide
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-isr-dark-red sm:text-5xl">
            Find your prayer space at RMIT
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-gray-700">
            Use this directory as a quick campus entry point.
            Full prayer and Jumu’ah information remains on the
            dedicated Pray at RMIT page.
          </p>

          <div className="mt-10">
            <CampusDirectoryExperience />
          </div>
        </div>
      </section>
    </main>
  )
}
