import React from "react";
import Footer from "components/Footers/Footer.js";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar";
import LandingPost from "components/Landing/LandingPost";
import LandingCreate from "components/Landing/LandingCreate";
import { queryAllBlogs } from "../api/queryBlog";
import { queryUser } from "api/authentication";
import { onAuthStateChanged } from "firebase/auth";
import { useHistory } from "react-router-dom";
// import { auth } from "api/firebaseconfig";

function Index() {
  const history = useHistory();
  const [landingPosts, setLandingPosts] = React.useState([]);


  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    if (localStorage.getItem("currentUser") === null) {
      history.push("/signin");
    }
    // onAuthStateChanged(auth, (currentUser) => {
    //   if (currentUser) {
      
    //   } else {
    //     history.push("/signin");
    //     localStorage.removeItem("currentUser");
    //   }
    document.body.classList.add("index");
    return function cleanup() {
      document.body.classList.remove("index");
    };
  });

  React.useEffect(() => {
    
    queryAllBlogs().then((blogs) => {
      if (blogs) {
        Promise.all(
          blogs.map((blog) =>
            queryUser(blog.author_id).then((user) => ({
              blog,
              user,
            }))
          )
        )
          .then((results) => {
            const Posts = results.map(({ blog, user }) => (
              <LandingPost
                key={blog.postId}
                user={user}
                blog={blog}
              />
            ));
            
            setLandingPosts(Posts);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  }, []);

  return (
    <>
      <ExamplesNavbar />
      <div className="section">
        <div
          className="page-header section-dark"
          style={{
            backgroundImage:
              "url(" + require("assets/img/antoine-barres.jpg") + ")",
          }}
        >
          <div className="filter" />
          <div className="content-center">
            <div className="container">
              <div className="title-brand">
                <h1 className="presentation-title">Travel Blog</h1>
              </div>
              <h2 className="presentation-subtitle text-center" style={{marginBottom:"2rem"}}>
                Explore the world
              </h2>
            </div>
          </div>
        </div>
        <div className="main">
          <LandingCreate />
          {landingPosts}
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Index;
