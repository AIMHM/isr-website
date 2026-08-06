import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Accessibility | Islamic Society of RMIT',
  description:
    'Accessibility information for the Islamic Society of RMIT website and activities.',
}

const commitments = [
  'Keyboard-accessible navigation and controls',
  'Visible keyboard focus indicators',
  'Readable colour contrast and text sizing',
  'Clear headings, labels and instructions',
  'Text alternatives for meaningful images',
  'No information communicated by colour alone',
  'Reduced-motion support where animation is used',
  'Responsive content without loss at enlarged text sizes',
  'Accessible error and success messages',
  'Clear pathways for requesting event adjustments',
]

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/20">
      <Navbar />

      <main id="main-content" className="px-4 py-16 sm:py-20">
        <div className="container-isr mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-isr-turquoise">
            Inclusive access
          </p>

          <h1 className="mt-3 text-4xl font-bold text-isr-dark-red sm:text-5xl">
            Accessibility
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-gray-700">
            ISR aims to make its website, information and activities usable by
            as many students as reasonably possible.
          </p>

          <div className="mt-6 rounded-2xl border border-isr-bright-red/20 bg-isr-yellow/50 p-4 text-sm font-semibold text-isr-dark-red">
            Prototype only: final accessibility responsibilities and response
            procedures require ISR approval.
          </div>

          <section className="mt-12">
            <h2 className="text-3xl font-bold text-isr-dark-red">
              Website commitments
            </h2>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {commitments.map((commitment) => (
                <li
                  key={commitment}
                  className="rounded-2xl border border-isr-light-blue/30 bg-white p-4 text-sm font-semibold text-isr-dark-red"
                >
                  {commitment}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12 rounded-3xl border border-isr-light-blue/30 bg-isr-cream/50 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-isr-dark-red">
              Requesting an adjustment
            </h2>
            <p className="mt-3 leading-relaxed text-gray-700">
              Event pages should provide a clear method for requesting
              reasonable accessibility adjustments. Requests should be handled
              respectfully and shared only with those responsible for making
              the arrangement.
            </p>
          </section>

          <section className="mt-12 rounded-3xl bg-isr-dark-red p-6 text-white sm:p-8">
            <h2 className="text-2xl font-bold">
              Report an accessibility problem
            </h2>
            <p className="mt-3 leading-relaxed text-white/80">
              Include the page, feature or event involved and describe what
              prevented access. Avoid including unnecessary sensitive
              information.
            </p>
            <a
              href="mailto:isr@rmit.edu.au?subject=ISR%20Accessibility%20Issue"
              className="mt-6 inline-block rounded-full bg-white px-5 py-2.5 font-semibold text-isr-dark-red hover:bg-isr-yellow"
            >
              Email ISR
            </a>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
