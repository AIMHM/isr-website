type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
  id?: string
  inverse?: boolean
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  id,
  inverse = false,
}: SectionHeadingProps) {
  const centered = align === 'center'

  return (
    <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p
        className={`text-sm font-semibold uppercase tracking-[0.18em] ${
          inverse ? 'text-isr-yellow' : 'text-isr-turquoise'
        }`}
      >
        {eyebrow}
      </p>

      <h2
        id={id}
        className={`mt-3 text-3xl font-bold sm:text-4xl ${
          inverse ? 'text-white' : 'text-isr-dark-red'
        }`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mt-4 leading-relaxed ${
            inverse ? 'text-white/80' : 'text-gray-700'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  )
}
