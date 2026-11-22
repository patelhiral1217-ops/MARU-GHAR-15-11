import fs from 'node:fs';
const config=fs.readFileSync('firebase-config.js','utf8');
const backend=fs.readFileSync('maru-ghar-backend.js','utf8');
const extras=fs.readFileSync('maru-ghar-extras.js','utf8');
const admin=fs.readFileSync('admin.html','utf8');
const copy=fs.readFileSync('copy-web.mjs','utf8');
const errors=[];
for(const marker of [
  'initializeFirestore(app,',
  'persistentLocalCache({ tabManager: persistentMultipleTabManager() })',
  'export function getMaruFirestore(app)',
  "error?.code === 'failed-precondition'",
  "error?.code === 'already-exists'"
]) if(!config.includes(marker)) errors.push('Persistent Firestore helper marker missing: '+marker);
if(!backend.includes("getMaruFirestore(app)")) errors.push('Public listings must use persistent Firestore instance');
if(!extras.includes("getMaruFirestore(app)")) errors.push('Customer account must use persistent Firestore instance');
if(!admin.includes("getMaruFirestore(app)")) errors.push('Admin must use persistent Firestore instance');
if(!copy.includes("'firebase-config.js'")) errors.push('Hosting build must publish Firestore helper module');
if(errors.length){console.error('OFFLINE PERSISTENCE CHECK FAILED');errors.forEach(x=>console.error(' - '+x));process.exit(1)}
console.log('OFFLINE PERSISTENCE CHECK PASS — public, customer and admin modules share IndexedDB-backed Firestore cache with safe already-initialized fallback. Real-device offline replay still requires device testing.');
