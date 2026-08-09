import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Governance & Policies',
  description:
    'Public governance and policy information for the Islamic Society of RMIT.',
}

const items = [
  {
    title: 'Constitution',
    description:
      'The current governing document should be published here once the approved version is verified.',
  },
  {
    title: 'Code of Conduct',
    description:
      'Public conduct expectations should be linked here once approved.',
  },
  {
    title: 'Complaints',
    description:
      'A clear complaints pathway should be published once the approved process is confirmed.',
  },
  {
    title: 'Privacy',
    description:
      'How website and society information should be handled.',
    href: '/privacy',
  },
  {
    title: 'Accessibility',
    description:
      'Website accessibility and pathways for requesting adjustments.',
    href: '/accessibility',
  },
  {
    title: 'AGM and Elections',
    description:
      'Relevant notices and public election information can be published here when required.',
  },
]

export default function GovernancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/20">
      <Navbar />

      <main id="main-content" className="px-4 py-14 sm:py-20">
        <div className="container-isr mx-auto max-w-6xl">
          <header className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-isr-turquoise">
              Public information
            </p>

            <h1 className="mt-3 text-4xl font-bold text-isr-dark-red sm:text-5xl">
              Governance & Policies
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-gray-700">
              A simple place for public ISR governance documents and policies
              that students may need to access.
            </p>

            <div className="mt-6 rounded-2xl border border-isr-yellow bg-isr-yellow/45 p-4 text-sm leading-relaxed text-isr-dark-red">
              Final controlled governance documents have not yet been verified
              for publication in this local prototype.
            </div>
          </header>

          <section className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => {
              const content = (
                <>
                  <h2 className="text-xl font-bold text-isr-dark-red">
                    {item.title}
                  </h2>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-700">
                    {item.description}
                  </p>

                  {item.href && (
                    <span className="isr-text-link mt-6">
                      Open
                      <span aria-hidden="true">→</span>
                    </span>
                  )}
                </>
              )

              return item.href ? (
                <Link
                  key={item.title}
                  href={item.href}
                  className="isr-card isr-card-interactive flex flex-col p-6"
                >
                  {content}
                </Link>
              ) : (
                <article
                  key={item.title}
                  className="isr-card flex flex-col p-6"
                >
                  {content}
                </article>
              )
            })}
          </section>

          <section className="mt-16 rounded-[2rem] bg-isr-dark-red px-6 py-9 text-white sm:px-9">
            <h2 className="text-3xl font-bold">
              Governance enquiry
            </h2>

            <p className="mt-4 max-w-2xl leading-relaxed text-white/80">
              Contact ISR for general questions about membership, governance or
              public society documents.
            </p>

            <a
              href="mailto:isr@rmit.edu.au?subject=ISR%20Governance%20Enquiry"
              className="mt-7 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-isr-dark-red transition hover:bg-isr-yellow"
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
