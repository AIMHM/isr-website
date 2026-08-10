import type {
  Metadata,
} from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  mailto,
} from '@/lib/siteContent'

export const metadata: Metadata = {
  title: 'Accessibility',
  description:
    'Accessibility information for the Islamic Society of RMIT website.',
}

const commitments = [
  {
    title: 'Keyboard access',
    text:
      'Core navigation, links, forms and interactive controls should remain usable without a mouse.',
  },
  {
    title: 'Readable structure',
    text:
      'Pages use headings, landmarks and consistent information structure so content is easier to navigate.',
  },
  {
    title: 'Responsive design',
    text:
      'The website is designed to adapt across phone, tablet and desktop screen sizes.',
  },
  {
    title: 'Reduced motion',
    text:
      'Where supported by your device settings, unnecessary animations and transitions are reduced.',
  },
  {
    title: 'Clear focus states',
    text:
      'Interactive elements display visible keyboard focus indicators.',
  },
  {
    title: 'Continuous improvement',
    text:
      'Accessibility issues can be reported to ISR so they can be reviewed and corrected.',
  },
]

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/20">
      <Navbar />

      <main id="main-content">
        <section className="bg-isr-dark-red px-4 py-14 text-white sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-isr-yellow">
                Accessibility
              </p>

              <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
                Making ISR information easier to access
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/80 sm:text-lg">
                ISR aims to make its website usable across
                different devices, input methods and access
                needs.
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {commitments.map(
                (item) => (
                  <article
                    key={item.title}
                    className="isr-card p-6"
                  >
                    <h2 className="text-xl font-bold text-isr-dark-red">
                      {item.title}
                    </h2>

                    <p className="mt-3 text-sm leading-relaxed text-gray-700">
                      {item.text}
                    </p>
                  </article>
                ),
              )}
            </div>

            <section className="mt-10 rounded-[1.75rem] border border-isr-yellow bg-isr-yellow/35 p-6 sm:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-isr-turquoise">
                Found a problem?
              </p>

              <h2 className="mt-3 text-2xl font-bold text-isr-dark-red">
                Tell us what is not working
              </h2>

              <p className="mt-4 max-w-3xl leading-relaxed text-gray-700">
                If you cannot access information, use a
                control, read content clearly or complete a
                task on the ISR website, please tell us what
                page you were using and what happened.
              </p>

              <a
                href={mailto(
                  'ISR Website Accessibility Issue',
                )}
                className="isr-button-primary mt-6"
              >
                Report an accessibility issue
              </a>
            </section>

            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              <article className="rounded-[1.75rem] bg-isr-cream/65 p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-isr-dark-red">
                  Need information another way?
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-gray-700">
                  Contact ISR if information on the website
                  is inaccessible to you and you need help
                  obtaining it through another practical
                  format or channel.
                </p>

                <Link
                  href="/contact"
                  className="isr-text-link mt-6"
                >
                  Contact ISR →
                </Link>
              </article>

              <article className="rounded-[1.75rem] bg-isr-dark-red p-6 text-white sm:p-8">
                <h2 className="text-2xl font-bold">
                  Event accessibility
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-white/75">
                  Event-specific access information should
                  be included on event pages where
                  available. Contact ISR before attending if
                  you need clarification.
                </p>

                <Link
                  href="/events"
                  className="mt-6 inline-flex font-bold text-isr-yellow"
                >
                  Browse events →
                </Link>
              </article>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
