import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, connectAuthEmulator, Auth } from 'firebase/auth';
import { 
  getFirestore, 
  connectFirestoreEmulator, 
  Firestore, 
  enableMultiTabIndexedDbPersistence,
  enableIndexedDbPersistence 
} from 'firebase/firestore';
import { getStorage, connectStorageEmulator, FirebaseStorage } from 'firebase/storage';
import { getAnalytics, isSupported, Analytics } from 'firebase/analytics';
import Constants from 'expo-constants';
import { Alert } from 'react-native';

const getFirebaseConfig = () => {
  try {
    if (Constants.expoConfig?.extra?.firebase) {
      return Constants.expoConfig.extra.firebase;
    }
    
    if (process.env.FIREBASE_CONFIG) {
      try {
        return JSON.parse(process.env.FIREBASE_CONFIG);
      } catch (e) {
    
      }
    }
    
    return {
      apiKey: "AIzaSyCC5ChcHuTWDvP-RfZME8YB22RB3IWhWpY",
      authDomain: "monefiy-app.firebaseapp.com",
      projectId: "monefiy-app",
      storageBucket: "monefiy-app.appspot.com",
      messagingSenderId: "952544068093",
      appId: "1:952544068093:web:c8eea97b84dcd11b86c9d9",
      measurementId: "G-T3P4PD1KHT"
    };
  } catch (error) {
    if (__DEV__) {
      Alert.alert(
        'Firebase Configuration Error',
        'Failed to initialize Firebase. Check console for details.'
      );
    }
    
    return {
      apiKey: "dummy-api-key",
      authDomain: "dummy-app.firebaseapp.com",
      projectId: "dummy-project",
      storageBucket: "dummy-bucket.appspot.com",
      messagingSenderId: "000000000000",
      appId: "1:000000000000:web:0000000000000000000000"
    };
  }
};

const firebaseConfig = getFirebaseConfig();

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;
let analytics: Analytics | null = null;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  
  // Enable offline persistence
  try {
    enableIndexedDbPersistence(db)
      .then(() => {
        if (__DEV__) console.log('Firestore persistence enabled successfully');
      })
      .catch((err) => {
        if (err.code === 'failed-precondition') {
          console.warn('Firebase persistence could not be enabled: Multiple tabs open');
        } else if (err.code === 'unimplemented') {
          console.warn('Firebase persistence not available in this environment');
        }
      });
  } catch (persistenceError) {
    console.warn('Error enabling persistence:', persistenceError);
  }
  
  if (__DEV__) {
   
  }
  
  isSupported().then(supported => {
    if (supported) {
      analytics = getAnalytics(app);
    } else {
      console.log("Analytics tidak didukung di lingkungan ini");
    }
  }).catch(error => {
    console.error("Error saat memeriksa dukungan Analytics:", error);
  });
} catch (error) {
  console.error("Error initializing Firebase:", error);
  
  if (__DEV__) {
    Alert.alert(
      'Firebase Initialization Error',
      'Check console for details. Some app features may not work correctly.'
    );
  }
  
  app = {} as FirebaseApp;
  auth = {} as Auth;
  db = {} as Firestore;
  storage = {} as FirebaseStorage;
}

export { auth, db, storage, analytics };
export default app; 