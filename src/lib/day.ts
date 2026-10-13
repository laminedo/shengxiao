// The daily reading.
import { DAY_COUNSEL, DAY_DONTS, DAY_DOS, DAY_LEADS } from '../content/dayLeads'
import { DAY_LOVE, DAY_WORK } from '../content/dayLoveWork'
import { DAY_MONEY, DAY_WELL } from '../content/dayMoneyWell'
import { ANIMAL_LINES, ELEMENT_NOTES, LUCKY_REASONS, MOON_NOTES, OFFICER_NOTES, RELATION_TAGS, SEAT_RELATIONS, SIGN_RELATIONS, TERM_NOTES } from '../content/dayNotes'
import { AREAS, AREA_LABELS, type Area, type Toned } from '../content/types'
import { dayInfo, type DayInfo } from './calendar'
import { addDays, longDate } from './dates'
import { BRANCHES, ELEMENTS, OFFICERS, OFFICER_ZH, STEMS, termName } from './glossary'
import { fill, keep, taker, type Take } from './pick'
import { moodFor, standing, type Standing } from './standing'
import { selfElement, signName, type Subject } from './subject'

export interface DayCore extends Standing {
  info: DayInfo
  mood: string
}

export interface Note {
  tag: string
  title: string
  text: string
  tone: 'good' | 'care' | 'plain'
}

export interface AreaReading {
  key: Area
  label: string
  rating: number
  text: string
}

export interface DayReading {
  core: DayCore
  title: string
  lead: string
  notes: Note[]
  areas: AreaReading[]
  counsel: string
  dos: string[]
  donts: string[]
  lucky: { element: number; colour: string; reason: string }
  officer: { name: string; zh: string; text: string }
  spoken: string
}

const DAY_AREAS: Record<Area, Toned<string>[]> = { love: DAY_LOVE, work: DAY_WORK, money: DAY_MONEY, well: DAY_WELL }

const cores = keep<Map<number, DayCore>>(16)

export function dayCore(subject: Subject, date: Date): DayCore {
  const info = dayInfo(date)
  const known = cores(subject.key, () => new Map())
  let core = known.get(info.n)
  if (!core) {
    const stood = standing(subject, info.stem, info.branch)
    core = { ...stood, info, mood: moodFor(stood.score) }
    known.set(info.n, core)
  }
  return core
}

const baselines = keep<{ score: number; ratings: number[] }>(16)

/** A reader's average day across a calendar year: the yardstick a week is measured against. */
export function baseline(subject: Subject, year: number): { score: number; ratings: number[] } {
  return baselines(`${subject.key}|${year}`, () => {
    const days: DayCore[] = []
    for (let date = new Date(year, 0, 1); date.getFullYear() === year; date = addDays(date, 1)) days.push(dayCore(subject, date))
    return {
      score: days.reduce((sum, d) => sum + d.score, 0) / days.length,
      ratings: AREAS.map((_, i) => days.reduce((sum, d) => sum + d.ratings[i], 0) / days.length),
    }
  })
}

const tone = (care: boolean) => (care ? 'care' : 'lift')

// The element that makes the most of the day: it bridges, channels or completes what the
// day's stem is doing to the reader's own. Indexed by GROUPS, as a step round the cycle.
const LUCKY_STEP = [1, 2, 1, 4, 0]

function compose(subject: Subject, core: DayCore, take: Take): DayReading {
  const { info, god } = core
  const own = selfElement(subject)
  const slots = {
    self: ELEMENTS[own].name,
    day: ELEMENTS[STEMS[info.stem].element].name,
    animal: BRANCHES[info.branch].animal,
    sign: BRANCHES[subject.animal].animal,
    seat: subject.seat === null ? '' : BRANCHES[subject.seat].animal,
  }

  const lead = take(`lead:${god}:${tone(core.careLead)}`, DAY_LEADS[god][tone(core.careLead)])

  const notes: Note[] = []
  if (core.relSign !== 'none') {
    const passage = take(`sign:${core.relSign}`, SIGN_RELATIONS[core.relSign])
    const kind = core.relSign === 'six' || core.relSign === 'three' ? 'ease' : core.relSign === 'same' ? null : 'strain'
    const line = kind ? ` ${take(`line:${kind}`, ANIMAL_LINES[subject.animal][kind])}` : ''
    notes.push({
      tag: RELATION_TAGS[core.relSign],
      title: fill(passage.title, slots),
      text: fill(passage.text, slots) + line,
      tone: kind === 'ease' ? 'good' : kind === 'strain' ? 'care' : 'plain',
    })
  }
  // A day sign that matches the year sign would only repeat the note above.
  if (core.relSeat !== 'none' && subject.seat !== subject.animal) {
    const passage = take(`seat:${core.relSeat}`, SEAT_RELATIONS[core.relSeat])
    notes.push({
      tag: 'Day sign',
      title: fill(passage.title, slots),
      text: fill(passage.text, slots),
      tone: core.relSeat === 'six' || core.relSeat === 'three' ? 'good' : core.relSeat === 'same' ? 'plain' : 'care',
    })
  }
  if (core.element) {
    const passage = take(`element:${core.element.kind}`, ELEMENT_NOTES[core.element.kind])
    const el = { el: ELEMENTS[core.element.el].name }
    notes.push({ tag: 'Element', title: fill(passage.title, el), text: fill(passage.text, el), tone: core.element.kind === 'welcome' ? 'good' : 'care' })
  }
  if (info.moon) {
    notes.push({ tag: 'Moon', title: info.moon === 'new' ? 'New moon' : 'Full moon', text: take(`moon:${info.moon}`, MOON_NOTES[info.moon]), tone: 'plain' })
  }
  if (info.term) {
    notes.push({ tag: 'Solar term', title: termName(info.term), text: TERM_NOTES[info.term], tone: 'plain' })
  }

  const areas = AREAS.map((key, i) => ({
    key,
    label: AREA_LABELS[key],
    rating: core.ratings[i],
    text: take(`${key}:${god}:${tone(core.care[i])}`, DAY_AREAS[key][god][tone(core.care[i])]),
  }))

  const counsel = take(`counsel:${god}`, DAY_COUNSEL[god])
  const dos = [take(`do:${god}`, DAY_DOS[god]), take(`do:${god}`, DAY_DOS[god])]
  const donts = [take(`dont:${god}`, DAY_DONTS[god]), take(`dont:${god}`, DAY_DONTS[god])]

  const luckyEl = (own + LUCKY_STEP[core.group]) % 5
  const lucky = {
    element: luckyEl,
    colour: ELEMENTS[luckyEl].colours[info.n % 3],
    reason: fill(LUCKY_REASONS[core.group], { ...slots, lucky: ELEMENTS[luckyEl].name }),
  }
  const officer = {
    name: OFFICERS[info.officer],
    zh: OFFICER_ZH[info.officer],
    text: take(`officer:${info.officer}`, OFFICER_NOTES[info.officer]),
  }

  const title = fill(lead.title, slots)
  const text = fill(lead.text, slots)
  const spoken = [
    `Your reading for ${longDate(info.date)}, for the ${signName(subject)}.`,
    `Energy ${core.score} out of 100: ${core.mood}.`,
    `${title}.`,
    text,
    ...notes.map(note => `${note.title}. ${note.text}`),
    ...areas.map(area => `${area.label}. ${area.text}`),
    `Today's counsel. ${counsel}`,
    `Do: ${dos.join('. ')}.`,
    `Don't: ${donts.join('. ')}.`,
    `Lucky colour: ${lucky.colour}.`,
  ].join(' ')

  return { core, title, lead: text, notes, areas, counsel, dos, donts, lucky, officer, spoken }
}

const years = keep<DayReading[]>(6)

/** Every daily reading of a calendar year, written in order from 1 January. */
function yearOfDays(subject: Subject, year: number): DayReading[] {
  return years(`${subject.key}|${year}`, () => {
    const take = taker(`day|${subject.key}|${year}`)
    const readings: DayReading[] = []
    for (let date = new Date(year, 0, 1); date.getFullYear() === year; date = addDays(date, 1)) {
      readings.push(compose(subject, dayCore(subject, date), take))
    }
    return readings
  })
}

export function dayReading(subject: Subject, date: Date): DayReading {
  const first = dayInfo(new Date(date.getFullYear(), 0, 1)).n
  return yearOfDays(subject, date.getFullYear())[dayInfo(date).n - first]
}
