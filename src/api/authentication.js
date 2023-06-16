import { auth } from "./firebaseconfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { firestore } from "./firebaseconfig";

const provider = new GoogleAuthProvider();

export const registerWithEmail = async (registerEmail, registerPassword) => {
  try {
    const user = await createUserWithEmailAndPassword(
      auth,
      registerEmail,
      registerPassword
    );
    console.log("registerWithEmail: " + user);
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
    console.log("loginWithEmail: " + user);
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
    console.log("signInWithGoogle: " + user.user.displayName);

    if (user.user) {
      console.log("Sign in Success");
      return user.user;
    }
  } catch (error) {
    console.log(error);
  }
};

export const writeUserData = async (
  uid,
  username,
  nationality,
  email,
  gender,
  address,
  profilepic,
  bio,
  cover
) => {
  let user = {
    uid: uid ?? "",
    username: username ?? "",
    nationality: nationality ?? "",
    email: email ?? "",
    gender: gender ?? "",
    address: address ?? "",
    profilepic: profilepic ?? "",
    bio: bio ?? "",
    cover: cover ?? "",
  };
  return setDoc(doc(firestore, "User", uid), user);
};

export const uploadCoverPhoto = async (uid, cover) => {
  let user = {
    uid: uid ?? "",
    cover: cover ?? "",
  };
  return setDoc(doc(firestore, "User", uid), user, { merge: true });
};

export const queryUser = async (uid) => {
  return getDoc(doc(firestore, "User", uid)) // return a promise
    .then((doc) => {
      // console.log("Document data is " + doc.data());
      if (doc.exists()) {
        return doc.data();
      } else {
        return false;
      }
    });
};
