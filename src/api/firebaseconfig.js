// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBM9QzvJeH0i_NvtxKqHZbKRAKTe7ovUgg",
  authDomain: "webprogramming-19580.firebaseapp.com",
  projectId: "webprogramming-19580",
  storageBucket: "webprogramming-19580.appspot.com",
  messagingSenderId: "340771616122",
  appId: "1:340771616122:web:154f3d6fbb16f2164992c3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
