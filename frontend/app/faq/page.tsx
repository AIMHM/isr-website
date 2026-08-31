import type {
  Metadata,
} from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  ISR_PUBLIC,
} from '@/lib/siteContent'

export const metadata: Metadata = {
  title: 'ISR FAQ',
  description:
    'Quick answers about prayer, Jumu’ah, events, membership, community, volunteering and student support at RMIT.',
}

type Question = {
  question: string
  answer: string
  href: string
  action: string
  external?: boolean
}

type QuestionGroup = {
  title: string
  description: string
  questions: Question[]
}

const groups: QuestionGroup[] = [
  {
    title: 'Prayer and campus',
    description:
      'The practical things students most often need while they are physically at RMIT.',
    questions: [
      {
        question: 'Where can I pray at RMIT?',
        answer:
          'Use the Prayer or Campus Guide pages for prayer-space information across City, Bundoora and Brunswick, including room and access details.',
        href: '/campuses',
        action: 'Find a prayer space',
      },
      {
        question: 'Where is Jumu’ah?',
        answer:
          'Friday prayer arrangements differ by campus. Check the Prayer page for the current ISR Jumu’ah locations and times before travelling.',
        href: '/pray#jumuah',
        action: 'Check Jumu’ah',
      },
      {
        question: 'I am new to RMIT. Where should I start?',
        answer:
          'The Student Guide starts with the Muslim student essentials: campus prayer, Jumu’ah, community and the main support pathways.',
        href: '/student-guide',
        action: 'Open the Student Guide',
      },
    ],
  },
  {
    title: 'Events and getting involved',
    description:
      'How to find something to attend, become a member or contribute to ISR.',
    questions: [
      {
        question: 'What is ISR running this week?',
        answer:
          'What’s On combines upcoming one-off events and recurring ISR programs in one place.',
        href: '/events',
        action: 'See What’s On',
      },
      {
        question: 'How much does ISR membership cost?',
        answer: 'ISR membership is free.',
        href: ISR_PUBLIC.membership.url,
        action: 'Become a member',
        external: true,
      },
      {
        question: 'How do I join the ISR community?',
        answer:
          'Join the main ISR WhatsApp Community to stay connected to announcements, opportunities and Muslim student life.',
        href: ISR_PUBLIC.community.url,
        action: 'Join the community',
        external: true,
      },
      {
        question: 'Can I help without joining a team?',
        answer:
          'Yes. Volunteering lets you contribute without taking on a recurring team role.',
        href: ISR_PUBLIC.volunteer.url,
        action: 'Volunteer with ISR',
        external: true,
      },
      {
        question: 'What ISR teams can I join?',
        answer:
          'The Teams page explains the main kinds of work students contribute to. Current recruitment needs can change between terms.',
        href: '/teams',
        action: 'Explore ISR teams',
      },
    ],
  },
  {
    title: 'Support and contact',
    description:
      'Where to go when you need a person rather than another piece of information.',
    questions: [
      {
        question: 'I need support as a Muslim student. Where do I go?',
        answer:
          'Student Support helps you choose the closest pathway for religious accommodation, discrimination, prayer-space concerns, personal support and other Muslim student issues.',
        href: '/support',
        action: 'Open Student Support',
      },
      {
        question: 'How do I contact ISR?',
        answer:
          'Use the Contact page for ISR’s official contact pathways. You do not need to know which internal team handles your enquiry before reaching out.',
        href: '/contact',
        action: 'Contact ISR',
      },
    ],
  },
]

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/15">
      <Navbar />

      <main id="main-content">
        <section className="isr-page-hero bg-isr-dark-red px-4 py-14 text-white sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.65fr] lg:items-end">
              <div className="max-w-4xl">
                <p className="isr-eyebrow text-isr-yellow">
                  Frequently asked questions
                </p>

                <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                  Quick answers without the runaround.
                </h1>

                <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/80 sm:text-xl">
                  Start with prayer, campus life, events, joining or support. If the question is more specific, search the whole ISR site instead.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link
                  href="/find"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 font-bold text-isr-dark-red transition hover:bg-isr-yellow"
                >
                  Search ISR
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-6 py-3 font-bold text-white transition hover:bg-white/10"
                >
                  Contact ISR
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-5xl">
            <div className="space-y-14">
              {groups.map((group) => (
                <section key={group.title}>
                  <div className="max-w-3xl">
                    <h2 className="text-2xl font-bold text-isr-dark-red sm:text-3xl">
                      {group.title}
                    </h2>

                    <p className="mt-2 leading-relaxed text-gray-600">
                      {group.description}
                    </p>
                  </div>

                  <div className="mt-6 divide-y divide-isr-light-blue/20 border-y border-isr-light-blue/20">
                    {group.questions.map((item) => (
                      <details
                        key={item.question}
                        className="group py-1"
                      >
                        <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 text-left font-bold text-isr-dark-red marker:hidden sm:text-lg">
                          <span>{item.question}</span>
                          <span
                            aria-hidden="true"
                            className="text-xl text-isr-turquoise transition-transform group-open:rotate-45"
                          >
                            +
                          </span>
                        </summary>

                        <div className="pb-6 pr-8 sm:pr-12">
                          <p className="max-w-3xl leading-relaxed text-gray-700">
                            {item.answer}
                          </p>

                          {item.external ? (
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="isr-text-link mt-4"
                            >
                              {item.action} ↗
                            </a>
                          ) : (
                            <Link
                              href={item.href}
                              className="isr-text-link mt-4"
                            >
                              {item.action} →
                            </Link>
                          )}
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <section className="mt-14 bg-isr-dark-red p-7 text-white sm:p-9">
              <p className="isr-eyebrow text-isr-yellow">
                Still not sure?
              </p>

              <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                Search the site or ask ISR directly.
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70">
                You do not need to work out the right page, team or person before asking for help.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/find"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-bold text-isr-dark-red transition hover:bg-isr-yellow"
                >
                  Search ISR
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  Contact ISR
                </Link>
              </div>
            </section>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
