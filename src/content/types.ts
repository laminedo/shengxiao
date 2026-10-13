export interface Lead {
  title: string
  text: string
}

/** Passages for days that run with the reader (`lift`) and against (`care`). */
export interface Toned<T> {
  lift: T[]
  care: T[]
}

export const AREAS = ['love', 'work', 'money', 'well'] as const
export type Area = typeof AREAS[number]
export const AREA_LABELS: Record<Area, string> = { love: 'Love', work: 'Work', money: 'Money', well: 'Wellbeing' }

/** How strongly a stretch of time stands out against the rest. */
export type Level = 'strong' | 'steady' | 'soft'
