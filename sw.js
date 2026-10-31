/**
 * Pihu's Birthday Website - Service Worker
 * Part C-9: Offline install support
 */

const CACHE_NAME = "pihu-birthday-v1";
const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./css/style.css",
  "./js/main.js",
  "./js/scenes.js",
  "./manifest.json"
];

// Install: cache core assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(() => {
        // Some assets may not be available offline — ignore errors
      });
    })
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch: serve from cache, fall back to network
self.addEventListener("fetch", (event) => {
  // Only cache GET requests for same origin
  if (event.request.method !== "GET") return;
  
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          // Cache successful responses for photos and audio
          if (response && response.status === 200) {
            const url = new URL(event.request.url);
            const shouldCache =
              url.pathname.includes("/photo/") ||
              url.pathname.includes("/assets/audio/") ||
              url.pathname.endsWith(".css") ||
              url.pathname.endsWith(".js");

            if (shouldCache) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseClone);
              });
            }
          }
          return response;
        })
        .catch(() => {
          // If both fail, return a simple offline response
          return new Response(
            '<div style="font-family:sans-serif;text-align:center;padding:40px;color:#fff;background:#1b1035;min-height:100vh;display:flex;align-items:center;justify-content:center;flex-direction:column"><h1>🎂</h1><p>Offline — but your birthday surprise is saved!</p><p>The main site will load when you reconnect.</p></div>',
            { headers: { "Content-Type": "text/html" } }
          );
        });
    })
  );
});
