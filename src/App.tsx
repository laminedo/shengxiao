import { useEffect, useMemo, useState } from 'react'
import { useStore } from './lib/store'
import { personSubject } from './lib/subject'
import { Board } from './screens/Board'
import { Me } from './screens/Me'
import { Onboarding } from './screens/Onboarding'
import { Signs } from './screens/Signs'
import { Icon, Mark, type TabKey } from './ui'

const TABS: { key: TabKey; label: string }[] = [
  { key: 'readings', label: 'Readings' },
  { key: 'signs', label: 'Signs' },
  { key: 'me', label: 'Me' },
]

export function App() {
  const { store, update, reset } = useStore()
  const [tab, setTab] = useState<TabKey>('readings')
  const subject = useMemo(() => (store.me ? personSubject(store.me) : null), [store.me])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [tab])

  if (!store.me || !subject) {
    return <div className="app"><Onboarding onDone={me => { update({ me }); setTab('readings') }} /></div>
  }

  // Phones and portrait tablets get the floating tab bar; wider screens get the sidebar.
  const links = (className: string) => TABS.map(t => (
    <button key={t.key} className={className} aria-label={t.label} aria-current={tab === t.key ? 'page' : undefined} onClick={() => setTab(t.key)}>
      <Icon name={t.key} />
      <span>{t.label}</span>
    </button>
  ))

  return (
    <div className="app has-nav">
      <aside className="sidebar">
        <div className="brand">
          <Mark small />
          <strong>Shengxiao</strong>
        </div>
        <nav aria-label="Sections">{links('side-item')}</nav>
      </aside>

      <div className="content">
        {tab === 'readings' && <Board key={subject.key} subject={subject} />}
        {tab === 'signs' && <Signs mine={subject} />}
        {tab === 'me' && <Me subject={subject} person={store.me} store={store} onUpdate={update} onReset={reset} />}
      </div>

      <nav className="tabbar" aria-label="Sections">{links('tab')}</nav>
    </div>
  )
}
