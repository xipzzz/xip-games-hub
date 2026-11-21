const CACHE = 'little-key-cloud-v1';
const SHELL = ['./', './index.html', './manifest.webmanifest', './apple-touch-icon.png', './icon.svg', './icon-512.png'];
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE).then(async cache => {
    await cache.addAll(SHELL);
    const html = await (await cache.match('./index.html', {ignoreVary:true})).text();
    const assets = [...html.matchAll(/(?:src|href)=["']([^"']+/assets/[^"']+)["']/g)].map(match => match[1]);
    await cache.addAll(assets);
  }).then(() => self.skipWaiting())); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('little-key-cloud-') && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) return;
  // Development uses Vite HMR. Cache only the production app, never its websocket client.
  if (url.pathname.startsWith('./@') || url.pathname.startsWith('./src/') || url.pathname.includes('node_modules')) return;
  event.respondWith(fetch(event.request).then(response => {
    if (response.ok) { const copy = response.clone(); event.waitUntil(caches.open(CACHE).then(cache => cache.put(event.request, copy))); }
    return response;
  }).catch(async () => {
    const cached = await caches.match(event.request, {ignoreVary:true});
    if (cached) return cached;
    if (event.request.mode === 'navigate') { const page = await caches.match('./index.html', {ignoreVary:true}); if (page) return page; }
    return Response.error();
  }));
});
