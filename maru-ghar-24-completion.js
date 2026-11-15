/* Maru Ghar 24-point completion pass: accessible 3D controls and richer recent-property cards. */
(()=>{
 'use strict';
 const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
 const css=document.createElement('style');
 css.id='mg-24-completion-style';
 css.textContent=`
 :where(button,a[role="button"],.btn,.outline,.cat,.mg-head-action,.mg-mobile-nav a,.mg-settings-grid button,.mg-upgrade-nav a,.mg-city-pill,.mg-filter-extra select,.mg-mapbtn,.mg-contact-trigger,.mg-submit-toggle,.primary,.approve,.reject){
  transition:transform .16s ease,box-shadow .16s ease,filter .16s ease;
 }
 :where(button,.btn,.outline,.cat,.mg-head-action,.mg-mobile-nav a,.mg-settings-grid button,.mg-upgrade-nav a,.mg-city-pill,.mg-mapbtn,.mg-contact-trigger,.mg-submit-toggle,.primary,.approve,.reject){
  box-shadow:0 3px 0 #8b713b,0 6px 12px #14251d25,inset 0 1px 0 #ffffffa8;
 }
 :where(button,a[role="button"],.btn,.outline,.cat,.mg-head-action,.mg-mobile-nav a,.mg-settings-grid button,.mg-upgrade-nav a,.mg-city-pill,.mg-mapbtn,.mg-contact-trigger,.mg-submit-toggle,.primary,.approve,.reject):focus-visible{outline:3px solid #d7b85f;outline-offset:3px}
 .mg-recent-item{display:grid;grid-template-columns:92px minmax(0,1fr);gap:10px;align-items:center;margin:9px 0;padding:9px;border:1px solid #d2c08d;border-radius:12px;background:linear-gradient(145deg,#fff,#f2ead8);color:#244a3d;text-decoration:none;box-shadow:0 3px 0 #c1ad76}
 .mg-recent-item img{width:92px;height:76px;object-fit:cover;border-radius:8px;background:#e2e8e4}
 .mg-recent-item b,.mg-recent-item small{display:block}.mg-recent-item small{margin-top:4px;color:#64736c;font-size:11px}
 .mg-recent-item .mg-recent-price{color:#8b641b;font-weight:900;margin-top:5px}
 @media(max-width:420px){.mg-recent-item{grid-template-columns:76px minmax(0,1fr)}.mg-recent-item img{width:76px;height:70px}}
 `;
 if(!$('#mg-24-completion-style'))document.head.append(css);
 function enhanceRecent(){
  const refresh=()=>{
   const cards=$$('#properties .property');
   [['mgRecentSale','sale'],['mgRecentRent','rent']].forEach(([id,purpose])=>{
    const target=$('#'+id+' .mg-recent-items');if(!target)return;
    const matches=cards.filter(c=>c.dataset.purpose===purpose).sort((a,b)=>(Number(b.dataset.ts)||0)-(Number(a.dataset.ts)||0)).slice(0,4);
    target.replaceChildren();
    if(!matches.length){target.textContent='હાલ મંજૂર લિસ્ટિંગ ઉપલબ્ધ નથી.';return;}
    matches.forEach(card=>{
     const item=document.createElement('a');item.className='mg-recent-item';item.href='#listings';
     const image=document.createElement('img');image.alt='પ્રોપર્ટી ફોટો';image.loading='lazy';
     const photo=$('.photo img',card),bg=$('.photo',card)?.style.backgroundImage;
     image.src=photo?.src||((bg&&bg!=='none')?bg.slice(5,-2):'maru-ghar-logo-3d-512.png');
     const info=document.createElement('span'),title=document.createElement('b'),loc=document.createElement('small'),price=document.createElement('span'),meta=document.createElement('small');
     title.textContent=$('h3',card)?.textContent||'પ્રોપર્ટી';
     loc.textContent=$('.loc',card)?.textContent||'સ્થળની વિગતો ઉપલબ્ધ નથી';
     price.className='mg-recent-price';price.textContent=$('.price',card)?.textContent||'ભાવ માટે સંપર્ક';
     const ts=Number(card.dataset.ts||0);meta.textContent=ts?'લિસ્ટિંગ: '+new Date(ts).toLocaleString('gu-IN'):'લિસ્ટિંગની તારીખ ઉપલબ્ધ નથી';
     info.append(title,loc,price,meta);item.append(image,info);
     item.addEventListener('click',()=>{const heading=$('h3',card);if(heading){card.scrollIntoView({behavior:'smooth',block:'center'});card.style.outline='3px solid #d7b85f';setTimeout(()=>card.style.outline='',1800)}});
     target.append(item);
    });
   });
  };
  const list=$('#properties');if(!list)return;
  new MutationObserver(refresh).observe(list,{childList:true,subtree:true,attributes:true,attributeFilter:['data-ts','data-purpose']});refresh();
 }
 function setRentSaleLinks(){
  $$('.mg-upgrade-nav [data-purpose="rent"]').forEach(a=>a.addEventListener('click',()=>{const p=$('#purpose');if(p){p.value='rent';p.dispatchEvent(new Event('change',{bubbles:true}));window.filterProps?.()}}));
  $$('.mg-upgrade-nav a').filter(a=>a.textContent.trim()==='વેચાણ').forEach(a=>a.addEventListener('click',()=>{const p=$('#purpose');if(p){p.value='sale';p.dispatchEvent(new Event('change',{bubbles:true}));window.filterProps?.()}}));
 }
 function init(){enhanceRecent();setRentSaleLinks();}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
