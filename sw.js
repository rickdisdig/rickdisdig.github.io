const VERSION = "1.8"
const CACHE = "gilpgcl"
const ARCHIVOS = [
 "css/estilos.css",
 "img/icono2048.png",
 "img/maskable_icon_x48.png",
 "img/maskable_icon_x72.png",
 "img/maskable_icon_x96.png",
 "img/maskable_icon_x128.png",
 "img/maskable_icon_x192.png",
 "img/maskable_icon_x384.png",
 "img/maskable_icon_x512.png",
 "img/maskable_icon.png",
 "js/config.js",
 "lib/js/regSw.js",
 "favicon.ico",
 "index.html",
 "site.webmanifest",
 "/"
]

if (self instanceof
 ServiceWorkerGlobalScope) {
 // Evento al empezar a instalar
 self.addEventListener("install",
  instala)

 // Evento al solicitar a la red
 self.addEventListener("fetch",
  descargaDatos)

 // Evento cuando está activo.
 self.addEventListener("activate",
  activo)
}

function activo() {
 console.log(
  "Service Worker activo.")
}

/**
 * @param {ExtendableEvent} evt
 */
function instala(evt) {
 console.log(
  "Service Worker instalando.")
 evt.waitUntil(cargaCache());
}

/**
 * @param {FetchEvent} evt
 */
function descargaDatos(evt) {
 if (
  evt.request.method === "GET") {
  evt.respondWith(usaCache(evt))
 }
}

async function cargaCache() {
 console.log(
  "Intentando cargar cache:",
  CACHE)
 // Borra todos los chaches.
 const keys = await caches.keys()
 for (const key of keys) {
  await caches.delete(key)
 }
 // Carga el nuevo contenido.
 const cache =
  await caches.open(CACHE)
 await cache.addAll(ARCHIVOS)
 console.
  log("Cache cargado:", CACHE)
 console.log("Versión:", VERSION)
}

/** @param {FetchEvent} evt */
async function usaCache(evt) {
 // Busca el contenido del cache.
 const cache =
  await caches.open(CACHE)
 const response =
  await cache.match(evt.request,
   { ignoreSearch: true })
 if (response) {
  /* Si lo encuentra, devuelve el
   * archivo del cache. */
  return response
 } else {
  /* Si no lo encuentra, lo
   * empieza a descargar de la red
   * y devuelve la promesa. */
  return fetch(evt.request)
 }
}