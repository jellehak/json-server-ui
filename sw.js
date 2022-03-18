self.addEventListener("install", function (e) {
  // eslint-disable-next-line no-console
  console.log("[ServiceWorker] Install");
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  // eslint-disable-next-line no-console
  console.log("[ServiceWorker] Activate");
  return self.clients.claim();
});

self.addEventListener("fetch", function (e) {});
