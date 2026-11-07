/* JejakDuit: aplikasi pencatatan keuangan. Data tersimpan lokal (localStorage), tanpa login dan tanpa backend. */
(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const LANG=navigator.language||'id-ID',DL='id-ID';
const REDUCE=matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Ikon (Lucide, garis) ---------- */
const P={
utensils:'<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
bus:'<path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/>',
bag:'<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
receipt:'<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17.5v-11"/>',
film:'<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M3 7.5h4"/><path d="M3 12h18"/><path d="M3 16.5h4"/><path d="M17 3v18"/><path d="M17 7.5h4"/><path d="M17 16.5h4"/>',
heart:'<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/>',
dots:'<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
wallet:'<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>',
up:'<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
down:'<polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/>',
adl:'<path d="M17 7 7 17"/><path d="M17 17H7V7"/>',
aur:'<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
eye:'<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
eyeoff:'<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>',
bell:'<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
home:'<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
list:'<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
pie:'<path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z"/><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>',
user:'<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
x:'<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
back:'<path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z"/><line x1="18" x2="12" y1="9" y2="15"/><line x1="12" x2="18" y1="9" y2="15"/>',
check:'<path d="M20 6 9 17l-5-5"/>',
trash:'<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>',
dl:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
ul:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>',
plus:'<path d="M5 12h14"/><path d="M12 5v14"/>',
cl:'<path d="m15 18-6-6 6-6"/>',
cr:'<path d="m9 18 6-6-6-6"/>',
search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
cal:'<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
pen:'<path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"/>',
target:'<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
moon:'<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
alert:'<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4M12 17h.01"/>',
info:'<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
inbox:'<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
coins:'<circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/>'
};
const ic=(n,s=20,w=2.15)=>`<svg class="i" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]||''}</svg>`;

/* ---------- Kategori ---------- */
// id: [nama, ikon, warna, jenis]
const C={
makan:['Makan','utensils','#F97316','out'],transport:['Transport','bus','#3B82F6','out'],belanja:['Belanja','bag','#EC4899','out'],
tagihan:['Tagihan','receipt','#0891B2','out'],hiburan:['Hiburan','film','#A855F7','out'],sehat:['Kesehatan','heart','#EF4444','out'],lain:['Lainnya','dots','#64748B','out'],
gaji:['Gaji','wallet','#10B981','in'],bonus:['Bonus','gift','#E8890C','in'],investasi:['Investasi','up','#6366F1','in'],lainin:['Lainnya','dots','#64748B','in']};
const OUT=['makan','transport','belanja','tagihan','hiburan','sehat','lain'],INC=['gaji','bonus','investasi','lainin'];
const cat=id=>C[id]||C.lain;

/* ---------- Palet ---------- */
// urutan: p, pc, bg, sf, tx, mu, ln, h
const K=['p','pc','bg','sf','tx','mu','ln','h'];
const PAL={
tosca:['Tosca Laut',['0B7983','FFFFFF','F2F8F8','FFFFFF','0F2A2D','587276','DCEAEA','0E7C86'],['43CCD6','04262A','0A191B','11272A','E4F4F5','8BADB1','1D3A3E','0B6770']],
biru:['Biru Tinta',['3451C7','FFFFFF','F3F5FD','FFFFFF','141A3A','5F6892','E0E4F5','2E48B0'],['8EA2FF','0E1647','0D1020','161B34','E8EBFA','98A0C8','262D52','3249B8']],
hijau:['Hijau Hutan',['277A4D','FFFFFF','F2F8F4','FFFFFF','11261A','5A7565','DCEBE2','1F6E45'],['5FD590','06210F','0A1710','11261A','E4F5EA','8CAF9A','1C3A29','1B5F3C']],
ungu:['Ungu Anggur',['6D28D9','FFFFFF','F7F4FE','FFFFFF','1E1233','6E6188','E6DDF7','5B21B6'],['B39CFF','1A0B3B','130C22','1D1333','EFE9FB','A99BC7','2D2150','4C1D95']],
jingga:['Jingga Senja',['C2490A','FFFFFF','FFF5F1','FFFFFF','2B1408','8A6652','F6DFD3','D9500A'],['FF9A5C','3A1500','1A0E08','2A1810','FBEDE4','C4A18C','44281A','9A3608']],
emas:['Hitam Emas',['8A6410','FFFFFF','F6F5F2','FFFFFF','19181A','6C6A66','E6E4DF','1D1D20'],['E9C25C','241A00','0E0E10','18181B','F4F2EC','A19E95','2A2A2E','26262B']]};
const SEM={l:['#16895A','#D63B45'],d:['#4BDA9B','#FF8A90']};
const dq=matchMedia('(prefers-color-scheme: dark)');
const isDark=()=>S.set.mode=='dark'||(S.set.mode=='auto'&&dq.matches);
function theme(fade){
  const r=document.documentElement,d=isDark(),p=PAL[S.set.pal]||PAL.tosca,v=p[d?2:1],s=SEM[d?'d':'l'];
  if(fade&&!REDUCE){r.classList.add('tt');setTimeout(()=>r.classList.remove('tt'),480)}
  K.forEach((k,i)=>r.style.setProperty('--'+k,'#'+v[i]));
  r.style.setProperty('--inc',s[0]);r.style.setProperty('--exp',s[1]);r.style.colorScheme=d?'dark':'light';
  const m=$('meta[name=theme-color]');if(m)m.content='#'+v[2];
}
dq.addEventListener?.('change',()=>theme(true));

/* ---------- Format angka ---------- */
const NF0=new Intl.NumberFormat(LANG,{maximumFractionDigits:0}),NF2=new Intl.NumberFormat(LANG,{minimumFractionDigits:2,maximumFractionDigits:2}),NFC=new Intl.NumberFormat(LANG,{notation:'compact',maximumFractionDigits:1});
const DEC=NF2.formatToParts(1.1).find(x=>x.type=='decimal')?.value||'.',GRP=NF0.formatToParts(10000).find(x=>x.type=='group')?.value||',';
const r2=n=>Math.round(n*100)/100;
const num=n=>{n=r2(n);return Number.isInteger(n)?NF0.format(n):NF2.format(n)};
const cur=()=>S.set.cur?S.set.cur+' ':'';
const money=n=>(n<0?'−':'')+cur()+num(Math.abs(n));
const compact=n=>cur()+NFC.format(n);
function parseNum(s){
  s=String(s||'').toLowerCase().replace(/[^\d.,a-z]/g,'');let m=1;
  if(/jt$/.test(s)){m=1e6;s=s.slice(0,-2)}else if(/(rb|k)$/.test(s)){m=1e3;s=s.replace(/(rb|k)$/,'')}
  s=s.replace(/[^\d.,]/g,'');if(!s)return 0;
  if(m>1)s=s.replace(',','.');else s=s.split(GRP).join('').replace(DEC,'.');
  const a=s.split('.');if(a.length>2)s=a.slice(0,-1).join('')+'.'+a[a.length-1];
  const v=parseFloat(s);return isFinite(v)?r2(v*m):0;
}

/* ---------- Tanggal ---------- */
const pad=n=>String(n).padStart(2,'0');
const ymd=ts=>{const d=new Date(ts);return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())};
const curM=()=>ymd(Date.now()).slice(0,7);
const mlabel=m=>new Date(+m.slice(0,4),+m.slice(5)-1,1).toLocaleDateString(DL,{month:'long',year:'numeric'});
const mshort=m=>new Date(+m.slice(0,4),+m.slice(5)-1,1).toLocaleDateString(DL,{month:'short'});
const madd=(m,n)=>{const d=new Date(+m.slice(0,4),+m.slice(5)-1+n,1);return d.getFullYear()+'-'+pad(d.getMonth()+1)};
const tlabel=ts=>new Date(ts).toLocaleTimeString(DL,{hour:'2-digit',minute:'2-digit'});
function dlabel(ts,full){
  const k=ymd(ts),t=ymd(Date.now()),y=ymd(Date.now()-864e5);
  if(k==t)return'Hari ini';if(k==y)return'Kemarin';
  return new Date(ts).toLocaleDateString(DL,full?{day:'numeric',month:'short',year:'numeric'}:{weekday:'short',day:'numeric',month:'short'});
}
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* ---------- Data ---------- */
const KEY='kasku2'; // nama kunci lama dipertahankan supaya data yang sudah tersimpan tidak hilang
const def=()=>({tx:[],bud:{total:0,cats:{}},set:{pal:'tosca',mode:'auto',cur:'',hide:false}});
function norm(j){const d=def();return{tx:j.tx.filter(t=>t&&t.a>0&&t.ts&&C[t.c]),bud:{total:+(j.bud&&j.bud.total)||0,cats:(j.bud&&j.bud.cats)||{}},set:{...d.set,...j.set}}}
function migrate(){ // dari versi lama (kasku_tx)
  const d=def();
  try{
    const old=JSON.parse(localStorage.getItem('kasku_tx')||'null');
    if(Array.isArray(old)&&old.length){
      const mp={arisan:'lain',zakat:'lain',qris:'lain',thr:'bonus'};
      d.tx=old.filter(t=>t&&(t.type=='in'||t.type=='out')&&t.amt>0).map(t=>{let c=mp[t.cat]||t.cat;if(t.type=='in'&&!INC.includes(c))c='lainin';if(t.type=='out'&&!OUT.includes(c))c='lain';
        return{id:String(t.id),ty:t.type,c,a:t.amt,n:t.note||'',ts:new Date((t.date||'')+'T12:00:00').getTime()||Date.now()}});
      d.set.cur='Rp';
      const ob=JSON.parse(localStorage.getItem('kasku_bud')||'{}');
      OUT.forEach(k=>{if(ob[k]>0)d.bud.cats[k]=ob[k]});
      d.bud.total=Object.values(d.bud.cats).reduce((a,b)=>a+b,0);
    }
  }catch(e){}
  return d;
}
function load(){try{const j=JSON.parse(localStorage.getItem(KEY));if(j&&Array.isArray(j.tx))return norm(j)}catch(e){}return migrate()}
let S=load();
let warned=false;
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){if(!warned){warned=true;toast('Data belum bisa disimpan: penyimpanan browser penuh atau diblokir',{c:'var(--exp)'})}}}
const sortTx=()=>S.tx.sort((a,b)=>b.ts-a.ts||(a.id<b.id?1:-1));
const snap=()=>S.tx.map(t=>({...t}));
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6);
sortTx();
const inMonth=m=>S.tx.filter(t=>ymd(t.ts).startsWith(m));
const sum=(a,ty)=>a.reduce((s,t)=>t.ty==ty?s+t.a:s,0);
const balance=()=>S.tx.reduce((s,t)=>s+(t.ty=='in'?t.a:-t.a),0);
const spentBy=m=>{const o={};inMonth(m).forEach(t=>{if(t.ty=='out')o[t.c]=(o[t.c]||0)+t.a});return o};
function week(off=0){
  const o=[];for(let i=6;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i-off*7);o.push({k:ymd(d),l:d.toLocaleDateString(DL,{weekday:'narrow'}),v:0,t:i==0&&!off})}
  S.tx.forEach(t=>{if(t.ty=='out'){const x=o.find(z=>z.k==ymd(t.ts));if(x)x.v+=t.a}});return o;
}
function stats(){
  const days=new Set(S.tx.map(t=>ymd(t.ts)));let st=0;const d=new Date();if(!days.has(ymd(d)))d.setDate(d.getDate()-1);
  while(days.has(ymd(d))){st++;d.setDate(d.getDate()-1)}
  return{n:S.tx.length,days:days.size,streak:st};
}

/* ---------- Status UI ---------- */
let tab='home',mon=curM(),flt='all',q='',rep='out',NEW=null,UNDO=null,E=null;
const PV={};

/* ---------- Render ---------- */
function row(t,o={}){
  const c=cat(t.c);
  return`<button class="tr${t.id==NEW?' new':''}" data-a="row" data-id="${esc(t.id)}" style="--c:${c[2]}"><span class="cico sm">${ic(c[1],18)}</span><span class="tm"><b>${esc(t.n)||c[0]}</b><small>${t.n?c[0]+' · ':''}${o.date?dlabel(t.ts)+' · ':''}${tlabel(t.ts)}</small></span><b class="am ${t.ty}">${t.ty=='in'?'+':''}${money(t.a)}</b></button>`;
}
const empty=(i,a,b)=>`<div class="empty"><div class="ei">${ic(i,26)}</div><b>${a}</b>${b}</div>`;

function insights(){
  const r=[],m=curM(),O=sum(inMonth(m),'out'),sp=spentBy(m),b=S.bud.total;
  if(b){const p=O/b;if(p>=1)r.push({w:1,i:'alert',c:'var(--exp)',t:'Budget bulan ini terlewati',s:`Pengeluaran ${money(O)} dari budget ${money(b)}.`});
    else if(p>=.8)r.push({w:1,i:'alert',c:'var(--amb)',t:`Budget sudah ${Math.round(p*100)}% terpakai`,s:`Sisa ${money(b-O)} untuk bulan ini.`})}
  OUT.forEach(k=>{const l=S.bud.cats[k];if(l&&(sp[k]||0)/l>=.8)r.push({w:1,i:'alert',c:(sp[k]||0)>=l?'var(--exp)':'var(--amb)',t:`Budget ${cat(k)[0]} ${Math.round((sp[k]||0)/l*100)}%`,s:`${money(sp[k]||0)} dari batas ${money(l)}.`})});
  if(!S.tx.some(t=>ymd(t.ts)==ymd(Date.now()))&&new Date().getHours()>=17)r.push({w:1,i:'pen',c:'var(--p)',t:'Belum ada catatan hari ini',s:'Ketuk kategori di Beranda untuk mencatat.'});
  const a=week().reduce((s,x)=>s+x.v,0),b2=week(1).reduce((s,x)=>s+x.v,0);
  if(b2>0&&a>0){const d=Math.round((a-b2)/b2*100);if(Math.abs(d)>=5)r.push({w:0,i:d>0?'up':'down',c:d>0?'var(--exp)':'var(--inc)',t:d>0?`Pengeluaran 7 hari naik ${d}%`:`Pengeluaran 7 hari turun ${-d}%`,s:'Dibandingkan 7 hari sebelumnya.'})}
  return r;
}

function home(anim){
  const n=new Date(),mt=inMonth(curM()),I=sum(mt,'in'),O=sum(mt,'out'),bal=balance(),b=S.bud.total,pct=b?O/b*100:0,w=week(),wt=w.reduce((s,x)=>s+x.v,0),mx=Math.max(...w.map(x=>x.v),1);
  const hr=n.getHours(),g=hr<4?'Selamat malam':hr<11?'Selamat pagi':hr<15?'Selamat siang':hr<18?'Selamat sore':'Selamat malam';
  const dot=insights().some(x=>x.w==1),hide=S.set.hide?' blur':'',Cc=2*Math.PI*34,col=pct>=100?'var(--exp)':pct>=80?'var(--amb)':'var(--p)';
  const tiles=OUT.map((id,i)=>`<button class="qt${anim?' stag':''}" style="--c:${cat(id)[2]};--i:${i}" data-a="quick" data-c="${id}"><span class="cico">${ic(cat(id)[1],22)}</span><span>${cat(id)[0]}</span></button>`).join('')
   +`<button class="qt${anim?' stag':''}" style="--c:#10B981;--i:7" data-a="quick" data-c="gaji" data-ty="in"><span class="cico">${ic('adl',22)}</span><span>Pemasukan</span></button>`;
  const rc=S.tx.slice(0,5);
  return`<header class="hd"><div><div class="gr">${g}</div><div class="dt">${n.toLocaleDateString(DL,{weekday:'long',day:'numeric',month:'long'})}</div></div>
<div class="ha"><button class="ib" data-a="hide" aria-label="${S.set.hide?'Tampilkan':'Sembunyikan'} saldo">${ic(S.set.hide?'eyeoff':'eye',19)}</button><button class="ib" data-a="bell" aria-label="Notifikasi">${ic('bell',19)}${dot?'<i class="dot"></i>':''}</button></div></header>
<section class="hero"><i class="bl bl1"></i><i class="bl bl2"></i><div class="hl">Total saldo</div><div class="bigb${hide}" data-n="${bal}" data-k="bal">${money(bal)}</div>
<div class="pills"><div class="pill"><span class="pc in">${ic('adl',15,2.6)}</span><div style="min-width:0"><small>Masuk</small><b class="${hide.trim()}" data-n="${I}" data-k="in">${money(I)}</b></div></div>
<div class="pill"><span class="pc out">${ic('aur',15,2.6)}</span><div style="min-width:0"><small>Keluar</small><b class="${hide.trim()}" data-n="${O}" data-k="out">${money(O)}</b></div></div></div></section>
<h3 class="sec">Catat cepat</h3><div class="qg">${tiles}</div>
<div class="bento">
<button class="card" data-a="budget" aria-label="Atur budget"><div class="bt">Budget</div><div class="ringw"><svg width="84" height="84" viewBox="0 0 84 84"><circle class="trk" cx="42" cy="42" r="34"/><circle class="prg" cx="42" cy="42" r="34" stroke="${col}" stroke-dasharray="${Cc}" data-t="o" data-k="ring" data-z="${Cc}" data-v="${Cc*(1-Math.min(1,pct/100))}" style="stroke-dashoffset:${Cc}"/></svg><b>${b?Math.round(pct)+'%':'–'}</b></div>
<div class="bs">${b?(O>b?'Lewat '+money(O-b):'Sisa '+money(b-O)):'Ketuk untuk atur budget'}</div></button>
<div class="card"><div class="bt">7 hari</div><div class="wk" data-n="${wt}" data-k="w7" data-f="c">${compact(wt)}</div>
<div class="bars">${w.map((x,i)=>`<div class="${x.t?'t':''}"><i data-t="h" data-k="b${i}" data-z="0" data-v="${x.v?Math.max(8,x.v/mx*100):0}" style="height:0"></i><em>${x.l}</em></div>`).join('')}</div></div></div>
<div class="sec">Terbaru${S.tx.length>5?'<button class="more" data-a="tab" data-t="tx">Lihat semua</button>':''}</div>
${rc.length?`<div class="list">${rc.map(t=>row(t,{date:1})).join('')}</div>`:`<div class="list">${empty('inbox','Belum ada transaksi','Ketuk salah satu kategori di atas untuk mencatat.')}</div>`}`;
}

function monNav(){return`<div class="mon"><button data-a="mon" data-d="-1" aria-label="Bulan lalu">${ic('cl',18)}</button><h2>${mlabel(mon)}</h2><button data-a="mon" data-d="1" aria-label="Bulan depan" ${mon>=curM()?'disabled':''}>${ic('cr',18)}</button></div>`}

function listHTML(){
  const ql=q.trim().toLowerCase();
  const L=inMonth(mon).filter(t=>(flt=='all'||t.ty==flt)&&(!ql||(t.n||'').toLowerCase().includes(ql)||cat(t.c)[0].toLowerCase().includes(ql)||String(t.a).includes(ql)));
  if(!L.length)return`<div class="list">${empty('inbox',ql||flt!='all'?'Tidak ada hasil':'Belum ada transaksi',ql||flt!='all'?'Coba ubah filter atau kata kunci.':'Ketuk tombol + untuk mencatat.')}</div>`;
  const g={};L.forEach(t=>(g[ymd(t.ts)]=g[ymd(t.ts)]||[]).push(t));
  return Object.keys(g).sort().reverse().map(k=>{const a=g[k],net=sum(a,'in')-sum(a,'out');return`<div class="dh"><span>${dlabel(a[0].ts)}</span><b class="${net>0?'in':''}">${net>0?'+':''}${money(net)}</b></div><div class="list">${a.map(t=>row(t)).join('')}</div>`}).join('');
}
function txPage(){
  const mt=inMonth(mon);
  return`<header class="hd"><h1>Transaksi</h1><button class="ib pr" data-a="add" aria-label="Tambah transaksi">${ic('plus',20,2.6)}</button></header>${monNav()}
<div class="sum2"><div class="card"><small>Masuk</small><b class="in">${money(sum(mt,'in'))}</b></div><div class="card"><small>Keluar</small><b class="out">${money(sum(mt,'out'))}</b></div></div>
<div class="srch">${ic('search',18)}<input id="q" type="search" placeholder="Cari catatan atau kategori" value="${esc(q)}" aria-label="Cari transaksi"></div>
<div class="fl" id="fl">${[['all','Semua'],['out','Keluar'],['in','Masuk']].map(x=>`<button class="chip${flt==x[0]?' on':''}" data-a="flt" data-f="${x[0]}">${x[1]}</button>`).join('')}</div>
<div id="txl">${listHTML()}</div>`;
}

function repPage(){
  const mt=inMonth(mon),I=sum(mt,'in'),O=sum(mt,'out'),by={};
  mt.filter(t=>t.ty==rep).forEach(t=>by[t.c]=(by[t.c]||0)+t.a);
  const ent=Object.entries(by).sort((a,b)=>b[1]-a[1]),tot=ent.reduce((s,e)=>s+e[1],0),R=70,Cc=2*Math.PI*R,gap=ent.length>1?3:0;
  let cum=0;const segs=ent.map(([k,v])=>{const len=v/tot*Cc,s=`<circle cx="100" cy="100" r="${R}" stroke="${cat(k)[2]}" stroke-dasharray="${Math.max(0,len-gap)} ${Cc-Math.max(0,len-gap)}" stroke-dashoffset="${-cum}" transform="rotate(-90 100 100)"/>`;cum+=len;return s}).join('');
  const now=curM(),dm=new Date(+mon.slice(0,4),+mon.slice(5),0).getDate(),el=mon==now?new Date().getDate():mon>now?1:dm;
  const ms=[];for(let i=5;i>=0;i--){const m=madd(mon,-i),a=inMonth(m);ms.push({m,i:sum(a,'in'),o:sum(a,'out')})}
  const mx=Math.max(...ms.flatMap(x=>[x.i,x.o]),1),sp=spentBy(mon);
  return`<header class="hd"><h1>Laporan</h1></header>${monNav()}
<div class="sum2"><div class="card"><small>Masuk</small><b class="in">${money(I)}</b></div><div class="card"><small>Keluar</small><b class="out">${money(O)}</b></div>
<div class="card"><small>Selisih</small><b>${I-O>0?'+':''}${money(I-O)}</b></div><div class="card"><small>Rata-rata keluar/hari</small><b>${money(O/el)}</b></div></div>
<div class="card"><div class="seg" role="tablist"><button class="${rep=='out'?'on':''}" data-a="rep" data-r="out">Pengeluaran</button><button class="${rep=='in'?'on':''}" data-a="rep" data-r="in">Pemasukan</button></div>
<div class="donut"><svg viewBox="0 0 200 200" role="img" aria-label="Diagram ${rep=='out'?'pengeluaran':'pemasukan'} per kategori"><circle class="trk" cx="100" cy="100" r="${R}"/>${segs}</svg><div class="dc"><small>${rep=='out'?'Pengeluaran':'Pemasukan'}</small><b data-n="${tot}" data-k="dn">${money(tot)}</b></div></div></div>
${ent.length?`<div class="sec">Per kategori</div><div class="list">${ent.map(([k,v],i)=>{const c=cat(k),l=rep=='out'?S.bud.cats[k]:0,p=l?v/l*100:0;return`<div class="cr" style="--c:${c[2]}"><span class="cico sm">${ic(c[1],18)}</span><div class="m"><div class="t"><span>${c[0]}</span><span>${money(v)}</span></div><div class="pb"><i data-t="w" data-k="cp${i}" data-z="0" data-v="${v/tot*100}" style="width:0"></i></div><small><span>${Math.round(v/tot*100)}% dari total</span>${l?`<span class="${p>=100?'over':p>=80?'warn':''}">Budget ${Math.round(p)}%</span>`:''}</small></div></div>`}).join('')}</div>`
  :`<div class="list" style="margin-top:14px">${empty('pie','Belum ada data','Catat transaksi bulan ini untuk melihat laporan.')}</div>`}
<div class="sec">6 bulan terakhir</div><div class="card"><div class="tre">${ms.map((x,i)=>`<button data-a="monset" data-m="${x.m}" class="${x.m==mon?'on':''}" aria-label="${mlabel(x.m)}"><div class="pr"><i data-t="h" data-k="ti${i}" data-z="0" data-v="${x.i/mx*100}" style="height:0"></i><i data-t="h" data-k="to${i}" data-z="0" data-v="${x.o/mx*100}" style="height:0"></i></div><em>${mshort(x.m)}</em></button>`).join('')}</div>
<div class="lg"><span><i style="background:var(--inc)"></i>Masuk</span><span><i style="background:var(--exp)"></i>Keluar</span></div></div>`;
}

const CURS=[['','Tanpa mata uang'],['Rp','Rupiah (Rp)'],['$','Dolar ($)'],['€','Euro (€)'],['£','Pound (£)'],['¥','Yen (¥)'],['RM','Ringgit (RM)'],['S$','Dolar Singapura (S$)']];
function mePage(){
  const st=stats(),d=isDark();
  return`<header class="hd"><h1>Profil</h1></header>
<div class="stats"><div class="card"><b>${st.n}</b><small>Transaksi</small></div><div class="card"><b>${st.days}</b><small>Hari mencatat</small></div><div class="card"><b>${st.streak}</b><small>Hari beruntun</small></div></div>
<div class="sec">Tampilan</div>
<div class="grp"><div class="pal">${Object.entries(PAL).map(([k,v])=>{const l=v[1],dk=v[2],a=d?dk:l;return`<button class="${S.set.pal==k?'on':''}" data-a="pal" data-p="${k}" aria-label="${v[0]}"><div class="sw" style="background:linear-gradient(135deg,#${a[0]},#${a[7]})">${ic('check',18,3)}</div>${v[0]}</button>`}).join('')}</div>
<div style="padding:4px 10px 12px"><div class="seg">${[['auto','Otomatis',null],['light','Terang','sun'],['dark','Gelap','moon']].map(m=>`<button class="${S.set.mode==m[0]?'on':''}" data-a="mode" data-m="${m[0]}">${m[1]}</button>`).join('')}</div></div></div>
<div class="sec s2">Umum</div>
<div class="grp"><label class="set"><span class="si">${ic('coins',19)}</span><span class="st">Mata uang<small>Hanya tampilan, tanpa konversi</small></span><select class="sel" id="cur" aria-label="Mata uang">${CURS.map(c=>`<option value="${esc(c[0])}" ${S.set.cur==c[0]?'selected':''}>${c[1]}</option>`).join('')}</select></label>
<button class="set" data-a="budget"><span class="si">${ic('target',19)}</span><span class="st">Budget bulanan<small>${S.bud.total?money(S.bud.total):'Belum diatur'}</small></span>${ic('cr',18)}</button></div>
<div class="sec s2">Data</div>
<div class="grp"><button class="set" data-a="export"><span class="si">${ic('dl',19)}</span><span class="st">Ekspor CSV<small>Cadangkan semua transaksi</small></span></button>
<button class="set" data-a="import"><span class="si">${ic('ul',19)}</span><span class="st">Impor CSV<small>Gabungkan dari file ekspor JejakDuit</small></span></button>
<button class="set dng" data-a="reset"><span class="si">${ic('trash',19)}</span><span class="st">Hapus semua data<small>Tidak bisa dibatalkan</small></span></button></div>
<p class="note">Data tersimpan di perangkat ini dan tidak perlu login. Jika data situs dihapus, catatan ikut hilang, jadi ekspor CSV secara berkala. Di iPhone, pasang lewat Bagikan, lalu Tambah ke Layar Utama.</p><div class="brand"><img src="/logo.svg" width="46" height="46" alt=""><div><b>Jejak<span>Duit</span></b><small>Catat duit, tinggalkan jejak.</small></div></div>`;
}
const pages={home,tx:txPage,rep:repPage,me:mePage};

function render(anim){
  const p=$('#page');p.className='pg'+(anim?' in':'');p.innerHTML=pages[tab](anim);NEW=null;after(anim);
}
function setv(el,v){const t=el.dataset.t;if(t=='h')el.style.height=v+'%';else if(t=='w')el.style.width=v+'%';else el.style.strokeDashoffset=v}
function after(anim){
  const G=anim?{}:PV;
  $$('#page [data-n]').forEach(el=>{
    const k=el.dataset.k,to=+el.dataset.n,from=+(G[k]||0),f=el.dataset.f=='c'?compact:money;PV[k]=to;
    if(from===to||REDUCE){el.textContent=f(to);return}
    const t0=performance.now();(function s(now){const p=Math.min(1,(now-t0)/800);el.textContent=f(from+(to-from)*(1-Math.pow(1-p,3)));if(p<1&&el.isConnected)requestAnimationFrame(s)})(t0);
  });
  $$('#page [data-v]').forEach(el=>{
    const k=el.dataset.k,to=+el.dataset.v,from=G[k]!=null?G[k]:+el.dataset.z;PV[k]=to;
    if(REDUCE){setv(el,to);return}
    setv(el,from);requestAnimationFrame(()=>requestAnimationFrame(()=>setv(el,to)));
  });
}

/* ---------- Navigasi ---------- */
const TABS=[['home','Beranda','home'],['tx','Transaksi','list'],['rep','Laporan','pie'],['me','Profil','user']];
$('#nav').innerHTML=TABS.map(t=>`<button data-a="tab" data-t="${t[0]}" aria-label="${t[1]}">${ic(t[2],22)}<span>${t[1]}</span></button>`).join('');
function setTab(t,anim=true){
  tab=t;$$('#nav button').forEach(b=>{const on=b.dataset.t==t;b.classList.toggle('on',on);on?b.setAttribute('aria-current','page'):b.removeAttribute('aria-current')});
  if(anim)scrollTo({top:0});render(anim);
}

/* ---------- Toast ---------- */
let tt;
function toast(msg,o={}){
  const el=$('#toast');UNDO=o.undo||null;
  el.innerHTML=`<div class="tc" style="--c:${o.c||'var(--p)'}"><span class="tk">${ic('check',14,3)}</span><span class="tm2">${esc(msg)}</span>${o.undo?'<button data-a="undo">Urungkan</button>':''}</div>`;
  el.className='show';clearTimeout(tt);tt=setTimeout(()=>{el.className=''},o.undo?4500:2800);
}

/* ---------- Lembar ---------- */
function openSheet(html,fn){
  const r=$('#sheet');r.innerHTML=`<div class="scrim" data-s="close"></div>${html}`;r.className='';
  document.body.classList.add('lock');const sh=$('.sheet',r);
  requestAnimationFrame(()=>requestAnimationFrame(()=>{r.classList.add('open');sh.focus({preventScroll:true})}));
  fn&&fn(sh);
}
function closeSheet(){
  const r=$('#sheet');if(!r.firstChild)return;r.classList.remove('open');E=null;document.body.classList.remove('lock');
  setTimeout(()=>{if(!r.classList.contains('open'))r.innerHTML=''},420);
}
const vib=()=>{try{navigator.vibrate&&navigator.vibrate(7)}catch(e){}};

/* --- Lembar tambah/ubah transaksi --- */
function openTx(o={}){
  const t=o.id?S.tx.find(x=>x.id==o.id):null;
  E={id:t&&t.id,ty:t?t.ty:(o.ty||'out'),c:t?t.c:(o.c||'makan'),buf:t?String(t.a):'',ts:t?t.ts:Date.now(),n:t?t.n:'',open:!!(t&&t.n)};
  openSheet(`<div class="sheet" role="dialog" aria-modal="true" aria-label="${t?'Ubah transaksi':'Tambah transaksi'}" tabindex="-1"><div class="tint"></div><div class="grab"></div>
<div class="sh-top"><div class="seg"><button data-s="ty" data-v="out">Keluar</button><button data-s="ty" data-v="in">Masuk</button></div><div class="sh-act">${t?`<button class="ib d" data-s="del" aria-label="Hapus transaksi">${ic('trash',18)}</button>`:''}<button class="ib" data-s="close" aria-label="Tutup">${ic('x',18)}</button></div></div>
<div class="cats" id="cats"></div>
<div class="amt"><div class="cpill" id="cpill"></div><div class="num" id="num"></div></div>
<div class="ch2"><label class="chip">${ic('cal',15)}<span id="dtx"></span><input type="date" id="dinp" aria-label="Tanggal" max="${ymd(Date.now())}" value="${ymd(E.ts)}"></label><button class="chip" data-s="note">${ic('pen',15)}<span id="ntx"></span></button></div>
<input class="nin" id="nin" placeholder="Tulis catatan (opsional)" maxlength="80" value="${esc(E.n)}" ${E.open?'':'hidden'} aria-label="Catatan">
<div class="pad">${['1','2','3','4','5','6','7','8','9','.','0','del'].map(k=>`<button data-s="k" data-k="${k}" aria-label="${k=='del'?'Hapus angka':k=='.'?'Desimal':k}">${k=='del'?ic('back',24,2):k=='.'?DEC:k}</button>`).join('')}</div>
<button class="save" id="save" data-s="save"></button></div>`,()=>{buildCats();updTx(true)});
}
function buildCats(){
  const L=E.ty=='out'?OUT:INC;
  $('#cats').innerHTML=L.map(id=>`<button class="cb" style="--c:${cat(id)[2]}" data-s="cat" data-c="${id}" aria-label="${cat(id)[0]}"><span class="cico">${ic(cat(id)[1],24)}</span><em>${cat(id)[0]}</em></button>`).join('');
}
function updTx(init){
  const c=cat(E.c),sh=$('.sheet');if(!sh)return;
  sh.style.setProperty('--c',c[2]);
  $$('[data-s=ty]',sh).forEach(b=>b.classList.toggle('on',b.dataset.v==E.ty));
  $$('.cb',sh).forEach(b=>{const on=b.dataset.c==E.c;if(on&&!b.classList.contains('on')&&!init)b.scrollIntoView({inline:'center',block:'nearest',behavior:REDUCE?'auto':'smooth'});b.classList.toggle('on',on)});
  if(init){const b=$('.cb.on',sh);if(b)setTimeout(()=>b.scrollIntoView({inline:'center',block:'nearest'}),30)}
  const cp=$('#cpill');if(cp.dataset.c!=E.c){cp.dataset.c=E.c;cp.innerHTML=`<span class="cc">${ic(c[1],14,2.4)}</span>${c[0]}`}
  updAmt();
  $('#dtx').textContent=dlabel(E.ts,true);
  $('#ntx').textContent=E.n?E.n:'Catatan';
  const s=$('#save');s.textContent=E.id?'Simpan perubahan':E.ty=='out'?'Simpan pengeluaran':'Simpan pemasukan';s.disabled=!(parseFloat(E.buf)>0);
}
function updAmt(){
  const b=E.buf,n=$('#num');let t='0',e=!b;
  if(b){const[i,d]=b.split('.');t=NF0.format(+i);if(b.includes('.'))t+=DEC+(d||'')}
  const len=t.length;n.className='num'+(e?' e':'')+(len>13?' xs':len>9?' sm':'');
  n.innerHTML=(S.set.cur?`<small>${esc(S.set.cur)}</small>`:'')+`<span>${t}</span>`;
  const s=$('#save');if(s)s.disabled=!(parseFloat(b)>0);
}
function pulse(){const n=$('#num');if(n&&!REDUCE)n.animate([{transform:'scale(1.07)'},{transform:'scale(1)'}],{duration:170,easing:'ease-out'})}
function key(k){
  let b=E.buf;
  if(k=='del')b=b.slice(0,-1);
  else if(k=='.'){if(!b.includes('.'))b=(b||'0')+'.'}
  else{const[i,d]=b.split('.');if(b.includes('.')){if((d||'').length<2)b+=k}else if(i.length<9)b=(i=='0'?'':i)+k}
  E.buf=b;updAmt();pulse();vib();
}
function setType(ty){
  if(E.ty==ty)return;E.ty=ty;E.c=ty=='in'?'gaji':'makan';buildCats();updTx();
}
function saveTx(){
  const a=r2(parseFloat(E.buf)||0);if(!(a>0))return;
  const before=snap(),m=ymd(E.ts).slice(0,7),sp0=(spentBy(m)[E.c]||0);
  E.n=($('#nin').value||'').trim();
  const rec={ty:E.ty,c:E.c,a,n:E.n,ts:E.ts};
  if(E.id){const k=S.tx.findIndex(x=>x.id==E.id);if(k>=0)S.tx[k]={id:E.id,...rec};NEW=E.id}
  else{const id=uid();S.tx.push({id,...rec});NEW=id}
  sortTx();save();
  let msg=E.id?'Perubahan tersimpan':E.ty=='out'?'Pengeluaran tersimpan':'Pemasukan tersimpan',col=cat(E.c)[2];
  if(E.ty=='out'){const l=S.bud.cats[E.c],sp1=spentBy(m)[E.c]||0;
    if(l&&sp1/l>=.8&&sp0/l<1){msg+=` · Budget ${cat(E.c)[0]} ${Math.round(sp1/l*100)}%`}
    const T=S.bud.total;if(T&&m==curM()){const o1=sum(inMonth(m),'out'),o0=o1-(E.id?0:a);if(o1/T>=.8&&o0/T<.8)msg+=` · Budget bulan ini ${Math.round(o1/T*100)}%`}}
  closeSheet();render(false);toast(msg,{c:col,undo:before});
}
function delTx(){
  const before=snap(),id=E.id;S.tx=S.tx.filter(x=>x.id!=id);save();closeSheet();render(false);toast('Transaksi dihapus',{c:'var(--exp)',undo:before});
}

/* --- Lembar budget --- */
function openBudget(){
  openSheet(`<div class="sheet" role="dialog" aria-modal="true" aria-label="Atur budget" tabindex="-1" style="--c:var(--p)"><div class="tint"></div><div class="grab"></div>
<div class="sh-top"><div class="sh-t">Budget bulanan</div><div class="sh-act"><button class="ib" data-s="close" aria-label="Tutup">${ic('x',18)}</button></div></div>
<p class="mut" style="margin:6px 0 10px;font-size:13px;font-weight:600">Isi batas total bulanan. Batas per kategori boleh dikosongkan. Kamu akan diingatkan saat pengeluaran mencapai 80%. Boleh pakai singkatan seperti 500k atau 1,5jt.</p>
<div class="bsc"><div class="fld"><label>${ic('target',18)}Total bulanan</label><input id="bt" inputmode="decimal" placeholder="0" value="${S.bud.total||''}"></div>
<div class="sec" style="margin:12px 0 4px">Per kategori</div>
${OUT.map(k=>`<div class="fld" style="--c:${cat(k)[2]}"><label><span class="cico sm" style="width:32px;height:32px;border-radius:11px">${ic(cat(k)[1],15)}</span>${cat(k)[0]}</label><input data-bk="${k}" inputmode="decimal" placeholder="Tanpa batas" value="${S.bud.cats[k]||''}"></div>`).join('')}</div>
<button class="save" data-s="bsave" style="background-color:var(--p);color:var(--pc)">Simpan budget</button></div>`);
}
function saveBudget(){
  S.bud.total=parseNum($('#bt').value);const c={};$$('[data-bk]').forEach(i=>{const v=parseNum(i.value);if(v>0)c[i.dataset.bk]=v});S.bud.cats=c;save();closeSheet();render(false);toast('Budget disimpan');
}

/* --- Notifikasi (lonceng) --- */
function openBell(){
  const L=insights();
  openSheet(`<div class="sheet" role="dialog" aria-modal="true" aria-label="Notifikasi" tabindex="-1" style="--c:var(--p)"><div class="tint"></div><div class="grab"></div>
<div class="sh-top"><div class="sh-t">Notifikasi</div><div class="sh-act"><button class="ib" data-s="close" aria-label="Tutup">${ic('x',18)}</button></div></div>
<div style="margin-top:8px;min-height:120px">${L.length?L.map(x=>`<div class="nl"><span class="cico sm" style="--c:${x.c}">${ic(x.i,18)}</span><div><b>${esc(x.t)}</b><small>${esc(x.s)}</small></div></div>`).join(''):empty('check','Semua aman','Belum ada pengingat. Terus catat pengeluaranmu.')}</div></div>`);
}

/* --- Konfirmasi --- */
function confirmSheet(title,msg,btn,fn){
  openSheet(`<div class="sheet" role="alertdialog" aria-modal="true" aria-label="${esc(title)}" tabindex="-1" style="--c:var(--exp)"><div class="tint"></div><div class="grab"></div><div class="sh-t">${esc(title)}</div><p class="mut" style="margin-top:6px;font-weight:600">${esc(msg)}</p>
<div class="row2"><button class="btn2" data-s="close">Batal</button><button class="btn2 r" data-s="ok">${esc(btn)}</button></div></div>`);
  CONF=fn;
}
let CONF=null;

/* ---------- CSV ---------- */
function exportCSV(){
  const rows=['waktu,jenis,kategori,jumlah,catatan',...S.tx.slice().sort((a,b)=>a.ts-b.ts).map(t=>[new Date(t.ts).toISOString(),t.ty=='in'?'masuk':'keluar',cat(t.c)[0],t.a,'"'+(t.n||'').replace(/"/g,'""')+'"'].join(','))];
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob(['﻿'+rows.join('\n')],{type:'text/csv;charset=utf-8'}));a.download='jejakduit-'+ymd(Date.now())+'.csv';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),4000);
  toast('CSV diekspor');
}
function parseCSV(t){
  const r=[];let row=[],f='',q=false;t=t.replace(/^﻿/,'');
  for(let i=0;i<t.length;i++){const c=t[i];
    if(q){if(c=='"'){if(t[i+1]=='"'){f+='"';i++}else q=false}else f+=c}
    else if(c=='"')q=true;else if(c==','){row.push(f);f=''}
    else if(c=='\n'||c=='\r'){if(c=='\r'&&t[i+1]=='\n')i++;row.push(f);f='';if(row.some(x=>x!==''))r.push(row);row=[]}
    else f+=c}
  row.push(f);if(row.some(x=>x!==''))r.push(row);return r;
}
function importCSV(text){
  const rows=parseCSV(text),keys=new Set(S.tx.map(t=>[t.ts,t.ty,t.a,t.c,t.n].join('|')));let add=0,bad=0;
  rows.forEach(r=>{
    const ts=new Date(r[0]).getTime(),ty=/^(in|masuk)$/i.test(r[1]||'')?'in':/^(out|keluar)$/i.test(r[1]||'')?'out':null,a=parseFloat(r[3]);
    if(!isFinite(ts)||!ty||!(a>0)){if(isNaN(ts)&&/waktu|tanggal/i.test(r[0]||''))return;bad++;return}
    const L=ty=='in'?INC:OUT,nm=(r[2]||'').trim().toLowerCase(),c=L.find(k=>cat(k)[0].toLowerCase()==nm)||(ty=='in'?'lainin':'lain'),n=(r[4]||'').trim().slice(0,80),k=[ts,ty,r2(a),c,n].join('|');
    if(keys.has(k))return;keys.add(k);S.tx.push({id:uid(),ty,c,a:r2(a),n,ts});add++;
  });
  sortTx();save();render(false);toast(add?`${add} transaksi diimpor${bad?`, ${bad} baris dilewati`:''}`:bad?'Format file tidak dikenali':'Tidak ada transaksi baru');
}

/* ---------- Event ---------- */
const A={
tab:el=>{if(el.dataset.t!=tab)setTab(el.dataset.t)},
hide:()=>{S.set.hide=!S.set.hide;save();render(false)},
bell:openBell,
quick:el=>{
  const c=el.dataset.c,ty=el.dataset.ty||'out';el.classList.remove('go');void el.offsetWidth;el.classList.add('go');
  const fx=document.createElement('i');fx.className='fx';el.append(fx);vib();
  setTimeout(()=>{fx.remove();el.classList.remove('go')},650);
  setTimeout(()=>openTx({c,ty}),REDUCE?0:230);
},
add:()=>openTx({ty:'out'}),
row:el=>openTx({id:el.dataset.id}),
budget:openBudget,
mon:el=>{mon=madd(mon,+el.dataset.d);if(mon>curM())mon=curM();render(false)},
monset:el=>{mon=el.dataset.m;render(false)},
flt:el=>{flt=el.dataset.f;$$('#fl .chip').forEach(b=>b.classList.toggle('on',b.dataset.f==flt));$('#txl').innerHTML=listHTML()},
rep:el=>{rep=el.dataset.r;render(false)},
pal:el=>{S.set.pal=el.dataset.p;save();theme(true);render(false)},
mode:el=>{S.set.mode=el.dataset.m;save();theme(true);render(false)},
export:exportCSV,
import:()=>$('#file').click(),
reset:()=>confirmSheet('Hapus semua data?','Semua transaksi dan budget di perangkat ini akan dihapus. Pengaturan tampilan tetap.','Hapus',()=>{const b=snap();S.tx=[];S.bud={total:0,cats:{}};save();closeSheet();render(false);toast('Semua data dihapus',{c:'var(--exp)',undo:b})}),
undo:()=>{if(!UNDO)return;S.tx=UNDO;UNDO=null;sortTx();save();$('#toast').className='';render(false);setTimeout(()=>toast('Dibatalkan'),250)}
};
document.addEventListener('click',e=>{
  const s=e.target.closest('[data-s]');
  if(s&&$('#sheet').contains(s)){
    const v=s.dataset.s;
    if(v=='close')closeSheet();
    else if(v=='ty')setType(s.dataset.v);
    else if(v=='cat'){E.c=s.dataset.c;updTx();vib()}
    else if(v=='k')key(s.dataset.k);
    else if(v=='save')saveTx();
    else if(v=='del')delTx();
    else if(v=='note'){const i=$('#nin');i.hidden=!i.hidden;if(!i.hidden)i.focus()}
    else if(v=='bsave')saveBudget();
    else if(v=='ok'){const f=CONF;CONF=null;f&&f()}
    return;
  }
  const a=e.target.closest('[data-a]');if(a&&A[a.dataset.a])A[a.dataset.a](a);
});
document.addEventListener('input',e=>{
  if(e.target.id=='q'){q=e.target.value;$('#txl').innerHTML=listHTML()}
  else if(e.target.id=='nin'){E.n=e.target.value.trim();$('#ntx').textContent=E.n||'Catatan'}
  else if(e.target.id=='dinp'&&E){const v=e.target.value;if(!v)return;const o=new Date(E.ts),[y,m,d]=v.split('-').map(Number),n=new Date(y,m-1,d,o.getHours(),o.getMinutes(),o.getSeconds());E.ts=Math.min(n.getTime(),Date.now());$('#dtx').textContent=dlabel(E.ts,true)}
});
document.addEventListener('change',e=>{
  if(e.target.id=='cur'){S.set.cur=e.target.value;save();render(false)}
  else if(e.target.id=='file'){const f=e.target.files[0];e.target.value='';if(f)f.text().then(importCSV).catch(()=>toast('File tidak bisa dibaca',{c:'var(--exp)'}))}
});
document.addEventListener('keydown',e=>{
  if(e.key=='Escape'){closeSheet();return}
  if(!E||e.ctrlKey||e.metaKey||e.altKey)return;
  const t=e.target;if(t&&(t.tagName=='INPUT'||t.tagName=='SELECT'||t.tagName=='TEXTAREA'))return;
  if(/^[0-9]$/.test(e.key)){key(e.key);e.preventDefault()}
  else if(e.key=='.'||e.key==','){key('.');e.preventDefault()}
  else if(e.key=='Backspace'){key('del');e.preventDefault()}
  else if(e.key=='Enter'&&t.tagName!='BUTTON'){saveTx();e.preventDefault()}
});
addEventListener('storage',e=>{if(e.key==KEY){S=load();sortTx();theme();if(!E)render(false)}});
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&!$('#sheet').firstChild)render(false)});

/* Cegah zoom cubit di iOS Safari (zoom dobel-ketuk dicegah lewat touch-action di CSS) */
['gesturestart','gesturechange','gestureend'].forEach(t=>document.addEventListener(t,e=>e.preventDefault()));

/* ---------- Mulai ---------- */
theme();setTab('home',true);
if('serviceWorker'in navigator){
  navigator.serviceWorker.getRegistrations().then(r=>r.forEach(x=>{const u=(x.active||x.waiting||x.installing||{}).scriptURL||'';if(u.includes('firebase-messaging-sw'))x.unregister()})).catch(()=>{}).finally(()=>navigator.serviceWorker.register('/sw.js').catch(()=>{}));
}
})();
