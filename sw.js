const CACHE_NAME = 'mi-pwa-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/manifest.json',
    '/offline.html',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png'
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Archivos en caché');
                return cache.addAll(urlsToCache);
            })
            .then(() => self.skipWaiting())
    );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Interceptar solicitudes
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Si el recurso está en caché, devuélvelo
            if (response) {
                return response;
            }

            // Verifica que la solicitud tenga un esquema válido (http o https)
            if (!event.request.url.startsWith('http')) {
                return fetch(event.request); // Ignora solicitudes no compatibles
            }

            // Intenta obtener el recurso desde la red y almacenarlo en caché
            return fetch(event.request).then((networkResponse) => {
                if (
                    networkResponse &&
                    networkResponse.status === 200 &&
                    networkResponse.type === 'basic'
                ) {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache).catch((error) => {
                            console.error('Error al almacenar en caché:', error);
                        });
                    });
                }
                return networkResponse;
            });
        }).catch(() => {
            // Si todo falla, sirve la página offline si aplica
            return caches.match('/offline.html');
        })
    );
});
