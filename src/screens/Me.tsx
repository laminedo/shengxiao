import { useState } from 'react'
import { SIGN_PROFILES } from '../content/signs'
import { BRANCHES, ELEMENTS, STEMS } from '../lib/glossary'
import type { Store } from '../lib/store'
import { birthLine, signName, type Person, type Subject } from '../lib/subject'
import { Han, PersonForm, Row, Screen, Segmented, Sheet, elementVar } from '../ui'

function Elements({ list }: { list: number[] }) {
  return <>{list.map(el => <span className="element" key={el}><span className="dot" style={{ background: elementVar(el) }} />{ELEMENTS[el].name}</span>)}</>
}

export function Me({ subject, person, store, onUpdate, onReset }: { subject: Subject; person: Person; store: Store; onUpdate: (patch: Partial<Store>) => void; onReset: () => void }) {
  const [editing, setEditing] = useState(false)
  const self = STEMS[subject.self]
  const sign = BRANCHES[subject.animal]
  const profile = SIGN_PROFILES[subject.animal]

  return (
    <Screen title="Me">
      <div className="cols">
        <div className="col">
          <section className="card profile">
            <span className="avatar large" style={{ color: elementVar(subject.yearStem === null ? self.element : STEMS[subject.yearStem].element) }}>
              <Han decorative>{sign.animalZh}</Han>
            </span>
            <div>
              <h2>{person.name}</h2>
              <p className="body-2">{birthLine(person)}</p>
              <p className="caption">{signName(subject)}</p>
            </div>
          </section>
          <button className="btn secondary" onClick={() => setEditing(true)}>Edit birth details</button>

          <h2 className="section">Your signs</h2>
          <div className="list">
            <Row label="Year sign">{signName(subject)} <Han>{sign.animalZh}</Han></Row>
            <Row label="Day element">{self.yang ? 'Yang' : 'Yin'} {ELEMENTS[self.element].name} <Han>{self.zh}</Han></Row>
            {subject.seat !== null && <Row label="Day sign">{BRANCHES[subject.seat].animal} <Han>{BRANCHES[subject.seat].animalZh}</Han></Row>}
            {subject.favorable.length > 0 && <Row label="Your chart welcomes"><Elements list={subject.favorable} /></Row>}
            {subject.unfavorable.length > 0 && <Row label="Has plenty of"><Elements list={subject.unfavorable} /></Row>}
          </div>
          <p className="footnote">Your year sign is the animal everyone knows. Your day element and day sign come from the day you were born: the element is what each reading is measured against, and the sign speaks for home and close partners.</p>

          <h2 className="section">The {sign.animal}</h2>
          <section className="card">
            <p className="prose">{profile.text}</p>
            <p className="tag spaced">Gifts</p>
            <p className="body-2">{profile.gifts}</p>
            <p className="tag spaced">Growing edge</p>
            <p className="body-2">{profile.edge}</p>
          </section>
        </div>

        <div className="col">
          <h2 className="section">Settings</h2>
          <div className="list">
            <div className="row">
              <span className="row-label">Appearance</span>
              <Segmented
                label="Appearance"
                value={store.theme}
                onChange={theme => onUpdate({ theme })}
                options={[{ value: 'system', label: 'Auto' }, { value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }]}
              />
            </div>
          </div>

          <h2 className="section">How readings are made</h2>
          <section className="card">
            <p>Every day, month and year in the Chinese calendar carries one of five elements and one of twelve animals. A reading compares those with yours.</p>
            <p>The element sets the theme, such as a Harvest day or a Pressure day. The animal shows whether the day sides with your sign or pushes against it. The energy score adds the two together, and the calendar itself comes from astronomical solar terms and the traditional almanac.</p>
            <p>The words are written in advance and chosen by those rules, so the same day always gives the same reading. They are offered for reflection and enjoyment, and are no substitute for medical, legal or financial advice.</p>
          </section>
          <p className="footnote">Your details stay in this browser on this device. Nothing is sent to a server, so each device keeps its own copy.</p>

          <button
            className="btn destructive"
            onClick={() => {
              if (window.confirm('Erase your birth details and settings from this device?')) onReset()
            }}
          >
            Erase all data
          </button>
        </div>
      </div>

      {editing && (
        <Sheet title="Birth details" onClose={() => setEditing(false)}>
          <PersonForm
            initial={person}
            submitLabel="Save"
            onSubmit={me => {
              onUpdate({ me })
              setEditing(false)
            }}
          />
        </Sheet>
      )}
    </Screen>
  )
}
