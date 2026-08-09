import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SectionHeading from '@/components/SectionHeading'

export const metadata: Metadata = {
  title: 'Accessibility',
  description:
    'Accessibility information for the Islamic Society of RMIT website and activities.',
}

const commitments = [
  'Keyboard-accessible navigation and controls',
  'Visible keyboard focus indicators',
  'Readable colour contrast and text sizing',
  'Logical heading structures and page landmarks',
  'Text alternatives for meaningful images',
  'No essential information communicated by colour alone',
  'Reduced-motion support where animation is used',
  'Responsive content at smaller and enlarged viewports',
  'Accessible error, loading and status messages',
  'Clear pathways for requesting event adjustments',
]

const reviewAreas = [
  ['Keyboard', 'Navigate all interactive controls without a mouse'],
  ['Focus', 'Ensure the current keyboard target is always visible'],
  ['Headings', 'Maintain a logical content hierarchy'],
  ['Images', 'Use appropriate alternative text or decorative treatment'],
  ['Zoom', 'Check content remains usable at enlarged text and viewport sizes'],
  ['Motion', 'Respect reduced-motion preferences'],
  ['Forms', 'Associate labels, instructions and error messages correctly'],
  ['Events', 'Provide a practical pathway for requesting adjustments'],
]

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/20">
      <Navbar />

      <main id="main-content" className="px-4 py-14 sm:py-20">
        <div className="container-isr mx-auto max-w-5xl">
          <header className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-isr-turquoise">
              Inclusive access
            </p>

            <h1 className="mt-3 text-4xl font-bold text-isr-dark-red sm:text-5xl">
              Accessibility
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-gray-700">
              ISR aims to make its digital information and activities usable by
              as many students as reasonably possible.
            </p>

            <div className="mt-6 rounded-2xl border border-isr-yellow bg-isr-yellow/50 p-4 text-sm font-semibold leading-relaxed text-isr-dark-red">
              Local prototype only. Final accessibility responsibilities,
              adjustment procedures and service commitments require approval.
            </div>
          </header>

          <section
            aria-labelledby="accessibility-commitments"
            className="mt-14"
          >
            <SectionHeading
              eyebrow="Website commitments"
              title="Building for inclusive access"
              description="Accessibility should be considered throughout design, content, development and event planning rather than added only after problems occur."
              id="accessibility-commitments"
            />

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {commitments.map((commitment) => (
                <li
                  key={commitment}
                  className="isr-card p-5 text-sm font-semibold leading-relaxed text-isr-dark-red"
                >
                  {commitment}
                </li>
              ))}
            </ul>
          </section>

          <section
            aria-labelledby="accessibility-review"
            className="isr-card mt-14 bg-isr-cream/45 p-6 sm:p-8"
          >
            <SectionHeading
              eyebrow="Quality assurance"
              title="Accessibility review checklist"
              description="These checks should be repeated after significant design or content changes."
              id="accessibility-review"
            />

            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              {reviewAreas.map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl bg-white p-4"
                >
                  <dt className="font-bold text-isr-dark-red">
                    {label}
                  </dt>

                  <dd className="mt-2 text-sm leading-relaxed text-gray-700">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="isr-card mt-14 border-isr-yellow bg-isr-yellow/35 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-isr-dark-red">
              Requesting an adjustment
            </h2>

            <p className="mt-3 leading-relaxed text-gray-700">
              Event information should provide a clear method for requesting
              reasonable accessibility adjustments. Requests should be handled
              respectfully and shared only with people responsible for making
              the arrangement.
            </p>
          </section>

          <section className="mt-14 overflow-hidden rounded-[2rem] bg-isr-dark-red p-6 text-white shadow-[0_20px_55px_rgba(91,11,5,0.14)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-isr-yellow">
              Accessibility feedback
            </p>

            <h2 className="mt-3 text-2xl font-bold">
              Report an accessibility problem
            </h2>

            <p className="mt-3 max-w-3xl leading-relaxed text-white/80">
              Include the page, feature or event involved and describe what
              prevented access. Avoid including unnecessary sensitive
              information.
            </p>

            <a
              href="mailto:isr@rmit.edu.au?subject=ISR%20Accessibility%20Issue"
              className="mt-6 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-isr-dark-red transition hover:bg-isr-yellow"
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
