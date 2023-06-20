import React from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates strings
import classnames from "classnames";
import { signOut, getAuth } from "firebase/auth";
// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
} from "reactstrap";
import SearchBar2 from "components/Landing/searchBar2";
import { queryAllBlogs } from "api/queryBlog";
import { queryUser } from "api/authentication";
import LandingPost from "components/Landing/LandingPost";
import postsData from "./postData"
import { post } from "jquery";
import { queryBlogComments } from "../../api/queryBlog";

function ExamplesNavbar({ isTransparent = true }) {
  const [blogs, setBlogs] = React.useState();
  const [navbarColor, setNavbarColor] = React.useState("");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({uid: ""});
  const [profileRoute, setProfileRoute] = React.useState("/signin");
  const [createRoute, setCreateRoute] = React.useState("/signin");
  const [dashboardRoute, setDashboardRoute] = React.useState("/signin");
  const [postArray, setPostArray] = React.useState([]);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  React.useEffect(() => {
    // queryAllBlogs().then((blogs) => {
    //   setBlogs(Object.values(JSON.stringify(blogs)));
    // });
    // console.log(blogs + "blogs");

    queryAllBlogs().then((blogs) => {
      if (blogs) {
        Promise.all(
          blogs.map((blog) =>
            Promise.all([
              queryUser(blog.author_id),
              queryBlogComments(blog.postId)
            ]).then(([user, comments]) => ({
              blog,
              comments,
              user,
            }))
          )
        )
          .then((results) => {
            const Posts = results.map(({ blog, comments, user }) => ({
              blog,
              comments,
              user,
            }));
            setPostArray(Posts);
            console.log(postArray);
            console.log(postsData);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });

    // queryAllBlogs().then((blogs) => {
    //   if (blogs) {
    //     Promise.all(
    //       blogs.map((blog) =>
    //         queryUser(blog.author_id).then((user) => ({
    //           blog,
    //           user,
    //         }))
    //       )
    //     )
    //       .then((results) => {
    //         //create a new array of objects with blog and user
            
            
    //         const Posts = results.map(({ blog, user }) => (
    //             {blog, user}
    //         ));
    //         // setPostArray(Array.from(Posts));
    //         setPostArray(Posts);
    //         console.log(postArray)
    //         console.log(postsData)
    //       })
    //       .catch((error) => {
    //         console.error(error);
    //       });
    //   }
    // });

    const userTemp = JSON.parse(localStorage.getItem("currentUser"));
    if (userTemp) {
      setCurrentUser(userTemp);
      setProfileRoute(`/profile/${userTemp.uid}`);
      setCreateRoute("/create");
      setDashboardRoute(`/dashboard`);
    }
  }, []);

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (isTransparent) {
        if (
          document.documentElement.scrollTop > 299 ||
          document.body.scrollTop > 299
        ) {
          setNavbarColor("");
        } else if (
          document.documentElement.scrollTop < 300 ||
          document.body.scrollTop < 300
        ) {
          setNavbarColor("navbar-transparent");
        }
      } else {
        setNavbarColor("");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  }, [isTransparent]);
  return (
    <Navbar
      className={classnames("fixed-top", navbarColor)}
      color-on-scroll="300"
      expand="lg"
      style={{ maxHeight: "100px" }}
    >
      <Container>
        <div className="navbar-translate">
          <NavbarBrand
            data-placement="bottom"
            to="/index"
            title="Coded by GitHubby"
            tag={Link}
          >
            Travel Blog
          </NavbarBrand>
          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse,
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
            <span className="navbar-toggler-bar bar4" />
          </button>
        </div>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >
          <Nav navbar>
            <NavItem>
              <SearchBar2 placeholder="Search" data={postArray}/>
            </NavItem>

            <NavItem>
              <NavLink href={createRoute}>
                <i className="nc-icon nc-simple-add" /> Create Post
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={dashboardRoute}>
                <i className="nc-icon nc-layout-11" /> Dashboard
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={profileRoute}>
                <i className="nc-icon nc-single-02" /> Profile
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                onClick={() => {
                  localStorage.removeItem("currentUser");
                  signOut(getAuth())}}
                href="/signin"
                // target="_blank"
              >
                {currentUser.uid === "" ? (
                  <>
                    <i className="nc-icon nc-circle-10" /> Login
                  </>
                ) : (
                  <>
                    <i className="nc-icon nc-user-run" /> Logout
                  </>
                )}
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default ExamplesNavbar;
