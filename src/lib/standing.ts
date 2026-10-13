// How a pillar (a day's or a month's stem and branch) stands to the reader. Every score
// and rating in the app comes from here.
import { BRANCHES, STEMS, branchRel, elementGroup, tenGod, type BranchRel } from './glossary'
import type { Subject } from './subject'

export interface Standing {
  god: number
  group: number
  /** The pillar's animal against the reader's year sign. */
  relSign: BranchRel
  /** The pillar's animal against the reader's day sign; 'none' for a general sign reading. */
  relSeat: BranchRel
  /** An element the pillar carries that the reader's chart welcomes or already has too much of. */
  element: { el: number; kind: 'welcome' | 'excess' } | null
  score: number
  /** The score as a step up or down for the four ratings, from -2 to +1. */
  shift: number
  /** Love, work, money and wellbeing, each from 1 to 5. */
  ratings: number[]
  /** For each of those four, whether the reading should strike a careful note. */
  care: boolean[]
  careLead: boolean
}

// Where each Ten God naturally helps and hinders: love, work, money, wellbeing.
const AFFINITY = [
  [3, 4, 2, 4], // Companion
  [3, 4, 2, 3], // Rival
  [4, 3, 4, 5], // Ease
  [3, 4, 3, 3], // Spark
  [4, 4, 4, 3], // Windfall
  [4, 4, 5, 3], // Harvest
  [2, 4, 3, 2], // Pressure
  [3, 5, 3, 3], // Duty
  [2, 3, 2, 4], // Insight
  [4, 3, 3, 5], // Support
]

// Without a birth chart there is no list of welcome elements, so a sign is scored on how
// each element stands to its own: fed by it, matched, feeding, mastering or mastered.
const SIGN_STEM = [5, 2, 3, -8, 9]
const SIGN_BRANCH = [3, 0, 1, -5, 6]

const clamp = (value: number, low: number, high: number) => Math.max(low, Math.min(high, value))

export const moodFor = (score: number) =>
  score >= 85 ? 'Bright' : score >= 70 ? 'Fair' : score >= 55 ? 'Steady' : score >= 42 ? 'Changeable' : 'Heavy going'

export const bandFor = (score: number) => (score >= 70 ? 'high' : score >= 55 ? 'mid' : 'low')

export function standing(subject: Subject, stem: number, branch: number): Standing {
  const stemEl = STEMS[stem].element
  const branchEl = BRANCHES[branch].element
  const relSign = branchRel(branch, subject.animal)
  const relSeat = subject.seat === null ? 'none' : branchRel(branch, subject.seat)
  const god = tenGod(subject.self, stem)

  let score: number
  let element: Standing['element'] = null
  if (subject.personal) {
    const tone = (el: number) => (subject.favorable.includes(el) ? 1 : subject.unfavorable.includes(el) ? -1 : 0)
    const stemTone = tone(stemEl)
    const branchTone = tone(branchEl)
    score = 62 + (stemTone > 0 ? 12 : stemTone < 0 ? -8 : 0) + (branchTone > 0 ? 10 : branchTone < 0 ? -6 : 0)
    score += { same: 0, six: 8, three: 5, clash: -12, harm: -5, none: 0 }[relSeat]
    score += { same: 0, six: 5, three: 4, clash: -8, harm: -4, none: 0 }[relSign]
    // The stem is the visible half of a pillar, so it speaks first.
    if (stemTone !== 0) element = { el: stemEl, kind: stemTone > 0 ? 'welcome' : 'excess' }
    else if (branchTone !== 0) element = { el: branchEl, kind: branchTone > 0 ? 'welcome' : 'excess' }
  } else {
    score = 60 + SIGN_STEM[elementGroup(subject.self, stemEl)] + SIGN_BRANCH[elementGroup(subject.self, branchEl)]
    score += { same: 0, six: 10, three: 7, clash: -14, harm: -7, none: 0 }[relSign]
  }
  score = clamp(Math.round(score), 18, 98)

  const shift = score >= 80 ? 1 : score >= 56 ? 0 : score >= 44 ? -1 : -2
  // Love answers to the day sign where there is one, and to the year sign otherwise.
  const close = subject.personal ? relSeat : relSign
  const steps = [shift + (close === 'six' ? 1 : close === 'clash' && subject.personal ? -1 : 0), shift, shift, shift]

  return {
    god,
    group: god >> 1,
    relSign,
    relSeat,
    element,
    score,
    shift,
    ratings: steps.map((step, area) => clamp(AFFINITY[god][area] + step, 1, 5)),
    care: steps.map(step => step < 0),
    careLead: shift < 0,
  }
}
