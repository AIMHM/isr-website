'use client'

export default function TourReplayButton() {
  function startTour() {
    window.dispatchEvent(
      new Event(
        'isr:tour:start',
      ),
    )
  }

  return (
    <button
      type="button"
      onClick={startTour}
      className="hover:text-white"
    >
      Website tour
    </button>
  )
}
