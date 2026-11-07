importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js','https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');
// Samakan dengan firebase-config.js
firebase.initializeApp({apiKey:"ISI",authDomain:"ISI.firebaseapp.com",projectId:"ISI",storageBucket:"ISI.appspot.com",messagingSenderId:"ISI",appId:"ISI"});
firebase.messaging();
const C='kasku-v1';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['/','/style.css','/app.js','/firebase-config.js','/manifest.json'])));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
self.addEventListener('fetch',e=>{if(e.request.method!='GET'||new URL(e.request.url).origin!=location.origin)return;e.respondWith(fetch(e.request).then(r=>{const k=r.clone();caches.open(C).then(c=>c.put(e.request,k));return r}).catch(()=>caches.match(e.request)))});
