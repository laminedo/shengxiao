import { Fragment, useEffect, useId, useRef, useState, useSyncExternalStore, type CSSProperties, type FormEvent, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { ELEMENTS } from './lib/glossary'
import { newId } from './lib/store'
import type { Person } from './lib/subject'

export const elementVar = (element: number) => `var(--${ELEMENTS[element].key})`

/** Chinese text, marked up so screen readers and fonts treat it correctly. `decorative` hides
 *  a character from screen readers when the words beside it already say the same thing. */
export function Han({ children, className = '', decorative }: { children: ReactNode; className?: string; decorative?: boolean }) {
  return <span lang="zh-Hans" className={`han ${className}`} aria-hidden={decorative || undefined}>{children}</span>
}

/** The app's mark: the twelve signs as a ring, with one of them lit. */
export function Mark({ small }: { small?: boolean }) {
  return (
    <span className={`app-mark${small ? ' small' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i / 12) * 2 * Math.PI
          return <circle key={i} cx={50 + 30 * Math.sin(angle)} cy={50 - 30 * Math.cos(angle)} r={i === 0 ? 6.4 : 4.4} className={i === 0 ? 'lit' : undefined} />
        })}
      </svg>
    </span>
  )
}

export function Screen({ title, eyebrow, leading, children }: { title: string; eyebrow?: string; leading?: ReactNode; children: ReactNode }) {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const el = titleRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting), { rootMargin: '-48px 0px 0px 0px' })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <main className="screen">
      <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
        {leading && <div className="navbar-leading">{leading}</div>}
        <span className="navbar-title" aria-hidden="true">{title}</span>
      </header>
      <div className="title-block">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 ref={titleRef} className="large-title">{title}</h1>
      </div>
      {children}
    </main>
  )
}

export function Sheet({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [onClose])

  return createPortal(
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet" role="dialog" aria-modal="true" aria-label={title} onClick={e => e.stopPropagation()}>
        <div className="grabber" />
        <div className="sheet-bar">
          <strong>{title}</strong>
          <button className="close" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" /></svg>
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  )
}

export function Ring({ value, caption, size = 128 }: { value: number; caption: string; size?: number }) {
  const id = useId()
  const stroke = 12
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  return (
    <div className="ring" style={{ width: size, height: size }} role="img" aria-label={`${caption}: ${value} out of 100`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--ring-a)" />
            <stop offset="1" stopColor="var(--ring-b)" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--fill)" strokeWidth={stroke} />
        <circle
          className="ring-arc"
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={`url(#${id})`} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={c}
          style={{ '--from': c, '--to': c * (1 - value / 100) } as CSSProperties}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="ring-center">
        <span className="ring-value">{value}</span>
        <span className="ring-caption">{caption}</span>
      </div>
    </div>
  )
}

/** A rating out of five, drawn as dots. */
export function Rating({ value, label }: { value: number; label: string }) {
  return (
    <span className="rating" role="img" aria-label={`${label}: ${value} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => <i key={i} className={i < value ? 'on' : undefined} />)}
    </span>
  )
}

export function Segmented<T extends string>({ value, options, onChange, label, large }: { value: T; options: { value: T; label: string }[]; onChange: (v: T) => void; label: string; large?: boolean }) {
  return (
    <div className={`seg${large ? ' large' : ''}`} role="group" aria-label={label}>
      {options.map(o => (
        <button key={o.value} type="button" aria-pressed={o.value === value} onClick={() => onChange(o.value)}>{o.label}</button>
      ))}
    </div>
  )
}

export function Chevron({ back }: { back?: boolean }) {
  return (
    <svg className="chevron" viewBox="0 0 8 14" width="8" height="14" aria-hidden="true">
      <path d={back ? 'M7 1L1 7l6 6' : 'M1 1l6 6-6 6'} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Read-aloud. One reading plays at a time, and every Listen button watches this
// to know whether it is the one playing.
let playing: { id: string; run: symbol } | null = null
const watchers = new Set<() => void>()
const setPlaying = (next: typeof playing) => {
  playing = next
  watchers.forEach(notify => notify())
}
const watch = (notify: () => void) => {
  watchers.add(notify)
  return () => { watchers.delete(notify) }
}

/** Chinese characters are dropped: an English voice cannot pronounce them. */
const forSpeech = (text: string) =>
  text.replace(/[\u3400-\u9fff]+/g, '').replace(/\(\s*\)/g, '').replace(/\s+([,.:;])/g, '$1').replace(/\s+/g, ' ').trim()

export function Listen({ text, label = 'Listen' }: { text: string; label?: string }) {
  const id = useId()
  const active = useSyncExternalStore(watch, () => playing?.id === id)

  // Stop when this button goes away or its text changes underneath it.
  useEffect(() => () => {
    if (playing?.id === id) {
      window.speechSynthesis.cancel()
      setPlaying(null)
    }
  }, [id, text])

  if (!('speechSynthesis' in window)) return null

  const toggle = () => {
    const synth = window.speechSynthesis
    synth.cancel()
    if (active) return setPlaying(null)

    const run = Symbol()
    const finish = () => { if (playing?.run === run) setPlaying(null) }
    // Spoken sentence by sentence: some browsers cut a single long passage short.
    const sentences = forSpeech(text).match(/[^.!?]+[.!?]*/g) ?? []
    sentences.forEach((sentence, i) => {
      const utterance = new SpeechSynthesisUtterance(sentence.trim())
      utterance.lang = navigator.language.startsWith('en') ? navigator.language : 'en-US'
      utterance.rate = 0.95
      utterance.onerror = finish
      if (i === sentences.length - 1) utterance.onend = finish
      synth.speak(utterance)
    })
    setPlaying({ id, run })
  }

  return (
    <button type="button" className="listen" aria-pressed={active} onClick={toggle}>
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {active
          ? <rect x="7" y="7" width="10" height="10" rx="2" fill="currentColor" />
          : <><path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z" fill="currentColor" /><path d="M15.5 9a4.2 4.2 0 0 1 0 6M18.3 6.3a8 8 0 0 1 0 11.4" /></>}
      </svg>
      {active ? 'Stop' : label}
    </button>
  )
}

export function Switch({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button type="button" role="switch" aria-checked={checked} aria-label={label} className="switch" onClick={() => onChange(!checked)}>
      <span />
    </button>
  )
}

export function Row({ label, children }: { label: ReactNode; children?: ReactNode }) {
  return (
    <div className="row">
      <span className="row-label">{label}</span>
      {children !== undefined && <span className="row-value">{children}</span>}
    </div>
  )
}

const pad = (n: number) => String(n).padStart(2, '0')

type DatePart = 'month' | 'day' | 'year'
type DateParts = Record<DatePart, string>

const DATE_PARTS: Record<DatePart, { label: string; placeholder: string; length: number }> = {
  month: { label: 'Month', placeholder: 'MM', length: 2 },
  day: { label: 'Day', placeholder: 'DD', length: 2 },
  year: { label: 'Year', placeholder: 'YYYY', length: 4 },
}

// Month, day and year in the order the reader's region writes dates.
const LOCALE_ORDER = new Intl.DateTimeFormat()
  .formatToParts(new Date(2000, 10, 22))
  .map(p => p.type)
  .filter((t): t is DatePart => t === 'month' || t === 'day' || t === 'year')
const DATE_ORDER: DatePart[] = LOCALE_ORDER.length === 3 ? LOCALE_ORDER : ['month', 'day', 'year']

/** A typed date: three number boxes that hand focus to each other as they fill. */
function DateField({ value, invalid, onChange }: { value: DateParts; invalid: boolean; onChange: (update: (prev: DateParts) => DateParts) => void }) {
  const inputs = useRef<Partial<Record<DatePart, HTMLInputElement | null>>>({})

  const move = (from: DatePart, step: 1 | -1) => {
    const el = inputs.current[DATE_ORDER[DATE_ORDER.indexOf(from) + step]]
    if (!el) return
    el.focus()
    if (step === 1) el.select()
    else el.setSelectionRange(el.value.length, el.value.length)
  }

  const padded = (part: DatePart, digits: string) =>
    part !== 'year' && digits.length === 1 && digits !== '0' ? `0${digits}` : digits

  // Text can arrive one key at a time or all at once (paste, autofill), so extra
  // digits carry into the following boxes and "3/14/1990" is split at its separators.
  // Updates are applied to the latest state, never to the values captured at render:
  // moving focus fires the old box's blur handler before React has re-rendered.
  const type = (part: DatePart, raw: string) => {
    const next: Partial<DateParts> = {}
    const start = DATE_ORDER.indexOf(part)
    const chunks = raw.split(/\D+/).filter(Boolean)
    const separated = chunks.length > 1
    let rest = chunks[0] ?? ''
    let last = part

    for (let i = start; i < DATE_ORDER.length; i++) {
      const box = DATE_ORDER[i]
      const size = DATE_PARTS[box].length
      let piece: string
      if (separated) {
        if (i - start >= chunks.length) break
        piece = padded(box, chunks[i - start].slice(0, size))
      } else {
        if (i > start && rest === '') break
        piece = rest.slice(0, size)
        rest = rest.slice(size)
        // A first digit that cannot begin a two-digit value is the whole value: "4" for the month means April.
        if (piece.length === 1 && ((box === 'month' && piece > '1') || (box === 'day' && piece > '3'))) piece = `0${piece}`
      }
      next[box] = piece
      last = box
    }

    onChange(prev => ({ ...prev, ...next }))
    const full = next[last]?.length === DATE_PARTS[last].length
    if (full && DATE_ORDER.indexOf(last) < DATE_ORDER.length - 1) move(last, 1)
    else if (last !== part) inputs.current[last]?.focus()
  }

  return (
    <div className="date-field" role="group" aria-label="Date of birth">
      {DATE_ORDER.map((part, i) => (
        <Fragment key={part}>
          {i > 0 && <span aria-hidden="true">/</span>}
          <input
            ref={el => { inputs.current[part] = el }}
            className={`date-part ${part}`}
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="off"
            aria-label={DATE_PARTS[part].label}
            aria-invalid={invalid || undefined}
            placeholder={DATE_PARTS[part].placeholder}
            value={value[part]}
            onChange={e => type(part, e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Backspace' && value[part] === '') {
                e.preventDefault()
                move(part, -1)
              } else if (['/', '-', '.', ' '].includes(e.key)) {
                // Typing a separator, as in 3/14/1990, finishes the current box.
                e.preventDefault()
                if (value[part]) {
                  onChange(prev => ({ ...prev, [part]: padded(part, prev[part]) }))
                  move(part, 1)
                }
              }
            }}
            onBlur={() => onChange(prev => ({ ...prev, [part]: padded(part, prev[part]) }))}
          />
        </Fragment>
      ))}
    </div>
  )
}

export function PersonForm({ initial, submitLabel, onSubmit }: { initial?: Person | null; submitLabel: string; onSubmit: (p: Person) => void }) {
  const [name, setName] = useState(initial?.name ?? '')
  const [date, setDate] = useState<DateParts>(
    initial ? { month: pad(initial.m), day: pad(initial.d), year: String(initial.y) } : { month: '', day: '', year: '' },
  )
  const [timeKnown, setTimeKnown] = useState(initial?.timeKnown ?? false)
  const [time, setTime] = useState(initial ? `${pad(initial.hh)}:${pad(initial.mm)}` : '12:00')

  const y = Number(date.year)
  const m = Number(date.month)
  const d = Number(date.day)
  const dateComplete = date.year.length === 4 && date.month !== '' && date.day !== ''
  const born = new Date(y, m - 1, d)
  const dateError = !dateComplete ? null
    : y < 1900 ? 'Enter a year from 1900 onward.'
    : born.getFullYear() !== y || born.getMonth() !== m - 1 || born.getDate() !== d ? "That date doesn't exist. Check the day and month."
    : born > new Date() ? "A date of birth can't be in the future."
    : null
  const valid = name.trim().length > 0 && dateComplete && !dateError && (!timeKnown || /^\d\d:\d\d$/.test(time))

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!valid) return
    const [hh, mm] = time.split(':').map(Number)
    onSubmit({ id: initial?.id ?? newId(), name: name.trim(), y, m, d, hh, mm, timeKnown })
  }

  return (
    // autoComplete="off" also stops the browser putting old text back into the boxes after a
    // reload, which would show values this form's state does not hold.
    <form className="form" autoComplete="off" onSubmit={submit}>
      <div className="list">
        <label className="row">
          <span className="row-label">Name</span>
          <input className="text-input" value={name} onChange={e => setName(e.target.value)} placeholder="First name" autoComplete="off" maxLength={40} />
        </label>
        <div className="row">
          <span className="row-label">Date of birth</span>
          <DateField value={date} invalid={dateError !== null} onChange={setDate} />
        </div>
        <div className="row">
          <span className="row-label">I know the birth time</span>
          <Switch checked={timeKnown} onChange={setTimeKnown} label="I know the birth time" />
        </div>
        {timeKnown && (
          <label className="row">
            <span className="row-label">Time of birth</span>
            <input className="pill-input" type="time" value={time} onChange={e => setTime(e.target.value)} />
          </label>
        )}
      </div>
      {dateError
        ? <p className="footnote error" role="alert">{dateError}</p>
        : (
          <p className="footnote">
            {timeKnown ? 'Use the local clock time at the place of birth.' : 'The time is optional. It sharpens the picture of which elements suit you.'}
          </p>
        )}

      <button className="btn" type="submit" disabled={!valid}>{submitLabel}</button>
    </form>
  )
}

const ICONS = {
  readings: <><circle cx="12" cy="12" r="4.2" /><path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5.3 5.3L7 7M17 17l1.7 1.7M18.7 5.3L17 7M7 17l-1.7 1.7" /></>,
  signs: <>{Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * 2 * Math.PI
    return <circle key={i} cx={12 + 8.6 * Math.sin(angle)} cy={12 - 8.6 * Math.cos(angle)} r="1.15" fill="currentColor" stroke="none" />
  })}<circle cx="12" cy="12" r="2.6" /></>,
  me: <><circle cx="12" cy="8.2" r="3.9" /><path d="M4.3 20.3c.9-3.9 4-6 7.7-6s6.8 2.1 7.7 6" /></>,
}

export type TabKey = keyof typeof ICONS

export function Icon({ name }: { name: TabKey }) {
  return (
    <svg viewBox="0 0 24 24" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name]}
    </svg>
  )
}
