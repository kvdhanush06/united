import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDLHGaC_cZj7NzUlPsXFjuaRPnQw4OIj0s",
  authDomain: "united-de765.firebaseapp.com",
  projectId: "united-de765",
  storageBucket: "united-de765.firebasestorage.app",
  messagingSenderId: "908759174229",
  appId: "1:908759174229:web:97712f92ed3a34c2f598dc",
  measurementId: "G-LLX82XJ2JR"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const analytics = getAnalytics(app);
