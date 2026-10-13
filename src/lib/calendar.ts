// The Chinese calendar for a given day: pillars, day officer, moon and solar terms.
import { Solar } from 'lunar-typescript'
import { dayNumber } from './dates'
import { BRANCH_ZH, OFFICER_ZH, STEM_ZH, TERM_ZH, branchRel, termName } from './glossary'

const MOON = [
  [1, 'New moon'], [6, 'Waxing crescent'], [8, 'First quarter'], [13, 'Waxing gibbous'],
  [16, 'Full moon'], [21, 'Waning gibbous'], [23, 'Last quarter'], [30, 'Waning crescent'],
] as const

export interface DayInfo {
  date: Date
  n: number
  stem: number
  branch: number
  officer: number
  lunarMonth: number
  lunarDay: number
  lunarZh: string
  moonName: string
  /** Set on the first and the fifteenth of the lunar month. */
  moon: 'new' | 'full' | null
  /** The solar term that begins today, by its Chinese name. */
  term: string | null
  monthStem: number
  monthBranch: number
  yearStem: number
  yearBranch: number
}

const lunarOf = (date: Date) => Solar.fromYmd(date.getFullYear(), date.getMonth() + 1, date.getDate()).getLunar()

const cache = new Map<number, DayInfo>()

export function dayInfo(date: Date): DayInfo {
  const n = dayNumber(date)
  const cached = cache.get(n)
  if (cached) return cached

  const lunar = lunarOf(date)
  const dayGz = lunar.getDayInGanZhi()
  const monthGz = lunar.getMonthInGanZhi()
  const yearGz = lunar.getYearInGanZhi()
  const lunarDay = lunar.getDay()
  const term = lunar.getJieQi()
  const info: DayInfo = {
    date: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
    n,
    stem: STEM_ZH.indexOf(dayGz[0]),
    branch: BRANCH_ZH.indexOf(dayGz[1]),
    officer: OFFICER_ZH.indexOf(lunar.getZhiXing()),
    lunarMonth: Math.abs(lunar.getMonth()),
    lunarDay,
    lunarZh: `${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`,
    moonName: MOON.find(([last]) => lunarDay <= last)![1],
    moon: lunarDay === 1 ? 'new' : lunarDay === 15 ? 'full' : null,
    term: TERM_ZH.includes(term) ? term : null,
    monthStem: STEM_ZH.indexOf(monthGz[0]),
    monthBranch: BRANCH_ZH.indexOf(monthGz[1]),
    yearStem: STEM_ZH.indexOf(yearGz[0]),
    yearBranch: BRANCH_ZH.indexOf(yearGz[1]),
  }
  cache.set(n, info)
  return info
}

// Traditional almanac activities. Terms without a clear modern reading are left out.
const ACTIVITIES: Record<string, string> = {
  祭祀: 'Honouring ancestors', 祈福: 'Prayer and blessings', 求嗣: 'Wishing for children', 开光: 'Consecration',
  斋醮: 'Fasting rites', 酬神: 'Giving thanks', 沐浴: 'Bathing and cleansing', 嫁娶: 'Weddings',
  订婚: 'Engagements', 订盟: 'Making agreements', 纳采: 'Proposals', 冠笄: 'Coming-of-age rites',
  安床: 'Setting up a bed', 裁衣: 'Tailoring', 入宅: 'Moving into a home', 移徙: 'Relocating',
  出行: 'Travel', 修造: 'Renovation', 动土: 'Breaking ground', 起基: 'Laying foundations',
  上梁: 'Raising beams', 竖柱: 'Raising pillars', 盖屋: 'Roofing', 造屋: 'Building a house',
  开市: 'Opening a business', 交易: 'Trading', 立券: 'Signing contracts', 纳财: 'Receiving money',
  求财: 'Seeking income', 开仓: 'Opening stores', 出货财: 'Shipping goods', 置产: 'Buying property',
  挂匾: 'Hanging a signboard', 买车: 'Buying a vehicle', 雇庸: 'Hiring help', 栽种: 'Planting',
  牧养: 'Tending animals', 纳畜: 'Acquiring animals', 入学: 'Starting studies', 习艺: 'Learning a craft',
  理发: 'Haircuts', 整手足甲: 'Trimming nails', 会亲友: 'Seeing friends and family', 探病: 'Visiting the sick',
  求医: 'Seeking treatment', 治病: 'Medical treatment', 针灸: 'Acupuncture', 解除: 'Clearing out',
  扫舍: 'House cleaning', 拆卸: 'Dismantling', 破屋: 'Demolition', 坏垣: 'Taking down walls',
  补垣: 'Mending walls', 塞穴: 'Sealing gaps', 作灶: 'Setting up a stove', 安门: 'Fitting doors',
  安香: 'Setting up an altar', 出火: 'Moving the hearth', 谢土: 'Thanking the land', 捕捉: 'Pest control',
  畋猎: 'Hunting', 取渔: 'Fishing', 结网: 'Net making', 伐木: 'Felling timber',
  掘井: 'Digging wells', 开池: 'Digging ponds', 开渠: 'Digging channels', 放水: 'Releasing water',
  造船: 'Boat building', 乘船: 'Boat travel', 造桥: 'Bridge building', 筑堤: 'Building embankments',
  词讼: 'Lawsuits', 赴任: 'Taking up a post', 见贵: 'Meeting benefactors', 进人口: 'Welcoming newcomers',
  安机械: 'Installing machinery', 经络: 'Weaving', 酝酿: 'Brewing', 雕刻: 'Carving',
  塑绘: 'Sculpture and painting', 分居: 'Dividing a household', 归宁: 'Visiting parents', 平治道涂: 'Road repair',
  修饰垣墙: 'Decorating walls', 安葬: 'Burials', 破土: 'Preparing a grave', 入殓: 'Funeral rites',
  移柩: 'Funeral processions', 除服: 'Ending mourning', 成服: 'Mourning dress', 立碑: 'Raising a memorial',
  修坟: 'Tending graves', 启钻: 'Exhumation', 普渡: 'Rites for the departed',
  诸事不宜: 'Major undertakings', 馀事勿取: 'Anything else of weight',
}

const translate = (terms: string[]) => [...new Set(terms.map(t => ACTIVITIES[t]).filter(Boolean))]

export interface Almanac {
  goodFor: string[]
  avoid: string[]
  /** Branches of the two-hour periods the almanac marks as fortunate. */
  goodHours: number[]
  nextTerm: { name: string; date: Date } | null
}

/** The slower almanac lookups, fetched only for the day on screen. */
export function almanac(date: Date): Almanac {
  const lunar = lunarOf(date)
  const next = lunar.getNextJieQi()
  const nextSolar = next?.getSolar()
  const goodHours = lunar.getTimes()
    .filter(t => t.getTianShenLuck() === '吉')
    .map(t => BRANCH_ZH.indexOf(t.getGanZhi()[1]))
  return {
    goodFor: translate(lunar.getDayYi()),
    avoid: translate(lunar.getDayJi()),
    goodHours: [...new Set(goodHours)],
    nextTerm: nextSolar
      ? { name: termName(next.getName()), date: new Date(nextSolar.getYear(), nextSolar.getMonth() - 1, nextSolar.getDay()) }
      : null,
  }
}

/** Up to two fortunate hours that also sit well with the reader's sign, waking hours first. */
export function luckyHours(goodHours: number[], animal: number): number[] {
  const rank = (branch: number) => {
    const rel = branchRel(branch, animal)
    const fit = rel === 'six' ? 0 : rel === 'three' ? 1 : rel === 'same' ? 2 : 3
    const awake = branch >= 3 && branch <= 10 ? 0 : 1
    return awake * 10 + fit
  }
  return goodHours
    .filter(branch => !['clash', 'harm'].includes(branchRel(branch, animal)))
    .sort((a, b) => rank(a) - rank(b))
    .slice(0, 2)
    .sort((a, b) => ((a + 11) % 12) - ((b + 11) % 12))
}

/** The pillar in force for most of a calendar month. BaZi months turn at a solar term in the first week. */
export function monthPillar(year: number, month: number): { stem: number; branch: number; since: Date } {
  const mid = Solar.fromYmd(year, month + 1, 15).getLunar()
  const ganZhi = mid.getMonthInGanZhi()
  const began = mid.getPrevJie(true).getSolar()
  return {
    stem: STEM_ZH.indexOf(ganZhi[0]),
    branch: BRANCH_ZH.indexOf(ganZhi[1]),
    since: new Date(began.getYear(), began.getMonth() - 1, began.getDay()),
  }
}
