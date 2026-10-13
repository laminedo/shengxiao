// Choosing which written passage to use. A year of readings is composed in order, like an
// almanac going to print, and each kind of passage keeps its own running count. That way a
// passage is not used again until every alternative to it has had a turn.

function hash(text: string): number {
  let h = 2166136261
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function shuffled(n: number, seed: number): number[] {
  let state = seed >>> 0
  const random = () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  const order = Array.from({ length: n }, (_, i) => i)
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[order[i], order[j]] = [order[j], order[i]]
  }
  return order
}

/** The `count`-th choice out of `n`: every block of `n` uses each option once, in an order
 *  that differs from block to block, and no option is ever used twice running. */
function rotate(n: number, count: number, seed: number): number {
  if (n <= 1) return 0
  if (n === 2) return (count + seed) % 2
  const block = Math.floor(count / n)
  const order = shuffled(n, seed + block * 7919)
  if (block > 0) {
    const previous = shuffled(n, seed + (block - 1) * 7919)
    if (order[0] === previous[n - 1]) [order[0], order[1]] = [order[1], order[0]]
  }
  return order[count % n]
}

export type Take = <T>(key: string, list: readonly T[]) => T

export function taker(seed: string): Take {
  const counts = new Map<string, number>()
  return (key, list) => {
    const count = counts.get(key) ?? 0
    counts.set(key, count + 1)
    return list[rotate(list.length, count, hash(`${seed}|${key}`))]
  }
}

/** Replaces {name} markers in a passage. "a {animal} day" becomes "an Ox day". */
export const fill = (text: string, slots: Record<string, string>) =>
  text.replace(/(\b[Aa] )?\{(\w+)\}/g, (marker, article: string | undefined, name: string) => {
    const value = slots[name]
    if (value === undefined) return marker
    if (!article) return value
    return (/^[AEIOU]/.test(value) ? article.replace(' ', 'n ') : article) + value
  })

/** A small cache that keeps the most recent `limit` results. */
export function keep<T>(limit: number): (key: string, make: () => T) => T {
  const kept = new Map<string, T>()
  return (key, make) => {
    let value = kept.get(key)
    if (value === undefined) {
      value = make()
      kept.set(key, value)
      if (kept.size > limit) kept.delete(kept.keys().next().value!)
    }
    return value
  }
}
