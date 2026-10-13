// Writes two years of readings for every sign and a few birth charts, and checks each one:
// nothing missing, no unfilled markers, no paragraph repeated too soon. Run with: npm run check
import { DAY_COUNSEL, DAY_DONTS, DAY_DOS, DAY_LEADS } from '../src/content/dayLeads'
import { DAY_LOVE, DAY_WORK } from '../src/content/dayLoveWork'
import { DAY_MONEY, DAY_WELL } from '../src/content/dayMoneyWell'
import * as dayNotes from '../src/content/dayNotes'
import * as monthContent from '../src/content/month'
import { MONTH_AREAS } from '../src/content/monthAreas'
import * as weekContent from '../src/content/week'
import * as yearContent from '../src/content/year'
import { dayReading } from '../src/lib/day'
import { addDays } from '../src/lib/dates'
import { monthReading } from '../src/lib/month'
import { personSubject, signName, signSubject, type Subject } from '../src/lib/subject'
import { weekReading } from '../src/lib/week'

const problems: string[] = []
const fail = (message: string) => { if (problems.length < 40) problems.push(message) }

// ── The library itself ──
const passages: string[] = []
const collect = (value: unknown): void => {
  if (typeof value === 'string') passages.push(value)
  else if (Array.isArray(value)) value.forEach(collect)
  else if (value && typeof value === 'object') Object.values(value).forEach(collect)
}
;[DAY_LEADS, DAY_COUNSEL, DAY_DOS, DAY_DONTS, DAY_LOVE, DAY_WORK, DAY_MONEY, DAY_WELL, dayNotes, weekContent, monthContent, MONTH_AREAS, yearContent].forEach(collect)

for (const text of passages) {
  if (/ {2}|\s$|^\s/.test(text)) fail(`Stray spacing: "${text}"`)
  if (/[—–]/.test(text)) fail(`Dash in: "${text}"`)
  if (/\b(\w+) \1\b/i.test(text.replace(/\{\w+\}/g, m => m))) {
    const doubled = /\b(\w+) \1\b/i.exec(text)![1]
    if (!['had', 'that'].includes(doubled.toLowerCase())) fail(`Doubled word "${doubled}": "${text}"`)
  }
}
const seen = new Set<string>()
for (const text of passages) {
  if (text.length > 40 && seen.has(text)) fail(`Written twice: "${text}"`)
  seen.add(text)
}
for (const [name, table] of Object.entries({ DAY_LEADS, DAY_LOVE, DAY_WORK, DAY_MONEY, DAY_WELL })) {
  if (table.length !== 10) fail(`${name} needs ten entries`)
  table.forEach((entry, god) => {
    if (entry.lift.length < 3 || entry.care.length < 2) fail(`${name}[${god}] is short of alternatives`)
  })
}
const words = (text: string) => text.split(/\s+/).filter(Boolean).length
const sentences = passages.filter(text => text.length > 40)
console.log(`Library: ${passages.length} pieces of text, ${sentences.length} full passages, ${passages.reduce((n, t) => n + words(t), 0).toLocaleString()} words`)

// ── The readings ──
const births: [number, number, number, boolean][] = [
  [1990, 5, 15, true], [1984, 2, 3, false], [1976, 11, 30, true], [2001, 8, 8, true], [1968, 1, 29, false], [1995, 12, 22, true], [2012, 6, 1, false],
]
const subjects: Subject[] = [
  ...Array.from({ length: 12 }, (_, animal) => signSubject(animal)),
  ...births.map(([y, m, d, timeKnown], i) => personSubject({ id: String(i), name: 'Test', y, m, d, hh: 7 + i * 2, mm: 15, timeKnown })!),
]

function inspect(where: string, texts: string[]) {
  const joined = texts.join(' ')
  if (/[{}]/.test(joined)) fail(`${where}: unfilled marker in "${texts.find(t => /[{}]/.test(t))}"`)
  if (/undefined|NaN|null/.test(joined)) fail(`${where}: broken value in "${texts.find(t => /undefined|NaN|null/.test(t))}"`)
  if (/\b[Aa] [AEIOU]/.test(joined)) fail(`${where}: wrong article in "${texts.find(t => /\b[Aa] [AEIOU]/.test(t))}"`)
  if (texts.some(t => !t.trim())) fail(`${where}: empty passage`)
  const long = texts.filter(t => t.length > 60)
  if (new Set(long).size !== long.length) fail(`${where}: a paragraph appears twice`)
  return words(joined)
}

const stats = { day: [] as number[], week: [] as number[], month: [] as number[] }
// For each kind of paragraph, how many readings pass before the same text comes round again.
const gaps = { day: [] as number[], week: [] as number[], month: [] as number[] }
const track = (kind: keyof typeof gaps) => {
  const last = new Map<string, number>()
  return (index: number, texts: string[]) => {
    for (const text of texts) {
      if (text.length <= 60) continue
      const before = last.get(text)
      if (before !== undefined) gaps[kind].push(index - before)
      last.set(text, index)
    }
  }
}

for (const subject of subjects) {
  const who = subject.personal ? `${signName(subject)} chart` : signName(subject)
  const seenDay = track('day')
  const seenWeek = track('week')
  const seenMonth = track('month')
  let weekIndex = 0

  for (let date = new Date(2026, 0, 1), i = 0; date.getFullYear() < 2028; date = addDays(date, 1), i++) {
    const day = dayReading(subject, date)
    const label = `${who}, ${date.toDateString()}`
    if (!day || day.core.info.date.getTime() !== date.getTime()) { fail(`${label}: wrong or missing daily reading`); continue }
    const body = [day.lead, ...day.areas.map(a => a.text)]
    stats.day.push(inspect(label, [day.title, ...body, ...day.notes.map(n => n.text), day.counsel, ...day.dos, ...day.donts, day.lucky.reason, day.officer.text, day.spoken]))
    seenDay(i, body)
    if (day.dos[0] === day.dos[1] || day.donts[0] === day.donts[1]) fail(`${label}: repeated do or don't`)
    if (day.areas.some(a => a.rating < 1 || a.rating > 5)) fail(`${label}: rating out of range`)

    const week = weekReading(subject, date)
    if (!week) { fail(`${label}: missing weekly reading`); continue }
    if (week.start.getTime() === date.getTime()) {
      const texts = [week.overview, ...week.phases.map(p => p.text), ...week.keyDays, ...week.areas.map(a => a.text)]
      stats.week.push(inspect(`${label} (week)`, [week.title, ...texts, week.focus, week.letGo, ...week.events.map(e => e.text), week.spoken]))
      seenWeek(weekIndex++, texts)
    }

    if (date.getDate() === 1) {
      const month = monthReading(subject, date)
      if (!month || month.month !== date.getMonth()) { fail(`${label}: wrong or missing monthly reading`); continue }
      const texts = [...month.theme, month.season, ...month.yearText, ...month.notes.map(n => n.text), ...month.thirds.map(t => t.text), ...month.areas.map(a => a.text)]
      stats.month.push(inspect(`${label} (month)`, [month.title, ...texts, month.counsel, ...month.dos, ...month.donts, month.spoken]))
      seenMonth(date.getFullYear() * 12 + date.getMonth(), [...month.thirds.map(t => t.text), ...month.notes.map(n => n.text)])
    }
  }
}

const share = (values: number[], under: number) => `${((values.filter(v => v < under).length / values.length) * 100).toFixed(2)}% under ${under}`
const summary = (values: number[]) => {
  const sorted = [...values].sort((a, b) => a - b)
  return `${sorted[0]} to ${sorted[sorted.length - 1]}, typically ${sorted[Math.floor(sorted.length / 2)]}`
}
console.log(`Checked ${subjects.length} readers over two years: ${stats.day.length.toLocaleString()} daily, ${stats.week.length.toLocaleString()} weekly and ${stats.month.length} monthly readings`)
// Spoken text repeats the reading, so these counts are roughly double what is on the page.
console.log(`Words including the spoken version. Day: ${summary(stats.day)}. Week: ${summary(stats.week)}. Month: ${summary(stats.month)}`)
console.log(`Days before a daily paragraph returns: ${summary(gaps.day)} (${share(gaps.day, 20)}, ${share(gaps.day, 30)})`)
console.log(`Weeks before a weekly paragraph returns: ${summary(gaps.week)} (${share(gaps.week, 3)}, ${share(gaps.week, 5)})`)
console.log(`Months before a monthly note returns: ${gaps.month.length ? summary(gaps.month) : 'never within two years'}`)

if (problems.length) {
  throw new Error(`${problems.length} problem(s):\n${problems.map(p => `  - ${p}`).join('\n')}`)
}
console.log('All readings passed.')
