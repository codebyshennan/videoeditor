import { initializeApp, getApps, getApp, app } from 'firebase/app';
import {
  getAuth,
  connectAuthEmulator,
  GoogleAuthProvider,
} from 'firebase/auth';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import {
  getFirestore,
  connectFirestoreEmulator,
  collection,
  getDocs,
  where,
  query,
  limit,
  doc,
  onSnapshot,
} from 'firebase/firestore';

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// initialize firebase app
const initFirebase = () => {
  if(!getApps().length) {
    if (typeof window != undefined) {
      if('measurementId' in clientCredentials) {
        // analytics()
        // performance()
      }
    }
    
    return initializeApp(clientCredentials)
    // check that the 'window' is in scope for the analytics module
  }
}

export default initFirebase

const firebaseApp = initFirebase()

export const auth = getAuth(firebaseApp);
export const googleAuthProvider = new GoogleAuthProvider();

export const firestore = getFirestore(firebaseApp);

export const storage = getStorage(firebaseApp);
export const STATE_CHANGED = 'state_changed';

export const functions = getFunctions(firebaseApp);
//UNCOMMENT TO RUN ON LOCALHOST EMULATOR
// console.log('running emulator');
// connectFunctionsEmulator(functions, 'localhost', 5001);
// connectStorageEmulator(storage, 'localhost', 9199);
// connectFirestoreEmulator(firestore, 'localhost', 8080);
// connectAuthEmulator(auth, 'http://localhost:9099');

export async function getUserWithUsername(username) {
  const q = query(
    collection(getFirestore(), 'users'),
    where('username', '==', username),
    limit(1)
  );
  const userDoc = (await getDocs(q)).docs[0];
  return userDoc;
}
