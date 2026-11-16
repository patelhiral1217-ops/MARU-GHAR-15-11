/* Maru Ghar — functional EMI, map, price and square-metre controls. */
(()=>{'use strict';
if(window.__mgToolsRestoreV2)return;
window.__mgToolsRestoreV2=true;
const $=s=>document.querySelector(s);
const words=()=>{const lang=$('#mgLanguage')?.value||'gu';return ({
gu:['🧮 EMI કેલ્ક્યુલેટર','🗺️ નકશો','₹ કિંમત','📐 ક્ષેત્રફળ (ચો.મી.)','લોનની રકમ (₹)','વ્યાજ દર (% વાર્ષિક)','સમયગાળો (વર્ષ)','ગણતરી કરો','બંધ કરો','માસિક EMI','કુલ વ્યાજ','કુલ ચુકવણી','ગણતરી અંદાજિત છે.','ઓછામાં ઓછી કિંમત (₹)','વધુમાં વધુ કિંમત (₹)','ક્ષેત્રફળની મર્યાદા (ચો.મી.)','યોગ્ય આંકડા લખો.','વિસ્તાર પસંદ કરો'],
hi:['🧮 EMI कैलकुलेटर','🗺️ नक्शा','₹ कीमत','📐 क्षेत्रफल (वर्ग मीटर)','लोन की राशि (₹)','ब्याज दर (% वार्षिक)','अवधि (वर्ष)','गणना करें','बंद करें','मासिक EMI','कुल ब्याज','कुल भुगतान','गणना अनुमानित है।','न्यूनतम कीमत (₹)','अधिकतम कीमत (₹)','क्षेत्रफल सीमा (वर्ग मीटर)','सही अंक दर्ज करें।','क्षेत्र चुनें'],
en:['🧮 EMI Calculator','🗺️ Map','₹ Price','📐 Area (sq. m)','Loan amount (₹)','Interest rate (% yearly)','Tenure (years)','Calculate','Close','Monthly EMI','Total interest','Total payment','Estimate only.','Minimum price (₹)','Maximum price (₹)','Area limit (sq. m)','Enter valid numbers.','Choose area']
})[lang]||[]};
function init(){
 const bar=$('#mgRestoredTools'),gridSwitch=$('#gridSwitch');
 if(!bar||!gridSwitch)return;
 if($('#mgRestoredFilters')||$('#mgRestoredEmi'))return;
 const css=document.createElement('style');css.id='mg-restored-tools-style';css.textContent=`
 .mg-ra-panel,.mg-emi-panel{display:none;margin:12px 0;padding:16px;border:1px solid #d3b66b;border-radius:16px;background:linear-gradient(145deg,#f4f6f7 0%,#dce2e7 46%,#f2dfad 100%);color:#18392f;box-shadow:0 5px 0 #8c7544,0 12px 22px #0003,inset 0 1px 2px #fff}
 .mg-ra-panel.open,.mg-emi-panel.open{display:block}
 .mg-ra-panel{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
 .mg-ra-panel.open{display:grid}
 .mg-ra-panel[data-mode="price"] #mgSqmWrap,.mg-ra-panel[data-mode="area"] #mgMinWrap,.mg-ra-panel[data-mode="area"] #mgMaxWrap{display:none}
 .mg-ra-panel label,.mg-emi-panel label{display:flex;flex-direction:column;gap:6px;font-size:13px;font-weight:800}
 .mg-ra-panel input,.mg-emi-panel input{width:100%;min-width:0;padding:12px;border:1px solid #aebbc2;border-radius:10px;background:linear-gradient(145deg,#fff,#e8edf0);color:#17392f;box-shadow:inset 0 2px 4px #0001}
 .mg-emi-panel h3{margin:0 0 12px;color:#17392f}
 .mg-emi-fields,.mg-emi-results{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin:12px 0}
 .mg-emi-results>div{padding:12px;background:linear-gradient(145deg,#174c3d,#092b24);color:#fff2c7;border:1px solid #d8bc70;border-radius:12px;text-align:center;font-size:12px;box-shadow:0 4px 0 #061c17,0 8px 14px #0003}
 .mg-emi-results b{display:block;margin-top:6px;font-size:16px;color:#ffe19a}
 .mg-restored-tools{display:flex;gap:10px;flex-wrap:wrap;margin:14px 0}
 .mg-restored-tools button{flex:1 1 145px;min-height:48px}
 .mg-ra-panel button,.mg-emi-panel button{min-height:42px;padding:10px 16px}
 .mg-restored-filter-hidden{display:none!important}
 @media(max-width:600px){.mg-ra-panel.open,.mg-emi-fields,.mg-emi-results{grid-template-columns:1fr}.mg-restored-tools button{flex:1 1 calc(50% - 10px)}}
 `;document.head.append(css);
 const panel=document.createElement('div');panel.id='mgRestoredFilters';panel.className='mg-ra-panel';panel.dataset.mode='price';
 panel.innerHTML='<label id="mgMinWrap"></label><label id="mgMaxWrap"></label><label id="mgSqmWrap"></label>';
 bar.after(panel);
 const min=$('#fMin'),max=$('#fMax'),sqm=document.createElement('input');sqm.id='mgRestoredSqm';sqm.type='number';sqm.min='0';sqm.step='0.1';sqm.inputMode='decimal';sqm.placeholder='ઉદાહરણ: 150';
 const setLabel=(id,label,node)=>{const wrap=$('#'+id);if(!wrap)return;wrap.textContent=label;if(node)wrap.append(node)};
 setLabel('mgMinWrap',words()[13],min);setLabel('mgMaxWrap',words()[14],max);setLabel('mgSqmWrap',words()[15],sqm);
 const emi=document.createElement('section');emi.id='mgRestoredEmi';emi.className='mg-emi-panel';
 emi.innerHTML='<h3 id="mgEmiHeading"></h3><div class="mg-emi-fields"><label id="mgLoanWrap"><input id="mgLoan" type="number" min="1" value="3000000"></label><label id="mgRateWrap"><input id="mgRate" type="number" min="0" max="40" step=".1" value="8.5"></label><label id="mgYearsWrap"><input id="mgYears" type="number" min="1" max="40" value="20"></label></div><button id="mgDoEmi" type="button"></button> <button id="mgCloseEmi" type="button"></button><div class="mg-emi-results"><div><span id="mgMonthlyLabel"></span><b id="mgMonthly">—</b></div><div><span id="mgInterestLabel"></span><b id="mgInterest">—</b></div><div><span id="mgTotalLabel"></span><b id="mgTotal">—</b></div></div><p id="mgEmiNote"></p>';
 panel.after(emi);
 const money=n=>'₹'+Math.round(n).toLocaleString('en-IN');
 function calculate(){
  const principal=Number($('#mgLoan').value),annual=Number($('#mgRate').value),years=Number($('#mgYears').value);
  if(!(principal>0&&annual>=0&&annual<=40&&years>0&&years<=40)){alert(words()[16]);return}
  const months=years*12,rate=annual/1200;
  const monthly=rate===0?principal/months:principal*rate*Math.pow(1+rate,months)/(Math.pow(1+rate,months)-1);
  $('#mgMonthly').textContent=money(monthly);$('#mgInterest').textContent=money(monthly*months-principal);$('#mgTotal').textContent=money(monthly*months);
 }
 function applyFilters(){
  if(typeof window.filterProps==='function')window.filterProps();
  const cap=Number(sqm.value||0);
  document.querySelectorAll('#properties .property').forEach(card=>{
   const listing=window.mgCurrentListingData?.[card.dataset.id]||{};
   let area=Number(card.dataset.areaSqm||listing.areaSqm||listing.areaSqM||0);
   if(!area&&listing.areaSqft)area=Number(listing.areaSqft)*0.092903;
   card.classList.toggle('mg-restored-filter-hidden',!!cap&&!(area>0&&area<=cap));
  });
  const count=$('#count');
  if(count){const visible=[...document.querySelectorAll('#properties .property')].filter(card=>!card.classList.contains('hidden')&&!card.classList.contains('mg-restored-filter-hidden')).length;const tr=window.mgTranslate||((x)=>x);count.textContent=visible+' '+tr('લિસ્ટિંગ દેખાય છે')}
 }
 function showFilter(mode){
  panel.dataset.mode=mode;panel.classList.add('open');emi.classList.remove('open');
  panel.scrollIntoView({behavior:'smooth',block:'nearest'});
  if(mode==='area')sqm.focus();else min?.focus();
 }
 function paint(){
  const w=words();if(!w.length)return;
  const ids=['mgToolEmi','mgToolMap','mgToolPrice','mgToolArea','mgEmiHeading','mgDoEmi','mgCloseEmi','mgMonthlyLabel','mgInterestLabel','mgTotalLabel','mgEmiNote'];
  const vals=[w[0],w[1],w[2],w[3],w[0],w[7],w[8],w[9],w[10],w[11],w[12]];
  ids.forEach((id,i)=>{const el=$('#'+id);if(el)el.textContent=vals[i]});
  setLabel('mgLoanWrap',w[4],$('#mgLoan'));setLabel('mgRateWrap',w[5],$('#mgRate'));setLabel('mgYearsWrap',w[6],$('#mgYears'));
  setLabel('mgMinWrap',w[13],min);setLabel('mgMaxWrap',w[14],max);setLabel('mgSqmWrap',w[15],sqm);
  min.placeholder=w[13];max.placeholder=w[14];sqm.placeholder=w[15];
 }
 $('#mgToolEmi')?.addEventListener('click',()=>{emi.classList.toggle('open');panel.classList.remove('open');if(emi.classList.contains('open'))emi.scrollIntoView({behavior:'smooth',block:'nearest'})});
 $('#mgToolMap')?.addEventListener('click',()=>{
  const city=$('#cityFilter')?.value||'all',query=$('#query')?.value?.trim()||'';
  const area=city==='all'?'ગાંધીનગર':city;
  const url='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent([area,query].filter(Boolean).join(' '));
  const win=window.open(url,'_blank');if(!win)window.location.href=url;
 });
 $('#mgToolPrice')?.addEventListener('click',()=>showFilter('price'));
 $('#mgToolArea')?.addEventListener('click',()=>showFilter('area'));
 $('#mgDoEmi')?.addEventListener('click',calculate);
 $('#mgCloseEmi')?.addEventListener('click',()=>emi.classList.remove('open'));
 [min,max,sqm].forEach(input=>{input?.addEventListener('input',applyFilters);input?.addEventListener('change',applyFilters)});
 paint();calculate();window.addEventListener('mg-language-changed',paint);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();