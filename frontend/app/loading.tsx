export default function Loading() {
  return (
    <main
      aria-busy="true"
      aria-live="polite"
      className="min-h-[55vh] px-4 py-16"
    >
      <div className="container-isr mx-auto max-w-7xl">
        <span className="sr-only">
          Loading page
        </span>

        <div className="animate-pulse">
          <div className="h-4 w-28 rounded-full bg-isr-light-blue/30" />

          <div className="mt-5 h-12 max-w-xl rounded-2xl bg-isr-cream" />

          <div className="mt-4 h-5 max-w-2xl rounded-xl bg-isr-cream" />

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map(
              (item) => (
                <div
                  key={item}
                  className="h-64 rounded-3xl bg-isr-cream"
                />
              ),
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
