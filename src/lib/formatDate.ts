const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const

/**
 * Deterministic date formatting for hydration safety.
 * Expects YYYY-MM-DD and returns "Mon DD, YYYY" (e.g. "Jan 10, 2026").
 * If the input doesn't match YYYY-MM-DD, returns it unchanged.
 */
export function formatDateYmd(date?: string): string {
  if (!date) return ''
  const s = String(date).trim()

  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s)
  if (!m) return s

  const year = m[1]
  const monthNum = Number(m[2])
  const day = m[3]

  const mon = MONTHS[monthNum - 1] ?? m[2]
  return `${mon} ${day}, ${year}`
}
