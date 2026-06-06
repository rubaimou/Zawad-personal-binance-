const CACHE_NAME = 'zawad-hisab-v1';
const urlsToCache = [
  '/',
  '/index.html',
  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
  'https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js',
  'https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js'
];

// সার্ভিস ওয়ার্কার ইনস্টল করা এবং ফাইলগুলো ক্যাশে সেভ করা
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// অফলাইনে থাকার সময় ক্যাশ থেকে ফাইল লোড করা
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // ক্যাশে ফাইল থাকলে সেটি রিটার্ন করবে, না থাকলে নেটওয়ার্ক থেকে আনবে
        return response || fetch(event.request);
      })
  );
});
