const CACHE='golden-era-v3-0-1-portraits-20261006';
const CORE=["./", "./index.html", "./cover.jpg", "./icon.png", "./manifest.webmanifest", "./robots.txt", "./portraits/wang_anyu.png", "./portraits/zhang_linghe.png", "./portraits/song_weilong.png", "./portraits/hou_minghao.png", "./portraits/cheng_man.png", "./portraits/cheng_zhiyuan.png", "./portraits/a_tao.png", "./portraits/mom.png"];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 if(e.request.mode==='navigate'){
  e.respondWith(fetch(e.request).then(r=>{let cp=r.clone();caches.open(CACHE).then(c=>c.put('./index.html',cp));return r}).catch(()=>caches.match('./index.html')));
 } else {
  e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(r=>{let cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return r})));
 }
});