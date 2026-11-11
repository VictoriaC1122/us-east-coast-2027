const params = new URLSearchParams(location.search);
const TABS = {overview: '總覽', days: '每日行程', flights: '航班', transport: '交通', tickets: '要先訂的', stays: '住宿', notes: '注意事項'};
const page = Object.hasOwn(TABS, params.get('page')) ? params.get('page') : 'overview';
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
const iso = d => `${TRIP.year}-${d}`;
const dateObj = d => new Date(iso(d) + 'T12:00:00Z');
const md = d => `${Number(d.slice(0, 2))}/${Number(d.slice(3))}`;
const wd = d => '日一二三四五六'[dateObj(d).getUTCDay()];
const pageUrl = (p, hash = '') => `?page=${p}${hash ? '#' + hash : ''}`;
const heading = (title, note = '') => `<header class="section-head"><h2>${esc(title)}</h2>${note ? `<p>${esc(note)}</p>` : ''}</header>`;
const card = (title, body) => `<article class="card"><h3>${esc(title)}</h3>${body}</article>`;
const pill = s => `<span class="pill ${s.startsWith('已') ? 'booked' : ''}">${esc(s)}</span>`;
const mapUrl = s => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s)}`;
const dayOf = d => DAYS.find(x => x[0] === d);
const label = d => /^\d\d-\d\d$/.test(d) ? `${md(d)}（${wd(d)}）` : d;

function calendar() {
  const first = Date.UTC(TRIP.year, 2, 28), cells = [];
  for (let i = 0; i < 35; i++) {
    const t = new Date(first + i * 86400000), m = String(t.getUTCMonth() + 1).padStart(2, '0'), dd = String(t.getUTCDate()).padStart(2, '0');
    const key = `${m}-${dd}`, day = dayOf(key), num = m === '04' ? t.getUTCDate() : `${t.getUTCMonth() + 1}/${t.getUTCDate()}`;
    if (day) {
      const tag = day[1] === 'flight' ? '✈︎' : CITIES[day[1]].name;
      cells.push(`<a class="cal-cell on" data-tone="${day[1]}" href="${pageUrl('days', 'day-' + key)}" aria-label="${esc(`${md(key)} 星期${wd(key)} ${CITIES[day[1]].name}：${day[2]}`)}"><b>${num}</b><small>${esc(tag)}</small></a>`);
    } else cells.push(`<div class="cal-cell ${m === '04' ? '' : 'out'}"><b>${num}</b><small></small></div>`);
  }
  const legend = [['philly', '費城'], ['nyc', '紐約'], ['rest', '回費城休息'], ['dc', '華盛頓'], ['flight', '飛行']].map(([k, v]) => `<span data-tone="${k}"><i></i>${v}</span>`).join('');
  return `<section class="calendar" aria-labelledby="cal-title"><div class="calendar-head"><h2 id="cal-title">2027 年 4 月</h2><p>在美國 17 天，點日期看當天行程</p></div><div class="cal-grid">${[...'日一二三四五六'].map(w => `<span class="cal-wd">${w}</span>`).join('')}${cells.join('')}</div><div class="legend">${legend}</div></section>`;
}

function overview() {
  const pending = TICKETS.filter(x => !x[3].startsWith('已')).slice(0, 6);
  return calendar() +
    `<dl class="summary"><div><dt>去程</dt><dd>4/8 CI12</dd></div><div><dt>回程</dt><dd>4/24 BR3</dd></div><div><dt>城市</dt><dd>3 個</dd></div><div><dt>搭火車</dt><dd>3 段</dd></div></dl>` +
    heading('四段行程') +
    `<div class="route-list">${CHAPTERS.map(c => `<a class="route" data-tone="${c.tone}" href="${pageUrl('days', 'day-' + c.range[0])}"><span class="bullet">${c.num}</span><div><small>${md(c.range[0])} – ${md(c.range[1])}</small><h3>${esc(c.title)}</h3><span class="sub">${esc(c.sub)}</span><p>${esc(c.text)}</p></div></a>`).join('')}</div>` +
    heading('先處理這幾件', '有開放日期的票要記得那天去訂。') +
    `<ol class="todo">${pending.map(x => `<li><time>${esc(label(x[0]))}</time><div><strong>${esc(x[1])}</strong>：${esc(x[4] || x[2])}</div></li>`).join('')}</ol>` +
    `<div class="actions"><a class="button" href="${pageUrl('days')}">看每日行程</a><a class="button secondary" href="${pageUrl('tickets')}">全部要先訂的</a></div>`;
}

function splitEvent(s) {
  const i = s.indexOf(' ');
  return i < 0 ? ['', s] : [s.slice(0, i), s.slice(i + 1)];
}
function dayView(d) {
  const c = CITIES[d[1]];
  return `<article class="day-card" data-tone="${d[1]}" id="day-${d[0]}" aria-labelledby="t-${d[0]}"><header><span class="bullet" aria-hidden="true">${Number(d[0].slice(3))}</span><div class="day-heading"><span class="day-meta"><time datetime="${iso(d[0])}">${md(d[0])} 星期${wd(d[0])}</time> · ${esc(c.name)} ${c.en}</span><h3 id="t-${d[0]}">${esc(d[2])}</h3></div></header><ol class="timeline">${d[3].split('|').map(s => { const [time, text] = splitEvent(s); return `<li><time>${esc(time)}</time><div>${esc(text)}</div></li>`; }).join('')}</ol>${d[4] ? `<p class="day-note">${esc(d[4])}</p>` : ''}</article>`;
}
function itinerary() {
  return heading('每日行程', '時間是抓個大概，當天看體力和天氣調整。') +
    `<div class="itinerary"><aside class="day-picker"><div class="mobile-date-jump"><label for="jump">選日期</label><select id="jump">${DAYS.map(d => `<option value="${d[0]}">${md(d[0])}（${wd(d[0])}）${esc(CITIES[d[1]].name)}｜${esc(d[2])}</option>`).join('')}</select></div><nav class="date-list" aria-label="行程日期">${DAYS.map(d => `<a data-tone="${d[1]}" href="#day-${d[0]}"><span>${md(d[0])}（${wd(d[0])}）<em>${esc(CITIES[d[1]].name)}</em></span></a>`).join('')}</nav></aside><div class="day-stack">${DAYS.map(dayView).join('')}</div></div>`;
}

function flights() {
  return heading('航班', '起降時間都是當地時間。') +
    `<div class="grid">${FLIGHTS.map(f => `<article class="card flight"><div class="flight-top"><span>${md(f.date)}（${wd(f.date)}）· ${esc(f.airline)}</span><strong>${f.code}</strong></div><div class="flight-route"><div><b>${f.from}</b><span>${esc(f.fromName)}</span><em>${esc(f.dep)}</em></div><span class="plane" aria-hidden="true">✈︎</span><div><b>${f.to}</b><span>${esc(f.toName)}</span><em>${esc(f.arr)}</em></div></div><p>${esc(f.note)}</p></article>`).join('')}</div>` +
    heading('到機場之前') +
    `<div class="grid">${card('去程 4/8', '<ul><li>ESTA 要先申請好。</li><li>華航接駁車先預約。</li><li>把 Victoria 家的地址和回程電子機票存在手機。</li></ul>')}${card('回程 4/23 晚上', '<ul><li>19:30 從華盛頓市區出發，21:00 前到杜勒斯機場。</li><li>班機是 4/24 凌晨 01:15，日期不要看錯。</li><li>台灣時間 4/25 清晨 05:50 到桃園。</li></ul>')}</div>`;
}

function transport() {
  return heading('城市之間') +
    `<div class="grid">${TRANSPORT.map(x => card(`${md(x[0])}（${wd(x[0])}）${x[1]}`, `${pill(x[4])}<p class="strong">${esc(x[3])}</p><p>${esc(x[2])}</p><p>${esc(x[5])}</p><a class="text-link" href="${mapUrl(x[2].split(' → ')[0])}" target="_blank" rel="noopener noreferrer">出發地點地圖</a>`)).join('')}</div>` +
    heading('市區裡') + `<div class="grid">${LOCAL.map(x => card(x[0], `<p>${esc(x[1])}</p>`)).join('')}</div>`;
}

function tickets() {
  return heading('要先訂的', '照日期排。免費的時段票也會被訂光，開放當天就去訂。') +
    `<div class="notice"><strong>只在官方網站訂</strong><p>ESTA、自由女神渡輪、Smithsonian 博物館都有很多長得很像的代訂網站，會多收錢。</p></div>` +
    `<div class="grid">${TICKETS.map(x => card(`${label(x[0])} ${x[1]}`, `${pill(x[3])}<p class="strong">${esc(x[2])}</p>${x[4] ? `<p>${esc(x[4])}</p>` : ''}`)).join('')}</div>`;
}

function stays() {
  return heading('住宿') +
    `<div class="grid">${STAYS.map(s => card(s.name, `<p class="caption">${esc(s.city)}</p><div class="stay-meta"><strong>${md(s.start)} – ${md(s.end)}</strong><span>${s.nights} 晚</span></div>${pill(s.status)}${s.note ? `<p>${esc(s.note)}</p>` : ''}`)).join('')}</div>`;
}

function notes() {
  return heading('注意事項', '第一次來美國會用到的。') +
    `<div class="grid">${NOTES.map(n => card(n[0], `<ul>${n[1].map(s => `<li>${esc(s)}</li>`).join('')}</ul>`)).join('')}</div>`;
}

document.title = `Sonic 美東行 2027｜${TABS[page]}`;
document.getElementById('nav').innerHTML = Object.entries(TABS).map(([k, v]) => `<a href="${pageUrl(k)}" ${page === k ? 'aria-current="page"' : ''}>${v}</a>`).join('');
document.getElementById('main').innerHTML = ({overview, days: itinerary, flights, transport, tickets, stays, notes})[page]();
document.getElementById('updated').textContent = `${TRIP.updated.replaceAll('-', '.')} 更新`;

const nav = document.getElementById('nav'), active = nav.querySelector('[aria-current]');
if (active) nav.scrollLeft = active.offsetLeft - (nav.clientWidth - active.offsetWidth) / 2;
if (page !== 'overview' && !location.hash) document.querySelector('.nav-shell').scrollIntoView({block: 'start'});

if (page === 'days') {
  const cards = [...document.querySelectorAll('.day-card')], jump = document.getElementById('jump');
  const mark = day => {
    document.querySelectorAll('.date-list a').forEach(a => a.getAttribute('href') === `#day-${day}` ? a.setAttribute('aria-current', 'location') : a.removeAttribute('aria-current'));
    if (dayOf(day)) jump.value = day;
  };
  const today = new Date().toLocaleDateString('en-CA', {timeZone: 'America/New_York'});
  const start = location.hash.startsWith('#day-') ? location.hash.slice(5) : (today.startsWith(String(TRIP.year)) && dayOf(today.slice(5)) ? today.slice(5) : DAYS[0][0]);
  mark(start);
  if (start !== DAYS[0][0] || location.hash) requestAnimationFrame(() => document.getElementById(`day-${start}`)?.scrollIntoView({block: 'start', behavior: 'instant'}));
  jump.addEventListener('change', e => { history.replaceState(null, '', `#day-${e.target.value}`); document.getElementById(`day-${e.target.value}`).scrollIntoView({block: 'start', behavior: 'instant'}); mark(e.target.value); });
  let pending = false;
  window.addEventListener('scroll', () => {
    if (pending) return; pending = true;
    requestAnimationFrame(() => {
      const offset = (parseFloat(getComputedStyle(cards[0]).scrollMarginTop) || 80) + 24;
      let cur = cards[0];
      for (const c of cards) { if (c.getBoundingClientRect().top <= offset) cur = c; else break; }
      mark(cur.id.slice(4)); pending = false;
    });
  }, {passive: true});
  window.addEventListener('hashchange', () => mark(location.hash.slice(5)));
}
