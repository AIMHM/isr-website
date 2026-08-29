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

const questions = [
  {
    question:
      'Where can I pray at RMIT?',
    answer:
      'Use the Prayer page for prayer-space information across City, Bundoora and Brunswick.',
    href:
      '/pray#campus-prayer-spaces',
    action:
      'Find a prayer room',
  },
  {
    question:
      'Where is Jumu’ah?',
    answer:
      'Friday prayer arrangements differ by campus. Check the Prayer page before travelling.',
    href:
      '/pray#jumuah',
    action:
      'Check Jumu’ah',
  },
  {
    question:
      'What is ISR running this week?',
    answer:
      'What’s On combines upcoming events and recurring ISR programs in one place.',
    href:
      '/events',
    action:
      'See What’s On',
  },
  {
    question:
      'I am new to RMIT. Where should I start?',
    answer:
      'The Student Guide brings together the Muslim student essentials.',
    href:
      '/student-guide',
    action:
      'Open Student Guide',
  },
  {
    question:
      'How much does ISR membership cost?',
    answer:
      'ISR membership is free.',
    href:
      ISR_PUBLIC.membership.url,
    action:
      'Become a member',
    external:
      true,
  },
  {
    question:
      'How do I join the ISR community?',
    answer:
      'Join the main ISR WhatsApp Community to stay connected.',
    href:
      ISR_PUBLIC.community.url,
    action:
      'Join the community',
    external:
      true,
  },
  {
    question:
      'Can I help without joining a team?',
    answer:
      'Yes. Volunteering lets you contribute without taking on a recurring team role.',
    href:
      ISR_PUBLIC.volunteer.url,
    action:
      'Volunteer with ISR',
    external:
      true,
  },
  {
    question:
      'What ISR teams can I join?',
    answer:
      'Explore the Teams page to understand the kinds of work students contribute to across ISR.',
    href:
      '/teams',
    action:
      'Explore ISR teams',
  },
  {
    question:
      'I need support as a Muslim student. Where do I go?',
    answer:
      'Student Support helps you find the closest information or support pathway.',
    href:
      '/support',
    action:
      'Student Support',
  },
  {
    question:
      'How do I contact ISR?',
    answer:
      'Use the Contact page for ISR’s official contact pathways.',
    href:
      '/contact',
    action:
      'Contact ISR',
  },
]

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/15">
      <Navbar />

      <main id="main-content">
        <section className="bg-isr-dark-red px-4 py-14 text-white sm:py-20">
          <div className="container-isr mx-auto max-w-5xl">
            <p className="isr-eyebrow text-isr-yellow">
              Frequently asked questions
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Find the answer quickly
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/80 sm:text-xl">
              Common questions about prayer, Jumu’ah,
              events, membership, community, volunteering,
              teams and support.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/find"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 font-bold text-isr-dark-red transition hover:bg-isr-yellow"
              >
                Search ISR
              </Link>

              <Link
                href="/student-guide"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-6 py-3 font-bold text-white transition hover:bg-white/10"
              >
                Student Guide
              </Link>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-5xl">
            <div className="space-y-4">
              {questions.map(
                (item) => (
                  <article
                    key={item.question}
                    className="rounded-[1.5rem] border border-isr-light-blue/20 bg-white p-6 shadow-sm sm:p-7"
                  >
                    <h2 className="text-xl font-bold text-isr-dark-red sm:text-2xl">
                      {item.question}
                    </h2>

                    <p className="mt-3 leading-relaxed text-gray-700">
                      {item.answer}
                    </p>

                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="isr-text-link mt-5"
                      >
                        {item.action} ↗
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="isr-text-link mt-5"
                      >
                        {item.action} →
                      </Link>
                    )}
                  </article>
                ),
              )}
            </div>

            <div className="mt-10 rounded-[1.75rem] bg-isr-dark-red p-6 text-white sm:p-8">
              <p className="isr-eyebrow text-isr-yellow">
                Still not sure?
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                Search or speak to ISR
              </h2>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/find"
                  className="rounded-full bg-white px-5 py-3 text-sm font-bold text-isr-dark-red"
                >
                  Search ISR
                </Link>

                <Link
                  href="/contact"
                  className="rounded-full border border-white/20 px-5 py-3 text-sm font-bold text-white"
                >
                  Contact ISR
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}