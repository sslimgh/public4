// 수학 대륙 RPG 앱: 새 버전이 있으면 받아 오고, 인터넷이 끊기면 저장해 둔 화면을 열어요
const C='sudae-v53';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','manifest.json','config.js','icon-192.png','icon-512.png','icon-180.png'])));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
 if(/\.mp3$/i.test(u.pathname)||e.request.headers.has('range'))return; // 배경음악은 브라우저가 알아서 받아요(저장 공간 아끼기)
 e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('index.html'))))});
