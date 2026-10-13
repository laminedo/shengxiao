import { useEffect, useMemo, useState } from 'react'
import { SIGN_PROFILES } from '../content/signs'
import { joinList } from '../lib/dates'
import { BRANCHES, allies } from '../lib/glossary'
import { signSubject, signYears, type Subject } from '../lib/subject'
import { Chevron, Han, Screen } from '../ui'
import { Board } from './Board'

function Portrait({ animal, years }: { animal: number; years: number[] }) {
  const sign = BRANCHES[animal]
  const profile = SIGN_PROFILES[animal]
  const friends = allies(animal).map(b => BRANCHES[b].animal)
  return (
    <section className="card portrait">
      <Han className="portrait-glyph" decorative>{sign.animalZh}</Han>
      <div>
        <p className="prose">{profile.text}</p>
        <p className="caption">Born in {years.join(', ')}. Gets on best with the {joinList(friends)}; sits opposite the {BRANCHES[(animal + 6) % 12].animal}.</p>
      </div>
    </section>
  )
}

export function Signs({ mine }: { mine: Subject }) {
  const [open, setOpen] = useState<number | null>(null)
  const year = new Date().getFullYear()
  const subject = useMemo(() => (open === null ? null : signSubject(open)), [open])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [open])

  if (subject) {
    return (
      <Board
        key={subject.key}
        subject={subject}
        name={`The ${BRANCHES[subject.animal].animal}`}
        leading={<button className="back" onClick={() => setOpen(null)}><Chevron back />Signs</button>}
        intro={<Portrait animal={subject.animal} years={signYears(subject.animal, year)} />}
      />
    )
  }

  return (
    <Screen title="Signs" eyebrow="The twelve animals">
      <p className="body-2 intro">Read for family and friends. Each sign has its own daily, weekly and monthly reading.</p>
      <div className="sign-grid">
        {BRANCHES.map((sign, animal) => (
          <button key={sign.animal} className={`card sign${animal === mine.animal ? ' mine' : ''}`} onClick={() => setOpen(animal)}>
            <Han className="sign-glyph" decorative>{sign.animalZh}</Han>
            <strong>{sign.animal}</strong>
            <span className="sign-years">{signYears(animal, year).slice(-3).map(y => <span key={y}>{y}</span>)}</span>
            {animal === mine.animal && <span className="chip tinted">Your sign</span>}
          </button>
        ))}
      </div>
      <p className="footnote">A sign's year runs from one Lunar New Year to the next, so a birthday in January or early February may belong to the year before. These readings are for the sign in general; the Readings tab uses your full birth date.</p>
    </Screen>
  )
}
