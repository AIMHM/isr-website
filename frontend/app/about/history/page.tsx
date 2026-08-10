import type {
  Metadata,
} from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  HISTORY_CONFIDENCE_LABELS,
  HISTORY_RESEARCH_LEADS,
  HISTORY_SOURCES,
  HISTORY_TIMELINE,
  historySourcesFor,
  type HistoryConfidence,
} from '@/lib/history'
import {
  mailto,
} from '@/lib/siteContent'

export const metadata: Metadata = {
  title: 'Our History',
  description:
    'Explore the documented history of Muslim student life, RMITIS and the Islamic Society of RMIT.',
}

const confidenceClasses: Record<
  HistoryConfidence,
  string
> = {
  A: 'bg-emerald-100 text-emerald-800',
  B: 'bg-isr-light-blue/25 text-isr-dark-red',
  C: 'bg-isr-yellow/60 text-isr-dark-red',
  D: 'bg-gray-100 text-gray-700',
}

export default function HistoryPage() {
  const publicTimeline =
    HISTORY_TIMELINE.filter(
      (entry) =>
        entry.publicReady,
    )

  return (
    <div className="min-h-screen bg-gradient-to-b from-isr-cream via-white to-isr-yellow/20">
      <Navbar />

      <main id="main-content">
        <section className="px-4 py-14 sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-isr-turquoise">
                ISR Heritage
              </p>

              <h1 className="mt-3 text-4xl font-bold leading-tight text-isr-dark-red sm:text-5xl lg:text-6xl">
                The history of Muslim student life at RMIT
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-gray-700 sm:text-xl">
                Muslim student life at RMIT has a documented
                history spanning decades. This archive follows
                the development of prayer spaces, RMITIS,
                major advocacy campaigns, community programs,
                inter-university work and the emergence of
                today&apos;s Islamic Society of RMIT.
              </p>

              <div className="mt-8 rounded-2xl border border-isr-yellow bg-isr-yellow/35 p-5 text-sm leading-relaxed text-isr-dark-red">
                <strong>
                  A note on the founding year:
                </strong>{' '}
                evidence points to dedicated Muslim prayer
                infrastructure at RMIT from approximately the
                early 1990s, but we have not yet recovered a
                primary record proving the exact date the
                Society itself was established. ISR will not
                invent a founding year to fill that gap.
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-isr-turquoise">
                  How this archive works
                </p>

                <h2 className="mt-3 text-3xl font-bold text-isr-dark-red">
                  History with an evidence trail
                </h2>

                <p className="mt-4 leading-relaxed text-gray-700">
                  Historical records are not all equally
                  reliable. The source register distinguishes
                  primary records from independent research,
                  supporting historical material and leads that
                  still require corroboration.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {(
                  Object.entries(
                    HISTORY_CONFIDENCE_LABELS,
                  ) as [
                    HistoryConfidence,
                    string,
                  ][]
                ).map(
                  ([
                    grade,
                    label,
                  ]) => (
                    <div
                      key={grade}
                      className="isr-card p-5"
                    >
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${confidenceClasses[grade]}`}
                      >
                        Grade {grade}
                      </span>

                      <p className="mt-3 text-sm font-semibold text-isr-dark-red">
                        {label}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </div>

            <p className="mt-8 text-sm leading-relaxed text-gray-600">
              Contested events are attributed to the source
              reporting them. Political or advocacy activity is
              recorded as the action of a particular historical
              committee or period and is not automatically
              treated as a permanent position of ISR.
            </p>
          </div>
        </section>

        <section className="px-4 py-16 sm:py-20">
          <div className="container-isr mx-auto max-w-5xl">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-isr-turquoise">
                Chronology
              </p>

              <h2 className="mt-3 text-3xl font-bold text-isr-dark-red sm:text-4xl">
                A community built over decades
              </h2>

              <p className="mt-4 leading-relaxed text-gray-700">
                The timeline below separates what the evidence
                establishes from what remains under research.
              </p>
            </div>

            <div className="mt-12 space-y-6">
              {publicTimeline.map(
                (entry) => {
                  const sources =
                    historySourcesFor(
                      entry.sourceIds,
                    )

                  return (
                    <article
                      key={entry.id}
                      id={entry.id}
                      className="isr-card scroll-mt-32 overflow-hidden"
                    >
                      <div className="grid lg:grid-cols-[180px_1fr]">
                        <div className="bg-isr-dark-red p-6 text-white">
                          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-isr-yellow">
                            {entry.period}
                          </p>
                        </div>

                        <div className="p-6 sm:p-8">
                          <h3 className="text-2xl font-bold text-isr-dark-red">
                            {entry.title}
                          </h3>

                          <p className="mt-4 text-base leading-relaxed text-gray-700">
                            {entry.summary}
                          </p>

                          <div className="mt-6 space-y-3">
                            {entry.details.map(
                              (detail) => (
                                <p
                                  key={detail}
                                  className="border-l-2 border-isr-light-blue/40 pl-4 text-sm leading-relaxed text-gray-700"
                                >
                                  {detail}
                                </p>
                              ),
                            )}
                          </div>

                          {sources.length >
                            0 && (
                            <div className="mt-7 border-t border-isr-light-blue/20 pt-5">
                              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                Evidence
                              </p>

                              <div className="mt-3 flex flex-wrap gap-2">
                                {sources.map(
                                  (
                                    source,
                                  ) => (
                                    <a
                                      key={
                                        source.id
                                      }
                                      href={
                                        source.url
                                      }
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-2 rounded-full border border-isr-light-blue/30 bg-white px-3 py-2 text-xs font-semibold text-isr-dark-red transition hover:border-isr-turquoise"
                                    >
                                      <span
                                        className={`rounded-full px-2 py-0.5 ${confidenceClasses[source.confidence]}`}
                                      >
                                        {
                                          source.confidence
                                        }
                                      </span>
                                      {
                                        source.publisher
                                      }
                                    </a>
                                  ),
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </article>
                  )
                },
              )}
            </div>
          </div>
        </section>

        <section className="bg-isr-dark-red px-4 py-16 text-white sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-isr-yellow">
                2007–2009
              </p>

              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                The prayer-room campaign
              </h2>

              <p className="mt-5 text-lg leading-relaxed text-white/80">
                The most extensively documented episode in
                RMITIS history began after the loss of the
                long-standing dedicated City prayer facility.
                What followed was an approximately 18-month
                dispute over the nature, adequacy and access
                arrangements of its replacement.
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              <article className="rounded-3xl bg-white/10 p-6">
                <p className="text-sm font-semibold text-isr-yellow">
                  RMITIS position
                </p>

                <p className="mt-3 text-sm leading-relaxed text-white/80">
                  RMITIS argued that Muslim students had lost
                  a long-standing dedicated facility and that
                  shared or restricted replacement
                  arrangements did not meet the community&apos;s
                  practical religious needs.
                </p>
              </article>

              <article className="rounded-3xl bg-white/10 p-6">
                <p className="text-sm font-semibold text-isr-yellow">
                  RMIT position
                </p>

                <p className="mt-3 text-sm leading-relaxed text-white/80">
                  Contemporary reporting records RMIT arguing
                  that it had invested substantially in
                  religious facilities and had made significant
                  efforts to accommodate Muslim students.
                </p>
              </article>

              <article className="rounded-3xl bg-white/10 p-6">
                <p className="text-sm font-semibold text-isr-yellow">
                  Historical significance
                </p>

                <p className="mt-3 text-sm leading-relaxed text-white/80">
                  The dispute moved beyond campus through
                  public protest, national media coverage,
                  student-union solidarity and its appearance
                  in an Australian human-rights submission to
                  the UN High Commissioner for Human Rights.
                </p>
              </article>
            </div>

            <div className="mt-8 rounded-3xl border border-white/15 bg-white/5 p-6 sm:p-8">
              <h3 className="text-xl font-bold">
                Sensitive historical allegations
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-white/75">
                ABC reported during the dispute that a Muslim
                woman said she had been sexually assaulted
                while praying elsewhere. Other historical
                material also records allegations of
                harassment affecting Muslim women displaced
                from the former facilities. ISR preserves
                these matters with explicit attribution to the
                reporting source rather than presenting
                untested allegations as independently
                established findings.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-isr-turquoise">
                  A history of prayer at RMIT
                </p>

                <h2 className="mt-3 text-3xl font-bold text-isr-dark-red">
                  Spaces changed. The need remained.
                </h2>

                <div className="mt-6 space-y-4 text-sm leading-relaxed text-gray-700">
                  <p>
                    The available evidence points from an
                    early dedicated facility in roughly the
                    early 1990s, through the Building 9 era
                    and the 2007–09 dispute, to later prayer
                    arrangements and the opening of the
                    purpose-built Multifaith and Wellbeing
                    Centre in 2023.
                  </p>

                  <p>
                    Bundoora developed a separate visible
                    Muslim student presence, and today
                    Islamic prayer spaces are documented
                    across City, Bundoora East, Bundoora
                    West and Brunswick.
                  </p>

                  <p>
                    The archive deliberately avoids claiming
                    that the 2009 campaign directly caused
                    the 2023 centre because the available
                    evidence does not establish that direct
                    causal chain.
                  </p>
                </div>

                <Link
                  href="/pray"
                  className="isr-button-secondary mt-7"
                >
                  Current prayer information
                </Link>
              </div>

              <div className="isr-card bg-isr-cream/50 p-6 sm:p-8">
                <h3 className="text-2xl font-bold text-isr-dark-red">
                  The organisational story
                </h3>

                <div className="mt-5 space-y-4 text-sm leading-relaxed text-gray-700">
                  <p>
                    The early-2000s evidence documents a
                    mature RMIT Islamic Society delivering
                    Islamic education, resources,
                    conferences, media programs and Islamic
                    Awareness Week.
                  </p>

                  <p>
                    The following decades preserved Ramadan
                    programming, awareness activity,
                    advocacy, Bundoora organisation, Eid
                    celebrations and inter-university
                    collaboration.
                  </p>

                  <p>
                    In 2024, RMITIS publicly became ISR —
                    the Islamic Society of RMIT — creating
                    the present organisational identity
                    while continuing a much older Muslim
                    student legacy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-isr-turquoise">
                Research still in progress
              </p>

              <h2 className="mt-3 text-3xl font-bold text-isr-dark-red">
                What we still do not know
              </h2>

              <p className="mt-4 leading-relaxed text-gray-700">
                Missing evidence is recorded rather than
                silently filled with assumptions.
              </p>
            </div>

            <div className="mt-9 grid gap-5 md:grid-cols-2">
              {HISTORY_RESEARCH_LEADS.map(
                (lead) => (
                  <article
                    key={`${lead.period}-${lead.title}`}
                    className="isr-card p-6"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-700">
                        Grade {
                          lead.confidence
                        }
                      </span>

                      <span className="text-xs font-semibold uppercase tracking-wide text-isr-turquoise">
                        {lead.period}
                      </span>
                    </div>

                    <h3 className="mt-4 text-xl font-bold text-isr-dark-red">
                      {lead.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-gray-700">
                      {lead.note}
                    </p>
                  </article>
                ),
              )}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-isr-turquoise">
                Source register
              </p>

              <h2 className="mt-3 text-3xl font-bold text-isr-dark-red">
                Evidence behind the archive
              </h2>

              <p className="mt-4 leading-relaxed text-gray-700">
                Each source is graded according to what it
                can reliably establish. A Grade C or D source
                is not discarded; it is simply not given the
                same weight as a primary institutional record.
              </p>
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              {HISTORY_SOURCES.map(
                (source) => (
                  <article
                    key={source.id}
                    className="isr-card p-6"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${confidenceClasses[source.confidence]}`}
                      >
                        Grade {
                          source.confidence
                        }
                      </span>

                      <span className="text-xs font-semibold text-gray-500">
                        {source.year}
                      </span>
                    </div>

                    <h3 className="mt-4 text-lg font-bold text-isr-dark-red">
                      {source.title}
                    </h3>

                    <p className="mt-2 text-sm font-semibold text-isr-turquoise">
                      {source.publisher}
                    </p>

                    <p className="mt-4 text-sm leading-relaxed text-gray-700">
                      {source.note}
                    </p>

                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="isr-text-link mt-5"
                    >
                      View source
                      <span aria-hidden="true">
                        →
                      </span>
                    </a>
                  </article>
                ),
              )}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:py-20">
          <div className="container-isr mx-auto max-w-6xl">
            <div className="rounded-[2rem] bg-isr-dark-red px-6 py-10 text-white sm:px-10">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                <div className="max-w-3xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-isr-yellow">
                    Help preserve ISR history
                  </p>

                  <h2 className="mt-3 text-3xl font-bold">
                    Do you have old ISR or RMITIS records?
                  </h2>

                  <p className="mt-4 leading-relaxed text-white/80">
                    Former committee members, alumni and
                    community members may be able to fill
                    gaps in the record through old
                    constitutions, committee lists, minutes,
                    event posters, photographs, campaign
                    documents, websites or handover files.
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-white/65">
                    Please do not email private member lists,
                    passwords, identity documents or
                    confidential committee records without
                    first confirming an appropriate transfer
                    process with ISR.
                  </p>
                </div>

                <a
                  href={mailto(
                    'ISR Historical Archive Contribution',
                  )}
                  className="inline-flex rounded-full bg-white px-6 py-3 font-bold text-isr-dark-red transition hover:bg-isr-yellow"
                >
                  Contact ISR
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
