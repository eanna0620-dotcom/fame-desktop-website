/* FAME service worker
   - HTML (navigation): network-first, so page/CSS edits show up by re-uploading only index.html.
   - Assets (images/fonts): cache-first, downloaded once then served from cache (offline-capable).
   Cache name is derived from the asset list, so it stays stable across HTML-only edits. */
const CACHE="fame-3e01536e";
const ASSETS=["./index.html","./font-01.woff2","./font-02.woff2","./font-03.woff2","./font-04.woff2","./favicon.svg","./001.webp","./002.webp","./003.webp","./004.webp","./005.webp","./006.webp","./007.webp","./008.webp","./009.webp","./010.webp","./011.webp","./012.webp","./013.webp","./014.webp","./015.webp","./016.webp","./017.webp","./018.webp","./019.webp","./020.webp","./021.webp","./022.webp","./023.webp","./024.webp","./025.webp","./026.webp","./027.webp","./028.webp","./029.webp","./030.webp","./031.webp","./032.webp","./033.webp","./034.webp","./035.webp","./036.webp","./037.webp","./038.webp","./039.webp","./040.webp","./041.webp","./042.webp","./043.webp","./044.webp","./045.webp","./046.webp","./047.webp","./048.webp","./049.webp","./050.webp","./051.webp","./052.webp","./053.webp","./054.webp","./055.webp","./056.webp","./057.webp","./058.webp","./059.webp","./060.webp"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{
  const r=e.request;
  if(r.method!=="GET"||new URL(r.url).origin!==self.location.origin)return;
  if(r.mode==="navigate"||r.destination==="document"){
    e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(CACHE).then(x=>x.put("./index.html",c));return res;}).catch(()=>caches.match(r).then(h=>h||caches.match("./index.html"))));
    return;
  }
  e.respondWith(caches.match(r).then(h=>h||fetch(r).then(res=>{if(res&&res.status===200&&res.type==="basic"){const c=res.clone();caches.open(CACHE).then(x=>x.put(r,c));}return res;})));
});
