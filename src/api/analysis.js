import {
    doc,
    getDoc,
    getDocs,
    collection,
    query,
    orderBy,
    limit,
    where
  } from "firebase/firestore";
  import { firestore } from "./firebaseconfig";

  //get current user info
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  //return list of post together with total number of comment
  export const getPostsWithCommentCount = async () => {
    try {

      let q = query(collection(firestore, "Post"), where("author_id", "==", currentUser.uid));
      let postQuerySnapshot = await getDocs(q);
      
      const posts = [];
  
      for (const postDoc of postQuerySnapshot.docs) {
        if (postDoc.exists()) {
          const post = postDoc.data();
          const postId = postDoc.id;
  
          const commentQuerySnapshot = await getDocs(
            collection(firestore, "Post", postId, "comment")
          );
          const commentCount = commentQuerySnapshot.size;
  
          posts.push({ ...post, commentCount });
        }
      }
      console.log(currentUser.uid);
      console.log(posts);
      return posts;
    } catch (error) {
      console.error('Error fetching posts with comment count:', error);
      return [];
    }
  };

  //return favourite tag
  export const fetchTagCounts= async () => {
    try {
      
      let q = query(collection(firestore, "favourite"), where("post_author", "==", currentUser.uid));
      let querySnapshot = await getDocs(q);


      const tagCounts = {"Food":0,
                        "Transport":0,
                         "Attraction":0,
                         "Accomodation":0,
                          "Others":0};

      querySnapshot.forEach((doc) => {
        const { tag } = doc.data();
    
        if (tag && Array.isArray(tag)) {
          tag.forEach((tagName) => {
            console.log(tagName);
            if (tagName in tagCounts) {
              tagCounts[tagName] += 1;
            } else {
              tagCounts["Others"] += 1;
            }
          });
        }
      });
  
      return tagCounts;
    } catch (error) {
      console.error('Error fetching posts with comment count:', error);
      return [];
    }
  };

 
  