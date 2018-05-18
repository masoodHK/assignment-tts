var files = [
    '/',
    'index.html',
    'js/main.js',
    'js/timings.json',
    'css/main.css',
    'images/ramadan.jpg',
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'
];
var cacheName = 'ramadan-v14';

self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(cacheName).then(function(cache){
            cache.addAll(files);
        })
    );
});
self.addEventListener('activate', function(event){
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(
                keys.map(key => {
                    if(key !== cacheName){
                        return caches.delete(key);
                    }
                })
            )
        )
    )
})
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    )
})