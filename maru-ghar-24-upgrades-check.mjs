import fs from 'node:fs';
import assert from 'node:assert/strict';
const read=p=>fs.readFileSync(p,'utf8');
const index=read('index.html'),admin=read('admin.html'),upgrade=read('maru-ghar-24-upgrades.js'),adminContent=read('maru-ghar-admin-content.js'),extras=read('maru-ghar-extras.js'),publicContent=read('maru-ghar-public-content.js'),rules=read('firestore.rules'),backend=read('maru-ghar-backend.js'),copy=read('copy-web.mjs');
const checks=[
 ['public upgrade script wired',index.includes('maru-ghar-24-upgrades.js')],
 ['public content listener wired',index.includes('maru-ghar-public-content.js')],
 ['admin content editor wired',admin.includes('maru-ghar-admin-content.js')],
 ['city and local area selectors',upgrade.includes('mgHeaderCity')&&upgrade.includes('mgAreaFilter')],
 ['sale, listed-by and possession filters',upgrade.includes('mgSaleType')&&upgrade.includes('mgListedBy')&&upgrade.includes('mgPossession')],
 ['price and square-metre ranges',upgrade.includes('mgPriceRange')&&upgrade.includes('mgAreaRange')],
 ['sale and rent recent sections',upgrade.includes('mgRecentSale')&&upgrade.includes('mgRecentRent')],
 ['Gujarati footer buyer tenant city headings and app links',upgrade.includes('ખરીદદારો માટે')&&upgrade.includes('ભાડુઆતો માટે')&&upgrade.includes('લોકપ્રિય શહેરો')&&upgrade.includes('લોકપ્રિય શોધ')&&upgrade.includes('Google Play')&&upgrade.includes('App Store')&&!upgrade.includes('FOR BUYERS')&&!upgrade.includes('FOR TENANTS')&&!upgrade.includes('POPULAR CITIES')&&!upgrade.includes('POPULAR SEARCHES')],
 ['login required for property contact',upgrade.includes('gateContact')&&upgrade.includes('isAnonymous')],
 ['customer name and mobile profile fields',upgrade.includes('customerDisplayName')&&upgrade.includes('customerMobile')&&extras.includes('displayName:name')&&extras.includes('phone:phone')],
 ['private customer profile Firestore rule',rules.includes('CUSTOMER PRIVATE PROFILE')&&rules.includes('request.auth.uid == uid')],
 ['footer QR generation and recent contact CTA',upgrade.includes('qrcode-generator')&&upgrade.includes('સંપર્ક નંબર જુઓ')],
 ['family house illustration on admin login',adminContent.includes('mg24-admin-illustration')&&adminContent.includes('પરિવાર નવા ઘરને જોઈ રહ્યો છે')],
 ['admin news and social fields',adminContent.includes('mgNewsTitle')&&adminContent.includes('mgFacebook')&&adminContent.includes('mgYoutube')],
 ['public Firestore content listener',publicContent.includes("settings','publicContent")],
 ['Firestore allows validated metadata',rules.includes("'areaSqm', 'saleType', 'listedBy', 'possession'")&&rules.includes("data.saleType in ['new', 'resale']")],
 ['public listing submits metadata',backend.includes("'areaSqm','floor'")&&backend.includes("'saleType','listedBy','possession'")],
 ['admin listing submits metadata',admin.includes("'areaSqm','saleType','listedBy','possession'")],
 ['hosting copies all upgrade scripts',copy.includes("'maru-ghar-24-upgrades.js'")&&copy.includes("'maru-ghar-public-content.js'")&&copy.includes("'maru-ghar-admin-content.js'")]
];
let failed=0;for(const [label,ok] of checks){console.log((ok?'PASS':'FAIL')+' '+label);if(!ok)failed++}
if(failed)throw new Error(failed+' Maru Ghar 24-upgrade checks failed');
console.log('All '+checks.length+' Maru Ghar 24-upgrade checks passed.');