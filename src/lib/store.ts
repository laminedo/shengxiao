import { useEffect, useState } from 'react'
import type { Person } from './subject'

export interface Store {
  me: Person | null
  theme: 'system' | 'light' | 'dark'
}

const KEY = 'shengxiao.v1'
const EMPTY: Store = { me: null, theme: 'system' }

function load(): Store {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? { ...EMPTY, ...JSON.parse(raw) } : EMPTY
  } catch {
    return EMPTY
  }
}

export function useStore() {
  const [store, setStore] = useState<Store>(load)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(store))
    } catch {
      // Storage can be unavailable (private mode); the app still works for the session.
    }
  }, [store])

  useEffect(() => {
    const root = document.documentElement
    if (store.theme === 'system') root.removeAttribute('data-theme')
    else root.dataset.theme = store.theme
  }, [store.theme])

  const update = (patch: Partial<Store>) => setStore(s => ({ ...s, ...patch }))
  const reset = () => setStore(EMPTY)
  return { store, update, reset }
}

export const newId = () => crypto.randomUUID()
