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
  deleteDoc,
} from "firebase/firestore";
import { firestore } from "./firebaseconfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseconfig";

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
        // console.log("Current doc " + doc.data().author_id);
        if (doc.data().author_id === uid) {
          blogs.push(doc.data());
        }
      }
    });
    // console.log("Blogs are " + JSON.stringify(blogs));
    return blogs;
  });
};

export const queryAllBlogs = async () => {
  return getDocs(
    query(
      collection(firestore, "Post"),
      orderBy("timestamp", "desc"),
      limit(10)
    )
  ) // return a promise
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
  return getDocs(collection(firestore, "Post", postId, "comment"))
    .then((querySnapshot) => {
      let comments = [];
      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          comments.push(doc.data());
        }
      });
      return comments;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteBlog = async (postId) => {
  return await deleteDoc(doc(firestore, "Post", postId));
};

export const setBlogRating = async (postId, uid, rating) => {
  let rate = { rating: { [uid]: rating } };
  return setDoc(doc(firestore, "Post", postId), rate, { merge: true });
};

export const updateBlog = async (postId, blog, imageFiles) => {
  const docRef = doc(firestore, "Post", postId);

  try {
    await setDoc(docRef, blog, { merge: true });
    const fileList = await handleUpload(imageFiles, blog, postId).catch((error) => {
      console.log(error);
    });

    const imageMap = fileList.reduce((map, url, index) => {
      const key = index === 0 ? "cover picture" : `picture ${index}`;
      map[key] = url;
      return map;
    }, {});

    await setDoc(docRef, { image: imageMap }, { merge: true });
  } catch (error) {
    console.log(error);
  }
};

export const writeBlog = async (blog, imageFiles) => {
  const newDocRef = doc(firestore, "Post", blog.postId);

  try {
    const fileList = await handleUpload(imageFiles, blog, blog.postId).catch((error) => {
      console.log(error);
    });

    const imageMap = fileList.reduce((map, url, index) => {
      const key = index === 0 ? "cover picture" : `picture ${index}`;
      map[key] = url;
      return map;
    }, {});

    let newBlog = { ...blog, image: imageMap };

    await setDoc(newDocRef, newBlog);

    // Add subcollection "comment" with initial comment value
    const commentCollectionRef = collection(newDocRef, "comment");
    await addDoc(commentCollectionRef, { comment: "" });
  } catch (error) {
    // console.log("Wrtie Blog" + error);
  }
};

export function writeComment(postId, comment) {
  const commentCollectionRef = collection(firestore, "Post", postId, "comment");
  return addDoc(commentCollectionRef, comment);
}

function handleUpload(files, blog, postId) {
  return new Promise((resolve, reject) => {
    if (!files) {
      alert("Please choose a file first!");
      reject();
    }

    const uploadPromises = files.map((file, index) => {
      const storageRef = ref(storage, `/posts/${blog.author_id}_${postId}_${index}`);

      if (typeof file === "string") {
        return Promise.resolve(file); // Resolve immediately if it's already a URL
      } else {
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {},
            (err) => {
              console.log(err);
              reject(err);
            },
            async () => {
              try {
                const url = await getDownloadURL(uploadTask.snapshot.ref);
                // console.log("URL is " + url);
                resolve(url);
              } catch (error) {
                console.log(error);
                reject(error);
              }
            }
          );
        });
      }
    });

    Promise.all(uploadPromises)
      .then((urlLists) => {
        // console.log("File list is " + JSON.stringify(urlLists));
        resolve(urlLists);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}


