import Link from 'next/link'

const EMAIL =
  'isr@rmit.edu.au'

const SUBJECT =
  encodeURIComponent(
    'Prayer space information / access issue',
  )

const BODY =
  encodeURIComponent(
    [
      'Assalamu alaikum,',
      '',
      'I would like to report an issue relating to an RMIT prayer space.',
      '',
      'Campus:',
      'Building / room:',
      'What appears to be incorrect or unavailable:',
      '',
      'Jazakum Allahu khayran.',
    ].join(
      '\n',
    ),
  )

export default function PrayerIssueReporter() {
  return (
    <section
      aria-labelledby="prayer-issue-heading"
      className="isr-prayer-issue-card"
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-isr-turquoise">
            Help keep this accurate
          </p>

          <h2
            id="prayer-issue-heading"
            className="mt-3 text-2xl font-bold text-isr-dark-red sm:text-3xl"
          >
            Something wrong with a prayer-space detail?
          </h2>

          <p className="mt-3 max-w-2xl leading-relaxed text-gray-700">
            If a room, access detail, facility note or
            prayer-space direction appears incorrect, tell ISR
            so the information can be checked.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <a
            href={
              'mailto:' +
              EMAIL +
              '?subject=' +
              SUBJECT +
              '&body=' +
              BODY
            }
            className="isr-button-primary text-center"
          >
            Report by email
          </a>

          <Link
            href="/contact"
            className="isr-button-secondary text-center"
          >
            Contact ISR
          </Link>
        </div>
      </div>
    </section>
  )
}
