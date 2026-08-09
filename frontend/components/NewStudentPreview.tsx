import Link from 'next/link'
import SectionHeading from '@/components/SectionHeading'

const essentials = [
  'Find the musallah',
  "Find Jumu'ah",
  'Join the Muslim community',
  'Attend an ISR event',
  'Become an ISR member',
  'Know where to get support',
]

export default function NewStudentPreview() {
  return (
    <section className="bg-white px-4 py-16 sm:py-20">
      <div className="container-isr mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="New to RMIT?"
              title="You do not have to figure everything out alone"
              description="Start with the essentials for Muslim student life at RMIT."
            />

            <Link href="/start" className="isr-button-primary mt-7">
              Start here
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {essentials.map((item, index) => (
              <div
                key={item}
                className="isr-card flex items-center gap-4 p-5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-isr-turquoise text-sm font-bold text-white">
                  {index + 1}
                </span>

                <p className="font-semibold text-isr-dark-red">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
