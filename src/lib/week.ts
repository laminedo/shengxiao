// The weekly reading.
import { TERM_NOTES } from '../content/dayNotes'
import { AREAS, AREA_LABELS, type Level } from '../content/types'
import { AREA_HINTS, GOD_HINTS, GOD_WATCH, WEEK_AREAS, WEEK_BEST, WEEK_FLAT, WEEK_FOCUS, WEEK_LET_GO, WEEK_LOW, WEEK_MOON, WEEK_OVERVIEWS, WEEK_PHASES, type Arc, type Height } from '../content/week'
import { baseline, dayCore, type AreaReading, type DayCore } from './day'
import { addDays, dayNumber, fmt, weekStart, weekday } from './dates'
import { BRANCHES, ELEMENTS, GROUPS, TEN_GODS, termName } from './glossary'
import { fill, keep, taker, type Take } from './pick'
import { signName, type Subject } from './subject'

export interface CalendarEvent {
  date: Date
  label: string
  text: string
}

export interface WeekReading {
  start: Date
  days: DayCore[]
  average: number
  /** How the week compares with this reader's usual week. */
  mood: string
  title: string
  overview: string
  /** The week as runs of days that share a theme. */
  phases: { label: string; days: string; text: string }[]
  best: DayCore | null
  low: DayCore | null
  keyDays: string[]
  areas: AreaReading[]
  focus: string
  letGo: string
  events: CalendarEvent[]
  spoken: string
}

const HEIGHTS: Record<Height, string> = { bright: 'Above your usual', steady: 'A usual week', careful: 'Below your usual' }

const mean = (values: number[]) => values.reduce((sum, v) => sum + v, 0) / values.length
const scores = (days: DayCore[]) => days.map(d => d.score)

function arcOf(days: DayCore[]): Arc {
  const s = scores(days)
  const drift = mean(s.slice(4)) - mean(s.slice(0, 3))
  const bulge = mean(s.slice(2, 5)) - mean([s[0], s[1], s[5], s[6]])
  if (Math.abs(drift) < 6 && Math.abs(bulge) < 6) return 'even'
  if (Math.abs(bulge) > Math.abs(drift)) return bulge > 0 ? 'peak' : 'dip'
  return drift > 0 ? 'rising' : 'falling'
}

function compose(subject: Subject, start: Date, take: Take): WeekReading {
  const days = Array.from({ length: 7 }, (_, i) => dayCore(subject, addDays(start, i)))
  const average = Math.round(mean(scores(days)))
  // Seven days always hold most of the ten stems, so weeks differ from each other far less
  // than days do. A week is therefore judged against this reader's own usual week.
  const usual = baseline(subject, start.getFullYear())
  const lift = mean(scores(days)) - usual.score
  const height: Height = lift >= 2.5 ? 'bright' : lift <= -2.5 ? 'careful' : 'steady'
  const arc = arcOf(days)
  const overview = take(`overview:${arc}:${height}`, WEEK_OVERVIEWS[arc][height])
  const sign = BRANCHES[subject.animal].animal
  const name = (day: DayCore) => weekday(day.info.date)

  // Each Ten God group lasts two days, so a week is three or four runs.
  const runs: DayCore[][] = []
  for (const day of days) {
    const last = runs[runs.length - 1]
    if (last && last[0].group === day.group) last.push(day)
    else runs.push([day])
  }
  const phases = runs.map(run => ({
    label: GROUPS[run[0].group],
    days: run.map(name).join(' and '),
    text: take(`phase:${run[0].group}`, WEEK_PHASES[run[0].group]),
  }))

  let best: DayCore | null = days.reduce((a, b) => (b.score > a.score ? b : a))
  let low: DayCore | null = days.reduce((a, b) => (b.score < a.score ? b : a))
  const keyDays: string[] = []
  if (best.score - low.score < 8) {
    best = low = null
    keyDays.push(take('flat', WEEK_FLAT))
  } else {
    const slots = (day: DayCore) => ({
      weekday: name(day),
      animal: BRANCHES[day.info.branch].animal,
      sign,
      el: day.element ? ELEMENTS[day.element.el].name : '',
      god: TEN_GODS[day.god].plain,
      hint: GOD_HINTS[day.god],
      watch: GOD_WATCH[day.god],
    })
    const why = best.relSign === 'six' ? 'six' : best.relSign === 'three' ? 'three' : best.element?.kind === 'welcome' ? 'element' : 'theme'
    keyDays.push(fill(take(`best:${why}`, WEEK_BEST[why]), slots(best)))
    const whyLow = low.relSign === 'clash' ? 'clash' : low.relSign === 'harm' ? 'harm' : low.element?.kind === 'excess' ? 'element' : 'theme'
    keyDays.push(fill(take(`low:${whyLow}`, WEEK_LOW[whyLow]), slots(low)))
  }

  // Each part of life is pointed at its own day where the ratings allow, so that one
  // strong day is not recommended for everything.
  const taken = new Set<DayCore>()
  const areas = AREAS.map((key, i) => {
    const gap = mean(days.map(d => d.ratings[i])) - usual.ratings[i]
    const band: Level = gap >= 0.2 ? 'strong' : gap <= -0.2 ? 'soft' : 'steady'
    const ranked = [...days].sort((a, b) => b.ratings[i] - a.ratings[i] || b.score - a.score)
    const top = ranked.find(day => !taken.has(day) && day.ratings[i] >= ranked[0].ratings[i] - 1) ?? ranked[0]
    taken.add(top)
    return {
      key,
      label: AREA_LABELS[key],
      rating: 3 + (gap >= 0.4 ? 2 : gap >= 0.2 ? 1 : gap <= -0.4 ? -2 : gap <= -0.2 ? -1 : 0),
      text: fill(take(`${key}:${band}`, WEEK_AREAS[key][band]), { best: name(top), hint: AREA_HINTS[key][top.group] }),
    }
  })

  // The run that holds the middle day sets the week's focus.
  const centre = days[3].group
  const focus = take(`focus:${centre}`, WEEK_FOCUS[centre])
  const letGo = take(`letgo:${centre}`, WEEK_LET_GO[centre])

  const events: CalendarEvent[] = []
  for (const day of days) {
    const { moon, term, date } = day.info
    if (moon) events.push({ date, label: moon === 'new' ? 'New moon' : 'Full moon', text: fill(take(`moon:${moon}`, WEEK_MOON[moon]), { weekday: name(day) }) })
    if (term) events.push({ date, label: termName(term), text: TERM_NOTES[term] })
  }

  const range = `${fmt(start, { day: 'numeric', month: 'long' })} to ${fmt(addDays(start, 6), { day: 'numeric', month: 'long' })}`
  const spoken = [
    `Your weekly reading, ${range}, for the ${signName(subject)}.`,
    `Average energy ${average} out of 100: ${HEIGHTS[height].toLowerCase()}.`,
    `${overview.title}.`,
    overview.text,
    ...phases.map(phase => `${phase.days}: ${phase.label}. ${phase.text}`),
    ...keyDays,
    ...areas.map(area => `${area.label}. ${area.text}`),
    `This week's focus. ${focus}`,
    `Let go of this. ${letGo}`,
    ...events.map(event => `${event.label}. ${event.text}`),
  ].join(' ')

  return { start, days, average, mood: HEIGHTS[height], title: overview.title, overview: overview.text, phases, best, low, keyDays, areas, focus, letGo, events, spoken }
}

const years = keep<WeekReading[]>(6)

/** Every week that starts within a calendar year, written in order. */
function yearOfWeeks(subject: Subject, year: number): WeekReading[] {
  return years(`${subject.key}|${year}`, () => {
    const take = taker(`week|${subject.key}|${year}`)
    const readings: WeekReading[] = []
    for (let start = weekStart(new Date(year, 0, 7)); start.getFullYear() === year; start = addDays(start, 7)) {
      readings.push(compose(subject, start, take))
    }
    return readings
  })
}

export function weekReading(subject: Subject, date: Date): WeekReading {
  const start = weekStart(date)
  const weeks = yearOfWeeks(subject, start.getFullYear())
  return weeks[Math.round((dayNumber(start) - dayNumber(weeks[0].start)) / 7)]
}
