import { firebaseConfig } from './firebase-config.js';
import { getApps, initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import { getFirestore, doc, onSnapshot } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
const app=getApps().length?getApps()[0]:initializeApp(firebaseConfig),db=getFirestore(app);
onSnapshot(doc(db,'settings','publicContent'),snap=>{if(snap.exists())window.dispatchEvent(new CustomEvent('mg24-public-content',{detail:snap.data()}))},err=>console.warn('Public content unavailable:',err.code||err.message));