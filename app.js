const params=new URLSearchParams(location.search);
const TABS={overview:'總覽',days:'每日行程',flights:'航班',transport:'交通',tickets:'門票',stays:'住宿',notes:'旅途備忘'};
const page=Object.hasOwn(TABS,params.get('page'))?params.get('page'):'overview';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const iso=d=>`${TRIP.year}-${d}`;
const dateObj=d=>new Date(iso(d)+'T12:00:00Z');
const date=d=>d.replace('-','/');
const weekday=d=>'週'+'日一二三四五六'[dateObj(d).getUTCDay()];
const fullDate=d=>`${TRIP.year}年${Number(d.slice(0,2))}月${Number(d.slice(3))}日`;
const dateRange=(a,b)=>`${date(a)}–${date(b)}`;
const pageUrl=(p='overview',hash='')=>`?page=${p}${hash?'#'+hash:''}`;
const pill=s=>`<span class="pill ${s.startsWith('已')?'booked':'pending'}">${esc(s)}</span>`;
const map=s=>`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s)}`;
const alertBox=(title,body)=>`<div class="notice"><strong>${esc(title)}</strong><p>${esc(body)}</p></div>`;
const card=(title,body)=>`<article class="card"><h3>${esc(title)}</h3>${body}</article>`;
const heading=(title,note='')=>`<header class="section-head"><h2>${esc(title)}</h2>${note?`<p>${esc(note)}</p>`:''}</header>`;
const when=d=>/^\d\d-\d\d$/.test(d)?date(d):d;
const PHOTOS={
 philly:{src:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Exterior_of_the_Independence_Hall,_Aug_2019.jpg/960px-Exterior_of_the_Independence_Hall,_Aug_2019.jpg',alt:'藍天下的費城獨立廳，紅磚建築和白色鐘塔',caption:'INDEPENDENCE HALL · PHILADELPHIA'},
 philly2:{src:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Philadelphia_from_South_Street_Bridge_July_2016_panorama_1.jpg/960px-Philadelphia_from_South_Street_Bridge_July_2016_panorama_1.jpg',alt:'從南街橋看費城市中心的高樓和斯庫基爾河',caption:'SCHUYLKILL RIVER · PHILADELPHIA'},
 nyc:{src:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Lower_Manhattan_from_Governors_Island_with_a_fishing_boat_(46294p).jpg/960px-Lower_Manhattan_from_Governors_Island_with_a_fishing_boat_(46294p).jpg',alt:'從總督島看曼哈頓下城的高樓',caption:'LOWER MANHATTAN · NEW YORK'},
 dc:{src:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/United_States_Capitol_-_west_front.jpg/960px-United_States_Capitol_-_west_front.jpg',alt:'藍天下的美國國會大廈西側正面與白色圓頂',caption:'U.S. CAPITOL · WASHINGTON, D.C.'}
};
function placePhoto(key,className='place-photo'){
 const p=PHOTOS[key];return p?`<figure class="${className}"><img src="${p.src}" alt="${esc(p.alt)}" loading="lazy" decoding="async" width="960" height="640"><figcaption>${p.caption}</figcaption></figure>`:'';
}
function splitEvent(s){const i=s.indexOf(' ');return i<0?['',s]:[s.slice(0,i),s.slice(i+1)]}
const DAY_PHOTO={'04-09':'philly','04-12':'nyc','04-21':'dc'};
function dayView(d){
 return `<article class="day-card" id="day-${d[0]}" aria-labelledby="title-${d[0]}"><header><time class="day-stamp" datetime="${iso(d[0])}" aria-label="${esc(fullDate(d[0])+' '+weekday(d[0]))}"><span>${Number(d[0].slice(0,2))} 月</span><strong>${d[0].slice(3)}</strong><span>${weekday(d[0])}</span></time><div class="day-heading"><span class="city">${esc(CITIES[d[1]].name)}</span><h3 id="title-${d[0]}">${esc(d[2])}</h3></div></header>${placePhoto(DAY_PHOTO[d[0]],'day-photo')}<ol class="timeline">${d[3].split('|').map(s=>{const [time,text]=splitEvent(s);return `<li><time>${esc(time)}</time><div>${esc(text)}</div></li>`}).join('')}</ol>${d[4]?`<p class="day-note">${esc(d[4])}</p>`:''}</article>`;
}
function tripCalendar(){
 const dayMs=86400000,utc=s=>Date.parse(`${s}T00:00:00Z`);
 const periods=CHAPTERS.map(c=>({...c,from:iso(c.range[0]),to:iso(c.range[1])}));
 const flightsOn={[iso('04-08')]:'抵達',[iso('04-24')]:'回程',[iso('04-25')]:'到台灣'};
 const dates=Array.from({length:35},(_,i)=>new Date(utc(`${TRIP.year}-03-29`)+i*dayMs).toISOString().slice(0,10));
 const weeks=Array.from({length:5},(_,w)=>{
  const row=dates.slice(w*7,w*7+7);
  const cells=row.map((d,col)=>{
   const stay=periods.find(s=>d>=s.from&&d<=s.to),fly=flightsOn[d],month=Number(d.slice(5,7)),day=Number(d.slice(8));
   const number=month===4?String(day):`${month}/${day}`;
   const note=fly||(stay&&d===stay.from?(stay.key==='rest'?'回費城':'抵達'):'');
   const inner=`<time datetime="${d}" class="calendar-number">${number}</time><span class="calendar-day-note">${esc(note)}</span>`;
   const has=DAYS.some(x=>x[0]===d.slice(5));
   const label=`${month} 月 ${day} 日 · ${stay?stay.title:fly?'飛行':'不在行程中'}`;
   return `<div role="cell" class="calendar-cell ${month!==4?'outside-month':''} ${stay?'in-europe':''}" data-date="${d}" style="grid-column:${col+1}">${has?`<a class="calendar-date" href="${pageUrl('days','day-'+d.slice(5))}" aria-label="${esc(label)}">${inner}</a>`:`<div class="calendar-date" aria-label="${esc(label)}">${inner}</div>`}</div>`;
  }).join('');
  const bands=periods.map(s=>{
   const from=s.from>row[0]?s.from:row[0],to=s.to<row[6]?s.to:row[6];if(from>to)return '';
   const start=row.indexOf(from)+1,span=(utc(to)-utc(from))/dayMs+1;
   return `<span aria-hidden="true" class="calendar-band ${s.key}" style="grid-column:${start} / span ${span}">${esc(s.key==='rest'?'費城':s.title)}</span>`;
  }).join('');
  const planes=row.filter(d=>d===iso('04-08')||d===iso('04-24')).map(d=>`<span aria-hidden="true" class="calendar-flight" style="grid-column:${row.indexOf(d)+1}">✈︎</span>`).join('');
  return `<div role="row" class="calendar-week">${cells}${bands}${planes}</div>`;
 }).join('');
 const periodCards=periods.map(s=>`<a class="calendar-period ${s.key}" href="${pageUrl('days','day-'+s.range[0])}"><h3>${esc(s.title)}</h3><p class="period-dates">${dateRange(s.range[0],s.range[1])}</p><p class="period-count">${(utc(s.to)-utc(s.from))/dayMs+1} 天 · ${s.nights} 晚</p></a>`).join('');
 const heads=['週一','週二','週三','週四','週五','週六','週日'].map(w=>`<span role="columnheader">${w}</span>`).join('');
 const legend=[['philly','費城'],['nyc','紐約'],['rest','回費城休息'],['dc','華盛頓']].map(([k,v])=>`<span><i class="${k}" aria-hidden="true"></i>${v}</span>`).join('');
 return `<section class="travel-calendar" id="trip-calendar" aria-labelledby="trip-calendar-title"><header class="calendar-intro"><div><span class="calendar-kicker">SONIC · 2027</span><h2 id="trip-calendar-title">美國停留日曆</h2></div><p class="calendar-total"><strong>17</strong><span>天<small>共 15 晚</small></span></p></header><div class="calendar-layout"><div class="calendar-month"><div class="calendar-month-head"><h3>2027年4月</h3><span>04/08 抵達 · 04/24 凌晨起飛</span></div><div class="calendar-table" role="table" aria-label="四月行程月曆"><div class="calendar-weekdays" role="row">${heads}</div>${weeks}</div><div class="calendar-legend">${legend}<span><i class="flight-mark" aria-hidden="true">✈︎</i>飛行</span></div></div><aside class="calendar-periods" aria-label="四段行程">${periodCards}</aside></div></section>`;
}
function overview(){return tripCalendar()+heading('旅程章節')+
 `<div class="overview-grid"><div><div class="route-list">${CHAPTERS.map(c=>`<a class="route ${PHOTOS[c.photo]?'has-photo':''}" data-tone="${c.tone}" href="${pageUrl('days','day-'+c.range[0])}">${placePhoto(c.photo,'route-photo')}<div class="route-copy"><div class="route-meta"><span class="route-num">${c.num}</span><small>${dateRange(c.range[0],c.range[1])}</small></div><span class="chapter-name">${esc(CITIES[c.key].en)}</span><h3>${esc(c.title)}</h3><p>${esc(c.sub)}</p><span class="route-action">查看行程</span></div></a>`).join('')}</div></div><aside class="trip-summary"><span class="summary-label">SONIC · 2027</span><h3>費城＋紐約＋華盛頓</h3><dl><div><dt>出發</dt><dd>${fullDate('04-08')}</dd></div><div><dt>返抵</dt><dd>${fullDate('04-25')} · 桃園</dd></div><div><dt>同行</dt><dd>Victoria</dd></div></dl><p>費城住 Victoria 家 5 晚，紐約 7 晚，華盛頓 2 晚。城市之間都搭火車。</p></aside></div>`+
 heading('待安排')+`<div class="grid">${PENDING.map(x=>card(x[0],`<p>${esc(x[1])}</p>`)).join('')}</div><div class="actions"><a class="button" href="${pageUrl('days')}">每日行程</a><a class="button secondary" href="${pageUrl('tickets')}">門票</a></div>`;
}
function itinerary(){return heading('每日行程')+`<div class="itinerary"><aside class="day-picker"><div class="date-label">日期</div><div class="mobile-date-jump"><label for="journey-date">日期</label><select id="journey-date">${DAYS.map(d=>`<option value="${d[0]}">${date(d[0])} (${weekday(d[0])}) · ${esc(CITIES[d[1]].name)}</option>`).join('')}</select></div><div class="date-list" role="navigation" aria-label="行程日期">${DAYS.map(d=>`<a href="#day-${d[0]}" aria-label="${esc(date(d[0])+' '+CITIES[d[1]].name)}"><span>${date(d[0])}</span><span class="date-city">${esc(CITIES[d[1]].name)}</span></a>`).join('')}</div></aside><div class="day-stack">${DAYS.map(dayView).join('')}</div></div>`;}
function flights(){return heading('航班資訊','起降時間為當地時間。')+`<div class="grid flights">${FLIGHTS.map(f=>`<article class="card flight"><div class="flight-top"><span>${fullDate(f.date)}</span><strong>${esc(f.airline)} ${f.code}</strong></div><div class="flight-route"><div><b>${f.from}</b><span>${esc(f.fromName)} · ${esc(f.dep)}</span></div><span class="plane" aria-hidden="true">✈︎</span><div><b>${f.to}</b><span>${esc(f.toName)} · ${esc(f.arr)}</span></div></div><p>${esc(f.note)}</p></article>`).join('')}</div>`+heading('機場接送')+`<div class="grid">${card('04/08 紐約 JFK → 費城','<p>入境、領行李後搭華航接駁車，車程約 2 到 2.5 小時。到費城後 Victoria 叫車接回家，約凌晨 01:00。</p>')}${card('04/23 華盛頓市區 → 杜勒斯機場','<p>19:30 搭 Metro 銀線出發，21:00 前到機場。班機是 04/24 凌晨 01:15，日期不要看錯。</p>')}</div>`;}
function transport(){return heading('城市間交通')+alertBox('04/08 華航接駁車','這班車是否還有、怎麼預約，要向華航確認。')+`<div class="grid">${TRANSPORT.map(x=>card(`${date(x[0])} · ${x[1]}`,`${pill(x[4])}<p class="strong">${esc(x[3])}</p><p>${esc(x[2])}</p><p class="caption">${esc(x[5])}</p><a class="text-link" href="${map(x[2].split(' → ')[0])}" target="_blank" rel="noopener noreferrer">車站地圖</a>`)).join('')}</div>`+heading('市區交通')+`<div class="grid">${LOCAL.map(x=>card(x[0],`<p>${esc(x[1])}</p>`)).join('')}</div>`;}
function tickets(){return heading('門票','照日期排。免費的時段票也會被訂光，開放當天就去訂。')+alertBox('只在官方網站訂','ESTA、自由女神渡輪、Smithsonian 博物館都有很多長得很像的代訂網站，會多收錢。')+`<div class="grid">${TICKETS.map(x=>card(`${when(x[0])} · ${x[1]}`,`${pill(x[3])}<p class="strong">${esc(x[2])}</p>${x[4]?`<p>${esc(x[4])}</p>`:''}`)).join('')}</div>`;}
function stays(){return heading('住宿')+`<div class="grid stays-grid">${STAYS.map(r=>card(r.name,`<p class="caption stay-city">${esc(r.city)}</p><p class="caption">住宿日期</p><div class="stay-meta"><strong>${dateRange(r.start,r.end)}</strong><span>${r.nights} 晚</span></div>${pill(r.status)}${r.note?`<p>${esc(r.note)}</p>`:''}`)).join('')}</div>`;}
function notes(){return heading('旅途備忘','第一次來美國會用到的。')+`<div class="grid">${NOTES.map(n=>card(n[0],`<ul>${n[1].map(s=>`<li>${esc(s)}</li>`).join('')}</ul>`)).join('')}</div>`;}
document.body.dataset.page=page;
document.title=`Sonic｜美國東岸 2027｜${TABS[page]}`;
const nav=document.getElementById('nav');
nav.innerHTML=Object.entries(TABS).map(([k,v])=>`<a href="${pageUrl(k)}" ${page===k?'aria-current="page"':''}>${v}</a>`).join('');
document.getElementById('main').innerHTML=({overview,days:itinerary,flights,transport,tickets,stays,notes}[page])();
document.getElementById('footer-info').innerHTML=`2027 · Sonic 的美東旅行手冊<br>${TRIP.updated.replaceAll('-','.')} 更新 · 當地時間`;
function markDate(day=location.hash.slice(5)){
 const hash=`#day-${day}`;
 document.querySelectorAll('.date-list a').forEach(a=>{if(a.getAttribute('href')===hash)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')});
 const select=document.getElementById('journey-date');if(select&&DAYS.some(d=>d[0]===day))select.value=day;
}
const activeNav=nav.querySelector('[aria-current="page"]');
function revealActiveNav(){if(activeNav)nav.scrollLeft=activeNav.offsetLeft-nav.offsetLeft-(nav.clientWidth-activeNav.offsetWidth)/2}
revealActiveNav();new ResizeObserver(revealActiveNav).observe(nav);
const navShell=document.querySelector('.nav-shell');
function updateNavHeight(){document.documentElement.style.setProperty('--nav-height',`${navShell.getBoundingClientRect().height}px`)}
updateNavHeight();new ResizeObserver(updateNavHeight).observe(navShell);
if(page==='days'){
 const requested=location.hash.startsWith('#day-')?location.hash.slice(5):params.get('day');
 markDate(requested||DAYS[0][0]);
 const dayCards=[...document.querySelectorAll('.day-card')],datePicker=document.querySelector('.day-picker');
 function updateDateHeight(){document.documentElement.style.setProperty('--date-height',`${datePicker.getBoundingClientRect().height}px`)}
 updateDateHeight();new ResizeObserver(updateDateHeight).observe(datePicker);
 if(DAYS.some(d=>d[0]===requested))requestAnimationFrame(()=>document.getElementById(`day-${requested}`).scrollIntoView({block:'start',behavior:'instant'}));
 window.addEventListener('hashchange',()=>markDate());
 document.getElementById('journey-date').addEventListener('change',e=>{const day=e.target.value,hash=`#day-${day}`;if(location.hash!==hash)history.pushState(null,'',hash);document.getElementById(`day-${day}`).scrollIntoView({block:'start',behavior:'instant'});markDate(day)});
 let scrollPending=false;
 function syncVisibleDay(){const offset=parseFloat(getComputedStyle(dayCards[0]).scrollMarginTop)||96;let current=dayCards[0];for(const c of dayCards){if(c.getBoundingClientRect().top<=offset+24)current=c;else break}if(window.scrollY+window.innerHeight>=document.documentElement.scrollHeight-2)current=dayCards.at(-1);markDate(current.id.slice(4));scrollPending=false}
 window.addEventListener('scroll',()=>{if(!scrollPending){scrollPending=true;requestAnimationFrame(syncVisibleDay)}},{passive:true});
}
