const CACHE_NAME = 'zawad-hisab-v2'; // ভার্সন v1 থেকে v2 করা হলো
const urlsToCache = [
  '/',
  '/index.html',
  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
  'https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js',
  'https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js'
];

// নতুন সার্ভিস ওয়ার্কার ইনস্টল হওয়া
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting()) // নতুন কোড সাথে সাথে অ্যাক্টিভেট করবে
  );
});

// পুরোনো ক্যাশ ফাইলগুলো স্বয়ংক্রিয়ভাবে মুছে ফেলার লজিক (অটো ক্যাশ ক্লিয়ার)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Clearing old cache...');
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
