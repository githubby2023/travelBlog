// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAyAq1htA0LBgUo5RWlcFK9RXOBrHPPhXo",
  authDomain: "travelblog-4fef5.firebaseapp.com",
  projectId: "travelblog-4fef5",
  storageBucket: "travelblog-4fef5.appspot.com",
  messagingSenderId: "1060464481002",
  appId: "1:1060464481002:web:5ea78972b1045efb413d93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
