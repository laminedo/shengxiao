// Who a reading is for: a person with a birth date, or one of the twelve signs in general.
import { Solar } from 'lunar-typescript'
import { fmt } from './dates'
import { ANIMAL_ZH, BRANCHES, BRANCH_ZH, ELEMENTS, STEMS, STEM_ZH, hiddenWeights } from './glossary'

export interface Person {
  id: string
  name: string
  y: number
  m: number
  d: number
  hh: number
  mm: number
  timeKnown: boolean
}

export type Strength = 'strong' | 'balanced' | 'gentle'

export interface Subject {
  key: string
  name: string | null
  /** False for a general reading of a sign, which has no birth chart behind it. */
  personal: boolean
  animal: number
  yearStem: number | null
  /** The stem every reading is measured against: the Day Master, or the sign's own stem. */
  self: number
  /** The day sign: the branch of the day of birth, which speaks for home and partnership. */
  seat: number | null
  favorable: number[]
  unfavorable: number[]
  strength: Strength | null
  pillars: { label: string; stem: number; branch: number }[]
}

const parse = (ganZhi: string) => ({ stem: STEM_ZH.indexOf(ganZhi[0]), branch: BRANCH_ZH.indexOf(ganZhi[1]) })

function chart(person: Person): Subject {
  // Without a birth time the hour pillar is left out; noon keeps the other three stable.
  const solar = Solar.fromYmdHms(person.y, person.m, person.d, person.timeKnown ? person.hh : 12, person.timeKnown ? person.mm : 0, 0)
  const lunar = solar.getLunar()
  const eight = lunar.getEightChar()

  const raw: [string, string, boolean][] = [['Year', eight.getYear(), false], ['Month', eight.getMonth(), true], ['Day', eight.getDay(), false]]
  if (person.timeKnown) raw.push(['Hour', eight.getTime(), false])
  const pillars = raw.map(([label, ganZhi]) => ({ label, ...parse(ganZhi) }))
  const self = pillars[2].stem

  // Stems count once; branches are spread over their hidden stems, and the month
  // branch counts double because the season sets the strength of every element.
  const weight = [0, 0, 0, 0, 0]
  raw.forEach(([, , isMonth], i) => {
    const { stem, branch } = pillars[i]
    weight[STEMS[stem].element] += 1
    const hidden = BRANCHES[branch].hidden
    const shares = hiddenWeights(hidden.length)
    hidden.forEach((h, k) => { weight[STEMS[h].element] += (isMonth ? 2 : 1.2) * shares[k] })
  })
  const total = weight.reduce((a, b) => a + b, 0)
  const elements = weight.map(w => (w / total) * 100)

  // A strong chart welcomes what draws on it; a gentle one welcomes what feeds it.
  const own = STEMS[self].element
  const support = elements[own] + elements[(own + 4) % 5]
  const strength: Strength = support >= 50 ? 'strong' : support >= 40 ? 'balanced' : 'gentle'
  const byNeed = (ks: number[]) => ks.map(k => (own + k) % 5).sort((a, b) => elements[a] - elements[b])
  let favorable: number[]
  let unfavorable: number[]
  if (strength === 'strong') {
    favorable = byNeed([1, 2, 3])
    unfavorable = byNeed([0, 4]).reverse()
  } else if (strength === 'gentle') {
    favorable = byNeed([4, 0])
    unfavorable = byNeed([1, 2, 3]).reverse()
  } else {
    const ranked = [0, 1, 2, 3, 4].sort((a, b) => elements[a] - elements[b])
    favorable = ranked.slice(0, 2)
    unfavorable = ranked.slice(4)
  }

  return {
    key: `p-${person.y}-${person.m}-${person.d}-${person.timeKnown ? `${person.hh}-${person.mm}` : 'x'}`,
    name: person.name,
    personal: true,
    // The zodiac sign turns at the Lunar New Year.
    animal: Math.max(0, ANIMAL_ZH.indexOf(lunar.getYearShengXiao())),
    yearStem: Math.max(0, STEM_ZH.indexOf(lunar.getYearInGanZhi()[0])),
    self,
    seat: pillars[2].branch,
    favorable,
    unfavorable,
    strength,
    pillars,
  }
}

export function personSubject(person: Person): Subject | null {
  try {
    const subject = chart(person)
    return subject.self >= 0 && subject.seat !== null && subject.seat >= 0 ? subject : null
  } catch {
    return null
  }
}

export function signSubject(animal: number): Subject {
  return {
    key: `sign-${animal}`,
    name: null,
    personal: false,
    animal,
    yearStem: null,
    self: BRANCHES[animal].hidden[0],
    seat: null,
    favorable: [],
    unfavorable: [],
    strength: null,
    pillars: [],
  }
}

export const animalName = (subject: Subject) => BRANCHES[subject.animal].animal

/** "Fire Horse" for a person, "Horse" for a sign in general. */
export const signName = (subject: Subject) =>
  subject.yearStem === null ? animalName(subject) : `${ELEMENTS[STEMS[subject.yearStem].element].name} ${animalName(subject)}`

export const selfElement = (subject: Subject) => STEMS[subject.self].element

export function birthLine(p: Person): string {
  const date = fmt(new Date(p.y, p.m - 1, p.d), { day: 'numeric', month: 'long', year: 'numeric' })
  if (!p.timeKnown) return date
  return `${date}, ${String(p.hh).padStart(2, '0')}:${String(p.mm).padStart(2, '0')}`
}

/** The six most recent years of a sign, counted by the Lunar New Year. */
export function signYears(animal: number, upTo: number): number[] {
  const latest = upTo - ((((upTo - 4) % 12) + 12 - animal) % 12)
  return Array.from({ length: 6 }, (_, i) => latest - 12 * (5 - i))
}
