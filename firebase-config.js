// Firebase web app configuration. These values are identifiers, not private server secrets.
// Copy the web-app config from Firebase Console > Project settings > Your apps.
export const firebaseConfig = {
  apiKey: "AIzaSyCEAwOohrv7_-BvMdBa0FZ6hX4ZZoYceok",
  authDomain: "maru-ghar-gandhinagar-8dbe4.firebaseapp.com",
  projectId: "maru-ghar-gandhinagar-8dbe4",
  storageBucket: "maru-ghar-gandhinagar-8dbe4.firebasestorage.app",
  messagingSenderId: "301612847347",
  appId: "1:301612847347:web:2eb36de8d6495260fde786"
};

// Free persistent Firestore cache for offline reads and queued writes (browser/Android WebView).
// The same helper is used by public, customer and admin pages so Firestore is initialized once.
import { initializeFirestore, getFirestore, persistentLocalCache, persistentMultipleTabManager } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
let maruFirestoreInstance = null;
export function getMaruFirestore(app) {
  if (maruFirestoreInstance) return maruFirestoreInstance;
  try {
    maruFirestoreInstance = initializeFirestore(app, {
      localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
    });
  } catch (error) {
    // If another module already initialized Firestore, reuse that instance.
    if (error?.code === 'failed-precondition' || error?.code === 'already-exists') {
      maruFirestoreInstance = getFirestore(app);
    } else {
      throw error;
    }
  }
  return maruFirestoreInstance;
}

// Cloudinary Console > Settings > Product environment credentials: Cloud name.
// Unsigned upload preset must be exactly: marughar_images
export const cloudinaryConfig = {
  cloudName: "t5gd6nts",
  uploadPreset: "marughar_images",
  // Video upload requires its own unsigned preset; dashboard existence and permissions must be verified live.
  videoUploadPreset: "marughar_videos"
};

export const isFirebaseConfigured = () =>
  !!firebaseConfig.apiKey && !firebaseConfig.apiKey.startsWith("PASTE_") &&
  !!firebaseConfig.appId && !firebaseConfig.appId.startsWith("PASTE_") &&
  !!firebaseConfig.messagingSenderId && !firebaseConfig.messagingSenderId.startsWith("PASTE_") &&
  !!firebaseConfig.storageBucket && !firebaseConfig.storageBucket.startsWith("PASTE_");
export const isCloudinaryConfigured = () =>
  !!cloudinaryConfig.cloudName && !cloudinaryConfig.cloudName.startsWith("PASTE_") &&
  !!cloudinaryConfig.uploadPreset && !cloudinaryConfig.uploadPreset.startsWith('PASTE_');
export const isVideoCloudinaryConfigured = () =>
  isCloudinaryConfigured() && !!cloudinaryConfig.videoUploadPreset && !cloudinaryConfig.videoUploadPreset.startsWith('PASTE_');
