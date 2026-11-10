// Pensar para aprender · funcionamento sen conexión
const CACHE = 'pensar-fbf8cb4b47';
const ASSETS = ["./", "fichas/ca/des-01.jpg", "fichas/ca/des-02.jpg", "fichas/ca/des-03.jpg", "fichas/ca/des-04.jpg", "fichas/ca/des-05.jpg", "fichas/ca/des-06.jpg", "fichas/ca/des-07.jpg", "fichas/ca/des-08.jpg", "fichas/ca/des-09.jpg", "fichas/ca/des-10.jpg", "fichas/ca/des-11.jpg", "fichas/ca/des-12.jpg", "fichas/ca/des-13.jpg", "fichas/ca/des-14.jpg", "fichas/ca/des-15.jpg", "fichas/ca/des-16.jpg", "fichas/ca/rut-01.jpg", "fichas/ca/rut-02.jpg", "fichas/ca/rut-03.jpg", "fichas/ca/rut-04.jpg", "fichas/ca/rut-05.jpg", "fichas/ca/rut-06.jpg", "fichas/ca/rut-07.jpg", "fichas/ca/rut-08.jpg", "fichas/ca/rut-09.jpg", "fichas/ca/rut-10.jpg", "fichas/es/des-01.jpg", "fichas/es/des-02.jpg", "fichas/es/des-03.jpg", "fichas/es/des-04.jpg", "fichas/es/des-05.jpg", "fichas/es/des-06.jpg", "fichas/es/des-07.jpg", "fichas/es/des-08.jpg", "fichas/es/des-09.jpg", "fichas/es/des-10.jpg", "fichas/es/des-11.jpg", "fichas/es/des-12.jpg", "fichas/es/des-13.jpg", "fichas/es/des-14.jpg", "fichas/es/des-15.jpg", "fichas/es/des-16.jpg", "fichas/es/rut-01.jpg", "fichas/es/rut-02.jpg", "fichas/es/rut-03.jpg", "fichas/es/rut-04.jpg", "fichas/es/rut-05.jpg", "fichas/es/rut-06.jpg", "fichas/es/rut-07.jpg", "fichas/es/rut-08.jpg", "fichas/es/rut-09.jpg", "fichas/es/rut-10.jpg", "fichas/gl/des-01.jpg", "fichas/gl/des-02.jpg", "fichas/gl/des-03.jpg", "fichas/gl/des-04.jpg", "fichas/gl/des-05.jpg", "fichas/gl/des-06.jpg", "fichas/gl/des-07.jpg", "fichas/gl/des-08.jpg", "fichas/gl/des-09.jpg", "fichas/gl/des-10.jpg", "fichas/gl/des-11.jpg", "fichas/gl/des-12.jpg", "fichas/gl/des-13.jpg", "fichas/gl/des-14.jpg", "fichas/gl/des-15.jpg", "fichas/gl/des-16.jpg", "fichas/gl/rut-01.jpg", "fichas/gl/rut-02.jpg", "fichas/gl/rut-03.jpg", "fichas/gl/rut-04.jpg", "fichas/gl/rut-05.jpg", "fichas/gl/rut-06.jpg", "fichas/gl/rut-07.jpg", "fichas/gl/rut-08.jpg", "fichas/gl/rut-09.jpg", "fichas/gl/rut-10.jpg", "fontes/didact-gothic-latin-400-normal.woff2", "fontes/didact-gothic-latin-ext-400-normal.woff2", "fontes/fontes.css", "fontes/montserrat-latin-500-normal.woff2", "fontes/montserrat-latin-600-normal.woff2", "fontes/montserrat-latin-700-normal.woff2", "fontes/montserrat-latin-ext-500-normal.woff2", "fontes/montserrat-latin-ext-600-normal.woff2", "fontes/montserrat-latin-ext-700-normal.woff2", "fontes/viga-latin-400-normal.woff2", "fontes/viga-latin-ext-400-normal.woff2", "iconas/apple-touch-icon.png", "iconas/favicon.png", "iconas/icon-192.png", "iconas/icon-512.png", "iconas/icon-maskable-192.png", "iconas/icon-maskable-512.png", "jspdf.umd.min.js", "manifest.webmanifest"];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith('pensar-') && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if (req.mode === 'navigate') {
    // páxina: primeiro a rede (para ter sempre a última versión), se non hai conexión, a copia gardada
    e.respondWith(fetch(req).then((r) => { const cp = r.clone(); caches.open(CACHE).then((c) => c.put('./', cp)); return r; })
      .catch(() => caches.match('./')));
    return;
  }
  e.respondWith(caches.match(req, { ignoreSearch: true }).then((hit) => hit || fetch(req).then((r) => {
    if (r.ok) { const cp = r.clone(); caches.open(CACHE).then((c) => c.put(req, cp)); }
    return r;
  })));
});
