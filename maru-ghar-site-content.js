/* Maru Ghar shared public content: admin-managed news, social links, app and QR. */
import { firebaseConfig, isFirebaseConfigured } from './firebase-config.js';
import { initializeApp, getApps } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
const ADMIN_UID='yJYiuaUE3KXVLVuWqLyLRH5owQJ3';
const $=id=>document.getElementById(id);
const safeUrl=value=>{try{const u=new URL(String(value||''));return u.protocol==='https:'?u.href:''}catch(_){return ''}};
if(isFirebaseConfigured()){
 const app=getApps()[0]||initializeApp(firebaseConfig),db=getFirestore(app),auth=getAuth(app);
 const ref=doc(db,'settings','siteContent');
 async function load(){
  try{
   const snap=await getDoc(ref);if(!snap.exists())return;const data=snap.data()||{};
   const news=data.news||{},social=data.social||{},appLinks=data.app||{};
   const newsBox=$('mgRecentNews');
   if(newsBox&&news.title){
    const body=newsBox.querySelector('.mg-recent-items');if(body){body.replaceChildren();
     if(news.imageUrl&&safeUrl(news.imageUrl)){const img=document.createElement('img');img.src=safeUrl(news.imageUrl);img.alt=news.title;img.loading='lazy';img.style.cssText='width:100%;max-height:150px;object-fit:cover;border-radius:9px';body.append(img)}
     const title=document.createElement('b');title.textContent=String(news.title).slice(0,120);body.append(title);
     if(news.text){const p=document.createElement('p');p.textContent=String(news.text).slice(0,500);body.append(p)}
     if(news.link&&safeUrl(news.link)){const a=document.createElement('a');a.href=safeUrl(news.link);a.target='_blank';a.rel='noopener noreferrer';a.textContent='વધુ વાંચો';body.append(a)}
    }
   }
   const footer=$('contact');if(footer&&!$('mgPublicLinks')){
    const wrap=document.createElement('section');wrap.id='mgPublicLinks';wrap.style.cssText='display:flex;gap:14px;flex-wrap:wrap;justify-content:center;align-items:center;margin:18px auto;max-width:1100px';
    for(const [name,url] of Object.entries(social)){const href=safeUrl(url);if(!href)continue;const a=document.createElement('a');a.href=href;a.target='_blank';a.rel='noopener noreferrer';a.textContent=name;a.setAttribute('aria-label',name);wrap.append(a)}
    const appUrl=safeUrl(appLinks.downloadUrl);if(appUrl){const a=document.createElement('a');a.href=appUrl;a.textContent='📲 એપ ડાઉનલોડ કરો';a.target='_blank';a.rel='noopener noreferrer';wrap.append(a)}
    const qr=safeUrl(appLinks.qrUrl);if(qr){const img=document.createElement('img');img.src=qr;img.alt='એપ ડાઉનલોડ QR કોડ';img.style.cssText='width:110px;height:110px;object-fit:contain;background:white;padding:5px;border-radius:8px';wrap.append(img)}
    footer.prepend(wrap);
   }
  }catch(e){console.warn('Public site content could not load',e)}
 }
 load();
 if(location.pathname.endsWith('/admin.html')||location.pathname.endsWith('admin.html')){
  onAuthStateChanged(auth,async user=>{
   if(!user||user.uid!==ADMIN_UID||$('mgSiteContentAdmin'))return;
   const host=$('adminSettings');if(!host)return;
   const panel=document.createElement('section');panel.className='panel';panel.id='mgSiteContentAdmin';
   panel.innerHTML='<h2>📰 ન્યૂઝ, એપ અને સોશિયલ લિંક્સ</h2><p class="muted">અહીં સેવ કરેલી માહિતી જાહેર વેબસાઇટના ન્યૂઝ અને ફૂટરમાં દેખાશે. ફક્ત HTTPS લિંક્સ સ્વીકારાશે.</p><div class="formgrid"><label>સમાચારનું શીર્ષક<input id="mgNewsTitle" maxlength="120"></label><label>સમાચાર ફોટો URL<input id="mgNewsImage" type="url" maxlength="500"></label><label class="wide">સમાચારની વિગત<textarea id="mgNewsText" maxlength="500"></textarea></label><label class="wide">વધુ વાંચો URL<input id="mgNewsLink" type="url" maxlength="500"></label><label>એપ ડાઉનલોડ URL<input id="mgAppUrl" type="url" maxlength="500"></label><label>QR કોડ ઈમેજ URL<input id="mgQrUrl" type="url" maxlength="500"></label><label>Facebook URL<input id="mgSocialFacebook" type="url" maxlength="500"></label><label>Instagram URL<input id="mgSocialInstagram" type="url" maxlength="500"></label><label>YouTube URL<input id="mgSocialYouTube" type="url" maxlength="500"></label><label>LinkedIn URL<input id="mgSocialLinkedIn" type="url" maxlength="500"></label><label>X / Twitter URL<input id="mgSocialX" type="url" maxlength="500"></label><button class="primary wide" id="mgSaveSiteContent" type="button">ન્યૂઝ અને લિંક્સ સેવ કરો</button></div><div id="mgSiteContentStatus" class="status" role="status"></div>';
   host.append(panel);
   try{const s=await getDoc(ref);if(s.exists()){const d=s.data(),n=d.news||{},a=d.app||{},so=d.social||{};for(const [id,v] of Object.entries({'mgNewsTitle':n.title,'mgNewsImage':n.imageUrl,'mgNewsText':n.text,'mgNewsLink':n.link,'mgAppUrl':a.downloadUrl,'mgQrUrl':a.qrUrl,'mgSocialFacebook':so.Facebook,'mgSocialInstagram':so.Instagram,'mgSocialYouTube':so.YouTube,'mgSocialLinkedIn':so.LinkedIn,'mgSocialX':so.X}))if($(id))$(id).value=v||''}}catch(e){$('mgSiteContentStatus').textContent='જૂની સેટિંગ્સ લોડ થઈ નથી: '+(e.code||e.message)}
   $('mgSaveSiteContent').addEventListener('click',async()=>{
    const get=id=>$(id).value.trim(),valid=(id)=>!get(id)||!!safeUrl(get(id));
    const ids=['mgNewsImage','mgNewsLink','mgAppUrl','mgQrUrl','mgSocialFacebook','mgSocialInstagram','mgSocialYouTube','mgSocialLinkedIn','mgSocialX'];
    if(ids.some(id=>!valid(id))){$('mgSiteContentStatus').textContent='દરેક URL https:// થી શરૂ થવો જોઈએ.';return}
    const social={Facebook:get('mgSocialFacebook'),Instagram:get('mgSocialInstagram'),YouTube:get('mgSocialYouTube'),LinkedIn:get('mgSocialLinkedIn'),X:get('mgSocialX')};
    Object.keys(social).forEach(k=>{if(!social[k])delete social[k]});
    const button=$('mgSaveSiteContent');button.disabled=true;
    try{await setDoc(ref,{news:{title:get('mgNewsTitle'),imageUrl:get('mgNewsImage'),text:get('mgNewsText'),link:get('mgNewsLink')},app:{downloadUrl:get('mgAppUrl'),qrUrl:get('mgQrUrl')},social,updatedAt:serverTimestamp(),updatedBy:user.uid},{merge:true});$('mgSiteContentStatus').textContent='ન્યૂઝ અને લિંક્સ સફળતાપૂર્વક સેવ થયા.';await load()}
    catch(e){$('mgSiteContentStatus').textContent='સેવ ન થયું: '+(e.code||e.message)}finally{button.disabled=false}
   });
  });
 }
}
