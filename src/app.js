/* JejakDuit: aplikasi pencatatan keuangan. Data tersimpan lokal (localStorage), tanpa login dan tanpa backend. */
(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const LANG='id-ID',DL='id-ID'; // angka selalu format Indonesia: titik ribuan, koma desimal
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
clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
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
coins:'<circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/>',
coffee:'<path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/><path d="M6 2v2"/>',
car:'<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
cart:'<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>',
book:'<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/>',
phone:'<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>',
plane:'<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
game:'<line x1="6" x2="10" y1="12" y2="12"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="15" x2="15.01" y1="13" y2="13"/><line x1="18" x2="18.01" y1="11" y2="11"/><rect width="20" height="12" x="2" y="6" rx="2"/>',
grad:'<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',
zap:'<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
repeat:'<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
tag:'<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>'
,lock:'<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>'
,filter:'<line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/>'
,grid:'<rect width="7" height="7" x="3" y="3" rx="1.5"/><rect width="7" height="7" x="14" y="3" rx="1.5"/><rect width="7" height="7" x="3" y="14" rx="1.5"/><rect width="7" height="7" x="14" y="14" rx="1.5"/>'
,swap:'<path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/>'
,face:'<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01"/><path d="M15 9h.01"/>'
};
const icsvg=(n,s=20,w=2.15)=>`<svg class="i" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]||''}</svg>`;
const isEmo=v=>typeof v=='string'&&v.length>0&&v.length<=12&&!/^[a-z]+$/.test(v);
const ic=(n,z=20,w)=>/^[a-z]+$/.test(n)?icsvg(n,z,w):`<span class="emj" style="font-size:${Math.round(z*.95)}px" aria-hidden="true">${n}</span>`;

/* ---------- Kategori ---------- */
// Kategori disimpan di S.cats dan bisa diatur lewat Profil > Kategori. Bentuk ringkas: CAT[id] = [nama, ikon, warna, jenis]
const DEFC=[
{id:'makan',n:'Makan',i:'🍜',c:'#F97316',ty:'out'},{id:'transport',n:'Transport',i:'🚌',c:'#3B82F6',ty:'out'},{id:'belanja',n:'Belanja',i:'🛍️',c:'#EC4899',ty:'out'},
{id:'tagihan',n:'Tagihan',i:'🧾',c:'#0891B2',ty:'out'},{id:'hiburan',n:'Hiburan',i:'🎬',c:'#A855F7',ty:'out'},{id:'sehat',n:'Kesehatan',i:'💊',c:'#EF4444',ty:'out'},
{id:'lain',n:'Lainnya',i:'📦',c:'#64748B',ty:'out',sys:1},
{id:'gaji',n:'Gaji',i:'💰',c:'#10B981',ty:'in'},{id:'bonus',n:'Bonus',i:'🎁',c:'#E8890C',ty:'in'},{id:'investasi',n:'Investasi',i:'📈',c:'#6366F1',ty:'in'},
{id:'lainin',n:'Lainnya',i:'📦',c:'#64748B',ty:'in',sys:1}];
const CCOL=['#F97316','#EF4444','#EC4899','#A855F7','#6366F1','#3B82F6','#0891B2','#10B981','#65A30D','#E8890C','#B45309','#64748B'];
const EMOG=[['Makan & minum',['🍜','🍔','🍕','🍣','☕','🧋','🍰','🥗']],['Transport',['🚌','🚗','🏍️','🚆','✈️','⛽','🚕','🅿️']],['Belanja',['🛍️','🛒','👕','👟','💄','🎁','📱','💻']],['Rumah & tagihan',['🏠','💡','🧾','🚿','📶','🔧','🛋️','🧹']],['Hiburan',['🎬','🎮','🎵','🎤','📚','🏖️','🎟️','🏋️']],['Kesehatan & keluarga',['💊','🏥','🦷','👶','🐶','🎓','🧸','🤝']],['Uang & lainnya',['💰','💵','💳','🏦','📈','🪙','💼','🎉','🕌','🙏','🏷️','📦']]],ECOL=g=>CCOL[[].concat(...EMOG.map(x=>x[1])).indexOf(g)%CCOL.length]||CCOL[5];
const CICO=['utensils','coffee','bus','car','bag','cart','receipt','zap','film','game','heart','book','grad','phone','plane','home','gift','wallet','coins','up','target','tag','repeat','dots'];
let CAT={},OUT=[],INC=[];
function rebuild(L){CAT={};OUT=[];INC=[];(L||S.cats).forEach(x=>{CAT[x.id]=[x.n,x.i,x.c,x.ty];(x.ty=='in'?INC:OUT).push(x.id)})}
rebuild(DEFC);
const cat=id=>CAT[id]||CAT.lain;
const TFC=['Pindah dana','swap','#6366F1','tf'];

/* ---------- Palet ---------- */
// urutan: p, pc, bg, sf, tx, mu, ln, h
const K=['p','pc','bg','sf','tx','mu','ln','h'];
const PAL={
tosca:['Tosca Laut',['0B7983','FFFFFF','F2F8F8','FFFFFF','0F2A2D','587276','DCEAEA','0E7C86'],['43CCD6','04262A','0A191B','11272A','E4F4F5','8BADB1','1D3A3E','0B6770']],
biru:['Biru Tinta',['3451C7','FFFFFF','F3F5FD','FFFFFF','141A3A','5F6892','E0E4F5','2E48B0'],['8EA2FF','0E1647','0D1020','161B34','E8EBFA','98A0C8','262D52','3249B8']],
pink:['Mawar Muda',['BE185D','FFFFFF','FDF3F7','FFFFFF','2D1019','86596A','F5DCE6','BE185D'],['FF8FB7','3A0519','1A0D13','2A1620','FBE9F1','C9A0B1','43202F','9D1A4C']],
ungu:['Ungu Anggur',['6D28D9','FFFFFF','F7F4FE','FFFFFF','1E1233','6E6188','E6DDF7','5B21B6'],['B39CFF','1A0B3B','130C22','1D1333','EFE9FB','A99BC7','2D2150','4C1D95']],
jingga:['Jingga Senja',['C2490A','FFFFFF','FFF5F1','FFFFFF','2B1408','8A6652','F6DFD3','D9500A'],['FF9A5C','3A1500','1A0E08','2A1810','FBEDE4','C4A18C','44281A','9A3608']]};
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
const cur=()=>'Rp ';
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

/* ---------- Input uang: titik ribuan otomatis saat mengetik ---------- */
// Titik = pemisah ribuan (diabaikan saat diketik), koma = desimal. Teks dengan huruf (mis. 2jt, 450rb) dibiarkan.
function fmtInput(el){
  const v=el.value;if(/[a-z]/i.test(v))return;
  const neg=el.dataset.money=='neg'&&/^\s*[-−]/.test(v),pos=el.selectionStart==null?v.length:el.selectionStart,keep=x=>x.replace(/[^\d,]/g,''),before=keep(v.slice(0,pos)).length;
  const t=keep(v),k=t.indexOf(',');
  const i=(k<0?t:t.slice(0,k)).replace(/^0+(?=\d)/,'').slice(0,12),d=k<0?null:t.slice(k+1).replace(/,/g,'').slice(0,2);
  let out=i?i.replace(/\B(?=(\d{3})+(?!\d))/g,'.'):(d!=null?'0':'');
  if(d!=null)out+=','+d;
  out=(neg?'−':'')+out;
  if(out===v)return;
  let p=0,c=0;while(p<out.length&&c<before){if(/[\d,]/.test(out[p]))c++;p++}
  el.value=out;try{el.setSelectionRange(p,p)}catch(e){}
}

/* ---------- Tanggal ---------- */
const pad=n=>String(n).padStart(2,'0');
const ymd=ts=>{const d=new Date(ts);return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())};
const curM=()=>ymd(Date.now()).slice(0,7);
const mlabel=m=>new Date(+m.slice(0,4),+m.slice(5)-1,1).toLocaleDateString(DL,{month:'long',year:'numeric'});
const mshort=m=>new Date(+m.slice(0,4),+m.slice(5)-1,1).toLocaleDateString(DL,{month:'short'});
const madd=(m,n)=>{const d=new Date(+m.slice(0,4),+m.slice(5)-1+n,1);return d.getFullYear()+'-'+pad(d.getMonth()+1)};
const tlabel=ts=>new Date(ts).toLocaleTimeString(DL,{hour:'2-digit',minute:'2-digit',hour12:false}).replace('.',':');
function dlabel(ts,full){
  const k=ymd(ts),t=ymd(Date.now()),y=ymd(Date.now()-864e5);
  if(k==t)return'Hari ini';if(k==y)return'Kemarin';
  return new Date(ts).toLocaleDateString(DL,full?{day:'numeric',month:'short',year:'numeric'}:{weekday:'short',day:'numeric',month:'short'});
}
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* ---------- Data ---------- */
const KEY='kasku2'; // nama kunci lama dipertahankan supaya data yang sudah tersimpan tidak hilang
const DEFW=()=>({id:'tunai',n:'Tunai',i:'💵',c:'#10B981',init:0});
const def=()=>({tx:[],bud:{total:0,cats:{}},cats:DEFC.map(x=>({...x})),rec:[],wal:[DEFW()],set:{pal:'tosca',mode:'auto',cur:'Rp',hide:false,bk:0,pst:0,pin:null,bio:null,lkd:60000,lw:null,lk:null,anim:'lite',nt:{pct:80,t:'17:00',sys:false,last:''}}});
function normWal(a){
  const out=[],seen=new Set();
  (Array.isArray(a)?a:[]).forEach(x=>{
    if(!x||typeof x.id!='string'||!x.id||seen.has(x.id)||typeof x.n!='string'||!x.n.trim())return;
    seen.add(x.id);out.push({id:x.id,n:x.n.trim().slice(0,20),i:isEmo(x.i)?x.i:'👛',c:/^#[0-9a-fA-F]{6}$/.test(x.c)?x.c:'#64748B',init:isFinite(+x.init)?r2(+x.init):0});
  });
  return out.length?out:[DEFW()];
}
function normCats(a){
  const out=[],seen=new Set();
  (Array.isArray(a)?a:[]).forEach(x=>{
    if(!x||typeof x.id!='string'||!x.id||seen.has(x.id)||typeof x.n!='string'||!x.n.trim()||(x.ty!='out'&&x.ty!='in'))return;
    seen.add(x.id);out.push({id:x.id,n:x.n.trim().slice(0,24),i:(P[x.i]||isEmo(x.i))?x.i:'dots',c:/^#[0-9a-fA-F]{6}$/.test(x.c)?x.c:'#64748B',ty:x.ty,...((x.id=='lain'||x.id=='lainin')?{sys:1}:{})});
  });
  const MG={makan:['utensils','🍜'],transport:['bus','🚌'],belanja:['bag','🛍️'],tagihan:['receipt','🧾'],hiburan:['film','🎬'],sehat:['heart','💊'],gaji:['wallet','💰'],bonus:['gift','🎁'],investasi:['up','📈'],lain:['dots','📦'],lainin:['dots','📦']};
  out.forEach(x=>{const m=MG[x.id];if(m&&x.i==m[0])x.i=m[1]});
  const L=out.length?out:DEFC.map(x=>({...x}));
  DEFC.filter(x=>x.sys).forEach(d=>{if(!L.some(x=>x.id==d.id))L.push({...d})});
  return L;
}
function normRec(a){return Array.isArray(a)?a.filter(r=>r&&r.id&&(r.ty=='in'||r.ty=='out')&&r.a>0&&r.day>=1&&r.day<=31&&/^\d{4}-\d{2}$/.test(r.last||'')).map(r=>({id:String(r.id),ty:r.ty,c:r.c,a:+r.a,n:String(r.n||'').slice(0,80),day:Math.floor(r.day),auto:!!r.auto,h:Array.isArray(r.h)?r.h.filter(x=>/^\d{4}-\d{2}$/.test(x)).slice(-36):[],last:r.last,...(r.w?{w:String(r.w)}:{})})):[]}
const insertCat=nc=>{const k=S.cats.findIndex(x=>x.sys&&x.ty==nc.ty);k<0?S.cats.push(nc):S.cats.splice(k,0,nc)};
function norm(j){
  const d=def(),wal=normWal(j.wal),ids=new Set(wal.map(w=>w.id)),w0=wal[0].id,okw=w=>ids.has(w)?w:w0;
  const tx=[];
  j.tx.forEach(t=>{
    if(!t||!(t.a>0)||!t.ts)return;
    if(t.ty=='tf'){const w=okw(t.w);if(!ids.has(t.w2)||t.w2==w)return;tx.push({...t,w,w2:t.w2});return}
    tx.push({...t,w:okw(t.w)});
  });
  const rec=normRec(j.rec).map(r=>({...r,w:okw(r.w)}));
  return{tx,bud:{total:+(j.bud&&j.bud.total)||0,cats:(j.bud&&j.bud.cats)||{},...(j.bud&&j.bud.on===false?{on:false}:{}),...(j.bud&&j.bud.mo&&typeof j.bud.mo=='object'?{mo:j.bud.mo}:{}),...(j.bud&&j.bud.wk&&+j.bud.wk.total>0?{wk:{total:+j.bud.wk.total}}:{})},cats:normCats(j.cats),rec,wal,set:{...d.set,...j.set}};
}
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
let S=load();rebuild();
let warned=false;
function write(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){if(!warned){warned=true;toast('Data belum bisa disimpan: penyimpanan browser penuh atau diblokir',{c:'var(--exp)'})}}}
let svT=null;
function flush(){if(svT==null)return;clearTimeout(svT);svT=null;write()}
function save(){clearTimeout(svT);svT=setTimeout(()=>{svT=null;write()},300)}
addEventListener('pagehide',flush);document.addEventListener('visibilitychange',()=>{if(document.hidden)flush()});
const sortTx=()=>S.tx.sort((a,b)=>b.ts-a.ts||(a.id<b.id?1:-1));
const snap=()=>({tx:S.tx.map(t=>({...t})),rec:S.rec.map(r=>({...r}))});
const snapAll=()=>({...snap(),wal:S.wal.map(w=>({...w})),bud:JSON.parse(JSON.stringify(S.bud)),cats:S.cats.map(c=>({...c}))});
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6);
sortTx();
const inMonth=m=>S.tx.filter(t=>ymd(t.ts).startsWith(m));
const sum=(a,ty)=>a.reduce((s,t)=>t.ty==ty&&!t.adj?s+t.a:s,0); // penyesuaian saldo (adj) tidak dihitung
const walOf=id=>S.wal.find(w=>w.id==id)||S.wal[0];
const wb=id=>{let s=(S.wal.find(w=>w.id==id)||{init:0}).init;S.tx.forEach(t=>{if(t.ty=='tf'){if(t.w==id)s-=t.a;if(t.w2==id)s+=t.a}else if(t.w==id)s+=t.ty=='in'?t.a:-t.a});return r2(s)};
const balance=()=>r2(S.wal.reduce((s,w)=>s+wb(w.id),0));
const wUse=id=>S.tx.filter(t=>t.w==id||t.w2==id).length+S.rec.filter(r=>r.w==id).length;
const spentBy=m=>{const o={};inMonth(m).forEach(t=>{if(t.ty=='out'&&!t.adj)o[t.c]=(o[t.c]||0)+t.a});return o};
function week(off=0){
  const o=[];for(let i=6;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i-off*7);o.push({k:ymd(d),l:d.toLocaleDateString(DL,{weekday:'narrow'}),v:0,t:i==0&&!off})}
  S.tx.forEach(t=>{if(t.ty=='out'&&!t.adj){const x=o.find(z=>z.k==ymd(t.ts));if(x)x.v+=t.a}});return o;
}

/* ---------- Status UI ---------- */
let tab='home',mon=curM(),flt='all',wf=null,rwf=null,WD=null,AJ=null,WM=null,WE=null,q='',rep='out',NEW=null,UNDO=null,E=null,rng=null,CT='out',CE=null,RE=null,HT=null,HI=null,SW=null,DRAGGED=false,OPEN=null;
const wvis=t=>!wf||t.w==wf||t.w2==wf;
const wkS=d=>{const x=new Date(d);x.setDate(x.getDate()-((x.getDay()+6)%7));return ymd(x)};
const addD=(k,n)=>ymd(new Date(+k.slice(0,4),+k.slice(5,7)-1,+k.slice(8)+n));
const dFmt=(k,o)=>new Date(+k.slice(0,4),+k.slice(5,7)-1,+k.slice(8)).toLocaleDateString(DL,o);
let RP='m',WK=wkS(Date.now()),YR=curM().slice(0,4);
const rin=m=>inMonth(m).filter(t=>!rwf||t.w==rwf); // data Laporan, bisa disaring per dompet
const base=()=>(rng?S.tx.filter(t=>{const k=ymd(t.ts);return k>=rng.f&&k<=rng.t}):inMonth(mon)).filter(wvis);
const bkDue=()=>S.tx.length>=10&&(!S.set.bk||Date.now()-S.set.bk>14*864e5);
const usage=id=>S.tx.filter(t=>t.c==id).length+S.rec.filter(r=>r.c==id).length;
const PV={};

/* ---------- Render ---------- */
function row(t,o={}){
  const tf=t.ty=='tf',c=tf?TFC:cat(t.c),multi=S.wal.length>1,wn=!tf&&multi&&!o.wid?`<i class="wdt" role="img" aria-label="Dompet ${esc(walOf(t.w).n)}" title="${esc(walOf(t.w).n)}" style="--c:${walOf(t.w).c}"></i>`:'',sg=o.wid&&tf?(t.w2==o.wid?1:-1):0;
  const ttl=esc(t.n)||esc(c[0]),pre=tf?esc(walOf(t.w).n)+' → '+esc(walOf(t.w2).n)+' · ':(t.n?esc(c[0])+' · ':'');
  return`<div class="rw"><button class="rb" data-a="rdel" data-id="${esc(t.id)}" aria-label="Hapus transaksi">${ic('trash',20)}</button><button class="tr${t.id==NEW?' new':''}" data-a="row" data-id="${esc(t.id)}" style="--c:${c[2]}"><span class="cico sm">${ic(c[1],18)}</span><span class="tm"><b>${ttl}</b><small>${wn}${pre}${o.date?dlabel(t.ts)+' · ':''}${tlabel(t.ts)}${t.r?' · berulang':''}${t.adj?' · penyesuaian':''}</small></span><b class="am ${sg>0?'in':t.ty}">${t.ty=='in'||sg>0?'+':sg<0?'−':''}${money(t.a)}</b></button></div>`;
}
const empty=(i,a,b)=>`<div class="empty"><div class="ei">${ic(i,26)}</div><b>${a}</b>${b}</div>`;

function NT(){const n={pct:80,t:'17:00',d:1,sys:false,last:'',bt:'20:00',blast:'',bon:true,ron:true,...(S.set.nt||{})};n.bon=n.bon!==false;n.ron=n.ron!==false;n.bsys=S.set.nt&&S.set.nt.bsys!==undefined?!!S.set.nt.bsys:!!n.sys;n.pct=Math.min(100,Math.max(50,Math.round(+n.pct)||80));n.d=Math.min(30,Math.max(1,Math.round(+n.d)||1));if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(n.t))n.t='17:00';if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(n.bt))n.bt='20:00';return n}
const budOn=()=>S.bud.on!==false;
/* Budget bulanan boleh beda tiap bulan: S.bud.mo['YYYY-MM']. Bulan tanpa isian ikut isian terakhir sebelumnya; sebelum isian pertama pakai S.bud.total/cats (data lama). */
const bmo=m=>{const ks=Object.keys(S.bud.mo||{}).filter(k=>k<=m).sort();return ks.length?S.bud.mo[ks[ks.length-1]]:{total:S.bud.total,cats:S.bud.cats}};
const BG=m=>budOn()?bmo(m||curM()):{total:0,cats:{}};
const wkBud=()=>budOn()?(+(S.bud.wk&&S.bud.wk.total)||0):0;
function insights(){
  const r=[],m=curM(),O=sum(inMonth(m),'out'),sp=spentBy(m),b=BG().total,nt=NT(),th=nt.pct/100;
  S.wal.forEach(w=>{const v=wb(w.id);if(v<0)r.push({w:1,i:'alert',c:'var(--exp)',t:`Saldo ${w.n} minus`,s:`Saldo ${money(v)}. Cek apakah ada catatan yang salah dompet, atau sesuaikan saldo dari detail dompet.`})});
  if(nt.bon&&b){const p=O/b;if(p>=1)r.push({w:1,i:'alert',c:'var(--exp)',t:'Budget bulan ini terlewati',s:`Pengeluaran ${money(O)} dari budget ${money(b)}.`});
    else if(p>=th)r.push({w:1,i:'alert',c:'var(--amb)',t:`Budget sudah ${Math.round(p*100)}% terpakai`,s:`Sisa ${money(b-O)} untuk bulan ini.`})}
  if(nt.bon)OUT.forEach(k=>{const l=BG().cats[k];if(l&&(sp[k]||0)/l>=th)r.push({w:1,i:'alert',c:(sp[k]||0)>=l?'var(--exp)':'var(--amb)',t:`Budget ${cat(k)[0]} ${Math.round((sp[k]||0)/l*100)}%`,s:`${money(sp[k]||0)} dari batas ${money(l)}.`})});
  if(nt.ron&&!S.tx.some(t=>ymd(t.ts)==ymd(Date.now()))&&new Date().getHours()*60+new Date().getMinutes()>=(+nt.t.slice(0,2))*60+(+nt.t.slice(3)))r.push({w:1,i:'pen',c:'var(--p)',t:'Belum ada catatan hari ini',s:'Ketuk kategori di Beranda untuk mencatat.'});
  const a=week().reduce((s,x)=>s+x.v,0),b2=week(1).reduce((s,x)=>s+x.v,0);
  if(b2>0&&a>0){const d=Math.round((a-b2)/b2*100);if(Math.abs(d)>=5)r.push({w:0,i:d>0?'up':'down',c:d>0?'var(--exp)':'var(--inc)',t:d>0?`Pengeluaran 7 hari naik ${d}%`:`Pengeluaran 7 hari turun ${-d}%`,s:'Dibandingkan 7 hari sebelumnya.'})}
  if(bkDue())r.push({w:1,i:'dl',c:'var(--amb)',t:'Saatnya cadangkan data',s:S.set.bk?'Cadangan terakhir lebih dari 2 minggu lalu. Buka Profil > Cadangkan data.':'Data hanya ada di perangkat ini. Buka Profil > Cadangkan data.'});
  const dr=dueRecs();if(dr.length)r.push({w:1,i:'repeat',c:'var(--amb)',t:dr.length+' transaksi berulang jatuh tempo',s:'Buka Beranda untuk mencatat, mengubah, atau melewati.'});
  return r;
}

/* ---------- Dompet: strip, filter, detail ---------- */
const WPRE=[['BCA','🏦','#3B82F6'],['GoPay','📱','#0891B2'],['OVO','💳','#A855F7'],['Dana','👛','#F97316']];
const eff=(t,id)=>t.ty=='tf'?(t.w==id?-t.a:t.w2==id?t.a:0):t.w!=id?0:t.ty=='in'?t.a:-t.a; // pengaruh transaksi ke saldo satu dompet
const wflow=(id,m)=>{const a=inMonth(m).filter(t=>t.w==id);return{i:sum(a,'in'),o:sum(a,'out')}};
function walStrip(hide){
  const h=hide.trim(),one=S.wal.length==1;
  const cards=S.wal.map(w=>{const b=wb(w.id);
    return`<button class="wc${b<0?' neg':''}" style="--c:${w.c}" data-a="wopen" data-id="${esc(w.id)}" aria-label="${esc(w.n)}, saldo ${money(b)}${b<0?' (minus)':''}. Buka detail"><span class="cico sm">${ic(w.i,20)}</span><span class="wn">${esc(w.n)}</span><b class="${h}">${money(b)}</b></button>`}).join('');
  const tf=one?'':`<button class="wc tfc" data-a="wtf" aria-label="Pindah dana antar dompet"><span class="wp">${ic('swap',20,2.4)}</span><span class="wn">Pindah dana</span></button>`;
  const add=one?'':`<button class="wc add" data-a="wadd" aria-label="Tambah dompet"><span class="wp">${ic('plus',20,2.6)}</span><span class="wn">Dompet</span></button>`;
  return`<div class="sec">Dompet<button class="more" data-a="wals">Kelola</button></div><div class="wr">${cards}${tf}${add}</div>${one&&!S.set.wnx&&!S.tx.length?wNudge():''}`;
}
function wNudge(){
  const have=S.wal[0].n.toLowerCase();
  return`<div class="wnd"><button class="wnx" data-a="wnx" aria-label="Tutup saran">${ic('x',16)}</button><b>Pisahkan biar tahu saldo tiap rekening</b><div class="wnc">${WPRE.filter(x=>x[0].toLowerCase()!=have).map(x=>`<button class="chip" style="--c:${x[2]}" data-a="wquick" data-pw="${x[0]}"><i class="wdt"></i>${x[0]}</button>`).join('')}<button class="chip" data-a="wadd">${ic('plus',14,2.6)}Lainnya</button></div></div>`;
}
function wChips(cur,act){
  if(S.wal.length<2)return'';
  return`<div class="fl wfl" role="group" aria-label="Filter dompet"><button class="chip${!cur?' on':''}" data-a="${act}" data-id="" aria-pressed="${!cur}">Semua dompet</button>${S.wal.map(w=>`<button class="chip wch${cur==w.id?' on':''}" style="--c:${w.c}" data-a="${act}" data-id="${esc(w.id)}" aria-pressed="${cur==w.id}"><i class="wdt"></i>${esc(w.n)}</button>`).join('')}</div>`;
}
function groupHTML(L,o={}){
  const g={};L.forEach(t=>(g[ymd(t.ts)]=g[ymd(t.ts)]||[]).push(t));
  const net=a=>o.wid?r2(a.reduce((s,t)=>s+eff(t,o.wid),0)):sum(a,'in')-sum(a,'out');
  return Object.keys(g).sort().reverse().map(k=>{const a=g[k],n=net(a);return`<div class="dh"><span>${dlabel(a[0].ts)}</span><b class="${n>0?'in':''}">${n>0?'+':''}${money(n)}</b></div><div class="list">${a.map(t=>row(t,{wid:o.wid})).join('')}</div>`}).join('');
}
function bal30(id){ // saldo akhir tiap hari selama 30 hari terakhir
  const w=walOf(id),o=[];
  for(let i=29;i>=0;i--){const d=new Date();d.setHours(23,59,59,999);d.setDate(d.getDate()-i);const e=d.getTime();let v=w.init;S.tx.forEach(t=>{if(t.ts<=e)v+=eff(t,id)});o.push(r2(v))}
  return o;
}
function spark(v,c){
  const W=300,H=88,px=8,py=10,mn=Math.min(...v),mx=Math.max(...v),X=i=>px+i/(v.length-1)*(W-2*px),Y=x=>mx==mn?H/2:H-py-(x-mn)/(mx-mn)*(H-2*py);
  const L='M'+v.map((x,i)=>X(i).toFixed(1)+','+Y(x).toFixed(1)).join('L'),A=L+`L${X(v.length-1).toFixed(1)},${H}L${X(0).toFixed(1)},${H}Z`;
  const z=mn<0&&mx>0?`<line class="z" x1="0" x2="${W}" y1="${Y(0).toFixed(1)}" y2="${Y(0).toFixed(1)}"/>`:'';
  return`<svg viewBox="0 0 ${W} ${H}" style="color:${c}" role="img" aria-label="Grafik saldo 30 hari terakhir, dari ${money(v[0])} menjadi ${money(v[v.length-1])}"><defs><linearGradient id="wgr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="currentColor" stop-opacity=".30"/><stop offset="1" stop-color="currentColor" stop-opacity="0"/></linearGradient></defs>${z}<path d="${A}" fill="url(#wgr)"/><path class="l" d="${L}"/><circle cx="${X(v.length-1).toFixed(1)}" cy="${Y(v[v.length-1]).toFixed(1)}" r="4" fill="currentColor"/></svg>`;
}
function wdPage(){
  const w=walOf(WD),id=w.id,bal=wb(id),cm=curM(),f=wflow(id,cm),h=S.set.hide?' mk':'',hc=h.trim();
  const tm=inMonth(cm).filter(t=>t.ty=='tf'),ti=tm.reduce((s,t)=>t.w2==id?s+t.a:s,0),to=tm.reduce((s,t)=>t.w==id?s+t.a:s,0);
  const v=bal30(id),ch=r2(v[v.length-1]-v[0]),L=inMonth(mon).filter(t=>t.w==id||t.w2==id);
  return`<header class="hd"><button class="ib" data-a="wdback" aria-label="Kembali ke Beranda">${ic('cl',20)}</button><h1 class="wdh">${esc(w.i)} ${esc(w.n)}</h1><button class="ib" data-a="hide" aria-label="${S.set.hide?'Tampilkan':'Sembunyikan'} saldo">${ic(S.set.hide?'eyeoff':'eye',19)}</button></header>
<section class="hero" style="--h:${w.c}"><div class="hl">Saldo ${esc(w.n)}</div><div class="bigb${h}" data-n="${bal}" data-k="wdb">${money(bal)}</div>${bal<0?`<div class="negb">${ic('alert',14,2.6)}Saldo minus</div>`:''}
<div class="pills"><div class="pill"><span class="pc in">${ic('adl',15,2.6)}</span><div style="min-width:0"><small>Masuk bulan ini</small><b class="${hc}" data-n="${f.i}" data-k="wdi">${money(f.i)}</b></div></div><div class="pill"><span class="pc out">${ic('aur',15,2.6)}</span><div style="min-width:0"><small>Keluar bulan ini</small><b class="${hc}" data-n="${f.o}" data-k="wdo">${money(f.o)}</b></div></div></div>
</section>
<div class="wact" style="--c:${w.c}"><button data-a="wdadd">${ic('plus',20,2.6)}<span>Catat</span></button><button data-a="wdtf" ${S.wal.length<2?'disabled':''}>${ic('swap',20,2.2)}<span>Pindah dana</span></button><button data-a="wdadj">${ic('coins',20)}<span>Sesuaikan</span></button><button data-a="wdedit">${ic('pen',20)}<span>Ubah</span></button></div>
<div class="card wdc" style="--c:${w.c}"><div class="wdct"><b>Saldo 30 hari</b><span class="${ch>0?'up':ch<0?'dn':''}${h}">${ch==0?'Tidak berubah':(ch>0?'+':'−')+money(Math.abs(ch))}</span></div>${spark(v,w.c)}<div class="wdax"><span>30 hari lalu</span><span>Hari ini</span></div></div>
<div class="sec" style="margin-bottom:0">Transaksi</div>${monNav()}
${L.length?groupHTML(L,{wid:id}):`<div class="list">${empty('inbox','Belum ada transaksi','Ketuk Catat untuk mencatat di dompet ini.')}</div>`}`;
}

/* Urutan Catat cepat: S.set.qo berisi id kategori keluar dan 'IN' (tombol Pemasukan). Id yang sudah tidak ada dibuang, yang baru ditaruh di akhir. */
function qorder(){const all=[...OUT,'IN'],o=Array.isArray(S.set.qo)?S.set.qo:[],r=o.filter((k,i)=>all.includes(k)&&o.indexOf(k)==i);all.forEach(k=>{if(!r.includes(k))r.push(k)});return r}
function home(anim){
  const n=new Date(),mt=inMonth(curM()),I=sum(mt,'in'),O=sum(mt,'out'),bal=balance(),b=BG().total,pct=b?O/b*100:0,w=week(),wt=w.reduce((s,x)=>s+x.v,0),mx=Math.max(...w.map(x=>x.v),1);
  const hr=n.getHours(),g=hr<4?'Selamat malam':hr<11?'Selamat pagi':hr<15?'Selamat siang':hr<18?'Selamat sore':'Selamat malam';
  const dot=insights().some(x=>x.w==1),hide=S.set.hide?' mk':'',Cc=2*Math.PI*34,col=pct>=100?'var(--exp)':pct>=80?'var(--amb)':'var(--p)';
  const sp=spentBy(curM()),anyB=OUT.some(id=>BG().cats[id]>0);
  const tile=k=>{
    if(k=='IN')return`<button class="qt" style="--c:#10B981" data-a="quick" data-c="${INC[0]}" data-ty="in"><span class="qr"><span class="cico">${ic('adl',24,2.4)}</span></span><span class="ql">Pemasukan</span></button>`;
    const id=k;
    return`<button class="qt" style="--c:${cat(id)[2]}" data-a="quick" data-c="${id}"><span class="qr"><span class="cico">${ic(cat(id)[1],28)}</span></span><span class="ql">${esc(cat(id)[0])}</span></button>`};
  const qa=qorder();let qs=qa,more='';
  if(qa.length>10){const first=qa.slice(0,9);if(!first.includes('IN')){first.splice(8,1,'IN')}qs=first;more=`<button class="qt" style="--c:var(--mu)" data-a="qall"><span class="qr"><span class="cico">${ic('grid',22,2.2)}</span></span><span class="ql">Semua</span></button>`}
  const tiles=qs.map(tile).join('')+more;
  const nudge=bkDue()?`<button class="nudge" data-a="bkjson"><span class="si">${ic('dl',18)}</span><span class="st"><b>Cadangkan datamu</b><small>${S.set.bk?'Cadangan terakhir sudah lebih dari 2 minggu':'Belum pernah dicadangkan. Data hanya ada di perangkat ini.'}</small></span>${ic('cr',16)}</button>`:'';
  const tk=ymd(Date.now()),yk=ymd(Date.now()-864e5),rc=S.tx.filter(t=>{const k=ymd(t.ts);return k==tk||k==yk}).slice(0,8);
  return`<header class="hd"><div><div class="gr">${g}</div><div class="dt">${n.toLocaleDateString(DL,{weekday:'long',day:'numeric',month:'long'})}</div></div>
<div class="ha"><button class="ib" data-a="hide" aria-label="${S.set.hide?'Tampilkan':'Sembunyikan'} saldo">${ic(S.set.hide?'eyeoff':'eye',19)}</button><button class="ib" data-a="bell" aria-label="Notifikasi">${ic('bell',19)}${dot?'<i class="dot"></i>':''}</button></div></header>
<section class="hero"><i class="bl bl1"></i><i class="bl bl2"></i><div class="hl">Total saldo</div><div class="bigb${hide}" data-n="${bal}" data-k="bal">${money(bal)}</div>${heroBud(hide)}
<div class="pills"><button class="pill" data-a="gotx" data-f="in"><span class="pc in">${ic('adl',15,2.6)}</span><div style="min-width:0"><small>Masuk</small><b class="${hide.trim()}" data-n="${I}" data-k="in">${money(I)}</b></div></button>
<button class="pill" data-a="gotx" data-f="out"><span class="pc out">${ic('aur',15,2.6)}</span><div style="min-width:0"><small>Keluar</small><b class="${hide.trim()}" data-n="${O}" data-k="out">${money(O)}</b></div></button></div></section>${nudge}
${walStrip(hide)}${dueCard()}
<h3 class="sec">Catat per kategori<button class="more" data-a="qord">Atur</button></h3><div class="card qg">${tiles}</div>
<div class="sec">Terbaru${S.tx.length>rc.length?'<button class="more" data-a="tab" data-t="tx">Lihat semua</button>':''}</div>
${rc.length?groupHTML(rc):`<div class="list">${empty('inbox',S.tx.length?'Belum ada transaksi hari ini':'Belum ada transaksi',S.tx.length?'Transaksi sebelumnya ada di tab Transaksi.':'Ketuk salah satu kategori di atas untuk mencatat.')}</div>`}
`;
}

function monNav(){return`<div class="mon"><button data-a="mon" data-d="-1" aria-label="Bulan lalu">${ic('cl',18)}</button><button class="mtl" data-a="mpick" aria-label="Pilih bulan dan tahun"><h2>${mlabel(mon)}</h2>${ic("cr",15)}</button><button data-a="mon" data-d="1" aria-label="Bulan depan" ${mon>=curM()?'disabled':''}>${ic('cr',18)}</button></div>`}

const FX0=()=>({cats:[],wals:[],min:0,max:0,sort:'new'});
let FX=FX0(),FD=null;
const fxN=()=>(FX.cats.length?1:0)+(FX.wals.length?1:0)+(FX.min||FX.max?1:0)+(flt!='all'?1:0)+(rng?1:0);
const fxOn=()=>fxN()>0||FX.sort!='new'||q.trim()!='';
const rbase=()=>rng?S.tx.filter(t=>{const k=ymd(t.ts);return k>=rng.f&&k<=rng.t}):inMonth(mon);
function fxList(){
  const ql=q.trim().toLowerCase(),qn=ql.replace(/[.\s]/g,'');
  const L=rbase().filter(t=>(flt=='all'||t.ty==flt)&&(!FX.cats.length||(t.ty!='tf'&&FX.cats.includes(t.c)))&&(!FX.wals.length||FX.wals.includes(t.w)||FX.wals.includes(t.w2))&&(!FX.min||t.a>=FX.min)&&(!FX.max||t.a<=FX.max)&&(!ql||(t.n||'').toLowerCase().includes(ql)||(t.ty=='tf'?'pindah dana transfer':cat(t.c)[0]).toLowerCase().includes(ql)||walOf(t.w).n.toLowerCase().includes(ql)||(t.w2&&walOf(t.w2).n.toLowerCase().includes(ql))||(/^\d+$/.test(qn)&&String(Math.round(t.a)).includes(qn))));
  if(FX.sort=='big')L.sort((a,b)=>b.a-a.a);
  return L;
}
function fxChips(){
  const c=[],x=(k,v,l,col)=>c.push(`<button class="chip on fxc" data-a="fxrm" data-k="${k}" data-v="${esc(v)}" aria-label="Hapus filter ${esc(l)}">${col?`<i class="wdt" style="--c:${col}"></i>`:''}${esc(l)}${ic('x',13,2.8)}</button>`);
  if(flt!='all')x('t','',{out:'Keluar',in:'Masuk',tf:'Pindah dana'}[flt]);
  FX.cats.forEach(id=>x('c',id,cat(id)[0]));
  FX.wals.forEach(id=>{const w=S.wal.find(z=>z.id==id);if(w)x('w',id,w.n,w.c)});
  if(FX.min||FX.max)x('n','',FX.min&&FX.max?ktg(FX.min)+' – '+ktg(FX.max):FX.min?'≥ '+ktg(FX.min):'≤ '+ktg(FX.max));
  if(rng)x('d','',fmtD(rng.f)+' – '+fmtD(rng.t));
  return c.length?`<div class="fl fxl">${c.join('')}</div>`:'';
}
function listHTML(){
  const L=fxList(),on=fxOn();
  const bar=on?`<div class="fxs"><span><b>${NF0.format(L.length)} transaksi</b> · Keluar ${money(sum(L,'out'))} · Masuk ${money(sum(L,'in'))}</span><button data-a="fxclr">Hapus filter</button></div>`:'';
  if(!L.length)return bar+`<div class="list">${empty('inbox',on?'Tidak ada hasil':'Belum ada transaksi',on?'Coba ubah filter atau kata kunci.':'Ketuk tombol + untuk mencatat.')}${on?`<button class="btn2" data-a="fxclr" style="width:calc(100% - 32px);margin:0 16px 18px">Reset filter</button>`:''}</div>`;
  return bar+(FX.sort=='big'?`<div class="list" style="margin-top:12px">${L.map(t=>row(t,{date:1})).join('')}</div>`:groupHTML(L));
}
const fxHead=()=>`<div class="srch">${ic('search',18)}<input id="q" type="search" placeholder="Cari catatan, kategori, nominal" value="${esc(q)}" aria-label="Cari transaksi"><button class="fxb${fxN()?' on':''}" data-a="fxopen" aria-label="Filter transaksi${fxN()?', '+fxN()+' aktif':''}">${ic('filter',18)}${fxN()?`<em>${fxN()}</em>`:''}</button></div><div id="fxch">${fxChips()}</div>`;
function fxSheet(){
  const D=FD,W=S.wal.length>1,td=ymd(Date.now());
  const cc=id=>`<button class="chip${D.cats.includes(id)?' on':''}" data-s="fxc" data-id="${esc(id)}" aria-pressed="${D.cats.includes(id)}" style="--c:${cat(id)[2]}"><span class="fxi">${ic(cat(id)[1],15)}</span>${esc(cat(id)[0])}</button>`;
  const pr=[['<50 rb',0,50000],['50–200 rb',50000,200000],['>200 rb',200000,0]];
  openSheet(`<div class="sheet fxs2" role="dialog" aria-modal="true" aria-label="Filter transaksi" tabindex="-1" style="--c:var(--p)"><div class="tint"></div><div class="grab"></div>
<div class="sh-top"><div class="sh-t">Filter</div><div class="sh-act"><button class="ib" data-s="close" aria-label="Tutup">${ic('x',18)}</button></div></div>
<div class="fxsc">
<div class="fxg"><label>Jenis</label><div class="fxw">${[['all','Semua'],['out','Keluar'],['in','Masuk'],['tf','Pindah dana']].map(x=>`<button class="chip${D.t==x[0]?' on':''}" data-s="fxt" data-v="${x[0]}" aria-pressed="${D.t==x[0]}">${x[1]}</button>`).join('')}</div></div>
<div class="fxg" id="fxgo" ${D.t=='in'||D.t=='tf'?'hidden':''}><label>Kategori keluar</label><div class="fxw">${OUT.map(cc).join('')}</div></div>
<div class="fxg" id="fxgi" ${D.t=='out'||D.t=='tf'?'hidden':''}><label>Kategori masuk</label><div class="fxw">${INC.map(cc).join('')}</div></div>
${W?`<div class="fxg"><label>Dompet</label><div class="fxw">${S.wal.map(w=>`<button class="chip wch${D.wals.includes(w.id)?' on':''}" style="--c:${w.c}" data-s="fxw" data-id="${esc(w.id)}" aria-pressed="${D.wals.includes(w.id)}"><i class="wdt"></i>${esc(w.n)}</button>`).join('')}</div></div>`:''}
<div class="fxg"><label>Nominal</label><div class="fxw">${pr.map(x=>`<button class="chip" data-s="fxn" data-a1="${x[1]}" data-a2="${x[2]}">${x[0]}</button>`).join('')}</div>
<div class="fxr"><div class="fxf"><small>Min</small><input id="fxmin" data-money inputmode="numeric" placeholder="0" value="${D.min?num(D.min):''}" aria-label="Nominal minimum"></div><div class="fxf"><small>Maks</small><input id="fxmax" data-money inputmode="numeric" placeholder="∞" value="${D.max?num(D.max):''}" aria-label="Nominal maksimum"></div></div></div>
<div class="fxg"><label>Tanggal</label><div class="fxw">${[['7','7 hari'],['30','30 hari'],['bm','Bulan ini'],['bl','Bulan lalu']].map(x=>`<button class="chip" data-s="rp" data-v="${x[0]}">${x[1]}</button>`).join('')}</div>
<div class="fxr"><div class="fxf"><small>Dari</small><input type="date" id="rf" max="${td}" value="${D.f||''}" aria-label="Dari tanggal"></div><div class="fxf"><small>Sampai</small><input type="date" id="rt2" max="${td}" value="${D.to||''}" aria-label="Sampai tanggal"></div></div></div>
<div class="fxg"><label>Urutkan</label><div class="fxw">${[['new','Terbaru'],['big','Terbesar']].map(x=>`<button class="chip${D.sort==x[0]?' on':''}" data-s="fxso" data-v="${x[0]}" aria-pressed="${D.sort==x[0]}">${x[1]}</button>`).join('')}</div></div>
</div>
<div class="svrow"><button class="btn2" data-s="fxrs">Reset</button><button class="save" data-s="fxok" style="background-color:var(--p);color:var(--pc)">Terapkan</button></div></div>`);
}
const mnum=id=>{const v=($(id)||{}).value||'';return Math.max(0,Math.round(parseFloat(v.replace(/\./g,'').replace(',','.'))||0))};
const fmtD=k=>new Date(+k.slice(0,4),+k.slice(5,7)-1,+k.slice(8)).toLocaleDateString(DL,{day:'numeric',month:'short',year:'numeric'});
const rngBar=()=>`<div class="rngb"><span>${fmtD(rng.f)} – ${fmtD(rng.t)}</span><button data-a="rclr" aria-label="Hapus filter tanggal">${ic('x',16)}</button></div>`;
function txList(){
  const mt=rbase();
  return`<header class="hd"><h1>Transaksi</h1></header>${rng?rngBar():monNav()}
<div class="sum2"><div class="card"><small>Masuk</small><b class="in">${money(sum(mt,'in'))}</b></div><div class="card"><small>Keluar</small><b class="out">${money(sum(mt,'out'))}</b></div></div>
${fxHead()}
<div id="txl">${listHTML()}</div>`;
}


/* ---------- Laporan: Minggu, Bulan, Tahun ---------- */
function rdata(){
  const rf=t=>!rwf||t.w==rwf,all=S.tx.filter(rf),td=ymd(Date.now()),K=t=>ymd(t.ts),now=curM(),Y=td.slice(0,4);
  const dd=k=>new Date(+k.slice(0,4),+k.slice(5,7)-1,+k.slice(8));
  const o={cur:[],prev:[],el:1,live:false,pl:'',la:'',lb:'',title:'',nav:'',tr:[],trT:'',pn:''};
  const mb=m=>{const a=all.filter(t=>K(t).slice(0,7)==m);return{m,i:sum(a,'in'),o:sum(a,'out')}};
  if(RP=='w'){
    const f=WK,t=addD(f,6),pf=addD(f,-7);o.live=f==wkS(Date.now());
    o.el=o.live?Math.round((dd(td)-dd(f))/864e5)+1:7;const pt=addD(pf,o.el-1);
    o.cur=all.filter(x=>K(x)>=f&&K(x)<=t);o.prev=all.filter(x=>K(x)>=pf&&K(x)<=pt);
    const sh={day:'numeric',month:'short'};
    o.pl='minggu lalu';o.title=o.live?'Minggu ini':dFmt(f,sh)+' – '+dFmt(t,sh);
    o.la=o.live?'Mgg ini':dFmt(f,sh);o.lb=o.live?'Mgg lalu':dFmt(pf,sh);
    o.nav=pNav(dFmt(f,sh)+' – '+dFmt(t,{day:'numeric',month:'short',year:'numeric'}),!o.live,'Minggu');
    o.trT='Per hari';for(let i=0;i<7;i++){const k=addD(f,i),a=all.filter(x=>K(x)==k);o.tr.push({l:dFmt(k,{weekday:'short'}),i:sum(a,'in'),o:sum(a,'out'),on:1,k})}
    o.pn=o.live?'Perbandingan memakai '+o.el+' hari pertama minggu lalu, supaya adil dengan minggu yang masih berjalan.':'';
  }else if(RP=='y'){
    o.live=YR==Y;const doy=Math.round((dd(td)-new Date(+Y,0,1))/864e5)+1,py=String(+YR-1);
    o.el=o.live?doy:(new Date(+YR,1,29).getMonth()==1?366:365);
    o.cur=all.filter(x=>K(x).slice(0,4)==YR);o.prev=all.filter(x=>K(x).slice(0,4)==py&&(!o.live||K(x).slice(5)<=td.slice(5)));
    o.pl='tahun lalu';o.title=o.live?'Tahun ini':YR;o.la=YR;o.lb=py;o.nav=pNav(YR,!o.live,'Tahun');
    o.trT='Per bulan, '+YR;for(let i=1;i<=12;i++){const m=YR+'-'+String(i).padStart(2,'0'),b=mb(m);o.tr.push({l:mshort(m),i:b.i,o:b.o,on:1,m})}
    o.pn=o.live?'Perbandingan memakai 1 Januari sampai '+dFmt(td,{day:'numeric',month:'long'})+' tahun lalu, supaya adil dengan tahun yang masih berjalan.':'';
  }else{
    o.live=mon==now;const cut=o.live?new Date().getDate():99,dm=new Date(+mon.slice(0,4),+mon.slice(5),0).getDate(),pm=madd(mon,-1);
    o.el=o.live?new Date().getDate():mon>now?1:dm;
    o.cur=all.filter(x=>K(x).slice(0,7)==mon);o.prev=all.filter(x=>K(x).slice(0,7)==pm&&+K(x).slice(8)<=cut);
    o.pl='bulan lalu';o.title=o.live?'Bulan ini':mlabel(mon);o.la=mshort(mon);o.lb=mshort(pm);o.nav=monNav();o.dm=dm;
    o.trT='6 bulan terakhir';for(let i=5;i>=0;i--){const m=madd(mon,-i),b=mb(m);o.tr.push({l:mshort(m),i:b.i,o:b.o,on:m==mon,m})}
    o.pn=o.live?'Perbandingan memakai tanggal 1–'+cut+' bulan lalu, supaya adil dengan bulan yang masih berjalan.':'';
  }
  return o;
}
const pNav=(label,canNext,w)=>`<div class="mon"><button data-a="rpn" data-d="-1" aria-label="${w} sebelumnya">${ic('cl',18)}</button><div class="mtl"><h2>${esc(label)}</h2></div><button data-a="rpn" data-d="1" aria-label="${w} berikutnya" ${canNext?'':'disabled'}>${ic('cr',18)}</button></div>`;
function cmpLine(by,pby,ty,P){
  const ks=[...new Set([...Object.keys(by),...Object.keys(pby)])].sort((a,b)=>Math.max(by[b]||0,pby[b]||0)-Math.max(by[a]||0,pby[a]||0));
  if(!ks.length)return'';
  const row=k=>{const c=cat(k),n=by[k]||0,p=pby[k]||0,d=p?Math.round((n-p)/p*100):null,bad=ty=='out'?n>p:n<p;
    const dt=d===null?'<em class="dlt nw">Baru</em>':d==0?'<em class="dlt">Sama</em>':`<em class="dlt ${bad?'bad':'good'}">${d>0?'▲':'▼'} ${Math.abs(d)>999?'>999':Math.abs(d)}%</em>`;
    return`<div class="cmr" style="--c:${c[2]}"><span class="cico sm">${ic(c[1],18)}</span><div class="m"><b>${esc(c[0])}</b><div class="cmv"><span><small>${esc(P.la)}</small>${money(n)}</span><span class="pv"><small>${esc(P.lb)}</small>${money(p)}</span></div></div>${dt}</div>`};
  return`<div class="sec">Per kategori: ${esc(P.la)} vs ${esc(P.lb)}</div><div class="list cmrl">${ks.map(row).join('')}</div>`;
}
function sorotan(P,O,mt){
  const rows=[],out=mt.filter(t=>t.ty=='out'&&!t.adj),td=ymd(Date.now());
  const byDay={};out.forEach(t=>{const k=ymd(t.ts);byDay[k]=(byDay[k]||0)+t.a});
  const topDay=()=>{const e=Object.entries(byDay).sort((a,b)=>b[1]-a[1])[0];return e?[dFmt(e[0],{weekday:'long',day:'numeric',month:'short'}),money(e[1])]:null};
  if(RP=='w'){
    const f=WK,days=[...Array(7).keys()].map(i=>addD(f,i)).filter(k=>k<=td),z=days.filter(k=>!byDay[k]).length,t=topDay();
    if(t)rows.push(['Hari paling boros',t[0],t[1]]);
    if(days.length)rows.push(['Hari tanpa pengeluaran',z+' dari '+days.length+' hari','']);
  }else if(RP=='m'){
    const big=out.slice().sort((a,b)=>b.a-a.a)[0],t=topDay();
    if(big)rows.push(['Transaksi terbesar',esc(big.n||cat(big.c)[0]),money(big.a)]);
    if(t)rows.push(['Hari paling boros',t[0],t[1]]);
    if(P.live&&P.el>=3&&O>0)rows.push(['Proyeksi keluar akhir bulan','jika pola pengeluaran sama',money(Math.round(O/P.el*P.dm))]);
  }else{
    const nowM=curM(),ms=P.tr.filter(x=>x.m<=nowM&&x.o>0);
    if(ms.length){const hi=ms.reduce((a,b)=>b.o>a.o?b:a),lo=ms.reduce((a,b)=>b.o<a.o?b:a);
      rows.push(['Bulan paling boros',mlabel(hi.m),money(hi.o)]);
      if(ms.length>1)rows.push(['Bulan paling hemat',mlabel(lo.m),money(lo.o)]);
      rows.push(['Rata-rata keluar per bulan','',money(Math.round(O/(P.live?+nowM.slice(5):12)))])}
  }
  return rows.length?`<div class="sec">Sorotan</div><div class="list hl">${rows.map(r=>`<div class="sr"><div class="sl"><b>${r[0]}</b>${r[1]?`<small>${r[1]}</small>`:''}</div><span>${r[2]}</span></div>`).join('')}</div>`:'';
}

/* Laporan tambahan: budget vs realisasi, rasio tabungan, kategori naik, per dompet */
function bvr(P,mt){
  if(RP!='m'||rwf||!budOn())return'';
  const sp={};mt.filter(t=>t.ty=='out'&&!t.adj).forEach(t=>sp[t.c]=(sp[t.c]||0)+t.a);
  const items=OUT.filter(k=>S.bud.cats[k]>0).map(k=>({k,v:sp[k]||0,l:S.bud.cats[k]})).sort((a,b)=>b.v/b.l-a.v/a.l);
  const tot=S.bud.total>0?{v:Object.values(sp).reduce((a,b)=>a+b,0),l:S.bud.total}:null;
  if(!items.length&&!tot)return'';
  const left=P.live?P.dm-new Date().getDate():0;
  const row=(ico,col,name,v,l)=>{const p=v/l*100,r=l-v,cls=p>=100?'over':p>=80?'warn':'';
    return`<div class="cr" style="--c:${col}"><span class="cico sm">${ico}</span><div class="m"><div class="t"><span>${esc(name)}</span><span>${money(v)} / ${money(l)}</span></div><div class="pb"><i style="transform:translateX(${-(100-Math.min(100,p))}%)"></i></div><small><span class="${cls}">${Math.round(p)}%</span><span class="${cls}">${r>=0?'Sisa '+money(r):'Lewat '+money(-r)}</span></small></div></div>`};
  return`<div class="sec">Budget vs realisasi${P.live?`<small class="sub">Sisa ${left} hari</small>`:''}</div><div class="list">${tot?row(ic('target',18),'var(--p)','Total bulan ini',tot.v,tot.l):''}${items.map(x=>{const c=cat(x.k);return row(ic(c[1],18),c[2],c[0],x.v,x.l)}).join('')}</div>`;
}
function rasio(I,O,pI,pO,P){
  if(I<=0)return'';
  const r=Math.round((I-O)/I*100),pr=pI>0?Math.round((pI-pO)/pI*100):null,w=Math.max(0,Math.min(100,r));
  return`<div class="card rs"><div class="t"><small>Rasio tabungan</small><b class="${r<0?'out':'in'}">${r}%</b></div><div class="pb"><i style="transform:translateX(${-(100-w)}%)"></i></div><small class="cmpn" style="margin:6px 0 0">${r<0?'Pengeluaran lebih besar dari pemasukan.':'Dari pemasukan, '+r+'% belum terpakai.'}${pr!==null?' '+P.pl[0].toUpperCase()+P.pl.slice(1)+': '+pr+'%.':''}</small></div>`;
}
function naikList(by,pby,P){
  if(rep!='out')return'';
  const a=Object.keys(by).map(k=>({k,d:by[k]-(pby[k]||0),p:pby[k]||0,n:by[k]})).filter(x=>x.d>0).sort((a,b)=>b.d-a.d).slice(0,3);
  if(!a.length)return'';
  return`<div class="sec">Naik paling banyak</div><div class="list hl">${a.map(x=>{const c=cat(x.k);return`<div class="sr"><div class="sl"><b>${esc(c[0])}</b><small>${x.p?'▲ '+Math.round(x.d/x.p*100)+'% dari '+money(x.p):'Baru, '+P.pl+' 0'}</small></div><span class="bad">+${money(x.d)}</span></div>`}).join('')}</div>`;
}
function perDompet(P){
  if(S.wal.length<2||rwf)return'';
  const rows=S.wal.map(w=>{const a=P.cur.filter(t=>t.w==w.id);return{w,i:sum(a,'in'),o:sum(a,'out')}}).filter(x=>x.i||x.o);
  if(!rows.length)return'';
  return`<div class="sec">Per dompet</div><div class="list hl">${rows.map(x=>`<div class="sr"><div class="sl"><b><i class="wdt" style="--c:${x.w.c};display:inline-block;margin-right:8px"></i>${esc(x.w.n)}</b><small>Masuk ${money(x.i)}</small></div><span class="out">−${money(x.o)}</span></div>`).join('')}</div>`;
}
/* ===== Laporan Minggu (v28) ===== */
let WKF={};
const wkLab=(k,long)=>{const e=addD(k,6),live=k==wkS(Date.now());return long&&live?`${dFmt(k,{weekday:'long'})} ${+k.slice(8)} – ${dFmt(e,{weekday:'long'})} ${dFmt(e,{day:'numeric',month:'short'})}`:`${dFmt(k,{day:'numeric',month:'short'})} – ${dFmt(e,{day:'numeric',month:'short'})}`};
function wkDonut(L,tot){
  const n=L.length,big=L.slice(0,Math.ceil(n/2)),sm=L.slice(Math.ceil(n/2)),ord=[];
  for(let i=0;i<big.length;i++){ord.push(big[i]);if(sm[i])ord.push(sm[i])}
  const cx=170,cy=150,R=60,r=40,GAP=n>1?.04:0,P=(rad,a)=>[cx+rad*Math.cos(a),cy+rad*Math.sin(a)];
  const RA=R+8;
  const build=off=>{let a0=-Math.PI/2+off;const ps=ord.map((x,k)=>{const f=x.v/tot,a1=a0+f*2*Math.PI,s=a0+GAP/2,e=a1-GAP/2,m=(a0+a1)/2,[ax,ay]=P(RA,m),side=Math.cos(m)>=0?1:-1;let d;
    if(f>.999)d=`M${cx-R} ${cy}A${R} ${R} 0 1 1 ${cx+R} ${cy}A${R} ${R} 0 1 1 ${cx-R} ${cy}ZM${cx-r} ${cy}A${r} ${r} 0 1 0 ${cx+r} ${cy}A${r} ${r} 0 1 0 ${cx-r} ${cy}Z`;
    else{const [x1,y1]=P(R,s),[x2,y2]=P(R,e),[x3,y3]=P(r,e),[x4,y4]=P(r,s),lg=e-s>Math.PI?1:0;d=`M${x1} ${y1}A${R} ${R} 0 ${lg} 1 ${x2} ${y2}L${x3} ${y3}A${r} ${r} 0 ${lg} 0 ${x4} ${y4}Z`}
    const o={k,x,f,m,ax,ay,side,ny:cy+(RA+10)*Math.sin(m),d};a0=a1;return o});
    let bad=0;[-1,1].forEach(sd=>{const arr=ps.filter(p=>p.side==sd).sort((a,b)=>a.ny-b.ny);let mn=34;arr.forEach(o=>{o.ly=Math.max(o.ny,mn);mn=o.ly+38});const ov=arr.length?arr[arr.length-1].ly-286:0;if(ov>0){arr.forEach(o=>o.ly-=ov);for(let i=arr.length-2;i>=0;i--)arr[i].ly=Math.min(arr[i].ly,arr[i+1].ly-38)}
      arr.forEach(o=>{const ex=sd>0?240:100;for(let t=0;t<=1;t+=.05){const px=o.ax+(ex-o.ax)*t,py=o.ay+(o.ly-o.ay)*t;if(Math.hypot(px-cx,py-cy)<R+5)bad++}})});
    ps.bad=bad;return ps};
  let parts=null,bs=1e18;for(let o=0;o<Math.PI*2;o+=Math.PI/90){const ps=build(o),nr=ps.filter(p=>p.side>0).length,sc=Math.abs(nr-(ps.length-nr))*1000+ps.bad*100000+o;if(sc<bs){bs=sc;parts=ps}}
  const cut=s=>s.length>12?s.slice(0,11)+'…':s;
  const ly=parts.map(o=>o.ly),vy=Math.floor(Math.min(cy-R-10,...ly.map(y=>y-18))),vh=Math.ceil(Math.max(cy+R+10,...ly.map(y=>y+22)))-vy;
  let h=`<svg viewBox="0 ${vy} 340 ${vh}" id="wdn" role="group" aria-label="Pengeluaran per kategori, ketuk potongan untuk detail">`;
  parts.forEach(o=>{const ex=o.side>0?240:100,tx=o.side>0?248:92,an=o.side>0?'start':'end',x=o.x,dx=(6*Math.cos(o.m)).toFixed(1)+'px',dy=(6*Math.sin(o.m)).toFixed(1)+'px',pc=Math.round(o.f*100);
    h+=`<g class="sl" tabindex="0" role="button" data-a="wseg" data-nm="${esc(x.n)}" data-vl="${ktg(x.v)}" data-pc="${pc}%" aria-label="${esc(x.n)}, ${pc} persen, ${money(x.v)}" style="--i:${o.k};--dx:${dx};--dy:${dy}"><path d="${o.d}" fill="${x.c}" fill-rule="evenodd"/><g class="lb"><polyline points="${o.ax},${o.ay} ${ex},${o.ly} ${ex+(o.side>0?6:-6)},${o.ly}" fill="none" stroke="${x.c}" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/><circle cx="${o.ax}" cy="${o.ay}" r="2" fill="${x.c}"/><text x="${tx}" y="${o.ly-1}" text-anchor="${an}" class="nm">${esc(cut(x.n))}</text><text x="${tx}" y="${o.ly+13}" text-anchor="${an}">${pc}% · ${ktg(x.v)}</text></g></g>`});
  return h+`<g class="cc" id="wcc"><text x="170" y="140" text-anchor="middle" id="wc1" style="font-size:11px">Total keluar</text><text x="170" y="158" text-anchor="middle" id="wc2" style="font-size:16px;font-weight:800;fill:var(--tx)" data-t="${ktg(tot)}">${ktg(tot)}</text><text x="170" y="172" text-anchor="middle" id="wc3" style="font-size:11px" data-t="${n} kategori">${n} kategori</text></g></svg>`}
function repWeek(){
  const nowK=wkS(Date.now()),live=WK==nowK,td=ymd(Date.now()),K=t=>ymd(t.ts),pf=addD(WK,-7),dd=k=>new Date(+k.slice(0,4),+k.slice(5,7)-1,+k.slice(8));
  const el=live?Math.min(7,Math.round((dd(td)-dd(WK))/864e5)+1):7;
  const cur=S.tx.filter(t=>K(t)>=WK&&K(t)<=addD(WK,6)),prevF=S.tx.filter(t=>K(t)>=pf&&K(t)<=addD(pf,6)),prev=prevF.filter(t=>K(t)<=addD(pf,el-1));
  const I=sum(cur,'in'),O=sum(cur,'out'),pO=sum(prev,'out');
  const A=[],B=[];for(let i=0;i<7;i++){A.push(sum(cur.filter(t=>K(t)==addD(WK,i)),'out'));B.push(sum(prevF.filter(t=>K(t)==addD(pf,i)),'out'))}
  const nav=`<div class="wkn"><button class="nb" data-a="rpn" data-d="-1" aria-label="Minggu sebelumnya">${ic('cl',20,2.4)}</button><button class="nt" data-a="wkpick" aria-haspopup="dialog" aria-label="Pilih minggu, sekarang ${wkLab(WK)}">${wkLab(WK,1)}<i>${ic('cr',14,2.6)}</i></button><button class="nb nx" data-a="rpn" data-d="1" aria-label="Minggu berikutnya"${live?' disabled':''}>${ic('cr',20,2.4)}</button></div>`;
  const head=`<header class="hd"><h1>Laporan</h1></header><div class="seg rpt" role="tablist">${[['w','Minggu'],['m','Bulan'],['y','Tahun']].map(x=>`<button role="tab" aria-selected="${RP==x[0]}" class="${RP==x[0]?'on':''}" data-a="rptab" data-p="${x[0]}">${x[1]}</button>`).join('')}</div>${nav}`;
  if(!cur.length&&!prev.length)return head+`<div class="list" style="margin-top:14px">${empty('pie','Belum ada data','Catat transaksi untuk melihat laporan minggu ini.')}</div>`;
  const diff=O-pO,pc=pO?Math.round(Math.abs(diff)/pO*100):0;
  const cmp=!pO?`<div class="wkc0">Belum ada data minggu lalu untuk dibandingkan</div>`:`<div class="wkc1 ${diff>0?'bad':diff<0?'good':''}">${diff?(diff>0?'▲ ':'▼ ')+pc+'% '+(diff>0?'lebih boros':'lebih hemat'):'Sama'} dari minggu lalu (${money(pO)})</div>${live?`<div class="wkc0">Dibanding ${el} hari pertama minggu lalu</div>`:''}`;
  const hero=`<div class="card wkh"><small>Pengeluaran ${live?'minggu ini':wkLab(WK)}</small><div class="wkbig">${money(O)}</div>${cmp}${wkBud()?bbar('Budget mingguan '+money(wkBud()),O,wkBud(),live&&wkBud()>O?`<div class="wkbx">Sisa ${7-el+1} hari, jatah rata-rata ${money(Math.round((wkBud()-O)/(7-el+1)))} per hari</div>`:''):(live?bset('mingguan'):'')}<div class="wkt"><div><small>Masuk</small><b class="in">${money(I)}</b></div><div><small>Selisih</small><b>${I-O>0?'+':''}${money(I-O)}</b></div><div><small>Rata-rata keluar/hari</small><b>${money(Math.round(O/el))}</b></div></div></div>`;
  const sec=(k,icn,t,body)=>`<button class="wks" data-a="wfold" data-k="${k}" aria-expanded="${!WKF[k]}"><span>${ic(icn,18,2.2)}${t}</span><i>${ic('cr',16,2.6)}</i></button><div class="wkb${WKF[k]?' fold':''}">${body}</div>`;
  /* hari */
  const mx=Math.max(...A,...B,1)*1.18,yy=v=>150-v/mx*118,mxA=Math.max(...A),hot=mxA>0?A.indexOf(mxA):-1;
  let dsv='<svg class="wkcht" viewBox="0 0 340 172" role="img" aria-label="Pengeluaran per hari, minggu ini dibanding minggu lalu">';
  for(let i=0;i<7;i++){const bw=30,step=320/7,x=10+i*step+(step-bw)/2,fut=live&&i>=el,h=i==hot,lb=dFmt(addD(WK,i),{weekday:'short'});
    if(B[i]>0)dsv+=`<rect x="${x-3}" y="${yy(B[i])}" width="${bw+6}" height="${150-yy(B[i])}" rx="10" fill="none" stroke="var(--mu)" stroke-dasharray="3 3" opacity=".55"/>`;
    if(A[i]>0)dsv+=`<rect x="${x}" y="${yy(A[i])}" width="${bw}" height="${150-yy(A[i])}" rx="9" fill="${h?'var(--exp)':'var(--p)'}" opacity="${h?1:.7}"/>`;
    else if(!fut)dsv+=`<rect x="${x}" y="146" width="${bw}" height="4" rx="2" fill="var(--ln)"/>`;
    if(A[i]>0)dsv+=`<text x="${x+bw/2}" y="${yy(Math.max(A[i],B[i]))-6}" text-anchor="middle" ${h?'style="fill:var(--exp)"':''}>${ktg(A[i])}</text>`;
    dsv+=`<text x="${x+bw/2}" y="168" text-anchor="middle" ${h?'style="fill:var(--tx)"':''}>${esc(lb)}</text>`}
  dsv+='</svg>';
  let ins='';if(hot>=0){const dn=dFmt(addD(WK,hot),{weekday:'long'}),sh=Math.round(A[hot]/O*100);const sub=A.slice(0,el).map((v,i)=>[v,i]).filter(x=>x[0]<mxA);const lo=sub.length&&el>1?sub.sort((a,b)=>a[0]-b[0])[0]:null;
    ins=`<div class="wki">${ic('zap',16)}<span>${esc(dn)} paling boros (${money(A[hot])}, ${sh}% dari minggu ini).${lo?` ${esc(dFmt(addD(WK,lo[1]),{weekday:'long'}))} paling hemat.`:''}</span></div>`}
  const days=`<div class="card"><div class="wklg"><span><i style="background:var(--p)"></i>${live?'Minggu ini':'Minggu ini'}</span><span><i class="dsh"></i>Minggu lalu</span></div>${dsv}${ins}</div>`;
  /* kategori */
  const by={},pby={};cur.filter(t=>t.ty=='out'&&!t.adj).forEach(t=>by[t.c]=(by[t.c]||0)+t.a);prevF.filter(t=>t.ty=='out'&&!t.adj&&K(t)<=addD(pf,el-1)).forEach(t=>pby[t.c]=(pby[t.c]||0)+t.a);
  const ent=Object.entries(by).sort((a,b)=>b[1]-a[1]),tot=ent.reduce((s,e)=>s+e[1],0);
  let cats='';
  if(ent.length){
    const Lall=ent.map(([k,v])=>({n:cat(k)[0],v,c:cat(k)[2],k})),L=Lall.length>7?[...Lall.slice(0,6),{n:'Lainnya ('+(Lall.length-6)+')',v:Lall.slice(6).reduce((s,x)=>s+x.v,0),c:'#94A3B8'}]:Lall;
    const dl=(k,v)=>{const p=pby[k]||0;if(!p)return`<small class="wd nw">Baru</small>`;const d=Math.round((v-p)/p*100);return d?`<small class="wd ${d>0?'bad':'good'}">${d>0?'▲':'▼'} ${Math.min(Math.abs(d),999)}%</small>`:'<small class="wd">–</small>'};
    const all=Lall.map(x=>`<div class="wkr"><i style="background:${x.c}"></i><b>${esc(x.n)}</b><span>${money(x.v)}${dl(x.k,x.v)}</span><div class="bar"><u style="width:${x.v/Lall[0].v*100}%;background:${x.c}"></u></div></div>`).join('');
    cats=`<div class="card">${wkDonut(L,tot)}<button class="wkbtn" data-a="wall" aria-expanded="false">Lihat semua ${Lall.length} kategori</button><div class="wkall" id="wkall" hidden>${all}<p class="wkn0">▲ merah = naik, ▼ hijau = turun dibanding minggu lalu${live?' (periode hari yang sama)':''}.</p></div></div>`}
  else cats=`<div class="card">${empty('pie','Belum ada pengeluaran','Minggu ini belum ada transaksi keluar.')}</div>`;
  /* terbesar */
  const topT=cur.filter(t=>t.ty=='out'&&!t.adj).sort((a,b)=>b.a-a.a).slice(0,3);
  const big=topT.length?`<div class="list">${topT.map(t=>row(t,{date:1})).join('')}</div>`:`<div class="card">${empty('inbox','Belum ada pengeluaran','Transaksi keluar minggu ini muncul di sini.')}</div>`;
  return head+hero+sec('days','cal','Hari apa paling boros?',days)+sec('cat','pie','Uang paling banyak ke mana?',cats)+sec('top','coins','Transaksi apa yang paling besar?',big);
}
/* ===== Laporan Bulan & Tahun (v29) + budget di Laporan ===== */
const wsec=(k,icn,t,body)=>`<button class="wks" data-a="wfold" data-k="${k}" aria-expanded="${!WKF[k]}"><span>${ic(icn,18,2.2)}${t}</span><i>${ic('cr',16,2.6)}</i></button><div class="wkb${WKF[k]?' fold':''}">${body}</div>`;
const rpHead=nav=>`<header class="hd"><h1>Laporan</h1></header><div class="seg rpt" role="tablist">${[['w','Minggu'],['m','Bulan'],['y','Tahun']].map(x=>`<button role="tab" aria-selected="${RP==x[0]}" class="${RP==x[0]?'on':''}" data-a="rptab" data-p="${x[0]}">${x[1]}</button>`).join('')}</div>${nav}`;
const rpNav=(label,w,pick,canNext)=>`<div class="wkn"><button class="nb" data-a="rpn" data-d="-1" aria-label="${w} sebelumnya">${ic('cl',20,2.4)}</button><button class="nt" data-a="${pick}" aria-haspopup="dialog" aria-label="Pilih ${w.toLowerCase()}, sekarang ${esc(label)}">${esc(label)}<i>${ic('cr',14,2.6)}</i></button><button class="nb nx" data-a="rpn" data-d="1" aria-label="${w} berikutnya"${canNext?'':' disabled'}>${ic('cr',20,2.4)}</button></div>`;
const mname=m=>new Date(+m.slice(0,4),+m.slice(5)-1,1).toLocaleDateString(DL,{month:'long'});
const bbar=(lab,v,l,extra)=>{const p=v/l*100,c=p>=100?'var(--exp)':p>=80?'var(--amb)':'var(--p)';return`<div class="wkbd"><div class="wkbh"><b>${lab}</b><b style="color:${c}">${Math.round(p)}%</b></div><div class="wkbp"><i style="width:${Math.min(100,p)}%;background:${c}"></i></div><div class="wkbf"><span>Terpakai ${money(v)}</span><span>${v>l?'Lewat '+money(v-l):'Sisa '+money(l-v)}</span></div>${extra||''}</div>`};
const bset=t=>budOn()?`<button class="wkbs" data-a="budget">${ic('target',16)}Atur budget ${t}</button>`:'';
const hcmp=(d,good,bad,same,ref)=>!d?`<div class="wkc1">${same}</div>`:`<div class="wkc1 ${d>0?'good':'bad'}">${d>0?'▲':'▼'} ${money(Math.abs(d))} ${d>0?good:bad} ${ref}</div>`;
function catCard(by,pby,note){
  const ent=Object.entries(by).sort((a,b)=>b[1]-a[1]),tot=ent.reduce((s,e)=>s+e[1],0);
  if(!ent.length)return`<div class="card">${empty('pie','Belum ada pengeluaran','Belum ada transaksi keluar di periode ini.')}</div>`;
  const Lall=ent.map(([k,v])=>({n:cat(k)[0],v,c:cat(k)[2],k})),L=Lall.length>7?[...Lall.slice(0,6),{n:'Lainnya ('+(Lall.length-6)+')',v:Lall.slice(6).reduce((s,x)=>s+x.v,0),c:'#94A3B8'}]:Lall;
  const dl=(k,v)=>{const p=pby[k]||0;if(!p)return`<small class="wd nw">Baru</small>`;const d=Math.round((v-p)/p*100);return d?`<small class="wd ${d>0?'bad':'good'}">${d>0?'▲':'▼'} ${Math.min(Math.abs(d),999)}%</small>`:'<small class="wd">–</small>'};
  const all=Lall.map(x=>`<div class="wkr"><i style="background:${x.c}"></i><b>${esc(x.n)}</b><span>${money(x.v)}${dl(x.k,x.v)}</span><div class="bar"><u style="width:${x.v/Lall[0].v*100}%;background:${x.c}"></u></div></div>`).join('');
  return`<div class="card">${wkDonut(L,tot)}<button class="wkbtn" data-a="wall" aria-expanded="false">Lihat semua ${Lall.length} kategori</button><div class="wkall" id="wkall" hidden>${all}<p class="wkn0">▲ merah = naik, ▼ hijau = turun dibanding ${note}.</p></div></div>`}
function lineSvg(se,o){
  const n=o.n,vs=se.flatMap(x=>x.v.filter(v=>v!=null)).concat(o.ref?[o.ref[0]]:[]),mn=o.min??0,mx=Math.max(...vs,1)*1.08;
  const X=i=>14+i*(312)/Math.max(1,n-1),Y=v=>150-(v-mn)/((mx-mn)||1)*128;
  let s=`<svg class="wkcht" viewBox="0 0 340 176" role="img" aria-label="${esc(o.t)}">`;
  [.5,1].forEach(f=>{const y=Y(mn+(mx-mn)*f);s+=`<line x1="14" x2="326" y1="${y}" y2="${y}" stroke="var(--ln)"/><text x="14" y="${y-4}">${ktg(Math.abs(mn+(mx-mn)*f))}</text>`});
  s+=`<line x1="14" x2="326" y1="150" y2="150" stroke="var(--ln)"/>`;
  if(o.ref)s+=`<line x1="14" x2="326" y1="${Y(o.ref[0])}" y2="${Y(o.ref[0])}" stroke="var(--amb)" stroke-dasharray="5 4" stroke-width="1.5"/><text x="326" y="${Y(o.ref[0])+14}" text-anchor="end" style="fill:var(--amb)">${o.ref[1]}</text>`;
  se.forEach(x=>{const pts=x.v.map((v,i)=>v==null?null:[X(i),Y(v)]).filter(Boolean);if(!pts.length)return;const d='M'+pts.map(p=>p[0].toFixed(1)+' '+p[1].toFixed(1)).join('L');
    if(x.area&&pts.length>1)s+=`<path d="${d}L${pts[pts.length-1][0]} 150L${pts[0][0]} 150Z" fill="${x.c}" opacity=".14"/>`;
    s+=`<path d="${d}" fill="none" stroke="${x.c}" stroke-width="${x.w||2.5}" stroke-linecap="round" stroke-linejoin="round"${x.dash?' stroke-dasharray="4 4"':''}/>`;
    if(x.dot){const p=pts[pts.length-1];s+=`<circle cx="${p[0]}" cy="${p[1]}" r="4.5" fill="${x.c}" stroke="var(--sf)" stroke-width="2"/>`}});
  o.x.forEach(([i,l])=>s+=`<text x="${X(i)}" y="170" text-anchor="${i==0?'start':i==n-1?'end':'middle'}">${esc(l)}</text>`);
  return s+'</svg>'}
function repMonth(){
  const m=mon,live=m==curM(),td=ymd(Date.now()),pm=madd(m,-1),dim=x=>new Date(+x.slice(0,4),+x.slice(5),0).getDate(),dm=dim(m),pdm=dim(pm),el=live?+td.slice(8):dm,dN=t=>+ymd(t.ts).slice(8);
  const cur=inMonth(m),prevF=inMonth(pm),prev=prevF.filter(t=>dN(t)<=el);
  const head=rpHead(rpNav(mlabel(m),'Bulan','mpick',!live));
  if(!cur.length&&!prevF.length)return head+`<div class="list" style="margin-top:14px">${empty('pie','Belum ada data','Catat transaksi untuk melihat laporan bulan ini.')}${bset('bulanan')?'':''}</div>`;
  const I=sum(cur,'in'),O=sum(cur,'out'),pI=sum(prev,'in'),pO=sum(prev,'out'),net=I-O,pnet=pI-pO,B=BG(m).total;
  const D=Array(dm).fill(0),PD=Array(pdm).fill(0);
  cur.forEach(t=>{if(t.ty=='out'&&!t.adj)D[dN(t)-1]+=t.a});prevF.forEach(t=>{if(t.ty=='out'&&!t.adj)PD[dN(t)-1]+=t.a});
  const left=dm-el+1,bx=B&&live&&B>O?`<div class="wkbx">Sisa ${left} hari, jatah rata-rata ${money(Math.round((B-O)/left))} per hari</div>`:'';
  const budBlk=B?bbar('Budget bulanan '+money(B),O,B,bx):(live?bset('bulanan'):'');
  const cmp=!prev.length?`<div class="wkc0">Belum ada data ${esc(mname(pm))} untuk dibandingkan</div>`:hcmp(net-pnet,'lebih baik','lebih buruk','Sama','dari '+esc(mname(pm)))+(live?`<div class="wkc0">Dibanding tanggal 1–${el} ${esc(mname(pm))}</div>`:'');
  const hero=`<div class="card wkh"><small>Arus bersih · ${esc(mlabel(m))}</small><div class="wkbig">${net>0?'+':''}${money(net)}</div>${cmp}<div class="wktri"><div><small>Masuk</small><b class="in">${ktg(I)}</b></div><div><small>Keluar</small><b class="out">${ktg(O)}</b></div><div><small>Ditabung</small><b>${I>0?Math.round(net/I*100)+'%':'–'}</b></div></div>${budBlk}</div>`;
  /* laju */
  const cc=[],cp=[];let a=0,b=0;D.forEach((v,i)=>{if(i<el){a+=v;cc.push(a)}});PD.forEach(v=>{b+=v;cp.push(b)});
  const n=Math.max(dm,pdm),px=x=>x>=n?n-1:x;
  let ins='';const cpe=cp[Math.min(el,pdm)-1]||0;
  if(O>0||cpe>0){const d=cpe?Math.round(Math.abs(O/cpe-1)*100):0;
    ins=`Sampai tanggal ${el} kamu sudah keluar ${money(O)}${B?` (${Math.round(O/B*100)}% budget)`:''}${cpe?`, ${d?d+'% '+(O>cpe?'lebih banyak':'lebih sedikit')+' dari':'sama dengan'} ${esc(mname(pm))} di tanggal yang sama`:''}.`;
    if(live&&el>=3&&O>0){const pj=Math.round(O/el*dm);ins+=` Kalau polanya sama, akhir bulan sekitar ${money(pj)}${B&&pj>B?', melewati budget':''}.`}}
  const pace=`<div class="card"><div class="wklg"><span><i style="background:var(--p)"></i>${esc(mname(m))}</span><span><i style="background:var(--mu)"></i>${esc(mname(pm))}</span>${B?'<span><i style="background:var(--amb)"></i>Budget</span>':''}</div>${lineSvg([{v:pO>0||sum(prevF,'out')>0?cp:[],c:'var(--mu)',dash:1,w:2},{v:cc,c:'var(--p)',area:1,dot:1}],{n,min:0,ref:B?[B,'Budget '+ktg(B)]:null,t:'Pengeluaran kumulatif per tanggal',x:[[0,'1'],[Math.min(9,n-1),'10'],[Math.min(19,n-1),'20'],[n-1,String(n)]]})}${ins?`<div class="wki">${ic('zap',16)}<span>${ins}</span></div>`:''}</div>`;
  /* heatmap */
  const mxd=Math.max(...D,0),ti=mxd>0?D.indexOf(mxd):-1,off=(new Date(+m.slice(0,4),+m.slice(5)-1,1).getDay()+6)%7;
  const lvc=[0,14,30,50,72,92];let cells=['Sen','Sel','Rab','Kam','Jum','Sab','Min'].map(x=>`<span class="h">${x}</span>`).join('')+'<span></span>'.repeat(off);
  D.forEach((v,i)=>{const k=m+'-'+pad(i+1),fu=live&&i>=el,lv=v>0?Math.max(1,Math.ceil(v/mxd*5)):0;
    cells+=`<button data-a="hmday" data-k="${k}" class="${i==ti?'top':''}${fu?' fu':''}" aria-label="${i+1} ${esc(mname(m))}, ${v>0?money(v):'tidak ada pengeluaran'}" style="background:color-mix(in srgb,var(--p) ${lvc[lv]}%,var(--sf));${lv>=4?'color:var(--pc)':''}"><b>${i+1}</b><em>${v>0?ktg(v):''}</em></button>`});
  const st=mxd/5,z=D.slice(0,el).filter(v=>!v).length;
  const hmins=ti>=0?`Hari terboros tanggal ${ti+1} (${money(mxd)}). ${z?z+' dari '+el+' hari tanpa pengeluaran.':''}`:'';
  const cal=`<div class="card"><p class="wkn0" style="margin:0 0 4px">Ketuk tanggal untuk lihat rinciannya. Angka kecil = pengeluaran hari itu. Garis merah = hari paling boros.</p><div class="hm" data-av="${el?O/el:0}">${cells}</div><div id="hmdd"></div>${mxd>0?`<div class="hlg"><span>Hemat<br><small>&lt; ${ktg(st)}</small></span><div class="sw">${[1,2,3,4,5].map(l=>`<i style="background:color-mix(in srgb,var(--p) ${lvc[l]}%,var(--sf))"></i>`).join('')}</div><span style="text-align:right">Boros<br><small>&gt; ${ktg(st*4)}</small></span></div>`:''}${hmins?`<div class="wki">${ic('zap',16)}<span>${hmins}</span></div>`:''}</div>`;
  /* minggu dalam bulan */
  const ch=[[1,7],[8,14],[15,21],[22,28]];if(dm>28)ch.push([29,dm]);
  const W=ch.map(([x,y])=>D.slice(x-1,y).reduce((s,v)=>s+v,0)),wm=Math.max(...W,1),wi=W.indexOf(Math.max(...W));
  let ws='<svg class="wkcht" viewBox="0 0 340 150" role="img" aria-label="Pengeluaran per minggu dalam bulan">';
  W.forEach((v,i)=>{const bw=40,step=320/W.length,x=10+i*step+(step-bw)/2,hh=v/wm*92,hot=i==wi&&v>0,fu=live&&ch[i][0]>el;
    ws+=`<rect x="${x}" y="${(112-hh).toFixed(1)}" width="${bw}" height="${Math.max(hh,v>0?3:3).toFixed(1)}" rx="9" fill="${hot?'var(--exp)':'var(--p)'}" opacity="${hot?1:fu?.18:.6}"/>${v>0?`<text x="${x+bw/2}" y="${(106-hh).toFixed(1)}" text-anchor="middle"${hot?' style="fill:var(--exp)"':''}>${ktg(v)}</text>`:''}<text x="${x+bw/2}" y="134" text-anchor="middle">${ch[i][0]}–${ch[i][1]}</text>`});
  ws+='</svg>';
  const wins=O>0&&W[wi]>0?`<div class="wki">${ic('zap',16)}<span>Tanggal ${ch[wi][0]}–${ch[wi][1]} paling boros: ${money(W[wi])} (${Math.round(W[wi]/O*100)}% dari bulan ini).</span></div>`:'';
  const wk=`<div class="card">${ws}${wins}</div>`;
  /* kategori */
  const by={},pby={};cur.forEach(t=>{if(t.ty=='out'&&!t.adj)by[t.c]=(by[t.c]||0)+t.a});prev.forEach(t=>{if(t.ty=='out'&&!t.adj)pby[t.c]=(pby[t.c]||0)+t.a});
  return head+hero+wsec('mpace','up','Apakah pengeluaranku lebih cepat dari bulan lalu?',pace)+wsec('mcal','cal','Kapan uangku paling banyak keluar?',cal)+wsec('mwk','grid','Minggu mana yang paling boros?',wk)+wsec('mcat','pie','Uang paling banyak ke mana?',catCard(by,pby,'bulan lalu'+(live?' (periode tanggal yang sama)':'')));
}
const yrsList=()=>{const c=+curM().slice(0,4),f=S.tx.length?Math.min(...S.tx.map(t=>new Date(t.ts).getFullYear())):c,a=[];for(let y=c;y>=Math.min(f,c);y--)a.push(String(y));return a};
function repYear(){
  const Y=YR,nowM=curM(),live=Y==nowM.slice(0,4),td=ymd(Date.now()),py=String(+Y-1),lm=live?+nowM.slice(5):12,ys=yrsList();
  const cur=S.tx.filter(t=>ymd(t.ts).startsWith(Y)),prev=S.tx.filter(t=>ymd(t.ts).startsWith(py)&&(!live||ymd(t.ts).slice(5)<=td.slice(5)));
  const label=live?`Tahun ${Y} (Jan–${mshort(nowM)})`:`Tahun ${Y}`;
  const head=rpHead(rpNav(label,'Tahun','ypick',Y<ys[0]));
  if(!cur.length&&!prev.length)return head+`<div class="list" style="margin-top:14px">${empty('pie','Belum ada data','Catat transaksi untuk melihat laporan tahun ini.')}</div>`;
  const MI=Array(12).fill(0),MO=Array(12).fill(0),has=Array(12).fill(false);
  cur.forEach(t=>{const i=+ymd(t.ts).slice(5,7)-1;has[i]=true;if(!t.adj){if(t.ty=='in')MI[i]+=t.a;else if(t.ty=='out')MO[i]+=t.a}});
  const fm=Math.max(0,has.indexOf(true)),nm=Math.max(1,lm-fm),I=sum(cur,'in'),O=sum(cur,'out'),net=I-O,pnet=sum(prev,'in')-sum(prev,'out');
  let sur=0;for(let i=fm;i<lm;i++)if(MI[i]>MO[i])sur++;
  const cmp=!prev.length?`<div class="wkc0">Belum ada data ${py} untuk dibandingkan</div>`:hcmp(net-pnet,'lebih baik','lebih buruk','Sama',live?`dari periode sama ${py}`:`dari ${py}`);
  const hero=`<div class="card wkh"><small>Tabungan ${esc(label)}</small><div class="wkbig">${net>0?'+':''}${money(net)}</div>${cmp}<div class="wksc"><div><small>Rata-rata masuk / bulan</small><b class="in">${money(Math.round(I/nm))}</b></div><div><small>Rata-rata keluar / bulan</small><b class="out">${money(Math.round(O/nm))}</b></div><div><small>Rasio tabungan</small><b>${I>0?Math.round(net/I*100)+'%':'–'}</b></div><div><small>Bulan surplus</small><b>${sur} dari ${nm}</b></div></div></div>`;
  /* masuk vs keluar */
  const mx=Math.max(...MI,...MO,1)*1.12,yy=v=>150-v/mx*124,act=[];for(let i=fm;i<lm;i++)if(MO[i]>0)act.push(i);
  const hi=act.length?act.reduce((p,q)=>MO[q]>MO[p]?q:p):-1,lo=act.length?act.reduce((p,q)=>MO[q]<MO[p]?q:p):-1;
  let io='<svg class="wkcht" viewBox="0 0 340 176" role="img" aria-label="Pemasukan dan pengeluaran per bulan">';
  for(let i=0;i<12;i++){const bw=11,step=320/12,x=10+i*step+(step-bw*2-3)/2,fu=i>=lm,lb=new Date(2000,i,1).toLocaleDateString(DL,{month:'short'}).slice(0,1).toUpperCase();
    if(!fu){if(MI[i]>0)io+=`<rect x="${x}" y="${yy(MI[i]).toFixed(1)}" width="${bw}" height="${(150-yy(MI[i])).toFixed(1)}" rx="4" fill="var(--inc)" opacity=".85"/>`;
      if(MO[i]>0)io+=`<rect x="${x+bw+3}" y="${yy(MO[i]).toFixed(1)}" width="${bw}" height="${(150-yy(MO[i])).toFixed(1)}" rx="4" fill="var(--exp)" opacity="${i==hi?1:.55}"/>`;
      if(i==hi)io+=`<text x="${x+bw+3+bw/2}" y="${(yy(MO[i])-5).toFixed(1)}" text-anchor="middle" style="fill:var(--exp)">${ktg(MO[i])}</text>`}
    io+=`<text x="${10+i*step+step/2}" y="168" text-anchor="middle"${fu?' style="opacity:.4"':''}>${lb}</text>`}
  io+='</svg>';
  const iins=hi>=0?`<div class="wki">${ic('zap',16)}<span>Bulan paling boros ${esc(mname(Y+'-'+pad(hi+1)))} (${money(MO[hi])}).${act.length>1?` Paling hemat ${esc(mname(Y+'-'+pad(lo+1)))} (${money(MO[lo])}).`:''} ${sur==nm?'Pemasukan selalu lebih besar dari pengeluaran.':sur==0?'Pengeluaran lebih besar dari pemasukan di semua bulan.':'Pemasukan lebih besar di '+sur+' dari '+nm+' bulan.'}</span></div>`:'';
  const ioC=`<div class="card"><div class="wklg"><span><i style="background:var(--inc)"></i>Masuk</span><span><i style="background:var(--exp)"></i>Keluar</span></div>${io}${iins}</div>`;
  /* saldo */
  const init=S.wal.reduce((s,w)=>s+(+w.init||0),0),ends=[];
  let bal=init;const flow=S.tx.filter(t=>t.ty!='tf').sort((a,b)=>a.ts-b.ts);let idx=0;
  const upTo=k=>{while(idx<flow.length&&ymd(flow[idx].ts)<=k){bal+=flow[idx].ty=='in'?flow[idx].a:-flow[idx].a;idx++}return bal};
  const start=upTo(addD(Y+'-01-01',-1));const SV=[start];for(let i=1;i<=lm;i++)SV.push(upTo(i==12?Y+'-12-31':addD(Y+'-'+pad(i+1)+'-01',-1)));
  const sEnd=live?balance():SV[SV.length-1];if(live)SV[SV.length-1]=sEnd;
  const gp=start>0?Math.round((sEnd-start)/start*100):null;
  const xl=[[0,'Awal']];for(let i=3;i<=lm;i+=3)xl.push([i,mshort(Y+'-'+pad(i))]);if(lm%3&&lm>1)xl.push([lm,mshort(Y+'-'+pad(lm))]);
  const balC=`<div class="card">${lineSvg([{v:SV.map(v=>Math.round(v)),c:'var(--p)',area:1,dot:1}],{n:SV.length,min:Math.min(0,...SV),t:'Saldo di akhir tiap bulan',x:xl})}<div class="wki">${ic('zap',16)}<span>Saldo ${sEnd>=start?'naik':'turun'} dari ${money(Math.round(start))} menjadi ${money(Math.round(sEnd))}${gp!==null?` (${gp>0?'+':''}${gp}%)`:''}.</span></div></div>`;
  /* kategori */
  const by={},pby={};cur.forEach(t=>{if(t.ty=='out'&&!t.adj)by[t.c]=(by[t.c]||0)+t.a});prev.forEach(t=>{if(t.ty=='out'&&!t.adj)pby[t.c]=(pby[t.c]||0)+t.a});
  /* tren kategori */
  const e=live&&lm-1>fm?lm-2:lm-1;let trc='';
  if(e>fm){const top=Object.entries(by).sort((a,b)=>b[1]-a[1]).slice(0,3).map(x=>x[0]);
    const sp=(v,c)=>{const mxv=Math.max(...v),mnv=Math.min(...v),n=v.length,X=i=>2+i*80/(n-1),Yv=x=>24-(x-mnv)/(mxv-mnv||1)*22;return`<svg viewBox="0 0 84 26" aria-hidden="true"><path d="M${v.map((x,i)=>X(i).toFixed(1)+' '+Yv(x).toFixed(1)).join('L')}" fill="none" stroke="${c}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="${X(n-1)}" cy="${Yv(v[n-1])}" r="3" fill="${c}"/></svg>`};
    const rows=top.map(k=>{const v=[];for(let i=fm;i<=e;i++){let s2=0;cur.forEach(t=>{if(t.ty=='out'&&!t.adj&&t.c==k&&+ymd(t.ts).slice(5,7)-1==i)s2+=t.a});v.push(s2)}
      const f=v[0],l=v[v.length-1],d=f?Math.round((l-f)/f*100):null;
      return`<div class="spk"><b>${esc(cat(k)[0])}</b>${sp(v,cat(k)[2])}<span class="${d===null?'':d>0?'bad':'good'}">${d===null?'Baru':d?(d>0?'▲ ':'▼ ')+Math.min(Math.abs(d),999)+'%':'–'}</span></div>`}).join('');
    trc=`<div class="card">${rows}<p class="wkn0">Perbandingan ${esc(mname(Y+'-'+pad(fm+1)))} ke ${esc(mname(Y+'-'+pad(e+1)))}. ▲ merah = naik, ▼ hijau = turun.</p></div>`}
  /* kuartal */
  const qn=['Jan – Mar','Apr – Jun','Jul – Sep','Okt – Des'],qv=[0,1,2,3].map(q=>MO[q*3]+MO[q*3+1]+MO[q*3+2]);
  const qc=live?Math.floor((lm-1)/3):-1;
  const quar=`<div class="card"><p class="wkn0" style="margin:0 0 8px">Total pengeluaran per 3 bulan, dijumlahkan dari pengeluaran bulan-bulan di dalamnya.</p><div class="wksc">${qn.map((l,i)=>`<div style="${live&&i>qc?'opacity:.45':''}"><small>${l}${i==qc&&lm%3?'*':''}</small><b>${live&&i>qc?'–':money(qv[i])}</b></div>`).join('')}</div>${live&&lm%3?`<p class="wkn0">* baru berjalan, hanya ${lm%3==1?'1 bulan':'2 bulan'} terhitung.</p>`:''}</div>`;
  return head+hero+wsec('yio','up','Apakah pemasukan selalu lebih besar dari pengeluaran?',ioC)+wsec('ybal','coins','Bagaimana saldoku bertumbuh?',balC)+wsec('ycat','pie','Uang paling banyak ke mana?',catCard(by,pby,live?'periode sama tahun lalu':'tahun lalu'))+(trc?wsec('ytr','zap','Pengeluaran apa yang membesar?',trc):'')+wsec('yq','grid','Bagaimana tiap 3 bulan?',quar);
}
function repPage(){
  if(RP=='w')return repWeek();
  if(RP=='m')return repMonth();
  return repYear();
  const P=rdata(),mt=P.cur,I=sum(mt,'in'),O=sum(mt,'out'),pI=sum(P.prev,'in'),pO=sum(P.prev,'out'),by={},pby={};
  mt.filter(t=>t.ty==rep&&!t.adj).forEach(t=>by[t.c]=(by[t.c]||0)+t.a);
  P.prev.filter(t=>t.ty==rep&&!t.adj).forEach(t=>pby[t.c]=(pby[t.c]||0)+t.a);
  const dl=(c,p,ty)=>{if(!p)return c?`<em class="dlt nw">Baru, ${P.pl} 0</em>`:'';const d=Math.round((c-p)/p*100);if(!d)return`<em class="dlt">Sama dengan ${P.pl}</em>`;return`<em class="dlt ${(d>0)==(ty=='out')?'bad':'good'}">${d>0?'▲':'▼'} ${Math.abs(d)>999?'>999':Math.abs(d)}% vs ${P.pl}</em>`};
  const ent=Object.entries(by).sort((a,b)=>b[1]-a[1]),tot=ent.reduce((s,e)=>s+e[1],0),R=76,Cc=2*Math.PI*R,gap=ent.length>1?3:0;
  let cum=0;const segs=ent.map(([k,v])=>{const len=v/tot*Cc,s=`<circle class="sg" data-a="seg" data-k="${k}" cx="100" cy="100" r="${R}" stroke="${cat(k)[2]}" stroke-dasharray="${Math.max(0,len-gap)} ${Cc-Math.max(0,len-gap)}" stroke-dashoffset="${-cum}" transform="rotate(-90 100 100)"/>`;cum+=len;return s}).join('');
  const mx=Math.max(...P.tr.flatMap(x=>[x.i,x.o]),1),useBud=RP=='m'&&!rwf;
  const tl=P.live?P.title.toLowerCase():P.title,diff=O-pO,ver=!mt.length&&!P.prev.length?'':!pO?`<div class="vd"><span class="vk">Pengeluaran ${esc(tl)}</span><b class="vb">${money(O)}</b><small>Belum ada data ${P.pl} untuk dibandingkan</small></div>`
    :`<div class="vd ${diff>0?'bad':'good'}"><span class="vk">Pengeluaran ${esc(tl)}</span><b class="vb">${diff>0?'Lebih boros':diff<0?'Lebih hemat':'Sama'} ${diff?money(Math.abs(diff)):''}</b><small>${diff?(diff>0?'▲ ':'▼ ')+Math.abs(Math.round(diff/pO*100))+'% ':''}dibanding ${P.pl} (${money(pO)})</small></div>`;
  return`<header class="hd"><h1>Laporan</h1></header><div class="seg rpt" role="tablist">${[['w','Minggu'],['m','Bulan'],['y','Tahun']].map(x=>`<button role="tab" aria-selected="${RP==x[0]}" class="${RP==x[0]?'on':''}" data-a="rptab" data-p="${x[0]}">${x[1]}</button>`).join('')}</div>${P.nav}${wChips(rwf,'rwf')}${ver}
<div class="sum2"><div class="card"><small>Masuk</small><b class="in">${money(I)}</b>${dl(I,pI,'in')}</div><div class="card"><small>Keluar</small><b class="out">${money(O)}</b>${dl(O,pO,'out')}</div>
<div class="card"><small>Selisih</small><b>${I-O>0?'+':''}${money(I-O)}</b></div><div class="card"><small>Rata-rata keluar/hari</small><b>${money(Math.round(O/P.el))}</b></div>${P.pn?`<p class="cmpn">${P.pn}</p>`:''}${rwf?`<p class="cmpn">Hanya transaksi di ${esc(walOf(rwf).n)}. Pindah dana antar dompet tidak dihitung, dan budget berlaku untuk semua dompet.</p>`:''}</div>
${rasio(I,O,pI,pO,P)}${bvr(P,mt)}
<div class="card"><div class="seg" role="tablist"><button class="${rep=='out'?'on':''}" data-a="rep" data-r="out">Pengeluaran</button><button class="${rep=='in'?'on':''}" data-a="rep" data-r="in">Pemasukan</button></div>
<div class="donut"><svg viewBox="0 0 200 200" role="img" aria-label="Diagram ${rep=='out'?'pengeluaran':'pemasukan'} per kategori"><circle class="trk" cx="100" cy="100" r="${R}"/>${segs}</svg><div class="dc" id="dcc"><small>${rep=='out'?'Pengeluaran':'Pemasukan'}</small><b data-n="${tot}" data-k="dn">${money(tot)}</b></div></div></div>
${ent.length?`<div class="sec">Per kategori</div><div class="list">${ent.map(([k,v],i)=>{const c=cat(k),l=rep=='out'&&useBud?BG().cats[k]:0,p=l?v/l*100:0,dc=dl(v,pby[k]||0,rep);return`<div class="cr" style="--c:${c[2]}"><span class="cico sm">${ic(c[1],18)}</span><div class="m"><div class="t"><span>${c[0]}</span><span>${money(v)}</span></div><div class="pb"><i data-t="w" data-k="cp${i}" data-z="0" data-v="${v/tot*100}" style="transform:translateX(-100%)"></i></div><small><span>${Math.round(v/tot*100)}% dari total</span>${l?`<span class="${p>=100?'over':p>=80?'warn':''}">Budget ${Math.round(p)}%</span>`:''}</small>${dc}</div></div>`}).join('')}</div>`
  :`<div class="list" style="margin-top:14px">${empty('pie','Belum ada data','Catat transaksi untuk melihat laporan periode ini.')}</div>`}
${cmpLine(by,pby,rep,P)}${naikList(by,pby,P)}${perDompet(P)}${sorotan(P,O,mt)}
<div class="sec">${P.trT}</div><div class="card"><div class="tre${RP=='y'?' t12':''}">${P.tr.map((x,i)=>`<${x.m?'button data-a="monset" data-m="'+x.m+'"':'div'} class="${x.on?'on':''}" aria-label="${esc(x.m?mlabel(x.m):x.l)}"><div class="pr"><i data-t="h" data-k="ti${i}" data-z="0" data-v="${x.i/mx*100}" style="height:0"></i><i data-t="h" data-k="to${i}" data-z="0" data-v="${x.o/mx*100}" style="height:0"></i></div><em>${esc(x.l)}</em></${x.m?'button':'div'}>`).join('')}</div>
<div class="lg"><span><i style="background:var(--inc)"></i>Masuk</span><span><i style="background:var(--exp)"></i>Keluar</span></div></div>`;
}

const CURS=[['Rp','Rupiah (Rp)'],['','Tanpa mata uang']];
function mePage(){
  const d=isDark();
  return`<header class="hd"><h1>Profil</h1></header>
<div class="sec">Tampilan</div>
<div class="grp"><div class="pal2"><div class="pdots" role="group" aria-label="Palet warna">${Object.entries(PAL).map(([k,v])=>{const a=d?v[2]:v[1];return`<button class="${S.set.pal==k?'on':''}" data-a="pal" data-p="${k}" aria-label="${v[0]}" aria-pressed="${S.set.pal==k}" style="--k:#${a[0]}"><i>${ic('check',15,3.2)}</i></button>`}).join('')}</div><div class="pnm">${(PAL[S.set.pal]||PAL.tosca)[0]}</div></div>
<div style="padding:4px 10px 12px"><div class="seg">${[['auto','Otomatis',null],['light','Terang','sun'],['dark','Gelap','moon']].map(m=>`<button class="${S.set.mode==m[0]?'on':''}" data-a="mode" data-m="${m[0]}">${m[1]}</button>`).join('')}</div></div>
</div>
<div class="sec s2">Umum</div>
<div class="grp"><button class="set" data-a="wals"><span class="si">${ic('wallet',19)}</span><span class="st">Dompet<small>${S.wal.length} dompet · total ${money(balance())}</small></span>${ic('cr',18)}</button>
<button class="set" data-a="budget"><span class="si">${ic('target',19)}</span><span class="st">Budget bulanan<small>${!budOn()?'Nonaktif':(BG().total||wkBud())?[BG().total?money(BG().total)+'/bln':'',wkBud()?money(wkBud())+'/mgg':''].filter(Boolean).join(' · '):'Belum diatur'}</small></span>${ic('cr',18)}</button>
<button class="set" data-a="notif"><span class="si">${ic('bell',19)}</span><span class="st">Notifikasi<small>${notifSum()}</small></span>${ic('cr',18)}</button>
<button class="set" data-a="cats"><span class="si">${ic('tag',19)}</span><span class="st">Kategori<small>${OUT.length} keluar · ${INC.length} masuk</small></span>${ic('cr',18)}</button>
<button class="set" data-a="recs"><span class="si">${ic('repeat',19)}</span><span class="st">Transaksi berulang<small>${S.rec.length?S.rec.length+' aktif':'Belum ada'}</small></span>${ic('cr',18)}</button></div>
<div class="sec s2">Keamanan</div>
<div class="grp"><button class="set" data-a="sec"><span class="si">${ic('lock',19)}</span><span class="st">Kunci aplikasi<small>${S.set.pin?'PIN aktif'+(S.set.bio?' · biometrik':''):'Mati. Lindungi data dengan PIN'}</small></span>${ic('cr',18)}</button></div>
<div class="sec s2">Data</div>
<div class="grp"><button class="set" data-a="bkjson"><span class="si">${ic('dl',19)}</span><span class="st">Cadangkan data (JSON)<small class="${bkDue()?'warn':''}">${S.set.bk?'Terakhir '+fmtD(ymd(S.set.bk)):'Belum pernah. Berisi transaksi, kategori, budget'}</small></span></button>
${CANSHARE?`<button class="set" data-a="bkshare"><span class="si">${ic('ul',19)}</span><span class="st">Bagikan cadangan<small>Kirim file JSON ke WhatsApp, Files, atau email</small></span></button>`:''}
<button class="set" data-a="export"><span class="si">${ic('dl',19)}</span><span class="st">Ekspor CSV<small>Daftar transaksi untuk Excel</small></span></button>
<button class="set" data-a="import"><span class="si">${ic('ul',19)}</span><span class="st">Pulihkan atau impor<small>File cadangan JSON atau CSV</small></span></button>
<button class="set dng" data-a="reset"><span class="si">${ic('trash',19)}</span><span class="st">Hapus semua data<small>Tidak bisa dibatalkan</small></span></button></div>
<div class="tips"><div class="tp"><span class="si">${ic('phone',17)}</span><p><b>Tersimpan di perangkat ini</b>Tanpa login. Perangkat lain tidak ikut tersinkron.</p></div><div class="tp"><span class="si">${ic('dl',17)}</span><p><b>Cadangkan berkala</b>Jika data situs dihapus, catatan ikut hilang.</p></div><div class="tp"><span class="si">${ic('plus',17)}</span><p><b>Pasang di iPhone</b>Bagikan, lalu Tambah ke Layar Utama.</p></div></div><div class="brand"><img src="/logo.svg" width="46" height="46" alt=""><div><b>Jejak<span>Duit</span></b><small>Catat duit, tinggalkan jejak.</small></div></div>`;
}
const pages={home,tx:txPage,rep:repPage,me:mePage,wd:wdPage};


/* ---------- Kalender ---------- */
let txv='list';
function txPage(){const g=`<div class="seg vw" role="tablist">${[['list','Daftar','list'],['cal','Kalender','cal']].map(x=>`<button class="${txv==x[0]?'on':''}" data-a="txv" data-v="${x[0]}" role="tab" aria-selected="${txv==x[0]}">${x[1]}</button>`).join('')}</div>`;return(txv=='cal'?calPage():txList()).replace('</header>','</header>'+g)}

let cdsel=null;
const DOW=['Sen','Sel','Rab','Kam','Jum','Sab','Min'];
const kbox=(k,lab,v,z)=>`<div class="kb ${k}${z?' z':''}"><span class="kh">${lab}</span>${v}</div>`; // satu kartu ringkas; z = nilai nol (diredupkan)
const ktg=n=>n>=1e9?(+(n/1e9).toFixed(1)+'').replace('.',',')+'M':n>=1e6?(+(n/1e6).toFixed(1)+'').replace('.',',')+'jt':n>=1e3?Math.round(n/1e3)+'rb':String(Math.round(n));
const maxDay=by=>{let k=null,v=0;for(const x in by)if(by[x].o>v){v=by[x].o;k=x}return k};
function dayMap(){const by={};S.tx.forEach(t=>{if(!wvis(t))return;const k=ymd(t.ts);if(k.slice(0,7)!=mon)return;const b=by[k]||(by[k]={i:0,o:0,f:0,l:[]});if(!t.adj){if(t.ty=='in')b.i+=t.a;else if(t.ty=='out')b.o+=t.a;else if(t.ty=='tf')b.f+=t.a}b.l.push(t)});return by}
function cdHTML(k){
  if(!k)return`<div class="empty"><div class="ei">${ic('cal',26)}</div><b>Pilih tanggal</b>Ketuk tanggal untuk melihat rinciannya.</div>`;
  const by=dayMap(),b=by[k]||{i:0,o:0,f:0,l:[]},now=ymd(Date.now()),d=new Date(k+'T12:00'),net=b.i-b.o,oc={};
  b.l.filter(t=>t.ty=='out'&&!t.adj).forEach(t=>oc[t.c]=(oc[t.c]||0)+t.a);
  const bar=b.o?`<div class="kcbar">${Object.entries(oc).sort((x,y)=>y[1]-x[1]).map(([c,v])=>`<i style="flex:${v};background:${cat(c)[2]}" title="${esc(cat(c)[0])}"></i>`).join('')}</div>`:'';
  return`<div class="kcdh"><h3>${d.toLocaleDateString(DL,{weekday:'long',day:'numeric',month:'long'})}</h3><span class="${net<0?'out':'in'}" style="color:var(--${net<0?'exp':'inc'})">${b.l.length?(net>0?'+':'')+money(net):''}</span></div>
${k==maxDay(by)?'<p class="kcmxb">🔥 Pengeluaran terbesar bulan ini</p>':''}<div class="kst" style="margin:12px 0 0">${kbox('i','Masuk',`<b>${money(b.i)}</b>`,!b.i)}${kbox('o','Keluar',`<b>${money(b.o)}</b>`,!b.o)}${kbox('f','Pindah dana',`<b>${money(b.f)}</b>`,!b.f)}${kbox('n','Transaksi',`<b>${b.l.length}</b>`,!b.l.length)}</div>${bar}
${b.l.length?b.l.sort((x,y)=>y.ts-x.ts).map(t=>row(t)).join(''):`<p style="color:var(--mu);text-align:center;margin:18px 0 6px">Tidak ada transaksi di tanggal ini.</p>`}
${k<=now?`<button class="kcadd" data-a="cadd" data-d="${k}">${ic('plus',16,2.6)} Catat di tanggal ini</button>`:''}`;
}
function calPage(){
  const y=+mon.slice(0,4),m=+mon.slice(5)-1,dim=new Date(y,m+1,0).getDate(),off=(new Date(y,m,1).getDay()+6)%7,now=ymd(Date.now()),by=dayMap();
  let I=0,O=0,F=0,mx=0;Object.values(by).forEach(d=>{I+=d.i;O+=d.o;F+=d.f;mx=Math.max(mx,d.o)});const mk=maxDay(by);
  if(!cdsel||cdsel.slice(0,7)!=mon)cdsel=mon==curM()?now:(Object.keys(by).sort().pop()||null);
  let cells='';for(let i=0;i<off;i++)cells+='<span class="kcd e"></span>';
  for(let d=1;d<=dim;d++){const k=mon+'-'+pad(d),b=by[k],h=b&&b.o&&mx?Math.round((.03+.1*b.o/mx)*100):0;
    cells+=`<button class="kcd${k==now?' t':''}${k==cdsel?' on':''}${k==mk?' mxd':''}" style="--hp:${h}%" data-a="cday" data-d="${k}" ${k>now?'disabled':''} aria-label="${d} ${mlabel(mon)}${b?', keluar '+money(b.o)+', masuk '+money(b.i)+(b.f?', pindah dana '+money(b.f):''):''}${k==mk?', pengeluaran terbesar bulan ini':''}"><u>${b&&b.i?'<b class="i"></b>':''}${b&&b.f?'<b class="f"></b>':''}</u><i>${d}</i><em>${b&&b.o?ktg(b.o):''}</em></button>`}
  return`<header class="hd"><h1>Transaksi</h1></header>${monNav()}${wChips(wf,'wfil')}
<div class="kst">${kbox('i','Masuk',`<b data-k="cI" data-n="${I}"></b>`,!I)}${kbox('o','Keluar',`<b data-k="cO" data-n="${O}"></b>`,!O)}${kbox('f','Pindah dana',`<b data-k="cF" data-n="${F}"></b>`,!F)}${kbox(I-O>=0?'i':'o','Selisih',`<b data-k="cN" data-n="${I-O}"></b>`,!(I-O))}</div>
<div class="kcw">${DOW.map(x=>`<span>${x}</span>`).join('')}</div><div class="kcg">${cells}</div><div class="kcl"><span><i class="i"></i>Masuk</span><span><i class="f"></i>Pindah dana</span></div><div class="kcdp" id="cdp">${cdHTML(cdsel)}</div>`;
}
let FIRSTR=true;
function applyAnim(){document.documentElement.classList.add('lite')}
function render(anim){
  if(rwf&&!S.wal.some(w=>w.id==rwf))rwf=null;if(wf&&!S.wal.some(w=>w.id==wf))wf=null;
  if(tab=='wd'&&!S.wal.some(w=>w.id==WD)){setTab('home',false);return}
  OPEN=null;const a=anim&&FIRSTR;FIRSTR=false;const p=$('#page');p.className='pg'+(anim?' in':'')+(a?' gr':'');p.innerHTML=pages[tab](a);NEW=null;after(a);
}
function setv(el,v){const t=el.dataset.t;if(t=='p')el.style.setProperty('--bp',v+'%');else if(t=='h')el.style.height=v+'%';else if(t=='w')el.style.transform='translateX('+(v-100)+'%)';else el.style.strokeDashoffset=v}
const HIO=typeof IntersectionObserver!='undefined'?new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle('off',!e.isIntersecting))):null;
document.addEventListener('visibilitychange',()=>document.documentElement.classList.toggle('bgp',document.hidden));
function after(anim){
  if(HIO){HIO.disconnect();const h=$('#page .hero');if(h)HIO.observe(h)}
  const G=anim?{}:PV;
  $$('#page [data-n]').forEach(el=>{const k=el.dataset.k,to=+el.dataset.n;PV[k]=to;el.textContent=(el.dataset.f=='c'?compact:money)(to)});
  $$('#page [data-v]').forEach(el=>{
    const k=el.dataset.k,to=+el.dataset.v,from=G[k]!=null?G[k]:+el.dataset.z;PV[k]=to;
    if(REDUCE||el.dataset.t=='h'){setv(el,to);return}
    setv(el,from);requestAnimationFrame(()=>requestAnimationFrame(()=>setv(el,to)));
  });
}

/* ---------- Navigasi ---------- */
const TABS=[['home','Beranda','home'],['tx','Transaksi','list'],['rep','Laporan','pie'],['me','Profil','user']];
const tabBtn=t=>`<button data-a="tab" data-t="${t[0]}" aria-label="${t[1]}">${ic(t[2],22)}<span>${t[1]}</span></button>`;
$('#nav').innerHTML=TABS.slice(0,2).map(tabBtn).join('')+`<button class="fab" data-a="add" aria-label="Tambah transaksi">${ic('plus',27,2.6)}</button>`+TABS.slice(2).map(tabBtn).join('');
function setTab(t,anim=true){
  tab=t;const nt=t=='wd'?'home':t;$$('#nav button').forEach(b=>{const on=b.dataset.t==nt;b.classList.toggle('on',on);on?b.setAttribute('aria-current','page'):b.removeAttribute('aria-current')});
  if(anim)scrollTo({top:0});render(anim);
}

/* ---------- Toast ---------- */
let tt;
function toast(msg,o={}){
  const el=$('#toast');UNDO=o.undo||null;
  el.innerHTML=`<div class="tc" style="--c:${o.c||'var(--p)'}"><span class="tk">${ic('check',14,3)}</span><span class="tm2">${esc(msg)}</span>${o.undo?'<button data-a="undo">Urungkan</button>':''}${o.act?`<button data-a="${o.act}">${esc(o.al)}</button>`:''}</div>`;
  el.className='show';clearTimeout(tt);tt=setTimeout(()=>{el.className=''},o.ms||(o.undo?4500:2800));
}

/* ---------- Lembar ---------- */
function openSheet(html,fn){
  const r=$('#sheet'),was=r.classList.contains('open');r.innerHTML=`<div class="scrim" data-s="close"></div>${html}`;
  document.body.classList.add('lock');const sh=$('.sheet',r);
  if(was)sh.focus({preventScroll:true});
  else{r.className='';requestAnimationFrame(()=>requestAnimationFrame(()=>{r.classList.add('open');sh.focus({preventScroll:true})}))}
  fn&&fn(sh);
}
function closeSheet(){
  const r=$('#sheet');if(!r.firstChild)return;holdStop();r.classList.remove('open');E=null;document.body.classList.remove('lock');
  setTimeout(()=>{if(!r.classList.contains('open'))r.innerHTML=''},420);
}
const vib=()=>{try{navigator.vibrate&&navigator.vibrate(7)}catch(e){}};

/* --- Lembar tambah/ubah transaksi --- */
const PADK=['1','2','3','del','4','5','6','+','7','8','9','−','000','0','='];
const PADL={del:'Hapus angka (tahan untuk hapus cepat)','+':'Tambah','−':'Kurang','=':'Hitung','000':'Tiga nol'};
const MAXD=12;
const calc=(a,o,b)=>r2(o=='+'?a+b:a-b);
function curVal(){const b=parseFloat(E.buf)||0;if(E.op&&E.acc!=null)return E.buf?calc(E.acc,E.op,b):E.acc;return b}
const wopts=sel=>S.wal.map(w=>`<option value="${esc(w.id)}" ${w.id==sel?'selected':''}>${esc(w.i)} ${esc(w.n)}</option>`).join('');
function openTx(o={}){
  if(o.ty=='tf'&&S.wal.length<2){toast('Buat minimal 2 dompet dulu untuk pindah dana',{c:'var(--exp)'});return}
  const t=o.id?S.tx.find(x=>x.id==o.id):null,ty=t?t.ty:(o.ty||'out');
  const vw=id=>S.wal.some(x=>x.id==id)?id:null,ww=(t&&vw(t.w))||vw(o.w)||vw(wf)||vw(S.set.lw)||S.wal[0].id,w2=(t&&vw(t.w2))||(S.wal.find(x=>x.id!=ww)||{}).id||null;
  E={id:t&&t.id,ty,w:ww,w2,c:ty=='tf'?null:t?t.c:(o.c||(ty=='in'?INC[0]:OUT[0])),buf:t?String(t.a):(o.a?String(o.a):''),acc:null,op:null,ts:t?t.ts:(o.ts||Date.now()),n:t?t.n:(o.n||''),open:!!(t&&t.n),rep:false,rid:o.rid||null,rm:o.rm||null};
  openSheet(`<div class="sheet" role="dialog" aria-modal="true" aria-label="${t?'Ubah transaksi':'Tambah transaksi'}" tabindex="-1"><div class="tint"></div><div class="grab"></div>
<div class="sh-top"><div class="seg"><button data-s="ty" data-v="out">Keluar</button><button data-s="ty" data-v="in">Masuk</button><button data-s="ty" data-v="tf">Pindah dana</button></div><div class="sh-act">${t?`<button class="ib d" data-s="del" aria-label="Hapus transaksi">${ic('trash',18)}</button>`:''}<button class="ib" data-s="close" aria-label="Tutup">${ic('x',18)}</button></div></div>
<div class="cats" id="cats"></div>
<div class="amt"><div class="cpill" id="cpill"></div><div class="ex" id="ex" aria-live="polite"></div><div class="num" id="num"></div></div>
<div class="ch2"><label class="chip">${ic('cal',15)}<span id="dtx"></span><input type="date" id="dinp" aria-label="Tanggal" max="${ymd(Date.now())}" value="${ymd(E.ts)}"></label><label class="chip" id="wchip"><span id="wico"></span><span id="wtx"></span><select id="winp" aria-label="Dompet"></select></label>${t?'':`<button class="chip" data-s="rep" id="rbt" aria-label="Ulangi tiap bulan">${ic('repeat',15)}<span>Ulangi</span></button>`}</div>
<input class="nin" id="nin" placeholder="Tulis catatan (opsional)" maxlength="80" value="${esc(E.n)}" aria-label="Catatan">
<div class="pad">${PADK.map(k=>`<button class="${k=='del'?'dl':k=='='?'eq':k=='+'||k=='−'?'op':''}" data-s="k" data-k="${k}" aria-label="${PADL[k]||k}">${k=='del'?ic('back',24,2):k}</button>`).join('')}</div>
<div class="svrow">${t?'':'<button class="save2" id="save2" data-s="savemore">Simpan &amp; tambah lagi</button>'}<button class="save" id="save" data-s="save"></button></div></div>`,()=>{buildCats();updTx(true)});
}
function buildCats(){
  const el=$('#cats');
  if(E.ty=='tf'){
    el.className='cats tfm';
    el.innerHTML=`<div class="tfp"><label><small>Dari</small><select class="sel" id="tfa" aria-label="Dari dompet">${wopts(E.w)}</select></label><button class="tfw" data-s="tfswap" aria-label="Tukar arah">${ic('swap',18)}</button><label><small>Ke</small><select class="sel" id="tfb" aria-label="Ke dompet">${wopts(E.w2)}</select></label></div><p class="tfh" id="tfh"></p>${E.id?'':`<div class="fld"><label><span>Biaya admin<small style="display:block;font-weight:600;color:var(--mu)">Opsional, dicatat sebagai pengeluaran</small></span></label><input id="tfee" data-money inputmode="numeric" placeholder="0" aria-label="Biaya admin pindah dana"></div>`}`;
    return;
  }
  el.className='cats';
  const L=E.ty=='out'?OUT:INC;
  el.innerHTML=L.map(id=>`<button class="cb" style="--c:${cat(id)[2]}" data-s="cat" data-c="${id}" aria-label="${esc(cat(id)[0])}"><span class="cico">${ic(cat(id)[1],24)}</span><em>${esc(cat(id)[0])}</em></button>`).join('');
}
function updTx(init){
  const c=E.ty=='tf'?TFC:cat(E.c),sh=$('.sheet');if(!sh)return;
  sh.style.setProperty('--c',c[2]);sh.classList.toggle('tfs',E.ty=='tf');
  $$('[data-s=ty]',sh).forEach(b=>b.classList.toggle('on',b.dataset.v==E.ty));
  $$('.cb',sh).forEach(b=>{const on=b.dataset.c==E.c;if(on&&!b.classList.contains('on')&&!init)b.scrollIntoView({inline:'center',block:'nearest',behavior:REDUCE?'auto':'smooth'});b.classList.toggle('on',on)});
  if(init){const b=$('.cb.on',sh);if(b)setTimeout(()=>b.scrollIntoView({inline:'center',block:'nearest'}),30)}
  const cp=$('#cpill'),ck=E.ty=='tf'?'tf':E.c;cp.style.display=E.ty=='tf'?'none':'';if(cp.dataset.c!=ck){cp.dataset.c=ck;cp.innerHTML=`<span class="cc">${ic(c[1],14,2.4)}</span>${esc(c[0])}`}
  updAmt();
  $('#dtx').textContent=dlabel(E.ts,true);
  const wc=$('#wchip');if(wc){wc.hidden=E.ty=='tf';const w=walOf(E.w);$('#wico').innerHTML=ic(w.i,14);$('#wtx').textContent=w.n;$('#winp').innerHTML=wopts(E.w)}
  const rb=$('#rbt');if(rb){rb.hidden=E.ty=='tf';rb.classList.toggle('act',!!E.rep);$('span',rb).textContent=E.rep?'Tiap bulan':'Ulangi'}
  tfHint();
  $('#save').textContent=E.id?'Simpan perubahan':E.ty=='out'?'Simpan pengeluaran':E.ty=='in'?'Simpan pemasukan':'Simpan pindah dana';
}
function updAmt(){
  const b=E.buf,n=$('#num');let t='0',e=!b;
  if(b){const[i,d]=b.split('.');t=NF0.format(+i);if(b.includes('.'))t+=DEC+(d||'')}
  const len=t.length;n.className='num'+(e?' e':'')+(len>13?' xs':len>9?' sm':'');
  n.innerHTML=`<small>Rp</small><span>${t}</span>`;
  const x=$('#ex');if(x)x.textContent=E.op&&E.acc!=null?(E.acc<0?'−':'')+NF0.format(Math.abs(E.acc))+' '+E.op:'';
  const q=$('.pad .eq');if(q)q.disabled=!(E.op&&E.acc!=null&&b);
  const ok=curVal()>0&&(E.ty!='tf'||E.w!=E.w2),s=$('#save'),s2=$('#save2');if(s)s.disabled=!ok;if(s2)s2.disabled=!ok;tfHint();
}
function pulse(){const n=$('#num');if(n&&!REDUCE)n.animate([{transform:'scale(1.07)'},{transform:'scale(1)'}],{duration:170,easing:'ease-out'})}
function key(k,quiet){
  let b=E.buf;
  if(k=='del'){if(!b&&E.op){b=String(E.acc);E.acc=null;E.op=null}else b=b.slice(0,-1)}
  else if(k=='+'||k=='−'){
    if(b){E.acc=E.op&&E.acc!=null?calc(E.acc,E.op,parseFloat(b)):parseFloat(b);b=''}
    else if(E.acc==null)return;
    E.op=k;
  }
  else if(k=='='){if(!(E.op&&E.acc!=null&&b))return;const v=curVal();E.acc=null;E.op=null;b=v>0?String(v):''}
  else{
    const i=b.split('.')[0],dec=b.includes('.');
    if(k=='000'){if(!b||b=='0'||dec||i.length+3>MAXD)return;b+='000'}
    else if(dec){if((b.split('.')[1]||'').length<2)b+=k}
    else if(i.length<MAXD)b=(b=='0'?'':b)+k;
    else return;
  }
  E.buf=b;updAmt();if(!quiet){pulse();vib()}
}
/* Tahan tombol hapus: hapus berulang, makin lama makin cepat */
function holdStop(){clearTimeout(HT);clearTimeout(HI);HT=HI=null}
function holdStart(){
  holdStop();key('del');let n=0;
  const step=()=>{if(!E||(!E.buf&&!E.op)){holdStop();return}key('del',true);if(++n%4==0)vib();HI=setTimeout(step,n>14?32:n>6?55:90)};
  HT=setTimeout(step,360);
}
function setType(ty){
  if(E.ty==ty)return;
  if(ty=='tf'){if(S.wal.length<2){toast('Buat minimal 2 dompet dulu untuk pindah dana',{c:'var(--exp)'});return}if(!E.w2||E.w2==E.w)E.w2=S.wal.find(x=>x.id!=E.w).id;E.rep=false}
  E.ty=ty;E.c=ty=='in'?INC[0]:ty=='out'?OUT[0]:null;buildCats();updTx();
}
function saveTx(more){
  const a=r2(curVal());if(!(a>0))return;
  if(E.ty=='tf'){if(E.w==E.w2||!S.wal.some(x=>x.id==E.w2))return;E.rep=false}
  const before=snap(),m=ymd(E.ts).slice(0,7),sp0=(spentBy(m)[E.c]||0),isNew=!E.id,neg0=new Set(S.wal.filter(w=>wb(w.id)<0).map(w=>w.id));
  E.n=($('#nin').value||'').trim();const fee=E.ty=='tf'&&!E.id?parseNum(($('#tfee')||{}).value):0;
  const rc=E.ty=='tf'?{ty:'tf',a,n:E.n,ts:E.ts,w:E.w,w2:E.w2}:{ty:E.ty,c:E.c,a,n:E.n,ts:E.ts,w:E.w};
  if(E.id){const k=S.tx.findIndex(x=>x.id==E.id);if(k>=0)S.tx[k]={id:E.id,...rc,...(S.tx[k].r?{r:S.tx[k].r}:{})};NEW=E.id}
  else{const id=uid();S.tx.push({id,...rc,...(E.rid?{r:E.rid}:{})});NEW=id;if(E.rid){const rr=S.rec.find(x=>x.id==E.rid);if(rr)rr.h=[...(rr.h||[]),E.rm].slice(-36)}
    if(fee>0)S.tx.push({id:uid(),ty:'out',c:'lain',a:fee,n:'Biaya admin pindah dana',ts:E.ts,w:E.w});
    if(E.rep){const pm=madd(curM(),-1);S.rec.push({id:uid(),ty:E.ty,c:E.c,a,n:E.n,w:E.w,day:new Date(E.ts).getDate(),auto:false,h:[],last:m>pm?m:pm});genRec()}}
  if(E.ty!='tf')S.set.lw=E.w;
  if(!S.set.pst){S.set.pst=1;try{navigator.storage&&navigator.storage.persist&&navigator.storage.persist()}catch(e){}}
  sortTx();save();
  let msg=E.id?'Perubahan tersimpan':E.ty=='out'?'Pengeluaran tersimpan':E.ty=='in'?'Pemasukan tersimpan':'Pindah dana tersimpan',col=E.ty=='tf'?TFC[2]:cat(E.c)[2];
  if(isNew&&E.rep)msg+=' · diulang tiap bulan';
  if(fee>0)msg+=' · biaya admin '+money(fee);
  const nw=S.wal.find(w=>wb(w.id)<0&&!neg0.has(w.id));if(nw)msg+=` · Saldo ${nw.n} minus`;
  if(E.ty=='out'&&NT().bon&&budOn()){const l=BG(m).cats[E.c],sp1=spentBy(m)[E.c]||0;
    if(l&&sp1/l>=.8&&sp0/l<1){msg+=` · Budget ${cat(E.c)[0]} ${Math.round(sp1/l*100)}%`}
    const T=BG(m).total;if(T&&m==curM()){const o1=sum(inMonth(m),'out'),o0=o1-(isNew?a:0);if(o1/T>=.8&&o0/T<.8)msg+=` · Budget bulan ini ${Math.round(o1/T*100)}%`}}
  if(more&&isNew){
    render(false);toast(msg,{c:col,undo:before});
    E.buf='';E.acc=null;E.op=null;E.n='';E.rep=false;$('#nin').value='';{const fe=$('#tfee');if(fe)fe.value=''}updTx();return;
  }
  closeSheet();render(false);toast(msg,{c:col,undo:before});
}
function rmTx(id){
  const before=snap();S.tx=S.tx.filter(x=>x.id!=id);save();render(false);toast('Transaksi dihapus',{c:'var(--exp)',undo:before});
}
function delTx(){const id=E.id;closeSheet();rmTx(id)}

/* --- Transaksi berulang (bulanan) --- */
function genRec(){
  let n=0,ch=false;const cm=curM(),today=ymd(Date.now());
  S.rec.forEach(r=>{
    if(!r.auto)return;
    let m=madd(r.last,1),g=0;
    while(m<=cm&&g++<24){
      const y=+m.slice(0,4),mo=+m.slice(5)-1,d=Math.min(r.day,new Date(y,mo+1,0).getDate()),ts=new Date(y,mo,d,12,0,0).getTime();
      if(ymd(ts)>today)break;
      if(!S.tx.some(t=>t.r==r.id&&ymd(t.ts).startsWith(m))){S.tx.push({id:uid(),ty:r.ty,c:r.c,a:r.a,n:r.n,ts,w:walOf(r.w).id,r:r.id});n++}
      r.last=m;ch=true;m=madd(m,1);
    }
  });
  if(n)sortTx();if(ch)save();return n;
}
const recTs=(r,m)=>{const y=+m.slice(0,4),mo=+m.slice(5)-1;return new Date(y,mo,Math.min(r.day,new Date(y,mo+1,0).getDate()),12,0,0).getTime()};
function dueRecs(){
  const cm=curM(),today=ymd(Date.now()),out=[];
  S.rec.forEach(r=>{if(r.auto)return;let m=madd(r.last,1),g=0;
    while(m<=cm&&g++<24){const ts=recTs(r,m);if(ymd(ts)>today)break;
      if(!(r.h||[]).includes(m)&&!S.tx.some(t=>t.r==r.id&&ymd(t.ts).startsWith(m)))out.push({r,m,ts});m=madd(m,1)}});
  return out.sort((a,b)=>a.ts-b.ts);
}
function recApply(r,m,ok){r.h=[...(r.h||[]),m].slice(-36);if(ok)S.tx.push({id:uid(),ty:r.ty,c:r.c,a:r.a,n:r.n,ts:recTs(r,m),w:walOf(r.w).id,r:r.id})}
function recAct(id,m,mode){const r=S.rec.find(x=>x.id==id);if(!r)return;const before=snap();recApply(r,m,mode=='ok');if(mode=='ok')sortTx();save();render(false);toast(mode=='ok'?'Transaksi tercatat':'Dilewati untuk bulan ini',mode=='ok'?{c:'var(--inc)',undo:before}:{undo:before})}
function dueCard(){
  const L=dueRecs();if(!L.length)return'';const today=ymd(Date.now());
  return`<section class="due"><h3 class="sec">Jatuh tempo<span class="cnt">${L.length}</span>${L.length>3?'<button class="more" data-a="recs">Lihat semua</button>':''}</h3><div class="card dl">${L.slice(0,3).map(x=>{const r=x.r,c=cat(r.c),dd=Math.round((new Date(today+'T12:00')-new Date(ymd(x.ts)+'T12:00'))/864e5);
    return`<div class="dr" style="--c:${c[2]}"><span class="cico sm">${ic(c[1],18)}</span><div class="dm"><b>${esc(r.n)||esc(c[0])}</b><small class="${dd>0?'late':''}">${dd<=0?'Hari ini':'Terlewat '+dd+' hari'}</small></div><b class="da ${r.ty}">${r.ty=='in'?'+':''}${money(r.a)}</b><div class="db"><button class="dk" data-a="recok" data-id="${esc(r.id)}" data-m="${x.m}">Catat</button><button class="dx" data-a="recedit" data-id="${esc(r.id)}" data-m="${x.m}" aria-label="Ubah dulu sebelum dicatat" title="Ubah dulu">${ic('pen',16)}</button><button class="dx" data-a="recskip" data-id="${esc(r.id)}" data-m="${x.m}" aria-label="Lewati bulan ini" title="Lewati">${ic('x',16)}</button></div></div>`}).join('')}</div></section>`;
}
function recNext(r){const cm=curM();let m=ymd(recTs(r,cm))<=ymd(Date.now())?madd(cm,1):cm;const d=new Date(recTs(r,m));return d.getDate()+' '+d.toLocaleDateString(DL,{month:'short'})}
function openRecs(){
  const dr=dueRecs(),cnt={};dr.forEach(x=>cnt[x.r.id]=(cnt[x.r.id]||0)+1);
  openSheet(`<div class="sheet" role="dialog" aria-modal="true" aria-label="Transaksi berulang" tabindex="-1" style="--c:var(--p)"><div class="tint"></div><div class="grab"></div>
<div class="sh-top"><div class="sh-t">Transaksi berulang</div><div class="sh-act"><button class="ib" data-s="close" aria-label="Tutup">${ic('x',18)}</button></div></div>
<p class="mut" style="margin:6px 0 10px;font-size:13px;font-weight:600">Saat jatuh tempo kamu diminta konfirmasi dulu: Catat, Ubah, atau Lewati. Nyalakan Catat otomatis di item tertentu kalau mau langsung tercatat. Tanggal 29 sampai 31 jatuh di hari terakhir bila bulannya lebih pendek.</p>
${dr.length>1?`<button class="btn2 rall" data-s="recall">Catat semua yang jatuh tempo (${dr.length})</button>`:''}
<div class="bsc">${S.rec.length?`<div class="rcl">${S.rec.map(r=>{const c=cat(r.c),n=cnt[r.id]||0,st=n?`<em class="rst w">Menunggu konfirmasi${n>1?' · '+n+' bulan':''}</em>`:r.auto?'<em class="rst a">Otomatis</em>':`<em class="rst">Berikutnya ${recNext(r)}</em>`;
    return`<button class="rcr" data-s="redit" data-id="${esc(r.id)}" style="--c:${c[2]}"><span class="cico sm">${ic(c[1],18)}</span><span class="tm"><b>${esc(r.n)||esc(c[0])}</b><small>Tiap tanggal ${r.day} · ${r.ty=='in'?'Masuk':'Keluar'}${S.wal.length>1?' · '+esc(walOf(r.w).n):''}</small>${st}</span><b class="am ${r.ty}">${r.ty=='in'?'+':''}${money(r.a)}</b></button>`}).join('')}</div>`:empty('repeat','Belum ada','Contoh: tagihan listrik, langganan, atau gaji bulanan.')}</div>
<button class="save" data-s="radd" style="background-color:var(--p);color:var(--pc)">Tambah transaksi berulang</button></div>`);
}
function recOpts(ty,sel){return(ty=='in'?INC:OUT).map(k=>`<option value="${k}" ${k==sel?'selected':''}>${esc(cat(k)[0])}</option>`).join('')}
function openRecForm(id){
  const x=id?S.rec.find(r=>r.id==id):null;RE={id:x&&x.id,ty:x?x.ty:'out',auto:!!(x&&x.auto)};
  openSheet(`<div class="sheet" role="dialog" aria-modal="true" aria-label="${x?'Ubah':'Tambah'} transaksi berulang" tabindex="-1" style="--c:var(--p)"><div class="tint"></div><div class="grab"></div>
<div class="sh-top"><div class="sh-act"><button class="ib" data-s="rback" aria-label="Kembali">${ic('cl',18)}</button></div><div class="sh-t" style="flex:1">${x?'Ubah transaksi berulang':'Transaksi berulang baru'}</div><div class="sh-act"><button class="ib" data-s="close" aria-label="Tutup">${ic('x',18)}</button></div></div>
${x?'':`<div class="seg" style="margin:12px 0 4px">${[['out','Keluar'],['in','Masuk']].map(t=>`<button class="${RE.ty==t[0]?'on':''}" data-s="rty" data-v="${t[0]}">${t[1]}</button>`).join('')}</div>`}
<div class="fld"><label>Kategori</label><select class="sel" id="rc" aria-label="Kategori">${recOpts(RE.ty,x&&x.c)}</select></div>
<div class="fld"><label>Dompet</label><select class="sel" id="rw" aria-label="Dompet">${wopts(x&&x.w)}</select></div>
<div class="fld"><label>Jumlah</label><input id="ra" data-money inputmode="numeric" placeholder="0" value="${x?num(x.a):''}" aria-label="Jumlah"></div>
<div class="fld"><label>Tanggal tiap bulan</label><input id="rd" type="number" inputmode="numeric" min="1" max="31" value="${x?x.day:new Date().getDate()}" aria-label="Tanggal tiap bulan"></div>
<div class="fld"><label>Catatan</label><input id="rn" maxlength="80" placeholder="Opsional" value="${esc(x?x.n:'')}" aria-label="Catatan"></div>
${x?'':'<p class="hint">Jika tanggal bulan ini sudah lewat, pengingat pertama muncul bulan depan.</p>'}
<button class="set" data-s="rauto" style="margin-top:6px"><span class="si">${ic('repeat',19)}</span><span class="st">Catat otomatis<small>Mati: kamu diminta konfirmasi dulu saat jatuh tempo</small></span><span class="tg${RE.auto?' on':''}" id="rautotg"><i></i></span></button>
<button class="save" data-s="rcsave" style="background-color:var(--p);color:var(--pc)">Simpan</button>
${x?`<button class="btn2 dl2" data-s="rdel2">Hentikan transaksi berulang</button><p class="hint">Transaksi yang sudah tercatat tidak ikut terhapus.</p>`:''}</div>`);
}
function saveRec(){
  const a=parseNum($('#ra').value),d=parseInt($('#rd').value),c=$('#rc').value,w=$('#rw').value,n=($('#rn').value||'').trim().slice(0,80);
  if(!(a>0)){toast('Isi jumlah dulu',{c:'var(--exp)'});return}
  if(!(d>=1&&d<=31)){toast('Tanggal harus 1 sampai 31',{c:'var(--exp)'});return}
  if(RE.id){const r=S.rec.find(x=>x.id==RE.id);if(r)Object.assign(r,{c,a,n,w,day:d,auto:RE.auto})}
  else S.rec.push({id:uid(),ty:RE.ty,c,a,n,w,day:d,auto:RE.auto,h:[],last:new Date().getDate()>=d?curM():madd(curM(),-1)});
  save();render(false);openRecs();toast('Transaksi berulang disimpan');
}
function delRec(){
  const b=snap();S.rec=S.rec.filter(r=>r.id!=RE.id);save();render(false);openRecs();toast('Transaksi berulang dihentikan',{c:'var(--exp)',undo:b});
}


/* --- Dompet --- */
const WEMO=['💵','💳','🏦','📱','👛','🪙','💼','🐷','🏧','💰','🧧','🎒'];
function openWals(){
  const tot=balance();
  openSheet(`<div class="sheet" role="dialog" aria-modal="true" aria-label="Dompet" tabindex="-1" style="--c:var(--p)"><div class="tint"></div><div class="grab"></div>
<div class="sh-top"><div class="sh-t">Dompet</div><div class="sh-act"><button class="ib" data-s="close" aria-label="Tutup">${ic('x',18)}</button></div></div>
<div class="wtot"><small>Total semua dompet</small><b>${money(tot)}</b></div>
<div class="bsc"><div class="list">${S.wal.map(w=>{const n=wUse(w.id);return`<button class="tr" data-s="wedit" data-id="${esc(w.id)}" style="--c:${w.c}"><span class="cico sm">${ic(w.i,20)}</span><span class="tm"><b>${esc(w.n)}</b><small>${n?NF0.format(n)+' transaksi':'Belum dipakai'}</small></span><b class="am">${money(wb(w.id))}</b></button>`}).join('')}</div></div>
<div class="row2"><button class="btn2" data-s="wtf" ${S.wal.length<2?'disabled':''}>${ic('swap',16)} Pindah dana</button><button class="btn2 pb2" data-s="wnew">${ic('plus',16,2.6)} Dompet baru</button></div>
${S.wal.length<2?'<p class="hint">Tambah dompet kedua (misalnya rekening bank atau e-wallet) untuk memakai pindah dana.</p>':''}</div>`);
}
function openWalForm(id,from){
  const x=id?S.wal.find(w=>w.id==id):null,u=x?wUse(x.id):0;
  WE={id:x&&x.id,from,i:x?x.i:'💳',c:x?x.c:CCOL[5]};
  const can=x&&S.wal.length>1;
  openSheet(`<div class="sheet" role="dialog" aria-modal="true" aria-label="${x?'Ubah':'Tambah'} dompet" tabindex="-1" style="--c:${WE.c}"><div class="tint"></div><div class="grab"></div>
<div class="sh-top"><div class="sh-act"><button class="ib" data-s="wback" aria-label="Kembali">${ic('cl',18)}</button></div><div class="sh-t" style="flex:1">${x?'Ubah dompet':'Dompet baru'}</div><div class="sh-act"><button class="ib" data-s="close" aria-label="Tutup">${ic('x',18)}</button></div></div>
<div class="cprev"><span class="cico" id="wpv">${ic(WE.i,26)}</span></div>
<input class="nin" id="wn" maxlength="20" placeholder="Nama dompet, mis. BCA atau GoPay" value="${esc(x?x.n:'')}" aria-label="Nama dompet">
<div class="lbl">Ikon</div><div class="eg wig">${WEMO.map(e=>`<button class="${e==WE.i?'on':''}" data-s="wic" data-i="${e}" aria-label="Ikon ${e}">${e}</button>`).join('')}</div>
<div class="lbl">Warna</div><div class="wcg">${CCOL.map(c=>`<button class="${c==WE.c?'on':''}" style="--k:${c}" data-s="wcl" data-c="${c}" aria-label="Warna ${c}"></button>`).join('')}</div>
<div class="fld"><label>Saldo awal<small style="display:block;font-weight:600;color:var(--mu)">Uang yang sudah ada sebelum mulai mencatat</small></label><input id="wi" data-money="neg" inputmode="decimal" placeholder="0" value="${x&&x.init?num(x.init):''}" aria-label="Saldo awal"></div>
<button class="save" data-s="wsave" style="background-color:var(--c);color:#fff">Simpan</button>
${x?`<button class="btn2 dl2" data-s="wdel" ${can?'':'disabled'}>Hapus dompet</button><p class="hint">${S.wal.length<2?'Dompet terakhir tidak bisa dihapus.':u?`Dipakai ${NF0.format(u)} transaksi. Saat dihapus, transaksinya dipindahkan ke dompet lain yang kamu pilih.`:'Belum dipakai, jadi boleh dihapus.'}</p>`:''}</div>`);
}
function saveWal(){
  const n=($('#wn').value||'').trim().replace(/\s+/g,' ');
  if(!n){toast('Nama dompet wajib diisi',{c:'var(--exp)'});return}
  if(S.wal.some(w=>w.id!=WE.id&&w.n.toLowerCase()==n.toLowerCase())){toast('Nama itu sudah dipakai',{c:'var(--exp)'});return}
  const raw=$('#wi').value||'',init=(/^\s*[-−]/.test(raw)?-1:1)*parseNum(raw);
  if(WE.id)Object.assign(S.wal.find(w=>w.id==WE.id),{n,i:WE.i,c:WE.c,init});
  else S.wal.push({id:'w'+uid(),n,i:WE.i,c:WE.c,init});
  save();render(false);if(WE.from=='wd')closeSheet();else openWals();toast('Dompet tersimpan');
}
function delWal(){
  const x=S.wal.find(w=>w.id==WE.id);if(!x||S.wal.length<2)return;if(wUse(x.id)){openWalMove(x.id);return}
  const b=snapAll();S.wal=S.wal.filter(w=>w.id!=x.id);if(wf==x.id)wf=null;if(S.set.lw==x.id)S.set.lw=null;
  save();if(WE.from=='wd')closeSheet();render(false);if(WE.from!='wd')openWals();toast('Dompet dihapus',{c:'var(--exp)',undo:b});
}

/* --- Sesuaikan saldo --- */
function openAdj(id){
  const w=walOf(id),b=wb(w.id);AJ={id:w.id};
  openSheet(`<div class="sheet" role="dialog" aria-modal="true" aria-label="Sesuaikan saldo" tabindex="-1" style="--c:${w.c}"><div class="tint"></div><div class="grab"></div>
<div class="sh-top"><div class="sh-t">Sesuaikan saldo</div><div class="sh-act"><button class="ib" data-s="close" aria-label="Tutup">${ic('x',18)}</button></div></div>
<p class="mut" style="margin:8px 0 4px;font-size:13px;font-weight:600">Ketik saldo asli ${esc(w.n)} di rekening atau dompetmu. JejakDuit mencatat selisihnya sebagai penyesuaian, yang tidak dihitung sebagai pemasukan atau pengeluaran.</p>
<div class="wtot"><small>Saldo di JejakDuit</small><b>${money(b)}</b></div>
<div class="fld"><label>Saldo sebenarnya</label><input id="aj" data-money="neg" inputmode="decimal" placeholder="${esc(num(b))}" aria-label="Saldo sebenarnya"></div>
<p class="hint" id="ajh" aria-live="polite">Isi saldo yang kamu lihat di aplikasi bank atau dompetmu.</p>
<button class="save" id="ajs" data-s="ajsave" disabled style="background-color:var(--c);color:#fff">Simpan penyesuaian</button></div>`);
}
const ajVal=()=>{const r=$('#aj')?$('#aj').value:'';return/\d/.test(r)?(/^\s*[-−]/.test(r)?-1:1)*parseNum(r):null};
function ajUpd(){
  const t=ajVal(),h=$('#ajh'),b=$('#ajs');if(!h||!b||!AJ)return;
  if(t==null){h.textContent='Isi saldo yang kamu lihat di aplikasi bank atau dompetmu.';b.disabled=true;return}
  const d=r2(t-wb(AJ.id));
  if(!d){h.textContent='Sudah sama dengan saldo di JejakDuit.';b.disabled=true;return}
  h.textContent=`Selisih ${d>0?'+':'−'}${money(Math.abs(d))}. Dicatat sebagai penyesuaian ${d>0?'masuk':'keluar'}.`;b.disabled=false;
}
function saveAdj(){
  const t=ajVal();if(t==null||!AJ)return;
  const w=walOf(AJ.id),d=r2(t-wb(w.id));if(!d)return;
  const before=snap();
  S.tx.push({id:uid(),ty:d>0?'in':'out',c:d>0?'lainin':'lain',a:Math.abs(d),n:'Penyesuaian saldo',ts:Date.now(),w:w.id,adj:1});
  sortTx();save();closeSheet();render(false);toast(`Saldo ${w.n} disesuaikan`,{c:w.c,undo:before});
}
/* --- Hapus dompet yang sudah dipakai: pindahkan transaksinya dulu --- */
function openWalMove(id){
  const x=walOf(id),n=wUse(id),o=S.wal.filter(w=>w.id!=id);WM={id};
  openSheet(`<div class="sheet" role="dialog" aria-modal="true" aria-label="Hapus dompet" tabindex="-1" style="--c:var(--exp)"><div class="tint"></div><div class="grab"></div>
<div class="sh-top"><div class="sh-act"><button class="ib" data-s="wmback" aria-label="Kembali">${ic('cl',18)}</button></div><div class="sh-t" style="flex:1">Hapus ${esc(x.n)}</div><div class="sh-act"><button class="ib" data-s="close" aria-label="Tutup">${ic('x',18)}</button></div></div>
<p class="mut" style="margin:10px 0 6px;font-size:13px;font-weight:600">${NF0.format(n)} data di dompet ini perlu dipindahkan dulu. Saldo awalnya ikut digabung, jadi total saldo tidak berubah.</p>
<div class="fld"><label>Pindahkan ke</label><select class="sel" id="wmt" aria-label="Dompet tujuan">${o.map(w=>`<option value="${esc(w.id)}">${esc(w.i)} ${esc(w.n)}</option>`).join('')}</select></div>
<p class="hint">Pindah dana antara kedua dompet ini ikut dihapus karena tidak berarti lagi. Bisa dibatalkan lewat Urungkan.</p>
<button class="btn2 r" style="width:100%;margin-top:14px" data-s="wmok">Pindahkan lalu hapus</button></div>`);
}
function moveWal(){
  const from=WM&&WM.id,to=$('#wmt')&&$('#wmt').value,x=S.wal.find(w=>w.id==from),y=S.wal.find(w=>w.id==to);
  if(!x||!y||from==to)return;
  const b=snapAll(),n=wUse(from);
  y.init=r2(y.init+x.init);
  S.tx=S.tx.filter(t=>!(t.ty=='tf'&&((t.w==from&&t.w2==to)||(t.w==to&&t.w2==from))));
  S.tx.forEach(t=>{if(t.w==from)t.w=to;if(t.w2==from)t.w2=to});
  S.rec.forEach(r=>{if(r.w==from)r.w=to});
  S.wal=S.wal.filter(w=>w.id!=from);
  if(wf==from)wf=to;if(rwf==from)rwf=to;if(WD==from)WD=to;if(S.set.lw==from)S.set.lw=to;
  sortTx();save();closeSheet();render(false);
  toast(`${NF0.format(n)} data dipindahkan ke ${y.n}, ${x.n} dihapus`,{c:'var(--exp)',undo:b});
}
function tfHint(){
  const th=$('#tfh');if(!th||!E||E.ty!='tf')return;
  const a=r2(curVal()),fe=$('#tfee'),fee=fe?parseNum(fe.value):0,over=a>0&&r2(a+fee)>wb(E.w);
  th.classList.toggle('warn',over&&E.w!=E.w2);
  th.textContent=E.w==E.w2?'Pilih dua dompet yang berbeda.':over?`Saldo ${walOf(E.w).n} ${money(wb(E.w))} tidak cukup, jadi akan minus.`:`Saldo ${walOf(E.w).n}: ${money(wb(E.w))} · ${walOf(E.w2).n}: ${money(wb(E.w2))}`;
}

/* --- Master kategori --- */
let MY=0;
function openMonthPicker(){MY=+mon.slice(0,4);mpSheet()}
function mpSheet(){const cy=+curM().slice(0,4),cm=+curM().slice(5),sm=+mon.slice(0,4)==MY?+mon.slice(5):0;
  openSheet(`<div class="sheet" role="dialog" aria-modal="true" aria-label="Pilih bulan" tabindex="-1" style="--c:var(--p)"><div class="tint"></div><div class="grab"></div>
<div class="sh-top"><div class="sh-t">Pilih bulan</div><div class="sh-act"><button class="ib" data-s="close" aria-label="Tutup">${ic('x',18)}</button></div></div>
<div class="ypk"><button class="ib" data-s="myr" data-d="-1" aria-label="Tahun lalu" ${MY<=2000?'disabled':''}>${ic('cl',18)}</button><b>${MY}</b><button class="ib" data-s="myr" data-d="1" aria-label="Tahun depan" ${MY>=cy?'disabled':''}>${ic('cr',18)}</button></div>
<div class="mpg">${Array.from({length:12},(_,i)=>`<button class="${i+1==sm?'on':''}" data-s="mpm" data-m="${MY}-${String(i+1).padStart(2,'0')}" ${MY==cy&&i+1>cm?'disabled':''}>${new Date(2000,i,1).toLocaleDateString(DL,{month:'short'})}</button>`).join('')}</div>
<button class="btn2" style="width:100%;margin-top:12px" data-s="mpm" data-m="${curM()}">Bulan ini</button></div>`);
}
function openCats(){
  const L=S.cats.filter(x=>x.ty==CT);
  openSheet(`<div class="sheet" role="dialog" aria-modal="true" aria-label="Kategori" tabindex="-1" style="--c:var(--p)"><div class="tint"></div><div class="grab"></div>
<div class="sh-top"><div class="sh-t">Kategori</div><div class="sh-act"><button class="ib" data-s="close" aria-label="Tutup">${ic('x',18)}</button></div></div>
<div class="seg" style="margin:12px 0 8px">${[['out','Keluar'],['in','Masuk']].map(x=>`<button class="${CT==x[0]?'on':''}" data-s="ctab" data-v="${x[0]}">${x[1]}</button>`).join('')}</div>
<div class="bsc"><div class="list">${L.map(x=>{const n=usage(x.id);return`<button class="tr" data-s="cedit" data-id="${esc(x.id)}" style="--c:${x.c}"><span class="cico sm">${ic(x.i,18)}</span><span class="tm"><b>${esc(x.n)}</b><small>${n?n+' dipakai':'Belum dipakai'}${x.sys?' · Wajib ada':''}</small></span>${ic('cr',18)}</button>`}).join('')}</div></div>
<button class="save" data-s="cadd" style="background-color:var(--p);color:var(--pc)">Tambah kategori</button></div>`);
}
function openCatForm(id){
  const x=id?S.cats.find(c=>c.id==id):null,ut=x?S.tx.filter(t=>t.c==x.id).length:0,ur=x?S.rec.filter(r=>r.c==x.id).length:0;
  CE={id:x&&x.id,ty:x?x.ty:CT,i:x?x.i:'🏷️',c:x?x.c:CCOL[5]};
  const can=x&&!x.sys&&!ut&&!ur;
  openSheet(`<div class="sheet" role="dialog" aria-modal="true" aria-label="${x?'Ubah':'Tambah'} kategori" tabindex="-1" style="--c:${CE.c}"><div class="tint"></div><div class="grab"></div>
<div class="sh-top"><div class="sh-act"><button class="ib" data-s="cback" aria-label="Kembali">${ic('cl',18)}</button></div><div class="sh-t" style="flex:1">${x?'Ubah kategori':'Kategori baru'}</div><div class="sh-act"><button class="ib" data-s="close" aria-label="Tutup">${ic('x',18)}</button></div></div>
<div class="cprev"><span class="cico" id="cpv">${ic(CE.i,26)}</span></div>
<input class="nin" id="cn" maxlength="24" placeholder="Nama kategori" value="${esc(x?x.n:'')}" aria-label="Nama kategori">
${x?'':`<div class="seg" style="margin-bottom:12px">${[['out','Keluar'],['in','Masuk']].map(t=>`<button class="${CE.ty==t[0]?'on':''}" data-s="cty" data-v="${t[0]}">${t[1]}</button>`).join('')}</div>`}
<div class="lbl">Pilih ikon</div><div id="cig">${EMOG.map(g=>`<div class="egl">${g[0]}</div><div class="eg">${g[1].map(e=>`<button class="${e==CE.i?'on':''}" data-s="cic" data-i="${e}" aria-label="Ikon ${e}">${e}</button>`).join('')}</div>`).join('')}</div>
<button class="save" data-s="csave" style="background-color:var(--c);color:#fff">Simpan</button>
${x?`<button class="btn2 dl2" data-s="cdel" ${can?'':'disabled'}>Hapus kategori</button><p class="hint">${x.sys?'Kategori ini wajib ada sebagai cadangan, jadi tidak bisa dihapus.':ut||ur?`Tidak bisa dihapus karena masih dipakai ${ut} transaksi${ur?` dan ${ur} transaksi berulang`:''}. Pindahkan atau hapus dulu.`:'Belum ada transaksi di kategori ini, jadi boleh dihapus.'}</p>`:''}</div>`);
}
function saveCat(){
  const n=($('#cn').value||'').trim().replace(/\s+/g,' ');
  if(!n){toast('Nama kategori wajib diisi',{c:'var(--exp)'});return}
  if(S.cats.some(x=>x.ty==CE.ty&&x.id!=CE.id&&x.n.toLowerCase()==n.toLowerCase())){toast('Nama itu sudah dipakai',{c:'var(--exp)'});return}
  if(CE.id){Object.assign(S.cats.find(c=>c.id==CE.id),{n,i:CE.i,c:CE.c})}
  else insertCat({id:'c'+uid(),n,i:CE.i,c:CE.c,ty:CE.ty});
  CT=CE.ty;save();rebuild();render(false);openCats();toast('Kategori tersimpan');
}
function delCat(){
  const x=S.cats.find(c=>c.id==CE.id);if(!x||x.sys)return;
  const n=usage(x.id);if(n){toast(`Masih dipakai ${n} data, tidak bisa dihapus`,{c:'var(--exp)'});return}
  const b=snapAll();S.cats=S.cats.filter(c=>c.id!=x.id);delete S.bud.cats[x.id];Object.values(S.bud.mo||{}).forEach(o=>delete o.cats[x.id]);CT=x.ty;save();rebuild();render(false);openCats();toast('Kategori dihapus',{c:'var(--exp)',undo:b});
}

/* --- Filter tanggal --- */
function openRange(){
  const td=ymd(Date.now());
  openSheet(`<div class="sheet" role="dialog" aria-modal="true" aria-label="Filter tanggal" tabindex="-1" style="--c:var(--p)"><div class="tint"></div><div class="grab"></div>
<div class="sh-top"><div class="sh-t">Filter tanggal</div><div class="sh-act"><button class="ib" data-s="close" aria-label="Tutup">${ic('x',18)}</button></div></div>
<div class="fl" style="margin-top:12px">${[['7','7 hari'],['30','30 hari'],['bm','Bulan ini'],['bl','Bulan lalu']].map(x=>`<button class="chip" data-s="rp" data-v="${x[0]}">${x[1]}</button>`).join('')}</div>
<div class="fxf"><small>Dari</small><input type="date" id="rf" max="${td}" value="${rng?rng.f:''}" aria-label="Dari tanggal"></div>
<div class="fld"><label>Sampai</label><input type="date" id="rt2" max="${td}" value="${rng?rng.t:''}" aria-label="Sampai tanggal"></div>
<button class="save" data-s="rok" style="background-color:var(--p);color:var(--pc)">Terapkan</button>
${rng?'<button class="btn2" style="width:100%;margin-top:10px" data-s="rno">Hapus filter</button>':''}</div>`);
}
function rangePreset(v){
  const n=new Date();let a=new Date(n),b=n;
  if(v=='7')a.setDate(n.getDate()-6);else if(v=='30')a.setDate(n.getDate()-29);
  else if(v=='bm')a=new Date(n.getFullYear(),n.getMonth(),1);
  else{a=new Date(n.getFullYear(),n.getMonth()-1,1);b=new Date(n.getFullYear(),n.getMonth(),0)}
  $('#rf').value=ymd(a);$('#rt2').value=ymd(b);
}
function applyRange(){
  let f=$('#rf').value,t=$('#rt2').value;const td=ymd(Date.now());
  if(!f&&!t){toast('Pilih tanggal dulu',{c:'var(--exp)'});return}
  if(!f)f=t;if(!t)t=f;if(f>t){const x=f;f=t;t=x}
  if(t>td)t=td;if(f>td)f=td;
  rng={f,t};closeSheet();render(false);
}

/* --- Lembar budget --- */
const avg3=()=>{const a={},t=[1,2,3].map(i=>inMonth(madd(curM(),-i)));OUT.forEach(k=>{const v=t.reduce((s,m)=>s+m.filter(x=>x.ty=='out'&&!x.adj&&x.c==k).reduce((q,x)=>q+x.a,0),0)/3;if(v>0)a[k]=Math.max(1e4,Math.ceil(v/1e4)*1e4)});return a};
function budUpd(){const b=$('#bal');if(!b)return;const t=parseNum($('#bt').value);let a=0;$$('[data-bk]').forEach(i=>a+=parseNum(i.value));const p=t?a/t*100:0;b.style.width=Math.min(100,p)+'%';b.style.background=p>100?'var(--exp)':p>=90?'var(--amb)':'var(--p)';$('#bals').textContent=t?(a>t?'Melebihi total '+money(a-t):'Teralokasi '+money(a)+' dari '+money(t)+' · sisa '+money(t-a)):'Isi total dulu, lalu bagi ke kategori'}
/* ---------- Notifikasi: batas persen budget dan jam pengingat ---------- */
const NOTI=typeof Notification!='undefined';
let ntTm=null,NTS=false;
async function ntCheck(){
  const nt=NT();if(!NOTI||Notification.permission!='granted')return;
  ntBud();
  if(!nt.sys||!nt.ron)return;
  const d=new Date(),mm=d.getHours()*60+d.getMinutes();
  const gap=nt.last?Math.round((new Date(ymd(Date.now())+'T00:00:00')-new Date(nt.last+'T00:00:00'))/864e5):1e3;
  if(mm<(+nt.t.slice(0,2))*60+(+nt.t.slice(3))||gap<nt.d)return;
  if(S.tx.some(t=>ymd(t.ts)==ymd(Date.now())))return; // sudah mencatat hari ini, tidak perlu diingatkan
  S.set.nt={...nt,last:ymd(Date.now())};save();
  const body='Belum ada catatan hari ini. Yuk catat pengeluaran dan pemasukanmu.';
  try{const r=await navigator.serviceWorker.ready;await r.showNotification('JejakDuit',{body,icon:'/icon-192.png',badge:'/icon-192.png',tag:'jd-daily'})}
  catch(e){try{new Notification('JejakDuit',{body,icon:'/icon-192.png'})}catch(x){}}
}
async function ntBud(){
  const nt=NT();if(!nt.bon||!budOn()||!nt.bsys||!NOTI||Notification.permission!='granted')return;
  const d=new Date(),mm=d.getHours()*60+d.getMinutes();
  if(mm<(+nt.bt.slice(0,2))*60+(+nt.bt.slice(3))||nt.blast==ymd(Date.now()))return;
  const L=insights().filter(x=>x.i=='alert'&&/^Budget/.test(x.t));if(!L.length)return;
  S.set.nt={...nt,blast:ymd(Date.now())};save();
  const body=L.length==1?L[0].t+'. '+L[0].s:L.length+' budget perlu perhatian. Buka lonceng untuk detailnya.';
  try{const r=await navigator.serviceWorker.ready;await r.showNotification('JejakDuit',{body,icon:'/icon-192.png',badge:'/icon-192.png',tag:'jd-budget'})}
  catch(e){try{new Notification('JejakDuit',{body,icon:'/icon-192.png'})}catch(x){}}
}
function ntSched(){
  clearTimeout(ntTm);const nt=NT(),bd=nt.bon&&budOn()&&nt.bsys,rd=nt.ron&&nt.sys;if(!rd&&!bd)return;
  const d=new Date(),f=x=>new Date(d.getFullYear(),d.getMonth(),d.getDate(),+x.slice(0,2),+x.slice(3),0,500).getTime()-d.getTime(),c=[...(rd?[f(nt.t)]:[]),...(bd?[f(nt.bt)]:[])].filter(x=>x>0&&x<864e5);
  if(c.length)ntTm=setTimeout(()=>{ntCheck();ntSched()},Math.min(...c));
}
/* ---------- Notifikasi: satu tempat. Master perangkat + dua bagian yang bisa dibuka-tutup (accordion), masing-masing punya saklar on/off. ---------- */
function notifSum(){
  const nt=NT(),on=[nt.ron?'Pengingat catat':'',nt.bon&&budOn()?'Peringatan budget':''].filter(Boolean);
  return on.length?on.join(' · ')+((nt.sys||nt.bsys)?' · perangkat':''):'Semua mati';
}
let NS={dev:false,ron:true,bon:true,open:'',rsys:false,bsys:false};
const HM=(t,id)=>{const H=[...Array(24).keys()].map(x=>String(x).padStart(2,'0')),M=[...Array(12).keys()].map(x=>String(x*5).padStart(2,'0')),hh=t.slice(0,2),mn=t.slice(3);if(!M.includes(mn)){M.push(mn);M.sort()}
  return`<span class="nti"><select id="${id}h" aria-label="Jam">${H.map(x=>`<option ${x==hh?'selected':''}>${x}</option>`).join('')}</select><b>:</b><select id="${id}m" aria-label="Menit">${M.map(x=>`<option ${x==mn?'selected':''}>${x}</option>`).join('')}</select></span>`};
function accHTML(k){
  const nt=NT(),r=k=='r',on=r?NS.ron:NS.bon,open=NS.open==k&&on,off=!r&&!budOn();
  const body=r?`<div class="set"><span class="si">${ic('repeat',19)}</span><span class="st">Ingatkan setiap<small>Berapa hari sekali (1 sampai 30)</small></span><span class="nti"><input id="ntd" inputmode="numeric" maxlength="2" value="${nt.d}" aria-label="Ingatkan setiap berapa hari"><b>hari</b></span></div>
<div class="bpr">${[1,2,3,7].map(v=>`<button class="chip${v==nt.d?' on':''}" data-s="ntday" data-v="${v}">${v}</button>`).join('')}</div>
<div class="set"><span class="si">${ic('clock',19)}</span><span class="st">Jam pengingat<small>Format 24 jam</small></span>${HM(nt.t,'nr')}</div>
<p class="hint">Dilewati kalau hari itu sudah ada catatan.</p>`
  :`<div class="set"><span class="si">${ic('target',19)}</span><span class="st">Batas peringatan<small>Muncul saat pemakaian sudah segini</small></span><span class="nti"><input id="ntp" inputmode="numeric" maxlength="3" value="${nt.pct}" aria-label="Batas peringatan budget dalam persen"><b>%</b></span></div>
<div class="bpr">${[70,80,90,100].map(v=>`<button class="chip${v==nt.pct?' on':''}" data-s="ntpct" data-v="${v}">${v}%</button>`).join('')}</div>
<div class="set"><span class="si">${ic('clock',19)}</span><span class="st">Jam pengingat<small>Format 24 jam</small></span>${HM(nt.bt,'nb')}</div>`;
  return`<div class="acc${open?' open':''}${on?'':' off'}" id="acc${k}"><div class="ah"><button class="ahb" data-s="nacc" data-k="${k}" aria-expanded="${open}" ${on?'':'disabled'}><span class="si">${ic(r?'pen':'alert',19)}</span><span class="st">${r?'Pengingat catat':'Peringatan budget'}<small>${off?'Budget bulanan sedang nonaktif':r?'Ingatkan mencatat transaksi':'Ingatkan saat pemakaian mendekati batas'}</small></span><span class="chv">${ic('cr',16)}</span></button><button class="swb" data-s="${r?'nron':'nbon'}" role="switch" aria-checked="${on}" aria-label="${r?'Pengingat catat':'Peringatan budget'}"><span class="tg${on?' on':''}"><i></i></span></button></div><div class="ab"><div class="abi">${body}</div></div></div>`;
}
function openNotif(){
  const nt=NT(),perm=NOTI?Notification.permission:'unsupported';
  NS={dev:(nt.sys||nt.bsys)&&perm=='granted',ron:nt.ron,bon:nt.bon,open:'',perm};
  const sub=perm=='unsupported'?'Browser ini belum mendukung notifikasi':perm=='denied'?'Diblokir. Aktifkan lewat pengaturan browser':'Tampil di layar HP saat app dibuka pada atau setelah jam yang dipilih';
  openSheet(`<div class="sheet" role="dialog" aria-modal="true" aria-label="Notifikasi" tabindex="-1" style="--c:var(--p)"><div class="tint"></div><div class="grab"></div>
<div class="sh-top"><div class="sh-t">Notifikasi</div><div class="sh-act"><button class="ib" data-s="close" aria-label="Tutup">${ic('x',18)}</button></div></div>
<div class="grp" style="margin-top:10px"><button class="set" data-s="ndev" role="switch" aria-checked="${NS.dev}"><span class="si">${ic('bell',19)}</span><span class="st">Notifikasi perangkat<small id="ndsub">${sub}</small></span><span class="tg${NS.dev?' on':''}" id="ndtg"><i></i></span></button></div>
<div class="sec" style="margin:14px 4px 6px">Pengingat</div>
<div class="grp accg">${accHTML('r')}${accHTML('b')}</div>
<p class="hint">Pengingat selalu tampil di lonceng. Notifikasi perangkat muncul saat JejakDuit dibuka pada atau setelah jam yang dipilih, paling banyak sekali sehari, karena aplikasi web tidak bisa berjalan di latar belakang.</p>
<button class="save" data-s="nsave" style="background-color:var(--p);color:var(--pc)">Simpan</button></div>`);
}
function accRefresh(k){const e=$('#acc'+k);if(!e)return;const keep={};$$('input,select',e).forEach(i=>keep[i.id]=i.value);const t=document.createElement('div');t.innerHTML=accHTML(k);e.replaceWith(t.firstChild);$$('input,select',$('#acc'+k)).forEach(i=>{if(keep[i.id]!==undefined)i.value=keep[i.id]})}
function secToggle(k){
  const on=k=='r'?(NS.ron=!NS.ron):(NS.bon=!NS.bon);
  if(on){NS.open=k;if(k=='b'&&!budOn()){NS.bon=false;NS.open='';toast('Aktifkan Budget bulanan dulu',{c:'var(--exp)'});return}}else if(NS.open==k)NS.open='';
  const o=NS.open;accRefresh('r');accRefresh('b');
}
function accOpen(k){NS.open=NS.open==k?'':k;accRefresh('r');accRefresh('b')}
async function devToggle(){
  if(!NOTI){toast('Browser ini belum mendukung notifikasi',{c:'var(--exp)'});return}
  if(NS.dev)NS.dev=false;
  else{
    let p=Notification.permission;
    if(p=='default'){try{p=await Notification.requestPermission()}catch(e){}}
    if(p!='granted'){toast(p=='denied'?'Notifikasi diblokir di pengaturan browser':'Izin notifikasi belum diberikan',{c:'var(--exp)'});return}
    NS.dev=true;
  }
  const t=$('#ndtg');if(!t)return;t.classList.toggle('on',NS.dev);t.closest('button').setAttribute('aria-checked',NS.dev);
}
function readPct(){
  const el=$('#ntp'),pct=Math.round(+String(el.value).replace(/\D/g,''));
  if(!(pct>=50&&pct<=100)){toast('Batas peringatan harus 50 sampai 100',{c:'var(--exp)'});return null}
  return pct;
}
function saveNotif(){
  const o=NT();let pc=o.pct,d=o.d,t=o.t,bt=o.bt;
  if($('#ntd')){d=Math.round(+String($('#ntd').value).replace(/\D/g,''));if(!(d>=1&&d<=30)){NS.open='r';toast('Jeda ingatkan harus 1 sampai 30 hari',{c:'var(--exp)'});return}t=$('#nrh').value+':'+$('#nrm').value}
  if($('#ntp')){pc=readPct();if(pc==null)return;bt=$('#nbh').value+':'+$('#nbm').value}
  S.set.nt={...o,ron:NS.ron,bon:NS.bon,d,t,pct:pc,bt,sys:NS.dev,bsys:NS.dev,last:'',blast:''};
  save();closeSheet();render(false);toast('Notifikasi disimpan');ntSched();ntCheck();
}
/* Budget bulanan on/off */
let BGO=true;
function bgToggle(){
  const on=!BGO;BGO=on;const t=$('#bgtg');t.classList.toggle('on',on);t.closest('button').setAttribute('aria-checked',on);
  const f=$('#bgform');f.hidden=!on;$('#bgoff').hidden=on;if(on){f.classList.remove('rv');void f.offsetWidth;f.classList.add('rv')}
}
/* --- Atur urutan Catat cepat --- */
const QOA=k=>k=='IN'?['Pemasukan','adl','#10B981']:cat(k);
function qoRows(){const L=qorder();return L.map((k,i)=>{const c=QOA(k);return`<div class="qor" data-k="${esc(k)}" style="--c:${c[2]}"><span class="qgrip" role="img" aria-label="Geser untuk memindah ${esc(c[0])}"><svg width="14" height="18" viewBox="0 0 14 18" fill="currentColor" aria-hidden="true"><circle cx="4" cy="3" r="1.5"/><circle cx="10" cy="3" r="1.5"/><circle cx="4" cy="9" r="1.5"/><circle cx="10" cy="9" r="1.5"/><circle cx="4" cy="15" r="1.5"/><circle cx="10" cy="15" r="1.5"/></svg></span><span class="cico sm">${ic(c[1],18)}</span><b>${esc(c[0])}</b><button data-s="qup" data-k="${esc(k)}" aria-label="Naikkan ${esc(c[0])}" ${i?'':'disabled'}><span class="qar" style="transform:rotate(-90deg)">${ic('cr',18)}</span></button><button data-s="qdn" data-k="${esc(k)}" aria-label="Turunkan ${esc(c[0])}" ${i==L.length-1?'disabled':''}><span class="qar" style="transform:rotate(90deg)">${ic('cr',18)}</span></button></div>`}).join('')}
function heroBud(hide){
  const b=BG().total;if(!b)return'';
  const O=sum(inMonth(curM()),'out'),pct=O/b*100,c=pct>=100?'#FDA4AF':pct>=80?'#FCD34D':'#6EE7B7',h=hide.trim();
  return`<button class="hbud" data-a="budget" aria-label="Budget terpakai ${Math.round(pct)} persen. Atur budget"><span class="hbb"><i style="width:${Math.min(100,pct)}%;background:${c}"></i></span><span class="hbt"><span>Budget terpakai ${Math.round(pct)}%</span><b class="${h}">${O>b?'Lewat '+money(O-b):'Sisa '+money(b-O)}</b></span></button>`;
}
function openAllCats(){
  const tiles=qorder().map(k=>k=='IN'?`<button class="qt" style="--c:#10B981" data-s="quick" data-c="${INC[0]}" data-ty="in"><span class="qr"><span class="cico">${ic('adl',24,2.4)}</span></span><span class="ql">Pemasukan</span></button>`:`<button class="qt" style="--c:${cat(k)[2]}" data-s="quick" data-c="${k}"><span class="qr"><span class="cico">${ic(cat(k)[1],28)}</span></span><span class="ql">${esc(cat(k)[0])}</span></button>`).join('');
  openSheet(`<div class="sheet" role="dialog" aria-modal="true" aria-label="Semua kategori" tabindex="-1" style="--c:var(--p)"><div class="tint"></div><div class="grab"></div>
<div class="sh-top"><div class="sh-t">Semua kategori</div><div class="sh-act"><button class="ib" data-s="close" aria-label="Tutup">${ic('x',18)}</button></div></div>
<div class="bsc"><div class="qg card">${tiles}</div></div></div>`);
}
function openQord(){
  openSheet(`<div class="sheet" role="dialog" aria-modal="true" aria-label="Atur urutan kategori" tabindex="-1" style="--c:var(--p)"><div class="tint"></div><div class="grab"></div>
<div class="sh-top"><div class="sh-t">Atur urutan kategori</div><div class="sh-act"><button class="ib" data-s="close" aria-label="Tutup">${ic('x',18)}</button></div></div>
<p class="hint" style="margin:6px 4px 8px">Tahan dan geser titik-titik di kiri, atau pakai tombol panah. Urutan dari atas ke bawah = kiri ke kanan, baris demi baris di Beranda.</p>
<div id="qol">${qoRows()}</div>
<button class="btn2" data-s="qreset" style="width:100%;margin-top:12px">Kembalikan urutan awal</button></div>`);
}
function qmove(k,d){const L=qorder(),i=L.indexOf(k),j=i+d;if(i<0||j<0||j>=L.length)return;[L[i],L[j]]=[L[j],L[i]];S.set.qo=L;save();$('#qol').innerHTML=qoRows();if(tab=='home')render(false);vib()}
/* Geser untuk mengurutkan: hanya aktif dari pegangan (.qgrip) supaya scroll daftar tetap normal */
let QD=null;
function qdStart(e,g){
  const rows=[...$('#qol').children],row=g.closest('.qor'),i=rows.indexOf(row);if(i<0)return;
  const h=rows.length>1?rows[1].getBoundingClientRect().top-rows[0].getBoundingClientRect().top:52;
  QD={row,rows,i,j:i,y:e.clientY,h,id:e.pointerId,keys:rows.map(x=>x.dataset.k)};
  try{g.setPointerCapture(e.pointerId)}catch(x){}
  row.classList.add('drag');rows.forEach(x=>{if(x!=row)x.classList.add('qs')});vib();
}
function qdMove(e){
  if(!QD||e.pointerId!=QD.id)return;
  const{rows,i,h,row}=QD,dy=Math.max(-i*h,Math.min((rows.length-1-i)*h,e.clientY-QD.y));
  row.style.transform='translateY('+dy+'px)';
  const j=Math.max(0,Math.min(rows.length-1,i+Math.round(dy/h)));
  if(j!=QD.j){QD.j=j;rows.forEach((x,k)=>{if(x!=row)x.style.transform=k>i&&k<=j?'translateY('+(-h)+'px)':k<i&&k>=j?'translateY('+h+'px)':''});vib()}
}
function qdEnd(e){
  if(!QD||e.pointerId!=QD.id)return;
  const{keys,i,j}=QD;QD=null;
  if(e.type=='pointerup'&&j!=i){const L=keys.slice(),k=L.splice(i,1)[0];L.splice(j,0,k);S.set.qo=L;save();if(tab=='home')render(false)}
  const l=$('#qol');if(l)l.innerHTML=qoRows();
}
document.addEventListener('pointerdown',e=>{const g=e.target.closest&&e.target.closest('.qgrip');if(g){e.preventDefault();qdStart(e,g)}});
document.addEventListener('pointermove',qdMove);
document.addEventListener('pointerup',qdEnd);
document.addEventListener('pointercancel',qdEnd);
function qreset(){delete S.set.qo;save();$('#qol').innerHTML=qoRows();if(tab=='home')render(false)}
let BGT='m',BGMo=curM(),BGOL=false;
function bgMonthHTML(){
  const sp=spentBy(BGMo),B=bmo(BGMo),has=!!(S.bud.mo&&S.bud.mo[BGMo]);
  return`<div class="bgmn"><button data-s="bgm" data-d="-1" aria-label="Bulan sebelumnya">${ic('cl',18)}</button><b>${esc(mlabel(BGMo))}${BGMo==curM()?'<small>Bulan ini</small>':''}</b><button data-s="bgm" data-d="1" aria-label="Bulan berikutnya" ${BGMo>=madd(curM(),12)?'disabled':''}>${ic('cr',18)}</button></div>
<p class="hint" style="margin:6px 4px 10px">${has?'Budget bulan ini sudah diatur sendiri.':'Belum diatur khusus bulan ini, isinya ikut bulan sebelumnya.'} Yang kamu simpan berlaku dari bulan ini sampai kamu ubah lagi.</p>
<div class="bsc"><div class="bt"><label for="bt">Total ${esc(mlabel(BGMo))}</label><div class="bti"><span>Rp</span><input id="bt" data-money inputmode="numeric" placeholder="0" value="${B.total?num(B.total):''}" aria-label="Total budget bulanan"></div>
<div class="bpr">${[[1e6,'1 jt'],[2e6,'2 jt'],[3e6,'3 jt'],[5e6,'5 jt']].map(x=>`<button class="chip" data-s="bpre" data-v="${x[0]}">${x[1]}</button>`).join('')}</div>
<div class="ball"><div class="pb"><i id="bal"></i></div><small id="bals"></small></div>
<div class="bact"><button class="btn2" data-s="bavg">${ic('repeat',15)}Rata-rata 3 bulan</button><button class="btn2" data-s="beq">Bagi rata</button></div></div>
<div class="sec" style="margin:14px 0 2px">Per kategori <small style="color:var(--mu);font-weight:600">(boleh kosong)</small></div>
${OUT.map(k=>`<div class="bkr" style="--c:${cat(k)[2]}"><span class="cico sm">${ic(cat(k)[1],18)}</span><div class="bkn"><b>${esc(cat(k)[0])}</b><small>${esc(mshort(BGMo))} ${money(sp[k]||0)}</small></div><div class="bki"><span>Rp</span><input data-bk="${k}" data-money inputmode="numeric" placeholder="0" value="${B.cats[k]?num(B.cats[k]):''}" aria-label="Budget ${esc(cat(k)[0])}"></div></div>`).join('')}</div>
<button class="set" data-s="bgol" role="switch" aria-checked="${BGOL}" style="margin-top:8px"><span class="st">Hanya bulan ini<small>Bulan berikutnya tetap pakai budget sebelumnya</small></span><span class="tg${BGOL?' on':''}" id="bgoltg"><i></i></span></button>`;
}
function openBudget(){
  BGO=budOn();BGT='m';BGMo=curM();BGOL=false;const W=(S.bud.wk&&S.bud.wk.total)||0;
  openSheet(`<div class="sheet" role="dialog" aria-modal="true" aria-label="Atur budget" tabindex="-1" style="--c:var(--p)"><div class="tint"></div><div class="grab"></div>
<div class="sh-top"><div class="sh-t">Budget</div><div class="sh-act"><button class="ib" data-s="close" aria-label="Tutup">${ic('x',18)}</button></div></div>
<div class="grp" style="margin-top:10px"><button class="set" data-s="bgon" role="switch" aria-checked="${BGO}"><span class="si">${ic('target',19)}</span><span class="st">Budget<small>Batasi pengeluaran per bulan dan per minggu</small></span><span class="tg${BGO?' on':''}" id="bgtg"><i></i></span></button></div>
<p class="hint" id="bgoff" ${BGO?'hidden':''}>Budget nonaktif. Ring budget, peringatan, dan batas per kategori disembunyikan. Angka yang sudah kamu atur tetap tersimpan.</p>
<div id="bgform" ${BGO?'':'hidden'}><div class="seg bgt" role="tablist"><button role="tab" class="on" aria-selected="true" data-s="bgt" data-t="m">Bulanan</button><button role="tab" aria-selected="false" data-s="bgt" data-t="w">Mingguan</button></div>
<div id="bgmp">${bgMonthHTML()}</div>
<div id="bgwp" hidden><div class="bt"><label for="wbt">Total per minggu</label><div class="bti"><span>Rp</span><input id="wbt" data-money inputmode="numeric" placeholder="0" value="${W?num(W):''}" aria-label="Total budget mingguan"></div>
<div class="bpr">${[[250e3,'250 rb'],[500e3,'500 rb'],[750e3,'750 rb'],[1e6,'1 jt']].map(x=>`<button class="chip" data-s="wpre" data-v="${x[0]}">${x[1]}</button>`).join('')}</div>
<div class="bact"><button class="btn2" data-s="wfrom">${ic('repeat',15)}Dari budget bulanan</button></div></div>
<p class="hint" style="margin:12px 4px 0">Minggu dihitung Senin sampai Minggu dan berlaku untuk semua minggu. Kosongkan untuk mematikan budget mingguan. Muncul di tab Minggu pada Laporan.</p></div></div>
<p class="hint" style="margin:14px 4px 0">Notifikasi budget diatur di Profil &gt; Notifikasi.</p>
<button class="save" data-s="bsave" style="background-color:var(--p);color:var(--pc)">Simpan budget</button></div>`,sh=>{budUpd();sh.addEventListener('input',budUpd)});
}
function saveBudget(){
  S.bud.on=BGO;if(!BGO){save();closeSheet();render(false);toast('Budget dinonaktifkan');return}
  const c={};$$('[data-bk]').forEach(i=>{const v=parseNum(i.value);if(v>0)c[i.dataset.bk]=v});let T=parseNum($('#bt').value);if(!T)T=Object.values(c).reduce((a,b)=>a+b,0);
  S.bud.mo=S.bud.mo||{};
  if(BGOL){const nx=madd(BGMo,1);if(!S.bud.mo[nx]){const pv=bmo(nx);S.bud.mo[nx]={total:pv.total,cats:{...pv.cats}}}}
  S.bud.mo[BGMo]={total:T,cats:c};
  const W=parseNum($('#wbt').value);if(W>0)S.bud.wk={total:W};else delete S.bud.wk;
  save();closeSheet();render(false);toast('Budget disimpan');
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
  const q=s=>'"'+String(s||'').replace(/"/g,'""')+'"';
  const rows=['waktu,jenis,kategori,jumlah,catatan,dompet,ke_dompet',...S.tx.slice().sort((a,b)=>a.ts-b.ts).map(t=>[new Date(t.ts).toISOString(),t.ty=='in'?'masuk':t.ty=='tf'?'pindah dana':'keluar',t.ty=='tf'?'':cat(t.c)[0],t.a,q(t.n),q(walOf(t.w).n),t.ty=='tf'?q(walOf(t.w2).n):''].join(','))];
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob(['\ufeff'+rows.join('\n')],{type:'text/csv;charset=utf-8'}));a.download='jejakduit-'+ymd(Date.now())+'.csv';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),4000);
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
function catFor(ty,name){
  const nm=name.trim(),f=(ty=='in'?INC:OUT).find(k=>cat(k)[0].toLowerCase()==nm.toLowerCase());
  if(f)return f;
  if(!nm||nm.length>24)return ty=='in'?'lainin':'lain';
  const nc={id:'c'+uid(),n:nm,i:'tag',c:CCOL[(nm.length+nm.charCodeAt(0))%CCOL.length],ty};
  insertCat(nc);rebuild();return nc.id;
}
function saveFile(name,type,txt){
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([txt],{type}));a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),4000);
}
const backupText=()=>JSON.stringify({app:'jejakduit',v:4,at:Date.now(),data:{tx:S.tx,bud:S.bud,cats:S.cats,rec:S.rec,wal:S.wal}});
const CANSHARE=typeof navigator.share=='function'&&typeof File=='function';
async function shareJSON(){
  try{
    const f=new File([backupText()],'jejakduit-cadangan-'+ymd(Date.now())+'.json',{type:'application/json'});
    if(navigator.canShare&&navigator.canShare({files:[f]})){
      await navigator.share({files:[f],title:'Cadangan JejakDuit'});
      S.set.bk=Date.now();save();render(false);toast('Cadangan dibagikan. Simpan di tempat aman');return;
    }
  }catch(e){if(e&&e.name=='AbortError')return}
  exportJSON(); // perangkat tidak bisa membagikan file: unduh biasa
}
function exportJSON(){
  saveFile('jejakduit-cadangan-'+ymd(Date.now())+'.json','application/json',backupText());
  S.set.bk=Date.now();save();render(false);toast('Cadangan disimpan. Simpan file-nya di tempat aman');
}
function importJSON(j){
  const d=j&&j.data;if(!d||!Array.isArray(d.tx)){toast('File cadangan tidak dikenali',{c:'var(--exp)'});return}
  const fresh=!S.tx.length,wmap={};
  if(Array.isArray(d.wal)&&d.wal.length)normWal(d.wal).forEach(w=>{
    const ex=S.wal.find(x=>x.id==w.id)||S.wal.find(x=>x.n.toLowerCase()==w.n.toLowerCase());
    if(ex){wmap[w.id]=ex.id;if(fresh&&!ex.init&&w.init)ex.init=w.init}else{S.wal.push(w);wmap[w.id]=w.id}
  });
  const map={};
  (Array.isArray(d.cats)?normCats(d.cats):[]).forEach(c=>{
    const ex=S.cats.find(x=>x.id==c.id)||S.cats.find(x=>x.ty==c.ty&&x.n.toLowerCase()==c.n.toLowerCase());
    if(ex)map[c.id]=ex.id;else{insertCat(c);map[c.id]=c.id}
  });
  const ids=new Set(S.tx.map(t=>t.id));let add=0;
  d.tx.forEach(t=>{
    if(!t||!(t.a>0)||!t.ts||!(t.ty=='in'||t.ty=='out'||t.ty=='tf'))return;
    const w=wmap[t.w]||S.wal[0].id,id=String(t.id||uid());
    if(t.ty=='tf'){const w2=wmap[t.w2];if(!w2||w2==w||ids.has(id))return;ids.add(id);S.tx.push({id,ty:'tf',a:r2(t.a),n:String(t.n||'').slice(0,80),ts:+t.ts,w,w2});add++;return}
    if(ids.has(id))return;ids.add(id);
    S.tx.push({id,ty:t.ty,c:map[t.c]||t.c,a:r2(t.a),n:String(t.n||'').slice(0,80),ts:+t.ts,w,...(t.r?{r:String(t.r)}:{}),...(t.adj?{adj:1}:{})});add++;
  });
  const have=new Set(S.rec.map(r=>r.id));
  normRec(d.rec).forEach(r=>{if(!have.has(r.id)){r.c=map[r.c]||r.c;r.w=wmap[r.w]||S.wal[0].id;S.rec.push(r)}});
  if(d.bud&&!S.bud.total&&!Object.keys(S.bud.cats).length){const bc={};Object.entries(d.bud.cats||{}).forEach(([k,v])=>{if(v>0)bc[map[k]||k]=+v});S.bud={total:+d.bud.total||0,cats:bc}}
  rebuild();sortTx();save();render(false);toast(add?`${add} transaksi dipulihkan`:'Tidak ada transaksi baru di cadangan');
}
function walFor(name){
  const nm=(name||'').trim();if(!nm)return S.wal[0].id;
  const f=S.wal.find(w=>w.n.toLowerCase()==nm.toLowerCase());if(f)return f.id;
  if(nm.length>20)return S.wal[0].id;
  const nw={id:'w'+uid(),n:nm,i:'👛',c:CCOL[(nm.length+nm.charCodeAt(0))%CCOL.length],init:0};S.wal.push(nw);return nw.id;
}
function importCSV(text){
  const rows=parseCSV(text),keys=new Set(S.tx.map(t=>[t.ts,t.ty,t.a,t.c,t.n,t.w,t.w2].join('|')));let add=0,bad=0;
  rows.forEach(r=>{
    const ts=new Date(r[0]).getTime(),ty=/^(in|masuk)$/i.test(r[1]||'')?'in':/^(out|keluar)$/i.test(r[1]||'')?'out':/^(tf|transfer|pindah[ _]?dana)$/i.test(r[1]||'')?'tf':null,a=parseFloat(r[3]);
    if(!isFinite(ts)||!ty||!(a>0)){if(isNaN(ts)&&/waktu|tanggal/i.test(r[0]||''))return;bad++;return}
    const n=(r[4]||'').trim().slice(0,80);
    if(ty=='tf'){
      if(!(r[5]||'').trim()||!(r[6]||'').trim()){bad++;return}
      const w=walFor(r[5]),w2=walFor(r[6]);if(w==w2){bad++;return}
      const k=[ts,ty,r2(a),'',n,w,w2].join('|');if(keys.has(k))return;keys.add(k);S.tx.push({id:uid(),ty,a:r2(a),n,ts,w,w2});add++;return;
    }
    const c=catFor(ty,r[2]||''),w=walFor(r[5]),k=[ts,ty,r2(a),c,n,w,''].join('|');
    if(keys.has(k))return;keys.add(k);S.tx.push({id:uid(),ty,c,a:r2(a),n,ts,w});add++;
  });
  sortTx();save();render(false);toast(add?`${add} transaksi diimpor${bad?`, ${bad} baris dilewati`:''}`:bad?'Format file tidak dikenali':'Tidak ada transaksi baru');
}

/* ---------- Event ---------- */
const A={
sec:()=>openSecurity(),
mpick:()=>openMonthPicker(),
gotx:el=>{flt=el.dataset.f;q='';rng=null;txv='list';mon=curM();setTab('tx')},
segx:()=>{const x=$('.sg.on');x&&x.dispatchEvent(new Event('click',{bubbles:true}))},
seg:el=>{const k=el.dataset.k,d=$('.donut'),c=$('#dcc');if(!d)return;const was=el.classList.contains('on');$$('.sg').forEach(x=>x.classList.remove('on'));if(c.dataset.o===undefined)c.dataset.o=c.innerHTML;if(was){d.classList.remove('hl');c.innerHTML=c.dataset.o;return}
const L=rdata().cur.filter(t=>t.ty==rep&&!t.adj),M=L.filter(t=>t.c==k),v=M.reduce((s,t)=>s+t.a,0),T=L.reduce((s,t)=>s+t.a,0),x=cat(k),b=BG().cats[k],bp=rep=='out'&&RP=='m'&&b&&!rwf?' · '+Math.round(v/b*100)+'% budget':'';
el.classList.add('on');d.classList.add('hl');c.innerHTML=`<div class="sgi" data-a="segx" style="--c:${x[2]}"><b><i class="sgd"></i><span>${esc(x[0])}</span></b><strong>${money(v)}</strong><small>${Math.round(v/T*100)}% · ${M.length} transaksi</small>${bp?`<small class="sgb">Budget ${Math.round(v/b*100)}%</small>`:''}</div>`;vib()},
tab:el=>{if(el.dataset.t!=tab)setTab(el.dataset.t)},
hide:()=>{S.set.hide=!S.set.hide;save();render(false)},
bell:openBell,
quick:el=>{
  const c=el.dataset.c,ty=el.dataset.ty||'out';vib();openTx({c,ty});
},
add:()=>{const o={ty:'out'};if(tab=='wd'&&WD)o.w=WD;else if(tab=='tx'&&txv=='cal'&&cdsel&&cdsel<=ymd(Date.now())){const d=new Date(),[Y,M,D]=cdsel.split('-');d.setFullYear(+Y,+M-1,+D);o.ts=d.getTime()}openTx(o)},
row:el=>{if(OPEN===el){closeRow();return}openTx({id:el.dataset.id})},
rdel:el=>{OPEN=null;rmTx(el.dataset.id)},
rng:openRange,
rclr:()=>{rng=null;render(false)},
cats:()=>{CT='out';openCats()},
recs:openRecs,recok:el=>recAct(el.dataset.id,el.dataset.m,'ok'),recskip:el=>recAct(el.dataset.id,el.dataset.m,'skip'),recedit:el=>{const r=S.rec.find(x=>x.id==el.dataset.id);if(r)openTx({ty:r.ty,c:r.c,w:r.w,a:r.a,n:r.n,ts:recTs(r,el.dataset.m),rid:r.id,rm:el.dataset.m})},
bkjson:exportJSON,
cmpt:el=>{
  const i=el.dataset.i,c=+el.dataset.c,p=+el.dataset.p,g=$('#cmpg');
  g.setAttribute('x1',el.dataset.x);g.setAttribute('x2',el.dataset.x);g.style.opacity=1;
  $$('.cmpl circle').forEach(x=>x.setAttribute('r',x.dataset.i==i?5.5:3.5));
  let d='';if(p>0){const v=Math.round((c-p)/p*100);d=v?`<em class="dlt ${(v>0)==(el.dataset.ty=='out')?'bad':'good'}">${v>0?'▲':'▼'} ${Math.abs(v)>999?'>999':Math.abs(v)}%</em>`:'<em class="dlt">Sama</em>'}else if(c)d='<em class="dlt nw">Baru</em>';
  $('#cmpi').innerHTML=`<b>${esc(el.dataset.n)}</b><span>Bulan ini <strong>${money(c)}</strong></span><span>Bulan lalu <strong>${money(p)}</strong></span>${d}`;
},
budget:openBudget,qord:openQord,qall:openAllCats,
reload:()=>location.reload(),
wals:openWals,
wadd:()=>openWalForm(),wnx:()=>{S.set.wnx=1;save();render(false)},
wfil:el=>{wf=el.dataset.id||null;render(false)},
rwf:el=>{rwf=el.dataset.id||null;render(false)},
wopen:el=>{WD=el.dataset.id;mon=curM();setTab('wd')},
wdback:()=>setTab('home'),
wdadd:()=>openTx({w:WD}),
wdtf:()=>openTx({ty:'tf',w:WD}),
wdadj:()=>openAdj(WD),
wdedit:()=>openWalForm(WD,'wd'),
wtf:()=>openTx({ty:'tf'}),
wquick:el=>{const x=WPRE.find(z=>z[0]==el.dataset.pw);if(!x||S.wal.some(w=>w.n.toLowerCase()==x[0].toLowerCase()))return;const b=snapAll();S.wal.push({id:'w'+uid(),n:x[0],i:x[1],c:x[2],init:0});save();render(false);toast(`Dompet ${x[0]} ditambahkan. Ketuk kartunya untuk mengisi saldo.`,{c:x[2],undo:b})},
bkshare:()=>shareJSON(),
mon:el=>{mon=madd(mon,+el.dataset.d);if(mon>curM())mon=curM();render(false)},
txv:el=>{txv=el.dataset.v;render(false)},
cday:el=>{cdsel=el.dataset.d;$$('.kcd').forEach(b=>b.classList.toggle('on',b.dataset.d==cdsel));const p=$('#cdp');p.innerHTML=cdHTML(cdsel);p.classList.remove('kin2');void p.offsetWidth;p.classList.add('kin2');vib&&vib()},
cadd:el=>{const d=new Date(),[Y,M,D]=el.dataset.d.split('-');d.setFullYear(+Y,+M-1,+D);openTx({ts:d.getTime()})},
monset:el=>{mon=el.dataset.m;RP='m';render(false)},
wseg:el=>{const sv=$('#wdn');if(!sv)return;const was=el.classList.contains('on');sv.querySelectorAll('.sl').forEach(x=>x.classList.toggle('on',!was&&x===el));sv.classList.toggle('has',!was);const t=(i,v)=>{const n=$('#wc'+i);n.textContent=v};t(1,was?'Total keluar':el.dataset.nm);t(2,was?$('#wc2').dataset.t:el.dataset.vl);t(3,was?$('#wc3').dataset.t:el.dataset.pc);const c=$('#wcc');c.style.animation='none';void c.getBoundingClientRect();c.style.animation=''},
wfold:el=>{const k=el.dataset.k,o=el.getAttribute('aria-expanded')!='false';WKF[k]=o;el.setAttribute('aria-expanded',!o);el.nextElementSibling.classList.toggle('fold',o)},
wall:el=>{const b=$('#wkall'),o=b.hidden;b.hidden=!o;el.setAttribute('aria-expanded',o);el.textContent=o?'Sembunyikan':'Lihat semua '+b.querySelectorAll('.wkr').length+' kategori'},
hmday:el=>{const k=el.dataset.k,hm=el.closest('.hm'),dd=$('#hmdd'),was=el.classList.contains('sel');hm.querySelectorAll('[data-k]').forEach(x=>x.classList.toggle('sel',!was&&x===el));if(was){dd.innerHTML='';return}
  const L=S.tx.filter(t=>ymd(t.ts)==k&&!t.adj).sort((a,b)=>b.ts-a.ts),out=L.filter(t=>t.ty=='out'),tot=sum(L,'out'),av=+hm.dataset.av||0,x=av?tot/av:0,bc={};out.forEach(t=>bc[t.c]=(bc[t.c]||0)+t.a);const tc=Object.entries(bc).sort((a,b)=>b[1]-a[1])[0];
  dd.innerHTML=`<div class="hdd"><div class="hdh"><b>${esc(dFmt(k,{weekday:'long',day:'numeric',month:'short',year:'numeric'}))}</b><span>${money(tot)}</span></div>${out.length&&av?`<div class="hds"><div><small>Dibanding rata-rata harian</small><b class="${x>1?'bad':'good'}">${x>1?'▲':'▼'} ${x.toFixed(1).replace('.',',')}× (${money(Math.round(av))})</b></div><div><small>Transaksi keluar · terbanyak</small><b>${out.length} · ${esc(tc?cat(tc[0])[0]:'-')}</b></div></div>`:''}<div class="list">${L.length?L.map(t=>row(t)).join(''):'<p class="wkn0" style="padding:6px 2px">Tidak ada transaksi di hari ini.</p>'}</div></div>`;dd.scrollIntoView({block:'nearest',behavior:'smooth'})},
ypick:()=>openSheet(`<div class="sheet" role="dialog" aria-modal="true" aria-label="Pilih tahun" tabindex="-1" style="--c:var(--p)"><div class="tint"></div><div class="grab"></div><div class="sh-top"><div class="sh-t">Pilih tahun</div><div class="sh-act"><button class="ib" data-s="close" aria-label="Tutup">${ic('x',18)}</button></div></div><div class="wkpl">${yrsList().map(y=>`<button class="wkpi${y==YR?' on':''}" data-s="yset" data-y="${y}" aria-pressed="${y==YR}"><b>Tahun ${y}</b><small>${y==curM().slice(0,4)?'Berjalan (Jan–'+mshort(curM())+')':'Setahun penuh'}</small></button>`).join('')}</div></div>`),
wkpick:()=>{const n=wkS(Date.now());openSheet(`<div class="sheet" role="dialog" aria-modal="true" aria-label="Pilih minggu" tabindex="-1" style="--c:var(--p)"><div class="tint"></div><div class="grab"></div><div class="sh-top"><div class="sh-t">Pilih minggu</div><div class="sh-act"><button class="ib" data-s="close" aria-label="Tutup">${ic('x',18)}</button></div></div><div class="wkpl">${Array.from({length:12},(_,i)=>{const k=addD(n,-7*i);return`<button class="wkpi${k==WK?' on':''}" data-s="wkset" data-k="${k}" aria-pressed="${k==WK}"><b>${wkLab(k,1)}</b><small>${i==0?'Minggu ini':i==1?'Minggu lalu':i+' minggu lalu'}</small></button>`}).join('')}</div></div>`)},
rptab:el=>{if(RP!=el.dataset.p){RP=el.dataset.p;render(false)}},
rpn:el=>{const d=+el.dataset.d;if(RP=='w'){WK=addD(WK,7*d);if(WK>wkS(Date.now()))WK=wkS(Date.now())}else if(RP=='m'){const n=madd(mon,d);mon=n>curM()?curM():n}else{const ys=yrsList(),y=+YR+d;YR=String(Math.max(+ys[ys.length-1],Math.min(y,+curM().slice(0,4))))}render(false)},
flt:el=>{flt=el.dataset.f;$$('#fl .chip').forEach(b=>b.classList.toggle('on',b.dataset.f==flt));$('#txl').innerHTML=listHTML()},
fxopen:()=>{FD={t:flt,cats:[...FX.cats],wals:[...FX.wals],min:FX.min,max:FX.max,sort:FX.sort,f:rng?rng.f:'',to:rng?rng.t:''};fxSheet()},
fxrm:el=>{const k=el.dataset.k,v=el.dataset.v;if(k=='t')flt='all';else if(k=='c')FX.cats=FX.cats.filter(x=>x!=v);else if(k=='w')FX.wals=FX.wals.filter(x=>x!=v);else if(k=='n'){FX.min=0;FX.max=0}else if(k=='d')rng=null;render(false)},
fxclr:()=>{FX=FX0();flt='all';rng=null;q='';render(false)},
rep:el=>{rep=el.dataset.r;render(false)},
pal:el=>{S.set.pal=el.dataset.p;save();theme(true);render(false)},
mode:el=>{S.set.mode=el.dataset.m;save();theme(true);render(false)},
notif:openNotif,
export:exportCSV,
import:()=>$('#file').click(),
reset:()=>confirmSheet('Hapus semua data?','Semua transaksi, dompet, budget, dan transaksi berulang di perangkat ini akan dihapus. Kategori, kunci aplikasi, dan tampilan tetap.','Hapus',()=>{const b=snapAll();S.tx=[];S.rec=[];S.bud={total:0,cats:{}};S.wal=[DEFW()];wf=null;S.set.lw=null;save();closeSheet();render(false);toast('Semua data dihapus',{c:'var(--exp)',undo:b})}),
undo:()=>{if(!UNDO)return;S.tx=UNDO.tx;S.rec=UNDO.rec;if(UNDO.wal){S.wal=UNDO.wal;S.bud=UNDO.bud}if(UNDO.cats){S.cats=UNDO.cats;rebuild()}UNDO=null;sortTx();save();$('#toast').className='';render(false);setTimeout(()=>toast('Dibatalkan'),250)}
};
document.addEventListener('click',e=>{
  const s=e.target.closest('[data-s]');
  if(s&&$('#sheet').contains(s)){
    const v=s.dataset.s;
    if(v=='close')closeSheet();
    else if(v=='quick'){const c=s.dataset.c,ty=s.dataset.ty||'out';vib();openTx({c,ty})}
    else if(v=='ty')setType(s.dataset.v);
    else if(v=='yset'){YR=s.dataset.y;closeSheet();render(false)}
    else if(v=='wkset'){WK=s.dataset.k;closeSheet();render(false)}
    else if(v=='fxt'){FD.t=s.dataset.v;const ho=FD.t=='in'||FD.t=='tf',hi=FD.t=='out'||FD.t=='tf';$('#fxgo').hidden=ho;$('#fxgi').hidden=hi;FD.cats=FD.cats.filter(id=>!((ho&&OUT.includes(id))||(hi&&INC.includes(id))));$$('#sheet [data-s=fxc]').forEach(b=>{const o=FD.cats.includes(b.dataset.id);b.classList.toggle('on',o);b.setAttribute('aria-pressed',o)});$$('#sheet [data-s=fxt]').forEach(b=>{const o=b.dataset.v==FD.t;b.classList.toggle('on',o);b.setAttribute('aria-pressed',o)})}
    else if(v=='fxc'||v=='fxw'){const L=v=='fxc'?FD.cats:FD.wals,i=L.indexOf(s.dataset.id);i<0?L.push(s.dataset.id):L.splice(i,1);s.classList.toggle('on',i<0);s.setAttribute('aria-pressed',i<0)}
    else if(v=='fxso'){FD.sort=s.dataset.v;$$('#sheet [data-s=fxso]').forEach(b=>{const o=b.dataset.v==FD.sort;b.classList.toggle('on',o);b.setAttribute('aria-pressed',o)})}
    else if(v=='fxn'){$('#fxmin').value=+s.dataset.a1?num(+s.dataset.a1):'';$('#fxmax').value=+s.dataset.a2?num(+s.dataset.a2):''}
    else if(v=='fxrs'){FD={t:'all',cats:[],wals:[],min:0,max:0,sort:'new',f:'',to:''};fxSheet()}
    else if(v=='fxok'){const mn=mnum('#fxmin'),mx=mnum('#fxmax'),f=$('#rf').value,t=$('#rt2').value;if(mx&&mn>mx){toast('Nominal minimum lebih besar dari maksimum');return}if(f&&t&&f>t){toast('Tanggal awal setelah tanggal akhir');return}
      flt=FD.t;FX={cats:FD.cats,wals:FD.wals,min:mn,max:mx,sort:FD.sort};rng=f||t?{f:f||t,t:t||f}:null;closeSheet();render(false)}
    else if(v=='cat'){E.c=s.dataset.c;updTx();vib()}
    else if(v=='k'){if(s.dataset.k=='del'&&e.detail>0)return;key(s.dataset.k)}
    else if(v=='save')saveTx();
    else if(v=='savemore')saveTx(true);
    else if(v=='rep'){E.rep=!E.rep;updTx();vib()}
    else if(v=='del')delTx();
    else if(v=='note'){const i=$('#nin');i.hidden=!i.hidden;if(!i.hidden)i.focus()}
    else if(v=='bsave')saveBudget();
    else if(v=='bgt'){BGT=s.dataset.t;$$('.bgt button').forEach(x=>{const o=x==s;x.classList.toggle('on',o);x.setAttribute('aria-selected',o)});$('#bgmp').hidden=BGT!='m';$('#bgwp').hidden=BGT!='w'}
    else if(v=='bgm'){BGMo=madd(BGMo,+s.dataset.d);$('#bgmp').innerHTML=bgMonthHTML();budUpd()}
    else if(v=='bgol'){BGOL=!BGOL;$('#bgoltg').classList.toggle('on',BGOL);s.setAttribute('aria-checked',BGOL)}
    else if(v=='wpre'){$('#wbt').value=num(+s.dataset.v)}
    else if(v=='wfrom'){const t=bmo(BGMo).total;if(!t){toast('Isi budget bulanan dulu',{c:'var(--exp)'});return}const dm=new Date(+BGMo.slice(0,4),+BGMo.slice(5),0).getDate();$('#wbt').value=num(Math.round(t*7/dm/1e3)*1e3)}
    else if(v=='ntpct'||v=='ntday'){const f=$(v=='ntpct'?'#ntp':'#ntd');f.value=s.dataset.v;$$('[data-s='+v+']').forEach(b=>b.classList.toggle('on',b==s))}
    else if(v=='qup'||v=='qdn')qmove(s.dataset.k,v=='qup'?-1:1);
    else if(v=='qreset')qreset();
    else if(v=='ndev')devToggle();
    else if(v=='nron'||v=='nbon')secToggle(v=='nron'?'r':'b');
    else if(v=='nacc')accOpen(s.dataset.k);
    else if(v=='nsave')saveNotif();
    else if(v=='bgon')bgToggle();
    else if(v=='ok'){const f=CONF;CONF=null;f&&f()}
    else if(v=='ctab'){CT=s.dataset.v;openCats()}
    else if(v=='cadd')openCatForm();
    else if(v=='cedit')openCatForm(s.dataset.id);
    else if(v=='cback')openCats();
    else if(v=='cty'){CE.ty=s.dataset.v;$$('[data-s=cty]').forEach(b=>b.classList.toggle('on',b.dataset.v==CE.ty))}
    else if(v=='cic'){CE.i=s.dataset.i;CE.c=ECOL(CE.i);$('.sheet').style.setProperty('--c',CE.c);$('#cpv').innerHTML=ic(CE.i,34);$$('#cig button').forEach(b=>b.classList.toggle('on',b.dataset.i==CE.i))}
    else if(v=='myr'){MY+=+s.dataset.d;mpSheet()}
    else if(v=='mpm'){mon=s.dataset.m;closeSheet();render(false)}
    else if(v=='bpre'){$('#bt').value=num(+s.dataset.v);budUpd()}
    else if(v=='bavg'){const a=avg3(),k=Object.keys(a);if(!k.length){toast('Belum ada data 3 bulan terakhir',{c:'var(--exp)'});return}$$('[data-bk]').forEach(i=>i.value=a[i.dataset.bk]?num(a[i.dataset.bk]):'');$('#bt').value=num(Object.values(a).reduce((x,y)=>x+y,0));budUpd();toast('Terisi dari rata-rata 3 bulan')}
    else if(v=='beq'){const t=parseNum($('#bt').value),L=$$('[data-bk]').filter(i=>i.dataset.bk!='lain');if(!t){toast('Isi total dulu',{c:'var(--exp)'});return}L.forEach(i=>i.value=num(Math.round(t/L.length/1e3)*1e3));budUpd()}
    else if(v=='ccl'){CE.c=s.dataset.c;$('.sheet').style.setProperty('--c',CE.c);$$('#ccg button').forEach(b=>b.classList.toggle('on',b.dataset.c==CE.c))}
    else if(v=='csave')saveCat();
    else if(v=='cdel')delCat();
    else if(v=='radd')openRecForm();
    else if(v=='redit')openRecForm(s.dataset.id);
    else if(v=='rback')openRecs();
    else if(v=='rty'){RE.ty=s.dataset.v;$$('[data-s=rty]').forEach(b=>b.classList.toggle('on',b.dataset.v==RE.ty));$('#rc').innerHTML=recOpts(RE.ty)}
    else if(v=='rcsave')saveRec();
    else if(v=='rauto'){RE.auto=!RE.auto;$('#rautotg').classList.toggle('on',RE.auto)}
    else if(v=='recall'){const n=dueRecs().length;confirmSheet('Catat semua?',n+' transaksi akan dicatat sesuai nominal tersimpan.','Catat semua',()=>{const before=snap();dueRecs().forEach(x=>recApply(x.r,x.m,true));sortTx();save();closeSheet();render(false);toast(n+' transaksi tercatat',{c:'var(--inc)',undo:before})})}
    else if(v=='rdel2')delRec();
    else if(v=='rp')rangePreset(s.dataset.v);
    else if(v=='rok')applyRange();
    else if(v=='rno'){rng=null;closeSheet();render(false)}
    else if(v=='wedit')openWalForm(s.dataset.id);
    else if(v=='wnew')openWalForm();
    else if(v=='wback'){WE&&WE.from=='wd'?closeSheet():openWals()}
    else if(v=='ajsave')saveAdj();
    else if(v=='wmback')openWalForm(WM.id,WE&&WE.from);
    else if(v=='wmok')moveWal();
    else if(v=='wtf')openTx({ty:'tf'});
    else if(v=='wic'){WE.i=s.dataset.i;$('#wpv').innerHTML=ic(WE.i,34);$$('.wig button').forEach(b=>b.classList.toggle('on',b.dataset.i==WE.i))}
    else if(v=='wcl'){WE.c=s.dataset.c;$('.sheet').style.setProperty('--c',WE.c);$$('.wcg button').forEach(b=>b.classList.toggle('on',b.dataset.c==WE.c))}
    else if(v=='wsave')saveWal();
    else if(v=='wdel')delWal();
    else if(v=='pinset')setPinFlow();
    else if(v=='pinchg')verifyFlow('Ganti PIN',()=>setPinFlow());
    else if(v=='pinoff')verifyFlow('Matikan kunci',()=>{S.set.pin=null;S.set.bio=null;S.set.lk=null;save();render(false);openSecurity();toast('Kunci dimatikan')});
    else if(v=='pinlock'){closeSheet();setTimeout(showLock,60)}
    else if(v=='biotog')toggleBio();
    else if(v=='tfswap'){const x=E.w;E.w=E.w2;E.w2=x;buildCats();updTx();vib()}
    return;
  }
  const a=e.target.closest('[data-a]');if(a&&A[a.dataset.a])A[a.dataset.a](a);
});
document.addEventListener('input',e=>{
  if(e.target.dataset&&e.target.dataset.money!=null)fmtInput(e.target);
  if(e.target.id=='aj')ajUpd();
  if(e.target.id=='tfee')tfHint();
  if(e.target.id=='q'){q=e.target.value;$('#txl').innerHTML=listHTML()}
  else if(e.target.id=='nin'){E.n=e.target.value.trim();$('#ntx').textContent=E.n||'Catatan'}
  else if(e.target.id=='dinp'&&E){const v=e.target.value;if(!v)return;const o=new Date(E.ts),[y,m,d]=v.split('-').map(Number),n=new Date(y,m-1,d,o.getHours(),o.getMinutes(),o.getSeconds());E.ts=Math.min(n.getTime(),Date.now());$('#dtx').textContent=dlabel(E.ts,true)}
});
document.addEventListener('change',e=>{
  const id=e.target.id;
  if(E&&id=='winp'){E.w=e.target.value;updTx()}
  else if(E&&(id=='tfa'||id=='tfb')){const v=e.target.value,o=S.wal.find(x=>x.id!=v).id;if(id=='tfa'){E.w=v;if(E.w2==v)E.w2=o}else{E.w2=v;if(E.w==v)E.w=o}buildCats();updTx()}
  else if(id=='lkd'){S.set.lkd=+e.target.value;save()}
  else if(e.target.id=='file'){const f=e.target.files[0];e.target.value='';if(f)f.text().then(t=>{
    if(/^\s*\{/.test(t)){let j;try{j=JSON.parse(t)}catch(x){toast('File cadangan rusak',{c:'var(--exp)'});return}importJSON(j)}else importCSV(t)
  }).catch(()=>toast('File tidak bisa dibaca',{c:'var(--exp)'}))}
});
document.addEventListener('keydown',e=>{
  if(LKS){if(/^[0-9]$/.test(e.key))lkKey(e.key);else if(e.key=='Backspace')lkKey('del');else if(e.key=='Escape'&&LKS.o.cancel)LKS.o.cancel();e.preventDefault();return}
  if(e.key=='Escape'){closeSheet();return}
  if(!E||e.ctrlKey||e.metaKey||e.altKey)return;
  const t=e.target;if(t&&(t.tagName=='INPUT'||t.tagName=='SELECT'||t.tagName=='TEXTAREA'))return;
  if(/^[0-9]$/.test(e.key)){key(e.key);e.preventDefault()}
  else if(e.key=='+'){key('+');e.preventDefault()}
  else if(e.key=='-'){key('−');e.preventDefault()}
  else if(e.key=='='){key('=');e.preventDefault()}
  else if(e.key=='Backspace'){key('del');e.preventDefault()}
  else if(e.key=='Enter'&&t.tagName!='BUTTON'){if(E.op&&E.buf)key('=');else saveTx();e.preventDefault()}
});
addEventListener('storage',e=>{if(e.key==KEY){S=load();rebuild();sortTx();theme();if(!E)render(false)}});
document.addEventListener('visibilitychange',()=>{
  if(document.hidden){holdStop();if(S.set.pin&&!LKS){hiddenAt=Date.now();covered=true;LK.className='cover';LK.hidden=false;LK.innerHTML='<div class="lkc"><img class="lkl" src="/logo.svg" width="64" height="64" alt=""></div>'}return}
  if(covered){covered=false;if(S.set.pin&&Date.now()-hiddenAt>=S.set.lkd)showLock();else if(!LKS){LK.hidden=true;LK.className='';LK.innerHTML=''}}
  const n=genRec();if(n)toast(`${n} transaksi berulang dicatat`);
  if(!$('#sheet').firstChild)render(false);
});

/* Tahan tombol hapus di keypad */
document.addEventListener('pointerdown',e=>{
  const b=e.target.closest&&e.target.closest('.pad [data-k=del]');
  if(b&&E&&(e.button||0)===0)holdStart();
});
['pointerup','pointercancel'].forEach(t=>document.addEventListener(t,()=>holdStop()));
document.addEventListener('contextmenu',e=>{if(e.target.closest&&e.target.closest('.pad,.rw'))e.preventDefault()});

/* Geser baris transaksi ke kiri untuk menghapus */
function closeRow(){if(OPEN){OPEN.style.transform='';OPEN.parentNode.classList.remove('sw');OPEN=null}}
document.addEventListener('pointerdown',e=>{
  const r=e.target.closest&&e.target.closest('.rw>.tr');
  if(OPEN&&r!==OPEN&&!(e.target.closest&&e.target.closest('.rb')))closeRow();
  if(!r||(e.button||0)!==0)return;
  SW={r,x:e.clientX,y:e.clientY,id:e.pointerId,base:r===OPEN?-84:0,on:false,cur:0};
});
document.addEventListener('pointermove',e=>{
  if(!SW||e.pointerId!==SW.id)return;
  const dx=e.clientX-SW.x,dy=e.clientY-SW.y;
  if(!SW.on){
    if(Math.abs(dx)>10&&Math.abs(dx)>Math.abs(dy)*1.5){SW.on=true;SW.r.style.transition='none';SW.r.parentNode.classList.add('sw');try{SW.r.setPointerCapture(e.pointerId)}catch(x){}}
    else return;
  }
  SW.cur=Math.max(-110,Math.min(0,SW.base+dx));SW.r.style.transform=`translateX(${SW.cur}px)`;
});
function swEnd(e){
  if(!SW||e.pointerId!==SW.id)return;const s=SW;SW=null;
  if(!s.on)return;
  DRAGGED=true;setTimeout(()=>{DRAGGED=false},80);
  s.r.style.transition='';
  if(s.cur<-42){s.r.style.transform='translateX(-84px)';OPEN=s.r}
  else{s.r.style.transform='';s.r.parentNode.classList.remove('sw');if(OPEN===s.r)OPEN=null}
}
['pointerup','pointercancel'].forEach(t=>document.addEventListener(t,swEnd));
document.addEventListener('click',e=>{if(DRAGGED){e.stopPropagation();e.preventDefault();DRAGGED=false}},true);

/* Cegah zoom cubit di iOS Safari (zoom dobel-ketuk dicegah lewat touch-action di CSS) */
['gesturestart','gesturechange','gestureend'].forEach(t=>document.addEventListener(t,e=>e.preventDefault()));


/* ---------- Kunci aplikasi (PIN + biometrik) ---------- */
// Catatan: PIN hanya mengunci tampilan aplikasi di perangkat ini. Data di localStorage tidak dienkripsi.
const LK=$('#lock');
const PINL=6,pinLen=()=>(S.set.pin&&S.set.pin.l)||4; // PIN baru 6 angka; PIN lama 4 angka tetap bisa dipakai sampai diganti
let LKS=null,BIO_OK=false,hiddenAt=0,covered=false,hadBL=false;
try{window.PublicKeyCredential&&PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable&&PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable().then(v=>{BIO_OK=!!v}).catch(()=>{})}catch(e){}
const b64=u=>btoa(String.fromCharCode(...new Uint8Array(u))),unb64=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
const rnd=n=>{const u=new Uint8Array(n);(crypto&&crypto.getRandomValues)?crypto.getRandomValues(u):u.forEach((_,i)=>u[i]=Math.random()*256);return u};
async function hashPin(pin,salt){
  try{
    const k=await crypto.subtle.importKey('raw',new TextEncoder().encode(pin),'PBKDF2',false,['deriveBits']);
    const d=await crypto.subtle.deriveBits({name:'PBKDF2',hash:'SHA-256',salt:new TextEncoder().encode(salt),iterations:120000},k,256);
    return'p'+b64(d);
  }catch(e){}
  let h=5381;const s=salt+':'+pin;for(let i=0;i<s.length;i++)h=((h<<5)+h+s.charCodeAt(i))|0;return'b'+h;
}
const checkPin=async p=>!!S.set.pin&&(await hashPin(p,S.set.pin.s))===S.set.pin.h;
const lockLeft=()=>Math.max(0,((S.set.lk&&S.set.lk.until)||0)-Date.now());
async function verify(p){
  const left=lockLeft();if(left>0)return{ok:false,msg:`Terlalu banyak percobaan. Tunggu ${Math.ceil(left/1000)} detik.`};
  if(await checkPin(p)){S.set.lk=null;save();return{ok:true}}
  const n=((S.set.lk&&S.set.lk.n)||0)+1,wait=n%5==0?Math.min(900,30*Math.pow(2,n/5-1))*1000:0;
  S.set.lk={n,until:wait?Date.now()+wait:0};save();
  return{ok:false,msg:wait?`Salah ${n} kali. Tunggu ${Math.round(wait/1000)} detik.`:n>=3?`PIN salah. Sisa ${5-n%5} percobaan sebelum dikunci sementara.`:'PIN salah'};
}
const gate=on=>['#page','#nav','#sheet','#toast'].forEach(s=>{const e=$(s);if(e)e.inert=on});
function hideLock(){LK.hidden=true;LK.className='';LK.innerHTML='';LKS=null}
function unlock(){hideLock();gate(false);document.body.classList.toggle('lock',hadBL)}
function askPin(o){
  o.len=o.len||PINL;LKS={buf:'',busy:false,o};
  const keys=['1','2','3','4','5','6','7','8','9','bio','0','del'].map(k=>k=='bio'?(o.bio?`<button data-l="bio" aria-label="Pakai biometrik">${ic('face',26,1.9)}</button>`:'<span></span>'):k=='del'?`<button data-l="del" aria-label="Hapus angka">${ic('back',24,2)}</button>`:`<button data-l="k" data-k="${k}">${k}</button>`).join('');
  LK.className='';LK.hidden=false;
  LK.innerHTML=`<div class="lkc"><img class="lkl" src="/logo.svg" width="56" height="56" alt=""><h2>${esc(o.title)}</h2><p class="lks" id="lks" aria-live="polite">${esc(o.sub||'')}</p><div class="lkd" id="lkd" aria-hidden="true">${'<i></i>'.repeat(o.len)}</div><div class="lkp">${keys}</div><div class="lkf">${o.cancel?'<button data-l="cancel">Batal</button>':''}${o.forgot?'<button data-l="forgot">Lupa PIN?</button>':''}</div></div>`;
}
async function lkKey(k){
  const s=LKS;if(!s||s.busy||s.o.page)return;
  if(k=='del')s.buf=s.buf.slice(0,-1);else if(s.buf.length<s.o.len)s.buf+=k;else return;
  $$('#lkd i').forEach((d,i)=>d.classList.toggle('on',i<s.buf.length));vib();
  if(s.buf.length<s.o.len)return;
  s.busy=true;await new Promise(r=>setTimeout(r,90));
  const r=await s.o.onpin(s.buf);
  if(LKS!==s)return;
  s.busy=false;s.buf='';
  if(r&&r.ok===false){
    const m=$('#lks'),d=$('#lkd');if(m){m.textContent=r.msg||'PIN salah';m.classList.add('err')}
    if(d){d.classList.remove('shake');void d.offsetWidth;d.classList.add('shake')}
    try{navigator.vibrate&&navigator.vibrate([30,40,30])}catch(e){}
  }
  $$('#lkd i').forEach(d=>d.classList.remove('on'));
}
function showLock(){
  if(!S.set.pin||(LKS&&LKS.o.unlock))return;
  hadBL=document.body.classList.contains('lock');document.body.classList.add('lock');gate(true);holdStop();
  askPin({title:'Masukkan PIN',sub:'JejakDuit terkunci',len:pinLen(),bio:!!S.set.bio,forgot:true,unlock:true,onpin:async p=>{const r=await verify(p);if(r.ok)unlock();return r}});
  if(S.set.bio)setTimeout(tryBio,350);
}
async function tryBio(){
  const cur=LKS;if(!S.set.bio||!cur||!cur.o.unlock)return;
  try{
    await navigator.credentials.get({publicKey:{challenge:rnd(32),allowCredentials:[{type:'public-key',id:unb64(S.set.bio),transports:['internal']}],userVerification:'required',timeout:60000}});
    if(LKS===cur){S.set.lk=null;save();unlock()}
  }catch(e){}
}
async function toggleBio(){
  if(S.set.bio){S.set.bio=null;save();render(false);openSecurity();return}
  try{
    const c=await navigator.credentials.create({publicKey:{challenge:rnd(32),rp:{name:'JejakDuit'},user:{id:rnd(16),name:'jejakduit',displayName:'JejakDuit'},pubKeyCredParams:[{type:'public-key',alg:-7},{type:'public-key',alg:-257}],authenticatorSelection:{authenticatorAttachment:'platform',userVerification:'required',residentKey:'discouraged'},timeout:60000,attestation:'none'}});
    S.set.bio=b64(c.rawId);save();render(false);openSecurity();toast('Biometrik aktif');
  }catch(e){toast('Biometrik tidak bisa diaktifkan di perangkat ini',{c:'var(--exp)'})}
}
function forgotUI(){
  LKS={buf:'',busy:true,o:{page:1}};
  LK.innerHTML=`<div class="lkc"><div class="lkw">${ic('alert',30)}</div><h2>Lupa PIN?</h2><p class="lks" style="max-width:290px">Satu-satunya cara adalah menghapus semua data di perangkat ini: transaksi, dompet, budget, dan transaksi berulang. Kunci ikut dimatikan. Setelah itu kamu bisa memulihkan dari file cadangan lewat Profil.</p><div class="lkf col"><button class="lkx" data-l="wipe">Hapus semua data dan buka kunci</button><button data-l="back">Kembali</button></div></div>`;
}
function wipeAll(){
  S.tx=[];S.rec=[];S.bud={total:0,cats:{}};S.wal=[DEFW()];S.set.pin=null;S.set.bio=null;S.set.lk=null;S.set.lw=null;wf=null;save();
  closeSheet();unlock();document.body.classList.remove('lock');render(false);toast('Data dihapus dan kunci dimatikan',{c:'var(--exp)'});
}
function setPinFlow(msg){
  const back=()=>{hideLock();openSecurity()};
  askPin({title:'Buat PIN',sub:msg||'Pilih 6 angka untuk membuka aplikasi',len:PINL,cancel:back,onpin:async p1=>{
    askPin({title:'Ulangi PIN',sub:'Masukkan PIN yang sama',len:PINL,cancel:back,onpin:async p2=>{
      if(p1!==p2){setPinFlow('PIN tidak sama. Coba lagi.');return{ok:true}}
      const s=b64(rnd(12));S.set.pin={s,h:await hashPin(p1,s),l:PINL};S.set.lk=null;save();hideLock();render(false);openSecurity();toast('PIN aktif');return{ok:true};
    }});
    return{ok:true};
  }});
}
function verifyFlow(title,then){
  const back=()=>{hideLock();openSecurity()};
  askPin({title,sub:'Masukkan PIN saat ini',len:pinLen(),cancel:back,onpin:async p=>{const r=await verify(p);if(r.ok){hideLock();then()}return r}});
}
function openSecurity(){
  const on=!!S.set.pin;
  openSheet(`<div class="sheet" role="dialog" aria-modal="true" aria-label="Kunci aplikasi" tabindex="-1" style="--c:var(--p)"><div class="tint"></div><div class="grab"></div>
<div class="sh-top"><div class="sh-t">Kunci aplikasi</div><div class="sh-act"><button class="ib" data-s="close" aria-label="Tutup">${ic('x',18)}</button></div></div>
<p class="mut" style="margin:8px 0 12px;font-size:13px;font-weight:600">${on?'Aplikasi meminta PIN saat dibuka dan saat kembali setelah ditinggalkan. Tampilan di pratinjau multitasking juga disamarkan.':'Pasang PIN 6 angka supaya catatan keuanganmu tidak bisa dibuka orang lain yang memegang HP-mu.'}</p>
${on?`<div class="grp">${BIO_OK||S.set.bio?`<button class="set" data-s="biotog"><span class="si">${ic('face',19)}</span><span class="st">Face ID atau sidik jari<small>${S.set.bio?'Aktif, PIN tetap jadi cadangan':'Mati'}</small></span><span class="tg${S.set.bio?' on':''}"><i></i></span></button>`:''}
<label class="set"><span class="si">${ic('repeat',19)}</span><span class="st">Kunci otomatis<small>Setelah ditinggalkan</small></span><select class="sel" id="lkd" aria-label="Kunci otomatis">${[[0,'Segera'],[60000,'1 menit'],[300000,'5 menit']].map(x=>`<option value="${x[0]}" ${S.set.lkd==x[0]?'selected':''}>${x[1]}</option>`).join('')}</select></label>
<button class="set" data-s="pinchg"><span class="si">${ic('lock',19)}</span><span class="st">Ganti PIN${pinLen()<PINL?'<small>PIN-mu masih 4 angka. Ganti untuk memakai 6 angka</small>':''}</span>${ic('cr',18)}</button>
<button class="set" data-s="pinlock"><span class="si">${ic('eyeoff',19)}</span><span class="st">Kunci sekarang</span>${ic('cr',18)}</button>
<button class="set dng" data-s="pinoff"><span class="si">${ic('x',19)}</span><span class="st">Matikan kunci</span></button></div>`
:`<button class="save" data-s="pinset" style="background-color:var(--p);color:var(--pc)">Atur PIN</button>`}
<p class="hint">PIN hanya mengunci tampilan aplikasi di perangkat ini, datanya tidak dienkripsi. Jika lupa PIN, satu-satunya jalan adalah menghapus semua data, jadi rutin cadangkan datamu.</p></div>`);
}
LK.addEventListener('click',e=>{
  const b=e.target.closest('[data-l]');if(!b||!LKS)return;const v=b.dataset.l;
  if(v=='k')lkKey(b.dataset.k);else if(v=='del')lkKey('del');else if(v=='bio')tryBio();
  else if(v=='cancel'){const c=LKS.o.cancel;c&&c()}
  else if(v=='forgot')forgotUI();else if(v=='back'){LKS=null;showLock()}else if(v=='wipe')wipeAll();
});

/* ---------- Mulai ---------- */
const gn=genRec();
applyAnim();theme();if(S.set.pin)showLock();setTab('home',true);
if(gn)toast(`${gn} transaksi berulang dicatat`);
{ // jalan pintas dari ikon aplikasi: /?add=out atau /?add=in
  const ad=new URLSearchParams(location.search).get('add');
  if(ad){history.replaceState(null,'','/');setTimeout(()=>openTx({ty:ad=='in'?'in':'out'}),REDUCE?0:350)}
}
ntSched();ntCheck();
document.addEventListener('visibilitychange',()=>{if(!document.hidden){ntSched();ntCheck()}});
if('serviceWorker'in navigator){
  const hadCtl=!!navigator.serviceWorker.controller;
  navigator.serviceWorker.addEventListener('message',e=>{if(hadCtl&&e.data&&e.data.type=='sw-updated')toast('Versi baru tersedia',{act:'reload',al:'Muat ulang',ms:15000})});
  navigator.serviceWorker.getRegistrations().then(r=>r.forEach(x=>{const u=(x.active||x.waiting||x.installing||{}).scriptURL||'';if(u.includes('firebase-messaging-sw'))x.unregister()})).catch(()=>{}).finally(()=>navigator.serviceWorker.register('/sw.js',{updateViaCache:'none'}).catch(()=>{}));
}
})();

let SX=null;document.addEventListener('touchstart',e=>{SX=e.target.closest('.kcg')?e.touches[0].clientX:null},{passive:true});
document.addEventListener('touchend',e=>{if(SX==null)return;const dx=e.changedTouches[0].clientX-SX;SX=null;if(Math.abs(dx)>70){const n=madd(mon,dx<0?1:-1);if(n<=curM()){mon=n;render(false)}}},{passive:true});
