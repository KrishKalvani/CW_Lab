//we do this to know how to cache it
var cacheName = 'AS-v1';
var cacheFiles = [
    'afterSchool.html',
    'lessons.js',
    'afterSchool.webmanifest',
    'afterSchool.css',
    'images/advancedEnglish.jpg',
    'images/advancedMath.png',
    'images/bioIcon.png',
    'images/chemistryIcon.png',
    'images/cw1logo.png',
    'images/icon-store-512.png',
    'images/engIcon.png',
    'images/MathIcon.jpg',
    'images/MicroBio.png',
    'images/musicIcon.png',
    'images/organicChem.png',
    'images/physIcon.png'

]

//actually adding to the cache here
self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cache) =>{
            console.log('[Service Worker] Caching all the files');
            return cache.addAll(cacheFiles);
        })
    );
});

//give the files is its there in the cache, otherwise don't
// self.addEventListener('fetch', function (e){
//     e.respondWith(
//         caches.match(e.request).then(function (r){
//             console.log('[Service Worker] Fetching resource: ' + e.request.url);
//             return r
//         })
//     )
// })


//helps to work the app offline, here we are returning our file, if its therem otherwise if not, it will fetch the file from third party sources.
self.addEventListener('fetch', function (e){
    e.respondWith(
        caches.match(e.request).then(function (r){
            return r || fetch(e.request).then(function(response){
                return caches.open(cacheName).then(function (cache){
                    cache.put(e.request, response.clone());
                    return response;
                })
            })
        })
    )
})