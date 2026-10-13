// Reference tables for the stems, branches, elements and their relationships.
// Element indices follow the generating cycle: Wood → Fire → Earth → Metal → Water.

export const STEM_ZH = '甲乙丙丁戊己庚辛壬癸'
export const BRANCH_ZH = '子丑寅卯辰巳午未申酉戌亥'
export const ANIMAL_ZH = '鼠牛虎兔龙蛇马羊猴鸡狗猪'

// `numbers` are the element's pair in the River Map (河图); `colours` rotate from day to day.
export const ELEMENTS = [
  { key: 'wood', name: 'Wood', zh: '木', direction: 'East', colours: ['Green', 'Jade green', 'Teal'], numbers: [3, 8] },
  { key: 'fire', name: 'Fire', zh: '火', direction: 'South', colours: ['Red', 'Coral', 'Purple'], numbers: [2, 7] },
  { key: 'earth', name: 'Earth', zh: '土', direction: 'Centre', colours: ['Yellow', 'Ochre', 'Brown'], numbers: [5, 10] },
  { key: 'metal', name: 'Metal', zh: '金', direction: 'West', colours: ['White', 'Silver', 'Gold'], numbers: [4, 9] },
  { key: 'water', name: 'Water', zh: '水', direction: 'North', colours: ['Black', 'Navy', 'Blue'], numbers: [1, 6] },
] as const

export const STEMS = [
  { zh: '甲', element: 0, yang: true },
  { zh: '乙', element: 0, yang: false },
  { zh: '丙', element: 1, yang: true },
  { zh: '丁', element: 1, yang: false },
  { zh: '戊', element: 2, yang: true },
  { zh: '己', element: 2, yang: false },
  { zh: '庚', element: 3, yang: true },
  { zh: '辛', element: 3, yang: false },
  { zh: '壬', element: 4, yang: true },
  { zh: '癸', element: 4, yang: false },
] as const

// `hidden` lists the stems each branch carries, strongest first. `hours` is the
// two-hour period of the day that the branch rules.
export const BRANCHES = [
  { zh: '子', animal: 'Rat', animalZh: '鼠', element: 4, hidden: [9], hours: '11pm to 1am' },
  { zh: '丑', animal: 'Ox', animalZh: '牛', element: 2, hidden: [5, 9, 7], hours: '1am to 3am' },
  { zh: '寅', animal: 'Tiger', animalZh: '虎', element: 0, hidden: [0, 2, 4], hours: '3am to 5am' },
  { zh: '卯', animal: 'Rabbit', animalZh: '兔', element: 0, hidden: [1], hours: '5am to 7am' },
  { zh: '辰', animal: 'Dragon', animalZh: '龙', element: 2, hidden: [4, 1, 9], hours: '7am to 9am' },
  { zh: '巳', animal: 'Snake', animalZh: '蛇', element: 1, hidden: [2, 6, 4], hours: '9am to 11am' },
  { zh: '午', animal: 'Horse', animalZh: '马', element: 1, hidden: [3, 5], hours: '11am to 1pm' },
  { zh: '未', animal: 'Goat', animalZh: '羊', element: 2, hidden: [5, 3, 1], hours: '1pm to 3pm' },
  { zh: '申', animal: 'Monkey', animalZh: '猴', element: 3, hidden: [6, 8, 4], hours: '3pm to 5pm' },
  { zh: '酉', animal: 'Rooster', animalZh: '鸡', element: 3, hidden: [7], hours: '5pm to 7pm' },
  { zh: '戌', animal: 'Dog', animalZh: '狗', element: 2, hidden: [4, 7, 3], hours: '7pm to 9pm' },
  { zh: '亥', animal: 'Pig', animalZh: '猪', element: 4, hidden: [8, 0], hours: '9pm to 11pm' },
] as const

export function hiddenWeights(count: number): number[] {
  return count === 1 ? [1] : count === 2 ? [0.7, 0.3] : [0.6, 0.3, 0.1]
}

// Ten Gods: how a stem stands to your own. Indexed as group * 2 + (same polarity ? 0 : 1).
// Groups, relative to your stem: 0 companion, 1 output, 2 wealth, 3 authority, 4 resource.
// `plain` is the everyday name the readings use; `name` and `zh` are the traditional terms.
export const TEN_GODS = [
  { plain: 'Companion', name: 'Friend', zh: '比肩' },
  { plain: 'Rival', name: 'Rob Wealth', zh: '劫财' },
  { plain: 'Ease', name: 'Eating God', zh: '食神' },
  { plain: 'Spark', name: 'Hurting Officer', zh: '伤官' },
  { plain: 'Windfall', name: 'Indirect Wealth', zh: '偏财' },
  { plain: 'Harvest', name: 'Direct Wealth', zh: '正财' },
  { plain: 'Pressure', name: 'Seven Killings', zh: '七杀' },
  { plain: 'Duty', name: 'Direct Officer', zh: '正官' },
  { plain: 'Insight', name: 'Indirect Resource', zh: '偏印' },
  { plain: 'Support', name: 'Direct Resource', zh: '正印' },
] as const

export const GROUPS = ['Your own steam', 'Expression and craft', 'Money and results', 'Duty and pressure', 'Rest and learning'] as const

export function tenGod(self: number, stem: number): number {
  const group = ((stem >> 1) - (self >> 1) + 5) % 5
  return group * 2 + (self % 2 === stem % 2 ? 0 : 1)
}

/** Where an element stands to your own: 0 same, 1 you feed it, 2 you master it, 3 it masters you, 4 it feeds you. */
export const elementGroup = (self: number, element: number) => (element - STEMS[self].element + 5) % 5

export type BranchRel = 'same' | 'six' | 'three' | 'clash' | 'harm' | 'none'

const SIX = [[0, 1], [2, 11], [3, 10], [4, 9], [5, 8], [6, 7]]
const HARM = [[0, 7], [1, 6], [2, 5], [3, 4], [8, 11], [9, 10]]
const inPairs = (pairs: number[][], a: number, b: number) =>
  pairs.some(([x, y]) => (x === a && y === b) || (x === b && y === a))

export function branchRel(a: number, b: number): BranchRel {
  if (a === b) return 'same'
  if ((a + 6) % 12 === b) return 'clash'
  if (inPairs(SIX, a, b)) return 'six'
  if ((a - b + 12) % 4 === 0) return 'three'
  if (inPairs(HARM, a, b)) return 'harm'
  return 'none'
}

/** The two trine allies, then the secret friend. */
export function allies(branch: number): number[] {
  const six = SIX.find(p => p.includes(branch))!
  return [(branch + 4) % 12, (branch + 8) % 12, six[0] === branch ? six[1] : six[0]]
}

export const pillarName = (stem: number, branch: number) =>
  `${ELEMENTS[STEMS[stem].element].name} ${BRANCHES[branch].animal}`

export const pillarZh = (stem: number, branch: number) => `${STEMS[stem].zh}${BRANCHES[branch].zh}`

const TERMS: Record<string, string> = {
  立春: 'Start of Spring', 雨水: 'Rain Water', 惊蛰: 'Awakening of Insects', 春分: 'Spring Equinox',
  清明: 'Clear and Bright', 谷雨: 'Grain Rain', 立夏: 'Start of Summer', 小满: 'Grain Buds',
  芒种: 'Grain in Ear', 夏至: 'Summer Solstice', 小暑: 'Minor Heat', 大暑: 'Major Heat',
  立秋: 'Start of Autumn', 处暑: 'End of Heat', 白露: 'White Dew', 秋分: 'Autumn Equinox',
  寒露: 'Cold Dew', 霜降: "Frost's Descent", 立冬: 'Start of Winter', 小雪: 'Minor Snow',
  大雪: 'Major Snow', 冬至: 'Winter Solstice', 小寒: 'Minor Cold', 大寒: 'Major Cold',
}
export const TERM_ZH = Object.keys(TERMS)
export const termName = (zh: string) => TERMS[zh] ?? zh

// The twelve day officers (建除十二神), in cycle order.
export const OFFICER_ZH = '建除满平定执破危成收开闭'
export const OFFICERS = ['Establish', 'Remove', 'Full', 'Balance', 'Settle', 'Hold', 'Break', 'Caution', 'Success', 'Gather', 'Open', 'Close'] as const
