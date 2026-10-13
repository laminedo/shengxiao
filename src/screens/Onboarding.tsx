import type { Person } from '../lib/subject'
import { Mark, PersonForm } from '../ui'

export function Onboarding({ onDone }: { onDone: (me: Person) => void }) {
  return (
    <main className="screen onboarding">
      <div className="welcome">
        <Mark />
        <h1 className="large-title">Your Chinese zodiac, read every day</h1>
        <p className="body-2">Enter your birth date for a daily, weekly and monthly reading written for your sign and your chart.</p>
      </div>
      <PersonForm submitLabel="Show my reading" onSubmit={onDone} />
      <p className="footnote centered">Your details stay in this browser. Nothing is sent to a server.</p>
    </main>
  )
}
