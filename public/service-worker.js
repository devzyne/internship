    const CACHE_NAME = 'pwa-MinimumQue-version-1'
     const URL_TO_CACHE = ['index.html','offline.html']
      const self = this

  // Installing SW
     self.addEventListener('install', (e) => {
       console.log("pwa")
         e.waitUntill(
         caches.open(CACHE_NAME)
         .then((cache) => {
              console.log('Cache Opened')
             return  cache.addAll(URL_TO_CACHE)
                })
         )
        })

  // Listen for REQUEST, CACHE & RETURN REQUESTS
 self.addEventListener('fetch', (e) => {
   //  console.log(e.request.url)
   e.respondWith(
     caches.match(e.request)
       .then((response) => {
         if(response) return response
         return fetch(e.request).catch(() => caches.match('offline.html'))
       })
   )
 })

  //  Activate SW
 self.addEventListener('activate', (e)=>{
   console.log("activated")
   const cacheWhiteList = []
   cacheWhiteList.push(CACHE_NAME)

   e.waitUntill(
     caches.keys().then((cacheNames) => {
       console.log(cacheNames)
       return Promise.all(
         cacheNames.map((cacheName) => {
           if(!cacheWhiteList.includes(cacheName)){
             return caches.delete(cacheName)
           }
         })
       )
     })
   )
 })
