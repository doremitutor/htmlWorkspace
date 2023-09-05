const currentCacheName="v1";
const addResourcesToCache = async (resources) => {
    const cache = await caches.open(currentCacheName);
    await cache.addAll(resources);
};
const putInCache = async (request, response) => {
    const cache = await caches.open(currentCacheName);
    await cache.put(request, response);
};
const deleteCache = async key => {
    console.log('deleting ', key);
    await caches.delete(key)
}
const deleteOldCaches = async () => {
    const cacheKeepList = [currentCacheName];
    const keyList = await caches.keys()
    const cachesToDelete = keyList.filter(key => !cacheKeepList.includes(key))
    await Promise.all(cachesToDelete.map(deleteCache));
}
const cacheFirst = async ({ request, fallbackUrl }) => {
    const responseFromCache = await caches.match(request);
    if (responseFromCache) {
        console.log('from cache');
        return responseFromCache;
    }
    try {
        const responseFromNetwork = await fetch(request);
        putInCache(request, responseFromNetwork.clone());
        console.log('from network');
        return responseFromNetwork;
    } catch (error) {
        const fallbackResponse = await caches.match(fallbackUrl);
        if (fallbackResponse) {
        return fallbackResponse;
        }
        return new Response('Network error happened', {status: 408, headers: {'Content-Type': 'text/plain'}});
    }
};
self.addEventListener("install", (event) => {
    event.waitUntil(addResourcesToCache([
        '/appScratchPad/',
        '/appScratchPad/MiniLogo150x150.png',
        '/appScratchPad/MiniLogo360x360.png',
        '/appScratchPad/MiniLogo512x512.png',
        '/appScratchPad/app.js',
        '/appScratchPad/favicon.ico',
        '/appScratchPad/appScratchPad.webmanifest',
        '/appScratchPad/workers.css'
    ]));
});
self.addEventListener('activate', (event) => {
    console.log('active!');
    event.waitUntil(deleteOldCaches());
});
self.addEventListener('fetch', (event) => {
    console.log('current cache: ', currentCacheName);
    event.respondWith(cacheFirst({request: event.request, fallbackUrl: 'http://doremitutor.com'}));
});
                            /* DEVELOPMENT PHASE REMOVER */
/* self.addEventListener('install', function(e) {
    self.skipWaiting();
});
self.addEventListener('activate', function(e) {
self.registration.unregister()
    .then(function() {
    return self.clients.matchAll();
    })
    .then(function(clients) {
    clients.forEach(client => client.navigate(client.url))
    });
}); */