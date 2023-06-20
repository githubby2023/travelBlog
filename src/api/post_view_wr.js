import {
    doc,
    getDoc,
    getDocs,
    collection,
    query,
    orderBy,
    limit,
    setDoc,
    addDoc,
  } from "firebase/firestore";
  import { firestore } from "./firebaseconfig";
  import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
  import { storage } from "./firebaseconfig";

  export const writePostView = async (
    author_id,
    timestamp,
    post_id,
    post_location,
    viewer_id,
    viewer_gender,
    viewer_age,
    viewer_nationality,
  ) => {
    let postView = {
        author_id: author_id ?? "",
        timestamp: timestamp ?? "",
        post_id: post_id ?? "",
        post_location: post_location ?? "",
        viewer_id: viewer_id ?? "",
        viewer_gender: viewer_gender?? "",
        viewer_age: viewer_age ?? "",
        viewer_nationality: viewer_nationality ?? "",
    };
    return addDoc(collection(firestore, "Post_View"), postView);
  };