import { doc, setDoc, getDoc, getDocs, collection } from "firebase/firestore";
import { firestore } from "./firebaseconfig";

export const queryBlog = async (postId) => {
  return getDoc(doc(firestore, "Post", postId)) // return a promise
    .then((doc) => {
      // console.log("Document data is " + doc.data());
      if (doc.exists()) {
        return doc.data();
      } else {
        return false;
      }
    });
};

export const queryUserBlog = async (uid) => {
  return await getDocs(collection(firestore, "Post")).then((querySnapshot) => {
    let blogs = [];
    querySnapshot.forEach((doc) => {
      if (doc.exists()) {
        console.log("Current doc " + doc.data().author_id);
        if (doc.data().author_id === uid) {
          blogs.push(doc.data());
        }
      }
    });
    console.log("Blogs are " + JSON.stringify(blogs));
    return blogs;
  });
};
