/* Maru Ghar — final theme unification, consistent 3D actions and collapsible area/price fields. */
(function(){
 'use strict';
 var $=function(s,r){return (r||document).querySelector(s)};
 var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
 function installTheme(){
  if($('#mg-theme-unifier-style'))return;
  var style=document.createElement('style');style.id='mg-theme-unifier-style';
  style.textContent=`
   :root{--mg-emerald:#123f34;--mg-emerald-deep:#08271f;--mg-sage:#dce8df;--mg-cream:#f0eadb;--mg-champagne:#e2c16f;--mg-ink:#24483b}
   /* Remove leftover bright white surfaces while keeping form controls readable. */
   body{background-color:#071b19!important}
   .cats,.gridsw,.morefilters,#mgQuick,.mg-recent-wrap,.mg-compare-shortcut-wrap,.mg-showcase,.mg-showcase-frame,.mg-footer-actions,#contact,.mg-how-step,.section-head,.mg-quick,.mg-recent-wrap,.mg-settings-grid,.mg-settings-panel{
    background:linear-gradient(145deg,#e7eee7 0%,#dce7df 54%,#eee6d5 100%)!important;border:1px solid #c7b987!important;color:#24483b!important;box-shadow:0 4px 0 #b6a77c,0 8px 17px #14251d18!important
   }
   .searchbox{background:linear-gradient(145deg,#123f34,#08271f)!important;color:#f5f1e4!important;border:1px solid #d8b967!important}
   .submit{background:linear-gradient(145deg,#123f34,#08271f)!important;color:#f5f1e4!important;border:1px solid #d8b967!important;box-shadow:0 14px 34px #0004!important}
   .submit h2,.submit b{color:#f5df9c!important}.submit p{color:#c0d2c7!important}
   .property{background:linear-gradient(145deg,#173f35,#0c2b25)!important;border:1px solid #bca15c!important;color:#f4f0e4!important;box-shadow:0 6px 0 #071d18,0 12px 22px #0003!important}
   .property h3{color:#fff0c0!important}.property .loc,.property .details{color:#c3d4ca!important}.property .price{color:#f0d17c!important}.property .pill{background:linear-gradient(145deg,#f4dda0,#d7b65f)!important;color:#18382e!important}
   .property-foot,.property-body{background:transparent!important}
   .empty{background:linear-gradient(145deg,#e7eee7,#dce7df)!important;color:#24483b!important;border:1px solid #c7b987!important}
   .outline,.property-foot .outline{background:linear-gradient(145deg,#e7eee7,#cbdcd0)!important;color:#24483b!important;border:1px solid #b9aa78!important}
   .searchbox .row input,.searchbox .row select,.morefilters input,.morefilters select,.formgrid input,.formgrid select,.formgrid textarea,#mgEmi input{
    background:linear-gradient(145deg,#f7f5ec,#e4ece5)!important;color:#203e34!important;border:1px solid #b9c8bc!important
   }
   .searchbox .row input::placeholder,.formgrid input::placeholder,.formgrid textarea::placeholder{color:#657b70!important}
   .formgrid select option,.morefilters select option{background:#e8eee7!important;color:#203e34!important}
   /* One coordinated raised 3D treatment for every public action button. */
   :where(button,input[type=button],input[type=submit],input[type=reset],a[role=button],.btn,.outline,.wa-btn,.contact-wa,.mg-head-action,.mg-chip,.mg-mapbtn,.mg-compare-shortcut,.mg-contact-trigger,.mg-contact-main,.mg-mobile-nav a,.mg-settings-grid button,.admin-shortcuts a,.admin-shortcuts button,.admin-quick a,.admin-quick button,.backup-actions button,.login-submit,.mg-submit-toggle,.mg-tools button,.cats .cat,.gridsw button,.searchbox button,.morefilters button,.property-foot a,.property-foot button,.primary){
    border-radius:13px!important;border:1px solid #d8bc70!important;font-weight:850!important;transition:transform .18s ease,box-shadow .18s ease,filter .18s ease!important;
    background:linear-gradient(145deg,#e8d28e 0%,#d1ad55 48%,#b58a32 100%)!important;color:#17372e!important;
    box-shadow:0 4px 0 #80652d,0 8px 14px #0003,inset 0 1px 2px #fff9!important;text-shadow:0 1px #fff5
   }
   :where(.searchbox button,.mg-sale-search,.mg-admin-single,.mg-contact-main,.mg-submit-toggle){
    background:linear-gradient(145deg,#24634d 0%,#124333 58%,#092c22 100%)!important;color:#fff0bd!important;border-color:#d8bc70!important;box-shadow:0 4px 0 #061f18,0 8px 14px #0004,inset 0 1px 2px #ffffff55!important;text-shadow:0 1px #0003
   }
   :where(button,a[role=button],.btn,.outline,.mg-chip,.mg-compare-shortcut,.mg-mobile-nav a,.property-foot a,.property-foot button,.primary):hover{filter:brightness(1.06)!important;transform:translateY(-1px)}
   :where(button,a[role=button],.btn,.outline,.mg-chip,.mg-compare-shortcut,.mg-mobile-nav a,.property-foot a,.property-foot button,.primary):active{transform:translateY(3px)!important;box-shadow:0 1px 0 #80652d,0 3px 7px #0003,inset 0 2px 3px #0002!important}
   .approve{background:linear-gradient(145deg,#2a936b,#116044)!important;color:#fff!important;border-color:#9ad5b7!important;box-shadow:0 4px 0 #073d2b,0 8px 14px #0004!important}
   .reject{background:linear-gradient(145deg,#c65a61,#8e2938)!important;color:#fff!important;border-color:#e8a2a5!important;box-shadow:0 4px 0 #5e1b25,0 8px 14px #0004!important}
   #mgEmi,.mg-emi{background:linear-gradient(145deg,#123f34,#08271f)!important;border:1px solid #d8b967!important;color:#f5f1e4!important}
   #mgEmi h2,#mgEmi b{color:#f0d17c!important}
  `;
  document.head.appendChild(style);
 }
 function init(){installTheme()}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
