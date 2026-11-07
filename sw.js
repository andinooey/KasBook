const C='jejakduit-v3',F='jejakduit-fonts';
const FILES=['/','/index.html','/style.css','/app.js','/manifest.json','/favicon.svg','/logo.svg','/icon-192.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)).catch(()=>{}));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C&&x!==F).map(x=>caches.delete(x)))).then(()=>clients.claim())));
// Aplikasi: jaringan dulu, cache sebagai cadangan saat offline.
// Font Google: dari cache dulu lalu diperbarui di belakang, supaya tampilan tetap sama saat offline.
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const u=new URL(r.url);
  if(u.origin!==location.origin){
    if(u.hostname==='fonts.googleapis.com'||u.hostname==='fonts.gstatic.com'){
      e.respondWith(caches.open(F).then(c=>c.match(r).then(h=>{
        const n=fetch(r).then(x=>{if(x&&(x.ok||x.type==='opaque'))c.put(r,x.clone());return x}).catch(()=>h);
        return h||n;
      })));
    }
    return;
  }
  const key=r.mode==='navigate'?'/':r;
  e.respondWith(fetch(r).then(x=>{if(x.ok){const k=x.clone();caches.open(C).then(c=>c.put(key,k))}return x}).catch(()=>caches.match(key,{ignoreSearch:true}).then(h=>h||caches.match('/'))));
});
