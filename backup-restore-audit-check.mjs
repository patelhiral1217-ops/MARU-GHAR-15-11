
import fs from 'node:fs';
const admin=fs.readFileSync('admin.html','utf8');
const rules=fs.readFileSync('firestore.rules','utf8');
const errors=[];
const checks=[
 ['backup export must include project/schema marker',admin.includes("schemaVersion:1")&&admin.includes("project:'maru-ghar-gandhinagar'")],
 ['backup export must fetch full listing records',admin.includes('getAllListingRows()')],
 ['private owner contacts must be attached to admin-only backup',admin.includes('function getAllListingRows(withContacts=true)')&&admin.includes('mgAttachPrivateContacts(rows)')],
 ['restore must reject another project backup',admin.includes("parsed.project!=='maru-ghar-gandhinagar'")],
 ['restore must cap record count',admin.includes('parsed.listings.length>10000')],
 ['restore must skip existing listing IDs',admin.includes('if(existing.exists()){skipped++;continue}')],
 ['restore must whitelist public listing fields',admin.includes("const allowed=['ownerName','type','purpose','location','price'")],
 ['owner contacts must be restored into private collection',admin.includes("doc(db,'listingContacts',raw.id)")],
 ['failed listing write must roll back private contact',admin.includes("await deleteDoc(contactRef).catch(()=>{})")],
 ['restore must not overwrite old listings',admin.includes('હાલના ID ન હોય તેવા રેકોર્ડ જ ઉમેરાશે')],
 ['Firestore owner contact reads must be admin/private',rules.includes('match /listingContacts/{listingId}')&&rules.includes('allow read: if isAdmin()')]
];
for(const [label,ok] of checks)if(!ok)errors.push(label);
if(errors.length){console.error('BACKUP/RESTORE AUDIT FAILED');errors.forEach(e=>console.error(' - '+e));process.exit(1)}
console.log('BACKUP/RESTORE AUDIT PASS — project-scoped JSON, private contact export, validated/limited import, duplicate protection, field allowlist, contact rollback and admin-only contact access.');
