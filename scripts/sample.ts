// Prints sample readings to the terminal. Run with: npm run sample
import { dayReading } from '../src/lib/day'
import { longDate } from '../src/lib/dates'
import { pillarName } from '../src/lib/glossary'
import { monthReading } from '../src/lib/month'
import { personSubject, signName, signSubject } from '../src/lib/subject'
import { weekReading } from '../src/lib/week'

const dots = (rating: number) => '●'.repeat(rating) + '○'.repeat(5 - rating)
const today = new Date()
const person = personSubject({ id: 'sample', name: 'Sample', y: 1990, m: 5, d: 15, hh: 9, mm: 30, timeKnown: true })!

for (const subject of [person, signSubject(0)]) {
  console.log(`\n════════ ${subject.personal ? `Born 15 May 1990 · ${signName(subject)}` : `The ${signName(subject)} in general`} ════════`)

  const day = dayReading(subject, today)
  console.log(`\n── DAY · ${longDate(today)} · energy ${day.core.score} (${day.core.mood})\n\n${day.title.toUpperCase()}\n${day.lead}`)
  for (const note of day.notes) console.log(`\n  [${note.tag}] ${note.title}. ${note.text}`)
  for (const area of day.areas) console.log(`\n  ${area.label} ${dots(area.rating)}  ${area.text}`)
  console.log(`\n  Counsel: ${day.counsel}\n  Do: ${day.dos.join('; ')}\n  Don't: ${day.donts.join('; ')}\n  Lucky colour: ${day.lucky.colour}. ${day.lucky.reason}\n  Almanac, ${day.officer.name} day: ${day.officer.text}`)

  const week = weekReading(subject, today)
  console.log(`\n── WEEK from ${longDate(week.start)} · average ${week.average} (${week.mood})\n\n${week.title.toUpperCase()}\n${week.overview}`)
  for (const phase of week.phases) console.log(`\n  ${phase.days} · ${phase.label}\n  ${phase.text}`)
  console.log(`\n  ${week.keyDays.join('\n  ')}`)
  for (const area of week.areas) console.log(`\n  ${area.label} ${dots(area.rating)}  ${area.text}`)
  console.log(`\n  Focus: ${week.focus}\n  Let go: ${week.letGo}`)
  for (const event of week.events) console.log(`  ${event.label}: ${event.text}`)

  const month = monthReading(subject, today)
  console.log(`\n── MONTH · ${pillarName(month.stem, month.branch)} month · energy ${month.score} (${month.mood})\n\n${month.title.toUpperCase()}\n${month.theme.join('\n')}\n\n  ${month.season}`)
  for (const note of month.notes) console.log(`\n  [${note.tag}] ${note.title}. ${note.text}`)
  console.log(`\n  Year of the ${month.yearName}: ${month.yearText.join(' ')}`)
  for (const third of month.thirds) console.log(`\n  ${third.label}, ${third.range}: ${third.text}`)
  for (const area of month.areas) console.log(`\n  ${area.label} ${dots(area.rating)}  ${area.text}`)
  console.log(`\n  Counsel: ${month.counsel}\n  Do: ${month.dos.join('; ')}\n  Don't: ${month.donts.join('; ')}`)
  console.log(`  Best days: ${month.best.map(d => d.info.date.getDate()).join(', ')}. Take care: ${month.low.map(d => d.info.date.getDate()).join(', ')}`)
}
