import { IS_LOCAL_MOCK_DATA } from '@/lib/mockMode'

export default function LocalDemoBanner() {
  if (!IS_LOCAL_MOCK_DATA) return null

  return (
    <div
      role="status"
      className="relative z-[60] border-b border-isr-bright-red/30 bg-isr-yellow px-4 py-2 text-center text-xs font-semibold leading-relaxed text-isr-dark-red sm:text-sm"
    >
      Local preview only — information may be unverified. Nothing shown here
      has been published or applied to the live ISR website.
    </div>
  )
}
