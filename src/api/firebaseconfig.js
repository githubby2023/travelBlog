// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDyanL_SuRHvpKHzuolhM-L6RrczM-hoYk",
  authDomain: "travelblog-eacd5.firebaseapp.com",
  projectId: "travelblog-eacd5",
  storageBucket: "travelblog-eacd5.appspot.com",
  messagingSenderId: "638674361782",
  appId: "1:638674361782:web:71a0bb705fbca9708df517"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
