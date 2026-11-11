const params=new URLSearchParams(location.search);
const saved=(k,f)=>{try{return localStorage.getItem(k)??f}catch{return f}};
const save=(k,v)=>{try{localStorage.setItem(k,String(v))}catch{}};
const LANGUAGES={'zh-TW':'繁體中文',en:'English'};
const CURRENCIES=['TWD','USD'];
const reqLang=params.get('lang')||saved('useast.language','zh-TW');
const lang=Object.hasOwn(LANGUAGES,reqLang)?reqLang:'zh-TW';
const reqCur=params.get('currency')||saved('useast.currency','TWD');
let currency=CURRENCIES.includes(reqCur)?reqCur:'TWD';
save('useast.language',lang);save('useast.currency',currency);
const zh=lang==='zh-TW';

const UI={
 'zh-TW':{tabs:{overview:'總覽',days:'每日行程',flights:'航班',transport:'交通',tickets:'門票',stays:'住宿',notes:'旅途備忘'},
  skip:'跳到主要內容',wordmark:'美國東岸',journal:'美東旅行誌 / 2027',handbook:'Sonic 的手冊',eyebrow:'2027 年 4 月 · 費城・紐約・華盛頓',h1:['美國','東岸'],owner:'Sonic 的旅行手冊',siteTitle:'Sonic｜美國東岸 2027',
  metaDescription:'Sonic 2027 年 4 月到美國找 Victoria：費城、紐約、華盛頓的每日行程、航班、交通與門票。',coverAlt:'藍天白雲下的曼哈頓下城天際線，前景是港灣和一艘小船',
  language:'語言',currency:'幣別',twd:'台幣',usd:'美元',navigation:'手冊分頁',
  calendarTitle:'美國停留日曆',days:'天',nights:'共 15 晚',monthTitle:'2027年4月',monthNote:'04/08 抵達 · 04/24 凌晨起飛',calendarLabel:'四月行程月曆',weekdays:['週一','週二','週三','週四','週五','週六','週日'],
  arrive:'抵達',backPhilly:'回費城',returnFlight:'回程',inTaiwan:'到台灣',flying:'飛行',outside:'不在行程中',restBand:'費城',restLegend:'回費城休息',periodCount:'{days} 天 · {nights} 晚',fourParts:'四段行程',
  chapters:'旅程章節',viewDays:'查看行程',summaryTitle:'費城＋紐約＋華盛頓',departure:'出發',returnArrival:'返抵',taoyuan:'桃園',together:'同行',summaryNote:'費城住 Victoria 家 5 晚，紐約 7 晚，華盛頓 2 晚。城市之間都搭火車。',
  pending:'待安排',date:'日期',itineraryDates:'行程日期',flightInfo:'航班資訊',localTimes:'起降時間為當地時間。',airportTransfers:'機場接送',
  transfers:[['04/08 紐約 JFK → 費城','入境、領行李後搭華航接駁車，車程約 2 到 2.5 小時。到費城後 Victoria 叫車接回家，約凌晨 01:00。'],['04/23 華盛頓市區 → 杜勒斯機場','19:30 搭 Metro 銀線出發，21:00 前到機場。班機是 04/24 凌晨 01:15，日期不要看錯。']],
  intercity:'城市間交通',shuttleTitle:'04/08 華航接駁車',shuttleNote:'這班車是否還有、怎麼預約，要向華航確認。',stationMap:'車站地圖',localTransport:'市區交通',
  ticketsNote:'照日期排。免費的時段票也會被訂光，開放當天就去訂。',officialTitle:'只在官方網站訂',officialNote:'ESTA、自由女神渡輪、Smithsonian 博物館都有很多長得很像的代訂網站，會多收錢。',
  stayDates:'住宿日期',nightsCount:'{count} 晚',notesNote:'第一次來美國會用到的。',
  footerTitle:'2027 · Sonic 的美東旅行手冊',updated:'{date} 更新 · 當地時間',rateLine:'參考匯率：1 美元 ≈ NT${rate}（{date}），金額為換算後的約略數字。',rateUsd:'金額以美元顯示。',approx:'約 ',
  photoCredits:'影像來源',credits:['曼哈頓下城：','獨立廳：','費城天際線：','國會大廈：'],publicDomain:'公有領域',photoCrop:'照片依版面裁切顯示。',
  photoAlt:{philly:'藍天下的費城獨立廳，紅磚建築和白色鐘塔',philly2:'從南街橋看費城市中心的高樓和斯庫基爾河',nyc:'從總督島看曼哈頓下城的高樓',dc:'藍天下的美國國會大廈西側正面與白色圓頂'}},
 en:{tabs:{overview:'Overview',days:'Daily plan',flights:'Flights',transport:'Transport',tickets:'Tickets',stays:'Stays',notes:'Notes'},
  skip:'Skip to main content',wordmark:'US East Coast',journal:'EAST COAST JOURNAL / 2027',handbook:"Sonic's handbook",eyebrow:'APRIL 2027 · PHILADELPHIA · NEW YORK · WASHINGTON',h1:['US East','Coast'],owner:"Sonic's travel handbook",siteTitle:'Sonic | US East Coast 2027',
  metaDescription:"Sonic's April 2027 trip to visit Victoria in the US: daily plans, flights, transport and tickets for Philadelphia, New York and Washington.",coverAlt:'Lower Manhattan skyline under a blue sky with white clouds, with the harbour and a small boat in front',
  language:'Language',currency:'Currency',twd:'NT dollar',usd:'US dollar',navigation:'Handbook sections',
  calendarTitle:'Days in the US',days:'days',nights:'15 nights',monthTitle:'April 2027',monthNote:'Arrive Apr 8 · depart early Apr 24',calendarLabel:'April trip calendar',weekdays:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
  arrive:'Arrive',backPhilly:'Back',returnFlight:'Depart',inTaiwan:'Taiwan',flying:'Flight',outside:'Not on the trip',restBand:'Philadelphia',restLegend:'Rest in Philadelphia',periodCount:'{days} days · {nights} nights',fourParts:'Four parts',
  chapters:'Chapters',viewDays:'See the days',summaryTitle:'Philadelphia + New York + Washington',departure:'Departure',returnArrival:'Return',taoyuan:'Taoyuan',together:'With',summaryNote:"Five nights at Victoria's in Philadelphia, seven in New York, two in Washington. All by train between cities.",
  pending:'Still to arrange',date:'Date',itineraryDates:'Trip dates',flightInfo:'Flights',localTimes:'All times are local.',airportTransfers:'Airport transfers',
  transfers:null,
  intercity:'Between cities',shuttleTitle:'Apr 8 China Airlines shuttle',shuttleNote:'Check with China Airlines that this shuttle still runs and how to reserve it.',stationMap:'Station map',localTransport:'Getting around',
  ticketsNote:'In date order. Free timed passes run out too, so book on the day they open.',officialTitle:'Book only on official sites',officialNote:'ESTA, the Statue of Liberty ferry and the Smithsonian museums all have look-alike reseller sites that charge extra.',
  stayDates:'Dates',nightsCount:'{count} nights',notesNote:'Useful for a first trip to the US.',
  footerTitle:"2027 · Sonic's US East Coast handbook",updated:'Updated {date} · local times',rateLine:'Reference rate: US$1 ≈ NT${rate} ({date}). Amounts are approximate conversions.',rateUsd:'Amounts are shown in US dollars.',approx:'about ',
  photoCredits:'Photo credits',credits:['Lower Manhattan: ','Independence Hall: ','Philadelphia skyline: ','US Capitol: '],publicDomain:'public domain',photoCrop:'Photos are cropped to fit the layout.',
  photoAlt:{philly:'Independence Hall in Philadelphia under a blue sky: red brick with a white clock tower',philly2:'Center City Philadelphia towers and the Schuylkill River from the South Street Bridge',nyc:'Lower Manhattan towers seen from Governors Island',dc:'The west front of the US Capitol and its white dome under a blue sky'}}
}[lang];
const t=(k,v={})=>String(UI[k]??k).replace(/\{(\w+)\}/g,(m,x)=>v[x]??m);

// 資料：中文在 data.js，英文在 data-en.js
const D=zh?{CITIES,DAYS,FLIGHTS,TRANSPORT,LOCAL,TICKETS,STAYS,NOTES,PENDING}:EN;
const chapterText=c=>zh?c:{...c,...EN.CHAPTERS[c.key]};
const TRANSFERS=zh?UI.transfers:EN.TRANSFERS;

// 匯率：內建一筆參考值，連得上網就更新
const RATE_SNAPSHOT={rate:31.906,date:'2026-10-11'};
function storedRate(){try{const r=JSON.parse(saved('useast.rate','null'));if(r&&Number.isFinite(r.rate)&&r.rate>0&&/^\d{4}-\d{2}-\d{2}$/.test(r.date))return r}catch{}return RATE_SNAPSHOT}
let rate=storedRate();
async function fetchRate(){
 const c=new AbortController(),timer=setTimeout(()=>c.abort(),8000);
 try{
  const res=await fetch('https://api.frankfurter.dev/v2/rates?base=USD&quotes=TWD',{credentials:'omit',referrerPolicy:'no-referrer',signal:c.signal});
  if(!res.ok)return null;
  const row=(await res.json()).find(r=>r&&r.base==='USD'&&r.quote==='TWD');
  if(!row||!Number.isFinite(row.rate)||row.rate<=0||!/^\d{4}-\d{2}-\d{2}$/.test(row.date))return null;
  const fresh={rate:row.rate,date:row.date};save('useast.rate',JSON.stringify(fresh));return fresh;
 }catch{return null}finally{clearTimeout(timer)}
}
const nf=n=>new Intl.NumberFormat('en-US',{maximumFractionDigits:2}).format(n);
function toTwd(n){const v=n*rate.rate;return v<200?Math.round(v):v<2000?Math.round(v/5)*5:Math.round(v/10)*10}
function money(token){
 const parts=token.split('-').map(Number);
 if(currency==='USD')return 'US$'+parts.map(nf).join('–');
 return t('approx')+'NT$'+parts.map(n=>nf(toTwd(n))).join('–');
}
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const tx=s=>esc(s).replace(/\{\{([\d.]+(?:-[\d.]+)?)\}\}/g,(m,a)=>money(a));

const page=Object.hasOwn(UI.tabs,params.get('page'))?params.get('page'):'overview';
const iso=d=>`${TRIP.year}-${d}`;
const dateObj=d=>new Date(iso(d)+'T12:00:00Z');
const intl=(d,o)=>new Intl.DateTimeFormat('en-US',{timeZone:'UTC',...o}).format(dateObj(d));
const date=d=>zh?d.replace('-','/'):intl(d,{month:'short',day:'numeric'});
const weekday=d=>zh?'週'+'日一二三四五六'[dateObj(d).getUTCDay()]:intl(d,{weekday:'short'});
const fullDate=d=>zh?`${TRIP.year}年${Number(d.slice(0,2))}月${Number(d.slice(3))}日`:intl(d,{year:'numeric',month:'short',day:'numeric'});
const monthLabel=d=>zh?`${Number(d.slice(0,2))} 月`:intl(d,{month:'short'});
const dateRange=(a,b)=>`${date(a)}–${zh||a.slice(0,2)!==b.slice(0,2)?date(b):Number(b.slice(3))}`;
const pageUrl=(p='overview',hash='')=>`?${new URLSearchParams({page:p,lang,currency})}${hash?'#'+hash:''}`;
const pill=s=>`<span class="pill ${/^(已|Confirmed|Booked)/.test(s)?'booked':'pending'}">${esc(s)}</span>`;
const map=s=>`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s)}`;
const alertBox=(title,body)=>`<div class="notice"><strong>${esc(title)}</strong><p>${tx(body)}</p></div>`;
const card=(title,body)=>`<article class="card"><h3>${esc(title)}</h3>${body}</article>`;
const heading=(title,note='')=>`<header class="section-head"><h2>${esc(title)}</h2>${note?`<p>${esc(note)}</p>`:''}</header>`;
const when=d=>/^\d\d-\d\d$/.test(d)?date(d):d;
const W='https://upload.wikimedia.org/wikipedia/commons/thumb/';
const PHOTOS={
 philly:{src:W+'9/9f/Exterior_of_the_Independence_Hall,_Aug_2019.jpg/960px-Exterior_of_the_Independence_Hall,_Aug_2019.jpg',caption:'INDEPENDENCE HALL · PHILADELPHIA'},
 philly2:{src:W+'3/3d/Philadelphia_from_South_Street_Bridge_July_2016_panorama_1.jpg/960px-Philadelphia_from_South_Street_Bridge_July_2016_panorama_1.jpg',caption:'SCHUYLKILL RIVER · PHILADELPHIA'},
 nyc:{src:W+'3/38/Lower_Manhattan_from_Governors_Island_with_a_fishing_boat_(46294p).jpg/960px-Lower_Manhattan_from_Governors_Island_with_a_fishing_boat_(46294p).jpg',caption:'LOWER MANHATTAN · NEW YORK'},
 dc:{src:W+'b/b2/United_States_Capitol_-_west_front.jpg/960px-United_States_Capitol_-_west_front.jpg',caption:'U.S. CAPITOL · WASHINGTON, D.C.'}
};
function placePhoto(key,className='place-photo'){
 const p=PHOTOS[key];return p?`<figure class="${className}"><img src="${p.src}" alt="${esc(UI.photoAlt[key])}" loading="lazy" decoding="async" width="960" height="640"><figcaption>${p.caption}</figcaption></figure>`:'';
}
function splitEvent(s){const i=s.indexOf(' ');return i<0?['',s]:[s.slice(0,i),s.slice(i+1)]}
const DAY_PHOTO={'04-09':'philly','04-12':'nyc','04-21':'dc'};
function dayView(d){
 return `<article class="day-card" id="day-${d[0]}" aria-labelledby="title-${d[0]}"><header><time class="day-stamp" datetime="${iso(d[0])}" aria-label="${esc(fullDate(d[0])+' '+weekday(d[0]))}"><span>${monthLabel(d[0])}</span><strong>${d[0].slice(3)}</strong><span>${weekday(d[0])}</span></time><div class="day-heading"><span class="city">${esc(D.CITIES[d[1]].name)}</span><h3 id="title-${d[0]}">${esc(d[2])}</h3></div></header>${placePhoto(DAY_PHOTO[d[0]],'day-photo')}<ol class="timeline">${d[3].split('|').map(s=>{const [time,text]=splitEvent(s);return `<li><time>${esc(time)}</time><div>${tx(text)}</div></li>`}).join('')}</ol>${d[4]?`<p class="day-note">${tx(d[4])}</p>`:''}</article>`;
}
function tripCalendar(){
 const dayMs=86400000,utc=s=>Date.parse(`${s}T00:00:00Z`);
 const periods=CHAPTERS.map(chapterText).map(c=>({...c,from:iso(c.range[0]),to:iso(c.range[1])}));
 const flightsOn={[iso('04-08')]:t('arrive'),[iso('04-24')]:t('returnFlight'),[iso('04-25')]:t('inTaiwan')};
 const dates=Array.from({length:35},(_,i)=>new Date(utc(`${TRIP.year}-03-29`)+i*dayMs).toISOString().slice(0,10));
 const weeks=Array.from({length:5},(_,w)=>{
  const row=dates.slice(w*7,w*7+7);
  const cells=row.map((d,col)=>{
   const stay=periods.find(s=>d>=s.from&&d<=s.to),fly=flightsOn[d],month=Number(d.slice(5,7)),day=Number(d.slice(8));
   const number=month===4?String(day):`${month}/${day}`;
   const note=fly||(stay&&d===stay.from?(stay.key==='rest'?t('backPhilly'):t('arrive')):'');
   const inner=`<time datetime="${d}" class="calendar-number">${number}</time><span class="calendar-day-note">${esc(note)}</span>`;
   const has=DAYS.some(x=>x[0]===d.slice(5));
   const label=`${fullDate(d.slice(5))} · ${stay?stay.title:fly?t('flying'):t('outside')}`;
   return `<div role="cell" class="calendar-cell ${month!==4?'outside-month':''} ${stay?'in-europe':''}" data-date="${d}" style="grid-column:${col+1}">${has?`<a class="calendar-date" href="${pageUrl('days','day-'+d.slice(5))}" aria-label="${esc(label)}">${inner}</a>`:`<div class="calendar-date" aria-label="${esc(label)}">${inner}</div>`}</div>`;
  }).join('');
  const bands=periods.map(s=>{
   const from=s.from>row[0]?s.from:row[0],to=s.to<row[6]?s.to:row[6];if(from>to)return '';
   const start=row.indexOf(from)+1,span=(utc(to)-utc(from))/dayMs+1;
   return `<span aria-hidden="true" class="calendar-band ${s.key}" style="grid-column:${start} / span ${span}">${esc(s.key==='rest'?t('restBand'):s.title)}</span>`;
  }).join('');
  const planes=row.filter(d=>d===iso('04-08')||d===iso('04-24')).map(d=>`<span aria-hidden="true" class="calendar-flight" style="grid-column:${row.indexOf(d)+1}">✈︎</span>`).join('');
  return `<div role="row" class="calendar-week">${cells}${bands}${planes}</div>`;
 }).join('');
 const periodCards=periods.map(s=>`<a class="calendar-period ${s.key}" href="${pageUrl('days','day-'+s.range[0])}"><h3>${esc(s.title)}</h3><p class="period-dates">${dateRange(s.range[0],s.range[1])}</p><p class="period-count">${t('periodCount',{days:(utc(s.to)-utc(s.from))/dayMs+1,nights:s.nights})}</p></a>`).join('');
 const heads=UI.weekdays.map(w=>`<span role="columnheader">${w}</span>`).join('');
 const legend=periods.map(s=>`<span><i class="${s.key}" aria-hidden="true"></i>${esc(s.key==='rest'?t('restLegend'):s.title)}</span>`).join('');
 return `<section class="travel-calendar" id="trip-calendar" aria-labelledby="trip-calendar-title"><header class="calendar-intro"><div><span class="calendar-kicker">SONIC · 2027</span><h2 id="trip-calendar-title">${esc(t('calendarTitle'))}</h2></div><p class="calendar-total"><strong>17</strong><span>${esc(t('days'))}<small>${esc(t('nights'))}</small></span></p></header><div class="calendar-layout"><div class="calendar-month"><div class="calendar-month-head"><h3>${esc(t('monthTitle'))}</h3><span>${esc(t('monthNote'))}</span></div><div class="calendar-table" role="table" aria-label="${esc(t('calendarLabel'))}"><div class="calendar-weekdays" role="row">${heads}</div>${weeks}</div><div class="calendar-legend">${legend}<span><i class="flight-mark" aria-hidden="true">✈︎</i>${esc(t('flying'))}</span></div></div><aside class="calendar-periods" aria-label="${esc(t('fourParts'))}">${periodCards}</aside></div></section>`;
}
function overview(){return tripCalendar()+heading(t('chapters'))+
 `<div class="overview-grid"><div><div class="route-list">${CHAPTERS.map(chapterText).map(c=>`<a class="route ${PHOTOS[c.photo]?'has-photo':''}" data-tone="${c.tone}" href="${pageUrl('days','day-'+c.range[0])}">${placePhoto(c.photo,'route-photo')}<div class="route-copy"><div class="route-meta"><span class="route-num">${c.num}</span><small>${dateRange(c.range[0],c.range[1])}</small></div><span class="chapter-name">${esc(D.CITIES[c.key].en)}</span><h3>${esc(c.title)}</h3><p>${esc(c.sub)}</p><span class="route-action">${esc(t('viewDays'))}</span></div></a>`).join('')}</div></div><aside class="trip-summary"><span class="summary-label">SONIC · 2027</span><h3>${esc(t('summaryTitle'))}</h3><dl><div><dt>${esc(t('departure'))}</dt><dd>${fullDate('04-08')}</dd></div><div><dt>${esc(t('returnArrival'))}</dt><dd>${fullDate('04-25')} · ${esc(t('taoyuan'))}</dd></div><div><dt>${esc(t('together'))}</dt><dd>Victoria</dd></div></dl><p>${esc(t('summaryNote'))}</p></aside></div>`+
 heading(t('pending'))+`<div class="grid">${D.PENDING.map(x=>card(x[0],`<p>${tx(x[1])}</p>`)).join('')}</div><div class="actions"><a class="button" href="${pageUrl('days')}">${esc(UI.tabs.days)}</a><a class="button secondary" href="${pageUrl('tickets')}">${esc(UI.tabs.tickets)}</a></div>`;
}
function itinerary(){return heading(UI.tabs.days)+`<div class="itinerary"><aside class="day-picker"><div class="date-label">${esc(t('date'))}</div><div class="mobile-date-jump"><label for="journey-date">${esc(t('date'))}</label><select id="journey-date">${D.DAYS.map(d=>`<option value="${d[0]}">${date(d[0])} (${weekday(d[0])}) · ${esc(D.CITIES[d[1]].name)}</option>`).join('')}</select></div><div class="date-list" role="navigation" aria-label="${esc(t('itineraryDates'))}">${D.DAYS.map(d=>`<a href="#day-${d[0]}" aria-label="${esc(date(d[0])+' '+D.CITIES[d[1]].name)}"><span>${date(d[0])}</span><span class="date-city">${esc(D.CITIES[d[1]].name)}</span></a>`).join('')}</div></aside><div class="day-stack">${D.DAYS.map(dayView).join('')}</div></div>`;}
function flights(){return heading(t('flightInfo'),t('localTimes'))+`<div class="grid flights">${D.FLIGHTS.map(f=>`<article class="card flight"><div class="flight-top"><span>${fullDate(f.date)}</span><strong>${esc(f.airline)} ${f.code}</strong></div><div class="flight-route"><div><b>${f.from}</b><span>${esc(f.fromName)} · ${esc(f.dep)}</span></div><span class="plane" aria-hidden="true">✈︎</span><div><b>${f.to}</b><span>${esc(f.toName)} · ${esc(f.arr)}</span></div></div><p>${tx(f.note)}</p></article>`).join('')}</div>`+heading(t('airportTransfers'))+`<div class="grid">${TRANSFERS.map(x=>card(x[0],`<p>${tx(x[1])}</p>`)).join('')}</div>`;}
function transport(){return heading(t('intercity'))+alertBox(t('shuttleTitle'),t('shuttleNote'))+`<div class="grid">${D.TRANSPORT.map(x=>card(`${date(x[0])} · ${x[1]}`,`${pill(x[4])}<p class="strong">${esc(x[3])}</p><p>${esc(x[2])}</p><p class="caption">${tx(x[5])}</p><a class="text-link" href="${map(x[2].split(' → ')[0])}" target="_blank" rel="noopener noreferrer">${esc(t('stationMap'))}</a>`)).join('')}</div>`+heading(t('localTransport'))+`<div class="grid">${D.LOCAL.map(x=>card(x[0],`<p>${tx(x[1])}</p>`)).join('')}</div>`;}
function tickets(){return heading(UI.tabs.tickets,t('ticketsNote'))+alertBox(t('officialTitle'),t('officialNote'))+`<div class="grid">${D.TICKETS.map(x=>card(`${when(x[0])} · ${x[1]}`,`${pill(x[3])}<p class="strong">${tx(x[2])}</p>${x[4]?`<p>${tx(x[4])}</p>`:''}`)).join('')}</div>`;}
function stays(){return heading(UI.tabs.stays)+`<div class="grid stays-grid">${D.STAYS.map(r=>card(r.name,`<p class="caption stay-city">${esc(r.city)}</p><p class="caption">${esc(t('stayDates'))}</p><div class="stay-meta"><strong>${dateRange(r.start,r.end)}</strong><span>${t('nightsCount',{count:r.nights})}</span></div>${pill(r.status)}${r.note?`<p>${tx(r.note)}</p>`:''}`)).join('')}</div>`;}
function notes(){return heading(UI.tabs.notes,t('notesNote'))+`<div class="grid">${D.NOTES.map(n=>card(n[0],`<ul>${n[1].map(s=>`<li>${tx(s)}</li>`).join('')}</ul>`)).join('')}</div>`;}
const VIEWS={overview,days:itinerary,flights,transport,tickets,stays,notes};
function renderFooter(){
 const rateText=currency==='TWD'?t('rateLine',{rate:rate.rate.toFixed(2),date:rate.date}):t('rateUsd');
 document.getElementById('footer-info').innerHTML=`${esc(t('footerTitle'))}<br>${esc(t('updated',{date:zh?TRIP.updated.replaceAll('-','.'):new Intl.DateTimeFormat('en-US',{timeZone:'UTC',year:'numeric',month:'short',day:'numeric'}).format(new Date(TRIP.updated+'T12:00:00Z'))}))}<br>${esc(rateText)}`;
}
function renderMain(){document.getElementById('main').innerHTML=VIEWS[page]();renderFooter()}
function renderShell(){
 document.documentElement.lang=zh?'zh-Hant':'en';
 document.body.dataset.lang=lang;document.body.dataset.page=page;
 document.title=`${t('siteTitle')}${zh?'｜':' | '}${UI.tabs[page]}`;
 document.querySelector('meta[name="description"]').content=t('metaDescription');
 document.querySelector('.skip').textContent=t('skip');
 const wordmark=document.querySelector('.wordmark');wordmark.href=pageUrl();wordmark.innerHTML=`${esc(t('wordmark'))}<span>${esc(t('journal'))}</span>`;
 const hb=document.querySelector('.person-links a');hb.textContent=t('handbook');hb.href=pageUrl();
 document.querySelector('.masthead .eyebrow').textContent=t('eyebrow');
 document.querySelector('.masthead h1').innerHTML=UI.h1.map(s=>`<span>${esc(s)}</span>`).join('');
 document.querySelector('.cover-owner').textContent=t('owner');
 document.querySelector('.masthead img').alt=t('coverAlt');
 document.getElementById('trip-dates').innerHTML=`<span>${dateRange('04-08','04-25')}</span>`;
 document.getElementById('preferences').innerHTML=`<label for="language-select">${esc(t('language'))}<select id="language-select">${Object.entries(LANGUAGES).map(([c,l])=>`<option value="${c}" ${c===lang?'selected':''}>${l}</option>`).join('')}</select></label><label for="currency-select">${esc(t('currency'))}<select id="currency-select">${CURRENCIES.map(c=>`<option value="${c}" ${c===currency?'selected':''}>${c} · ${esc(t(c.toLowerCase()))}</option>`).join('')}</select></label>`;
 const nav=document.getElementById('nav');nav.setAttribute('aria-label',t('navigation'));
 nav.innerHTML=Object.entries(UI.tabs).map(([k,v])=>`<a href="${pageUrl(k)}" ${page===k?'aria-current="page"':''}>${esc(v)}</a>`).join('');
 document.querySelector('.credits summary').textContent=t('photoCredits');
 document.querySelectorAll('.credits [data-credit]').forEach((el,i)=>el.textContent=UI.credits[i]);
 document.getElementById('credit-pd').textContent=t('publicDomain');
 document.getElementById('credit-crop').textContent=t('photoCrop');
 renderMain();
 document.getElementById('language-select').addEventListener('change',e=>{save('useast.language',e.target.value);const next=new URL(location.href);next.searchParams.set('lang',e.target.value);next.searchParams.set('currency',currency);location.assign(next.href)});
 document.getElementById('currency-select').addEventListener('change',e=>{save('useast.currency',e.target.value);const next=new URL(location.href);next.searchParams.set('currency',e.target.value);next.searchParams.set('lang',lang);location.assign(next.href)});
}
renderShell();
fetchRate().then(fresh=>{if(fresh&&(fresh.rate!==rate.rate||fresh.date!==rate.date)){rate=fresh;if(currency==='TWD'){const y=scrollY;renderMain();if(page==='days')initDays(false);scrollTo(0,y)}}});
function markDate(day=location.hash.slice(5)){
 const hash=`#day-${day}`;
 document.querySelectorAll('.date-list a').forEach(a=>{if(a.getAttribute('href')===hash)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')});
 const select=document.getElementById('journey-date');if(select&&DAYS.some(d=>d[0]===day))select.value=day;
}
const nav=document.getElementById('nav'),activeNav=nav.querySelector('[aria-current="page"]');
function revealActiveNav(){if(activeNav)nav.scrollLeft=activeNav.offsetLeft-nav.offsetLeft-(nav.clientWidth-activeNav.offsetWidth)/2}
revealActiveNav();new ResizeObserver(revealActiveNav).observe(nav);
const navShell=document.querySelector('.nav-shell');
function updateNavHeight(){document.documentElement.style.setProperty('--nav-height',`${navShell.getBoundingClientRect().height}px`)}
updateNavHeight();new ResizeObserver(updateNavHeight).observe(navShell);
let dayCards=[];
function initDays(first=true){
 const requested=location.hash.startsWith('#day-')?location.hash.slice(5):params.get('day');
 markDate(requested||DAYS[0][0]);
 dayCards=[...document.querySelectorAll('.day-card')];
 const datePicker=document.querySelector('.day-picker');
 const updateDateHeight=()=>document.documentElement.style.setProperty('--date-height',`${datePicker.getBoundingClientRect().height}px`);
 updateDateHeight();new ResizeObserver(updateDateHeight).observe(datePicker);
 if(first&&DAYS.some(d=>d[0]===requested))requestAnimationFrame(()=>document.getElementById(`day-${requested}`).scrollIntoView({block:'start',behavior:'instant'}));
 document.getElementById('journey-date').addEventListener('change',e=>{const day=e.target.value,hash=`#day-${day}`;if(location.hash!==hash)history.pushState(null,'',hash);document.getElementById(`day-${day}`).scrollIntoView({block:'start',behavior:'instant'});markDate(day)});
}
if(page==='days'){
 initDays();
 window.addEventListener('hashchange',()=>markDate());
 let scrollPending=false;
 function syncVisibleDay(){const offset=parseFloat(getComputedStyle(dayCards[0]).scrollMarginTop)||96;let current=dayCards[0];for(const c of dayCards){if(c.getBoundingClientRect().top<=offset+24)current=c;else break}if(window.scrollY+window.innerHeight>=document.documentElement.scrollHeight-2)current=dayCards.at(-1);markDate(current.id.slice(4));scrollPending=false}
 window.addEventListener('scroll',()=>{if(!scrollPending){scrollPending=true;requestAnimationFrame(syncVisibleDay)}},{passive:true});
}
