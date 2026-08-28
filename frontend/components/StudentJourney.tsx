import Link from 'next/link'
import {
  ISR_PUBLIC,
} from '@/lib/siteContent'

const stages = [
  {
    number: '01',
    eyebrow: 'Attend',
    title: 'Show up to something',
    description:
      'Start with an event, weekly program, halaqa, workshop or social. Participation is the easiest first step into the community.',
    href: '/events',
    action: 'See what’s on',
    external: false,
  },
  {
    number: '02',
    eyebrow: 'Join',
    title: 'Become an ISR member',
    description:
      'Formal membership is free and connects you to the Society as a Muslim student at RMIT.',
    href: ISR_PUBLIC.membership.url,
    action: 'Join ISR',
    external: true,
  },
  {
    number: '03',
    eyebrow: 'Volunteer',
    title: 'Help deliver the community',
    description:
      'Volunteer at activities, help with practical tasks and build experience by contributing alongside the team.',
    href: ISR_PUBLIC.volunteer.url,
    action: 'Volunteer with ISR',
    external: true,
  },
  {
    number: '04',
    eyebrow: 'Lead',
    title: 'Take on responsibility over time',
    description:
      'If you are ready for more responsibility, apply to be part of an ISR team and develop through service, reliability and contribution.',
    href: ISR_PUBLIC.team.url,
    action: 'Explore team opportunities',
    external: true,
  },
]

export default function StudentJourney() {
  return (
    <section
      aria-labelledby="student-journey-heading"
      className="bg-isr-dark-red px-4 py-14 text-white sm:py-20"
    >
      <div className="container-isr mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="isr-eyebrow text-isr-yellow">
            Your ISR journey
          </p>

          <h2
            id="student-journey-heading"
            className="mt-4 text-3xl font-bold sm:text-4xl"
          >
            Attend → Join → Volunteer → Lead
          </h2>

          <p className="mt-4 leading-relaxed text-white/70">
            There is no pressure to move through these stages quickly. The pathway simply shows how a student can go from discovering ISR to taking meaningful responsibility in the community.
          </p>
        </div>

        <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stages.map(
            (stage) => {
              const content = (
                <>
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-bold text-isr-dark-red">
                      {stage.number}
                    </span>

                    <span className="text-xs font-bold uppercase tracking-[0.16em] text-isr-yellow">
                      {stage.eyebrow}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-bold">
                    {stage.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-white/70">
                    {stage.description}
                  </p>

                  <span className="mt-6 font-bold text-isr-yellow">
                    {stage.action} →
                  </span>
                </>
              )

              if (stage.external) {
                return (
                  <a
                    key={stage.number}
                    href={stage.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-full flex-col rounded-[1.5rem] border border-white/15 bg-white/[0.07] p-5 transition hover:bg-white/[0.12]"
                  >
                    {content}
                  </a>
                )
              }

              return (
                <Link
                  key={stage.number}
                  href={stage.href}
                  className="flex min-h-full flex-col rounded-[1.5rem] border border-white/15 bg-white/[0.07] p-5 transition hover:bg-white/[0.12]"
                >
                  {content}
                </Link>
              )
            },
          )}
        </div>
      </div>
    </section>
  )
}
