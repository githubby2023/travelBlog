import React from "react";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar";
import "components/Profile/Profile.scss";
import PostedBlogCard from "components/Profile/BlogCard";
import ProfileCard from "components/Profile/ProfileCard";
import LatestBlogCard from "components/Profile/LatestBlogCard";
import Footer from "components/Footers/Footer";
import ScrollContainer from "react-indiana-drag-scroll";
import ProfileModal from "components/Profile/ProfileModal";
import { BiEdit } from "react-icons/bi";
import ProfileCoverModal from "components/Profile/ProfileCoverModal";
import { queryUserBlog } from "../../api/queryBlog";

const UserProfilePage = () => {
  // let pageHeader = React.createRef();

  // const blogs = [
  //   {
  //     id: "1",
  //     title: "Ice Mountain",
  //     url: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     desc: "Standing in awe of the frozen majesty before me, I can't help but feel small in comparison. The ice mountain towers above me, its jagged peaks piercing the clouds, a testament to the power and beauty of nature.",
  //   },
  //   {
  //     id: "2",
  //     title: "Beauty In Bloom",
  //     url: "https://images.pexels.com/photos/381739/pexels-photo-381739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     desc: "Beauty In Bloom",
  //   },
  //   {
  //     id: "3",
  //     title: "Mighty Oak",
  //     url: "https://japan.stripes.com/sites/default/files/styles/community_site_carousel_750x500/public/article-images/main_13.jpg?itok=_GELFbpY",
  //     desc: "Mighty Oak",
  //   },
  //   {
  //     id: "4",
  //     title: "Blue Beauty",
  //     url: "https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     desc: "Blue Beauty",
  //   },
  //   {
  //     id: "5",
  //     title: "Nighttime Magic",
  //     url: "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     desc: "Nighttime Magic",
  //   },
  // ];

  const [currentUser, setCurrentUser] = React.useState({});
  const [isModalOpened, setModal] = React.useState(false);
  const [isCoverModalOpened, setCoverModal] = React.useState(false);
  const [blogs, setBlogs] = React.useState([{}]);
  const newBlogs = blogs.slice(1);

  function toggleModal() {
    setModal((bool) => !bool);
  }
  function toggleCoverModal() {
    setCoverModal((bool) => !bool);
  }

  React.useEffect(() => {
    const userTemp = JSON.parse(localStorage.getItem("currentUser"));
    if (userTemp) {
      setCurrentUser(userTemp);
    }
  }, []);

  React.useEffect(() => {
    queryUserBlog(currentUser.uid).then((blogs) => {
      setBlogs(blogs);
    });
  }, [currentUser.uid]);

  return (
    // console.log("Current User is " + JSON.stringify(currentUser)),
    <>
      <ExamplesNavbar />
      <ProfileModal
        isModalOpened={isModalOpened}
        toggleModal={toggleModal}
        currentUser={currentUser}
      />
      <ProfileCoverModal
        isModalCoverOpened={isCoverModalOpened}
        toggleCoverModal={toggleCoverModal}
        uid={currentUser.uid}
      />
      <div className="section">
        <div
          style={{
            backgroundImage: `url(${
              currentUser.cover || require("assets/img/fabio-mangione.jpg")
            })`,
          }}
          className="page-header"
          data-parallax={true}
          // ref={pageHeader}
        >
          <div className="filter" />
          <BiEdit className="editCoverIcon" onClick={toggleCoverModal} />
        </div>
        <div className="container" lg="12">
          <ProfileCard
            uid={currentUser.uid}
            name={currentUser.username}
            nationality={currentUser.nationality}
            issender={true}
            toggleModal={toggleModal}
            photoUrl={currentUser.profilepic}
          />
          <div className="row">
            <div className="bio mx-auto col-md-4 text-center">
              <p>
                {currentUser.bio
                  ? currentUser.bio
                  : "Write some bio so that people can know you better!"}
              </p>
              {/* <p>encrypt {Encryption.encryptAES("lol")}</p> */}
              {/* <p>bruh {Encryption.decryptAES("sPqsda9NhISgRa8Zn4ktig==")}</p> */}
            </div>
          </div>
          <div className="row">
            <div className="mx-auto col-md-12">
              <h4 className="bold text-center">Lastest Blog</h4>
            </div>
          </div>
          {/* When there is 0 blog */}
          {blogs.length === 0 ? (
            <div className="row">
              <div className="mx-auto col-md-12">
                <h4 className="bold text-center">No Blog Yet</h4>
              </div>
            </div>
            // When there is only 1 blog
          ) : blogs.length === 1 ? (
            <LatestBlogCard blog={blogs[0]} />
          ) : (
            // When there are more than 1 blog
            <>
              <LatestBlogCard blog={blogs[0]} />
              <div className="row">
                <div className="mx-auto col-md-12">
                  <h4 className="bold text-center">User Blog</h4>
                  <ScrollContainer className="card-container">
                    {newBlogs.map((blog) => (
                      <PostedBlogCard key={blog.postId} blogProps={blog} />
                    ))}
                  </ScrollContainer>
                </div>
              </div>
            </>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default UserProfilePage;
