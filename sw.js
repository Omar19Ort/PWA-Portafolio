const CACHE_NAME = 'mi-portfolio-v2';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/manifest.json',
    '/offline.html', // Página offline añadida
    '/icons/icon-48x48.png',
    '/icons/icon-72x72.png',
    '/icons/icon-96x96.png',
    '/icons/icon-128x128.png',
    '/icons/icon-144x144.png',
    '/icons/icon-152x152.png',
    '/icons/icon-192x192.png',
    '/icons/icon-256x256.png',
    '/icons/icon-384x384.png',
    '/icons/icon-512x512.png',
    '/img/Mi_foto.jpg',
    '/img/memor.jpeg',
    '/img/memor2.jpeg',
    '/img/memor3.jpeg',
    '/img/99665c42-0ee1-4b85-accb-c4ada9dc3f3a.jpeg',
    '/img/dd14a2c2-2fea-4994-9543-ba87aa58743d.jpeg',
    '/img/e5ce0e6a-513f-4af9-bc43-305ef010461d.jpeg',
    '/img/petshop.jpeg',
    '/img/petshop2.jpeg',
    '/img/f77370c6-9032-440e-a612-c2756a34b36f.jpeg',
    '/img/1ec0e25f-269c-4ff3-a3d6-a82bc016c799.jpeg',
    '/img/19d50679-0472-4f28-989b-3fdb89626973.jpeg',
    '/img/ccae1a24-3566-45ff-b82c-cfd493d7dfc1.jpeg',
    '/img/d1b128c8-a5c2-4142-a014-0ed6990a96d1.jpeg',
    '/img/3ba66a7c-fcd8-4b2c-8747-3a02e24f18e6.jpeg'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
            .catch((error) => {
                console.error('Failed to cache resources:', error);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request).catch(() => {
                // Si no hay conexión, sirve la página offline
                return caches.match('/offline.html');
            });
        })
    );
});

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
        })
    );
});
