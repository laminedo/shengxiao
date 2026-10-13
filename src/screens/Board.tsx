// The reading board: day, week and month readings for one reader, with a way to move through time.
import { useMemo, useState, type ReactNode } from 'react'
import { almanac, luckyHours } from '../lib/calendar'
import { dayReading, type AreaReading, type DayCore, type DayReading, type Note } from '../lib/day'
import { addDays, fmt, joinList, longDate, monthName, sameDay, shortDate, startOfDay, weekStart, weekday } from '../lib/dates'
import { BRANCHES, ELEMENTS, TEN_GODS, pillarName, pillarZh } from '../lib/glossary'
import { monthReading, type MonthReading } from '../lib/month'
import { bandFor } from '../lib/standing'
import { animalName, signName, type Subject } from '../lib/subject'
import { weekReading, type CalendarEvent, type WeekReading } from '../lib/week'
import { Chevron, Han, Listen, Rating, Ring, Row, Screen, Segmented, elementVar } from '../ui'

type Mode = 'day' | 'week' | 'month'

function Hero({ score, caption, title, chips, spoken }: { score: number; caption: string; title: string; chips: string[]; spoken: string }) {
  return (
    <section className="card hero">
      <Ring value={score} caption="Energy" />
      <div className="hero-text">
        <p className="caption">{caption}</p>
        <h2 className="headline">{title}</h2>
        <div className="chips">
          {chips.map((chip, i) => <span className={`chip${i === 0 ? ' tinted' : ''}`} key={chip}>{chip}</span>)}
        </div>
        <Listen text={spoken} />
      </div>
    </section>
  )
}

function Notes({ notes, heading }: { notes: Note[]; heading: string }) {
  if (notes.length === 0) return null
  return (
    <>
      <h2 className="section">{heading}</h2>
      {notes.map(note => (
        <section className={`card note ${note.tone}`} key={note.tag + note.title}>
          <p className="tag">{note.tag}</p>
          <h3>{note.title}</h3>
          <p className="prose">{note.text}</p>
        </section>
      ))}
    </>
  )
}

function Areas({ areas }: { areas: AreaReading[] }) {
  return (
    <section className="card areas">
      {areas.map(area => (
        <div className="area" key={area.key}>
          <div className="area-head">
            <h3>{area.label}</h3>
            <Rating value={area.rating} label={area.label} />
          </div>
          <p className="prose">{area.text}</p>
        </div>
      ))}
    </section>
  )
}

function Counsel({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="card counsel">
      <p className="tag">{label}</p>
      <p className="quote">{children}</p>
    </section>
  )
}

function DoDont({ dos, donts }: { dos: string[]; donts: string[] }) {
  return (
    <div className="grid-2">
      <section className="card">
        <h3 className="mark do">Do</h3>
        <ul className="plain">{dos.map(t => <li key={t}>{t}</li>)}</ul>
      </section>
      <section className="card">
        <h3 className="mark dont">Don't</h3>
        <ul className="plain">{donts.map(t => <li key={t}>{t}</li>)}</ul>
      </section>
    </div>
  )
}

function Events({ events }: { events: CalendarEvent[] }) {
  if (events.length === 0) return null
  return (
    <>
      <h2 className="section">In the calendar</h2>
      {events.map(event => (
        <section className="card note plain" key={event.label + event.date.getTime()}>
          <p className="tag">{longDate(event.date)}</p>
          <h3>{event.label}</h3>
          {event.text && <p className="prose">{event.text}</p>}
        </section>
      ))}
    </>
  )
}

function DayView({ subject, reading, caption }: { subject: Subject; reading: DayReading; caption: string }) {
  const { core, lucky } = reading
  const { info } = core
  const extras = useMemo(() => almanac(info.date), [info])
  const hours = luckyHours(extras.goodHours, subject.animal)
  const god = TEN_GODS[core.god]
  const luckyEl = ELEMENTS[lucky.element]

  return (
    <div className="cols">
      <div className="col">
        <Hero score={core.score} caption={caption} title={reading.title} chips={[core.mood, `${god.plain} day`, signName(subject)]} spoken={reading.spoken} />
        <section className="card">
          <p className="prose lead">{reading.lead}</p>
        </section>
        <Notes notes={reading.notes} heading="In the balance" />

        <h2 className="section">Your day</h2>
        <Areas areas={reading.areas} />
        <Counsel label="Today's counsel">{reading.counsel}</Counsel>
      </div>

      <div className="col">
        <DoDont dos={reading.dos} donts={reading.donts} />

        <h2 className="section">In your favour</h2>
        <div className="list">
          <Row label="Element"><span className="dot" style={{ background: elementVar(lucky.element) }} />{luckyEl.name} <Han>{luckyEl.zh}</Han></Row>
          <Row label="Colour">{lucky.colour}</Row>
          <Row label="Numbers">{luckyEl.numbers.join(' and ')}</Row>
          <Row label="Direction">{luckyEl.direction}</Row>
          {hours.length > 0 && <Row label="Best hours">{joinList(hours.map(branch => BRANCHES[branch].hours))}</Row>}
        </div>
        <p className="footnote">{lucky.reason}</p>

        <h2 className="section">Almanac</h2>
        <div className="list">
          <Row label="Day pillar"><Han>{pillarZh(info.stem, info.branch)}</Han> {pillarName(info.stem, info.branch)}</Row>
          <Row label="For you">{god.plain} day <span className="quiet">{god.name} <Han>{god.zh}</Han></span></Row>
          <Row label="Lunar date">Month {info.lunarMonth}, day {info.lunarDay} <Han>{info.lunarZh}</Han></Row>
          <Row label="Moon">{info.moonName}</Row>
          {!info.term && extras.nextTerm && <Row label="Next solar term">{extras.nextTerm.name}, {shortDate(extras.nextTerm.date)}</Row>}
        </div>
        <section className="card">
          <p className="tag">{reading.officer.name} day <Han>{reading.officer.zh}</Han></p>
          <p className="prose">{reading.officer.text}</p>
          {extras.goodFor.length > 0 && (
            <>
              <h3 className="mark do">Traditionally good for</h3>
              <div className="chips">{extras.goodFor.map(t => <span className="chip" key={t}>{t}</span>)}</div>
            </>
          )}
          {extras.avoid.length > 0 && (
            <>
              <h3 className="mark dont">Traditionally avoided</h3>
              <div className="chips">{extras.avoid.map(t => <span className="chip" key={t}>{t}</span>)}</div>
            </>
          )}
        </section>
        <p className="footnote">The almanac is the same for everyone on this date. Everything above it is measured against {subject.personal ? 'your chart' : `the ${animalName(subject)}`}.</p>
      </div>
    </div>
  )
}

function DayRow({ day, tag, onPick }: { day: DayCore; tag?: string; onPick: (date: Date) => void }) {
  const { date } = day.info
  return (
    <button className="row person" onClick={() => onPick(date)}>
      <span className="day-date">
        <span>{fmt(date, { weekday: 'short' })}</span>
        <strong>{date.getDate()}</strong>
      </span>
      <span className="person-text">
        <strong>{TEN_GODS[day.god].plain} day</strong>
        <span className="caption">{[day.mood, `${BRANCHES[day.info.branch].animal} day`, tag].filter(Boolean).join(' · ')}</span>
      </span>
      <span className={`score-badge ${bandFor(day.score)}`}>{day.score}</span>
      <Chevron />
    </button>
  )
}

function WeekView({ subject, week, today, caption, onPick }: { subject: Subject; week: WeekReading; today: Date; caption: string; onPick: (date: Date) => void }) {
  const tag = (day: DayCore) =>
    sameDay(day.info.date, today) ? 'Today' : day === week.best ? 'Strongest' : day === week.low ? 'Take care' : undefined

  return (
    <div className="cols">
      <div className="col">
        <Hero score={week.average} caption={caption} title={week.title} chips={[week.mood, signName(subject)]} spoken={week.spoken} />
        <section className="card">
          <p className="prose lead">{week.overview}</p>
          {week.keyDays.map(text => <p className="prose" key={text}>{text}</p>)}
        </section>

        <h2 className="section">The shape of the week</h2>
        <section className="card timeline">
          {week.phases.map(phase => (
            <div className="phase" key={phase.days}>
              <p className="tag">{phase.days}</p>
              <h3>{phase.label}</h3>
              <p className="prose">{phase.text}</p>
            </div>
          ))}
        </section>

        <h2 className="section">Your week</h2>
        <Areas areas={week.areas} />
        <p className="footnote">Ratings compare this week with {subject.personal ? 'your' : `the ${animalName(subject)}'s`} usual week.</p>
      </div>

      <div className="col">
        <div className="grid-2">
          <Counsel label="Focus on">{week.focus}</Counsel>
          <Counsel label="Let go of">{week.letGo}</Counsel>
        </div>

        <h2 className="section">Day by day</h2>
        <div className="list">
          {week.days.map(day => <DayRow key={day.info.n} day={day} tag={tag(day)} onPick={onPick} />)}
        </div>
        <p className="footnote">The energy score is the average of the seven days. Tap a day to open its reading.</p>

        <Events events={week.events} />
      </div>
    </div>
  )
}

function MonthView({ subject, month, today, onPick }: { subject: Subject; month: MonthReading; today: Date; onPick: (date: Date) => void }) {
  const first = month.days[0].info.date
  const gridStart = weekStart(first)
  const blanks = Math.round((first.getTime() - gridStart.getTime()) / 86_400_000)
  const dates = (days: DayCore[]) => days.map(d => shortDate(d.info.date)).join(', ')
  const god = TEN_GODS[month.god]

  return (
    <div className="cols">
      <div className="col">
        <Hero
          score={month.score}
          caption={`${pillarName(month.stem, month.branch)} month, from ${shortDate(month.since)}`}
          title={month.title}
          chips={[month.mood, `${god.plain} month`, signName(subject)]}
          spoken={month.spoken}
        />
        <section className="card">
          <p className="prose lead">{month.theme[0]}</p>
          <p className="prose">{month.theme[1]}</p>
          <p className="prose aside">{month.season}</p>
        </section>
        <Notes notes={month.notes} heading="In the balance" />

        <h2 className="section">The year behind it</h2>
        <section className="card">
          <p className="tag">Year of the {month.yearName}</p>
          {month.yearText.map(text => <p className="prose" key={text}>{text}</p>)}
        </section>

        <h2 className="section">How the month unfolds</h2>
        <section className="card timeline">
          {month.thirds.map(third => (
            <div className="phase" key={third.label}>
              <p className="tag">{third.range}</p>
              <h3>{third.label}</h3>
              <p className="prose">{third.text}</p>
            </div>
          ))}
        </section>

        <h2 className="section">Your month</h2>
        <Areas areas={month.areas} />
        <Counsel label="This month's counsel">{month.counsel}</Counsel>
      </div>

      <div className="col">
        <DoDont dos={month.dos} donts={month.donts} />

        <h2 className="section">Day by day</h2>
        <section className="card">
          <div className="calendar">
            {Array.from({ length: 7 }, (_, i) => (
              <span className="cal-head" key={i} aria-hidden="true">{fmt(addDays(gridStart, i), { weekday: 'narrow' })}</span>
            ))}
            {Array.from({ length: blanks }, (_, i) => <span key={`blank-${i}`} />)}
            {month.days.map(day => (
              <button
                key={day.info.n}
                className={`cal-day ${bandFor(day.score)}${sameDay(day.info.date, today) ? ' today' : ''}`}
                aria-label={`${longDate(day.info.date)}: energy ${day.score}, ${day.mood}`}
                onClick={() => onPick(day.info.date)}
              >
                {day.info.date.getDate()}
              </button>
            ))}
          </div>
          <div className="legend">
            <span><i className="cal-day high" />Strong</span>
            <span><i className="cal-day mid" />Steady</span>
            <span><i className="cal-day low" />Take care</span>
          </div>
        </section>
        <p className="footnote">Tap a day to open its reading.</p>

        <h2 className="section">Key dates</h2>
        <div className="list">
          <Row label="Best days">{dates(month.best)}</Row>
          <Row label="Take care">{dates(month.low)}</Row>
          {month.events.map(event => <Row label={event.label} key={event.label + event.date.getTime()}>{shortDate(event.date)}</Row>)}
        </div>
        <p className="footnote">The month's score comes from its own pillar, the {pillarName(month.stem, month.branch)}. Each day is scored separately.</p>
      </div>
    </div>
  )
}

/** Day, week and month readings for one reader. `name` fixes the screen's title; without it the title follows the date. */
export function Board({ subject, name, leading, intro }: { subject: Subject; name?: string; leading?: ReactNode; intro?: ReactNode }) {
  const today = useMemo(() => startOfDay(new Date()), [])
  const [mode, setMode] = useState<Mode>('day')
  const [date, setDate] = useState(today)

  const day = useMemo(() => dayReading(subject, date), [subject, date])
  const week = useMemo(() => weekReading(subject, date), [subject, date])
  const month = useMemo(() => monthReading(subject, date), [subject, date])

  const dayGap = Math.round((date.getTime() - today.getTime()) / 86_400_000)
  const weekGap = Math.round((weekStart(date).getTime() - weekStart(today).getTime()) / (7 * 86_400_000))
  const monthGap = (date.getFullYear() - today.getFullYear()) * 12 + date.getMonth() - today.getMonth()
  const current = mode === 'day' ? dayGap === 0 : mode === 'week' ? weekGap === 0 : monthGap === 0

  const step = (by: 1 | -1) => {
    setDate(mode === 'day' ? addDays(date, by) : mode === 'week' ? addDays(date, 7 * by) : new Date(date.getFullYear(), date.getMonth() + by, 1))
    window.scrollTo(0, 0)
  }
  const pick = (picked: Date) => {
    setDate(picked)
    setMode('day')
    window.scrollTo(0, 0)
  }

  const weekRange = `${shortDate(week.start)} – ${shortDate(addDays(week.start, 6))}`
  const period = mode === 'day' ? (dayGap === 0 ? 'Today' : dayGap === 1 ? 'Tomorrow' : dayGap === -1 ? 'Yesterday' : weekday(date))
    : mode === 'week' ? (weekGap === 0 ? 'This Week' : weekGap === 1 ? 'Next Week' : weekGap === -1 ? 'Last Week' : `Week of ${shortDate(week.start)}`)
    : monthName(date)
  const detail = mode === 'day' ? longDate(date) : mode === 'week' ? weekRange : String(date.getFullYear())
  const unit = mode === 'day' ? 'day' : mode === 'week' ? 'week' : 'month'

  const hour = new Date().getHours()
  const greeting = hour < 5 ? 'Good evening' : hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'
  const whose = subject.name ? `${subject.name}'s` : `The ${animalName(subject)}'s`
  const dayCaption = subject.name && dayGap === 0 ? `${greeting}, ${subject.name}` : `${whose} day`

  return (
    <Screen title={name ?? period} eyebrow={name ? `${period} · ${detail}` : detail} leading={leading}>
      {intro}
      <div className="toolbar">
        <Segmented
          large
          label="Reading period"
          value={mode}
          onChange={setMode}
          options={[{ value: 'day', label: 'Day' }, { value: 'week', label: 'Week' }, { value: 'month', label: 'Month' }]}
        />
        <div className="stepper">
          <button className="nav-btn" onClick={() => step(-1)} aria-label={`Previous ${unit}`}><Chevron back /></button>
          <button className="link" onClick={() => setDate(today)} disabled={current}>{mode === 'day' ? 'Today' : `This ${unit}`}</button>
          <button className="nav-btn" onClick={() => step(1)} aria-label={`Next ${unit}`}><Chevron /></button>
        </div>
      </div>
      {mode === 'day' && <DayView subject={subject} reading={day} caption={dayCaption} />}
      {mode === 'week' && <WeekView subject={subject} week={week} today={today} caption={`${whose} week · ${weekRange}`} onPick={pick} />}
      {mode === 'month' && <MonthView subject={subject} month={month} today={today} onPick={pick} />}
    </Screen>
  )
}
