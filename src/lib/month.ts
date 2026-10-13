// The monthly reading.
import { RELATION_TAGS, TERM_NOTES } from '../content/dayNotes'
import { MONTH_COUNSEL, MONTH_ELEMENT, MONTH_SEASONS, MONTH_SEAT, MONTH_SIGN, MONTH_THEMES, MONTH_THIRDS } from '../content/month'
import { MONTH_AREAS } from '../content/monthAreas'
import { AREAS, AREA_LABELS, type Level } from '../content/types'
import { MONTH_DONTS, MONTH_DOS, YEAR_SIGN, YEAR_THEMES } from '../content/year'
import { monthPillar } from './calendar'
import { dayCore, type AreaReading, type DayCore, type Note } from './day'
import { dayOfMonth, fmt, joinList, ordinal, shortDate } from './dates'
import { BRANCHES, ELEMENTS, STEMS, pillarName, termName } from './glossary'
import { fill, keep, taker, type Take } from './pick'
import { moodFor, standing, type Standing } from './standing'
import { selfElement, signName, type Subject } from './subject'
import type { CalendarEvent } from './week'

export interface MonthReading extends Standing {
  year: number
  month: number
  days: DayCore[]
  stem: number
  branch: number
  /** The day the month's pillar took over. */
  since: Date
  mood: string
  title: string
  theme: string[]
  season: string
  /** The year the month sits in: its name, then how it meets the reader's sign and element. */
  yearName: string
  yearText: string[]
  notes: Note[]
  thirds: { label: string; range: string; level: Level; text: string }[]
  areas: AreaReading[]
  counsel: string
  dos: string[]
  donts: string[]
  best: DayCore[]
  low: DayCore[]
  events: CalendarEvent[]
  spoken: string
}

const mean = (days: DayCore[]) => days.reduce((sum, d) => sum + d.score, 0) / days.length
const byDate = (days: DayCore[]) => [...days].sort((a, b) => a.info.n - b.info.n)

function compose(subject: Subject, year: number, month: number, take: Take): MonthReading {
  const length = new Date(year, month + 1, 0).getDate()
  const days = Array.from({ length }, (_, i) => dayCore(subject, new Date(year, month, i + 1)))
  const pillar = monthPillar(year, month)
  const stood = standing(subject, pillar.stem, pillar.branch)
  const slots = {
    self: ELEMENTS[selfElement(subject)].name,
    month: ELEMENTS[STEMS[pillar.stem].element].name,
    animal: BRANCHES[pillar.branch].animal,
    sign: BRANCHES[subject.animal].animal,
    seat: subject.seat === null ? '' : BRANCHES[subject.seat].animal,
  }

  const theme = MONTH_THEMES[stood.god]

  // The year in force at mid-month, counted from the Lunar New Year.
  const { yearStem, yearBranch } = days[14].info
  const yearStood = standing(subject, yearStem, yearBranch)
  const yearSlots = { ...slots, animal: BRANCHES[yearBranch].animal, year: ELEMENTS[STEMS[yearStem].element].name }
  const yearText = [fill(YEAR_SIGN[yearStood.relSign], yearSlots), fill(YEAR_THEMES[yearStood.god], yearSlots)]
  const kindly = (rel: string) => (rel === 'six' || rel === 'three' ? 'good' : rel === 'same' ? 'plain' : 'care')

  const notes: Note[] = []
  if (stood.relSign !== 'none') {
    const passage = take(`sign:${stood.relSign}`, MONTH_SIGN[stood.relSign])
    notes.push({ tag: RELATION_TAGS[stood.relSign], title: fill(passage.title, slots), text: fill(passage.text, slots), tone: kindly(stood.relSign) })
  }
  if (stood.relSeat !== 'none' && subject.seat !== subject.animal) {
    const passage = take(`seat:${stood.relSeat}`, MONTH_SEAT[stood.relSeat])
    notes.push({ tag: 'Day sign', title: fill(passage.title, slots), text: fill(passage.text, slots), tone: kindly(stood.relSeat) })
  }
  if (stood.element) {
    const el = ELEMENTS[stood.element.el].name
    const welcome = stood.element.kind === 'welcome'
    notes.push({
      tag: 'Element',
      title: welcome ? `${el} in your favour` : `A surplus of ${el}`,
      text: fill(take(`element:${stood.element.kind}`, MONTH_ELEMENT[stood.element.kind]), { el }),
      tone: welcome ? 'good' : 'care',
    })
  }

  const overall = mean(days)
  const thirds = ([['opening', 0, 10], ['middle', 10, 20], ['closing', 20, length]] as const).map(([part, from, to]) => {
    const stretch = days.slice(from, to)
    const gap = mean(stretch) - overall
    const level: Level = gap >= 0.9 ? 'strong' : gap <= -0.9 ? 'soft' : 'steady'
    const best = stretch.reduce((a, b) => (b.score > a.score ? b : a))
    const low = stretch.reduce((a, b) => (b.score < a.score ? b : a))
    return {
      label: part[0].toUpperCase() + part.slice(1),
      range: `${ordinal(from + 1)} to ${ordinal(to)}`,
      level,
      text: fill(take(`${part}:${level}`, MONTH_THIRDS[part][level]), { best: dayOfMonth(best.info.date), low: dayOfMonth(low.info.date) }),
    }
  })

  const areas = AREAS.map((key, i) => ({ key, label: AREA_LABELS[key], rating: stood.ratings[i], text: MONTH_AREAS[stood.god][key] }))
  const counsel = take(`counsel:${stood.god}`, MONTH_COUNSEL[stood.god])

  const ranked = [...days].sort((a, b) => b.score - a.score || a.info.n - b.info.n)
  const best = byDate(ranked.slice(0, 3))
  const low = byDate(ranked.slice(-2))

  const events: CalendarEvent[] = []
  for (const { info } of days) {
    if (info.moon) events.push({ date: info.date, label: info.moon === 'new' ? 'New moon' : 'Full moon', text: '' })
    if (info.term) events.push({ date: info.date, label: termName(info.term), text: TERM_NOTES[info.term] })
  }

  const title = theme.title
  const text = theme.text.map(paragraph => fill(paragraph, slots))
  const dates = (list: DayCore[]) => joinList(list.map(d => shortDate(d.info.date)))
  const spoken = [
    `Your monthly reading for ${fmt(new Date(year, month, 1), { month: 'long', year: 'numeric' })}, for the ${signName(subject)}.`,
    `This is the ${pillarName(pillar.stem, pillar.branch)} month. Energy ${stood.score} out of 100: ${moodFor(stood.score)}.`,
    `${title}.`,
    ...text,
    MONTH_SEASONS[pillar.branch],
    `The year behind it: the ${pillarName(yearStem, yearBranch)}.`,
    ...yearText,
    ...notes.map(note => `${note.title}. ${note.text}`),
    ...thirds.map(third => third.text),
    ...areas.map(area => `${area.label}. ${area.text}`),
    `This month's counsel. ${counsel}`,
    `Do: ${MONTH_DOS[stood.god].join('. ')}.`,
    `Don't: ${MONTH_DONTS[stood.god].join('. ')}.`,
    `Your best days are ${dates(best)}. Take more care on ${dates(low)}.`,
  ].join(' ')

  return {
    ...stood,
    year,
    month,
    days,
    stem: pillar.stem,
    branch: pillar.branch,
    since: pillar.since,
    mood: moodFor(stood.score),
    title,
    theme: text,
    season: MONTH_SEASONS[pillar.branch],
    yearName: pillarName(yearStem, yearBranch),
    yearText,
    notes,
    thirds,
    areas,
    counsel,
    dos: MONTH_DOS[stood.god],
    donts: MONTH_DONTS[stood.god],
    best,
    low,
    events,
    spoken,
  }
}

const years = keep<MonthReading[]>(6)

export function monthReading(subject: Subject, date: Date): MonthReading {
  const year = date.getFullYear()
  const months = years(`${subject.key}|${year}`, () => {
    const take = taker(`month|${subject.key}|${year}`)
    return Array.from({ length: 12 }, (_, month) => compose(subject, year, month, take))
  })
  return months[date.getMonth()]
}
