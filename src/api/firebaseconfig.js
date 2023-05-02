// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { useHistory } from "react-router-dom";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBM9QzvJeH0i_NvtxKqHZbKRAKTe7ovUgg",
  authDomain: "webprogramming-19580.firebaseapp.com",
  projectId: "webprogramming-19580",
  storageBucket: "webprogramming-19580.appspot.com",
  messagingSenderId: "340771616122",
  appId: "1:340771616122:web:154f3d6fbb16f2164992c3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();


export const registerWithEmail = async (registerEmail, registerPassword) => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  export const loginWithEmail = async (loginEmail, loginPassword) => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  export const logout = async () => {
    await signOut(auth);
  };

  export const signInWithGoogle = async () => {
    try {
      const user = await signInWithPopup(auth, provider);
      console.log(user);

    } catch (error) { console.log(error) };
    // await signInWithPopup(auth, provider).then((result) => {
    //   const name = result.user.displayName;
    //   const email = result.user.email;
    //   const profilePic = result.user.photoURL;
  
    // }).catch((error) => { console.log(error) });
    
  };