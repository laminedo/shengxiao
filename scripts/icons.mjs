// Draws the app icon as full-bleed PNGs: a dark field with a ring of twelve dots, one lit.
// Run with: npm run icons
import { writeFileSync } from 'node:fs'
import { crc32, deflateSync } from 'node:zlib'

const top = [0x2c, 0x2c, 0x34], bottom = [0x14, 0x14, 0x18]
function pixel(u, v) { // u, v in 0..1
  let c = top.map((t, i) => t + (bottom[i] - t) * v)
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * 2 * Math.PI
    const cx = 0.5 + 0.255 * Math.sin(a), cy = 0.5 - 0.255 * Math.cos(a)
    const r = i === 0 ? 0.056 : 0.0375
    if ((u - cx) ** 2 + (v - cy) ** 2 <= r * r) {
      const [dot, alpha] = i === 0 ? [[0xff, 0x5a, 0x4d], 1] : [[255, 255, 255], 0.78]
      c = c.map((bg, k) => bg + (dot[k] - bg) * alpha)
    }
  }
  return c
}
function png(size) {
  const ss = 4, raw = Buffer.alloc(size * (size * 4 + 1))
  for (let y = 0; y < size; y++) {
    const row = y * (size * 4 + 1)
    for (let x = 0; x < size; x++) {
      const sum = [0, 0, 0]
      for (let sy = 0; sy < ss; sy++) for (let sx = 0; sx < ss; sx++) {
        const c = pixel((x + (sx + 0.5) / ss) / size, (y + (sy + 0.5) / ss) / size)
        sum[0] += c[0]; sum[1] += c[1]; sum[2] += c[2]
      }
      const o = row + 1 + x * 4
      raw[o] = Math.round(sum[0] / 16); raw[o + 1] = Math.round(sum[1] / 16); raw[o + 2] = Math.round(sum[2] / 16); raw[o + 3] = 255
    }
  }
  const chunk = (type, data) => {
    const body = Buffer.concat([Buffer.from(type), data]), out = Buffer.alloc(body.length + 8)
    out.writeUInt32BE(data.length, 0); body.copy(out, 4); out.writeUInt32BE(crc32(body) >>> 0, body.length + 4)
    return out
  }
  const head = Buffer.alloc(13)
  head.writeUInt32BE(size, 0); head.writeUInt32BE(size, 4); head[8] = 8; head[9] = 6
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', head), chunk('IDAT', deflateSync(raw, { level: 9 })), chunk('IEND', Buffer.alloc(0))])
}
const out = process.argv[2]
for (const [name, size] of [['icon-192.png', 192], ['icon-512.png', 512], ['apple-touch-icon.png', 180]]) writeFileSync(`${out}/${name}`, png(size))
