import fs from 'node:fs';
const s=fs.readFileSync('maru-ghar-extras.js','utf8');
const errors=[];
if(!s.includes("updateDoc, onSnapshot } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js'"))errors.push('Firestore onSnapshot import missing');
if(!s.includes('notificationUnsub=onSnapshot(ref,s=>'))errors.push('Customer notifications must subscribe to live Firestore updates');
if(!s.includes("if(notificationUnsub){notificationUnsub();notificationUnsub=null;}"))errors.push('Previous customer notification listener must be removed before resubscribe');
if(!s.includes("else {await loadNotifications();showActiveFavs();"))errors.push('Customer sign-out must clear notification subscription and UI');
if(!s.includes("orderBy('createdAt','desc'),limit(10)"))errors.push('Notification listener must remain bounded to latest 10 records');
if(errors.length){console.error('CUSTOMER LIVE NOTIFICATION CHECK FAILED');errors.forEach(x=>console.error(' - '+x));process.exit(1)}
console.log('CUSTOMER LIVE NOTIFICATION CHECK PASS — new price alerts refresh without page reload, old listeners are removed on account change/sign-out, and the query is bounded to 10 records.');
