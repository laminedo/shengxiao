// Dates are written in English, in the order the reader's region uses.
function region(): string {
  try {
    return new Intl.Locale(navigator.language).maximize().region ?? 'GB'
  } catch {
    return 'GB'
  }
}

export const LOCALE = `en-${region()}`

export const fmt = (date: Date, options: Intl.DateTimeFormatOptions) => date.toLocaleDateString(LOCALE, options)
export const weekday = (date: Date) => fmt(date, { weekday: 'long' })
export const shortDate = (date: Date) => fmt(date, { day: 'numeric', month: 'short' })
export const longDate = (date: Date) => fmt(date, { weekday: 'long', day: 'numeric', month: 'long' })
export const monthName = (date: Date) => fmt(date, { month: 'long' })

export function ordinal(n: number): string {
  const tens = n % 100
  const suffix = tens >= 11 && tens <= 13 ? 'th' : ['th', 'st', 'nd', 'rd'][n % 10] ?? 'th'
  return `${n}${suffix}`
}

/** "Tuesday the 7th" */
export const dayOfMonth = (date: Date) => `${weekday(date)} the ${ordinal(date.getDate())}`

export const addDays = (date: Date, n: number) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + n)
export const sameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString()
export const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate())

/** Whole days since 1 January 1970, counted on the local calendar. */
export const dayNumber = (date: Date) => Math.round(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000)

// The first day of the week in the reader's region (0 = Sunday); Monday where the browser cannot say.
const FIRST_DAY = (() => {
  try {
    const locale = new Intl.Locale(navigator.language) as Intl.Locale & {
      getWeekInfo?: () => { firstDay: number }
      weekInfo?: { firstDay: number }
    }
    return (locale.getWeekInfo?.().firstDay ?? locale.weekInfo?.firstDay ?? 1) % 7
  } catch {
    return 1
  }
})()

export const weekStart = (date: Date) => addDays(date, -((date.getDay() - FIRST_DAY + 7) % 7))

export function joinList(items: string[]): string {
  if (items.length <= 1) return items.join('')
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`
}
