import fs from 'node:fs';
const html=fs.readFileSync('index.html','utf8');
const ui=fs.readFileSync('assets/maru-ghar-discovery-upgrades.js','utf8');
const backend=fs.readFileSync('assets/maru-ghar-backend.js','utf8');
const errors=[];
for(const s of ['mgHeaderCity','mgAreaFilter','mgSaleType','mgListedBy','mgPossession','mgUpdatedFilter','mgPriceRange','mgAreaRange','mgRecentSale','mgRecentRent','mgFooterDiscovery']) if(!ui.includes(s)) errors.push(`Missing discovery feature: ${s}`);
for(const s of ['name="areaSqm"','name="saleType"','name="listedBy"','name="possession"']) if(!html.includes(s)) errors.push(`Missing owner listing field: ${s}`);
if(!backend.includes("if(!auth.currentUser || auth.currentUser.isAnonymous)")) errors.push('Real customer login gate is missing');
if(!backend.includes("window.mgCurrentListingData[article.dataset.id]=p")) errors.push('Live listing metadata bridge missing');
if(!html.includes('assets/maru-ghar-discovery-upgrades.js')) errors.push('Discovery enhancement script is not loaded');
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log('DISCOVERY UPGRADE STATIC CHECK PASS — city/area, price and area ranges, sale type, listed-by, possession, last update, recent sale/rent blocks and customer-only submission gate.');
