const CACHE_NAME = "version-1"; //name of cache, storage of browser, we donot have to reload the image everytime we go online, just pick from the cache
const urlsToCache = ["index.html", "offline.html"]; //document should be created right after service worker and should hold our page information when we donot have internet connection

const self = this; //the (this) inside of the service worker is the service worker itself
//ADD EVENTS

//Install SW
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Opened Cache");
        return cache.addAll(urlsToCache); //Writes to cache
      })
      .catch((err) => {
        console.log("Failed to cache");
      })
  );
});

//Listen for requests
self.addEventListener("fetch", (event) => {
  //Looks out for a fetch request and return the code below, of internet connection is faulty, the second.then runs which returns a fall back html
  event.respondWith(
    caches
      .match(event.request) //Enters the .then on every fetch request to return new data to us
      .then(() => {
        return fetch(event.request) //Enters catch block if it cannot fetch data, as in no internet connection
          .catch(() => caches.match("offline.html"));
      })
  );
});

//Activate the SW
self.addEventListener("activate", (event) => {
  //remove all previous caches just to keep the new one

  const cacheWhiteList = [];
  cacheWhiteList.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cachesNames) =>
      Promise.all(
        cachesNames.map((cacheName) => {
          if (!cacheWhiteList.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
