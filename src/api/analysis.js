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

  //return list of post together with total number of comment
  export const getPostsWithCommentCount = async (uid) => {
    try {
      const postQuerySnapshot = await getDocs(collection(firestore, "Post"));
      const posts = [];
  
      for (const postDoc of postQuerySnapshot.docs) {
        if (postDoc.exists() && postDoc.data().author_id === uid) {
          const post = postDoc.data();
          const postId = postDoc.id;
  
          const commentQuerySnapshot = await getDocs(
            collection(firestore, "Post", postId, "comment")
          );
          const commentCount = commentQuerySnapshot.size;
  
          posts.push({ ...post, commentCount });
        }
      }
      console.log(posts);
      return posts;
    } catch (error) {
      console.error('Error fetching posts with comment count:', error);
      return [];
    }
  };
  