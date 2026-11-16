import fs from 'node:fs';
const html=fs.readFileSync('index.html','utf8');
const js=fs.readFileSync('maru-ghar-tools-restored.js','utf8');
const errors=[];
if(!html.includes('maru-ghar-tools-restored.js'))errors.push('Restored tools script not loaded by index.html');
for(const id of ['mgToolEmi','mgToolMap','mgToolPrice','mgToolArea'])if(!html.includes('id="'+id+'"'))errors.push('Missing visible home button in index.html: '+id);
for(const id of ['mgToolEmi','mgToolMap','mgToolPrice','mgToolArea','mgRestoredEmi','mgRestoredFilters','mgRestoredSqm'])if(!js.includes(id))errors.push('Missing restored UI: '+id);
for(const x of ['function calculate()','function applyFilters()','google.com/maps/search/?api=1&query=','mg-language-changed','addEventListener(\'click\''])if(!js.includes(x))errors.push('Missing working action: '+x);
if(errors.length){console.error(errors.join(String.fromCharCode(10)));process.exit(1)}
const theme=fs.readFileSync('maru-ghar-theme-unifier.js','utf8');
if(!theme.includes('linear-gradient(145deg,#f5f7f8'))errors.push('Missing silver/gold 3D button theme');
if(errors.length){console.error(errors.join(String.fromCharCode(10)));process.exit(1)}
console.log('RESTORED HOME TOOLS + SILVER/GOLD 3D THEME CHECK PASS');
