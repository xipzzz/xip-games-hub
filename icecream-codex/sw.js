
const CACHE = 'little-scoop-0e22621386e8';
const FILES = ["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png","./assets/index-DGg0jFjA.css","./assets/index-DMFtLvTB.js","./assets/solver.worker-Di7CFin_.js"];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(key => key.startsWith('little-scoop-') && key !== CACHE).map(key => caches.delete(key))))
    .then(() => self.clients.claim()));
});
// Readiness and control are separate. Let a ready page request control again.
self.addEventListener('message', event => {
  if (event.data === 'CLAIM_CLIENTS') event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(caches.open(CACHE).then(async cache => {
    // Static files are identical across Origins. Precache requests lack the
    // Origin header sent by crossorigin scripts/styles under Vite's Vary: Origin.
    const hit = await cache.match(event.request, { ignoreSearch: true, ignoreVary: true });
    if (hit) return hit;
    try { return await fetch(event.request); }
    catch {
      if (event.request.mode === 'navigate') return (await cache.match('./index.html')) || Response.error();
      return Response.error();
    }
  }));
});
