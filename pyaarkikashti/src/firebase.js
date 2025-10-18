import { initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0dvnLZqtbIbfT0wbjU8wdwJmX33oi7JE",
  authDomain: "pyaarkikashti.firebaseapp.com",
  projectId: "pyaarkikashti",
 storageBucket: "pyaarkikashti.appspot.com",
  messagingSenderId: "522313993181",
  appId: "1:522313993181:web:c9062fcf2cb882abfac434",
  measurementId: "G-Z19QBN8TLB"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
