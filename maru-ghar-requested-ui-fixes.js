/* Maru Ghar requested UI refinements — settings tools, live clock, login identity and button polish. */
(function(){
 'use strict';
 var $=function(s,r){return (r||document).querySelector(s)};
 var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
 var words={
  gu:{clock:'📅 આજની તારીખ અને સમય',map:'🗺 નકશા પર શોધો',emi:'🧮 EMI કેલ્ક્યુલેટર',typing:'⌨ ગુજરાતી ટાઇપિંગ મદદ',login:'મારું ઘર',tip:'ગુજરાતી ટાઇપિંગ માટે: Androidમાં Gboard → Languages → Add keyboard → ગુજરાતી પસંદ કરો. iPhoneમાં Settings → General → Keyboard → Keyboards → Add New Keyboard → Gujarati પસંદ કરો. કમ્પ્યુટરમાં Settings → Time & language → Language & region માં Gujarati keyboard ઉમેરો.'},
  hi:{clock:'📅 आज की तारीख और समय',map:'🗺 मानचित्र पर खोजें',emi:'🧮 EMI कैलकुलेटर',typing:'⌨ गुजराती टाइपिंग सहायता',login:'मेरा घर',tip:'गुजराती टाइपिंग के लिए: Android में Gboard → Languages → Add keyboard → Gujarati चुनें। iPhone में Settings → General → Keyboard → Keyboards → Add New Keyboard → Gujarati चुनें। कंप्यूटर में Settings → Time & language → Language & region में Gujarati keyboard जोड़ें।'},
  en:{clock:'📅 Current date & time',map:'🗺 Search on Map',emi:'🧮 EMI Calculator',typing:'⌨ Gujarati Typing Help',login:'Maru Ghar',tip:'To type Gujarati: On Android, open Gboard → Languages → Add keyboard → Gujarati. On iPhone, open Settings → General → Keyboard → Keyboards → Add New Keyboard → Gujarati. On Windows, add Gujarati under Settings → Time & language → Language & region.'}
 };
 var lang=function(){var v='gu';try{v=localStorage.getItem('mg_language')||'gu'}catch(_){}return words[v]?v:'gu'};
 var tr=function(k){return words[lang()][k]};
 var closeSettings=function(){var el=$('#mgSettingsOverlay');if(el)el.classList.remove('open')};
 function addSettingsActions(){
  var grid=$('#mgSettingsActions');if(!grid||grid.dataset.mgRequestedTools==='1')return;
  grid.dataset.mgRequestedTools='1';
  function add(id,key,fn){
   var b=document.createElement('button');b.type='button';b.id=id;b.dataset.mgTool=key;b.textContent=tr(key);b.addEventListener('click',fn);grid.appendChild(b);return b;
  }
  add('mgSettingsMap','map',function(){
   closeSettings();
   var city=$('#cityFilter'),selected=city&&city.value&&city.value!=='all'?city.options[city.selectedIndex].text:'ગુજરાત';
   var query=($('#query')&&$('#query').value||'').trim();
   var address=[query,selected,'Gujarat'].filter(Boolean).join(' ');
   window.open('https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(address),'_blank','noopener,noreferrer');
  });
  add('mgSettingsEmi','emi',function(){
   closeSettings();
   var panel=$('#mgEmi');
   if(panel){panel.hidden=false;panel.scrollIntoView({behavior:'smooth',block:'center'});var p=$('#emiP');if(p)p.focus({preventScroll:true});}
   else window.alert(lang()==='en'?'EMI calculator is loading. Please try again.':lang()==='hi'?'EMI कैलकुलेटर लोड हो रहा है। कृपया फिर प्रयास करें।':'EMI કેલ્ક્યુલેટર લોડ થઈ રહ્યું છે. ફરી પ્રયાસ કરો.');
  });
  add('mgSettingsGujaratiTyping','typing',function(){window.alert(tr('tip'))});
  function repaint(){['map','emi','typing'].forEach(function(k){var b=$('[data-mg-tool="'+k+'"]',grid);if(b)b.textContent=tr(k)})}
  window.addEventListener('mg-language-changed',repaint);
 }
 function installClock(){
  var top=$('.top');if(!top||$('#mgLiveClock'))return;
  var clock=document.createElement('span');clock.id='mgLiveClock';clock.className='mg-live-clock';clock.setAttribute('aria-live','off');
  top.insertBefore(clock,top.firstChild);
  function tick(){
   var locale=lang()==='hi'?'hi-IN':lang()==='en'?'en-IN':'gu-IN';
   var now=new Date();
   try{clock.textContent=tr('clock')+' · '+new Intl.DateTimeFormat(locale,{day:'2-digit',month:'short',year:'numeric'}).format(now)+' · '+new Intl.DateTimeFormat(locale,{hour:'2-digit',minute:'2-digit',hour12:true}).format(now)}catch(_){clock.textContent=tr('clock')+' · '+now.toLocaleString()}
  }
  tick();window.setInterval(tick,30000);window.addEventListener('mg-language-changed',tick);
 }
 function removeDuplicateAdminLogin(){
  $('button,a').forEach(function(el){var t=(el.textContent||'').trim().toLowerCase();if(/last updated|છેલ્લો સુધારો|अंतिम संशोधन/.test(t))el.remove()});\n  var links=$('a[href*="admin.html"]');
  var loginLinks=links.filter(function(a){return /admin|એડમિન|प्रशासन/i.test((a.textContent||'')+' '+a.getAttribute('href'))});
  var keep=$('#adminQuick')||loginLinks.find(function(a){return a.offsetParent!==null})||loginLinks[0];
  loginLinks.forEach(function(a){if(a!==keep)a.remove()});
  if(keep){keep.classList.add('mg-admin-single');keep.textContent=lang()==='en'?'Admin Login':lang()==='hi'?'एडमिन लॉगिन':'એડમિન લોગિન';window.addEventListener('mg-language-changed',function(){keep.textContent=lang()==='en'?'Admin Login':lang()==='hi'?'एडमिन लॉगिन':'એડમિન લોગિન'})}
 }
 function brandLoginDialog(){
  var shell=$('#mgLoginOverlay .mg-dialog');if(!shell||shell.dataset.mgBrandHeader==='1')return;
  var head=$('.mg-dialog-head',shell);if(!head)return;
  shell.dataset.mgBrandHeader='1';
  var brand=document.createElement('div');brand.className='mg-login-brand';
  var img=$('header .brand .badge img');if(img){var clone=img.cloneNode(true);clone.alt='Maru Ghar';brand.appendChild(clone)}
  var title=document.createElement('strong');title.id='mgLoginBrandName';title.textContent=tr('login');brand.appendChild(title);
  shell.insertBefore(brand,head);
  var h=$('h2',head);if(h)h.textContent=lang()==='en'?'Customer Account':lang()==='hi'?'ग्राहक खाता':'ગ્રાહક એકાઉન્ટ';
  window.addEventListener('mg-language-changed',function(){title.textContent=tr('login');if(h)h.textContent=lang()==='en'?'Customer Account':lang()==='hi'?'ग्राहक खाता':'ગ્રાહક એકાઉન્ટ'});
 }
 function removeInlineMapEmi(){
  var row=$('.mg-tools');if(row)row.remove();
 }
 function polish(){
  var style=document.createElement('style');style.id='mg-requested-ui-polish';
  style.textContent=`
   #mgLiveClock{display:inline-flex;align-items:center;gap:5px;max-width:100%;padding:7px 11px;border:1px solid #cdb879;border-radius:999px;background:linear-gradient(145deg,#f3f5ed,#dce8df 55%,#eee4ca);color:#244b3d;font-size:12px;font-weight:800;box-shadow:0 3px 0 #a9a17c,0 5px 10px #0002}
   .top{display:flex!important;align-items:center!important;justify-content:space-between!important;gap:9px!important;flex-wrap:wrap!important}
   .mg-login-brand{display:flex;align-items:center;justify-content:center;gap:12px;margin:0 0 16px;padding:10px 12px;border:1px solid #d1bd82;border-radius:15px;background:linear-gradient(145deg,#fffdf6,#e7eee6);color:#244b3d;font-size:22px}
   .mg-login-brand img{width:58px;height:58px;object-fit:contain;flex:0 0 58px}
   .mg-admin-single{background:linear-gradient(145deg,#1e6049,#0a332a)!important;color:#fff0bd!important;border:1px solid #d7b65e!important;box-shadow:0 4px 0 #08251e,0 8px 14px #0003,inset 0 1px 2px #ffffff55!important}
   #mgSettingsActions button{background:linear-gradient(145deg,#e8efe8 0%,#cdded3 50%,#e9dfc7 100%)!important;color:#244a3b!important;border:1px solid #b8aa78!important;box-shadow:0 4px 0 #9d946d,0 7px 13px #0002,inset 0 2px 2px #fff!important}
   #mgSettingsActions button:active{transform:translateY(3px)!important;box-shadow:0 1px 0 #9d946d,0 3px 7px #0002!important}
   .mg-live-clock{white-space:nowrap}
   .cats,.gridsw,.morefilters,#mgQuick,.mg-recent-wrap,.mg-compare-shortcut-wrap,.mg-showcase,.mg-showcase-frame,.mg-footer-actions,#contact,.mg-how-step{background:linear-gradient(145deg,#e7eee7 0%,#dce7df 58%,#eee6d5 100%)!important;border-color:#c5b783!important;box-shadow:0 4px 0 #b7a77b,0 8px 17px #14251d18!important}
   .mg-map-search,.mg-emi-toggle{display:none!important}
   .searchbox button,.searchbox .btn,.mg-sale-search{background:linear-gradient(145deg,#245f49,#0d392d 62%,#08271f)!important;color:#fff0bd!important;border:1px solid #d9b85f!important;box-shadow:0 4px 0 #08251e,0 8px 14px #0003,inset 0 1px 2px #ffffff55!important}
   @media(max-width:600px){#mgLiveClock{font-size:10px;padding:6px 8px}.mg-login-brand{font-size:19px}.mg-login-brand img{width:50px;height:50px;flex-basis:50px}.top{align-items:flex-start!important}}
  `;
  document.head.appendChild(style);
  // Improve visibility of any dedicated "property sale" action without altering filter options.
  $$('button,a[role="button"],.btn').forEach(function(el){
   var label=(el.textContent||'').trim().toLowerCase();
   if((label.includes('property')||label.includes('પ્રોપર્ટી')||label.includes('प्रॉपर्टी'))&&(label.includes('sale')||label.includes('વેચાણ')||label.includes('बिक्री')))el.classList.add('mg-sale-search');
  });
 }
 function init(){
  installClock();addSettingsActions();brandLoginDialog();removeDuplicateAdminLogin();removeInlineMapEmi();polish();
  window.addEventListener('mg-language-changed',function(){var b=$('#mgLoginBrandName');if(b)b.textContent=tr('login');var k=$('#mgLiveClock');if(k){var e=new Event('mg-language-changed');}});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
