import { IS_LOCAL_MOCK_DATA } from '@/lib/mockMode'

export default function LocalDemoBanner() {
  if (!IS_LOCAL_MOCK_DATA) return null

  return (
    <div
      role="status"
      className="relative z-[60] border-b border-isr-bright-red/30 bg-isr-yellow px-4 py-2 text-center text-sm font-semibold text-isr-dark-red"
    >
      Local demo data — not official or verified. Nothing on this preview has
      been published.
    </div>
  )
}
