import { auth } from "./firebaseconfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { addDoc, collection, getDocs } from "firebase/firestore";
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
    writeUserData(
      user.user.uid,
      user.user.displayName,
      "",
      user.user.email,
      "",
      "",
      user.user.photoURL
    );
  } catch (error) {
    console.log(error);
  }
  // await signInWithPopup(auth, provider).then((result) => {
  //   const name = result.user.displayName;
  //   const email = result.user.email;
  //   const profilePic = result.user.photoURL;

  // }).catch((error) => { console.log(error) });
};

const writeUserData = async (
  uid,
  username,
  nationality,
  email,
  gender,
  address,
  profilepic
) => {
  console.log("writeUserData1: " + uid);

  let user = {
    uid: uid,
    username: username,
    nationality: nationality,
    email: email,
    gender: gender,
    address: address,
    profilepic: profilepic,
  };

  try {
    const docRef = await addDoc(collection(firestore, "User"), user);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

function queryUser() {
  const userRef = firestore.collection("users");
  const query = userRef.where("uid", "==", auth.currentUser.uid);
  console.log(query);

  // const [user] = useCollectionData(query, { idField: "id" });
}
