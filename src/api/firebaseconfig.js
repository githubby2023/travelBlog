// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBWIo63I-uMjeqXvjUioiCO9reittLzbQY",
  authDomain: "travelblog-495a0.firebaseapp.com",
  projectId: "travelblog-495a0",
  storageBucket: "travelblog-495a0.appspot.com",
  messagingSenderId: "246061178409",
  appId: "1:246061178409:web:5fe15ffc8091c6c10dc638"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
