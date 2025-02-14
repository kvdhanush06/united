import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, logEvent } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Analytics with error tracking
export const analytics = getAnalytics(app);

// Configure error tracking
window.addEventListener('error', (error) => {
  logEvent(analytics, 'exception', {
    description: error.message,
    fatal: true
  });
});

// Configure promise rejection tracking
window.addEventListener('unhandledrejection', (event) => {
  logEvent(analytics, 'exception', {
    description: `Unhandled Promise rejection: ${event.reason}`,
    fatal: false
  });
});

export const googleProvider = new GoogleAuthProvider();
