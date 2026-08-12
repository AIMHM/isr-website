export const MELBOURNE_TIME_ZONE =
  'Australia/Melbourne'

export function formatMelbourneDate(
  value: string | Date,
): string {
  return new Intl.DateTimeFormat(
    'en-AU',
    {
      timeZone:
        MELBOURNE_TIME_ZONE,
      day:
        'numeric',
      month:
        'long',
      year:
        'numeric',
    },
  ).format(
    typeof value === 'string'
      ? new Date(value)
      : value,
  )
}

export function formatMelbourneTime(
  value: string | Date,
): string {
  return new Intl.DateTimeFormat(
    'en-AU',
    {
      timeZone:
        MELBOURNE_TIME_ZONE,
      hour:
        'numeric',
      minute:
        '2-digit',
      hour12:
        true,
    },
  ).format(
    typeof value === 'string'
      ? new Date(value)
      : value,
  )
}
