import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { firestore } from "./firebaseconfig";

export const queryBlog = async (postId) => {
  return getDoc(doc(firestore, "Post", postId)) // return a promise
    .then((doc) => {
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

export const queryAllBlogs = async () => {
  return getDocs(query(
    collection(firestore, "Post"),
    orderBy("timestamp", "desc"),
    limit(10)
  )) // return a promise
    .then((querySnapshot) => {
      let blogs = [];
      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          blogs.push(doc.data());
        }
      });
      // console.log("Blogs are " + JSON.stringify(blogs));
      return blogs;
    });
};

export const queryBlogComments = async (postId) => {
  return getDocs(
    collection(firestore, "Post", postId, "comment")
  ).then((querySnapshot) => {
    let comments = [];
    querySnapshot.forEach((doc) => {
      if (doc.exists()) {
        comments.push(doc.data());
      }
    });
    return comments;
  });
};
