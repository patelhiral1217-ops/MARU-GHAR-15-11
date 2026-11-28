import fs from 'node:fs';
import assert from 'node:assert/strict';

const admin = fs.readFileSync('admin.html', 'utf8');
const functions = fs.readFileSync('functions/index.js', 'utf8');
const workflow = fs.readFileSync('.github/workflows/firebase-functions-deploy.yml', 'utf8');

const helperStart = admin.indexOf('async function mgDestroyMedia');
const helperEnd = admin.indexOf('let allListings', helperStart);
assert.ok(helperStart >= 0 && helperEnd > helperStart, 'Cloudinary cleanup helper must exist');
const helper = admin.slice(helperStart, helperEnd);
assert.match(helper, /result\.skipped/, 'Missing Cloudinary credentials must stop deletion visibly');
assert.match(helper, /result\.failed/, 'Partial Cloudinary failures must stop Firestore deletion');
assert.match(helper, /result\.deleted\)!==list\.length/, 'Every media asset must be confirmed deleted');
assert.match(helper, /public ID નથી/, 'Media without a Cloudinary public ID must not be silently discarded');

const mediaStart = admin.indexOf("if(action==='delphoto'||action==='delvideo')");
const mediaEnd = admin.indexOf('const VIDEO_TYPES', mediaStart);
assert.ok(mediaStart >= 0 && mediaEnd > mediaStart, 'Individual media delete action must exist');
const mediaBlock = admin.slice(mediaStart, mediaEnd);
assert.match(mediaBlock, /const original=\[\.\.\.arr\]/, 'Original media list must be retained for rollback');
assert.ok(mediaBlock.indexOf('await updateDoc') < mediaBlock.indexOf('await mgDestroyMedia(removed)'), 'Listing media reference is removed before Cloudinary call');
assert.match(mediaBlock, /await updateDoc\(doc\(db,'listings',id\),\{\[key\]:original\}\)/, 'Failed Cloudinary deletion must restore the listing media reference');

const listingDeleteStart = admin.indexOf("if(action==='delete'&&!confirm");
const listingDeleteEnd = admin.indexOf('const VIDEO_TYPES', listingDeleteStart);
const listingDelete = admin.slice(listingDeleteStart, listingDeleteEnd);
assert.ok(listingDelete.indexOf('await mgDestroyMedia(_media)') < listingDelete.indexOf("await deleteDoc(doc(db,'listings',id))"), 'Cloudinary assets must be deleted before removing the listing document');

assert.match(functions, /if \(!key \|\| !secret\) return \{ skipped: true/, 'Cloud Function must report when server credentials are missing');
assert.match(workflow, /secrets\.CLOUDINARY_API_KEY/, 'Functions deployment must read the Cloudinary API key from a GitHub secret');
assert.match(workflow, /secrets\.CLOUDINARY_API_SECRET/, 'Functions deployment must read the Cloudinary API secret from a GitHub secret');
assert.match(workflow, /functions\/\.env/, 'Cloudinary credentials must be passed through a temporary Functions environment file');
console.log('CLOUDINARY CLEANUP SAFETY PASS — no silent skips, failed deletions retain Firestore references, and server credentials stay in GitHub Secrets.');
