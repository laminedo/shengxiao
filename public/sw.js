// Offline support: always try the network first so updates arrive immediately,
// and fall back to the last copy seen when the device is offline.
const CACHE = 'shengxiao-v1'

self.addEventListener('install', () => self.skipWaiting())

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) if (key !== CACHE) await caches.delete(key)
    await self.clients.claim()
  })())
})

self.addEventListener('fetch', event => {
  const request = event.request
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return

  event.respondWith((async () => {
    const cache = await caches.open(CACHE)
    try {
      const response = await fetch(request)
      if (response.ok) cache.put(request, response.clone())
      return response
    } catch {
      const cached = (await cache.match(request)) ?? (request.mode === 'navigate' ? await cache.match(self.registration.scope) : undefined)
      return cached ?? Response.error()
    }
  })())
})
