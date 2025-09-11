import { initializeApp,getApp,getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCTAlBd4UORz-OEgWAljrw2motaURUOWAI",
  authDomain: "mockmate-ecc10.firebaseapp.com",
  projectId: "mockmate-ecc10",
  storageBucket: "mockmate-ecc10.firebasestorage.app",
  messagingSenderId: "431217837039",
  appId: "1:431217837039:web:c1482b868d4bed486aac1a",
  measurementId: "G-7F5V95Q1SK"
};

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();


export const auth = getAuth(app);
export const db = getFirestore(app);