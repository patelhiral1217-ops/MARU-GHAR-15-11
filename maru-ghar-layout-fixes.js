/* Maru Ghar layout polish: protect the logo, align navigation, collapse secondary filters. */
(()=>{
 'use strict';
 const $=s=>document.querySelector(s);
 const css=document.createElement('style');css.id='mg-layout-fixes-style';
 css.textContent=`
 /* Header: never squeeze or cover the Maru Ghar mark. */
 header{padding-top:14px!important;padding-bottom:24px!important}
 header .nav{display:flex!important;align-items:center!important;justify-content:space-between!important;gap:12px!important;flex-wrap:wrap!important;min-width:0}
 header .brand{display:flex!important;align-items:center!important;flex:0 0 auto!important;min-width:max-content!important;gap:9px!important;position:relative!important;z-index:3!important}
 header .brand .badge{width:64px!important;height:64px!important;min-width:64px!important;flex:0 0 64px!important;display:grid!important;place-items:center!important;overflow:visible!important}
 header .brand .badge img{width:58px!important;height:58px!important;max-width:none!important;flex:none!important;object-fit:contain!important}
 header .brand>div:last-child{min-width:max-content!important}
 header .navlinks{display:flex!important;align-items:center!important;justify-content:flex-start!important;flex:1 1 100%!important;order:5!important;gap:9px!important;flex-wrap:nowrap!important;white-space:nowrap!important;overflow-x:auto!important;overflow-y:hidden!important;scrollbar-width:none!important;padding:5px 2px 9px!important;min-width:0!important}
 header .navlinks::-webkit-scrollbar{display:none!important}
 header .navlinks>a{flex:0 0 auto!important;min-height:42px!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;white-space:nowrap!important;padding:9px 15px!important;border-radius:11px!important}
 header .language-control{order:2!important;flex:0 0 auto!important;margin-left:auto!important;white-space:nowrap!important}
 header #adminQuick{order:3!important;flex:0 0 auto!important;white-space:nowrap!important;min-height:40px!important;padding:9px 12px!important}
 header .hero{clear:both}
 /* Collapse the secondary filter row by default; open only on request. */
 #mgMoreFiltersToggle{width:100%;display:flex;align-items:center;justify-content:space-between;gap:10px;margin:10px 0 8px;padding:12px 15px;border:1px solid #c5a65b;border-radius:13px;background:linear-gradient(145deg,#17483e,#0e302b)!important;color:#f7e9bd!important;font-weight:900;box-shadow:0 4px 0 #735b2d,0 7px 13px #0002,inset 0 1px 0 #ffffff44}
 #mgMoreFiltersToggle:active{transform:translateY(2px)}
 #moreFilters[hidden]{display:none!important}
 #moreFilters{margin-top:8px!important}
 /* Replace large white panels with warm sage / muted gold surfaces. */
 .cats,.gridsw,.morefilters,#mgQuick,.mg-recent-wrap,.searchbox,.submit,.mg-compare-shortcut-wrap{
  background:linear-gradient(145deg,#e8eee6 0%,#dce7df 52%,#eee6d2 100%)!important;
  border:1px solid #c2ae78!important;
  box-shadow:0 4px 0 #b6a16b,0 8px 17px #14251d18!important;
 }
 .morefilters{padding:12px!important}
 .morefilters input,.morefilters select,.searchbox input,.searchbox select,.submit input,.submit select,.submit textarea{
  background:#f8f5eb!important;color:#193b32!important;border:1px solid #c7b98f!important
 }
 .property,.mg-recent-wrap .mg24-recent-card{
  background:linear-gradient(145deg,#f1f4ed,#e6ece5)!important;border-color:#c4cfbf!important
 }
 .section-head{background:linear-gradient(90deg,#e7eee6,#efe8d8)!important;border-radius:13px;padding:12px 14px}
 body{background-color:#e5ebe4!important}
 @media(max-width:600px){
  header{padding:12px 4% 24px!important}
  header .nav{column-gap:8px!important;row-gap:6px!important}
  header .brand .badge{width:54px!important;height:54px!important;min-width:54px!important;flex-basis:54px!important}
  header .brand .badge img{width:50px!important;height:50px!important}
  header .brand-title{font-size:clamp(21px,6vw,26px)!important;line-height:1.05!important}
  header .brand small{font-size:8px!important;letter-spacing:1px!important}
  header .language-control{font-size:11px!important;gap:3px!important}
  header .language-control select{padding:6px 5px!important;max-width:92px!important;font-size:11px!important}
  header #adminQuick{font-size:11px!important;padding:7px 9px!important}
  header .navlinks{gap:7px!important;margin-top:2px!important}
  header .navlinks>a{font-size:12px!important;padding:8px 12px!important;min-height:38px!important}
  .cats,.gridsw{gap:7px!important}
 }
 `;
 if(!document.getElementById(css.id))document.head.appendChild(css);
 function installToggle(){
  const panel=$('#moreFilters'),anchor=$('#gridSwitch');
  if(!panel||$('#mgMoreFiltersToggle'))return;
  const btn=document.createElement('button');btn.id='mgMoreFiltersToggle';btn.type='button';btn.setAttribute('aria-controls','moreFilters');btn.setAttribute('aria-expanded','false');
  const label=()=>{const open=btn.getAttribute('aria-expanded')==='true';const raw=open?'− ઓછા ફિલ્ટર છુપાવો':'＋ ભાવ અને વધુ ફિલ્ટર ખોલો';return window.mgTranslate?window.mgTranslate(raw):raw};
  const icon=document.createElement('span');icon.textContent='⌄';const txt=document.createElement('span');txt.textContent=label();btn.append(txt,icon);
  panel.hidden=true;panel.setAttribute('aria-hidden','true');
  btn.addEventListener('click',()=>{const open=btn.getAttribute('aria-expanded')!=='true';btn.setAttribute('aria-expanded',String(open));panel.hidden=!open;panel.setAttribute('aria-hidden',String(!open));icon.textContent=open?'⌃':'⌄';txt.textContent=label()});
  const repaint=()=>{txt.textContent=label()};
  window.addEventListener('mg-language-changed',repaint);
  if(anchor)anchor.insertAdjacentElement('afterend',btn);else panel.insertAdjacentElement('beforebegin',btn);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',installToggle,{once:true});else installToggle();
})();
