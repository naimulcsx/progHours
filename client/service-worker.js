self.addEventListener("install", (event) =>
  console.log("Installing service worker!")
)

self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request))
})

self.addEventListener("activate", async (event) => {
  const keys = await caches.keys()
  await Promise.all(
    keys.map((key) => {
      if (key !== cacheName) {
        return caches.delete(key)
      }
    })
  )
  clients.claim()
})
