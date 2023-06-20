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
      // console.log(currentUser.uid);
      // console.log(posts);
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
            // console.log(tagName);
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

const currentDate = new Date();
const currentMonth = currentDate.toLocaleDateString('en-US', { month: 'long' });
const currentYear = currentDate.getFullYear();

const parseTimestamp = (timestamp) => {
  const date = timestamp.toDate();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);

  const [month, day, year] = formattedDate.split(' ');

  return {
    year: parseInt(year),
    month,
    day: parseInt(day),
  };
};


   //return an array of postView
   export const fetchPostView= async () => {

    try {
      let q = query(collection(firestore, "Post_View"), where("author_id", "==", currentUser.uid));
      let querySnapshot = await getDocs(q);
  
      const postView = [];
  
      for (const postViewDoc of querySnapshot.docs) {
        if (postViewDoc.exists()) {
          const view = postViewDoc.data();
          postView.push(view);
        }
      }
      return postView;

    } catch (error) {
      console.error("Error fetching page views:", error);
      return [];
    }
  };
  