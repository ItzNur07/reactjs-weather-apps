const CACHE_NAME = "version-1";
const urlToCache = ['index.html' , 'offline.html'];

const self = this;

//install Service worker
self.addEventListener('install',(event) =>{
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            console.log('Opened Cache')

            return cache.addAll(urlToCache);
        })
    )
})
//listen for request
self.addEventListener('fetch',(event) =>{
    event.respondWith(
        caches.match(event.request)
        .then(() =>{
            return fetch(event.request)
            .catch(() => caches.match('offline.html'))
        })
    )
    
})
//actived the services worker
self.addEventListener('activate',(event) =>{
    const cachWhitelist = [];
    cachWhitelist.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames)=> Promise.all(
            cacheNames.map((cacheName) => {
                if(!cachWhitelist.includes(cacheName)){
                    return caches.delete(cacheName);
                }
            })
        ))
    )
})