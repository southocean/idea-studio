/* Idea Studio service worker — NETWORK-FIRST.
   Online: always serves the freshest file from the network (so app updates appear immediately).
   Offline: falls back to the last cached copy (works in tunnels / dead zones).
   GitHub API calls are never cached — the app handles offline edits itself via localStorage. */
const CACHE = 'idea-studio-v6';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', e => e.waitUntil((async () => {
  const keys = await caches.keys();
  await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
  await self.clients.claim();
})()));

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;            // skip GitHub API / CDN — always live
  e.respondWith((async () => {
    try {
      const net = await fetch(req);
      const cache = await caches.open(CACHE);
      cache.put(req, net.clone());
      return net;
    } catch (err) {
      const hit = await caches.match(req);
      if (hit) return hit;
      if (req.mode === 'navigate') {
        const idx = await caches.match('./') || await caches.match('index.html');
        if (idx) return idx;
      }
      throw err;
    }
  })());
});
