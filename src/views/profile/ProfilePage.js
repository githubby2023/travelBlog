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
import { useParams } from "react-router-dom";
import { queryUser } from "api/authentication";
import { GrFormAdd } from "react-icons/gr";

const UserProfilePage = () => {
  const { id } = useParams();
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
    queryUser(id).then((user) => {
      setCurrentUser(user);
    });
  }, [id]);

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

          {/* When there is 0 blog */}
          {blogs.length === 0 ? (
            <div className="row">
              <div className="mx-auto col-md-12">
                <h4 className="bold text-center">No Blog Yet</h4>
                <h6 className="text-center">Try to create some blog?</h6>
                <div className="landing-create-post-container mx-auto col-md-6">
                  <div className="create-post-row">
                    <a href="/create" className="add-row">
                      <GrFormAdd className="add-icon my-auto" />
                      <p className="my-auto">Create Post</p>
                    </a>
                  </div>
                </div>
                <div style={{ height: "100px" }} />
              </div>
            </div>
          ) : // When there is only 1 blog
          blogs.length === 1 ? (
            <>
              <div className="row">
                <div className="mx-auto col-md-12">
                  <h4 className="bold text-center">Lastest Blog</h4>
                </div>
              </div>
              <LatestBlogCard blog={blogs[0]} user={currentUser} />
            </>
          ) : (
            // When there are more than 1 blog
            <>
              <div className="row">
                <div className="mx-auto col-md-12">
                  <h4 className="bold text-center">Lastest Blog</h4>
                </div>
              </div>
              <LatestBlogCard blog={blogs[0]} user={currentUser} />
              <div className="row">
                <div className="mx-auto col-md-12">
                  <h4 className="bold text-center">User Blog</h4>
                  <ScrollContainer className="card-container">
                    {newBlogs.map((blog) => (
                      <PostedBlogCard
                        key={blog.postId}
                        blog={blog}
                        user={currentUser}
                      />
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
