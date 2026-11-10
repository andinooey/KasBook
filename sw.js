const C='jejakduit-v26',F='jejakduit-fonts';
const FILES=['/','/index.html','/style.css','/app.js','/manifest.json','/favicon.svg','/logo.svg','/icon-192.png'];
self.addEventListener('install',e=>{
  // cache:'reload' supaya file baru diambil dari server, bukan dari cache HTTP browser
  e.waitUntil(caches.open(C).then(c=>Promise.all(FILES.map(u=>c.add(new Request(u,{cache:'reload'})).catch(()=>{})))));
  self.skipWaiting();
});
self.addEventListener('activate',e=>e.waitUntil(
  caches.keys().then(k=>Promise.all(k.filter(x=>x!==C&&x!==F).map(x=>caches.delete(x))))
    .then(()=>clients.claim())
    .then(()=>clients.matchAll({type:'window'}))
    // Beri tahu halaman yang sedang terbuka. Halaman hanya menampilkan ajakan muat ulang kalau sebelumnya sudah dikontrol SW lama.
    .then(cs=>cs.forEach(c=>c.postMessage({type:'sw-updated'})))
));
// File aplikasi: cache dulu (instan, juga saat offline), lalu diperbarui di belakang untuk kunjungan berikutnya.
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
  e.respondWith(caches.match(key,{ignoreSearch:true}).then(h=>{
    const n=fetch(r).then(x=>{if(x.ok){const k=x.clone();caches.open(C).then(c=>c.put(key,k))}return x}).catch(()=>null);
    if(h){e.waitUntil(n);return h}
    return n.then(x=>x||caches.match('/'));
  }));
});
self.addEventListener('notificationclick',e=>{
  e.notification.close();
  e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>cs.length?cs[0].focus():clients.openWindow('/')));
});
