import fs from 'node:fs';
const html=fs.readFileSync('index.html','utf8');
const js=fs.readFileSync('maru-ghar-tools-restored.js','utf8');
const errors=[];
if(!html.includes('maru-ghar-tools-restored.js'))errors.push('Restored tools script not loaded by index.html');
for(const id of ['mgToolEmi','mgToolMap','mgToolPrice','mgToolArea','mgRestoredEmi','mgRestoredFilters','mgRestoredSqm'])if(!js.includes(id))errors.push('Missing restored UI: '+id);
for(const x of ['function calc()','function apply()','google.com/maps/search/?api=1&query=','mg-language-changed'])if(!js.includes(x))errors.push('Missing working action: '+x);
if(errors.length){console.error(errors.join('\\n'));process.exit(1)}
console.log('RESTORED HOME TOOLS CHECK PASS — EMI calculator, Maps search, price and square-metre filter controls, language repaint.');
