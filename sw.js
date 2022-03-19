const cacheName = "v2";

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll([
        './',
        './index.html',
        // './style.css',
        // './app.js',
      ]);
    })
  );
});

self.addEventListener("activate", function (e) {
  // eslint-disable-next-line no-console
  console.log("[ServiceWorker] Activate");
  return self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) {
        return r;
      }
      const response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })()
  );
});
